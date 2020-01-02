import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useDispatch } from '../providers/game.provider'
import storage from '../helpers/storage'

const Authenticate: React.FC<RouteComponentProps> = function({ history }) {
  const dispatch = useDispatch()

  // execute one time and restore game data if exist
  React.useEffect(() => {
    const gameData = storage.getData()
    let to = '/signin'

    if (gameData.signedin) {
      dispatch({ type: 'restore_game', payload: gameData })
      to = `/game/${gameData.username}`
    }

    history.replace(to)
  }, [])

  return <div>Retrieving game data...</div>
}

export default Authenticate
