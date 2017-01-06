import {inject} from 'aurelia-framework';
// import {TotalUsers} from '../../services/messages';
import {AuthenticatedUserUpdatedMessage} from '../../services/messages';
import {EventAggregator} from 'aurelia-event-aggregator';
import TweetService from '../../services/tweet-service';

@inject(EventAggregator, TweetService)
export class Stats {

  authenticatedUser = {};
  genders = ['Female', 'Male'];

  constructor(eventAggregator, tweetService) {
    this.ea = eventAggregator;
    this.tweetService = tweetService;
    this.ea.subscribe(AuthenticatedUserUpdatedMessage, message => {
      this.authenticatedUser = message.authenticatedUser;
    });
  }

  activate(params) {
    this.tweetService.getAuthenticatedUser();
  }

  saveUser() {
    this.tweetService.saveSingleUser(this.authenticatedUser);
  }

  canEditUser(user) {
    return this.tweetService.canEditUser(user);
  }

}

