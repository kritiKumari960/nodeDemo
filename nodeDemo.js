var express = require('express');
var fs =require('fs');
var MongoClient = require('mongodb').MongoClient;
var url='mongodb://localhost:27017/training';

//const { MongoClient } = require('mongodb');
var app = express();
 
app.get('/',function(req,res){
    res.send('hello');
});

app.listen(3000,function(){
    console.log('Example app listing on port 3000!');
});

// app.get("/listStudents", (req, res) => {
//     collection.find({}).toArray((error, result) => {
//         if(error) {
//             return res.status(500).send(error);
//         }
//         res.send(data);
//     });
// });

app.post('/getstudentdetails',function(req,res){
    var data = {'name':'kriti', 'roll':'10', 'state':'bihar'};
    res.json({data:data});
});

MongoClient.connect(url,function(err, db){
    if(err) throw err;
    var myStudent = {'name':'kriti', 'roll':'10', 'state':'bihar'};
    db.collection("students").insertOne(myStudent,function(err,result){
        if(err) throw err;
        console.log("1 record inserted");
        db.close();
    });
});

app.post('/getstudentdetails',function(req,res){
    MongoClient.connect(url,function(err, db){
        if(err) throw err;
        db.collection("students").find({ },{}).toArray().then(result => {
            res.json({data:result})
            console.log(result,'result')
        })
    })
});