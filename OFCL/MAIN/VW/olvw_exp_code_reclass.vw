CREATE OR REPLACE force VIEW olvw_exp_code_reclass
AS
/*
----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_exp_code_reclass.vw
**
** Module	: LD
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
**
-------------------------------------- Change history ---------------------------------------------
Change History
21-AUG-2014 New view added to get all the Expense code reclass details
18-SEP-2014 CITIUS#19272 System is not showing the respective expense code after the re-class.
--During retro, take this unit as it is.
*/
SELECT 	unit_ref_no related_ref_no, 
		null reference_no,
		null contract_ref_no, 
		txn_mis_1 current_expense_code,
		txn_mis_1 new_expense_code, 
		TO_DATE('01-JAN-2004','DD-MON-RRRR') trn_dt,
		'P' process_status, 
		99999 esn
FROM   	oltbs_class_mapping
UNION ALL
SELECT 	d1.related_ref_no, 
		d1.reference_no, 
		d1.contract_ref_no, 
		d1.current_expense_code,
		d1.new_expense_code, 
		d1.trn_dt, 
		m1.process_status,
		d1.event_seq_no esn
FROM 	OLTB_EXP_CODE_RECLASS_MASTER m1, 
		OLTB_EXP_CODE_RECLASS_DETAIL d1,
		oltbs_contract c1
WHERE 	m1.reference_no 		= 	d1.reference_no
AND 	m1.contract_ref_no 		= 	d1.contract_ref_no
AND		c1.contract_ref_no		= 	d1.related_ref_no
AND 	m1.process_status		= 	'P'
AND 	(
			NOT( c1.module_code = 'OL' AND c1.product_type = 'D')
		)
/
CREATE or replace SYNONYM olvws_exp_code_reclass for olvw_exp_code_reclass
/