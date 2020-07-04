import { Job } from '@iredium/butterfly/lib/jobs/job'
import EmailTemplate = require('email-templates')
import nodemailer = require('nodemailer')

/**
 * Send email to user.
 * @param receiver an express's request object.
 * @param subject: string.
 * @param text: string.
 * @param html: strng
*/

export class MailJob extends Job {
  public name: string = 'mailing.jobs.mail-job'
  public maxActiveJob: number = 3
  public mailData: {[key: string]: string} = {}
  protected transporter: any

  public constructor () {
    super()
    const smtpConfig = {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // upgrade later with STARTTLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    }

    console.log({smtpConfig})

    this.transporter = nodemailer.createTransport(smtpConfig)
  }

  public perform ({ data }: {data: object}, done: Function): void{
    const template = data['template']
    const from = data['from']
    const to = data['to']
    const subject = data['subject']
    const text = data['text']
    const html = data['html']
    const locals = data['locals']
    const transporter = this.transporter

    console.log(`sending email: ${JSON.stringify(data)}`)

    if (template === undefined || template === '') {
      let mailData: {[key: string]: string} = {
        from,
        to,
        subject,
        text,
        html
      }
      transporter.sendMail(mailData, (err: Error): void => {
        if (err) {
          console.log(err)
          done(err)
        } else {
          console.log(`email sent: ${JSON.stringify(data)}`)
          done()
        }
      })
    } else {
      console.log(`send with template ${template}`)
      let email = new EmailTemplate({
        message: {
          from
        },
        send: true,
        transport: transporter
      })

      email.send({
        template,
        message: {
          to
        },
        locals
      }).then((): void => {
        console.log(`email sent: ${JSON.stringify(data)}`)
        done()
      }
      ).catch((err: Error): void => {
        console.log(err)
        done(err)
      })
    }
  }
}
