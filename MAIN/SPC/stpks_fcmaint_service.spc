CREATE OR REPLACE PACKAGE Stpks_Fcmaint_Service AS
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
/*
----------------------------------------------------------------------------------------------------
   CHANGE HISTORY
   SFR No             :
   Changed By         :
   Change Description :
   
   -------------------------------------------------------------------------------------------------------
   */
   TYPE Ty_Tb_Record_Data IS TABLE OF VARCHAR2(32767) INDEX BY VARCHAR2(255);
   TYPE Ty_Tb_Table_Data IS TABLE OF Ty_Tb_Record_Data INDEX BY PLS_INTEGER;
   TYPE Ty_Tb_Xml_Data IS TABLE OF Ty_Tb_Table_Data INDEX BY VARCHAR2(255);
   TYPE Ty_Tb_Xml_Table IS TABLE OF Ty_Tb_Xml_Data INDEX BY PLS_INTEGER;
   TYPE Rel_Rec IS RECORD(
      Ccol VARCHAR2(100),
      Pcol VARCHAR2(100));

   TYPE Ty_Rel_Tbl IS TABLE OF Rel_Rec INDEX BY PLS_INTEGER;

   TYPE Ty_Node_Rec IS RECORD(
      Node_Level    NUMBER(4),
      Node_Name     VARCHAR2(100),
      Node_Parent   VARCHAR2(100),
      Node_Relation VARCHAR2(32767),
      Node_Fields   VARCHAR2(32767),
      Node_Tags     VARCHAR2(32767),
      Query_Node    VARCHAR2(1),
      Node_Idx      NUMBER,
      Rel_Tbl       Ty_Rel_Tbl,
      Has_Childs    VARCHAR2(1),
      Child_List    VARCHAR2(4000));

   TYPE Ty_Tb_Chr_Node_Data IS TABLE OF Ty_Node_Rec INDEX BY VARCHAR2(500);
   TYPE Ty_Tb_Int_Node_Data IS TABLE OF Ty_Node_Rec INDEX BY PLS_INTEGER;
   
   --FCUBS 11.0.IS.1/10.0.IS.4.0     Retro Changes Start     
   TYPE ty_tb_node_data IS TABLE OF ty_node_rec INDEX BY VARCHAR2(500);
   TYPE ty_tb_node_data_new IS TABLE OF ty_node_rec INDEX BY PLS_INTEGER;
   --FCUBS 11.0.IS.1/10.0.IS.4.0     Retro Changes Start

   TYPE Ty_Addl_Info IS RECORD(
      Remarks VARCHAR2(4000));

   TYPE Ty_3dchr_Tbl IS TABLE OF Ty_Tb_Record_Data INDEX BY VARCHAR2(100);

   p_View CONSTANT VARCHAR2(10) := 'VIEW';
   p_New CONSTANT VARCHAR2(10) := 'NEW';
   p_Modify CONSTANT VARCHAR2(10) := 'MODIFY';
   p_Amend CONSTANT VARCHAR2(10) := 'AMEND';
   p_Close CONSTANT VARCHAR2(10) := 'CLOSE';
   p_Reopen CONSTANT VARCHAR2(10) := 'REOPEN';
   p_Delete CONSTANT VARCHAR2(10) := 'DELETE';
   p_Auth CONSTANT VARCHAR2(10) := 'AUTH';
   p_Reverse CONSTANT VARCHAR2(10) := 'REVERSE';
   p_Copy CONSTANT VARCHAR2(10) := 'COPY';
   p_Custm CONSTANT VARCHAR2(10) := 'CUSTM';
   p_Custom CONSTANT VARCHAR2(10) := 'CUSTOM';
   p_Default CONSTANT VARCHAR2(10) := 'DEFAULT';
   p_Pickup CONSTANT VARCHAR2(10) := 'PICKUP';
   p_Query CONSTANT VARCHAR2(20) := 'EXECUTEQUERY';
   p_Authquery CONSTANT VARCHAR2(20) := 'AUTHQUERY';
   p_Udfpickup CONSTANT VARCHAR2(20) := 'UDFPICKUP';
   p_Udfnode CONSTANT VARCHAR2(20) := 'UDFDETAILS';
   p_Mispickup CONSTANT VARCHAR2(20) := 'MISPICKUP';
   p_Udfforamt CONSTANT VARCHAR2(20) := '1';
   g_Date_Time_Format CONSTANT VARCHAR2(25) := 'RRRR-MM-DD HH24:MI:SS';
   g_Date_Format CONSTANT VARCHAR2(25) := 'RRRR-MM-DD';
   g_Ws_Date_Time_Format CONSTANT VARCHAR2(25) := 'RRRR-MM-DD HH24:MI:SS';
   g_Ws_Date_Format CONSTANT VARCHAR2(25) := 'RRRR-MM-DD';
   g_Date_Format_Len NUMBER(2) := 8;
   g_Source VARCHAR2(200);

   FUNCTION Fn_Process_Msg(p_Is_In_Msg_Clob  IN VARCHAR2
                          ,p_In_Msg_Str      IN VARCHAR2
                          ,p_In_Msg_Clob     IN CLOB
                          ,p_Rec_Msg_Header  IN Gwpks_Service_Router.Ty_Biz_Process_Header
                          ,p_Is_Out_Msg_Clob OUT VARCHAR2
                          ,p_Out_Msg_Str     OUT VARCHAR2
                          ,p_Out_Msg_Clob    OUT CLOB
                          ,p_Instr_Rec       IN OUT Gwpks_Service_Router.Ty_Processing_Instructions
                          ,p_Err_Code        IN OUT VARCHAR2
                          ,p_Err_Param       IN OUT VARCHAR2) RETURN BOOLEAN;

END Stpks_Fcmaint_Service;
/
CREATE OR REPLACE SYNONYM STPKSS_FCMAINT_SERVICE  FOR STPKS_FCMAINT_SERVICE
/
