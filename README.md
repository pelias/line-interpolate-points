[![NPM](https://nodei.co/npm/line-interpolate-points.png?downloads=true&stars=true)](https://nodei.co/npm/line-interpolate-points/)

# line interpolate points
A Node module that interpolates the coordinates of any number of equidistant points along a line composed of one *or
more* line segments, at an optional offset. It's particularly useful for GIS applications, and is analogous to the
PostGIS `ST_LineInterpolatePoint()` and Python Shapely's `shapely.geometry.LineString.interpolate()`. Here's an example
of points interpolated over different multi-segment lines (the second group has been offset):

![A range of points interpolated along a multi-segment line.](https://raw.githubusercontent.com/pelias/line-interpolate-points/master/line_points_interpolation.png)

## the api
The module exports a single function, `interpolateLineRange( ctrlPoints, number, offsetDist )`.
  - `ctrlPoints` is an array of 2D point arrays, like `[ [ 5, 10 ], [ 7, 10 ], [ 14, 13 ] ]`
  - `number` is the number of points to interpolate (the endpoints included)
  - `offsetDist` is an optional distance to move each interpolated point from its container line segment.
  - `minGap` is an optional minimum distance to maintain between subsequent interpolated points (`offsetDist` is not
    taken into account here, as spacing between points is measured *along* the LineString). May decrease `number` if
    the gap between neighbors with that number of points would be lower than `minGap`.

```javascript
> var interpolateLineRange = require( 'line-interpolate-points' )
> interpolateLineRange( [ [ 3, 10 ], [ 4, 10 ] ], 2 )
[ [ 3, 10 ], [ 4, 10 ] ]
> interpolateLineRange( [ [ 3, 10 ], [ 4, 10 ] ], 4 )
[ [ 3, 10 ],
  [ 3.3333333333333335, 10 ],
  [ 3.666666666666667, 10 ],
  [ 4, 10 ] ]
> interpolateLineRange( [ [ 4, 4 ], [ 4, 10 ], [ 7, 17 ] ], 6, 1 )
[ [ 3, 4 ],
  [ 3, 6.723154621172782 ],
  [ 3, 9.446309242345563 ],
  [ 3.9354486533919397, 12.387971226535829 ],
  [ 5.008151811686941, 14.890945262557498 ],
  [ 6.080854969981942, 17.393919298579167 ] ]
```

## Install Dev Dependencies

```bash
$ npm install
```

## Contributing

Please fork and pull request against upstream master on a feature branch. Please provide unit tests and script fixtures
in the `test` directory.

### Running Unit Tests

```bash
$ npm test
```

### Continuous Integration

Travis tests every release against node version `0.10`

[![Build Status](https://travis-ci.org/pelias/line-interpolate-points.svg)](https://travis-ci.org/pelias/line-interpolate-points)
