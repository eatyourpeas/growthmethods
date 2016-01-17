# growthmethods
An NPM module for UK-WHO growth charts: Please note the data inside is licensed to the MRC and should not be used without their permission.

This module uses the UK-WHO growth chart data and blood-pressure data to generate centiles and SDS scores.

To do this it has to look up the L, M and S values against the calculated decimal age of the child, interpolate if necessary, and combine these to generate SDS. The methods in this module do not correct for gestational age in premature babies <37 weeks or <32 weeks as recommended by national guidance so should only be used for the > 2y olds.

The LMS parameters are the median (M), the generalized coefficient of variation (S), and the power in the Box-Cox transformation (L). To obtain the value (X) of a given physical measurement at a particular z-score or percentile, use the following equation:

        X = M (1 + LSZ)**(1/L), L ≠ 0

        Or

        X = M exp(SZ), L = 0

## methods

### calculate a decimal age:

  	decimalAgeFromDates(_dateOfBirth_, _clinicDate_)

### calculate a chronological age

  	chronologicalAgeFromDates(dateOfBirth, clinicDate)

Note neither of these methods correct for gestational age which is recommended if below 1y and born at 32-37 weeks, or below 2y and born at below 32 weeks.

### calculate a BMI (kg/m2) from a height in cm and weight in kg

	bmiFromHeightandWeight(height, weight)

### calculate a weight (kg) from a BMI and a height (cm)

  	weightForBMI(height, BMI)

### calculate the BMI as a percentage of the median for age and sex. The isMale parameter is boolean

	percentageMedianBMI(actualBMI, decimalAge, isMale)

### calculate an SDS from a measurement, sex and decimal age
the measurement parameter accepts: "weight", "height", "BMI". isMale is boolean.

	  SDS(measurement,  decimalAge,  actualMeasurement, isMale)

### convertZScoreToCentile(SDS)
where measurement parameter: "weight", "height", "BMI", "BPSystolic", "BPDiastolic"

  	measurementFromSDS(measurement, requestedMeasureSDS, actualMeasurement, isMale, decimalAge, isBP)

## Blood Pressure methods

There are different methods depending on which reference data is used. If using the the Jackson data, only an age and sex is required. The youngest age this can be used for is 4 years.

If using the Fourth Report data, age, sex and height centile are required. The height centile is calculated from the UK-WHO growth data. The youngest age this can be used for is 1 year.

### calculate a BP SDS from the Jackson data.
isSystolic, isMale are boolean.

    bpSDS(isSystolic, isMale, decimalAge, bp_measurement )

### calculate a BP SDS using the Fourth report method.
isSystolic and isMale are boolean, height_measurement is in cm.

    BPZFromHeightSDSAndDecimalAgeAndSex = function (isSystolic, height_sds, bp_measurement, decimal_age, isMale)

## References

Cole TJ, Green PJ (1992). Smoothing reference centile curves: the LMS method and penalized
likelihood. Statistics in Medicine, 11:1305–1319.

The Fourth Report on the Diagnosis, Evaluation, and Treatment of High Blood Pressure in Children and Adolescents,
PEDIATRICS Vol. 114 No. Supplement 2 August 1, 2004 pp. 555-576

Jackson L V, Thalange N K S, Cole T J. Blood pressure centiles for Great Britain. Arch Dis Child 200792298–303.303

[http://www.cdc.gov/growthcharts/percentile_data_files.htm](http://www.cdc.gov/growthcharts/percentile_data_files.htm)

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/80x15.png" /></a><br /><span xmlns:dct="http://purl.org/dc/terms/" property="dct:title">GrowthMethods</span> by <span xmlns:cc="http://creativecommons.org/ns#" property="cc:attributionName">eatyourpeas</span> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>

DISCLAIMER: NO LIABILITY IS ACCEPTED FOR THE ACCURACY OF THE METHODS IN THESE MODULES OR THE RESULTS THEY PRODUCE.
