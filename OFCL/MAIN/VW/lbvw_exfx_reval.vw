CREATE OR REPLACE FORCE VIEW lbvw_exfx_reval(contract_ref_no, start_date, end_date, rate_code, rate_type, reval_applied,
applied_date, exchange_rate, error_desc)
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: lbvw_exfx_reval.VW
**
** Module      : Syndication Loans and Commitments
**
This source is part of the Oracle Banking Corporate Lending  Software Product. 
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted 
in any form or by any means, electronic, mechanical, photographic, graphic, optic recording
or otherwise, translated in any language or computer language, without the prior written permission 
of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
Change History 
--08-DEC-2006 FLEXCUBE V.CL Release 7.2, EXFX Revaluation Changes, Gowri, Created.
--05-JAN-2007 FLEXCUBE V.CL Release 7.2, EXFX Revaluation Changes, Gowri, modified the query
--14-MAR-2007 FLEXCUBE V.CL Release 7.2, ITR1 SFR#126, Gowri, commented, other than P status rate and date shld be null
----------------------------------------------------------------------------------------------------
*/
	SELECT DISTINCT S1.CONTRACT_REF_NO, S1.START_DATE, S1.END_DATE, S1.RATE_CODE,
			  DECODE(S1.RATE_TYPE,'M','MID','S','SELL','B','BUY'),
			  DECODE(S1.REVAL_APPLIED,'U','Unprocessed','P','Processed','F','Failed','S','Skipped'),
			  DECODE(S1.REVAL_APPLIED, 'P', S1.APPLIED_DATE, NULL), --14-MAR-2007 FLEXCUBE V.CL Release 7.2, ITR1 SFR#126, Gowri, commented, other than P status date shld be null
			  DECODE(S1.REVAL_APPLIED, 'P',(SELECT S2.EXCHANGE_RATE FROM lbtbs_exrate_fixing_details s2
			    WHERE S2.CONTRACT_REF_NO = S1.CONTRACT_REF_NO
			    AND S2.EXRATE_EFFECTIVE_START_DATE >= S1.START_DATE
			    AND S2.EXRATE_EFFECTIVE_START_DATE <= S1.END_DATE
			    AND S2.EXRATE_EFFECTIVE_END_DATE <= S1.END_DATE
			    AND S2.EXRATE_EFFECTIVE_END_DATE >= S1.START_DATE
          AND S2.EVENT_SEQ_NO = (SELECT MAX(EVENT_SEQ_NO)
          	   FROM lbtbs_exrate_fixing_details s5
			    WHERE S5.CONTRACT_REF_NO = S1.CONTRACT_REF_NO
			    AND S5.EXRATE_EFFECTIVE_START_DATE >= S1.START_DATE
			    AND S5.EXRATE_EFFECTIVE_START_DATE <= S1.END_DATE
			    AND S5.EXRATE_EFFECTIVE_END_DATE <= S1.END_DATE
			    AND S5.EXRATE_EFFECTIVE_END_DATE >= S1.START_DATE )),
			    --14-MAR-2007 FLEXCUBE V.CL Release 7.2, ITR1 SFR#126, Gowri, commented, other than P status rate shld be null
			    NULL
          /*'S', NVL((SELECT exchange_rate FROM lbtbs_vd_exchange_rate
               WHERE drawdown_ref_no = s1.contract_ref_no
               AND value_date = s1.start_date), (SELECT exchange_rate FROM lbtbs_vd_exchange_rate
               WHERE drawdown_ref_no = s1.contract_ref_no
               AND value_date < s1.start_date
		   AND value_date = (SELECT MAX(value_date) FROM lbtbs_vd_exchange_rate
               WHERE drawdown_ref_no = s1.contract_ref_no)))*/
      ) exchange_rate,
			  s1.error_desc
	FROM lbtbs_reval_schedules S1,  lbtbs_exrate_fixing_details s3
	WHERE S1.CONTRACT_REF_NO = S3.CONTRACT_REF_NO(+)
	ORDER BY S1.CONTRACT_REF_NO
/

create or replace synonym lbvws_exfx_reval for lbvw_exfx_reval
/