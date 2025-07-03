CREATE OR REPLACE FORCE VIEW tlvw_contract_excep_summary
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name : tlvw_contract_excep_summary.VW
** Module	 : TL
**
This source is part of the Oracle Banking Corporate Lending  Software Product. 
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted 
in any form or by any means, electronic, mechanical, photographic, graphic, optic recording
or otherwise, translated in any language or computer language, without the prior written permission 
of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.

  Changed By         : Jayaram N
  Date               : 22-Apr-2020
  Change Description : SLT: Error message screen base issue
  Search String      : PID-PANFLX08001 ITR SFRNUM:Bug#31210692_OBCL_14.4_Base_Issue_in_Error_Message_Screen
----------------------------------------------------------------------------------------------------
Change History
*/
SELECT A.EXT_CONTRACT_REF_NO,
       A.VERSION_NO,
       A.ERR_SEQ_NO,
       A.SOURCE_CODE,
       (SELECT TRADE_REF_NO
        FROM TLTBS_UPLOAD_MASTER
        WHERE EXT_CONTRACT_REF_NO = A.EXT_CONTRACT_REF_NO
        AND VERSION_NO = (SELECT MAX(VERSION_NO)
                          FROM TLTBS_CONTRACT_EXCEPTION
                          WHERE EXT_CONTRACT_REF_NO = A.EXT_CONTRACT_REF_NO)) AS TRADE_REF_NO,
		NVL((SELECT BRANCH
        FROM TLTBS_UPLOAD_MASTER
        WHERE EXT_CONTRACT_REF_NO = A.EXT_CONTRACT_REF_NO
        AND VERSION_NO = (SELECT MAX(VERSION_NO)
                          FROM TLTBS_CONTRACT_EXCEPTION
                          WHERE EXT_CONTRACT_REF_NO = A.EXT_CONTRACT_REF_NO)),(SELECT sypks_utils.get_branch(EXT_CONTRACT_REF_NO) FROM DUAL)) AS BRANCH 
FROM TLTBS_CONTRACT_EXCEPTION A
WHERE A.ERR_SEQ_NO = (SELECT MAX(ERR_SEQ_NO)
                      FROM TLTBS_CONTRACT_EXCEPTION
                      WHERE EXT_CONTRACT_REF_NO = A.EXT_CONTRACT_REF_NO)
  AND A.ERROR_CODE is not null				  
/
CREATE OR REPLACE SYNONYM tlvws_contract_excep_summary FOR tlvw_contract_excep_summary
/