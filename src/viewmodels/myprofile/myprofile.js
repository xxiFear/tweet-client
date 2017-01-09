import {inject} from 'aurelia-framework';
// import {TotalUsers} from '../../services/messages';
import {AuthenticatedUserUpdatedMessage} from '../../services/messages';
import {EventAggregator} from 'aurelia-event-aggregator';
import TweetService from '../../services/tweet-service';

@inject(EventAggregator, TweetService)
export class Stats {

  authenticatedUser = {};
  genders = ['Female', 'Male'];

  constructor(eventAggregator, tweetService) {
    this.ea = eventAggregator;
    this.tweetService = tweetService;
    this.ea.subscribe(AuthenticatedUserUpdatedMessage, message => {
      this.authenticatedUser = message.authenticatedUser;
    });
  }

  activate(params) {
    this.tweetService.getAuthenticatedUser();
  }

  attached() {
    setUpFormValidator(this.saveUser.bind(this), null);
  }

  saveUser() {
    this.tweetService.saveSingleUser(this.authenticatedUser);
  }

  canEditUser(user) {
    return this.tweetService.canEditUser(user);
  }

  hasPermission(user, permission) {
    return this.tweetService.hasPermission(user, permission);
  }

}

function setUpFormValidator(onSuccess, onFailure) {
  $('#myProfileEditForm')
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
          console.log('Validation failed');
          onFailure();
          return false;
        },
        fields: {
          firstname: {
            identifier: 'firstname',
            rules: [
              {
                type: 'empty',
                prompt: 'First name must not be emtpy!'
              }
            ]
          },
          lastname: {
            identifier: 'lastname',
            rules: [
              {
                type: 'empty',
                prompt: 'Last name must not be emtpy!'
              }
            ]
          },
          gender: ['Male', 'Female'],
          mail: {
            identifier: 'mail',
            rules: [
              {
                type: 'empty',
                prompt: 'Mail must not be emtpy!'
              }
            ]
          },
          password: {
            identifier: 'password',
            rules: [
              {
                type: 'empty',
                prompt: 'Password must not be emtpy!'
              }
            ]
          }
        }
      })
  ;
}

