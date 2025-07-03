CREATE OR REPLACE PACKAGE LBPKS_COMPOUNDING_PROCESS AS
  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name  : Lbpks_Compounding_Process.spc
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

    ** Name               : Lbpks_Compounding_Process
    ** Author             : Jayaram N
    ** Date               : 29-Jul-2024
    ** Description        : COMPOUNDING FREQUENCY NEEDED AT DD SCHEDULE LEVEL 

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
					  
   FUNCTION Fn_Pop_compound_Sch( p_loan_contract IN oltbs_upload_master.ext_contract_ref_no%TYPE,
                                p_borrower_contract IN oltbs_upload_master.ext_contract_ref_no%TYPE,
                                p_participant_contract IN oltbs_upload_master.ext_contract_ref_no%TYPE,
                                p_err_code        IN OUT ertbs_msgs.err_code%TYPE,
                                p_params          IN OUT VARCHAR2 )  RETURN BOOLEAN;                   


END LBPKS_COMPOUNDING_PROCESS;
/
create or replace synonym LBPKSS_COMPOUNDING_PROCESS for LBPKS_COMPOUNDING_PROCESS
/