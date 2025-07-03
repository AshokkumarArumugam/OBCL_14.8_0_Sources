create or replace package lbpks_tranche_limit is
  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_tranche_limit.SPC
  **
  ** Module : LOANS AND SYNDICATION
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
  /*----------------------------------------------------------------------------------------------------
  
  -----------------------------------------------------------------------------------------------------
  */
  g_lmt_esn        oltbs_contract.latest_event_seq_no%TYPE;
  g_lmt_version    oltbs_contract.latest_version_no%TYPE;
  g_lmt_amount     oltbs_contract_master.amount%TYPE;
  g_reverse_delete varchar2(1);
  g_reverse_auth   varchar2(1);
  g_revolving_flag varchar2(1) := 'Y';

  FUNCTION Fn_borrower_limit(p_Source          IN VARCHAR2,
                             p_Function_Id     IN VARCHAR2,
                             p_Action_Code     IN VARCHAR2,
                             p_contract_ref_no IN oltbs_contract_master.syndication_ref_no%TYPE,
                             p_tranche_ref_no  IN oltbs_contract_master.tranche_ref_no%TYPE,
                             p_borr_ref_no     IN oltbs_contract_master.tranche_ref_no%TYPE,
                             p_borrower        IN oltbs_contract_master.counterparty%TYPE,
                             p_ccy             IN oltbs_contract_master.currency%TYPE,
                             p_amount          IN oltbs_contract_master.amount%TYPE)
    RETURN BOOLEAN;

  FUNCTION Fn_process_Borrower_Limit(p_Source      IN VARCHAR2,
                                     p_Function_Id IN VARCHAR2,
                                     p_Action_Code IN VARCHAR2,
                                     p_borr_ref_no IN oltbs_contract_master.tranche_ref_no%TYPE)
    RETURN BOOLEAN;

END lbpks_tranche_limit;
/
CREATE OR REPLACE Synonym lbpkss_tranche_limit FOR lbpks_tranche_limit
/