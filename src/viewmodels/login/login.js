import {inject} from 'aurelia-framework';
import DonationService from '../../services/tweet-service';

@inject(DonationService)
export class Login {

  email = 'matthias.hartmann@mail.de';
  password = 'secret';

  constructor(ds) {
    this.donationService = ds;
    this.prompt = '';
  }

  login(e) {
    console.log(`Trying to log in ${this.email}`);
    this.donationService.login(this.email, this.password);
  }
}
