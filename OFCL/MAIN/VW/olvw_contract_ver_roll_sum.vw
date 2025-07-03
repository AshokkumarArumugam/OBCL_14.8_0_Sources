CREATE OR REPLACE FORCE VIEW olvw_contract_ver_roll_sum
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_contract_ver_roll_sum.vw
**
** Module      : OL
**
**This source is part of the Oracle Banking Corporate Lending  Software Product. 
**Copyright © 2007 - 2018  Oracle and/or its affiliates.  All rights reserved.   
**No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted 
**in any form or by any means, electronic, mechanical, photographic, graphic, optic recording
**or otherwise, translated in any language or computer language, without the prior written permission 
**of Oracle and/or its affiliates. 
**Oracle Financial Services Software Limited.
**Oracle Park, Off Western Express Highway,
**Goregaon (East), 
**Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
/*

  **Changed By         : Satheesh Seshan
  **Date               : 01-Jul-2024
  **Change Description : Version roll summary query
  **Search String      : Bug#NBE

  **Changed By         : Satheesh Seshan
  **Date               : 14-Aug-2024
  **Change Description : added max esn condition, changed the join condition to show latest data.
  **Search String      : Bug#36934601

  **Changed By         : Satheesh Seshan
  **Date               : 05-Sep-2024
  **Change Description : Commented module condition and added max version no to show only 1 latest RAMD event
  **Search String      : Bug#37022743  

  **Changed By         : Satheesh Seshan
  **Date               : 09-Oct-2024
  **Change Description : LB Drawdown Rollover changes
  **Search String      : Bug#37143176

  **Changed By         : Satheesh Seshan
  **Date               : 17-Dec-2024
  **Change Description : To get the correct maturity date and amount financed, included the ramd_esn condition. 
  **Search String      : Bug#37119680  
*/
		   (contract_ref_no		, 
			branch				, 
			auth_status			, 
			counterparty		,
			cust_name			,
			rollover_amount     ,
			amount_financed		,
			currency			,
			roll_maturity_date	,
			maturity_date	    ,
			rate_code			, 
			rate				,
			rate_sign 			, 
			spread				,
			roll_src_ref_no		,
			version_no     		,
			roll_esn       		,
			roll_book_date 		,
			roll_value_date		,
			roll_product   		,
			roll_status    		,
			roll_mode           ,
	        module_code
			) 
	AS 
	(
SELECT --a.contract_ref_no, --Bug#36934601 commented
	       e.contract_ref_no, --Bug#36934601 added
		   a.branch,
		   a.auth_status,
		   b.counterparty,
		   d.customer_name1 cust_name, 
		   --Bug#37143176 added NVL
		   NVL(b.amount_financed,b.amount) rollover_amount,
		   NVL(g.amount_financed,g.amount) , --Bug#36934601 added		   
		   b.currency		,
		   b.maturity_date	roll_maturity_date,
		   g.maturity_date  as maturity_date ,--Bug#36934601 added
		   c.rate_code		,
		   c.rate			,
		   c.rate_sign		, 		
		   c.spread			,
		   e.roll_src_ref_no,
		   e.version_no     ,
		   e.roll_esn       ,
		   e.roll_book_date ,
		   e.roll_value_date,
		   e.roll_product   ,
		   e.roll_status    ,
		   e.roll_mode      ,
	       a.module_code		   
	  FROM oltbs_contract a,
   		   oltbs_contract_master b,
		   lftbs_contract_interest c,
		   oltms_customer d,
		   oltbs_contract_version_roll e ,
           oltbs_contract_master g
     WHERE a.contract_ref_no	= b.contract_ref_no  
	   AND a.latest_version_no 	= b.version_no 
	   --AND a.module_code = 'OL'  --Bug#37022743 commented
	   AND b.contract_ref_no 	= c.contract_reference_no (+) 
	   AND b.main_comp 		= c.component(+) 
       AND b.counterparty = d.customer_no(+)
       --Bug#36934601 Start
       --AND e.contract_ref_no = a.contract_ref_no 
	   AND e.roll_src_ref_no = a.contract_ref_no 
       AND g.contract_ref_no = e.contract_ref_no
       AND g.version_no =(SELECT MAX(h.version_no) 
                            FROM oltbs_contract_master h 
                           WHERE h.contract_Ref_no = g.contract_Ref_no
						     AND h.event_seq_no < e.ramd_esn ) --Bug#37119680 added
	   --Bug#37022743 start
       AND e.version_no =(SELECT MAX(j.version_no) 
                            FROM oltbs_contract_version_roll j 
                           WHERE e.contract_Ref_no = j.contract_Ref_no 
                             AND e.roll_src_ref_no = j.roll_src_ref_no)		
	   --Bug#37022743 end
	   AND nvl(c.event_sequence_no,0) =
					   (SELECT nvl(MAX(event_sequence_no), 0)
							  FROM lftbs_contract_interest i, oltb_contract_event_log f
							 WHERE i.contract_reference_no = c.contract_reference_no
							   AND i.contract_reference_no = f.contract_ref_no
							   AND i.component=c.component
							   AND i.event_sequence_no = f.event_seq_no
							   AND f.event_code <> 'VAMB')
	   --Bug#36934601 end
       AND EXISTS (SELECT 1 
					 FROM olvw_user_access_products
					WHERE product_code = a.product_code) --Bug#36934601 added prd cd, removed func
) 
/
CREATE OR REPLACE SYNONYM olvws_contract_ver_roll_sum FOR olvw_contract_ver_roll_sum
/