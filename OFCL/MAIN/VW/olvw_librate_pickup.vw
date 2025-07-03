CREATE OR REPLACE FORCE VIEW olvw_librate_pickup AS
(
SELECT    y.ccy_code||' '||libor_type libor_desc, frequency, to_number(frequency_unit) frequency_unit, int_rate, effective_Date
FROM      cftms_float_rate_detail X, OLTB_LIBOR_RATE_CODE Y
WHERE     branch_code     = '000'
AND       x.rate_code     = y.rate_code
AND       x.ccy_code      = y.ccy_code
AND       amount_slab     = 999999999999
AND       tenor_to        = 0
AND       borrow_lend_ind = 'M'
/*AND       version_no      = (SELECT MAX(version_no)
                              FROM    cftms_float_rate_detail
                              WHERE    branch_code     = '000'
                              AND      rate_code       = x.rate_code
                              AND      ccy_code        = y.ccy_code
                              AND      amount_slab     = 999999999999
                              AND      tenor_to        = 0
                              AND      borrow_lend_ind = 'M')*/
UNION
-- SELECT  y.ccy_code||' '||libor_type libor_desc, frequency, to_number(frequency_unit) frequency_unit, int_rate, to_date(effective_Date,'DD-MON-RRRR')
SELECT  y.ccy_code||' '||libor_type libor_desc, frequency, to_number(frequency_unit) frequency_unit, int_rate, effective_Date -- 17-MAR-2014 CITIPBG TILL#5638 CHANGES
FROM    LFTM_FLOAT_RATE_UPLD_DETAIL X, OLTB_LIBOR_RATE_CODE Y
WHERE   source_code     = 'GRS'
AND			branch_code    	= '000'
AND     x.rate_code      	= y.rate_code
AND     x.ccy_code     		= y.ccy_code
AND			amount_slab 		= 999999999999
AND			tenor_to 				= 0
AND			borrow_lend_ind = 'M'
)
ORDER BY libor_desc, frequency_unit, frequency desc
/
CREATE OR REPLACE SYNONYM olvws_librate_pickup FOR olvw_librate_pickup
/