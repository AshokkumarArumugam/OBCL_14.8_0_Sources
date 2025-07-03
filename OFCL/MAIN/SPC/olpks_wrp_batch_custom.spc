create or replace package olpks_wrp_batch_custom as
   /*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2007 - 2018  Oracle and/or its affiliates.  All rights reserved.
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
	-- Created by     : Gomathi G
	-- Created        : 19-SEP-2019
	-- Purpose        : Extensible hooks for EOC Bug 29583869 
    -- Search String  : OBCL_14.3_BUG#29583869  
   -------------------------------------------------------------------------------------------------------
   */
--OBCL_14.3_BUG#29583869 STARTS
 FUNCTION fn_run_batch(p_branch VARCHAR2
 ,p_user VARCHAR2
                         ,p_stage      VARCHAR2
                         ,p_batch      VARCHAR2
                         ,p_err_code   IN OUT VARCHAR2
                         ,p_err_params IN OUT VARCHAR2) 
						 RETURN BOOLEAN;
  --OBCL_14.3_BUG#29583869 ENDS
end;
/
CREATE or REPLACE SYNONYM olpkss_wrp_batch_custom for olpks_wrp_batch_custom
/