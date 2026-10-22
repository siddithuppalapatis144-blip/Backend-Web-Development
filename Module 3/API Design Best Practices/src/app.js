
const express = require('express');
const postRoutes = require('./routes/postRoutes');
const { resetData } = require('./data/postStore');

function createApp() {
  const app = express();

  app.use(express.json());

  // Resource-oriented API routes
  app.use('/', postRoutes);

  // Handle invalid JSON and other unexpected errors safely
  app.use((err, req, res, next) => {
    console.error('API error:', err);

    if (res.headersSent) {
      return next(err);
    }

    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      return res.status(400).json({
        ok: false,
        error: {
          code: 'INVALID_JSON',
          message: 'Request body contains invalid JSON'
        }
      });
    }

    return res.status(500).json({
      ok: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An unexpected error occurred'
      }
    });
  });

  return app;
}

if (require.main === module) {
  const app = createApp();
  const port = 3000;

  app.listen(port, () => {
    console.log(`Starter API listening on port ${port}`);
  });
}

module.exports = {
  createApp,
  resetData
};
