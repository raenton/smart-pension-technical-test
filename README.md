## SmartPension JS Test

This is a technical test for Smart Pension. Please be aware that I chose to focus my time on the functionality rather than styling, in the interest of time, so there is little CSS to speak of.

### Requirements

- NodeJS 14.8.0 or higher required

### Setup instructions

#### Server

The server code lives in /server. Dependencies should be installed with npm, by `npm install`. You can then run `npm dev` which will run the app and indicate to it that it is in dev mode, which is necessary for CORs to be enabled so that the front end client can interact with it.

#### Front end client

The front end client lives in /client. It was bootstrapped using Create React App and therefore uses yarn as the default package manager. To install dependencies, please run
`yarn install`. You can then run `yarn start` to run it. 

The API_URL env variable can be used to point the front end to the server's proper URL, if it differs from the localhost:8001 default.
