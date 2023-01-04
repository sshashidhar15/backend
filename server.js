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
  const redisPublisher = redisClient.duplicate();
