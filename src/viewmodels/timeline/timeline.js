import {inject} from 'aurelia-framework';
import TweetService from '../../services/tweet-service';

@inject(TweetService)
export class Timeline {

  globalTweets = [];
  tweetInput = '';

  constructor(ts) {
    this.tweetService = ts;
    this.tweetService.getGlobalTweets();
    this.globalTweets = this.tweetService.globalTweets;
  }

  writeNewTweet(event) {
    console.log(`Writing new Tweet with content: ${this.tweetInput}`);
    this.globalTweets.push({message: this.tweetInput});
    this.tweetService.postTweet(this.tweetInput);

    console.log(`Global Tweets size here is: ${this.globalTweets.length}`);
  }

}
