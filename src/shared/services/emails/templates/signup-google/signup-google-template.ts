import fs from 'fs';
import ejs from 'ejs';
import { ISignUpGoogleParams } from '@user/interfaces/user.interface';

class SignupGoogleTemplate {
  public signupGoogleTemplate(templateParams: ISignUpGoogleParams): string {
    const { email, password } = templateParams;
    return ejs.render(fs.readFileSync(__dirname + '/signup-google-template.ejs', 'utf8'), {
      email,
      password
    });
  }
}

export const signupGoogleTemplate: SignupGoogleTemplate = new SignupGoogleTemplate();
