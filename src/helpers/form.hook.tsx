import { useState, useEffect } from 'react'

// NOTE: Add here another HTML elements to be typed
type FormElements = HTMLInputElement | HTMLSelectElement

interface FormHook {
  inputs: Record<string, string>
  handleOnChange: (event: React.FormEvent<FormElements>) => void
  handleCustomOnChange: (name: string, value: string | number) => void
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  errors: { [key: string]: string }
  isSubmiting: boolean
}

function useForm(callback: Function, validations?: Function): FormHook {
  const [inputs, setInputs] = useState({})
  const [errors, setErrors] = useState({})
  const [isSubmiting, setIsSubmiting] = useState(false)

  function handleOnChange(event: React.FormEvent<FormElements>) {
    const { value, name } = event.currentTarget

    setInputs({ ...inputs, [name]: value })
  }

  function handleCustomOnChange(name: string, value: string | number) {
    setInputs({ ...inputs, [name]: value })
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmiting(true)

    if (validations) {
      setErrors(validations(inputs))
    } else {
      setErrors({})
    }
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmiting) {
      callback(inputs)
    }

    setIsSubmiting(false)
  }, [errors])

  return {
    inputs,
    handleOnChange,
    handleCustomOnChange,
    handleSubmit,
    errors,
    isSubmiting,
  }
}

export default useForm
