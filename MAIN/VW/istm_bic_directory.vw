CREATE OR REPLACE FORCE VIEW ISTM_BIC_DIRECTORY AS
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2019 - 2019  Oracle and/or its affiliates.  All rights reserved.
** 												
** No part of this work may be reproduced, stored in a retrieval system,
** adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise,
** translated in any language or computer language,
** without the prior written permission of Oracle and/or its affiliates.
** 
** 
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India.
------------------------------------------------------------------------------------------
*/
/*
------------------------------------------------------------------------------------------*/
SELECT   a.BIC_CODE
        ,a.BANK_NAME
        ,b.CUSTOMER_NO
        ,b.SK_ARRANGEMENT
        ,a.MOD_NO
        ,a.RECORD_STAT
        ,a.MAKER_ID
        ,a.MAKER_DT_STAMP
        ,a.CHECKER_ID
        ,a.CHECKER_DT_STAMP
        ,a.ONCE_AUTH
        ,a.AUTH_STAT
        ,a.BANK_ADDRESS1
        ,a.BANK_ADDRESS2
        ,a.BANK_ADDRESS3
        ,b.RELATIONSHIP
        ,b.SWIFT_KEY
        ,b.TELEX_KEY
        ,a.UPLOAD_FLAG
        ,a.UPLOAD_UPDATE
        ,a.GEN_MT103
        ,a.BLACKLISTED
        ,a.CUG_MEMBER
        ,a.GEN_MT103P
        ,a.MULTI_CUST_TRANSFER
        ,a.MAX_SIZE
        ,a.REMIT_MEMBER
        ,a.SUB_TYPE_CODE
        ,a.GEN_MT102P
        ,a.GEN_MT101
        ,a.TRANSACTION_PER_MSG
        ,a.ADB_MEMBER
        ,a.BE_INDICATOR
        ,a.BRANCH_INFO
        ,a.POB_NUMBER
        ,a.STREET_ADDR_1
        ,a.STREET_ADDR_2
        ,a.STREET_ADDR_3
        ,a.STREET_ADDR_4
        ,a.CITY
        ,a.CPS
        ,a.ZIP_CODE
        ,a.ISO_COUNTRY_CODE
FROM ISTM_BIC_DIRECTORY_GBL a
     ,ISTM_BIC_DIRECTORY_LCL b
WHERE a.BIC_CODE = b.BIC_CODE(+)
/
CREATE OR REPLACE SYNONYM ISTMS_BIC_DIRECTORY FOR ISTM_BIC_DIRECTORY
/