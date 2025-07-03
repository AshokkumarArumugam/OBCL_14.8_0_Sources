CREATE OR REPLACE force VIEW olvw_all_ac_entries_mis (
   trn_ref_no
   ,custom_ref_no
   ,ac_entry_sr_no
   ,event_sr_no
   ,event
   ,ac_branch
   ,ac_no
   ,ac_ccy
   ,drcr_ind
   ,trn_code
   ,fcy_amount
   ,exch_rate
   ,batch_no
   ,user_id
   ,lcy_amount
   ,trn_dt
   ,value_dt
   ,txn_init_date
   ,amount_tag
   ,related_account
   ,related_customer
   ,related_reference
   ,mis_head
   ,mis_flag
   ,instrument_code
   ,bank_code
   ,balance_upd
   ,auth_stat
   ,module
   ,cust_gl
   ,dly_hist
   ,financial_cycle
   ,period_code
   ,ib
   -- FCC 4.4 DEC 2003 BOUAT TIL#151 New Columns added.
   ,curr_no
   ,print_stat
   ,transaction_count
   ,interface_ref_no
   ,customer_ref_no
   ,hide_txn_in_stmt
   -- FCC 4.4 DEC 2003 BOUAT TIL#151 New Columns added Ends.
   ,gaap_indicator  --FCC 4.3 AUG 2003 GAAP Changes
   ,txn_mis_1
   ,customer_name   --27-MAY-2008 FLEXCUBE V.CL Release 7.4 Retro Changes CITIUS-LS-CITIUSLD46200083 Changes
  )
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : olvw_all_ac_entries_mis.VW
** Module       : CORE ENTITIES
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
/*
CHANGE_HISTORY
24-sep-2001 retro 3.8(FCC3.5.2 CITIPLC LOANS SFR NO.318)
          A journal entry made to a customer account does not appear on the Accounting entry retrieval screen
          (Queries->Accounting Entries) but it appears in the account statement. Added an outer join in the
          view and also added a check in the where clause not to show REVL entries.
19-AUG-2002 FCC 4.1 OCT 2002 CITILATAM RETRO  DOSIT SFR #59 reval accounting entries and not shown in accounting entry retrieval query screen.
17.05.2002 FCC 4.0 JUNE 2002 PLNCITI Til# 2106  Added CUSTOM_REF_NO.
08.06.2002 FCC 4.1 OCT 2002 FCC4.1 ITR1 DART# 94 Added BATCH_NO,USER_ID
08.OCY.2002 FCC 4.1 OCT 2002 FCC 4.1 OCT 2002 RETRO IT FIX FOR DOSIT # 59.
           Changed the SYPKSS_UTILS.X9$ to 'CITILATAM'
17.OCT-2002 FCC 4.1 OCT 2002 corrected the x9$ fix of CITILATAM
08-JUL-2003	FCC 4.3 AUG 2003 GAAP Changes Added gaap_indicator
18-OCT-2003 FCC 4.4 DEC 2003 BOUAT TIL#151 New Columns added.
12-JUL-2004 FCC 4.6 AUG 2004   PYCITI IMPLI Changes.... The where clause of the view is changed for the unit_ref_no.
12-JUL-2004 FCC 4.6 AUG 2004   JPYCITI SFR NO.100 added the decode for unit_reF_no  matching.
11-OCT-2004 FCC 4.6.1 JAN 2005  PLNCITI SFR NO Pl-20040120-11093P -  Added Branch code check in the view.
15-DEC-2004 FCC 4.6.1 JAN 2005 SGDASPAC SFR ASG716 Changes removed existing branch condition and added new branch condition to get all the entries for a particular account
19-JAN-2005 FCC 4.6.1 JAN 2005 ITR-1 SFR-196 For changing copyright clause / release name
25-SEP-2007 FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-LS-407, Branch and IB condition commented.
25-SEP-2007 FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-LS-461, Adding proper join condition for OLTB_CLASS_MAPPING
26-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#25, Retro Changes CITIUS-LS-724,26-DEC-2007 Changes
	     29-MAR-2007 CITIUS-LS#724 , CHANGES added NVL FOR trn_ref_no with related_reference
	     REMOVED BLANK LINES, CREATES PROBLEM IN COMPILATION
27-MAY-2008 FLEXCUBE V.CL Release 7.4 Retro Changes CITIUS-LS-CITIUSLD46200083. New field ‘Customer Name’ added.
28-OCT-2008 CITIUS-LS#SRT1451 STP and Code Consolidation Retro
*/
/*   SELECT	a.*	, b.txn_mis_1
   FROM	olvw_all_ac_entries_fin a, OLTB_CLASS_MAPPING b
   WHERE  NVL (a.ib, 'N') = 'N'
     --JPYCITI added this sFR No.100
   AND b.unit_ref_no=decode(b.unit_type,'A',a.related_account,'R',NVL(a.related_reference,a.trn_ref_no),'X',a.related_reference)--INT54 JPYCITI
   AND (SELECT sypks_utils.get_branch(A.TRN_REF_NO) FROM DUAL) = b.branch_code(+)	--FCC 4.6.1 JAN 2005 SGDASPAC SFR ASG716 Changes
   --AND	a.ac_branch = b.branch_code(+) --  -- FCC4.6.1 PLNCITI - Pl-20040120-11093P  --FCC 4.6.1 JAN 2005 SGDASPAC SFR ASG716 Changes
    -- AND	a.trn_ref_no =  b.unit_ref_no(+) --fcc 3.8 retro sfr no 318. (outer join added)
      --AND   A.event <> 'REVL'  -- fcc 3.8 retro sfr no 318. added.
      --FCC 4.1 OCT 2002 CITILATAM RETRO DOSIT SFR #59 reval accounting entries and not shown in accounting entry retrieval query screen.
      --AND (A.EVENT <> 'REVL' OR  SYPKSS_UTILS.X9$ <> 'CITILATAM')-- 08/OCT/2002 FCC 4.1 OCT 2002 RETRO DOSIT # 59 IT FIX
   AND (a.event <> 'REVL'
      		OR SYPKSS_UTILS.X9$ NOT LIKE '%CITILATAM') --FCC 4.1 OCT 2002 corrected the x9$ fix
   UNION ALL
   SELECT	a.*
   			, b.txn_mis_1
     FROM	olvw_all_ac_entries_fin a
     			, OLTB_ENTRY_MAPPING b
    WHERE NVL (a.ib, 'N') = 'Y'
    AND a.ac_entry_sr_no = b.ac_entry_sr_no
*/
SELECT	a.*,b.txn_mis_1
	,(SELECT c.customer_name1 FROM oltms_customer c WHERE	 upper(c.customer_no) =a.related_customer) "customer_name"--27-MAY-2008 FLEXCUBE V.CL Release 7.4 Retro Changes CITIUS-LS-CITIUSLD46200083
