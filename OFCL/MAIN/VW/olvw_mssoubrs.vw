CREATE OR REPLACE VIEW olvw_mssoubrs AS
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle Banking Software Product.
** Copyright © 2007 - 2016  Oracle and/or its affiliates.  All rights reserved.
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
/*
---------------------
  CHANGE HISTORY
   Changed By         :Kavitha Asokan
   Changed On         :01-Nov-2023
   Change Description :
   Search Tag         : 14.7_CAMT054_CHANGES

   Changed By         :Balaji Gopal
   Changed On         :05-Nov-2024
   Change Description :MakerID, Maker_Dt_Stamp, Checker_ID and Checker_Dt_Stamp are retrieved from the Olzb_Contract_Event_Log table.
                       Olzb_Dly_Msg_Out is added in the Module column to avoid column ambiguously defined error.
                       Auth_Status is taken from the Olzb_Contract_Event_Log table rather than the Olzb_Dly_Message_Out table.
                       Once_Auth is derived from Olzb_Contract_Event_Log.Auth_Status.
   Search Tag         :Bug#37194111
  -------------------------------------------------------------------------------------------------------
  */
------------------------------------------------------------------------------------------*/
SELECT "BRANCH","DCN","REFERENCE_NO","ESN",OLTB_DLY_MSG_OUT.MODULE,"MSG_TYPE","RECEIVER","SERIAL_NO","CCY","PRODUCT","AMOUNT","MEDIA","SWIFT_MSG_TYPE","MCS","NODE","FORMAT","LANGUAGE",
  "NO_OF_COPIES","PRIORITY","NAME","ADDRESS1","ADDRESS2","ADDRESS3","ADDRESS4","LOCATION","COPY","DIRECTIVE_STATUS","SUPPRESS_FLAG","INSERT_TIME","GENERATE_STATUS","MSG_STATUS",
  "HANDOFF_TIME","TESTWORD","TESTING_STATUS","PRINT_STATUS","BRANCH_DATE",Ocel.AUTH_STATUS "AUTH_STAT",Ocel.MAKER_ID,Ocel.MAKER_DT_STAMP,Ocel.CHECKER_ID,Ocel.CHECKER_DT_STAMP,DECODE(ONCE_AUTH,NULL,DECODE(Ocel.AUTH_STATUS,'A','Y','U','N'),ONCE_AUTH) "ONCE_AUTH","FORM_ID",
  "MULTIPLE_MSG","TO_DATE","FROM_DATE","REPAIR_REASON","RUNNING_NO","NO_OF_HANDOFF","HOLD_STATUS","PROCESSED_FLAG","OTHER_BRANCH","ANSWERBACK","TW_KEYWORD","PARENT_DCN",
  "TOBE_PROCESSED_FLAG","TESTWORD_STATUS","TESTAMOUNT","TESTDATE","TESTCURRENCY","TESTNARRATIVE","TOBE_EMAILED","QUEUE_INDEX","ACK_NACK_STATUS","HOLD_MAIL","EXTERNAL_REF_NO",
  "DELIVERY_BY","ORIGINAL_DCN","DVD_NVD_STATUS","RTGS_NETWORK","FUNDING_STATUS" ,"MOD_NO",
  MESSAGE AS MESSAGE, ADDITIONAL_ADDRESSES AS DCN_LIST, 'N' AS BULK, 'N' AS SELECTED, PDE_FLAG AS any_or_org ,ORIGINAL_DCN as org_dcn, ENTITY
  , "SWIFT_MX_TYPE"  --OBCL_14.7_CAMT054_CHANGES 
  FROM OLTB_DLY_MSG_OUT
      ,Olzb_Contract_Event_Log Ocel -- Olzb_Contract_Event_Log is added as part of this Bug#37194111
 WHERE (branch in (SELECT BRANCH_CODE
                    FROM SMVWS_CONSOLIDATED_USERROLE
                   WHERE USER_ID = GLOBAL.USER_ID)
    OR (SELECT sypks_utils.get_branch(DCN) FROM DUAL) = Global.current_branch ) --BUG#28348795 brackets added
   and OLTB_DLY_MSG_OUT.Reference_No = Ocel.Contract_Ref_No(+) -- Left Outer Join added as part of this Bug#37194111
   and OLTB_DLY_MSG_OUT.Esn          = Ocel.Event_Seq_No(+)    -- Left Outer Join added as part of this Bug#37194111
   and running_no = 1
   and Nvl(suppress_flag, 'N') = 'N'
   and exists
 (select 1
          from smtbs_user a
         where a.user_id = global.user_id
           and ((a.products_allowed = 'A' and exists
                (select 1
                    from smtbs_user_products b
                   where b.user_id = a.user_id
                     and b.product_code = OLTB_DLY_MSG_OUT.product)) or
               (a.products_allowed = 'D' and not exists
                (select 1
                    from smtbs_user_products c
                   where c.user_id = a.user_id
                     and c.product_code = OLTB_DLY_MSG_OUT.product)) or
               OLTB_DLY_MSG_OUT.msg_type = 'INTST' or
               OLTB_DLY_MSG_OUT.msg_type = 'ACST_DETAILED' or
               OLTB_DLY_MSG_OUT.msg_type = 'ACST_DETAIL_VD'))
/
CREATE OR REPLACE SYNONYM olvws_mssoubrs FOR olvw_mssoubrs
/