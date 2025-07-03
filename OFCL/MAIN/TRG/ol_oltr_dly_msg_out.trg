CREATE OR REPLACE TRIGGER ol_oltr_dly_msg_out

/*----------------------------------------------------------------------------------------
  **
  ** File Name    : ol_oltr_dly_msg_out.TRG
  **
  ** Module       : MS
  **
  This source is part of the Oracle Banking Corporate Lending  Software Product. 
Copyright Â© 2017 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted 
in any form or by any means, electronic, mechanical, photographic, graphic, optic recording
or otherwise, translated in any language or computer language, without the prior written permission 
of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
  ----------------------------------------------------------------------------------------
  */

/* Change History

30-May-2001 CITIPLC Retroe SFR 142:
Variable added to hold the node value FROM sttb_branch_code TABLE
SELECT statement added to initialize this variable.

07-01-2002 FCC Retro 3.9 Citiplc SFR 913
The dbms_output.put_line was replaced by debug.pr_debug

16-02-2002	--Fcc39 related change sfr#217 Commented the process related the SELECT FROM
						oltbs_bg_status as it IS no longer IN use

02.AUG.2002 FCC 4.1 Oct 2002 PLNCIT TIL# 4388 Parallel processing related changes.

02-JAN-2003 FCC 4.2 APRIL 2003 CITIPLC SFR #PLC40120009 'Msg_handoff_alert' alert signal code to be uncommented.
									  Added x9$ check.

11-JUL-2003 FCC 4.3 AUG 2003 Retro CEEMEA SFR #9467: Fix FOR parallel statement generation

11-Aug-2003	Fcc 4.3 OPS Changes. Assigning Department codes.

FCC 4.4 DEC 2003 Retro Changes PLC43050040 Added missing SFR CITIPLC SFR PLC4006038
		The usage of dbms_alert slows down the processing of O/G messages .
		So try to base the generation of the outgoing messages on same priciples as the STP

20-NOV-2003 FCC4.4 DEC 2003 MS changes -- Added code for populating the columns counterparty, custom_ref_no,
				interdict_status, msg_group, generation_priority, hold_status and delivery_channel
				
13-apr-2004	FCC4.5 LOT2 change for MS parallelization

28-JUN-2004 FCC 4.6 AUG 2004 HUFCITI TIL#1279 RTGS 920 Generation does not generate the message automatically

19-OCT-2007 FCC V.CL 7.3 UK CONSOLIDATION RETRO 
	19-JUL-2005 FCC 4.6.2 JUL 2005 LS-67 for settlement pickup 
	31-Aug-2007 FCC-7.3-RETRO-CITIUK-4.4-RETRO#145 (PLC44120039) Added code To assign value for rtgs_rep_stat
03-dec-2007 FCC V.CL Release 7.3 ITR1 sfr#276,Message Generation Offline Changes, MANAS  
20-FEB-2009 FCC V.CL Release 7.5 CITIPBG RETRO TILL#19 CHANGES :lncluded X9$ as 'CITIPBG' for 'CITIUS' x9$ conditions. 
26-FEB-2009 FLEXCUBE V.CL RELEASE 7.5 USRETRO TILL#5187 Sequence population for message generation
08-AUG-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIAPAC#17656 Changes : Global X9$ is parameterized instead of hardcoding SGDASPAC.
06-Jun-2016 OFCL standalone changes, commented not required code. Search string--- OFCL12.2 Not required
26165774  FCUBS and OFCL cannot have same process code so replaced MSOG BY OLMS

**  Changed By         :Akhila Samson
**  Changed on         :23-Mar-2022
**  Change Description :Changes done to as per the Autonomous DB .
**  Search String      :AutonomousDB_Changes
**
**  Changed By         :Akhila Samson
**  Changed on         :27-Jun-2023
**  Change Description :Changing to editioning view name instead of synonym.
**  Search String      :Bug#35222052
*/
before INSERT on --oltbs_dly_msg_out --Bug#35222052
oltb_dly_msg_out --Bug#35222052
FOR each row


