const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route');
const mongoose = require('mongoose');
const app = express()

app.use(bodyParser.json());

mongoose.connect("mongodb+srv://shadab_1928:shadab_1928@cluster0.zb6nc0e.mongodb.net/JobDB?retryWrites=true&w=majority", {
  useNewUrlParser: true
})
  .then(() => console.log("MongoDb is connected"))
  .catch(err => console.log(err))

app.use('/', route);

app.all('/**', (req, res) => {
  res.status(404).send({ status: false, message: 'Page Not Found!' });
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Express app running on port ' + (process.env.PORT || 3000));
});
