CREATE OR REPLACE PACKAGE Cspks_Wrapper AS
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
   Change Description :New Wrapper Package
   -------------------------------------------------------------------------------------------------------
   */

   g_Source           Cotms_Source.Source_Code%TYPE;
   g_Function_Id      Smtbs_Menu.Function_Id%TYPE;
   g_Source_Operation VARCHAR2(100);
   g_Action_Code      VARCHAR2(50);
   g_Multi_Trip_Id    VARCHAR2(50);
   g_Tb_Xml_Data      Cspks_Service.Ty_Tb_Xml_Data;
   g_Addl_Info        Cspks_Service.Ty_Addl_Info;
   g_Status           VARCHAR2(20);
   g_Err_Code         VARCHAR2(32767);
   g_Err_Params       VARCHAR2(32767);
   g_Return           BOOLEAN := TRUE;
   g_Exchange_Pattern VARCHAR2(4);

   FUNCTION Fn_Process_Msg(p_Source           IN Cotms_Source.Source_Code%TYPE
                          ,p_Function_Id      IN Smtbs_Menu.Function_Id%TYPE
                          ,p_Source_Operation IN VARCHAR2
                          ,p_Action_Code      IN VARCHAR2
                          ,p_Exchange_Pattern IN VARCHAR2
                          ,p_Multi_Trip_Id    IN OUT VARCHAR2
                          ,p_Addl_Info        IN OUT Cspks_Service.Ty_Addl_Info
                          ,p_Status           IN OUT VARCHAR2
                          ,p_Err_Code         IN OUT VARCHAR2
                          ,p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

END Cspks_Wrapper;
/
CREATE OR REPLACE SYNONYM Cspkss_Wrapper FOR Cspks_Wrapper
/