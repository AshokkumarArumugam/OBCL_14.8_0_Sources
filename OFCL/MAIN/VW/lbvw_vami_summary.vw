CREATE OR REPLACE FORCE VIEW lbvw_vami_summary AS
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
/*----------------------------------CHANGE HISTORY--------------------------------------------------
	**Changed by        : Sai Tejaswini M V
	**Changed on        : 30-JUL-2019
	**Change Description: To fetch only LB contracts
	**Search String     : OBCL_14.3_BUG#30108596
	
	**Changed By         : Narendra Dhaker
	**Date               : 20-May-2021
	**Change Description : Product Access restriction
	**Search String      : Product Access restriction

	**Changed By         : Kavitha Asokan
    **Date               : 13-Feb-2023
    **Change Description : Payment Summary Showing Unauth Status as Auth, after saving the VAMI reversal. 
    **Search String      : Bug#35072370
	
	Changed By         : Ramya M
    Date               : 17-MAR-2023
    Change Description : VAMI Summary Showing older/latest esn VAMI records. 
    Search String      : Bug#35188433 
	
	Changed By         : Akhila Samson
    Date               : 03-Oct-2024
    Change Description : Added the code to display the auth status and contract status based on the contract tranaction. 
    Search String      : Bug#37104302

	Changed By         : Akhila Samson
    Date               : 25-Nov-2024
    Change Description : Added branch code for multi branch access restriction. 
    Search String      : Bug#37267086 	

------------------------------------END CHANGE HISTORY----------------------------------------------
*/
--view creation for vami summary 7.8 ergonomics changes start
(
	SELECT	a.contract_ref_no,
		a.event_seq_no,
		a.value_date,
		a.differential_amount,
		a.new_maturity_date,
		a.transaction_date,
        a.AMEND_INST_STATUS,
		b.auth_status
		,b.CONTRACT_STATUS --11-JAN-2012 FLEXCUBE V.CL Releae 7.9 EURCITIPLC-LS#12300 Added.
		,b.branch --Bug#37267086
	FROM
                oltbs_contract_amend_due a,
               --29-Jun-2012 Flexcube V.CL Release 7.11, Retro, EURCITIPLC#13721 Changes start
				--oltbs_contract b
				--OLTB_CONTRACT_EVENT_LOG b --Bug#37104302
				--29-Jun-2012 Flexcube V.CL Release 7.11, Retro, EURCITIPLC#13721 Changes end
				OLTB_CONTRACT b --Bug#37104302
				WHERE   a.contract_ref_no = b.contract_ref_no
				--29-Jun-2012 Flexcube V.CL Release 7.11, Retro, EURCITIPLC#13723 Changes start
				--Bug#37104302 start
				--Bug#35072370 changes starts
                --and     a.event_seq_no = b.event_seq_no
                /*and  b.event_seq_no = (SELECT max(e.event_seq_no) FROM oltb_contract_event_log e 
                                       WHERE  e.contract_ref_no = a.contract_ref_no
                                       AND   NVL(e.reversed_event_seq_no,e.event_seq_no)= a.event_seq_no) */
                --Bug#35072370 changes ends
				--Bug#37104302 start
				and a.event_Seq_no=(SELECT max(event_Seq_no) 
										from oltbs_contract_amend_due f --Bug#35188433 
										where f.contract_ref_no=a.contract_ref_no--Bug#35188433 
									) -- Bug#35188433 
				--29-Jun-2012 Flexcube V.CL Release 7.11, Retro, EURCITIPLC#13723 Changes end
				and  b.module_code = 'LB'-- b.module='LB' --OBCL_14.3_BUG#30108596 --Bug#37104302
				----Product Access restriction - Start
and exists (Select 1
	 From OLVW_USER_ACCESS_PRODUCTS
	 Where PRODUCT_CODE = (SELECT sypks_utils.get_product(A.CONTRACT_REF_NO) FROM DUAL)
   AND USER_ID = global.user_id)
--Product Access restriction - End
				
)
--view creation for vami summary 7.8 ergonomics changes end
/
--synonym creation for lbvw_vami_summary 7.8 ergonomics changes start
CREATE OR REPLACE synonym lbvws_vami_summary FOR lbvw_vami_summary 
--synonym creation for lbvw_vami_summary 7.8 ergonomics changes end
/