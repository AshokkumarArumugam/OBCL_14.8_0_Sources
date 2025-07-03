CREATE OR REPLACE VIEW MSVW_MSSBSWOP AS
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
SELECT REFERENCE_NO,OPERATION_TYPE
,REGEXP_SUBSTR(OPERATION_KEY,'[^~]+') "BULK_REFERENCE_NO",SUBSTR(OPERATION_KEY
                 ,INSTR(OPERATION_KEY,'~',-1)+1
                 ) "BULK_PREFERENCE_NAME",
TO_DATE(TO_CHAR(LOGGED_DATE_TIME, 'YYYY-MM-DD'), 'YYYY-MM-DD') as LOGGED_DATE,
       TO_CHAR(LOGGED_DATE_TIME, 'HH24:MI:SS') as LOGGED_TIME,
       TO_DATE(TO_CHAR(START_DATE_TIME, 'YYYY-MM-DD'), 'YYYY-MM-DD') as START_DATE,
       TO_CHAR(START_DATE_TIME, 'HH24:MI:SS') as START_TIME,
       TO_DATE(TO_CHAR(END_DATE_TIME, 'YYYY-MM-DD'), 'YYYY-MM-DD') as END_DATE,
       TO_CHAR(END_DATE_TIME, 'HH24:MI:SS') as END_TIME,
       STATUS,
       ERROR_CODE,
       ERROR_PARAM,
       ERROR_DESC
  FROM Mstb_Ems_Operations
/
CREATE OR REPLACE SYNONYM msvws_mssbswop for msvw_mssbswop
/