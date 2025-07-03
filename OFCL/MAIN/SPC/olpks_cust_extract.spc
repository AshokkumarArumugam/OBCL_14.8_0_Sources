CREATE OR REPLACE PACKAGE olpks_cust_extract AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : Olpks_cust_extract.spc
  **
  ** Module     : Loans and Deposits
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Oracle Banking Corporate Lending  Software Product.   Copyright Â© 2018.  All rights reserved
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

  FUNCTION Fn_blockchain_extract(p_cust_no    IN VARCHAR2,
                                 p_module     IN Oltbs_Contract.Module_Code%Type,
                                 p_Branch     IN VARCHAR2,
                                 p_User_Id    IN VARCHAR2,
                                 p_Err_Code   IN OUT VARCHAR2,
                                 p_Err_Params IN OUT VARCHAR2)
    RETURN VARCHAR2;

  Function fn_corporatecustview_contract(p_contract_ref_no In Varchar2)
    Return VARCHAR2;
END olpks_cust_extract;
/
CREATE OR REPLACE SYNONYM olpkss_cust_extract FOR olpks_cust_extract
/