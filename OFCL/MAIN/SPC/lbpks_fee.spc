create or replace package lbpks_fee as
/*-----------------------------------------------------------------------------------
**
** File Name	: lbpks_fee.SPC
** Module	: LOAN SYNDICATION
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
-------------------------------------------------------------------------------------
*/

/*----------------------------------CHANGE HISTORY----------------------------------
------------------------------------END CHANGE HISTORY-------------------------------------
*/




function Ls_fn_fee_adv(
	cur	oltbs_dly_msg_out%ROWTYPE) return integer;

procedure Ls_pr_ins;

end lbpks_fee;
/
create or replace synonym lbpkss_fee for lbpks_fee
/