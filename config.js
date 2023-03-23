module.exports.config = {
    "LOCAL": {
      "JWT_secret":"KHUSHAL_PATIL",
      "dataBase": {
        "dbConnectionString": process.env.DB_CONNECTION,
      },
      "emailHost":process.env.emailHost,
      "emailFrom":process.env.emailFrom,
      "emailPort":process.env.emailPort,
      "secure":process.env.secure,
      "pass":process.env.pass,
    }
  }