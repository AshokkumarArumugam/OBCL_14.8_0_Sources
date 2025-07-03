create or replace package lbpks_upload as
/*------------------------------------------------------------------------------
** File Name			: lbpks_upload.SPC
**
** Module			:LOAN SYNDICATION
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
------------------------------------------------------------------------------
*/

/*
------------------------------CHANGE HISTORY-----------------------------------------------
1-SEP-2005	FCC 4.6.2 COPY RIGHT changes
10-SEP-2005 	FLEXCUBE V.CL Release 7.0 type upldPartCurrDetTbl added for table processing of the table lbtbs_upload_part_curr_det
09-MAR-2006       --CITILS46110204,Retro as part of Flexcube V CL Release 7.1 Changes for DIARY EVENTS
03-MAY-2006     FLEXCUBE V.CL Release 7.0 Rollover Changes by Sambhaji
                gSourceCode variable introduced.
06-May-2006 SFR#58 ,If Fee Liquidation mode field is Null in the upload table, it should default from Product. Changes done by Aji
03-OCT-2006 FLEXCUBE V.CL Release 7.1 ITR2 SFR#1, Swing Line Changes.
09-OCT-2006 FLEXCUBE V.CL Release 7.1 ITR1 SFR#39, Package split into Created by Aji
	    This package has been splitted as lbpks_upload and lbpks_upload_addon packages had grown over 15 k lines and it was
	    getting difficult to manage the entire code under a single package so some of the internally called
	    units from this package have been taken out and a new package named lbpks_upload_addon has been
	    created .
20-Feb-2007 FLEXCUBE V.CL Release 7.2 LC fee issuer changes by Aji
29-mar-2007 FLEXCUBE V.CL Release 7.2 ITR2, SFR#56 Breakage fee
19-OCT-2007 FCC V.CL 7.3 UK CONSOLIDATION RETRO Start Here
	22-SEP-2007 FCC 7.3 RETRO of CITILS46110253 
	24-SEP-2007 FCC 7.3 RETRO of CITILS46110375 CHANGES START
		Draft Changes for Tranche and Facility
	24-SEP-2007 FCC 7.3 RETRO of CITILS46110375 CHANGES END
19-OCT-2007 FCC V.CL 7.3 UK CONSOLIDATION RETRO End Here
26-NOV-2007 FCC V.CL 7.3 UK CONSOLIDATION RETRO Changes
            1) Added upldTranchSchTbl  --CITILS46110309 Changes
            2) Added function fn_check_holiday --CITILS46210375B Change
	    
10-DEC-2007 FCC V.CL 7.3 UK CONSOLIDATION RETRO Changes
		CITILS46210320 Draft Transfer Enhancements.
08-JAN-2009 FLEXCUBE V.CL Release 7.4 MTR2 SFR#26, Interim Interest schedule Related Changes.
	    New table type tbl_interim_int_sch of lbtbs_upload_interim_int_sch has been created.
05-MAR-2012 Flexcube V.CL Release 7.10, ITR2#35 IUT#303 added new plsql table type to store tranche schedules input records.

  SFR Number         :29959798
  Changed By         :Srinivasulu Ch
  Change Description :Changes done to populate SILENT participant Wrappper contracts
  Search String      :OBCL14.4#SLT Workflow changes 
  
  Changed By         : Palanisamy M
  Date               : 19-FEB-2020
  Change Description : OBCL 14.4 Financial Centre based holiday treatment Changes for LS
  Search String      : OBCL 14.4 Financial Centre based holiday treatment Changes for LS	
  
    Changed BY         : Pallavi R
    Changed on         : 29-Aug-2024
    Changed Reason     : Facility Upload was not succesful with fee schdules
    Search String      : OBCL_14.7_RABO_#36935170 Changes
	
	Changed BY         : Arunprasath
	Changed on         : 08-Jan-2025
	Changed Reason     : LS_Migration_Changes
	Search String      : Bug#37292205
	
------------------------------------END CHANGE HISTORY-------------------------------------
*/


