CREATE OR REPLACE TRIGGER function_udf_uld_trg 
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Software Product.
** Copyright (R) 2016 - 2021 , Oracle and/or its affiliates.  All rights reserved
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
AFTER  UPDATE
ON CSTM_FUNCTION_UDF_FIELDS_MAP
FOR  EACH ROW
  
when (NEW.AUTH_STAT = 'A' and OLD.FIELD_NAME is NULL )
begin
update CSTMS_FUNCTION_UDF_FIELDS_MAP
	set auth_stat = 'U'
where field_name is null ;
end ;
/