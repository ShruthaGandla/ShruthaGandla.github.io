const express = require('express');
const app = express();
const PORT = 5000;

app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

app.use(express.static('dist'));

app.listen(PORT, () => console.log(`listening on port ${PORT}`))

