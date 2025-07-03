CREATE OR REPLACE PACKAGE Cspks_Fld_Changes IS
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
----------------------------------------------------------------------------------------------
   CHANGE HISTORY
   
   SFR No                   :Revamped Version
   Changed By             :Radha
   Change Description  :Code Cleaned Up
   -------------------------------------------------------------------------------------------------------------*/
   TYPE Ty_Node_Values IS TABLE OF VARCHAR2(32767) INDEX BY VARCHAR2(32767);
   TYPE Ty_Action_Tbl IS TABLE OF VARCHAR2(32767) INDEX BY VARCHAR2(4000);
   g_Pkey_Rec   Ty_Node_Values;
   g_Action_Rec Ty_Action_Tbl;
   g_Delta_Tbl  Ty_Action_Tbl;

   FUNCTION Fn_Compare_Msgs(p_Function_Id IN VARCHAR2
                           ,p_Prev_Msg    IN CLOB
                           ,p_Curr_Msg    IN CLOB
                           ,p_Final_Msg   OUT CLOB
                           ,p_Err_Code    IN OUT VARCHAR2
                           ,p_Err_Params  IN OUT VARCHAR2) RETURN BOOLEAN;

END Cspks_Fld_Changes;
/
Create Or Replace Synonym Cspkss_Fld_Changes for Cspks_Fld_Changes
/