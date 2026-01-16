import { Server } from 'socket.io';

let io;

export const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: process.env.FRONTEND_URL || "http://localhost:3000",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log(`✅ Client kết nối: ${socket.id}`);

        socket.on('disconnect', () => {
            console.log(`❌ Client ngắt kết nối: ${socket.id}`);
        });
    });
};

// Hàm này giúp lấy biến IO ở bất kỳ file nào khác (Controller)
export const getIO = () => {
    if (!io) {
        throw new Error('Socket.io chưa được khởi tạo!');
    }
    return io;
};