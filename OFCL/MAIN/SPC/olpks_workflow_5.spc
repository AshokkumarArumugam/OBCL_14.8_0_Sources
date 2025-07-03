CREATE OR REPLACE PACKAGE olpks_workflow_5
AS
/*---------------------------------------------------------------------------------------------------------
**
** File Name	: olpks_workflow_5.SPC
**
** Module		: LOANS and DEPOSITS
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
**
-------------------------------------------------------------------------------------------------------------
*/

--------------------------------------------------------------------------------------------------------------------------
TYPE		rec_contracts		IS 	RECORD
		(
		contract_ref_no		VARCHAR2(16),
		effective_date		DATE,
		start_index			INTEGER,
		end_index			INTEGER
		);

TYPE		rec_components		IS	RECORD
		(
		component			VARCHAR2(10),
		auto_rate_code		VARCHAR2(10)
		);

g_contract_ref_no				oltbs_contract.contract_ref_no%TYPE;

TYPE		tbl_contracts		IS 	TABLE OF rec_contracts	INDEX BY BINARY_INTEGER;
TYPE		tbl_components		IS	TABLE OF rec_components	INDEX BY BINARY_INTEGER;

FUNCTION	fn_rtch_for_a_branch
	(
	p_branch_code		IN		oltms_branch.branch_code%TYPE,
	p_processing_date		IN		DATE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION	fn_rtch_for_a_contract
	(
	p_processing_date		IN		DATE,
	p_contracts_rec		IN		rec_contracts,
	p_components_tbl		IN		tbl_components,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--------------------------------------------------------------------------------------------------------------------------
END olpks_workflow_5;
/
CREATE  or replace SYNONYM olpkss_workflow_5 FOR olpks_workflow_5
/