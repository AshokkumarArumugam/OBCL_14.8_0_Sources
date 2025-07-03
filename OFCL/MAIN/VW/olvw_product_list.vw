CREATE OR REPLACE VIEW OLVW_PRODUCT_LIST AS
  /*-----------------------------------------------------------------------------------------------------
     **
     ** File Name  : OLVW_PRODUCT_LIST.VW
     **
     ** Module     : Syndication Loans and Commitments
     **
     ** This source is part of the Oracle FLEXCUBE Software Product.
     ** Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved
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

(
          SELECT "PRODUCT_CODE","PRODUCT_DESCRIPTION","PRODUCT_SLOGAN","PRODUCT_REMARKS","PRODUCT_START_DATE","PRODUCT_END_DATE","PRODUCT_GROUP","WAREHOUSE_CODE","PART_OF_PRODUCT","MODULE","RECORD_STAT","AUTH_STAT","ONCE_AUTH","MAKER_ID","MAKER_DT_STAMP","CHECKER_ID","CHECKER_DT_STAMP","MOD_NO","POOL_CODE","NO_OF_LEGS","BRANCHES_LIST","CURRENCIES_LIST","CATEGORIES_LIST","NORMAL_RATE_VARIANCE","MAXIMUM_RATE_VARIANCE","PRODUCT_TYPE","RATE_CODE_PREFERRED","FORMAT_NAME","DEALING_METHOD","RATE_TYPE_PREFERRED","TRACK_PNL_HIST","ECA_ALLOWED","GEN_MT103P","ALLOW_SPLIT_AMOUNTS","RTGS_PRODUCT","SUPPRESS_BV_PMT_MSG","ASSET_CATEGORIES_LIST","LOCATION_LIST","VALIDATE_IBAN_FOR_RTGS","CHG_VAL_DT_ON_HOL_MAINT","HOLIDAY_CHECK","MOVE_ACROSS_MONTHS","WAIVE_CONFIRMATION","AER_CALC_REQD","TAX_APPLICABLE","ALLOW_TAX_REFUND","TAX_TYPE","REPICKUP_INT_RATE"
          FROM   OLTMS_PRODUCT
          WHERE  PRODUCT_CODE IN
               (SELECT PRODUCT
                  FROM OLTMS_PRODUCT_MASTER_LD
                 WHERE ADVANCE_BYLOAN = 'Y')
)
/