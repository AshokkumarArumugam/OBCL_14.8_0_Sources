CREATE OR REPLACE PACKAGE olpks_pr_rule_gen 
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_pr_rule_gen.SPC
**
** Module		: Rule Creation For Product Resolution
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
CHANGE_HISTORY

Creation DATE :: 01-DEC-2003
*/

AS
	FUNCTION fn_gen_rule
				(
					p_msg 	IN		VARCHAR2,
					p_err_code 	IN OUT	VARCHAR2,
					p_param 	IN OUT	VARCHAR2
				)
	RETURN BOOLEAN;
END olpks_pr_rule_gen;
/
CREATE or replace SYNONYM olpkss_pr_rule_gen FOR olpks_pr_rule_gen
/