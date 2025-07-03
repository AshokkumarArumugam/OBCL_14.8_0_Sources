CREATE OR REPLACE PACKAGE tlpks_tldtrdsq_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : tlpks_tldtrdsq_kernel.spc
  **
  ** Module     : Secondary Loan Trading
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved
  **
  **
  ** No part of this work may be reproduced, stored in a retrieval system, adopted
  ** or transmitted in any form or by any means, electronic, mechanical,
  ** photographic, graphic, optic recording or otherwise, translated in any
  ** language or computer language, without the prior written permission of
  ** Oracle and/or its affiliates.
  **
  ** Oracle Financial Services Software Limited.
  ** Oracle Park, Off Western Express Highway,
  ** Goregaon (East),
  ** Mumbai - 400 063, India
  ** India
  -------------------------------------------------------------------------------------------------------
  CHANGE HISTORY

  SFR Number         :
  Changed By         :
  Change Description :

  -------------------------------------------------------------------------------------------------------
  */


PROCEDURE Pr_Skip_Handler  (P_Stage  IN  VARCHAR2);
FUNCTION FN_CHK_CCY(p_Source                   IN VARCHAR2,
                        p_Source_Operation         IN VARCHAR2,
                        p_Function_Id              IN VARCHAR2,
                        p_Action_Code              IN VARCHAR2,
                        p_Wrk_tldtrdsq IN OUT  tlpks_tldtrdsq_Main.Ty_tldtrdsq,
                        p_Err_Code                 IN OUT VARCHAR2,
                        p_Err_Params               IN OUT VARCHAR2) 
RETURN BOOLEAN ;


PROCEDURE PR_VALIDATE_INPUT(p_Source                   IN VARCHAR2,
                        p_Source_Operation         IN VARCHAR2,
                        p_Function_Id              IN VARCHAR2,
                        p_Action_Code              IN VARCHAR2,
                        p_Wrk_tldtrdsq IN OUT  tlpks_tldtrdsq_Main.Ty_tldtrdsq,
                        p_Err_Code                 IN OUT VARCHAR2,
                        p_Err_Params               IN OUT VARCHAR2);
                        
                        
PROCEDURE PR_UPD_FMEM_ADV(p_Wrk_tldtrdsq IN OUT  tlpks_tldtrdsq_Main.Ty_tldtrdsq);

FUNCTION FN_GET_CLP_TRADES 
	(
	p_trade_ref_no		IN			tltbs_contract_master.contract_ref_no%type,
	p_is_for_auth			IN			VARCHAR2,--Flexcube V.CL Release 7.10 FS Vol1 Tag 08 ITR1#142
	p_orig_line_trd		OUT			tltbs_contract_master.contract_ref_no%type,
	p_par_line_trade	OUT			tltbs_contract_master.contract_ref_no%type,
	p_err_code				IN OUT	VARCHAR2,
	p_err_param				IN OUT 	VARCHAR2
	)
RETURN BOOLEAN;

PROCEDURE pr_pop_control_table  (p_Wrk_tldtrdsq IN OUT  tlpks_tldtrdsq_Main.Ty_tldtrdsq,p_Function_Id VARCHAR2);

PROCEDURE PR_SHOW_MSGGEN_ON_INPUT
		(p_Function_Id VARCHAR2,
    p_Source VARCHAR2,
		pRef_no varchar2, 
		pEsn number
		);
    
    FUNCTION FN_UPDATE_SETTLED_STATUS  (p_Wrk_tldtrdsa IN OUT  tlpks_tldtrdsa_Main.Ty_tldtrdsa,p_Function_Id VARCHAR2) 
RETURN BOOLEAN;

FUNCTION Fn_check_dual_auth
			(
				p_contract_ref_no	IN	VARCHAR2,
				p_err_code			OUT	VARCHAR2,
				p_err_param			OUT	VARCHAR2
			)
RETURN BOOLEAN;

FUNCTION fn_check_stl_position
	(
	p_ticket_id		IN	tltbs_contract_master.ticket_id%TYPE
	)
RETURN BOOLEAN;

PROCEDURE PR_MSG_GEN_ON_AUTH
					(
          p_Function_Id varchar2,
          p_source varchar2,
					pAuth_window varchar2, 
					pRef_no varchar2, 
					pEsn number
					);

END tlpks_tldtrdsq_utils;
/
CREATE OR REPLACE SYNONYM tlpkss_tldtrdsq_utils FOR tlpks_tldtrdsq_utils
/