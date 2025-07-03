CREATE OR REPLACE PACKAGE Cspks_Parser AS
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
   -------------------------------------------------------------------------------------------------------
    CHANGE HISTORY

    SFR No                   :Revamped Version
    Changed By             :Radha
    Change Description  :Code Cleaned Up

	Date                 : 29-Mar-2013
    Updated By           : Sumeet Yajnik
    Release              : FCUBS_12.0.2
    Bug Number           : INTERNAL
    Change Description   : Performance Changes - New Infra routine changes, xml will not be passed , blk name, tag name and value
							will be passed as string
    Search Tag           :FCUBS PERF PROCESS REQ MSG Changes
   -------------------------------------------------------------------------------------------------------
   */

   FUNCTION Fn_Parser(p_Source_Code IN VARCHAR2
                     ,p_Err_Code    IN OUT VARCHAR2
                     ,p_Err_Param   IN OUT VARCHAR2) RETURN BOOLEAN;

   FUNCTION Fn_Parser(p_Source_Code IN VARCHAR2
                     ,p_Addl_Info   IN OUT Cspks_Req_Global.Ty_Addl_Info
                     ,p_Err_Code    IN OUT VARCHAR2
                     ,p_Err_Param   IN OUT VARCHAR2) RETURN BOOLEAN;

--FCUBS PERF PROCESS REQ MSG Changes starts
    FUNCTION fn_fcdata_parser(p_err_code IN OUT VARCHAR2,
						p_err_param IN OUT VARCHAR2
						)
  	RETURN BOOLEAN;
--FCUBS PERF PROCESS REQ MSG Changes ends
END Cspks_Parser;
/
Create Or Replace Synonym Cspkss_Parser for Cspks_Parser
/
