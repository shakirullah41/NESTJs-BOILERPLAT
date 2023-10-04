// your.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { Public } from '../auth/decorator/public.decorator';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Public()
  @Post('send')
  async sendEmail(
    @Body() emailData: { to: string; subject: string; text: string },
  ) {
    const { to, subject, text } = emailData;

    try {
      await this.emailService.sendEmail(to, subject, text);
      return { message: 'Email sent successfully' };
    } catch (error) {
      throw new Error('Failed to send email');
    }
  }
}
