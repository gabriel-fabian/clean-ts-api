export const surveysSchema = {
  type: 'object',
  properties: {
    answers: {
      type: 'array',
      items: {
        $ref: '#/schemas/survey'
      }
    }
  }
}
