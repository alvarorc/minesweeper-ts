import React from 'react'
import { RouteProps, Route, Redirect } from 'react-router-dom'
import storage from './helpers/storage'
import { useState } from './providers/game.provider'

interface Props {
  component: React.ElementType
}

const PrivateRoute: React.FC<Props & RouteProps> = function({
  component: Component,
  ...rest
}) {
  const state = useState()
  const { signedin } = storage.getData()

  return (
    <Route
      {...rest}
      render={props =>
        signedin || state.signedin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/signin', state: { from: props.location } }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
