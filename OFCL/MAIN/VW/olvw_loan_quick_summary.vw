CREATE OR REPLACE FORCE VIEW olvw_loan_quick_summary
(
contract_ref_no, branch, counterparty, borrower_name, ssn, outstanding_bal, currency, maturity_date, 
user_defined_status, rate_type, facility_name, commitment_ref_no, expense_code, facility_memo_no, 
gaurantee, recourse, coll_code, secured, cr_class, reg_code, coll_state_code,sic_code---FLEXCUBE V.CL Release 7.5 lot2 ITR2 SFR#<8> CITIPBGIT<SFR135>
, address_line1, address_line2, address_line3, address_line4,zip_code --11-DEC-2009 FLEXCUBE V.CL Release 7.6 PBG SITERETRO 08-AUG-2009:Added address columns and zip code
)
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_loan_quick_summary.VW
**
** Module	: LD
**
**This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
/* CHANGE HISTORY
11-DEC-2009 FLEXCUBE V.CL Release 7.6 PBG SITERETRO 08-AUG-2009:Added address columns and zip code to display in loan quick summary detail screen.
						    14-OCT-2009 CITIPBG TILL#249: commitment ref no to show only linked to amount, removed NVL
*/
SELECT a.contract_ref_no,a.branch,b.counterparty,e.customer_name1 BORROWER_NAME,e.ssn,
d.principal_outstanding_bal,b.currency,b.maturity_date,a.user_defined_status,
decode(c.rate_type,'X','FIXED','F','FLOATING','SPECIAL') RATE_TYPE,b.facility_name
--,nvl(g.linked_to_ref,a.contract_ref_no) COMMITMENT_REF_NO ,--f.txn_mis_1---FLEXCUBE V.CL Release 7.5 lot2 ITR2 SFR#<8> CITIPBGIT<SFR135> --11-DEC-2009 FLEXCUBE V.CL Release 7.6 PBG SITERETRO 14-OCT-2009 CITIPBG TILL#249 : commented
,g.linked_to_ref COMMITMENT_REF_NO, --11-DEC-2009 FLEXCUBE V.CL Release 7.6 PBG SITERETRO 14-OCT-2009 CITIPBG TILL#249 : added
j.cust_mis_1 expense_code,--kk
decode(h.field_name,'FACILITY-MEMO-NO',h.field_value,null) facility_memo_no,
decode(h.field_name,'GUARANTOR',h.field_value,null) GAURANTEE,
decode(h.field_name,'RECOURSE-CODE',h.field_value,null) recourse,
decode(h.field_name,'COLL-CODE',h.field_value,null) coll_code,
decode(h.field_name,'COLL-TYPE',h.field_value,null) secured,
decode(h.field_name,'CREDIT-CLASS',h.field_value,null) cr_class,
decode(h.field_name,'LOAN-TYPE',h.field_value,null) reg_code,
decode(h.field_name,'COLL-STATE-CODE',h.field_value,null) coll_state_code,
j.cust_mis_2 sic_code--FLEXCUBE V.CL Release 7.5 lot2 ITR2 SFR#<8> CITIPBGIT<SFR135>
,e.address_line1,e.address_line2,e.address_line3,e.address_line4,e.zip_code --11-DEC-2009 FLEXCUBE V.CL Release 7.6 PBG SITERETRO 08-AUG-2009:Added address columns and zip code
FROM   	oltbs_contract a,oltbs_contract_master b,lftbs_contract_interest c,oltbs_contract_balance d,
		---oltms_customer	e,OLTB_CLASS_MAPPING f,oltbs_contract_linkages g ,oltms_contract_userdef_fields H,--kk
		oltms_customer	e,OLTB_CLASS_MAPPING f,oltbs_contract_linkages g ,oltms_contract_userdef_fields H,oltms_customer_default j--kk
WHERE   	a.contract_ref_no	= b.contract_ref_no
AND  		a.contract_status	<> 'H'
AND		a.latest_version_no 	= b.version_no
AND	 	a.module_code 		= 'OL'
AND   		a.product_type    	= 'L'
AND		b.contract_ref_no 	= c.contract_reference_no
AND		b.main_comp 		= c.component
AND		c.event_sequence_no 	= (SELECT MAX(event_sequence_no)
                       		   	   FROM  lftbs_contract_interest
					   WHERE  contract_reference_no = c.contract_reference_no
                             		   )
AND 		a.contract_ref_no	= d.contract_ref_no
and  		b.counterparty		= e.customer_no(+)
and     	f.unit_ref_no(+) 	= a.contract_ref_no
and     	g.contract_ref_no(+) 	= a.contract_ref_no
and     	g.version_no(+) 	= a.latest_version_no
and     	h.contract_ref_no (+) 	= a.contract_ref_no
and     	h.version_no (+) 	= a.latest_version_no
and		j.customer (+) 		= b.counterparty---FLEXCUBE V.CL Release 7.5 lot2 ITR2 SFR#<8> CITIPBGIT<SFR135>
/
CREATE OR REPLACE SYNONYM olvws_loan_quick_summary FOR olvw_loan_quick_summary
/