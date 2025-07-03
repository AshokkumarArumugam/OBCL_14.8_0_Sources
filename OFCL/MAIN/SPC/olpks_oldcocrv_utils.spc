create or replace package olpks_oldcocrv_utils is

  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_oldcocrv_utils.spc
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
  CREATED BY : K.PRIYADARSHINI
  Created Date : 02-AUG-2016
  CHANGE HISTORY
  
  SFR Number         :
  Changed By         :
  Change Description :
  
  -------------------------------------------------------------------------------------------------------
  */

  FUNCTION Fn_Decode_Reversal_Event(p_Source           IN VARCHAR2,
                                    p_Source_Operation IN VARCHAR2,
                                    p_Function_Id      IN VARCHAR2,
                                    p_Action_Code      IN VARCHAR2,
                                    p_Child_Function   IN VARCHAR2,
                                    p_oldcocrv         IN olpks_oldcocrv_main.ty_oldcocrv,
                                    p_wrk_oldcocrv     IN OUT olpks_oldcocrv_main.ty_oldcocrv,
                                    p_Err_Code         IN OUT VARCHAR2,
                                    p_Err_Params       IN OUT VARCHAR2)
    RETURN VARCHAR2;

  FUNCTION Fn_Populate_Event(p_Source           IN VARCHAR2,
                             p_Source_Operation IN VARCHAR2,
                             p_Function_Id      IN VARCHAR2,
                             p_Action_Code      IN VARCHAR2,
                             p_Child_Function   IN VARCHAR2,
                             p_oldcocrv         IN olpks_oldcocrv_main.ty_oldcocrv,
                             p_wrk_oldcocrv     IN OUT olpks_oldcocrv_main.ty_oldcocrv,
                             p_Err_Code         IN OUT VARCHAR2,
                             p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Populate_Fields(p_Source           IN VARCHAR2,
                              p_Source_Operation IN VARCHAR2,
                              p_Function_Id      IN VARCHAR2,
                              p_Action_Code      IN VARCHAR2,
                              p_Child_Function   IN VARCHAR2,
                              p_oldcocrv         IN olpks_oldcocrv_main.ty_oldcocrv,
                              p_wrk_oldcocrv     IN OUT olpks_oldcocrv_main.ty_oldcocrv,
                              p_Err_Code         IN OUT VARCHAR2,
                              p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Validate_Before_Save(p_Source           IN VARCHAR2,
                                   p_Source_Operation IN VARCHAR2,
                                   p_Function_Id      IN VARCHAR2,
                                   p_Action_Code      IN VARCHAR2,
                                   p_Child_Function   IN VARCHAR2,
                                   p_oldcocrv         IN olpks_oldcocrv_main.ty_oldcocrv,
                                   p_wrk_oldcocrv     IN OUT olpks_oldcocrv_main.ty_oldcocrv,
                                   p_Err_Code         IN OUT VARCHAR2,
                                   p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

end olpks_oldcocrv_utils;
/