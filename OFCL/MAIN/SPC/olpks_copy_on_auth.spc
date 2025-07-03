CREATE OR REPLACE PACKAGE olpks_copy_on_auth
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_copy_on_auth.SPC
**
** Module		: CORE
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
/* CHANGE HISTORY
NEW PACKAGE IS ADDED TO COPY FROM MAINTAINANCE TABLES TO PROCESSING TABLES 
*/


FUNCTION FN_COPY_ON_AUTH(P_actrowid  IN VARCHAR2,
				  		 pCallfuncid  in VARCHAR2,
				  		 L_ERR_CODE OUT VARCHAR2) RETURN BOOLEAN  ;


END;


/
CREATE or replace SYNONYM olpkss_copy_on_auth FOR olpks_copy_on_auth
/