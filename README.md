# AskIt, the online tool for asking and answering questions on various topics

Welcome to AskIt!

This web app allows users to post questions and answers. Fell free to try it out. 

Please note that, for now, ***passwords are saved in database as clear text. Do not use any of your usual passwords***.

This app is deployed with Netlify and can be accessed here: https://mop-react-frontend.netlify.app/.

## Used technologies

### Frontend

The app is built using the [React library](https://reactjs.org/) v17.0.2 and bootstrapped using create-react-app.

Code itself is written using [TypeScript](https://www.typescriptlang.org/) (v4.5.5 at the moment), a statically typed JavaScript superset.

UI and styling is done with [MaterialUI](https://material-ui.com/) (v5), a React UI framework.

Global state is managed using the [Redux](https://redux.js.org/) (v4.1.2 at the moment) library.

For middleware, [Redux Saga](https://redux-saga.js.org/) (v1.1.3) has been chosen.

Navigation is implemented with [React Router](https://reactrouter.com/docs/en/v6/getting-started/overview) v6.

CI/CD is done through [CircleCI](https://circleci.com/) service. Related .yml filed can be found within ```.circleci``` directory.

### Backend

Backend is a node/express app coupled with [JSON Server](https://github.com/typicode/json-server) fake REST API. It is deployed on Heroku. The code for it can be found in the ```backend``` directory.

Notifications are implemented with [SocketIO](https://socket.io/) on both server and client side.

## Code organization

The ```src``` directory contains the following subdirectories:

* ```app```
  * ```api``` - Api configuration
  * ```_redux``` - Redux store, actions, reducers and types
* ```components``` - React components. Atomic design is used, so the components are split into atoms, molecules, organisms and templates. There are also provider components that wrap the App to provide specific services, such as Authentication. Pages are defined separately from this directory.
* ```images``` - Used images, such as logo
* ```pages``` - Page components, that each render the appropriate template.
* ```services``` - Contains code for several services such as localization, id generation, etc.
* ```styles``` - MaterialUI theme and basic styling for html and #root elements
* ```types``` - Definitions of custom TypeScript interfaces and types, used throughout the app, as well as module definitions for .jpg and .png files, so that they can be safely imported.

Outside the ```src``` directory, ```.circleci``` directory contains the ```config.yml``` file, which defines CI/CD pipeline. and ```backend``` directory contains the backend code.

## Design

Design is implemented using MaterialUI. The app is responsive and works on various screen sizes.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
