var mysql = require('mysql');

var con = mysql.createConnection({
    host: "us-cdbr-iron-east-02.cleardb.net",
    user: "b34fe58ff489e8",
    port: "3306",
    password: "ae3db177",
    database: "ad_c3f115d506af414"
});

con.connect(function (err) {
    if (err) {
        throw err
    } else {
        console.log("Database connected")
    };
});

module.exports = con;