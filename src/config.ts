import { routes } from './config/routes'
import { databases } from './config/databases'
import { ConfigInterface } from '@iredium/butterfly/lib/types/config';
import { UserService } from '@iredium/butterfly/lib/services';
import { eventListenerMap } from './config/event_listener_map';

export const config: ConfigInterface = {
  userServiceClass: UserService,
  routes,
  databases,
  eventListenerMap,
  modules: [
  ]
}
