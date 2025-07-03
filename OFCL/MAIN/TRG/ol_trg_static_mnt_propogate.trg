CREATE OR REPLACE TRIGGER ol_trg_static_mnt_propogate
/*----------------------------------------------------------------------------------------------------
**
** File Name : ol_trg_static_mnt_propogate.trg
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
----------------------------------------------------------------------------------------------------
*/        
/****************************************CHANGE HISTORY***********************************************
01-MAR-2004 FCC 4.6 PLC46100048 Static interface changes to propogate the same into 4.4.2
24-MAY-2005	FCC 4.6 PLC46050074 Made ol_trg_static_mnt_propogate common for all maintenance types
10-may-2016 ofcl12.2 changed sipks to sypks
***************************************CHANGE HISTORY************************************************/

--AFTER INSERT OR UPDATE ON OLTM_STATIC_MAINTENANCE	CITIPLC PLC46050074 Changes
AFTER INSERT OR UPDATE OF AUTH_STAT ON OLTM_STATIC_MAINTENANCE --CITIPLC PLC46050074 Changes
FOR EACH ROW
DECLARE
l_mqstring 				VARCHAR2(4000);
l_interface_required		oltms_pp_intfmap_master.interface_required%TYPE;
l_auth_status			oltms_pp_intfmap_master.authorization_status%TYPE;
l_error_code			VARCHAR2(1000);
l_error_param			VARCHAR2(1000);
l_new_or_mod			VARCHAR2(10);
l_rowid				VARCHAR2(1000);
l_function_id			smtbs_menu.function_id%TYPE;	--CITIPLC PLC46050074 Changes
BEGIN
	debug.pr_debug('OL','Within ol_trg_static_mnt_propogate for ' || :new.maintenance_type || '~' || :new.field_name);

	IF 	:new.auth_stat		=	'U'
	--OR	:new.maintenance_type	<>	'CNFR'	--CITIPLC PLC46050074 Changes
	THEN
		debug.pr_debug('OL',':new.auth_stat=>'||:new.auth_stat);
		debug.pr_debug('OL',':new.maintenance_type=>'||:new.maintenance_type);
		debug.pr_debug('OL','About Turn;');
		RETURN ;
	END IF;

	l_function_id	:=	'CSDZ'||:NEW.maintenance_type;	--CITIPLC PLC46050074 Changes

	debug.pr_debug('OL','going ahead;');
	BEGIN
		SELECT 	interface_required,
				authorization_status
		INTO   	l_interface_required,
				l_auth_status
		FROM 		oltms_pp_intfmap_master
		WHERE 	branch_code	= global.current_branch
		--AND 		function_id	= 'CSDSTMNT';	--CITIPLC PLC46050074 Changes
		AND 		function_id	= l_function_id;	--CITIPLC PLC46050074 Changes
	EXCEPTION
	WHEN OTHERS
	THEN
		debug.pr_debug('OL','Probably map master do not have any records');
	END;

	debug.pr_debug('OL','l_interface_required=>'||l_interface_required);
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
			--'CSDSTMNT',	--CITIPLC PLC46050074 CHanges
			l_function_id,	--CITIPLC PLC46050074 Changes
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
	debug.pr_debug('**','in when others of ol_trg_static_mnt_propogate with SQLERRM=>'|| SQLERRM);
	debug.pr_debug('OL','in when others of ol_trg_static_mnt_propogate with SQLERRM=>'|| SQLERRM);
END;
/