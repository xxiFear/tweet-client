import {inject} from 'aurelia-framework';
import TweetService from '../../services/tweet-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import {DialogService} from 'aurelia-dialog';
import {DeleteConfirmationDialog} from './deleteConfirmationDialog';
import {TotalTweetsUpdatedMessage} from '../../services/messages';

@inject(TweetService, DialogService, EventAggregator)
export class Timeline {


  globalTweets = [];
  tweetInput = '';

  constructor(tweetService, dialogService, eventAggragator) {
    this.tweetService = tweetService;
    this.dialogService = dialogService;
    this.ea = eventAggragator;
    this.ea.subscribe(TotalTweetsUpdatedMessage, message => {
      this.globalTweets = message.totalTweets;
    });
  }

  activate(params) {
    let id = params.id;
    if (typeof id === 'undefined' || id === null) {
      this.tweetService.getGlobalTweets();
      this.globalTweets = this.tweetService.tweets;
    } else {
      this.tweetService.getTweetsFromUser(id);
      this.globalTweets = this.tweetService.tweets;
    }
  }

  showConfirmationDialog(tweet) {
    this.dialogService.open({ viewModel: DeleteConfirmationDialog, model: tweet}).then(response => {
      if (!response.wasCancelled) {
        console.log('good - ', response.output);
      } else {
        console.log('bad');
      }
      console.log(response.output);
    });
  }

  followUser(userToFollow) {
    console.log(`Following user: ${userToFollow.firstName}`);
    this.tweetService.followUser(userToFollow);
  }

  unfollowUser(userToUnfollow) {
    console.log(`Unfollowing user: ${userToUnfollow.firstName}`);
    this.tweetService.unfollowUser(userToUnfollow);
  }

  writeNewTweet(event) {
    console.log(`Writing new Tweet with content: ${this.tweetInput}`);
    this.tweetService.postTweet(this.tweetInput);
  }

  canFollow(user) {
    return this.tweetService.canFollow(user);
  }

  canUnfollow(user) {
    return this.tweetService.canUnfollow(user);
  }

  canDeleteTweet(tweet) {
    return this.tweetService.canDeleteTweet(tweet);
  }

}
