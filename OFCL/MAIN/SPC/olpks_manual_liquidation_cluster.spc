create or replace package olpks_manual_liquidation_cluster is
  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_manual_liquidation_clusterolpks_manual_liquidation_cluster.spc
  **
  ** Module   : OL
  **
  This source is part of the Oracle Flexcube Corporate Lending  Software Product.
  Copyright Ã‚Â© 2019 , Oracle and/or its affiliates.  All rights reserved.
  No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates.

  Oracle Financial Services Software Limited.
  Oracle Park, Off Western Express Highway,
  Goregaon (East),
  Mumbai - 400 063, India.

  **  Changed By         : Abhik Das
  **  Changed On         : 17-Oct-2023
  **  Change Description : TFB need to waive liquidation amount. So, they want hook to update few 
                           local variables as part of custom code.
                           Hooks provided to modify the local variables as part of their customisation.
                           Added function Fn_allow_waive_liquidation_amount for providing pre and post hook.
                           Ref No- TPBKTW_14.7_19_SEP_2023_01_0000
						         - TPBKTW_14.7_19_SEP_2023_01_0001
  **  Search String      : OBCL_14.7_TFB_Hook_Bug#35910475_Changes

  ----------------------------------------------------------------------------------------------------
  */

---OBCL_14.7_TFB_Hook_Bug#35910475_Changes Starts---
FUNCTION Fn_Pre_Contract_Liquidation(Pcontractrefno IN OUT Oltbs_Contract.Contract_Ref_No%TYPE,
                                     Peventseqno    IN OUT Oltbs_Contract_Event_Log.Event_Seq_No%TYPE,
                                     Pfuncid        IN Smtbs_Menu.Function_Id%TYPE,
                                     p_Event_Code   IN Oltbs_Contract.Curr_Event_Code%TYPE,
                                     Pvaluedate     IN OUT DATE,
                                     p_fn_call_id          IN OUT NUMBER,
                                     p_Tb_Custom_data      IN OUT GLOBAL.Ty_Tb_Custom_Data,
                                     Perrorcode     IN OUT VARCHAR2,
                                     Pparam         IN OUT VARCHAR2) RETURN BOOLEAN;
                                     
FUNCTION Fn_Post_Contract_Liquidation(Pcontractrefno IN OUT Oltbs_Contract.Contract_Ref_No%TYPE,
                                      Peventseqno    IN OUT Oltbs_Contract_Event_Log.Event_Seq_No%TYPE,
                                      Pfuncid        IN Smtbs_Menu.Function_Id%TYPE,
                                      p_Event_Code   IN Oltbs_Contract.Curr_Event_Code%TYPE,
                                      Pvaluedate     IN OUT DATE,
                                      p_fn_call_id          IN OUT NUMBER,
                                      p_Tb_Custom_data      IN OUT GLOBAL.Ty_Tb_Custom_Data,
                                      Perrorcode     IN OUT VARCHAR2,
                                      Pparam         IN OUT VARCHAR2) RETURN BOOLEAN;
                                      
FUNCTION Fn_Pre_Contract_Liquidation_Sch(Pcontractrefno IN OUT Oltbs_Contract.Contract_Ref_No%TYPE,
                                         Peventseqno    IN OUT Oltbs_Contract_Event_Log.Event_Seq_No%TYPE,
                                         Pfuncid        IN Smtbs_Menu.Function_Id%TYPE,
                                         p_Event_Code   IN Oltbs_Contract.Curr_Event_Code%TYPE,
                                         Pvaluedate     IN OUT DATE,
                                         p_fn_call_id          IN OUT NUMBER,
                                         p_Tb_Custom_data      IN OUT GLOBAL.Ty_Tb_Custom_Data,
                                         Perrorcode     IN OUT VARCHAR2,
                                         Pparam         IN OUT VARCHAR2) RETURN BOOLEAN;

