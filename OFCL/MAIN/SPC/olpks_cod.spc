create or replace package olpks_cod as
/* ----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_cod.SPC
**
** Module		: LOANS AND DEPOSITS
**
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
--------------------------------------------------------------------
/*   		olpks_cod  PACKAGE SPECIFICATION 	*/
--------------------------------------------------------------------



function fn_cod_adv(
	cur	oltbs_dly_msg_out%ROWTYPE) return integer;

procedure pr_ins;

end olpks_cod;
/
-- syntax corrected for creating synonym.PHPCBC changes TIL NO 64
Create or replace Synonym olpkss_cod for olpks_cod
/