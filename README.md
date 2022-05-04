# sp-take-home

Take home assignment for SimplePractice interview.

## Some notable omissions from this assignment (due to time constraints):
### Testing
- An acceptance test to cover the entire app flow.
- Integration tests for the progress-side-bar component.

### App
- Making it look less boring (particularly the side-bar).
- Handling the browser back button. Clicking on the side bar to go back works but hitting back in your browser will take you to the previous route with resetting the state.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://cli.emberjs.com/release/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd sp-take-home`
* `npm install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint`
* `npm run lint:fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)
