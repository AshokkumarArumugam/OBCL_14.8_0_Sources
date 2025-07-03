CREATE OR REPLACE PACKAGE olpks_oldpmnt_utils_custom AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_oldpmnt_utils_custom.SPC
**
** Module		: LOANS AND DEPOSITS
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

  Changed By         : Gomathi G
  Changed On         : 01-APR-2021
  Change Description : Provided Pre and post hooks to derive the notes present for the customer/account number and display while saving.
  Search String      : OBCL_14.3_SUPPORT_BUG#32644113
------------------------------------END CHANGE HISTORY-------------------------------------
*/

	FUNCTION FN_PRE_GET_PROD_DETAILS(c_ref_no OLTB_CONTRACT.contract_ref_no%type,
	l_ldtb_product_row IN OUT oltms_product_master_ld%rowtype,
	p_Err_Code  IN OUT VARCHAR2, 
	p_Err_Params  IN OUT VARCHAR2
	)
	RETURN BOOLEAN;
	
	FUNCTION FN_POST_GET_PROD_DETAILS(c_ref_no OLTB_CONTRACT.contract_ref_no%type,
	l_ldtb_product_row IN OUT oltms_product_master_ld%rowtype,
	p_Err_Code  IN OUT VARCHAR2, 
	p_Err_Params  IN OUT VARCHAR2
	)
	RETURN BOOLEAN;
--OBCL_14.3_SUPPORT_BUG#32644113 changes starts
	  FUNCTION Fn_pre_Default_And_Validate(p_Source           IN VARCHAR2,
                                   p_Source_Operation IN VARCHAR2,
                                   p_Function_id      IN VARCHAR2,
                                   p_action_code      IN VARCHAR2,
                                   p_oldpmnt          IN olpks_oldpmnt_main.ty_oldpmnt,
                                   p_prev_oldpmnt     IN olpks_oldpmnt_main.ty_oldpmnt,
                                   p_wrk_oldpmnt      IN OUT olpks_oldpmnt_main.ty_oldpmnt,
                                   p_Err_Code         IN OUT VARCHAR2,
                                   p_Err_Params       IN OUT VARCHAR2)
	RETURN BOOLEAN;
	FUNCTION Fn_post_Default_And_Validate(p_Source           IN VARCHAR2,
                                   p_Source_Operation IN VARCHAR2,
                                   p_Function_id      IN VARCHAR2,
                                   p_action_code      IN VARCHAR2,
                                   p_oldpmnt          IN olpks_oldpmnt_main.ty_oldpmnt,
                                   p_prev_oldpmnt     IN olpks_oldpmnt_main.ty_oldpmnt,
                                   p_wrk_oldpmnt      IN OUT olpks_oldpmnt_main.ty_oldpmnt,
                                   p_Err_Code         IN OUT VARCHAR2,
                                   p_Err_Params       IN OUT VARCHAR2)
	RETURN BOOLEAN;
	--OBCL_14.3_SUPPORT_BUG#32644113 changes ends	
END olpks_oldpmnt_utils_custom;
/


CREATE or replace SYNONYM olpkss_oldpmnt_utils_custom FOR olpks_oldpmnt_utils_custom
/