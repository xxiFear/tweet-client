import { inject, Aurelia } from 'aurelia-framework';

@inject(Aurelia)
export class Home {

  constructor(au) {
    this.aurelia = au;
  }

  configureRouter(config, router) {
    config.map([
      {
        route: ['', 'home'],
        name: 'Home',
        moduleId: 'viewmodels/home/home',
        nav: true,
        title: 'Home'
      },
      {
        route: 'timeline/:id?',
        name: 'timeline',
        moduleId: 'viewmodels/timeline/timeline',
        nav: true,
        title: 'Timeline',
        href: '/timeline'
      },
      {
        route: 'stats',
        name: 'stats',
        moduleId: 'viewmodels/stats/stats',
        nav: true,
        title: 'Stats'
      },
      {
        route: 'dashboard',
        name: 'dashboard',
        moduleId: 'viewmodels/dashboard/dashboard',
        nav: true,
        title: 'Dashboard'
      },
      {
        route: 'myprofile',
        name: 'myprofile',
        moduleId: 'viewmodels/myprofile/myprofile',
        nav: true,
        title: 'My Profile'
      },
      {
        route: 'myfollower',
        name: 'myfollower',
        moduleId: 'viewmodels/myfollower/myfollower',
        nav: true,
        title: 'Follower/Following'
      },
      {
        route: 'following/:id',
        name: 'following',
        moduleId: 'viewmodels/following/following',
        nav: false,
        title: 'Following'
      },
      {
        route: 'socialGraph',
        name: 'socialGraph',
        moduleId: 'viewmodels/graph/graph',
        nav: true,
        title: 'Social Graph'
      },
      {
        route: 'logout',
        name: 'logout',
        moduleId: 'viewmodels/logout/logout',
        nav: true,
        title: 'Logout'
      },
      {
        route: 'userDetail/:id',
        name: 'userDetail',
        moduleId: 'viewmodels/user/user',
        nav: false,
        title: 'User'
      }
    ]);

    config.mapUnknownRoutes(instruction => {
      return 'home';
    });

    this.router = router;
  }
}
