CREATE OR REPLACE PACKAGE bkpks_liquidation
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : bkpks_liquidation.SPC
**
** Module       : BROKERAGE
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



-------------------------------------------------------------------------------
	g_module			oltbs_handoff.module%TYPE := 'BK';
-------------------------------------------------------------------------------

FUNCTION fn_save
	(
	p_transaction_ref_no	IN	oltbs_handoff.trn_ref_no%TYPE,
	p_value_date		IN	date,
	-- FCC 4.4 DEC 2003 BROKERAGE changes start
	p_broker			IN	bktms_brmaster.broker%TYPE,
	p_ccy				IN	bktbs_brliq.payable_ccy%TYPE,
	-- FCC 4.4 DEC 2003 BROKERAGE changes end
	p_error_code		IN OUT	varchar2,	
	p_error_parameter	IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_reverse
	(
	p_transaction_ref_no	IN	oltbs_handoff.trn_ref_no%TYPE,
	p_error_code		IN OUT	varchar2,	
	p_error_parameter	IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_undo
	(
	p_transaction_ref_no	IN	oltbs_handoff.trn_ref_no%TYPE,
	p_error_code		IN OUT	varchar2,	
	p_error_parameter	IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_authorize
	(
	p_transaction_ref_no	IN	oltbs_handoff.trn_ref_no%TYPE,
	p_error_code		IN OUT	varchar2,	
	p_error_parameter	IN OUT	varchar2
	)
	RETURN boolean;

END bkpks_liquidation;
/
CREATE or replace SYNONYM bkpkss_liquidation for bkpks_liquidation
/