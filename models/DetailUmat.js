module.exports = (sequelize, Sequelize) => {
  const DetailUmat = sequelize.define("DetailUmat", {
    id_umat: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Umat', // refer to table name
        key: 'id', // refers to column name
      },
    },
    tgl_baptis: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },
    tgl_komuni: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },
    tgl_penguatan: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },
    tgl_baptis: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },
    file_akta_lahir: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    file_ktp: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    id_ayah: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Umat', // refer to table name
        key: 'id', // refers to column name
      },
    },
    id_ibu: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Umat', // refer to table name
        key: 'id', // refers to column name
      },
    },
    id_pasangan: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Umat', // refer to table name
        key: 'id', // refers to column name
      },
    },
    cara_menikah: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    tgl_menikah: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },
  }, {
    freezeTableName: true,
    tableName: "Detail_Umat",
    timestamps: false,
    underscored: true,
  })

  DetailUmat.associate = models => {
    DetailUmat.belongsTo(models.Umat, {
      foreignKey: 'id'
    })

    DetailUmat.belongsTo(models.Umat, {
      foreignKey: 'id'
    })
  }

  return DetailUmat
}