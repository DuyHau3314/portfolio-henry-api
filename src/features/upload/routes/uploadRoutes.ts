import { authMiddleware } from '@global/helpers/auth-middleware';
import express, { Request, Router } from 'express';
import multer from 'multer';
import AWS from 'aws-sdk';
import fs from 'fs';
import path from 'path';
import { config } from '@root/config';
import { BadRequestError } from '@global/helpers/error-handler';

AWS.config.update({
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  region: config.AWS_REGION
});

const s3 = new AWS.S3();

const upload = multer({ dest: 'uploads/' });

class UploadRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    // Portfolio
    this.router.post('/uploads', authMiddleware.checkAuthentication, async (req: Request, res) => {
      const files = req.files as Express.Multer.File[];
      if (!files) {
        throw new BadRequestError('Please upload a file');
      }

      const uploadPromises = files.map((file) => {
        const fileStream = fs.createReadStream(file.path);
        const uploadParams = {
          Bucket: config.AWS_BUCKET_NAME!,
          Body: fileStream,
          Key: `uploads/${path.basename(file.originalname)}`, // Using original file name,
          ACL: 'public-read'
        };
        return s3.upload(uploadParams).promise();
      });
      const uploadedFiles = await Promise.all(uploadPromises);

      const fileUrls = uploadedFiles.map((file) => file.Location); // 'Location' contains the URL of the uploaded file

      res.send({ message: 'Files uploaded successfully', urls: fileUrls });
    });
    return this.router;
  }
}

export const uploadRoutes: UploadRoutes = new UploadRoutes();