declare
bg_stat		CHAR(1);
serno			VARCHAR2(4);
err_code		ertbs_msgs.err_code%TYPE;
cur_date		DATE;
stat			VARCHAR2(1);
cnt			INTEGER;
l_node			VARCHAR2(30);                ----CITIPLC Retroe SFR 142 30-May-2001
-- 02.AUG.2002 FCC4.1 Oct2002 PLNCITI TILL# 4388
pparstmts		VARCHAR2(100);
pseqno		NUMBER;
--FCC4.4 DEC 2003 MS changes start
l_custom_ref_no		oltbs_contract.custom_ref_no%TYPE;
err_param			VARCHAR2(1000);
--FCC4.4 DEC 2003 MS changes end
--FCC V.CL 7.3 UK CONSOLIDATION RETRO starts
--19-JUL-2005 FCC 4.6.2 JUL 2005 LS-67 for settlement pickup ends
l_agent_cif				oltbs_contract_master.agent_cif%TYPE; 
--19-JUL-2005 FCC 4.6.2 JUL 2005 LS-67 for settlement pickup starts
--FCC V.CL 7.3 UK CONSOLIDATION RETRO ends
--03-dec-2007 FCC V.CL Release 7.3 ITR1 sfr#276,Message Generation Offline Changes, MANAS   starts
l_seq				NUMBER;
l_sql_stmt			VARCHAR2(500);
--03-dec-2007 FCC V.CL Release 7.3 ITR1 sfr#276,Message Generation Offline Changes, MANAS   ends
--26-FEB-2009 FLEXCUBE V.CL RELEASE 7.5 USRETRO TILL#5187 Sequence population for message generation starts
l_new_seq	NUMBER;
l_no_of_jobs	NUMBER;
--26-FEB-2009 FLEXCUBE V.CL RELEASE 7.5 USRETRO TILL#5187 Sequence population for message generation ends
l_apac_bg_stat		oltbs_loan_param_detail.param_value%TYPE; --08-AUG-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIAPAC#17656 Changes here
BEGIN
	debug.pr_debug('OL','Before SELECT');
   --
   --FCC4.4 DEC 2003 MS changes start
   --
   --	BEGIN
   -- debug.pr_debug('OL','Before SELECT');
   --		SELECT count(*) INTO cnt
   --		FROM oltbs_msg_hold
   --		WHERE NVL(branch, :new.branch) = :new.branch AND
   --			NVL(customer, :new.receiver) = :new.receiver AND
   --			NVL(media, :new.media) = :new.media AND
   --			NVL(ccy, :new.ccy) = :new.ccy AND
   --			NVL(product, :new.product) = :new.product AND
   --			NVL(msg_type, :new.msg_type) = :new.msg_type;
   --	EXCEPTION
   --		WHEN NO_DATA_FOUND THEN
   --			debug.pr_debug('OL','IN no data found');
   --		debug.pr_debug('OL','IN no data found');
   --		cnt := 0;
   --	END;
   -- debug.pr_debug('OL',cnt);

   --debug.pr_debug('OL',cnt);
   -- IF cnt <> 0
   --	THEN
   --		stat := 'H';
   --	ELSE
   --		stat := 'N';
   --	END IF;
   --
   --FCC4.4 DEC 2003 MS changes end
   --

	IF :new.msg_status IS NULL
	THEN
		--:new.msg_status := stat;
		:new.msg_status := 'N';  --FCC4.4 DEC 2003 MS changes
	ELSE
		NULL;
	END IF;
	-- Fcc 4.3 OPS Changes start
	--Rename changes starts
	--commented sypks_global call
	--:new.department_code	:=	sypks_global.current_department;
	--Rename changes ends
	-- Fcc 4.3 OPS Changes ends

	--FCC4.4 DEC 2003 MS changes start
	IF :new.counterparty IS NULL OR :new.custom_ref_no IS NULL
	THEN
		IF :new.msg_type LIKE 'ACST_%' OR :new.msg_type = 'ACCENTRY_DETAIL'
		THEN
			l_custom_ref_no := :new.reference_no;
			BEGIN
				/*SELECT	cust_no
				INTO		:new.counterparty
				FROM		sttms_cust_account
				WHERE		cust_ac_no	= :new.reference_no
				AND 		branch_code	= :new.branch;*/
				SELECT	cust_no
				INTO		:new.counterparty
				FROM		oltb_account
				WHERE		ac_gl_no	= :new.reference_no
				AND 		branch_code	= :new.branch;
			EXCEPTION
				WHEN NO_DATA_FOUND
				THEN
					NULL;
			END;
		ELSE
			BEGIN
				SELECT 	counterparty,
						custom_ref_no
				INTO		:new.counterparty,
						l_custom_ref_no
				FROM		oltbs_contract
				WHERE		contract_ref_no = :new.reference_no;
			EXCEPTION
				WHEN NO_DATA_FOUND
				THEN
					NULL;
			END;
