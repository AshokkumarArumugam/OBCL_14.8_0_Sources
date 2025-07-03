CREATE OR REPLACE PACKAGE olpks_accrual_upload 
IS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_accrual_upload.SPC
**
** Module		: LD
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


Function fn_ldaccrual_upload
		(
			p_source_code    		IN	varchar2,
			p_branch			IN  	varchar2,
			p_reference_no 		IN  	varchar2
		)

Return Boolean;

END;

/
CREATE or replace SYNONYM olpkss_accrual_upload for olpks_accrual_upload
/