import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { verifySessionCookie } from "./modules/user/utils";

type ContextUser = { id: string; email?: string } | null;

export interface Context {
  prisma: PrismaClient;
  user: ContextUser;
  req: Request;
  res: Response;
}

const prisma = new PrismaClient();

export const createContext = async (req: Request, res: Response): Promise<Context> => ({
  prisma,
  user: await verifySessionCookie({ req, res }),
  req,
  res,
});
