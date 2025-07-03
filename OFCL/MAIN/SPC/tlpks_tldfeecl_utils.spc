create or replace package tlpks_tldfeecl_utils is
 /*-----------------------------------------------------------------------------------------------------
     **
     ** File Name  : tlpks_tldfeecl_utils.spc
     **
     ** Module     : Secondary Loan Trading
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
     FUNCTION fn_validations(p_Source           IN VARCHAR2,
                   p_Source_Operation IN VARCHAR2,
                   p_Function_Id      IN VARCHAR2,
                   p_Action_Code      IN VARCHAR2,
                   p_Child_Function   IN VARCHAR2,
                   p_tldfeecl         IN tlpks_tldfeecl_main.ty_tldfeecl,
                   p_prev_tldfeecl    IN OUT tlpks_tldfeecl_main.ty_tldfeecl,
                   p_wrk_tldfeecl     IN OUT tlpks_tldfeecl_main.ty_tldfeecl,
                   p_Err_Code         IN OUT VARCHAR2,
                   p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
                   
    FUNCTION fn_authorise(p_Source           IN VARCHAR2,
                   p_Source_Operation IN VARCHAR2,
                   p_Function_Id      IN VARCHAR2,
                   p_Action_Code      IN VARCHAR2,
                   p_Child_Function   IN VARCHAR2,
                   p_tldfeecl         IN tlpks_tldfeecl_main.ty_tldfeecl,
                   p_prev_tldfeecl    IN OUT tlpks_tldfeecl_main.ty_tldfeecl,
                   p_wrk_tldfeecl     IN OUT tlpks_tldfeecl_main.ty_tldfeecl,
                   p_Err_Code         IN OUT VARCHAR2,
                   p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;      
                                
end tlpks_tldfeecl_utils;
/