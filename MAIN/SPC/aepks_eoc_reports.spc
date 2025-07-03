CREATE OR REPLACE PACKAGE Aepks_Eoc_Reports AS
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
   Change History

              Date                         : 12/05/2011
              Updated By                   : Jayanth
              Release                      : FCUBS11.3
              Bug Number                   : 12428816
              Change Description           : Added spec to pr_log_report.
              Search Tag                   : Bug Fix 12428816
   ----------------------------------------------------------------------------------------------------------
   */



   Ts_Name   VARCHAR2(32767);
   Ts_Value  VARCHAR2(32767);
   Data_Type VARCHAR2(32767);
   --march 08/gouri commented start

   PROCEDURE Pr_Get_Report_Params(p_Branch   IN VARCHAR2
                                 ,p_Eocrefno IN VARCHAR2
                                 ,p_Stage    IN VARCHAR2
                                 ,p_Batch    IN VARCHAR2
                                 ,p_Reportid IN VARCHAR2
                                 ,p_Bip_Data OUT VARCHAR2
                                 ,p_Status   IN OUT VARCHAR2);

   PROCEDURE Pr_Update_Batch_Status(p_Branch     IN VARCHAR2
                                   ,p_Stage      IN VARCHAR2
                                   ,p_Batch      IN VARCHAR2
                                   ,p_Status     IN VARCHAR2
                                   ,p_Err_Code   IN VARCHAR2
                                   ,p_Err_Params IN VARCHAR2);

   --Bug Fix 12428816 (begin)

   PROCEDURE pr_resume_eoc(p_eoc_ref_no IN VARCHAR2);

   PROCEDURE pr_log_report(p_eoc_ref      IN VARCHAR2,
                          p_branch       IN VARCHAR2,
                          p_eoc_date     IN VARCHAR2,
                          p_stage        IN VARCHAR2,
                          p_batch        IN VARCHAR2,
                          p_report_id    IN VARCHAR2,
                          p_status       IN VARCHAR2,
                          p_report_error IN VARCHAR2,
                          p_err_code     IN VARCHAR2,
                          p_err_params   IN VARCHAR2);

                             --Bug Fix 12428816 (end)

   FUNCTION Fn_Getparm_Value(p_Paramvalue IN VARCHAR2
                            ,p_Parmtype   IN VARCHAR2
							,p_Reportid   IN VARCHAR2 --NLS_Header_Support
                            ,p_Branch     IN VARCHAR2
                            ,p_Error      IN OUT VARCHAR2) RETURN VARCHAR2 ;

END Aepks_Eoc_Reports;
/
CREATE OR REPLACE SYNONYM Aepkss_Eoc_Reports FOR Aepks_Eoc_Reports
/