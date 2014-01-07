/*global describe, it*/
'use strict';

var fs = require('fs'),
	es = require('event-stream'),
	should = require('should'),
    assert = require('assert'),
    EE = require('events').EventEmitter;


var gutil = require('gulp-util'),
	plumber = require('../');

var testString = 'should be in array';

describe('gulp-plumber', function () {

    describe('options', function() {
        it('{ handleErrors: `false` } should not add error handlers to stream', function () {
            var stream = plumber({ handleErrors: false }).pipe(gutil.noop());
            assert.equal(EE.listenerCount(stream, 'error'), 0);
        });

        it('{ inherit: `false` } should disable propagation of pipe2 method', function () {
            var stream = plumber({ inherit: false }).pipe(gutil.noop()).pipe(gutil.noop());
            assert.equal(EE.listenerCount(stream, 'error'), 1);
        });
    });

    it('should attach error handler by default', function (done) {
        var stream = plumber().pipe(gutil.noop());
        stream.emit('error', new Error('Bang!'));
        done();
    });

	it('should be piped after error', function (done) {
		var stream = plumber().pipe(gutil.noop());
        stream.pipe(gutil.noop());
        stream.emit('error', new Error('Bang!'));
        assert.equal(EE.listenerCount(stream, 'data'), 1);
        done();
	});

});
