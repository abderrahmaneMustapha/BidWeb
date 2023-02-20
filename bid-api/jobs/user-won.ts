import { JOBS } from '../app/config';
import {wonBid} from '../use-cases/bid';

const handleUserWonBid = () => {
  const maxTime= Date.now()
  const minTime = maxTime - ( Number(JOBS.bidWonGoBack) * 60 * 1000)
  wonBid({maxTime, minTime})
}

export default handleUserWonBid