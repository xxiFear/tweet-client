import {inject} from 'aurelia-framework';
import Fixtures from './fixtures';
import AsyncHttpClient from './async-http-client';
import {LoginStatus} from './messages';
import {TotalUsers} from './messages';
import {TotalTweets} from './messages';
import {EventAggregator} from 'aurelia-event-aggregator';
import {TotalTweetsUpdatedMessage} from './messages';
import {SelectedUserUpdatedMessage} from './messages';


@inject(Fixtures, EventAggregator, AsyncHttpClient)
export default class TweetService {

  totalTweets = 0;
  totalUsers = 0;
  tweets = [];
  users = [];
  selectedUser = [];

  constructor(data, ea, ac) {
    this.methods = data.methods;
    this.ea = ea;
    this.ac = ac;
  }

  getTweetsFromUser(userId) {
    this.ac.get('/api/users/' + userId + '/tweets').then(res => {
      this.tweets = res.content;
      this.ea.publish(new TotalTweetsUpdatedMessage(this.tweets));
    });
  }

  deleteSingleTweet(tweetId) {
    this.ac.delete('/api/tweets/' + tweetId).then(res => {
      this.getGlobalTweets();
      this.ea.publish(new TotalTweetsUpdatedMessage(this.tweets));
    });
  }

  getAllUsers() {
    this.ac.get('/api/users').then(res => {
      this.users = res.content;
      this.totalUsers = this.users.length;
      this.ea.publish(new TotalUsers(this.totalUsers));
    });
  }

  getSingleUser(userId) {
    this.ac.get('/api/users/' + userId).then(res => {
      this.selectedUser = res.content;
      this.ea.publish(new SelectedUserUpdatedMessage(this.selectedUser));
    });
  }

  getGlobalTweets() {
    this.ac.get('/api/tweets').then(res => {
      this.tweets =  res.content;
      this.ea.publish(new TotalTweetsUpdatedMessage(this.tweets));
      this.totalTweets = this.tweets.length;
      this.ea.publish(new TotalTweets(this.totalTweets));
    });
  }

  postTweet(tweetContent) {
    const tweet = {
      message: tweetContent
    };
    this.ac.post('/api/tweets', tweet).then(res => {
      this.tweets.unshift(res.content);
      this.totalTweets = this.totalTweets + 1;
      this.ea.publish(new TotalTweets(this.totalTweets));
      this.ea.publish(new TotalTweetsUpdatedMessage(this.tweets));
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
