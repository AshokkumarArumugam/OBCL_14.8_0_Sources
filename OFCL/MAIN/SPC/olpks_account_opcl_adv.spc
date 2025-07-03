CREATE OR REPLACE PACKAGE olpks_account_opcl_adv
AS

/*----------------------------------------------------------------------------------------
**
** File Name	: olpks_account_opcl_adv.SPC
**
** Module		: ACCOUNT
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

FUNCTION	fn_ac_adv	
	(
	p_rec				IN       VARCHAR2,
	p_stat 			IN       VARCHAR2
	)
RETURN BOOLEAN;

END olpks_account_opcl_adv;
/
create or replace synonym olpkss_account_opcl_adv for olpks_account_opcl_adv
/