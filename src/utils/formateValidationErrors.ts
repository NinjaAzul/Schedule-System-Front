import { toast } from 'react-toastify'

export type ValidationError = {
  property: string
  error: {
    [key: string]: string
  }
  children: []
}

export const formatAndShowValidationErrors = (errors: ValidationError[]) => {
  for (const error of errors) {
    const property = error.property
    const message = error.error[Object.keys(error.error)[0]]

    const formattedMessage = `${property} - ${message}`

    toast.error(formattedMessage, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }
}
