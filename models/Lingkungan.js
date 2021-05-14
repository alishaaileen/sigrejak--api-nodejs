module.exports = (sequelize, Sequelize) => {
  const Lingkungan = sequelize.define("Lingkungan", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nama_lingkungan: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ketua_lingkungan_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: 'Keluarga', // refer to table name
        key: 'id', // refers to column name
      }
    },
  }, {
    freezeTableName: true,
    tableName: "Lingkungan",
    timestamps: false,
    underscored: true,
  })

  // Lingkungan.associate = models => {
  //   Lingkungan.hasOne(models.Keluarga, {
  //     foreignKey: 'ketua_lingkungan_id'
  //   })
  // }

  return Lingkungan
}