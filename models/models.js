const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    address:{type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "ADMIN"},
})

const OrderClothes = sequelize.define('order_clothes', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    product:{type: DataTypes.STRING(1000000)},
})

const Clothes = sequelize.define('clothes', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    info: {type: DataTypes.STRING(10000), allowNull:false},
    img: {type: DataTypes.STRING, allowNull: false},
})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})


Type.hasMany(Clothes)
Clothes.belongsTo(Type)

Brand.hasMany(Clothes)
Clothes.belongsTo(Brand)




module.exports = {
    User,
    OrderClothes,
    Clothes,
    Type,
    Brand,
}





