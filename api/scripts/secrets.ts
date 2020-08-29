import { SecretManagerServiceClient } from "@google-cloud/secret-manager";
import fs from "fs";

const client = new SecretManagerServiceClient();

if (!process.env.STAGE) {
  console.error("env.STAGE not defined");
  process.exit(1);
}

async function accessFile(secretPath: string, filePath: string) {
  const name =
    `projects/wedding-gift-planner/secrets/` +
    `${process.env.STAGE}-` +
    `${secretPath}/versions/latest`;

  const [version] = await client.accessSecretVersion({
    name,
  });

  const payload = version?.payload?.data?.toString();
  if (!payload) {
    throw new Error(`Could not fetch ${secretPath}`);
  }

  fs.writeFileSync(filePath, payload);
}

Promise.all([
  accessFile("api-dotenv", ".env"),
  accessFile("api-firebase", "secrets/firebase_admin_key.json"),
])
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
