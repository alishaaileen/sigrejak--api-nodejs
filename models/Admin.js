module.exports = (sequelize, Sequelize) => {
  const Admin = sequelize.define("Admin", {
    nama: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    no_telp: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  }, {
    freezeTableName: true,
    tableName: "Admin",
    timestamps: false,
  })

  return Admin
}