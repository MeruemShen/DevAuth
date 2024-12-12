const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    DoubleFacteur: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            delete ret.password;
            delete ret.createdAt;
            delete ret.updatedAt;
        },
    },
});

sequelize.sync()
    .then(() => {
        console.log('✅ Modèle User synchronisé avec SQLite');
    })
    .catch((err) => {
        console.error('❌ Erreur de synchronisation du modèle User:', err);
    });

module.exports = User;
