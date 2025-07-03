CREATE OR REPLACE PACKAGE olpks_dly_refrate_comp 
IS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_dly_refrate_comp.SPC
**
** Module		: MI
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
/* C H A N G E H I S T O R Y 

20.01.2004 FCC 4.5 April 2004 Citiplc PLC43010014 Creation of synonym not present so adding the same

*/

FUNCTION Fn_dly_refrate_comp(p_brn oltms_branch.branch_code%type) 
RETURN BOOLEAN;

END olpks_dly_refrate_comp;
/
CREATE or replace SYNONYM olpkss_dly_refrate_comp FOR olpks_dly_refrate_comp	--FCC 4.5 April 2004 PLC43010014
/