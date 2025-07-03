CREATE OR REPLACE PACKAGE rdpks_in_format_gen IS

  FUNCTION fn_in_pkg_gen(p_gidintdf  IN rdpks_interface_utils.ty_gidintdf,
                         p_err_code  OUT VARCHAR2,
                         p_err_param OUT VARCHAR2) RETURN BOOLEAN;

END rdpks_in_format_gen;
/
CREATE OR REPLACE SYNONYM rdpkss_in_format_gen FOR rdpks_in_format_gen;
/