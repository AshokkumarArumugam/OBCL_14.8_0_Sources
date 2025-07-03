CREATE OR REPLACE TRIGGER ol_oltr_upload_master
/*
----------------------------------------------------------------------------------------------------
**
  ** File Name    :ol_oltr_upload_master.TRG
  **
  ** Module       :OL
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
/* CHANGE HISTORY
29-JAN-2002 FCC 39 Latam-Paraguay CHANGES TIMEZONE: sysdate has been replaced by fn_ol_sysdate

23-MAY-2002 FCC 4.0 JUNE 2002 plncit til 4167 added $x9 change

24-AUG-2003	FCC 4.3 August 2003 OFSWEB Interface Changes.Added treasury source and department code.
19-OCT-2007 FCC V.CL 7.3 UK CONSOLIDATION RETRO 
	30-JUL-2004 FCC 4.6.2 LD-UPLOAD CHNAGES , dup_val_index handled
	04-AUG-2004 FCC 4.6.2 GLOBAL.PR_INIT removed , NVL handled for global.user_id-Amit
	28-AUG-2007 FCC-7.3-RETRO-CITIUK-4.4-RETRO#235 spain/Portugal releated fixes retro-fitted into 442 unit
			(3-AUG-2004	PLC40504046 1. Conversion Related changes which was retroed from 4.05 Spain Conversion folder.
				    2. Moved Change history within create or replace trigger		
				    3. Added Sho Err at the end.
			)	    
15-DEC-2007 FCC V.CL 7.3 UK CONSOLIDATION RETRO  Changes
	Added EURCITIPLC in SYPKSS_UTILS.X9$ condition.
22-JAN-2009 FLEXCUBE V.CL RELEASE 7.4 ITR1 SFR#112,system was not writing debugs for bangalore
01-APR-2009 FCC V.CL Release 7.5 CITIPBG RETRO TILL#19 CHANGES:lncluded X9$ as 'CITIPBG' for 'CITIUS' x9$ conditions.
04-SEP-2010 FLEXCUBE V.CL Release 7.7 ITR1 SFR#90,cstbs_ext_contract_import_wip population for ext_init_date logic changed
13-SEP-2010 FLEXCUBE V.CL Release 7.7 ITR1 SFR#67,user_id should be populated with 'SYSWRAPPER' in cstbs_ext_contract_import_wip for agency wrapper 
30-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#10437 Change: STP was failing in the STp browser with exception as "Mismatch in Product code".
--04-SEP-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715  FS Tag 09 IUT#60 changes, made changes in product code to avoind null value insertion
12-JAN-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 RETRO EURCITIPLC#19433 change: For source code RAPID also, debug writing should continue on the same file.

Modified By         : Srinivasulu Ch
Modified On         : 14-06-2017
Modified Reason     : Bug#26165747  

**
**  Changed By         :Akhila Samson
**  Changed on         :27-Jun-2023
**  Change Description :Changing to editioning view name instead of synonym.
**  Search String      :Bug#35222052


*/

AFTER INSERT  ON --oltbs_upload_master
oltb_upload_master --Bug#35222052
FOR EACH ROW

DECLARE
	l_count			number;
	l_external_init_date	DATE; --04-SEP-2010 FLEXCUBE V.CL Release 7.7 ITR1 SFR#90,cstbs_ext_contract_import_wip population for ext_init_date logic changed
