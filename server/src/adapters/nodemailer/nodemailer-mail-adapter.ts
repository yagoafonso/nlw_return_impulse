import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";


const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "380021f4a897c1",
      pass: "13231092c2e06a"
    }
  });

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail ({ subject, body}: SendMailData) {
        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com',
            to: 'Yago Afonso <yago.afonso@hotmail.com>',
            subject,
            html: body,
        });
    };
}