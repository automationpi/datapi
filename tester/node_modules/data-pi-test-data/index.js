const dataHandler = require('fastify')({ logger: true });
const helper = require('./helper');



dataHandler.get('/', async (request, reply) => {
    return { hello: 'world' }
  })

  //capitalize first character of a string
  function sentanceCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//generate integer in a range
function intInRange(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomDate(start) {
  end = new Date();
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateCVR(n){
  var add = 1, max = 12 - add;
  if(n > max){
    return generateCVR(max) + generateCVR(n-max);
  }
  max = Math.pow(10,n+add);
  var min = max/10;
  var number = Math.floor(Math.random() * (max - min +1)) + min
  return (""+ number).substring(add);
}

const start = async () => {
  try {
    await dataHandler.listen(3000)
  } catch (err) {
    dataHandler.log.error(err)
    process.exit(1)
  }
}


//generates random names can be configured in helper.js
  dataHandler.get('/email', async (request, reply) => {
  var name1 = helper.firstName;
  var name2 = helper.lastName;
  var domains = helper.domains;

  var firstName = (name1[intInRange(0, name1.length + 1)]);
  var lastName = (name2[intInRange(0, name2.length + 1)]);
  var domain = (domains[intInRange(0, domains.length)]);
  var randomNumber = intInRange(400,99999);
  var email = firstName + '.' + lastName+randomNumber+'@'+domain;
return (JSON.stringify({email : email}));
}) 

//generates random names can be configured in helper.js 
 dataHandler.get('/user', async (request, reply) => {
  var name1 = helper.firstName;
  var name2 = helper.lastName;

  var firstName = sentanceCase(name1[intInRange(0, name1.length + 1)]) 
  var lastName = sentanceCase(name2[intInRange(0, name2.length + 1)]);
  var name = firstName + ' ' + lastName;
return (JSON.stringify({user : {fullName:name,firstName:firstName,lastName:lastName}}));
}) 


//generate random date
dataHandler.get('/date', async (request, reply) => {
rDate = randomDate(new Date(((request.query.from == undefined) ? 2000 : parseInt(request.query.from)), 0, 1));  
return (JSON.stringify({date : {rDate}}));
})



module.exports = {
    start, 
    dataHandler,
    sentanceCase,
    intInRange
}
