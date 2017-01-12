export class LoginStatus {
  constructor(status) {
    this.status = status;
  }
}

export class TotalUsers {
  constructor(usersCount, users) {
    this.usersCount = usersCount;
    this.users = users;
  }
}

export class TotalTweets {
  constructor(tweets) {
    this.tweets = tweets;
  }
}

export class TotalTweetsUpdatedMessage {
  constructor(tweets) {
    this.totalTweets = tweets;
  }
}

export class SelectedUserUpdatedMessage {
  constructor(user) {
    this.selectedUser = user;
  }
}

export class AuthenticatedUserUpdatedMessage {
  constructor(user) {
    this.authenticatedUser = user;
  }
}

export class FollowerUpdatedMessage {
  constructor(follower) {
    this.followers = follower;
  }
}
