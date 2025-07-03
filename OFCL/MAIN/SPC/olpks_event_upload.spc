CREATE OR REPLACE PACKAGE olpks_event_upload 
IS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_event_upload.SPC
**
** Module		: LOANS and DEPOSITS
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


Function fn_ldevent_upload
		(
			p_source_code    		IN	varchar2,
			p_branch			IN  	varchar2,
			p_EXTref_no 		IN  	varchar2,
			p_CUBEref_no		IN 	varchar2
		)

Return Boolean;

FUNCTION fn_insert_master
		(
			p_ref				IN 	varchar2,
			p_matdate 			IN 	date,
			p_amount			IN 	number,
			p_lcy_amt 			IN 	number,
			p_version 			IN 	number,
			p_esn				IN 	number
		 )
Return Boolean;

END;

/
CREATE or replace SYNONYM olpkss_event_upload for olpks_event_upload
/