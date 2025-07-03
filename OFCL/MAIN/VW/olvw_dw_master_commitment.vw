CREATE OR REPLACE force VIEW olvw_dw_master_commitment AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_dw_master_commitment.vw
**
** Module	: INTERFACE
**
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
--------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------
** Change Histroy:
** 31-AUG-2012 CITIUS#14745 changes: Added for Dealtrax Data ware housing changes 
** 11-MAR-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO CITIUS#18185 Changes: System is not giving the master committment contracts which is having record status as Closed.
--------------------------------------------------------------------------------------------------
*/
SELECT 
	 branch_code
	,default_pool
	,funding_ref_no
	,description
	,facility_name
	,counterparty
	,funding_type
	,external_ref_no
	,revolving_funding
	,funding_ccy
	,funding_amount
FROM oltms_pool_funding_master
-- 11-MAR-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO CITIUS#18185 Changes Start Here
--WHERE record_stat='O'
WHERE  NVL(auth_stat,'U')='A'
--11-MAR-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO CITIUS#18185 Changes End Here 
/
CREATE OR REPLACE SYNONYM olvws_dw_master_commitment
FOR olvw_dw_master_commitment 
/