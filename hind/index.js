var request = require('request');
var fs  = require("fs");
var colors = require('colors');

var user_list = process.argv[2];

var second_file = process.argv[3];

if (!user_list || second_file)
{
	console.log("No user list file or more than two files.");
	process.exit(1);
}

var key = require('./key.json');

var array;
try {
    array = fs.readFileSync(user_list).toString().split('\n');  
} catch (err) {
	if (err.code === 'ENOENT') {
	  console.log('Unable to read file.');
	  process.exit(1);
	} else {
	  throw err;
	}
}

if (!array) {
	console.log("Cant conver file to user list.");
	process.exit(1);
}

var err = "Error";
var user;
var userRow = 0;
var userCluster = 0;

request.post({
	url: 'https://api.intra.42.fr/oauth/token',
	form:  {
        client_id: key.uid,
        client_secret: key.secret,
        grant_type: 'client_credentials'
     }
    },
    
	function (err, httpResponse, body) {
		var utoken = JSON.parse(body);
		user = utoken.access_token;
        
        (function myLoop (i) {          
            setTimeout(function () {           
    			var options = {
                    method: 'GET',
                    url: 'https://api.intra.42.fr/v2/users/' + array[i] + '/locations',
                    qs: { access_token: user },
                };                

                request(options, function (error, response, body) {                                                             
                    if (error) throw new Error(error);
                    var uLocation = JSON.parse(body);                    
                    if (uLocation[0]) {
                        if (uLocation[0].end_at != null) {
                            if (uLocation[0].user.login == 'chjeong')
                                console.log("\n" + 'Edgar'.yellow + "is not available. He's probably working out or playing MTG Arena.\n");
                            else if (uLocation[0].user.login == 'jboggs')
                                console.log("\n" + 'Jake'.yellow + "is not available. .He is probably having herbal meditation.\n");
                            else if (uLocation[0].user.login == 'vrabaib')
                                console.log("\n" + 'Jimmy'.yellow + " is not available. He's probably teaching kids wierd programing.\n");
                            else if (uLocation[0].user.login == 'phtruong')
                                console.log("\n" + 'Erick'.yellow + " is not available. He's probably playing dorky computergame.\n");
                            else if (uLocation[0].user.login == 'kchen2')
                                console.log("\n" + 'Kai'.yellow + " is not available. He's probably watching dorky japanimation.\n");
                            else
                                console.log("\n" + uLocation[0].user.login.yellow + "is not available.");
                        }
                        else{
                            console.log('\n' + uLocation[0].user.login.cyan + ' is at ' + uLocation[0].host.green);                            
                        }
                    }			
                });
               if (i++ < array.length) myLoop(i);
            }, 500)
        })(0);		
    }
);