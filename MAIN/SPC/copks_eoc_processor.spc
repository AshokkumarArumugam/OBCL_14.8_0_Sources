CREATE OR REPLACE PACKAGE copks_Eoc_Processor AS
   /*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright ? 2007 - 2011  Oracle and/or its affiliates.  All rights reserved.
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
---------------------------------------------------------------------------------------------------
   CHANGE HISTORY

    ** Modified By          : Vinutha Kini
         ** Modified On          : 17-Oct-2016
         ** Modified Reason      : added Fn_dropeoti
         ** Search String        : SFR 24832288

    ** Modified By          : Rakesh n
         ** Modified On          : 21-Oct-2016
         ** Modified Reason      : added Fn_dropeoti
         ** Search String        : SFR 24918469_12.3_standalone_changes_for_elcm

   -------------------------------------------------------------------------------------------------------
   */

--SFR 24918469_12.3_standalone_changes_for_elcm starts
       FUNCTION fn_generate_runsheet(branch     IN VARCHAR2,
                                    eoc_group  IN VARCHAR2,
                                    app_date   IN DATE,
                                    retmsgcode OUT VARCHAR2) RETURN BOOLEAN;
--SFR 24918469_12.3_standalone_changes_for_elcm ends
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



   FUNCTION Fn_Markeopd(p_Branch     IN VARCHAR2
                       ,p_Err_Code   IN OUT VARCHAR2
                       ,p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;


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
    --SFR 24832288 added new function for fn_dropeoti

     FUNCTION Fn_dropeoti(p_Branch     IN VARCHAR2
                     ,p_Err_Code   IN OUT VARCHAR2
                     ,p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;
--SFR 24832288 added new function for fn_dropeoti
END copks_Eoc_Processor;
/