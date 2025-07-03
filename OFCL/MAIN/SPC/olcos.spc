CREATE OR REPLACE PACKAGE olcos
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olcos.SPC
**
** Module		: LOANS and DEPOSITS
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
/*  This package consists of the following procedures / functions

fn_ld_lock_contract	  - 	returns T/F to indicate if control table has
				been updated (contract locked)

fn_ld_unlock_contract	  -	returns T/F to indicate if control row has
				been deleted (contract unlocked)

fn_ld_update_control	  -	does actual update of control table 

fn_ld_check_lock	  -	checks if contract if present in control 
				table 

fn_mm_amt_chg_poss - 	MM - Amendment of principal amount allowed
				if no schedules liquidated or defined 
				between maturity date and today.

fn_ld_get_ecd		  - 	The earliest change date for a contract is
				its latest liquidation date.

*/



FUNCTION fn_ld_lock_contract   (pRef_no VARCHAR2, 
				pFunc 	VARCHAR2,
				pId	VARCHAR2,
				pTime	DATE)
RETURN BOOLEAN;

FUNCTION fn_ld_unlock_contract (pRef_no VARCHAR2)
RETURN BOOLEAN;

FUNCTION fn_ld_update_control  (pRef_no  VARCHAR2, 
				pFunc 	VARCHAR2,
				pId	VARCHAR2,
				pTime	DATE)
RETURN BOOLEAN;

FUNCTION fn_ld_check_lock      (pRef_no	VARCHAR2)
RETURN BOOLEAN;

FUNCTION fn_ld_get_ecd (pRef_no in VARCHAR2,ecdate out date)
RETURN Boolean;

FUNCTION fn_mm_amt_chg_poss (pRef_no in VARCHAR2, 
			application_date in date)
RETURN Boolean;

FUNCTION fn_ld_calc_uncovered(p_refno in VARCHAR2,
		              p_verno in number,
			      unc_amt out number)
Return	Boolean;

END olcos;
/
CREATE or replace SYNONYM olcoss FOR olcos
/