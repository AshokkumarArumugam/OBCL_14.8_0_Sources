CREATE OR REPLACE PACKAGE olpks_wrp_Batch AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_wrp_Batch.spc
  **
  ** Module     : OL
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
  
    **  Modified By         : Pallavi R
    **  Modified On         : 18-Apr-2017
    **  Change Description  : code changes for TLAUTDLY
    **  Search Tag          : FCUBS_12.4_OFCL_#25893973 Changes  
	
  **Changed By         : Revathi D
  **Date               : 24-Dec-2020
  **Change Description : Added the New job as OLSSGEN for future dated payment messages based on amount due table.                                     
  **Search String      : OBCL_14.4_SGEN_PAYMENT_ACC_ENTRY_CHANGES 
  
**  Changed By         : Revathi D
**  Date               : 04-Mar-2021
**  Change Description : Added the New job as LBSSGEN for future dated payment messages based on amount due table.                                     
**  Search String      : OBCL_14.4_LB_SGEN_PAYMENT_ACC_ENTRY_CHANGES 

	**  Changed By         : Chandra Prasath N
	**  Date               : 12-May-2021
	**  Change Description : Added the New job as OL247DLY for 24/7 batch operation.                                                                   
	**  Search String      : OBCL_14.5_24_7 Changes
  -------------------------------------------------------------------------------------------------------
  */

  PROCEDURE pr_olaudly(p_module_code IN VARCHAR2,
                       p_batch       IN VARCHAR2,
                       
                       p_result          IN OUT VARCHAR2,
                       p_branch          IN VARCHAR2,
                       p_error_code      IN OUT VARCHAR2,
                       p_error_parameter IN OUT VARCHAR2);
--FCUBS_12.4_OFCL_#25893973 Changes Starts					   
  PROCEDURE Pr_Tlautdly(p_Module_Code     IN VARCHAR2,
                        p_Branch_Code     IN VARCHAR2,
                        p_User_Id         IN VARCHAR2,
                        p_Eoc_Group       IN VARCHAR2,
                        p_Result          IN OUT VARCHAR2,
                        p_Error_Code      IN OUT VARCHAR2,
                        p_Error_Parameter IN OUT VARCHAR2);	
--FCUBS_12.4_OFCL_#25893973 Changes Ends		
-- balli EOD Accounting check changes starts                     
  PROCEDURE pr_olahochk(p_module_code IN VARCHAR2,
                       p_batch       IN VARCHAR2,
                       p_result          IN OUT VARCHAR2,
                       p_branch          IN VARCHAR2,
                       p_error_code      IN OUT VARCHAR2,
                       p_error_parameter IN OUT VARCHAR2);                     
  -- balli EOD Accounting check changes ends 				
  PROCEDURE pr_lbautdly(p_branch_code     IN VARCHAR2,
                        p_user_id         IN VARCHAR2,
                        p_eoc_group       IN VARCHAR2,
                        p_result          IN OUT VARCHAR2,
                        p_error_code      IN OUT VARCHAR2,
                        p_error_parameter IN OUT VARCHAR2);
  PROCEDURE pr_fcautdly(
                        
                        p_branch_code IN VARCHAR2,
                        
                        p_user_id IN VARCHAR2,
                        
                        p_eoc_group IN VARCHAR2,
                        
                        p_result IN OUT VARCHAR2,
                        
                        p_error_code IN OUT VARCHAR2,
                        
                        p_error_parameter IN OUT VARCHAR2
                        
                        );
  PROCEDURE pr_lbfwddly(p_branch_code     IN VARCHAR2,
                        p_user_id         IN VARCHAR2,
                        p_eoc_group       IN VARCHAR2,
                        p_result          IN OUT VARCHAR2,
                        p_error_code      IN OUT VARCHAR2,
                        p_error_parameter IN OUT VARCHAR2);

  PROCEDURE pr_popmisrevl(p_branch_code     IN VARCHAR2,
                          p_user_id         IN VARCHAR2,
                          p_eoc_group       IN VARCHAR2,
                          p_result          IN OUT VARCHAR2,
                          p_error_code      IN OUT VARCHAR2,
                          p_error_parameter IN OUT VARCHAR2);
  PROCEDURE pr_ol_mis_data_collection(p_result          IN OUT VARCHAR2,
                                      p_branch          IN VARCHAR2,
                                      p_error_code      IN OUT VARCHAR2,
                                      p_error_parameter IN OUT VARCHAR2);

 /* OBCL-OFSAA Changes :: Starts */                          
  PROCEDURE Pr_OBCL_OFSAA_Extract(p_error_code IN OUT VARCHAR2,
                                  p_branch  IN VARCHAR2,
                                  p_user    IN VARCHAR2,
                                  p_function_id  IN VARCHAR2);
  /* OBCL-OFSAA Changes :: Ends */	
--OBCL_14.4_SGEN_PAYMENT_ACC_ENTRY_CHANGES Starts
 PROCEDURE pr_Olssgen (p_module_code     IN VARCHAR2,
                       p_batch           IN VARCHAR2,
                       p_result          IN OUT VARCHAR2,
                       p_branch          IN VARCHAR2,
                       p_error_code      IN OUT VARCHAR2,
                       p_error_parameter IN OUT VARCHAR2);  
--OBCL_14.4_SGEN_PAYMENT_ACC_ENTRY_CHANGES Ends
--OBCL_14.4_LB_SGEN_PAYMENT_ACC_ENTRY_CHANGES  Starts
PROCEDURE pr_Lbssgen (p_module_code     IN VARCHAR2,
                       p_batch           IN VARCHAR2,
                       p_result          IN OUT VARCHAR2,
                       p_branch          IN VARCHAR2,
                       p_error_code      IN OUT VARCHAR2,
                       p_error_parameter IN OUT VARCHAR2);  
--OBCL_14.4_LB_SGEN_PAYMENT_ACC_ENTRY_CHANGES Ends
 --OBCL_14.5_24_7 Changes starts
 PROCEDURE pr_Ol247dly (p_module_code     IN VARCHAR2,
                       p_batch           IN VARCHAR2,
                       p_result          IN OUT VARCHAR2,
                       p_branch          IN VARCHAR2,
                       p_error_code      IN OUT VARCHAR2,
                       p_error_parameter IN OUT VARCHAR2); 
 --OBCL_14.5_24_7 Changes ends
END olpks_wrp_Batch;
/