--FCC V.CL 7.3 UK CONSOLIDATION RETRO starts
	  		--------------------------------------------------------------------
			--19-JUL-2005 FCC 4.6.2 JUL 2005 LS-67 for settlement pickup starts
			--------------------------------------------------------------------

			IF :new.module = 'OL' THEN
				BEGIN
					SELECT	agent_cif
					INTO	l_agent_cif
					FROM	oltbs_contract_master
					WHERE	contract_ref_no = :new.reference_no
					AND	version_no	= (	SELECT	latest_version_no
									FROM	oltbs_contract
									WHERE	contract_ref_no = :new.reference_no
								  );
				EXCEPTION
					WHEN NO_DATA_FOUND THEN 
						l_agent_cif := NULL;
						Debug.pr_debug('OL','Gem from trigger ol_oltr_dly_msg_out agent CIF is NULL');
						raise_application_error(-20001, 'No data Found for Agent CIF');
					WHEN OTHERS THEN 
						Debug.pr_debug('**','Gem from trigger ol_oltr_dly_msg_out WOT for LD fetching Agent CIF- '||SQLERRM);
						raise_application_error(-20001, 'Fail to fetch the Agent CIF');
				END;

				IF l_agent_cif IS NOT NULL THEN 
					:new.counterparty := l_agent_cif;
					Debug.pr_debug('OL','Gem from trigger ol_oltr_dly_msg_out Changed the cparty with agent CIF');
				END IF;
			END IF;
	  		--------------------------------------------------------------------
			--19-JUL-2005 FCC 4.6.2 JUL 2005 LS-67 for settlement pickup ends
			--------------------------------------------------------------------
--FCC V.CL 7.3 UK CONSOLIDATION RETRO ends

		END IF;
	END IF;

	debug.pr_debug('OL','counterparty ' || :new.counterparty);
	debug.pr_debug('OL','Custom ref no ' || l_custom_ref_no);

	IF :new.custom_ref_no IS NULL
	THEN
		debug.pr_debug('OL','New custom ref no is null');
		:new.custom_ref_no := l_custom_ref_no;
	END IF;

	debug.pr_debug('OL','New custom refno ' || :new.custom_ref_no);

	IF :new.msg_group IS NULL OR :new.generation_priority IS NULL
	THEN
		IF NOT olpkss_services_0_ms.fn_resolve_msg_group
				(
				:new.branch,
				:new.module,
				:new.msg_type,
				:new.msg_group,
				:new.generation_priority,
				err_code,
				err_param
				)
		THEN
			raise_application_error(-20001, 'Msg group resolution failed');
			debug.pr_debug('OL', 'fn_resolve_msg_group failed ');
		END IF;
	END IF;

	IF :new.delivery_channel IS NULL OR :new.hold_status IS NULL
		OR :new.interdict_status IS NULL
	THEN
		IF NOT olpkss_services_0_ms.fn_populate_msg_fields
				(
				:new.branch,
				:new.module,
				:new.msg_type,
				:new.cust_ac_no,
				:new.delivery_channel,
				:new.hold_status,
				:new.interdict_status,
				err_code,
				err_param
				)
		THEN
			raise_application_error(-20001, 'Population of Msg fields failed');
			debug.pr_debug('OL', 'fn_populate_msg_fields failed ');
		END IF;
	END IF;
	--FCC4.4 DEC 2003 MS changes end

	----CITIPLC Retroe SFR 142 30-May-2001
	SELECT node INTO l_node FROM
	oltms_branch_node WHERE branch_code = :new.branch;

	SELECT today INTO cur_date
	FROM sttms_dates
	WHERE branch_code = :new.branch;
	
