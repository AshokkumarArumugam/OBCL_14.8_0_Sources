CREATE OR REPLACE PACKAGE olpks_oldreprs_utils IS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_oldreprs_utils.spc
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
  
  -------------------------------------------------------------------------------------------------------
  */

  /*FUNCTION  Fn_Instalment_Validation(p_Source IN VARCHAR2,
                                   p_Function_Id IN VARCHAR2,
                                   p_wrk_oldreprs IN VARCHAR2,
                                   p_Err_Code IN OUT VARCHAR2,
                                   p_Err_Params IN OUT VARCHAR2)
  RETURN BOOLEAN ;*/

  FUNCTION Fn_Upload_Change_Log(p_Source           IN VARCHAR2,
                                p_Source_Operation IN VARCHAR2,
                                p_Function_Id      IN VARCHAR2,
                                p_Action_Code      IN VARCHAR2,
                                p_oldreprs         IN olpks_oldreprs_main.ty_oldreprs,
                                p_prev_oldreprs    IN olpks_oldreprs_main.ty_oldreprs,
                                p_wrk_oldreprs     IN OUT olpks_oldreprs_main.ty_oldreprs,
                                p_Err_Code         IN OUT VARCHAR2,
                                p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Populate_Fields(p_Source           IN VARCHAR2,
                              p_Source_Operation IN VARCHAR2,
                              p_Function_id      IN VARCHAR2,
                              p_Action_Code      IN VARCHAR2,
                              p_Child_Function   IN VARCHAR2,
                              p_oldreprs         IN OUT olpks_oldreprs_main.ty_oldreprs,
                              p_Err_Code         IN OUT VARCHAR2,
                              p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_On_Modify(p_Source           IN VARCHAR2,
                        p_Source_Operation IN VARCHAR2,
                        p_Function_Id      IN VARCHAR2,
                        p_Action_Code      IN VARCHAR2,
                        p_Child_Function   IN VARCHAR2,
                        p_Multi_Trip_Id    IN VARCHAR2,
                        p_oldreprs         IN olpks_oldreprs_main.ty_oldreprs,
                        p_prev_oldreprs    IN olpks_oldreprs_main.ty_oldreprs,
                        p_wrk_oldreprs     IN OUT olpks_oldreprs_main.ty_oldreprs,
                        p_Err_Code         IN OUT VARCHAR2,
                        p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Validate_Items(p_Source           IN VARCHAR2,
                             p_Source_Operation IN VARCHAR2,
                             p_Function_Id      IN VARCHAR2,
                             p_Action_Code      IN VARCHAR2,
                             p_Child_Function   IN VARCHAR2,
                             p_oldreprs         IN olpks_oldreprs_main.ty_oldreprs,
                             p_prev_oldreprs    IN OUT olpks_oldreprs_main.ty_oldreprs,
                             p_wrk_oldreprs     IN OUT olpks_oldreprs_main.ty_oldreprs,
                             p_Err_Code         IN OUT VARCHAR2,
                             p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_On_Query(p_Source           IN VARCHAR2,
                       p_Source_Operation IN VARCHAR2,
                       p_Function_Id      IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_Child_Function   IN VARCHAR2,
                       p_Full_Data        IN VARCHAR2 DEFAULT 'Y',
                       p_With_Lock        IN VARCHAR2 DEFAULT 'N',
                       p_QryData_Reqd     IN VARCHAR2,
                       p_oldreprs         IN olpks_oldreprs_main.ty_oldreprs,
                       p_wrk_oldreprs     IN OUT olpks_oldreprs_main.ty_oldreprs,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_err_params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Check_Fields(p_Source           IN VARCHAR2,
                           p_Source_Operation IN VARCHAR2,
                           p_Function_Id      IN VARCHAR2,
                           p_Action_Code      IN VARCHAR2,
                           p_Child_Function   IN VARCHAR2,
                           p_Post_Upl_Stat    IN VARCHAR2,
                           p_Multi_Trip_Id    IN VARCHAR2,
                           p_oldreprs         IN olpks_oldreprs_main.ty_oldreprs,
                           p_prev_oldreprs    IN olpks_oldreprs_main.ty_oldreprs,
                           p_wrk_oldreprs     IN OUT olpks_oldreprs_main.ty_oldreprs,
                           p_Err_Code         IN OUT VARCHAR2,
                           p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Delete_Items(p_Source           IN VARCHAR2,
                           p_Source_Operation IN VARCHAR2,
                           p_Function_Id      IN VARCHAR2,
                           p_Action_Code      IN VARCHAR2,
                           p_Child_Function   IN VARCHAR2,
                           p_Multi_Trip_Id    IN VARCHAR2,
                           p_oldreprs         IN olpks_oldreprs_main.ty_oldreprs,
                           p_prev_oldreprs    IN olpks_oldreprs_main.ty_oldreprs,
                           p_wrk_oldreprs     IN OUT olpks_oldreprs_main.ty_oldreprs,
                           p_Err_Code         IN OUT VARCHAR2,
                           p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Insert_Items(p_Source           IN VARCHAR2,
                           p_Source_Operation IN VARCHAR2,
                           p_Function_Id      IN VARCHAR2,
                           p_Action_Code      IN VARCHAR2,
                           p_Child_Function   IN VARCHAR2,
                           p_Multi_Trip_Id    IN VARCHAR2,
                           p_oldreprs         IN olpks_oldreprs_main.ty_oldreprs,
                           p_prev_oldreprs    IN olpks_oldreprs_main.ty_oldreprs,
                           p_wrk_oldreprs     IN OUT olpks_oldreprs_main.ty_oldreprs,
                           p_Err_Code         IN OUT VARCHAR2,
                           p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Def_Rates_Pickup(Pcontract         IN oltbs_contract.Contract_Ref_No%TYPE,
                               Pccy              IN oltbs_contract.Contract_Ccy%TYPE,
                               Pbranch           IN oltbs_contract.Branch%TYPE,
                               Psplit_Serialno   IN oltbs_contract_split_master.Split_Serial_No%TYPE,
                               Pproduct          IN oltbs_contract.Product_Code%TYPE,
                               p_Serial_No       IN oltbs_contract_split_detail.Serial_No%TYPE,
                               Pamount           IN oltbs_contract_split_detail.Amount%TYPE,
                               Pcont_Tenor       IN oltbs_split_product_intcomps.Reset_Tenor%TYPE,
                               Pvalue_Date       IN DATE,
                               p_oldreprs        IN OUT olpks_oldreprs_main.ty_oldreprs,
                               p_Borrow_Lend_Ind IN VARCHAR2,
                               p_Rate_Calc_Type  IN VARCHAR2,
                               p_Err_Code        IN OUT VARCHAR2,
                               p_Err_Params      IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Subsystem_Pickup(p_Source           IN VARCHAR2,
                               p_Source_Operation IN VARCHAR2,
                               p_Function_Id      IN VARCHAR2,
                               p_Action_code      IN VARCHAR2,
                               p_oldreprs         IN olpks_oldreprs_main.ty_oldreprs,
                               p_prev_oldreprs    IN olpks_oldreprs_main.ty_oldreprs,
                               p_wrk_oldreprs     IN OUT olpks_oldreprs_main.ty_oldreprs,
                               p_Err_Code         IN OUT VARCHAR2,
                               p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

END olpks_oldreprs_utils;
/
CREATE OR REPLACE SYNONYM olpkss_oldreprs_utils FOR olpks_oldreprs_utils
/