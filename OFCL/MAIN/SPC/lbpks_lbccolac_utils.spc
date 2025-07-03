CREATE OR REPLACE PACKAGE lbpks_lbccolac_utils AS

  FUNCTION Fn_Validate(p_Source           IN VARCHAR2,
                       p_Source_Operation IN VARCHAR2,
                       p_Function_Id      IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_Main_Function    IN VARCHAR2,
                       p_Child_Function   IN VARCHAR2,
                       p_Check_Amendables IN VARCHAR2,
                       p_lbccolac         IN lbpks_lbccolac_Main.Ty_lbccolac,
                       p_Prev_lbccolac    IN OUT lbpks_lbccolac_Main.Ty_lbccolac,
                       p_Wrk_lbccolac     IN OUT lbpks_lbccolac_Main.Ty_lbccolac,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Upload_Db(p_Source       IN VARCHAR2,
                        p_Action_Code  IN VARCHAR2,
                        p_Wrk_lbccolac IN OUT lbpks_lbccolac_Main.Ty_lbccolac,
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
                     p_lbccolac         IN lbpks_lbccolac_Main.ty_lbccolac,
                     p_wrk_lbccolac     IN OUT lbpks_lbccolac_Main.ty_lbccolac,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_err_params       IN OUT VARCHAR2) RETURN BOOLEAN;

END lbpks_lbccolac_utils;
/
CREATE OR REPLACE SYNONYM lbpkss_lbccolac_utils FOR lbpks_lbccolac_utils
/