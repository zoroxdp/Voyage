import { Hono } from 'hono'
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign, verify } from 'hono/jwt'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    jwtSecret: string
  }
}>()

app.use('/api/v1/blog/*', async (c, next) => {
  const header = c.req.header("authorization") || "";
  const token = header.split(" ")[1];

  const response = await verify(token, c.env.jwtSecret);
  if (response.id) {
    next();
  } else {
    c.status(403);
    return c.json({ error: "Unauthorized" });
  }

})

app.post('/api/v1/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

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
})

app.post('/api/v1/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
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
})

app.post('/api/v1/blog', (c) => {
  return c.text('post blog')
})

app.put('/api/v1/blog', (c) => {
  return c.text('update blog')
})

app.get('/api/v1/blog/:id', (c) => {
  return c.text('get blog')
})

export default app
