require('dotenv').config();
const express = require('express')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const cors = require('cors')
const { checkUser } = require('./utils')

const app = express()
const http = require("http").createServer(app)
const io = require("socket.io")(http, {
    cors: {
      origin: "http://localhost:8080",
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type"],
      credentials: true
    }
  })

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


// Files path to access images, zips, etc
app.use('/files', express.static('files'))


app.get('/', (req, res) => res.send('haii'))
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





http.listen(process.env.APP_PORT, () => {
    console.log(`Server is running on PORT :${process.env.APP_PORT}`)
    
});



// Socket Middleware utk cek username
io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    if (!username) {
        return next(new Error("invalid username"));
    }
    socket.username = username;
    next();
});


io.on("connection", function (socket) {
    let users = []

    // List connected users
    io.on("connection", (socket) => {
        const users = [];
        for (let [id, socket] of io.of("/").sockets) {
          users.push({
            userID: id,
            username: socket.username,
          });
        }
        socket.emit("users", users);
    });

    // print to check if a user is connected
    console.log("User connected", socket.id);

    socket.on('send_message', (data) => {
        let socketId = users[data.receiver]
        io.to(socketId).emit('new_message', data)
    })


    // forward the private message to the right recipient
    socket.on("private message", ({ content, to }) => {
        socket.to(to).emit("private message", {
        content,
        from: socket.id,
        });
    });
});