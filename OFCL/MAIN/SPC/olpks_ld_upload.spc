CREATE OR REPLACE PACKAGE olpks_ld_upload AS

/*----------------------------------------------------------------------------------------
  **
  ** File Name    : olpks_ld_upload.SPC
  **
  ** Module       : LOANS and DEPOSITS
  **
	This source is part of the Oracle Banking Corporate Lending  Software Product.
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates.

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East),
	Mumbai - 400 063, India.
  ----------------------------------------------------------------------------------------
  */
/*
CHANGE HISTORY
DATE		VERSION NO	CODE		DESCRIPTION
14-FEB-2001  FCC 3.9			Added 2 new package variables - gRecInd , gPayInd
02-JUL-03  FCC 4.3 AUG 2003  CEEMEA Changes for TIDE  added one more new function fn_upload_contract
for usiing the PL-SQL tables
15-JUL-2003 FCC 4.3 MM Module changes.. Converted physical tables to plsql tables for better performance.
28-OCT-2003 FCC 4.4 DEC 2003 :Fast Settlment changes Added function fn_upload_contracts
28-OCT-2003 FCC 4.4 DEC 2003 :Fast Settlment changes Added function fn_mmupload_amend
08-DEC-2003 FCC 4.4 DEC 2003 :Fast Settlement Changes Added function fn_mmupload_amend (with parameter p_cstbs_contractis_Rec)
27-DEC-2003 FCC 4.4 DEC 2003 :Added new funciton fn_mmupload_amend for both old and new SETTLEMENTS
27-JAN-2004 FCC 4.4 Added new parameter p_ldtbs_upload_master_rec to function fn_mmupload_amend and
			  removed parameter p_contract_ref_no
24-JAN-2005 FCC 4.6.1 JAN 2005 SR Upload changes. Search for '24-JAN-2005 FCC 4.6.1'
19-OCT-2007 FCC V.CL 7.3 UK CONSOLIDATION RETRO
30-OCT-2007 FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-236
			09-JUN-2005 for CITIUS, Till#236, fn_upload_reserve_for_a_source  fn_upload_reserve_for_a_cont added in ldupload
12-NOV-07   FLEXCUBE V.CL RELEASE 7.3 STP Changes sifted all the function declration from package body to package specification
20-JUL-2008 FCC V.CL Release 7.4 <FS LOT #2> <for posting accounting entry for the event 'CADJ' Related Changes>
06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS#1411,STP Consolidation,By Swapnasish,Adjustment Entery Posting Enhancement, Fixing
19-FEB-2009 FCC V.CL Release 7.5 CITIPBG  RETRO #13,Added Overloaded function fn_upload to include seq_no as an argument
26-MAR-2009 FLEXCUBE V.CL Release 7.5 lot1 ITR1 SFR#25,Moved fn_validate_limit to spc
09-FEB-2010 CITIUS-LS#7125, S2 Price Adjustment Changes
			04-NOV-2009 FCC V.CL RELEASE 7.5 LOT1.2, S2 Price Adjustment Changes
25-OCT-2010 CITIUS-LS#7518 Release 7.7 Retro.
	07-DEC-2009 FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION changes,
		a) 16-MAY-2009 FLEXCUBE V.CL Release 7.5 lot2 FS Tag23 changes, new function introduced for fee amendment upload
		b) 04-Jun-2009 FLEXCUBE V.CL Release 7.5 lot2 ITR1 SFR#30 , Entity upload related changes
25-MAY-2011 Flexcube V.CL Release 7.9, Adjustments Changes
20-JUN-2011 Flexcube V.CL Release 7.9, Adjustments Changes IUT#47 : Added parameters to fn_adj_process
15-JUL-2011 Flexcube V.CL Release 7.9, FS Vol2 Tag 10 ITR1 SFR#147 Changes : Added serial_no to fn_adj_validate to avoid duplication
27-JUL-2011 Flexcube V.CL Release 7.9, FS Vol2 Tag 10 ITR2#3 Changes : Added branch as input parameters
18-MAY-2012 Flexcube V.CL Release 7.11,FS Volume-01 Tag06 Changes :  Added component in input parameters to validate it.
31-JUL-2012 Flexcube V.CL Release 7.11, Retro,CITIUS#13970 JIRA 150080-6250/6253/6254   Changes -S2 adjusmtent changes
----------------------------------------------------------------------------------------------------
**Changed By         : Abhik Das
**Date               : 25-Apr-2023
**Change Description : Removed second declaration of gCubeRefNo variable
**Search String      : OBCL_14.6_CCD_Bug#35316300_Changes

    Changed By         : Sowmya Bitra
    Date               : 13-Aug-2024
    Change Description : OBCL_14.8_VER_ROL_LS Changes
    Search String      : OBCL_14.8_VER_ROL_LS Changes 
	
**Changed By         : Akhila Samson
**Date               : 30-Oct-2024
**Change Description : Added Fn_Upload_Row declaration
**Search String      : Bug#37162290
*/


