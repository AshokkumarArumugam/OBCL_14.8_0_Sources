CREATE OR REPLACE force VIEW olvw_ext_contracts ( MODULE, 
SOURCE, EXTERNAL_INIT_DATE, PRODUCT_CODE ) AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_ext_contracts.VW
**
** Module       : CORE ENTITIES
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
-----------------------------------------------------------------------------------------------
*/
/*
CHANGE HISTORY
*/
SELECT
      DISTINCT module ,
     source,
     external_init_date,
     product_code
 FROM oltbs_ext_contract_stat
 WHERE import_status = 'U'
/
create or replace synonym olvws_ext_contracts for olvw_ext_contracts
/