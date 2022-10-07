import {
  AuthEmailTemplates,
  Config,
  Db,
  MailService,
  SecurityService
} from '~~/src/generated/injectables';
import { FIFTEEN_MINUTES_IN_MS } from '~~/src/utils/time-helpers';

type Injected = {
  db: Db;
  securityService: SecurityService;
  mailService: MailService;
  authEmailTemplates: AuthEmailTemplates;
  config: Config;
};
export default ({
  db,
  securityService,
  mailService,
  authEmailTemplates,
  config
}: Injected) => ({
  async signInByEmail(email: string) {
    const oneTimePassword = await securityService.hash(
      securityService.generateRandomString()
    );
    const oneTimePasswordExpiresAt = new Date(
      Date.now() + FIFTEEN_MINUTES_IN_MS
    );

    await db.user.upsert({
      where: { email },
      create: {
        email,
        oneTimePassword,
        oneTimePasswordExpiresAt
      },
      update: {
        oneTimePassword,
        oneTimePasswordExpiresAt
      }
    });

    mailService.sendMail({
      to: email,
      template: authEmailTemplates.emailSignIn({
        link: `${config.appUrl}?otp=${oneTimePassword}`
      })
    });
  }
});
