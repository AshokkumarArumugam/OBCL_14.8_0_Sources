create or replace PACKAGE olpks_utils
AS

/*---------------------------------------------------------------------------------
**
** File Name	: olpks_utils.SPC
**
** Module	: DERIVATIVES
**
**
This source is part of the Oracle Banking Corporate Lending  Software Product.
Copyright Ã‚Â© 2019 , Oracle and/or its affiliates.  All rights reserved.
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates.

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East),
Mumbai - 400 063, India.

----------------------------------------------------------------------------------------
*/
/*	CHANGE HISTORY
--	1.fcc333c changes new functions added
-- 	20-OCT-2001	 PLNCITI TIL 558 New Functions added - fn_pc_esn, fn_check_holiday, fn_pc_bank_param, fn_get_nwd, fn_ac_prod_lookup, fn_pc_prod_lookup

07-FEB-2002	FCC3.9 PLNCITI SFR NO 3822	Added a new function get_cust_no
20-feb-2002	IT ROUND1 SFR 245 A/c revaluation is not updating gltb_misbal for trading P/L GLs.

14-AUG-2002	FCC 4.0 DD - Tuning Changes. Added new functions here.
15-OCT-2002 FCC 4.1 OCT 2002 DD - Tuning Changes. Added FUNCTION fn_pc_clring_netwk
22-SEP-2003 FCC4.3.1 OCT 2003 Interface changes. Added new functions.
14-oct-2003 FCC 4.3.1. oct 2003 RTGS Changes
31-OCT-2003	FCC 4.3.1 Oct 2003 Tuning Changes add function_id as IN parameter
17-DEC-2003 FCC 4.4 DEC2003 CHANGES FOR ITR1 SFR 137 VOLPERT New Function for getting OLTM_PRODUCT_AMOUNTTAG_TYPE
10-FEB-2004 RETRO CHANGES FCC 4.5 APR 2004 ROMCITI TIL#1038 Added Function fn_get_xcup_transouc_record
26-MAR-2004 FCC 4.5 APR 2004 PLNCITI TIL#9883 MIS data collection on branch PL1 failed with error MI-MTH06
			--Tuning changes
11-APR-2004	FCC4.5 Lot2 Apr 2004 retro Trestel Tuning Changes..

22-Apr-2004 FCC 4.5 APR 2004  9973 CEEMEA Changes- Added a new function fn_get_upload_source_rec to get pctms_upload_source record details.
12-MAY-2004 FCC4.5 Lot2 MAY2004 Performance Tuning Changes.Added new functions.

22-JUN-2004 FCC 4.6 AUG 2004   HUFCITI#1164 Auto authorisation of MM contracts based on source code maintenance.
08-JUL-2004 FCC 4.6 SEP 2004  Oracle Forms 9i migration
04-Aug-2004 FCC4.6 sep04 Retro(India) 22-APR-2004	FCC4.4.1 APR2004 ITR1 SFR NO 207	fn_get_altac_record Function added to get the custoemr record based on alt_ac_no

31-AUG-2004 FCC 4.6 SEP 2004 RELEASE Impact of EU Enlargement on Population of Field 33B  Field 59 in MT103 / M103+
		Added new function fn_get_country_rec

27-SEP-2004 FCC 4.6 SEP 2004 IRIS upload changes.
10-JAN-2006 Flexcube V CL Release 7.1, Changes by MIThilesh, Removed Self reference of Synonym
06-NOV-2008 CITIUS-LS#SRT1451 PLC46060054,STP Consolidation,By Swapnasish,TR31 Tuning Changes.
			1.Added credit_card_allowed in g_account_cl_rec.
			2.Added function get_ertb_msgs

06-NOV-2008 CITIUS-LS#SRT1451 PLC46100043,STP Consolidation,By Swapnasish,Changes towards EXP-OUC Derivation in ITR5 Upload and the ITR31 Upload
06-NOV-2008 CITIUS-LS#SRT1451 CITIUS Till#1119,STP Consolidation,By Swapnasish,Qmemo changes.
31-MAR-2010 FLEXCUBE V.CL Release 7.6 CITIPBG CASA Changes,Changes done in type g_account_cl_rec to 2 new column
29-JUN-2010 FLEXCUBE V.CL Release 7.7 CITIPBG CASA Vol1 tag#4,New function fn_get_accls_rec is added to get the account class record
12-Sep-2011 UK Single Instance - DB Consolidation -- EURCITIPLC-LS_LD#11322 -- UK Single Instance Agency/Originations/SLT DB Consolidation
17-JUN-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 RETRO CITIUS#19836 Conversion to translation - new function added.
15-OCT-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 EURCITIPLC#20076 Changes: Added new function fn_get_agency_module.
06-Jun-2016 OFCL standalone changes, commented not required code. Search string--- OFCL12.2 Not required
29-Aug-2016 -- OFCL12.2 Not Required changes
21-Sep-2016 OFCL12.2 changes added a new function to retrieve the loan param detail value for the given parameter
23-SEP-2016 OFCL12.2 changes added to get nls parameters.
23-SEP-2016 OFCL12.2 changes added params ops and workflow
05-OCT-2016 -- Search String :OFCL12.3 CHANGES , end_of_input column is fetched from sttms_core_branch_status instead of oltms_branch
16-SEP-2019 -- Search String :SFR#29959798 OBCL_14.4_Ticket_Settlement_Message_Director
Search String :OBCL_14.5_RuleBasedAccounting , Added changes to get the accounting entries based on the accounting rules that gets satisfied wihich are defined at product level.
Search String :OBCL_14.5_RuleBsedRoleToHeadMapping , Added changes to derive the Account head for User Defined Map type.
Search String :Bug#33574859 
20-DEC-2021 -- Search String:Bug#33674705, Added new function to check the rule based maintenance
*/

g_cstms_product_amounttag_type 	VARCHAR2(32767);--FCC 4.4 DEC2003 CHANGES FOR ITR1 SFR 137 VOLPERT
-- OFCL12.2 ADDED START
g_workflow VARCHAR2(1) :='N';
g_ops VARCHAR2(1) := 'N';
-- OFCL12.2 ADDED END

