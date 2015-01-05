/**
 * A module that exports a single function (`interpolateLineRange()`), which
 * interpolates the coordinates of any number of equidistant points along the
 * length of a potentially multi-segment line.
 *
 * Note: this module's function documentation frequently refers to a `Point`
 * object, which is simply an array of two numbers (the x- and y- coordinates).
 */

'use strict';

/**
 * @param {Point} pt1
 * @param {Point} pt1
 * @return number The Euclidean distance between `pt1` and `pt2`.
 */
function distance( pt1, pt2 ){
  var deltaX = pt1[0] - pt2[0];
  var deltaY = pt1[1] - pt2[1];
  return Math.sqrt( deltaX * deltaX + deltaY * deltaY );
}

/**
 * @param {Point} point The Point object to offset.
 * @param {number} dx The delta-x of the line segment from which `point` will
 *    be offset.
 * @param {number} dy The delta-y of the line segment from which `point` will
 *    be offset.
 * @param {number} distRatio The quotient of the distance to offset `point`
 *    by and the distance of the line segment from which it is being offset.
 */
function offsetPoint( point, dx, dy, distRatio ){
  return [
    point[ 0 ] - dy * distRatio,
    point[ 1 ] + dx * distRatio
  ];
}

/**
 * @param {array of Point} ctrlPoints The vertices of the (multi-segment) line
 *      to be interpolate along.
 * @param {int} number The number of points to interpolate along the line; this
 *      includes the endpoints, and has an effective minimum value of 2 (if a
 *      smaller number is given, then the endpoints will still be returned).
 * @param {number} [offsetDist] An optional perpendicular distance to offset
 *      each point from the line-segment it would otherwise lie on.
 * @param {int} [minGap] An optional minimum gap to maintain between subsequent
 *      interpolated points; if the projected gap between subsequent points for
 *      a set of `number` points is lower than this value, `number` will be
 *      decreased to a suitable value.
 */
function interpolateLineRange( ctrlPoints, number, offsetDist, minGap ){
  minGap = minGap || 0;
  offsetDist = offsetDist || 0;

  // Calculate path distance from each control point (vertex) to the beginning
  // of the line, and also the ratio of `offsetDist` to the length of every
  // line segment, for use in computing offsets.
  var totalDist = 0;
  var ctrlPtDists = [ 0 ];
  var ptOffsetRatios = [];
  for( var pt = 1; pt < ctrlPoints.length; pt++ ){
    var dist = distance( ctrlPoints[ pt ], ctrlPoints[ pt - 1 ] );
    totalDist += dist;
    ptOffsetRatios.push( offsetDist / dist );
    ctrlPtDists.push( totalDist );
  }

  if( totalDist / (number - 1) < minGap ){
    number = totalDist / minGap + 1;
  }

  // Variables used to control interpolation.
  var step = totalDist / (number - 1);
  var interpPoints = [ offsetPoint(
    ctrlPoints[ 0 ],
    ctrlPoints[ 1 ][ 0 ] - ctrlPoints[ 0 ][ 0 ],
    ctrlPoints[ 1 ][ 1 ] - ctrlPoints[ 0 ][ 1 ],
    ptOffsetRatios[ 0 ]
  )];
  var prevCtrlPtInd = 0;
  var currDist = 0;
  var currPoint = ctrlPoints[ 0 ];
  var nextDist = step;

  for( pt = 0; pt < number - 2; pt++ ){
    // Find the segment in which the next interpolated point lies.
    while( nextDist > ctrlPtDists[ prevCtrlPtInd + 1 ] ){
      prevCtrlPtInd++;
      currDist = ctrlPtDists[ prevCtrlPtInd ];
      currPoint = ctrlPoints[ prevCtrlPtInd ];
    }

    // Interpolate the coordinates of the next point along the current segment.
    var remainingDist = nextDist - currDist;
    var ctrlPtsDeltaX = ctrlPoints[ prevCtrlPtInd + 1 ][ 0 ] -
      ctrlPoints[ prevCtrlPtInd ][ 0 ];
    var ctrlPtsDeltaY = ctrlPoints[ prevCtrlPtInd + 1 ][ 1 ] -
      ctrlPoints[ prevCtrlPtInd ][ 1 ];
    var ctrlPtsDist = ctrlPtDists[ prevCtrlPtInd + 1 ] -
      ctrlPtDists[ prevCtrlPtInd ];
    var distRatio = remainingDist / ctrlPtsDist;

    currPoint = [
      currPoint[ 0 ] + ctrlPtsDeltaX * distRatio,
      currPoint[ 1 ] + ctrlPtsDeltaY * distRatio
    ];

    // Offset currPoint according to `offsetDist`.
    var offsetRatio = offsetDist / ctrlPtsDist;
    interpPoints.push( offsetPoint(
      currPoint, ctrlPtsDeltaX, ctrlPtsDeltaY, ptOffsetRatios[ prevCtrlPtInd ])
    );

    currDist = nextDist;
    nextDist += step;
  }

  interpPoints.push( offsetPoint(
    ctrlPoints[ ctrlPoints.length - 1 ],
    ctrlPoints[ ctrlPoints.length - 1 ][ 0 ] -
      ctrlPoints[ ctrlPoints.length - 2 ][ 0 ],
    ctrlPoints[ ctrlPoints.length - 1 ][ 1 ] -
      ctrlPoints[ ctrlPoints.length - 2 ][ 1 ],
    ptOffsetRatios[ ptOffsetRatios.length - 1 ]
  ));
  return interpPoints;
}

module.exports = interpolateLineRange;
