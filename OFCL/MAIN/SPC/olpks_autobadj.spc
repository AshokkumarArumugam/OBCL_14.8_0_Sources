create or replace package olpks_autobadj is
  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_autobadj.SPC
  **
  ** Module   : LOANS AND DEPOSITS
  **
    This source is part of the Oracle Banking Corporate Lending  Software Product.
    Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.
    No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates.
  
    Oracle Financial Services Software Limited.
    Oracle Park, Off Western Express Highway,
    Goregaon (East),
    Mumbai - 400 063, India.
  **
  ----------------------------------------------------------------------------------------------------
  */

  /*------------------------------------------CHANGE HISTORY----------------------------------
  
  */

  TYPE Ty_Tb_payrec_paid IS TABLE OF oltb_payrecv_paid%ROWTYPE index by binary_integer;

  FUNCTION fn_process_autobadj(p_contract_ref_no IN VARCHAR2,
                               p_version_no      IN OLTBS_CONTRACT_MASTER.Version_No%TYPE,
                               p_esn             IN OUT OLTBS_CONTRACT_EVENT_LOG.EVENT_SEQ_NO%TYPE,
                               p_value_date      IN OUT DATE,
                               p_mode            IN VARCHAR2,
                               p_Err_Code        IN OUT VARCHAR2,
                               p_Err_Params      IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_autobadj_delete(p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
                              p_esn             IN oltbs_contract.latest_event_seq_no%TYPE,
                              p_lvn             IN oltbs_contract.latest_version_no%TYPE,
                              p_error_code      IN OUT VARCHAR2,
                              p_error_param     IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_autobadj_reverse(p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
                               p_esn             IN oltbs_contract.latest_event_seq_no%TYPE,
                               p_lvn             IN oltbs_contract.latest_version_no%TYPE,
                               p_error_code      IN OUT VARCHAR2,
                               p_error_param     IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_autobadj_liqd(p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
                            p_esn             IN oltbs_contract.latest_event_seq_no%TYPE,
                            p_lvn             IN oltbs_contract.latest_version_no%TYPE,
                            p_value_date      IN DATE,
                            p_mode            IN VARCHAR2,
                            p_error_code      IN OUT VARCHAR2,
                            p_error_param     IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_autobadj_liqd_auth(p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
                                 p_esn             IN oltbs_contract.latest_event_seq_no%TYPE,
                                 p_error_code      IN OUT VARCHAR2,
                                 p_error_param     IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_populate_paid(p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
                            p_esn             IN oltbs_contract.latest_event_seq_no%TYPE,
                            p_value_date      IN oltbs_payrecv_paid.paid_date%Type,
                            p_error_code      IN OUT VARCHAR2,
                            p_error_param     IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_update_contract_details(p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
                                      p_esn             IN oltbs_contract.latest_event_seq_no%TYPE,
                                      p_lvn             IN oltbs_contract.latest_version_no%TYPE,
                                      p_error_code      IN OUT VARCHAR2,
                                      p_error_param     IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_delete_contract_details(p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
                                      p_esn             IN oltbs_contract.latest_event_seq_no%TYPE,
                                      p_lvn             IN oltbs_contract.latest_version_no%TYPE,
                                      p_error_code      IN OUT VARCHAR2,
                                      p_error_param     IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_reverse_contract_details(p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
                                       p_esn             IN oltbs_contract.latest_event_seq_no%TYPE,
                                       p_esn_rev         IN oltbs_contract_event_log.reversed_event_seq_no%type,
                                       p_lvn             IN oltbs_contract.latest_version_no%TYPE,
                                       p_error_code      IN OUT VARCHAR2,
                                       p_error_param     IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_autobadj_reverse_delete(p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
                                      p_esn             IN oltbs_contract.latest_event_seq_no%TYPE,
                                      p_lvn             IN oltbs_contract.latest_version_no%TYPE,
                                      p_error_code      IN OUT VARCHAR2,
                                      p_error_param     IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_pop_payrecv_due(p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
                              p_event_seq_no    IN oltbs_contract_master.event_seq_no%TYPE,
                              p_event_code      IN oltbs_contract_event_log.event_code%TYPE,
                              p_component       IN lftbs_contract_interest.component%TYPE,
                              p_currency        IN oltbs_contract_master.currency%TYPE,
                              p_event_date      IN oltbs_contract_event_log.event_date%TYPE,
                              p_diff_amount     IN OUT oltbs_contract_master.amount%TYPE,
                              p_error_code      IN OUT VARCHAR2,
                              p_error_param     IN OUT VARCHAR2)
    RETURN BOOLEAN;

END olpks_autobadj;
/
CREATE OR REPLACE Synonym olpkss_autobadj FOR olpks_autobadj
/