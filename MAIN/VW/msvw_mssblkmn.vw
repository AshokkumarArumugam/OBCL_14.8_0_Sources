CREATE OR REPLACE VIEW MSVW_MSSBLKMN AS
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
SELECT BULK_PREFERENCE_NAME,
TO_DATE(TO_CHAR(STARTTED_DT_TIME, 'YYYY-MM-DD'), 'YYYY-MM-DD') as START_DATE,
       TO_CHAR(STARTTED_DT_TIME, 'HH24MISS') as START_TIME,
       TO_DATE(TO_CHAR(END_DT_TIME, 'YYYY-MM-DD'), 'YYYY-MM-DD') as END_DATE,
       TO_CHAR(END_DT_TIME, 'HH24MISS') as END_TIME,
       NUMBER_OF_FILES,
       TOTAL_NUMBER_TXN,
       TOTAL_SIZE,
       STATUS,
       ERR_CODE,
       ERR_PARAM,
       ERR_DESC,process_ref_no
  FROM mstb_ems_bulk_process
/
CREATE OR REPLACE SYNONYM msvws_mssblkmn for msvw_mssblkmn
/