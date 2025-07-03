CREATE OR REPLACE PACKAGE Stpks_Fidpkg_Wrapper AS
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
---------------------------------------------------------------------------------------------------
   CHANGE HISTORY
   SFR No             :
   Changed By         :
   Change Description :
   
   -------------------------------------------------------------------------------------------------------
   */

   g_Source           Cotms_Source.Source_Code%TYPE;
   g_Function_Id      Smtbs_Menu.Function_Id%TYPE;
   g_Source_Operation VARCHAR2(100);
   g_Action_Code      VARCHAR2(50);
   g_Multi_Trip_Id    VARCHAR2(50);
   g_Tb_Xml_Data      Stpks_Fcmaint_Service.Ty_Tb_Xml_Data;
   g_Addl_Info        Stpks_Fcmaint_Service.Ty_Addl_Info;
   g_Status           VARCHAR2(20);
   g_Err_Code         VARCHAR2(32767);
   g_Err_Params       VARCHAR2(32767);
   g_Return           BOOLEAN := TRUE;
   g_Exchange_Pattern VARCHAR2(4);
   g_Parents_List     CLOB;
   g_Parents_Format   CLOB;
   g_Tag_Names        CLOB;
   g_Tag_Values       CLOB;

   FUNCTION Fn_Process_Msg(p_Source           IN Cotms_Source.Source_Code%TYPE
                          ,p_Function_Id      IN Smtbs_Menu.Function_Id%TYPE
                          ,p_Source_Operation IN VARCHAR2
                          ,p_Action_Code      IN VARCHAR2
                          ,p_Multi_Trip_Id    IN OUT VARCHAR2
                          ,p_Tb_Xml_Data      IN OUT Stpks_Fcmaint_Service.Ty_Tb_Xml_Data
                          ,p_Addl_Info        IN OUT Stpks_Fcmaint_Service.Ty_Addl_Info
                          ,p_Status           IN OUT VARCHAR2
                          ,p_Err_Code         IN OUT VARCHAR2
                          ,p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

   FUNCTION Fn_Process_Msg(p_Source           IN Cotms_Source.Source_Code%TYPE
                          ,p_Function_Id      IN Smtbs_Menu.Function_Id%TYPE
                          ,p_Source_Operation IN VARCHAR2
                          ,p_Action_Code      IN VARCHAR2
                          ,p_Exchange_Pattern IN VARCHAR2
                          ,p_Multi_Trip_Id    IN OUT VARCHAR2
                          ,p_Parents_List     IN OUT NOCOPY CLOB
                          ,p_Parents_Format   IN OUT NOCOPY CLOB
                          ,p_Tag_Names        IN OUT NOCOPY CLOB
                          ,p_Tag_Values       IN OUT NOCOPY CLOB
                          ,p_Addl_Info        IN OUT Stpks_Fcmaint_Service.Ty_Addl_Info
                          ,p_Status           IN OUT VARCHAR2
                          ,p_Err_Code         IN OUT VARCHAR2
                          ,p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

END Stpks_Fidpkg_Wrapper;
/
CREATE OR REPLACE SYNONYM Stpkss_Fidpkg_Wrapper FOR Stpks_Fidpkg_Wrapper
/
