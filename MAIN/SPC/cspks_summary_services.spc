CREATE OR REPLACE PACKAGE Cspks_Summary_Services IS
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
   -------------------------------------------------------------------------------------------------------
   CHANGE HISTORY
   
   SFR No             :Initial Version
   Changed By         :Mohammed Shihab
   Change Description :New Package for Summary Web Services
   
   -------------------------------------------------------------------------------------------------------
   */
   TYPE Ty_Sum_Filter_Fields IS TABLE OF VARCHAR2(32767) INDEX BY VARCHAR2(32767);
   TYPE Ty_Result_Fields IS TABLE OF VARCHAR2(32767) INDEX BY VARCHAR2(32767);
   TYPE Ty_Summary_Details IS TABLE OF Ty_Result_Fields INDEX BY PLS_INTEGER;
   TYPE Ty_Summary_Result IS RECORD(
      v_Total_Records   NUMBER,
      v_Total_Pages     NUMBER,
      v_Curr_Page       NUMBER,
      v_Summary_Details Ty_Summary_Details);
   TYPE Ty_Summary_Query IS RECORD(
      v_Fetch_Page      NUMBER,
      v_Fetch_Size      NUMBER,
      v_Order_By_Fields VARCHAR2(4000),
      v_Order_By_Types  VARCHAR2(4000),
      v_Filter_Fields   Ty_Sum_Filter_Fields,
      v_Summary_Result  Ty_Summary_Result);

   FUNCTION Fn_Process_Request(p_Source      IN VARCHAR2
                              ,p_Function_Id IN VARCHAR2
                              ,p_Status      IN OUT VARCHAR2
                              ,p_Err_Code    IN OUT VARCHAR2
                              ,p_Err_Params  IN OUT VARCHAR2) RETURN BOOLEAN;

END Cspks_Summary_Services;
/
CREATE OR REPLACE SYNONYM Cspkss_Summary_Services FOR Cspks_Summary_Services
/
