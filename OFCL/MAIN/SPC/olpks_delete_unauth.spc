CREATE OR REPLACE PACKAGE olpks_delete_unauth 
AS

/*---------------------------------------------------------------------------------
**
** File Name	: olpks_delete_unauth.SPC
**
** Module		: CS
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

FUNCTION	fn_delete_unauth_txns
	(
	p_branch_code		IN		oltms_branch.branch_code%TYPE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

END olpks_delete_unauth;
/
CREATE or replace SYNONYM olpkss_delete_unauth FOR olpks_delete_unauth
/