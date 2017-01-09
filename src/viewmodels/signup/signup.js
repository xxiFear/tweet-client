import {inject} from 'aurelia-framework';
import TweetService from '../../services/tweet-service';

@inject(TweetService)
export class Signup {

  firstName = '';
  lastName = '';
  email = '';
  password = '';

  constructor(ts) {
    this.tweetService = ts;
  }

  attached() {
    setUpFormValidator(this.register.bind(this), null);
  }

  register(e) {
    this.showSignup = false;
    this.tweetService.register(this.firstName, this.lastName, this.email, this.password);
    this.tweetService.login(this.email, this.password);
  }
}

function setUpFormValidator(onSuccess, onFailure) {
  $('#registerForm')
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
          mail: {
            identifier: 'mail',
            rules: [
              {
                type: 'empty',
                prompt: 'Mail must not be emtpy!'
              },
              {
                type: 'email',
                prompt: 'Not a valid Email!'
              }
            ]
          },
          password: {
            identifier: 'password',
            rules: [
              {
                type: 'empty',
                prompt: 'Password must not be emtpy!'
              },
              {
                type: 'minLength[6]',
                prompt: 'Password must have at least 6 characters!'
              }
            ]
          }
        }
      })
  ;
}


