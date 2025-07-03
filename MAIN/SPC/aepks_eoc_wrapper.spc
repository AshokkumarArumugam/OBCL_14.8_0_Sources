CREATE OR REPLACE PACKAGE Aepks_Eoc_Wrapper AS
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

      ** Modified By          : Mani Megalai S
   ** Modified On          : 17-Oct-2012
   ** Modified Reason      : Introduced New Stage EOPD ( End of Previous Day) to defer some of the processes on POST BOD to improve performance.
   ** Search String        : 9NT1532 : POC Deferred EOD
   -------------------------------------------------------------------------------------------------------
   */
   FUNCTION Fn_Markeoti(p_Branch     IN VARCHAR2
                       ,p_Err_Code   IN OUT VARCHAR2
                       ,p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;

   FUNCTION Fn_Markeofi(p_Branch     IN VARCHAR2
                       ,p_Err_Code   IN OUT VARCHAR2
                       ,p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;

   FUNCTION Fn_Markeod(p_Branch     IN VARCHAR2
                      ,p_Err_Code   IN OUT VARCHAR2
                      ,p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;

   FUNCTION Fn_Markbod(p_Branch     IN VARCHAR2
                      ,p_Err_Code   IN OUT VARCHAR2
                      ,p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;

   FUNCTION Fn_Markti(p_Branch     IN VARCHAR2
                     ,p_Err_Code   IN OUT VARCHAR2
                     ,p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;

   --9NT1532 : POC Deferred EOD Starts >>>>
   FUNCTION Fn_Markeopd(p_Branch     IN VARCHAR2
                     ,p_Err_Code   IN OUT VARCHAR2
                     ,p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;
   --9NT1532 : POC Deferred EOD Ends <<<<
   
   FUNCTION Fn_Marktimelvl9(p_Branch     IN VARCHAR2
                           ,p_Err_Code   IN OUT VARCHAR2
                           ,p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;
   FUNCTION Fn_Marktimelvl0(p_Branch     IN VARCHAR2
                           ,p_Err_Code   IN OUT VARCHAR2
                           ,p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;

   FUNCTION Fn_Run_Batch(p_Branch     VARCHAR2
                        ,p_Stage      VARCHAR2
                        ,p_Batch      VARCHAR2
                        ,p_Status     IN OUT VARCHAR2
                        ,p_Err_Code   IN OUT VARCHAR2
                        ,p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;
END Aepks_Eoc_Wrapper;
/
CREATE OR REPLACE SYNONYM Aepkss_Eoc_Wrapper FOR Aepks_Eoc_Wrapper
/