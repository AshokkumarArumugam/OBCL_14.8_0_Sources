CREATE OR REPLACE  FORCE VIEW SMVW_BROWSER_FUNCTIONS
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
-------------------------------------------------------------------------------------*/
/* Change History
15-Feb-2003    Added the Minus Clause to eliminate the subsidy Menu for the Global.X9$ equals to USDIMF
07-Mar-2003    FCC5.2 ITR1 SFR#1 Changes Global.X9$ equals to SDRIMF
10-AUG-2007  Added the UI_name in smtb_menu to behave like executable_name for FCJubs8.0Lot2
*/
/* Remmed out the old view for CITI Browser Changes - New view definition */
SELECT	A.USER_ID ,
			B.FUNCTION_ID ,
			B.LANG_CODE ,
			B.MAIN_MENU ,
			B.SUB_MENU_1 ,
			B.SUB_MENU_2,
			m.type_string,
			A.BRANCH_CODE,
			m.UI_NAME,
      m.USER_FUNCTION_ID
	from		smvws_user_role_functions a ,
			smtbs_function_description b,
			smtbs_menu m,
			smtbs_modules o
	where	a.function_id = b.function_id
	and		a.user_language = b.lang_code
	and		m.function_id   = a.function_id
	-- AEDADCB : Added Check for Modules and Availability
	and      m.available     = 1
	and      m.module        = o.module_id
	--Fcc5.2 Changes starts
	AND b.Lang_Code = global.lang  -- NLS_11.4
	minus
	SELECT	A.USER_ID ,
			B.FUNCTION_ID ,
			B.LANG_CODE ,
			B.MAIN_MENU ,
			B.SUB_MENU_1 ,
			B.SUB_MENU_2,
			m.type_string,
			A.BRANCH_CODE,
			m.UI_NAME,
      m.USER_FUNCTION_ID
	from		smvws_user_role_functions a ,
			smtbs_function_description b,
			smtbs_menu m,
			smtbs_modules o
	where	a.function_id = b.function_id
	and		a.user_language = b.lang_code
	and		m.function_id   = a.function_id
	and		m.available     = 1
	and		m.module        = o.module_id
	--and		global.x9$      <> 'SDRIMF'  -- FCC5.2 ITR1 SFR#1 Changess
	and		b.function_id   in ('STDLNSUB','STSLNSUB')
	AND b.Lang_Code = global.lang  -- NLS_11.4
/
CREATE OR REPLACE SYNONYM SMVWS_BROWSER_FUNCTIONS FOR SMVW_BROWSER_FUNCTIONS
/