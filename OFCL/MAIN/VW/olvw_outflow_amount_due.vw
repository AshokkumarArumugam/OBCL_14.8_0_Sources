CREATE OR REPLACE FORCE VIEW olvw_outflow_amount_due
AS
--UK_SLT_UAT_QC#384
/*----------------------------------------------------------------------------------------------------
 This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
**
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
--------------------------------------------------------------------------------------------------
*/
SELECT 	component,contract_ref_no,due_Date,msg_event_Seq_no
        FROM    oltbs_outflow_amount_due         
        WHERE   COMPONENT       = 'PRINCIPAL'
UNION ALL
SELECT 	component,contract_ref_no,due_Date,msg_event_Seq_no
        FROM    oltbs_amount_due_cs         
        WHERE   COMPONENT       = 'PRINCIPAL'
		-- 23-Sep-2011 CITIUS-LS#11366 Retroe Change Starts      CREATE OR REPLACE SYNONYM ldvws_outflow_amount_due FOR olvw_outflow_amount_due
--/
-- 23-Sep-2011 CITIUS-LS#11366 Retroe Change Ends
/