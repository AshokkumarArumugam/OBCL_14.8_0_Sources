CREATE OR REPLACE FORCE VIEW lbvw_transfer_master
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: lbvw_transfer_master.VW
**
** Module	: LS
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
/*----------------------------------CHANGE HISTORY--------------------------------------------------
17-JUN-2008 FLEXCUBE V.CL Release 7.4 BAU changes for Primary Transfer SFR#20 - transfer_ref_no and transfer_type is added -banu
03-JUN-2009 CITIUS-LS#SRT5764 Missing Retro from CITIUS to BLORE
	1.06-APR-2009 CITIUS-LS#5595, Trades processed should be displayed sorted based ON auth_status and esn.
26-JUN-2009 FLEXCUBE V.CL RELEASE 7.5 LOT1.1 CHANGES, changed copyright clause.
------------------------------------END CHANGE HISTORY----------------------------------------------
*/
SELECT contract_ref_no, value_date, null esn, entry_seq_no, 'W' table_type
,transfer_type,transfer_ref_no --FLEXCUBE V.CL Release 7.4 BAU changes for Primary Transfer SFR#20-banu
,'U' auth_status			--CITIUS-LS#5595
FROM lbtws_transfer_master
UNION
SELECT contract_ref_no, value_date, event_seq_no esn,  entry_seq_no, 'M' table_type
,transfer_type,transfer_ref_no -- FLEXCUBE V.CL Release 7.4 BAU changes for Primary Transfer SFR#20 -banu
,(select auth_status from oltbs_contract a where a.contract_ref_no = b.contract_ref_no)	--CITIUS-LS#5595
FROM lbtbs_transfer_master b								--CITIUS-LS#5595		
--FROM lbtbs_transfer_master 
/
CREATE OR REPLACE SYNONYM lbvws_transfer_master FOR lbvw_transfer_master
/