export const checkEnvVars = () => {
  const requiredEnvs = ["DATABASE_URL", "FE_URLS"];

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
