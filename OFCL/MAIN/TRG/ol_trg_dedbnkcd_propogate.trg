CREATE OR REPLACE TRIGGER "TRG_DEDBNKCD_PROPOGATE"
/*----------------------------------------------------------------------------------------------------
**
** File Name : ol_trg_dedbnkcd_propogate.TRG

** Module    : IS
**
This source is part of the Oracle Banking Corporate Lending  Software Product. 
Copyright © 2007 - 2018  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted 
in any form or by any means, electronic, mechanical, photographic, graphic, optic recording
or otherwise, translated in any language or computer language, without the prior written permission 
of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
------------------------------------------------------------------------------------------------------

    CHANGE HISTORY
    
    Created By           : 
    Created On           : 
    Purpose              :  

    Modified By          : 
    Modified On          : 
    Fix Description      : 
    Search String        : 
----------------------------------------------------------------------------------------------------
*/

/****************************************CHANGE HISTORY***********************************************
05-MAR-2005 FCC 4.6 PLC46100054 Additional FX/MM Static uploads from 4.6 to Core added
						(OLDBICCY,ISDBICBN,ISDBICBR,STDLCHOL,DEDBNKCD,OLDTYPGP,
						MSDSWFLD,MSDPRCOD,MSDCSGRP,OLDHLDCR,CSDZMSGP)
10-may-2016 ofcl12.2 changed sipks to sypks						
***************************************CHANGE HISTORY************************************************/

AFTER INSERT OR UPDATE OF AUTH_STAT ON OLTM_CLG_BANK_CODE
FOR EACH ROW
DECLARE
l_mqstring 				VARCHAR2(4000);
l_interface_required		oltms_pp_intfmap_master.interface_required%TYPE;
l_auth_status			oltms_pp_intfmap_master.authorization_status%TYPE;
l_error_code			VARCHAR2(1000);
l_error_param			VARCHAR2(1000);
l_new_or_mod			VARCHAR2(10);
BEGIN
	debug.pr_debug('OL','Within ol_trg_dedbnkcd_propogate for ' || :new.clg_bank_code);

	IF 	:new.auth_stat		=	'U'
	THEN
		RETURN ;
	END IF;

	BEGIN
		SELECT 	interface_required,
				authorization_status
		INTO   	l_interface_required,
				l_auth_status
		FROM 		oltms_pp_intfmap_master
		WHERE 	function_id	= 'DEDBNKCD';
	EXCEPTION
	WHEN OTHERS
	THEN
		debug.pr_debug('OL','Probably map master do not have any records');
	END;

	IF	NVL(l_interface_required,'N')	=	'Y'
	THEN
		IF :new.mod_no > 1
		THEN
			debug.pr_debug('OL','Modification happened.So, lets send out a modification record to our friend');
			l_new_or_mod	:=	'M';
		ELSE
			debug.pr_debug('OL','New one.So, lets send out a new record to our friend');
			l_new_or_mod	:=	'N';
		END IF;

		INSERT INTO OLTB_FXMM_STATIC_DETAILS
			(
			seq_no,
			function_id,
			auth_status,
			new_or_mod,
			key,
			modified,
			process_stat
			)
		VALUES
			(
			FXMMSTATIC.nextval,
			'DEDBNKCD',
			l_auth_status,
			l_new_or_mod,
			:new.ROWID,
			sypkss_utils.fn_get_date_time(global.application_date),
			'U'
			);

	ELSE
		debug.pr_debug('OL','No interfacing required.Please proceed');
	END IF;
EXCEPTION
WHEN OTHERS
THEN
	debug.pr_debug('**','in when others of ol_trg_dedbnkcd_propogate with SQLERRM=>'|| SQLERRM);
	debug.pr_debug('OL','in when others of ol_trg_dedbnkcd_propogate with SQLERRM=>'|| SQLERRM);
END;
/