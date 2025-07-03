CREATE OR REPLACE PACKAGE lfpks_upload 
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : lfpks_upload.SPC
**
This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
--fcc4.2 feb 2003 TTS Changes added function fn_upload_new_charge()
10-APR-2009 FLEXCUBE V.CL Release 7.5 lot2 FS Tag 17 <Rate Type>, upload rate type changes
06-JUL-2009 FLEXCUBE V.CL Release 7.5 lot2 ITR2 SFR#8 CITIPBGIT SFR#191, Changes done for Rate Type change during Contract upload.

Changed BY         : Arunprasath
Changed on         : 08-Jan-2025
Changed Reason     : LS_Migration_Changes
Search String      : Bug#37292205

*/
   TYPE tbl_interest_type IS TABLE OF lftbs_upload_interest%ROWTYPE INDEX BY BINARY_INTEGER; --02-JUL-03  FCC 4.3 AUG 2003  CEEMEA Changes for TIDE
	FUNCTION fn_upload_interest
		(
                 p_branch_code     IN lftbs_upload_interest.branch_code%TYPE,
		 p_module_code     IN oltbs_contract.module_code%TYPE,
		 p_source_code     IN lftbs_upload_interest.source_code%TYPE,
		 p_source_ref      IN lftbs_upload_interest.source_ref%TYPE,
		 p_product         IN oltbs_contract.product_code%TYPE,
		 p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
		 p_error_code      IN OUT VARCHAR2,
		 p_error_parameter IN OUT VARCHAR2)
		RETURN BOOLEAN;

	FUNCTION fn_upload_charge
		 (p_branch_code     IN lftbs_upload_interest.branch_code%TYPE,
		  p_module_code     IN oltbs_contract.module_code%TYPE,
		  p_source_code     IN lftbs_upload_interest.source_code%TYPE,
		  p_source_ref      IN lftbs_upload_interest.source_ref%TYPE,
		  p_product         IN oltbs_contract.product_code%TYPE,
		  p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
		  p_customer        IN oltbs_contract.counterparty%TYPE,
		  p_error_code      IN OUT VARCHAR2,
		  p_error_parameter IN OUT VARCHAR2) 
                 RETURN BOOLEAN;

	--fcc4.2 TTS Changes Start
	FUNCTION fn_upload_new_charge
		(
                p_branch_code     IN lftbs_upload_interest.branch_code%TYPE,
		p_module_code     IN oltbs_contract.module_code%TYPE,
		p_source_code     IN lftbs_upload_interest.source_code%TYPE,
		p_source_ref      IN lftbs_upload_interest.source_ref%TYPE,
		p_product         IN oltbs_contract.product_code%TYPE,
		p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
		p_customer        IN oltbs_contract.counterparty%TYPE,
		p_error_code      IN OUT VARCHAR2,
		p_error_parameter IN OUT VARCHAR2)
		RETURN BOOLEAN;
	--fcc4.2 TTS Changes End

	-- New Function added to upload commission
	-- Raghavan 30/08/98 .
	FUNCTION fn_upload_commission
		(
                p_branch_code     IN lftbs_upload_commission.branch_code%TYPE,
		p_module_code     IN oltbs_contract.module_code%TYPE,
		p_source_code     IN lftbs_upload_commission.source_code%TYPE,
		p_source_ref      IN lftbs_upload_commission.source_ref%TYPE,
		p_product         IN oltbs_contract.product_code%TYPE,
		p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
		p_customer        IN oltbs_contract.counterparty%TYPE,
		p_error_code      IN OUT VARCHAR2,
		p_error_parameter IN OUT VARCHAR2)
		RETURN BOOLEAN;
	--02-JUL-03  FCC 4.3 AUG 2003  CEEMEA Changes for TIDE start
	FUNCTION fn_upload_interest
		(
                 p_module_code     IN oltbs_contract.module_code%TYPE,
		 p_product         IN oltbs_contract.product_code%TYPE,
		 p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
		 tb_interest       IN tbl_interest_type,
		 p_error_code      IN OUT VARCHAR2,
		 p_error_parameter IN OUT VARCHAR2)
		RETURN BOOLEAN;
	--02-JUL-03  FCC 4.3 AUG 2003  CEEMEA Changes for TIDE end
  
  --03-Mar-2006 FCC V.CL 7.1 margin related changes by RA start
  --This function is required to update margin rate..
	FUNCTION fn_populate_borrower_margin
		(
		p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
		p_latest_esn      IN NUMBER,
		p_err_code        IN OUT VARCHAR2,
		p_err_params      IN OUT VARCHAR2
		)
	RETURN BOOLEAN;
  --FCC V.CL 7.1 margin related changes by RA end
  --06-JUL-2009 FLEXCUBE V.CL Release 7.5 lot2 ITR2 SFR#8 CITIPBGIT SFR#191 COMMENTS STARTS
  /*
  --10-APR-2009 FLEXCUBE V.CL Release 7.5 lot2 FS Tag 17 <Rate Type> CHANGES STARTS
  	FUNCTION fn_validate_rate_type
		(
		p_source_code			IN	oltbs_upload_rate_fixing.source_code%TYPE,
		p_ext_ref_no			IN	olvws_upload_contract_master.ext_contract_ref_no%TYPE,
		p_contract_ref_no		IN	oltbs_contract.contract_ref_no%TYPE,
		p_error_code			IN OUT	VARCHAR2,
		p_error_param			IN OUT	VARCHAR2
		)
	RETURN BOOLEAN;	
  --10-APR-2009 FLEXCUBE V.CL Release 7.5 lot2 FS Tag 17 <Rate Type> CHANGES ENDS
  */
  --06-JUL-2009 FLEXCUBE V.CL Release 7.5 lot2 ITR2 SFR#8 CITIPBGIT SFR#191 COMMENTS ENDS
  
  --Bug#37292205 Start
	FUNCTION fn_populate_borrower_margin_main( p_contract_ref_no  IN oltbs_contract.contract_ref_no%TYPE,
										       p_Ext_Contract_Rec IN Oltbs_Ext_Contract_Stat%ROWTYPE,
										       p_lbdddonl         IN OUT lbpks_lbdddonl_main.ty_lbdddonl,
										       p_err_code         IN OUT VARCHAR2,
										       p_err_params       IN OUT VARCHAR2)
		RETURN BOOLEAN;
   --Bug#37292205 End

END lfpks_upload;
/
create or replace synonym lfpkss_upload for lfpks_upload
/