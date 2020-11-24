import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

let transporter = nodemailer.createTransport({
    service: "Outlook365",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

let MailGenerator = new Mailgen({
    theme: "default",
    product: {
        name: "TutoUDG",
        link: process.env.URL,
    },
});


export {transporter, MailGenerator};