BEGIN
--IF :NEW.SOURCE_CODE NOT IN  ('STP','CONSOLRVR','CTDRFTZ','ROLLCONT','SPLIT1','SPLIT2')--04-DEC-14 EURCITIPLC#19433change
--Bug#26165747
/*
IF :NEW.SOURCE_CODE NOT IN  ('STP','CONSOLRVR','CTDRFTZ','ROLLCONT','SPLIT1','SPLIT2','RAPID')--04-DEC-14 EURCITIPLC#19433 change
 THEN
	IF SYPKSS_UTILS.X9$ = 'EURCITIPLC' THEN --22-JAN-2009 FLEXCUBE V.CL RELEASE 7.4 ITR1 SFR#112,system was not writing debugs for bangalore added
		global.pr_init(:new.branch); --28-AUG-2007 FCC-7.3-RETRO-CITIUK-4.4-RETRO#235 added the code to initialise the global.--FCC V.CL 7.3 UK CONSOLIDATION RETRO
	END IF;--22-JAN-2009 FLEXCUBE V.CL RELEASE 7.4 ITR1 SFR#112,system was not writing debugs for bangalore added
--GLOBAL.PR_INIT('CT1','SYSTEM');--FCC 4.6.2 changes
END IF;



IF		:new.source_code='MBx'  or SYPKSS_UTILS.X9$ in ('PLNCITI','TRLCITI','EURCITIPLC','OFCL') --plncit til 4167  --FCC V.CL 7.3 UK CONSOLIDATION RETRO  Changes added EURCITIPLC
	--FCC V.CL Release 7.5 CITIPBG RETRO TILL#19 CHANGES START
	--OR	SYPKSS_UTILS.X9$ LIKE '%CITILATAM' OR SYPKSS_UTILS.X9$ LIKE 'CITIUS' --Till#232. Retro as part of Flexcube V CL Release 7.1 on 070306. added CITIUS X9$ in OR clause --FCC V.CL 7.3 UK CONSOLIDATION RETRO 
          OR	SYPKSS_UTILS.X9$ LIKE '%CITILATAM' OR SYPKSS_UTILS.X9$ LIKE 'CITIUS' OR SYPKSS_UTILS.X9$ LIKE 'CITIPBG'
          --FCC V.CL Release 7.5 CITIPBG RETRO TILL#19 CHANGES END
	THEN

*/ --Bug#26165747

 	 BEGIN --FCC V.CL 7.3 UK CONSOLIDATION RETRO 
			INSERT INTO oltbs_ext_contract_stat
				(branch_code,
				 source,
				 product_code,
				 counterparty,
				 external_init_date,
				 module,
				 external_ref_no,
				 import_status,
				 treasury_source,	-- FCC 4.3 August 2003 OFSWEB Interface Changes
				 department_code)	-- FCC 4.3 August 2003 OFSWEB Interface Changes
			VALUES
				(:new.branch,
				:new.source_code,
				--:new.product, --04-SEP-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715  FS Tag 09 IUT#60 changes
				NVL(:new.product,'****'), --04-SEP-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715  FS Tag 09 IUT#60 changes
				:new.counterparty,
				trunc(fn_ol_sysdate), --FCC 39 Latam-Paraguay CHANGES TIMEZONE: sysdate has been replaced by fn_ol_sysdate
				:new.module,
				:new.ext_contract_ref_no,
				'U',
				:new.treasury_source,	-- FCC 4.3 August 2003 OFSWEB Interface Changes
				:new.department_code);	-- FCC 4.3 August 2003 OFSWEB Interface Changes
			/*Insert into cstbs_extcontract_import_wip*/
--FCC V.CL 7.3 UK CONSOLIDATION RETRO starts
EXCEPTION
	--FCC 4.6.2 changes
	WHEN DUP_VAL_ON_INDEX 
	THEN      
      --30-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#10437 changes start here
        	-- null;
		UPDATE 	oltbs_ext_contract_stat 
		SET 	product_code	= :new.product
		WHERE	branch_code   	= :new.branch
		AND 	source		= :new.source_code
		AND 	external_ref_no	= :new.ext_contract_ref_no; 
      --30-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#10437 changes end here
      WHEN OTHERS THEN
         debug.pr_debug('OL','oltbs_ext_contract_stat Oracle Error:'||sqlcode||':'||sqlerrm); 
      END;
