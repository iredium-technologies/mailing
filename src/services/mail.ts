import { Job } from '@iredium/butterfly/lib/src/jobs/job'

const defaultFrom = `${process.env.APP_NAME} <${process.env.EMAIL_NOREPLY}>`
const smptUser = process.env.SMTP_USER

export class MailService {
  public async send ({ from = defaultFrom, to, subject, html }: {
    from: string, to: string, subject: string, html: string
  }): Promise<void> {
    await Job.enqueue('mailing.jobs.mail-job', {
      from,
      to,
      subject,
      html
    })
  }

  public async sendWithTemplate ({ from = defaultFrom, to, path = '', params = {} }: {
    from: string, to: string, path: string, params: object
  }): Promise<void> {
    await Job.enqueue('mailing.jobs.mail-job', {
      from,
      to,
      path,
      params
    })
  }

  public sendSampleEmail (path: string = '', params: object = {}, to: string = smptUser): void {
    Job.enqueue('mailing.jobs.mail-job', {
      from: defaultFrom,
      to,
      path,
      subject: 'This is a test email, please ignore.',
      params
    })
  }

  public sendSampleEmailTemplate (to: string = smptUser): void {
    let params: {[key: string]: string} = {username: 'Wahyu'}
    Job.enqueue('mailing.jobs.mail-job', {
      from: `${process.env.APP_NAME} <${process.env.SMTP_NOREPLY_EMAIL}>`,
      to,
      subject: 'This is a test email, please ignore.',
      path: 'sample_mail',
      params: params
    })
  }
}
