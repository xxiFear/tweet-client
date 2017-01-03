import {DialogController} from 'aurelia-dialog';
import TweetService from '../../services/tweet-service';
import {inject} from 'aurelia-framework';

@inject(DialogController, TweetService)
export class DeleteConfirmationDialog {

  tweet = { message: '' };

  constructor(controller, tweetService) {
    this.controller = controller;
    this.tweetService = tweetService;
  }

  activate(tweet) {
    this.tweet = tweet;
  }

  deleteTweet(tweet) {
    this.tweetService.deleteSingleTweet(this.tweet._id);
    this.controller.ok(tweet);
  }
}
