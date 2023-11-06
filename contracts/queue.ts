import type { SendPushPayload } from "../app/Jobs/SendPush";
declare module '@ioc:Rlanz/Queue' {
  interface JobsList {
    'App/Jobs/SendPush' : SendPushPayload
  }
}
