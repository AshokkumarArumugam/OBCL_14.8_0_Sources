create or replace package lbpks_lbcintrs_utils is
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbcintrs_utils.spc
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
  
  Created By         : Avinav Seal
  Created On         : 19-05-2016
  Created Reason     : ofcl_12.1.0.0.0_conversion
  
   SFR Number         : 26924338 
  Changed By         : Priyadarshini K
  Change Description : Retro ICCF changes similar to LFCINTCH and rate fixing for LS
  Search String       : OBCL_26924338
  
    Changed By         : Mohan Pal
    Changed On         : 04-Sep-2023
    Change Description : Float rate Rate-Repickup before save
    Search String      : Bug#35592744 CHANGES
  -------------------------------------------------------------------------------------------------------
  p_wrk_lbcintrs.v_oltbs_contract_master.CONTRACT_REF_NO
  */
  l_int_change varchar2(1):= 'N'; --ankk 
    L_default_Action    varchar2(1):= 'N'; --ANKK
  FUNCTION Fn_Upload(p_Source           IN Cotms_Source.Source_Code%TYPE,
                     p_Function_Id      IN VARCHAR2,
                     p_Module           IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     p_Calling_Function IN VARCHAR2,
                     p_Product_Code     IN VARCHAR2,
                     p_Fcc_Ref          IN VARCHAR2,
                     p_Event_Seq_No     IN VARCHAR2,
                     p_wrk_lbcintrs     IN OUT lbpks_lbcintrs_main.ty_lbcintrs,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Validate(p_Source           IN Cotms_Source.Source_Code%TYPE,
                       p_Function_Id      IN VARCHAR2,
                       p_Module           IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_Calling_Function IN VARCHAR2,
                       p_Fcc_Ref          IN VARCHAR2,
                       p_Event_Seq_No     IN VARCHAR2,
                       p_ver_no           IN VARCHAR2,
                       p_wrk_lbcintrs     IN OUT lbpks_lbcintrs_main.ty_lbcintrs,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
/*SFR_26165805 changes starts*/
  FUNCTION FN_PICKUP_RATES(p_fccref IN oltbs_contract.CONTRACT_REF_NO%TYPE,
                           p_esn    IN oltbs_contract.LATEST_EVENT_SEQ_NO%TYPE)
    RETURN BOOLEAN;
  /*SFR_26165805 changes ends*/ 					   
  
  
  ---Bug#35592744 STARTS 
   FUNCTION Fn_re_Pickup_Rates(p_Source           IN VARCHAR2,
                   p_Source_Operation IN VARCHAR2,
                   p_Function_Id      IN VARCHAR2,
                   p_Action_Code      IN VARCHAR2,
                   p_Child_Function   IN VARCHAR2,
                   p_Multi_Trip_Id    IN VARCHAR2,
                   p_Request_No       IN VARCHAR2,
                   p_lbcintrs         IN OUT lbpks_lbcintrs_main.ty_lbcintrs,
                   p_Status           IN OUT VARCHAR2,
                   p_Err_Code         IN OUT VARCHAR2,
                   p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN; --commented by Arun as invalid
  ---Bug#35592744 ENDS 
  
  
end lbpks_lbcintrs_utils;
/