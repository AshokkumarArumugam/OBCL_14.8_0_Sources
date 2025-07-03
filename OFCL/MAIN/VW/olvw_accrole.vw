CREATE OR REPLACE VIEW OLVW_ACCROLE AS
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
------------------------------------------------------------------------------------------*/
SELECT module            module
      ,role_code         rolecode
      ,role_description  roledescription
      ,role_type         roletype
      ,allow_transfer_gl allowtransfergl
      ,user_defined      userdefined
FROM   oltbs_accrole
WHERE  nvl(user_defined, 'N') = 'Y'
/
CREATE OR REPLACE SYNONYM OLVWS_ACCROLE FOR OLVW_ACCROLE
/