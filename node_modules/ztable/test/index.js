var expect = require('chai').expect;
var ztable = require('../');

describe('ztable', function () {
    before(function () {
        this.v1 = ztable(-3.49);
        this.v2 = ztable(3.49);
        this.v3 = ztable(1.621231);
        this.v4 = ztable(-0.95313);
        this.v5 = ztable(-3.556);
        this.v6 = ztable(0);
        this.v7 = ztable(6);
        this.v8 = ztable(1.1097576707798367);
        this.v9 = ztable(1.109733243278343243243214353453425454325);
        this.v10 = ztable(1);
        this.v11 = ztable(-0.03);
        this.v12 = ztable(0.03);
    });

    it('zscores match percentiles', function () {
        expect(this.v1).to.equal(0.0002);
        expect(this.v2).to.equal(0.9998);
        expect(this.v3).to.equal(0.9474);
        expect(this.v4).to.equal(0.1711);
        expect(this.v5).to.equal(0);
        expect(this.v6).to.equal(0.5);
        expect(this.v7).to.equal(1);
        expect(this.v8).to.equal(0.8643);
        expect(this.v9).to.equal(0.8643);
        expect(this.v10).to.equal(0.8413);
        expect(this.v11).to.equal(0.4880);
        expect(this.v12).to.equal(0.5120);
        this.stringInput = ztable('2');
        expect(this.stringInput).to.equal(0.9772);
    });

    it('throws an error if NaN', function () {
        var error = null;

        try {
            var invalidInput = ztable('hi');

        } catch (err) {
            error = err;
        }

        expect(error).to.not.equal(null);
        expect(error.message).to.equal('zscore is not a valid number');
    });
});

