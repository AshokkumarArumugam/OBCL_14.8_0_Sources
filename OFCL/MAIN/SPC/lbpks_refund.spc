CREATE OR REPLACE PACKAGE lbpks_refund AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_refund.spc
  **
  ** Module     : Syndication Loans and Commitments
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Copyright © 2007 - 2022  Oracle and/or its affiliates.  All rights reserved.
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
  
  **Changed By         : Chandra Achuta
  **Date               : 04-MAY-2022
  **Change Description : Introduced this package for supporting refund functionality for LS.
  **Search String      : Bug#34021830
  
  -------------------------------------------------------------------------------------------------------
  */
  g_source_ref_no oltbs_contract.contract_ref_no%TYPE; --SSR

  FUNCTION fn_pop_refund_due(p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
                             p_event_seq_no    IN oltbs_contract_master.event_seq_no%TYPE,
                             p_event_code      IN oltbs_contract_event_log.event_code%TYPE,
                             p_component       IN lftbs_contract_interest.component%TYPE,
                             p_currency        IN oltbs_contract_master.currency%TYPE,
                             p_event_date      IN oltbs_contract_event_log.event_date%TYPE,
                             p_diff_amount     IN OUT oltbs_contract_master.amount%TYPE,
                             p_error_code      IN OUT VARCHAR2,
                             p_error_param     IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_delete_refund(p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
                            p_event_seq_no    IN oltbs_contract_master.event_seq_no%TYPE,
                            --p_component   IN  oltbs_amount_due_cs.component%TYPE,
                            p_payment_esn   IN oltbs_contract_master.event_seq_no%TYPE,
                            p_source_ref_no IN oltbs_contract.contract_ref_no%TYPE, --SSR
                            p_error_code    IN OUT VARCHAR2,
                            p_error_param   IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_reverse_refund(p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
                             --p_component    IN  oltbs_amount_due_cs.component%TYPE,
                             p_event_seq_no  IN oltbs_contract_master.event_seq_no%TYPE,
                             p_payment_esn   IN oltbs_contract_master.event_seq_no%TYPE,
                             p_reversed_esn  IN oltbs_contract_event_log.REVERSED_EVENT_SEQ_NO%TYPE,
                             p_source_ref_no IN oltbs_contract.contract_ref_no%TYPE, --SSR
                             p_error_code    IN OUT VARCHAR2,
                             p_error_param   IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION fn_refund_dtls_insert_prtp(p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
                                      p_Errorcode       OUT VARCHAR2,
                                      p_Errorparam      OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION fn_refund_dtls_insert_prtp_rev(p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
                                          p_Errorcode       OUT VARCHAR2,
                                          p_Errorparam      OUT VARCHAR2)
    RETURN BOOLEAN;
end lbpks_refund;
/
CREATE OR REPLACE SYNONYM lbpkss_refund FOR lbpks_refund
/