# Description

Here is my countdown app built usingAngular. See live: https://chic-treacle-7af270.netlify.app/

The app works in portrait as well as in landscape mode while the text displayed on the screen always
resize to fit the width of the screen.

In this app, the user can define the end date and the name of the event taking place on that day.

The text fit solution is reusable by making it a directive.

The event name, as well as the specified end date, are persisted between page reloads with
localStorage.

## Setting upp the app

```shell
$ git clone https://github.com/jenmar1702/jenmar1702.github.io.git
$ cd jenmar1702.github.io
$ npm install
```

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

## Suggestions for improvement

- **Add unit tests** - To ensure reliability and stability
- **Field validation with error handling** - Providing informative error messages and feedback to
  users can further improve usability and guide them towards correct input.
- **Improve accessability** - Ensure keyboard navigation support, and ARIA attributes to make the
  application more inclusive.
