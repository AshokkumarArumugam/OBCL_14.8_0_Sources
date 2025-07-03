CREATE OR REPLACE PACKAGE tlpks_fee_services
IS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : tlpks_fee_services.SPC
**
** Module       : LT- Secondary Loan Trading
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
---------------------------------CHANGE HISTORY-----------------------------------------------
28-APR-2008 FLEXCUBE V.CL 7.4 RELEASE ,NEW UNIT CREATED
05-JAN-2012 Flexcube V.CL Release 7.10 FS Tag 10 Changes - Trade Amendment and Broker Fees

  Modified By         : Srinivasulu Ch
  Modified On         : 13-Aug-2019
  Modified Reason     : OBCL_14.4_SLT_Amendment_Fee Changes added 
  Search String       : OBCL_14.4_SLT_Amendment_Fee Changes
------------------------------END CHANGE HISTORY----------------------------------------------
*/

FUNCTION Fn_Process
(
P_contract_Ref_No IN     tltbs_contract_fee_master.Contract_Ref_No%TYPE,
P_Action_Code     IN     VARCHAR2,
P_Error_Code      IN OUT VARCHAR2,
P_Error_Param     IN OUT VARCHAR2
)
RETURN BOOLEAN;
--------------------------------------------------------------------------------------------
FUNCTION Fn_Upload
(
P_contract_Ref_No     IN     tltbs_contract_fee_master.Contract_Ref_No%TYPE,
P_Ext_contract_Ref_No IN     tltbs_upload_fee_master.Ext_Contract_Ref_No%TYPE,
P_Source_Code         IN     tltbs_upload_fee_master.Source_Code%TYPE,
P_Branch              IN     tltbs_upload_fee_master.Branch%TYPE,
P_version_No          IN     tltbs_upload_fee_master.Version_No%TYPE,
P_Error_Code          IN OUT VARCHAR2,
P_Error_Param         IN OUT VARCHAR2
)
RETURN BOOLEAN;
--------------------------------------------------------------------------------------------
FUNCTION Fn_Pickup
(
P_Ext_contract_Ref_No IN     tltbs_upload_fee_master.Ext_Contract_Ref_No%TYPE,
P_Product_Code        IN     tltbs_upload_master.product_code%TYPE,
P_Source_Code         IN     tltbs_upload_fee_master.Source_Code%TYPE,
P_Branch              IN     tltbs_upload_fee_master.Branch%TYPE,
P_version_No          IN     tltbs_upload_fee_master.Version_No%TYPE,
P_ccy                 IN     tltbs_upload_fee_master.Component_Ccy%TYPE,
P_Error_Code          IN OUT VARCHAR2,
P_Error_Param         IN OUT VARCHAR2
)
RETURN BOOLEAN;
--------------------------------------------------------------------------------------------
FUNCTION Fn_copy_Drafted_fee
(
P_old_Ext_contract_Ref_No IN     tltbs_upload_fee_master.Ext_Contract_Ref_No%TYPE,
P_new_Ext_contract_Ref_No IN     tltbs_upload_fee_master.Ext_Contract_Ref_No%TYPE,
P_Source_Code             IN     tltbs_upload_fee_master.Source_Code%TYPE,
P_Branch                  IN     tltbs_upload_fee_master.Branch%TYPE,
P_Error_Code              IN OUT VARCHAR2,
P_Error_Param             IN OUT VARCHAR2
)
RETURN BOOLEAN;
--------------------------------------------------------------------------------------------
FUNCTION Fn_Create_New_Version
(
P_contract_Ref_No     IN     tltbs_contract_fee_master.Contract_Ref_No%TYPE,
P_Ext_contract_Ref_No IN     tltbs_upload_fee_master.Ext_Contract_Ref_No%TYPE,
P_Source_Code         IN     tltbs_upload_fee_master.Source_Code%TYPE,
P_Branch              IN     tltbs_upload_fee_master.Branch%TYPE,
P_version_No          IN     tltbs_upload_fee_master.Version_No%TYPE,
P_Error_Code          IN OUT VARCHAR2,
P_Error_Param         IN OUT VARCHAR2
)
RETURN BOOLEAN;
--------------------------------------------------------------------------------------------
FUNCTION Fn_process_fee_amendment
(
P_contract_Ref_No     IN     tltbs_contract_fee_master.Contract_Ref_No%TYPE,
P_Event_seq_no        IN     tltbs_contract_fee_master.event_seq_no%TYPE,
p_fee_type            IN     tltbs_contract_fee_master.fee_type%TYPE, 
P_Error_Code          IN OUT VARCHAR2,
P_Error_Param         IN OUT VARCHAR2
)
RETURN BOOLEAN;
--------------------------------------------------------------------------------------------
FUNCTION Fn_Delete_Amendment
(
P_contract_Ref_No IN     tltbs_contract_fee_master.Contract_Ref_No%TYPE,
P_event_seq_no    IN     tltbs_contract_fee_master.Event_Seq_No%TYPE,
P_Error_Code      IN OUT VARCHAR2,
P_Error_Param     IN OUT VARCHAR2
)
RETURN BOOLEAN;
--------------------------------------------------------------------------------------------
FUNCTION Fn_get_fee_type
(
p_product	IN VARCHAR2,
p_component	IN VARCHAR2
)
RETURN VARCHAR2;
--------------------------------------------------------------------------------------------
FUNCTION Fn_pop_fee_amount_due
(
P_contract_ref_no	IN	tltbs_contract_master.contract_ref_no%TYPE,	
p_fee_type		IN	VARCHAR2 DEFAULT 'ALL',
P_Error_code		IN OUT	VARCHAR2,
p_error_param           IN OUT	VARCHAR2
, p_event_code		IN	VARCHAR2 DEFAULT NULL --05-JAN-2012 Flexcube V.CL Release 7.10 FS Tag 10 Changes here
)
RETURN BOOLEAN;
--------------------------------------------------------------------------------------------
FUNCTION Fn_get_Balance_Type
(
p_DCF_category             IN     VARCHAR2
)
RETURN VARCHAR2;
--------------------------------------------------------------------------------------------
FUNCTION Fn_update_fmem_flag
(
p_contract_ref_no       IN     tltbs_contract_fee_master.contract_ref_no%TYPE,
p_error_code            IN OUT VARCHAR2,
p_error_param           IN OUT VARCHAR2
)
RETURN BOOLEAN;
--------------------------------------------------------------------------------------------
FUNCTION Fn_wrap_fee_amount_due
(
P_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,	
p_fee_type		IN	VARCHAR2 DEFAULT 'ALL',
P_Error_code		IN OUT	VARCHAR2,
p_error_param           IN OUT	VARCHAR2
)
RETURN BOOLEAN;
--------------------------------------------------------------------------------------------
FUNCTION fn_settlement_replicate
(
p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,	
p_event_seq_no		IN		oltbs_contract.latest_event_seq_no%type,
p_error_code		IN OUT	VARCHAR2,
p_error_param           IN OUT	VARCHAR2
)
RETURN BOOLEAN;
--------------------------------------------------------------------------------------------


  --OBCL_14.4_SLT_Amendment_Fee Changes starts
  FUNCTION fn_amend_fee_recalc(p_trade_ref_no        IN tltbs_contract_fee.contract_ref_no%TYPE,
                               p_ext_contract_ref_no IN tltbs_upload_fee_master.ext_contract_ref_no%TYPE,
                               p_action_type         IN VARCHAR2, --YASH
                               P_calculated_amount   IN OUT NUMBER,
                               p_error_code          IN OUT VARCHAR2,
                               p_error_param         IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --OBCL_14.4_SLT_Amendment_Fee Changes ends
  --OBCL_14.4_SLT_Amendment_Fee Changes starts
  FUNCTION fn_recalc_amend_fee_on_vdbal(p_trade_ref_no IN oltbs_contract.contract_ref_no%TYPE,
                                        p_error_code   IN OUT VARCHAR2,
                                        p_error_param  IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --OBCL_14.4_SLT_Amendment_Fee Changes ends
  --OBCL_14.4_SLT_Amendment_Fee Changes starts
  FUNCTION fn_recalc_amend_fee_on_settl(p_trade_ref_no IN oltbs_contract.contract_ref_no%TYPE,
                                        p_error_code   IN OUT VARCHAR2,
                                        p_error_param  IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --OBCL_14.4_SLT_Amendment_Fee Changes ends
  --OBCL_14.4_SLT_Amendment_Fee Changes starts
  FUNCTION fn_update_amend_fee_detail(p_amend_ref_no IN tltbs_amend_fee_detail.amend_ref_no%TYPE,
                                      p_error_code   IN OUT VARCHAR2,
                                      p_error_param  IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --OBCL_14.4_SLT_Amendment_Fee Changes ends


END tlpks_fee_services;
/
CREATE OR REPLACE SYNONYM tlpkss_fee_services FOR tlpks_fee_services
/