CREATE OR REPLACE PACKAGE  smpks_smdpifrt_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : smpks_smdpifrt_utils.spc
  **
  ** Module     : Security Management System
  ** 
  ** This source is part of the Oracle FLEXCUBE Software Product.
  ** Copyright (R) 2008,2018 , Oracle and/or its affiliates.  All rights reserved
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
  -------------------------------------------------------------------------------------------------------
  CHANGE HISTORY
  
    -- Author  		  : Nalandhan G
    -- Created  On	  : 20-Mar-18 
	-- Created Reason : Forget Customer Changes
  
  -------------------------------------------------------------------------------------------------------
  */
  
  FUNCTION Fn_batch_dynamic(p_error_code  IN OUT VARCHAR2,
                            p_error_param IN OUT VARCHAR2)
  RETURN BOOLEAN;
  
END smpks_smdpifrt_utils;
/
CREATE OR REPLACE SYNONYM smpkss_smdpifrt_utils FOR smpks_smdpifrt_utils
/