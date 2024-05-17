# Description

Here is a countdown app built using Angular. See live: https://chic-treacle-7af270.netlify.app/

The app works in portrait as well as in landscape mode while the text displayed on the screen always
resize to fit the width of the screen.

In this app, the user can define the end date and the name of the event taking place on that day.

The text fit solution is reusable by making it a directive.

The event name, as well as the specified end date, are persisted between page reloads with
localStorage.

## Setting upp the app

```shell
$ git clone https://github.com/jenmar1702/date-countdown.git
$ cd date-countdown
$ npm install
```

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.