gErrList	VARCHAR2(32000);		--aji
gErrParamList	VARCHAR2(32000);	--aji
gModule			oltbs_contract.module_code%TYPE; -- aji 27-apr-2006
gSourceCode		oltbs_upload_master.source_code%TYPE;--FLEXCUBE V.CL Release 7.0 Rollover Changes by Sambhaji 03-MAY-2006

--gSLT_Process BOOLEAN;  --OBCL14.4#SLT Workflow changes,OBCL_14.7_RABO_#36935170_2 Changes
gSLT_Process BOOLEAN := FALSE;--OBCL_14.7_RABO_#36935170_2 Changes

type upldSyndMasterTbl is table of lbtbs_upload_synd_master%rowtype index by binary_integer;
type upldFacCcyTbl is table of lbtbs_upload_fac_ccy%rowtype index by binary_integer;

type upldBorrowersTbl is table of lbtbs_upload_borrowers%rowtype index by binary_integer;
type upldBorrEntitiesTbl is table of lbtbs_upload_borr_entities%rowtype index by binary_integer;

type upldParticipantsTbl is table of lbtbs_upload_participant%rowtype index by binary_integer;
type upldPartRatioTbl is table of lbtbs_upload_participant_ratio%rowtype index by binary_integer;
type upldPartEntitiesTbl is table of oltbs_upload_entity%rowtype index by binary_integer;

type upldFeeTbl is table of lftbs_upload_fee%rowtype index by binary_integer;
type upldFeeSchedulesTbl is table of lftbs_upload_fee_schedules%rowtype index by binary_integer;
type upldPartCurrDetTbl is table of lbtbs_upload_part_curr_det%rowtype index by binary_integer;--FLEXCUBE V.CL Release 7.0 ITR2 SFR#23 participant ccy-seq no related changes , Amit Sinha

 --FLEXCUBE V.CL Release 7.1, RATISH ,01-03-2006  START
TYPE tbl_tr_skim_master IS TABLE OF lbtbs_upload_tr_skim_master%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE tbl_tr_skim_prodlinkages IS TABLE OF lbtbs_upload_skim_prodlinkages%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE tbl_tr_skim_details IS TABLE OF lbtbs_upload_tr_skim_details%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE tbl_borrower_ccy IS TABLE OF lbtbs_upload_borrower_ccy%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE tbl_hol_ccy IS TABLE OF lbtbs_upload_hol_ccy%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE tbl_borr_dd_prod IS TABLE OF lbtbs_upload_borr_dd_prod%ROWTYPE INDEX BY BINARY_INTEGER;
--TYPE tbl_borr_dd_lmt IS TABLE OF lstbs_upload_drawdown_lmt%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE tbl_borr_dd_lmt IS TABLE OF lbtbs_upload_borr_prod_limit%ROWTYPE INDEX BY BINARY_INTEGER; -- aji
TYPE tbl_contract_master IS TABLE OF oltbs_upload_master%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE tbl_dd_prod IS TABLE OF lbtbs_upload_drawdown_prod%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE tbl_dd_comp IS TABLE OF lbtbs_upload_drawdown_comp%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE tbl_dd_part_ratio IS TABLE OF lbtbs_upload_dd_part_ratio%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE tbl_dd_comp_ccy IS TABLE OF lbtbs_upload_drawdown_comp_ccy%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE tbl_dd_margin IS TABLE OF lbtbs_upload_drawdown_margin%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE tbl_tax_prod_rule IS TABLE OF lbtb_upload_tax_prod_rule%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE tbl_party_details IS TABLE OF oltbs_upload_party_details%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE tbl_borr_settle_upload_det IS TABLE OF lbtbs_borr_settle_upload_det%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE tbl_mrgn_mnt IS TABLE OF LFTM_UPLOAD_MARGIN_MNT%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE tbl_fee_mnt IS TABLE OF LFTB_UPLOAD_FEE_MNT%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE tbl_dd_skim_master IS TABLE OF lbtbs_upload_skim_master%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE tbl_dd_skim_details IS TABLE OF lbtbs_upload_skim_details%ROWTYPE INDEX BY BINARY_INTEGER;
 --FLEXCUBE V.CL Release 7.0, RATISH ,01-03-2006  end
