import z from 'zod';

export const signupInput = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  password: z.string().min(8),
});

export const signinInput = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const createPostInput = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

export const updatePostInput = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  id: z.string()
});

export type singinInputType = z.infer<typeof signinInput>;
export type createPostInputType = z.infer<typeof createPostInput>;
export type signupInputType = z.infer<typeof signupInput>;
export type updatePostInputType = z.infer<typeof updatePostInput>;
