import { MailService } from "@sendgrid/mail";

export const sendRegisterEmail = (
  emailClient: MailService,
  email: string,
  verificationLink?: string
) =>
  emailClient.send({
    from: "info@wedding.jakubkot.com",
    to: email,
    subject: "Thank you for registering to Wedding Gift Planner!",
    html: `Welcome. ${
      verificationLink
        ? `
      \n
      Please verify your email <a href=${verificationLink} target="_blank" rel="noopener noreferrer">here</a>
    `
        : ""
    }
    `,
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

export const sendVerificationEmail = (
  emailClient: MailService,
  email: string,
  verificationLink: string
) =>
  emailClient.send({
    from: "info@wedding.jakubkot.com",
    to: email,
    subject: "Click the link in the email to verify your account!",
    html: `Hello. To verify your email, please click <a href=${verificationLink} target="_blank" rel="noopener noreferrer">here</a>`,
  });
