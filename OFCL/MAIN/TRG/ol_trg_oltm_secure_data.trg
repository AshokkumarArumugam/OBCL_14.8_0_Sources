CREATE OR REPLACE TRIGGER ol_trg_oltm_secure_data
/*
----------------------------------------------------------------------------------------------------
**
** File Name	: ol_trg_oltm_secure_data.TRG
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
*/

AFTER INSERT OR UPDATE ON OLTM_SECURE_DATA
FOR EACH ROW
DECLARE
	l_ho_branch		oltms_bank.ho_branch%TYPE;
	l_serial_no		oltms_secure_data_upload.serial_no%TYPE;
BEGIN
	SELECT ho_branch 
	  INTO l_ho_branch
	  FROM oltms_bank 
	 WHERE bank_code = 'CITI';

	global.pr_init(l_ho_branch,'SYSTEM');
	debug.pr_debug('OL','Start of ol_trg_oltm_secure_data');
	debug.pr_debug('OL',':new.cusip_no~update_date --> '||:new.cusip_no||' ~ '||global.application_date);
	
	SELECT max(serial_no)
	  INTO l_serial_no
	  FROM oltms_secure_data_upload
	 WHERE cusip_no = :new.cusip_no
	   AND update_date = global.application_date;
	
	debug.pr_debug('OL','l_serial_no = '||l_serial_no);
	
	INSERT INTO oltms_secure_data_upload
		(
		CUSIP_NO,
		UPDATE_DATE,
		SERIAL_NO,
		FIT_CODE,
		COMMITMENT_MATURITY_DATE,
		EFFECTIVE_DATE,
		MARGIN_OR_COUPON,
		CUSIP_DESCR,
		MOODYS_RATINGS,
		SP_RATINGS,
		UPLOAD_STAT
		)
	VALUES
		(
		:new.CUSIP_NO,
		global.application_date,
		nvl(l_serial_no,0) + 1,
		:new.FIT_CODE,
		:new.COMMITMENT_MATURITY_DATE,
		:new.EFFECTIVE_DATE,
		:new.MARGIN_OR_COUPON,
		:new.CUSIP_DESCR,
		:new.MOODYS_RATINGS,
		:new.SP_RATINGS,
		'N'
		);
	debug.pr_debug('OL','After insert into oltms_secure_data_upload --> rowcount = '||sql%rowcount);
EXCEPTION
WHEN others THEN
	debug.pr_debug('OL','In WO of ol_trg_oltm_secure_data --> '||sqlerrm);
END;
/