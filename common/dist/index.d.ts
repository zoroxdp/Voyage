import z from 'zod';
export declare const signupInput: z.ZodObject<{
  email: z.ZodString;
  name: z.ZodOptional<z.ZodString>;
  password: z.ZodString;
}, "strip", z.ZodTypeAny, {
  email: string;
  password: string;
  name?: string | undefined;
}, {
  email: string;
  password: string;
  name?: string | undefined;
}>;
export declare const signinInput: z.ZodObject<{
  email: z.ZodString;
  password: z.ZodString;
}, "strip", z.ZodTypeAny, {
  email: string;
  password: string;
}, {
  email: string;
  password: string;
}>;
export declare const createPostInput: z.ZodObject<{
  title: z.ZodString;
  content: z.ZodString;
}, "strip", z.ZodTypeAny, {
  title: string;
  content: string;
}, {
  title: string;
  content: string;
}>;
export declare const updatePostInput: z.ZodObject<{
  title: z.ZodString;
  content: z.ZodString;
  id: z.ZodString;
}, "strip", z.ZodTypeAny, {
  title: string;
  content: string;
  id: string;
}, {
  title: string;
  content: string;
  id: string;
}>;
export type singinInputType = z.infer<typeof signinInput>;
export type createPostInputType = z.infer<typeof createPostInput>;
export type signupInputType = z.infer<typeof signupInput>;
export type updatePostInputType = z.infer<typeof updatePostInput>;
