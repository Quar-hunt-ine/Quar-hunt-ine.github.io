import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import HomePage from './components/HomePage'
import Instructions from './components/Instructions'
import NavBar from './components/NavBar'
import Question from './components/Question'
import Winner from './components/Winner'

const App = () => {
  return (
    <BrowserRouter>
      <NavBar/>
      <Switch>
        <Route exact path="/">
          <HomePage/>
        </Route>
        <Route path="/instructions">
          <Instructions/>
        </Route>
        <Route path="/question/:questionId">
          <Question/>
        </Route>
        <Route path="/winner">
          <Winner/>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App