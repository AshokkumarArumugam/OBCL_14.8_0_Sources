CREATE OR REPLACE
package olpks_scheduler as
/*----------------------------------------------------------------------------------------------------
**
** File Name    : olpks_scheduler.SPC
**
** Module       : INTERFACES
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

FUNCTION FN_CREATE_JOB
		(
 p_brn VARCHAR2,
			p_brstat		VARCHAR2,
			p_error_code IN OUT	VARCHAR2,
			p_param	     IN OUT	VARCHAR2)
RETURN BOOLEAN ;
FUNCTION FN_SET_NEXT_DATE
		(
 p_brn VARCHAR2,
			p_brstat			VARCHAR2,
			p_error_code IN OUT	VARCHAR2,
			p_param		 IN OUT	VARCHAR2)
RETURN BOOLEAN ;
end;
/

create or replace synonym olpkss_scheduler for olpks_scheduler
/