CREATE OR REPLACE PACKAGE rdpks_gi_parser AS
  FUNCTION fn_get_param(p_text_clob IN CLOB,
                        p_pos       IN NUMBER,
                        p_sep       IN VARCHAR2 DEFAULT '~')
  
   RETURN CLOB;
  FUNCTION fn_parse RETURN BOOLEAN;

  PROCEDURE pr_get_gidintdf(p_gidintdf OUT rdpks_interface_utils.ty_gidintdf);

END rdpks_gi_parser;
/
CREATE OR REPLACE SYNONYM rdpkss_gi_parser FOR rdpks_gi_parser;
/