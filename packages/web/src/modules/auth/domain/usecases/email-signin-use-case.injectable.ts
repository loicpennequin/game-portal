import {
  AuthEmailTemplates,
  AuthService,
  Config,
  MailService
} from '~~/src/generated/injectables';
import { EmailSigninDto } from '~~/src/modules/auth/domain/auth-dtos';

type Injected = {
  authService: AuthService;
  mailService: MailService;
  authEmailTemplates: AuthEmailTemplates;
  config: Config;
};

export default ({
    authService,
    mailService,
    authEmailTemplates,
    config
  }: Injected) =>
  async (input: EmailSigninDto) => {
    const otp = await authService.getOneTimePasswordByEmail(input.email);

    mailService.sendMail({
      to: input.email,
      template: authEmailTemplates.emailSignIn({
        link: `${config.appUrl}/auth-callback?token=${otp.toJwt()}`
      })
    });

    return true;
  };
