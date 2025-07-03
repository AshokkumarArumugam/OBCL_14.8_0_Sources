CREATE OR REPLACE PACKAGE lbpks_pram_book
AS


/*----------------------------------------------------------------------------------------------------
**
** File Name	: lbpks_pram_book.spc
**
** Module	: LOAN SYNDICATION
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


/*----------------------------------CHANGE HISTORY----------------------------------

17/03/2003 - FCC 4.2 April 2003 LS changes

   This package is created to process the participant side transfer activities based on the contract screen for the same

08-AUG-2005 FCC 4.6.2 CITI LS CHANGES - PRAM.
	Modified to incorporate the Value Date column addition in LSTB_CONTRACT_PARTICPANT and lbtb_participant_ratio
	Added a new function FN_PRAM_UNLOCK, FN_PASS_ENTRIES_PRAM
13-MAR-2006 FCC V.CL RELEASE 7.0 ADDED 2 FUNCTIONS FN_CREATE_NEW_VERSION TO INCORPORATE VERSION NO RELATED CHANGES DAYA
18-AUG-2006 FLEXCUBE V.CL RELEASE 7.1 BVPRAM CHANGES BY PIYUSH
            New Functions fn_populate_amount_due, FN_INSERT_PARTICIPANT_VDBAL, FN_POPULATE_TRANCHE_PART_VDBAL,
            FN_REBUILD_PART_VDBAL, FN_BUILD_PART_TRANSFER_VDBAL introduced.
18-AUG-2006 FLEXCUBE V.CL Release 7.1 BVPRAM CHANGES VIJETH
            New functions FN_INSERT_PART_DETAILS and FN_UNLOCK_CONTRACT_NEW introduced.
21-AUG-2006 FLEXCUBE V.CL RELEASE 7.1 BVPRAM CHANGES BY SAMBHAJI
            fn_backup_vdbal and fn_restore_vdbal functions introduced.
23-AUG-2006 FLEXCUBE V.CL RELEASE 7.1 BVPRAM CHANGES BY SAMBHAJI
            fn_propagate_ratio introduced.
20-OCT-2006 FCC7.1 CITIUS-LS Retros, Till#157
	24-AUG-2006 FLEXCUBE V.CL RELEASE 7.1 BVPRAM CHANGES BY SAMBHAJI
	            fn_propagate_ratio with 6 params introduced.
	15-SEP-2006 FLEXCUBE V.CL Release 7.1 ITR1 SFR#51 SAMBHAJI function fn_propagate_ratio_tr introduced.
	21-SEP-2006 FLEXCUBE V.CL Release 7.1 ITR1 SFR#139
	            vdbal backup functions removed. olpks_ln_synd_services will be used.
--08-JAN-2007 FCC7.1 CITIUS-LS by PIYUSH Till#231: Retro of December'06 Release from Bangalore,starts
--17-NOV-2006 FLEXCUBE V.CL Release 7.2 Date Many to Many PRAM changes
------------------------------------END CHANGE HISTORY-------------------------------------
*/


	FUNCTION fn_unlock_contract
		(
		p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE
		,p_latest_esn			IN		oltbs_contract.latest_event_seq_no%TYPE
		,p_module_code			IN		oltbs_contract.module_code%TYPE
		,p_contract_status		IN	 	oltbs_contract.contract_status%TYPE
		,p_contract_type		IN		lbtbs_contract_participant.contract_type%TYPE
		,p_drawdown_no			IN		lbtbs_contract_participant.drawdown_no%TYPE
		,P_VALUE_DATE			IN		DATE -- 29-JUL-2006 FLEXCUBE V.CL RELEASE 7.1 BVPRAM CHANGES  BY PIYUSH
		,p_err_code				OUT		VARCHAR2
		,p_err_param			OUT		VARCHAR2
		)
	RETURN BOOLEAN;

	FUNCTION fn_save_contract
		(
		p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE
		,p_latest_esn			IN		oltbs_contract.latest_event_seq_no%TYPE
		,p_module_code			IN		oltbs_contract.module_code%TYPE
		,p_contract_status		IN	 	oltbs_contract.contract_status%TYPE
		,p_contract_type		IN		lbtbs_contract_participant.contract_type%TYPE
		,p_drawdown_no			IN		lbtbs_contract_participant.drawdown_no%TYPE
		,p_br_facility_ref_no	IN		oltbs_contract.contract_ref_no%TYPE
		,p_br_tranche_ref_no	IN		oltbs_contract.contract_ref_no%TYPE
		,p_base_latest_esn		IN		oltbs_contract.latest_event_seq_no%TYPE
		,P_VALUE_DATE		IN		DATE
		,p_err_code				OUT		VARCHAR2
		,p_err_param			OUT		VARCHAR2
		)
	RETURN BOOLEAN;

	FUNCTION fn_book_participant_contract
		(
		p_contract_ref_no		IN 		lbtbs_contract_participant.contract_ref_no%TYPE
		,p_module_code		IN		oltbs_contract.module_code%TYPE
		,p_contract_type		IN		lbtbs_contract_participant.contract_type%TYPE
		,p_drawdown_no		IN		lbtbs_contract_participant.drawdown_no%TYPE
		,p_br_facility_ref_no	IN		oltbs_contract.contract_ref_no%TYPE
		,p_br_tranche_ref_no	IN		oltbs_contract.contract_ref_no%TYPE
		,p_value_date		IN		DATE
		,p_participant		IN		lbtbs_contract_participant.participant%TYPE
		,p_err_code				OUT	VARCHAR2
		,p_err_param			OUT	VARCHAR2
		)
	RETURN BOOLEAN;

	FUNCTION fn_amend_participant_contract
		(
		p_br_contract_ref_no	IN 		oltbs_contract.contract_ref_no%TYPE
		,p_contract_type		IN		lbtbs_contract_participant.contract_type%TYPE
		,p_participant		IN	lbtbs_contract_participant.participant%TYPE
		,p_asset_ratio		IN	lbtbs_contract_participant.asset_ratio%TYPE
		,p_value_date		IN		DATE
		,p_err_code				OUT	VARCHAR2
		,p_err_param			OUT	VARCHAR2
		)
	RETURN BOOLEAN;

	FUNCTION fn_delete_contract
		(
		p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE
		,p_event_seq_no			IN		lbtbs_contract_participant.event_seq_no%TYPE
		,p_contract_type		IN		lbtbs_contract_participant.contract_type%TYPE
		,p_latest_esn			IN		oltbs_contract.latest_event_seq_no%TYPE
		,p_value_date			IN		date -- Till#157 --FLEXCUBE V.CL RELEASE 7.1 BVPRAM CHANGES BY SAMBHAJI
		,p_err_code				OUT		VARCHAR2
		,p_err_param			OUT		VARCHAR2
		)
	RETURN BOOLEAN;

	FUNCTION fn_authorise_contract
		(
		p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE
		,p_event_seq_no			IN		oltbs_contract.latest_event_seq_no%TYPE
		,p_contract_type		IN		lbtbs_contract_participant.contract_type%TYPE
		,P_VALUE_DATE			IN		DATE -- 29-JUL-2006 FLEXCUBE V.CL RELEASE 7.1 BVPRAM CHANGES  BY PIYUSH
		,p_err_code				OUT		VARCHAR2
		,p_err_param			OUT		VARCHAR2
		)
	RETURN BOOLEAN;

	FUNCTION Fn_Pass_Entries_PRAM
	(	p_borrower_contract_ref_no	IN		VARCHAR2,
		p_value_date			IN		DATE,
		p_esn					IN		oltbs_contract_master.event_seq_no%TYPE,
		p_contract_type			IN		VARCHAR2,
		p_err_code				IN OUT	VARCHAR2,
		p_err_param				IN OUT	VARCHAR2
	) RETURN BOOLEAN;

     --03-MAR-2006 FCC V.CL 7.0 RELEASE CHANGES DAYA START
      FUNCTION fn_create_new_version(p_reference_no		IN varchar2,
						 p_update_cstb		IN varchar2 DEFAULT 'Y',
						 p_replicate_sch_defn	IN varchar2 DEFAULT 'Y',
						 p_new_event_seq_no	IN number ,
						 p_value_date		IN DATE -- 29-JUL-2006 FLEXCUBE V.CL RELEASE 7.1 BVPRAM CHANGES  BY PIYUSH
						 )
   	RETURN NUMBER;

      FUNCTION fn_create_new_version
		(
		   p_ldtbs_contract_master_rec	IN oltbs_contract_master%ROWTYPE,
		   p_update_cstb				IN varchar2 DEFAULT 'Y',
		   p_replicate_sch_defn			IN varchar2 DEFAULT 'Y',
		   p_new_event_seq_no			IN number,
		   p_value_date			IN DATE -- 29-JUL-2006 FLEXCUBE V.CL RELEASE 7.1 BVPRAM CHANGES  BY PIYUSH
		)
     RETURN NUMBER;
    --03-MAR-2006 FCC V.CL 7.0 RELEASE CHANGES DAYA ENDS
	--25-JUL-2006 FLEXCUBE V.CL Release 7.1 BVPRAM CHANGES,PIYUSH
	FUNCTION fn_populate_amount_due(p_contract_ref_no	IN		oltbs_contract.contract_ref_no%Type,
				 p_participant		IN  lbtbs_contract_participant.participant%TYPE,--Madhu
				p_error_code		IN OUT		VARCHAR2,
				p_error_param	IN OUT		VARCHAR2)
	RETURN BOOLEAN;
	--25-JUL-2006 FLEXCUBE V.CL Release 7.1 BVPRAM CHANGES,PIYUSH

