import { Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

interface makeEmailUserArgs {
  transporter: Transporter<SMTPTransport.SentMessageInfo>
}

interface emailUserArgs {
  userEmail: string;
  subject: string;
  text: string;
}

const makeEmailUser = ({ transporter }: makeEmailUserArgs) => {
  return function emailUser({userEmail, subject, text}: emailUserArgs) {
    transporter.sendMail({
      from: "Bid Web",
      to: userEmail,
      subject: subject,
      text: text
    })
  }
}

export default makeEmailUser
