CREATE OR REPLACE PACKAGE txpks_charges IS
/*------------------------------------------------------------------------------------------------
**
** File Name  : txpks_charges.SPC
**
** Module   : CHARGES
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
CHANGE HISTORY
--------------
10/10/02 FCC 4.1 OCT 2002 ITR1 value date added to fn_class_pickup..anu
23-APR-2003 FCC 4.2 Retro April 2003 CEEMEA 9012. Overloaded fn_class_pickup to correct LC Availment Error due
      to ITR1 changes.
30-JUN-2003 FCC 4.3 DEV AUG 2003 STG Changes
      Function fn_class_pickup is overloaded with the parameters p_ccy, p_basis_amount_tag,p_list_of_amount,
      p_list_of_ccy,p_chg_pickup_branch,p_chg_pickup_account,p_txn_branch and p_txn_account.
09-MAY-2016 OFCL12.2 commented unwanted code      
06-Jun-2016 OFCL standalone changes, commented not required code. Search string--- OFCL12.2 Not required
Changed By         : Abhik Das
Changed On         : 20-AUG-2021
Change Description : 1. To show correct basis amount in charge subscreen
                       2. To show updated charge for VAMB and VAMI event
Search String      : OBCL_14.5_Support_Bug#33191052_Changes
*/
g_VAMI_amount oltbs_contract_amend_due.differential_amount%TYPE;--OBCL_14.5_Support_Bug#33191052_Changes

FUNCTION fn_class_pickup
  (
   p_event         in   oltbs_event.event_code%type
  ,p_contract_ref_no       in   oltbs_contract.contract_ref_no%type
  ,p_event_seq_no    in   oltbs_contract.latest_event_seq_no%type
      ,p_party       in   lftbs_contract_commission.party%TYPE
  ,p_status      in   lftbs_contract_interest.status%TYPE
  ,p_error_code            out  ertbs_msgs.err_code%type
  )
RETURN boolean ;

-- fn_class_pickup overloaded for ITR1

FUNCTION fn_class_pickup
  (
   p_event        in  oltbs_event.event_code%type
  ,p_contract_ref_no  in  oltbs_contract.contract_ref_no%type
  ,p_event_seq_no   in  oltbs_contract.latest_event_seq_no%type
    ,p_value_dt         in  date
  ,p_party      in  lftbs_contract_commission.party%TYPE
  ,p_status     in  lftbs_contract_interest.status%TYPE
  ,p_error_code       out ertbs_msgs.err_code%type
  )
RETURN boolean ;

FUNCTION fn_get_prod_chargetags
  (
  --pProduct        IN  lctbs_contract_master.product_code%TYPE,  -- OFCL12.2 changed from lctb_contract to OLTB_CONTRACT
  pProduct        IN  oltbs_contract.product_code%TYPE,
  p_prod_charge_tags    OUT   varchar2,
  p_prod_charge_tag_ccy   OUT   varchar2,
  p_error_code      OUT ertbs_msgs.err_code%type
  )
RETURN boolean ;

FUNCTION fn_get_cont_chargetags
  (
  p_ref_no        IN    oltbs_contract.contract_ref_no%TYPE  ,
  p_esn         IN    oltbs_contract.latest_event_seq_no%TYPE ,
  p_cont_charge_tags    OUT   varchar2 ,
  p_cont_charge_tag_ccy   OUT   varchar2 ,
  p_cont_charge_stl_ccy   OUT   VARCHAR2 ,
  p_error_code      OUT ertbs_msgs.err_code%type
  )
RETURN boolean ;

--30-JUN-2003 FCC 4.3 DEV AUG 2003 STG Changes Begin
FUNCTION fn_class_pickup
  (
  p_event           IN  oltbs_event.event_code%TYPE,
  p_contract_ref_no     IN  oltbs_contract.contract_ref_no%TYPE,
  p_event_seq_no      IN  oltbs_contract.latest_event_seq_no%TYPE,
    p_value_dt            IN  DATE,
  p_party         IN  lftbs_contract_commission.party%TYPE,
  p_status        IN  lftbs_contract_interest.status%TYPE,
  p_ccy         IN  cytms_ccy_defn.ccy_code%TYPE,
  p_basis_amount_tag    IN  VARCHAR2,
  p_list_of_amount    IN  VARCHAR2,
  p_list_of_ccy     IN  VARCHAR2,
  p_chg_pickup_branch   IN  oltms_branch.branch_code%TYPE,
  --p_chg_pickup_account  IN  sttms_cust_account.cust_ac_no%TYPE,
  p_chg_pickup_account  IN  oltb_account.ac_gl_no%TYPE,
  p_txn_branch      IN  oltms_branch.branch_code%TYPE,
  --p_txn_account     IN  sttms_cust_account.cust_ac_no%TYPE,
  p_txn_account     IN  oltb_account.ac_gl_no%TYPE,
  p_error_code          OUT ertbs_msgs.err_code%TYPE
  )
RETURN BOOLEAN ;


--20-SEP-2004 CBD 3T Teller related Changes Start
FUNCTION fn_class_pickup_3T
  (p_event          IN    oltbs_event.event_code%TYPE
  ,p_contract_ref_no      IN      oltbs_contract.contract_ref_no%TYPE
  ,p_event_seq_no     IN      oltbs_contract.latest_event_seq_no%TYPE
  ,p_value_dt           IN    DATE
  ,p_party        IN      lftbs_contract_commission.party%TYPE
  ,p_status       IN      lftbs_contract_interest.status%TYPE
  ,p_ccy          IN    cytms_ccy_defn.ccy_code%TYPE
  ,p_basis_amount_tag   IN    VARCHAR2
  ,p_list_of_amount   IN    VARCHAR2
  ,p_list_of_ccy      IN    VARCHAR2
  ,p_chg_pickup_branch  IN    oltms_branch.branch_code%TYPE
  --,p_chg_pickup_account IN    sttms_cust_account.cust_ac_no%TYPE
  ,p_chg_pickup_account IN    oltb_account.ac_gl_no%TYPE
  ,p_txn_branch     IN    oltms_branch.branch_code%TYPE
  --,p_txn_account      IN    sttms_cust_account.cust_ac_no%TYPE
  ,p_txn_account      IN    oltb_account.ac_gl_no%TYPE
  ,p_cstb_contract_row  IN    oltbs_contract%ROWTYPE
  ,p_error_code           OUT     ertbs_msgs.err_code%TYPE
  )
  RETURN BOOLEAN;
  --20-SEP-2004 CBD 3T Teller related Changes End
--30-JUN-2003 FCC 4.3 DEV AUG 2003 STG Changes End

  charge_assoc_plsql    lfpkss_charge.g_association_table_struct;
  charge_appln_plsql    lfpkss_charge.g_application_table_struct;

END txpks_charges;
/
CREATE or replace SYNONYM txpkss_charges FOR txpks_charges
/