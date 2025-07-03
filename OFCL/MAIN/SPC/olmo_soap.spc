CREATE OR REPLACE PACKAGE olmo_soap AS
/*----------------------------------------------------------------------------------------------------
** File Name	: olmo_soap.SPC
**
** Module		: LOANS AND AGENCY
**
This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
/*------------------------------------------CHANGE HISTORY----------------------------------

------------------------------------------CHANGE HISTORY----------------------------------
*/
  /* A type to represent a SOAP RPC request */
  TYPE request IS RECORD (
    method     VARCHAR2(256),
    namespace  VARCHAR2(256),
    body       VARCHAR2(32767));

  /* A type to represent a SOAP RPC response */
  TYPE response IS RECORD (
    doc xmltype);

  /*
   * Create a new SOAP RPC request.
   */
  FUNCTION new_request(method    IN VARCHAR2,
                       namespace IN VARCHAR2)
                       RETURN request;

  /*
   * Add a simple parameter to the SOAP RPC request.
   */

  PROCEDURE add_parameter(req   IN OUT NOCOPY request,
                          name  IN VARCHAR2,
                          type  IN VARCHAR2,
                          value IN VARCHAR2);

  /*
   * Make the SOAP RPC call.
   */

  FUNCTION invoke(req    IN OUT NOCOPY request,
                  url    IN VARCHAR2,
                  action IN VARCHAR2) RETURN response;

  /*
   * Retrieve the sipmle return value of the SOAP RPC call.
   */
  FUNCTION get_return_value(resp      IN OUT NOCOPY response,
                            name      IN VARCHAR2,
                            namespace IN VARCHAR2) RETURN VARCHAR2;

END;
/