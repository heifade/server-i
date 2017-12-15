// Test file
var http = require('../src/t.js');

describe('my_controller', function() {
    var server;

    before(function() {
        var router = require('path/to/some/router');
        server = http.server.create(router);
        server.start();
    });

    after(function() {
        server.stop();
    });

    describe("GET /foo", function() {
        it('returns something', function(done) {
            http.client.get('/foo', function(err, res) {
                // assertions
                done();
            });
        });
    });
});