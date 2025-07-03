CREATE OR REPLACE PACKAGE olpks_st_misc
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_st_misc.SPC
**
** Module		: Static Maintainance
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
FCC 4.4 DEC2003 changes for confirm new package
07-NOV-2008 CITIUS-LS#SRT1451 - CITIUS-LS Till#1230 and CITIUS-LS Till#1379 STP Consolidation - added new functionsfn_check_cust_classification,fn_check_part_classification and fn_check_cust_classification
	10-APR-2008 CITIUS-LS Till#1230 Changes for uploading classification field for customer from Rapid. Adding validation If the customer is having classification as Current.
	10-Sep-2008 CITIUS-LS Till#1379,Added Module Check for FT, added event code ad parameter to the functions.
11-JUL-2012 Flexcube V.CL Release 7.11 ITR1 SFR#44 Changes,fn_check_udf_unique added to check the uniqueness of the udf value.
*/


FUNCTION fn_get_static_maint
(
      p_main_type    			IN     	oltms_static_maintenance.maintenance_type%TYPE,
      p_field    				IN     	oltms_static_maintenance.field_name%TYPE,
      p_static_maintenance_type 	IN OUT 	oltms_static_maintenance%ROWTYPE ,
      p_err_code    			IN OUT 	VARCHAR2,
      p_err_param    			IN OUT 	VARCHAR2
)

RETURN BOOLEAN;
-- 07-NOV-2008 CITIUS-LS#SRT1451 - CITIUS-LS Till#1230 and CITIUS-LS Till#1379 added new functions changes Starts
--CITIUS-LS Till#1230 starts
FUNCTION fn_check_cust_classification
			(
				p_contract_ref_no	IN	VARCHAR2,
				p_customer			IN	VARCHAR2,
				p_err_param			IN	OUT VARCHAR2,
				p_err_code			IN	OUT VARCHAR2,
				p_action_code		IN	VARCHAR2 DEFAULT 'X',
				p_module			IN	VARCHAR2 DEFAULT 'XX',
				p_esn				IN	NUMBER	 DEFAULT  0,
				p_prod_type			IN	VARCHAR2 DEFAULT 'X',
				p_credit_line		IN	VARCHAR2 DEFAULT 'XXXX'
			)
RETURN BOOLEAN;

FUNCTION fn_check_part_classification
			(
				p_contract_ref_no	IN	VARCHAR2,--Borrower_ref_no
				--p_customer			IN	VARCHAR2,
				p_err_code			IN	OUT VARCHAR2,
				p_err_param			IN	OUT VARCHAR2,
				p_action_code		IN		VARCHAR2 DEFAULT 'X',
				P_event_code		IN	VARCHAR2 DEFAULT 'XXXX',--CITIUS-LS Till#1379
				p_esn				IN	NUMBER	 DEFAULT  0--CITIUS-LS Till#1379

			)
RETURN BOOLEAN;

--CITIUS-LS Till#1230 ends

--CITIUS-LS Till#1379 Starts

FUNCTION fn_check_cust_classification
			(
				p_contract_ref_no	IN	VARCHAR2,
				p_customer			IN	VARCHAR2,
				p_err_param			IN	OUT VARCHAR2,
				p_err_code			IN	OUT VARCHAR2,
				p_action_code		IN	VARCHAR2 ,
				p_module			IN	VARCHAR2 ,
				p_esn				IN	NUMBER	 ,
				p_prod_type			IN	VARCHAR2 ,
				p_credit_line		IN	VARCHAR2  ,
				P_event_code		IN	VARCHAR2
			)
RETURN BOOLEAN;
--CITIUS-LS Till#1379 Ends
-- 07-NOV-2008 CITIUS-LS#SRT1451 - CITIUS-LS Till#1230 and CITIUS-LS Till#1379 added new funtions  changes Ends
--11-JUL-2012 Flexcube V.CL Release 7.11 ITR1 SFR#44 Changes start
FUNCTION fn_check_udf_unique
(
p_functionid	IN	cstms_udf_vals.function_id%TYPE
,p_fieldname	IN	cstms_udf_vals.field_name%TYPE
,p_reckey	IN	cstms_udf_vals.rec_key%TYPE
,p_field_value	OUT	cstms_udf_vals.field_val%TYPE
)
RETURN BOOLEAN;
--11-JUL-2012 Flexcube V.CL Release 7.11 ITR1 SFR#44 Changes end

END;
/
CREATE or replace SYNONYM olpkss_misc_st  FOR olpks_st_misc
/