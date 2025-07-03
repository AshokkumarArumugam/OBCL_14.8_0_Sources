create or replace package olpk_xml_util as
/*----------------------------------------------------------------------------------------------------

This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
FUNCTION fn_query_data(p_query_id VARCHAR2,
                       p_query_values VARCHAR2,
                       p_flag IN OUT NUMBER,
                       p_error_code IN OUT VARCHAR2,
                       p_error_parameter IN OUT VARCHAR2)
  RETURN VARCHAR2;

FUNCTION fn_webservice_caller(p_query_id VARCHAR2,p_requestxml VARCHAR2,
                              p_flag IN OUT NUMBER,
                              p_error_code IN OUT VARCHAR2,
                              p_error_parameter IN OUT VARCHAR2)
  RETURN VARCHAR2;

FUNCTION fn_get_tagvalue(p_xmlstr VARCHAR2, p_tagname VARCHAR2)
  RETURN VARCHAR2;

FUNCTION fn_xml_builder(p_root_tag VARCHAR2, p_tag_values VARCHAR2,
                        p_flag IN OUT NUMBER,
                        p_error_code IN OUT VARCHAR2,
                        p_error_parameter IN OUT VARCHAR2)
  RETURN VARCHAR2;

FUNCTION fn_str_search(p_tagstr VARCHAR2, p_strpos NUMBER)
  RETURN VARCHAR2;

FUNCTION fn_reqxml_trimmer(p_xml_str IN varchar2)
  RETURN VARCHAR2;

FUNCTION fn_resxml_trimmer(p_xml_str IN varchar2)
  RETURN VARCHAR2;
end olpk_xml_util;
/