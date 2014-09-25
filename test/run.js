'use strict';

var tape = require( 'tape' );
var common = {};

var tests = [
  require( './index' )
];

tests.map(function( t ) {
  t.all( tape, common );
});
