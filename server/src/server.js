import http from 'http';
import { app } from './app.js';
import { connectDB, disconnectDB } from './config/db.js';
import { env } from './config/env.js';
import { initSocketIO } from './sockets/socketManager.js';

const server = http.createServer(app);

// Initialize real-time WebSocket layer
initSocketIO(server);

async function startServer() {
  try {
    // Attempt DB connection (will log warning if not yet started, but won't crash unhandled)
    try {
      await connectDB();
    } catch (err) {
      console.warn('⚠️ Starting server without active MongoDB connection (DB will retry):', err.message);
    }

    server.listen(env.PORT, () => {
      console.log(`🚀 CampusBid Server running on http://localhost:${env.PORT}`);
      console.log(`📡 Real-time Socket.IO listening on port ${env.PORT}`);
      console.log(`🛡️  Environment: ${env.NODE_ENV}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
async function gracefulShutdown(signal) {
  console.log(`\n🛑 Received ${signal}. Shutting down gracefully...`);
  server.close(async () => {
    console.log('HTTP and WebSocket server closed.');
    try {
      await disconnectDB();
      console.log('MongoDB connection closed.');
    } catch (err) {
      console.error('Error during DB disconnect:', err);
    }
    process.exit(0);
  });
}

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

startServer();
