CREATE OR REPLACE VIEW OLVW_AMOUNTTAG AS
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2012 - 2013  Oracle and/or its affiliates.  All rights reserved.
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
**
** Modified by          : Vrishti Ghosh
** Modified On          : 17-Feb-2017
** Modified reason      : Language code has been hardcoded as 'ENG' hence it is failing for other language,hence language_code where condition has been commented.
** Search string        : RETRO_12_3_25561996
**
**   Modified By            : Avneesh
**   Modified On            : 14-Aug-2019
**   Modified Reason        : UAT3-SYSTEM THROWS ERROR ON UNLOCK/SAVE IN UDDRLTAG
**   Retro Source           : 9NT1606_12_3_BANCA INTESA AD BEOGRAD_30085420 
**   Search String          : 9NT1606_14_3_RETRO_12_3_30145218
------------------------------------------------------------------------------------------ */
SELECT module                  module
      ,amount_tag              amounttag
      ,description             description
      ,language_code           languagecode
      ,charge_allowed          chargeallowed
      ,commission_allowed      commissionallowed
      ,interest_allowed        interestallowed
      ,tax_allowed             taxallowed
      ,acct_entry_defn_allowed acctentrydefnallowed
      ,amount_tag_type         amounttagtype
      ,track_receivables       trackreceivables
      ,tran_tax_allowed        trantaxallowed
      ,issr_tax_allowed        issrtaxallowed
     -- ,lcy_avg_eql_reqd        lcyavgeqlreqd
    --  ,tag_to_be_avg_eql_with  tagtobeavgeqlwith
      ,user_defined            userdefined
FROM   oltbs_amount_tag
WHERE  nvl(user_defined, 'N') = 'Y'
--AND Language_Code = 'ENG'  -- NLS_11.4 --RETRO_12_3_25561996 commented
  AND Language_Code = Global.Lang  -- 9NT1606_14_3_RETRO_12_3_30145218
/
CREATE OR REPLACE SYNONYM OLVWS_AMOUNTTAG FOR VW_AMOUNTTAG
/