Type rec_brnlcy is record
	(
		brn		    oltms_branch.branch_code%type,
		brn_name	oltms_branch.branch_name%type,	--included in fcc333c
		brn_lcy	    oltms_branch.branch_lcy%type,
		host		oltms_branch.host_name%type,
		--eoi		sttms_core_branch_status.end_of_input%type, --OFCL12.2 changes commented
		--eoi		oltms_branch.end_of_input%type--OFCL12.2 changes added --OFCL12.3 CHANGES COMMENTEED
    eoi		sttms_core_branch_status.end_of_input%type --OFCL12.3 CHANGES ADDED
		/*curr_period	oltms_branch.current_period%type,
		curr_cycle	oltms_branch.current_cycle%type*/ -- OFCL12.2 Not reqd
	);

Type rec_bank is record
	(
		bank_cd	oltms_bank.bank_code%type,
		ho_brn	oltms_bank.ho_branch%type,
		gl_upd	VARCHAR2(1),
		position_ac	VARCHAR2(1)
	);

TYPE g_account_cl_rec IS RECORD
	(
	limit_check_reqd		oltms_account_class.limit_check_required%TYPE,
	overdraft_facility	oltms_account_class.overdraft_facility%TYPE,
	track_accrued		oltms_account_class.track_accrued_ic%TYPE,
        credit_card_allowed	oltms_account_class.credit_card_allowed%TYPE-- PLC46060054--06-NOV-2008 CITIUS-LS#SRT1451 PLC46060054 By Swapnasish
        ,cra_product      oltms_account_class.cra_product%TYPE --31-MAR-2010 FLEXCUBE V.CL Release 7.6 CITIPBG CASA Changes
	,dr_txn_tracking_reqd oltms_account_class.dr_txn_tracking_reqd%TYPE --31-MAR-2010 FLEXCUBE V.CL Release 7.6 CITIPBG CASA Changes
	);

Type TblBrnlcy IS TABLE OF rec_brnlcy INDEX BY VARCHAR2(64);

Type TblBank IS TABLE OF rec_bank INDEX BY VARCHAR2(64);

TYPE	g_tbl_account_cl	IS TABLE OF g_account_cl_rec INDEX BY VARCHAR2(64);

--TYPE ty_server_offset IS RECORD ( server_offset  NUMBER);
Type tbl_server_offset IS TABLE of NUMBER INDEX BY VARCHAR2(3);


--FCC4.3.1 OCT 2003 Interface changes start
/*-- OFCL12.2 Not Required
TYPE		g_tbl_pc_ac_stmt
IS
TABLE OF	pctms_ac_stmt%ROWTYPE
INDEX BY	BINARY_INTEGER;
*/ -- OFCL12.2 Not Required
/* -- OFCL12.2 Not Required
TYPE		g_tbl_pc_ac_stmt_fields
IS
TABLE OF	pctms_ac_stmt_fields%ROWTYPE
INDEX BY	BINARY_INTEGER;
*/ -- OFCL12.2 Not Required
TYPE		g_tbl_iftb_cube_details
IS
TABLE OF	oltbs_cube_details%ROWTYPE
INDEX BY	BINARY_INTEGER;

TYPE		g_tbl_iftm_rec_details
IS
TABLE OF	oltms_rec_details%ROWTYPE
INDEX BY	BINARY_INTEGER;

TYPE		g_tbl_iftm_rec_reply_details
IS
TABLE OF	oltms_rec_reply_details%ROWTYPE
INDEX BY	BINARY_INTEGER;
--FCC4.3.1 OCT 2003 Interface changes end

--
--24-SEP-2003 Fcc4.4 Dec2003 Changes for FX/MM Tuning End
--
-- OFCL12.2 commented
/*TYPE tbl_fxtm_branch_type
IS  TABLE OF xxtms_branch_parameters%ROWTYPE
INDEX BY VARCHAR2(200);
tbl_fxtm_branch  olpks_utils.tbl_fxtm_branch_type; --Flexcube V CL Release 7.1, Changes by MIT on 100106
*/
-- OFCL12.2 commented

TYPE tbl_cvtm_trans_type
IS  TABLE OF oltms_translation%ROWTYPE
INDEX BY VARCHAR2(200);

tbl_cvtm_trans  olpks_utils.tbl_cvtm_trans_type; --Flexcube V CL Release 7.1, Changes by MIT on 100106

-- OFCL12.2 commented
/*TYPE tbl_fxtm_prod_type
IS  TABLE OF fxtms_product_definition%ROWTYPE
INDEX BY VARCHAR2(200);

tbl_fxtm_prod  olpks_utils.tbl_fxtm_prod_type; --Flexcube V CL Release 7.1, Changes by MIT on 100106
*/
-- OFCL12.2 commented

TYPE tbl_ldtm_prod_type
IS  TABLE OF oltms_product_master_ld%ROWTYPE
INDEX BY VARCHAR2(200);

tbl_ldtm_prod olpks_utils.tbl_ldtm_prod_type; --Flexcube V CL Release 7.1, Changes by MIT on 100106

TYPE tbl_ldtm_branch_type
IS  TABLE OF oltms_branch_parameters%ROWTYPE
INDEX BY VARCHAR2(200);
tbl_ldtm_branch  olpks_utils.tbl_ldtm_branch_type; --Flexcube V CL Release 7.1, Changes by MIT on 100106

--
--24-SEP-2003 Fcc4.4 Dec2003 Changes for FX/MM Tuning End
--
--
--FCC 4.4 DEC2003 CHANGES FOR ITR1 SFR 137 VOLPERT
--
TYPE g_tbl_prod_amounttag_type
IS
TABLE OF 	oltms_product_amounttag_type%ROWTYPE
INDEX BY	BINARY_INTEGER;

g_tbl_prod_amounttag		g_tbl_prod_amounttag_type;

--
--FCC 4.4 DEC2003 CHANGES FOR ITR1 SFR 137 VOLPERT
--

-- FCC 4.5LOT1 FAST Changes Starts

TYPE prod_stat_tbl
IS
TABLE OF	oltms_product_status_master%ROWTYPE
INDEX BY	VARCHAR2(8);

-- FCC 4.5LOT1 FAST Changes Ends

-- FCC 4.5 LOT2 RETRO Changes starts Trestel Tuning Changes..
Type TblBrnProdRest IS TABLE OF VARCHAR2(10) INDEX BY VARCHAR2(10);
g_tbl_brnprod_rest TblBrnProdRest;
Type Tbl_lookup_count IS TABLE OF NUMBER INDEX BY VARCHAR2(25);
TYPE tbl_lookup IS TABLE OF olpks_accounting.rec_lookup INDEX BY VARCHAR2(50);
g_tbl_lookupCnt Tbl_lookup_count;
g_tbl_lookup tbl_lookup;

