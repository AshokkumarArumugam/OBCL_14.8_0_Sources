CREATE OR REPLACE PACKAGE AEPKS_EOC_BATCH
AS
   /*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2016 - 2016  Oracle and/or its affiliates.  All rights reserved.
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
  ---------------------------------------------------------------------------------------------------
  ** Modified By         : Rakesh N
  ** Modified On         : 27-Oct-2016
  ** Modified Reason     : New package for Invoking EOD batch programs parallely from Quartz scheduler
  ** Search String        : 12.3 standalone changes

   -------------------------------------------------------------------------------------------------------
   */
  function fn_next_batch(p_eoc_programs out aetb_eoc_programs%rowtype) return boolean;

  procedure pr_decide_run (p_continue out varchar2);

  procedure pr_batch_run;

END AEPKS_EOC_BATCH;
/
Create or replace synonym AEPKSS_EOC_BATCH for AEPKS_EOC_BATCH
/