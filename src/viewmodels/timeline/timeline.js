import {inject} from 'aurelia-framework';
import TweetService from '../../services/tweet-service';

@inject(TweetService)
export class Timeline {

  globalTweets = [];
  tweetInput = '';

  constructor(ts) {
    this.ts = ts;
    ts.getGlobalTweets();
    this.globalTweets = ts.globalTweets;
  }

  writeNewTweet(event) {
    console.log(`Writing new Tweet with content: ${this.tweetInput}`);
    this.ts.writeNewTweet(this.tweetInput);
  }

}


