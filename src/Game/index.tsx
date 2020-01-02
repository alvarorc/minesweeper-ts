import React from 'react'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router-dom'
import { Grid, Segment, Header } from 'semantic-ui-react'
import { useState, useDispatch, CurrentGame } from '../providers/game.provider'
import GameHistory from '../components/GamesHistory'

import GameForm, { GameOptions } from './Form'

const Container = styled.div`
  margin: 20px 0px;
`

const Game: React.FC<RouteComponentProps> = function({ history }) {
  const dispatch = useDispatch()
  const { username } = useState()

  function handleOnStartGame(gameOptions: GameOptions) {
    const game: CurrentGame = {
      start: new Date(),
      ...gameOptions,
    }
    dispatch({ type: 'start_game', payload: game })
  }

  return (
    <Container>
      <Header as="h2" textAlign="center">
        Welcome back {username}
      </Header>
      <Grid stackable padded>
        <Grid.Column width={10}>
          <Header as="h3" dividing>
            To start playing first select your game preferences
          </Header>
          <GameForm onStartGame={handleOnStartGame} />
        </Grid.Column>
        <Grid.Column width={6}>
          <Segment>
            <Header as="h3">Your last games:</Header>
            <GameHistory />
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  )
}

export default Game
