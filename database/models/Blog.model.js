const { DataTypes } = require('sequelize');
const sequelize = require('../index');
const User = require('./User.model');

const Blog = sequelize.define('Blog', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    isPublic: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    userId: { 
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
        allowNull: false,
    },
}, {
    timestamps: true, 
    toJSON: {
        transform: (doc, ret) => {
            delete ret.createdAt;
            delete ret.updatedAt;
        },
    },
});

sequelize.sync()
    .then(() => {
        console.log('✅ Modèle Blog synchronisé avec SQLite');
    })
    .catch((err) => {
        console.error('❌ Erreur de synchronisation du modèle Blog:', err);
    });

module.exports = Blog;
