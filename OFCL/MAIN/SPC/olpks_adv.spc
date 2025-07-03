create or replace package olpks_adv is
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_adv.SPC
**
** Module		: LD
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
--Bug#26499767 Starts
   PROCEDURE Pr_Set_Skip_Kernel;
   PROCEDURE Pr_Set_Activate_Kernel;
   PROCEDURE Pr_Set_Skip_Cluster;
   PROCEDURE Pr_Set_Activate_Cluster;
   FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;
--Bug#26499767 Ends

function ldadv_input (
p_dly_msg_cur in out olpkss_messaging.module_proc_curtype)
return boolean;

end olpks_adv;
/
create or replace synonym olpkss_adv for olpks_adv
/