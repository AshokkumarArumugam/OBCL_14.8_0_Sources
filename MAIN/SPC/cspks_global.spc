CREATE OR REPLACE PACKAGE Cspks_Global AS
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
---------------------------------------------------------------------------------------------------
   CHANGE HISTORY
   SFR No             :Initial Version
   Changed By         :Radha
   Change Description :New Package for Performance Changes
   
   Changed By         : SHEEBA 
   Change Description : CL and LC Product query is not happening in Detailed screen
                         Code change in proc pr_split_ts_lists
   Search String      : FC10_IMPSUPP/AMICORP/2-1
   -------------------------------------------------------------------------------------------------------
*/

   TYPE Ty_Vc_Array IS TABLE OF VARCHAR2(32767) INDEX BY PLS_INTEGER;
   TYPE Ty_Tb_Record_Data IS TABLE OF VARCHAR2(32767) INDEX BY VARCHAR2(255);
   --Types For FLEXCUBE Node Information
   TYPE Ty_Node_Rec IS RECORD(
      Node_Level    NUMBER(4),
      Node_Name     VARCHAR2(100),
      Node_Parent   VARCHAR2(100),
      Node_Relation VARCHAR2(32767),
      Node_Fields   VARCHAR2(32767),
      Node_Tags     VARCHAR2(32767),
      Query_Node    VARCHAR2(1),
      Node_Idx      NUMBER,
      Has_Childs    VARCHAR2(1),
      Child_List    VARCHAR2(4000));

   TYPE Ty_Tb_Chr_Node_Data IS TABLE OF Ty_Node_Rec INDEX BY VARCHAR2(500);
   g_Tb_Chr_Node_Data Ty_Tb_Chr_Node_Data;
   g_Header           Ty_Tb_Record_Data;

   --Message CLOBS
   g_Req CLOB;
   g_Res CLOB;

   g_Fld_Tag CLOB;

   --Parsed CLOBS
   g_Parents_List   CLOB;
   g_Parents_Format CLOB;
   g_Tag_Names      CLOB;
   g_Tag_Values     CLOB;

   --VARCAHR2 Holders in case Parsing Results so
   g_v_Parents_List   VARCHAR2(32767);
   g_v_Parents_Format VARCHAR2(32767);
   g_v_Tag_Names      VARCHAR2(32767);
   g_v_Tag_Values     VARCHAR2(32767);

   --Parsed CLOBS Converted to VARCAHR2 Variables
   g_Va_Parents_List   Ty_Vc_Array;
   g_Va_Parents_Format Ty_Vc_Array;
   g_Va_Tag_Names      Ty_Vc_Array;
   g_Va_Tag_Values     Ty_Vc_Array;

   --VARCHAR2 Variables for Record Level
   g_Node    VARCHAR2(100);
   g_Format  VARCHAR2(100);
   g_Level   PLS_INTEGER := 0;
   g_Vr_Tags VARCHAR2(32767);
   g_Vr_Vals VARCHAR2(32767);
   g_Tag     VARCHAR2(100);
   g_Val     VARCHAR2(32767);

   --CLOB Variables for Record Level
   g_Cr_Tags VARCHAR2(32767);
   g_Cr_Vals VARCHAR2(32767);

   --Record Level CLOBS Converted to VARCAHR2 arays for record level
   g_Vra_Tags Ty_Vc_Array;
   g_Vra_Vals Ty_Vc_Array;

   --Counter Positions
   g_p_Pos PLS_INTEGER := 0;
   g_t_Pos PLS_INTEGER := 0;

   --Indicators at mesasge Level
   g_Mp_Clob BOOLEAN := FALSE;
   g_Mf_Clob BOOLEAN := FALSE;
   g_Mt_Clob BOOLEAN := FALSE;
   g_Mv_Clob BOOLEAN := FALSE;

   --Indicators at Record Level
   g_Rt_Clob BOOLEAN := FALSE;
   g_Rv_Clob BOOLEAN := FALSE;

   --Length tracking of Parsed Parameters
   g_Parents_Len PLS_INTEGER := 0;
   g_Formats_Len PLS_INTEGER := 0;
   g_Tags_Len    PLS_INTEGER := 0;
   g_Vals_Len    PLS_INTEGER := 0;

   --CONSTANTS
   --   g_Max_Vc CONSTANT NUMBER := 10922;  --FC10_IMPSUPP/AMICORP/2-1
   g_Max_Vc CONSTANT NUMBER := 8000;  --FC10_IMPSUPP/AMICORP/2-1
   g_Ofs CONSTANT PLS_INTEGER := 122;

   --VARCHAR2 Array Counters
   g_Mp_Cntr PLS_INTEGER := 0;
   g_Mf_Cntr PLS_INTEGER := 0;
   g_Mt_Cntr PLS_INTEGER := 0;
   g_Mv_Cntr PLS_INTEGER := 0;

   g_Rt_Cntr PLS_INTEGER := 0;
   g_Rv_Cntr PLS_INTEGER := 0;

   --VARCHAR2 Array Trackers
   g_Mp_Tracker PLS_INTEGER := 0;
   g_Mf_Tracker PLS_INTEGER := 0;
   g_Mt_Tracker PLS_INTEGER := 0;
   g_Mv_Tracker PLS_INTEGER := 0;

   g_Rt_Tracker PLS_INTEGER := 0;
   g_Rv_Tracker PLS_INTEGER := 0;

   g_Pos NUMBER;

   g_Rewind_By_One BOOLEAN := FALSE;

   PROCEDURE Pr_Reset;
   PROCEDURE Pr_Init;
   PROCEDURE Pr_Close;
   PROCEDURE Pr_Write(p_Type IN VARCHAR2
                     ,p_Text IN VARCHAR2);
   FUNCTION Fn_Getparam(p_Type IN VARCHAR2
                       ,p_Pos  IN NUMBER
                       ,p_Sep  IN VARCHAR2 DEFAULT '~') RETURN VARCHAR2;
   PROCEDURE Pr_Split_Ts_Lists;
   FUNCTION Fn_Gettag RETURN VARCHAR2;
   FUNCTION Fn_Gettags RETURN Ty_Vc_Array;
   FUNCTION Fn_Getval RETURN VARCHAR2;
   FUNCTION Fn_Getvals RETURN Ty_Vc_Array;
   FUNCTION Fn_Getnode RETURN VARCHAR2;
   FUNCTION Fn_Getcurrnode RETURN VARCHAR2;
   FUNCTION Fn_Getformat RETURN VARCHAR2;
   FUNCTION Fn_Getlvl RETURN NUMBER;

   PROCEDURE Pr_Rewind_By_One;

END Cspks_Global;
/
