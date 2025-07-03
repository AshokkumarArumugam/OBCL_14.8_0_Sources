CREATE OR REPLACE FORCE VIEW STVW_UNAUTH_FORMS( BRANCH_CODE, 
FUNCTION_ID, LANGUAGE_CODE, OBJECT_DESC )
 AS
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2011 - 2012 Oracle and/or its affiliates.  All rights reserved.
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
/*
 16-OCT-2009  FCUBSKERNEL-11.0   Tank Maint Changes
** 
----------------------------------------------------------------------------------------------------*/
 SELECT distinct branch_code, r.function_id, lang_code language_code,
(main_menu || ' ' ||sub_menu_1 || ' ' || sub_menu_2) object_desc
	FROM sttbs_record_log r, smtbs_function_description f
	WHERE ( AUTH_STAT = 'U' AND NVL(TANKING_STATUS,'N') <> 'T')  AND r.FUNCTION_ID = f.function_id
	AND f.Lang_Code = global.lang  -- NLS_11.4
/
DROP SYNONYM STVWS_UNAUTH_FORMS 
/
CREATE  SYNONYM STVWS_UNAUTH_FORMS  FOR STVW_UNAUTH_FORMS 
/
