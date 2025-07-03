CREATE OR REPLACE VIEW OLVW_AMOUNTTAG_DRV_TXT AS
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2012 -2013 Oracle and/or its affiliates.  All rights reserved.
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
SELECT CAST('' AS VARCHAR2(2))    modiderrtxt
      ,CAST('' AS VARCHAR2(4000)) amterrtxt
      ,CAST('' AS VARCHAR2(4000)) ccyerrtxt
FROM   dual
/
CREATE OR REPLACE SYNONYM OLVWS_AMOUNTTAG_DRV_TXT FOR OLVW_AMOUNTTAG_DRV_TXT
/