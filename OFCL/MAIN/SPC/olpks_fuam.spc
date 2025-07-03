CREATE OR REPLACE PACKAGE olpks_fuam AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_fuam.SPC
**
** Module		: LOANS AND DEPOSITS
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

/*----------------------------------CHANGE HISTORY----------------------------------
30/01/2002	FCC 3.9 Commitment related changes 
					Define schedules for automatically reduce commitment amounts in the LD contract online.
					These schedules are exploded and the dates on which reduction is to be done is stored
					in LDTMS_CONTRACT_CMTREDN_DUE table.
					The LD batch processing calls a new function for the process code, CMT_REDN introduced 
					in the OLTB_AUTOMATIC_PROCESS_MASTER. This process of automatic reduction is to be called
					before accruals and after liquidation.
29-OCT-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO CITIUS#18066 Changes - to rebuild the interest during future dated VAMI procssing

**SFR Number         : 29583925   
**Changed By         : Arvind Baskar
**Change Description : Hooks provided for fn_future_dated_amds
**Search String      : Bug#29583925  

	**Changed By         : Divya J
	**Date               : 30-Dec-2022
	**Change Description : Validation for Holiday made for Current Dated VAMI only in case commitment reduction VAMI allowed on Holiday.
	**Search String      : Bug#34790755

------------------------------------END CHANGE HISTORY-------------------------------------
*/

	
	
	--Bug#29583925   changes start
  PROCEDURE Pr_Skip_Handler(P_Stage IN VARCHAR2);
  PROCEDURE Pr_Set_Skip_Kernel;
  PROCEDURE Pr_Set_Activate_Kernel;
  PROCEDURE Pr_Set_Skip_Cluster;
  PROCEDURE Pr_Set_Activate_Cluster;
  FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;
  --Bug#29583925   changes end
	g_err_code	VARCHAR2(200) 	:= NULL;
	g_err_param		VARCHAR2(2000)	:=	NULL;
        g_Cmtren_Batch VARCHAR2(1) := 'N'; --Bug#34790755

	FUNCTION fn_future_dated_amds (p_branch		IN		oltms_branch.branch_code%TYPE,
			p_mod		IN			oltms_product.module%TYPE,
			p_proc_date	IN			DATE,
			p_prod		IN			oltms_product.product_code%TYPE,
			p_com_freq	IN			NUMBER,
			p_err_code	IN	OUT		VARCHAR2,
			p_err_param	IN	OUT		VARCHAR2)
	RETURN BOOLEAN;
	
	-- FCC 3.9 Commitment related changes start
	FUNCTION fn_process_cmtredn_auto
						(
						p_branch			IN		oltms_branch.branch_code%TYPE
						, p_proc_date		IN		DATE
						, p_prod			IN		oltms_product.product_code%TYPE
						, p_module			IN		smtb_modules.module_id%TYPE
						, p_com_freq		IN		NUMBER
						, p_err_codes		OUT 	VARCHAR2
						, p_err_params		OUT 	VARCHAR2
						)
	RETURN BOOLEAN;
	--FCC 3.9 Commitment related changes end

--29-OCT-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO CITIUS#18066 Changes starts
FUNCTION fn_Rebuild_Interest
	(
		p_Contract_Ref_no		IN		lftbs_contract_interest_master.Contract_ref_no%Type
	,	p_Latest_Version_no		IN 		oltbs_contract.Latest_Version_no%Type
	,	p_value_date			IN		oltbs_contract_amend_due.Value_date%Type
	,	p_error_code			IN OUT	VARCHAR2
	,	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--29-OCT-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO CITIUS#18066 Changes ends

END olpks_fuam;
/
CREATE or replace SYNONYM olpkss_fuam FOR olpks_fuam
/