module.exports = (sequelize, Sequelize) => {
  const SuratKeteranganPindah = sequelize.define("SuratKeteranganPindah", {
    no_surat: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    id_keluarga: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: 'Keluarga', // refer to table name
        key: 'id', // refers to column name
      }
    },
    paroki_lama: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    id_lingkungan_lama: {
      type: Sequelize.INTEGER,
      allowNull: true,
      unique: true,
      references: {
        model: 'Lingkungan', // refer to table name
        key: 'id', // refers to column name
      }
    },
    ketua_lingkungan: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    id_umat: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: 'Umat', // refer to table name
        key: 'id', // refers to column name
      }
    },
    alamat_lama: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    no_telp_lama: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    tgl_mulai_domisili: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    alamat_baru: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    no_telp_baru: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    id_lingkungan_baru: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: 'Lingkungan', // refer to table name
        key: 'id', // refers to column name
      }
    },
    nama_lingkungan_baru: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    paroki_baru: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ketua_lingkungan_approval: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    id_sekretariat: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: 'Admin', // refer to table name
        key: 'id', // refers to column name
      }
    },
    sekretariat_approval: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    id_romo: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: 'Umat', // refer to table name
        key: 'id', // refers to column name
      }
    },
    romo_approval: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    deleted_at: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  }, {
    freezeTableName: true,
    tableName: "Surat_Keterangan_Pindah",
    timestamps: true,
    underscored: true,
    paranoid: true,
  })

  return SuratKeteranganPindah
}