import {inject} from 'aurelia-framework';
import TweetService from '../../services/tweet-service';

@inject(TweetService)
export class Home {

  welcomeText = 'Welcome User'

  constructor(ts) {
    this.tweetService = ts;
  }

  activate() {
    this.tweetService.getAllUsers();
    this.tweetService.getGlobalTweets();
    this.tweetService.getAuthenticatedUser();
  }


}
