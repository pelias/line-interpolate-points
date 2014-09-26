/**
 * A module that exports a single function (`interpolateLineRange()`), which
 * interpolates the coordinates of any number of equidistant points along the
 * length of a potentially multi-segment line.
 */

'use strict';

/**
 * @param {Point} pt1
 * @param {Point} pt1
 * @return number The Euclidean distance between `pt1` and `pt2`.
 */
function distance( pt1, pt2 ){
  var deltaX = pt1.x - pt2.x;
  var deltaY = pt1.y - pt2.y;
  return Math.sqrt( deltaX * deltaX + deltaY * deltaY );
}

/**
 * @param {array of Point} ctrlPoints The vertices of the (multi-segment) line
 *      to be interpolate along.
 * @param {int} number The number of points to interpolate along the line; this
 *      includes the endpoints, and has an effective minimum value of 2 (if a
 *      smaller number is given, then the endpoints will still be returned).
 */
function interpolateLineRange( ctrlPoints, number ){
  var totalDist = 0;
  var ctrlPtDists = [ 0 ];
  for( var pt = 1; pt < ctrlPoints.length; pt++ ){
    totalDist += distance( ctrlPoints[ pt ], ctrlPoints[ pt - 1 ] );
    ctrlPtDists.push( totalDist );
  }

  var step = totalDist / (number - 1);
  var interpPoints = [ ctrlPoints[ 0 ] ];
  var prevCtrlPtInd = 0;
  var currDist = 0;
  var currPoint = ctrlPoints[ 0 ];
  var nextDist = step;

  for( pt = 0; pt < number - 2; pt++ ){
    while( nextDist > ctrlPtDists[ prevCtrlPtInd + 1 ] ){
      prevCtrlPtInd++;
      currDist = ctrlPtDists[ prevCtrlPtInd ];
      currPoint = ctrlPoints[ prevCtrlPtInd ];
    }

    var remainingDist = nextDist - currDist;
    var ctrlPtsDeltaX = ctrlPoints[ prevCtrlPtInd + 1 ].x -
      ctrlPoints[ prevCtrlPtInd ].x;
    var ctrlPtsDeltaY = ctrlPoints[ prevCtrlPtInd + 1 ].y -
      ctrlPoints[ prevCtrlPtInd ].y;
    var ctrlPtsDist = ctrlPtDists[ prevCtrlPtInd + 1 ] -
      ctrlPtDists[ prevCtrlPtInd ];

    currPoint = {
      x: currPoint.x + ( ctrlPtsDeltaX / ctrlPtsDist ) * remainingDist,
      y: currPoint.y + ( ctrlPtsDeltaY / ctrlPtsDist ) * remainingDist
    };
    interpPoints.push( currPoint );

    currDist = nextDist;
    nextDist += step;
  }

  interpPoints.push( ctrlPoints[ ctrlPoints.length - 1 ] );
  return interpPoints;
}

/**
 * A simple 2D point object.
 */
function Point( x, y ){
  this.x = x;
  this.y = y;
}

module.exports = interpolateLineRange;