--31-JUL-2006 FLEXCUBE V.CL Release 7.1 BVPRAM CHANGES,PIYUSH
	FUNCTION FN_INSERT_PARTICIPANT_VDBAL(p_contract_ref_no IN oltbs_contract.contract_ref_no%type,
                                         p_participant     IN varchar2,
                                         p_value_date      IN date,
                                         p_contract_ccy    IN varchar2,
                                         p_action          IN varchar2,
                                         p_amount          IN number
                                         )
	RETURN BOOLEAN;

	 FUNCTION FN_POPULATE_TRANCHE_PART_VDBAL(p_borr_tranche_ref_no IN oltbs_contract.contract_ref_no%type,
                                            p_counterparty IN varchar2,
                                            p_value_date   IN date,
                                            p_currency     IN varchar2,
                                            p_amount       IN number
                                           )
	RETURN BOOLEAN;

	FUNCTION FN_REBUILD_PART_VDBAL(p_contract_ref_no IN  oltbs_contract.contract_ref_no%type,
                                 p_value_date      IN  date,
				 p_err_code        out varchar2,
                                 p_err_param       out varchar2)
	RETURN BOOLEAN;

	 FUNCTION FN_BUILD_PART_TRANSFER_VDBAL(p_contract_ref_no IN oltbs_contract.contract_ref_no%type,
                                          p_value_date      IN date,
                                          p_currency        IN varchar2,
                                          p_esn             IN number,
                                          p_contract_type   IN lbtbs_contract_participant.contract_type%type,
                                          p_err_code        out varchar2,
                                          p_err_param       out varchar2
                                         )
	RETURN BOOLEAN;
