CREATE OR REPLACE FORCE VIEW olvw_schedule_hist_summary
(contract_ref_no, due_date, total_amount_due, total_amount_settled, total_adjusted_amount, currency_amt_due)
AS
/*----------------------------------------------------------------------------------------------------
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
*/
--21-JAN-2006, Added for Flexcube Release 7.1, Gowri
(
					SELECT	CONTRACT_REF_NO
						,	DUE_DATE
						,	SUM( ( decode( inflow_outflow, 'I', 1, 'R', 1, -1 ) ) * NVL( AMOUNT_DUE,0))
						,	SUM( ( decode( inflow_outflow, 'I', 1, 'R', 1, -1 ) ) * NVL( AMOUNT_SETTLED,0))
						,	SUM( ( decode( inflow_outflow, 'I', 1, 'R', 1, -1 ) ) * NVL( ADJUSTED_AMOUNT,0))
						,	CURRENCY_AMT_DUE
					FROM 		oltbs_amount_due
					WHERE       COMPONENT_TYPE <>'H' 	
					GROUP BY CONTRACT_REF_NO,DUE_DATE,CURRENCY_AMT_DUE
				)
/

create OR REPLACE synonym olvws_schedule_hist_summary for olvw_schedule_hist_summary
/