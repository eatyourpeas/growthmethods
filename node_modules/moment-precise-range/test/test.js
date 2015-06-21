// lang = 'en'
var moment = require('../');
var assert = require('assert');

describe('preciseDiff', function() {
  function test(d1, d2, result, opts) {
    assert.equal(
      moment.preciseDiff(moment(d1, 'YYYY-MM-DD HH:mm:ss'),
                         moment(d2, 'YYYY-MM-DD HH:mm:ss'), opts),
    result);
  }

  describe('order', function() {
    it('same date', function() {
      test('2013-01-01 00:00:00', '2013-01-01 00:00:00', '');
    });

    it('first date after second', function() {
      test('2013-01-01 00:00:01', '2013-01-01 00:00:00', 'a few seconds');
    });

    it('second date after first', function() {
      test('2013-01-01 00:00:00', '2013-01-01 00:00:01', 'a few seconds');
    });
  });

  describe('single/plural', function() {
    it('multiple seconds', function() {
      test('2013-01-01 00:00:00', '2013-01-01 00:00:02', 'a few seconds');
    });

    it('one minute', function() {
      test('2013-01-01 00:00:00', '2013-01-01 00:01:00', 'a minute');
    });

    it('multiple minutes', function() {
      test('2013-01-01 00:00:00', '2013-01-01 00:02:00', '2 minutes');
    });

    it('one hour', function() {
      test('2013-01-01 00:00:00', '2013-01-01 01:00:00', 'an hour');
    });

    it('multiple hours', function() {
      test('2013-01-01 00:00:00', '2013-01-01 02:00:00', '2 hours');
    });

    it('one day', function() {
      test('2013-01-01 00:00:00', '2013-01-02 00:00:00', 'a day');
    });

    it('multiple days', function() {
      test('2013-01-01 00:00:00', '2013-01-03 00:00:00', '2 days');
    });

    it('one month', function() {
      test('2013-01-01 00:00:00', '2013-02-01 00:00:00', 'a month');
    });

    it('multiple months', function() {
      test('2013-01-01 00:00:00', '2013-03-01 00:00:00', '2 months');
    });

    it('one year', function() {
      test('2013-01-01 00:00:00', '2014-01-01 00:00:00', 'a year');
    });

    it('multiple years', function() {
      test('2013-01-01 00:00:00', '2015-01-01 00:00:00', '2 years');
    });
  });

  describe('counting back', function() {
    it('seconds', function() {
      test('2013-01-01 00:02:10', '2013-01-01 00:03:05', 'a few seconds');
    });
    it('minutes', function() {
      test('2013-01-01 02:10:00', '2013-01-01 03:05:00', '55 minutes');
    });
    it('hours', function() {
      test('2013-01-01 23:00:00', '2013-01-02 01:00:00', '2 hours');
    });
    it('days', function() {
      test('2013-01-20 00:00:00', '2013-02-10 00:00:00', '21 days');
    });
    it('months', function() {
      test('2013-11-01 00:00:00', '2014-02-01 00:00:00', '3 months');
    });
  });

  describe('days across month boundaries', function() {
    it('start month has more days than last full month', function() {
      test('2013-01-31 00:00:00', '2013-03-01 00:00:00', 'a month a day');
      test('2013-01-30 00:00:00', '2013-03-01 00:00:00', 'a month a day');
      test('2013-01-29 00:00:00', '2013-03-01 00:00:00', 'a month a day');
      test('2013-01-28 00:00:00', '2013-03-01 00:00:00', 'a month a day');
      test('2013-01-27 00:00:00', '2013-03-01 00:00:00', 'a month 2 days');

      test('2013-05-31 00:00:00', '2013-07-01 00:00:00', 'a month a day');
      test('2013-05-30 00:00:00', '2013-07-01 00:00:00', 'a month a day');
      test('2013-05-29 00:00:00', '2013-07-01 00:00:00', 'a month 2 days');
    });
    it('start month has fewer days than last full month', function() {
      test('2013-04-29 00:00:00', '2013-08-01 00:00:00', '3 months 3 days');
      test('2013-04-30 00:00:00', '2013-08-01 00:00:00', '3 months 2 days');
      // no way to get '3 months a day' to 2013-08-01
    });
    it('start month has same days as last full month', function() {
      test('2013-05-30 00:00:00', '2013-08-01 00:00:00', '2 months 2 days');
      test('2013-05-31 00:00:00', '2013-08-01 00:00:00', '2 months a day');
    });
  });

  describe('combinations', function() {
    it('all values', function() {
      test('2001-11-12 13:01:43', '2014-02-01 01:03:01', '12 years 2 months 19 days 12 hours a minute a few seconds');
    });
    it('multiple values', function() {
      test('2013-10-21 10:15:40', '2014-02-02 01:01:01', '3 months 11 days 14 hours 45 minutes a few seconds');
      test('2013-12-31 23:58:10', '2014-01-01 00:02:08', '3 minutes a few seconds');
      test('2013-12-31 04:08:20', '2014-01-01 01:02:03', '20 hours 53 minutes a few seconds');
      test('2013-12-27 05:10:20', '2014-01-02 06:12:30', '6 days an hour 2 minutes a few seconds');
      test('2013-10-21 10:15:40', '2014-02-02 01:01:01', '3 months 11 days 14 hours 45 minutes a few seconds');
      test('2013-11-02 01:00:40', '2014-02-02 01:01:01', '3 months a few seconds');
    });
  });

  describe('precision up till options', function() {
    it ('only shows years', function() {
      test('2001-11-12 13:01:43', '2014-02-01 01:03:01', '12 years', {year: true});
    });

    it ('only shows years and months', function() {
      test('2001-11-12 13:01:43', '2014-02-01 01:03:01', '12 years 2 months', {year: true, month: true});
    });

    it('only shows years, months, and days', function() {
      test('2001-11-12 13:01:43', '2014-02-01 01:03:01', '12 years 2 months 19 days', {year: true, month: true, day: true});
    });

    it('only shows years, months, days, and hours', function() {
      test('2001-11-12 13:01:43', '2014-02-01 01:03:01', '12 years 2 months 19 days 12 hours', {year: true, month: true, day: true, hour: true});
    });

    it('only shows years, months, days, hours, and minutes', function() {
      test('2001-11-12 13:01:43', '2014-02-01 01:03:01', '12 years 2 months 19 days 12 hours a minute', {year: true, month: true, day: true, hour: true, minute: true});
    });

    it('only shows years, months, days, hours, minutes, and seconds', function() {
      test('2001-11-12 13:01:43', '2014-02-01 01:03:01', '12 years 2 months 19 days 12 hours a minute a few seconds', {year: true, month: true, day: true, hour: true, minute: true, second: true});
    });
  });
});
