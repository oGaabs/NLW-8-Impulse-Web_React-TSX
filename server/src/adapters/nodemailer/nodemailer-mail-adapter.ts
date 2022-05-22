import { MailAdapter, SendMailData } from "../main-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "e438b0a7f4d781",
      pass: "24fb9f84cb5080"
    }
})

export class NodemailerMailAdapter implements MailAdapter {

    async sendMail({subject, body} : SendMailData) {
        await transport.sendMail({
            from: "Equipe Feedget <oi@feedget.com>",
            to: "Gabriel Santana <gabriel04.ok@gmail.com>",
            subject,
            html: body
        })
    }
}