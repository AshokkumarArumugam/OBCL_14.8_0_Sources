create or replace view lfvw_interest_class as
/*
------------------------------------------------------------------------------------------
**
** This source is part of the Oracle Banking Software Product.
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
**    Created By       : Avinav Seal
**    Created On       : 16-May-2016
**    Created Reason   : For Summary in LFDINTCL
**
**    Changed By       : Avinav Seal
**    Changed On       : 18-Oct-2016
**    Changed Reason   : Bug#24898551, Bug#24898391 
----------------------------------------------------------------------------------------------------
*/
SELECT cstmclass.module                        "MODULE",
       cstmclass.class_code                    "CLASS_CODE",
       cstmclass.class_description             "CLASS_DESCRIPTION",
       cstmintclass.rate_type                  "RATE_TYPE",
       cstmintclass.floating_rate_type         "FLOATING_RATE",
       cstmintclass.primary_interest_indicator "PRIMARY_INTEREST",
       cstmclass.record_stat                   "RECORD_STAT",
       cstmclass.auth_stat                     "AUTH_STAT",
       cstmclass.checker_id                    "CHECKER_ID",
       cstmclass.checker_dt_stamp              "CHECKER_DT_STAMP",
       cstmclass.maker_id                      "MAKER_ID",
       cstmclass.maker_dt_stamp                "MAKER_DT_STAMP",
       cstmclass.once_auth                     "ONCE_AUTH",
       cstmclass.mod_no                        "MOD_NO"
  FROM oltms_class cstmclass, lftms_interest_class cstmintclass
  WHERE cstmclass.class_code = cstmintclass.class_code	--Bug#24898551
  AND cstmclass.module = cstmintclass.module			--Bug#24898551
  and cstmclass.class_type='IN'							--Bug#24898391
/
CREATE OR REPLACE SYNONYM lfvws_interest_class FOR lfvw_interest_class
/