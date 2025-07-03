CREATE OR REPLACE PACKAGE lbpks_lbdmkatv_utils AS
  /*-----------------------------------------------------------------------------------------------------
    **
    ** File Name  : lbpks_lbdmkatv_utils.spc
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
  Function fn_validation(p_Source           IN VARCHAR2,
                         p_Source_Operation IN VARCHAR2,
                         p_Function_Id      IN VARCHAR2,
                         p_Action_Code      IN VARCHAR2,
                         p_lbdmkatv         IN lbpks_lbdmkatv_main.ty_lbdmkatv,
                         p_wrk_lbdmkatv     IN OUT lbpks_lbdmkatv_main.ty_lbdmkatv,
                         p_Err_Code         IN OUT VARCHAR2,
                         p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  Function fn_update_tables(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            
                            p_lbdmkatv     IN lbpks_lbdmkatv_main.ty_lbdmkatv,
                            p_wrk_lbdmkatv IN OUT lbpks_lbdmkatv_main.ty_lbdmkatv,
                            p_Err_Code     IN OUT VARCHAR2,
                            p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;
  Function fn_delete(p_Source           IN VARCHAR2,
                     p_Source_Operation IN VARCHAR2,
                     p_Function_Id      IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     
                     p_lbdmkatv     IN lbpks_lbdmkatv_main.ty_lbdmkatv,
                     p_wrk_lbdmkatv IN OUT lbpks_lbdmkatv_main.ty_lbdmkatv,
                     p_Err_Code     IN OUT VARCHAR2,
                     p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;

end lbpks_lbdmkatv_utils;
/