-- FCC 4.5 LOT2 RETRO Changes ends Trestel Tuning Changes..

function get_sttb_acc(p_brn in varchar2,
			    p_acc in varchar2,
                      l_Accrec in out oltbs_account%rowtype)
return boolean;
--FCC 4.5 APR 2004 START
function get_sttb_alt_acc(p_brn in varchar2,
			    p_acc in varchar2,
                      l_Accrec in out oltbs_account%rowtype)
return boolean;
--FCC 4.5 APR 2004 END


/*function get_min_bal(p_acclass in varchar2,p_ccy in varchar2,
                       l_balrec in out sttms_accls_ccy_balances%rowtype)
return boolean;*/ -- OFCL12.2 Not required

Procedure GET_BRANCH_LCY(p_brn in VARCHAR2,l_brnrec IN OUT olpks_utils.rec_brnlcy);

PROCEDURE get_brn_date(p_brn in VARCHAR2,l_daterec IN OUT sttms_dates%ROWTYPE);

PROCEDURE get_trn_code(p_trncode in VARCHAR2,l_trnrec IN OUT oltms_trn_code%ROWTYPE);

PROCEDURE get_account_class
		(
		p_account_class  		IN		oltms_account_class.account_class%TYPE,
		p_account_cl_rec		IN OUT	olpks_utils.g_account_cl_rec,
		p_err_code			IN OUT	VARCHAR2
		);
-- New function added in fcc333c

/* -- OFCL12.2 Not Required
FUNCTION fn_get_ud_field_info
		(
		p_fieldno 			in 		NUMBER,
		l_udfrec 			IN OUT 	pctms_ud_maint%ROWTYPE,
		p_err_code 			OUT 		VARCHAR2
		)
RETURN BOOLEAN;
*/ -- OFCL12.2 Not Required
/* -- OFCL12.2 Not Required
FUNCTION fn_get_product_category_rec
		(
		p_prod_catg 		IN 		VARCHAR2,
		p_prod_rec 			IN OUT 	pctms_product_category%ROWTYPE,
		p_err_code 			OUT 		VARCHAR2
		)
RETURN BOOLEAN;
*/ -- OFCL12.2 Not Required
FUNCTION fn_get_prod_rec
		(
		p_prod_code		IN		oltms_product.product_code%TYPE,
		p_prod_rec		IN OUT	oltms_product%ROWTYPE,
		p_err_code 		OUT 		VARCHAR2
		)
RETURN BOOLEAN;

/* -- OFCL12.2 Not Required
FUNCTION fn_get_product_pref_rec
		(
		p_prod_code 		IN 		VARCHAR2,
		p_prod_pref_rec 		IN OUT	pctms_product_preference%ROWTYPE,
		p_err_code 			OUT 		VARCHAR2
		)
RETURN BOOLEAN;
*/ -- OFCL12.2 Not Required
FUNCTION fn_get_ccyrec
		(
		p_ccy_code			IN		cytms_ccy_defn.ccy_code%TYPE,
		p_ccy_rec			IN OUT	cytms_ccy_defn%ROWTYPE,
		p_err_code 			OUT 		VARCHAR2
		)
RETURN BOOLEAN;

-- PLNCITI Til NO 558 Start
/* -- OFCL12.2 Not Required
FUNCTION fn_pc_esn
		(
		p_event			IN		PCTBS_EVENTS.EVENT_CODE%TYPE,
		p_esn_rec		IN OUT		PCTBS_EVENTS%ROWTYPE,
		p_err_code 		OUT 		VARCHAR2
		)
RETURN BOOLEAN;
*/ -- OFCL12.2 Not Required
FUNCTION fn_check_holiday
		(
		p_date 			IN 		Date,
		p_holiday		OUT		Varchar2
		)
RETURN BOOLEAN;
/* -- OFCL12.2 Not Required
FUNCTION fn_pc_bank_param
		(
		p_bankcode 		IN 		Varchar2,
		p_pc_bankrec		OUT		Pctms_bank_param%ROWTYPE,
		p_nodata		OUT		Boolean,
		p_others		OUT		Boolean
		)
RETURN BOOLEAN;
*/ -- OFCL12.2 Not Required
--
--FCC 4.1 DD Tuning Changes Starts
--
/* -- OFCL12.2 Not Required
FUNCTION fn_pc_clring_netwk
		(
		p_network 		IN 		Varchar2,
		p_pc_netrec	OUT		pctms_clearing_network%ROWTYPE,
		p_nodata		OUT		Boolean,
		p_others		OUT		Boolean
		)
RETURN BOOLEAN;
*/ -- OFCL12.2 Not Required
--
--FCC 4.1 DD Tuning Changes Ends
--

FUNCTION fn_get_nwd
		(
		p_date 			IN 		Date,
		p_fwd_back		IN		Varchar2,
		p_days			IN		Number
		)
RETURN DATE;

FUNCTION fn_ac_prod_lookup
		(
		p_product 		IN 		Varchar2,
		p_event			IN		Varchar2,
		p_Status		IN		Varchar2,
		p_Ac_lookup  		OUT 		olpks_accounting.TBL_LOOKUP
		)
RETURN BOOLEAN;


-- PLNCITI Til NO 558 End
--FCC3.9 PLNCITI SFR NO 3822 starts
function get_cust_no( p_cust in varchar2,
                      l_custrec in out oltms_customer%rowtype)
return boolean;
--FCC3.9 PLNCITI SFR NO 3822 ends


--20-feb-2002	IT ROUND1 SFR 245 A/c revaluation is not updating gltb_misbal for trading P/L GLs.
FUNCTION get_mis_code(p_gl 		in	 varchar2,
                      l_code_list 	in out varchar2)
RETURN BOOLEAN;

--
-- FCC40 DD changes start
--

FUNCTION fn_get_account_record
	(
	p_account				IN		 	oltbs_account.ac_gl_no%TYPE,
	p_query_status			OUT	NOCOPY 	NUMBER,
	p_account_record			OUT	NOCOPY 	oltbs_account%ROWTYPE
	)
	RETURN BOOLEAN;
