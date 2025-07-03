CREATE OR REPLACE FORCE VIEW CYTM_CCY_PAIR_DEFN
AS 
/*------------------------------------------------------------------------------------------
**
** This source is part of the Oracle FLEXCUBE Software Product.
** Copyright (R) 2016 - 2020 , Oracle and/or its affiliates.  All rights reserved
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
--------------------------------------------------------------------------------------------
**    CHANGE HISTORY
**    Changed By        : Hima bindu patil
**   Changed On        : 24-apr-2015
**    Change Desc       : The currency table cytm_ccy_pair_defn is now made a view.
**                        Currency and currency pairs maintained country wise
**
**    Changed By        : Ramki
**   Changed On        : 04-Feb-2020
**    Change Desc       : No change to view, done a checkin to refresh the view since the base table has got a new column created for JCROFC_Minicore_Integration
----------------------------------------------------------------------------------------------------*/
(select * from CYTM_CCY_PAIR_DEFN_MASTER where maintenance_country = global.country_code)
/

CREATE OR REPLACE SYNONYM CYTMS_CCY_PAIR_DEFN FOR CYTM_CCY_PAIR_DEFN
/