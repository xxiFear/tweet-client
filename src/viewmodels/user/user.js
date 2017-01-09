import {inject} from 'aurelia-framework';
// import {TotalUsers} from '../../services/messages';
import {SelectedUserUpdatedMessage} from '../../services/messages';
import {EventAggregator} from 'aurelia-event-aggregator';
import TweetService from '../../services/tweet-service';
import {DialogService} from 'aurelia-dialog';
import {DeleteConfirmationDialog} from './deleteConfirmationDialog';

@inject(EventAggregator, DialogService, TweetService)
export class Stats {

  selectedUser = {};
  genders = ['Female', 'Male'];
  numberOfFollowedUsers = 0;

  constructor(eventAggregator, dialogService ,tweetService) {
    this.ea = eventAggregator;
    this.dialogService = dialogService;
    this.tweetService = tweetService;
    this.ea.subscribe(SelectedUserUpdatedMessage, message => {
      this.selectedUser = message.selectedUser;
    });
  }

  activate(params) {
    let id = params.id;
    if (typeof id !== 'undefined' || id !== null) {
      this.tweetService.getSingleUser(id);
    }
  }

  attached() {
    setUpFormValidator(this.saveUser.bind(this), null);
  }

  showConfirmationDialog(user) {
    this.dialogService.open({viewModel: DeleteConfirmationDialog, model: user}).then(response => {
      if (!response.wasCancelled) {
        console.log('Successful', response.output);
      } else {
        console.log('Error');
      }
      console.log(response.output);
    });
  }

  saveUser() {
    this.tweetService.saveSingleUser(this.selectedUser);
  }

  canEditUser(user) {
    return this.tweetService.canEditUser(user);
  }

  canDeleteUser(user) {
    return this.tweetService.canDeleteUser(user);
  }

}

function setUpFormValidator(onSuccess, onFailure) {
  $('#userEditForm')
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
        },
        description: {
          identifier: 'description',
          rules: [
            {
              type: 'maxLength[50]',
              prompt: 'Please choose a brief description of yourself (max {ruleValue} characters)'
            }
          ]
        }
      })
  ;
}

