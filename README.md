# Web-Machine

[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/Flet/semistandard)

Web-Machine is a [Redux](http://redux.js.org/) alternative.  Like *Redux*, Web-Machine is inspired by the Elm architecture.
Web-Machine replaces _Middleware_ and _Thunks_ with **subscriptions**.

Subscriptions, informed by State Machine theory, allow side effects to be loaded onto specific transitions in your app state, rather than loaded onto actions, agnostic to state (e.g. [redux-saga](http://yelouafi.github.io/redux-saga/)).

## Subscriptions

Subscriptions are inspired by [Elm Ports](https://guide.elm-lang.org/interop/javascript.html).

When you initialize a Web-Machine program, you may register any number of *subscriptions*.  A *subscription* in Web-Machine is just a function.  Each *subscription* accepts **Commands** (think redux actions), and a dispatch function.  It may then do any side effects you wish, and dispatch **Actions** back to the Web-Machine program.

## Commands vs Actions

In Web-Machine, we use the terms *Command* and *Action* to refer to very similar concepts.  *Commands* and *Actions* have the same API.  Each is simply a plain JavaScript object with the following shape:

```{ type: string; body: any; }```

The only difference is in semantic: **Commands** are sent to *subscriptions*, while **Actions** are sent to the *update* function (analogous to Redux's reducer).

## Usage

An example of usage, ripped shamelessly from my own fledgling project:

[https://github.com/ajhyndman/website](https://github.com/ajhyndman/website)


```js
// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Program } from 'web-machine';
import { assoc } from 'ramda';

import NewsFeed from 'components/NewsFeed';

const Title = styled.h1`
  font-size: 2em;
`;

const Container = styled.div`
  text-align: center;
  padding: 1rem;
`;

const init = [
  {
    title: 'New York Times Headlines',
    news: []
  },
  { type: 'FETCH_NEWS' }
];

const subscriptions = [
  (command, dispatch) => {
    switch (command.type) {
      case 'FETCH_NEWS':
        window.fetch('https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Frss.nytimes.com%2Fservices%2Fxml%2Frss%2Fnyt%2FHomePage.xml')
          .then((response) => response.json())
          .then((responseJson) => {
            dispatch({
              type: 'UPDATE_NEWS',
              body: responseJson.items
            });
          });
        break;
      default:
        return;
    }
  }
];

const update = (action, model) => {
  switch (action.type) {
    case 'UPDATE_NEWS':
      return [assoc('news', action.body, model)];
    case 'FETCH_NEWS':
      return [model, { type: 'FETCH_NEWS' }];
    default:
      return [model];
  }
};

const view = (model, dispatch) => {
  ReactDOM.render(
    <Container>
      <Title>{model.title}</Title>
      <NewsFeed news={model.news} />
      <button onClick={() => dispatch({ type: 'FETCH_NEWS' })}>Update News</button>
    </Container>,
    document.querySelector('#app')
  );
};

export default new Program({ init, subscriptions, update, view });
```
