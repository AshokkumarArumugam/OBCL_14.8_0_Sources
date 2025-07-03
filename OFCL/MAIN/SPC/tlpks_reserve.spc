CREATE OR REPLACE PACKAGE tlpks_reserve
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: tlpks_reserve.SPC
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
**
----------------------------------------------------------------------------------------------------
*/
/* CHANGE-HISTORY

30-JULY-2008 FLEXCUBE V.CL Release 7.4 ,New Unit Developed for batch processing of reserve
*/

Function Fn_reserve_batch
	(
	p_branch		IN	oltbs_contract.branch%TYPE,
	p_processing_date	IN	DATE,
	p_commit_frequency	IN	NUMBER,
	p_error_code		IN OUT	VARCHAR2,
	p_error_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

END tlpks_reserve;
/
CREATE or replace SYNONYM tlpkss_reserve FOR tlpks_reserve
/