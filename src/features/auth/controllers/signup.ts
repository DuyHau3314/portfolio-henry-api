import { ObjectId } from 'mongodb';
import { Request, Response } from 'express';
import JWT from 'jsonwebtoken';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import { signUpGoogleSchema, signupSchema } from '@auth/schemes/signup';
import { IAuthDocument, ISignUpData } from '@auth/interfaces/auth.interface';
import { authService } from '@service/db/auth.service';
import { Helpers } from '@global/helpers/helpers';
import HTTP_STATUS from 'http-status-codes';
import { IUserDocument } from '@user/interfaces/user.interface';
import { BadRequestError } from '@global/helpers/error-handler';
import { authQueue } from '@service/queues/auth.queue';
import { userQueue } from '@service/queues/user.queue';
import { config } from '@root/config';
import { emailQueue } from '@service/queues/email.queue';
import { signupGoogleTemplate } from '@service/emails/templates/signup-google/signup-google-template';
import { userService } from '@service/db/user.service';

function extractUsername(email: string) {
  if (!email || typeof email !== 'string') return '';

  const [username] = email.split('@');
  return username;
}

export class SignUp {
  @joiValidation(signupSchema)
  public async create(req: Request, res: Response): Promise<void> {
    const { username, email, password } = req.body;
    const checkIfUserExist: IAuthDocument = await authService.getUserByUsernameOrEmail(username, email);
    if (checkIfUserExist) {
      throw new BadRequestError('Invalid credentials');
    }

    const authObjectId: ObjectId = new ObjectId();
    const userObjectId: ObjectId = new ObjectId();
    const uId = `${Helpers.generateRandomIntegers(12)}`;
    // the reason we are using SignUp.prototype.signupData and not this.signupData is because
    // of how we invoke the create method in the routes method.
    // the scope of the this object is not kept when the method is invoked
    const authData: IAuthDocument = SignUp.prototype.signupData({
      _id: authObjectId,
      uId,
      username,
      email,
      password
    });

    const userData: IUserDocument = SignUp.prototype.userData(authData, userObjectId);

    // Add to database
    authQueue.addAuthUserJob('addAuthUserToDB', { value: authData });
    userQueue.addUserJob('addUserToDB', { value: userData });

    const token = JWT.sign(
      { userId: userObjectId, email },
      config.JWT_TOKEN!,
      { expiresIn: '1d' } // Set token expiration as needed
    );

    res.status(HTTP_STATUS.CREATED).json({ message: 'User created successfully', token });
  }

  private signupData(data: ISignUpData): IAuthDocument {
    const { _id, username, email, uId, password } = data;
    return {
      _id,
      uId,
      username: Helpers.firstLetterUppercase(username),
      email: Helpers.lowerCase(email),
      password,
      createdAt: new Date()
    } as IAuthDocument;
  }

  private userData(data: IAuthDocument, userObjectId: ObjectId): IUserDocument {
    const { _id, username, email, uId, password } = data;
    return {
      _id: userObjectId,
      authId: _id,
      uId,
      username: Helpers.firstLetterUppercase(username),
      email,
      password,
      social: {
        facebook: '',
        instagram: '',
        twitter: '',
        youtube: ''
      }
    } as unknown as IUserDocument;
  }

  @joiValidation(signUpGoogleSchema)
  public async googleSignup(req: Request, res: Response): Promise<void> {
    const { email } = req.body;
    const checkIfUserExist: IAuthDocument = await authService.getAuthUserByEmail(email);

    if (checkIfUserExist) {
      const user: IUserDocument = await userService.getUserByAuthId(`${checkIfUserExist._id}`);
      const token = JWT.sign({ userId: user._id, email }, config.JWT_TOKEN!, { expiresIn: '1d' });
      res.status(HTTP_STATUS.CREATED).json({ message: 'User created successfully', token });

      return;
    } else {
      const authObjectId: ObjectId = new ObjectId();
      const userObjectId: ObjectId = new ObjectId();

      const uId = `${Helpers.generateRandomIntegers(12)}`;

      // Random password with 6 characters word and integer
      const password = `${Helpers.generateRandomIntegers(8)}`;

      const username = extractUsername(email);

      const authData: IAuthDocument = {
        _id: authObjectId,
        username: username,
        uId,
        email: Helpers.lowerCase(email),
        password: password,
        type: 'google',
        createdAt: new Date()
      } as IAuthDocument;

      const userData: IUserDocument = {
        _id: userObjectId,
        authId: authObjectId,
        uId,
        email: Helpers.lowerCase(email),
        password: '',
        username: '',
        social: {
          facebook: '',
          instagram: '',
          twitter: '',
          youtube: ''
        }
      } as IUserDocument;

      // Add to database

      authQueue.addAuthUserJob('addAuthUserToDB', { value: authData });
      userQueue.addUserJob('addUserToDB', { value: userData });

      const templateParams = {
        email,
        password
      };

      const template: string = signupGoogleTemplate.signupGoogleTemplate(templateParams);

      emailQueue.addEmailJob('sendInfoGoogle', { template, receiverEmail: email, subject: 'Information portfolio' });

      const token = JWT.sign(
        { userId: userObjectId, email },
        config.JWT_TOKEN!,
        { expiresIn: '1d' } // Set token expiration as needed
      );

      res.status(HTTP_STATUS.CREATED).json({ message: 'User created successfully', token });
    }
  }
}
