import React, { useContext, useReducer } from 'react'

enum Dificulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}
interface ProviderProps {
  children: React.ReactNode
}

export interface Game {
  start: Date
  end: Date
  dificulty: Dificulty
  status: 'won' | 'lost' | 'playing'
}

export interface CurrentGame {
  start: Date
  rows: number
  columns: number
  dificulty: string
}

export interface State {
  username: string
  games: Game[]
  signedin: boolean
  currentGame?: CurrentGame
}

interface RestoreGameAction {
  type: 'restore_game'
  payload: State
}

interface SigninAction {
  type: 'signin'
  payload: string
}

interface SignoutAction {
  type: 'signout'
}

interface SaveGameAction {
  type: 'save_game'
  payload: Game
}

interface StartGameAction {
  type: 'start_game'
  payload: CurrentGame
}

type Dispatch = (
  action:
    | SigninAction
    | SignoutAction
    | SaveGameAction
    | RestoreGameAction
    | StartGameAction
) => void

const StateContext = React.createContext<State | undefined>(undefined)
const DispatchContext = React.createContext<Dispatch | undefined>(undefined)

function reducer(
  state: State,
  action:
    | SigninAction
    | SignoutAction
    | SaveGameAction
    | RestoreGameAction
    | StartGameAction
): State {
  switch (action.type) {
    case 'signin':
      return { ...state, username: action.payload, signedin: true }
    case 'save_game':
      return { ...state, games: [action.payload, ...state.games] }
    case 'signout':
      return { ...state, signedin: false }
    case 'restore_game':
      return { ...action.payload }
    case 'start_game':
      return { ...state, currentGame: action.payload }
    default:
      return state
  }
}

const initialState: State = {
  username: '',
  signedin: false,
  games: [],
}

const Provider: React.FC<ProviderProps> = function({
  children,
  ...remainingProps
}) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <StateContext.Provider value={state} {...remainingProps}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

function useState() {
  const context = useContext(StateContext)

  if (context === undefined) {
    throw new Error('useCountState must be used within a GameProvider')
  }

  return context
}

function useDispatch() {
  const context = useContext(DispatchContext)

  if (context === undefined) {
    throw new Error('useCountState must be used within a GameProvider')
  }

  return context
}

export { Provider, useState, useDispatch }