gErrList		VARCHAR2(10000);
gErrParamList		VARCHAR2(10000);

gOvList			VARCHAR2(10000);
gOvParamList		VARCHAR2(10000);

gExtRefNo		oltbs_upload_master.ext_contract_ref_no%TYPE;
gCubeRefNo		oltbs_contract_master.contract_Ref_no%TYPE;
gSourceCode		oltbs_upload_master.source_code%TYPE;

gOvdSeqNo		NUMBER := 0;
gErrSeqNo		NUMBER := 0;

--gCubeRefNo		VARCHAR2(16);--OBCL_14.6_CCD_Bug#35316300_Changes
gModule			oltbs_contract.module_code%TYPE;
gCparty			oltbs_contract.counterparty%TYPE;
--FCC3.9 CHANGES
gRecInd			VARCHAR2(1);
gPayInd			VARCHAR2(1);
--End FCC3.9 Changes
TYPE tbl_upl_sch IS TABLE OF oltbs_upload_schedules%ROWTYPE INDEX BY BINARY_INTEGER; --FCC 4.3 MM Module changes..
TYPE tbl_upl_linkages IS TABLE OF oltbs_upload_linkages%ROWTYPE INDEX BY BINARY_INTEGER; --FCC 4.3 MM Module changes..
--TYPE tbl_repo_blocks IS TABLE OF setbs_upload_repo_blocks%ROWTYPE INDEX BY BINARY_INTEGER;--24-JAN-2005 FCC 4.6.1 JAN 2005 SR Upload changes.
FUNCTION fn_upload
			(
			pModule			IN		oltbs_contract.module_code%TYPE,
			pImpMode			IN		VARCHAR2
			)
RETURN BOOLEAN;


--27-DEC-2003 FCC 4.4 DEC 2003 ITR2 CHANGE STARTS
FUNCTION fn_upload_contract
	(
	psourcecode      		IN      	oltbs_upload_master.source_code%TYPE,
	pextrefno        		IN      	oltbs_upload_master.ext_contract_ref_no%TYPE,
	pimpmode         		IN      	VARCHAR2,
	pcuberefno       		OUT     	oltbs_contract.contract_ref_no%TYPE, --02-JUL-03  FCC 4.3 AUG 2003  CEEMEA Changes FOR TIDE
	p_masterec       		IN      	oltbs_upload_master%ROWTYPE,
	tbl_upload_schedules 	IN OUT  	tbl_upl_sch, --plsql
	tbl_upload_linkages  	IN OUT  	tbl_upl_linkages, --plsql
	p_mis_rec        		IN      	oltbs_upload_class_mapping%ROWTYPE,
	tb_udf           		IN      	olpkss_upload_ud.tbl_udf_type,
	tb_settle        		IN      	olpkss_upload.tbl_settle_type	,
	p_contractis_record	IN      	oltbs_contractis_cs%ROWTYPE,
	tb_interest      		IN      	lfpkss_upload.tbl_interest_type,
	ppostimpstatus   		OUT     	VARCHAR2, --02-JUL-03  FCC 4.3 AUG 2003  CEEMEA Changes FOR TIDE
	perrorcode       		IN OUT  	VARCHAR2,
	perrorparams     		IN OUT  	VARCHAR2
	)
	RETURN BOOLEAN;
