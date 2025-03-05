require("dotenv").config();
const mysql = require("mysql2");

module.exports = async function db(query) {
  const results = {
    data: [],
    error: null,
  };
  let promise = await new Promise((resolve, reject) => {
    const con = mysql.createConnection({
      host: process.env.DB_HOST || "127.0.0.1",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASS,
      database: process.env.DB_NAME || "bjj_finder",
      multipleStatements: true,
    });

    con.connect(function (err) {
      if (err) throw err;
      console.log("Connected!");

      con.query(query, function (err, result) {
        if (err) {
          results.error = err;
          console.log(err);
          reject(err);
          con.end();
          return;
        }
        results.data = result;
        con.end();
        resolve(results);
      });
    });
  });
  return promise;
};
