export const loginValidationSchema = {
  inputSchema: {
    type: 'object',
    required: ['body'],
    properties: {
      body: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
          username: {
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
