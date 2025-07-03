CREATE OR REPLACE PACKAGE olpks_external_swift_check AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_external_swift_check.spc
  **
  ** Module     : Oracle Lending
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved
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
  -------------------------------------------------------------------------------------------------------
  CHANGE HISTORY
  
  SFR Number         :
  Changed By         :
  Change Description :
  
  **  Modified By     : Narendra Dhaker
**  Modified On     : 17-FEB-2022
**  Modified Reason : Increasing the amount field decimals to maximum
**  Search String   : Bug#33809404_DecimalChange

  
**  Modified By     : Abhinav Bhasker
**  Modified On     : 07-MAR-2022
**  Modified Reason : Increasing the Counter Party field length from 12 to 20
**  Search String   : Bug#33904699 

	Modified By     : Palanisamy M
	Modified On     : 06-02-2025
	Modified Reason : Changes done to support Local Clearing NEFT/RTGS
	Search String   : OBCL_14.7_BUG#37562640_Local_Clearing Changes   
  -------------------------------------------------------------------------------------------------------
  */
  /* 14.1_ISBGL_Changes :: Starts */
  TYPE ty_swift_handoff IS RECORD(
 account sttm_core_account.cust_account_no%TYPE,
 acc_branch sttm_core_branch.branch_code%TYPE,
    ACC_CCY         VARCHAR2(3),
 ACC_CIF VARCHAR2(20 CHAR), --Bug#33904699 --VARCHAR2(12),
    AMOUNT_TAG      VARCHAR2(15),
    CONTRACT_REF_NO VARCHAR2(16),
 COUNTERPARTY VARCHAR2(20 CHAR), --Bug#33904699 --VARCHAR2(12),
    EVENT_SEQ_NO    NUMBER,
    MSG_TYPE        VARCHAR2(15),
    RECEIVER        VARCHAR2(35),
    --SETTLEMENT_AMT  NUMBER(22,3), --Bug#33809404_DecimalChange 
    SETTLEMENT_AMT  NUMBER, --Bug#33809404_DecimalChange
    VALUE_DATE      DATE,
    SWIFT_MSG_TYPE  VARCHAR2(5),
    MEDIA           VARCHAR2(15),
    PAYMENT_BY      VARCHAR2(1), --OBCL_14.7_BUG#37562640_Local_Clearing Changes 
    SUPPRESS_BY_PAYMENT_MSG VARCHAR2(1));
  TYPE p_swift_handoff IS TABLE OF ty_swift_handoff INDEX BY BINARY_INTEGER;
  /* 14.1_ISBGL_Changes :: Ends */
  
  TYPE is_handoff IS TABLE OF oltbs_settlements%ROWTYPE INDEX BY BINARY_INTEGER;

  FUNCTION isfn_net(p_ref_no         IN VARCHAR2,
                    p_event_no       IN NUMBER,
                    p_event_code     IN oltbs_contract.curr_event_code%TYPE,
                    p_tag_list       IN VARCHAR2,
					/* 14.1_ISBGL_Changes :: Starts */
                    /* p_media          IN OUT VARCHAR2,
                    p_suppress_check IN OUT VARCHAR2,
                    p_msg_type       IN OUT VARCHAR2 */
                    pkg_swift_hoff IN OUT olpks_external_swift_check.p_swift_handoff) RETURN BOOLEAN;
					/* 14.1_ISBGL_Changes :: Ends */

  FUNCTION isfn_net(p_ref_no         IN VARCHAR2,
                    p_event_no       IN NUMBER,
                    p_event_code     IN oltbs_contract.curr_event_code%TYPE,
                    p_tag_list       IN VARCHAR2,
                    p_memo_type      IN VARCHAR2,
					/* 14.1_ISBGL_Changes :: Starts */
                    /* p_media          IN OUT VARCHAR2,
                    p_suppress_check IN OUT VARCHAR2,
                    p_msg_type       IN OUT VARCHAR2 */
                    pkg_swift_hoff IN OUT olpks_external_swift_check.p_swift_handoff) RETURN BOOLEAN;
					/* 14.1_ISBGL_Changes :: Ends */
                    
  FUNCTION fn_get_sys_bridge_gl(pNative      IN VARCHAR2,
                                pModule      IN VARCHAR2,
                                pProductCode IN VARCHAR2,
                                pFunctionId  IN VARCHAR2,
                                pBranchCode  IN VARCHAR2,
                                pCcy         IN VARCHAR2,
                                pBridgeGl    OUT VARCHAR2,
                                pErrCode     IN OUT VARCHAR2,
                                pErrParams   IN OUT VARCHAR2) RETURN BOOLEAN;
                                
END olpks_external_swift_check;
/
CREATE OR REPLACE SYNONYM olpkss_external_swift_check FOR olpks_external_swift_check
/