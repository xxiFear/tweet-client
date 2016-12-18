import {inject, Aurelia} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {LoginStatus} from './services/messages';
import DonationService from './services/tweet-service';

@inject(DonationService, Aurelia, EventAggregator)
export class App {

  constructor(ds, au, ea) {
    this.au = au;
    this.ds = ds;
    ea.subscribe(LoginStatus, msg => {
      if (msg.status.success === true) {
        au.setRoot('home').then(() => {
          this.router.navigateToRoute('timeline');
        });
      } else {
        au.setRoot('app').then(() => {
          this.router.navigateToRoute('login');
        });
      }
    });
  }

  attached() {
    if (this.ds.isAuthenticated()) {
      this.au.setRoot('home').then(() => {
        this.router.navigateToRoute('timeline');
      });
    }
  }

  configureRouter(config, router) {
    config.map([
      { route: ['', 'login'], name: 'login', moduleId: 'viewmodels/login/login', nav: true, title: 'Login' },
      { route: 'signup', name: 'signup', moduleId: 'viewmodels/signup/signup', nav: true, title: 'Signup' }
    ]);

    config.mapUnknownRoutes(instruction => {
      return 'login';
    });

    this.router = router;
  }
}
