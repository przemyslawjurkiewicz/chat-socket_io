const express = require('express');
const http = require('http');
const socetIo = require('socet.io');
const UsersService = require('./UsersService');

const app = express();
const server = http.createServer(app);
const io = socetIo(server);
const usersService = new UsersService(); 

app.use(express.static('${__dirname}/public'));

app.get('/', (req, res) => {
  res.sendFile('${__dirname}/index.html');
});

io.on('connection', socet => {
  // klient nasłuchuje na wiadomość wejścia do czatu
  socet.on('join', name => {
    // użytkownika, który pojawił się w aplikacji, zapisujemy do serwisu trzymającego listę osób w czacie
    usersService.addUser({
      id: socet.id,
      name
    });
    // aplikacja emituje zdarzenie update, które aktualizuje informację na temat listy użytkowników każdemu nasłuchującemu na wydarzenie 'update'
    io.emit('update', {
      users: usersService.getAllUsers()
    });
  });

  socket.on('disconnect', () => {
    usersService.removeUser(socket.id);
    socket.broadcast.emit('update', {
      users: usersService.getAllUsers()
    });
  });

  socet.on('message', message => {
    const { name } = usersService.getuserById(socet.id);
    socet.broadcast.emit('message', {
      text: message.text,
      from: name
    });
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
