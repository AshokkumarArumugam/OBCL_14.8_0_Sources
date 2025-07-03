CREATE OR REPLACE PACKAGE gwpks_util IS
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
/*------------------------------------------------------------------------------------
-:  CHANGE HISTORY  :-
    **********************

  Date           Sr. No.     Tag Name                      Description
-----------         --------       --------------                      -------------------------------------------------
  15-MAY-2007          1        KERNEL 8.0               New utility package
   28-JUN-2007        2     KERNEL 8.0 FCJ          Function fn_get_subsys_flds is added
  11-SEP-2007         3         FC8.0LOT2ITR2 SFR#921 changes New function fn_update_errTbl is added
  27-Dec-2007       4.  KERNEL 10.0 Added Procedure pr_split_bulk_upload
  25-JUN-2008       5   FCUBS10.1 BRNXML cleanup changes
  19-JUM-2008          6        FC 10.2 24X7 CHANGES        Added g_branch_date global date for branch 24x7 changes

  Modified By     : Nitesh Chaturvedi
  Modified On     : 07-May-2013
  Fix Description : Added G_MAKERID global variable for updating the maker id in actb_daily_log while doing redemption
  Search String   : 9NT1606_12.0.2_INTERNAL_RETRO_16773332 Changes

    Date                 : 7-May-2013
    Updated By           : Sumeet Yajnik
    Release              : FCUBS_12.0.2
    Bug Number           : INTERNAL
    Change Description   : Performance change function result cache added
    Search Tag           : FCUBS PERF PROCESS REQ MSG Changes

    Date                 : 19-May-2013
    Updated By           : Sumeet Yajnik
    Release              : FCUBS_12.0.2
    Bug Number           : 16959824
    Change Description   : FLEXBRANCH specific changes
    Search Tag           : 16959824

    Date                 : 17-July-2013
    Updated By           : Sumeet Yajnik
    Release              : FCUBS_12.0.2
    Bug Number           : 17083282
    Change Description   : BLK_TCDENOMINATION_DETAILS Block missing for 1009 funtionId
    Search Tag           : 17083282
	**
	** Changed by 	 : Vinutha Kini
	** Changed on 	 : 26-July-2016
	** Description	 : Core clean up for 12.3Payments
	** Search String : Standalone12.3 CleanUp	

--------------------------------------------------------------------------------------------------------
*/
    --FCUBS10.1 BRNXML CLEANUP  - START
  pkg_temp_chg_dets VARCHAR2(32767) := NULL;
  pkg_chg_dets VARCHAR2(32767) := NULL;
  --FCUBS_12.2_STANDALONE_CORE_CHANGES - Start
  /*g_benef_name ISTMS_INSTR_TXN.BENEF_NAME%TYPE;
  g_benef_add1 ISTMS_INSTR_TXN.BENEF_ADDR_1%TYPE;
  g_benef_add2 ISTMS_INSTR_TXN.BENEF_ADDR_2%TYPE;
  g_benef_add3 ISTMS_INSTR_TXN.BENEF_ADDR_3%TYPE;*/
 g_benef_name sttm_core_customer.customer_name1%TYPE;
  g_benef_add1 VARCHAR2(105);
  g_benef_add2 VARCHAR2(105);
  g_benef_add3 VARCHAR2(105);
  --FCUBS_12.2_STANDALONE_CORE_CHANGES - End

  pkg_actType             VARCHAR2(35); --IFTB_BRANCH_RECON.ACTIONTYPE%TYPE;--Standalone12.3 CleanUp Start
  pkg_func                VARCHAR2(100);

  G_MSGTYPE VARCHAR2(10);
  G_XREF  VARCHAR2(35); --IFTB_BRANCH_RECON.XREF%TYPE ;--Standalone12.3 CleanUp Start
  g_force_post BOOLEAN:= FALSE;
  G_FROM_BEAN BOOLEAN := FALSE;
  G_BRANCH_DATE   DATE;   --FC 10.2 24X7 CHANGES
  G_OVD_CONF BOOLEAN := FALSE;
  G_REQ_TYPE  VARCHAR2(35);--IFTB_BRANCH_RECON.REQTYPE%TYPE ;--Standalone12.3 CleanUp Start
  pkg_bOvdRaised    BOOLEAN := FALSE;
  pkg_routing_no    VARCHAR2(20);
  g_chgs_row        VARCHAR2(32767) := NULL;
  g_genmsg VARCHAR2(1) := 'N';
  --g_penalty   NUMBER;
  G_CHECKERID VARCHAR2(20);
   G_MAKERID  VARCHAR2(20);    --9NT1606_12.0.2_INTERNAL_RETRO_16773332 Changes
  --FCUBS10.1 BRNXML CLEANUP  - END
    --12.0.2_single_step_process starts
  g_branchovdraised VARCHAR2(1) := 'N';
  g_twostepprocess  VARCHAR2(1) := 'N';
  g_firststepdone   VARCHAR2(1) := 'N';
  g_brnnewflow      VARCHAR2(1) := 'N';
  g_pickupclicked   VARCHAR2(1) := 'N';
  g_twostepprocessno VARCHAR2(1) := 'N'; --12.0.2_Two_step_process added