--27-DEC-2003 FCC 4.4 DEC 2003 ITR2 CHANGE ENDS

--24-JAN-2005 FCC 4.6.1 JAN 2005 SR Upload changes starts

-- OFCL12.2
/*FUNCTION fn_upload_contract
	(
	psourcecode      		IN      	oltbs_upload_master.source_code%TYPE,
	pextrefno        		IN      	oltbs_upload_master.ext_contract_ref_no%TYPE,
	pimpmode         		IN      	VARCHAR2,
	pcuberefno       		OUT     	oltbs_contract.contract_ref_no%TYPE,
	p_masterec       		IN      	oltbs_upload_master%ROWTYPE,
	tbl_upload_schedules 		IN OUT  	tbl_upl_sch,
	tbl_upload_linkages  		IN OUT  	tbl_upl_linkages,
	p_mis_rec        		IN      	oltbs_upload_class_mapping%ROWTYPE,
	tb_udf           		IN      	olpkss_upload_ud.tbl_udf_type,
	tb_settle        		IN      	olpkss_upload.tbl_settle_type	,
	p_contractis_record		IN      	oltbs_contractis_cs%ROWTYPE,
	tb_interest      		IN      	lfpkss_upload.tbl_interest_type,
    p_tbl_repo              	IN  		tbl_repo_blocks,
	ppostimpstatus   		OUT     	VARCHAR2,
	perrorcode       		IN OUT  	VARCHAR2,
	perrorparams     		IN OUT  	VARCHAR2
	)
RETURN BOOLEAN;*/
-- OFCL12.2

--24-JAN-2005 FCC 4.6.1 JAN 2005 SR Upload changes ends

FUNCTION fn_upload_contract
		(
		pSourceCode		IN				oltbs_upload_master.source_code%TYPE,
		pExtRefNo		IN				oltbs_upload_master.ext_contract_ref_no%TYPE,
		pImpMode			IN				VARCHAR2,
		pCubeRefNo		OUT			oltbs_contract.contract_ref_no%TYPE,
		pErrorCode		IN OUT		VARCHAR2,
		pErrorParams	IN OUT		VARCHAR2
		)
RETURN BOOLEAN;

FUNCTION fn_get_avl_balance
		(
		pUpLinkRec	IN OUT	oltbs_upload_linkages%ROWTYPE,
		pCurrency	IN			oltbs_upload_master.currency%TYPE
		)
RETURN BOOLEAN;

FUNCTION fn_date_validations(pMastRec	IN	oltbs_upload_master%ROWTYPE)
RETURN BOOLEAN;
  --OBCL_14.0__ACC_COLLETRAL_LINK changes start
function fn_ACC_COLLETRAL_LINK(psourcecode     IN OLTBS_UPLOAD_ACC_COLL_LINK_DTL.source_code%TYPE,
                              pextrefno         IN  oltbs_upload_master.ext_contract_ref_no%TYPE,
                              pcontractrefno     IN  oltbs_upload_master.ext_contract_ref_no%TYPE,
                              pversionnumber     IN  oltbs_contract.latest_version_no%TYPE,
                              p_BRANCH_CODE      IN OLTB_ACC_COLL_LINK_DTLS.BRANCH_CODE%type
)
RETURN BOOLEAN;
  --OBCL_14.0__ACC_COLLETRAL_LINK changes END
FUNCTION fn_explode_schedules
		(
		pCubeRefNo	IN	oltbs_contract.contract_Ref_no%TYPE,
		pUpMastRec	IN	oltbs_upload_master%ROWTYPE,
		pMAinComp	IN	oltbs_contract_master.MAin_Comp%TYPE
		)
