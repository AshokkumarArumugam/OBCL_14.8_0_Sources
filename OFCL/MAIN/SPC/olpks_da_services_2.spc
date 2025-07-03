CREATE OR REPLACE PACKAGE olpks_da_services_2
IS

/*----------------------------------------------------------------------------------------------------
**
** File Name    : olpks_da_services_2.SPC
**
** Module       : Loans and Deposits (LD)
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
/*------------------------------------------------------------------------------------------------------------------------
CHANGE HISTORY

Date			Version		FCC Version		Site		Description
30-SEP-2003		1.0			4.4			BANGALORE	Initial Version for CEEMEA IAS39 CHanges

02-DEC-2004		2.0			4.7			BANGALORE	fn_delete_backup introduced (moved from daservs2.sql) 

3-DEC-2004 FCC 4.6.1 JAN 2005 EIM Enhancements changes 
	     Made fn_delete_main function public
- FCC 4.6.1 JAN 2005 ITR-1 SFR-196 For changing copyright clause / release name
CHANGE_HISTORY
------------------------------------------------------------------------------------------------------------------------
*/

FUNCTION	fn_copy_product
	(
	p_source_prd		IN		oltms_product.product_code%TYPE,
	p_dest_prd			IN		oltms_product.product_code%TYPE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_delete_product
	   (
	   p_code 			IN 		oltms_product_class_link.product%TYPE,
         p_error_code		IN OUT	VARCHAR2,
         p_error_parameter	IN OUT	VARCHAR2
	   )
RETURN BOOLEAN;

FUNCTION fn_validate_ccy_code
	   (
	   p_code 			IN 		oltms_product_class_link.product%TYPE,
         p_error_code		IN OUT	VARCHAR2,
         p_error_parameter	IN OUT	VARCHAR2
	   )
RETURN BOOLEAN;

FUNCTION fn_backup
	(
	p_module			IN		oltbs_contract.module_code%TYPE,
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
 	p_mode			IN		VARCHAR2,
 	p_error_code		IN OUT	VARCHAR2,
 	p_error_params		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_restore
	(
	p_module			IN		oltbs_contract.module_code%TYPE,
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
 	p_mode			IN		VARCHAR2,
 	p_error_code		IN OUT	VARCHAR2,
 	p_error_params		IN OUT	VARCHAR2
)
RETURN BOOLEAN;
-- FCC 4.6.1 2-DEC-2004 EIM enhancements for BC Starts
FUNCTION fn_delete_backup
(
	p_module			IN		oltbs_contract.module_code%TYPE,
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
 	p_mode			IN		VARCHAR2,
 	p_error_code		IN OUT	VARCHAR2,
 	p_error_params		IN OUT	VARCHAR2
)
RETURN BOOLEAN;
-- FCC 4.6.1 2-DEC-2004 EIM enhancements for BC Ends
-- 3-DEC-2004 FCC 4.6.1 JAN 2005 EIM Enhancements changes starts
FUNCTION fn_delete_main
(
	p_module			IN		oltbs_contract.module_code%TYPE,
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
 	p_mode			IN		VARCHAR2,
 	p_error_code		IN OUT	VARCHAR2,
 	p_error_params		IN OUT	VARCHAR2
)
RETURN BOOLEAN;
-- 3-DEC-2004 FCC 4.6.1 JAN 2005 EIM Enhancements changes ends
--------------------------------------------------------------------------------------------------------------------------
END olpks_da_services_2;
/
CREATE or replace SYNONYM olpkss_services_2 FOR olpks_da_services_2
/