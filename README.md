# Tweet - A Twitter clone using Aurelia

Tweet is a twitter clone redeveloped with Aurelia, a JavaScript client framework which features, for example, Two-Way Databinding, Routing & UI Composition and Broad Language Support using the latest standards like ES 2016 (ES7).

You can explore the single page application by opening the [Homepage](https://xxifear.github.io) and creating an account and/or signing in. You are able to post tweets, change your own account's details, look at the user graph of all registered users, get an overview of all written posts by opening the 'global timeline' and much more.

## Getting Started

For developing and testing purposes, clone a copy of the current master branch to your local machine and open the project using an Integrated Development Environment like WebStorm.

You are then able to build and run the project by typing 'au run --watch' into your IDEs project console. The application is then served on localhost:9000.
Aurelia CLI and NodeJS is required and must be installed on your system. Look at 'Prerequisites' to get more information on how to install them.

### Prerequisites/Installing

NodeJS must be installed first in order to use the Node Package Manager (NPM) which is required to install all project dependencies and Aurelia CLI. Install it by downloading and running the latest version from [NodeJS.org](https://nodejs.org/en/).
Having finished the installation of NodeJS, go ahead and install Aurelia CLI by typing 'npm install aurelia-cli' into your IDE's console.
Lastly, the most important prerequisit is the backend, which the application will send its requests to. Look at the [Tweet-Server](https://github.com/xxiFear/tweet-server) for more details on how to install it and set it up.
As soon as the server is up and running and successfully connects to the MongoDB database, everything should work together.

## Deployment

You can deploy the project (Client) on a GitHub page. Do this by creating an account on [GitHub](https://github.com) and using this [Tutorial](https://pages.github.com/)

## Built With

* [NodeJS](https://nodejs.org) - The JavaScript runtime built on Chrome's V8 JavaScript engine
* [Aurelia](https://aurelia.io) - The JavaScript client framework

## Versioning

New versions are tagged within the master branch

## Authors

* **Matthias Nord** - *Everything* - [xxiFear](https://github.com/xxifear)


## Acknowledgments

* This project was created as assignment for the course Developing Modern Web Applications Using NodeJS (DMAS)
