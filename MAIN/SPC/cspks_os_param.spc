CREATE OR REPLACE PACKAGE cspks_os_param 
AS
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

** Change History
** ---------------------
**
** Modified By           : Pankaj
** Modified On           : 14-Apr-2015
** Modified Reason   : Performance Tuning : Introduced the function with 'Result Cache'  inorder to reduce the number of executions
** Search String         : 9NT1532 : Performance Tuning With FRC
**
------------------------------------------------------------------------------------------
*/
      FUNCTION get_param_val
                   (
                   pname VARCHAR2
                   ) 
RETURN VARCHAR2 result_cache ;
--9NT1532 : Performance Tuning With FRC Added result_cache and commented the pragma restriction
--PRAGMA RESTRICT_REFERENCES(get_param_val, wnds, wnps);
/* commented the pragma restriction as result_cache is introduced , it disconnets the connection once the function is called  
   */
      --PEG_PSR Changes Begin
--9NT1532 : Performance Tuning With FRC starts 
FUNCTION fn_get_param_val_wrp (pname IN VARCHAR2,
          pvalue IN OUT cstb_param.param_val%TYPE,
          p_err_code in out VARCHAR2 ,
          p_err_param in out varchar2)
RETURN BOOLEAN;      
--9NT1532 : Performance Tuning With FRC ends
      --PEG_PSR Changes End
      
END cspks_os_param;
/
drop synonym cspkss_os_param
/
CREATE synonym cspkss_os_param for cspks_os_param
/