-- HUFCITI TIL#1279 START ALERT TO BE SIGNALLED OTHERWISE OUT PROCESS KEEPS SLEEPING
-- FCC 4.2 APRIL 2003 CITIPLC SFR #PLC40120009 -
--Added x9$ check AND WHERE clause on node IS based on l_node AND NOT global node..
-- Fcc39 related changes start
	--08-AUG-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIAPAC#17656 Changes start here
	BEGIN
		SELECT	NVL(param_value,'N')
		INTO 	l_apac_bg_stat
		FROM 	oltbs_loan_param_detail
		WHERE	param_name = 'APAC_BG_STAT'
		AND 	module_code  = 'LB';
	EXCEPTION
	WHEN OTHERS 
	THEN         
		debug.pr_debug('GL','In wo of loan param select ol_oltr_dly_msg_out ~'||sqlerrm||'~'||sqlcode);
		l_apac_bg_stat := 'N'; 
	END;	
	--08-AUG-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIAPAC#17656 Changes end here
	--IF SYPKSS_UTILS.X9$ = 'EURCITIPLC' THEN
	--20-FEB-2009 FCC V.CL Release 7.5 CITIPBG RETRO TILL#19 CHANGES START
	--IF SYPKSS_UTILS.X9$ <> 'EURCITIPLC' and SYPKSS_UTILS.X9$ <> 'CITIUS'  -- CITIUS TIL# 7
	IF SYPKSS_UTILS.X9$ <> 'EURCITIPLC' and SYPKSS_UTILS.X9$ not in('CITIUS','CITIPBG','PLNCITI','OFCL') --26-FEB-2009 FLEXCUBE V.CL RELEASE 7.5 USRETRO TILL#5187 Sequence population for message generation included sitecode check for bangalore  
	--20-FEB-2009 FCC V.CL Release 7.5 CITIPBG RETRO TILL#19 CHANGES END
	AND l_apac_bg_stat <> 'Y' --08-AUG-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIAPAC#17656 Changes here
	THEN
		SELECT status INTO bg_stat
		FROM oltbs_bg_status
		WHERE process = 'OUT'
	--	AND node = l_node; ----CITIPLC Retroe SFR 142 30-May-2001
		AND node = l_node -- FCC 4.2 APRIL 2003 CITIPLC SFR #PLC40120009
		AND seq_no=:new.seq_no	;--FCC 4.5 LOT2
    		--CITIPLC VIENNA SFR NO 5
	--	AND node = global.node;

		IF bg_stat = 'Y'
		THEN
			--dbms_alert.signal('msg_handoff_alert',''); --AutonomousDB_Changes
			debug.pr_debug('OL', 'Trigger on dly_msg_out - alert sent ');
		END IF;

	END IF;   -- FCC 4.2 APRIL 2003 CITIPLC SFR #PLC40120009
	-- HUFCITI TIL#1279 END
	-- CITIPLC SFR PLC4006038  END
	-- Fcc39 related changes ends

	IF :new.dcn IS NULL
	THEN
	    --26165774 changes MSOG is replaced by OLMS
		IF NOT olpkss_trpks.fn_get_process_refno(:new.branch, 'OLMS', cur_date, serno, :new.dcn, err_code)
		THEN
			raise_application_error(-20001, 'DCN could NOT be got');
			debug.pr_debug('OL', 'DCN generation bombed ');
		END IF;
	END IF;
/* USDFBME Easwaran N Testing_status calculation moved FROM here to
   messaage generation point as media IS NOT resolved here. */
	IF :new.testing_status IS NULL
	THEN
		:new.testing_status := 'N';
	END IF;
/* END OF modification */
debug.pr_debug('OL', 'EMS-TKEY: (B) Testing status = '||:new.testing_status||' Media = '||:new.media) ;
	IF :new.running_no IS NULL
	THEN
		:new.running_no := 1;
	END IF;
	IF :new.auth_stat IS NULL
	THEN
		:new.auth_stat := 'A';
	END IF;
-- FCC V.CL 7.3 UK CONSOLIDATION RETRO starts
-- 31-Aug-2007 FCC-7.3-RETRO-CITIUK-4.4-RETRO#145(PLC44120039) change start
	IF :new.rtgs_rep_stat IS NULL  
	THEN
		:new.rtgs_rep_stat := 'N';
	END IF;
