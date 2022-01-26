const Sequelize = require('sequelize')

// goes in config/db.js
const connection = new Sequelize(
  'hikingorganizer',
  'daniel',
  'ICTPass4481',
  {
    // Defining our connect by Sequelize constructor
    host: 'hikingorganizer.database.windows.net',
    dialect: 'mssql', // According to which dbms you are using
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    dialectOptions: {
      encrypt: true
    },
    logging: false
  }
)

// const connection = new Sequelize(
//   'hiking',
//   'root',
//   'Daniel@MySQL1',
//   {
//     // Defining our connect by Sequelize constructor
//     host: 'localhost',
//     dialect: 'mysql', // According to which dbms you are using
//     // dialectOptions: {
//     //   encrypt: true
//     // },
//     logging: false
//   }
// )

/* const connection = new Sequelize('rest-api', 'root', 'BFC315gp', {
  dialect: 'mysql',
  logging: false
}) */

module.exports = { connection: connection } // Exporting our user model
