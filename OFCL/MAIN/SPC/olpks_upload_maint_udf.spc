CREATE OR REPLACE PACKAGE olpks_upload_maint_udf AS

/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_upload_maint_udf.SQL
**
** Module		: CORE
**
	This source is part of the Oracle Flexcube Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/

/*
CHANGE HISTORY

DATE CREATED	09/MAR/2001
AUTHOR		Guruprasad

This Package is for upload of UDF for Maintenance. The upload table is
OLTM_UPLOAD_UDF_VALS. If the Primary key of the Table for which UDFs are
being uploaded has 2 columns then the REC_KEY to have 'VAL1~VAL2' i.e without
Leading/Trailing ~. Upload Stat is updated as 'E' or 'S' based on whether the
upload is successful or not.

Table for the Function Id is to be present in the table oltms_func_table_map
*/

FUNCTION fn_upload_udf
		(
		pErrCode	IN OUT	VARCHAR2
		)
Return Boolean;

FUNCTION fn_upload_udf_funcid
		(
		pFuncId			IN		VARCHAR2,
		pTblName		IN		VARCHAR2,
		pErrCode		IN OUT		VARCHAR2
		)
Return Boolean;
FUNCTION fn_validate_udf
		(
		pUdfVAl			IN		CSTMS_UDF_VALS.field_val%Type,
		pudfRec			IN		oltms_user_fields%RowType,
		pErrCode		IN OUT		VARCHAR2
		)
RETURN BOOLEAN;
--
--FCC 4.3.1 OCT 2003 Changes Starts
--
FUNCTION fn_upload_udf_funcid
		(
		p_function_id		IN		VARCHAR2,
		p_tbl_name		IN		VARCHAR2,
		p_contract_ref_no	IN		VARCHAR2,
		p_ext_contract_ref_no	IN		VARCHAR2,
		p_err_code		IN OUT		VARCHAR2
		)
RETURN BOOLEAN;
--FCC 4.3.1 OCT 2003 Changes Ends

END olpks_upload_maint_udf;
/
CREATE or replace SYNONYM olpkss_upload_maint_udf for olpks_upload_maint_udf
/