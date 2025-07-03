CREATE OR REPLACE PACKAGE olpks_oldintlm_utils IS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_oldintlm_utils.spc
  **
  ** Module     : Syndication Loans and Commitments
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
  
  SFR Number         : 25089297
  Changed By         : Amulya R
  Change Description : New procedure pr_insert_for_neg_comp added
  Search String      : OFCL_Corporate_Lending_12_3_25089297  
  
  SFR Number         : 27321210
  Changed By         : Priyadarshini K
  Change Description : Added Currency and tenor as input arguments as these are PK cols in LFTMS_PRODUCT_CURRENCY_LIMITS and needed for updation for neg int component.
  Search String      : OBCL_27321210
  -------------------------------------------------------------------------------------------------------
  */

  FUNCTION Fn_Validate_Items(p_Source           IN VARCHAR2,
                             p_Source_Operation IN VARCHAR2,
                             p_Function_Id      IN VARCHAR2,
                             p_Action_Code      IN VARCHAR2,
                             p_Child_Function   IN VARCHAR2,
                             p_oldintlm         IN olpks_oldintlm_main.ty_oldintlm,
                             p_prev_oldintlm    IN OUT olpks_oldintlm_main.ty_oldintlm,
                             p_wrk_oldintlm     IN OUT olpks_oldintlm_main.ty_oldintlm,
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
                       p_oldintlm         IN olpks_oldintlm_main.ty_oldintlm,
                       p_wrk_oldintlm     IN OUT olpks_oldintlm_main.ty_oldintlm,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_err_params       IN OUT VARCHAR2) RETURN BOOLEAN;
--OFCL_Corporate_Lending_12_3_25089297 start
Procedure pr_insert_for_neg_comp
(
p_product_code                  IN VARCHAR2,
P_branch_code                   IN VARCHAR2,
p_Action_Code			IN VARCHAR2,
p_ccy             IN VARCHAR2, -- OBCL_27321210
p_tenor           IN NUMBER -- OBCL_27321210
);
--OFCL_Corporate_Lending_12_3_25089297  end

END olpks_oldintlm_utils;
/
CREATE OR REPLACE SYNONYM olpkss_oldintlm_utils FOR olpks_oldintlm_utils
/