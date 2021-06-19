const datapi = require('data-pi-test-data');
const crypto = require("crypto");

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
  
  



datapi.start();