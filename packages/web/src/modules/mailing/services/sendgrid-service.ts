import sgMail from '@sendgrid/mail';
import { IMailService } from '~~/src/modules/mailing/utils/types';

export const sendGridService = ({
  config
}: {
  config: ReturnType<typeof useRuntimeConfig>;
}): IMailService => {
  sgMail.setApiKey(config.sendgridApiKey);

  return {
    sendMail({ to, template }) {
      return sgMail.send({
        from: 'loic@disruptual.com',
        to,
        subject: template.subject,
        html: template.body
      });
    }
  };
};
