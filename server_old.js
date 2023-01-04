const config = require('./config');


const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

//redis client setup

const redis = require("redis");

const redisClient = redis.createClient({
    host: config.redisHost,
    port: config.redisPort,
    retry_strategy: () => 1000,
  });
  const sub = redisClient.duplicate();


  function fib(index) {
    if (index < 2) return 1;
    return fib(index - 1) + fib(index - 2);
  }
  
  sub.on('message', (channel, message) => {
    redisClient.hset('values', message, fib(parseInt(message)));
  });
  sub.subscribe('insert');

app.use(cors());

app.use('/login', (req, res) => {
  const y= []
  res.send({
    token: 'test123'
  });
});
app.listen(8082, () => console.log('API is running on http://localhost:8083/login'));

/*git commit */