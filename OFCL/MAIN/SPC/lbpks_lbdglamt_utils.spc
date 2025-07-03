CREATE OR REPLACE PACKAGE lbpks_lbdglamt_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdglamt_kernel.spc
  **
  ** Module     : Syndication Loans and Commitments
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
  prm_revolving_repmnt_sch            oltms_product_master_ld.revolving_repmnt_sch%TYPE;
  prm_cmt_type                        oltbs_contract_preference.revolving_commitment%TYPE; 
  FUNCTION Fn_Query(p_Source              IN VARCHAR2,
                    p_Source_Operation    IN VARCHAR2,
                    p_Function_Id         IN VARCHAR2,
                    p_Action_Code         IN VARCHAR2,
                    p_wrk_lbdglamt IN OUT   lbpks_lbdglamt_Main.Ty_lbdglamt,
                    p_latest_event_seq_no IN oltbs_contract.latest_event_seq_no%TYPE,
                    p_Err_Code            IN OUT VARCHAR2,
                    p_Err_Params          IN OUT VARCHAR2) RETURN BOOLEAN;


FUNCTION fn_check_mandatory(p_Source              IN VARCHAR2,
                    p_Source_Operation    IN VARCHAR2,
                    p_Function_Id         IN VARCHAR2,
                    p_Action_Code         IN VARCHAR2,
                    p_wrk_lbdglamt IN OUT   lbpks_lbdglamt_Main.Ty_lbdglamt,
                    p_Err_Code            IN OUT VARCHAR2,
                    p_Err_Params          IN OUT VARCHAR2,
                    l_contract_amount		LbTBS_CONTRACT_MASTER.amount%TYPE,
                    l_tr_global_amt			lbtbs_contract_master.amount%TYPE) RETURN BOOLEAN;


FUNCTION fn_prop_global_amt_to_dd(p_Source              IN VARCHAR2,
                    p_Source_Operation    IN VARCHAR2,
                    p_Function_Id         IN VARCHAR2,
                    p_Action_Code         IN VARCHAR2,
                    p_wrk_lbdglamt IN OUT   lbpks_lbdglamt_Main.Ty_lbdglamt,
                    p_Err_Code            IN OUT VARCHAR2,
                    p_Err_Params          IN OUT VARCHAR2) RETURN BOOLEAN;
       

END lbpks_lbdglamt_utils;
/