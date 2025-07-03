CREATE OR REPLACE FORCE VIEW OLVW_EVENT_ERRORS AS
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright ©  2012 - 2013  Oracle and/or its affiliates.  All rights reserved.
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
SELECT
 MODULE_CODE	MODULE_CODE,
 EVENT_CODE	EVENT_CODE,
 '' 	TXT_ERROR_VAL,
 '' 	TXT_ERROR_EVNT,
 ''  	SUBSYSTEMSTAT
FROM OLTMS_EVENT_TRIGGER
/
CREATE OR REPLACE SYNONYM OLVWS_EVENT_ERRORS FOR OLVW_EVENT_ERRORS
/