CREATE OR REPLACE PACKAGE olpks_upload_amdmnt2_custom AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_upload_amdmnt2_custom.SPC
**
** Module		: Oracle Lending
**
	This source is part of the Oracle Flexcube Corporate Lending  Software Product.   
	Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/

/*----------------------------------CHANGE HISTORY----------------------------------

  Date               : 08-Sep-2020
  Changed By         : Vineeth T M
  Change Description : HOOK REQUEST :: STP ENHANCEMENTS IN LB FOR CUSTOM ICCF FIELDS(forward port)
  Search String      : bug#31825343 Changes
------------------------------------END CHANGE HISTORY-------------------------------------
*/



	FUNCTION fn_pre_create_new_version
	(
		p_contract_record			IN 		oltbs_contract%ROWTYPE
	,	p_error_code			IN OUT	VARCHAR2
	,	p_error_parameter			IN OUT	VARCHAR2
	)
	RETURN BOOLEAN; 
	
	FUNCTION fn_post_create_new_version
	(
		p_contract_record			IN 		oltbs_contract%ROWTYPE
	,	p_error_code			IN OUT	VARCHAR2
	,	p_error_parameter			IN OUT	VARCHAR2
	)
	RETURN BOOLEAN; 

  --bug#31825343 Changes starts
  FUNCTION FN_PRE_VALIDATE_INTEREST(P_SOURCE_CODE      IN OLTBS_UPLOAD_AMEND_INTEREST.SOURCE_CODE%TYPE,
                                P_BRANCH_CODE      IN OLTBS_UPLOAD_AMEND_INTEREST.BRANCH_CODE%TYPE,
                                P_USER_REF_NO      IN OLTBS_UPLOAD_AMEND_INTEREST.USER_REF_NO%TYPE,
                                P_AMENDMENT_SEQ_NO IN OLTBS_UPLOAD_AMEND_INTEREST.AMENDMENT_SEQ_NO%TYPE,
                                P_CONTRACT_REF_NO  IN OLTBS_CONTRACT.CONTRACT_REF_NO%TYPE,
                                P_EVENT_SEQ_NO     IN OLTBS_CONTRACT.LATEST_EVENT_SEQ_NO%TYPE,
                                P_PRODUCT_CODE     IN OLTBS_CONTRACT.PRODUCT_CODE%TYPE,
                                P_AMEND_VALUE_DATE IN OLTBS_UPLOAD_AMEND_DUE.VALUE_DATE%TYPE,
                                P_CHANGE_LOG_TABLE IN OUT OLPKSS_UPLOAD_AMENDMENT_1.G_CHANGE_LOG_TABLE_TYPE,
                                P_ICCF_CHANGED     IN OUT BOOLEAN,
                                P_RATE_TYPE_CHANGE OUT VARCHAR2,
                                P_ERROR_CODE       IN OUT VARCHAR2,
                                P_ERROR_PARAMETER  IN OUT VARCHAR2,
                              l_fn_call_id      in out number,
                              l_Tb_Custom_Data  IN OUT  global.Ty_Tb_Custom_Data)
  RETURN BOOLEAN;
FUNCTION FN_POST_VALIDATE_INTEREST(P_SOURCE_CODE      IN OLTBS_UPLOAD_AMEND_INTEREST.SOURCE_CODE%TYPE,
                                P_BRANCH_CODE      IN OLTBS_UPLOAD_AMEND_INTEREST.BRANCH_CODE%TYPE,
                                P_USER_REF_NO      IN OLTBS_UPLOAD_AMEND_INTEREST.USER_REF_NO%TYPE,
                                P_AMENDMENT_SEQ_NO IN OLTBS_UPLOAD_AMEND_INTEREST.AMENDMENT_SEQ_NO%TYPE,
                                P_CONTRACT_REF_NO  IN OLTBS_CONTRACT.CONTRACT_REF_NO%TYPE,
                                P_EVENT_SEQ_NO     IN OLTBS_CONTRACT.LATEST_EVENT_SEQ_NO%TYPE,
                                P_PRODUCT_CODE     IN OLTBS_CONTRACT.PRODUCT_CODE%TYPE,
                                P_AMEND_VALUE_DATE IN OLTBS_UPLOAD_AMEND_DUE.VALUE_DATE%TYPE,
                                P_CHANGE_LOG_TABLE IN OUT OLPKSS_UPLOAD_AMENDMENT_1.G_CHANGE_LOG_TABLE_TYPE,
                                P_ICCF_CHANGED     IN OUT BOOLEAN,
                                P_RATE_TYPE_CHANGE OUT VARCHAR2,
                                P_ERROR_CODE       IN OUT VARCHAR2,
                                P_ERROR_PARAMETER  IN OUT VARCHAR2,
                              l_fn_call_id      in out number,
                              l_Tb_Custom_Data  IN OUT  global.Ty_Tb_Custom_Data)
  RETURN BOOLEAN;
  --bug#31825343 Changes ends
END olpks_upload_amdmnt2_custom;
/
CREATE or replace SYNONYM olpkss_upload_amdmnt2_custom FOR olpks_upload_amdmnt2_custom
/