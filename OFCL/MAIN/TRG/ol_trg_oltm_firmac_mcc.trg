CREATE OR REPLACE TRIGGER ol_trg_oltm_firmac_mcc
/*
----------------------------------------------------------------------------------------------------
**
** File Name	: ol_trg_oltm_firmac_mcc.TRG
**
** Module	: LT
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
-------------------------------------- Change history ---------------------------------------------
Change History
01-JUN-2011 Flexcube V.CL Release 7.9, FS Volume02 Tag07, CFPI Migration, New trigger created.
03-AUG-2011 Flexcube V.CL Release 7.9, FS Volume02 Tag07, New fields added to the tables : LEGAL_ENTITY_CODE, HYPERION_CODE, STRATEGY_DESC
20-DEC-2011 CITIUS-LS#12187 For GIAS feed, IMS_ACCOUNT is need, and E-Sales is feeding this field. So this column is added in the OLTM_FIRMAC_MCC and OLTM_FIRMAC_MCC_UPLOAD tables. Also population of the same is handled in fn_process_firmac_mcc_map and ol_trg_oltm_firmac_mcc.
*/
AFTER INSERT OR UPDATE ON OLTM_FIRMAC_MCC
FOR EACH ROW
DECLARE
	l_ho_branch		oltms_bank.ho_branch%TYPE;
	l_serial_no		oltms_firmac_mcc_upload.serial_no%TYPE;
BEGIN
	SELECT ho_branch 
	  INTO l_ho_branch
	  FROM oltms_bank 
	 WHERE bank_code = 'CITI';

	global.pr_init(l_ho_branch,'SYSTEM');
	debug.pr_debug('OL','Start of ol_trg_oltm_firmac_mcc');
	debug.pr_debug('OL',':new.firm_acct_mnemonic~update_date --> '||:new.firm_acct_mnemonic||' ~ '||global.application_date);
	
	SELECT max(serial_no)
	  INTO l_serial_no
	  FROM oltms_firmac_mcc_upload
	 WHERE firm_acct_mnemonic = :new.firm_acct_mnemonic
	   AND update_date = global.application_date;

	debug.pr_debug('OL','l_serial_no = '||l_serial_no);
	
	INSERT INTO oltms_firmac_mcc_upload
		(
		MCC,
		FIRM_ACCT_MNEMONIC,
		UPDATE_DATE,
		SERIAL_NO,
		EXPENSE_CODE,
		STRATEGY_CODE,
		SUB_STRATEGY_CODE,
		UPLOAD_STAT,
		--03-AUG-2011 Flexcube V.CL Release 7.9, FS Volume02 Tag07
		LEGAL_ENTITY_CODE,                      
		HYPERION_CODE, 			      
                STRATEGY_DESC
                --03-AUG-2011 Flexcube V.CL Release 7.9, FS Volume02 Tag07
        ,IMS_ACCOUNT	--CITIUS-LS#12187
		)
	VALUES
		(
		:new.MCC,
		:new.FIRM_ACCT_MNEMONIC,
		global.application_date,
		nvl(l_serial_no,0) + 1,
		:new.EXPENSE_CODE,
		:new.STRATEGY_CODE,
		:new.SUB_STRATEGY_CODE,
		'N',
		--03-AUG-2011 Flexcube V.CL Release 7.9, FS Volume02 Tag07
		:new.LEGAL_ENTITY_CODE,                       
		:new.HYPERION_CODE, 			      
                :new.STRATEGY_DESC
                --03-AUG-2011 Flexcube V.CL Release 7.9, FS Volume02 Tag07
        ,:new.ims_account	--CITIUS-LS#12187
		);
	debug.pr_debug('OL','After insert into oltms_firmac_mcc_upload --> rowcount = '||sql%rowcount);
EXCEPTION
WHEN others THEN
	debug.pr_debug('OL','In WO of ol_trg_oltm_firmac_mcc --> '||sqlerrm);
END;
/