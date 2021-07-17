require('dotenv').config();
const express = require('express')
const path = require('path')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const cors = require('cors')
const { checkUser } = require('./utils')

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());
app.use(express.static('files')) // Set static path utk file upload
app.use(express.static('templates')) // Set static path utk template cetak surat


// Routes

const adminRoutes = require('./routes/admin')
    , lingkunganRoutes = require('./routes/lingkungan')
    , keluargaRoutes = require('./routes/keluarga')
    , umatRoutes = require('./routes/umat')
    , detailUmatRoutes = require('./routes/detailUmat')

const suratKeteranganPindah = require('./routes/surat/suratKeteranganPindah')
    , suratKeterangan = require('./routes/surat/suratKeterangan')
    , suratKeteranganBeasiswa = require('./routes/surat/suratKeteranganBeasiswa')
    , suratIzinPelayananEkaristi = require('./routes/surat/suratIzinPelayananEkaristi')
    , suratBaptisAnak = require('./routes/surat/suratBaptisAnak')
    , suratPelayananMinyakSuci = require('./routes/surat/suratPelayananMinyakSuci')
    , suratKeteranganMati = require('./routes/surat/suratKeteranganMati')
    , suratKomuniPenguatan = require('./routes/surat/suratKomuniPenguatan')
    , suratKeteranganCalonPengantin = require('./routes/surat/suratKeteranganCalonPengantin')

const cetakSurat = require('./routes/surat/cetakSurat')
    , logSurat = require('./routes/logSurat')
    , chat = require('./routes/chat')


// Files path to access images, zips, etc
app.use('/files', express.static('files'))


// app.get('/', (req, res) => res.send('haii'))
app.use('/check-user', checkUser)
app.use('/admin', adminRoutes)
app.use('/lingkungan', lingkunganRoutes)
app.use('/keluarga', keluargaRoutes)
app.use('/umat', umatRoutes)
app.use('/detail-umat', detailUmatRoutes)

app.use('/surat-keterangan-pindah', suratKeteranganPindah)
app.use('/surat-keterangan', suratKeterangan)
app.use('/surat-keterangan-beasiswa', suratKeteranganBeasiswa)
app.use('/surat-izin-pelayanan-ekaristi', suratIzinPelayananEkaristi)
app.use('/surat-baptis-anak', suratBaptisAnak)
app.use('/surat-pelayanan-minyak-suci', suratPelayananMinyakSuci)
app.use('/surat-keterangan-mati', suratKeteranganMati)
app.use('/surat-komuni-penguatan', suratKomuniPenguatan)
app.use('/surat-keterangan-calon-pengantin', suratKeteranganCalonPengantin)

app.use('/cetak', cetakSurat)
app.use('/log-surat', logSurat)
app.use('/chat', chat)



const serveStatic = require("serve-static")
// Static folder for Vue JS dist
app.use(serveStatic(path.join(__dirname, 'dist')));
// Handle SPA
app.get(/.*/, (req, res) => res.sendFile(__dirname + '/dist/index.html'));





app.listen(process.env.APP_PORT, () => {
    console.log(`Server is running on PORT :${process.env.APP_PORT}`)
});