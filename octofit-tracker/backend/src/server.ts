import app from './app.js';
import { connectToDatabase } from './config/database.js';

const port = process.env.PORT || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

async function start() {
  try {
    await connectToDatabase();
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
      console.log(`API base URL: ${baseUrl}`);
    });
  } catch (error) {
    console.error('Failed to start server', error);
    process.exit(1);
  }
}

start();
