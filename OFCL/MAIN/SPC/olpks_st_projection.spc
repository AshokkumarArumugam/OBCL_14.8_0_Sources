CREATE OR REPLACE PACKAGE olpks_st_projection
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name  : olpks_st_projection.SPC
**
** Module     : ST
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
/*CHANGE HISTORY
14-JUN-2010 FLEXCUBE V.CL Release 7.7 CITIPBG CASA Vol1 FS tag#5, package created by Harsh for CRA projection.
27-JUL-2010 FLEXCUBE V.CL Release 7.7 CITIPBG CASA Vol1 FS tag#5, fn_max_projection_date is moved from body to spec
21-APR-2011 Flexcube V.CL Release 7.9, CITIPBG , Changes for Vol1 Lot2 Tag07 - Changes to project DDA balance considering amount block
06-Jun-2016 OFCL standalone changes, commented not required code. Search string--- OFCL12.2 Not required
---------------------------------------------------------------------------------------------------------------
*/
g_casa_query BOOLEAN;
--21-APR-2011 Flexcube V.CL Release 7.9, CITIPBG , Changes for Vol1 Lot2 Tag07 changes start
g_dda_proj_tax_amount_tag	VARCHAR2(2000);
g_dda_proj_tax_amount		VARCHAR2(2000);
g_dda_proj_tax_ccy		VARCHAR2(2000);
g_dda_proj_roll 		VARCHAR2(1) 	:= 'N';
--21-APR-2011 Flexcube V.CL Release 7.9, CITIPBG , Changes for Vol1 Lot2 Tag07 changes end


FUNCTION fn_projection_validations( /* --OFCL12.3 CHANGES START HERE
					 p_cust_ac_no	 	IN oltbs_vd_bal.ACC%TYPE
					,p_branch		IN oltbs_vd_bal.BRN%TYPE
					,p_projection_date 	IN oltbs_vd_bal.val_dt%TYPE*/
					 p_cust_ac_no	 	IN oltb_account.AC_GL_NO%TYPE
					,p_branch			IN OLTB_CONTRACT_BALANCE_CS.BRN%TYPE
					,p_projection_date 	IN OLTB_CONTRACT_BALANCE_CS.MATDT%TYPE --OFCL12.3 CHANGES END HERE
				,p_error_code		IN OUT VARCHAR2
				,p_error_param		IN OUT VARCHAR2
				)
RETURN BOOLEAN;

FUNCTION fn_stprojection_wrap
	(
	 p_source_code		IN		VARCHAR2
	/*,p_branch_code		IN		sttms_cust_account.branch_code%TYPE 
	,p_cust_ac_no		IN		sttms_cust_account.cust_ac_no%TYPE*/-- OFCL12.2 Not required
	  ,p_branch_code		IN		oltb_account.branch_code%TYPE
	,p_cust_ac_no		IN		oltb_account.ac_gl_no%TYPE
	,p_projection_date	IN		DATE
	,p_closure_reqd		IN		VARCHAR2 DEFAULT 'Y'
	,p_comp			OUT		VARCHAR2	
	,p_amt_due		OUT		VARCHAR2	
	,p_error_code		IN OUT		VARCHAR2
	,p_error_parameter	IN OUT		VARCHAR2
	)
RETURN BOOLEAN;
--27-JUL-2010 FLEXCUBE V.CL Release 7.7 CITIPBG CASA Vol1 FS tag#5 start
FUNCTION fn_max_projection_date
			(

			 p_branch IN VARCHAR2
			,p_cust_ac_no IN VARCHAR2
			,p_max_date	IN OUT DATE
			,p_error_code IN OUT VARCHAR2
			,p_error_param IN OUT VARCHAR2
			)
RETURN BOOLEAN;
--27-JUL-2010 FLEXCUBE V.CL Release 7.7 CITIPBG CASA Vol1 FS tag#5 end
--21-APR-2011 Flexcube V.CL Release 7.9, CITIPBG , Changes for Vol1 Lot2 Tag07 changes start
--21-APR-2011 Flexcube V.CL Release 7.9, CITIPBG , Changes for Vol1 Lot2 Tag07 changes end
END olpks_st_projection;
/