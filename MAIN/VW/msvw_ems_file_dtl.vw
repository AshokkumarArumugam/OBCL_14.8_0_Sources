CREATE OR REPLACE VIEW MSVW_EMS_FILE_DTL AS
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
SELECT FILE_REF_ID,MESSAGE  FROM mstb_ems_file_out_detail UNION ALL
 SELECT FILE_REF_ID,MESSAGE  FROM mstb_ems_file_in_detail
/
CREATE OR REPLACE SYNONYM msvws_ems_file_dtl for msvw_ems_file_dtl
/
