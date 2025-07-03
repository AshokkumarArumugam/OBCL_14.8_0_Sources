CREATE OR REPLACE PACKAGE lfpks_lfdacfin_utils_custom AS
  /*-----------------------------------------------------------------------------------------------------
    **
    ** File Name  : lfpks_lfdacfin_utils_custom.spc
    **
    ** Module     : Loans and Deposits
    **
    ** This source is part of the Oracle FLEXCUBE Software Product.
    ** Copyright (R) 2019 , Oracle and/or its affiliates.  All rights reserved
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

    **SFR Number         :
    **Changed By         :
    **Change Description :
    **Search String      :

  **Changed By         : anusha k
  **Date           : 05-DEC-2022
  **Change Description : Added hook for fn_query
  **Search String      : OBCL_14.6_SUPP#34856791 Changes

    -------------------------------------------------------------------------------------------------------
  */

  
--OBCL_14.6_SUPP#34856791 Changes starts
FUNCTION Fn_Pre_query_fee(p_Source              IN VARCHAR2,
                    p_Source_Operation    IN VARCHAR2,
                    p_Function_Id         IN VARCHAR2,
                    p_Action_Code         IN VARCHAR2,
                    p_Wrk_Lfdacfin        IN OUT Lfpks_Lfdacfin_Main.Ty_Lfdacfin,
                    p_Latest_Event_Seq_No IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                    p_Err_Code            IN OUT VARCHAR2,
                    p_Err_Params          IN OUT VARCHAR2) RETURN BOOLEAN;

FUNCTION Fn_Post_query_fee(p_Source              IN VARCHAR2,
                    p_Source_Operation    IN VARCHAR2,
                    p_Function_Id         IN VARCHAR2,
                    p_Action_Code         IN VARCHAR2,
                    p_Wrk_Lfdacfin        IN OUT Lfpks_Lfdacfin_Main.Ty_Lfdacfin,
                    p_Latest_Event_Seq_No IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                    p_Err_Code            IN OUT VARCHAR2,
                    p_Err_Params          IN OUT VARCHAR2) 
    RETURN BOOLEAN;--OBCL_14.6_SUPP#34856791 Changes ends

END lfpks_lfdacfin_utils_custom;
/
CREATE OR REPLACE Synonym lfpkss_lfdacfin_utils_custom FOR lfpks_lfdacfin_utils_custom
/