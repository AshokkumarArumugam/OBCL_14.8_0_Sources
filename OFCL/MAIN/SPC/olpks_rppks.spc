CREATE OR REPLACE PACKAGE olpks_rppks
IS

--FCC V.CL 7.3 UK CONSOLIDATION RETRO START
/*CREATE OR REPLACE PACKAGE olpks_rppks 
IS*/
--FCC V.CL 7.3 UK CONSOLIDATION RETRO END
/*----------------------------------------------------------------------------------------
**
** File Name  : olpks_rppks.SPC
**
** Module    : IF
**
  This source is part of the Oracle Banking Corporate Lending  Software Product.   
  Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
  No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

  Oracle Financial Services Software Limited.
  Oracle Park, Off Western Express Highway,
  Goregaon (East), 
  Mumbai - 400 063, India.
** 
----------------------------------------------------------------------------------------
*/

/*
CHANGE HISTORY
30-JUL-2002  FCC 4.1 OCT 2002  CITILATAM PYUAT SFR No 68
            Changes To fn_server_report.Added a new parameter called as p_schema_name to be             appended with the file.  This is because the Mainframe job executor with CIRITBANK
            called as OPC used to overwrite the report files for all the schemas 
            on the same instance. This was not a situation we wanted.

28-OCT-2003 FCC 4.4 DEC 2003 RETRO CITIPLC SFR#PLC43060018   1. CITIPLC 4.0 Production baseline taken, since it is a PLC specific unit
                2. SHO ERR moved above dropping and creation of synonym
29-NOV-2004 FCC 4.6.1 Jan 2005 LONDON Retro Changes - PLC44020089   
        Added 3 parameters to fn_msprint - in addition to the existing Media : 
            Message type, Delivery by and reprint. 
        This is to enable printing of specified types of message and printing of only those not 
        already printed.
19-JAN-2005 FCC 4.6.1 JAN 2005 ITR-1 SFR-196 For changing copyright clause / release name
11-SEP-2007 FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-LS-572 Msg generation during mart TI
20-Sep-2016 -- OFCL12.2 Not Required
*/
--FCC V.CL 7.3 UK CONSOLIDATION RETRO START

--FCC V.CL 7.3 UK CONSOLIDATION RETRO END
/*-- OFCL12.2 Not Required
FUNCTION fn_writeAlert(
  pId  IN  oltms_printer.printer_id%TYPE, 
  pSpool  IN  VARCHAR2,
  pCopies  IN  NUMBER) 
return BOOLEAN;


function fn_server_report (
 p_branch_code varchar2, 
        --FCC 4.4 DEC 2003 RETRO CITIPLC SFR#PLC43060018 parameter removed
        -- p_schema_name    varchar2, --FCC 4.1 OCT 2002  CITILATAM PYUAT SFR No 68
        p_function_id     varchar2, 
 p_user_id varchar2, 
        p_function_instance   number,
        p_spool_path    varchar2,
        p_file      varchar2,
        p_err_code       out varchar2,
        p_err_param     out varchar2)
return boolean;

FUNCTION fn_msprint(p_branch_code VARCHAR2,
 p_user_id VARCHAR2,
        pmedia     oltbs_dly_msg_out.media%TYPE,
        --FCC 4.6.1 Jan 2005 LONDON Retro Changes - PLC44020089 - START
        p_msg_type    VARCHAR2,
        p_delivery_by  VARCHAR2,
        p_reprint    VARCHAR2,
        --FCC 4.6.1 Jan 2005 LONDON Retro Changes - PLC44020089 - END      
        p_err_code     OUT VARCHAR2,
        p_err_param   OUT VARCHAR2
       ) RETURN BOOLEAN;

function fn_msinprint(
 p_branch_code varchar2, 
 p_user_id varchar2, 
      pmedia  oltbs_dly_msg_out.media%type,
      p_err_code     out varchar2,
      p_err_param     out varchar2)  return boolean;

FUNCTION encore_spool_data(spoolpath varchar2,
             spoolfile  varchar2,
           report_name varchar2,
           p_function_instance number,
           p_error_code  out varchar2,
           p_err_param  out varchar2) 
RETURN boolean; 

FUNCTION CAVIEW_SPOOL_DATA(spoolpath varchar2,
             spoolfile  varchar2,
           report_name varchar2,
           p_function_instance number,
           p_error_code  out varchar2,
           p_err_param  out varchar2
        ) 
RETURN boolean; 
*/-- OFCL12.2 Not Required
--FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-LS-572 START
FUNCTION Fn_gen_msg_bod(p_branch_code oltms_branch.Branch_code%TYPE)
RETURN BOOLEAN;
--FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-LS-572 END

end olpks_rppks;
/