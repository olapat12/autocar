'use strict';

const express = require('express');
const { Server } = require('ws');

const PORT = process.env.PORT || 2498;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`We\'re live on channel : ${PORT}`));

const wss = new Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('close', () => console.log('Client disconnected'));

  ws.on('message', (message) =>{
    // this stays within the server
    console.log('[SERVER]: Received a message => %s', message );

    // broadcast message to all clients
    wss.clients.forEach(function per(client){
        if(client !== ws && client.readyState === webSocket.OPEN){
            client.send(message);
            console.log("Broadcast msg: "+ message);
        }
        client.send('Youre receiving this message cos youre on our network')
    })

    })

});

setInterval(() => {
  wss.clients.forEach((client) => {
    client.send(JSON.stringify({"Live reading":(Math.floor(Math.random() * 10 ) +1 )}));
  });
}, 2000);