import { firebaseAdmin } from "../firebase";

export const checkEnvVars = () => {
  const requiredEnvs = ["DATABASE_URL", "FE_URL", "SG_KEY"];

  const missingEnvVars = requiredEnvs.reduce((acc, envName) => {
    if (!process.env[envName]) {
      return acc !== "" ? `${acc}, ${envName}` : `${envName}`;
    }
    return acc;
  }, "");

  if (missingEnvVars.length) {
    throw new Error(
      `You are missing required environment variables: ${missingEnvVars}`,
    );
  }
};

export const encodeInBase64 = (data: Record<string, unknown>) =>
  Buffer.from(JSON.stringify(data)).toString("base64");

export const verifyAndGetUserId = async (authHeader: string) => {
  try {
    if (!authHeader) return null;
    const token = authHeader.replace("Bearer ", "");

    const user = await firebaseAdmin.verifyIdToken(token);
    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
};
