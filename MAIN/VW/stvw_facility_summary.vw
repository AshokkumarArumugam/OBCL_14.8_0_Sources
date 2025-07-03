CREATE OR REPLACE FORCE VIEW STVW_FACILITY_SUMMARY AS
/*-----------------------------------------------------------------------------------------------------
   **
   **
   ** File Name  : STVW_FACILITY_SUMMARY.vw
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
   **     Modified Reason       : Customer Landing Page changes.Liability number is reuqired to query the STSCRFAC from landing page
   **     Search String         : 14.0_POST_IT_FIX_CHANGES
   -------------------------------------------------------------------------------------------------------
*/
SELECT 
 A.AUTH_STAT                AUTH_STAT
,A.RECORD_STAT              RECORD_STAT
,A.LINE_CODE                LINE_CODE
,A.LINE_SERIAL              LINE_SERIAL
,A.LINE_CURRENCY            LINE_CURRENCY
,A.LINE_START_DATE          LINE_START_DATE
,A.LINE_EXPIRY_DATE         LINE_EXPIRY_DATE
,A.ID                       ID
,A.AVAILABILITY_FLAG        AVAILABILITY_FLAG
,A.BRN                      BRN         
,A.LIMIT_AMOUNT             LIMIT_AMOUNT
,A.HOST_CODE                HOST_CODE
,A.SOURCE_SYSTEM            SOURCE_SYSTEM
,B.LIAB_NO                  LIAB_NO
FROM STTM_CORE_EL_FACILITY A,STTM_CORE_EL_LIAB B
WHERE A.LIAB_ID = B.ID
/
create or replace synonym stvws_facility_summary for stvw_facility_summary
/