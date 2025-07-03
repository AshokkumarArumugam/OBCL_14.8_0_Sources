CREATE OR REPLACE  VIEW ISVW_LOCAL_BANK_DIRECTORY AS
/*-----------------------------------------------------------------------------------------------------
     **
     ** File Name  : PAVW_IN_TXN.vw
     **
     ** Module     : ACH Payments
     **
     ** This source is part of the Oracle BANKING Software Product.
     ** Copyright (R) 2019 , Oracle and/or its affiliates.  All rights reserved
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
     -------------------------------------------------------------------------------------------------------
     CHANGE HISTORY
     SFR Number         :
     Changed By         :
     Change Description :
     -------------------------------------------------------------------------------------------------------
*/
SELECT
A.NW_DIR_KEY,
A.BANK_CODE,
A.BANK_NAME,
A.CLEARING_SYSTEM_CODE,
A.CLEARING_SYSTEM_PROP,
A.NETWORK_PARTICIPATION,
A.DIRECT_BANK_CODE,
A.VALID_FROM,
A.VALID_TO,
A.BIC_CODE,
A.BIC_NAME,
A.ADDRESS_LINE_1,
A.ADDRESS_LINE_2,
A.ADDRESS_LINE_3,
A.ADDRESS_LINE_4,
A.ADDRESS_LINE_5,
A.ADDRESS_LINE_6,
A.ADDRESS_LINE_7,
A.ADDRESS_DEPT,
A.ADDRESS_SUB_DEPT,
A.ADDRESS_STREET_NAME,
A.ADDRESS_BLDG_NO,
A.ADDRESS_BLDG_NAME,
A.ADDRESS_FLOOR,
A.ADDRESS_POST_BOX,
A.ADDRESS_ROOM,
A.ADDRESS_POST_CODE,
A.ADDRESS_TOWN_NAME,
A.ADDRESS_TOWN_LCTN_NAME,
A.ADDRESS_DISTRICT_NAME,
A.ADDRESS_COUNTRY_SUB_DIVISION,
A.ADDRESS_COUNTRY,
A.ADDRESS_TP_CODE,
A.ADDRESS_TP_PRTRY_ID, 
A.ADDRESS_TP_PRTRY_ISSR,
A.ADDRESS_TP_PRTRY_SCHME_NM,
A.AUTH_STATUS,
A.CHECKER_DT_STAMP,
A.CHECKER_ID,
A.MAKER_DT_STAMP,
A.MAKER_ID,
A.RECORD_STAT,
A.TXN_ARCH_DT,
A.MOD_NO
FROM ISTB_LOCAL_BANK_DIRECTORY A
/
CREATE OR REPLACE SYNONYM ISVWS_LOCAL_BANK_DIRECTORY FOR ISVW_LOCAL_BANK_DIRECTORY
/