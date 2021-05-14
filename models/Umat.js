module.exports = (sequelize, Sequelize) => {
  const Umat = sequelize.define("Umat", {
    nama: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    tempat_lahir: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    tgl_lahir: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    jenis_kelamin: {
      type: Sequelize.STRING(10),
      allowNull: false,
    },
    nama_baptis: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    alamat: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    no_telp: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    pekerjaan: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    is_dead: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    is_umat_active: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    keluarga_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Keluarga', // refer to table name
        key: 'id', // refers to column name
      },
    },
    lingkungan_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Lingkungan', // refer to table name
        key: 'id', // refers to column name
      },
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
    tableName: "Umat",
    timestamps: true,
    underscored: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  })

  // Umat.associate = models => {
  //   Umat.belongsTo(models.keluarga, {
  //     foreignKey: 'keluarga_id',
  //     as: 'Keluarga'
  //   })
  //   Umat.hasOne(models.DetailUmat)
  // }

  return Umat
}