CREATE OR REPLACE VIEW MSVW_MSSIFBRW AS
/*------------------------------------------------------------------------------------------
**
** This source is part of the Oracle FLEXCUBE Software Product.
** Copyright (R) 2016 , Oracle and/or its affiliates.  All rights reserved
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
--------------------------------------------------------------------------------------------
**    CHANGE HISTORY
**    Changed By        : 
**   Changed On        : 
**    Change Desc       :                       
----------------------------------------------------------------------------------------------------*/
SELECT FILE_NAME,
    TO_DATE(TO_CHAR(RECEIVED_DATE_TIME, 'YYYY-MM-DD'),'YYYY-MM-DD') as RECEIVED_DATE,
    TO_CHAR(RECEIVED_DATE_TIME, 'HH24:MI:SS') as RECEIVED_TIME,
    STATUS,
    FILEACT_CONNECTOR_NAME,FILE_SIZE,
    ERROR_CODE,
    ERROR_PARAM,
    ERROR_DESC,
    LOGICAL_FILE_NAME,
    TXN_ID
  FROM MSTb_EMS_BULK_IN_FILE_DTLS
/
CREATE OR REPLACE SYNONYM msvws_mssifbrw for msvw_mssifbrw
/