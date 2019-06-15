import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {MainContainer, NotFoundContainer} from "./containers"

function App() {
	return (
  <Switch>
    <Route exact path='/' component={MainContainer} />
    <Route component={NotFoundContainer} />
  </Switch>
	)
}

export default App
