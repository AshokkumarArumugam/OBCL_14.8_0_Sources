CREATE OR REPLACE PACKAGE ispks_bic_upload_new_cluster AS

  /*-----------------------------------------------------------------------------------
  ** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
  ** Copyright © 2014  -  2014  Oracle and/or its affiliates.  All rights reserved.
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
  ------------------------------------------------------------------------------------------*/
  /*--------------------------------------------------------------------------------------
  Change History
  
Created By         : Saisudha Rathinavelu
Created On         : 29-Sep-2016
Creation Reason    : Retro for hook change bug id 24431267.
Search String      : 12.2_RETRO_Bug#24526492

Modified By        : Saisudha Rathinavelu
Modified On        : 29-Sep-2016
Modified Reason    : Retro for hook change bug id 24495153.
Search String      : 12.2_RETRO_Bug#24526496

   Modified By          : Nidhi Verma
   Modified On          : 19-Dec-2016
   Modified Description : Hooks request for package ispks_bic_upload_new
   Search String        : Bug#25266870  
    --------------------------------------------------------------------------------------*/
  
	FUNCTION fn_upload_file(P_source_code  IN  VARCHAR2
                             ,P_file_name    IN  VARCHAR2
                             ,P_file_path     IN  VARCHAR2
                             ,P_file_type    IN  VARCHAR2
                             ,p_file_ext     IN  VARCHAR2							 
							 ,p_ref_no       IN  VARCHAR2							 
							 ,p_fn_call_id          IN OUT NUMBER
                             ,p_tb_cluster_data      IN OUT GLOBAL.ty_tb_cluster_data
                             ,P_err_code  IN OUT VARCHAR2
							 ,P_err_param                 IN OUT VARCHAR2)
    RETURN BOOLEAN;
	--12.2_RETRO_Bug#24526496 Changes starts here
	FUNCTION fn_sepa_bic_dir(  P_SOURCE_CODE IN  VARCHAR2
                              ,P_FILE_NAME	 IN  VARCHAR2
                              ,P_FILE_PATH	 IN  VARCHAR2
                              ,P_ERR_CODE	IN OUT VARCHAR2
                              ,P_ERR_PARAM	IN OUT VARCHAR2
                              ,P_FN_CALL_ID	IN OUT NUMBER
                              ,P_TB_CLUSTER_DATA	IN OUT GLOBAL.ty_tb_cluster_data)
                              
	RETURN BOOLEAN;
    --12.2_RETRO_Bug#24526496 Changes ends here
	
--Bug#25266870 starts 
  FUNCTION Fn_process(P_source_code  IN  VARCHAR2,
                        p_file_name    IN  VARCHAR2,
                        P_file_path    IN  VARCHAR2,
                        p_ref_no       IN  VARCHAR2,
                        p_err_code  IN OUT VARCHAR2,
                        p_err_param IN OUT VARCHAR2,
						p_fn_call_id          IN OUT NUMBER,
                        p_tb_cluster_data     IN OUT GLOBAL.ty_tb_cluster_data)
    RETURN BOOLEAN;
--Bug#25266870 ends	 	 
END ispks_bic_upload_new_cluster;
/
CREATE OR REPLACE SYNONYM ispkss_bic_upload_new_cluster FOR ispks_bic_upload_new_cluster
/