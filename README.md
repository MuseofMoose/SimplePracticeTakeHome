# sp-take-home

Take home assignment for SimplePractice interview.
## Notes
I used the endpoints provided in the assignment document to get an idea of the shape of the API and then did my best to replicate it in mirage for the sake of making development and testing easier (not having to deal with CORS is a plus, too). You can explore my mirage models/factories for further detail. There were some small assumptions I needed to make regarding the relationships between the back-end data given my inability to see the back-end code but nothing too daunting.

<br/>

## Notable omissions from this assignment (due to time constraints):
### Testing
- An acceptance test to cover the entire app flow.

### App
- Making it look less boring (particularly the side-bar).
- Handling the browser back button. Clicking on a completed step in the side bar to go back works but hitting back in your browser will take you to the previous route without resetting the state.

<br/>

## Ember ReadMe Boilerplate
#### Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://cli.emberjs.com/release/)
* [Google Chrome](https://google.com/chrome/)

#### Installation

* `git clone <repository-url>` this repository
* `cd sp-take-home`
* `npm install`

#### Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

##### Running Tests

* `ember test`
* `ember test --server`

##### Linting

* `npm run lint`
* `npm run lint:fix`

##### Building

* `ember build` (development)
* `ember build --environment production` (production)
