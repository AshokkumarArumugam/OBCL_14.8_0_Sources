CREATE OR REPLACE PACKAGE olpks_copy_rate_tenor IS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : olpks_copy_rate_tenor.SPC
**
** Module       : CORE SERVICES
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
CHANGE HISTORY
 Changed On		:09-JUL-2016
     Changed By         :  Deva Anand
     Change Description :  Correcting the units after dropping floating rate related work tables and commenting the version number
     Search String	:Floating_Rate_changes 

*/

FUNCTION FN_INS_RATES_ON_AUTH (/*p_branch_code IN CFTWS_RATE_CODE.BRANCH_CODE%TYPE,
				   p_rate_code IN CFTWS_RATE_CODE.RATE_CODE%TYPE,
				   p_version_no IN CFTWS_RATE_CODE.VERSION_NO%TYPE,*/--Floating_Rate_changes commented
           p_branch_code IN CFTMS_RATE_CODE.BRANCH_CODE%TYPE,--Floating_Rate_changes added
				   p_rate_code IN CFTMS_RATE_CODE.RATE_CODE%TYPE,--Floating_Rate_changes added				   
				   p_errcode	OUT VARCHAR2)	
RETURN boolean;

FUNCTION FN_INS_RATE_CODE_ON_AUTH (/*p_branch_code IN CFTWS_RATE_CODE.BRANCH_CODE%TYPE,
				   p_rate_code IN CFTWS_RATE_CODE.RATE_CODE%TYPE,
				   p_version_no IN CFTWS_RATE_CODE.VERSION_NO%TYPE,*/--Floating_Rate_changes commented
           p_branch_code IN CFTMS_RATE_CODE.BRANCH_CODE%TYPE,--Floating_Rate_changes added
				   p_rate_code IN CFTMS_RATE_CODE.RATE_CODE%TYPE,--Floating_Rate_changes added
				   p_errcode	OUT VARCHAR2)	
RETURN boolean;

FUNCTION FN_INS_RATE_CCY_ON_AUTH (/*p_branch_code IN CFTWS_RATE_CODE.BRANCH_CODE%TYPE,
				   p_rate_code IN CFTWS_RATE_CODE.RATE_CODE%TYPE,
				   p_version_no IN CFTWS_RATE_CODE.VERSION_NO%TYPE,*/--Floating_Rate_changes commented
           p_branch_code IN CFTMS_RATE_CODE.BRANCH_CODE%TYPE,--Floating_Rate_changes added
				   p_rate_code IN CFTMS_RATE_CODE.RATE_CODE%TYPE,--Floating_Rate_changes added
				   p_errcode	OUT VARCHAR2) 
RETURN boolean;

FUNCTION FN_INS_FLOAT_MASTER_ON_AUTH (/*p_branch_code IN CFTWS_RATE_CODE.BRANCH_CODE%TYPE,
				   p_rate_code IN CFTWS_RATE_CODE.RATE_CODE%TYPE,
				   p_version_no IN CFTWS_RATE_CODE.VERSION_NO%TYPE,*/--Floating_Rate_changes commented
           p_branch_code IN CFTMS_RATE_CODE.BRANCH_CODE%TYPE,--Floating_Rate_changes added
				   p_rate_code IN CFTMS_RATE_CODE.RATE_CODE%TYPE,--Floating_Rate_changes added				  
				   p_errcode	OUT VARCHAR2) 
RETURN boolean;

FUNCTION FN_INS_FLOAT_DETAIL_ON_AUTH (/*p_branch_code IN CFTWS_RATE_CODE.BRANCH_CODE%TYPE,
				   p_rate_code IN CFTWS_RATE_CODE.RATE_CODE%TYPE,
				   p_version_no IN CFTWS_RATE_CODE.VERSION_NO%TYPE,*/--Floating_Rate_changes commented
           p_branch_code IN CFTMS_RATE_CODE.BRANCH_CODE%TYPE,--Floating_Rate_changes added
				   p_rate_code IN CFTMS_RATE_CODE.RATE_CODE%TYPE,	--Floating_Rate_changes added			 
				   p_errcode	OUT VARCHAR2) 
RETURN boolean;

FUNCTION FN_CREATE_RATE_VERSION (  /*p_branch_code IN CFTWS_RATE_CODE.BRANCH_CODE%TYPE,
				   p_rate_code IN CFTWS_RATE_CODE.RATE_CODE%TYPE,
				   p_old_version_no IN CFTWS_RATE_CODE.VERSION_NO%TYPE,
				   p_new_version_no IN CFTWS_RATE_CODE.VERSION_NO%TYPE*/--Floating_Rate_changes commented
 p_branch_code IN CFTMS_RATE_CODE.BRANCH_CODE%TYPE,--Floating_Rate_changes added
				   p_rate_code IN CFTMS_RATE_CODE.RATE_CODE%TYPE--Floating_Rate_changes added
				   ) 
RETURN boolean;

END;
/
CREATE or replace SYNONYM olpkss_copy_rate_tenor FOR olpks_copy_rate_tenor
/