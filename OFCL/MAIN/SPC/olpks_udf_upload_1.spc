CREATE OR REPLACE PACKAGE olpks_udf_upload_1
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_udf_upload_1.SPC
**
** Module		: SETTLEMENTS
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
/*
CHANGE_HISTORY
*/

FUNCTION fn_upload	
				(	
					p_udf_table		IN		olpkss_upload_ud.tbl_udf_type,
					p_module		IN		oltms_product.module%TYPE,
					p_product		IN		oltms_product.product_code%TYPE,
					p_contract_ref_no	IN		oltbs_contract.contract_ref_no%TYPE,	
					p_version_no	IN		oltbs_contract.latest_version_no%TYPE	DEFAULT 1,	
					p_error		IN OUT	VARCHAR2,	
					p_error_params	IN OUT	VARCHAR2
				)
RETURN BOOLEAN;

END olpks_udf_upload_1;
/
CREATE or replace SYNONYM olpkss_udf_upload_1 FOR olpks_udf_upload_1
/