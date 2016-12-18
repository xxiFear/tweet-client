import {inject} from 'aurelia-framework';
import {TotalUsers} from '../../services/messages';
import {TotalTweets} from '../../services/messages';
import {EventAggregator} from 'aurelia-event-aggregator';
import TweetService from '../../services/tweet-service';

@inject(EventAggregator, TweetService)
export class Stats {

  totalUsers = 0;
  totalTweets = 0;

  constructor(ea, ts) {
    this.tweetService = ts;
    ea.subscribe(TotalUsers, msg => {
      this.totalUsers = msg.users;
    });
    ea.subscribe(TotalTweets, msg => {
      this.totalTweets = msg.tweets;
    });
  }

  attached() {
    this.total = this.tweetService.total;
    this.totalUsers = this.tweetService.totalUsers;
    this.totalTweets = this.tweetService.totalTweets;
  }

}
