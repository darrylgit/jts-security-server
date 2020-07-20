const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
// var winston = require('winston');
const morgan = require('morgan');

const bodyParser = require('body-parser');
const app = express();

app.use(helmet());
app.use(morgan('tiny'));
app.use(bodyParser.json());

var whitelist = [
  'http://example1.com',
  'http://example2.com',
  'https://danieljwagener.github.io'
];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/secret', (req, res) => {
  const { userInput } = req.body;
  console.log(userInput);
  if (userInput) {
    // winston.log('info', 'user input: ' + userInput);
    res.status(200).json('success');
  } else {
    // winston.error('This guy is messing with us:' + userInput);
    res.status(400).json('incorrect submission');
  }
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
