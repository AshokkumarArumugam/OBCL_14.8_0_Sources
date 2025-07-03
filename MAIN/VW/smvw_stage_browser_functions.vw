CREATE OR REPLACE FORCE VIEW SMVW_STAGE_BROWSER_FUNCTIONS
AS
/*------------------------------------------------------------------------------------------
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
------------------------------------------------------------------------------------------
*/
/*
--------------------------------------------------------------------------------------------*/
SELECT
       A.USER_ID , B.FUNCTION_ID , B.LANG_CODE , B.MAIN_MENU , B.SUB_MENU_1
     , B.SUB_MENU_2,m.type_string, A.BRANCH_CODE , m.UI_NAME, m.USER_FUNCTION_ID
 from     SMVW_STAGE_USER_ROLE_FUNCTIONS a ,SMTB_FUNCTION_DESCRIPTION B,
	  smtbs_menu m, smtbs_modules o
 where   a.function_id = B.FUNCTION_ID
 AND     A.USER_LANGUAGE      =    B.LANG_CODE
 and      m.function_id   = a.function_id
 -- AEDADCB : Added Check for Modules and Availability
 and      m.available     = 1
 and      m.module        = o.module_id
 AND B.Lang_Code = global.lang  -- NLS_11.4
UNION
-- For process functions that are not accessible through app browser
SELECT
       A.USER_ID , a.FUNCTION_ID , '' lang_code , '' main_menu , '' sub_menu_1
     , '' sub_menu_2,m.type_string, A.BRANCH_CODE , m.UI_NAME, m.USER_FUNCTION_ID
 from     SMVW_STAGE_USER_ROLE_FUNCTIONS a,
	  smtbs_menu m, smtbs_modules o
 where   m.function_id   = a.function_id
 -- AEDADCB : Added Check for Modules and Availability
 and      m.available     = 1
 and      m.module        = o.module_id
 and      m.type_string   = 'P'
 and m.function_id not in (select c.function_id from smtb_function_description c, smtbs_menu d where c.function_id=d.function_id and d.type_string='P'
)
/
CREATE OR REPLACE SYNONYM SMVWS_STAGE_BROWSER_FUNCTIONS FOR SMVW_STAGE_BROWSER_FUNCTIONS 
/