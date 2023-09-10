const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const app = express();
const cors = require('cors');

app.use(cors());

const PORT = 3000;

app.use(bodyParser.json());
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
