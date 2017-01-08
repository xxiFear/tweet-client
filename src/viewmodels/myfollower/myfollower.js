import {inject} from 'aurelia-framework';
// import {TotalUsers} from '../../services/messages';
import {AuthenticatedUserUpdatedMessage} from '../../services/messages';
import {EventAggregator} from 'aurelia-event-aggregator';
import TweetService from '../../services/tweet-service';
import {FollowerUpdatedMessage} from '../../services/messages';


@inject(EventAggregator, TweetService)
export class Stats {

  authenticatedUser = {};
  followers = [];

  constructor(eventAggregator, tweetService) {
    this.ea = eventAggregator;
    this.tweetService = tweetService;
    this.ea.subscribe(AuthenticatedUserUpdatedMessage, message => {
      this.authenticatedUser = message.authenticatedUser;
    });
    this.ea.subscribe(FollowerUpdatedMessage, message => {
      this.followers = message.followers;
    });
  }

  activate(params) {
    this.tweetService.getAuthenticatedUser();
  }

}

