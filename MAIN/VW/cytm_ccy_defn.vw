CREATE OR REPLACE FORCE VIEW CYTM_CCY_DEFN
AS 
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
--------------------------------------------------------------------------------------------
**    CHANGE HISTORY
**    Changed By        : Hima bindu patil
**   Changed On        : 24-apr-2015
**    Change Desc       : The currency table cytm_ccy_defn is now made a view.
**                        Currency and currency pairs maintained country wise
----------------------------------------------------------------------------------------------------*/
 (select * from CYTM_CCY_DEFN_MASTER where maintenance_country = global.country_code)
/


CREATE OR REPLACE SYNONYM CYTMS_CCY_DEFN FOR CYTM_CCY_DEFN
/