CREATE OR REPLACE FORCE VIEW olvw_active_contracts
(
 contract_ref_no   
,counterparty 
,branch                         
,value_date                     
,maturity_date                  
,facility_amount           
,facility_available_amt
,loans_outstanding              
,principal_outstanding_bal
,gfrn                           
,commitment_ref_no              
,expense_code               
,cusip_no			--2010 CITIUS-LS#7272
,proof                          
,gfcid  
,customer_name
,facility_name                  
,product_type    
,hfs_balance_amt
,lc_drawdown
,user_defined_status
--21-OCT-2011 CITIUS-LS#11602 Changes starts
 -- CITIUS-LS#10969 Changes starts
,book_date
,module_code
,credit_line
,product_code
,currency
 -- CITIUS-LS#10969 Changes ends
 --21-OCT-2011 CITIUS-LS#11602 Changes ends
 ,latest_version_no  --15-MAY-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#16442 Changes
)
AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_active_contracts.vw
**
** Module       : LOANS and DEPOSITS										
**
** This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
-----------------------------------------------------------------------------------------------
*/
/*
21-OCT-2011 CITIUS-LS#11602  Added following 7.7 S2 related changes retro to  7.9 baseline
						1) 05-AUG-2011 CITIUS-LS#10969, S2 Redesign to split trading from 234 originations
03-JUN-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#16442  Genesis adjustment changes	 
*/
select  b.contract_ref_no,b.counterparty,b.branch,value_date,maturity_date,
		(
		select amount from OLTB_FACILITY_DETAILED where facility = (select linked_to_ref from oltbs_contract_linkages aa where aa.contract_ref_no = b.contract_ref_no and aa.version_no = b.latest_Version_no)  
		)  facility_amount,
		(
		select principal_outstanding_bal from OLTB_FACILITY_DETAILED where facility = (select linked_to_ref from oltbs_contract_linkages aa where aa.contract_ref_no = b.contract_ref_no and aa.version_no = b.latest_Version_no)  
		)  facility_available_amt,		
		(select loans_outstanding from OLTB_FACILITY_DETAILED where facility = (select linked_to_ref from oltbs_contract_linkages aa where aa.contract_ref_no = b.contract_ref_no and aa.version_no = b.latest_Version_no)  
		)  loans_outstanding,principal_outstanding_bal,
	   	(
		select gfrn from OLTB_FACILITY_DETAILED where facility = (select linked_to_ref from oltbs_contract_linkages aa where aa.contract_ref_no = b.contract_ref_no and aa.version_no = b.latest_Version_no)  
		) gfrn,
	   (select linked_to_ref from oltbs_contract_linkages aa where aa.contract_ref_no = b.contract_ref_no and aa.version_no = b.latest_Version_no) commitment_ref_no,
	   (select txn_mis_1 from oltbs_class_mapping where unit_ref_no = b.contract_ref_no) expense_code,
	   a.cusip_no,--2010 CITIUS-LS#7272
	   (select txn_mis_2 from oltbs_class_mapping where unit_ref_no = b.contract_ref_no) proof,
	   (select gfcid from oltm_customer where  customer_no = b.counterparty) gfcid,
	   (select customer_name1||customer_name2 from oltm_customer where  customer_no = b.counterparty) customer_name,
	   facility_name  ,
	   b.product_type,
	   hfs_balance_amt,
	   lc_drawdown,
	   a.user_defined_status,
	   --21-OCT-2011 CITIUS-LS#11602 Changes starts	   
	   -- CITIUS-LS#10969 Changes starts
	   b.book_date,
	   b.module_code,
	   a.credit_line,
		b.product_code,
		a.currency	   	
	   -- CITIUS-LS#10969 Changes ends	   
	   --21-OCT-2011 CITIUS-LS#11602 Changes ends
	    ,b.latest_version_no --15-MAY-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#16442 Changes
from   oltbs_contract_master a,
	   oltbs_contract b,
	   oltbs_contract_balance c
where  a.contract_ref_no = b.contract_ref_no
and    a.version_no		 = b.latest_version_no
and    c.contract_ref_no = b.contract_ref_no
and    b.module_code	 = 'OL'
and    b.product_type    = 'L'	   
and    principal_outstanding_bal > 0
union all
select b.contract_ref_no,b.counterparty,b.branch,effective_dt,expiry_dt,c.amount facility_amount,principal_outstanding facility_available_amt,loans_outstanding,principal_outstanding,gfrn,
	   facility commitment_ref_no,expense_code,a.cusip_no,--2010 CITIUS-LS#7272
	   (select txn_mis_2 from oltbs_class_mapping where unit_ref_no = b.contract_ref_no) proof,
	   gfcid,
	   (select customer_name1||customer_name2 from oltm_customer where  customer_no = b.counterparty) customer_name,
	   facility_name,b.product_type,
	   hfs_balance_amt, 
	   'N',
	   a.user_defined_status,
	   --21-OCT-2011 CITIUS-LS#11602 Changes starts	   
	   -- CITIUS-LS#10969 Changes starts
	   b.book_date,
	   b.module_code,
	   a.credit_line,
	   b.product_code,
	   a.currency
	   -- CITIUS-LS#10969 Changes ends	   
	   --21-OCT-2011 CITIUS-LS#11602 Changes ends
	   ,b.latest_version_no --15-MAY-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#16442 Changes
from   oltbs_contract_master a,
	   oltbs_contract b,
	   OLTB_FACILITY_DETAILED c,
	   oltbs_contract_balance d
where  a.contract_ref_no = b.contract_ref_no
and    a.version_no		 = b.latest_version_no
and    b.module_code	 = 'OL'
and    b.product_type    = 'C'	   
and    facility 		 = b.contract_ref_no
and    facility			 = d.contract_ref_no
/
create or replace synonym olvws_active_contracts for olvw_active_contracts
/