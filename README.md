# Mailing

## Description

Mailing Service

## Development Guide
### Installing Mailing

#### Setup Mailing Service

1. Clone Mailing

    ```sh
    git clone git@github.com:iredium-technologies/mailing.git
    cd mailing
    ```

2. Install Dependencies

    ```sh
    yarn
    ```

3. Copy `env` file

    ```sh
    cp env-sample .env
    ```

    Then make any changes if required. Follow this [guide](https://support.google.com/accounts/answer/185833) to get your email's app password

#### Things to try
1. Run Mailing Service

    ```sh
    yarn dev
    ```

    Worker Dashboard: [http://www.iredium.local:12004](http://www.iredium.local:12004)
    
2. Run Mailing Service's console
    ```sh
    docker exec -it mailing.development.iredium-docker.internal yarn console
    ```

3. Send your first email from console
    ```sh
    mail = new services.MailService()
    mail.send({ to: 'your.test.receiver.email@company.com', subject: 'this is a test email, please ignore', html: 'Hello world! love from Mailing Service.' })
    ```
    Check [Worker Dashboard](http://www.iredium.local:12004), you should see 1 completed task -- email has been sent.
