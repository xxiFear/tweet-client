import {DialogController} from 'aurelia-dialog';

export class DeleteConfirmationDialog {
  static inject = [DialogController];

  tweet = { message: '' };

  constructor(controller) {
    this.controller = controller;
  }

  activate(tweet) {
    this.tweet = tweet;
  }

  deleteTweet(tweet) {
    //Todo Api Operation
    this.controller.ok(tweet);
  }
}
