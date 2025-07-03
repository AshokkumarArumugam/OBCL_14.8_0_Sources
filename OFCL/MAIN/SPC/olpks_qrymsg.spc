CREATE OR REPLACE PACKAGE olpks_qrymsg AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_qrymsg.SPC
**
** Module		: MS
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

/*-----------------------------CHANGE HISTORY--------------------------------------------------
No  Date         Description
--- ---------    -------------------------------------------------------
1   11-sep-01	Flexcube3.8 citipoland changes		Retroed from FCC4.2

---------------------------------------------------------------------------------------------
*/



	

	FUNCTION fn_populate_details ( p_refnum IN VARCHAR2, p_in_or_out VARCHAR2,
				p_rel_ref_no OUT VARCHAR2, p_mt_date OUT VARCHAR2, 
				p_org_msg OUT VARCHAR2, p_mt_swift_type OUT VARCHAR2,
				p_err_code OUT VARCHAR2, p_err_params OUT VARCHAR2)
			RETURN BOOLEAN;


END olpks_qrymsg;
/
CREATE or replace SYNONYM olpkss_qrymsg FOR olpks_qrymsg
/