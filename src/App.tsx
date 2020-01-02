import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useDispatch } from './providers/game.provider'
import storage from './helpers/storage'
import PrivateRoute from './PrivateRoute'
import Auth from './Authenticate'
import Signin from './Signin'
import Game from './Game'

function App(): React.ReactElement {
  const dispatch = useDispatch()

  useEffect(() => {
    const gameData = storage.getData()
    if (gameData.signedin) {
      console.log('restore data', gameData)
      dispatch({ type: 'restore_game', payload: gameData })
    }
  }, [])

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Auth} />
        <Route path="/signin" component={Signin} />
        <PrivateRoute path="/game/:username" component={Game} />
      </Switch>
    </Router>
  )
}

export default App
