// Create express app
var express = require("express")
var app = express()
var db = require("./database.js")
var bodyParser = require("body-parser");
var cors = require('cors')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }
// Server port
var HTTP_PORT = 8000 
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});
// Root endpoint
app.get("/a", (req, res, next) => {
    res.json({"message":"Ok"})
});

// Insert here other API endpoints
app.post("/log", (req, res, next) => {  
    
    var data = {
        message: req.body.message,
        additional: req.body.additional,
        level: req.body.level,
        fileName: req.body.fileName,
        lineNumber: req.body.lineNumber,
    }
    var sql ='INSERT INTO log (message, additional,level,fileName,lineNumber) VALUES (?,?,?,?,?)'
    var params =[data.message, data.additional, data.level,data.fileName,data.lineNumber]

    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({
                "description":"failed to save data",
                "data":err.message,
                "status":400,
                'code':0
                });
            return;            
        }
        
        res.status(200).json({
            "description": "success",
            "data": data,
            "status" : '201',
            'code':0

        })
    });
})

app.get("/log/*", (req, res, next) => {

    sql = "select * from log  "
    condition = ""
    for (var key in req.query) {
        // check if the property/key is defined in the object itself, not in parent
        if (key!='pagesize'){
          if(key!='page'){
            if (req.query.hasOwnProperty(key)) {   
                if(isNumber(req.query[key])){
                    condition=condition+ key+ "="+req.query[key]+" AND "
                }else{
                    condition=condition+ key+ "='"+req.query[key]+"' AND "
                }
            }
          }
        }

    }
    var page = req.query['page'];
    

    var pagesize = req.query['pagesize'];
    if (condition==""){
        sql= sql+'LIMIT '+page*pagesize+','+(page+1)*pagesize+';'
    }else{
        sql=sql+"where "+condition.slice(0,-4)+'LIMIT '+page*pagesize+','+pagesize*(parseInt(page)+1)+';'
    }
    
    
    console.log(sql)
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({
            "description":"get data failed",
            "data":err.message,
            "status":400,
            'code':0
            });
          return;
        }
        res.status(200).json({
            "description":"success",
            "data":rows,
            "status":201,
            'code':0
        })
      });
      
});

app.use(function(req, res){

    res.status(404).json({
        "description":"page not found",
        "data":'',
        "status":404,
        'code':0
        });;
});
