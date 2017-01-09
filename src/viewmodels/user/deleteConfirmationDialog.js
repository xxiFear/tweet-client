import {DialogController} from 'aurelia-dialog';
import TweetService from '../../services/tweet-service';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(DialogController, TweetService, Router)
export class DeleteConfirmationDialog {

  user = { firstName: '' };

  constructor(controller, tweetService, router) {
    this.router = router;
    this.controller = controller;
    this.tweetService = tweetService;
  }

  activate(user) {
    this.user = user;
  }

  deleteUser(user) {
    this.tweetService.deleteSingleUser(this.user._id).then(res => {
      this.controller.ok(user);
      this.router.navigate('timeline');
    });
  }
}
