CREATE OR REPLACE PACKAGE bkpks_aggr_brokerage
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : bkpks_aggr_brokerage.SPC
**
** Module       : Brokerage
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

/*
CHANGE HISTORY

17-AUG-2004 FCC 4.6 Sep04 Retro (India)  Processing of brokerage for aggregation rule type and individual defered
				     			rule types

*/

FUNCTION fn_get_broker_rec
(
	p_branch			IN	oltms_branch.branch_code%TYPE,
	p_function_id			IN	VARCHAR2,
	p_error_code			IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
)
RETURN BOOLEAN;

FUNCTION fn_amt_round (	pAmount 	IN  NUMBER,
			p_round_rule    IN  VARCHAR2,
			p_round_unit    IN  NUMBER,
			p_rounded_amt   OUT NUMBER
		      ) 
RETURN BOOLEAN;

END bkpks_aggr_brokerage;
/
CREATE OR REPLACE SYNONYM bkpkss_aggr_brokerage FOR bkpks_aggr_brokerage
/