CREATE OR REPLACE PACKAGE gwpks_msg_router AS

   /*------------------------------------------------------------------------------------------
   **
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
   -------------------------------------------------------------------------------------------------------
   CHANGE HISTORY

   SFR No             :Revamped Version
   Changed By         :Radha
   Change Description :Code Cleaned Up

   Changed By          : Bhanu Prakash V
   Changed On			: 16-Oct-2012
   Change Description  : Code added for getting the flexcube reference number for Gateway Incoming Message Browser .Retro Fix - Bug Id: 14767481
   Search String       : FC11.1_14053076

   -------------------------------------------------------------------------------------------------------
   */
   g_fc_trn_ref_no gwtbs_msg_in_log.fc_trn_ref_no%TYPE;--FC11.1_14053076
   PROCEDURE Pr_Process_Req_Msg(p_Is_Req_Clob  IN VARCHAR2
                               ,p_Req_Xml_Str  IN VARCHAR2
                               ,p_Req_Xml_Clob IN CLOB
                               ,p_Instr_Xml    IN OUT VARCHAR2
                               ,p_Is_Res_Clob  OUT VARCHAR2
                               ,p_Res_Xml_Str  OUT VARCHAR2
                               ,p_Res_Xml_Clob OUT CLOB);

   PROCEDURE Pr_Log_Xml_Out_Msg(p_Is_Res_Clob    IN VARCHAR2
                               ,p_Res_Xml_Str    IN VARCHAR2
                               ,p_Res_Xml_Clob   IN CLOB
                               ,p_Instr_Xml      IN VARCHAR2
                               ,p_Process_Status IN VARCHAR2);

   PROCEDURE Pr_Update_Res_Msg_Id(p_Instr_Xml IN VARCHAR2);

   PROCEDURE Pr_Enrich_Notif(p_Notif_Msg        IN OUT VARCHAR2
                            ,p_Enrich_Notif_Msg OUT Ty_Notif_Msg);

   FUNCTION Fn_Resp_Msg_Ref_Gen(p_Resp_Ref_No IN OUT Gwtbs_Msg_In_Log.Msg_Ref_No%TYPE
                               ,p_Err_Code    IN OUT VARCHAR2
                               ,p_Err_Param   IN OUT VARCHAR2) RETURN BOOLEAN;

   PROCEDURE Pr_Log_Out_Msg(p_Is_Out_Clob     IN VARCHAR2
                           ,p_Xml_Out_Clob    IN Gwtbs_Msg_Out_Log.Message%TYPE
                           ,p_Xml_Out_Str     IN VARCHAR2
                           ,p_Res_q_Msg_Id    IN Gwtbs_Msg_Out_Log.Res_q_Msg_Id%TYPE
                           ,p_Res_q_Correl_Id IN Gwtbs_Msg_Out_Log.Res_q_Correl_Id%TYPE
                           ,p_Gateway         IN Gwtbs_Msg_Out_Log.Media%TYPE
                           ,p_Resp_Queue      IN Gwtbs_Msg_Out_Log.Queue_Name%TYPE
                           ,p_Process_Status  IN Gwtbs_Msg_Out_Log.Process_Status%TYPE
                           ,p_Header          IN Gwpks_Service_Router.Ty_Header
                           ,p_Err_Code        IN VARCHAR2
                           ,p_Err_Param       IN VARCHAR2);
   PROCEDURE Pr_Log_Out_Msg(p_Is_Out_Clob                 IN VARCHAR2
                           ,p_Xml_Out_Clob                IN Gwtbs_Msg_Out_Log.Message%TYPE
                           ,p_Xml_Out_Str                 IN VARCHAR2
                           ,p_Res_q_Msg_Id                IN Gwtbs_Msg_Out_Log.Res_q_Msg_Id%TYPE
                           ,p_Res_q_Correl_Id             IN Gwtbs_Msg_Out_Log.Res_q_Correl_Id%TYPE
                           ,p_Gateway                     IN Gwtbs_Msg_Out_Log.Media%TYPE
                           ,p_Resp_Queue                  IN Gwtbs_Msg_Out_Log.Queue_Name%TYPE
                           ,p_Process_Status              IN Gwtbs_Msg_Out_Log.Process_Status%TYPE
                           ,p_Rec_Biz_Process_Header      IN Gwpkss_Service_Router.Ty_Biz_Process_Header
                           ,p_Rec_Processing_Instructions IN Gwpkss_Service_Router.Ty_Processing_Instructions
                           ,p_Err_Code                    IN VARCHAR2
                           ,p_Err_Param                   IN VARCHAR2);
   PROCEDURE Pr_Log_Notif(p_Notif_Msgs IN OUT CLOB);

END Gwpks_Msg_Router;
/
CREATE OR REPLACE SYNONYM Gwpkss_Msg_Router FOR Gwpks_Msg_Router
/