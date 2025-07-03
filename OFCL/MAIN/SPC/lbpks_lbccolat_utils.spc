CREATE OR REPLACE PACKAGE lbpks_lbccolat_utils AS

  FUNCTION Fn_Validate(p_Source           IN VARCHAR2,
                       p_Source_Operation IN VARCHAR2,
                       p_Function_Id      IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_Main_Function    IN VARCHAR2,
                       p_Child_Function   IN VARCHAR2,
                       p_Check_Amendables IN VARCHAR2,
                       p_lbccolat         IN lbpks_lbccolat_Main.Ty_lbccolat,
                       p_Prev_lbccolat    IN OUT lbpks_lbccolat_Main.Ty_lbccolat,
                       p_Wrk_lbccolat     IN OUT lbpks_lbccolat_Main.Ty_lbccolat,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Upload_Db(p_Source       IN VARCHAR2,
                        p_Action_Code  IN VARCHAR2,
                        p_Wrk_lbccolat IN OUT lbpks_lbccolat_main.Ty_lbccolat,
                        p_Err_Code     IN OUT VARCHAR2,
                        p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Pickup(p_Source           IN VARCHAR2,
                     p_Source_Operation IN VARCHAR2,
                     p_Function_Id      IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     p_Main_Function    IN VARCHAR2,
                     p_Child_Function   IN VARCHAR2,
                     p_Key_Tags_Vals    IN OUT VARCHAR2,
                     p_QryData_Reqd     IN VARCHAR2,
                     p_lbccolat         IN lbpks_lbccolat_Main.ty_lbccolat,
                     p_wrk_lbccolat     IN OUT lbpks_lbccolat_Main.ty_lbccolat,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_err_params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_calc_net_avail(p_Source           IN VARCHAR2,
                             p_Source_Operation IN VARCHAR2,
                             p_Function_Id      IN VARCHAR2,
                             p_Action_Code      IN VARCHAR2,
                             p_Main_Function    IN VARCHAR2,
                             p_Child_Function   IN VARCHAR2,
                             p_Check_Amendables IN VARCHAR2,
                             p_lbccolat         IN lbpks_lbccolat_Main.Ty_lbccolat,
                             p_Prev_lbccolat    IN OUT lbpks_lbccolat_Main.Ty_lbccolat,
                             p_Wrk_lbccolat     IN OUT lbpks_lbccolat_Main.Ty_lbccolat,
                             p_Err_Code         IN OUT VARCHAR2,
                             p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

END lbpks_lbccolat_utils;
/
CREATE OR REPLACE SYNONYM lbpkss_lbccolat_utils FOR lbpks_lbccolat_utils
/