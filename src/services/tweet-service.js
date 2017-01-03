import {inject} from 'aurelia-framework';
import Fixtures from './fixtures';
import AsyncHttpClient from './async-http-client';
import {LoginStatus} from './messages';
import {TotalUsers} from './messages';
import {TotalTweets} from './messages';
import {EventAggregator} from 'aurelia-event-aggregator';
import {TotalTweetsUpdatedMessage} from './messages';

@inject(Fixtures, EventAggregator, AsyncHttpClient)
export default class TweetService {

  totalTweets = 0;
  totalUsers = 0;
  globalTweets = [];
  tweets = [];
  users = [];

  constructor(data, ea, ac) {
    this.methods = data.methods;
    this.ea = ea;
    this.ac = ac;
  }

  getTweetsFromUser(userId) {
    this.ac.get('/api/users/' + userId + '/tweets').then(res => {
      this.tweets = res.content;
    });
  }

  getAllUsers() {
    this.ac.get('/api/users').then(res => {
      this.users = res.content;
    });
    this.totalUsers = this.users.length;
  }

  getGlobalTweets() {
    this.ac.get('/api/tweets').then(res => {
      this.globalTweets =  res.content;
      this.ea.publish(new TotalTweetsUpdatedMessage(this.globalTweets));
      this.totalTweets = this.globalTweets.length;
      this.ea.publish(new TotalTweets(this.totalTweets));
    });
  }

  postTweet(tweetContent) {
    const tweet = {
      message: tweetContent
    };
    this.ac.post('/api/tweets', tweet).then(res => {
      this.globalTweets.push(res.content);
      this.totalTweets = this.totalTweets + 1;
      this.ea.publish(new TotalTweets(this.totalTweets));
      return res.content;
    });
  }

  register(firstName, lastName, email, password) {
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };
    this.users[email] = newUser;
  }

  login(email, password) {
    const user = {
      email: email,
      password: password
    };
    this.ac.authenticate('/api/users/authenticate', user);
  }

  logout() {
    const status = {
      success: false,
      message: ''
    };
    this.ac.clearAuthentication();
    this.ea.publish(new LoginStatus(status));
  }

  isAuthenticated() {
    return this.ac.isAuthenticated();
  }
}
