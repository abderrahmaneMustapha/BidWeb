import cron from 'node-cron';
import handleUserWonBid from '../jobs/user-won';
import { JOBS } from './config';

cron.schedule(` */${JOBS.bidWonInterval} * * * * *`, () => {
  handleUserWonBid()
});