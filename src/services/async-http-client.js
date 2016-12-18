import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {EventAggregator} from 'aurelia-event-aggregator';
import Fixtures from './fixtures';
import {LoginStatus} from './messages';

@inject(HttpClient, Fixtures, EventAggregator)
export default class AsyncHttpClient {

  constructor(httpClient, fixtures, ea) {
    this.http = httpClient;
    this.http.configure(http => {
      http.withBaseUrl(fixtures.baseUrl);
    });
    this.ea = ea;
  }

  isAuthenticated() {
    let authenticated = false;
    if (localStorage.donation !== 'null') {
      authenticated = true;
      this.http.configure(http => {
        const auth = JSON.parse(localStorage.donation);
        http.withHeader('Authorization', 'bearer ' + auth.token);
      });
    }
    return authenticated;
  }

  clearAuthentication() {
    localStorage.donation = null;
    this.http.configure(configuration => {
      configuration.withHeader('Authorization', '');
    });
  }

  authenticate(url, user) {
    this.http.post(url, user).then(response => {
      const status = response.content;
      if (status.success) {
        localStorage.donation = JSON.stringify(response.content);
        this.http.configure(configuration => {
          configuration.withHeader('Authorization', 'bearer ' + response.content.token);
        });
      }
      this.ea.publish(new LoginStatus(status));
    }).catch(error => {
      const status = {
        success: false,
        message: 'service not available'
      };
      this.ea.publish(new LoginStatus(status));
    });
  }

  get(url) {
    return this.http.get(url);
  }

  post(url, obj) {
    return this.http.post(url, obj);
  }

  delete(url) {
    return this.http.delete(url);
  }
}
