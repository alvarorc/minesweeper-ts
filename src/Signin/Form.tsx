import React from 'react'
import { Form as SUForm, Button } from 'semantic-ui-react'
import useForm from '../helpers/form.hook'

type Dictionary = { [key: string]: string }

interface Props {
  onSuccess: (values: Dictionary) => void
}

function validate(values: Dictionary) {
  const errors: Dictionary = {}

  if (!values.name) {
    errors.name = 'The user name is required'
  }

  return errors
}

const Form: React.FC<Props> = function({ onSuccess }) {
  const { handleSubmit, handleOnChange, errors, isSubmiting } = useForm(
    onSuccess,
    validate
  )

  return (
    <SUForm size="large" onSubmit={handleSubmit}>
      <SUForm.Input
        fluid
        icon="user"
        name="name"
        iconPosition="left"
        placeholder="Enter your name"
        onChange={handleOnChange}
        error={!!errors.name}
      />

      <Button color="teal" fluid size="large" loading={isSubmiting}>
        Start
      </Button>
    </SUForm>
  )
}

export default Form
