CREATE OR REPLACE PACKAGE AEPKS_EOD_MARKEOPD IS
/*
----------------------------------------------------------------------------------------------------
**
** File Name : AEPKS_EOD_MARKEOPD.SPC
**
** Module : AE
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
**   
** CHANGE HISTORY:
** Created By           : Mani Megalai S 
** Modified On          : 17-Oct-2012
** Modified Reason      : Introduced New Stage EOPD ( End of Previous Day) to defer some of the processes on POST BOD to improve performance.
** Search String        : 9NT1532 : POC Deferred EOD
----------------------------------------------------------------------------------------------------
*/
FUNCTION fn_markeopd(pbranch    IN VARCHAR2,
      pprevious_dt   IN DATE,
      retmsgcode IN OUT VARCHAR2,
      retparams  IN OUT VARCHAR2) RETURN BOOLEAN ;
-----------------------------------------------------------------------------------------
FUNCTION fn_check_EOPD_status(p_aedstart IN OUT Aepks_Aedstart_Main.Ty_Aedstart,
              p_err_code IN OUT VARCHAR2 ,
              p_Err_Params IN OUT VARCHAR2 ) 
RETURN BOOLEAN; 
-----------------------------------------------------------------------------------------
FUNCTION fn_update_eopd_status(p_branch     IN VARCHAR2,
        p_err_code   IN OUT VARCHAR2,
        p_err_params IN OUT VARCHAR2)
RETURN BOOLEAN ; 
-----------------------------------------------------------------------------------------
END AEPKS_EOD_MARKEOPD;
/
Create or replace synonym AEPKSS_EOD_MARKEOPD for AEPKS_EOD_MARKEOPD
/