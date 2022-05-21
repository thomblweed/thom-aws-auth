export const loginValidationSchema = {
  inputSchema: {
    type: 'object',
    required: ['body'],
    properties: {
      body: {
        type: 'string'
      }
    }
  }
};