--FCC 4.5 APR 2004 START
FUNCTION fn_get_alt_account_record
	(
	p_account				IN		 	oltbs_account.ac_gl_no%TYPE,
	p_query_status				OUT	NOCOPY 	NUMBER,
	p_account_record			OUT	NOCOPY 	oltbs_account%ROWTYPE
	)
	RETURN BOOLEAN;
--FCC 4.5 APR 2004 END



FUNCTION fn_get_acc_brn_record
	(
	p_account				IN			oltbs_account.ac_gl_no%TYPE,
	p_brn					IN			oltbs_account.branch_code%TYPE,
	p_query_status			OUT	NOCOPY	NUMBER,
	p_account_record			OUT	NOCOPY	oltbs_account%ROWTYPE
	)
	RETURN BOOLEAN;

FUNCTION fn_get_branch_record
	(
	p_brn					IN			oltms_branch.branch_code%TYPE,
	p_branch_record			OUT	NOCOPY	oltms_branch%ROWTYPE
	)
	RETURN BOOLEAN;

FUNCTION fn_get_cust_acc_record
	(
	--p_account				IN			sttms_cust_account.cust_ac_no%TYPE,-- OFCL12.2 Not required
	--p_brn					IN			sttms_cust_account.branch_code%TYPE,-- OFCL12.2 Not required
	p_account				IN			oltb_account.ac_gl_no%TYPE,
	p_brn					IN			oltb_account.branch_code%TYPE,
	p_query_status			OUT	NOCOPY	NUMBER,
	--p_cust_acc_record			OUT	NOCOPY	sttms_cust_account%ROWTYPE-- OFCL12.2 Not required
	p_cust_acc_record			OUT	NOCOPY	oltb_account%ROWTYPE-- OFCL12.2 Not required
	)
	RETURN BOOLEAN;

FUNCTION fn_get_all_acc_record
	(
	p_account				IN			oltb_account.ac_gl_no%TYPE,
	p_brn					IN			oltb_account.branch_code%TYPE,
	p_all_acc_count			OUT	NOCOPY	NUMBER
	)
	RETURN BOOLEAN;
/* -- OFCL12.2 Not Required
FUNCTION fn_get_upload_source_record
	(
	p_prod_categ			IN			VARCHAR2, -- OFCL12.2 Changes
	p_source_code			IN			VARCHAR2, -- OFCL12.2 Changes
	p_query_status			OUT	NOCOPY	NUMBER,
	p_upld_source_record		OUT	NOCOPY	pctms_upload_source_detail%ROWTYPE
	)
	RETURN BOOLEAN;
*/ -- OFCL12.2 Not Required
/* -- OFCL12.2 Not Required
FUNCTION fn_get_cust_station_record
	(
	p_source_code			IN			pctm_cust_station.source_code%TYPE,
	p_station_id			IN			pctm_cust_station.station_id%TYPE,
	p_query_status			OUT	NOCOPY	NUMBER,
	p_cust_station_record		OUT	NOCOPY	pctm_cust_station%ROWTYPE
	)
	RETURN BOOLEAN;
*/ -- OFCL12.2 Not Required
/*-- OFCL12.2 Not Required
FUNCTION fn_get_cust_station_acc_record
	(
	p_source_code			IN			VARCHAR2,-- OFCL12.2 Changes
	p_station_id			IN			VARCHAR2,-- OFCL12.2 Changes
	p_cust_no				IN			VARCHAR2,-- OFCL12.2 Changes
	p_cust_ac_brn			IN			VARCHAR2,-- OFCL12.2 Changes
	p_cust_ac_no			IN			VARCHAR2,-- OFCL12.2 Changes
	p_cust_station_acc_count	OUT	NOCOPY	NUMBER
	)
	RETURN BOOLEAN;
*/-- OFCL12.2 Not Required
/* -- OFCL12.2 Changes
FUNCTION fn_get_clg_network_record
	(
	p_bank_code				IN			pctm_bank_clg_network.bank_code%TYPE,
	p_network_id			IN			pctm_bank_clg_network.network_id%TYPE,
	p_query_status			OUT	NOCOPY	NUMBER,
	p_clg_network_record		OUT	NOCOPY	pctms_bank_clg_network%ROWTYPE
	)
	RETURN BOOLEAN;
*/ -- OFCL12.2 Changes
/* -- OFCL12.2 Changes
FUNCTION fn_get_client_agree_record
	(
	p_prod_code				IN			pctm_client_agreement.product_code%TYPE,
	p_cust_no				IN			pctm_client_agreement.cust_no%TYPE,
	p_cust_ac_brn			IN			pctm_client_agreement.cust_ac_brn%TYPE,
	p_cust_ac_no			IN			pctm_client_agreement.cust_ac_no%TYPE,
	p_query_status			OUT	NOCOPY	NUMBER,
	p_client_agree_rec		OUT	NOCOPY	pctm_client_agreement%ROWTYPE
	)
	RETURN BOOLEAN;
*/ -- OFCL12.2 Changes
/*FUNCTION fn_get_cust_clrng_acc_record-- OFCL12.2 Not required
	(
	p_clrng_account			IN			sttms_cust_account.clearing_ac_no%TYPE,
	p_query_status			OUT	NOCOPY	NUMBER,
	p_cust_clrng_acc_record		OUT	NOCOPY	sttms_cust_account%ROWTYPE
	)
	RETURN BOOLEAN;

FUNCTION fn_get_cust_clrng_bnk_record
	(
	p_account				IN			sttms_cust_account.cust_ac_no%TYPE,
	p_clrng_bnk				IN			sttms_cust_account.clearing_bank_code%TYPE,
	p_query_status			OUT	NOCOPY	NUMBER,
	p_cust_clrng_bnk_record		OUT	NOCOPY	sttms_cust_account%ROWTYPE
	)
	RETURN BOOLEAN;*/-- OFCL12.2 Not required
