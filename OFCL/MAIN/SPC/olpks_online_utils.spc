CREATE OR REPLACE PACKAGE olpks_online_utils IS

   /*------------------------------------------------------------------------------------------
** This source is part of the Oracle Banking Software Product.
** Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.
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
   -------------------------------------------------------------------------------------------------------
   CHANGE HISTORY
   
   SFR Number         :
   Changed By         :
   Change Description :
   
   -------------------------------------------------------------------------------------------------------
   */

   FUNCTION Fn_Get_Subsys_Stat(p_Source     IN Cotms_Source.Source_Code%TYPE
                              ,p_Subsystem  IN VARCHAR2
                              ,p_Subsysstat IN VARCHAR2) RETURN VARCHAR2;

   FUNCTION Fn_Upd_Subsys_Stat(p_Subsystem  IN VARCHAR2
                              ,p_Stat       IN VARCHAR2
                              ,p_Subsysstat IN VARCHAR2) RETURN VARCHAR2;

   FUNCTION Fn_Form_Msg(p_Err_Code   IN VARCHAR2
                       ,p_Err_Params IN VARCHAR2
                       ,p_Lang_Code  IN Smtbs_Language.Lang_Code%TYPE
                       ,p_Conf       OUT VARCHAR2) RETURN VARCHAR2;

   FUNCTION Fn_Log_Overrides(p_Source          IN Cotms_Source.Source_Code%TYPE
                            ,p_Action_Code     IN VARCHAR2
                            ,p_Function_Id     IN VARCHAR2
                            ,p_Contract_Ref_No IN oltbs_contract.Contract_Ref_No%TYPE
                            ,p_Event_Seq_No    IN oltbs_contract.Latest_Event_Seq_No%TYPE
                            ,p_Err_Code        IN OUT VARCHAR2
                            ,p_Err_Params      IN OUT VARCHAR2) RETURN BOOLEAN;

   FUNCTION Fn_Resolve_Ref_Numbers(p_Source     IN OLTB_CONTRACT.SOURCE%TYPE
                                  ,p_Fcc_Ref    IN OUT OLTB_CONTRACT.Contract_Ref_No%TYPE
                                  ,p_Ext_Ref    IN OLTB_CONTRACT.External_Ref_No%TYPE
                                  ,p_Err_Code   IN OUT VARCHAR2
                                  ,p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;

	--Product Access restriction - Start
	FUNCTION Fn_Validate_Prod_Txn_Access(p_Product     IN OLTM_PRODUCT.PRODUCT_CODE%TYPE
										,p_Err_Code   IN OUT VARCHAR2
										,p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;

	
	FUNCTION Fn_Validate_Prod_Qry_Access(p_Product     IN OLTM_PRODUCT.PRODUCT_CODE%TYPE
										,p_Err_Code   IN OUT VARCHAR2
										,p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;

	--Product Access restriction - End

END olpks_online_utils;
/
CREATE OR REPLACE SYNONYM olpkss_online_utils FOR olpks_online_utils
/