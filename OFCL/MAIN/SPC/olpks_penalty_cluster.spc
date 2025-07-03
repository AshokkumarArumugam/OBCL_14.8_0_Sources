create or replace package olpks_penalty_cluster is
  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_penalty_cluster.spc
  **
  ** Module   : OL
  **
    This source is part of the Oracle Flexcube Corporate Lending  Software Product.
    Copyright Â© 2019 , Oracle and/or its affiliates.  All rights reserved.
    No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates.

    Oracle Financial Services Software Limited.
    Oracle Park, Off Western Express Highway,
    Goregaon (East),
    Mumbai - 400 063, India.

    **Changed By         :Gomathi G
    **Date               :26-Aug-2019
    **Change Description : Resolved Rate Control
    **Search String      : OBCL_14.3_Bug#30003630
    
    **  Changed By         : Abhik Das
    **  Changed On         : 12-Jul-2023
    **  Change Description : RABO Brazil need penalty calculation to happen
                             in BOD. But there is one variable l_proceed for which
                             special penalty processing was not happening during BOD
                             with their customisation also. So, they want hook
						     to update this variable as part of custom code.
                             Hooks provided to modify the l_proceed flag as part of
                             their customisation.
                             Added function Fn_Allow_Spl_Penalty_During_BOD for 
						     providing pre and post hook.
                             Ref No- RABOBR_14.5_04_JUL_2023_01_0000
    **  Search String      : OBCL_14.7_RABOBRW_Hook_Bug#35585955_Changes

    **  Changed By         : Balaji Gopal
    **  Changed On         : 08-Apr-2024
    **  Change Description : SID - Added hook request to consider different basis amount for calculating interest.  Also to enable the customer not to collect interest if certain threshold is not met
    **  Search String      : Bug#36429314

    **  Changed By         : Balaji Gopal
    **  Changed On         : 18-Apr-2024
    **  Change Description : SID - Hook Request - Parameter list_of_new_comps is required to send the list of penal components processed and same is using next for accrual.
    **  Search String      : Bug#36429314_1
  ----------------------------------------------------------------------------------------------------
  */

 --OBCL_14.3_Bug#30003630 Starts
 FUNCTION fn_write_penalrate_history(p_contract_ref_no IN lftbs_contract_interest_detail.contract_ref_no%type,
                                    p_component       IN lftbs_contract_interest_detail.component%type,
                                    p_tab_rates       IN olpkss_schedules.ty_rate,
                                    p_err_code        OUT Varchar2)
    RETURN BOOLEAN;
 --OBCL_14.3_Bug#30003630 Ends

-- Added as part of this Bug#36429314 Starts Here
FUNCTION fn_pre_process_for_a_contract_wrapper
(
p_processing_branch     IN oltbs_contract.branch%TYPE,
p_processing_date       IN date,
p_authorization_status  IN oltbs_contract.auth_status%TYPE,
p_handoff_action_code   IN char,
p_product               IN oltbs_contract.product_code%TYPE,
p_module                IN oltbs_contract.module_code%TYPE,
p_contract_ref_no       IN oltbs_contract.contract_ref_no%TYPE,
p_latest_event_seq_no   IN oltbs_contract.latest_event_seq_no%TYPE,
p_latest_version_no     IN oltbs_contract.latest_version_no%TYPE,
p_customer              IN oltbs_contract.counterparty%TYPE,
p_contract_currency     IN oltbs_contract.contract_ccy%TYPE,
p_product_type          IN oltbs_contract.product_type%TYPE,
p_contract_value_date   IN date,
p_grace_days            IN oltms_product_master_ld.grace_days%TYPE,
p_transaction_count     IN OUT integer,
p_list_of_new_comps     IN OUT varchar2, -- Added this parameter as part of this Bug#36429314_1
p_error_code            IN OUT ertbs_msgs.err_code%TYPE,
p_esn                   IN oltbs_contract_event_log.event_seq_no%type default null
)
 RETURN BOOLEAN;

FUNCTION fn_post_process_for_a_contract_wrapper
(
p_processing_branch     IN oltbs_contract.branch%TYPE,
p_processing_date       IN date,
p_authorization_status  IN oltbs_contract.auth_status%TYPE,
p_handoff_action_code   IN char,
p_product               IN oltbs_contract.product_code%TYPE,
p_module                IN oltbs_contract.module_code%TYPE,
p_contract_ref_no       IN oltbs_contract.contract_ref_no%TYPE,
p_latest_event_seq_no   IN oltbs_contract.latest_event_seq_no%TYPE,
p_latest_version_no     IN oltbs_contract.latest_version_no%TYPE,
p_customer              IN oltbs_contract.counterparty%TYPE,
p_contract_currency     IN oltbs_contract.contract_ccy%TYPE,
p_product_type          IN oltbs_contract.product_type%TYPE,
p_contract_value_date   IN date,
p_grace_days            IN oltms_product_master_ld.grace_days%TYPE,
p_transaction_count     IN OUT integer,
p_list_of_new_comps     IN OUT varchar2, -- Added this parameter as part of this Bug#36429314_1
p_error_code            IN OUT ertbs_msgs.err_code%TYPE,
p_esn                   IN oltbs_contract_event_log.event_seq_no%type default null
)
 RETURN BOOLEAN;
-- Added as part of this Bug#36429314 Ends Here

---OBCL_14.7_RABOBRW_Hook_Bug#35585955_Changes Starts---
FUNCTION Fn_Pre_Allow_Spl_Penalty_During_BOD(p_contract_ref_no   IN  oltbs_contract.contract_ref_no%TYPE,
                                             p_esn   IN  oltbs_contract.latest_event_seq_no%TYPE,
                                             p_ev_code       IN  oltbs_contract_event_log.event_code%TYPE,
                                             p_proceed   IN OUT VARCHAR2,
                                             p_error_code      IN OUT  ertbs_msgs.err_code%TYPE
                                             ) RETURN BOOLEAN;

FUNCTION Fn_Post_Allow_Spl_Penalty_During_BOD(p_contract_ref_no   IN  oltbs_contract.contract_ref_no%TYPE,
                                              p_esn   IN  oltbs_contract.latest_event_seq_no%TYPE,
                                              p_ev_code       IN  oltbs_contract_event_log.event_code%TYPE,
                                              p_proceed   IN OUT VARCHAR2,
                                   p_error_code      IN OUT  ertbs_msgs.err_code%TYPE
                                   ) RETURN BOOLEAN;
----OBCL_14.7_RABOBRW_Hook_Bug#35585955_Changes Ends----

end olpks_penalty_cluster;
/
CREATE or replace SYNONYM olpkss_penalty_cluster FOR olpks_penalty_cluster
/