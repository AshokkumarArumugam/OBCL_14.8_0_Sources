CREATE OR REPLACE FORCE VIEW CYVW_PENDING_ITEMS ( BR, MD, RN, MT, EV, ID ) AS
/*------------------------------------------------------------------------------------------
**
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
-------------------------------------------------------------------------------------------*/
 select  branch_code br,'CY' md,ccy1||ccy2  rn,'' mt,'Unauthorized' ev , maker_id  id
from cytms_rates_master where auth_stat = 'U'
/

DROP SYNONYM CYVWS_PENDING_ITEMS 
/
CREATE SYNONYM CYVWS_PENDING_ITEMS  FOR CYVW_PENDING_ITEMS 
/