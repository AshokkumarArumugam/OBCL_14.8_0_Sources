CREATE OR REPLACE VIEW MSVW_MSDCNMGR AS
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
SELECT 1 as p_key , line_id,operation_mode,cast(NULL as varchar(10)) AS operation,STARTUP_STATUS
  FROM MSTM_EMS_CONNECTIVITY_LINE
/
CREATE OR REPLACE SYNONYM msvws_msdcnmgr for msvw_msdcnmgr
/
