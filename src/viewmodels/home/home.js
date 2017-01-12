import {inject} from 'aurelia-framework';
import TweetService from '../../services/tweet-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import {AuthenticatedUserUpdatedMessage} from '../../services/messages'

@inject(TweetService, EventAggregator)
export class Home {

  authenticatedUser = {};

  constructor(ts, ea) {
    this.tweetService = ts;
    this.eventAggregator = ea;
    this.eventAggregator.subscribe(AuthenticatedUserUpdatedMessage, message => {
      this.authenticatedUser = message.authenticatedUser;
    });
  }

  activate() {
    this.tweetService.getAllUsers().then(allUsers => {

    });
    this.tweetService.getGlobalTweets();
    this.tweetService.getAuthenticatedUser();
  }

  attached() {
  }

}
