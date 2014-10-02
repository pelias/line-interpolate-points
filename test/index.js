/**
 * @file Unit tests for the package.
 */

'use strict';

var util = require( 'util' );
var interpolateLineRange = require( '../index.js' );
module.exports.tests = {};

module.exports.tests.interpolation = function ( test, common ){
  test( 'interpolates point coordinates correctly', function ( t ){
    var actual = interpolateLineRange([
      [ 0, 0 ],
      [ 100, 150 ],
      [ 120, 100 ],
      [ 300, 400 ]
    ], 11);

    var expected = [
      [ 0, 0 ],
      [ 32.39373293672607, 48.590599405089094 ],
      [ 64.78746587345213, 97.18119881017819 ],
      [ 97.18119881017819, 145.77179821526727 ],
      [ 119.80142422763696, 100.49643943090761 ],
      [ 149.77075714219484, 149.61792857032475 ],
      [ 179.81660571375585, 199.6943428562598 ],
      [ 209.86245428531686, 249.77075714219484 ],
      [ 239.90830285687787, 299.84717142812985 ],
      [ 269.9541514284389, 349.92358571406487 ],
      [ 300, 400 ]
    ];

    t.true(
      actual.length === expected.length,
      'Expected number of points interpolated.'
    );
    for(var pt = 0; pt < actual.length; pt++){
      t.true(
        Math.floor(actual[pt][0]) == Math.floor(expected[pt][0]),
        util.format('x-coordinate %d matches.', pt)
      );
      t.true(
        Math.floor(actual[pt][1]) == Math.floor(expected[pt][1]),
        util.format('y-coordinate %d matches.', pt)
      );
    }
    t.end();
  });
};

module.exports.all = function (tape, common) {
  function test(name, testFunction) {
    return tape('inde' + name, testFunction);
  }

  for( var testCase in module.exports.tests ){
    if( module.exports.tests.hasOwnProperty( testCase ) ){
      module.exports.tests[testCase](test, common);
    }
  }
};
