const http = require('http')
const express = require('express')
const app = express();
const cors = require('cors')
const PORT = process.env.PORT || 128;
const WebSocket = require('ws')
const server = http.createServer(express)
const wss = new WebSocket.Server({server})
const dotenv = require('dotenv')
const Car = require('./car')
const mongoose = require('mongoose')
const INDEX = '/indexx.html';

dotenv.config();
app.use(cors())
mongoose.connect(process.env.DB_CONNECT, 
    { useNewUrlParser: true },
    ()=> console.log('connected to db'));

   
app.get('/all', async(req, res)=>{

    try {
       const all = await Car.find()
       res.status(200).send(all) 
    } catch (error) {
        console.log(error)
    }
})

wss.on('connection', (ws)=>{

  console.log('connected')

    ws.on('message', async function incoming(data){
        var objectt = JSON.parse(data);
        
      const cardata = new Car({
          fuelLevel: objectt.fuelLevel,
          speed: objectt.speed
      })
      try {
        const savedData = await cardata.save()
       // console.log(savedData)
        
    } catch (error) {
        console.log(error)
    }
        wss.clients.forEach(function each(client){
            if(client !== ws && client.readyState === WebSocket.OPEN){
                client.send(data)
                console.log(JSON.parse(data))
            }
        })
    })
});



app.use((req, res) => res.sendFile(INDEX, { root: __dirname }))
server.listen(PORT, () => console.log(`Listening on ${PORT}`));