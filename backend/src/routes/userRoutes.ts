import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt"
import { signinInput, signupInput } from "@zoroxdp/medium-common";


export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    jwtSecret: string
  }
}>();

userRouter.post('/signup', async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    console.log(body);
    const { success } = signupInput.safeParse(body);

    if (!success) {
      c.status(401);
      return c.json({
        message: "Invalid input"
      })
    }

    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: body.password
      }
    })

    const token = await sign({ id: user.id }, c.env.jwtSecret);
    return c.json({
      jwt: token
    })
  } catch (e) {
    console.log(e);
  }
})

userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (success) {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      }
    });
    if (!user) {
      c.status(403);
      return c.json({ error: "User not found" });
    }
    if (body.password !== user.password) {
      c.status(403);
      return c.json({ error: "Wrong password" });
    }
    const jwt = await sign({ id: user.id }, c.env.jwtSecret);
    return c.json({ jwt });
  } else {
    c.status(403);
    return c.json({ message: "Wrong inputs" });
  }
})

