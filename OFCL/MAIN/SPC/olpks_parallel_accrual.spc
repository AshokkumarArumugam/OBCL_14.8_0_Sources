CREATE OR REPLACE PACKAGE olpks_parallel_accrual
AS
/*
-------------------------------------------------------------------------------------
**
** File Name	: olpks_parallel_accrual.SPC
**
** Module		: Core Services
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
----------------------------------------------------------------------------------------
*/

TYPE	tbl_contract	IS	TABLE	OF	oltws_accrual_process_queue%ROWTYPE	INDEX	BY	BINARY_INTEGER;

FUNCTION	fn_start_parallel_process
		(
		p_module			IN		oltbs_contract.module_code%TYPE,
		p_contract_tbl		IN OUT	olpks_parallel.contracts_table,
		p_error_code		IN OUT	VARCHAR2,
		p_error_parameter		IN OUT	VARCHAR2
		)
RETURN	BOOLEAN;

FUNCTION	fn_accrual_wrapper
	(
	p_module			IN		oltbs_contract.module_code%TYPE,
	p_contract_tbl		IN		olpks_parallel.contracts_table,	--tbl_contract,
	p_mode			IN		VARCHAR2,
	p_error_code		IN OUT	VARCHAR2,	
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_process_accrual_exception
	(
	p_errcode		IN OUT      VARCHAR2,
	p_errparam		IN OUT      VARCHAR2
	)
RETURN BOOLEAN;

END	olpks_parallel_accrual;
/
CREATE OR REPLACE SYNONYM olpkss_parallel_accrual	FOR	olpks_parallel_accrual
/