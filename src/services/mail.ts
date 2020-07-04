import { Job } from '@iredium/butterfly/lib/src/jobs/job'

const company = process.env.COMPANY_NAME
const defaultFrom = `${company} <${process.env.EMAIL_NOREPLY}>`
const smptUser = process.env.SMTP_USER

export class MailService {
  public async send ({ from = defaultFrom, to, subject, html = '', text = '' }: {
    from: string, to: string, subject: string, html: string, text: string
  }): Promise<void> {
    await Job.enqueue('mailing.jobs.mail-job', {
      from,
      to,
      subject,
      html,
      text
    })
  }

  public async sendWithTemplate ({ from = defaultFrom, to, template = '', locals = {} }: {
    from: string, to: string, template: string, locals: object
  }): Promise<void> {
    await Job.enqueue('mailing.jobs.mail-job', {
      from,
      to,
      template,
      locals
    })
  }

  public sendSampleEmail ({ to = smptUser }): void {
    let locals: {[key: string]: string} = { company }
    Job.enqueue('mailing.jobs.mail-job', {
      from: defaultFrom,
      to,
      template: 'sample_mail',
      locals
    })
  }
}
