import { hash, compare } from 'bcryptjs';
import { IAuthDocument } from '@auth/interfaces/auth.interface';
import { model, Model, Schema } from 'mongoose';

const SALT_ROUND = 10;

const ADMIN_EMAILS: string[] = ['congtuzxc@gmail.com', 'trinhhau230498@gmail.com', 'hautd@vmogroup.com', 'trinhhau23048888@gmail.com']; // Replace with actual admin emails

const authSchema: Schema = new Schema(
  {
    username: { type: String, unique: true},
    uId: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    createdAt: { type: Date, default: Date.now },
    passwordResetToken: { type: String, default: '' },
    passwordResetExpires: { type: Number },
    role: { type: String, default: 'user' },
    type: { type: String, default: '' }
  },
  {
    toJSON: {
      transform(_doc, ret) {
        delete ret.password;
        return ret;
      }
    }
  }
);

authSchema.pre('save', async function (this: IAuthDocument, next: () => void) {
  const hashedPassword: string = await hash(this.password as string, SALT_ROUND);
  this.password = hashedPassword;

  if (ADMIN_EMAILS.includes(this.email)) {
    this.role = 'admin';
  }
  next();
});

authSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  const hashedPassword: string = (this as unknown as IAuthDocument).password!;
  return compare(password, hashedPassword);
};

authSchema.methods.hashPassword = async function (password: string): Promise<string> {
  return hash(password, SALT_ROUND);
};

const AuthModel: Model<IAuthDocument> = model<IAuthDocument>('Auth', authSchema, 'Auth');
export { AuthModel };
