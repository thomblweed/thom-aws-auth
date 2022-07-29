export const loginValidationSchema = {
  inputSchema: {
    type: 'object',
    required: ['body'],
    properties: {
      body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: {
            type: 'string',
            minLength: 1
          },
          password: {
            type: 'string',
            minLength: 1
          }
        }
      }
    }
  }
};
