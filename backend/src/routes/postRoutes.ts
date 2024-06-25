import { Hono } from "hono";
import { verify } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createPostInput, updatePostInput } from "@zoroxdp/medium-common";


export const postRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    jwtSecret: string
  },
  Variables: {
    userId: string
  }
}>();

postRouter.use(async (c, next) => {
  const header = c.req.header("authorization") || "";
  const token = header.split(" ")[1];

  try {
    const user = await verify(token, c.env.jwtSecret);
    if (user) {
      const aid = String(user.id);
      c.set("userId", aid);
      await next();
    } else {
      c.status(403);
      return c.json({ error: "Unauthorized" });
    }
  } catch (e) {
    c.status(403);
    return c.json({ message: "You are not logged in" });
  }

})


postRouter.post('/', async (c) => {
  const body = await c.req.json();
  const { success } = createPostInput.safeParse(body);

  if (success) {
    const userId = c.get("userId");
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId
      }
    })

    return c.json({
      id: blog.id
    })
  } else {
    c.status(403);
    return c.json({ message: "Not valid inputs" });
  }
})

postRouter.put('/update', async (c) => {
  const body = await c.req.json();
  const { success } = updatePostInput.safeParse(body);

  if (success) {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const blog = await prisma.post.update({
      where: {
        id: body.id
      },
      data: {
        title: body.title,
        content: body.content,
      }
    })

    return c.json({
      id: blog.id
    })
  } else {
    c.status(403);
    c.json({ message: "Invalid inputs" });
  }
})

postRouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());

  const blogs = await prisma.post.findMany({});
  return c.json({
    blogs
  })
})

postRouter.get('/:id', async (c) => {
  const id = c.req.param('id');
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());
  const post = await prisma.post.findUnique({
    where: {
      id: String(id)
    }
  })
  return c.json(post);
})

