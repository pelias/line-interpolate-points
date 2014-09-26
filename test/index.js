/**
 * @file 
 */

'use strict';

var util = require( 'util' );
var interpolateLineRange = require( '../index.js' );
module.exports.tests = {};

module.exports.tests.interpolation = function ( test, common ){
  test( 'interpolates point coordinates correctly', function ( t ){
    var actual = interpolateLineRange([
      { x: 0, y: 0 },
      { x: 100, y: 150 },
      { x: 120, y: 100 },
      { x: 300, y: 400 }
    ], 11);

    var expected = [
      { x: 0, y: 0 },
      { x: 32.39373293672607, y: 48.590599405089094 },
      { x: 64.78746587345213, y: 97.18119881017819 },
      { x: 97.18119881017819, y: 145.77179821526727 },
      { x: 119.80142422763696, y: 100.49643943090761 },
      { x: 149.77075714219484, y: 149.61792857032475 },
      { x: 179.81660571375585, y: 199.6943428562598 },
      { x: 209.86245428531686, y: 249.77075714219484 },
      { x: 239.90830285687787, y: 299.84717142812985 },
      { x: 269.9541514284389, y: 349.92358571406487 },
      { x: 300, y: 400 }
    ];

    t.true(
      actual.length === expected.length,
      'Expected number of points interpolated.'
    );
    for(var pt = 0; pt < actual.length; pt++){
      t.true(
        Math.floor(actual[pt].x) == Math.floor(expected[pt].x),
        util.format('x-coordinate %d matches.', pt)
      );
      t.true(
        Math.floor(actual[pt].y) == Math.floor(expected[pt].y),
        util.format('y-coordinate %d matches.', pt)
      );
    }
    t.end();
  });
};

module.exports.all = function (tape, common) {
  function test(name, testFunction) {
    return tape('index: ' + name, testFunction);
  }

  for( var testCase in module.exports.tests ){
    if( module.exports.tests.hasOwnProperty( testCase ) ){
      module.exports.tests[testCase](test, common);
    }
  }
};