TYPE tbl_tr_schedules IS TABLE OF lbtb_upload_tranche_schedules%ROWTYPE INDEX BY BINARY_INTEGER;           --aji
TYPE tbl_tr_schedules_in IS TABLE OF lbtbs_upload_tr_schedule_in%ROWTYPE INDEX BY BINARY_INTEGER; --05-MAR-2012 Flexcube V.CL Release 7.10, ITR2#35 IUT#303 changes

--CITILS46110204,Retro as part of Flexcube V CL Release 7.1 Changes starts
TYPE uplddiaryeventtbl IS TABLE OF OLTB_UPLD_CONTRACTDIARY_EVNT%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE uplddiarymsgrectbl IS TABLE OF OLTM_UPLDDIARY_MSG_RECEIVER%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE uplddiarymsgenttbl IS TABLE OF OLTM_UPLDDIARY_MSG_ENTITIES%ROWTYPE INDEX BY BINARY_INTEGER;
--CITILS46110204,Retro as part of Flexcube V CL Release 7.1 Changes ends
TYPE tbl_part_ccy_restr IS TABLE OF lbtbs_upload_part_ccy_restr%ROWTYPE INDEX BY BINARY_INTEGER;           --03-OCT-2006 FLEXCUBE V.CL Release 7.1 ITR2 SFR#1
TYPE tbl_part_bidd IS TABLE OF lbtbs_upload_part_bidding%ROWTYPE INDEX BY BINARY_INTEGER;           --03-OCT-2006 FLEXCUBE V.CL Release 7.1 ITR2 SFR#1
TYPE tbl_part_lcissuer IS TABLE OF lbtbs_upload_lcissuer%ROWTYPE INDEX BY BINARY_INTEGER;           --20-Feb-2007 FLEXCUBE V.CL Release 7.2 LC fee issuer by Aji
TYPE tbl_breakagefee IS TABLE OF lftbs_upload_partdriven_fee%ROWTYPE INDEX BY BINARY_INTEGER;           -- FLEXCUBE V.CL Release 7.2 ITR2, SFR#56 Breakage fee by Aji
--FCC V.CL 7.3 UK CONSOLIDATION RETRO Changes Starts
TYPE upldTranchSchTbl is TABLE of lbtbs_upload_tranche_schedules%ROWTYPE INDEX BY BINARY_INTEGER;		--CITILS46110309 Changes
--FCC V.CL 7.3 UK CONSOLIDATION RETRO Changes Ends
--08-JAN-2009 FLEXCUBE V.CL Release 7.4 MTR2 SFR#26, Interim Interest schedule Related Changes START.
TYPE tbl_interim_int_sch IS TABLE OF lbtbs_upload_interim_int_sch%ROWTYPE INDEX BY BINARY_INTEGER;
--08-JAN-2009 FLEXCUBE V.CL Release 7.4 MTR2 SFR#26, Interim Interest schedule Related Changes END.
FUNCTION FN_UPLOAD
           (
 	 	 pModule	    IN    oltbs_contract.module_code%Type,
		 pImpMode	    IN    Varchar2,
     pSource	     IN   VARCHAR2, --OBCL_14.3_Upload_Changes
     pProduct_Type IN   VARCHAR2  --OBCL_14.3_Upload_Changes
           )
RETURN BOOLEAN;

--Added by Satya on 04-JUN-2005
Function fn_facility_upload
(
	p_branch_code		IN	varchar2,
	p_module		IN	varchar2,
	p_source		IN	VARCHAR2, --OBCL_14.3_Upload_Changes
	p_imp_mode		IN	varchar2,
	p_total_records		OUT	number,
	p_failed_records	OUT	number,
	p_err_code		IN OUT	varchar2,
	p_err_params		IN OUT	varchar2
) return boolean;

