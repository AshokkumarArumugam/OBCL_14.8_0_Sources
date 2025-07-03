create or replace force view olvw_trestel_position_04
as
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_trestel_position_04.VW
**
** Module      : Interfaces
**
** This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
**
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
/* ---------------------------------------- Change history ------------------------------------------
May 22, 2003	SFR PLC40110089		Trestel changes
23-SEP-2003	FCC 4.3  CITIPLC SFR PLC43050054. Renamed IFVW0040.VW into olvw_trestel_position_04 and taken the source
						from CITIPLC production version						
06-FEB-2003	CITIPLC PLC44070035 . Source in 4.4 baseline, retroed with changes in 4.3	
-----------------------------------------------------------------------------------------------------
*/
select record_type,ac_branch,ac_ccy
from olvw_trestel_04
union
select a.type_record record_type ,a.branch ac_branch ,a.ccy ac_ccy
from oltbs_trestel_position a
where a.type_record = '04'
and
a.trn_date = (select max(trn_date) from oltbs_trestel_position 
                      		    where type_record = a.type_record
                       		    and
                           	    branch = a.branch
                     		    and
                        	    ccy = a.ccy
                  		    AND
                     		    trn_date <  GLOBAL.application_date)
/
CREATE OR REPLACE SYNONYM olvws_trestel_position_04 FOR olvw_trestel_position_04
/