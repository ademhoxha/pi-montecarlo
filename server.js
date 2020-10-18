const express = require('express');
const app = express();
const http = require('http').Server(app);

app.use(express.static('dist/task-py/'));

app.get('*', function (req, res) {
  return res.sendFile('index.html', { root: './dist/task-py/' });
});

const io = require('socket.io')(http);
io.on('connection', (socket) => {

  console.log('a user connected ', socket.id);

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('requirepoints', (points) => {
    console.log('new  ' + points + ' point required from ' + socket.id);
    const vec = [];
    for (let i = 0; i < points; i++) {
      vec.push({ x: Math.random(), y: Math.random() });
    }
    io.to(socket.id).emit('newpoints', vec);
  });

});

http.listen(process.env.PORT || 8080, () => console.log('server started'));
