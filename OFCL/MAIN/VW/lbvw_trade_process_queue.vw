CREATE OR REPLACE FORCE VIEW lbvw_trade_process_queue
--(tranche_ref_no, ext_agency_ref) --20-FEB-2012 Flexcube V.CL Release 7.10 FS Vol1 Tag 08 ITR1#119 changes here
(tranche_ref_no, ext_agency_ref, source_code ) --20-FEB-2012 Flexcube V.CL Release 7.10 FS Vol1 Tag 08 ITR1#119 changes here
AS
--24-Jun-2009	FLEXCUBE V.CL Release 7.5 LOT1.1 Clear Par Changes
/*----------------------------------------------------------------------------------------------------
**
** File Name    : lbvw_trade_process_queue.VW
** Module       : LS
**
This source is part of the Oracle Banking Corporate Lending  Software Product. 
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted 
in any form or by any means, electronic, mechanical, photographic, graphic, optic recording
or otherwise, translated in any language or computer language, without the prior written permission 
of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
/* CHANGE-HISTORY
19-OCT-2008 FLEXCUBE V.CL Release 7.4 ,New Unit Developed for Position Details
28-FEB-2011 Flexcube V.CL Release 7.9, CITIUS Retro, #7604 failed trades are not displayed in few cases.
20-FEB-2012 Flexcube V.CL Release 7.10 FS Vol1 Tag 08 ITR1#119, Markit Trade Settlement Changes, source_code added
*/
SELECT 	DISTINCT(tranche_ref_no),
	ext_agency_ref
	,source_code  --20-FEB-2012 Flexcube V.CL Release 7.10 FS Vol1 Tag 08 ITR1#119 changes here
FROM  	lbtb_trade_processing_queue	
--WHERE	process_status = 'E'  --28-FEB-2011 Flexcube V.CL Release 7.9, CITIUS Retro, #7604 commented
WHERE	process_status in ('E','F') --28-FEB-2011 Flexcube V.CL Release 7.9, CITIUS Retro, #7604 added
/