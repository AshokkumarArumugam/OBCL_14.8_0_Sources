create or replace PACKAGE smpks_mask_user AS
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright Â© 2018 - 2018  Oracle and/or its affiliates.  All rights reserved.
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
  CHANGE HISTORY
  **
  **  Modified By          : Poornachandran R
  **  Modified On          : 26-Feb-2018
  **  Modified Reason      : Masking 14.1
  **  Search String        : FCUBS14.1_MASK
------------------------------------------------------------------------------------------
*/
 PROCEDURE pr_setctx(p_access VARCHAR2);
 FUNCTION  fn_getusrredact(p_userid VARCHAR2,p_function VARCHAR2 DEFAULT NULL) RETURN VARCHAR2;
 FUNCTION pr_setusrctx(p_userid VARCHAR2,p_function VARCHAR2 DEFAULT NULL) RETURN VARCHAR2;
END smpks_mask_user;
/
CREATE OR REPLACE SYNONYM smpkss_mask_user FOR smpks_mask_user
/