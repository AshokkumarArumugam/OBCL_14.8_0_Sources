CREATE OR REPLACE VIEW lfvw_fee_component_summary 
AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : lfvw_fee_component_summary.vw
**
** Module       : LF
**	This source is part of the Oracle Banking Corporate Lending  Software Product.   
**	Copyright © 2007 - 2020  Oracle and/or its affiliates.  All rights reserved.   
**	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
***
**	Oracle Financial Services Software Limited.
**	Oracle Park, Off Western Express Highway,
**	Goregaon (East), 
**	Mumbai - 400 063, India.
**-----------------------------------------------------------------------------------------------
**
**CHANGE HISTORY
**Changed By         : Pallavi R
**Date               : 06-Jul-2021
**Change Description : Added code to fetch 'ALL' contracts records
**Search String      : OBCL_12.3_RABO#33188785_Changes 
**Changed By         : Chandra Achuta
**Date               : 22-SEP-2022
**Change Description : Added code to fetch current_branch contracts records
**Search String      : Bug#34663068 
**-----------------------------------------------------------------------------------------------
*/
select a.contract_ref_no,
       a.branch_code,
       a.module,
       a.customer_no,
       a.component,
       a.auth_stat,
       b.contract_status
  from LFTMS_FEE_COMPONENT a, OLTBS_CONTRACT_EVENT_LOG b
 where a.contract_ref_no = b.contract_ref_no
   and a.module = b.module
   and b.Event_Seq_No =
       (SELECT MAX(Event_Seq_No)
          FROM Oltbs_Contract_Event_Log
         WHERE Contract_Ref_No = a.contract_ref_no)
   and a.branch_code = global.current_branch   --Bug#34663068  Code Added
--OBCL_12.3_RABO#33029748_Changes Starts
UNION (SELECT a.Contract_Ref_No,
              a.Branch_Code,
              a.Module,
              a.Customer_No,
              a.Component,
              a.Auth_Stat,
              'A' AS Contract_Status
         FROM Lftms_Fee_Component a
        WHERE a.Contract_Ref_No NOT IN
              (SELECT Contract_Ref_No
                 FROM Oltbs_Contract_Event_Log b
                WHERE b.Module = a.Module
                  AND b.Event_Seq_No =
                      (SELECT MAX(Event_Seq_No)
                         FROM Oltbs_Contract_Event_Log
                        WHERE Contract_Ref_No = b.Contract_Ref_No)))
--OBCL_12.3_RABO#33029748_Changes Ends			 
/         
create or replace synonym LFVWS_FEE_COMPONENT_SUMMARY for LFVW_FEE_COMPONENT_SUMMARY
/