--FCC V.CL 7.3 UK CONSOLIDATION RETRO ends      
  			--04-SEP-2010 FLEXCUBE V.CL Release 7.7 ITR1 SFR#90,cstbs_ext_contract_import_wip population for ext_init_date logic changed starts
  			SELECT 	external_init_date
  			INTO	l_external_init_date
  			FROM	oltbs_ext_contract_stat
  			WHERE	source = :new.source_code
  			AND	branch_code = :new.branch
  			AND	external_ref_no = :new.ext_contract_ref_no;
  			--04-SEP-2010 FLEXCUBE V.CL Release 7.7 ITR1 SFR#90,cstbs_ext_contract_import_wip population for ext_init_date logic changed ends
			BEGIN
				SELECT count(*)
					INTO l_count
					FROM oltbs_extcontract_import_wip
					WHERE user_id = NVL(global.user_id,'SYSTEM') AND --FCC V.CL 7.3 UK CONSOLIDATION RETRO 
						source = :new.source_code AND
						--external_init_date = trunc(fn_ol_sysdate) --FCC 39 Latam-Paraguay CHANGES TIMEZONE: sysdate has been replaced by fn_ol_sysdate --04-SEP-2010 FLEXCUBE V.CL Release 7.7 ITR1 SFR#90,cstbs_ext_contract_import_wip population for ext_init_date logic changed
						external_init_date = NVL(l_external_init_date,trunc(fn_ol_sysdate))--04-SEP-2010 FLEXCUBE V.CL Release 7.7 ITR1 SFR#90,cstbs_ext_contract_import_wip population for ext_init_date logic changed
						AND	product_code = :new.product;
				IF l_count = 0
				THEN
				INSERT INTO oltbs_extcontract_import_wip
						(
						user_id,
						source,
				   		 external_init_date,
						product_code
						)
					VALUES
						(
					 	 --NVL(global.user_id,'SYSTEM'),--FCC 4.6.2 NVL handled --FCC V.CL 7.3 UK CONSOLIDATION RETRO  --13-SEP-2010 FLEXCUBE V.CL Release 7.7 ITR1 SFR#67,user_id should be populated with 'SYSWRAPPER' in cstbs_ext_contract_import_wip for agency wrapper commented
					 	 NVL(DECODE(:new.source_code,'STPAGYWRP','SYSWRAPPER',global.user_id),'SYSTEM'),--13-SEP-2010 FLEXCUBE V.CL Release 7.7 ITR1 SFR#67,user_id should be populated with 'SYSWRAPPER' in cstbs_ext_contract_import_wip for agency wrapper added
						:new.source_code,
						--trunc(fn_ol_sysdate), --FCC 39 Latam-Paraguay CHANGES TIMEZONE: sysdate has been replaced by fn_ol_sysdate --04-SEP-2010 FLEXCUBE V.CL Release 7.7 ITR1 SFR#90,cstbs_ext_contract_import_wip population for ext_init_date logic changed
						NVL(l_external_init_date,trunc(fn_ol_sysdate)),--04-SEP-2010 FLEXCUBE V.CL Release 7.7 ITR1 SFR#90,cstbs_ext_contract_import_wip population for ext_init_date logic changed
						--:new.product --04-SEP-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715  FS Tag 09 IUT#60 changes
						NVL(:new.product,'****') --04-SEP-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715  FS Tag 09 IUT#60 changes
						);
				END IF;
			END;
--END IF;  --Bug#26165747
EXCEPTION
--FCC V.CL 7.3 UK CONSOLIDATION RETRO starts
WHEN DUP_VAL_ON_INDEX THEN
           null;
--FCC V.CL 7.3 UK CONSOLIDATION RETRO ends
	WHEN others
	THEN
		debug.pr_debug('OL','Oracle Error:'||sqlcode||':'||sqlerrm);
	RAISE_APPLICATION_ERROR(-20001,'Error while updating cstb_ext_contract_stat/oltbs_extcontract_import_wip');
END ol_oltr_upload_master;
/