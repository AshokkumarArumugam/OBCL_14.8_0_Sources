CREATE OR REPLACE PACKAGE olpks_oldtronl_subsystem AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_oldtronl_subsystem.spc
  **
  ** Module     : Loans and Deposits
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Oracle Banking Corporate Lending  Software Product.   Copyright © 2018.  All rights reserved
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
  
  **SFR Number         : 26165752
  **Changed By         : Kirandeep Kaur
  **Change Description : Contract input through gateway
  **Search String      : OFCL_12.4.0.0.7_26165752
  
    **Changed By         : Chandra Achuta
    **Date               : 10-JUL-2019
    **Change Description : In CAMD, changing settlement branch and account in settlement details.
    **Search String      : Bug#30003485

  **Changed By         : Chandra Achuta
  **Date               : 20-Aug-2021
  **Change Description : Code Change for supporting manual disbursement screen, tax on charge component for DSBR event
  **Search String      : Bug#33135228	
  
    **Changed By       : Kavitha Asokan
  **Date               : 06-Dec-2022
  **Change Description : During rollover populating the borrower entity details for the child contract to generate the advices.
  **Search String      : Bug#34835805
  
  **Changed By         : Sowmya Bitra
  **Date               : 22-August-2023
  **Change Description : Fix for the issue settlement details sent thorugh gateway being overwritten with ssi maintenance values
  **Search String      : Bug#35676228
  -------------------------------------------------------------------------------------------------------
  */
  g_amend_loan  BOOLEAN := FALSE;   --Bug#30003485  code added
  g_action_code VARCHAR2(32676);    --Bug#33135228  code added  
  g_p_olcondet  Olpks_Olcondet_Main.Ty_Olcondet; --Bug#35676228 Changes
  FUNCTION fn_get_subsys_stat(p_subsystem  IN VARCHAR2,
                              p_subsysstat IN VARCHAR2) RETURN VARCHAR2;
  FUNCTION fn_upd_subsys_stat(p_subsystem  IN VARCHAR2,
                              p_stat       IN VARCHAR2,
                              p_subsysstat IN VARCHAR2) RETURN VARCHAR2;
  FUNCTION fn_subsys_pickup(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_oldtronl         IN olpks_oldtronl_main.ty_oldtronl,
                            p_prev_oldtronl    IN olpks_oldtronl_main.ty_oldtronl,
                            p_wrk_oldtronl     IN OUT olpks_oldtronl_main.ty_oldtronl,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION fn_explode_schedules(p_Source           IN VARCHAR2,
                                p_Source_Operation IN VARCHAR2,
                                p_Function_Id      IN VARCHAR2,
                                p_Action_Code      IN VARCHAR2,
                                p_oldtronl         IN olpks_oldtronl_main.ty_oldtronl,
                                p_prev_oldtronl    IN olpks_oldtronl_main.ty_oldtronl,
                                p_wrk_oldtronl     IN OUT olpks_oldtronl_main.ty_oldtronl,
                                P_product_master   IN oltms_product_master_ld%ROWTYPE,
                                p_Err_Code         IN OUT VARCHAR2,
                                p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION fn_subsys_upload(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_oldtronl         IN olpks_oldtronl_main.ty_oldtronl,
                            p_prev_oldtronl    IN olpks_oldtronl_main.ty_oldtronl,
                            p_wrk_oldtronl     IN OUT olpks_oldtronl_main.ty_oldtronl,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
	--OFCL_12.4.0.0.7_26165752 starts
	FUNCTION fn_gw_subsys_upload(p_Source           IN VARCHAR2,
                               p_Source_Operation IN VARCHAR2,
                               p_Function_Id      IN VARCHAR2,
                               p_Action_Code      IN VARCHAR2,
                               p_oldtronl         IN olpks_oldtronl_main.ty_oldtronl,
                               p_prev_oldtronl    IN olpks_oldtronl_main.ty_oldtronl,
                               p_wrk_oldtronl     IN OUT olpks_oldtronl_main.ty_oldtronl,
                               p_Err_Code         IN OUT VARCHAR2,
                               p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
    FUNCTION fn_gw_subsys_pickup(p_Source           IN VARCHAR2,
                               p_Source_Operation IN VARCHAR2,
                               p_Function_Id      IN VARCHAR2,
                               p_Action_Code      IN VARCHAR2,
                               p_oldtronl         IN olpks_oldtronl_main.ty_oldtronl,
                               p_prev_oldtronl    IN olpks_oldtronl_main.ty_oldtronl,
                               p_wrk_oldtronl     IN OUT olpks_oldtronl_main.ty_oldtronl,
                               p_Err_Code         IN OUT VARCHAR2,
                               p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
 --OFCL_12.4.0.0.7_26165752 ends
 
 --Bug#34835805 changes starts
    FUNCTION fn_insert_entities(p_contract_ref_no IN VARCHAR2,
                              p_version_no      IN VARCHAR2,
                              p_counterparty    IN VARCHAR2,
                              p_errcode         IN OUT VARCHAR2,
                              p_errparam        IN OUT VARCHAR2)
    RETURN BOOLEAN;
 --Bug#34835805 changes ends
END olpks_oldtronl_subsystem;
/
-- --Bug#34835805 changes starts
CREATE OR REPLACE Synonym olpkss_oldtronl_subsystem FOR olpks_oldtronl_subsystem
/
 --Bug#34835805 changes ends