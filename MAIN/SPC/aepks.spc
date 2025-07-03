CREATE OR REPLACE PACKAGE AEPKS IS
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
-------------------------------------------------------------------------------------------*/
  Function fn_Stop_Aeod(
    pHome_Branch in varchar2,
    pEOC_group in varchar2) return Boolean;
  Function fn_Success_Logger(
    pComposite_Key in varchar2) return Boolean;
  Function fn_Error_Logger(
    pHome_Branch in varchar2,
    pCurrent_Branch in varchar2,
    pEOC_group in varchar2,
    pFunc_id in varchar2,
    pFunc_instance in varchar2,
    pError_Details in varchar2) return Boolean;
  Function fn_should_run_today(
    pCurrency in varchar2,
    pBranch in varchar2,
    pDate_today in date,
    pFrequency in AETMS_PROCESS_DEFN.Frequency%Type,
    pNo_Days in AETMS_PROCESS_DEFN.No_Days%Type,
    pRun_Date in AETMS_PROCESS_DEFN.Run_Date%Type,
    pHoliday_Rule in AETMS_PROCESS_DEFN.Holiday_rule%Type)return Boolean;
  Function fn_Runchart(
    pHome_Branch in varchar2,
    pEOC_group in varchar2,
    pDate_today in date,
    pErrCode out varchar2,
    pErrData out varchar2) return Boolean;
  Function fn_Runtime_Options_Capture(
    pHome_Branch in varchar2,
    pCurrent_Branch in varchar2,
    pEOC_group in varchar2,
    pFunc_id in varchar2,
    pFunc_instance in varchar2,
    pKey in varchar2,
    pValue in varchar2) return Boolean;
  Function fn_Runtime_Options_Retrieval(
    pHome_Branch in varchar2,
    pCurrent_Branch in varchar2,
    pEOC_group in varchar2,
    pFunc_id in varchar2,
    pFunc_instance in varchar2,
    pKey in varchar2,
    pValue out varchar2) return Boolean;
  Function fn_pending_for_today(pCurrency     in varchar2,
                                pBranch       in varchar2,
                                pDate_today   in date,
                                pFrequency    in AETMS_PROCESS_DEFN.Frequency%Type,
                                pNo_Days      in AETMS_PROCESS_DEFN.No_Days%Type,
                                pRun_Date     in AETMS_PROCESS_DEFN.Run_Date%Type,
                                pHoliday_Rule in AETMS_PROCESS_DEFN.Holiday_rule%Type)
  return Varchar2;
END;
/
CREATE OR REPLACE SYNONYM aepkss FOR aepks
/