CREATE OR REPLACE PACKAGE olpks_acc_intupl
IS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_acc_intupl.SPC
**
** Module		: LETTERS OF CREDIT
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


Function fn_ldacc_intupl		(
			p_source_code    			IN		varchar2,
			p_error_code			IN OUT 	varchar2,
			p_error_parameter 		IN OUT 	varchar2
		)

Return Boolean;

END;

/
CREATE or replace SYNONYM olpkss_acc_intupl for olpks_acc_intupl
/