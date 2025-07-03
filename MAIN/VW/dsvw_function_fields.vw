CREATE OR REPLACE VIEW DSVW_FUNCTION_FIELDS AS
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
--------------------------------------------------------------------------------------*/
SELECT CAST('' AS VARCHAR2(320)) user_id ,
   CAST('' AS VARCHAR2(15)) function_id , column_name  ,
CAST('' AS VARCHAR2(500)) WHERE_CL ,
CAST('' AS VARCHAR2(30)) cont
 FROM   cstb_field_labels 
/
CREATE OR REPLACE SYNONYM DSVWS_FUNCTION_FIELDS FOR DSVW_FUNCTION_FIELDS
/