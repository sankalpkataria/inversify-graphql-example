const http = require('http');
const options = {  
    host: 'localhost',
    protocol: 'http:',
    port: '80',
    timeout: 2000,
    path: '/ping'
};

const request = http.request(options, (res) => {  
    console.log(`STATUS: ${res.statusCode}`);
    if (res.statusCode === 200) {
        process.exit(0);
    }
    process.exit(1);
}).on('error', function(err) {  
    console.log('ERROR', err);
    process.exit(1);
});

process.on('exit', function(code) {  
    console.log(`EXIT CODE: ${code}`);
});

request.end();