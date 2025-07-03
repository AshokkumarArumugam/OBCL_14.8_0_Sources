CREATE OR REPLACE PACKAGE tlpks_bkbal
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: tlpks_bkbal.SPC
**
** Module	: LT - SECONDARY LOAN TRADING
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
/*----------------------------------CHANGE HISTORY---------------------------------------------------
31-Aug-2009 SLT BO Report related changes
----------------------------------END CHANGE HISTORY------------------------------------------------
*/
FUNCTION Fn_populate_bkbal
		(
			p_branch		IN	VARCHAR2
		,	p_module		IN	VARCHAR2
		,	p_product		IN	VARCHAR2
		,	p_date			IN	DATE
		,	p_commit_frequency	IN	NUMBER
		,	p_error_code		IN OUT	VARCHAR2
		,	p_error_param		IN OUT	VARCHAR2
		)
RETURN BOOLEAN;
----------------------------------------------------------------------------------------------------------
FUNCTION Fn_insert_bkbal
		(
			p_contract_ref_no	IN	VARCHAR2
		,	p_date			IN	DATE
		,	p_component		IN	VARCHAR2
		,	p_component_ccy		IN	VARCHAR2
		,	p_unit_head		IN	VARCHAR2
		,	p_amount_lcy		IN	NUMBER
		,	p_amount_fcy		IN	NUMBER
		,	p_error_code		IN OUT	VARCHAR2
		,	p_error_param		IN OUT	VARCHAR2
		)
RETURN BOOLEAN;
----------------------------------------------------------------------------------------------------------
FUNCTION Fn_populate_mtd_bal
		(
			p_contract_ref_no	IN	VARCHAR2
		,	p_date			IN	DATE
		,	p_error_code		IN OUT	VARCHAR2
		,	p_error_param		IN OUT	VARCHAR2
		)
RETURN BOOLEAN;
----------------------------------------------------------------------------------------------------------
FUNCTION Fn_populate_ytd_bal
		(
			p_contract_ref_no	IN	VARCHAR2
		,	p_month			IN	VARCHAR2
		,	p_year			IN	NUMBER
		,	p_error_code		IN OUT	VARCHAR2
		,	p_error_param		IN OUT	VARCHAR2
		)
RETURN BOOLEAN;
----------------------------------------------------------------------------------------------------------
END tlpks_bkbal;
/
CREATE or replace SYNONYM tlpkss_bkbal FOR tlpks_bkbal
/