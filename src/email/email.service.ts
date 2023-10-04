// email.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    // Create a transporter object using your email service's settings
    this.transporter = nodemailer.createTransport({
      service: 'Gmail', // Replace with your email service (e.g., 'Gmail', 'SMTP', etc.)
      auth: {
        user: this.configService.get('MAIL_USER'), // Your email address
        pass: this.configService.get('MAIL_PASS'), // Your email password or App Password for Gmail
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    // Email data
    const mailOptions = {
      from: this.configService.get('MAIL_USER'), // Your email address
      to,
      subject,
      text,
    };

    try {
      // Send the email
      await this.transporter.sendMail(mailOptions);
    } catch (e) {
      console.log(e);
    }
  }
}
