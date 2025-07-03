CREATE OR REPLACE PACKAGE lbpks_lbdtxref_utils AS
     /*-----------------------------------------------------------------------------------------------------
     **
     ** File Name  : lbpks_lbdtxref_utils.spc
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

	  Modified By         : Sowmya B
	  Modified On         : 24-Feb-2020
	  Modified Reason     : LS:Tax Changes
	  Search String       : SFR#29959798:OBCL_14.4_LS_TAX_Changes
     -------------------------------------------------------------------------------------------------------
     */

FUNCTION FN_ENAB_DISAB_MEDIA(p_Source    IN  VARCHAR2,
                              p_Source_Operation  IN     VARCHAR2,
                              p_Function_Id       IN     VARCHAR2,
                              p_Action_Code       IN     VARCHAR2,
      p_Child_Function    IN  VARCHAR2,
      p_lbdtxref IN   lbpks_lbdtxref_Main.Ty_lbdtxref,
      p_Prev_lbdtxref IN OUT lbpks_lbdtxref_Main.Ty_lbdtxref,
      p_Wrk_lbdtxref IN OUT  lbpks_lbdtxref_Main.Ty_lbdtxref,
      p_Err_Code       IN  OUT VARCHAR2,
      p_Err_Params     IN  OUT VARCHAR2) RETURN BOOLEAN;

FUNCTION FN_POP_DETAILS(p_Source    IN  VARCHAR2,
                              p_Source_Operation  IN     VARCHAR2,
                              p_Function_Id       IN     VARCHAR2,
                              p_Action_Code       IN     VARCHAR2,
      p_Child_Function    IN  VARCHAR2,
      p_lbdtxref IN   lbpks_lbdtxref_Main.Ty_lbdtxref,
      p_Prev_lbdtxref IN OUT lbpks_lbdtxref_Main.Ty_lbdtxref,
      p_Wrk_lbdtxref IN OUT  lbpks_lbdtxref_Main.Ty_lbdtxref,
      p_Err_Code       IN  OUT VARCHAR2,
      p_Err_Params     IN  OUT VARCHAR2) RETURN BOOLEAN;
      
FUNCTION FN_SETTLEMENT_PICKUP(p_Source    IN  VARCHAR2,
                              p_Source_Operation  IN     VARCHAR2,
                              p_Function_Id       IN     VARCHAR2,
                              p_Action_Code       IN     VARCHAR2,
      p_Child_Function    IN  VARCHAR2,
      p_lbdtxref IN lbpks_lbdtxref_Main.Ty_lbdtxref,
      p_Prev_lbdtxref IN lbpks_lbdtxref_Main.Ty_lbdtxref,
      p_Wrk_lbdtxref IN OUT  lbpks_lbdtxref_Main.Ty_lbdtxref,
      p_Err_Code       IN  OUT VARCHAR2,
      p_Err_Params     IN  OUT VARCHAR2,
      l_settlement_pickup  IN OUT VARCHAR2,
      l_settlement_changed IN OUT VARCHAR2,
      l_module             IN OUT VARCHAR2) RETURN BOOLEAN;

FUNCTION fn_register_event_for_borrower(p_Source           IN VARCHAR2,
                             p_Source_Operation IN VARCHAR2,
                             p_Function_Id      IN VARCHAR2,
                             p_Action_Code      IN VARCHAR2,
                             p_lbdtxref         IN lbpks_lbdtxref_Main.Ty_lbdtxref,
                             p_Prev_lbdtxref    IN lbpks_lbdtxref_Main.Ty_lbdtxref,
                             p_Wrk_lbdtxref     IN OUT lbpks_lbdtxref_Main.Ty_lbdtxref,
                             p_Err_Code         IN OUT VARCHAR2,
                             p_Err_Params       IN OUT VARCHAR2) 
RETURN BOOLEAN;

FUNCTION Fn_Populate_Data(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_lbdtxref         IN lbpks_lbdtxref_main.ty_lbdtxref,
                            p_wrk_lbdtxref     IN OUT lbpks_lbdtxref_main.ty_lbdtxref,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    Return boolean;
	
-- SFR#29959798:OBCL_14.4_LS_TAX_Changes - Start	
FUNCTION fn_brw_tax_refund_acc_entry
  (
  p_brw_contract_ref_no IN oltbs_contract_event_log.contract_ref_no%type,
  p_brw_event_seq_no IN oltbs_contract_event_log.event_seq_no%type,
  p_contract_ref_no IN txtbs_tax_refund_master.participant_ref_no%type,
  p_event_seq_no IN txtbs_tax_refund_master.event_seq_no%type,
  p_errcode IN OUT VARCHAR2,
  p_errprm  IN OUT VARCHAR2
  )
RETURN BOOLEAN;

FUNCTION fn_populate_reversal_hoff
    (
    p_acc_hoff    IN OUT  olpkss_accounting.tbl_achoff,
    p_hoff_count    IN  INTEGER,
    p_current_event_seq_no  IN  oltbs_handoff.event_sr_no%TYPE,
    p_event     IN  oltbs_handoff.event%TYPE,
    p_handoff_action_code IN  CHAR,
    p_error_code    IN OUT  VARCHAR2,
    p_error_parameter IN OUT  VARCHAR2
    )
RETURN BOOLEAN;

FUNCTION fn_reverse_brw_tax_refund_acc_entry
    (
    p_transaction_ref_no  IN  oltbs_handoff.trn_ref_no%TYPE,
    p_reversed_event_seq_no IN  oltbs_handoff.event_sr_no%TYPE,
    p_current_event_seq_no  IN  oltbs_handoff.event_sr_no%TYPE,
    p_event     IN  oltbs_handoff.event%TYPE,
    p_handoff_action_code IN  CHAR,
    p_error_code    IN OUT  VARCHAR2,
    p_error_parameter IN OUT  VARCHAR2
    )
RETURN BOOLEAN;
-- SFR#29959798:OBCL_14.4_LS_TAX_Changes - End
	
END lbpks_lbdtxref_utils;
/