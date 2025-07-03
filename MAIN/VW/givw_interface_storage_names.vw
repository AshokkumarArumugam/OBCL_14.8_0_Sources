CREATE OR REPLACE FORCE VIEW GIVW_INTERFACE_STORAGE_NAMES 
AS
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Software Product.
** Copyright (R) 2022 , Oracle and/or its affiliates.  All rights reserved
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
------------------------------------------------------------------------------------------
*/
/*
-------------------------------------------------------------------------------------*/
/* Change History
*/
SELECT "DIRECTORY_NAMES","INTERFACE_TYPE" FROM 
(SELECT regexp_substr('IN_WIP~IN_READY~IN_FILE_PROCESSED~IN_PROCESSED~IN_ERROR~IN_CRC_READY~IN_CRC_PROCESSED~IN_CONF_READY~IN_CONF_PROCESSED~IN_LOG_SUCCESS~IN_LOG_ERROR', '[^~]+', 1, level) AS DIRECTORY_NAMES,'I' as interface_type
FROM dual
CONNECT BY regexp_substr('IN_WIP~IN_READY~IN_FILE_PROCESSED~IN_PROCESSED~IN_ERROR~IN_CRC_READY~IN_CRC_PROCESSED~IN_CONF_READY~IN_CONF_PROCESSED~IN_LOG_SUCCESS~IN_LOG_ERROR', '[^~]+', 1, level) IS NOT NULL) 
UNION
(SELECT regexp_substr('OUT_WIP~OUT_READY~OUT_CRC_WIP~OUT_CRC_READY~OUT_CONF_WIP~OUT_CONF_READY', '[^~]+', 1, level) AS DIRECTORY_NAMES,'O' as interface_type
FROM dual
CONNECT BY regexp_substr('OUT_WIP~OUT_READY~OUT_CRC_WIP~OUT_CRC_READY~OUT_CONF_WIP~OUT_CONF_READY', '[^~]+', 1, level) IS NOT NULL)
/
CREATE OR REPLACE SYNONYM GIVWS_INTERFACE_STORAGE_NAMES FOR GIVW_INTERFACE_STORAGE_NAMES
/
