require('dotenv').config();
const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
const { checkUser } = require('./utils')

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
// app.use(bodyParser.urlencoded());
// app.use(bodyParser.urlencoded({extended: true}));


// Routes
const adminRoutes = require('./routes/admin')
const lingkunganRoutes = require('./routes/lingkungan')
const keluargaRoutes = require('./routes/keluarga')
const umatRoutes = require('./routes/umat')
const detailUmatRoutes = require('./routes/detailUmat')

const suratKeteranganPindah = require('./routes/surat/suratKeteranganPindah')


app.get('/', (req, res) => res.send('haii'))
app.use('/check-user', checkUser)
app.use('/admin', adminRoutes)
app.use('/lingkungan', lingkunganRoutes)
app.use('/keluarga', keluargaRoutes)
app.use('/umat', umatRoutes)
app.use('/detail-umat', detailUmatRoutes)

app.use('/surat-keterangan-pindah', suratKeteranganPindah)



app.listen(process.env.APP_PORT, () => {
    try {
        console.log(`Server is running on PORT :${process.env.APP_PORT}`)
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});