create or replace package lbpks_lbcparat_utils as
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbcparat_utils.sql
  **
  ** Module     : The ICCF
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved
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
  Changed By         : RAMYA M
  Date               : 13-JAN-2022
  Change Description : OBCL_14.5_LS_PARTICIPANT_BA_RATES_Changes
  Search String      : OBCL_14.5_LS_PARTICIPANT_BA_RATES Changes


    ** Changed By        : Anusha K
  **Date               : 19-Jun-2023
  **Change Description :  added function for comp default
  **Search String      : OBCL_14.6_rabo_#35438441 changes

  -------------------------------------------------------------------------------------------------------
  */
  FUNCTION Fn_Upload(p_Source           IN Cotms_Source.Source_Code%TYPE,
                     p_Function_Id      IN VARCHAR2,
                     p_Module           IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     p_Calling_Function IN VARCHAR2,
                     p_Fcc_Ref          IN VARCHAR2,
                     p_Event_Seq_No     IN VARCHAR2,
                     p_version_no       IN VARCHAR2,
                     p_wrk_lbcparat     IN OUT lbpks_lbcparat_main.ty_lbcparat,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Validate(p_Source           IN Cotms_Source.Source_Code%TYPE,
                       p_Function_Id      IN VARCHAR2,
                       p_Module           IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_Calling_Function IN VARCHAR2,
                       p_Fcc_Ref          IN VARCHAR2,
                       p_Event_Seq_No     IN VARCHAR2,
                       p_version_no       IN VARCHAR2,
                       p_wrk_lbcparat     IN OUT lbpks_lbcparat_main.ty_lbcparat,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
	
	g_val_dt_pram  DATE;
    g_entry_seq_no NUMBER;
    
    
    --OBCL_14.6_rabo_#35438441 changes starts
    FUNCTION FN_SSI_DEFAULT(p_Source              IN Cotms_Source.Source_Code%TYPE,
                              p_Function_Id         IN VARCHAR2,
                              p_Module              IN VARCHAR2,
                              p_Action_Code         IN VARCHAR2,
                              p_Calling_Function    IN VARCHAR2,
                              p_Fcc_Ref             IN VARCHAR2,
                              p_Event_Seq_No        IN VARCHAR2,
                              p_version_no          IN VARCHAR2,
                              p_wrk_lbcparat        IN OUT lbpks_lbcparat_main.ty_lbcparat,
                              p_Err_Code            IN OUT VARCHAR2,
                              p_Err_Params          IN OUT VARCHAR2) RETURN BOOLEAN;
     --OBCL_14.6_rabo_#35438441 changes ends                         

---OBCL_14.5_LS_PARTICIPANT_BA_RATES_Changes starts
PROCEDURE PR_GET_DISCOUNT_PRICE(p_Main_Function    IN VARCHAR2,
								p_wrk_lbcparat     IN OUT lbpks_lbcparat_main.ty_lbcparat);
                           
PROCEDURE PR_GET_BORR_AMOUNT(p_Main_Function  IN SMTB_MENU.FUNCTION_ID%TYPE,
                               p_cont_ref_no  IN lbtbs_contract_part_ba_dtls.contract_ref_no%type,
                               p_wrk_lbcparat IN  lbpks_lbcparat_main.ty_lbcparat
                            );
                         
FUNCTION FN_CHECK_BA_PART_DETAILS  (p_contract_ref_no    IN OLTBS_CONTRACt_MASTER.CONTRACT_REF_NO%TYPE)
  return varchar2 ;
---OBCL_14.5_LS_PARTICIPANT_BA_RATES_Changes ends

end lbpks_lbcparat_utils;
/