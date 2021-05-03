const express = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors');

const app = express();
const PORT = 5000;

// Routes
const adminRoutes = require('./routes/admin.js')

// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({
    extended: true
  }));

app.get('/', (req, res) => res.send('haii'))
app.use('/admin', adminRoutes)


app.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`)
});