CREATE OR REPLACE PACKAGE SMPKS_CUSTOM IS
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product
** Copyright © 2007 - 2012  Oracle and/or its affiliates.  All rights reserved.
** 												
** No part of this work may be reproduced, stored in a retrieval system,
** adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise,
** translated in any language or computer language,
** without the prior written permission of Oracle and/or its affiliates.
**
**
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India.
------------------------------------------------------------------------------------------
*/
/*
-------------------*/
   /*
	** CHANGE_HISTORY
	** Created By       : Surendra Gubba
    ** Created On       : 13-Dec-2012
    ** Description		: Initial Unit-Extensibility Request-Bug#15995962
	** Modified on 		:12-Jan-2016, 25357568
	
Modified By        : Saisudha Rathinavelu
Modified On        : 25-Sep-2017
Modified Reason    : Retro for hook change bug id 26766443.
Search String      : 12.4_RETRO_Bug#26818220
   ----------------------------------------------------------------------------------------------------*/
	FUNCTION fn_limits_validate(p_flag          IN  CHAR,
								p_ccy           IN  cytm_ccy_defn.ccy_code%TYPE,
								p_amount        IN  smtbs_role_limit.input_limit%TYPE,
								p_user_id       IN  smtbs_user.user_id%TYPE,
								--p_curr_brn_code 	IN  sttm_branch.branch_code%TYPE,
								p_curr_brn_code 	IN  smtb_role_detail.branch_code%TYPE,--25357568 merger issues
								p_fn_call_id	IN  NUMBER,
								p_tb_cluster_data 	IN OUT Global.Ty_Tb_Cluster_Data,								
								p_error_code    OUT ertbs_msgs.err_code%TYPE,
								p_error_param   OUT VARCHAR2) 
	RETURN BOOLEAN ;							  
--12.4_RETRO_Bug#26818220 Changes starts here
FUNCTION fn_pre_check_auto_auth(puser_id     IN smtbs_user.user_id%TYPE,
                              pfunction_id IN smtbs_menu.function_id%TYPE,
                              pbranch_code IN sttms_core_branch.branch_code%TYPE)

   RETURN BOOLEAN;
--12.4_RETRO_Bug#26818220 Changes ends here	
	END SMPKS_CUSTOM;
/
CREATE or REPLACE SYNONYM SMPKSS_CUSTOM FOR SMPKS_CUSTOM
/
