CREATE OR REPLACE PACKAGE tlpks_fee_accrual
IS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : tlpks_fee_accrual.SPC
**
** Module       : Secondary Loan Trading
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
---------------------------------CHANGE HISTORY-----------------------------------------------
28-APR-2008 FLEXCUBE V.CL 7.4 Release - 
	Package Specification Created by Kavipriya for SLT Fee accrual processing
28-OCT-2009 CITIUS-LS Till#6506 , Accrual is not reversing for dcf fee on settlment and contract reversal,if already accrued	
28-OCT-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag07 Trading Flat Changes,added the function in spec

 OBCL_14.4_SLT - Accounting for Amendment Fee changes
------------------------------END CHANGE HISTORY----------------------------------------------
*/

FUNCTION Fn_Accrue
(
	p_module		IN		oltbs_contract.module_code%TYPE,
	p_branch		IN		oltms_branch.branch_code%TYPE,
	p_product		IN		oltms_product.product_code%TYPE,
	p_processing_date	IN		DATE,
	p_commit_frequency	IN		oltbs_automatic_process_master.bod_commit_count%TYPE,
	p_error_code		IN OUT		VARCHAR2,
	p_error_param		IN OUT		VARCHAR2
)
RETURN BOOLEAN;
----------------------------------------------------------------------------------------------------
FUNCTION fn_accrue_dcf_settlement
(
p_contract_ref_no	IN		oltbs_contract.contract_ref_no%TYPE,
p_processing_date	IN		DATE,
p_handoff_action_code	IN		VARCHAR2,
p_trev_liqd		IN		VARCHAR2,--28-OCT-2009 CITIUS-LS Till#6506 , Accrual is not reversing for dcf fee on settlment and contract reversal,if already accrued
p_error_code		IN OUT		VARCHAR2,
p_error_param		IN OUT		VARCHAR2
)
RETURN BOOLEAN;
----------------------------------------------------------------------------------------------------
--28-OCT-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag07 Trading Flat Changes start
FUNCTION Fn_Process_For_A_Component
(
	
	P_Fee_Master_Rec	IN 		tltbs_contract_fee_master%ROWTYPE,
	P_Cstb_Contract_Rec	IN		oltbs_contract%ROWTYPE,
	P_Trade_Rec		IN		tltbs_contract_master%ROWTYPE,
	P_Processing_Date	IN		DATE,--Accrual Start Date
	P_Accrual_To_Date	IN		DATE,--Accrual End Date
	--P_Dcf_Settle_Req	IN		BOOLEAN,
	P_Dcf_Settle_Req	IN		VARCHAR2,
	P_Process_Reqd		OUT		BOOLEAN,        
	P_Accrual_Status	OUT		VARCHAR2,			                
	P_Amt_Tag_List		IN OUT		VARCHAR2,
	P_Amt_List		IN OUT		VARCHAR2,
	P_Ccy_List		IN OUT		VARCHAR2,
	P_Error_Code		IN OUT		VARCHAR2,
	P_Error_Param		IN OUT		VARCHAR2
)
RETURN BOOLEAN;
--28-OCT-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag07 Trading Flat Changes end
----------------------------------------------------------------------------------------------------

 --OBCL_14.4_SLT - Accounting for Amendment Fee changes starts
  FUNCTION fn_accrue_amend_fee_liqd(p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
                                    --p_event_seq_no      IN    tltbs_contract_fee_master.event_seq_no%TYPE,
                                    p_value_date          IN DATE,
                                    p_settle_req          IN VARCHAR2,
                                    p_handoff_action_code IN VARCHAR2,
                                    P_Error_Code          IN OUT VARCHAR2,
                                    P_Error_Param         IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --OBCL_14.4_SLT - Accounting for Amendment Fee changes ends


----------------------------------------------------------------------------------------------------
END tlpks_fee_accrual;
/
CREATE OR REPLACE SYNONYM tlpkss_fee_accrual FOR tlpks_fee_accrual
/