Function fn_populate_fees
	(
	p_ext_contract_row		IN	oltbs_ext_contract_stat%rowtype,
	p_contract_ref_no 		IN	varchar2,
	p_version_no 			IN 	varchar2,
	p_event_seq_no 			IN 	varchar2,
	p_contract_status		IN	varchar2,
	p_auth_status			IN	varchar2,
	p_err 				OUT	varchar2,
	p_err_params 			OUT 	varchar2
	)
return boolean;

FUNCTION fn_upload_contract
   (
      psourcecode    IN       oltbs_upload_master.source_code%TYPE,
      pextrefno      IN       oltbs_upload_master.ext_contract_ref_no%TYPE,
      pimpmode       IN       VARCHAR2,
      pcuberefno     OUT      oltbs_contract.contract_ref_no%TYPE,
      perrorcode     IN OUT   VARCHAR2,
      perrorparams   IN OUT   VARCHAR2
   )
      RETURN BOOLEAN;

FUNCTION fn_insert_borr_part_tables (
	p_ext_contract_rec   IN 	oltbs_ext_contract_stat%ROWTYPE,
	p_contract_ref_no    IN 	oltbs_ext_contract_stat.citicube_ref_no%TYPE,
	p_serial_no 	   IN 	oltbs_contract.serial_no%TYPE,
	p_version_no	   IN 	NUMBER,
	p_esn 		   IN 	NUMBER,
	p_contract_type	   IN 	VARCHAR2,
	p_err_code		   IN OUT	VARCHAR2,
	p_err_params	   IN OUT	VARCHAR2
   )
	RETURN BOOLEAN;
--19-OCT-2007 FCC V.CL 7.3 UK CONSOLIDATION RETRO Start Here
-- FCC 7.3 RETRO of CITILS46110375 Changes START - added a function to remove external contract from upload tables, subject to not uploaded
	
	function fn_delete_ext_contract
		(p_source        in     varchar2
		,p_branch        in     varchar2
		,p_ext_ref       in     varchar2
		,p_commit_or_not in     varchar2 default 'N'
		,p_err_codes     in out varchar2
		,p_err_msgs      in out varchar2
		)
	return boolean;
	
	--added a function to upload single facility contract
	
	Function fn_single_fac_upload
	(
		p_external_ref_no	IN 	oltbs_ext_contract_stat.external_ref_no%type,
		p_source_code		in	cotms_source.source_code%type,
		p_branch_code		in	oltms_branch.branch_code%type,
		p_citicube_ref_no		IN OUT	oltbs_ext_contract_stat.citicube_ref_no%type,
		p_err_code			IN OUT	varchar2,
		p_err_params		IN OUT	varchar2
	) return boolean;

-- FCC 7.3 RETRO of CITILS46110375 Changes END
--19-OCT-2007 FCC V.CL 7.3 UK CONSOLIDATION RETRO End Here

-- FCC 7.3 RETRO of CITILS46110250 Changes START

 FUNCTION fn_diaryevent_validations (
	p_ext_contract_rec   IN 	oltbs_ext_contract_stat%ROWTYPE,
	p_err_code		   IN OUT	VARCHAR2,
	p_err_params	   IN OUT	VARCHAR2
   )
	RETURN BOOLEAN;
-- FCC 7.3 RETRO of CITILS46110250 Changes END
--19-OCT-2007 FCC V.CL 7.3 UK CONSOLIDATION RETRO Start Here
-- FCC 7.3 RETRO of CITILS46110253 Changes START
--CITILS46110253 Changes starts
 FUNCTION FN_UPLOAD
           (
		pextRefNo        	IN    		oltbs_ext_contract_stat.external_ref_no%Type,
		pModule		IN    		oltbs_contract.module_code%Type,
		pImpMode		IN    		Varchar2,
		pCubeRefNo	OUT		oltbs_contract.contract_ref_no%type,
		perrCode		IN OUT	VARCHAR2,
		perrParam		IN OUT	VARCHAR2,
		p_commit_or_not	IN	VARCHAR2 DEFAULT 'N'				--CITILS46110375 changes
           )
 RETURN BOOLEAN;
