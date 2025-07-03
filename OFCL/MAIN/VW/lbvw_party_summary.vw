CREATE OR REPLACE FORCE VIEW lbvw_party_summary 
(
	 CONTRACT_REF_NO
	,BRANCH
	,MODULE_CODE
	,PRODUCT
	,AUTH_STATUS
	,CONTRACT_STATUS
	,COUNTERPARTY
	,AMOUNT
	,CURRENCY
	,PARTY_FACILITY_REF_NO
	,BORROWER_FACILITY_REF_NO
	,BORROWER_CONTRACT_REF_NO
	,BORROWER_TRANCHE_REF_NO 
	,PRODUCT_TYPE
	,PARTY_TRANCHE_REF_NO
	,PARTY_DRAWDOWN_NO
	,VALUE_DATE				--CITILS46110170 Changes
	,MATURITY_DATE				--CITILS46110170 Changes    
	,DEPARTMENT_CODE
	,TREASURY_SOURCE
	,SHORT_NAME		--Backoffice Related Changes --Added 'SHORT_NAME' for CITIUS-LS,TILL#208 on 21-Nov-2006 
	,CustomerName -- CITILS46110212 changes -- FCC 7.3 RETRO OF CITILS46110212 Changes --FCC V.CL 7.3 UK CONSOLIDATION RETRO
	,participantName  --Bug#34718509
) AS 
/* ----------------------------------------------------------------------------------------------------
**
** File Name	: lbvw_party_summary.VW
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

	Changed By         : Narendra Dhaker
	Date               : 20-May-2021
	Change Description : Product Access restriction
	Search String      : Product Access restriction
	
	Changed By         : Sowmya Bitra
	Date               : 02-Dec-2022
	Change Description : Adding customer name in summary screen
	Search String      : 34718509
---------------------------------------------------------------------------------------------------- 
*/
/*-----------------------------------------------------------------------------------------------
Change History 
	01-mar-2006 Retro as part of Flexcube V.CL Release 7.0 sfr-CITILS46110170
	18-MAR-2006 Flexcube V.CL Release 7.0 Backoffice Related Changes,Darshana
	21-NOV-2006 Vijayalakshmi for CITIUS-LS, TILL#208 :'Short Name'  field is added into the view
22-OCT-2007 FCC V.CL 7.3 UK CONSOLIDATION RETRO START
			26-SEP-2007 FCC 7.3 RETRO OF CITILS46110212
				       CITILS46110212 Borrower Name1 required in participant summary screen.
22-OCT-2007 FCC V.CL 7.3 UK CONSOLIDATION RETRO END
04-Aug-2008  Fcc V.Cl Release 7.4  Stp  Participant Changes By SWAPNASISH 
25-NOV-2008 CITIUS-LS#5073	Party summary screen is taking moretime for launching.
30-DEC-2008 FLEXCUBE V.CL Release 7.4 MTR1 SFR#181, 30-dec-2008,to display customers from position identifier and oltms_customer 
07-JAN-2009 FLEXCUBE V.CL Release 7.4 MTR2 SFR#8, 07-JAN-2009,Modified to diplay participants
04-MAR-2009 FCC V.CL Release 7.5 EURCITIPLC RETRO CITILS10G00166 participant summary amounts on the drawdown contract appear to be incorrect.
22-MAY-2012 Flexcube V.CL Release 7.11, Retro, EURCITIPLC-LS#12769 The customer name to be picked from customer maintenance, not from position identifier maintenance.
-----------------------------------------------------------------------------------------------
*/
(			
	SELECT 
	 A.CONTRACT_REF_NO
	,A.BRANCH
	,a.module_code
	,a.PRODUCT_code
	,A.AUTH_STATUS
	,A.CONTRACT_STATUS
	,B.COUNTERPARTY
	--04-MAR-2009 FCC V.CL Release 7.5 EURCITIPLC RETRO CITILS10G00166 starts
	--,B.AMOUNT
	,fn_ol_part_cont_amt(b.borrower_contract_ref_no, b.counterparty) AMOUNT
	--04-MAR-2009 FCC V.CL Release 7.5 EURCITIPLC RETRO CITILS10G00166
	,B.CURRENCY
	,B.Party_facility_Ref_No
	,B.Borrower_facility_REF_NO
	,B.BORROWER_CONTRACT_REF_NO
	,B.BORROWER_TRANCHE_REF_NO
	,B.PRODUCT_TYPE
	,B.PARTY_TRANCHE_REF_NO
	,B.PARTY_DRAWDOWN_NO
	,B.VALUE_DATE    						--CITILS46110170 Changes     
	,B.MATURITY_DATE 						--CITILS46110170 Changes
	,A.DEPARTMENT_CODE						--Backoffice Related Changes
	,A.TREASURY_SOURCE						--Backoffice Related Changes
	,c.short_name               --CITIUS-LS, TILL#208 on 21-Nov-2006    
	--FCC V.CL 7.3 UK CONSOLIDATION RETRO START
	--FCC 7.3 RETRO OF CITILS46110212 START
	-- CITILS46110212 Start	
	,(
		select c.customer_name1 
		from oltm_customer c 
		where c.customer_no =  
		(select d.counterparty 
		from OLTB_CONTRACT d 
		where d.contract_ref_no = b.borrower_contract_ref_no
		)
	) CustomerName
	-- CITILS46110212 Ends
	--FCC 7.3 RETRO OF CITILS46110212 END
	--FCC V.CL 7.3 UK CONSOLIDATION RETRO END
	 ,C.customer_name1 participantName   --Bug#34718509
FROM   	oltbs_contract a,
       	lptbs_contract_master b
       	--oltms_customer c--CITIUS-LS#5073 --30-DEC-2008 FLEXCUBE V.CL Release 7.4 MTR1 SFR#181, 30-dec-2008,to display customers from position identifier and oltms_customer commented
	  --30-DEC-2008 FLEXCUBE V.CL Release 7.4 MTR1 SFR#181, 30-dec-2008,to display customers from position identifier and oltms_customer Uncommented
	  --CITIUS-LS#5073 Starts
	  --04-Aug-2008  Fcc V.Cl Release 7.4  Stp  Participant Changes Start By SWAPNASISH     
              --,oltms_customer c --CITIUS-LS, TILL#208 on 21-Nov-2006 
	--07-JAN-2009 FLEXCUBE V.CL Release 7.4 MTR2 SFR#8, 07-JAN-2009,Modified to diplay participants
             ,(
        --22-MAY-2012 Flexcube V.CL Release 7.11, Retro, EURCITIPLC-LS#12769, Changes Starts        
        /*SELECT PORTfolio customer_no,POSITION_IDENTIFIER,s.POSITION_IDENTIFIER_DESC short_name,POSITION_IDENTIFIER_DESC
       	FROM tltms_position_identifier s,oltms_customer w
       	WHERE s.portfolio = w.customer_no
		
	UNION
	select customer_no,customer_no POSITION_IDENTIFIER,short_name,customer_name1
       	FROM oltms_customer y
       	where y.customer_no not in (select position_identifier from tltms_position_identifier)*/
        select customer_no,customer_no POSITION_IDENTIFIER,short_name,customer_name1
       	FROM oltms_customer y
        --22-MAY-2012 Flexcube V.CL Release 7.11, Retro, EURCITIPLC-LS#12769, Changes Ends
       	) c
	--07-JAN-2009 FLEXCUBE V.CL Release 7.4 MTR2 SFR#8, 07-JAN-2009,Modified to diplay participants
       	--04-Aug-2008  Fcc V.Cl Release 7.4  Stp  Participant Changes End By SWAPNASISH
       	--CITIUS-LS#5073 ends  		
        --30-DEC-2008 FLEXCUBE V.CL Release 7.4 MTR1 SFR#181, 30-dec-2008,to display customers from position identifier and oltms_customer Uncommented
WHERE  a.contract_ref_no 	= b.contract_ref_no 
AND    a.latest_version_no 	= b.version_no 
AND    a.module_code 		= 'LP'
--AND    a.counterparty		= c.customer_no--CITIUS-LS#5073  --30-DEC-2008 FLEXCUBE V.CL Release 7.4 MTR1 SFR#181, 30-dec-2008,to display customers from position identifier and oltms_customer commented
--30-DEC-2008 FLEXCUBE V.CL Release 7.4 MTR1 SFR#181, 30-dec-2008,to display customers from position identifier and oltms_customer Uncommented
--CITIUS-LS#5073 Starts
--04-Aug-2008  Fcc V.Cl Release 7.4  Stp  Participant Changes Start By SWAPNASISH 
--AND c.customer_no = a.counterparty) --CITIUS-LS, TILL#208 on 21-Nov-2006  
AND 	c.position_identifier = a.counterparty
----Product Access restriction - Start
and exists (Select 1
	 From OLVW_USER_ACCESS_PRODUCTS
	 Where PRODUCT_CODE = a.product_code --OBCL_14.8_CE_Length_Changes
   AND USER_ID = global.user_id)
--Product Access restriction - End
)
--04-Aug-2008  Fcc V.Cl Release 7.4  Stp  Participant Changes End By SWAPNASISH 
--CITIUS-LS#5073 Ends
--30-DEC-2008 FLEXCUBE V.CL Release 7.4 MTR1 SFR#181, 30-dec-2008,to display customers from position identifier and oltms_customer Uncommented
/
CREATE OR REPLACE SYNONYM lbvws_party_summary FOR lbvw_party_summary
/