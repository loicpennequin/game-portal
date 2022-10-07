export type EmailTemplate<T extends string> = (
  variables: Record<T, string>
) => {
  subject: string;
  body: string;
};

export type SendMailOptions = {
  to: string;
  template: ReturnType<EmailTemplate<string>>;
};

export interface IMailService {
  sendMail: (options: SendMailOptions) => Promise<any>;
}