--CITILS46110253 Changes ends
-- FCC 7.3 RETRO of CITILS46110253 Changes END
--19-OCT-2007 FCC V.CL 7.3 UK CONSOLIDATION RETRO End Here
--FCC V.CL 7.3 UK CONSOLIDATION RETRO Changes Starts
--CITILS46210320
FUNCTION fn_validate_transfer
	(p_contract_ref_no IN VARCHAR2
	,p_value_date	   IN DATE
	,p_valid           OUT BOOLEAN
	)
RETURN BOOLEAN;

FUNCTION fn_upload_draft_transfer
	(p_contract_ref_no IN VARCHAR2
	,p_value_date	   IN DATE
	,p_err_codes       IN OUT VARCHAR2
	,p_err_params      IN OUT VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_delete_draft_transfer
	(p_contract_ref_no in varchar2
	,p_value_date	 in date
	)
RETURN BOOLEAN;
--CITILS46210320
--FCC V.CL 7.3 UK CONSOLIDATION RETRO Changes Ends
--FCC V.CL 7.3 UK CONSOLIDATION RETRO Changes Starts
--CITILS46210375B Changes Starts
FUNCTION fn_check_holiday
		(
		pdate		IN		lbtbs_drawdown_schedule.DRAWDOWN_DATE%TYPE,
		p_ccy 		IN 		lbtbs_drawdown_schedule.DRAWDOWN_CCY%TYPE,
		pErrorCode		IN	OUT	VARCHAR2,
		pErrorParams	IN	OUT	VARCHAR2
--OBCL 14.4 Financial Centre based holiday treatment Changes for LS Start           
        ,p_fincentre     IN VARCHAR2 DEFAULT NULL
--OBCL 14.4 Financial Centre based holiday treatment Changes for LS End   
		)
RETURN BOOLEAN;
--CITILS46210375B Changes Ends
--FCC V.CL 7.3 UK CONSOLIDATION RETRO Changes Ends

--Bug#37292205 Start

FUNCTION Fn_Facility_Upload_main( p_Source           IN Oltbs_Upload_Master.Source_Code%TYPE,
								  p_Source_Operation IN VARCHAR2,
								  p_Function_Id      IN VARCHAR2,
								  p_Action_Code      IN VARCHAR2,
								  Pextrefno          IN Oltbs_Upload_Master.Ext_Contract_Ref_No%TYPE,
								  Pimpmode           IN VARCHAR2,
								  p_Multi_Trip_Id    IN VARCHAR2,
								  p_Status           IN OUT VARCHAR2,
								  Pcuberefno         OUT Oltbs_Contract.Contract_Ref_No%TYPE,
								  p_Err_Code         IN OUT VARCHAR2,
								  p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

FUNCTION Fn_Upload_tr_dr_main (  p_Source           IN Oltbs_Upload_Master.Source_Code%TYPE,
								  p_Source_Operation IN VARCHAR2,
								  p_Function_Id      IN VARCHAR2,
								  p_Action_Code      IN VARCHAR2,
								  Pextrefno          IN Oltbs_Upload_Master.Ext_Contract_Ref_No%TYPE,
								  Pimpmode           IN VARCHAR2,
								  Pmodule            IN VARCHAR2,
								  p_Multi_Trip_Id    IN VARCHAR2,
								  p_Status           IN OUT VARCHAR2,
								  Pcuberefno         OUT Oltbs_Contract.Contract_Ref_No%TYPE,
								  p_Err_Code         IN OUT VARCHAR2,
								  p_Err_Params       IN OUT VARCHAR2
								 ) RETURN BOOLEAN;
--Bug#37292205 End

end lbpks_upload;
/
create or replace synonym lbpkss_upload for lbpks_upload
/
