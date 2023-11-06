import { ConfigService, ConfigModule } from '@nestjs/config';
import { config } from 'aws-sdk';
export const AWS = 'AWS';
console.log(config);
export const AwsProvider = {
  provide: AWS,
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return config.update({
      region:  configService.get('AWS_REGION'),
      accessKeyId: configService.get('AWS_ACCESS_KEY'),
      secretAccessKey: configService.get('AWS_SECRET_KEY'),
    });
  },
};