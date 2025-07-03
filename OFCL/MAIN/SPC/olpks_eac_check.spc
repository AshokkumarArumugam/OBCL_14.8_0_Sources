CREATE OR REPLACE PACKAGE olpks_eac_check AS
  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_eac_check.SPC
  **
  ** Module   : OL
  **
    This source is part of the Oracle Banking Corporate Lending  Software Product.
    Copyright ? 2019 , Oracle and/or its affiliates.  All rights reserved.
    No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates.
  
    Oracle Financial Services Software Limited.
    Oracle Park, Off Western Express Highway,
    Goregaon (East),
    Mumbai - 400 063, India.
  
  
  ----------------------------------------------------------------------------------------------------
  */
  /*
      Name            : olpks_EAC_check
      Description     : EAC Integration - Customer and Account validation External Services Package
      Author          : Aruna Rajendran
      Date Created    : 18/09/2020
      
   CHANGE HISTORY:
   
  **Changed By          : ArunaDevi Rajendran
  **Change Description  : OBCL_14.4_InactiveCustomerStatus - Integration with UBS to send the customer status as active or inactive
  **Search String       : OBCL_14.4_InactiveCustomerStatus
  **Changed On          : 10-Feb-2021
  
  Changed By         : Sowmya Bitra
  Date               : 22-Feb-2023
  Change Description : Value_Date addition in ECA/EAC request
  Search String      : Bug#35109458
  
  Changed By         : Sowmya Bitra
  Date               : 18-May-2023
  Change Description : Adding EAC check for participant accounts in LS
  Search String      : Bug#35392087
  
  Changed By         : Sowmya Bitra
  Date               : 04-July-2023
  Change Description : Added pragma function for exception logging during EAC failure of batch case 
  Search String      : Bug#35535080
  
  Changed By         : Sudharshini Balaji
  Date               : 10-Aug-2023
  Change Description : Performance Tuning Changes for 1500+Lenders
  Search String      : Bug#36821348
  
  
-------------------------------------------------------------------------------------------------------*/
TYPE settl_lst is RECORD (
    ACC_BRANCH    oltb_settlements.ACC_BRANCH%TYPE,
    ACC_CCY       oltb_settlements.ACC_CCY%TYPE,
    ACCOUNT       oltb_settlements.ACCOUNT%TYPE,
    PAY_RECEIVE   oltb_settlements.PAY_RECEIVE%TYPE
    );
TYPE  g_account_lst IS TABLE OF settl_lst;

TYPE settl_gp_extsys is RECORD (
    ACC_BRANCH    oltb_settlements.ACC_BRANCH%TYPE,
    ACC_CCY       oltb_settlements.ACC_CCY%TYPE,
    ACCOUNT       oltb_settlements.ACCOUNT%TYPE,
    PAY_RECEIVE   oltb_settlements.PAY_RECEIVE%TYPE,
    EXT_SYSTEM    sttm_core_account.source_system%type
    );
TYPE  g_acc_gp_extsys IS TABLE OF settl_gp_extsys INDEX BY BINARY_INTEGER;

TYPE cust_lst is RECORD (
    CUST_NO      oltb_contract.counterparty%TYPE
    );
TYPE  g_cust_lst IS TABLE OF cust_lst INDEX BY BINARY_INTEGER;

TYPE extsys_lst is RECORD (
    EXT_SYSTEM      sttm_core_account.source_system%type
    );
TYPE  g_extsys_lst IS TABLE OF extsys_lst INDEX BY BINARY_INTEGER;


--$$ Bug#36821348 CHANGES
TYPE g_custsystem   IS TABLE OF sttm_core_account.source_system%type;
l_Custsystem        g_custsystem ;
--$$ Bug#36821348 CHANGES

FUNCTION Fn_Log_Sync_CustStatus(p_Ref            IN VARCHAR2,
                                 p_Brn            IN VARCHAR2,
                                 p_customer_list  IN g_cust_lst,--$$ Bug#36821348 changes 
                             --  p_Custno           IN VARCHAR2, --$$ Bug#36821348 changes
                                 p_Batch          IN VARCHAR2,
								 p_Module         IN VARCHAR2,  --Bug#35392087 Changes
                                 p_Err_Code       IN OUT VARCHAR2,
                                 p_Err_Params     IN OUT VARCHAR2) RETURN BOOLEAN;

FUNCTION Fn_Log_Sync_EAC_Validate(p_Ref            IN VARCHAR2,
                                    p_Brn            IN VARCHAR2,
                                    --p_settl_acc_list IN g_account_lst,
                                    p_settl_acc_list   IN g_acc_gp_extsys,
				                    p_acc_ext_system      IN VARCHAR2,
                                    p_Batch          IN VARCHAR2,
									p_Value_Date     IN Date,  --Bug#35109458 Changes
                                    p_Err_Code       IN OUT VARCHAR2,
                                    p_Err_Params     IN OUT VARCHAR2) RETURN BOOLEAN;

FUNCTION Fn_Log_Sync_EAC(p_Ref            IN VARCHAR2,
                         p_Brn            IN VARCHAR2,
                         p_customer_list  IN g_cust_lst,
                         p_settl_acc_list IN g_account_lst,
                         p_Batch          IN VARCHAR2,
						 p_Value_Date     IN Date,  --Bug#35109458 Changes
                         p_Err_Code       IN OUT VARCHAR2,
                         p_Err_Params     IN OUT VARCHAR2) RETURN BOOLEAN;
--OBCL_14.4_InactiveCustomerStatus starts	

FUNCTION Fn_Process_CustInactiveStatus( p_Brn            IN VARCHAR2,
                                        p_Custno         IN VARCHAR2,
										p_DerHasActCont	 IN VARCHAR2,
                                        p_Batch          IN VARCHAR2,
                                        p_ELCM_MSGID     OUT VARCHAR2,
                                        p_Err_Code       IN OUT VARCHAR2,
                                        p_Err_Params     IN OUT VARCHAR2) RETURN VARCHAR2;	
--OBCL_14.4_InactiveCustomerStatus ends	

--Bug#35535080 Changes Start
FUNCTION Fn_Pragma_Log_Exception(p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
                                 p_event_code      IN oltbs_contract_event_log.event_code%TYPE,
                                 p_error_code      IN Varchar2,
                                 p_error_params    IN Varchar2) RETURN VARCHAR2;
--Bug#35535080 Changes End								
END olpks_EAC_check;
/
Create or replace synonym olpkss_eac_check for olpks_eac_check
/