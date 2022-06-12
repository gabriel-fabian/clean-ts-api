export const signUpParamsSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    passwordConfirmation: {
      type: 'string',
      required: true
    }
  },
  required: ['name', 'email', 'password', 'passwordConfirmation']
}
