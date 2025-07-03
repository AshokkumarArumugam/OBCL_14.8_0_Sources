CREATE OR REPLACE PACKAGE Cspks_Req_Wrapper AS
   /*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product
** Copyright © 2008 - 2011  Oracle and/or its affiliates.  All rights reserved.
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

   SFR No                   :Revamped Version
   Changed By               :Radha
   Change Description       :Code Cleaned Up   
   
   -------------------------------------------------------------------------------------------------------
   */

   g_Source           Cotms_Source.Source_Code%TYPE;
   g_Function_Id      Smtbs_Menu.Function_Id%TYPE;
   g_Source_Operation VARCHAR2(100);
   g_Action_Code      VARCHAR2(50);
   g_Multi_Trip_Id    VARCHAR2(50);
   g_Request_No       NUMBER := 1;
   g_Process_Type     VARCHAR2(10) := 'I';
   g_Addl_Info        Cspks_Req_Global.Ty_Addl_Info;
   g_Status           VARCHAR2(20);
   g_Err_Code         VARCHAR2(32767);
   g_Err_Params       VARCHAR2(32767);
   g_Return           BOOLEAN := TRUE;
   g_Exchange_Pattern VARCHAR2(4);
   g_Master_Table     VARCHAR2(50);
   g_Audit_Type       VARCHAR2(50);
   g_Rec_Id           VARCHAR2(32767);
   g_Key_Id           VARCHAR2(32767);
   g_Other_Data       VARCHAR2(32767);
   g_Audit_Type       VARCHAR2(32767);
   g_Node_Data        Cspks_Req_Global.Ty_Tb_Chr_Node_Data;

   --Sanction Check Enhancement Change starts
   g_curr_stage       VARCHAR2(20);
   g_tanked_stat      VARCHAR2(20);
   --Sanction Check Enhancement Change ends

   FUNCTION Fn_Process_Msg(p_Source           IN Cotms_Source.Source_Code%TYPE
                          ,p_Source_Operation IN VARCHAR2
                          ,p_Function_Id      IN Smtbs_Menu.Function_Id%TYPE
                          ,p_Action_Code      IN VARCHAR2
                          ,p_Exchange_Pattern IN VARCHAR2
                          ,p_Multi_Trip_Id    IN VARCHAR2
                          ,p_Request_No       IN NUMBER
                          ,p_Addl_Info        IN OUT Cspks_Req_Global.Ty_Addl_Info
                          ,p_Status           IN OUT VARCHAR2
                          ,p_Err_Code         IN OUT VARCHAR2
                          ,p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
   FUNCTION Fn_Rebuild_Ts_List(p_Source           IN Cotms_Source.Source_Code%TYPE
                              ,p_Source_Operation IN VARCHAR2
                              ,p_Function_Id      IN Smtbs_Menu.Function_Id%TYPE
                              ,p_Action_Code      IN VARCHAR2
                              ,p_Exchange_Pattern IN VARCHAR2
                              ,p_Status           IN OUT VARCHAR2
                              ,p_Err_Code         IN OUT VARCHAR2
                              ,p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
   FUNCTION Fn_Extract_Custom_Data(p_Source           IN Cotms_Source.Source_Code%TYPE
                                  ,p_Source_Operation IN VARCHAR2
                                  ,p_Function_Id      IN Smtbs_Menu.Function_Id%TYPE
                                  ,p_Action_Code      IN VARCHAR2
                                  ,p_Addl_Info        IN OUT Cspks_Req_Global.Ty_Addl_Info
                                  ,p_Status           IN OUT VARCHAR2
                                  ,p_Err_Code         IN OUT VARCHAR2
                                  ,p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
   FUNCTION Fn_Get_Node_Data(p_Function_Id IN Smtbs_Menu.Function_Id%TYPE
                            ,p_Node_Data   IN OUT Cspks_Req_Global.Ty_Tb_Chr_Node_Data
                            ,p_Err_Code    IN OUT VARCHAR2
                            ,p_Err_Params  IN OUT VARCHAR2) RETURN BOOLEAN;

   -- Sanction Check Enhancement Change starts
   FUNCTION fn_get_curr_stage (p_Function_Id IN VARCHAR2) RETURN VARCHAR2  ;
   FUNCTION fn_get_tanked_stat (p_Function_Id IN VARCHAR2) RETURN VARCHAR2;
   -- Sanction Check Enhancement Change ends                           

END Cspks_Req_Wrapper;
/
Create or Replace Synonym Cspkss_Req_Wrapper for Cspks_Req_Wrapper
/