import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from "../../common/entities/user.entity";

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user, token: string) {
    const url = `example.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: user,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Xin chào đến mới Thịnh Béo Shop! vui lòng xác thực email của bạn',
      template: './confirm.hbs', // `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        name: 'hiih',
        url,
      },
    });
  }
}
