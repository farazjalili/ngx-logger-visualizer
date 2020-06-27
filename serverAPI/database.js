var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE log (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            message text NOT NULL, 
            additional text, 
            level INTEGER NOT NULL, 
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
            fileName text,
            lineNumber text
            )`,
        (err) => {
            if (err) {
                console.log("Table already created")
            }
        });  
    }
});


module.exports = db

