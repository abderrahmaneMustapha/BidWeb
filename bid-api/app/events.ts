import { autoBid, eventEmitter } from "../use-cases/bid";

eventEmitter.on('auto-bid', (data) => {
  autoBid(data)
})
