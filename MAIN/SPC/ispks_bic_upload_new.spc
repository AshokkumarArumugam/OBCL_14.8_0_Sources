CREATE OR REPLACE PACKAGE Ispks_bic_upload_new AS
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
  dified By         : Yogesh Sharma
  **      Modified On         : 19-Jun-2013
  **      Modified Reason     : SWIFT 13 Changes
  **      Search String       : SWIFT 13 Changes

     Changed By             : Swathi Vishwanath
     Changed On             : 16-Jun-2014
     Change Description     : FCUBS_12.0.3_SWIFT2014_DEV SEPA Plus File changes for bug 19304708
     Search String          : FCUBS_12.0.3_SWIFT2014_DEV SEPA_Plus_File changes

  **      Modified By         : Anil Murahari
  **      Modified On         : 18-JULY-2014
  **      Modified Reason     : Adding ref no parameter to be passed along with FN_PROCESS
  **      Search String       : [SITECODE: 12.0.3,INTERNAL, BugDB ID:19414179]_19412480
  **
  **    Modified By            : Anwesha Bhaduri
  **    Modified On            : 20-May-2015
  **    Modified Reason        : 12.1 Trigger Tuning Changes removed the trigger
  **    Search String          : 12.1_Performance_changes
	**
	** Changed by 	 : Vinutha Kini
	** Changed on 	 : 26-July-2016
	** Description	 : Core clean up for 12.3Payments
	** Search String : Standalone12.3 CleanUp  					 

  **  
  **  Modified By          : Poornachandran R
  **  Modified On          : 12-Feb-2019
  **  Modified Reason      : Bicplus 2018 Holiday and Holiday Services upload
  **  Search String        : BICPLUS2018_DEV_CCH_14.3
  ----------------------------------------------------------------------------------------------------*/
  --new unit created by sushant :9nt832 :swift gold changes

  g_source_code     VARCHAR2(20) := NULL; -- SWIFT 13 Changes
  g_sepabic_gi_call VARCHAR2(1); --FCUBS_12.0.3_SWIFT2014_DEV SEPA_Plus_File changes

  --Standalone12.3 CleanUp Starts
  FUNCTION isobic(inpval IN VARCHAR2)
  RETURN BOOLEAN;
  --Standalone12.3 CleanUp Ends
  FUNCTION fn_process(P_source_code IN VARCHAR2,
                      p_file_name   IN VARCHAR2,
                      P_file_path   IN VARCHAR2
                      --[SITECODE: 12.0.3,INTERNAL, BugDB ID:19414179]_19412480 changes start
                     ,
                      p_ref_no IN VARCHAR2
                      --[SITECODE: 12.0.3,INTERNAL, BugDB ID:19414179]_19412480 changes end
                     ,
                      p_err_code  IN OUT VARCHAR2,
                      p_err_param IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_process_records(p_activation_date IN DATE,
                              p_err_code        IN OUT VARCHAR2,
                              p_err_param       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  --Standalone12.3 CleanUp Start
  --12.1_performance_changes start
  /*FUNCTION fn_check_bic_usage(p_Bic_Code  IN istms_bic_directory.bic_code%TYPE,
                              p_Err_Code  IN OUT VARCHAR2,
                              p_Err_Param IN OUT varchar2) RETURN BOOLEAN;*/
  --12.1_performance_changes end  

  PROCEDURE pr_ins_bic
			(
			p_bic_code 	IN 		VARCHAR2,
			p_once_auth IN 		VARCHAR2,
  		 	p_err_code 	IN OUT 	VARCHAR2,
		  	p_err_param IN OUT 	VARCHAR2
			);
  --Standalone12.3 CleanUp End			
--BICPLUS2018_DEV_CCH_14.3 Starts
FUNCTION fn_holiday_string_gen(p_year IN NUMBER
                               ,p_month IN NUMBER
                               ,p_holidays IN VARCHAR2
                               ,p_refine_string IN OUT VARCHAR2
                               ,p_err_code IN OUT VARCHAR2
                              )
RETURN BOOLEAN;
--BICPLUS2018_DEV_CCH_14.3 Ends
END Ispks_bic_upload_new;
/
CREATE OR REPLACE SYNONYM ispkss_bic_upload_new FOR ispks_bic_upload_new
/