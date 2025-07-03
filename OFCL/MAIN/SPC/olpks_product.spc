CREATE OR REPLACE PACKAGE olpks_product 
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_product.SPC
**
** Module		: CORE
**
This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
--------------------------------------------------------------------------------------------------------
*/

/* CHANGE_HISTORY
26-JULY-2004	FCC 4.6 Retro from PLC 4.3

Derivatives related Changes
Added two new functions
FN_PROD_SERVER_DELETE and FN_PROD_SERVER_COPY.

CHANGE HISTORY : 09-MAR-2000 FLEXCUBE 4.0.1.5
The client side copy /delete was shifted to the server side.( fn_prod_server_copy and
fn_prod_server_delete).Change was also made in fn subsystem copy to take care the
newly added interest fields.

*/



	FUNCTION fn_isContract
			( pm_Product      IN oltms_product.product_code%TYPE)
	RETURN BOOLEAN;

	FUNCTION fn_isProduct
			( pm_Product      IN oltms_product.product_code%TYPE)
	RETURN BOOLEAN;

	FUNCTION fn_cpyProduct
			( pm_source_prd IN oltms_product.product_code%TYPE,
			  pm_dest_prd IN oltms_product.product_code%TYPE,
			  pm_ErrorCd  OUT ERTBS_MSGS.err_code%TYPE) 
	RETURN BOOLEAN;

	FUNCTION fn_iccf_liquidated
			( pm_product	IN oltms_product.product_code%TYPE)
	RETURN BOOLEAN;

	FUNCTION FN_PROD_SERVER_DELETE (
		pm_module    		in 	SMTBS_MODULES.MODULE_ID%TYPE,
		pm_unit_type            in      oltbs_class_mapping.unit_type%type,
		pm_branch               in      oltms_branch.branch_code%type,
		pm_product              in      varchar2,
		pm_type                 in      char,
		pm_error_code		out     varchar2,
		pm_error_parameter	out 	  varchar2 )
	RETURN BOOLEAN;


	FUNCTION FN_PROD_SERVER_COPY (
		pm_module    		in 	SMTBS_MODULES.MODULE_ID%TYPE,
		pm_old_branch           in      oltms_branch.branch_code%type,
		pm_old_product          in      varchar2,
		pm_unit_type            in      oltbs_class_mapping.unit_type%type,
		pm_new_branch           in      oltms_branch.branch_code%type,
		pm_new_product          in      varchar2,
		pm_type                 in      char,
		pm_error_code		out     varchar2,
		pm_error_parameter	out 	  varchar2 )

	RETURN BOOLEAN;

END olpks_product;
/
CREATE or replace SYNONYM olpkss_product FOR olpks_product
/