CREATE OR REPLACE FORCE VIEW STVW_COLLAT_SUMMARY AS
/*-----------------------------------------------------------------------------------------------------
   **
   **
   ** File Name  : STVW_COLLAT_SUMMARY.vw
   **
   ** Module     : ST
   **
   ** This source is part of the Oracle FLEXCUBE Software System and is copyrighted by Oracle Financial Services Software Limited.
   **
   **
   ** All rights reserved. No part of this work may be reproduced, stored in a retrieval system,
   ** adopted or transmitted in any form or by any means, electronic, mechanical, photographic,
   ** graphic, optic recording or otherwise, translated in any language or computer language,
   ** without the prior written permission of Oracle Financial Services Software Limited.
   **
   ** Oracle Financial Services Software Limited.
   ** 10-11, SDF I, SEEPZ, Andheri (East),
   ** Mumbai - 400 096.
   ** India
   ** Copyright © 2011,2015 Oracle Financial Services Software Limited. All rights reserved.
   **
   **	  Created By            : Niranjana R
   **     Created On            : 24-Jan-2018
   **     Modified Reason       : Customer Landing Page changes.
   **     Search String         : 14.0_POST_IT_FIX_CHANGES
   -------------------------------------------------------------------------------------------------------
*/
SELECT
A.AUTH_STAT              AUTH_STAT,
A.RECORD_STAT            RECORD_STAT,
B.LIAB_NO                LIAB_NO,
A.COLLATERAL_CODE        COLLATERAL_CODE,
A.COLLATERAL_DESCRIPTION COLLATERAL_DESCRIPTION,
A.COLLATERAL_CURRENCY    COLLATERAL_CURRENCY,
A.COLLATERAL_VALUE       COLLATERAL_VALUE,
A.LIMIT_CONTRIBUTION     LIMIT_CONTRIBUTION,
A.START_DATE             START_DATE,
A.END_DATE               END_DATE,
A.COLLATERAL_TYPE        COLLATERAL_TYPE,
A.ID                     ID,
A.CUSTOMER_NO            CUSTOMER_NO,
A.HOST_CODE              HOST_CODE,
A.SOURCE_SYSTEM          SOURCE_SYSTEM
FROM STTM_CORE_EL_COLLAT A,STTM_CORE_EL_LIAB B 
WHERE A.LIAB_ID = B.ID and A.COLLATERAL_TYPE <> 'S'
/
create or replace synonym stvws_collat_summary for stvw_collat_summary
/