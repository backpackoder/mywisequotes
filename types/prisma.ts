export type Prisma<T> = T | null;

export type User = {
  id: string;
  name: string | null;
  image: string | null;
  email: string | null;
  age: number | null;
  bio: string | null;
} | null;
