/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2008 - 2009  Oracle and/or its affiliates.  All rights reserved.
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
------------------------------------------------------------------------------------------*/
CREATE OR REPLACE FORCE VIEW AEVW_EOC_BRANCHES AS
SELECT BRANCH_CODE,EOC_REF_NO,EOC_SEQ_NO,EOD_DATE,BRANCH_DATE,CURR_STAGE,TARGET_STAGE,RUNNING_STAGE,EOC_STATUS,ERROR
FROM AETB_EOC_BRANCHES
/
CREATE OR REPLACE SYNONYM AEVWS_EOC_BRANCHES FOR AEVW_EOC_BRANCHES
/
