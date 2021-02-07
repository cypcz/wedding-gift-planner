import { PrismaClient } from "@prisma/client";
import { MailService } from "@sendgrid/mail";
import { Request, Response } from "express";
import { auth } from "firebase-admin";
import { verifyAndGetUserId } from "./utils";

export interface Context {
  emailClient: MailService;
  prisma: PrismaClient;
  user: auth.DecodedIdToken | null;
  req: Request;
  res: Response;
}

const prisma = new PrismaClient();

export const createContext = async (
  req: Request,
  res: Response,
  emailClient: MailService,
): Promise<Context> => ({
  emailClient,
  prisma,
  user: await verifyAndGetUserId(req.headers.authorization || ""),
  req,
  res,
});
