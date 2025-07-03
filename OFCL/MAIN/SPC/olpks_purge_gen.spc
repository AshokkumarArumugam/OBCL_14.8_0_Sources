CREATE OR REPLACE PACKAGE olpks_purge_gen
AS
/*----------------------------------------------------------------------------------------------------
	**
	** File Name    : olpks_purge_gen.SQL
	**
	** Module       : CS
	**
This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.

---------------------------------CHANGE HISTORY---------------------------------------------------      
---------------------------------------------------------------------------------------------------
*/

FUNCTION fn_gen_purge_function
		(
		pm_errcode	IN OUT	VARCHAR2
		,pm_param	IN OUT	VARCHAR2
		)
RETURN BOOLEAN;
	
END;	
	
/
CREATE OR REPLACE SYNONYM olpkss_purge_gen	FOR 	olpks_purge_gen
/