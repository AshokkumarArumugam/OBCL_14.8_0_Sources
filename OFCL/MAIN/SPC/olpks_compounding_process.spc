CREATE OR REPLACE PACKAGE olpks_compounding_process AS
  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_compounding_process.spc
  **
  ** Module : LOANS and DEPOSITS
  **
    This source is part of the Oracle Flexcube Corporate Lending  Software Product.   
    Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
    No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
  
    Oracle Financial Services Software Limited.
    Oracle Park, Off Western Express Highway,
    Goregaon (East), 
    Mumbai - 400 063, India.
  ------------------------------------------------------------------------------------
  */

  /*----------------------------------CHANGE HISTORY----------------------------------
  
    ** Name               : Olpks_Compounding_Process
    ** Author             : Chandra Prasath.N
    ** Date               : 14-Oct-2021
    ** Description        : Created for Compounding Interest Schedule Process
    
    Changed By         : 
    Changed On         : 
    Change Description : 
    Search String      : 
  
  ------------------------------------END CHANGE HISTORY-------------------------------------
  */

  FUNCTION fn_process(pm_branch          IN oltms_branch.branch_code%TYPE,
                      pm_module          IN oltbs_contract.module_code%TYPE,
                      pm_proc_date       IN DATE,
                      pm_product         IN oltms_product_master_ld.product%TYPE,
                      pm_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
                      pm_comt_freq       IN oltbs_automatic_process_master.bod_commit_count%TYPE,
                      pm_err_code        IN OUT ertbs_msgs.err_code%TYPE,
                      pm_params          IN OUT VARCHAR2) RETURN BOOLEAN;

END olpks_compounding_process;
/
CREATE or replace SYNONYM olpkss_compounding_process FOR olpks_compounding_process
/