# line interpolate points
A Node module that interpolates the coordinates of any number of equidistant points along a line composed of one *or
more* line segments. It's particularly useful for GIS applications, and is analogous to the PostGIS
`ST_LineInterpolatePoint()` and Python Shapely's `shapely.geometry.LineString.interpolate()`. Here's an example of a
number of points interpolated over a multi-segment line:

![A range of points interpolated along a multi-segment line.](https://raw.githubusercontent.com/pelias/line-interpolate-points/master/line_points_interpolation.png)

## the api
The module exports a single function, `interpolateLineRange( ctrlPoints, number )`; `ctrlPoints` is an array of 2D
point objects, like `[ { x: 5, y: 10 }, { x: 7, y: 10 }, { x: 14, y: 13 } ]`, while `number` is the number of points to
interpolate (the endpoints included).

```javascript
> var interpolateLineRange = require( 'line-points-interpolator' )
> interpolateLineRange( [ { x: 3, y: 10 }, { x: 4, y: 10 } ], 2 )
[ { x: 3, y: 10 },
  { x: 4, y: 10 } ]
> interpolateLineRange( [ { x: 3, y: 10 }, { x: 4, y: 10 } ], 4 )
[ { x: 3, y: 10 },
  { x: 3.3333333333333335, y: 10 },
  { x: 3.666666666666667, y: 10 },
  { x: 4, y: 10 } ]
```

## Install Dev Dependencies

```bash
$ npm install
```

## Contributing

Please fork and pull request against upstream master on a feature branch. Pretty please: provide unit tests and script
fixtures in the `test` directory.

### Running Unit Tests

```bash
$ npm test
```

### Continuous Integration

Travis tests every release against node version `0.10`

[![Build Status](https://travis-ci.org/pelias/line-interpolate-points.svg)](https://travis-ci.org/pelias/line-interpolate-points)
