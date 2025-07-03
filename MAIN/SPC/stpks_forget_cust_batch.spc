CREATE OR REPLACE PACKAGE stpks_forget_cust_batch IS
  /*------------------------------------------------------------------------------------------
** ThIS source IS part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright Â© 2011 - 2014  Oracle AND/or its affiliates.  All rights reserved.
**
** No part of thIS work may be reproduced, stored in a retrieval system,
** adopted or transmitted in any FORm or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwISe,
** translated in any language or computer language,
** without the prior written permISsion of Oracle AND/or its affiliates.
**
**
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India.
------------------------------------------------------------------------------------------
*/
/*
*  Oracle Financial Services Software Limited.
  **
  
    -- Author  		  : Nalandhan G
    -- Created  On	  : 20-Mar-18 
	-- Created Reason : Forget Customer Changes

  **************************************************************************************************/

  FUNCTION Fn_run(p_forget_cus_process_id sttms_cust_forget_detail.forget_cus_process_id%TYPE,
                  p_error_code  IN OUT VARCHAR2,
                  p_error_param IN OUT VARCHAR2 ) RETURN BOOLEAN;

  FUNCTION Fn_batch(p_stdcsfrt IN OUT  stpks_stdcsfrt_Main.Ty_stdcsfrt,
                    p_error_code  IN OUT VARCHAR2,
                    p_error_param IN OUT VARCHAR2)
  RETURN BOOLEAN ;

END stpks_forget_cust_batch;
/
CREATE OR REPLACE SYNONYM stpkss_forget_cust_batch FOR stpks_forget_cust_batch
/