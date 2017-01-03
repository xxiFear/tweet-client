import {inject} from 'aurelia-framework';
// import {TotalUsers} from '../../services/messages';
import {SelectedUserUpdatedMessage} from '../../services/messages';
import {EventAggregator} from 'aurelia-event-aggregator';
import TweetService from '../../services/tweet-service';

@inject(EventAggregator, TweetService)
export class Stats {

  selectedUser = {};

  constructor(eventAggregator, tweetService) {
    this.ea = eventAggregator;
    this.tweetService = tweetService;
    this.ea.subscribe(SelectedUserUpdatedMessage, message => {
      this.selectedUser = message.selectedUser;
    });
  }

  activate(params) {
    let id = params.id;
    if (typeof id !== 'undefined' || id !== null) {
      this.tweetService.getSingleUser(id);
    }
  }

}

