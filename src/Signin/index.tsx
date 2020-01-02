import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Grid, Segment, Header, Image } from 'semantic-ui-react'
import { useDispatch } from '../providers/game.provider'
import storage from '../helpers/storage'
import Form from './Form'
import logo from '../logo.jpeg'

const Login: React.FC<RouteComponentProps> = function({ history }) {
  const dispatch = useDispatch()

  function handleOnSuccess(values: { [key: string]: string }) {
    dispatch({ type: 'signin', payload: values.name })
    storage.storeData({ signedin: true, username: values.name, games: [] })
    history.push(`/game/${values.name}`)
  }

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Segment stacked>
          <Header as="h2" color="teal" textAlign="center">
            <Image src={logo} />
            Minesweeper
          </Header>
          <Form onSuccess={handleOnSuccess} />
        </Segment>
      </Grid.Column>
    </Grid>
  )
}

export default Login