FUNCTION Fn_Post_Contract_Liquidation_Sch(Pcontractrefno IN OUT Oltbs_Contract.Contract_Ref_No%TYPE,
                                          Peventseqno    IN OUT Oltbs_Contract_Event_Log.Event_Seq_No%TYPE,
                                          Pfuncid        IN Smtbs_Menu.Function_Id%TYPE,
                                          p_Event_Code   IN Oltbs_Contract.Curr_Event_Code%TYPE,
                                          Pvaluedate     IN OUT DATE,
                                          p_fn_call_id          IN OUT NUMBER,
                                          p_Tb_Custom_data      IN OUT GLOBAL.Ty_Tb_Custom_Data,
                                          Perrorcode     IN OUT VARCHAR2,
                                          Pparam         IN OUT VARCHAR2) RETURN BOOLEAN;
                                      
FUNCTION Fn_Pre_allow_waive_liquidation_amount(pContractRefNo        IN oltbs_contract.contract_ref_no%TYPE,
                                               pEventSeqNo           IN oltbs_contract_event_log.event_seq_no%TYPE,
                                               pFuncId               IN smtbs_menu.function_id%TYPE,
                                               p_event_code          IN oltbs_contract.curr_event_code%TYPE,
                                               pValueDate            IN OUT DATE,
                                               p_component           IN OUT Oltbs_amount_due.Component%TYPE,
                                               p_complist            IN OUT VARCHAR2,
                                               p_taglist             IN OUT VARCHAR2,
                                               p_tagccylist          IN OUT VARCHAR2,
                                               p_tagreinvindlist     IN OUT VARCHAR2,
                                               p_tagamtlist          IN OUT VARCHAR2,
                                               p_valdtlist           IN OUT VARCHAR2,
                                               p_taginstrlist        IN OUT VARCHAR2,
                                               p_penalty_tags        IN OUT VARCHAR2,
                                               p_penalty_amts        IN OUT VARCHAR2,
                                               p_dtag_ccy            IN OUT VARCHAR2,
                                               p_subp_amount         IN OUT Oltbs_amount_due.Amount_due%TYPE,
                                               p_Instrument_No_List  IN OUT VARCHAR2,
                                               p_fn_call_id          IN OUT NUMBER,
                                               p_Tb_Custom_data      IN OUT GLOBAL.Ty_Tb_Custom_Data,
                                               pErrorCode            IN OUT VARCHAR2,
                                               pParam                IN OUT VARCHAR2
                                               ) RETURN BOOLEAN;

FUNCTION Fn_Post_allow_waive_liquidation_amount(pContractRefNo        IN oltbs_contract.contract_ref_no%TYPE,
                                               pEventSeqNo           IN oltbs_contract_event_log.event_seq_no%TYPE,
                                               pFuncId               IN smtbs_menu.function_id%TYPE,
                                               p_event_code          IN oltbs_contract.curr_event_code%TYPE,
                                               pValueDate            IN OUT DATE,
                                               p_component           IN OUT Oltbs_amount_due.Component%TYPE,
                                               p_complist            IN OUT VARCHAR2,
                                               p_taglist             IN OUT VARCHAR2,
                                               p_tagccylist          IN OUT VARCHAR2,
                                               p_tagreinvindlist     IN OUT VARCHAR2,
                                               p_tagamtlist          IN OUT VARCHAR2,
                                               p_valdtlist           IN OUT VARCHAR2,
                                               p_taginstrlist        IN OUT VARCHAR2,
                                               p_penalty_tags        IN OUT VARCHAR2,
                                               p_penalty_amts        IN OUT VARCHAR2,
                                               p_dtag_ccy            IN OUT VARCHAR2,
                                               p_subp_amount         IN OUT Oltbs_amount_due.Amount_due%TYPE,
                                               p_Instrument_No_List  IN OUT VARCHAR2,
                                               p_fn_call_id          IN OUT NUMBER,
                                               p_Tb_Custom_data      IN OUT GLOBAL.Ty_Tb_Custom_Data,
                                               pErrorCode            IN OUT VARCHAR2,
                                               pParam                IN OUT VARCHAR2
                                                ) RETURN BOOLEAN;
----OBCL_14.7_TFB_Hook_Bug#35910475_Changes Ends----

end olpks_manual_liquidation_cluster;
/
CREATE OR REPLACE SYNONYM olpkss_manual_liquidation_cluster FOR olpks_manual_liquidation_cluster
/