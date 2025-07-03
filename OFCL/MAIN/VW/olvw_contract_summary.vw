CREATE OR REPLACE FORCE VIEW olvw_contract_summary
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_contract_summary.vw
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
  **Changed By         : Shishirkumar Aithal
  **Date               : 07-Dec-2017
  **Change Description : BUG 26281356 - OLSTRONL - SUMMARY SCREEN DOES NOT DISPLAY NEW LOANS IN HOLD STATUS
  **Search String      : --BUG#26281356
*/
/*
  **Changed By         : Sai Tejaswini
  **Date               : 17-May-2019
  **Change Description : --OBCL_14.3_OBCL_14.3_DSBR Changes
  **Search String      : --OBCL_14.3_OBCL_14.3_DSBR Changes

  **Changed By         : Balaji Gopal
  **Date               : 12-Oct-2022
  **Change Description : UNABLE TO FETCH THE LOAN/COMMITMENT CONTRACTS ON SUMMARY SCREEN IF LOAN IS HOLD 
  **Search String      : 34684168
  
  **Changed By         : Jayaram N
  **Date               : 22-Aug-2023
  **Change Description : OLDTRONL:SUMMARY SCREEN RECORD NOT FOUND
  **Search String      : Bug#35633554
  
  **Changed By          : Abhik Das
  **Changed On          : 29-Jan-2024
  **Change Description  : Modified to fetch rate code except VAMB event to resolve display issue during forward VAMI
                          --fwdport of Bug#36210065
  **Search String       : OBCL_14.7_BNTB_fwdport_Bug#36226284_Changes
  
  **Changed By          : Jeevitha K A
  **Changed On          : 05-November-2024
  **Change Description  : Fix provided to restrict version roll ref number from loan/drawdown summary screen 
  **Search String       : Bug#37168959
*/
			(
			CONTRACT_REF_NO, 
			BRANCH, 
			MODULE_CODE, 
			PRODUCT, 
			product_type,--02-jun-2009 FLEXCUBE V.CL 7.5 LOT2 ITR1 SFR#10 product type  changes
			AUTH_STATUS, 
			CONTRACT_STATUS, 
			COUNTERPARTY,
			CUST_NAME,--OBCL14.4_Search based on customer name
			AMOUNT_FINANCED, --OBCL_14.3_OBCL_14.3_DSBR Changes
			CONT_AMOUNT,
			--CURRENCY, 
			--PRINCIPAL_OUTSTANDING_BAL,	--FCC 4.5 APR 2004 LATAM OPUAT Till#44
			--FCC 4.5 APR 2004 LATAM OPUAT Till#44 ITR1
			PRINCIPAL_OUTSTANDING_BAL,
			CURRENCY,
			VALUE_DATE, 
			MATURITY_DATE, 
			USER_REF_NO, 
			REL_REFERENCE, 
			USER_DEFINED_STATUS, 
			PAYMENT_METHOD, 
			RATE_CODE, 
			RATE,
			RATE_SIGN , --FCC 4.4 Dec 2003 negative interest Changes
			SPREAD,
			INT_AMOUNT,
			DEPARTMENT_CODE,
			CUSTOM_REF_NO, 		--FCC 4.0 June 2002 PLNCITI SFR No. 2106
			TREASURY_SOURCE,		--Fcc4.2 OPS related change
			WORKFLOW_STATUS,		--Fcc4.2 OPS related change SFR 669
			RATE_REVISION_STATUS,	--FCC 4.2 OPS focus testing SFR 23 changes
			EXTERNAL_REF_NO,		--FCC4.6 SEP 2004 LATAM OPUAT#211 changes
			AGENT_CIF,		--FCC 4.6.2 Jul 2005 LS 67 changes
			gfcid,			--FCC 4.6.2 Jul 2005 LS 60 changes
			facility_name		--FCC 4.6.2 Jul 2005 LS 62 changes
			,credit_line	--02-MAY-2006 Madhu CITIUS Till#477, Added credit line to summary screen--FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-LD-477
			--,clusterid	--CITIUSLD46200084 Changes----CITIUS-LS#SRT1452 STP and Code Consolidation Site - Compilation Errors
			,EG_NUMBER      --09-MAR 2009 FCC V.CL Release 7.5 CITIPBG FS Lot1 TAG<10> Changes
			,ALTERNATE_REF_NO	--10-APR-2009 FLEXCUBE V.CL Release 7.5 lot2 FS Tag 13 <FPM> Changes
			,commitment_ref_no --02-jun-2009 FLEXCUBE V.CL 7.5 LOT2 ITR1 SFR#10 commitment refno is displayed
			--FLEXCUBE V.CL Release 7.6 PBG SITERETRO 06-AUG-2009 CITIPBG TILL#151 CHANGES, starts
			,PART_SYS_BORR_ID
			,PART_SYS_COMP
			,PART_SYS_REF_NO
			--FLEXCUBE V.CL Release 7.6 PBG SITERETRO 06-AUG-2009 CITIPBG TILL#151 CHANGES, ends
			,short_name--23-FEB-2010 FLEXCUBE V.CL 7.6, PBG Site-Retro, CITIPBG TILL#734
			,DT_FACILITY_ID --19-JUN-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#16856 changes 
			,CUSIP_NO --CITIUS#20036 changes added.
			) 
	AS 
	(
	SELECT   a.contract_ref_no,
		   a.branch,
		   a.module_code,
		   a.product_code  product,
		   a.product_type,--02-jun-2009 FLEXCUBE V.CL 7.5 LOT2 ITR1 SFR#10 product type  changes
		   a.auth_status,
		   a.contract_status,
		   b.counterparty,
		   e.customer_name1 cust_name,  --OBCL14.4_Search based on customer name
		   b.amount_financed,	--OBCL_14.3_OBCL_14.3_DSBR Changes
		   b.amount cont_amount,
		   d.principal_outstanding_bal,		--FCC 4.5 APR 2004 LATAM OPUAT Till#44
		   b.currency,
		   b.value_date,
		   b.maturity_date,
		   a.user_ref_no,
		   b.rel_reference,
		   a.user_defined_status,
		   b.payment_method,
		   c.rate_code,
		   c.rate,
		   c.rate_sign, 		--FCC 4.4 Dec 2003 negative interest Changes
		   c.spread,
		   c.amount  int_amount,   
		   a.department_code,
		   a.CUSTOM_REF_NO,		--FCC 4.0 June 2002 PLNCITI SFR No. 2106
		   a.Treasury_source,		--Fcc4.2 OPS related change SFR 
		   a.workflow_status,		--Fcc4.2 OPS related change SFR 669
		   a.rate_revision_status,	--FCC 4.2 OPS focus testing SFR 23 changes
		   a.external_ref_no,		--FCC4.6 SEP 2004 LATAM OPUAT#211 changes
		   b.AGENT_CIF,			--FCC 4.6.2 Jul 2005 LS 67 changes
		   e.gfcid,			--FCC4.6.2 Jul 2005 LS 60
		   b.facility_name		--FCC4.6.2 Jul 2005 LS 62
		   ,b.credit_line	--02-MAY-2006 Madhu CITIUS Till#477, Added credit line to summary screen--FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-LD-477
		   --,clusterid	--CITIUSLD46200084 Changes--CITIUS-LS#SRT1451
		   ,e.eg_number --09-MAR 2009 FCC V.CL Release 7.5 CITIPBG FS Lot1 TAG<10> Changes
		   ,a.alternate_ref_no	--10-APR-2009 FLEXCUBE V.CL Release 7.5 lot2 FS Tag 13 <FPM> Changes
		,f.linked_to_ref commitment_ref_no --02-jun-2009 FLEXCUBE V.CL 7.5 LOT2 ITR1 SFR#10 commitment refno is displayed
		--23-Dec-2009 FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION UT#48 - Start
		/*
		--FLEXCUBE V.CL Release 7.6 PBG SITERETRO 06-AUG-2009 CITIPBG TILL#151 CHANGES, starts
		,g.field_value	PART_SYS_BORR_ID
		,h.field_value	PART_SYS_COMP
		,i.field_value	PART_SYS_REF_NO
		--FLEXCUBE V.CL Release 7.6 PBG SITERETRO 06-AUG-2009 CITIPBG TILL#151 CHANGES, ends
		*/
		,(SELECT field_value FROM oltms_contract_userdef_fields
		WHERE contract_ref_no = a.contract_ref_no  
		AND version_no = a.latest_version_no
		AND module = a.module_code 
		AND product_code = a.product_code
		AND field_name = 'PART-SYS-BORR-ID') PART_SYS_BORR_ID
		,(SELECT field_value FROM oltms_contract_userdef_fields
		WHERE contract_ref_no = a.contract_ref_no  
		AND version_no = a.latest_version_no
		AND module = a.module_code 
		AND product_code = a.product_code
		AND field_name = 'PART-SYS-COMP') PART_SYS_COMP
		,(SELECT field_value FROM oltms_contract_userdef_fields
		WHERE contract_ref_no = a.contract_ref_no  
		AND version_no = a.latest_version_no
		AND module = a.module_code 
		AND product_code = a.product_code
		AND field_name = 'PART-SYS-REF-NO') PART_SYS_REF_NO
		--23-Dec-2009 FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION UT#48 - End
		,substr(e.short_name,1,55)--23-FEB-2010 FLEXCUBE V.CL 7.6, PBG Site-Retro, CITIPBG TILL#734
		--19-JUN-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#16856 changes start
		,(SELECT field_value FROM oltms_contract_userdef_fields
		WHERE contract_ref_no = a.contract_ref_no  
		AND   version_no 	  = a.latest_version_no
		AND	  field_name 	  = 'DT_Facility_ID') DT_FACILITY_ID
		--19-JUN-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#16856 changes end
		,b.CUSIP_NO --CITIUS#20036 changes added.
FROM   	oltbs_contract a,
   		oltbs_contract_master b,
		lftbs_contract_interest c,
 		oltbs_contract_balance d,  --FCC 4.5 APR 2004 LATAM OPUAT Till#44
		oltms_customer	e	  --FCC4.6.2 Jul 2005 LS 60
		,oltbs_contract_linkages f --02-jun-2009 FLEXCUBE V.CL 7.5 LOT2 ITR1 SFR#10 commitment refno is displayed
		--23-Dec-2009 FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION UT#48 - Start - Commented
		/*
		--FLEXCUBE V.CL Release 7.6 PBG SITERETRO 06-AUG-2009 CITIPBG TILL#151 CHANGES, starts
		,(SELECT contract_ref_no, version_no, module, product_code, field_value  
		    FROM oltms_contract_userdef_fields 
		   WHERE field_name = 'PART-SYS-BORR-ID') g	
		,(SELECT contract_ref_no, version_no, module, product_code, field_value  
		    FROM oltms_contract_userdef_fields 
		   WHERE field_name = 'PART-SYS-COMP') h	
		,(SELECT contract_ref_no, version_no, module, product_code, field_value  
		    FROM oltms_contract_userdef_fields 
		   WHERE field_name = 'PART-SYS-REF-NO') i	
		--FLEXCUBE V.CL Release 7.6 PBG SITERETRO 06-AUG-2009 CITIPBG TILL#151 CHANGES, ends
		*/
		--23-Dec-2009 FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION UT#48 - End - Commented
WHERE   	a.contract_ref_no		= b.contract_ref_no  
AND  		a.contract_status		<> 'H'   
AND		a.latest_version_no 	= b.version_no 
AND	 	a.module_code 		IN ('MM','OL','SR','LB','OD')    --31.01.2002 PLNCITI TILL#3798  Added OD.  ...Puranjit
AND		b.contract_ref_no 	= c.contract_reference_no (+) --FLEXCUBE V.CL Release 7.6 PBG SITERETRO 10-AUG-2009 CITIPBG TILL#179 CHANGES, added outer join (+)
AND		b.main_comp 		= c.component(+) --FLEXCUBE V.CL Release 7.6 PBG SITERETRO 0-AUG-2009 CITIPBG TILL#179 CHANGES, added outer join (+)   
AND		nvl(c.event_sequence_no,0) 	=
   ---OBCL_14.7_BNTB_fwdport_Bug#36226284_Changes Starts---
   /*
						   (
						   SELECT nvl(MAX(event_sequence_no),0) --FLEXCUBE V.CL Release 7.6 PBG SITERETRO 10-AUG-2009 CITIPBG TILL#179 CHANGES, added nvl on both sides
						   FROM  lftbs_contract_interest
						   WHERE  contract_reference_no = c.contract_reference_no
						   AND SHOWN_IN_CONTRACT_MAIN_SCREEN = 'Y'  --Bug#35633554:Added
						   )
   */
   (SELECT nvl(MAX(event_sequence_no), 0)
          FROM lftbs_contract_interest i, oltb_contract_event_log e
         WHERE i.contract_reference_no = c.contract_reference_no
           and i.contract_reference_no = e.contract_ref_no
           and i.component=c.component
           and i.event_sequence_no = e.event_seq_no
           and e.event_code <> 'VAMB')
   ----OBCL_14.7_BNTB_fwdport_Bug#36226284_Changes Ends----
AND 		a.contract_ref_no	   	= d.contract_ref_no	--FCC 4.5 apr 2004 LATAM OPUAT Till#44
and  		b.counterparty=e.customer_no(+)
 --02-jun-2009 FLEXCUBE V.CL 7.5 LOT2 ITR1 SFR#10 commitment refno is displayed starts
and     f.contract_ref_no(+) = a.contract_ref_no
and     f.version_no (+) = a.latest_version_no
----Product Access restriction - Start
and exists (Select 1 
	 From OLVW_USER_ACCESS_PRODUCTS
	 Where PRODUCT_CODE = sypks_utils.get_product(A.CONTRACT_REF_NO)) 
and not exists (Select 1 From oltb_contract_version_roll  Where Roll_Src_Ref_No= a.contract_ref_no)--Bug#37168959 changes
--Product Access restriction - End
 --02-jun-2009 FLEXCUBE V.CL 7.5 LOT2 ITR1 SFR#10 commitment refno is displayed ends
--23-Dec-2009 FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION UT#48 - Start - Commented
/*
 --FLEXCUBE V.CL Release 7.6 PBG SITERETRO 06-AUG-2009 CITIPBG TILL#151 CHANGES, starts
 AND g.contract_ref_no = a.contract_ref_no
 AND g.version_no = a.latest_version_no
 AND g.module = a.module_code
 AND g.product_code = a.product_code
 AND h.contract_ref_no = a.contract_ref_no
 AND h.version_no = a.latest_version_no
 AND h.module = a.module_code
 AND h.product_code = a.product_code
 AND i.contract_ref_no = a.contract_ref_no
 AND i.version_no = a.latest_version_no
 AND i.module = a.module_code
 AND i.product_code = a.product_code
--FLEXCUBE V.CL Release 7.6 PBG SITERETRO 06-AUG-2009 CITIPBG TILL#151 CHANGES, ends
*/
--23-Dec-2009 FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION UT#48 - End - Commented
)
UNION
(
SELECT  	   a.contract_ref_no,
		   a.branch,
		   a.module_code,
		   a.product_code  product,
		   a.product_type,--02-jun-2009 FLEXCUBE V.CL 7.5 LOT2 ITR1 SFR#10 product type  changes
		   a.auth_status,
		   a.contract_status,
		   b.counterparty,
		   e.customer_name1 cust_name,  --OBCL14.4_Search based on customer name
		   b.amount_financed,	--OBCL_14.3_OBCL_14.3_DSBR Changes
		   b.amount cont_amount,
		   d.principal_outstanding_bal,				--FCC 4.5 Apr 2004 LATAM OPUAT Till#44
		   b.currency,
		   b.value_date,
		   b.maturity_date,
		   a.user_ref_no,
		   b.rel_reference,
		   a.user_defined_status,
		   b.payment_method,
		   c.rate_code,
		   c.rate,
		   c.rate_sign,			 --FCC 4.4 Dec 2003 negative interest Changes
		   c.spread,
		   c.amount  int_amount,
		   a.department_code,
		   a.CUSTOM_REF_NO,		--FCC 4.0 June 2002 PLNCITI SFR No. 2106
		   a.Treasury_source,		--Fcc4.2 OPS related change
		   a.workflow_status,		--Fcc4.2 OPS related change SFR 669
		   a.rate_revision_status,	--FCC 4.2 OPS focus testing SFR 23 changes
		   a.external_ref_no,		--FCC4.6 SEP 2004 LATAM OPUAT#211 changes
		   b.AGENT_CIF,			--FCC 4.6.2 Jul 2005 LS 67 changes
		   e.gfcid,			--FCC4.6.2 Jul 2005 LS 60
		   b.facility_name		--FCC4.6.2 Jul 2005 LS 62
		   ,b.credit_line	--02-MAY-2006 Madhu CITIUS Till#477, Added credit line to summary screen--FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-LD-577
		   --,clusterid	--CITIUSLD46200084 Changes--CITIUS-LS#SRT1451
		   ,e.eg_number --09-MAR 2009 FCC V.CL Release 7.5 CITIPBG FS Lot1 TAG<10> Changes
		   ,a.alternate_ref_no	--10-APR-2009 FLEXCUBE V.CL Release 7.5 lot2 FS Tag 13 <FPM> Changes
		  --,null  --02-jun-2009 FLEXCUBE V.CL 7.5 LOT2 ITR1 SFR#10 commitment refno is displayed -- Null value is commented for 34684168
		  ,f.linked_to_ref commitment_ref_no -- linked_to_ref is added for 34684168
		--23-Dec-2009 FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION UT#48 - Start
		/*
		--FLEXCUBE V.CL Release 7.6 PBG SITERETRO 06-AUG-2009 CITIPBG TILL#151 CHANGES, starts
		,g.field_value	PART_SYS_BORR_ID
		,h.field_value	PART_SYS_COMP
		,i.field_value	PART_SYS_REF_NO
		--FLEXCUBE V.CL Release 7.6 PBG SITERETRO 06-AUG-2009 CITIPBG TILL#151 CHANGES, ends
		*/
		,(SELECT field_value FROM oltms_contract_userdef_fields
		WHERE contract_ref_no = a.contract_ref_no  
		AND version_no = a.latest_version_no
		AND module = a.module_code 
		AND product_code = a.product_code
		AND field_name = 'PART-SYS-BORR-ID') PART_SYS_BORR_ID
		,(SELECT field_value FROM oltms_contract_userdef_fields
		WHERE contract_ref_no = a.contract_ref_no  
		AND version_no = a.latest_version_no
		AND module = a.module_code 
		AND product_code = a.product_code
		AND field_name = 'PART-SYS-COMP') PART_SYS_COMP
		,(SELECT field_value FROM oltms_contract_userdef_fields
		WHERE contract_ref_no = a.contract_ref_no  
		AND version_no = a.latest_version_no
		AND module = a.module_code 
		AND product_code = a.product_code
		AND field_name = 'PART-SYS-REF-NO') PART_SYS_REF_NO
		--23-Dec-2009 FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION UT#48 - End
		,substr(e.short_name,1,55)--23-FEB-2010 FLEXCUBE V.CL 7.6, PBG Site-Retro, CITIPBG TILL#734
		--19-JUN-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#16856 changes start
		,(SELECT field_value FROM oltms_contract_userdef_fields
		WHERE contract_ref_no = a.contract_ref_no  
		AND   version_no 	  = a.latest_version_no
		AND	  field_name 	  = 'DT_Facility_ID') DT_FACILITY_ID
		--19-JUN-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#16856 changes end
		,b.CUSIP_NO --CITIUS#20036 changes added.
FROM   	oltbs_contract a,
   		oltbs_contract_master b,
   		lftbs_contract_interest c,
   		oltbs_contract_balance d,				--FCC 4.5 Apr 2004 LATAM OPUAT Till#44
		oltms_customer	e,	  --FCC4.6.2 Jul 2005 LS 60
        oltbs_contract_linkages f -- oltbs_contract_linkages is added for 34684168
		--23-Dec-2009 FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION UT#48 - Start - Commented
		/*
		--FLEXCUBE V.CL Release 7.6 PBG SITERETRO 06-AUG-2009 CITIPBG TILL#151 CHANGES, starts
		,(SELECT contract_ref_no, version_no, module, product_code, field_value  
		    FROM oltms_contract_userdef_fields 
		   WHERE field_name = 'PART-SYS-BORR-ID') g	
		,(SELECT contract_ref_no, version_no, module, product_code, field_value  
		    FROM oltms_contract_userdef_fields 
		   WHERE field_name = 'PART-SYS-COMP') h	
		,(SELECT contract_ref_no, version_no, module, product_code, field_value  
		    FROM oltms_contract_userdef_fields 
		   WHERE field_name = 'PART-SYS-REF-NO') i	
		--FLEXCUBE V.CL Release 7.6 PBG SITERETRO 06-AUG-2009 CITIPBG TILL#151 CHANGES, ends
		*/
		--23-Dec-2009 FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION UT#48 - End - Commented
WHERE   	a.contract_ref_no		= b.contract_ref_no  
AND		a.contract_status		= 'H'    
AND	        a.latest_version_no 	= b.version_no  
AND		a.module_code 		IN ('MM','OL','SR','LB')   
--15-OCT-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO EURCITIPLC-LD#9057  changes starts
AND		a.contract_ref_no		= d.contract_ref_no(+)      --FCC 4.5 Apr 2004 LATAM OPUAT Till#44 	 	--BUG#26281356  added (+) 
--AND		a.contract_ref_no		= d.contract_ref_no(+) --25-MAY-2009 FCC V.CL Release 7.5 CITIPBG RETRO TILL#31 CHANGES:commented above and added
--15-OCT-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO EURCITIPLC-LD#9057  changes ends
AND	  	b.contract_ref_no 	= c.contract_reference_no (+) 
AND		b.main_comp 		= c.component (+)
and     b.counterparty       = e.customer_no(+)
and     f.contract_ref_no(+) = a.contract_ref_no -- Join Condition is added for 34684168
and     f.version_no (+)     = a.latest_version_no -- Join Condition is added for 34684168
----Product Access restriction - Start
and exists (Select 1 
	 From OLVW_USER_ACCESS_PRODUCTS
	 Where PRODUCT_CODE = sypks_utils.get_product(A.CONTRACT_REF_NO))
and not exists (Select 1 From oltb_contract_version_roll  Where Roll_Src_Ref_No= a.contract_ref_no)--Bug#37168959 changes
--Product Access restriction - End
--23-Dec-2009 FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION UT#48 - Start - Commented
/*
--FLEXCUBE V.CL Release 7.6 PBG SITERETRO 06-AUG-2009 CITIPBG TILL#151 CHANGES, starts
AND g.contract_ref_no = a.contract_ref_no
AND g.version_no = a.latest_version_no
AND g.module = a.module_code
AND g.product_code = a.product_code
AND h.contract_ref_no = a.contract_ref_no
AND h.version_no = a.latest_version_no
AND h.module = a.module_code
AND h.product_code = a.product_code
AND i.contract_ref_no = a.contract_ref_no
AND i.version_no = a.latest_version_no
AND i.module = a.module_code
AND i.product_code = a.product_code
--FLEXCUBE V.CL Release 7.6 PBG SITERETRO 06-AUG-2009 CITIPBG TILL#151 CHANGES, ends
*/
--23-Dec-2009 FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION UT#48 - End - Commented
)
UNION   	--this union in added for commitment that is stored without any interest
(SELECT 	   a.contract_ref_no,
		   a.branch,
		   a.module_code,
		   a.product_code  product,
		   a.product_type,--02-jun-2009 FLEXCUBE V.CL 7.5 LOT2 ITR1 SFR#10 product type  changes
		   a.auth_status,
		   a.contract_status,
		   b.counterparty,
		   e.customer_name1 cust_name,  --OBCL14.4_Search based on customer name
		   b.amount_financed,	--OBCL_14.3_OBCL_14.3_DSBR Changes
		   b.amount cont_amount,
		   d.principal_outstanding_bal,				--FCC 4.5 Apr 2004 LATAM OPUAT Till#44
		   b.currency,
		   b.value_date,
		   b.maturity_date,
		   a.user_ref_no,
		   b.rel_reference,
		   a.user_defined_status,
		   b.payment_method,
		   --FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-LD-429 START
		     --21-Mar-2006 Madhu CITIUS Till#429, LD Contract Summary view showing duplicate commitments >>
		   --c.rate_code,
		   NULL,
		   --c.rate,
		   NULL,
		   --c.rate_sign,			 --FCC 4.4 Dec 2003 negative interest Changes
		   NULL,
		   --c.spread,
		   NULL,
		   --c.amount  int_amount,
		   NULL int_amount,
		   --21-Mar-2006 Madhu CITIUS Till#429, LD Contract Summary view showing duplicate commitments <<
		   --FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-LD-429 END
		   a.department_code,
		   a.CUSTOM_REF_NO,		--FCC 4.0 June 2002 PLNCITI SFR No. 2106
		   a.Treasury_source,		--Fcc4.2 OPS related change
		   a.workflow_status,		--Fcc4.2 OPS related change SFR 669
		   a.rate_revision_status,	--FCC 4.2 OPS focus testing SFR 23 changes
		   a.external_ref_no,		--FCC4.6 SEP 2004 LATAM OPUAT#211 changes
		   b.AGENT_CIF,			--FCC 4.6.2 Jul 2005 LS 67 changes
		   e.gfcid,			--FCC4.6.2 Jul 2005 LS 60
		   b.facility_name		--FCC4.6.2 Jul 2005 LS 62
	        ,b.credit_line	--02-MAY-2006 Madhu CITIUS Till#477, Added credit line to summary screen--FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-LD-477	
	        --,clusterid	--CITIUSLD46200084 Changes--CITIUS-LS#SRT1451
		,e.eg_number --09-MAR 2009 FCC V.CL Release 7.5 CITIPBG FS Lot1 TAG<10> Changes
		,a.alternate_ref_no	--10-APR-2009 FLEXCUBE V.CL Release 7.5 lot2 FS Tag 13 <FPM> Changes
		,null  --02-jun-2009 FLEXCUBE V.CL 7.5 LOT2 ITR1 SFR#10 commitment refno is displayed
		--23-Dec-2009 FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION UT#48 - Start
		/*
		--FLEXCUBE V.CL Release 7.6 PBG SITERETRO 06-AUG-2009 CITIPBG TILL#151 CHANGES, starts
		,g.field_value	PART_SYS_BORR_ID
		,h.field_value	PART_SYS_COMP
		,i.field_value	PART_SYS_REF_NO
		--FLEXCUBE V.CL Release 7.6 PBG SITERETRO 06-AUG-2009 CITIPBG TILL#151 CHANGES, ends
		*/
		,(SELECT field_value FROM oltms_contract_userdef_fields
		WHERE contract_ref_no = a.contract_ref_no  
		AND version_no = a.latest_version_no
		AND module = a.module_code 
		AND product_code = a.product_code
		AND field_name = 'PART-SYS-BORR-ID') PART_SYS_BORR_ID
		,(SELECT field_value FROM oltms_contract_userdef_fields
		WHERE contract_ref_no = a.contract_ref_no  
		AND version_no = a.latest_version_no
		AND module = a.module_code 
		AND product_code = a.product_code
		AND field_name = 'PART-SYS-COMP') PART_SYS_COMP
		,(SELECT field_value FROM oltms_contract_userdef_fields
		WHERE contract_ref_no = a.contract_ref_no  
		AND version_no = a.latest_version_no
		AND module = a.module_code 
		AND product_code = a.product_code
		AND field_name = 'PART-SYS-REF-NO') PART_SYS_REF_NO
		--23-Dec-2009 FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION UT#48 - End
		,substr(e.short_name,1,55)--23-FEB-2010 FLEXCUBE V.CL 7.6, PBG Site-Retro, CITIPBG TILL#734
		--19-JUN-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#16856 changes start
		,(SELECT field_value FROM oltms_contract_userdef_fields
		WHERE contract_ref_no = a.contract_ref_no  
		AND   version_no 	  = a.latest_version_no
		AND	  field_name 	  = 'DT_Facility_ID') DT_FACILITY_ID
		--19-JUN-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#16856 changes end
		,b.CUSIP_NO --CITIUS#20036 changes added.
		FROM   	oltbs_contract a,
   		oltbs_contract_master b,
   		--lftbs_contract_interest c, --21-Mar-2006 Madhu CITIUS Till#429, LD Contract Summary view showing duplicate commitments >>--FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-LD-429 
   		oltbs_contract_balance d,				--FCC 4.5 Apr 2004 LATAM OPUAT Till#44
		oltms_customer	e	  --FCC4.6.2 Jul 2005 LS 60
		--23-Dec-2009 FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION UT#48 - Start - Commented
		/*
		--FLEXCUBE V.CL Release 7.6 PBG SITERETRO 06-AUG-2009 CITIPBG TILL#151 CHANGES, starts
		,(SELECT contract_ref_no, version_no, module, product_code, field_value  
		    FROM oltms_contract_userdef_fields 
		   WHERE field_name = 'PART-SYS-BORR-ID') g	
		,(SELECT contract_ref_no, version_no, module, product_code, field_value  
		    FROM oltms_contract_userdef_fields 
		   WHERE field_name = 'PART-SYS-COMP') h	
		,(SELECT contract_ref_no, version_no, module, product_code, field_value  
		    FROM oltms_contract_userdef_fields 
		   WHERE field_name = 'PART-SYS-REF-NO') i	
		--FLEXCUBE V.CL Release 7.6 PBG SITERETRO 06-AUG-2009 CITIPBG TILL#151 CHANGES, ends		
		*/
		--23-Dec-2009 FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION UT#48 - End - Commented
WHERE   	a.contract_ref_no		= b.contract_ref_no
AND		a.contract_status		<> 'H'
AND	        a.latest_version_no 	= b.version_no
AND		a.module_code 		IN ('MM','OL','SR','LB')
AND		a.contract_ref_no		= d.contract_ref_no(+)	 	--FCC 4.5 Apr 2004 LATAM OPUAT Till#44
--FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-LD-429 START
--21-Mar-2006 Madhu CITIUS Till#429, LD Contract Summary view showing duplicate commitments >>
--AND	  	b.contract_ref_no 	= c.contract_reference_no (+)
--AND		b.main_comp 		= c.component (+)
AND		NOT EXISTS (SELECT 1 FROM LFTB_CONTRACT_INTEREST c WHERE c.contract_reference_no = b.contract_ref_no AND b.main_comp = c.component )
--21-Mar-2006 Madhu CITIUS Till#429, LD Contract Summary view showing duplicate commitments <<
--FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-LD-429 END
and  		b.counterparty		= e.customer_no(+)
and 		a.product_type ='C'
----Product Access restriction - Start
and exists (Select 1 
	 From OLVW_USER_ACCESS_PRODUCTS
	 Where PRODUCT_CODE = sypks_utils.get_product(A.CONTRACT_REF_NO)) 
and not exists (Select 1 From oltb_contract_version_roll  Where Roll_Src_Ref_No= a.contract_ref_no)--Bug#37168959 changes
--Product Access restriction - End
--23-Dec-2009 FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION UT#48 - Start - Commented
/*
--FLEXCUBE V.CL Release 7.6 PBG SITERETRO 06-AUG-2009 CITIPBG TILL#151 CHANGES, starts
AND g.contract_ref_no = a.contract_ref_no
AND g.version_no = a.latest_version_no
AND g.module = a.module_code
AND g.product_code = a.product_code
AND h.contract_ref_no = a.contract_ref_no
AND h.version_no = a.latest_version_no
AND h.module = a.module_code
AND h.product_code = a.product_code
AND i.contract_ref_no = a.contract_ref_no
AND i.version_no = a.latest_version_no
AND i.module = a.module_code
AND i.product_code = a.product_code
--FLEXCUBE V.CL Release 7.6 PBG SITERETRO 06-AUG-2009 CITIPBG TILL#151 CHANGES, ends
*/
--23-Dec-2009 FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION UT#48 - End - Commented
) 
/
CREATE OR REPLACE SYNONYM olvws_contract_summary FOR olvw_contract_summary
/