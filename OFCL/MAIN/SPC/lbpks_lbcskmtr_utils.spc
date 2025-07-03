CREATE OR REPLACE PACKAGE lbpks_lbcskmtr_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbcskmtr_utils.spc
  **
  ** Module     : Syndication Loans and Commitments
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
  
  SFR Number         :
  Changed By         :
  Change Description :
  
  -------------------------------------------------------------------------------------------------------
  */

  FUNCTION fn_validate(p_Source       IN Cotms_Source.Source_Code%TYPE,
                       p_Action_Code  IN VARCHAR2,                      
                       p_Function_Id  IN VARCHAR2,                       
                       p_wrk_lbcskmtr IN OUT lbpks_lbcskmtr_main.ty_lbcskmtr,
                       p_Err_Code     IN OUT VARCHAR2,
                       p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;

 

  FUNCTION fn_upload  (p_Source       IN Cotms_Source.Source_Code%TYPE,
                       p_Action_Code  IN VARCHAR2,                      
                       p_Function_Id  IN VARCHAR2,                      
                       p_wrk_lbcskmtr IN OUT lbpks_lbcskmtr_main.ty_lbcskmtr,
                       p_Err_Code     IN OUT VARCHAR2,
                       p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;
					   
					   
--ankk starts

                     
    FUNCTION fn_pop_components(p_wrk_lbcskmtr    IN OUT lbpks_lbcskmtr_main.ty_lbcskmtr,
                             p_contract_ref_no in varchar2,
                             p_Err_Code        IN OUT VARCHAR2,
                             p_Err_Params      IN OUT VARCHAR2)
    RETURN BOOLEAN ;

--ankk ends					   
					   
					   
											 

end lbpks_lbcskmtr_utils;
/
create or replace synonym lbpkss_lbcskmtr_utils for lbpks_lbcskmtr_utils
/