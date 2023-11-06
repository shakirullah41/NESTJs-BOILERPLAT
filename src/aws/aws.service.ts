import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import * as fs from 'fs';

@Injectable()
export class AwsService {
  private s3: AWS.S3;
  private Bucket: string;
  // private sns: AWS.SNS;
  // private ses: AWS.SES;
  constructor(private configService: ConfigService) {
    this.Bucket = this.configService.get('AWS_BUCKET_NAME');
    AWS.config.update({
      accessKeyId: this.configService.get('AWS_ACCESS_KEY'),
      secretAccessKey: this.configService.get('AWS_SECRET_KEY'),
      region: this.configService.get('AWS_REGION'),
    });
    this.s3 = new AWS.S3({ params: { Bucket: this.Bucket } });
  }
  async s3Put(file, filename, type = 'binary', mimeType) {
    return new Promise(async (resolve) => {
      const data = {
        Key: filename,
        Body: file,
        ContentType: mimeType,
        Bucket: this.Bucket,
      };
      if (type === 'path') {
        data.Body = fs.createReadStream(file);
      }
      console.log(data);
      this.s3.putObject(data, (err, response) => {
        if (err) {
          console.log(err);
          console.log('Error uploading data: ', response);
        } else {
          console.log('succesfully uploaded the file!');

          return resolve('done uploading');
        }
        return true;
      });
    });
  }
  async s3Upload(file, filename, type = 'binary', mimeType) {
    return new Promise(async (resolve) => {
      const data = {
        Key: filename,
        Body: file,
        ContentType: mimeType,
        Bucket: this.Bucket,
      };
      if (type === 'path') {
        data.Body = fs.createReadStream(file);
      }
      console.log(data);
      try {
        const response = await this.s3.upload(data).promise();
        return response;
      } catch (e) {
        console.error(e);
        throw new InternalServerErrorException('Could not upload image');
      }
    });
  }
  async s3Get(filename) {
    return new Promise(async (resolve) => {
      const data = {
        Key: filename,
        Bucket: this.Bucket,
      };
      this.s3.getObject(data, (err, response) => {
        if (err) {
          console.log(err);
          console.log('Error downloading data: ', response);
        } else {
          console.log('succesfully download the file!', response);
          return resolve(response.Body);
        }
        return true;
      });
    });
  }
}