--  12.0.2_single_step_process  ends
  G_FROM_SI BOOLEAN := FALSE; --FCUBS11.1 MB0662 SFR#3281 Used only for SI DD/PO generation

  G_REJECTFLAG CSTB_UI_COLUMNS.CHAR_FIELD1%TYPE;--11.1 CHANGES ONLY USED FOR FID:- LOCH

  --G_TILL_ID     DETMS_TIL_VLT_MASTER.TILL_ID%TYPE;--9NT1428 Cash TILL Changes--Standalone12.3 CleanUp Start
  --G_OFFSET_TILL DETMS_TIL_VLT_MASTER.TILL_ID%TYPE;--9NT1428 Cash TILL Changes--Standalone12.3 CleanUp Start
    --FCDATA Denom Block changes starts
--  g_denom_reqd VARCHAR2(1) := 'Y'; --12.0.2_16959824
    g_denom_reqd VARCHAR2(1) := 'N'; --12.0.2_16959824
    g_fx_denom_reqd  VARCHAR2(1) := 'N';
    g_fxse_denom_tag VARCHAR2(1000) := NULL;
    g_se_denom_tag VARCHAR2(1000) := NULL;
    g_fx_denom_tag VARCHAR2(1000) := NULL;
    g_tc_denom_reqd  VARCHAR2(1) := 'N'; -- Fix for 17083282
    g_tc_denom_tag VARCHAR2(1000) := NULL; -- Fix for 17083282
    g_denom_tag VARCHAR2(1000) := NULL;
    --FCDATA Denom Block changes ends
    g_udfBuilt BOOLEAN:= false; --FCUBS_121_INTERNAL_21545639 added
 type rec_ty_subsystem_flds is record (stat varchar2(1), included varchar2(1)); -- KERNEL8.0 FCJ Change
 TYPE ty_subsystem_flds IS TABLE OF rec_ty_subsystem_flds INDEX BY VARCHAR2(1000);-- KERNEL8.0 FCJ Change

    FUNCTION fn_msg_ref_gen(p_req_ref_no IN OUT gwtb_msg_log.sys_msg_id%TYPE,                            
                            p_err_code   IN OUT VARCHAR2,
                            p_err_param  IN OUT VARCHAR2) RETURN BOOLEAN;

    --Standalone12.3 CleanUp Start
	/*
	FUNCTION fn_update_old_overrides(p_sys_msg_id      IN gwtb_msg_log.sys_msg_id%TYPE,
                                     p_contract_ref_no IN cstb_contract.contract_ref_no%TYPE,
                                     p_module_id       IN VARCHAR2)
        RETURN BOOLEAN;

    FUNCTION fn_log_new_overrides(p_sys_msg_id IN gwtb_msg_log.sys_msg_id%TYPE)
        RETURN BOOLEAN;
    */
	--Standalone12.3 CleanUp End
	
   FUNCTION fn_check_overrides(p_sys_msg_id IN gwtb_msg_log.sys_msg_id%TYPE)
   
        RETURN VARCHAR;
    ---KERNEL8.0 FCJ changes starts
 FUNCTION fn_get_subsys_flds(p_subsystem_stat IN VARCHAR2,
                            p_ty_subsystem  IN OUT  ty_subsystem_flds,
                            p_err_code                  IN OUT VARCHAR2,
                             p_err_param                 IN OUT VARCHAR2
                            )
    RETURN BOOLEAN;
        ---KERNEL8.0 FCJ changes ends
-- FC8.0LOT2ITR2 SFR#921 changes starts
    FUNCTION fn_update_errTbl(p_tmperrcodetab IN ovpks.tbl_error)
    RETURN BOOLEAN;
-- FC8.0LOT2ITR2 SFR#921 changes ends
  -- FCC 10.0 ----
  PROCEDURE pr_split_bulk_upload(p_parent_tag_name     IN VARCHAR2,
                                 p_parent_list         IN VARCHAR2,
                                 p_parent_format       IN VARCHAR2,
                                 p_clob_tag_names      IN CLOB,
                                 p_clob_tag_values     IN CLOB,
                                 p_position            IN NUMBER,
                                 p_res_parent_list     OUT VARCHAR2,
                                 p_res_parent_format   OUT VARCHAR2,
                                 p_res_clob_tag_names  OUT CLOB,
                                 p_res_clob_tag_values OUT CLOB);
  -- FCC 10.0 ----
--FCUBS PERF PROCESS REQ MSG Changes starts
FUNCTION fn_get_menu_rec(p_function_id IN VARCHAR2)
RETURN smtbs_menu%ROWTYPE RESULT_CACHE;

FUNCTION fn_get_fcj_functions(p_function_id IN VARCHAR2,
                                p_Action IN VARCHAR2
                              )
RETURN gwtms_fcj_functions%ROWTYPE RESULT_CACHE;

FUNCTION fn_get_operation_master(p_function_id IN VARCHAR2,
                                    p_action IN VARCHAR2,
                                    p_service IN VARCHAR2,
                                    p_operation IN VARCHAR2
                                )
RETURN gwtms_operations_master%ROWTYPE RESULT_CACHE;

--FCUBS PERF PROCESS REQ MSG Changes ends
END gwpks_util;
/
create or replace synonym gwpkss_util for gwpks_util
/