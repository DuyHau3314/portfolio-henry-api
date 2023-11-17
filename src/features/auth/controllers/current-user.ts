import { Request, Response } from 'express';
import { IUserDocument } from '@user/interfaces/user.interface';
import { userService } from '@service/db/user.service';
import HTTP_STATUS from 'http-status-codes';

export class CurrentUser {
  public async read(req: Request, res: Response): Promise<void> {
    let user = null;
    const existingUser: IUserDocument = await userService.getUserById(`${req.currentUser!.userId}`);

    if (Object.keys(existingUser).length) {
      user = existingUser;
    }
    res.status(HTTP_STATUS.OK).json({ user });
  }
}
