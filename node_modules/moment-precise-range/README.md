# moment-precise-range

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coveralls Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

A moment.js plugin to display human readable date/time ranges with precision.

## Installation

```
npm install moment-precise-range --save
```

## Usage

```
// Will be the moment return by the moment module, with preciseDiff appended
var moment = require('moment-precise-rage');

var result = moment.preciseDiff(moment('2013-10-21 10:15:40', 'YYYY-MM-DD HH:mm:ss'),
                                moment('2014-02-02 01:01:01', 'YYYY-MM-DD HH:mm:ss'));

console.log(result); // 3 months 11 days 14 hours 45 minutes a few seconds
```

[npm-url]: https://npmjs.org/package/moment-precise-range
[npm-image]: http://img.shields.io/npm/v/moment-precise-range.svg

[travis-url]: https://travis-ci.org/mtscout6/moment-precise-range
[travis-image]: https://travis-ci.org/mtscout6/moment-precise-range.svg?branch=master

[coveralls-url]: https://coveralls.io/r/mtscout6/moment-precise-range
[coveralls-image]: https://img.shields.io/coveralls/mtscout6/moment-precise-range.svg?branch=master

[dependencies-url]: https://www.versioneye.com/user/projects/53e3f13ce0a229f1b7000057
[dependencies-image]: https://www.versioneye.com/user/projects/53e3f13ce0a229f1b7000057/badge.svg
