var server = require('./index.js');

describe('server', function () {
    before(function () {
        server.listen(3000);
    });

    after(function () {
        server.close();
    });
});

var assert = require('assert'),
    http = require('http');

describe('/', function () {
    it('should return 200', function (done) {
        http.get('http://localhost:3000', function (res) {
            assert.equal(200, res.statusCode);
            done()
        });
    });

    it('should return index page"', function (done) {
        http.get('http://localhost:3000/index.html', function (res) {
            assert.equal(200, res.statusCode);
            done();
        });
    });

});

describe('cardDirective', function () {
    var compile, scope, directiveElem;

    beforeEach(function () {
        module('WinePair');

        inject(function ($compile, $rootScope) {
            compile = $compile;
            scope = $rootScope.$new();
        });

        directiveElem = getCompiledElement();
    });

    function getCompiledElement() {
        var element = angular.element('<div first-directive></div>');
        var compiledElement = compile(element)(scope);
        scope.$digest();
        return compiledElement;
    }
});

describe('Wine API', function () {
    it('should fail because of improper API key', function (done) {
        http.get('http://services.wine.com/api/beta2/service.svc/json/categorymap?filter=categories(490)&apikey=wrongkey', function (res) {
            var jsonString="";
            res.on('data', function (chunk) {
                jsonString += chunk;
            });
            res.on('end', function(){
                var obj = JSON.parse(jsonString);
                assert.equal('300', obj.Status.ReturnCode);
                done()
            });

        });
    });

    it('should succeed because of proper API key"', function (done) {
        http.get('http://services.wine.com/api/beta2/service.svc/json/categorymap?filter=categories(490)&apikey=c10347af788d3f1b6bcfa73687ca74a2', function (res) {
            var jsonString="";
            res.on('data', function (chunk) {
                jsonString += chunk;
            });
            res.on('end', function(){
                var obj = JSON.parse(jsonString);
                assert.equal('0', obj.Status.ReturnCode);
                done()
            });

        });
    });

    it('should check return wine categories"', function (done) {
        http.get('http://services.wine.com/api/beta2/service.svc/json/categorymap?filter=categories(490)&apikey=c10347af788d3f1b6bcfa73687ca74a2', function (res) {
            var jsonString="";
            res.on('data', function (chunk) {
                jsonString += chunk;
            });
            res.on('end', function(){
                var obj = JSON.parse(jsonString);
                assert.equal('5', obj.Categories[1].Id);
                done()
            });

        });
    });

    it('should check return a specific wine"', function (done) {
        http.get('http://services.wine.com/api/beta2/service.svc/json/catalog?filter=product(48854)&apikey=c10347af788d3f1b6bcfa73687ca74a2', function (res) {
            var jsonString="";
            res.on('data', function (chunk) {
                jsonString += chunk;
            });
            res.on('end', function(){
                var obj = JSON.parse(jsonString);
                assert.equal('48854', obj.Products.List[0].Id);
                done()
            });

        });
    });

});