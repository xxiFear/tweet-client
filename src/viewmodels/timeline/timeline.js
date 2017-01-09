import {inject} from 'aurelia-framework';
import TweetService from '../../services/tweet-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import {DialogService} from 'aurelia-dialog';
import {DeleteConfirmationDialog} from './deleteConfirmationDialog';
import {TotalTweetsUpdatedMessage} from '../../services/messages';
import {AuthenticatedUserUpdatedMessage} from '../../services/messages';


@inject(TweetService, DialogService, EventAggregator)
export class Timeline {


  globalTweets = [];
  tweetInput = '';
  authenticatedUser = {};
  tweetImage = null;
  eventSubscriptions = [];
  tweetDeletionModeToggled = false;
  userDeletionModeToggled = false;

  constructor(tweetService, dialogService, eventAggragator) {
    this.tweetService = tweetService;
    this.dialogService = dialogService;
    this.ea = eventAggragator;
    this.eventSubscriptions.push(this.ea.subscribe(TotalTweetsUpdatedMessage, message => {
      this.globalTweets = message.totalTweets;
    }));
    this.eventSubscriptions.push(this.ea.subscribe(AuthenticatedUserUpdatedMessage, message => {
      this.authenticatedUser = message.authenticatedUser;
    }));
  }


  activate(params) {
    if (params !== null && params.id) {
      let id = params.id;
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
    //This must be done even though it is already loaded on home route
    this.tweetService.getAuthenticatedUser();
  }

  attached() {
    initilizeUploadForm();
    //has to be done within attached because activated would not have access to DOM
    setUpFormValidator(this.postTweet.bind(this), this.reinitializeUploadForm.bind(this));
  }

  detached() {
    this.eventSubscriptions.forEach(event => {
      event.dispose();
    });
  }

  showConfirmationDialog(tweet) {
    this.dialogService.open({viewModel: DeleteConfirmationDialog, model: tweet}).then(response => {
      if (!response.wasCancelled) {
        console.log('Successful', response.output);
      } else {
        console.log('Error');
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

  toggleTweetDeletionMode() {
    if (this.tweetDeletionModeToggled) {
      this.tweetDeletionModeToggled = false;
    } else {
      this.tweetDeletionModeToggled = true;
    }
  }

  toggleUserDeletionMode() {
    if (this.userDeletionModeToggled) {
      this.userDeletionModeToggled = false;
    } else {
      this.userDeletionModeToggled = true;
    }
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

  hasPermission(user, permission) {
    return this.tweetService.hasPermission(user, permission);
  }

  canDeleteUser(user) {
    return this.tweetService.canDeleteUser(user);
  }

  postTweet() {
    let tweet = {
      message: this.tweetInput
    };

    if (this.tweetImage && this.tweetImage.length > 0) {
      getBase64(this.tweetImage[0]).then(base64EncodedImage => {
        tweet.image = base64EncodedImage;
        this.tweetService.postTweet(tweet).then(postedTweet => {
          console.log('tweet posted');
          this.reinitializeUploadForm();
        }).catch(err => {
          console.log('tweet could not be posted');
        });
      }).catch(err => {
        console.log('error encoding image');
      });
    } else {
      this.tweetService.postTweet(tweet).then(postedTweet => {
        // this.eventAgregator.publish(new TweetUpdate({}));
        this.reinitializeUploadForm();
      }).catch(err => {
        console.log('tweet could not be posted');
      });
    }
  }

  reinitializeUploadForm() {
    $('#tweetForm').removeClass('loading disabled');
    $('#tweetForm #imagePreview').attr('src', null);
    $('#imageSegment').attr('style', 'display: none');
    this.tweetImage = null;
    this.tweetInput = '';
  }
}


function getBase64(file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = readerEvent => {
      const binaryString = readerEvent.target.result;
      const base64String = btoa(binaryString);
      resolve(base64String);
    };
    reader.onerror = error => {
      reject(null);
    };
    reader.readAsBinaryString(file);
  });
}

function setUpFormValidator(onSuccess, onFailure) {
  $('#tweetForm')
      .form({
        on: 'submit',
        inline: true,
        onSuccess: function(event) {
          //prevents redirect
          console.log('Successfully validated');
          event.preventDefault();
          onSuccess();
        },
        onFailure: function() {
          onFailure();
          return false;
        },
        fields: {
          tweetInput: {
            identifier: 'tweetInput',
            rules: [
              {
                type: 'empty',
                prompt: 'Empty message!'
              },
              {
                type: 'maxLength[144]',
                prompt: 'Tweet too long, maximum of 144 chars'
              }
            ]
          }
        }
      })
  ;
}

function initilizeUploadForm() {
  $('#tweetForm #camerabutton')
      .on('click', function(e) {
        $('#tweetForm #fileInput', $(e.target).parents()).click();
      });

  $('#tweetForm #fileInput').on('change', function(input) {
    let $preview = $('#tweetForm #imagePreview');
    if (this.files && this.files[0]) {
      let reader = new FileReader();
      reader.onload = function(e) {
        $('#tweetForm #imagePreview').attr('src', e.target.result);
        $('#imageSegment').attr('style', 'display: block');
      };

      reader.readAsDataURL(this.files[0]);
    } else {
      $('#tweetForm #imagePreview').removeAttr('src');
      $('#imageSegment').attr('style', 'display: none');
    }
  });

  $('#tweetForm #imagePreview')
      .on('click', function(e) {
        let $control = $('#tweetForm #fileInput');
        control.replaceWith($control.val('').clone(true));
        $('#tweetForm #imagePreview').removeAttr('src');
        $('#imageSegment').attr('style', 'display: none');
      });

  $('#tweetForm').on('submit', function() {
    $('#tweetForm').addClass('loading disabled');
  });
}