FROM		olvw_all_ac_entries_fin a, OLTB_CLASS_MAPPING b
WHERE
--FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-LS-407 START
--NVL(a.ib, 'N')	=	'N'	AND
cust_gl		=	'A'
--FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-LS-407 END
--AND 		b.branch_code(+) 	= 	a.ac_branch	-- SFR PLC46010093
--FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-LS-461 START
/*AND		b.unit_type(+)	=	'A'
AND		b.unit_ref_no(+)	=	a.ac_no
*/
AND		b.unit_type(+)	=	DECODE(a.module,'IC','A','R')
--FLEXCUBE V.CL Release 7.3 ITR2 SFR#25, Retro Changes CITIUS-LS-724,26-DEC-2007 Changes Starts
--CITIUS-LS#724 ,29-MAR-2007, CHANGES
--AND		b.unit_ref_no(+)	=	DECODE(a.module,'IC',a.ac_no,a.trn_ref_no)
--CITIUS-LS#SRT1451 Starts
----CITIUSLD46200105,starts
--AND		b.unit_ref_no(+)	=	DECODE(a.module,'IC',a.ac_no,NVL(a.related_reference,a.trn_ref_no))--CITIUSLD46200105
AND		b.unit_ref_no(+)	=	DECODE(a.module,'IC',a.ac_no,
							'FC',a.trn_ref_no,
							'LB',a.trn_ref_no,
						NVL(a.related_reference,a.trn_ref_no))
----CITIUSLD46200105,ends						
--CITIUS-LS#SRT1451 Ends
--CITIUS-LS#724 ,29-MAR-2007, CHANGES
--FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-LS-461 END
--FLEXCUBE V.CL Release 7.3 ITR2 SFR#25, Retro Changes CITIUS-LS-724,26-DEC-2007 Changes Ends
UNION ALL
SELECT	a.*,b.txn_mis_1
	,(SELECT c.customer_name1 FROM oltms_customer c WHERE	 upper(c.customer_no) =a.related_customer) "customer_name"--27-MAY-2008 FLEXCUBE V.CL Release 7.4 Retro Changes CITIUS-LS-CITIUSLD46200083
FROM		olvw_all_ac_entries_fin a, OLTB_CLASS_MAPPING b
WHERE
--FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-LS-407 START
--NVL(a.ib, 'N')	=	'N'	AND
cust_gl		=	'G'
--FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-LS-407 END
--AND 		b.branch_code(+) 	= 	a.ac_branch	-- SFR PLC46010093
AND		b.unit_type(+)	=	DECODE(a.module,'IC','A','R')
--FLEXCUBE V.CL Release 7.3 ITR2 SFR#25, Retro Changes CITIUS-LS-724,26-DEC-2007 Changes Starts
--CITIUS-LS#724 ,29-MAR-2007, CHANGES
--AND		b.unit_ref_no(+)	=	DECODE(a.module,'IC',a.related_account,a.trn_ref_no)
--CITIUS-LS#SRT1451 Starts
----CITIUSLD46200105,starts
--AND		b.unit_ref_no(+)	=	DECODE(a.module,'IC',a.ac_no,NVL(a.related_reference,a.trn_ref_no))--CITIUSLD46200105
AND		b.unit_ref_no(+)	=	DECODE(a.module,'IC',a.ac_no,
							'FC',a.trn_ref_no,
							'LB',a.trn_ref_no,
						NVL(a.related_reference,a.trn_ref_no))
----CITIUSLD46200105,ends	
--CITIUS-LS#SRT1451 Ends
--CITIUS-LS#724 ,29-MAR-2007, CHANGES
--FLEXCUBE V.CL Release 7.3 ITR2 SFR#25, Retro Changes CITIUS-LS-724,26-DEC-2007 Changes Ends
UNION ALL
SELECT	a.*,b.txn_mis_1
	,(SELECT c.customer_name1 FROM oltms_customer c WHERE	 upper(c.customer_no) =a.related_customer) "customer_name"--27-MAY-2008 FLEXCUBE V.CL Release 7.4 Retro Changes CITIUS-LS-CITIUSLD46200083
FROM		olvw_all_ac_entries_fin a, OLTB_ENTRY_MAPPING b
WHERE
--NVL(a.ib,'N')	=	'Y'	AND --FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-LS-407
b.ac_entry_sr_no	=	a.ac_entry_sr_no
/
CREATE or replace SYNONYM olvws_all_ac_entries_mis FOR olvw_all_ac_entries_mis
/