/* -- OFCL12.2 Changes
FUNCTION fn_get_cr_dd_agmt_master
	(
	p_ProdCode			IN		pctms_cr_dd_agmt_master.product_code%TYPE,
	p_CustNo			IN		pctms_cr_dd_agmt_master.cust_no%TYPE,
	p_CustAcBrn			IN		pctms_cr_dd_agmt_master.cust_ac_brn%TYPE,
	p_CustAcNo			IN		pctms_cr_dd_agmt_master.cust_ac_no%TYPE,
	p_DetailKey			IN		pctms_cr_dd_agmt_master.detail_key%TYPE,
	p_QueryStatus		OUT		NUMBER,
	p_CrDdMasterRec		OUT		pctms_cr_dd_agmt_master%ROWTYPE
	)
	RETURN BOOLEAN;
*/ -- OFCL12.2 Changes
/*-- OFCL12.2 Changes
FUNCTION fn_get_cr_dd_agmt_detail
	(
	p_ProdCode			IN		pctms_cr_dd_agmt_detail.product_code%TYPE,
	p_CustNo			IN		pctms_cr_dd_agmt_detail.cust_no%TYPE,
	p_CustAcBrn			IN		pctms_cr_dd_agmt_detail.cust_ac_brn%TYPE,
	p_CustAcNo			IN		pctms_cr_dd_agmt_detail.cust_ac_no%TYPE,
	p_DetailKey			IN		pctms_cr_dd_agmt_detail.detail_key%TYPE,
	p_EffDate			IN		pctms_cr_dd_agmt_detail.effective_date%TYPE,
	p_QueryStatus		OUT		NUMBER,
	p_CrDdDetailRec		OUT		pctms_cr_dd_agmt_detail%ROWTYPE
	)
	RETURN BOOLEAN;
*/ -- OFCL12.2 Changes
/* -- OFCL12.2 Changes
FUNCTION fn_get_dr_dd_agmt_master
	(
	p_ProdCode			IN		pctms_dr_dd_agmt_master.product_code%TYPE,
	p_CustNo			IN		pctms_dr_dd_agmt_master.cust_no%TYPE,
	p_CustAcBrn			IN		pctms_dr_dd_agmt_master.cust_ac_brn%TYPE,
	p_CustAcNo			IN		pctms_dr_dd_agmt_master.cust_ac_no%TYPE,
	p_DetailKey			IN		pctms_dr_dd_agmt_master.detail_key%TYPE,
	p_QueryStatus		OUT		NUMBER,
	p_DrDdMasterRec		OUT		pctms_dr_dd_agmt_master%ROWTYPE
	)
	RETURN BOOLEAN;
*/ -- OFCL12.2 Changes
/* -- OFCL12.2 Changes
FUNCTION fn_get_dr_dd_agmt_detail
	(
	p_ProdCode			IN		pctms_dr_dd_agmt_detail.product_code%TYPE,
	p_CustNo			IN		pctms_dr_dd_agmt_detail.cust_no%TYPE,
	p_CustAcBrn			IN		pctms_dr_dd_agmt_detail.cust_ac_brn%TYPE,
	p_CustAcNo			IN		pctms_dr_dd_agmt_detail.cust_ac_no%TYPE,
	p_DetailKey			IN		pctms_dr_dd_agmt_detail.detail_key%TYPE,
	p_EffDate			IN		pctms_dr_dd_agmt_detail.effective_date%TYPE,
	p_QueryStatus		OUT		NUMBER,
	p_DrDdDetailRec		OUT		pctms_dr_dd_agmt_detail%ROWTYPE
	)
	RETURN BOOLEAN;
*/ -- OFCL12.2 Changes
/* -- OFCL12.2 Changes
FUNCTION fn_get_charge_account
	(
	p_CustNo			IN		pctms_charge_ac_map.cust_no%TYPE,
	p_CustAcBrn			IN		pctms_charge_ac_map.cust_ac_brn%TYPE,
	p_CustAcNo			IN		pctms_charge_ac_map.cust_ac%TYPE,
	p_ProdCode			IN		pctms_charge_ac_map.product_code%TYPE,
	p_Component			IN		pctms_charge_ac_map.component%TYPE,
	p_Ccy				IN		pctms_charge_ac_map.currency%TYPE,
	p_QueryStatus		OUT		NUMBER,
	p_ChgAcMapRecord		OUT		pctms_charge_ac_map%ROWTYPE
	)
	RETURN BOOLEAN;
*/ -- OFCL12.2 Changes

/* -- OFCL12.2 Changes
FUNCTION	fn_get_chg_stat_record
	(
	p_charge_category			IN			pctbs_charge_statistics.charge_category%TYPE,
	p_cust_no				IN			pctbs_charge_statistics.cust_no%TYPE,
	p_cust_ac_no			IN			pctbs_charge_statistics.cust_ac_no%TYPE,
	p_year				IN			pctbs_charge_statistics.year%TYPE,
	p_month				IN			pctbs_charge_statistics.month%TYPE,
	p_query_status			OUT	NOCOPY	NUMBER,
	p_chg_stat_record			OUT	NOCOPY	pctbs_charge_statistics%ROWTYPE
	)
	RETURN BOOLEAN;
*/ -- OFCL12.2 Changes
--
-- FCC40 DD changes end
--

--FCC4.3.1 OCT 2003 Interface changes start
/* --OFCL12.2 Changes
FUNCTION fn_get_pc_ac_stmt
	(
	p_product_type			IN	pctms_ac_stmt.product_type%TYPE,
	p_product_code			IN	pctms_ac_stmt.product_code%TYPE,
	p_module				IN	pctms_ac_stmt.module_id%TYPE,
	p_query_status			OUT	NUMBER,
	p_tbl_ac_stmt			OUT	g_tbl_pc_ac_stmt
	)
RETURN BOOLEAN;
*/ -- OFCL12.2 Changes

/* --OFCL12.2 Changes
FUNCTION fn_get_pc_ac_stmt_fields
	(
	p_product_type			IN	pctms_ac_stmt_fields.product_type%TYPE,
	p_product_code			IN	pctms_ac_stmt_fields.product_code%TYPE,
	p_module_id				IN	pctms_ac_stmt_fields.module_id%TYPE,
	p_query_status			OUT	NUMBER,
	p_tbl_ac_stmt_fields	OUT	g_tbl_pc_ac_stmt_fields
	)
RETURN BOOLEAN;
*/ -- OFCL12.2 Changes

FUNCTION fn_get_cube_details
	(
	p_module_code			IN	oltbs_cube_details.cod_module%TYPE,
	p_type_of_interface		IN	oltbs_cube_details.type_of_interface%TYPE,
	p_query_status			OUT	NUMBER,
	p_tbl_cube_details		OUT	g_tbl_iftb_cube_details
	)
RETURN BOOLEAN;


