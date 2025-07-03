CREATE OR REPLACE PACKAGE olpks_olduplod_utils_custom AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_olduplod_utils_custom.SPC
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
    **SFR Number         :
    **Changed By         :
    **Change Description :
    **Search String      :
	
  **Changed By         : Chandra Achuta
  **Date               : 18-MAR-2022
  **Change Description : Hook request for FWDVAMI case.
  **Search String      : Bug#33613314 	
------------------------------------END CHANGE HISTORY-------------------------------------
*/



	FUNCTION fn_upload_contract(p_Source           IN oltbs_upload_master.source_code%TYPE,
                              p_Source_Operation IN VARCHAR2,
                              p_Function_Id      IN VARCHAR2,
                              p_Action_Code      IN VARCHAR2,
                              pextrefno          IN oltbs_upload_master.ext_contract_ref_no%TYPE,
                              pimpmode           IN VARCHAR2,
                              p_Multi_Trip_Id    IN VARCHAR2,
                              p_Status           IN OUT VARCHAR2,
                              pcuberefno         OUT oltbs_contract.contract_ref_no%TYPE,
                              p_Err_Code         IN OUT VARCHAR2,
                              p_Err_Params       IN OUT VARCHAR2,
							  fn_call_id		 IN OUT NUMBER,
							  P_TB_CUSTOM_DATA IN OUT GLOBAL.TY_TB_CUSTOM_DATA,
							  l_oldtronl		IN OUT olpks_oldtronl_Main.ty_oldtronl)
	RETURN BOOLEAN;

  --Bug#33613314  Changes Starts
  FUNCTION fn_pre_upld_olcsprol(p_Source           IN VARCHAR2,
                                p_Source_Operation IN VARCHAR2,
                                p_Function_Id      IN VARCHAR2,
                                p_Action_Code      IN VARCHAR2,
                                Pd_rec             IN oltbs_upload_master%ROWTYPE,
                                p_oldtronl         IN OUT olpks_oldtronl_Main.ty_oldtronl,
                                p_Err_Code         IN OUT VARCHAR2,
                                p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_post_upld_olcsprol(p_Source           IN VARCHAR2,
                                 p_Source_Operation IN VARCHAR2,
                                 p_Function_Id      IN VARCHAR2,
                                 p_Action_Code      IN VARCHAR2,
                                 Pd_rec             IN oltbs_upload_master%ROWTYPE,
                                 p_oldtronl         IN OUT olpks_oldtronl_Main.ty_oldtronl,
                                 p_Err_Code         IN OUT VARCHAR2,
                                 p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --Bug#33613314  Changes Ends	
	
END olpks_olduplod_utils_custom;
/


CREATE or replace SYNONYM olpkss_olduplod_utils_custom FOR olpks_olduplod_utils_custom
/