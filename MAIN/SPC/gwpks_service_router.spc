CREATE OR REPLACE PACKAGE Gwpks_Service_Router AS
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Software Product.
** Copyright (R) 2017 - 2018 , Oracle and/or its affiliates.  All rights reserved
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
  -------------------------------------------------------------------------------------------------------
  CHANGE HISTORY
  
  SFR No                   :Revamped Version
  Changed By             :Radha
  Change Description  :Code Cleaned Up
  
  SFR No                  : POSS CHANGES
  Changed By              : Vivin
  Change Description      : Code added to handle Planned Outage support Server
  
    Date                 : 29-Mar-2013
    Updated By           : Sumeet Yajnik
    Release              : FCUBS_12.0.2
    Bug Number           : INTERNAL
    Change Description   : Performance Changes - New Procedure Pr_process_req_msg is added which will have individual parameters
             instead of XMl request
    Search Tag           : FCUBS PERF PROCESS REQ MSG Changes
  
   Date                 : 4-Feb-2014
     Updated By           : Shen
     Release              : INTERNAL
     Bug Number           : INTERNAL
     Change Description   : Integration Layer Changes..Overloaded function PR_PROCESS_MSG IS added
     Search String         : FCUBS Integration Layer Changes
     
    Date                 : 21-May-2015
    Updated By           : Sarva Karunakaran
    Release              : FCUBS_12.1
    Bug Number           : INTERNAL
    Change Description   : Source User length to be increased to be in sync with the length of the column THEIR_USER_ID of table GWTB_MSG_IN_LOG 
    Search Tag           : Source User Length Changes
    
    ** Modified By           : J.Abinaya
    ** Modified On           : 9-Mar-2017
    ** Modified Reason       : multi currency account changes
    ** Search String         : Fcubs_12.4_multi_currency_accounts
**    
**  Date                 : 28-Aug-2018
**  Updated By           : Alam
**  Bug Number           : 22964659
**  Change Description   : Source User length has to be in sync with the length of the column THEIR_USER_ID of table GWTB_MSG_IN_LOG.
**  Search Tag           : JC_TO_MINICORE

**  Date                 : 25-Sep-2019
**  Updated By           : Mantinder Kaur
**  Change Description   : For non extensible flow,entity id passed in the request is not available in the response.
						   Currently there was no code available to set the entity id in the  flexcube response for non extensible flow.
						   Code added to set the value of enitity in the response. 						   
