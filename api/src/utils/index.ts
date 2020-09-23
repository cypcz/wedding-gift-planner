export const checkEnvVars = () => {
  const requiredEnvs = ["DATABASE_URL", "FE_URL", "SG_KEY"];

  const missingEnvVars = requiredEnvs.reduce((acc, envName) => {
    if (!process.env[envName]) {
      return acc !== "" ? `${acc}, ${envName}` : `${envName}`;
    }
    return acc;
  }, "");

  if (missingEnvVars.length) {
    throw new Error(`You are missing required environment variables: ${missingEnvVars}`);
  }
};

export const encodeInBase64 = (data: object) =>
  Buffer.from(JSON.stringify(data)).toString("base64");
