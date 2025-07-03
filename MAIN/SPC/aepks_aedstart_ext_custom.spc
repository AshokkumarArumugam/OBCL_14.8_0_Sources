create or replace package aepks_aedstart_ext_custom As
  /*-----------------------------------------------------------------------------------
  **
  ** File Name    :  aepks_aedstart_ext_custom.Spc
  **
  ** Module       : AE
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
  CHANGE HISTORY

  SFR Number         :
  Changed By         :
  Change Description :
  **
  Changed By         : Vinutha Kini
  Changed On		 : 27-Sep-2016
  Change Description : Retro from 12.2Supp to 12.3Core
  Search String		 : FCUBS_Retro_12.2Supp__12.3Core

Modified By        : Saisudha Rathinavelu
Modified On        : 23-Jan-2017
Modified Reason    : Retro for hook change bug id 23219523.
Search String      : 12.3_RETRO_Bug#25398904  

 -------------------------------------------------------------------------------------------------------
 */
     FUNCTION fn_run_premark_stage(p_branch     IN VARCHAR2,
                             p_stage      VARCHAR2,
                             p_status     IN OUT VARCHAR2,
                             p_err_code   IN OUT VARCHAR2,
                             p_err_params IN OUT VARCHAR2) RETURN BOOLEAN ;
   
	
	 --FCUBS_Retro_12.2Supp__12.3Core starts
	 FUNCTION fn_run_post_stage(p_branch     IN VARCHAR2,
                             p_stage      VARCHAR2,
                             p_status     IN OUT VARCHAR2,
                             p_err_code   IN OUT VARCHAR2,
                             p_err_params IN OUT VARCHAR2) RETURN BOOLEAN;
     --FCUBS_Retro_12.2Supp__12.3Core ends
--12.3_RETRO_Bug#25398904 Changes starts here
FUNCTION Fn_Pre_Run_Post_Stage( p_branch     IN VARCHAR2,
								  p_stage      IN VARCHAR2,
								  p_status     IN OUT VARCHAR2,
								  p_err_code   IN OUT VARCHAR2,
								  p_err_params IN OUT VARCHAR2)RETURN BOOLEAN;
								  
FUNCTION Fn_Post_Run_Post_Stage(  p_branch     IN VARCHAR2,
									p_stage      IN VARCHAR2,
									p_status     IN OUT VARCHAR2,
									p_err_code   IN OUT VARCHAR2,
									p_err_params IN OUT VARCHAR2)RETURN BOOLEAN;
--12.3_RETRO_Bug#25398904 Changes ends here

END aepks_aedstart_ext_custom;
/
CREATE OR REPLACE SYNONYM aepkss_aedstart_ext_custom for aepks_aedstart_ext_custom
/