const {
  PORT,
  NODE_ENV,
  GRAPHQL_DEPTH_LIMIT
} = process.env;

export const constants = {
  PORT,
  NODE_ENV,
  GRAPHQL_DEPTH_LIMIT: parseInt(GRAPHQL_DEPTH_LIMIT || '4'),
  ENVIRONMENTS: {
    DEV: 'development',
    PROD: 'production',
    TEST: 'test'
  },
  SUBSCRIPTION_TOPICS: {
    USER_ADDED: 'USER_ADDED'
  },
  LOG_LEVELS: {
    INFO: 'info',
    ERROR: 'error',
    DEBUG: 'debug',
    WARN: 'warn',
  },
  ERRORS: {
    BAD_REQUEST: {
      TYPE: 'BAD_REQUEST',
      CODE: 400
    },
    NOT_FOUND: {
      TYPE: 'NOT_FOUND',
      CODE: 404
    },
    INTERNAL_SERVER_ERROR: {
      TYPE: 'INTERNAL_SERVER_ERROR',
      CODE: 500
    },
    UNAUTHORIZED: {
      TYPE: 'UNAUTHORIZED',
      CODE: 403
    },
    UNAUTHENTICATED: {
      TYPE: 'UNAUTHENTICATED',
      CODE: 402
    }
  }
};