-- 31-Aug-2007 FCC-7.3-RETRO-CITIUK-4.4-RETRO#145(PLC44120039) change end
-- FCC V.CL 7.3 UK CONSOLIDATION RETRO ends

-- 02.AUG.2002 FCC 4.0 Oct 2002 PLNCITI TILL# 4388 Changes start
	-- Changes FOR parallel stmt generation
		-- 19/09/2003 PLC43050040 Added PLCITI check here
		--IF :new.seq_no=0 THEN 

		IF (SYPKSS_UTILS.X9$ IN ('PLNCITI','OFCL')) AND :new.seq_no=0 THEN
			BEGIN
				SELECT Param_val INTO pParStmts FROM cstb_param WHERE param_name='STMT_PARALLEL';
			EXCEPTION
				WHEN OTHERS THEN
				pparstmts := 1;
			END;
		ELSE
			--FCC 4.5 LOT2 changes for MS parallelization
			debug.pr_debug('OL','parallel jobs'||olpkss_messaging.g_parallel_jobs);
			pParstmts	:=olpkss_messaging.g_parallel_jobs;
		END IF;

		--26-FEB-2009 FLEXCUBE V.CL RELEASE 7.5 USRETRO TILL#5187 Sequence population for message generation starts
		IF SYPKSS_UTILS.X9$ = 'CITIUS' 
		THEN
			IF :new.seq_no IS NULL and :new.generate_on_input='Y'
			THEN
				debug.pr_debug( 'OL', 'seq is null...generating seq_no' );
				debug.pr_debug( 'OL', 'seq_no : ' || olpks_adv_misc.pkg_gmsg_seqno );
				:new.seq_no	:= olpks_adv_misc.pkg_gmsg_seqno;
				debug.pr_debug( 'OL', 'seq_no : ' || :new.seq_no );
			
			ELSE
				debug.pr_debug( 'OL', 'seq is null...generating seq_no generate_input no' );

				BEGIN
					SELECT 	param_val
					INTO	l_no_of_jobs
					FROM 	cstbs_param
					WHERE 	param_name = 'OFFLINE_MSG_GEN_JOBS_NO';
				EXCEPTION
				WHEN OTHERS THEN
					l_no_of_jobs:= 0;
				END;
				debug.pr_debug( 'OL', 'l_no_of_jobs '||l_no_of_jobs );
				IF l_no_of_jobs<>0
				THEN
					SELECT 	MOD(msg_seq_no.nextval,l_no_of_jobs)+1
					INTO	l_new_seq	
					FROM 	dual;

					debug.pr_debug( 'OL', 'l_new_seq '||l_new_seq );
					:new.seq_no := l_new_seq;
				END IF;
			END IF;
		ELSE
		--26-FEB-2009 FLEXCUBE V.CL RELEASE 7.5 USRETRO TILL#5187 Sequence population for message generation ends	
			BEGIN
				-- Start:CEEMEA SFR #9467: Fix FOR parallel statement generation
				--SELECT mod(TRSQ_MSGS_SEQ.Nextval,pParStmts)+1 INTO pSeqNo FROM dual;
				SELECT
				MOD ( ascii( SUBSTR(:new.reference_no, LENGTH(:new.reference_no), 1) ) , pParStmts ) + 1
				INTO pSeqNo
				FROM Dual;
				-- END:CEEMEA SFR #9467: Fix FOR parallel statement generation
			EXCEPTION
				WHEN OTHERS THEN
				raise_application_error(-20001, 'Sequence TRSQ_MSGS_SEQ Missing');
			END;
			:new.seq_no := pSeqNo;
		END IF; --26-FEB-2009 FLEXCUBE V.CL RELEASE 7.5 USRETRO TILL#5187 Sequence population for message generation added
	-- 02.AUG.2002 FCC 4.0 Oct 2002 PLNCITI TILL# 4388 Changes END.
  
	EXCEPTION
		WHEN OTHERS THEN
			debug.pr_debug('OL', ' trg handoff - OTHERS '||TO_CHAR(sqlcode)||' '||SQLERRM);
			raise;
	END ;
/