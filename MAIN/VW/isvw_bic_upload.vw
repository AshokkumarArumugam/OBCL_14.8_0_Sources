CREATE OR REPLACE VIEW ISVW_BIC_UPLOAD AS
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2007 - 2013  Oracle and/or its affiliates.  All rights reserved.
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
**  CHANGE HISTORY
----------------------------------------------------------------------------------------------------*/
SELECT  cast('' as VARCHAR2(6))      BRANCH_CODE,
cast('' as VARCHAR2(7))      SOURCE_CODE,
cast('' as VARCHAR2(50))     FILE_NAME,
cast('' as VARCHAR2(100))    FILE_PATH,
cast('' as varchar2(16))     INTRADAY_SEQ_NO,
cast('' as varchar2(1))      AUTH_STAT,
cast('' as varchar2(1))      RECORD_STAT,
cast('' as varchar2(1))      ONCE_AUTH,
cast('' as NUMBER(4))        MOD_NO,
cast('' as varchar2(320))     MAKER_ID,
cast('' as varchar2(320))     CHECKER_ID,
cast('' as DATE)             MAKER_DT_STAMP,
cast('' as DATE)             CHECKER_DT_STAMP
FROM DUAL
/
CREATE OR REPLACE SYNONYM ISVWS_BIC_UPLOAD for ISVW_BIC_UPLOAD
/