--31-JUL-2006 FLEXCUBE V.CL Release 7.1 BVPRAM CHANGES,PIYUSH
        gPram_event Varchar2(1):='N';
--FLEXCUBE V.CL Release 7.1 BVPRAM CHANGES VIJETH INTRODUCED starts
FUNCTION FN_INSERT_PART_DETAILS(
			      P_CONTRACT_REF_NO IN oltbs_contract.CONTRACT_REF_NO%TYPE,
                              P_LATEST_ESN      IN oltbs_contract.LATEST_EVENT_SEQ_NO%TYPE,
                              P_NEW_ESN		IN oltbs_contract.LATEST_EVENT_SEQ_NO%TYPE,
                              P_MODULE_CODE     IN oltbs_contract.MODULE_CODE%TYPE,
                              P_CONTRACT_STATUS IN oltbs_contract.CONTRACT_STATUS%TYPE,
                              P_CONTRACT_TYPE   IN lbtbs_contract_participant.CONTRACT_TYPE%TYPE,
                              P_DRAWDOWN_NO     IN lbtbs_contract_participant.DRAWDOWN_NO%TYPE,
			      P_VALUE_DATE	IN DATE,
                              P_ERR_CODE        OUT VARCHAR2,
                              P_ERR_PARAM       OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION FN_UNLOCK_CONTRACT_NEW(P_CONTRACT_REF_NO IN oltbs_contract.CONTRACT_REF_NO%TYPE,
                              P_LATEST_ESN      IN oltbs_contract.LATEST_EVENT_SEQ_NO%TYPE,
                              P_MODULE_CODE     IN oltbs_contract.MODULE_CODE%TYPE,
                              P_CONTRACT_STATUS IN oltbs_contract.CONTRACT_STATUS%TYPE,
                              P_CONTRACT_TYPE   IN lbtbs_contract_participant.CONTRACT_TYPE%TYPE,
                              P_DRAWDOWN_NO     IN lbtbs_contract_participant.DRAWDOWN_NO%TYPE,
			      P_VALUE_DATE	IN DATE, -- 29-JUL-2006 FLEXCUBE V.CL RELEASE 7.1 BVPRAM CHANGES  BY PIYUSH
                              P_ERR_CODE        OUT VARCHAR2,
                              P_ERR_PARAM       OUT VARCHAR2
                            )
RETURN BOOLEAN ;

PROCEDURE pr_set_pram(p_status IN VARCHAR2);
--FLEXCUBE V.CL Release 7.1 BVPRAM CHANGES VIJETH INTRODUCED ends;
-- Till#157 Begin
/* --FLEXCUBE V.CL Release 7.1 ITR1 SFR#139 start
--FLEXCUBE V.CL RELEASE 7.1 BVPRAM CHANGES BY SAMBHAJI START 21AUG06
FUNCTION fn_backup_vdbal(P_CONTRACT_REF_NO VARCHAR2,P_VALUE_DATE DATE)
RETURN BOOLEAN;
FUNCTION fn_restore_vdbal(P_CONTRACT_REF_NO VARCHAR2,P_VALUE_DATE DATE)
RETURN BOOLEAN;
--FLEXCUBE V.CL RELEASE 7.1 BVPRAM CHANGES BY SAMBHAJI END 21AUG06
*/ --FLEXCUBE V.CL Release 7.1 ITR1 SFR#139 end
-- Till#157 End
--FLEXCUBE V.CL RELEASE 7.1 BVPRAM CHANGES BY SAMBHAJI START 23AUG06
FUNCTION FN_PROPAGATE_RATIO(  P_CONTRACT_REF_NO IN  oltbs_contract.CONTRACT_REF_NO%TYPE,
                              P_VALUE_DATE      IN  DATE,
                              P_CURRENCY        IN  oltbs_contract.CONTRACT_CCY%TYPE,
                              P_ESN             IN  oltbs_contract.LATEST_EVENT_SEQ_NO%TYPE,
                              P_ERR_CODE        OUT VARCHAR2,
                              P_ERR_PARAM       OUT VARCHAR2
                           )
RETURN BOOLEAN;
--FLEXCUBE V.CL RELEASE 7.1 BVPRAM CHANGES BY SAMBHAJI END 23AUG06
-- Till#157 Begin
--FLEXCUBE V.CL Release 7.1 ITR1 SFR#51 SAMBHAJI start
/*
--FLEXCUBE V.CL RELEASE 7.1 BVPRAM CHANGES BY SAMBHAJI 24AUG06 START
FUNCTION FN_PROPAGATE_RATIO(P_CONTRACT_REF_NO IN  oltbs_contract.CONTRACT_REF_NO%TYPE,
                            P_VALUE_DATE      IN  DATE,
                            P_ESN             IN  oltbs_contract.LATEST_EVENT_SEQ_NO%TYPE,
                            P_ERR_CODE        OUT VARCHAR2,
                            P_ERR_PARAM       OUT VARCHAR2
                           )
RETURN BOOLEAN;
--FLEXCUBE V.CL RELEASE 7.1 BVPRAM CHANGES BY SAMBHAJI 24AUG06 END
*/
--08-JAN-2007 FCC7.1 CITIUS-LS by PIYUSH Till#231: Retro of December'06 Release from Bangalore,starts
  --17-NOV-2006 FLEXCUBE V.CL Release 7.2 Date Many to Many PRAM changes start
  /*FUNCTION FN_PROPAGATE_RATIO_TR(  P_CONTRACT_REF_NO IN  oltbs_contract.CONTRACT_REF_NO%TYPE,
                                   P_VALUE_DATE      IN  DATE,
                                   P_ESN             IN  oltbs_contract.LATEST_EVENT_SEQ_NO%TYPE,
                                   P_PREPONED_PARTICIPANTS OUT VARCHAR2,
                                   P_ERR_CODE        OUT VARCHAR2,
                                   P_ERR_PARAM       OUT VARCHAR2
                                )
  RETURN BOOLEAN;*/
--17-NOV-2006 FLEXCUBE V.CL Release 7.2 Date Many to Many PRAM changes end
--08-JAN-2007 FCC7.1 CITIUS-LS by PIYUSH Till#231: Retro of December'06 Release from Bangalore,ends
  gp_preponed_participants varchar2(4000) := null;

--FLEXCUBE V.CL Release 7.1 ITR1 SFR#51 SAMBHAJI end
--08-JAN-2007 FCC7.1 CITIUS-LS by PIYUSH Till#231: Retro of December'06 Release from Bangalore,starts
--17-NOV-2006 FLEXCUBE V.CL Release 7.2 Date Many to Many PRAM changes start
FUNCTION FN_CONVERT_DETAIL_CONSOL
	(p_contract_ref_no varchar2 	,
	 p_value_date date 		,
	 p_event_seq_no number 		,
	 p_Err_code	in out Varchar2,
	 p_Err_param	in out Varchar2)
RETURN BOOLEAN;
FUNCTION fn_recalc_ratio
	(p_contract_ref_no       	IN oltbs_contract.CONTRACT_REF_NO%TYPE,
         p_value_date            	IN DATE,
         p_esn                   	IN oltbs_contract.LATEST_EVENT_SEQ_NO%TYPE,
         p_preponed_participants 	OUT VARCHAR2,
         p_err_code              	OUT VARCHAR2,
         p_err_param             	OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION FN_UPDATE_PART_CONTRACT_MASTER(  P_CONTRACT_REF_NO IN  oltbs_contract.CONTRACT_REF_NO%TYPE,
                                 P_VALUE_DATE      IN  DATE,
                                 P_ESN             IN  oltbs_contract.LATEST_EVENT_SEQ_NO%TYPE,
                                 P_ERR_CODE        OUT VARCHAR2,
                                 P_ERR_PARAM       OUT VARCHAR2
                              )
RETURN BOOLEAN;
--17-NOV-2006 FLEXCUBE V.CL Release 7.2 Date Many to Many PRAM changes end
--08-JAN-2007 FCC7.1 CITIUS-LS by PIYUSH Till#231: Retro of December'06 Release from Bangalore,ends
-- Till#157 End
END lbpks_pram_book;
/
CREATE or replace SYNONYM lbpkss_pram_book	FOR lbpks_pram_book
/