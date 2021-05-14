const Sequelize = require('sequelize')
const sequelize = require('../config/database');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.admin = require('./Admin.js')(sequelize, Sequelize);
db.keluarga = require('./Keluarga.js')(sequelize, Sequelize);
db.lingkungan = require('./Lingkungan.js')(sequelize, Sequelize);
db.umat = require('./Umat.js')(sequelize, Sequelize);
db.detailUmat = require('./DetailUmat.js')(sequelize, Sequelize);

db.suratKeteranganPindah = require('./Surat/SuratKeteranganPindah.js')(sequelize, Sequelize);


// Relations

db.keluarga.hasMany(db.umat, { as: 'Umat' })
db.umat.belongsTo(db.keluarga, {
    foreignKey: 'keluarga_id', // column name in Keluarga table
})

db.umat.hasOne(db.detailUmat)
db.detailUmat.belongsTo(db.umat)

db.keluarga.hasOne(db.lingkungan, {
    foreignKey: 'ketua_lingkungan_id', // column name in Keluarga table
})
// db.lingkungan.hasOne(db.keluarga, {
//     foreignKey: 'ketua_lingkungan_id', // column name in Keluarga table
// })


module.exports = db;