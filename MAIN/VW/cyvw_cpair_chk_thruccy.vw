CREATE OR REPLACE FORCE VIEW CYVW_CPAIR_CHK_THRUCCY AS
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
------------------------------------------------------------------------------------------*/
SELECT CCY1                                          "CCY_CODE1",
       CCY2                                          "CCY_CODE2", 
       THROUGH_CCY                                   "THROUGH_CCY1", 
       DECODE (NVL(THROUGH_CCY, 0) , '0' , 'N', 'Y') "CHK_THRUCCY"  
FROM CYTMS_CCY_PAIR_DEFN
/
CREATE OR REPLACE SYNONYM CYVWS_CPAIR_CHK_THRUCCY FOR CYVW_CPAIR_CHK_THRUCCY
/