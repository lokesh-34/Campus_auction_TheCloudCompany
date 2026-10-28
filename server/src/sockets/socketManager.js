import { Server } from 'socket.io';
import { env } from '../config/env.js';

let ioInstance = null;

/**
 * Initialize Socket.IO with the HTTP server
 * @param {import('http').Server} httpServer
 */
export function initSocketIO(httpServer) {
  ioInstance = new Server(httpServer, {
    cors: {
      origin: env.CLIENT_URL,
      methods: ['GET', 'POST'],
      credentials: true,
    },
    pingInterval: 25000,
    pingTimeout: 20000,
  });

  ioInstance.on('connection', (socket) => {
    // Join specific auction room
    socket.on('auction:join', (listingId) => {
      if (typeof listingId === 'string' && listingId.trim()) {
        const room = `auction:${listingId}`;
        socket.join(room);
      }
    });

    // Leave specific auction room
    socket.on('auction:leave', (listingId) => {
      if (typeof listingId === 'string' && listingId.trim()) {
        socket.leave(`auction:${listingId}`);
      }
    });

    // Join private authenticated user room for real-time notifications
    socket.on('user:join', (userId) => {
      if (typeof userId === 'string' && userId.trim()) {
        socket.join(`user:${userId}`);
      }
    });

    socket.on('disconnect', () => {
      // Clean disconnect
    });
  });

  console.log('✅ Socket.IO initialized and ready.');
  return ioInstance;
}

/**
 * Get the active Socket.IO server instance
 * @returns {Server}
 */
export function getIO() {
  if (!ioInstance) {
    throw new Error('Socket.IO has not been initialized yet.');
  }
  return ioInstance;
}

/**
 * Broadcast event to all watchers in an auction room
 * @param {string} listingId
 * @param {string} event
 * @param {any} data
 */
export function emitAuctionUpdate(listingId, event, data) {
  if (ioInstance) {
    ioInstance.to(`auction:${listingId}`).emit(event, data);
  }
}

/**
 * Emit event to a specific authenticated user's room
 * @param {string} userId
 * @param {string} event
 * @param {any} data
 */
export function emitUserUpdate(userId, event, data) {
  if (ioInstance) {
    ioInstance.to(`user:${userId}`).emit(event, data);
  }
}
