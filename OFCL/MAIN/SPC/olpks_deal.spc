create or replace package olpks_deal as
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_deal.SPC
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


function fn_dealslip_adv(
	cur	oltbs_dly_msg_out%ROWTYPE) return integer;

procedure pr_ins;

end olpks_deal;
/
create or replace synonym olpkss_deal for olpks_deal
/