FUNCTION fn_get_rec_details
	(
	p_system				IN	oltms_rec_details.cod_system%TYPE,
	p_cod_rectype			IN	oltms_rec_details.cod_rectype%TYPE,
	p_query_status			OUT	NUMBER,
	p_tbl_rec_details		OUT	g_tbl_iftm_rec_details
	)
RETURN BOOLEAN;

/* -- OFCL12.2 Changes
FUNCTION fn_get_reject_code_record
	(
	p_reject_code		IN	pctms_reject_code.reject_code%TYPE,
	p_query_status		OUT	NUMBER,
	p_tbl_reject_code	OUT	pctms_reject_code%ROWTYPE
	)
RETURN BOOLEAN;
*/ -- OFCL12.2 Changes

FUNCTION fn_get_rec_reply_master
	(
	p_cod_system			IN	oltms_rec_reply_master.system%TYPE,
	p_module_code			IN	oltms_rec_reply_master.module%TYPE,
	p_type_of_interface		IN	oltms_rec_reply_master.type_of_interface%TYPE,
	p_query_status			OUT	NUMBER,
	p_rec_reply_rec_master	OUT	oltms_rec_reply_master%ROWTYPE
	)
RETURN BOOLEAN;


FUNCTION fn_get_reply_details
	(
	p_cod_system			IN	oltms_rec_reply_details.system%TYPE,
	p_module_code			IN	oltms_rec_reply_details.module%TYPE,
	p_type_of_interface		IN	oltms_rec_reply_details.type_of_interface%TYPE,
	p_query_status			OUT	NUMBER,
	p_tbl_rec_reply_details	OUT	g_tbl_iftm_rec_reply_details
	)
RETURN BOOLEAN;
--FCC4.3.1 OCT 2003 Interface changes end

--
-- FCC 4.3.1. oct 2003 RTGS Changes
--
FUNCTION  fn_get_branch_bic(
		p_branch_code	IN	VARCHAR2,
		p_bic_code	IN	VARCHAR2,
		p_rec		IN OUT	oltms_branch_bic%ROWTYPE
		)
RETURN BOOLEAN;

--
-- FCC 4.3.1. oct 2003 RTGS Changes
--

--
--
--FCC4.4 DEC 2003 Changes For FXMM Tuning Start
-- OFCL12.2 commented
/*FUNCTION fn_get_fxtm_branch
	(P_branch_code      IN         VARCHAR2,
	 p_rec              IN OUT     xxtms_branch_parameters%ROWTYPE
	)
RETURN BOOLEAN;

FUNCTION fn_get_fxtm_prod
	   ( p_product_code 	IN  	     VARCHAR2,
	     p_rec  		IN OUT     fxtms_product_definition%ROWTYPE
	   )
RETURN BOOLEAN;*/
-- OFCL12.2 commented

FUNCTION fn_get_cvtm(p_source_code      IN  	VARCHAR2	,
	   	  	   p_translation_type IN  	VARCHAR2	,
			   p_external_branch  IN  	VARCHAR2	,
			   p_external_value   IN  	VARCHAR2	,
			   p_internal_branch  IN  	VARCHAR2	,
	   	  	   p_rec  		    IN OUT  oltms_translation%ROWTYPE
									   )
RETURN BOOLEAN ;

