CREATE OR REPLACE PACKAGE lbpks_lbdmkliq_utils AS
  /*-----------------------------------------------------------------------------------------------------
    **
    ** File Name  : lbpks_lbdmkliq_utils.spc
    **
    ** Module     : The Tax
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
  Function validate_unauth_loans(p_Source           IN VARCHAR2,
                                 p_Source_Operation IN VARCHAR2,
                                 p_Function_Id      IN VARCHAR2,
                                 p_Action_Code      IN VARCHAR2,
                                 p_lbdmkliq         IN lbpks_lbdmkliq_main.ty_lbdmkliq,
                                 p_wrk_lbdmkliq     IN OUT lbpks_lbdmkliq_main.ty_lbdmkliq,
                                 p_Err_Code         IN OUT VARCHAR2,
                                 p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  Function fn_update_tables(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            
                            p_lbdmkliq     IN lbpks_lbdmkliq_main.ty_lbdmkliq,
                            p_wrk_lbdmkliq IN OUT lbpks_lbdmkliq_main.ty_lbdmkliq,
                            p_Err_Code     IN OUT VARCHAR2,
                            p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;
  Function fn_delete(p_Source           IN VARCHAR2,
                     p_Source_Operation IN VARCHAR2,
                     p_Function_Id      IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     
                     p_lbdmkliq     IN lbpks_lbdmkliq_main.ty_lbdmkliq,
                     p_wrk_lbdmkliq IN OUT lbpks_lbdmkliq_main.ty_lbdmkliq,
                     p_Err_Code     IN OUT VARCHAR2,
                     p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;

end lbpks_lbdmkliq_utils;

/