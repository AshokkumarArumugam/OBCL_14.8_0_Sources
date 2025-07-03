CREATE OR REPLACE FORCE VIEW olvw_udf_static_val
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_udf_static_val.vw
**
** Module	: INTERFACE
**
**
** This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
**
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
--------------------------------------------------------------------------------------------------
*/
/*-------------------------------------------------------------------------------------------------
** Change Histroy:
18-OCT-2012 CITIUS#15177, DealTrax changes - Added new view for UDF Static Values
--------------------------------------------------------------------------------------------------
*/
SELECT FIELD_NAME
      ,LOV
      ,LOV_DESC
FROM udtms_lov
WHERE upper(field_name) IN (SELECT column_name FROM all_tab_columns WHERE table_name = 'olvw_contract_udf')
ORDER BY field_name,lov
/
CREATE OR REPLACE SYNONYM olvws_udf_static_val
FOR olvw_udf_static_val
/