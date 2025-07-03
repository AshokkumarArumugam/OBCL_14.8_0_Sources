CREATE OR REPLACE PACKAGE fcpks_fcdrcmnt_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : fcpks_fcdrcmnt_utils.spc
  **
  ** Module     : Loan Syndication
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
  
  Changed By         : Sowmya Bitra
  Date               : 01-Aug-2022
  Change Description : Moved the participant margin table to main screen and provided calculate button
  Search String      : Bug#34389739 Changes

  -------------------------------------------------------------------------------------------------------
  */

  PROCEDURE PR_INSERT_BEFORE_MODIFICATION(p_Wrk_fcdrcmnt IN OUT fcpks_fcdrcmnt_Main.ty_fcdrcmnt);
  PROCEDURE PR_INSERT_AFTER_MODIFICATION(p_Wrk_fcdrcmnt IN OUT fcpks_fcdrcmnt_Main.ty_fcdrcmnt);
  PROCEDURE PR_COMPARE(p_Wrk_fcdrcmnt IN OUT fcpks_fcdrcmnt_Main.ty_fcdrcmnt,
                       P_RETURN       OUT BOOLEAN);
  PROCEDURE PR_QUERY_DESCRIPTION(p_wrk_fcdrcmnt IN OUT fcpks_fcdrcmnt_Main.ty_fcdrcmnt);
	TYPE REC_LFTMS_MARGIN_RATE IS RECORD
	(
	   MARGIN_RATE      LFTMS_MARGIN_RATE.MARGIN_RATE%TYPE          
	);
  TYPE TBL_LFTMS_MARGIN_RATE IS TABLE OF REC_LFTMS_MARGIN_RATE INDEX BY BINARY_INTEGER;	
	L_LFTMS_MARGIN_RATE_1   TBL_LFTMS_MARGIN_RATE;
	L_LFTMS_MARGIN_RATE_2		TBL_LFTMS_MARGIN_RATE;
	I	NUMBER;
	N	NUMBER;
  
  FUNCTION Fn_Validation(p_Source           IN VARCHAR2,
                         p_Source_Operation IN VARCHAR2,
                         p_Function_Id      IN VARCHAR2,
                         p_Action_Code      IN VARCHAR2,
                         p_Child_Function   IN VARCHAR2,
                         p_fcdrcmnt         IN fcpks_fcdrcmnt_Main.Ty_fcdrcmnt,
                         p_Wrk_fcdrcmnt     IN OUT fcpks_fcdrcmnt_Main.Ty_fcdrcmnt,
                         p_Err_Code         IN OUT VARCHAR2,
                         p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  
  /*FUNCTION Fn_Subsystem(p_Action_Code      IN VARCHAR2,
                        p_fcdrcmnt         IN fcpks_fcdrcmnt_Main.ty_fcdrcmnt,
                        p_wrk_fcdrcmnt     IN OUT fcpks_fcdrcmnt_Main.ty_fcdrcmnt,
                        p_Err_Code         IN OUT VARCHAR2,
                        p_err_params       IN OUT VARCHAR2) RETURN BOOLEAN;*/ --Bug#34389739 Changes commented
						
  --Bug#34389739 Changes Start
  FUNCTION Fn_Validate_Part_Margin(p_wrk_fcdrcmnt    IN OUT fcpks_fcdrcmnt_Main.ty_fcdrcmnt,
                                   p_Action_Code     IN VARCHAR2,
                                   p_contract_ref_no IN oltbs_contract.contract_ref_no%Type,
                                   p_Err_Code        IN OUT VARCHAR2) RETURN BOOLEAN;                     
  --Bug#34389739 Changes End						

END fcpks_fcdrcmnt_utils;
/
CREATE OR REPLACE SYNONYM fcpkss_fcdrcmnt_utils FOR fcpks_fcdrcmnt_utils
/