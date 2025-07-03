create or replace package tlpks_tldprmnt_utils is

  /*-----------------------------------------------------------------------------------------------------
     **
     ** File Name  : tlpks_tldprmnt_utils.spc
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
                   p_tldprmnt         IN tlpks_tldprmnt_main.ty_tldprmnt,
                   p_prev_tldprmnt    IN OUT tlpks_tldprmnt_main.ty_tldprmnt,
                   p_wrk_tldprmnt     IN OUT tlpks_tldprmnt_main.ty_tldprmnt,
                   p_Err_Code         IN OUT VARCHAR2,
                   p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
    FUNCTION fn_delete(p_Source           IN VARCHAR2,
                   p_Source_Operation IN VARCHAR2,
                   p_Function_Id      IN VARCHAR2,
                   p_Action_Code      IN VARCHAR2,
                   p_Child_Function   IN VARCHAR2,
                   p_tldprmnt         IN tlpks_tldprmnt_main.ty_tldprmnt,
                   p_prev_tldprmnt    IN OUT tlpks_tldprmnt_main.ty_tldprmnt,
                   p_wrk_tldprmnt     IN OUT tlpks_tldprmnt_main.ty_tldprmnt,
                   p_Err_Code         IN OUT VARCHAR2,
                   p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN; 
     FUNCTION fn_cross_validations(p_Source           IN VARCHAR2,
                                p_Source_Operation IN VARCHAR2,
                                p_Function_Id      IN VARCHAR2,
                                p_Action_Code      IN VARCHAR2,
                                p_Child_Function   IN VARCHAR2,
                                p_tldprmnt         IN tlpks_tldprmnt_main.ty_tldprmnt,
                                p_prev_tldprmnt    IN OUT tlpks_tldprmnt_main.ty_tldprmnt,
                                p_wrk_tldprmnt     IN OUT tlpks_tldprmnt_main.ty_tldprmnt,
                                p_Err_Code         IN OUT VARCHAR2,
                                p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;                            
end tlpks_tldprmnt_utils;
/