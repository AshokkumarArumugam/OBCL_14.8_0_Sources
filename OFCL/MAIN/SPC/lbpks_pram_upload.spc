CREATE OR REPLACE PACKAGE lbpks_pram_upload
IS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: lbpks_pram_upload.spc
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

09-Jul-2008, FLEXCUBE V.CL 7.4 Release, this package is created newly to upload PRAM
07-OCT-2009 CITIUS-LS Till#6435, agency wrapper NPVAMI upload, changed the change history, Maneeha
25-Jun-2010 FLEXCUBE V.CL Release 7.7 FS Tag 3.3.5 Nonprorata Trades Changes
05-OCT-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag06 changes, added a new function Fn_consol_Pram_Upload										
---------------------------------------------------------------------------------------------------
  Changed By         : Anusha k
  Changed On         : 26-Sep-2022
  Change Reason      : assigned casc value to global variable
  Search String      : OBCL_14.5_SMTB_#34558814 CHANGES
*/
g_skim_upload_done       VARCHAR2(1) := 'N'; 
g_L_PAYER  LBTB_TRANCHE_SKIM_MASTER.PAYER_PARTICIPANT%TYPE;
 g_L_RECEIVER LBTB_TRANCHE_SKIM_MASTER.RECEIVER_PARTICIPANT%TYPE;
  g_casc_value  VARCHAR2(1) := 'Y'; --OBCL_14.5_SMTB_#34558814 CHANGES
	FUNCTION Fn_Pram_Upload
	  (
	   p_contract_ref_no 	 IN oltbs_contract_master.contract_ref_no%type ,
	   p_ext_contract_ref_no IN lbtbs_upload_pram_consol.ext_contract_ref_no%type,
	   p_value_date 	 IN lbtbs_upload_pram_consol.value_date%type,
	   p_upload_seq_no 	 IN lbtbs_upload_pram_consol.upload_seq_no%type,
	   P_Err_Code 		 OUT VARCHAR2 ,
	   P_Err_Param 		 OUT VARCHAR2)
	RETURN BOOLEAN;
	
	--07-OCT-2009 CITIUS-LS Till#6435, agency wrapper NPVAMI upload, starts
	FUNCTION fn_check_prime_contracts
		(p_contract_ref_no 	IN oltbs_contract_master.contract_ref_no%type,
		 p_value_date 		IN DATE,
		 P_Err_Code 		OUT VARCHAR2,
		 P_Err_Param 		OUT VARCHAR2
		 )
	RETURN BOOLEAN;
		FUNCTION Fn_Pram_Validation
		(P_contract_ref_no IN oltbs_contract_master.contract_ref_no%type,
		 P_value_date IN Date,
		 P_seq_no     IN Number,
		 P_Err_Code   OUT VARCHAR2,
		 P_Err_Param OUT VARCHAR2
		 )
	RETURN BOOLEAN;
	--07-OCT-2009 CITIUS-LS Till#6435, agency wrapper NPVAMI upload, ends
	
	 --25-Jun-2010 FLEXCUBE V.CL Release 7.7 FS Tag 3.3.5 Nonprorata Trades Changes starts
	FUNCTION fn_process_pram_for_cascno
				(
				 p_agency_ref_no 	IN	oltbs_contract_master.contract_ref_no%type,
				 p_trade_ref_no		IN	tltbs_contract_master.contract_ref_no%TYPE,
				 p_process_date 	IN	lbtbs_upload_pram_consol.value_date%type,
				 p_event_seq_no 	IN  	lbtbs_upload_pram_consol.upload_seq_no%type,
				 p_err_code		IN OUT	VARCHAR2,
				 p_err_params		IN OUT	VARCHAR2
				 )
	RETURN BOOLEAN;
	--25-Jun-2010 FLEXCUBE V.CL Release 7.7 FS Tag 3.3.5 Nonprorata Trades Changes ends
	--05-OCT-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag06 changes start
	FUNCTION Fn_consol_Pram_Upload
	  (p_browser_rec         IN tltbs_consol_ls_browser%rowtype,
	   P_Err_Code 		       IN OUT VARCHAR2 ,
	   P_Err_Param 		       IN OUT VARCHAR2)
	RETURN BOOLEAN;
	--05-OCT-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag06 changes end
END lbpks_pram_upload;
/
CREATE or replace SYNONYM lbpkss_pram_upload FOR lbpks_pram_upload
/