# What is this about
This is a refreshing way to handle test data during test execution.
## What are challenges with test data in an automation.
We feel test data throws different challanges to an ecosystem with focus on test automation.

####Chalenges
- Broadly unorganized
- Complex
- Lacks a pattern or a defined standard
- Each implementation comes with different challange 
- Least documented part of code
- Difficult to manage for a large complex project

###What is the solution
The solution is to exclude data from code, this makes data independantly managable. This also means automation engineers will not end up creating redundant code to generate same data.

##Data𝜋
Data𝜋 brings concept of data as service for test automation. Solution proposed is rather than embedding code to get or generate test data in code, keep it independent so its not complicated and maintainable. 
Data𝜋 is a service exposed over http which can be consumed by test code.  


####Getting Started

`$ npm install data-pi-test-data`

####Example　(app.js)

```javascript
const datapi = require('datapi');
const crypto = require("crypto");
const mysql = require("mysql");

sql = mysql.createConnection({
  host: 'localhost',
  user: 'tester',
  password: 'Tester123',
  database: 'company'
});



//generate unique number of specified length
datapi.dataHandler.get('/random', async (request, reply) => {
    var randomNumber = Math.floor(Math.random() * ((request.query.length == undefined) ? 1000 : parseInt(request.query.length))) + 1; 
    return  (JSON.stringify({random: randomNumber}));
  })

  //generated uniqueid
  datapi.dataHandler.get('/uuid', async (request, reply) => {
    const uid = crypto.randomBytes( ((request.query.length == undefined) ? 16 : parseInt(request.query.length))).toString("hex");
    return (JSON.stringify({uuid :uid }));
  })
  
  
  //example of DB
  datapi.dataHandler.get('/uuid', async (request, reply) => {
        
        var connection = mysql.createConnection(
            {
                host     : 'testsrv2398472398',
                user     : 'testuser',
                password : 'testpassword',
                database : 'prime',
            }
        );

        connection.connect();
        var query = "SELECT data FROM mytable where my_condition=239874 LIMIT 1";                 
        connection1.query(query,function(err,rows){            
            if(err) {                
                console.log(err); 
				res.header('Content-type','application/json');	
                res.json({"Error" : true, "Message" : "Error executing MySQL query" + err}); 
				 res.status(200);	
            } else {
				res.header('Content-type','application/json');	
                 res.send({"cvr" : rows});                     
            }            
        });       
    })

 

datapi.start();
```
Execute following command to start service.
`$ node app.js`

Services will be started at port 3000.

You can test this service by calling the get services from browser.

![Example output](http://www.naveen.org.in/datapi.png)


This data can be consumed by any test tool or automation solution developed in any programming language.

*Data may be in any database file or synthetic test data you want to create. With Data𝜋 as in you solution  ecosystem, its possible to achieve this.