RETURN BOOLEAN;

PROCEDURE pr_append_errlist(
			pErrorCode		IN	VARCHAR2,
			pErrorParams	IN	VARCHAR2
			);

PROCEDURE pr_append_ovlist(
			pOvCode			IN	VARCHAR2,
			pOvParams		IN	VARCHAR2
			);

PROCEDURE pr_update_exceptions
			(
			pExcepList			IN	VARCHAR2,
			pExcepParamList	IN	VARCHAR2
			);

--Flexml2.0 Changes
FUNCTION fn_upload_a_contract
	(	p_module		IN		VARCHAR2
	,	p_auto_auth		IN		VARCHAR2
	,	p_source_code	IN		VARCHAR2
	,	p_external_ref_no	IN 		VARCHAR2
	,	p_branch		IN		VARCHAR2
	,	p_impmode		IN		VARCHAR2
	,	p_upload_status	IN		VARCHAR2
	,	p_error_code	IN OUT	VARCHAR2
	,	p_error_parameter	IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_upload_contract
	(
	pImpMode				IN		VARCHAR2,
	--change for Kondor starts
	p_auto_auth				IN		oltbs_contract.auth_status%TYPE,
	--change for Kondor ends
     	p_upload_status			IN		oltbs_upload_log_cs.post_upload_status%TYPE,
	p_upload_contract_record	IN OUT	olvws_upload_contract_master%ROWTYPE,
	p_uploaded_auth			IN OUT	oltbs_upload_log_cs.uploaded_auth%TYPE,
	p_uploaded_unauth			IN OUT	oltbs_upload_log_cs.uploaded_unauth%TYPE,
	p_uploaded_hold			IN OUT	oltbs_upload_log_cs.uploaded_hold%TYPE,
	p_error_code			IN OUT	VARCHAR2,
	p_error_parameter			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_date_validations
	(
	pMastRec		IN		olvws_upload_contract_master%ROWTYPE,
	p_error_code	IN OUT	VARCHAR2,
	p_error_parameter	IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_explode_schedules
		(
		pCubeRefNo		IN		oltbs_contract.contract_Ref_no%TYPE,
		pUpMastRec		IN		olvws_upload_contract_master%ROWTYPE,
		pMainComp		IN		oltbs_contract_master.main_comp%TYPE,
		p_error_code	IN OUT	VARCHAR2,
		p_error_parameter	IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

FUNCTION fn_get_avl_balance
		(
		pCurrency		IN		oltbs_upload_master.currency%TYPE,
		pUpLinkRec		IN OUT	oltbs_upload_linkages%ROWTYPE,
		p_error_code	IN OUT	VARCHAR2,
		p_error_parameter	IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

--end Flexml2.0 changes

--27-DEC-2003 FCC 4.4 DEC 2003 CHANGES STARTS
FUNCTION fn_mmupload_amend
(
	--27-JAN-2004 CITI 4.4 CHANGE STARTS
	p_ldtbs_upload_master_rec	IN OUT	oltbs_upload_master%ROWTYPE	,
	--27-JAN-2004 CITI 4.4 CHANGE ENDS
	p_contract_ref_no		IN		VARCHAR2				,--27-JAN-2004 CITI 4.4 CHANGE
	p_tbl_settle			IN		olpkss_upload.tbl_settle_type	,
	p_cstbs_contractis_rec		IN OUT	oltbs_contractis_cs%ROWTYPE	,
	p_error_code			IN OUT	VARCHAR2				,
	p_error_parameter			IN OUT	VARCHAR2
)
RETURN BOOLEAN;
--27-DEC-2003 FCC 4.4 DEC 2003 CHANGES ENDS
--30-OCT-2007 FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-236 Start
--VB adition start on 09-JUN-2005 for CITIUS, Till#236
Function fn_upload_reserve_for_a_source
		(	p_source_code	IN 		VARCHAR2
		,	p_err			IN OUT	VARCHAR2
		,	p_prm			IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

Function fn_upload_reserve_for_a_cont
		(	p_reserve_contract_rec	IN	oltbs_upload_reserve%ROWTYPE
		,	p_err				IN OUT	VARCHAR2
		,	p_prm				IN OUT	VARCHAR2
		)
RETURN BOOLEAN;
--VB adition end on 09-JUN-2005 for CITIUS, Till#236
--30-OCT-2007 FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-236 End
--FCC V.CL Release 7.3 STP changes starts
FUNCTION fn_product_validations
		(
		pimpmode                   		IN       	VARCHAR2,
		p_tax_applicable          		OUT      	oltms_product_master_ld.tax_applicable%TYPE,
		p_brokerage_applicable     		OUT      	oltms_product_master_ld.brokerage_applicable%TYPE,
		p_prod_sch_type            		OUT      	oltms_product_master_ld.prod_sch_type%TYPE,
		p_upload_contract_record   		IN OUT  	olvws_upload_contract_master%ROWTYPE,
		p_error_code               		IN OUT  	VARCHAR2,
		p_error_parameter          		IN OUT  	VARCHAR2
		)
		RETURN BOOLEAN;

FUNCTION fn_contract_validations
		(
		pimpmode                   		IN       	VARCHAR2,
		p_upload_contract_record   		IN       	olvws_upload_contract_master%ROWTYPE,
		p_error_code               		IN OUT   	VARCHAR2,
		p_error_parameter          		IN OUT   	VARCHAR2
		)
		RETURN BOOLEAN;

FUNCTION fn_preference_validations
		(
		pimpmode                   IN       VARCHAR2,
		p_upload_contract_record   IN       olvws_upload_contract_master%ROWTYPE,
		p_prod_sch_type            IN       oltms_product_master_ld.prod_sch_type%TYPE,
		p_error_code               IN OUT   VARCHAR2,
		p_error_parameter          IN OUT   VARCHAR2
		)
		RETURN BOOLEAN;

FUNCTION fn_rollover_validations
		(
		pimpmode                   IN       VARCHAR2,
		p_upload_contract_record   IN       olvws_upload_contract_master%ROWTYPE,
		p_error_code               IN OUT   VARCHAR2,
		p_error_parameter          IN OUT   VARCHAR2
		)
		RETURN BOOLEAN;

FUNCTION fn_linkage_validations
		(
		pimpmode                   IN       VARCHAR2,
		p_upload_contract_record   IN       olvws_upload_contract_master%ROWTYPE,
		p_error_code               IN OUT   VARCHAR2,
		p_error_parameter          IN OUT   VARCHAR2
		)
		RETURN BOOLEAN;

FUNCTION fn_upload_count
		(
		p_upload_contract_record   IN       olvws_upload_contract_master%ROWTYPE,
		p_dep_count                OUT      NUMBER,
		p_com_count                OUT      NUMBER,
		p_com_amt                  OUT      NUMBER,
		p_acc_count                OUT      NUMBER,
		p_error_code               IN OUT   VARCHAR2,
		p_error_parameter          IN OUT   VARCHAR2
		)
		RETURN BOOLEAN;

FUNCTION fn_schedule_validations
		(
		pimpmode                   IN       VARCHAR2,
		p_upload_contract_record   IN       olvws_upload_contract_master%ROWTYPE,
		p_error_code               IN OUT   VARCHAR2,
		p_error_parameter          IN OUT   VARCHAR2
		)
		RETURN BOOLEAN;

FUNCTION fn_linkages_upload
		(
		p_upload_contract_record   IN       olvws_upload_contract_master%ROWTYPE,
		atag                       IN       VARCHAR2,
		p_linked_amount            OUT      NUMBER,
		p_rec_linkage              OUT      oltbs_upload_linkages%ROWTYPE,
		p_rec_schedule             OUT      oltbs_upload_schedules%ROWTYPE,
		p_error_code               IN OUT   VARCHAR2,
		p_error_parameter          IN OUT   VARCHAR2
		)
		RETURN BOOLEAN;

FUNCTION fn_populate_contract_tables
		(
		p_upload_contract_record   IN       olvws_upload_contract_master%ROWTYPE,
		po_cube_ref_no             IN       VARCHAR2,
		po_serial                  IN       VARCHAR2,
		pcontstat                  IN       VARCHAR2,
		p_lcy_eqvt                 IN       NUMBER,
		p_total_linked             IN       NUMBER,
		p_main_comp                IN       oltbs_contract_master.main_comp%TYPE,
		p_rec_linkage              IN       oltbs_upload_linkages%ROWTYPE,
		p_rec_schedule             IN       oltbs_upload_schedules%ROWTYPE,
		p_error_code               IN OUT   VARCHAR2,
		p_error_parameter          IN OUT   VARCHAR2
		)
		RETURN BOOLEAN;

FUNCTION fn_components_count
		(
		p_upload_contract_record   IN       olvws_upload_contract_master%ROWTYPE,
		p_component                IN       oltbs_upload_schedules.component%TYPE,
		p_count                    OUT      NUMBER,
		p_error_code               IN OUT   VARCHAR2,
		p_error_parameter          IN OUT   VARCHAR2
		)
		RETURN BOOLEAN;
   --20-MAR-2006 FLEXCUBE V.CL RELEASE 7.0 Upload Related Changes by Aji Starts Here
FUNCTION fn_calc_schedule_end_date
    		(
    		p_start_date                IN oltbs_upload_schedules.start_date%type,
    		p_frequency                 IN oltbs_upload_schedules.frequency%type,
    		p_no_of_schedules           IN oltbs_upload_schedules.no_of_schedules%type,
    		p_frequency_unit            IN oltbs_upload_schedules.frequency_unit%type,
    		p_end_date                 OUT oltbs_upload_schedules.end_date%type
		)
    		RETURN BOOLEAN;

   FUNCTION fn_int_rate_fixing_validations
		(
      	p_upload_contract_record   IN  oltbs_upload_master%ROWTYPE,
 		lo_cube_ref_no             IN  VARCHAR2,
      	p_error_code               IN OUT   VARCHAR2,
      	p_error_parameter          IN OUT   VARCHAR2
   		)
            RETURN BOOLEAN;
           ---FCC V.CL Release 7.3 STP changes ends

--20-JUL-2008 FCC V.CL Release 7.4 <FS LOT #2> <for posting accounting entry for the event 'CADJ' Related Changes> STARTS
FUNCTION fn_adj_validate(
						p_contract_ref_no 	IN OLTB_CONTRACT_MASTER.contract_ref_no%type
                         ,p_batch_no        IN OLTB_UPLOAD_ADJUSTMENT.batch_no%type
						 ,p_serial_no		IN OLTB_UPLOAD_ADJUSTMENT.serial_no%type --15-JUL-2011 Flexcube V.CL Release 7.9, FS Vol2 Tag 10 ITR1 SFR#147 Changes
                         ,p_adj_value_dt 	IN OLTB_CONTRACT_MASTER.value_date%type
                         ,p_adj_amount 		IN OLTB_UPLOAD_ADJUSTMENT.adjustment_amount%type
                         ,p_dr_gl_ac  		IN OLTB_UPLOAD_ADJUSTMENT.dr_gl_ac%type
                         ,p_cr_gl_ac 		IN OLTB_UPLOAD_ADJUSTMENT.dr_gl_ac%type
                         --25-MAY-2011 Flexcube V.CL Release 7.9, Adjustments Changes Starts
						 ,p_adjustment_type	IN OLTB_UPLOAD_ADJUSTMENT.adjustment_type%type
						 ,p_instrument_no	IN OLTB_UPLOAD_ADJUSTMENT.instrument_no%type
						 ,p_reversal		IN OLTB_UPLOAD_ADJUSTMENT.reversal%type
						 --25-MAY-2011 Flexcube V.CL Release 7.9, Adjustments Changes Ends
						 --27-JUL-2011 Flexcube V.CL Release 7.9, FS Vol2 Tag 10 ITR2#3 Changes Starts
						 ,p_dr_ac_br			IN 		OLTB_UPLOAD_ADJUSTMENT.dr_acc_branch%type
						 ,p_cr_ac_br			IN 		OLTB_UPLOAD_ADJUSTMENT.cr_acc_branch%type
						 --27-JUL-2011 Flexcube V.CL Release 7.9, FS Vol2 Tag 10 ITR2#3 Changes Ends
                         			 ,p_component		IN  OLTB_UPLOAD_ADJUSTMENT.component%type --18-MAY-2012 Flexcube V.CL Release 7.11,FS Volume-01 Tag06 Changes
                         			 ,p_s2_Adjustment	In			OLTB_UPLOAD_ADJUSTMENT.s2_Adjustment%TYPE --31-JUL-2012 CITIUS#13970 Changes
                         ,p_err_code		OUT ertbs_msgs.err_code%TYPE
                         ,p_err_param		OUT varchar2
                         ,p_err_msg		OUT varchar2
                        )
RETURN boolean;

FUNCTION fn_adj_process(
      			p_batch_no 		in 	oltbs_upload_adjustment.BATCH_NO%TYPE,
			p_contract_ref_no 	in 	oltbs_contract.contract_ref_no%type,
			p_value_date 		in 	oltbs_contract_master.value_date%type,
			p_dr_account 		in 	oltbs_upload_adjustment.dr_gl_ac%type,
			p_amount 		in 	oltbs_contract_master.amount%type,
			p_cr_account 		in 	OLTB_UPLOAD_ADJUSTMENT.cr_gl_ac%type,
			--20-JUN-2011 Flexcube V.CL Release 7.9, Adjustments Changes IUT#47 Starts
			p_serial_no			in OLTB_UPLOAD_ADJUSTMENT.serial_no%type,
			p_book_Date			in OLTB_UPLOAD_ADJUSTMENT.book_date%type,
			--20-JUN-2011 Flexcube V.CL Release 7.9, Adjustments Changes IUT#47 Ends
      			p_err_code 		in 	out ertbs_msgs.err_code%type,
      			p_err_param  		in out 	varchar2,
      			p_err_msg 		in out 	varchar2
 			)
RETURN boolean;
FUNCTION fn_acc_upload (
			p_batch_no in OLTB_UPLOAD_ADJUSTMENT.batch_no%type
			,p_err_code in out ertbs_msgs.err_code%type
			,p_err_msg in out ertbs_msgs.message%type
			,P_err_param in out varchar2
		        )
RETURN boolean;
--06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS#1411 Start By Swapnasish
--CITIUS-LS#1411,changes.Starts
PROCEDURE pr_adj_log_exception
(	p_contract_ref_no	IN	VARCHAR2,
	p_batch_no			IN	NUMBER,
	p_rowid				IN	VARCHAR2,
	p_err_code 			IN	VARCHAR2,
	p_err_type			IN	CHAR,
	p_err_param 		IN	VARCHAR2
);
--CITIUS-LS#1411,changes.Ends
--06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS#1411 End By Swapnasish
--20-JUL-2008 FCC V.CL Release 7.4 <FS LOT #2> <for posting accounting entry for the event 'CADJ' Related Changes> ENDS
--FCC V.CL Release 7.5 CITIPBG  RETRO #13 STARTS
FUNCTION fn_upload
			(
			pModule			IN		oltbs_contract.module_code%TYPE,
			pImpMode		IN		VARCHAR2,
			pseqno			IN		oltbs_ext_contract_stat.seq_no%type
			)
RETURN BOOLEAN;
----FCC V.CL Release 7.5 CITIPBG  RETRO #13 ENDS
--26-MAR-2009 FLEXCUBE V.CL Release 7.5 lot1 ITR1 SFR#25,Moved fn_validate_limit to spc
FUNCTION fn_validate_limit(
			p_contract_ref_no  IN  oltbs_contract.contract_ref_no%type,
			p_source_code      IN  oltbs_upload_borrowers.source_code%type,
			p_branch           IN  oltbs_upload_borrowers.branch%type,
			p_amend_seq	   IN  oltbs_upload_borrowers.amend_seq_no%type,
			p_error            IN OUT varchar2,
			p_error_param      IN OUT varchar2
			)
RETURN boolean;
--26-MAR-2009 FLEXCUBE V.CL Release 7.5 lot1 ITR1 SFR#25,Moved fn_validate_limit to spc

-- CITIUS-LS#7518 BEGIN
--07-DEC-2009 FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION changes start here (Release 7.5 lot2 FS Tag23)
FUNCTION fn_fee_amendment_upload
(
p_ext_ref_no	IN lftbs_upload_fee.ext_contract_ref_no%Type,
p_source_code     IN lftbs_upload_fee.source_code%Type,
p_branch_code     IN lftbs_upload_fee.branch_code%Type,
p_err             IN OUT Varchar2,
p_err_params      IN OUT Varchar2
)
Return BOOLEAN;
--07-DEC-2009 FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION changes end here (Release 7.5 lot2 FS Tag23)

FUNCTION fn_upload_entities
			     (
			     	p_external_ref_no IN oltbs_upload_borr_entities.ext_contract_ref_no%type,
			     	p_cube_ref_no 	IN oltbs_contract.contract_ref_no%type,
			     	p_version_no  IN oltbs_contract.latest_version_no%type,
			     	p_branch_code IN oltbs_upload_borr_entities.branch%type,
			     	p_error_code IN OUT VARCHAR2,
			     	p_error_parameter IN OUT VARCHAR2
			     )
RETURN BOOLEAN;
-- CITIUS-LS#7518 END
--CITIUS-LS#7125 Starts
--04-NOV-2009 FCC V.CL RELEASE 7.5 LOT1.2, S2 Price Adjustment Changes starts

FUNCTION fn_price_adj_upld
	(
	p_branch	IN 	VARCHAR2,
	p_err_code	IN OUT	VARCHAR2,
	p_err_param	IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

--04-NOV-2009 FCC V.CL RELEASE 7.5 LOT1.2, S2 Price Adjustment Changes ends
--CITIUS-LS#7125 Ends

--OBCL_14.8_VER_ROL_LS Changes Start
FUNCTION Fn_Upload_Ver_Roll(p_Ls_Vrol_Ref_No   IN Oltbs_Contract.Contract_Ref_No%TYPE,
                              p_Part_Vrol_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                              p_Ld_Vrol_Ref_No   IN OLtbs_Contract.Contract_Ref_No%TYPE,
                              p_Err_Code         IN OUT VARCHAR2,
                              p_Err_Param        IN OUT VARCHAR2)
RETURN BOOLEAN;
--OBCL_14.8_VER_ROL_LS Changes End

--Bug#37162290 start
 FUNCTION Fn_Upload_Row(p_Source_Code     IN VARCHAR2,
                         p_External_Ref_No IN VARCHAR2,
                         p_Contract_Ref_No IN VARCHAR2,
                         p_Version_No      IN NUMBER DEFAULT 1,
                         p_Err             IN OUT VARCHAR2,
                         p_Prms            IN OUT VARCHAR2)
		 RETURN BOOLEAN;
--Bug#37162290 ends

END olpks_ld_upload;
/
CREATE OR REPLACE SYNONYM olpkss_upload_ld FOR olpks_ld_upload
/
CREATE OR REPLACE SYNONYM olpkss_ld_upload FOR olpks_ld_upload
/