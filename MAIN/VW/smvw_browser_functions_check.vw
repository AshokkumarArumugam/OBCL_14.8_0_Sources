CREATE OR REPLACE FORCE VIEW SMVW_BROWSER_FUNCTIONS_CHECK AS
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
-----------------------------------------------------------------------------------*/
SELECT	A.USER_ID ,
			B.FUNCTION_ID ,
			B.LANG_CODE ,
			B.MAIN_MENU ,
			B.SUB_MENU_1 ,
			B.SUB_MENU_2,
			m.type_string,
			A.BRANCH_CODE,
			m.UI_NAME
	from		smvws_user_role_functions a ,
			smtbs_function_description b,
			smtbs_menu m,
			smtbs_modules o
	where	a.function_id = b.function_id
	and		a.user_language = b.lang_code
	and		m.function_id   = a.function_id
	and      m.module        = o.module_id
/
CREATE OR REPLACE SYNONYM SMVWS_BROWSER_FUNCTIONS_CHECK FOR SMVW_BROWSER_FUNCTIONS_CHECK
/