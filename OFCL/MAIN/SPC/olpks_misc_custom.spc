CREATE OR REPLACE PACKAGE olpks_misc_custom AS

  /*------------------------------------------------------------------------------------------
  ** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
  ** Copyright © 1997 - 2009  Oracle and/or its affiliates.  All rights reserved.
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
  
  ----------------------------CHANGES HISTORY----------------------------------
  
  **Created By         : Muthu malai.P
  **Created On         : 07-Jul-2020
  **Change Description : Hook added for the fn_isholiday and fn_getworkingday Function
  **Search String      : OBCL-14.3_SUPPORT_BUG#31539681
  *------------------------------------------------------------------------------------------*/
  --OBCL-14.3_SUPPORT_BUG#31539681 Starts
  FUNCTION fn_isholiday(p_HolidayCheck   IN CHAR,
                        p_CalendarKey    IN VARCHAR2,
                        p_TestDate       IN DATE,
                        p_Result         OUT VARCHAR2,
                        P_Errcode        OUT ERTBS_MSGS.ERR_CODE%TYPE,
                        p_fn_call_id     IN OUT NUMBER,
                        p_Tb_Custom_Data IN OUT GLOBAL.Ty_Tb_Custom_Data)
    RETURN BOOLEAN;

  FUNCTION fn_isholiday(p_HolidayCheck   IN CHAR,
                        p_CalendarKey    IN VARCHAR2,
                        p_CalendarKey1   IN VARCHAR2,
                        p_CalendarKey2   IN VARCHAR2,
                        p_CalendarKey3   IN VARCHAR2,
                        p_TestDate       IN DATE,
                        p_Result         OUT VARCHAR2,
                        P_Errcode        OUT ERTBS_MSGS.ERR_CODE%TYPE,
                        p_fn_call_id     IN OUT NUMBER,
                        p_Tb_Custom_Data IN OUT GLOBAL.Ty_Tb_Custom_Data)
    RETURN BOOLEAN;
	
FUNCTION fn_getworkingday(p_HolidayCheck   IN CHAR,
                          p_CalendarKey    IN VARCHAR2,
                          p_SrcDate        IN DATE,
                          p_NextPrev       IN VARCHAR2 DEFAULT 'N',
                          p_offset         IN NUMBER DEFAULT 1,
                          p_fn_call_id     IN OUT NUMBER,
                          p_Tb_Custom_Data IN OUT GLOBAL.Ty_Tb_Custom_Data)
    RETURN DATE;
	
FUNCTION fn_getworkingday(p_HolidayCheck   IN CHAR,
                          p_CalendarKey    IN VARCHAR2,
                          p_SrcDate        IN DATE,
                          p_NextPrev       IN VARCHAR2 DEFAULT 'N',
                          p_Offset         IN NUMBER DEFAULT 1,
                          p_LowerLimitDate IN DATE,
                          p_UpperLimitDate IN DATE,
                          p_PastLimit      OUT BOOLEAN,
                          p_fn_call_id     IN OUT NUMBER,
                          p_Tb_Custom_Data IN OUT GLOBAL.Ty_Tb_Custom_Data)
     RETURN DATE;

FUNCTION fn_getworkingday(p_HolidayCheck   IN CHAR,
                          p_CalendarKey    IN VARCHAR2,
                          p_SrcDate        IN DATE,
                          p_NextPrev       IN VARCHAR2 DEFAULT 'N',
                          p_Offset         IN NUMBER DEFAULT 1,
                          p_LowerLimitDate IN DATE,
                          p_UpperLimitDate IN DATE,
                          p_settle_day_ccy IN VARCHAR2,
                          p_contract_ccy   IN VARCHAR2,
                          p_local_ccy      IN VARCHAR2,
                          p_PastLimit      OUT BOOLEAN,
                          p_fn_call_id     IN OUT NUMBER,
                          p_Tb_Custom_Data IN OUT GLOBAL.Ty_Tb_Custom_Data)
   RETURN DATE;
  --OBCL-14.3_SUPPORT_BUG#31539681 Ends        
END olpks_misc_custom;
/
CREATE or replace SYNONYM olpkss_misc_custom FOR olpks_misc_custom
/