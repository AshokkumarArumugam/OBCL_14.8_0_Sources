CREATE OR REPLACE FORCE VIEW	olvw_trestel_03
AS	
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_trestel_03.VW
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
May 22, 2003		SFR PLC40110089				Trestel changes
23-SEP-2003	FCC 4.3  CITIPLC SFR PLC43050056. Renamed IFVW0035.VW into olvw_trestel_03 and taken the source
						from CITIPLC production version
06-FEB-2003	CITIPLC PLC44070032 . Source in 4.4 baseline, retroed with changes in 4.3
----------------------------------------------------------------------------------------------------
*/
SELECT		'03' record_type,
		ac_branch,
		ac_ccy, 
		sum(fcy_dr) fcy_dr,
		sum(lcy_dr) lcy_dr,
		sum (fcy_cr) fcy_cr, 
		sum(lcy_cr) lcy_cr
FROM		olvw_unmatched_movements
GROUP BY 	'03',ac_branch, ac_ccy
/
CREATE OR REPLACE SYNONYM olvws_trestel_03 FOR olvw_trestel_03
/