import * as Jobs from './jobs'
import { app } from './app'
import { createQueue, app as kueApp } from 'kue'
import { config } from './config'

const redisConfig = config.databases().redis
const redisHost = redisConfig.host
const redisPort = redisConfig.port
const queue = createQueue({ redis: `redis://${redisHost}:${redisPort}` })
const jobs = app.worker(queue, Jobs)

kueApp.listen(process.env.WORKER_DASHBOARD_PORT);

console.log(jobs)
