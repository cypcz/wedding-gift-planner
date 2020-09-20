import { PrismaClient, User } from "@prisma/client";
import { MailService } from "@sendgrid/mail";
import { Request, Response } from "express";
import { verifySessionCookie } from "./modules/user/utils";

type ContextUser = Pick<User, "id" | "email"> | null;

export interface Context {
  emailClient: MailService;
  prisma: PrismaClient;
  user: ContextUser;
  req: Request;
  res: Response;
}

const prisma = new PrismaClient();

export const createContext = async (
  req: Request,
  res: Response,
  emailClient: MailService
): Promise<Context> => ({
  emailClient,
  prisma,
  user: await verifySessionCookie({ req, res }),
  req,
  res,
});
