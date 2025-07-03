CREATE OR REPLACE package olpks_upload_ud as
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_upload_ud.SPC
**
** Module	: UD
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
/*---------------------------------------CHANGE HISTORY---------------------------------------------

01-AUG-2005 FCC 4.6.2 CITI CHANGES FOR UDE UPLOAD.New functions and Procedures Added for UDE Upload for CITI-Vijeth

---------------------------------------------------------------------------------------------------
*/


FUNCTION fn_udf_upload
	(
	  pBranchcode		IN OLTB_CONTRACT.branch%type ,
	  pSourcecode		IN varchar2 ,
	  pReference		IN VARCHAR2 ,
	  pContractrefno 	IN OLTB_CONTRACT.contract_ref_no%type

	) RETURN BOOLEAN;
TYPE tbl_udf_type IS TABLE OF oltbs_upload_userdef_fields%ROWTYPE INDEX BY BINARY_INTEGER;--02-JUL-03  FCC 4.3 AUG 2003  CEEMEA Changes for TIDE

--02-JUL-03  FCC 4.3 AUG 2003  CEEMEA Changes for TIDE
-- Vichu Changes Start -- Changed the signature of the function
FUNCTION fn_upload_udf
	(
		p_cube_ref_no		IN		VARCHAR2,
		tb_udf				IN		tbl_udf_type,
		p_error_code		IN OUT 	VARCHAR2,
		p_error_parameter	IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
-- Vichu Changes End -- Changed the signature of the function
--02-JUL-03  FCC 4.3 AUG 2003  CEEMEA Changes for TIDE

FUNCTION fn_update_udf
		 		(
				 p_source_code 	    IN  oltbs_upload_master.SOURCE_CODE%TYPE
				,p_branch_code	    IN  oltbs_upload_master.BRANCH%TYPE
				,p_external_ref_no  IN  oltbs_upload_master.EXT_CONTRACT_REF_NO%TYPE
				,p_error_code		IN OUT 	VARCHAR2
				,p_error_parameter	IN OUT	VARCHAR2
				 )
RETURN BOOLEAN;

--FCC 4.6.2 CITI UD CHANGES FOR UPLOAD CHANGES STARTS -RETROED BY VIJETH

gErrList	Varchar2(10000);
gErrParamList	Varchar2(10000);
gOvList		Varchar2(10000);
gOvParamList	Varchar2(10000);
gOvdSeqNo	Number := 0;
gErrSeqNo	Number := 0;

FUNCTION fn_upload_ud_event
		(
		pUploadtype		IN	varchar2,
		pExternalRefNo		IN	oltbs_liq_summary_upload.external_ref_no%TYPE,
		pCurrBranch		IN      varchar2,
		pErrCode		IN	OUT	varchar2,
		pErrParam		IN	OUT	Varchar2
		)
Return Boolean;

FUNCTION fn_upload_ud_event_contract
		(
		pExternalRefNo		IN	oltbs_liq_summary_upload.external_ref_no%TYPE,
		pCurrBranch		IN  	varchar2,
		pErrCode		IN	OUT	varchar2,
		pErrParam		IN	OUT	Varchar2
		)
Return Boolean;

PROCEDURE pr_append_errlist
	(
	pErrCode	IN 	Varchar2,
	pErrParam	IN	Varchar2
	);

--FCC 4.6.2 CITI UD CHANGES FOR UPLOAD CHANGES ENDS

end olpks_upload_ud;
/
CREATE or replace SYNONYM olpkss_upload_ud FOR olpks_upload_ud
/