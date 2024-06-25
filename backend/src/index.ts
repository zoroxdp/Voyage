import { Hono } from 'hono'
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign, verify } from 'hono/jwt'
import { userRouter } from './routes/userRoutes';
import { postRouter } from './routes/postRoutes';
import { cors } from 'hono/cors';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    jwtSecret: string
  }
}>()

app.use(cors());
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", postRouter);



export default app
