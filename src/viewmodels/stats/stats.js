import {inject} from 'aurelia-framework';
import {TotalUsers} from '../../services/messages';
import {TotalTweets} from '../../services/messages';
import {EventAggregator} from 'aurelia-event-aggregator';
import DonationService from '../../services/tweet-service';

@inject(EventAggregator, DonationService)
export class Stats {

  totalUsers = 0;
  totalTweets = 0;

  constructor(ea, ts) {
    this.ts = ts;
    ea.subscribe(TotalUsers, msg => {
      this.totalUsers = msg.users;
    });
    ea.subscribe(TotalTweets, msg => {
      this.totalTweets = msg.tweets;
    });
  }

  attached() {
    this.total = this.ts.total;
    this.totalUsers = this.ts.totalUsers;
    this.totalTweets = this.ts.totalTweets;
  }

}
