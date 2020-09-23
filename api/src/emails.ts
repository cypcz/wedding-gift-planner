import { MailService } from "@sendgrid/mail";

export const sendRegisterEmail = (emailClient: MailService, email: string) =>
  emailClient.send({
    from: "info@wedding.jakubkot.com",
    to: email,
    subject: "Thank you for registering to Wedding Gift Planner!",
    html: "Welcome",
  });

export const sendPartnerInvitationEmail = (emailClient: MailService, email: string, link: string) =>
  emailClient.send({
    from: "info@wedding.jakubkot.com",
    to: email,
    subject: "You've been invited to manage a wedding by your partner",
    html: `Welcome to Wedding Gifts Planner. You can follow the link to finish registration and help your partner with managing your wedding!
      ${link}
    `,
  });
