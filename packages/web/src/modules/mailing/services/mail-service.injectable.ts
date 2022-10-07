import { nodeMailerService } from './nodemailer-service';
import { sendGridService } from './sendgrid-service';

export default useRuntimeConfig().sendgridapiKey
  ? sendGridService
  : nodeMailerService;
