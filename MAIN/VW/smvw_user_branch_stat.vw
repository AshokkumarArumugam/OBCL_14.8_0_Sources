CREATE OR REPLACE VIEW SMVW_USER_BRANCH_STAT ( USER_ID, 
BRANCH_CODE, EOTI_DESC, TODAY ) AS
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Software Product.
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
-----------------------------------------------------------------------------------------*/
SELECT A.USER_ID,A.BRANCH_CODE,
  DECODE(B.END_OF_INPUT,'N','Transaction Input','T','End of Transaction Input','F','End Of Financial Input','E','End of Day','B','Beginning of Day') eoti_desc,
  D.TODAY
  FROM SMVWS_USER_BRANCHES A, STTMS_CORE_BRANCH_STATUS B,
  STTMS_DATES D
  WHERE B.BRANCH_CODE=A.BRANCH_CODE
  AND D.BRANCH_CODE = A.BRANCH_CODE
/

DROP SYNONYM SMVWS_USER_BRANCH_STAT 
/
CREATE SYNONYM SMVWS_USER_BRANCH_STAT  FOR SMVW_USER_BRANCH_STAT 
/