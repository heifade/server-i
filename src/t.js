// Test helper file
var express    = require('express');
var http       = require('http');

// These could be args passed into TestServer, or settings from somewhere.
var TEST_HOST  = 'localhost';
var TEST_PORT  = 9876;

function TestServer(args) {
    var self = this;
    var express = require('express');
    self.router = args.router;
    self.server = express.createServer();
    self.server.use(express.bodyParser());
    self.server.use(self.router);
}

TestServer.prototype.start = function() {
    var self = this;
    if (self.server) {
        self.server.listen(TEST_PORT, TEST_HOST);
    } else {
        throw new Error('Server not found');
    }
};

TestServer.prototype.stop = function() {
    var self = this;
    self.server.close();
};

// you would likely want this in another file, and include similar 
// functions for post, put, delete, etc.
function http_get(host, port, url, cb) {
    var options = {
        host: host,
        port: port,
        path: url,
        method: 'GET'
    };
    var ret = false;
    var req = http.request(options, function(res) {
        var buffer = '';
        res.on('data', function(data) {
            buffer += data;
        });
        res.on('end',function(){
            cb(null,buffer);
        });
    });
    req.end();
    req.on('error', function(e) {
        if (!ret) {
            cb(e, null);
        }
    });
}

var client = {
    get: function(url, cb) {
        http_get(TEST_HOST, TEST_PORT, url, cb);
    }
};

var http = {
    server: {
        create: function(router) {
            return new TestServer({router: router});
        }
    },

    client: client
};
module.exports = http;