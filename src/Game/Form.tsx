import React from 'react'
import { Form, Input, Select, Button, Message, Icon } from 'semantic-ui-react'
import useForm from '../helpers/form.hook'

export interface GameOptions {
  dificulty: string
  rows: number
  columns: number
}

interface Props {
  onStartGame: (gameOptions: GameOptions) => void
}

function validate(values: Record<string, string>) {
  const errors: Record<string, string> = {}

  if (!values.rows) {
    errors.rows = 'Rows are required'
  } else if (isNaN(Number(values.rows))) {
    errors.rows = 'Only numbers are allowed'
  }

  if (!values.columns) {
    errors.columns = 'Columns are required'
  } else if (isNaN(Number(values.columns))) {
    errors.columns = 'Only numbers are allowed'
  }

  if (!values.dificulty) {
    errors.dificulty = 'You have to select the dificulty'
  }

  return errors
}

const FormErrors: React.FC<{ errors: string[]; visible: boolean }> = function({
  errors,
  visible,
}) {
  if (!visible) {
    return null
  }

  return (
    <Message icon error>
      <Icon name="exclamation triangle" />
      <Message.Content>
        {errors.map((e, i) => (
          <li key={`row-${i}`}>{e}</li>
        ))}
      </Message.Content>
    </Message>
  )
}

const GameForm: React.FC<Props> = function({ onStartGame }) {
  const {
    handleOnChange,
    handleSubmit,
    handleCustomOnChange,
    errors,
  } = useForm(onStartGame, validate)

  const options = [
    { key: 'e', text: 'Easy', value: 'easy' },
    { key: 'm', text: 'Medium', value: 'medium' },
    { key: 'h', text: 'Hard', value: 'hard' },
  ]

  function handleOnSelect(
    _e: React.FormEvent<HTMLSelectElement>,
    data: Record<string, string>
  ) {
    handleCustomOnChange(data.name, data.value)
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group inline>
          <label>Board size</label>
          <Form.Field
            name="rows"
            control={Input}
            onChange={handleOnChange}
            placeholder="10"
            width={2}
            error={!!errors.rows}
          />
          <label>x</label>
          <Form.Field
            name="columns"
            control={Input}
            onChange={handleOnChange}
            placeholder="10"
            width={2}
            error={!!errors.columns}
          />
          <Form.Field
            name="dificulty"
            control={Select}
            onChange={handleOnSelect}
            label="Dificulty"
            options={options}
            error={!!errors.dificulty}
          />
        </Form.Group>
        <Button color="teal">Start Game</Button>
      </Form>
      <FormErrors
        errors={Object.values(errors)}
        visible={!!Object.keys(errors).length}
      />
    </div>
  )
}

export default GameForm
