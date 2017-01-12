define('app',['exports', 'aurelia-framework', 'aurelia-event-aggregator', './services/messages', './services/tweet-service'], function (exports, _aureliaFramework, _aureliaEventAggregator, _messages, _tweetService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var App = exports.App = (_dec = (0, _aureliaFramework.inject)(_tweetService2.default, _aureliaFramework.Aurelia, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function App(ts, au, ea) {
      var _this = this;

      _classCallCheck(this, App);

      this.au = au;
      this.ts = ts;
      ea.subscribe(_messages.LoginStatus, function (msg) {
        if (msg.status.success === true) {
          _this.router.navigate('/', { replace: true, trigger: false });
          _this.router.reset();
          _this.router.deactivate();
          au.setRoot('home').then(function () {
            _this.router.navigateToRoute('home');
          });
        } else {
          _this.router.navigate('/', { replace: true, trigger: false });
          _this.router.reset();
          _this.router.deactivate();
          au.setRoot('app').then(function () {
            _this.router.navigateToRoute('login');
          });
        }
      });
    }

    App.prototype.attached = function attached() {
      var _this2 = this;

      if (this.ts.isAuthenticated()) {
        this.au.setRoot('home').then(function () {
          _this2.router.navigateToRoute('home');
        });
      }
    };

    App.prototype.configureRouter = function configureRouter(config, router) {
      config.map([{ route: ['', 'login'], name: 'login', moduleId: 'viewmodels/login/login', nav: true, title: 'Login' }, { route: 'signup', name: 'signup', moduleId: 'viewmodels/signup/signup', nav: true, title: 'Signup' }]);

      config.mapUnknownRoutes(function (instruction) {
        return 'login';
      });

      this.router = router;
    };

    return App;
  }()) || _class);
});
define('authConfig',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var config = {
    baseUrl: 'http://localhost:4000',

    loginUrl: '/api/users/authenticate',

    tokenName: 'token',
    authHeader: 'Authorization',
    authToken: 'Bearer',
    storage: 'localStorage',

    loginRedirect: '#/welcome',
    logoutRedirect: '/'

  };

  exports.default = config;
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('home',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Home = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Home = exports.Home = (_dec = (0, _aureliaFramework.inject)(_aureliaFramework.Aurelia), _dec(_class = function () {
    function Home(au) {
      _classCallCheck(this, Home);

      this.aurelia = au;
    }

    Home.prototype.configureRouter = function configureRouter(config, router) {
      config.map([{
        route: ['', 'home'],
        name: 'Home',
        moduleId: 'viewmodels/home/home',
        nav: false,
        title: 'Home'
      }, {
        route: 'timeline/:id?',
        name: 'timeline',
        moduleId: 'viewmodels/timeline/timeline',
        nav: true,
        title: 'Timeline',
        href: '/timeline'
      }, {
        route: 'stats',
        name: 'stats',
        moduleId: 'viewmodels/stats/stats',
        nav: true,
        title: 'Stats'
      }, {
        route: 'dashboard',
        name: 'dashboard',
        moduleId: 'viewmodels/dashboard/dashboard',
        nav: true,
        title: 'Dashboard'
      }, {
        route: 'myprofile',
        name: 'myprofile',
        moduleId: 'viewmodels/myprofile/myprofile',
        nav: true,
        title: 'My Profile'
      }, {
        route: 'myfollower',
        name: 'myfollower',
        moduleId: 'viewmodels/myfollower/myfollower',
        nav: true,
        title: 'Follower/Following'
      }, {
        route: 'following/:id',
        name: 'following',
        moduleId: 'viewmodels/following/following',
        nav: false,
        title: 'Following'
      }, {
        route: 'socialGraph',
        name: 'socialGraph',
        moduleId: 'viewmodels/graph/graph',
        nav: true,
        title: 'Social Graph'
      }, {
        route: 'logout',
        name: 'logout',
        moduleId: 'viewmodels/logout/logout',
        nav: true,
        title: 'Logout'
      }, {
        route: 'userDetail/:id',
        name: 'userDetail',
        moduleId: 'viewmodels/user/user',
        nav: false,
        title: 'User'
      }]);

      config.mapUnknownRoutes(function (instruction) {
        return 'home';
      });

      this.router = router;
    };

    return Home;
  }()) || _class);
});
define('main',['exports', './environment', './authConfig'], function (exports, _environment, _authConfig) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  var _authConfig2 = _interopRequireDefault(_authConfig);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources').plugin('aurelia-dialog');


    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('services/async-http-client',['exports', 'aurelia-framework', 'aurelia-http-client', 'aurelia-event-aggregator', './fixtures', './messages'], function (exports, _aureliaFramework, _aureliaHttpClient, _aureliaEventAggregator, _fixtures, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _fixtures2 = _interopRequireDefault(_fixtures);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var AsyncHttpClient = (_dec = (0, _aureliaFramework.inject)(_aureliaHttpClient.HttpClient, _fixtures2.default, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function AsyncHttpClient(httpClient, fixtures, ea) {
      _classCallCheck(this, AsyncHttpClient);

      this.http = httpClient;
      this.http.configure(function (http) {
        http.withBaseUrl(fixtures.baseUrl);
      });
      this.ea = ea;
    }

    AsyncHttpClient.prototype.isAuthenticated = function isAuthenticated() {
      var authenticated = false;
      if (localStorage.donation !== 'null') {
        authenticated = true;
        this.http.configure(function (http) {
          var auth = JSON.parse(localStorage.donation);
          http.withHeader('Authorization', 'bearer ' + auth.token);
        });
      }
      return authenticated;
    };

    AsyncHttpClient.prototype.clearAuthentication = function clearAuthentication() {
      localStorage.donation = null;
      this.http.configure(function (configuration) {
        configuration.withHeader('Authorization', '');
      });
    };

    AsyncHttpClient.prototype.authenticate = function authenticate(url, user) {
      var _this = this;

      this.http.post(url, user).then(function (response) {
        var status = response.content;
        if (status.success) {
          localStorage.donation = JSON.stringify(response.content);
          _this.http.configure(function (configuration) {
            configuration.withHeader('Authorization', 'bearer ' + response.content.token);
          });
        }
        _this.ea.publish(new _messages.LoginStatus(status));
      }).catch(function (error) {
        var status = {
          success: false,
          message: 'service not available'
        };
        _this.ea.publish(new _messages.LoginStatus(status));
      });
    };

    AsyncHttpClient.prototype.get = function get(url) {
      return this.http.get(url);
    };

    AsyncHttpClient.prototype.post = function post(url, obj) {
      return this.http.post(url, obj);
    };

    AsyncHttpClient.prototype.delete = function _delete(url) {
      return this.http.delete(url);
    };

    return AsyncHttpClient;
  }()) || _class);
  exports.default = AsyncHttpClient;
});
define('services/fixtures',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Fixtures = function Fixtures() {
    _classCallCheck(this, Fixtures);

    this.baseUrl = 'http://localhost:4000';
  };

  exports.default = Fixtures;
});
define('services/messages',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var LoginStatus = exports.LoginStatus = function LoginStatus(status) {
    _classCallCheck(this, LoginStatus);

    this.status = status;
  };

  var TotalUsers = exports.TotalUsers = function TotalUsers(usersCount, users) {
    _classCallCheck(this, TotalUsers);

    this.usersCount = usersCount;
    this.users = users;
  };

  var TotalTweets = exports.TotalTweets = function TotalTweets(tweets) {
    _classCallCheck(this, TotalTweets);

    this.tweets = tweets;
  };

  var TotalTweetsUpdatedMessage = exports.TotalTweetsUpdatedMessage = function TotalTweetsUpdatedMessage(tweets) {
    _classCallCheck(this, TotalTweetsUpdatedMessage);

    this.totalTweets = tweets;
  };

  var SelectedUserUpdatedMessage = exports.SelectedUserUpdatedMessage = function SelectedUserUpdatedMessage(user) {
    _classCallCheck(this, SelectedUserUpdatedMessage);

    this.selectedUser = user;
  };

  var AuthenticatedUserUpdatedMessage = exports.AuthenticatedUserUpdatedMessage = function AuthenticatedUserUpdatedMessage(user) {
    _classCallCheck(this, AuthenticatedUserUpdatedMessage);

    this.authenticatedUser = user;
  };

  var FollowerUpdatedMessage = exports.FollowerUpdatedMessage = function FollowerUpdatedMessage(follower) {
    _classCallCheck(this, FollowerUpdatedMessage);

    this.followers = follower;
  };
});
define('services/tweet-service',['exports', 'aurelia-framework', './fixtures', './async-http-client', './messages', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _fixtures, _asyncHttpClient, _messages, _aureliaEventAggregator) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _fixtures2 = _interopRequireDefault(_fixtures);

  var _asyncHttpClient2 = _interopRequireDefault(_asyncHttpClient);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var TweetService = (_dec = (0, _aureliaFramework.inject)(_fixtures2.default, _aureliaEventAggregator.EventAggregator, _asyncHttpClient2.default), _dec(_class = function () {
    function TweetService(data, ea, ac) {
      var _this = this;

      _classCallCheck(this, TweetService);

      this.totalTweets = 0;
      this.totalUsersCount = 0;
      this.tweets = [];
      this.users = [];
      this.selectedUser = {};
      this.authenticatedUser = {};
      this.follower = [];

      this.methods = data.methods;
      this.ea = ea;
      this.ac = ac;
      this.ea.subscribe(_messages.AuthenticatedUserUpdatedMessage, function (message) {
        _this.authenticatedUser = message.authenticatedUser;
      });
    }

    TweetService.prototype.getTweetsFromUser = function getTweetsFromUser(userId) {
      var _this2 = this;

      this.ac.get('/api/users/' + userId + '/tweets').then(function (res) {
        _this2.tweets = res.content;
        _this2.ea.publish(new _messages.TotalTweetsUpdatedMessage(_this2.tweets));
      });
    };

    TweetService.prototype.deleteSingleUser = function deleteSingleUser(userId) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        _this3.ac.delete('/api/users/' + userId).then(function (res) {
          if (res.statusCode === 204) {
            _this3.getGlobalTweets();
            _this3.getAllUsers();
            resolve(res.response);
          } else {
            reject(false);
          }
        });
      });
    };

    TweetService.prototype.deleteSingleTweet = function deleteSingleTweet(tweetId) {
      var _this4 = this;

      this.ac.delete('/api/tweets/' + tweetId).then(function (res) {
        _this4.getGlobalTweets();
        _this4.ea.publish(new _messages.TotalTweetsUpdatedMessage(_this4.tweets));
      });
    };

    TweetService.prototype.deleteMultipleTweets = function deleteMultipleTweets(tweetsToDelete) {
      var _this5 = this;

      return new Promise(function (resolve, reject) {
        _this5.ac.post('/api/tweets/multiple/' + JSON.stringify(tweetsToDelete)).then(function (result) {
          if (result.statusCode === 204) {
            _this5.getGlobalTweets();
            resolve(true);
          } else {
            reject(false);
          }
        });
      });
    };

    TweetService.prototype.deleteMultipleUsers = function deleteMultipleUsers(usersToDelete) {
      var _this6 = this;

      return new Promise(function (resolve, reject) {
        _this6.ac.post('/api/users/multiple/' + JSON.stringify(usersToDelete)).then(function (result) {
          if (result.statusCode === 204) {
            _this6.getGlobalTweets();
            _this6.getAllUsers();
            resolve(true);
          } else {
            reject(false);
          }
        });
      });
    };

    TweetService.prototype.getAllUsers = function getAllUsers() {
      var _this7 = this;

      return new Promise(function (resolve, reject) {
        _this7.ac.get('/api/users').then(function (res) {
          if (res.statusCode === 200) {
            _this7.users = res.content;
            _this7.totalUsersCount = _this7.users.length;
            _this7.ea.publish(new _messages.TotalUsers(_this7.totalUsersCount, _this7.users));
            resolve(res.response);
          } else {
            reject(false);
          }
        });
      });
    };

    TweetService.prototype.getSingleUser = function getSingleUser(userId) {
      var _this8 = this;

      this.ac.get('/api/users/' + userId).then(function (res) {
        var user = res.content;
        _this8.selectedUser = user;
        _this8.ea.publish(new _messages.SelectedUserUpdatedMessage(_this8.selectedUser));
      });
    };

    TweetService.prototype.saveSingleUser = function saveSingleUser(user) {
      var _this9 = this;

      this.ac.post('/api/users', user).then(function (res) {
        _this9.selectedUser = res.content;
        _this9.ea.publish(new _messages.SelectedUserUpdatedMessage(_this9.selectedUser));
        _this9.ea.publish(new _messages.AuthenticatedUserUpdatedMessage(_this9.authenticatedUser));
      });
    };

    TweetService.prototype.getGlobalTweets = function getGlobalTweets() {
      var _this10 = this;

      this.ac.get('/api/tweets').then(function (res) {
        _this10.tweets = res.content;
        _this10.ea.publish(new _messages.TotalTweetsUpdatedMessage(_this10.tweets));
        _this10.totalTweets = _this10.tweets.length;
        _this10.ea.publish(new _messages.TotalTweets(_this10.totalTweets));
      });
    };

    TweetService.prototype.getFollowingUsers = function getFollowingUsers(followedUser) {
      var _this11 = this;

      this.ac.get('/api/users/' + followedUser._id + '/follower').then(function (res) {
        _this11.follower = res.content;
        _this11.ea.publish(new _messages.FollowerUpdatedMessage(_this11.follower));
      });
    };

    TweetService.prototype.postTweet = function postTweet(tweet) {
      var _this12 = this;

      return new Promise(function (resolve, reject) {
        _this12.ac.post('/api/tweets', tweet).then(function (res) {
          if (res.statusCode === 201) {
            _this12.tweets.unshift(res.content);
            _this12.totalTweets = _this12.totalTweets + 1;
            _this12.ea.publish(new _messages.TotalTweets(_this12.totalTweets));
            _this12.ea.publish(new _messages.TotalTweetsUpdatedMessage(_this12.tweets));
            resolve(res.response);
          } else {
            reject(false);
          }
        });
      });
    };

    TweetService.prototype.getAuthenticatedUser = function getAuthenticatedUser() {
      var _this13 = this;

      this.ac.get('/api/users/authenticated').then(function (res) {
        var user = res.content;
        _this13.authenticatedUser = user;
        _this13.ea.publish(new _messages.AuthenticatedUserUpdatedMessage(_this13.authenticatedUser));
        _this13.getFollowingUsers(_this13.authenticatedUser);
      });
    };

    TweetService.prototype.followUser = function followUser(userToFollow) {
      var _this14 = this;

      this.ac.post('/api/friendships/follow', userToFollow).then(function (res) {
        _this14.authenticatedUser.following.push(userToFollow);
        _this14.getGlobalTweets();
      });
    };

    TweetService.prototype.unfollowUser = function unfollowUser(userToUnfollow) {
      var _this15 = this;

      this.ac.post('/api/friendships/unfollow', userToUnfollow).then(function (res) {
        var index = -1;
        for (var i = 0, len = _this15.authenticatedUser.following.length; i < len; i++) {
          if (_this15.authenticatedUser.following[i]._id === userToUnfollow._id) {
            index = i;
            break;
          }
        }
        if (index > -1) {
          _this15.authenticatedUser.following.splice(index, 1);
        }
        _this15.getGlobalTweets();
      });
    };

    TweetService.prototype.register = function register(firstName, lastName, email, password, gender) {
      var _this16 = this;

      return new Promise(function (resolve, reject) {
        var newUser = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          gender: gender
        };
        _this16.ac.post('/api/users', newUser).then(function (res) {
          if (res.statusCode === 201) {
            resolve(JSON.parse(res.response));
          } else {
            reject('error creating user');
          }
        });
      }).catch(function (err) {
        console.log(err);
        reject(err);
      });
    };

    TweetService.prototype.login = function login(email, password) {
      var user = {
        email: email,
        password: password
      };
      this.ac.authenticate('/api/users/authenticate', user);
    };

    TweetService.prototype.logout = function logout() {
      var status = {
        success: false,
        message: ''
      };
      this.ac.clearAuthentication();
      this.ea.publish(new _messages.LoginStatus(status));
    };

    TweetService.prototype.isAuthenticated = function isAuthenticated() {
      return this.ac.isAuthenticated();
    };

    TweetService.prototype.canDeleteTweet = function canDeleteTweet(tweet) {
      if (tweet.author._id === this.authenticatedUser._id || this.hasPermission(this.authenticatedUser, 'admin')) {
        return true;
      }
      return false;
    };

    TweetService.prototype.canDeleteUser = function canDeleteUser(user) {
      if (this.hasPermission(this.authenticatedUser, 'admin') && this.authenticatedUser._id !== user._id) {
        return true;
      }
      return false;
    };

    TweetService.prototype.canEditUser = function canEditUser(user) {
      if (this.authenticatedUser._id === user._id || this.hasPermission(this.authenticatedUser, 'admin')) {
        return true;
      }
      return false;
    };

    TweetService.prototype.canFollow = function canFollow(user) {
      if (user._id !== this.authenticatedUser._id) {
        if (!this.authenticatedUser.following.filter(function (followedUser) {
          return followedUser._id === user._id;
        }).length > 0) {
          return true;
        }
      }
      return false;
    };

    TweetService.prototype.canUnfollow = function canUnfollow(user) {
      if (user._id !== this.authenticatedUser._id) {
        if (this.authenticatedUser.following.filter(function (followedUser) {
          return followedUser._id === user._id;
        }).length > 0) {
          return true;
        }
      }
      return false;
    };

    TweetService.prototype.hasPermission = function hasPermission(user, permission) {
      if (user.role === permission) {
        return true;
      }
      return false;
    };

    return TweetService;
  }()) || _class);
  exports.default = TweetService;
});
define('utils/date-format-joined',['exports', 'moment'], function (exports, _moment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DateFormatValueConverter = undefined;

  var _moment2 = _interopRequireDefault(_moment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var DateFormatValueConverter = exports.DateFormatValueConverter = function () {
    function DateFormatValueConverter() {
      _classCallCheck(this, DateFormatValueConverter);
    }

    DateFormatValueConverter.prototype.toView = function toView(value) {
      return (0, _moment2.default)(value).format('YYYY');
    };

    return DateFormatValueConverter;
  }();
});
define('utils/date-format',['exports', 'moment'], function (exports, _moment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DateFormatValueConverter = undefined;

  var _moment2 = _interopRequireDefault(_moment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var DateFormatValueConverter = exports.DateFormatValueConverter = function () {
    function DateFormatValueConverter() {
      _classCallCheck(this, DateFormatValueConverter);
    }

    DateFormatValueConverter.prototype.toView = function toView(value) {
      return (0, _moment2.default)(value).format('MMMM Do YYYY, h:mm:ss a');
    };

    return DateFormatValueConverter;
  }();
});
define('viewmodels/dashboard/dashboard',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Dashboard = exports.Dashboard = function Dashboard() {
    _classCallCheck(this, Dashboard);
  };
});
define('viewmodels/following/following',['exports', 'aurelia-framework', '../../services/messages', 'aurelia-event-aggregator', '../../services/tweet-service'], function (exports, _aureliaFramework, _messages, _aureliaEventAggregator, _tweetService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Stats = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Stats = exports.Stats = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, _tweetService2.default), _dec(_class = function () {
    function Stats(eventAggregator, tweetService) {
      var _this = this;

      _classCallCheck(this, Stats);

      this.selectedUser = {};

      this.ea = eventAggregator;
      this.tweetService = tweetService;
      this.ea.subscribe(_messages.SelectedUserUpdatedMessage, function (message) {
        _this.selectedUser = message.selectedUser;
      });
    }

    Stats.prototype.activate = function activate(params) {
      var id = params.id;
      if (typeof id !== 'undefined' && id !== null) {
        this.tweetService.getSingleUser(id);
      }
    };

    return Stats;
  }()) || _class);
});
define('viewmodels/home/home',['exports', 'aurelia-framework', '../../services/tweet-service', 'aurelia-event-aggregator', '../../services/messages'], function (exports, _aureliaFramework, _tweetService, _aureliaEventAggregator, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Home = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Home = exports.Home = (_dec = (0, _aureliaFramework.inject)(_tweetService2.default, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function Home(ts, ea) {
      var _this = this;

      _classCallCheck(this, Home);

      this.authenticatedUser = {};

      this.tweetService = ts;
      this.eventAggregator = ea;
      this.eventAggregator.subscribe(_messages.AuthenticatedUserUpdatedMessage, function (message) {
        _this.authenticatedUser = message.authenticatedUser;
      });
    }

    Home.prototype.activate = function activate() {
      this.tweetService.getAllUsers().then(function (allUsers) {});
      this.tweetService.getGlobalTweets();
      this.tweetService.getAuthenticatedUser();
    };

    Home.prototype.attached = function attached() {};

    return Home;
  }()) || _class);
});
define('viewmodels/login/login',['exports', 'aurelia-framework', '../../services/tweet-service'], function (exports, _aureliaFramework, _tweetService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Login = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Login = exports.Login = (_dec = (0, _aureliaFramework.inject)(_tweetService2.default), _dec(_class = function () {
    function Login(ts) {
      _classCallCheck(this, Login);

      this.email = 'matthias.hartmann@mail.de';
      this.password = 'secret';

      this.tweetService = ts;
      this.prompt = '';
    }

    Login.prototype.attached = function attached() {
      setUpFormValidator(this.login.bind(this), null);
    };

    Login.prototype.login = function login(e) {
      console.log('Trying to log in ' + this.email);
      this.tweetService.login(this.email, this.password);
    };

    return Login;
  }()) || _class);


  function setUpFormValidator(_onSuccess, _onFailure) {
    $('#loginForm').form({
      on: 'submit',
      inline: true,
      onSuccess: function onSuccess(event) {
        console.log('Successfully validated');
        event.preventDefault();
        _onSuccess();
      },
      onFailure: function onFailure() {
        console.log('Validation failed');
        _onFailure();
        return false;
      },
      fields: {
        mail: {
          identifier: 'mail',
          rules: [{
            type: 'empty',
            prompt: 'Mail must not be emtpy!'
          }, {
            type: 'email',
            prompt: 'Not a valid Email!'
          }]
        },
        password: {
          identifier: 'password',
          rules: [{
            type: 'empty',
            prompt: 'Password must not be emtpy!'
          }, {
            type: 'minLength[6]',
            prompt: 'Password must have at least 6 characters!'
          }]
        }
      }
    });
  }
});
define('viewmodels/graph/graph',['exports', 'aurelia-framework', 'aurelia-event-aggregator', '../../services/tweet-service', '../../services/messages', 'd3'], function (exports, _aureliaFramework, _aureliaEventAggregator, _tweetService, _messages, _d) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Stats = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  var d3 = _interopRequireWildcard(_d);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Stats = exports.Stats = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, _tweetService2.default), _dec(_class = function () {
    function Stats(eventAggregator, tweetService) {
      var _this = this;

      _classCallCheck(this, Stats);

      this.users = [];

      this.eventAggregator = eventAggregator;
      this.tweetService = tweetService;
      this.eventAggregator.subscribe(_messages.TotalUsers, function (message) {
        _this.users = message.users;
      });
    }

    Stats.prototype.activate = function activate(params) {};

    Stats.prototype.attached = function attached() {
      var _this2 = this;

      this.tweetService.getAllUsers().then(function (users) {
        var object = _this2.createNodesAndLinks(_this2.users);
        var nodes = object.nodes;
        var links = object.links;
        _this2.renderGraph(nodes, links);
      });
    };

    Stats.prototype.createNodesAndLinks = function createNodesAndLinks(users) {
      var nodes = {};
      var links = [];
      users.forEach(function (user) {
        nodes[user.firstName + user.lastName] = {
          id: user.firstName + user.lastName,
          firstName: user.firstName,
          lastName: user.lastName,
          icon: user.gender === 'Male' ? '/src/assets/avatars/christian.jpg' : '/src/assets/avatars/kristy.png'
        };
        if (user.following !== null) {
          user.following.forEach(function (followedUser) {
            links.push({
              source: user.firstName + user.lastName,
              target: followedUser.firstName + followedUser.lastName,
              type: 'blue'
            });
          });
        }
      });
      var object = { nodes: nodes, links: links };
      return object;
    };

    Stats.prototype.renderGraph = function renderGraph(nodes, links) {
      links.forEach(function (link) {
        link.source = nodes[link.source] || (nodes[link.source] = { name: link.source });
        link.target = nodes[link.target] || (nodes[link.target] = { name: link.target });
      });

      var width = 960;
      var height = 500;

      var force = d3.layout.force().nodes(d3.values(nodes)).links(links).size([width, height]).linkDistance(100).charge(-300).on('tick', tick).start();

      var svg = d3.select('#content').append('svg').attr('width', width).attr('height', height);

      svg.append('defs').selectAll('marker').data(['blue']).enter().append('marker').attr('id', function (d) {
        return d;
      }).attr('viewBox', '0 -5 10 10').attr('refX', 25).attr('refY', -3.5).attr('markerWidth', 8).attr('markerHeight', 8).attr('orient', 'auto').append('path').attr('d', 'M0,-5L10,0L0,5');

      var path = svg.append('g').selectAll('path').data(force.links()).enter().append('path').attr('class', function (d) {
        return 'link ' + d.type;
      }).attr('marker-end', function (d) {
        return 'url(#' + d.type + ')';
      });

      var defs = svg.append('svg:defs');

      defs.selectAll('.patterns').data(force.nodes()).enter().append('pattern').attr('id', function (d) {
        return d.id + '-icon';
      }).attr('width', '40').attr('height', '40').append('svg:image').attr('xlink:href', function (d) {
        return d.icon;
      }).attr('width', 40).attr('height', 40);


      var circle = svg.append('g').selectAll('circle').data(force.nodes()).enter().append('circle').attr('class', 'logo').attr('r', 20).style('fill', 'transparent').style('stroke', 'black').style('stroke-width', 0.25).style('fill', function (d) {
        return 'url(#' + d.id + '-icon)';
      }).call(force.drag);

      var text = svg.append('g').selectAll('text').data(force.nodes()).enter().append('text').attr('x', 20).attr('y', '.100em').text(function (d) {
        return d.firstName + ' ' + d.lastName;
      });

      function tick() {
        path.attr('d', linkArc);
        circle.attr('transform', transform);
        text.attr('transform', transform);
      }

      function linkArc(d) {
        var dx = d.target.x - d.source.x;
        var dy = d.target.y - d.source.y;
        var dr = Math.sqrt(dx * dx + dy * dy);
        return 'M' + d.source.x + ',' + d.source.y + 'A' + dr + ',' + dr + ' 0 0,1 ' + d.target.x + ',' + d.target.y;
      }

      function transform(d) {
        return 'translate(' + d.x + ',' + d.y + ')';
      }
    };

    return Stats;
  }()) || _class);
});
define('viewmodels/logout/logout',['exports', '../../services/tweet-service', 'aurelia-framework'], function (exports, _tweetService, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Logout = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Logout = exports.Logout = (_dec = (0, _aureliaFramework.inject)(_tweetService2.default), _dec(_class = function () {
    function Logout(donationService) {
      _classCallCheck(this, Logout);

      this.donationService = donationService;
    }

    Logout.prototype.logout = function logout() {
      console.log('Logging Out');
      this.donationService.logout();
    };

    return Logout;
  }()) || _class);
});
define('viewmodels/myfollower/myfollower',['exports', 'aurelia-framework', '../../services/messages', 'aurelia-event-aggregator', '../../services/tweet-service'], function (exports, _aureliaFramework, _messages, _aureliaEventAggregator, _tweetService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Stats = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Stats = exports.Stats = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, _tweetService2.default), _dec(_class = function () {
    function Stats(eventAggregator, tweetService) {
      var _this = this;

      _classCallCheck(this, Stats);

      this.authenticatedUser = {};
      this.followers = [];

      this.ea = eventAggregator;
      this.tweetService = tweetService;
      this.ea.subscribe(_messages.AuthenticatedUserUpdatedMessage, function (message) {
        _this.authenticatedUser = message.authenticatedUser;
      });
      this.ea.subscribe(_messages.FollowerUpdatedMessage, function (message) {
        _this.followers = message.followers;
      });
    }

    Stats.prototype.activate = function activate(params) {
      this.tweetService.getAuthenticatedUser();
    };

    return Stats;
  }()) || _class);
});
define('viewmodels/myprofile/myprofile',['exports', 'aurelia-framework', '../../services/messages', 'aurelia-event-aggregator', '../../services/tweet-service'], function (exports, _aureliaFramework, _messages, _aureliaEventAggregator, _tweetService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Stats = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Stats = exports.Stats = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, _tweetService2.default), _dec(_class = function () {
    function Stats(eventAggregator, tweetService) {
      var _this = this;

      _classCallCheck(this, Stats);

      this.authenticatedUser = {};
      this.genders = ['Female', 'Male'];

      this.ea = eventAggregator;
      this.tweetService = tweetService;
      this.ea.subscribe(_messages.AuthenticatedUserUpdatedMessage, function (message) {
        _this.authenticatedUser = message.authenticatedUser;
      });
    }

    Stats.prototype.activate = function activate(params) {
      this.tweetService.getAuthenticatedUser();
    };

    Stats.prototype.attached = function attached() {
      setUpFormValidator(this.saveUser.bind(this), null);
    };

    Stats.prototype.saveUser = function saveUser() {
      this.tweetService.saveSingleUser(this.authenticatedUser);
    };

    Stats.prototype.canEditUser = function canEditUser(user) {
      return this.tweetService.canEditUser(user);
    };

    Stats.prototype.hasPermission = function hasPermission(user, permission) {
      return this.tweetService.hasPermission(user, permission);
    };

    return Stats;
  }()) || _class);


  function setUpFormValidator(_onSuccess, _onFailure) {
    $('#myProfileEditForm').form({
      on: 'submit',
      inline: true,
      onSuccess: function onSuccess(event) {
        console.log('Successfully validated');
        event.preventDefault();
        _onSuccess();
      },
      onFailure: function onFailure() {
        console.log('Validation failed');
        _onFailure();
        return false;
      },
      fields: {
        firstname: {
          identifier: 'firstname',
          rules: [{
            type: 'empty',
            prompt: 'First name must not be emtpy!'
          }]
        },
        lastname: {
          identifier: 'lastname',
          rules: [{
            type: 'empty',
            prompt: 'Last name must not be emtpy!'
          }]
        },
        gender: ['Male', 'Female'],
        mail: {
          identifier: 'mail',
          rules: [{
            type: 'empty',
            prompt: 'Mail must not be emtpy!'
          }]
        },
        password: {
          identifier: 'password',
          rules: [{
            type: 'empty',
            prompt: 'Password must not be emtpy!'
          }]
        },
        description: {
          identifier: 'description',
          rules: [{
            type: 'maxLength[50]',
            prompt: 'Please choose a brief description of yourself (max {ruleValue} characters)'
          }]
        }
      }
    });
  }
});
define('viewmodels/report/report',['exports', 'aurelia-framework', '../../services/tweet-service'], function (exports, _aureliaFramework, _tweetService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Report = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Report = exports.Report = (_dec = (0, _aureliaFramework.inject)(_tweetService2.default), _dec(_class = function Report(ds) {
    _classCallCheck(this, Report);

    this.donations = [];

    this.donationService = ds;
    this.donations = this.donationService.donations;
  }) || _class);
});
define('viewmodels/signup/signup',['exports', 'aurelia-framework', '../../services/tweet-service'], function (exports, _aureliaFramework, _tweetService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Signup = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Signup = exports.Signup = (_dec = (0, _aureliaFramework.inject)(_tweetService2.default), _dec(_class = function () {
    function Signup(ts) {
      _classCallCheck(this, Signup);

      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.password = '';
      this.gender = '';
      this.genders = ['Male', 'Female'];

      this.tweetService = ts;
    }

    Signup.prototype.attached = function attached() {
      setUpFormValidator(this.register.bind(this), null);
    };

    Signup.prototype.register = function register(e) {
      var _this = this;

      this.tweetService.register(this.firstName, this.lastName, this.email, this.password, this.gender).then(function (newUser) {
        _this.tweetService.login(_this.email, _this.password);
      });
    };

    return Signup;
  }()) || _class);


  function setUpFormValidator(_onSuccess, _onFailure) {
    $('#registerForm').form({
      on: 'submit',
      inline: true,
      onSuccess: function onSuccess(event) {
        console.log('Successfully validated');
        event.preventDefault();
        _onSuccess();
      },
      onFailure: function onFailure() {
        console.log('Validation failed');
        _onFailure();
        return false;
      },
      fields: {
        firstname: {
          identifier: 'firstname',
          rules: [{
            type: 'empty',
            prompt: 'First name must not be emtpy!'
          }]
        },
        lastname: {
          identifier: 'lastname',
          rules: [{
            type: 'empty',
            prompt: 'Last name must not be emtpy!'
          }]
        },
        mail: {
          identifier: 'mail',
          rules: [{
            type: 'empty',
            prompt: 'Mail must not be emtpy!'
          }, {
            type: 'email',
            prompt: 'Not a valid Email!'
          }]
        },
        gender: ['Male', 'Female'],
        password: {
          identifier: 'password',
          rules: [{
            type: 'empty',
            prompt: 'Password must not be emtpy!'
          }, {
            type: 'minLength[6]',
            prompt: 'Password must have at least 6 characters!'
          }]
        },
        passwordConfirm: {
          identifier: 'passwordConfirm',
          rules: [{
            type: 'match[password]',
            prompt: 'Passwords do not match'
          }]
        }
      }
    });
  }
});
define('viewmodels/stats/stats',['exports', 'aurelia-framework', '../../services/messages', 'aurelia-event-aggregator', '../../services/tweet-service'], function (exports, _aureliaFramework, _messages, _aureliaEventAggregator, _tweetService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Stats = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Stats = exports.Stats = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, _tweetService2.default), _dec(_class = function () {
    function Stats(ea, ts) {
      var _this = this;

      _classCallCheck(this, Stats);

      this.totalUsers = 0;
      this.totalTweets = 0;

      this.tweetService = ts;
      ea.subscribe(_messages.TotalUsers, function (msg) {
        _this.totalUsers = msg.usersCount;
      });
      ea.subscribe(_messages.TotalTweets, function (msg) {
        _this.totalTweets = msg.tweets;
      });
    }

    Stats.prototype.attached = function attached() {
      this.total = this.tweetService.total;
      this.totalUsers = this.tweetService.totalUsersCount;
      this.totalTweets = this.tweetService.totalTweets;
    };

    return Stats;
  }()) || _class);
});
define('viewmodels/timeline/deleteConfirmationDialog',['exports', 'aurelia-dialog', '../../services/tweet-service', 'aurelia-framework'], function (exports, _aureliaDialog, _tweetService, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DeleteConfirmationDialog = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var DeleteConfirmationDialog = exports.DeleteConfirmationDialog = (_dec = (0, _aureliaFramework.inject)(_aureliaDialog.DialogController, _tweetService2.default), _dec(_class = function () {
    function DeleteConfirmationDialog(controller, tweetService) {
      _classCallCheck(this, DeleteConfirmationDialog);

      this.tweet = { message: '' };

      this.controller = controller;
      this.tweetService = tweetService;
    }

    DeleteConfirmationDialog.prototype.activate = function activate(tweet) {
      this.tweet = tweet;
    };

    DeleteConfirmationDialog.prototype.deleteTweet = function deleteTweet(tweet) {
      this.tweetService.deleteSingleTweet(this.tweet._id);
      this.controller.ok(tweet);
    };

    return DeleteConfirmationDialog;
  }()) || _class);
});
define('viewmodels/timeline/timeline',['exports', 'aurelia-framework', '../../services/tweet-service', 'aurelia-event-aggregator', 'aurelia-dialog', './deleteConfirmationDialog', '../../services/messages'], function (exports, _aureliaFramework, _tweetService, _aureliaEventAggregator, _aureliaDialog, _deleteConfirmationDialog, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Timeline = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Timeline = exports.Timeline = (_dec = (0, _aureliaFramework.inject)(_tweetService2.default, _aureliaDialog.DialogService, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function Timeline(tweetService, dialogService, eventAggragator) {
      var _this = this;

      _classCallCheck(this, Timeline);

      this.globalTweets = [];
      this.tweetInput = '';
      this.authenticatedUser = {};
      this.tweetImage = null;
      this.eventSubscriptions = [];
      this.tweetDeletionModeToggled = false;
      this.userDeletionModeToggled = false;

      this.tweetService = tweetService;
      this.dialogService = dialogService;
      this.ea = eventAggragator;
      this.eventSubscriptions.push(this.ea.subscribe(_messages.TotalTweetsUpdatedMessage, function (message) {
        _this.globalTweets = message.totalTweets;
      }));
      this.eventSubscriptions.push(this.ea.subscribe(_messages.AuthenticatedUserUpdatedMessage, function (message) {
        _this.authenticatedUser = message.authenticatedUser;
      }));
    }

    Timeline.prototype.activate = function activate(params) {
      if (params !== null && params.id) {
        var id = params.id;
        if (typeof id === 'undefined' || id === null) {
          this.tweetService.getGlobalTweets();
          this.globalTweets = this.tweetService.tweets;
        } else {
          this.tweetService.getTweetsFromUser(id);
          this.globalTweets = this.tweetService.tweets;
        }
      } else {
        this.tweetService.getGlobalTweets();
        this.globalTweets = this.tweetService.tweets;
      }

      this.tweetService.getAuthenticatedUser();
    };

    Timeline.prototype.attached = function attached() {
      initilizeUploadForm();
      setUpTextCounter();

      setUpFormValidator(this.postTweet.bind(this), this.reinitializeUploadForm.bind(this));
    };

    Timeline.prototype.detached = function detached() {
      this.eventSubscriptions.forEach(function (event) {
        event.dispose();
      });
    };

    Timeline.prototype.showConfirmationDialog = function showConfirmationDialog(tweet) {
      this.dialogService.open({ viewModel: _deleteConfirmationDialog.DeleteConfirmationDialog, model: tweet }).then(function (response) {
        if (!response.wasCancelled) {
          console.log('Successful', response.output);
        } else {
          console.log('Error');
        }
        console.log(response.output);
      });
    };

    Timeline.prototype.deleteMultipleTweets = function deleteMultipleTweets() {
      var tweetsToDelete = [];
      this.globalTweets.forEach(function (tweet) {
        if (tweet.deleteSelected) {
          tweetsToDelete.push(tweet._id);
        }
      });

      if (tweetsToDelete.length > 0) {
        this.tweetService.deleteMultipleTweets(tweetsToDelete).then(function (result) {}).catch(function (err) {
          console.log(err);
        });
      }
    };

    Timeline.prototype.deleteMultipleUsers = function deleteMultipleUsers() {
      var usersToDelete = [];
      this.globalTweets.forEach(function (tweet) {
        if (tweet.author.deleteSelected) {
          usersToDelete.push(tweet.author._id);
        }
      });

      if (usersToDelete.length > 0) {
        this.tweetService.deleteMultipleUsers(usersToDelete).then(function (result) {}).catch(function (err) {
          console.log(err);
        });
      }
    };

    Timeline.prototype.followUser = function followUser(userToFollow) {
      console.log('Following user: ' + userToFollow.firstName);
      this.tweetService.followUser(userToFollow);
    };

    Timeline.prototype.unfollowUser = function unfollowUser(userToUnfollow) {
      console.log('Unfollowing user: ' + userToUnfollow.firstName);
      this.tweetService.unfollowUser(userToUnfollow);
    };

    Timeline.prototype.refreshGlobalTweets = function refreshGlobalTweets() {
      this.tweetService.getGlobalTweets();
    };

    Timeline.prototype.toggleTweetDeletionMode = function toggleTweetDeletionMode() {
      if (this.tweetDeletionModeToggled) {
        this.tweetDeletionModeToggled = false;
        this.globalTweets.forEach(function (tweet) {
          tweet.deleteSelected = false;
        });
      } else {
        this.tweetDeletionModeToggled = true;
      }
    };

    Timeline.prototype.toggleUserDeletionMode = function toggleUserDeletionMode() {
      if (this.userDeletionModeToggled) {
        this.userDeletionModeToggled = false;
        this.globalTweets.forEach(function (tweet) {
          tweet.author.deleteSelected = false;
        });
      } else {
        this.userDeletionModeToggled = true;
      }
    };

    Timeline.prototype.canFollow = function canFollow(user) {
      return this.tweetService.canFollow(user);
    };

    Timeline.prototype.canUnfollow = function canUnfollow(user) {
      return this.tweetService.canUnfollow(user);
    };

    Timeline.prototype.canDeleteTweet = function canDeleteTweet(tweet) {
      return this.tweetService.canDeleteTweet(tweet);
    };

    Timeline.prototype.hasPermission = function hasPermission(user, permission) {
      return this.tweetService.hasPermission(user, permission);
    };

    Timeline.prototype.canDeleteUser = function canDeleteUser(user) {
      return this.tweetService.canDeleteUser(user);
    };

    Timeline.prototype.postTweet = function postTweet() {
      var _this2 = this;

      var tweet = {
        message: this.tweetInput
      };

      if (this.tweetImage && this.tweetImage.length > 0) {
        getBase64(this.tweetImage[0]).then(function (base64EncodedImage) {
          tweet.image = base64EncodedImage;
          _this2.tweetService.postTweet(tweet).then(function (postedTweet) {
            console.log('tweet posted');
            _this2.reinitializeUploadForm();
          }).catch(function (err) {
            console.log('tweet could not be posted');
          });
        }).catch(function (err) {
          console.log('error encoding image');
        });
      } else {
        this.tweetService.postTweet(tweet).then(function (postedTweet) {
          _this2.reinitializeUploadForm();
        }).catch(function (err) {
          console.log('tweet could not be posted');
        });
      }
    };

    Timeline.prototype.reinitializeUploadForm = function reinitializeUploadForm() {
      $('#tweetForm').removeClass('loading disabled');
      $('#tweetForm #imagePreview').attr('src', null);
      $('#imageSegment').attr('style', 'display: none');
      this.tweetImage = null;
      this.tweetInput = '';
    };

    return Timeline;
  }()) || _class);


  function getBase64(file) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function (readerEvent) {
        var binaryString = readerEvent.target.result;
        var base64String = btoa(binaryString);
        resolve(base64String);
      };
      reader.onerror = function (error) {
        reject(null);
      };
      reader.readAsBinaryString(file);
    });
  }

  function setUpFormValidator(_onSuccess, _onFailure) {
    $('#tweetForm').form({
      on: 'submit',
      inline: true,
      onSuccess: function onSuccess(event) {
        console.log('Successfully validated');
        event.preventDefault();
        _onSuccess();
      },
      onFailure: function onFailure() {
        _onFailure();
        return false;
      },
      fields: {
        tweetInput: {
          identifier: 'tweetInput',
          rules: [{
            type: 'empty',
            prompt: 'Empty message!'
          }, {
            type: 'maxLength[144]',
            prompt: 'Tweet too long, maximum of 144 chars'
          }]
        }
      }
    });
  }

  function initilizeUploadForm() {
    $('#tweetForm #camerabutton').on('click', function (e) {
      $('#tweetForm #fileInput', $(e.target).parents()).click();
    });

    $('#tweetForm #fileInput').on('change', function (input) {
      var $preview = $('#tweetForm #imagePreview');
      if (this.files && this.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
          $('#tweetForm #imagePreview').attr('src', e.target.result);
          $('#imageSegment').attr('style', 'display: block');
        };

        reader.readAsDataURL(this.files[0]);
      } else {
        $('#tweetForm #imagePreview').removeAttr('src');
        $('#imageSegment').attr('style', 'display: none');
      }
    });

    $('#tweetForm #imagePreview').on('click', function (e) {
      var $control = $('#tweetForm #fileInput');
      control.replaceWith($control.val('').clone(true));
      $('#tweetForm #imagePreview').removeAttr('src');
      $('#imageSegment').attr('style', 'display: none');
    });

    $('#tweetForm').on('submit', function () {
      $('#tweetForm').addClass('loading disabled');
    });
  }

  function setUpTextCounter() {
    $('#tweetInput').on('propertychange input textInput', function () {
      var left = 140 - $(this).val().length;
      if (left < 0) {
        left = 0;
      }
      $('#counter').text('Characters left: ' + left);
    });
  }
});
define('viewmodels/user/deleteConfirmationDialog',['exports', 'aurelia-dialog', '../../services/tweet-service', 'aurelia-framework', 'aurelia-router'], function (exports, _aureliaDialog, _tweetService, _aureliaFramework, _aureliaRouter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DeleteConfirmationDialog = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var DeleteConfirmationDialog = exports.DeleteConfirmationDialog = (_dec = (0, _aureliaFramework.inject)(_aureliaDialog.DialogController, _tweetService2.default, _aureliaRouter.Router), _dec(_class = function () {
    function DeleteConfirmationDialog(controller, tweetService, router) {
      _classCallCheck(this, DeleteConfirmationDialog);

      this.user = { firstName: '' };

      this.router = router;
      this.controller = controller;
      this.tweetService = tweetService;
    }

    DeleteConfirmationDialog.prototype.activate = function activate(user) {
      this.user = user;
    };

    DeleteConfirmationDialog.prototype.deleteUser = function deleteUser(user) {
      var _this = this;

      this.tweetService.deleteSingleUser(this.user._id).then(function (res) {
        _this.controller.ok(user);
        _this.router.navigate('timeline');
      });
    };

    return DeleteConfirmationDialog;
  }()) || _class);
});
define('viewmodels/user/user',['exports', 'aurelia-framework', '../../services/messages', 'aurelia-event-aggregator', '../../services/tweet-service', 'aurelia-dialog', './deleteConfirmationDialog'], function (exports, _aureliaFramework, _messages, _aureliaEventAggregator, _tweetService, _aureliaDialog, _deleteConfirmationDialog) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Stats = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Stats = exports.Stats = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, _aureliaDialog.DialogService, _tweetService2.default), _dec(_class = function () {
    function Stats(eventAggregator, dialogService, tweetService) {
      var _this = this;

      _classCallCheck(this, Stats);

      this.selectedUser = {};
      this.genders = ['Female', 'Male'];
      this.numberOfFollowedUsers = 0;

      this.ea = eventAggregator;
      this.dialogService = dialogService;
      this.tweetService = tweetService;
      this.ea.subscribe(_messages.SelectedUserUpdatedMessage, function (message) {
        _this.selectedUser = message.selectedUser;
      });
    }

    Stats.prototype.activate = function activate(params) {
      var id = params.id;
      if (typeof id !== 'undefined' || id !== null) {
        this.tweetService.getSingleUser(id);
      }
    };

    Stats.prototype.attached = function attached() {
      setUpFormValidator(this.saveUser.bind(this), null);
    };

    Stats.prototype.showConfirmationDialog = function showConfirmationDialog(user) {
      this.dialogService.open({ viewModel: _deleteConfirmationDialog.DeleteConfirmationDialog, model: user }).then(function (response) {
        if (!response.wasCancelled) {
          console.log('Successful', response.output);
        } else {
          console.log('Error');
        }
        console.log(response.output);
      });
    };

    Stats.prototype.saveUser = function saveUser() {
      this.tweetService.saveSingleUser(this.selectedUser);
    };

    Stats.prototype.canEditUser = function canEditUser(user) {
      return this.tweetService.canEditUser(user);
    };

    Stats.prototype.canDeleteUser = function canDeleteUser(user) {
      return this.tweetService.canDeleteUser(user);
    };

    return Stats;
  }()) || _class);


  function setUpFormValidator(_onSuccess, _onFailure) {
    $('#userEditForm').form({
      on: 'submit',
      inline: true,
      onSuccess: function onSuccess(event) {
        console.log('Successfully validated');
        event.preventDefault();
        _onSuccess();
      },
      onFailure: function onFailure() {
        console.log('Validation failed');
        _onFailure();
        return false;
      },
      fields: {
        firstname: {
          identifier: 'firstname',
          rules: [{
            type: 'empty',
            prompt: 'First name must not be emtpy!'
          }]
        },
        lastname: {
          identifier: 'lastname',
          rules: [{
            type: 'empty',
            prompt: 'Last name must not be emtpy!'
          }]
        },
        gender: ['Male', 'Female'],
        mail: {
          identifier: 'mail',
          rules: [{
            type: 'empty',
            prompt: 'Mail must not be emtpy!'
          }]
        },
        password: {
          identifier: 'password',
          rules: [{
            type: 'empty',
            prompt: 'Password must not be emtpy!'
          }]
        }
      },
      description: {
        identifier: 'description',
        rules: [{
          type: 'maxLength[50]',
          prompt: 'Please choose a brief description of yourself (max {ruleValue} characters)'
        }]
      }
    });
  }
});
define('aurelia-dialog/ai-dialog',['exports', 'aurelia-templating'], function (exports, _aureliaTemplating) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AiDialog = undefined;

  

  var _dec, _dec2, _class;

  var AiDialog = exports.AiDialog = (_dec = (0, _aureliaTemplating.customElement)('ai-dialog'), _dec2 = (0, _aureliaTemplating.inlineView)('\n  <template>\n    <slot></slot>\n  </template>\n'), _dec(_class = _dec2(_class = function AiDialog() {
    
  }) || _class) || _class);
});
define('aurelia-dialog/ai-dialog-header',['exports', 'aurelia-templating', './dialog-controller'], function (exports, _aureliaTemplating, _dialogController) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AiDialogHeader = undefined;

  

  var _dec, _dec2, _class, _class2, _temp;

  var AiDialogHeader = exports.AiDialogHeader = (_dec = (0, _aureliaTemplating.customElement)('ai-dialog-header'), _dec2 = (0, _aureliaTemplating.inlineView)('\n  <template>\n    <button type="button" class="dialog-close" aria-label="Close" if.bind="!controller.settings.lock" click.trigger="controller.cancel()">\n      <span aria-hidden="true">&times;</span>\n    </button>\n\n    <div class="dialog-header-content">\n      <slot></slot>\n    </div>\n  </template>\n'), _dec(_class = _dec2(_class = (_temp = _class2 = function AiDialogHeader(controller) {
    

    this.controller = controller;
  }, _class2.inject = [_dialogController.DialogController], _temp)) || _class) || _class);
});
define('aurelia-dialog/dialog-controller',['exports', './lifecycle', './dialog-result'], function (exports, _lifecycle, _dialogResult) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DialogController = undefined;

  

  var DialogController = exports.DialogController = function () {
    function DialogController(renderer, settings, resolve, reject) {
      

      this.renderer = renderer;
      this.settings = settings;
      this._resolve = resolve;
      this._reject = reject;
    }

    DialogController.prototype.ok = function ok(output) {
      return this.close(true, output);
    };

    DialogController.prototype.cancel = function cancel(output) {
      return this.close(false, output);
    };

    DialogController.prototype.error = function error(message) {
      var _this = this;

      return (0, _lifecycle.invokeLifecycle)(this.viewModel, 'deactivate').then(function () {
        return _this.renderer.hideDialog(_this);
      }).then(function () {
        _this.controller.unbind();
        _this._reject(message);
      });
    };

    DialogController.prototype.close = function close(ok, output) {
      var _this2 = this;

      if (this._closePromise) {
        return this._closePromise;
      }

      this._closePromise = (0, _lifecycle.invokeLifecycle)(this.viewModel, 'canDeactivate').then(function (canDeactivate) {
        if (canDeactivate) {
          return (0, _lifecycle.invokeLifecycle)(_this2.viewModel, 'deactivate').then(function () {
            return _this2.renderer.hideDialog(_this2);
          }).then(function () {
            var result = new _dialogResult.DialogResult(!ok, output);
            _this2.controller.unbind();
            _this2._resolve(result);
            return result;
          });
        }

        _this2._closePromise = undefined;
      }, function (e) {
        _this2._closePromise = undefined;
        return Promise.reject(e);
      });

      return this._closePromise;
    };

    return DialogController;
  }();
});
define('aurelia-dialog/lifecycle',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.invokeLifecycle = invokeLifecycle;
  function invokeLifecycle(instance, name, model) {
    if (typeof instance[name] === 'function') {
      var result = instance[name](model);

      if (result instanceof Promise) {
        return result;
      }

      if (result !== null && result !== undefined) {
        return Promise.resolve(result);
      }

      return Promise.resolve(true);
    }

    return Promise.resolve(true);
  }
});
define('aurelia-dialog/dialog-result',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  

  var DialogResult = exports.DialogResult = function DialogResult(cancelled, output) {
    

    this.wasCancelled = false;

    this.wasCancelled = cancelled;
    this.output = output;
  };
});
define('aurelia-dialog/ai-dialog-body',['exports', 'aurelia-templating'], function (exports, _aureliaTemplating) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AiDialogBody = undefined;

  

  var _dec, _dec2, _class;

  var AiDialogBody = exports.AiDialogBody = (_dec = (0, _aureliaTemplating.customElement)('ai-dialog-body'), _dec2 = (0, _aureliaTemplating.inlineView)('\n  <template>\n    <slot></slot>\n  </template>\n'), _dec(_class = _dec2(_class = function AiDialogBody() {
    
  }) || _class) || _class);
});
define('aurelia-dialog/ai-dialog-footer',['exports', 'aurelia-templating', './dialog-controller'], function (exports, _aureliaTemplating, _dialogController) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AiDialogFooter = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _class3, _temp;

  var AiDialogFooter = exports.AiDialogFooter = (_dec = (0, _aureliaTemplating.customElement)('ai-dialog-footer'), _dec2 = (0, _aureliaTemplating.inlineView)('\n  <template>\n    <slot></slot>\n\n    <template if.bind="buttons.length > 0">\n      <button type="button" class="btn btn-default" repeat.for="button of buttons" click.trigger="close(button)">${button}</button>\n    </template>\n  </template>\n'), _dec(_class = _dec2(_class = (_class2 = (_temp = _class3 = function () {
    function AiDialogFooter(controller) {
      

      _initDefineProp(this, 'buttons', _descriptor, this);

      _initDefineProp(this, 'useDefaultButtons', _descriptor2, this);

      this.controller = controller;
    }

    AiDialogFooter.prototype.close = function close(buttonValue) {
      if (AiDialogFooter.isCancelButton(buttonValue)) {
        this.controller.cancel(buttonValue);
      } else {
        this.controller.ok(buttonValue);
      }
    };

    AiDialogFooter.prototype.useDefaultButtonsChanged = function useDefaultButtonsChanged(newValue) {
      if (newValue) {
        this.buttons = ['Cancel', 'Ok'];
      }
    };

    AiDialogFooter.isCancelButton = function isCancelButton(value) {
      return value === 'Cancel';
    };

    return AiDialogFooter;
  }(), _class3.inject = [_dialogController.DialogController], _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'buttons', [_aureliaTemplating.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return [];
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'useDefaultButtons', [_aureliaTemplating.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return false;
    }
  })), _class2)) || _class) || _class);
});
define('aurelia-dialog/attach-focus',['exports', 'aurelia-templating'], function (exports, _aureliaTemplating) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AttachFocus = undefined;

  

  var _dec, _class, _class2, _temp;

  var AttachFocus = exports.AttachFocus = (_dec = (0, _aureliaTemplating.customAttribute)('attach-focus'), _dec(_class = (_temp = _class2 = function () {
    function AttachFocus(element) {
      

      this.value = true;

      this.element = element;
    }

    AttachFocus.prototype.attached = function attached() {
      if (this.value && this.value !== 'false') {
        this.element.focus();
      }
    };

    AttachFocus.prototype.valueChanged = function valueChanged(newValue) {
      this.value = newValue;
    };

    return AttachFocus;
  }(), _class2.inject = [Element], _temp)) || _class);
});
define('aurelia-dialog/dialog-configuration',['exports', './renderer', './dialog-renderer', './dialog-options', 'aurelia-pal'], function (exports, _renderer, _dialogRenderer, _dialogOptions, _aureliaPal) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DialogConfiguration = undefined;

  

  var defaultRenderer = _dialogRenderer.DialogRenderer;

  var resources = {
    'ai-dialog': './ai-dialog',
    'ai-dialog-header': './ai-dialog-header',
    'ai-dialog-body': './ai-dialog-body',
    'ai-dialog-footer': './ai-dialog-footer',
    'attach-focus': './attach-focus'
  };

  var defaultCSSText = 'ai-dialog-container,ai-dialog-overlay{position:fixed;top:0;right:0;bottom:0;left:0}ai-dialog-overlay{opacity:0}ai-dialog-overlay.active{opacity:1}ai-dialog-container{display:block;transition:opacity .2s linear;opacity:0;overflow-x:hidden;overflow-y:auto;-webkit-overflow-scrolling:touch}ai-dialog-container.active{opacity:1}ai-dialog-container>div{padding:30px}ai-dialog-container>div>div{display:block;min-width:300px;width:-moz-fit-content;width:-webkit-fit-content;width:fit-content;height:-moz-fit-content;height:-webkit-fit-content;height:fit-content;margin:auto}ai-dialog-container,ai-dialog-container>div,ai-dialog-container>div>div{outline:0}ai-dialog{display:table;box-shadow:0 5px 15px rgba(0,0,0,.5);border:1px solid rgba(0,0,0,.2);border-radius:5px;padding:3;min-width:300px;width:-moz-fit-content;width:-webkit-fit-content;width:fit-content;height:-moz-fit-content;height:-webkit-fit-content;height:fit-content;margin:auto;border-image-source:initial;border-image-slice:initial;border-image-width:initial;border-image-outset:initial;border-image-repeat:initial;background:#fff}ai-dialog>ai-dialog-header{display:block;padding:16px;border-bottom:1px solid #e5e5e5}ai-dialog>ai-dialog-header>button{float:right;border:none;display:block;width:32px;height:32px;background:0 0;font-size:22px;line-height:16px;margin:-14px -16px 0 0;padding:0;cursor:pointer}ai-dialog>ai-dialog-body{display:block;padding:16px}ai-dialog>ai-dialog-footer{display:block;padding:6px;border-top:1px solid #e5e5e5;text-align:right}ai-dialog>ai-dialog-footer button{color:#333;background-color:#fff;padding:6px 12px;font-size:14px;text-align:center;white-space:nowrap;vertical-align:middle;-ms-touch-action:manipulation;touch-action:manipulation;cursor:pointer;background-image:none;border:1px solid #ccc;border-radius:4px;margin:5px 0 5px 5px}ai-dialog>ai-dialog-footer button:disabled{cursor:default;opacity:.45}ai-dialog>ai-dialog-footer button:hover:enabled{color:#333;background-color:#e6e6e6;border-color:#adadad}.ai-dialog-open{overflow:hidden}';

  var DialogConfiguration = exports.DialogConfiguration = function () {
    function DialogConfiguration(aurelia) {
      

      this.aurelia = aurelia;
      this.settings = _dialogOptions.dialogOptions;
      this.resources = [];
      this.cssText = defaultCSSText;
      this.renderer = defaultRenderer;
    }

    DialogConfiguration.prototype.useDefaults = function useDefaults() {
      return this.useRenderer(defaultRenderer).useCSS(defaultCSSText).useStandardResources();
    };

    DialogConfiguration.prototype.useStandardResources = function useStandardResources() {
      return this.useResource('ai-dialog').useResource('ai-dialog-header').useResource('ai-dialog-body').useResource('ai-dialog-footer').useResource('attach-focus');
    };

    DialogConfiguration.prototype.useResource = function useResource(resourceName) {
      this.resources.push(resourceName);
      return this;
    };

    DialogConfiguration.prototype.useRenderer = function useRenderer(renderer, settings) {
      this.renderer = renderer;
      this.settings = Object.assign(this.settings, settings || {});
      return this;
    };

    DialogConfiguration.prototype.useCSS = function useCSS(cssText) {
      this.cssText = cssText;
      return this;
    };

    DialogConfiguration.prototype._apply = function _apply() {
      var _this = this;

      this.aurelia.transient(_renderer.Renderer, this.renderer);
      this.resources.forEach(function (resourceName) {
        return _this.aurelia.globalResources(resources[resourceName]);
      });

      if (this.cssText) {
        _aureliaPal.DOM.injectStyles(this.cssText);
      }
    };

    return DialogConfiguration;
  }();
});
define('aurelia-dialog/renderer',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  

  var Renderer = exports.Renderer = function () {
    function Renderer() {
      
    }

    Renderer.prototype.getDialogContainer = function getDialogContainer() {
      throw new Error('DialogRenderer must implement getDialogContainer().');
    };

    Renderer.prototype.showDialog = function showDialog(dialogController) {
      throw new Error('DialogRenderer must implement showDialog().');
    };

    Renderer.prototype.hideDialog = function hideDialog(dialogController) {
      throw new Error('DialogRenderer must implement hideDialog().');
    };

    return Renderer;
  }();
});
define('aurelia-dialog/dialog-renderer',['exports', 'aurelia-pal', 'aurelia-dependency-injection'], function (exports, _aureliaPal, _aureliaDependencyInjection) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DialogRenderer = undefined;

  

  var _dec, _class;

  var containerTagName = 'ai-dialog-container';
  var overlayTagName = 'ai-dialog-overlay';
  var transitionEvent = function () {
    var transition = null;

    return function () {
      if (transition) return transition;

      var t = void 0;
      var el = _aureliaPal.DOM.createElement('fakeelement');
      var transitions = {
        'transition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'MozTransition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd'
      };
      for (t in transitions) {
        if (el.style[t] !== undefined) {
          transition = transitions[t];
          return transition;
        }
      }
    };
  }();

  var DialogRenderer = exports.DialogRenderer = (_dec = (0, _aureliaDependencyInjection.transient)(), _dec(_class = function () {
    function DialogRenderer() {
      var _this = this;

      

      this._escapeKeyEventHandler = function (e) {
        if (e.keyCode === 27) {
          var top = _this._dialogControllers[_this._dialogControllers.length - 1];
          if (top && top.settings.lock !== true) {
            top.cancel();
          }
        }
      };
    }

    DialogRenderer.prototype.getDialogContainer = function getDialogContainer() {
      return _aureliaPal.DOM.createElement('div');
    };

    DialogRenderer.prototype.showDialog = function showDialog(dialogController) {
      var _this2 = this;

      var settings = dialogController.settings;
      var body = _aureliaPal.DOM.querySelectorAll('body')[0];
      var wrapper = document.createElement('div');

      this.modalOverlay = _aureliaPal.DOM.createElement(overlayTagName);
      this.modalContainer = _aureliaPal.DOM.createElement(containerTagName);
      this.anchor = dialogController.slot.anchor;
      wrapper.appendChild(this.anchor);
      this.modalContainer.appendChild(wrapper);

      this.stopPropagation = function (e) {
        e._aureliaDialogHostClicked = true;
      };
      this.closeModalClick = function (e) {
        if (!settings.lock && !e._aureliaDialogHostClicked) {
          dialogController.cancel();
        } else {
          return false;
        }
      };

      dialogController.centerDialog = function () {
        if (settings.centerHorizontalOnly) return;
        centerDialog(_this2.modalContainer);
      };

      this.modalOverlay.style.zIndex = settings.startingZIndex;
      this.modalContainer.style.zIndex = settings.startingZIndex;

      var lastContainer = Array.from(body.querySelectorAll(containerTagName)).pop();

      if (lastContainer) {
        lastContainer.parentNode.insertBefore(this.modalContainer, lastContainer.nextSibling);
        lastContainer.parentNode.insertBefore(this.modalOverlay, lastContainer.nextSibling);
      } else {
        body.insertBefore(this.modalContainer, body.firstChild);
        body.insertBefore(this.modalOverlay, body.firstChild);
      }

      if (!this._dialogControllers.length) {
        _aureliaPal.DOM.addEventListener('keyup', this._escapeKeyEventHandler);
      }

      this._dialogControllers.push(dialogController);

      dialogController.slot.attached();

      if (typeof settings.position === 'function') {
        settings.position(this.modalContainer, this.modalOverlay);
      } else {
        dialogController.centerDialog();
      }

      this.modalContainer.addEventListener('click', this.closeModalClick);
      this.anchor.addEventListener('click', this.stopPropagation);

      return new Promise(function (resolve) {
        var renderer = _this2;
        if (settings.ignoreTransitions) {
          resolve();
        } else {
          _this2.modalContainer.addEventListener(transitionEvent(), onTransitionEnd);
        }

        _this2.modalOverlay.classList.add('active');
        _this2.modalContainer.classList.add('active');
        body.classList.add('ai-dialog-open');

        function onTransitionEnd(e) {
          if (e.target !== renderer.modalContainer) {
            return;
          }
          renderer.modalContainer.removeEventListener(transitionEvent(), onTransitionEnd);
          resolve();
        }
      });
    };

    DialogRenderer.prototype.hideDialog = function hideDialog(dialogController) {
      var _this3 = this;

      var settings = dialogController.settings;
      var body = _aureliaPal.DOM.querySelectorAll('body')[0];

      this.modalContainer.removeEventListener('click', this.closeModalClick);
      this.anchor.removeEventListener('click', this.stopPropagation);

      var i = this._dialogControllers.indexOf(dialogController);
      if (i !== -1) {
        this._dialogControllers.splice(i, 1);
      }

      if (!this._dialogControllers.length) {
        _aureliaPal.DOM.removeEventListener('keyup', this._escapeKeyEventHandler);
      }

      return new Promise(function (resolve) {
        var renderer = _this3;
        if (settings.ignoreTransitions) {
          resolve();
        } else {
          _this3.modalContainer.addEventListener(transitionEvent(), onTransitionEnd);
        }

        _this3.modalOverlay.classList.remove('active');
        _this3.modalContainer.classList.remove('active');

        function onTransitionEnd() {
          renderer.modalContainer.removeEventListener(transitionEvent(), onTransitionEnd);
          resolve();
        }
      }).then(function () {
        body.removeChild(_this3.modalOverlay);
        body.removeChild(_this3.modalContainer);
        dialogController.slot.detached();

        if (!_this3._dialogControllers.length) {
          body.classList.remove('ai-dialog-open');
        }

        return Promise.resolve();
      });
    };

    return DialogRenderer;
  }()) || _class);


  DialogRenderer.prototype._dialogControllers = [];

  function centerDialog(modalContainer) {
    var child = modalContainer.children[0];
    var vh = Math.max(_aureliaPal.DOM.querySelectorAll('html')[0].clientHeight, window.innerHeight || 0);

    child.style.marginTop = Math.max((vh - child.offsetHeight) / 2, 30) + 'px';
    child.style.marginBottom = Math.max((vh - child.offsetHeight) / 2, 30) + 'px';
  }
});
define('aurelia-dialog/dialog-options',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var dialogOptions = exports.dialogOptions = {
    lock: true,
    centerHorizontalOnly: false,
    startingZIndex: 1000,
    ignoreTransitions: false
  };
});
define('aurelia-dialog/dialog-service',['exports', 'aurelia-metadata', 'aurelia-dependency-injection', 'aurelia-templating', './dialog-controller', './renderer', './lifecycle', './dialog-result', './dialog-options'], function (exports, _aureliaMetadata, _aureliaDependencyInjection, _aureliaTemplating, _dialogController, _renderer, _lifecycle, _dialogResult, _dialogOptions) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DialogService = undefined;

  

  var _class, _temp;

  var DialogService = exports.DialogService = (_temp = _class = function () {
    function DialogService(container, compositionEngine) {
      

      this.container = container;
      this.compositionEngine = compositionEngine;
      this.controllers = [];
      this.hasActiveDialog = false;
    }

    DialogService.prototype.open = function open(settings) {
      return this.openAndYieldController(settings).then(function (controller) {
        return controller.result;
      });
    };

    DialogService.prototype.openAndYieldController = function openAndYieldController(settings) {
      var _this = this;

      var childContainer = this.container.createChild();
      var dialogController = void 0;
      var promise = new Promise(function (resolve, reject) {
        dialogController = new _dialogController.DialogController(childContainer.get(_renderer.Renderer), _createSettings(settings), resolve, reject);
      });
      childContainer.registerInstance(_dialogController.DialogController, dialogController);
      dialogController.result = promise;
      dialogController.result.then(function () {
        _removeController(_this, dialogController);
      }, function () {
        _removeController(_this, dialogController);
      });
      return _openDialog(this, childContainer, dialogController).then(function () {
        return dialogController;
      });
    };

    return DialogService;
  }(), _class.inject = [_aureliaDependencyInjection.Container, _aureliaTemplating.CompositionEngine], _temp);


  function _createSettings(settings) {
    settings = Object.assign({}, _dialogOptions.dialogOptions, settings);
    settings.startingZIndex = _dialogOptions.dialogOptions.startingZIndex;
    return settings;
  }

  function _openDialog(service, childContainer, dialogController) {
    var host = dialogController.renderer.getDialogContainer();
    var instruction = {
      container: service.container,
      childContainer: childContainer,
      model: dialogController.settings.model,
      view: dialogController.settings.view,
      viewModel: dialogController.settings.viewModel,
      viewSlot: new _aureliaTemplating.ViewSlot(host, true),
      host: host
    };

    return _getViewModel(instruction, service.compositionEngine).then(function (returnedInstruction) {
      dialogController.viewModel = returnedInstruction.viewModel;
      dialogController.slot = returnedInstruction.viewSlot;

      return (0, _lifecycle.invokeLifecycle)(dialogController.viewModel, 'canActivate', dialogController.settings.model).then(function (canActivate) {
        if (canActivate) {
          return service.compositionEngine.compose(returnedInstruction).then(function (controller) {
            service.controllers.push(dialogController);
            service.hasActiveDialog = !!service.controllers.length;
            dialogController.controller = controller;
            dialogController.view = controller.view;

            return dialogController.renderer.showDialog(dialogController);
          });
        }
      });
    });
  }

  function _getViewModel(instruction, compositionEngine) {
    if (typeof instruction.viewModel === 'function') {
      instruction.viewModel = _aureliaMetadata.Origin.get(instruction.viewModel).moduleId;
    }

    if (typeof instruction.viewModel === 'string') {
      return compositionEngine.ensureViewModel(instruction);
    }

    return Promise.resolve(instruction);
  }

  function _removeController(service, controller) {
    var i = service.controllers.indexOf(controller);
    if (i !== -1) {
      service.controllers.splice(i, 1);
      service.hasActiveDialog = !!service.controllers.length;
    }
  }
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"nav-bar.html\"></require>\n\n  <div class=\"ui container page-host\">\n\n    <nav-bar router.bind=\"router\"></nav-bar>\n\n    <router-view>\n    </router-view>\n\n  </div>\n</template>\n"; });
define('text!home.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"nav-bar.html\"></require>\n  <div class=\"ui container page-host\">\n    <nav-bar router.bind=\"router\"></nav-bar>\n    <router-view>\n    </router-view>\n  </div>\n</template>\n"; });
define('text!nav-bar.html', ['module'], function(module) { module.exports = "<template bindable=\"router\">\n  <nav class=\"ui secondary pointing menu\">\n    <header class=\"header item\">\n      <a href=\"/\"> Tweet </a>\n    </header>\n    <div class=\"right menu\">\n      <div repeat.for=\"row of router.navigation\">\n        <a class=\"${row.isActive ? 'active' : ''} item\"  href.bind=\"row.href\">\n          ${row.title}\n        </a>\n      </div>\n    </div>\n  </nav>\n</template>\n"; });
define('text!viewmodels/dashboard/dashboard.html', ['module'], function(module) { module.exports = "<template>\n  <section class=\"ui raised grid segment\">\n    <div class=\"row\">\n      <!--<div class=\"ui column\">-->\n        <!--<compose class=\"ui\" view-model=\"../timeline/timeline\"></compose>-->\n      <!--</div>-->\n      <div class=\"ui column\">\n        <compose class=\"ui\" view-model=\"../myprofile/myprofile\"></compose>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"column\">\n        <compose class=\"ui\" view-model=\"../myfollower/myfollower\"></compose>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"column\">\n        <compose class=\"ui\" view-model=\"../stats/stats\"></compose>\n      </div>\n    </div>\n  </section>\n</template>\n"; });
define('text!viewmodels/following/following.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n  <require from=\"utils/date-format-joined\"></require>\r\n\r\n  <div class=\"ui one column grid\">\r\n    <div class=\"column\">\r\n      <div class=\"ui segments\">\r\n        <h2 class=\"ui center aligned icon header\">\r\n          <i class=\"circular blue users icon\"></i>\r\n          Users, ${selectedUser.firstName} is following\r\n        </h2>\r\n        <section class=\"ui grid center aligned stacked segment\">\r\n        <div if.bind=\"selectedUser.following.length < 1\" class=\"ui red label\">\r\n          <i class=\"mail icon\"></i> Sorry, but this user is not following any other users\r\n        </div>\r\n        <div class=\"five wide column\" repeat.for=\"followedUser of selectedUser.following\">\r\n          <div class=\"ui card\">\r\n            <div class=\"image\" if.bind=\"followedUser.gender == 'Female'\">\r\n              <img src=\"/src/assets/avatars/kristy.png\">\r\n            </div>\r\n            <div class=\"image\" if.bind=\"followedUser.gender == 'Male'\">\r\n              <img src=\"/src/assets/avatars/christian.jpg\">\r\n            </div>\r\n            <div class=\"content\">\r\n              <a class=\"header\" route-href=\"route: userDetail;\r\n                                   params.bind: {id:followedUser._id}\">${followedUser.firstName}\r\n                ${followedUser.lastName}</a>\r\n              <div class=\"meta\">\r\n                <span class=\"date\">Joined in ${followedUser.joined | dateFormat}</span>\r\n              </div>\r\n              <div class=\"description\">\r\n                ${followedUser.description}\r\n              </div>\r\n            </div>\r\n            <!--<div class=\"extra content\">-->\r\n            <!--&lt;!&ndash;<a>&ndash;&gt;-->\r\n            <!--&lt;!&ndash;<i class=\"user icon\"></i>&ndash;&gt;-->\r\n            <!--&lt;!&ndash;Following: ${authenticatedUser.following.length}&ndash;&gt;-->\r\n            <!--&lt;!&ndash;</a>&ndash;&gt;-->\r\n            <!--</div>-->\r\n          </div>\r\n        </div>\r\n\r\n      </section>\r\n    </div>\r\n    </div>\r\n  </div>\r\n\r\n</template>"; });
define('text!viewmodels/graph/graph.html', ['module'], function(module) { module.exports = "<template>\r\n  <meta charset=\"utf-8\">\r\n  <style>\r\n\r\n    .link {\r\n      fill: none;\r\n      stroke: #666;\r\n      stroke-width: 1.5px;\r\n    }\r\n\r\n    #blue {\r\n      fill: lightblue;\r\n    }\r\n\r\n    .link.blue {\r\n      stroke: lightblue;\r\n    }\r\n\r\n    circle {\r\n      fill: #ccc;\r\n      stroke: #ccc;\r\n      stroke-width: 1.5px;\r\n    }\r\n\r\n    text {\r\n      font: 10px sans-serif;\r\n      pointer-events: none;\r\n      text-shadow: 0 1px 0 #fff, 1px 0 0 #fff, 0 -1px 0 #fff, -1px 0 0 #fff;\r\n    }\r\n\r\n  </style>\r\n  <section class=\"ui stacked center aligned segment\">\r\n    <div id=\"content\">\r\n\r\n    </div>\r\n  </section>\r\n</template>\r\n"; });
define('text!viewmodels/home/home.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n  <div class=\"ui center aligned segment\">\r\n      <label>Hello ${authenticatedUser.firstName}, nice to see you again</label>\r\n      <div class=\"field\">\r\n        <i class=\"smile icon\" aria-hidden=\"true\"></i>\r\n      </div>\r\n  </div>\r\n\r\n</template>\r\n"; });
define('text!viewmodels/login/login.html', ['module'], function(module) { module.exports = "<template>\n\n  <form id=\"loginForm\" class=\"ui stacked segment form\">\n    <h3 class=\"ui header\">Log-in</h3>\n    <div class=\"field\">\n      <label>Email</label>\n      <input name=\"mail\" placeholder=\"email\" value.bind=\"email\"/>\n    </div>\n    <div class=\"field\">\n      <label>Password</label>\n      <input name=\"password\" type=\"password\" value.bind=\"password\"/>\n    </div>\n    <button class=\"ui blue button\">Login</button>\n    <h3>${prompt}</h3>\n  </form>\n\n</template>\n"; });
define('text!viewmodels/logout/logout.html', ['module'], function(module) { module.exports = "<template>\n\n  <form submit.delegate=\"logout($event)\" class=\"ui stacked segment form\">\n    <h3 class=\"ui header\">Are you sure you want to log out?</h3>\n    <button class=\"ui blue submit button\">Logout</button>\n  </form>\n\n</template>\n"; });
define('text!viewmodels/myfollower/myfollower.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n  <require from=\"utils/date-format-joined\"></require>\r\n\r\n  <div class=\"ui one column grid\">\r\n    <div class=\"column\">\r\n      <div class=\"ui segments\">\r\n        <h2 class=\"ui center aligned icon header\">\r\n          <i class=\"circular blue users icon\"></i>\r\n          Users, you are following\r\n        </h2>\r\n        <section class=\"ui grid center aligned stacked segment\">\r\n          <div if.bind=\"authenticatedUser.following.length < 1\" class=\"ui blue label\">\r\n            <i class=\"frown icon\"></i> Sorry, but you do not follow anyone\r\n          </div>\r\n          <div class=\"five wide column\" repeat.for=\"followedUser of authenticatedUser.following\">\r\n            <div class=\"ui card\">\r\n              <div class=\"image\" if.bind=\"followedUser.gender == 'Female'\">\r\n                <img src=\"/src/assets/avatars/kristy.png\">\r\n              </div>\r\n              <div class=\"image\" if.bind=\"followedUser.gender == 'Male'\">\r\n                <img src=\"/src/assets/avatars/christian.jpg\">\r\n              </div>\r\n              <div class=\"content\">\r\n                <a class=\"header\" route-href=\"route: userDetail;\r\n                                   params.bind: {id:followedUser._id}\">${followedUser.firstName}\r\n                  ${followedUser.lastName}</a>\r\n                <div class=\"meta\">\r\n                  <span class=\"date\">Joined in ${followedUser.joined | dateFormat}</span>\r\n                </div>\r\n                <div class=\"description\">\r\n                  ${followedUser.description}\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n        </section>\r\n      </div>\r\n    </div>\r\n    <div class=\"column\">\r\n      <div class=\"ui segments\">\r\n        <h2 class=\"ui center aligned icon header\">\r\n          <i class=\"circular blue users icon\"></i>\r\n          Users, who follow you\r\n        </h2>\r\n        <section class=\"ui grid center aligned stacked segment\">\r\n          <div if.bind=\"followers.length < 1\" class=\"ui blue label\">\r\n            <i class=\"frown icon\"></i> Sorry, but noone likes you\r\n          </div>\r\n          <div class=\"five wide column\" repeat.for=\"followingUser of followers\">\r\n            <div class=\"ui card\">\r\n              <div class=\"image\" if.bind=\"followingUser.gender == 'Female'\">\r\n                <img src=\"/src/assets/avatars/kristy.png\">\r\n              </div>\r\n              <div class=\"image\" if.bind=\"followingUser.gender == 'Male'\">\r\n                <img src=\"/src/assets/avatars/christian.jpg\">\r\n              </div>\r\n              <div class=\"content\">\r\n                <a class=\"header\" route-href=\"route: userDetail;\r\n                                   params.bind: {id:followingUser._id}\">${followingUser.firstName}\r\n                  ${followingUser.lastName}</a>\r\n                <div class=\"meta\">\r\n                  <span class=\"date\">Joined in ${followingUser.joined | dateFormat}</span>\r\n                </div>\r\n                <div class=\"description\">\r\n                  ${followingUser.description}\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n        </section>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n</template>"; });
define('text!viewmodels/myprofile/myprofile.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n  <require from=\"utils/date-format-joined\"></require>\r\n\r\n  <section class=\"ui grid segment\">\r\n    <div class=\"row\">\r\n      <div class=\"five wide centered column\">\r\n        <div class=\"ui card\">\r\n          <div class=\"image\" if.bind=\"authenticatedUser.gender == 'Female'\">\r\n            <div if.bind=\"hasPermission(authenticatedUser, 'admin')\" class=\"ui red ribbon label\">\r\n              <i class=\"fa fa-user-md\"></i> Admin\r\n            </div>\r\n            <img src=\"/src/assets/avatars/kristy.png\">\r\n          </div>\r\n          <div class=\"image\" if.bind=\"authenticatedUser.gender == 'Male'\">\r\n            <div if.bind=\"hasPermission(authenticatedUser, 'admin')\" class=\"ui red ribbon label\">\r\n              <i class=\"fa fa-user-md\"></i> Admin\r\n            </div>\r\n            <img src=\"/src/assets/avatars/christian.jpg\">\r\n          </div>\r\n          <div class=\"content\">\r\n            <a class=\"header\">${authenticatedUser.firstName}</a>\r\n            <div class=\"meta\">\r\n              <span class=\"date\">Joined in ${authenticatedUser.joined | dateFormat}</span>\r\n            </div>\r\n            <div class=\"description\">\r\n              ${authenticatedUser.description}\r\n            </div>\r\n          </div>\r\n          <div class=\"extra content\">\r\n            <a route-href=\"route: following;\r\n                             params.bind: {id:authenticatedUser._id}\">\r\n              <i class=\"user icon\"></i>\r\n              Following: ${authenticatedUser.following.length}\r\n            </a>\r\n\r\n            <!--<a>-->\r\n            <!--<i class=\"user icon\"></i>-->\r\n            <!--Following: ${selectedUser.following.length}-->\r\n            <!--</a>-->\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n\r\n      <!--<div class=\"ui horizontal divider\">User Detail</div>-->\r\n\r\n      <div class=\"eight wide centered column\">\r\n        <form id=\"myProfileEditForm\" class=\"ui form segment\">\r\n          <p>Tell Us About Yourself</p>\r\n          <div class=\"two fields\">\r\n            <div class=\"field\">\r\n              <label>First Name</label>\r\n              <input placeholder=\"First Name\" value.bind=\"authenticatedUser.firstName\"\r\n                     disabled.bind=\"!canEditUser(authenticatedUser)\" name=\"firstname\" type=\"text\">\r\n            </div>\r\n            <div class=\"field\">\r\n              <label>Last Name</label>\r\n              <input placeholder=\"Last Name\" value.bind=\"authenticatedUser.lastName\"\r\n                     disabled.bind=\"!canEditUser(authenticatedUser)\" name=\"lastname\" type=\"text\">\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"field\">\r\n            <label>Gender</label>\r\n            <select name=\"gender\" class=\"ui dropdown\" value.bind=\"authenticatedUser.gender\"\r\n                    disabled.bind=\"!canEditUser(authenticatedUser)\">\r\n              <option repeat.for=\"gender of genders\"\r\n                      model.bind=\"gender\">\r\n                ${gender}\r\n              </option>\r\n            </select>\r\n          </div>\r\n\r\n          <div class=\"field\">\r\n            <label>Description</label>\r\n            <input name=\"description\" type=\"text\" value.bind=\"authenticatedUser.description\"\r\n                   disabled.bind=\"!canEditUser(authenticatedUser)\">\r\n          </div>\r\n\r\n\r\n          <div class=\"two fields\">\r\n            <div class=\"field\">\r\n              <label>Email</label>\r\n              <input placeholder=\"Email\" readonly=\"\" value.bind=\"authenticatedUser.email\"\r\n                     disabled.bind=\"!canEditUser(authenticatedUser)\" name=\"mail\" type=\"text\">\r\n            </div>\r\n\r\n\r\n            <div class=\"field\">\r\n              <label>Password</label>\r\n              <input name=\"password\" type=\"password\" value.bind=\"authenticatedUser.password\"\r\n                     disabled.bind=\"!canEditUser(authenticatedUser)\">\r\n            </div>\r\n          </div>\r\n\r\n\r\n          <button class=\"ui primary button\" if.bind=\"canEditUser(authenticatedUser)\">Submit</button>\r\n          <div class=\"ui error message\"></div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n  </section>\r\n</template>"; });
define('text!viewmodels/report/report.html', ['module'], function(module) { module.exports = "<template>\n\n  <article class=\"ui stacked segment\">\n    <h3 class='ui dividing header'> Donations to Date </h3>\n    <table class=\"ui celled table segment\">\n      <thead>\n      <tr>\n        <th>Amount</th>\n        <th>Method donated</th>\n        <th>Candidate</th>\n      </tr>\n      </thead>\n      <tbody>\n      <tr repeat.for=\"donation of donations\">\n        <td> ${donation.amount}</td>\n        <td> ${donation.method}</td>\n        <td> ${donation.candidate.lastName}, ${donation.candidate.firstName}</td>\n      </tr>\n      </tbody>\n    </table>\n  </article>\n\n</template>\n"; });
define('text!viewmodels/signup/signup.html', ['module'], function(module) { module.exports = "<template>\n  <form id=\"registerForm\" class=\"ui stacked segment form\">\n    <h3 class=\"ui header\">Register</h3>\n    <div class=\"two fields\">\n      <div class=\"field\">\n        <label>First Name</label>\n        <input name=\"firstname\" placeholder=\"First Name\" type=\"text\" value.bind=\"firstName\">\n      </div>\n      <div class=\"field\">\n        <label>Last Name</label>\n        <input name=\"lastname\" placeholder=\"Last Name\" type=\"text\" value.bind=\"lastName\">\n      </div>\n    </div>\n    <div class=\"two fields\">\n      <div class=\"field\">\n        <label>Gender</label>\n        <select name=\"gender\" class=\"ui dropdown\" value.bind=\"gender\">\n          <!--<option selected=\"selected\"></option>-->\n          <option repeat.for=\"gender of genders\"\n                  model.bind=\"gender\">\n            ${gender}\n          </option>\n        </select>\n      </div>\n      <div class=\"field\">\n        <label>Email</label>\n        <input name=\"mail\" placeholder=\"Email\" type=\"text\" value.bind=\"email\">\n      </div>\n    </div>\n    <div class=\"two fields\">\n      <div class=\"field\">\n        <label>Password</label>\n        <input name=\"password\" placeholder=\"Password\" type=\"password\" value.bind=\"password\">\n      </div>\n      <div class=\"field\">\n        <label>Confirm Password</label>\n        <input placeholder=\"Confirm Password\" name=\"passwordConfirm\" type=\"password\">\n      </div>\n    </div>\n    <button class=\"ui blue button\">Submit</button>\n  </form>\n</template>\n"; });
define('text!viewmodels/user/deleteConfirmationDialog.html', ['module'], function(module) { module.exports = "<template>\r\n  <ai-dialog>\r\n    <ai-dialog-body>\r\n      <h2>Are you sure you want to delete ${user.firstName}'s profile?</h2>\r\n\r\n    </ai-dialog-body>\r\n\r\n    <ai-dialog-footer>\r\n      <button click.trigger=\"controller.cancel()\">Cancel</button>\r\n      <button click.trigger=\"deleteUser(user)\">Ok</button>\r\n    </ai-dialog-footer>\r\n  </ai-dialog>\r\n</template>"; });
define('text!viewmodels/user/user.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n  <require from=\"utils/date-format-joined\"></require>\r\n\r\n  <section class=\"ui grid segment\">\r\n    <div class=\"row\">\r\n      <div class=\"five wide centered column\">\r\n        <div class=\"ui card\">\r\n          <div class=\"image\" if.bind=\"selectedUser.gender == 'Female'\">\r\n            <img src=\"/src/assets/avatars/kristy.png\">\r\n          </div>\r\n          <div class=\"image\" if.bind=\"selectedUser.gender == 'Male'\">\r\n            <img src=\"/src/assets/avatars/christian.jpg\">\r\n          </div>\r\n          <div class=\"content\">\r\n            <a class=\"header\">${selectedUser.firstName}</a>\r\n            <div class=\"meta\">\r\n              <span class=\"date\">Joined in ${selectedUser.joined | dateFormat}</span>\r\n            </div>\r\n            <div class=\"description\">\r\n              ${selectedUser.description}\r\n            </div>\r\n          </div>\r\n          <div class=\"extra content\">\r\n              <a route-href=\"route: following;\r\n                             params.bind: {id:selectedUser._id}\">\r\n                <i class=\"user icon\"></i>\r\n                Following: ${selectedUser.following.length}\r\n              </a>\r\n\r\n            <!--<a>-->\r\n              <!--<i class=\"user icon\"></i>-->\r\n              <!--Following: ${selectedUser.following.length}-->\r\n            <!--</a>-->\r\n          </div>\r\n        </div>\r\n        <button if.bind=\"canDeleteUser(selectedUser)\" class=\"ui negative button\" click.trigger=\"showConfirmationDialog(selectedUser)\">\r\n          <i class=\"icon remove user\"></i>\r\n          Remove User\r\n        </button>\r\n      </div>\r\n\r\n\r\n      <!--<div class=\"ui horizontal divider\">User Detail</div>-->\r\n\r\n      <div class=\"eight wide centered column\">\r\n        <form id=\"userEditForm\" class=\"ui form segment\">\r\n          <p>Tell Us About Yourself</p>\r\n          <div class=\"two fields\">\r\n            <div class=\"field\">\r\n              <label>First Name</label>\r\n              <input placeholder=\"First Name\" value.bind=\"selectedUser.firstName\"\r\n                     disabled.bind=\"!canEditUser(selectedUser)\" name=\"firstname\" type=\"text\">\r\n            </div>\r\n            <div class=\"field\">\r\n              <label>Last Name</label>\r\n              <input placeholder=\"Last Name\" value.bind=\"selectedUser.lastName\"\r\n                     disabled.bind=\"!canEditUser(selectedUser)\" name=\"lastname\" type=\"text\">\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"field\">\r\n            <label>Gender</label>\r\n            <select name=\"gender\" class=\"ui dropdown\" value.bind=\"selectedUser.gender\" disabled.bind=\"!canEditUser(selectedUser)\">\r\n              <option repeat.for=\"gender of genders\"\r\n                      model.bind=\"gender\">\r\n                ${gender}\r\n              </option>\r\n            </select>\r\n          </div>\r\n\r\n          <div class=\"field\">\r\n            <label>Description</label>\r\n            <input name=\"description\" type=\"text\" value.bind=\"selectedUser.description\"\r\n                   disabled.bind=\"!canEditUser(selectedUser)\">\r\n          </div>\r\n\r\n          <div class=\"two fields\">\r\n            <div class=\"field\">\r\n              <label>Email</label>\r\n              <input placeholder=\"Email\" readonly=\"\" value.bind=\"selectedUser.email\"\r\n                     disabled.bind=\"!canEditUser(selectedUser)\" name=\"mail\" type=\"text\">\r\n            </div>\r\n\r\n            <div class=\"field\">\r\n              <label>Password</label>\r\n              <input name=\"password\" type=\"password\" value.bind=\"selectedUser.password\" disabled.bind=\"!canEditUser(selectedUser)\">\r\n            </div>\r\n          </div>\r\n\r\n\r\n\r\n\r\n          <button class=\"ui primary button\" if.bind=\"canEditUser(selectedUser)\">Submit</button>\r\n        </form>\r\n      </div>\r\n    </div>\r\n  </section>\r\n</template>"; });
define('text!viewmodels/stats/stats.html', ['module'], function(module) { module.exports = "<template>\n\n  <section class=\"ui grid segment\">\n    <!--<section class=\"ui stacked statistic segment\">-->\n    <!--<div class=\"value\">-->\n    <!--${total}-->\n    <!--</div>-->\n    <!--<div class=\"label\">-->\n    <!--Donated-->\n    <!--</div>-->\n    <!--</section>-->\n\n    <div class=\"five wide column\">\n      <section class=\"ui stacked statistic segment\">\n        <div class=\"value\">\n          <i class=\"comments outline blue icon\"></i>\n          ${totalTweets}\n        </div>\n        <div class=\"label\">\n          Total written Tweets in our Database\n        </div>\n      </section>\n    </div>\n\n    <div class=\"six wide column\">\n      <section class=\"ui stacked statistic segment\">\n        <div class=\"value\">\n          <i class=\"user blue icon\"></i>\n          ${totalUsers}\n        </div>\n        <div class=\"label\">\n          Total Registered Users\n        </div>\n      </section>\n    </div>\n\n  </section>\n\n</template>\n"; });
define('text!viewmodels/timeline/deleteConfirmationDialog.html', ['module'], function(module) { module.exports = "<template>\r\n  <ai-dialog>\r\n    <ai-dialog-body>\r\n      <h2>Are you sure you want to delete this post?</h2>\r\n\r\n    </ai-dialog-body>\r\n\r\n    <ai-dialog-footer>\r\n      <button click.trigger=\"controller.cancel()\">Cancel</button>\r\n      <button click.trigger=\"deleteTweet(tweet)\">Ok</button>\r\n    </ai-dialog-footer>\r\n  </ai-dialog>\r\n</template>"; });
define('text!viewmodels/timeline/timeline.html', ['module'], function(module) { module.exports = "<template>\n\n  <require from=\"utils/date-format\"></require>\n\n  <div class=\"ui fluid raised card\">\n    <form class=\"ui form\" id=\"tweetForm\" enctype='multipart/form-data'>\n      <div class=\"ui fluid raised card\">\n        <div class=\"extra content\">\n          <div class=\"left floated author\">\n            <img if.bind=\"authenticatedUser.gender === 'Female'\" src=\"/src/assets/avatars/kristy.png\" class=\"ui avatar image\">\n            <img if.bind=\"authenticatedUser.gender === 'Male'\" src=\"/src/assets/avatars/christian.jpg\" class=\"ui avatar image\">\n            ${authenticatedUser.firstName} ${authenticatedUser.lastName}\n          </div>\n          <div class=\"right floated\">\n            <div class=\"ui icon button\" id=\"camerabutton\">\n              <i class=\"camera icon\"></i></div>\n            <!--NO submit button required here else validation is fired twice-->\n            <button class=\"ui blue button\">Share</button>\n          </div>\n        </div>\n        <div class=\"ui content\">\n          <div class=\"description\">\n            <div class=\"ui basic segment\" id=\"imageSegment\" style=\"display:none\">\n              <img class=\"ui fluid rounded image\" id=\"imagePreview\" src=\"\">\n            </div>\n            <div class=\"field\">\n              <textarea id=\"tweetInput\" name=\"tweetInput\" maxlength=\"140\" placeholder=\"Share whatever you like\" value.bind=\"tweetInput\">\n                Share whatever you like\n              </textarea>\n              <div class=\"\">\n              <p id=\"counter\"></p>\n              </div>\n            </div>\n            <div class=\"field\">\n              <input type=\"file\" name=\"tweetImage\" id=\"fileInput\" accept=\"image/*\" files.bind=\"tweetImage\"  style=\"display:none\">\n            </div>\n          </div>\n        </div>\n      </div>\n    </form>\n  </div>\n\n  <section id=\"menuSegment\" class=\"ui center aligned grid\">\n    <div class=\"equal width row\">\n      <div class=\"column\">\n        <button class=\"ui blue button\"\n                click.trigger=\"refreshGlobalTweets()\">\n          <i class=\"icon refresh\"></i>\n          Refresh Global Tweets\n        </button>\n      </div>\n      <div class=\"column\">\n        <button if.bind=\"!tweetDeletionModeToggled && hasPermission(authenticatedUser,'admin')\" class=\"ui negative button\"\n                click.trigger=\"toggleTweetDeletionMode()\">\n          <i class=\"icon remove user\"></i>\n          Toggle Tweet Delete\n        </button>\n        <div if.bind=\"tweetDeletionModeToggled && hasPermission(authenticatedUser,'admin')\" class=\"ui buttons\">\n          <button class=\"ui button\" click.trigger=\"toggleTweetDeletionMode()\">Cancel</button>\n          <div class=\"or\"></div>\n          <button click.trigger=\"deleteMultipleTweets()\" class=\"ui negative button\">Delete Selected Tweets</button>\n        </div>\n      </div>\n      <div class=\"column\">\n        <button if.bind=\"!userDeletionModeToggled && hasPermission(authenticatedUser, 'admin')\" class=\"ui negative button\" click.trigger=\"toggleUserDeletionMode()\">\n          <i class=\"icon remove user\"></i>\n          Toggle User Delete\n        </button>\n        <div if.bind=\"userDeletionModeToggled && hasPermission(authenticatedUser,'admin')\" class=\"ui buttons\">\n          <button class=\"ui button\" click.trigger=\"toggleUserDeletionMode()\">Cancel</button>\n          <div class=\"or\"></div>\n          <button click.trigger=\"deleteMultipleUsers()\" class=\"ui negative button\">Delete Selected Users</button>\n        </div>\n      </div>\n    </div>\n  </section>\n\n\n\n  <section class=\"ui raised grid center aligned segment\">\n\n    <div class=\"row\" repeat.for=\"tweet of globalTweets\">\n\n      <div class=\"thirteen wide column\">\n        <div class=\"ui padded raised center aligned segment\">\n          <div class=\"ui internally celled grid\">\n            <div class=\"row\">\n              <div class=\"five wide column\">\n                <div class=\"ui center aligned\">\n                  <div class=\"ui card\">\n                    <a class=\"image\" if.bind=\"tweet.author.gender == 'Female'\">\n                      <div if.bind=\"hasPermission(tweet.author, 'admin')\" class=\"ui red ribbon label\">\n                        <i class=\"fa fa-user-md\"></i> Admin\n                      </div>\n                      <div if.bind=\"userDeletionModeToggled && canDeleteUser(tweet.author)\" class=\"ui fitted checkbox\">\n                        <input name=\"deleteUserCheckbox\" checked.bind=\"tweet.author.deleteSelected\" type=\"checkbox\">\n                        <label></label>\n                      </div>\n                      <img src=\"/src/assets/avatars/kristy.png\">\n                    </a>\n                    <a class=\"image\" if.bind=\"tweet.author.gender == 'Male'\">\n                      <div if.bind=\"hasPermission(tweet.author, 'admin')\" class=\"ui red ribbon label\">\n                        <i class=\"fa fa-user-md\"></i> Admin\n                      </div>\n                      <div if.bind=\"userDeletionModeToggled && canDeleteUser(tweet.author)\" class=\"ui fitted checkbox\">\n                        <input name=\"deleteUserCheckbox\" checked.bind=\"tweet.author.deleteSelected\" type=\"checkbox\">\n                        <label></label>\n                      </div>\n                      <img src=\"/src/assets/avatars/christian.jpg\">\n                    </a>\n                    <div class=\"content\">\n                      <a class=\"header\" route-href=\"route: userDetail;\n                                   params.bind: {id:tweet.author._id}\">${tweet.author.firstName} ${tweet.author.lastName}</a>\n                      <!--<div class=\"meta\">-->\n                        <!--<a>Last Seen 2 days ago</a>-->\n                      <!--</div>-->\n                    </div>\n                  </div>\n\n                </div>\n                <!--<i class=\"circular pencil icon\"></i>-->\n                posted on\n\n                <div class=\"date\">\n                  ${tweet.time | dateFormat}\n                </div>\n\n                <a class=\"ui icon button\" route-href=\"route: timeline;\n                                   params.bind: {id:tweet.author._id}\">\n                  <i class=\"fa fa-comments\" title=\"Show ${tweet.author.firstName}'s timeline\"></i>\n                </a>\n                <button class=\"positive ui icon button\" if.bind=\"canFollow(tweet.author)\" click.trigger=\"followUser(tweet.author)\">\n                  <i class=\"add user icon\" title=\"Follow ${tweet.author.firstName}\"></i>\n                </button>\n                <button class=\"negative ui icon button\" if.bind=\"canUnfollow(tweet.author)\" click.trigger=\"unfollowUser(tweet.author)\">\n                  <i class=\"remove user icon\" title=\"Unfollow ${tweet.author.firstName}\"></i>\n                </button>\n\n                <button class=\"negative ui icon button\" disabled.bind=\"!canDeleteTweet(tweet)\" type=\"button\" click.trigger=\"showConfirmationDialog(tweet)\">\n                  <i class=\"fa fa-trash\" title=\"Delete this comment\"></i>\n                </button>\n\n              </div>\n\n              <div class=\"ten wide column\">\n                <div if.bind=\"tweet.imagePath\" class=\"ui basic segment\">\n                  <img class=\"ui fluid rounded image\" src=\"${tweet.imagePath}\">\n                </div>\n                <div class=\"extra text\">\n                  ${tweet.message}\n                </div>\n\n              </div>\n\n            </div>\n          </div>\n        </div>\n      </div>\n      <div if.bind=\"tweetDeletionModeToggled\" class=\"two wide middle aligned column\">\n        <div class=\"ui fitted checkbox\">\n          <input name=\"example\" checked.bind=\"tweet.deleteSelected\" type=\"checkbox\">\n          <label></label>\n        </div>\n      </div>\n\n\n    </div>\n  </section>\n</template>\n\n"; });
//# sourceMappingURL=app-bundle.js.map