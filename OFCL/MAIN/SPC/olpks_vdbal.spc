CREATE OR REPLACE PACKAGE olpks_vdbal  
AS
/*-----------------------------------------------------------------------------------------
**
** File Name	: olpks_vdbal.SPC
**
** Module		: LOANS and DEPOSITS
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
------------------------------------------CHANGE HISTORY----------------------------------
05-MAR-2009 FLEXCUBE V.CL Release 7.5 LOT1 FS Tag 2, Slab/Tier based Fee for Commitment and waiver ,PBG Changes by Saurabh
		  New Package Added For LD VDBAL by Saurabh
14-MAY-2009 FLEXCUBE V.CL Release 7.5 LOT2 FS Tag 15, Loan Interest Accrual on principal Outstanding ,PBG Changes by Saurabh
14-May-2009 FLEXCUBE V.CL Release 7.5 lot2 FS Tag09 Differentiation of Reversals and Interest Waiver Changes by Aji

  **Changed By         : Chandra Achuta
  **Date               : 02-JUN-2022
  **Change Description : Hook request for error code skip case.
  **Search String      : Bug#34224604
-----------------------------END CHANGE HISTORY ------------------------------------------------
*/

--Bug#34224604  Changes Starts
PROCEDURE Pr_Set_Skip_Kernel;
PROCEDURE Pr_Set_Activate_Kernel;
PROCEDURE Pr_Set_Skip_Cluster;
PROCEDURE Pr_Set_Activate_Cluster;
FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;
--Bug#34224604  Changes Ends
FUNCTION fn_recalc_ldvdbal
(
p_commitment_ref_no	VARCHAR2,
p_value_date 		DATE,
p_balance_type 		VARCHAR2 DEFAULT 	'ALL',
p_loan_ref_no 		VARCHAR2 DEFAULT 	NULL,
p_recalc_detail 		VARCHAR2 DEFAULT 	'Y',
p_recalc_master 		VARCHAR2 DEFAULT 	'Y'
)
RETURN BOOLEAN;
	
FUNCTION fn_ld_vdbal_update
(
p_contract_ref_no		VARCHAR2,
p_event_code 		VARCHAR2,
p_value_date		DATE,
p_error_code	OUT	VARCHAR2
)
RETURN BOOLEAN;

--14-MAY-2009 FLEXCUBE V.CL Release 7.5 LOT2 FS Tag 15, Loan Interest Accrual on principal Outstanding ,PBG Changes by Saurabh START
FUNCTION fn_get_exchng_rate
(
p_commitment_ref_no  	VARCHAR2
,p_loan_ref_no 		VARCHAR2
,p_commitment_ccy 	VARCHAR2
,p_loan_ccy 		VARCHAR2
,p_amount 		NUMBER
,p_value_date  		DATE  DEFAULT Global.Application_Date
)
RETURN NUMBER ;	
--14-MAY-2009 FLEXCUBE V.CL Release 7.5 LOT2 FS Tag 15, Loan Interest Accrual on principal Outstanding ,PBG Changes by Saurabh END

-- 14-May-2009 FLEXCUBE V.CL Release 7.5 lot2 FS Tag09 Differentiation of Reversals and Interest Waiver Changes by Aji starts
FUNCTION fn_vami_update
		(p_contract_ref_no 	IN	VARCHAR2
		,p_value_date		IN	DATE
		,p_vami_amount		IN	NUMBER DEFAULT 0
		,p_ccy			IN	VARCHAR2
		,p_action_code		IN	VARCHAR2
		,p_error_code		OUT	VARCHAR2
		)
RETURN BOOLEAN;
-- 14-May-2009 FLEXCUBE V.CL Release 7.5 lot2 FS Tag09 Differentiation of Reversals and Interest Waiver Changes by Aji ends

END olpks_vdbal;
/
CREATE or replace SYNONYM olpkss_vdbal FOR olpks_vdbal
/