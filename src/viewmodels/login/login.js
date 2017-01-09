import {inject} from 'aurelia-framework';
import TweetService from '../../services/tweet-service';

@inject(TweetService)
export class Login {

  email = 'matthias.hartmann@mail.de';
  password = 'secret';

  constructor(ts) {
    this.tweetService = ts;
    this.prompt = '';
  }

  attached() {
    setUpFormValidator(this.login.bind(this), null);
  }

  login(e) {
    console.log(`Trying to log in ${this.email}`);
    this.tweetService.login(this.email, this.password);
  }
}

function setUpFormValidator(onSuccess, onFailure) {
  $('#loginForm')
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
