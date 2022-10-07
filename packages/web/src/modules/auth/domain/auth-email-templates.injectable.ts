import { EmailTemplate } from '~~/src/modules/mailing/utils/types';

type Templates = {
  emailSignIn: EmailTemplate<'link'>;
};

export default (): Templates => {
  return {
    emailSignIn({ link }) {
      return {
        subject: 'Game portal - email sign-in',
        body: `<p>Yo dawg sign in by clicking <a href="${link}">this link</a></p>`
      };
    }
  };
};
