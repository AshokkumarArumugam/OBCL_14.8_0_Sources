CREATE OR REPLACE VIEW STTM_BRANCH_NODE ( BRANCH_CODE, NODE ) AS
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
select branch_code, host_name node
from sttm_core_branch_pref
/
DROP SYNONYM STTMS_BRANCH_NODE 
/
CREATE SYNONYM STTMS_BRANCH_NODE  FOR STTM_BRANCH_NODE 
/