**  Search Tag           : FCUBS_143_CTBC_30309783
-------------------------------------------------------------------------------------------------------
*/

  G_action varchar2(100); -- 9NT1428 NEFT/RTGS Changes

  TYPE Ty_Header IS TABLE OF VARCHAR2(32767) INDEX BY VARCHAR2(255);

  TYPE Ty_Headers IS TABLE OF Ty_Header INDEX BY PLS_INTEGER;

  --*********************OLD TYPES START***************************************--
  --Old Types , Would be senset after complete conversion to Extensibility
  TYPE Ty_Processing_Instructions IS RECORD(
    Correlation_Pattern      VARCHAR2(3),
    Msg_Xchange_Pattern      VARCHAR(4),
    Msg_Id                   VARCHAR2(255),
    Correl_Id                VARCHAR2(255),
    /*Source User Length Changes*/
 /*source_user smtb_user.user_id%TYPE,*/
 --source_user smtb_user.user_id%TYPE, --JC_TO_MINICORE Commented
	Source_User              gwtb_msg_in_log.their_user_id%type,--JC_TO_MINICORE added
    Req_Msg_Ref_No           VARCHAR2(16),
    Res_Msg_Ref_No           VARCHAR2(40),
    Brn_App_Date             DATE,
    Fc_Trn_Ref_No            VARCHAR2(16),
    Gateway_Type             VARCHAR2(10),
    Sys_Msg_Id               VARCHAR2(16),
    Logging_Reqd             VARCHAR2(1),
    Multitrip_Reqd           VARCHAR2(1),
    Routing_Type             VARCHAR2(1),
    Reply_Reqd               VARCHAR2(1),
    Distributed_Installation VARCHAR2(1));

  TYPE Parameter IS RECORD(
    NAME  VARCHAR2(1000),
    VALUE VARCHAR2(1000));

  TYPE Addl_Tab IS TABLE OF Parameter INDEX BY VARCHAR2(20);

  TYPE Ty_Biz_Process_Header IS RECORD(
    SOURCE           VARCHAR2(15),
    Service_Name     VARCHAR2(50),
    Operation_Code   VARCHAR2(50),
    Source_Operation VARCHAR2(50),
 branch_code sttm_core_branch.branch_code%TYPE,
 user_id smtb_user.user_id%TYPE,
    Ubscomp          VARCHAR2(10),
    Moduleid         VARCHAR2(10),
    Dept             VARCHAR2(50),
    Loc              VARCHAR2(50),
    Multitripid      VARCHAR2(16),
    Functionid       VARCHAR2(8),
    Action           VARCHAR2(50),
    Msgstat          VARCHAR2(8),
    Msgid            VARCHAR2(40),
	Entity			 SSTB_USER.HOME_ENTITY%TYPE,--FCUBS_143_CTBC_30309783
    Addl             Addl_Tab);
  -- FCUBS11.1 POSS CHANGES STARTS
  TYPE t_Var_Arr IS VARRAY(50) OF VARCHAR2(2000);

  TYPE t_Clob_Arr IS VARRAY(50) OF CLOB;

  g_Lckhandle_Poss VARCHAR2(32767);
  g_Poss_Seqno     VARCHAR2(16);
  g_Poss_Status    VARCHAR2(10) := 'HOST';
  g_Status         VARCHAR2(1) := 'S';

  -- FCUBS11.1 POSS CHANGES ENDS

  --*********************OLD TYPES END***************************************--

  PROCEDURE Pr_Process_Replay_Msg(p_Seq_No IN VARCHAR2); -- FCUBS11.1 POSS CHANGE

  PROCEDURE Pr_Backup;
  PROCEDURE Pr_Restore;
  PROCEDURE Pr_Init_Header(p_Header      IN OUT NOCOPY Ty_Header,
                           p_Addl_Header IN OUT NOCOPY Ty_Header);

  --To be Called From FCJ Bean
  PROCEDURE Pr_Process_Req_Msg(p_Req       IN CLOB,
                               p_Instr_Xml IN OUT NOCOPY VARCHAR2,
                               p_Res       IN OUT NOCOPY CLOB,
                               p_Status    IN OUT VARCHAR2);

  --To Be Called From New Message Router
  PROCEDURE Pr_Process_Req_Msg(p_Req         IN CLOB,
                               p_Instr_Xml   IN OUT NOCOPY VARCHAR2,
                               p_Header      IN OUT NOCOPY Ty_Header,
                               p_Addl_Header IN OUT NOCOPY Ty_Header,
                               p_Res         IN OUT NOCOPY CLOB,
                               p_Status      OUT NOCOPY VARCHAR2);
  --To Be called From Gateway Bean
  PROCEDURE Pr_Process_Req_Msg(p_Is_Req_Clob    IN VARCHAR2,
                               p_Req_Xml_Str    IN VARCHAR2,
                               p_Req_Xml_Clob   IN CLOB,
                               p_Instr_Xml      IN OUT VARCHAR2,
                               p_Is_Res_Clob    OUT VARCHAR2,
                               p_Res_Xml_Str    OUT VARCHAR2,
                               p_Res_Xml_Clob   OUT CLOB,
                               p_Process_Status OUT VARCHAR2);
  --Dummy function For BPEL Composite

  ---FCUBS PERF PROCESS REQ MSG Changes starts
  --This new process req msg will be called from UI-UBS infra for performance
  --Xml will not be passed , Blk name, tag values, tag names will be passed
  PROCEDURE pr_process_req_msg(p_source              IN VARCHAR2,
                               p_user_id             IN VARCHAR2,
                               p_branch              IN VARCHAR2,
                               p_function_id         IN VARCHAR2,
                               p_action              IN VARCHAR2,
                               p_module_id           IN VARCHAR2,
                               p_service_name        IN VARCHAR2,
                               p_operation_code      IN VARCHAR2,
                               p_msg_id              IN VARCHAR2,
                               p_pkey_vals           IN VARCHAR2,
                               p_seq_no              IN NUMBER,
                               p_ubscomp             IN VARCHAR2,
                               p_source_operation    IN VARCHAR2,
                               p_source_user_id      IN VARCHAR2,
                               p_dept_code           IN VARCHAR2,
                               p_loc                 IN VARCHAR2,
                               p_maker_Remarks       IN VARCHAR2,
                               p_checker_remarks     IN VARCHAR2,
                               p_maker_ovd_remarks   IN VARCHAR2,
                               p_checker_ovd_remarks IN VARCHAR2,
                               p_debug_mode          IN VARCHAR2,
                               p_multi_trip_id       IN VARCHAR2,
                               p_msg_status          IN OUT VARCHAR2,
                               p_addl_info           IN VARCHAR2,
                               p_blk_ds_name         IN CLOB,
                               p_fld_tag_name        IN CLOB,
                               p_fld_tag_value       IN CLOB,
                               p_resp_msg            IN OUT NOCOPY CLOB,
                               p_status              OUT VARCHAR2);
  --FCUBS PERF PROCESS REQ MSG Changes ends
  g_Frm_Comp_Handler  BOOLEAN := FALSE;
  g_Composite_Request BOOLEAN := FALSE;
  PROCEDURE Pr_Process_Req_Msg(p_Is_Req_Clob       IN VARCHAR2,
                               p_Req_Xml_Str       IN VARCHAR2,
                               p_Req_Xml_Clob      IN CLOB,
                               p_Instr_Xml         IN OUT NOCOPY VARCHAR2,
                               p_Is_Res_Clob       OUT NOCOPY VARCHAR2,
                               p_Res_Xml_Str       OUT NOCOPY VARCHAR2,
                               p_Res_Xml_Clob      OUT NOCOPY CLOB,
                               p_Process_Status    OUT NOCOPY VARCHAR2,
                               p_Ty_Biz_Msg_Header IN OUT NOCOPY Gwpks_Service_Router.Ty_Biz_Process_Header,
                               p_Ty_Proc_Instr     IN OUT NOCOPY Gwpks_Service_Router.Ty_Processing_Instructions);

  FUNCTION Fn_Service_Router(p_Is_In_Msg_Clob  IN VARCHAR2,
                             p_In_Msg_Str      IN VARCHAR2,
                             p_In_Msg_Clob     IN CLOB,
                             p_Rec_Msg_Header  IN Ty_Biz_Process_Header,
                             p_Is_Out_Msg_Clob OUT NOCOPY VARCHAR2,
                             p_Out_Msg_Str     OUT NOCOPY VARCHAR2,
                             p_Out_Msg_Clob    OUT NOCOPY CLOB,
                             p_Instr_Rec       IN OUT NOCOPY Ty_Processing_Instructions,
                             p_Process_Stat    IN OUT VARCHAR2,
                             p_Err_Code        IN OUT NOCOPY VARCHAR2,
                             p_Err_Param       IN OUT NOCOPY VARCHAR2)
    RETURN BOOLEAN;

  --FCUBS Integration Layer Changes starts
  PROCEDURE pr_process_req_msg(p_source              IN VARCHAR2,
                               p_user_id             IN VARCHAR2,
                               p_branch              IN VARCHAR2,
                               p_function_id         IN VARCHAR2,
                               p_action              IN VARCHAR2,
                               p_module_id           IN VARCHAR2,
                               p_service_name        IN VARCHAR2,
                               p_operation_code      IN VARCHAR2,
                               p_msg_id              IN VARCHAR2,
                               p_pkey_vals           IN VARCHAR2,
                               p_seq_no              IN NUMBER,
                               p_ubscomp             IN VARCHAR2,
                               p_source_operation    IN VARCHAR2,
                               p_source_user_id      IN VARCHAR2,
                               p_dept_code           IN VARCHAR2,
                               p_loc                 IN VARCHAR2,
                               p_maker_Remarks       IN VARCHAR2,
                               p_checker_remarks     IN VARCHAR2,
                               p_maker_ovd_remarks   IN VARCHAR2,
                               p_checker_ovd_remarks IN VARCHAR2,
                               p_debug_mode          IN VARCHAR2,
                               p_multi_trip_id       IN VARCHAR2,
                               p_msg_status          IN OUT VARCHAR2,
                               p_addl_info           IN VARCHAR2,
                               p_blk_ds_name         IN CLOB,
                               p_fld_tag_name        IN CLOB,
                               p_fld_tag_value       IN CLOB,
                               p_resp_msg            IN OUT NOCOPY CLOB,
                               p_extsys_msg          IN OUT NOCOPY CLOB, --FCUBS Integration Layer Changes
                               p_status              OUT VARCHAR2);
							   
  PROCEDURE pr_process_req_msg_new(p_req        IN CLOB,
                               p_instr_xml  IN OUT NOCOPY VARCHAR2,
                               p_res        IN OUT NOCOPY CLOB,
                               p_extsys_msg IN OUT NOCOPY CLOB --FCUBS Integration Layer Changes
                              ,
                               p_status     IN OUT VARCHAR2,
							                 p_extintegration_key       IN OUT VARCHAR2);  
											 
  PROCEDURE pr_process_req_msg(p_req        IN CLOB,
                               p_instr_xml  IN OUT NOCOPY VARCHAR2,
                               p_res        IN OUT NOCOPY CLOB,
                               p_extsys_msg IN OUT NOCOPY CLOB --FCUBS Integration Layer Changes
                              ,
                               p_status     IN OUT VARCHAR2);
  PROCEDURE pr_process_req_msg(p_req         IN CLOB,
                               p_instr_xml   IN OUT NOCOPY VARCHAR2,
                               p_header      IN OUT NOCOPY ty_header,
                               p_addl_header IN OUT NOCOPY ty_header,
                               p_res         IN OUT NOCOPY CLOB,
                               p_extsys_msg  IN OUT NOCOPY CLOB --FCUBS Integration Layer Changes
                              ,
                               p_status      OUT NOCOPY VARCHAR2);
  PROCEDURE pr_process_req_msg(p_is_req_clob    IN VARCHAR2, --To Be called From Gateway Bean
                               p_req_xml_str    IN VARCHAR2,
                               p_req_xml_clob   IN CLOB,
                               p_instr_xml      IN OUT VARCHAR2,
                               p_is_res_clob    OUT VARCHAR2,
                               p_res_xml_str    OUT VARCHAR2,
                               p_res_xml_clob   OUT CLOB,
                               p_extsys_msg     IN OUT NOCOPY CLOB, --FCUBS Integration Layer Changes
                               p_process_status OUT VARCHAR2);
  --FCUBS Integration Layer Changes ends
   PROCEDURE pr_process_gw_msg(p_is_req_clob    IN VARCHAR2,
                               p_req_xml_str    IN VARCHAR2,
                               p_req_xml_clob   IN CLOB,
                               p_instr_xml      IN OUT VARCHAR2,
                               p_is_res_clob    OUT VARCHAR2,
                               p_res_xml_str    OUT VARCHAR2,
                               p_res_xml_clob   OUT CLOB,
                               p_extsys_msg     IN OUT NOCOPY CLOB,
                               p_process_status OUT VARCHAR2,
                               p_db_log            OUT CLOB,
                               p_timelog           OUT VARCHAR2,
							   p_extintegration_key       IN OUT VARCHAR2);--Non extensible gateway changes
   
    -- Anil Changes Start
	  PROCEDURE Pr_Process_Req_Msg_Split(p_Req         IN CLOB
                                        ,p_Instr_Xml   IN OUT NOCOPY VARCHAR2
                                        ,p_Header      IN OUT NOCOPY Ty_Header
                                        ,p_Addl_Header IN OUT NOCOPY Ty_Header
                                        ,p_Res         IN OUT NOCOPY CLOB
                                        ,p_Extsys_Msg  IN OUT NOCOPY CLOB
                                        ,p_Status      OUT NOCOPY VARCHAR2);

      PROCEDURE Pr_Process_Req_Msg_Split_2(p_Req         IN CLOB
                                          ,p_Instr_Xml   IN OUT NOCOPY VARCHAR2
                                          ,p_Res         IN OUT NOCOPY CLOB
                                          ,p_Extsys_Msg  IN OUT NOCOPY CLOB
                                          ,p_Status      IN OUT VARCHAR2
                                          ,p_Source_Code IN OUT VARCHAR2
                                          ,p_Error_Code  IN OUT VARCHAR2
                                          ,p_Error_Param IN OUT VARCHAR2);
	-- Anil Changes End   
	PROCEDURE pr_init_header ; --Fcubs_12.4_multi_currency_accounts
END Gwpks_Service_Router;
/
Create Or Replace Synonym Gwpkss_Service_Router  for Gwpks_Service_Router
/
