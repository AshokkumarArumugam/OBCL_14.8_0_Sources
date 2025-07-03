CREATE OR REPLACE VIEW LFVW_CONTRACT_INTEREST_HISTORY AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : lfvw_contract_interest_history.vw
**
** Module       : OL
  This source is part of the Oracle Banking Corporate Lending  Software Product.
  Copyright © 2007 - 2020  Oracle and/or its affiliates.  All rights reserved.
  No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates.
**
  Oracle Financial Services Software Limited.
  Oracle Park, Off Western Express Highway,
  Goregaon (East),
  Mumbai - 400 063, India.
-----------------------------------------------------------------------------------------------
CHANGE HISTORY
    Changed By         :
    Changed On         :
    Change Reason      :
    Search String      :
                
    **Changed By         : Navoneel Nandan
    **Date               : 08-Oct-2020
    **Change Description : Added Rate_code_usage and Borrow_Lend_Ind to the Select List.
    **Search String      : OBCL_14.5_Historic_Interest_2
                
    **Changed By         : Navoneel Nandan
    **Date               : 05-Nov-2020
    **Change Description : Modified Logic to predict ICCF Change.
    **Search String      : OBCL_14.5_Historic_Interest_3
	
	**Changed By          : Abhik Das
    **Changed On          : 29-Jan-2024
    **Change Description  : Modified to fetch rate code from lftb_contract_interest_detail
                            table to resolve display issue during forward VAMI.
                            --fwdport of Bug#36210065
    **Search String       : OBCL_14.7_BNTB_fwdport_Bug#36226284_Changes
