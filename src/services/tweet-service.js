import {inject} from 'aurelia-framework';
import Fixtures from './fixtures';
import AsyncHttpClient from './async-http-client';
import {LoginStatus} from './messages';
import {TotalUsers} from './messages';
import {TotalTweets} from './messages';
import {EventAggregator} from 'aurelia-event-aggregator';
import {TotalTweetsUpdatedMessage} from './messages';
import {SelectedUserUpdatedMessage} from './messages';
import {AuthenticatedUserUpdatedMessage} from './messages';
import {FollowerUpdatedMessage} from './messages';

@inject(Fixtures, EventAggregator, AsyncHttpClient)
export default class TweetService {

  totalTweets = 0;
  totalUsersCount = 0;
  tweets = [];
  users = [];
  selectedUser = {};
  authenticatedUser = {};
  follower = [];

  constructor(data, ea, ac) {
    this.methods = data.methods;
    this.ea = ea;
    this.ac = ac;
    this.ea.subscribe(AuthenticatedUserUpdatedMessage, message => {
      this.authenticatedUser = message.authenticatedUser;
    });
  }

  //API Methods

  getTweetsFromUser(userId) {
    this.ac.get('/api/users/' + userId + '/tweets').then(res => {
      this.tweets = res.content;
      this.ea.publish(new TotalTweetsUpdatedMessage(this.tweets));
    });
  }

  deleteSingleUser(userId) {
    return new Promise((resolve, reject) => {
      this.ac.delete('/api/users/' + userId).then(res => {
        if (res.statusCode === 204) {
          this.getGlobalTweets();
          this.getAllUsers();
          resolve(res.response);
        } else {
          reject(false);
        }
      });
    });
  }

  deleteSingleTweet(tweetId) {
    this.ac.delete('/api/tweets/' + tweetId).then(res => {
      this.getGlobalTweets();
      this.ea.publish(new TotalTweetsUpdatedMessage(this.tweets));
    });
  }

  deleteMultipleTweets(tweetsToDelete) {
    return new Promise((resolve, reject) => {
      this.ac.post('/api/tweets/multiple/' + JSON.stringify(tweetsToDelete)).then(result => {
        if (result.statusCode === 204) {
          this.getGlobalTweets();
          resolve(true);
        } else {
          reject(false);
        }
      });
    });
  }

  deleteMultipleUsers(usersToDelete) {
    return new Promise((resolve, reject) => {
      this.ac.post('/api/users/multiple/' + JSON.stringify(usersToDelete)).then(result => {
        if (result.statusCode === 204) {
          this.getGlobalTweets();
          this.getAllUsers();
          resolve(true);
        } else {
          reject(false);
        }
      });
    });
  }

  getAllUsers() {
    return new Promise((resolve, reject) => {
      this.ac.get('/api/users').then(res => {
        if (res.statusCode === 200) {
          this.users = res.content;
          this.totalUsersCount = this.users.length;
          this.ea.publish(new TotalUsers(this.totalUsersCount, this.users));
          resolve(res.response);
        } else {
          reject(false);
        }
      });
    });
  }

  getSingleUser(userId) {
    this.ac.get('/api/users/' + userId).then(res => {
      let user = res.content;
      this.selectedUser = user;
      this.ea.publish(new SelectedUserUpdatedMessage(this.selectedUser));
    });
  }

  saveSingleUser(user) {
    this.ac.post('/api/users', user).then(res => {
      this.selectedUser = res.content;
      this.ea.publish(new SelectedUserUpdatedMessage(this.selectedUser));
      this.ea.publish(new AuthenticatedUserUpdatedMessage(this.authenticatedUser));
    });
  }

  getGlobalTweets() {
    this.ac.get('/api/tweets').then(res => {
      this.tweets = res.content;
      this.ea.publish(new TotalTweetsUpdatedMessage(this.tweets));
      this.totalTweets = this.tweets.length;
      this.ea.publish(new TotalTweets(this.totalTweets));
    });
  }

  getFollowingUsers(followedUser) {
    this.ac.get('/api/users/' + followedUser._id + '/follower').then(res => {
      this.follower = res.content;
      this.ea.publish(new FollowerUpdatedMessage(this.follower));
    });
  }

  postTweet(tweet) {
    return new Promise((resolve, reject) => {
      this.ac.post('/api/tweets', tweet).then(res => {
        if (res.statusCode === 201) {
          this.tweets.unshift(res.content);
          this.totalTweets = this.totalTweets + 1;
          this.ea.publish(new TotalTweets(this.totalTweets));
          this.ea.publish(new TotalTweetsUpdatedMessage(this.tweets));
          resolve(res.response);
        } else {
          reject(false);
        }
      });
    });
  }

  getAuthenticatedUser() {
    this.ac.get('/api/users/authenticated').then(res => {
      const user = res.content;
      this.authenticatedUser = user;
      this.ea.publish(new AuthenticatedUserUpdatedMessage(this.authenticatedUser));
      this.getFollowingUsers(this.authenticatedUser);
    });
  }

  followUser(userToFollow) {
    this.ac.post('/api/friendships/follow', userToFollow).then(res => {
      this.authenticatedUser.following.push(userToFollow);
      this.getGlobalTweets();
    });
  }

  unfollowUser(userToUnfollow) {
    this.ac.post('/api/friendships/unfollow', userToUnfollow).then(res => {
      let index = -1;
      for (let i = 0, len = this.authenticatedUser.following.length; i < len; i++) {
        if (this.authenticatedUser.following[i]._id === userToUnfollow._id) {
          index = i;
          break;
        }
      }
      if (index > -1) {
        this.authenticatedUser.following.splice(index, 1);
      }
      this.getGlobalTweets();
    });
  }


  register(firstName, lastName, email, password, gender) {
    return new Promise((resolve, reject) => {
      const newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        gender: gender
      };
      this.ac.post('/api/users', newUser).then(res => {
        if (res.statusCode === 201) {
          resolve(JSON.parse(res.response));
        } else {
          reject('error creating user');
        }
      });
    }).catch(err => {
      reject(err);
    });
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

  //Permission based methods

  isAuthenticated() {
    return this.ac.isAuthenticated();
  }

  canDeleteTweet(tweet) {
    if (tweet.author._id === this.authenticatedUser._id || this.hasPermission(this.authenticatedUser, 'admin')) {
      return true;
    }
    return false;
  }

  canDeleteUser(user) {
    if (this.hasPermission(this.authenticatedUser, 'admin') && this.authenticatedUser._id !== user._id) {
      return true;
    }
    return false;
  }

  canEditUser(user) {
    if (this.authenticatedUser._id === user._id || this.hasPermission(this.authenticatedUser, 'admin')) {
      return true;
    }
    return false;
  }

  canFollow(user) {
    if (user._id !== this.authenticatedUser._id) {
      if (!this.authenticatedUser.following.filter(function(followedUser) {
        return followedUser._id === user._id;
      }).length > 0) {
        return true;
      }
    }
    return false;
  }

  canUnfollow(user) {
    if (user._id !== this.authenticatedUser._id) {
      if (this.authenticatedUser.following.filter(function(followedUser) {
        return followedUser._id === user._id;
      }).length > 0) {
        return true;
      }
    }
    return false;
  }

  hasPermission(user, permission) {
    if (user.role === permission) {
      return true;
    }
    return false;
  }
}
