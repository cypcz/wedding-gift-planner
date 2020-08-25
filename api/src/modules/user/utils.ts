import { Request, Response } from "express";
import { __prod__ } from "../../constants";
import { firebaseAdmin } from "../../firebase";

export const createSessionCookie = async ({
  req,
  res,
  idToken,
  csrfToken,
}: {
  req: Request;
  res: Response;
  idToken: string;
  csrfToken: string;
}) => {
  if (csrfToken !== req.cookies?.csrfToken) {
    res.status(401).send("UNAUTHORIZED REQUEST!");
    return;
  }

  try {
    const expiresIn = 1000 * 60 * 60 * 24 * 14; // 2 weeks (maximum)
    const sessionCookie = await firebaseAdmin.createSessionCookie(idToken, { expiresIn });
    res.cookie("session", sessionCookie, { maxAge: expiresIn, httpOnly: true, secure: __prod__ });
  } catch (error) {
    console.error(error);
    res.status(401).send("UNAUTHORIZED REQUEST!");
  }
};

export const verifySessionCookie = async ({ req, res }: { req: Request; res: Response }) => {
  const sessionCookie = req.cookies?.session || "";

  try {
    const decodedClaims = await firebaseAdmin.verifySessionCookie(sessionCookie, false);
    return { id: decodedClaims.uid, email: decodedClaims.email };
  } catch (e) {
    return null;
  } finally {
    res.cookie("csrfToken", (Math.random() * 100000000000000000).toString(), {
      domain: __prod__ ? ".jakubkot.com" : "",
      secure: __prod__,
      sameSite: "lax",
    });
  }
};
