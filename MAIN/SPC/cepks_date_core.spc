CREATE OR REPLACE PACKAGE Cepks_Date_Core AS
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
   Changed By           : Prabhakar Reddy B
   Changed ON           : 04-OCT-2016
   Change Description   : Fn_Populate_Dates added
   Search String        : FCUBS_12.3_PX_Fn_Populate_Dates
   
   
   
*/------------------------------------------------------------------------------------------

FUNCTION fn_isholiday(
            calendar_type   IN  VARCHAR2,
            calendar_key    IN  VARCHAR2,
            test_date       IN  DATE,
            RESULT1         OUT VARCHAR2) RETURN BOOLEAN;

FUNCTION    fn_getworkingday(
            calendar_type   IN VARCHAR2,
            calendar_key    IN VARCHAR2,
            src_date    IN DATE,
            next_prev   IN VARCHAR2 DEFAULT 'N',
            offset      IN NUMBER DEFAULT 1
        )
RETURN DATE;

FUNCTION    fn_getworkingday
            (
            calendar_type       IN  VARCHAR2,
            calendar_key        IN  VARCHAR2,
            src_date            IN  DATE,
            next_prev           IN  VARCHAR2 DEFAULT 'N',
            offset              IN  NUMBER DEFAULT 1,
            lower_limit_date    IN  DATE,
            upper_limit_date    IN  DATE,
            past_limit          OUT BOOLEAN
            )
RETURN DATE;

---------------------------------------------------------------------------------------------------------------------------
FUNCTION    fn_getnextwday(
            fpBranch        IN VARCHAR2
        )
RETURN DATE;
---------------------------------------------------------------------------------------------------------------------------

FUNCTION    fn_getweop(
            calendar_type   IN VARCHAR2,
            calendar_key    IN VARCHAR2,
            p_in_dt     IN DATE,
            p_period    IN VARCHAR2
        )
RETURN date;

FUNCTION    fn_iscbop(
            p_in_dt     IN DATE,
            p_period    IN VARCHAR2
        )
RETURN boolean;

FUNCTION    fn_isceop(
            p_in_dt     IN DATE,
            p_period    IN VARCHAR2
        )
RETURN boolean;

/*
FUNCTION  fn_isfeop(
           p_branch   IN VARCHAR2,
           p_dt_today IN DATE
            )
RETURN BOOLEAN;
*/

FUNCTION    fn_getceop(
            p_in_dt     IN DATE,
            tmp_period  IN VARCHAR2
        )
RETURN date;
--FCUBS_12.3_PX_Fn_Populate_Dates starts
FUNCTION Fn_Populate_Dates
-----------------------------------------------------------------------
(Pm_Branch          IN VARCHAR2,
 p_Maker_Id         IN Sttms_Dates.Maker_Id%TYPE,
 p_Checker_Id       IN Sttms_Dates.Checker_Id%TYPE,
 p_Maker_Dt_Stamp   IN Sttms_Dates.Maker_Dt_Stamp%TYPE,
 p_Checker_Dt_Stamp IN Sttms_Dates.Checker_Dt_Stamp%TYPE,
 Perrcode           IN OUT Ertbs_Msgs.Err_Code%TYPE,
 Perrparm           IN OUT VARCHAR2) RETURN BOOLEAN;
--FCUBS_12.3_PX_Fn_Populate_Dates ends

END CEPKS_DATE_CORE;
/
CREATE OR REPLACE SYNONYM CEPKSS_DATE_CORE FOR CEPKS_DATE_CORE
/