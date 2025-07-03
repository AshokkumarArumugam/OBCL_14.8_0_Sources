CREATE OR REPLACE VIEW OLVW_AMOUNTTAG_DRV AS
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright ©  2012 -2013  Oracle and/or its affiliates.  All rights reserved.
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
SELECT module_code      modulecode
      ,amount_tag       amounttag
      ,amount_rule_type amountruletype
      ,drv_amount_rule  drvamountrule
      ,ccy_rule_type    ccyruletype
      ,drv_ccy_rule     drvccyrule
FROM   oltms_amount_tag_drv
/
CREATE OR REPLACE SYNONYM OLVWS_AMOUNTTAG_DRV FOR OLVW_AMOUNTTAG_DRV
/