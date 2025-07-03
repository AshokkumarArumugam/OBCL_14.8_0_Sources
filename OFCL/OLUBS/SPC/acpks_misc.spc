CREATE OR REPLACE PACKAGE ACPKS_MISC
AS

/*----------------------------------------------------------------------------------------------------
**
** File Name	: acpks_misc.SPC
**
** Module		: OL
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
------------------------------CHANGE HISTORY--------------------------------------------------------

Changed By          : 
Change Description  : 
Search Tag          : 
Change Date         : 
------------------------------------------------------------------------------------------------------
*/



Function fn_GetAvlBal(	pAccBr	IN		oltbs_account.branch_code%Type,
						pAcc    IN		oltbs_account.ac_gl_no%Type,
						pBal	OUT	    NUMBER
						)
return boolean;						 
								 
END;
/
CREATE OR REPLACE SYNONYM ACPKSS_MISC FOR ACPKS_MISC
/