-----------------------------------------------------------------------------------------------
*/
--OBCL_14.5_Historic_Interest_3 Changes Starts
SELECT CONTRACT_REF_NO,
       PENALTY_TYPE,
       COMPONENT,
       EVENT_SEQUENCE_NO,
       VALUE_DATE,
       RATE_TYPE,
       RATE_CODE,
       RATE_CODE_USAGE,
       BORROW_LEND_IND,
       BASE_RATE,
       SPREAD,
       SPREAD_ADJ,
       FINAL_RATE
  FROM (SELECT ICCF.*,
               LAG(ICCF_KEY) OVER(PARTITION BY CONTRACT_REF_NO, COMPONENT ORDER BY EVENT_SEQUENCE_NO) PREV_ICCF_KEY 
          FROM (SELECT A.*,
                       CONTRACT_REF_NO || '~' || COMPONENT || '~' || RATE_TYPE || '~' ||
                       RATE_CODE || '~' || RATE_CODE_USAGE || '~' || BORROW_LEND_IND || '~' ||
                       BASE_RATE || '~' || SPREAD || '~' || SPREAD_ADJ || '~' ||
                       FINAL_RATE ICCF_KEY
                  FROM (
--OBCL_14.5_Historic_Interest_3 Chnages Ends
SELECT A.CONTRACT_REFERENCE_NO CONTRACT_REF_NO,--OBCL_14.7_BNTB_fwdport_Bug#36226284_Changes added alias
       A.PENALTY_TYPE,--OBCL_14.7_BNTB_fwdport_Bug#36226284_Changes added alias
       A.COMPONENT,--OBCL_14.7_BNTB_fwdport_Bug#36226284_Changes added alias
       /*MIN(EVENT_SEQUENCE_NO)*/ A.EVENT_SEQUENCE_NO,--OBCL_14.7_BNTB_fwdport_Bug#36226284_Changes added alias
       /*MIN(VALUE_DATE)*/ A.VALUE_DATE,--OBCL_14.7_BNTB_fwdport_Bug#36226284_Changes added alias
       CASE
         WHEN A.RATE_TYPE = 'F' THEN--OBCL_14.7_BNTB_fwdport_Bug#36226284_Changes added alias
          'Floating'
         WHEN A.RATE_TYPE = 'S' THEN--OBCL_14.7_BNTB_fwdport_Bug#36226284_Changes added alias
          'Special'
         WHEN A.RATE_TYPE = 'X' THEN--OBCL_14.7_BNTB_fwdport_Bug#36226284_Changes added alias
          'Fixed'
         ELSE
          NULL
       END RATE_TYPE,
       A.RATE_CODE,--OBCL_14.7_BNTB_fwdport_Bug#36226284_Changes added alias
--OBCL_14.5_Historic_Interest_2 changes starts
       DECODE(A.RATE_TYPE,'X','',DECODE(A.RATE_CODE_USAGE,'A','Automatic','P','Periodic')) RATE_CODE_USAGE,--OBCL_14.7_BNTB_fwdport_Bug#36226284_Changes added alias
       DECODE(A.RATE_TYPE,'X','',DECODE(A.BORROW_LEND_IND,'B','Borrow','L','Lend','M','Mid')) BORROW_LEND_IND,--OBCL_14.7_BNTB_fwdport_Bug#36226284_Changes added alias
--OBCL_14.5_Historic_Interest_2 changes ends
       NVL(A.RATE,0) BASE_RATE,--OBCL_14.7_BNTB_fwdport_Bug#36226284_Changes added alias
       NVL(A.SPREAD,0) SPREAD,--OBCL_14.7_BNTB_fwdport_Bug#36226284_Changes added alias
       A.SPREAD_ADJ,--OBCL_14.7_BNTB_fwdport_Bug#36226284_Changes added alias
       (CASE WHEN ((NVL(A.RATE,0) + NVL(A.SPREAD,0)) > A.MAX_RATE) THEN--OBCL_14.7_BNTB_fwdport_Bug#36226284_Changes added alias
         A.MAX_RATE
       ELSE
         (NVL(A.RATE,0) + NVL(A.SPREAD,0))--OBCL_14.7_BNTB_fwdport_Bug#36226284_Changes added alias
       END) FINAL_RATE
  FROM LFTB_CONTRACT_INTEREST A
  ---OBCL_14.7_BNTB_fwdport_Bug#36226284_Changes Starts---
  ,LFTB_CONTRACT_INTEREST_DETAIL B
  WHERE A.CONTRACT_REFERENCE_NO = B.CONTRACT_REF_NO
  AND A.COMPONENT = B.COMPONENT
  AND A.VALUE_DATE = B.VALUE_DATE
  ----OBCL_14.7_BNTB_fwdport_Bug#36226284_Changes Ends----
--OBCL_14.5_Historic_Interest_3 Changes Starts  
  ) A) ICCF)
 WHERE ICCF_KEY <> nvl(PREV_ICCF_KEY,
                       'X')
 /*
 GROUP BY CONTRACT_REFERENCE_NO,
          PENALTY_TYPE,
          COMPONENT,
          CASE
            WHEN RATE_TYPE = 'F' THEN
             'Floating'
            WHEN RATE_TYPE = 'S' THEN
             'Special'
            WHEN RATE_TYPE = 'X' THEN
             'Fixed'
            ELSE
             NULL
          END,
          RATE_CODE,
--OBCL_14.5_Historic_Interest_2 changes starts
       DECODE(RATE_TYPE,'X','',DECODE(RATE_CODE_USAGE,'A','Automatic','P','Periodic')),
       DECODE(RATE_TYPE,'X','',DECODE(BORROW_LEND_IND,'B','Borrow','L','Lend','M','Mid')),
--OBCL_14.5_Historic_Interest_2 changes ends
          NVL(RATE,0),
          NVL(SPREAD,0),
          SPREAD_ADJ,
          (CASE WHEN ((NVL(RATE,0) + NVL(SPREAD,0)) > A.MAX_RATE) THEN
            A.MAX_RATE
          ELSE
            (NVL(RATE,0) + NVL(SPREAD,0))
          END)
*/
 ORDER BY 1, 2, 3, 4, 5
/
CREATE OR REPLACE SYNONYM lfvws_contract_interest_history FOR lfvw_contract_interest_history 
/