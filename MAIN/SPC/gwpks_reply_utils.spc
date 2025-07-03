CREATE OR REPLACE PACKAGE gwpks_reply_utils AS
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Software Product.
** Copyright (R) 2016 , Oracle and/or its affiliates.  All rights reserved
**
**
** No part of this work may be reproduced, stored in a retrieval system, adopted
** or transmitted in any form or by any means, electronic, mechanical,
** photographic, graphic, optic recording or otherwise, translated in any
** language or computer language, without the prior written permission of
** Oracle and/or its affiliates.
**
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India
** India
------------------------------------------------------------------------------------------
*/
/*
=====================================================================================================================
****************************************    CHANGE HISTORY      *****************************************************
	**
	** Changed by 	 : Vinutha Kini
	** Changed on 	 : 26-July-2016
	** Description	 : Core clean up for 12.3Payments
	** Search String : Standalone12.3 CleanUp

    Changed By         : Srinivasarao A
    Changed On         : 27-May-2024
    Change Description : XML creater got faild due to processing more volume of data. so handle with CLOB datatype
    Search String      : Bug_36576125
=====================================================================================================================

Sl No.       Date            SFR            Tag                         Descrption
***********************************************************************************
1		15-Jun-2007			KERNEL8.0		New Package used for reply building -- vivin
2	25-july-2007				kernel8.0 changes	Added fn_get_num_chars
									to get number of seperators present in string
3	11-sep-2007				 FC8.0LOT2ITR2 SFR 679	Added for gateway for delete.
*/

--Standalone12.3 CleanUp Start
/*
FUNCTION fn_reply_IRR	(   p_contract_ref_no       IN      VARCHAR2
										,   p_node		    		IN      VARCHAR2
										,   p_parent        		IN OUT  VARCHAR2
										,   p_key         			IN OUT  VARCHAR2
										,   p_data          		IN OUT  VARCHAR2
										,   p_format        		IN OUT  VARCHAR2
                     , g_cnt_lvl2            IN OUT NUMBER
										,   p_err_code      		IN OUT  VARCHAR2
										,   p_err_param     		IN OUT  VARCHAR2
									    )
RETURN BOOLEAN;
*/
--Standalone12.3 CleanUp End


 FUNCTION fn_enrich_parenttag(p_source IN VARCHAR2
 				,p_moduleid		IN	VARCHAR2
                                 ,p_parent_list    IN OUT VARCHAR2)
  RETURN BOOLEAN;

--Bug_36576125
 FUNCTION fn_enrich_parenttag_ovd(p_source IN VARCHAR2
 				                      ,p_moduleid		IN	VARCHAR2
                                 ,p_parent_list    IN OUT CLOB
                                 ,p_is_clob IN VARCHAR2) 
  RETURN BOOLEAN;
--End Bug_36576125

  /*FUNCTION fn_enrich_parenttag(p_moduleid		IN	VARCHAR2
                                   ,p_parent_list    IN OUT VARCHAR2)
  RETURN BOOLEAN;*/

  --FCUBS_12.2_STANDALONE_CORE_CHANGES - Start
    /*FUNCTION fn_pop_avlamt( linkage_type    IN   NUMBER,
                        linked_amount   IN   NUMBER,
                        linked_to_branch IN  VARCHAR2,
                        linked_to_ref  IN    VARCHAR2
                        ) RETURN NUMBER;*/
	--FCUBS_12.2_STANDALONE_CORE_CHANGES - End

  --Standalone12.3 CleanUp Start
	/*
  FUNCTION fn_get_versionno( p_contract_ref_no       IN      VARCHAR2,
                             p_version_no            IN OUT VARCHAR2

                             ) RETURN BOOLEAN;
	*/
  --Standalone12.3 CleanUp End							 


FUNCTION fn_get_msg( err_code       IN      VARCHAR2,
                     err_parameter            IN  VARCHAR2

                             ) RETURN VARCHAR2;

--kernel8.0 changes ends
Function fn_get_num_chars(p_str varchar2,
                              p_sep varchar2 default '~')
                              Return NUMBER;
--kernel8.0 changes ends

-- FC8.0LOT2ITR2 SFR 679

Function fn_modify_parenttag(p_source	IN VARCHAR2,
                             p_parent_list In VARCHAR2,
                             p_new_parent_list Out VARCHAR2)
                             Return Boolean;

-- FC8.0LOT2ITR2 SFR 679

END gwpks_reply_utils;
/