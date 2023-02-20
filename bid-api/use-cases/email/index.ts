import nodemailer from "nodemailer";
import { SMTP } from "../../app/config";
import makeEmailUser from "./email-user";

let transporter = nodemailer.createTransport({...SMTP});

const emailUser = makeEmailUser({transporter})

export default Object.freeze({
  emailUser
})

export { emailUser }
