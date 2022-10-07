import nodemailer from 'nodemailer';
import { IMailService } from '~~/src/modules/mailing/utils/types';

const getTransport = () => {
  return nodemailer.createTransport({
    host: 'localhost',
    port: 1025,
    secure: false,
    tls: {
      rejectUnauthorized: false
    }
  });
};

export const nodeMailerService = (): IMailService => {
  return {
    sendMail({ to, template }) {
      const transporter = getTransport();

      return transporter.sendMail({
        from: 'loic@disruptual.com',
        to,
        subject: template.subject,
        html: template.body
      });
    }
  };
};