FUNCTION fn_get_ldtm_branch
	(p_branch_code      IN         VARCHAR2,
	 p_module_code		IN		   VARCHAR2,
	 p_rec              IN OUT     oltms_branch_parameters%ROWTYPE,
	 p_err_code	    IN OUT     VARCHAR2,
	 p_error_parameter  IN OUT     VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_get_ldtm_prod
	(
	p_product_code	IN		oltbs_contract.product_code%TYPE,
	p_product_rec	IN OUT	oltms_product_master_ld%ROWTYPE
	)
RETURN BOOLEAN;

--
--24-SEP-2003 Fcc4.4 Dec2003 Changes for FX/MM Tuning End
--
--
--FCC 4.4 DEC2003 CHANGES FOR ITR1 SFR 137 VOLPERT
--

FUNCTION fn_get_prod_amounttag_type
	(
	p_product_code					IN		oltms_product_amounttag_type.product_code%TYPE,
	p_tbl_prod_amounttag				OUT		g_tbl_prod_amounttag_type,
	p_error_code					IN OUT	ertbs_msgs.err_code%TYPE,
	p_error_param					IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

--10-FEB-2004 RETRO CHANGES FCC 4.5 APR 2004 ROMCITI TIL#1038 CHANGES START
FUNCTION fn_get_xcup_transouc_record
	(
	p_branch_code		IN			oltms_xcup_transouc.branch_code%TYPE,
	p_batch_from		IN			oltms_xcup_transouc.batch_from%TYPE,
	p_batch_to			IN			oltms_xcup_transouc.batch_to%TYPE,
	p_trn_code			IN			oltms_xcup_transouc.trn_code%TYPE,
	p_account			IN			oltms_xcup_transouc.account%TYPE,
	p_query_status		OUT	NOCOPY	NUMBER,
	p_transouc_record		OUT	NOCOPY	oltms_xcup_transouc%ROWTYPE
	)
RETURN BOOLEAN;
--10-FEB-2004 RETRO CHANGES FCC 4.5 APR 2004 ROMCITI TIL#1038 CHANGES END



--FCC 4.5 APR 2004 PLNCITI TIL#9883 - MIS DATA COLLECTION Changes - Start

FUNCTION fn_get_mis_head_record
	(
	p_mis_head				IN	oltms_mis_head.mis_head%TYPE,
	p_query_status			OUT	NUMBER,
	p_tbl_mis_head			OUT	oltms_mis_head%ROWTYPE,
	p_error_msg				OUT	VARCHAR2
	)
RETURN BOOLEAN;

--FCC 4.5 APR 2004 PLNCITI TIL#9883 - MIS DATA COLLECTION Changes - End
--
--FCC 4.4 DEC2003 CHANGES FOR ITR1 SFR 137 VOLPERT
--

-- FCC 4.5 LOT1 FAST Changes Starts

FUNCTION	fn_prod_status
	(
	p_product		IN		oltms_product_status_master.product%TYPE,
	p_status		IN		oltms_product_status_master.status%TYPE,
	p_prod_stat_rec	IN OUT	oltms_product_status_master%ROWTYPE,
	p_error_code	IN OUT	VARCHAR2,
	p_error_parameter	IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

-- FCC 4.5 LOT1 FAST Changes Ends
-- FCC 4.5 LOT2 RETRO Changes starts Trestel Tuning Changes..
FUNCTION get_prod_brn_rest(p_brn		IN	 VARCHAR2,
			         p_mod		IN	 VARCHAR2,
                           p_prod		IN	 VARCHAR2,
				   p_rest		OUT	 CHAR
				   )
RETURN BOOLEAN;
FUNCTION fn_get_lookup_rec(
				p_prod		IN	VARCHAR2,
				p_event_code	IN	VARCHAR2,
				p_Status		IN	CHAR,
				p_tbl_lookup	OUT	tbl_lookup
				)
RETURN BOOLEAN;
-- FCC 4.5 LOT2 RETRO Changes ends

-- FCC 4.5 Apr 2004   9973 Ceemea Changes Starts
/* -- OFCL12.2 Not Required
FUNCTION fn_get_upload_source_rec
	(
	p_source_code			IN			pctms_upload_source.source_code%TYPE,
	p_source_record			OUT	NOCOPY	pctms_upload_source%ROWTYPE
	)
RETURN BOOLEAN;
*/ -- OFCL12.2 Not Required
-- FCC 4.5 Apr 2004   9973 Ceemea Changes  Ends
--FCC4.5 Lot2 MAY2004 Performance Tuning Changes Starts.
FUNCTION fn_get_cust_acc_details
	(
	/*p_account				IN			sttms_cust_account.cust_ac_no%TYPE,-- OFCL12.2 Not required
	p_brn					IN			sttms_cust_account.branch_code%TYPE,
	p_cust_acc_record			OUT		NOCOPY	sttms_cust_account%ROWTYPE*/
	p_account				IN			oltb_account.ac_gl_no%TYPE,
	p_brn					IN			oltb_account.branch_code%TYPE,
	p_cust_acc_record			OUT		NOCOPY	oltb_account%ROWTYPE
	)
RETURN BOOLEAN;

FUNCTION fn_get_acc_head
	(
	pProd	 VARCHAR2,
	pRole	 VARCHAR2,
	pStatus	 VARCHAR2,
	pAchead	 OUT VARCHAR2
	)
RETURN BOOLEAN;


FUNCTION fn_get_cvtm_trans(p_source_code      	IN  		VARCHAR2	,
	   	  	   p_translation_type 	IN  		VARCHAR2	,
			   p_internal_branch  	IN  		VARCHAR2	,
	   	  	   p_rec  		IN OUT      	oltms_translation%ROWTYPE
			  )
RETURN BOOLEAN;

FUNCTION fn_get_udf_details
	(
	p_func_id				IN		cstm_udf_vals.FUNCTION_ID%TYPE,
	p_field_name				IN		cstm_udf_vals.FIELD_NAME%TYPE,
	p_rec_key				IN		cstm_udf_vals.REC_KEY%TYPE,
	p_udf_rec				OUT	NOCOPY	cstm_udf_vals%ROWTYPE
	)
RETURN BOOLEAN;
--FCC4.5 Lot2 MAY2004 Performance Tuning Changes Ends.

--HUFCITI#1164 Changes Starts
FUNCTION fn_get_comn_upload_source_rec
	(
	p_source_code			IN			cotms_source_pref.source_code%TYPE,
	p_module_code			IN			cotms_source_pref.module_code%TYPE,--27-sep-2004 FCC 4.6 Sep04 IRIS upload changes.
	p_upld_source_record		OUT	NOCOPY		cotms_source_pref%ROWTYPE
	)
RETURN BOOLEAN;
--HUFCITI#1164 Changes Ends

-- fcc 4.6 Sep 2004 9ias changes starts
FUNCTION fn_parse_and_exec_dyn_sql
			(
			p_sql_stmt		IN 		VARCHAR2	,
			p_err_code		IN OUT 	VARCHAR2	,
			p_err_param		IN OUT 	VARCHAR2
			)
RETURN BOOLEAN;
-- fcc 4.6 Sep 2004 9ias changes Ends

 /*FUNCTION fn_get_clearing_ac_no
		(
		p_branch_code		IN		VARCHAR2,
		p_clearing_ac_no		OUT		VARCHAR2,
		p_error_code		IN OUT	VARCHAR2,
		p_error_param		IN OUT	VARCHAR2
		)
RETURN BOOLEAN;*/ -- OFCL12.2 Not required

-- FCC 4.6 IBAN Changes Start
FUNCTION fn_get_iban_acc_record
	(
	--p_account		IN			sttms_cust_account.cust_ac_no% TYPE,-- OFCL12.2 Not required
	p_account		IN			oltb_account.ac_gl_no% TYPE,
	p_query_status	OUT	NOCOPY	NUMBER,
	--p_cust_acc_record OUT	NOCOPY	sttms_cust_account% ROWTYPE-- OFCL12.2 Not required
	p_cust_acc_record OUT	NOCOPY	oltb_account% ROWTYPE
	)
RETURN BOOLEAN;
-- FCC 4.6 IBAN Changes End.

-- FCC 4.6 Sep04 Retro (India) Starts

/*FUNCTION fn_get_altac_record
	(
	p_account					IN			oltbs_account.alt_ac_no%TYPE,
	p_query_status				OUT	NOCOPY	NUMBER,
	p_account_record			OUT	NOCOPY	oltbs_account%ROWTYPE
	)
	RETURN BOOLEAN;*/ -- OFCL12.2 Not required.

-- FCC 4.6 Sep04 Retro (India) Ends

--- 31-AUG-2004 FCC 4.6 SEP 2004 RELEASE Impact of EU Enlargement on Population of Field 33B  Field 59 in MT103 / M103+ Starts
FUNCTION fn_get_country_rec
		(
		p_country_code	IN		sttms_country.country_code%TYPE,
		p_country_rec	IN OUT	sttms_country%ROWTYPE,
		p_err_code 		OUT 		VARCHAR2
		)
RETURN BOOLEAN;
--- 31-AUG-2004 FCC 4.6 SEP 2004 RELEASE Impact of EU Enlargement on Population of Field 33B  Field 59 in MT103 / M103+ Ends
--06-NOV-2008 CITIUS-LS#SRT1451 PLC46060054 Start By Swapnasish
FUNCTION get_ertb_msgs
		(
		p_err		IN	VARCHAR2,
		p_lang		IN	VARCHAR2,
		p_err_rec	IN OUT  ertbs_msgs%ROWTYPE
		)
RETURN BOOLEAN	;

--06-NOV-2008 CITIUS-LS#SRT1451 PLC46060054 End By Swapnasish
--06-NOV-2008 CITIUS-LS#SRT1451 PLC46100043 Start By Swapnasish
--18/02/2005 FCC 4.6 PLC46100043 Starts
-- OFCL12.2 Not required
/*FUNCTION fn_get_brn_mis_gl
	(
	p_branch_code		IN	gltm_brn_mis_gl.branch_code%TYPE,
	p_mis_class			IN	gltm_brn_mis_gl.mis_class%TYPE,
	p_gl_code			IN	gltm_brn_mis_gl.gl_code%TYPE,
	p_brn_mis_gl_rec		OUT	gltm_brn_mis_gl%ROWTYPE
	)
RETURN BOOLEAN;*/-- OFCL12.2 Not required

FUNCTION fn_get_branch_param
	(
	p_branch_code	IN	oltbs_branch_param.branch_code%TYPE,
	p_param_name	IN	oltbs_branch_param.param_name%TYPE,
	p_param_val		OUT	oltbs_branch_param.param_val%TYPE
	)
RETURN BOOLEAN;
---- OFCL12.2 Not required
/*FUNCTION fn_get_mis_derived_codes
	(
	p_branch_code		IN	gltms_mis_derived_codes.branch_code%TYPE,
	p_mis_main_class		IN	gltms_mis_derived_codes.mis_main_class%TYPE,
	p_mis_sub_class_code	IN	gltms_mis_derived_codes.mis_sub_class_code%TYPE,
	p_mis_main_class_code	OUT	gltms_mis_derived_codes.mis_main_class_code%TYPE
	)
RETURN BOOLEAN;*/
--18/02/2005 FCC 4.6 PLC46100043 Ends
--06-NOV-2008 CITIUS-LS#SRT1451 PLC46100043 End By Swapnasish
--06-NOV-2008 CITIUS-LS#SRT1451 CITIUS Till#1119 Start By Swapnasish
--22-Feb-2008 Madhu CITIUS Till#1119, Qmemo changes >>
/*FUNCTION fn_get_smart_lookup -- OFCL12.2 Not required
		(
		p_qm_account		IN	VARCHAR2,
		p_smart_lookup 		IN OUT  qmtms_smart_map_lookup%ROWTYPE
		)
RETURN BOOLEAN;*/

/*FUNCTION fn_get_smart_map -- OFCL12.2 Not required
		(
		p_exp_code		IN	VARCHAR2,
		p_smart_map 		IN OUT  qmtms_smart_map%ROWTYPE
		)
RETURN BOOLEAN;*/
--22-Feb-2008 Madhu CITIUS Till#1119, Qmemo changes <<

--06-NOV-2008 CITIUS-LS#SRT1451 CITIUS Till#1119 End By Swapnasish
--29-JUN-2010 FLEXCUBE V.CL Release 7.7 CITIPBG CASA Vol1 tag#4 start
FUNCTION fn_get_accls_rec
      (
      p_ac_class              IN                oltms_account_class.account_class%TYPE
      ,p_accls_record         OUT   NOCOPY      oltms_account_class%ROWTYPE
      )
RETURN BOOLEAN;
--29-JUN-2010 FLEXCUBE V.CL Release 7.7 CITIPBG CASA Vol1 tag#4 end

-- EURCITIPLC-LS_LD#11322 changes Starts
FUNCTION fn_get_product_layer(
				p_product_code 	IN oltms_product.product_code%TYPE
		             )
RETURN VARCHAR2;
-- EURCITIPLC-LS_LD#11322 changes Ends

--CITIUS#19836 changes starts
FUNCTION fn_check_agency_stp(
			     p_product_code 		IN                oltms_product.product_code%TYPE
			    )
RETURN NUMBER;
--CITIUS#19836 changes ends
--EURCITIPLC#20076 Changes changes starts.
FUNCTION fn_get_agency_module(
				p_product_code 		IN                oltms_product.product_code%TYPE,
				p_source_code		IN                oltms_translation.source_code%TYPE,
				p_trans_type  		IN                oltms_translation.translation_type%TYPE

			  	)
RETURN VARCHAR2;
--EURCITIPLC#20076 Changes changes ends.

PROCEDURE pr_get_branch_offset(
					p_branch_offset              IN OUT    NUMBER
				  );

PROCEDURE pr_get_server_offset(
					p_server_offset              IN OUT    NUMBER
				  );

--OFCL12.2 changes start
FUNCTION	fn_get_loan_param_value
					(
					  p_param_name		IN oltbs_loan_param_detail.param_name%TYPE
					)
RETURN VARCHAR2;
FUNCTION FN_GET_NLS_DECIMAL_SEPARATOR RETURN VARCHAR2;
FUNCTION fn_get_cosmos_ref RETURN VARCHAR2;
--OFCL12.2 changes end

--SFR#29959798 changes start
FUNCTION	fn_get_param_value	(
					   p_param_name	IN cstbs_param.param_name%TYPE
					)
RETURN VARCHAR2;
--SFR#29959798 changes end
-- OBCL_14.5_RuleBasedRoleToHeadMapping >> Starts
FUNCTION fn_get_account_head(p_prod_code        IN  VARCHAR2,
                             p_accounting_role  IN  VARCHAR2,
                             p_contract_ref_no  IN  VARCHAR2 DEFAULT NULL,
                             p_Status           IN  VARCHAR2 DEFAULT 'NORM')--Bug#33574859 Change
RETURN VARCHAR2;
--OBCL_14.5_RuleBasedRoleToHeadMapping << Ends
--OBCL_14.5_RuleBasedAccounting >> Starts
FUNCTION fn_get_rule_no(p_prod_code       IN  VARCHAR2,
                        p_event_code      IN  VARCHAR2,
                        pContract_ref_no  IN  VARCHAR2 DEFAULT NULL)
RETURN NUMBER;
--Bug#33674705 starts
FUNCTION fn_chk_rba_maint(p_prod_code       IN  VARCHAR2,
                          p_event_code      IN  VARCHAR2)
RETURN NUMBER;
--Bug#33674705
--OBCL_14.5_RuleBasedAccounting << Ends
END olpks_utils;
/
Create or replace synonym olpkss_utils for olpks_utils
/