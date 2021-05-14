module.exports = (sequelize, Sequelize) => {
  const Keluarga = sequelize.define("Keluarga", {
    nama_keluarga: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  }, {
    freezeTableName: true,
    tableName: "Keluarga",
    timestamps: false,
    underscored: true,
  })

  // Keluarga.associate = models => {
  //   Keluarga.hasMany(models.Umat, { as: 'umat' })
  // }

  return Keluarga
}