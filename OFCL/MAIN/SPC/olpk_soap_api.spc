CREATE OR REPLACE PACKAGE olpk_soap_api AS
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
TYPE t_request IS RECORD (
  method        VARCHAR2(256),
  namespace     VARCHAR2(256),
  body          VARCHAR2(32767),
  envelope_tag  VARCHAR2(30)
);

TYPE t_response IS RECORD
(
  doc           XMLTYPE,
  envelope_tag  VARCHAR2(30)
);

PROCEDURE pr_set_proxy_authentication(p_username  IN  VARCHAR2,
                                   p_password  IN  VARCHAR2);

FUNCTION fn_new_request(p_method        IN  VARCHAR2,
                        p_namespace     IN  VARCHAR2,
                        p_envelope_tag  IN  VARCHAR2 DEFAULT 'SOAP-ENV')
RETURN t_request;


PROCEDURE pr_add_parameter(p_request  IN OUT NOCOPY  t_request,
                           p_name     IN             VARCHAR2,
                           p_type     IN             VARCHAR2,
                           p_value    IN             VARCHAR2);

FUNCTION fn_invoke(p_request  IN OUT NOCOPY  t_request,
                   p_url      IN             VARCHAR2,
                   p_action   IN             VARCHAR2,
                   p_err      IN OUT         VARCHAR2)
RETURN t_response;

FUNCTION fn_get_return_value(p_response   IN OUT NOCOPY  t_response,
                             p_name       IN             VARCHAR2,
                             p_namespace  IN             VARCHAR2)
RETURN VARCHAR2;

END olpk_soap_api;
/