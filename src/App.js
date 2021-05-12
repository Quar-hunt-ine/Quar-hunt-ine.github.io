import React from 'react'
import {HashRouter, Route, Switch} from 'react-router-dom'
import HomePage from './components/HomePage'
import Instructions from './components/Instructions'
import MainQuestion from './components/MainQuestion'
import NavBar from './components/NavBar'
import Question from './components/Question'
import Winner from './components/Winner'

const App = () => {
  return (
    <HashRouter>
      <NavBar/>
      <Switch>
        <Route exact path="/">
          <HomePage/>
        </Route>
        <Route path="/instructions">
          <Instructions/>
        </Route>
        <Route path='/main-question'>
          <MainQuestion/>
        </Route>
        <Route path="/question/:questionId">
          <Question/>
        </Route>
        <Route path="/winner">
          <Winner/>
        </Route>
      </Switch>
    </HashRouter>
  )
}

export default App
