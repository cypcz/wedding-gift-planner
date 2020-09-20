import { MailService } from "@sendgrid/mail";

export const sendRegisterEmail = (emailClient: MailService, email: string) =>
  emailClient.send({
    from: "info@wedding.jakubkot.com",
    to: email,
    subject: "Thank you for registering to Wedding Gift Planner!",
    html: "Welcome",
  });
