import { Butterfly } from '@iredium/butterfly'
import { config } from './config'

const butterfly = new Butterfly(config)

butterfly.hook('butterfly:ready', ({ port }: { port: number }): void => {
  console.log(`mailing is listening on port ${port}`)
})

butterfly.hook('butterfly:onError', (error: Error): void => {
  console.error(error)
})

export const app = butterfly
