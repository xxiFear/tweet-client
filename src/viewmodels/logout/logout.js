import DonationService from '../../services/tweet-service';
import {inject} from 'aurelia-framework';

@inject(DonationService)
export class Logout {

  constructor(donationService) {
    this.donationService = donationService;
  }

  logout() {
    console.log('Logging Out');
    this.donationService.logout();
  }

}
