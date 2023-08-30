import { MailerService } from '@nestjs-modules/mailer';
import { InternalServerErrorException, Injectable } from '@nestjs/common';
import * as Mailgen from 'mailgen';

const mailGenerator = new Mailgen({
  theme: 'salted',
  product: {
    name: 'VAGAFY',
    link: 'http://localhost:3000',
    copyright: 'Copyright © 2023 VAGAFY. All rights reserved.',
  },
});

interface SendEmail {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail({ to, subject, html }: SendEmail) {
    await this.mailerService
      .sendMail({ to, subject, html })
      .then(() => console.log('Email enviado com sucesso'))
      .catch((error) => {
        console.log(error);
        throw new InternalServerErrorException(
          'Não foi possível enviar o token por e-mail',
        );
      });
  }

  async toAuthenticate(userEmail: string, token: string) {
    const emailBody = mailGenerator.generate({
      body: {
        greeting: 'Olá',
        intro: `Falta pouco para autenticar seu endereço de e-mail 😎`,
        action: {
          instructions:
            'Clique no botão abaixo para autenticar sua conta na VAGAFY',
          button: {
            color: '#1a1919',
            text: 'Confirmar autenticação',
            link: `http://localhost:3000/users/auth/${token}`,
          },
        },
        outro: `Solicitação realizada em: ${new Date().toLocaleDateString()}`,
      },
    });

    await this.sendEmail({
      to: userEmail,
      subject: 'Autenticação de e-mail',
      html: emailBody,
    });
  }

  async toPassword(userEmail: string, token: string) {
    const emailBody = mailGenerator.generate({
      body: {
        title: 'Foi solicitado um pedido de alteração de senha 🔑',
        action: {
          instructions: 'Clique no botão abaixo para redefinir sua senha',
          button: {
            color: '#1a1919',
            text: 'Redefinir senha',
            link: `http://localhost:3000/users/pass/${token}`,
          },
        },
        outro: [
          'Caso não tenha sido você que solicitou essa alteração de senha, nenhuma outra ação precisa ser feita.',
          `Solicitação realizada em: ${new Date().toLocaleDateString()}`,
        ],
      },
    });

    await this.sendEmail({
      to: userEmail,
      subject: 'Alteração de Senha',
      html: emailBody,
    });
  }

  async toDisable(userEmail: string, token: string) {
    const emailBody = mailGenerator.generate({
      body: {
        title: 'Foi solicitado um pedido de desativação da sua conta 🔒',
        intro: `O Token para desativação é: ${token}`,
        outro: `Solicitação realizada em: ${new Date().toLocaleDateString()}`,
      },
    });

    await this.sendEmail({
      to: userEmail,
      subject: 'Desativação da Conta',
      html: emailBody,
    });
  }

  async toRecover(userEmail: string, token: string) {
    const emailBody = mailGenerator.generate({
      body: {
        title: 'Foi solicitado um pedido de recuperação da sua conta 🎈',
        intro: `O Token para recuperação é: ${token}`,
        outro: `Solicitação realizada em: ${new Date().toLocaleDateString()}`,
      },
    });

    await this.sendEmail({
      to: userEmail,
      subject: 'Recuperação de Conta',
      html: emailBody,
    });
  }

  async toDelete(userEmail: string, token: string) {
    const emailBody = mailGenerator.generate({
      body: {
        title: 'Poxa! Uma pena você está indo embora 🥺',
        intro: [
          'Esperemos nos ver em breve novamente. Toda equipe VAGAFY lhe deseja muito sucesso',
          `O token para exclusão da sua conta é: ${token}`,
        ],
        outro: `Solicitação realizada em: ${new Date().toLocaleDateString()}`,
      },
    });

    await this.sendEmail({
      to: userEmail,
      subject: 'Exclusão de Conta',
      html: emailBody,
    });
  }
}
