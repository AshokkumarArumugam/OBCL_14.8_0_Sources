CREATE OR REPLACE PACKAGE copks_static_service IS
  /*------------------------------------------------------------------------------------------
  ** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
  ** Copyright ? 2008 - 2016  Oracle and/or its affiliates.  All rights reserved.
  **
  ** No part of this work may be reproduced, stored in a retrieval system,
  ** adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise,
  ** translated in any language or computer language,
  ** without the prior written permission of Oracle and/or its affiliates.
  **
  **
  ** Oracle Financial Services Software Limited.
  ** Oracle Park, Off Western Express Highway,
  ** Goregaon (East),
  ** Mumbai - 400 063, India.
  ------------------------------------------------------------------------------------------
  */

  TYPE ty_static_type IS RECORD(
    st_type          VARCHAR2(255),
    type_name        VARCHAR2(255),
    type_value       VARCHAR2(255),
    --FX-Rate_reval starts
    ADD_FLD_2        VARCHAR2(4000),
    SOURCE           VARCHAR2(35),
    ADD_FLD_1        VARCHAR2(4000),
    ADD_FLD_3        VARCHAR2(4000),
    ADD_FLD_4        VARCHAR2(4000),
    ADD_FLD_5        VARCHAR2(4000),
    ADD_FLD_6        VARCHAR2(4000),
    ADD_FLD_7        VARCHAR2(4000),
    ADD_FLD_8        VARCHAR2(4000),
    ADD_FLD_9        VARCHAR2(4000),
    ADD_FLD_10       VARCHAR2(4000),
    ADD_DT_1         DATE,
    ADD_DT_2         DATE,
    ADD_DT_3         DATE,
    ADD_DT_4         DATE,
    ADD_DT_5         DATE,
    USER_REFNO       VARCHAR2(50),
    --FX-Rate_reval starts
    RECORD_STAT      VARCHAR2(1),
    AUTH_STAT        VARCHAR2(1),
    MOD_NO           NUMBER(4),
 maker_id smtb_user.user_id%TYPE,
    MAKER_DT_STAMP   DATE,
 checker_id smtb_user.user_id%TYPE,
    CHECKER_DT_STAMP DATE,
    ONCE_AUTH        VARCHAR2(1));

  FUNCTION fn_update_product(p_static    IN ty_static_type,
                             p_err_code  in out varchar2,
                             p_err_param in out varchar2) RETURN BOOLEAN;

END copks_static_service;
/
create or replace synonym copkss_static_service for copks_static_service
/
