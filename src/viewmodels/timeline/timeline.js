import {inject} from 'aurelia-framework';
import TweetService from '../../services/tweet-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import {DialogService} from 'aurelia-dialog';
import {DeleteConfirmationDialog} from './deleteConfirmationDialog';
import {TotalTweetsUpdatedMessage} from '../../services/messages';

@inject(TweetService, DialogService, EventAggregator)
export class Timeline {


  globalTweets = [];
  tweetInput = '';

  constructor(tweetService, dialogService, eventAggragator) {
    this.tweetService = tweetService;
    this.dialogService = dialogService;
    eventAggragator.subscribe(TotalTweetsUpdatedMessage, message => {
      this.globalTweets = message.totalTweets;
    });
  }

  writeNewTweet(event) {
    console.log(`Writing new Tweet with content: ${this.tweetInput}`);
    //Works but object needs to be pushed from http response
    let tweet = this.tweetService.postTweet(this.tweetInput);
    this.globalTweets.unshift(tweet);

    console.log(`Global Tweets size here is: ${this.globalTweets.length}`);
  }

  activate(params) {
    let id = params.id;
    if (typeof id === 'undefined' || id === null) {
      //Tweets werden erst millisekunden nach api call geladen, also liegen sie zwar in der Liste
      //im Tweetservice vor aber die Seite wurde zuvor schon fertig gerendert
      //Frage: Gibt es einen Event Aggregator der die Liste dann zurück überträgt??
      this.tweetService.getGlobalTweets();
      this.globalTweets = this.tweetService.globalTweets;
    } else {
      this.tweetService.getTweetsFromUser(id);
      this.globalTweets = this.tweetService.tweets;
    }
  }

  showConfirmationDialog(tweet) {
    this.dialogService.open({ viewModel: DeleteConfirmationDialog, model: tweet}).then(response => {
      if (!response.wasCancelled) {
        console.log('good - ', response.output);
      } else {
        console.log('bad');
      }
      console.log(response.output);
    });
  }

}
