import { Server } from 'socket.io';

export const startWebSocketServer = (server: any) => {
    const io = new Server(server, {
        cors: {
            origin: '*',
        },
    });

    io.on('connection', (socket) => {
        console.log('⚡ User connected:', socket.id);

        socket.on('join-list', (listId) => {
            socket.join(listId);
        });

        socket.on('update-list', (list) => {
            io.to(list._id).emit('list-updated', list);
        });

        socket.on('disconnect', () => {
            console.log('❌ User disconnected:', socket.id);
        });
    });

    return io;
};
