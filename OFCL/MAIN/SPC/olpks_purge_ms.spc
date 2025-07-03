create or replace package olpks_purge_ms as
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_purge_ms.SPC
**
** Module		: MESSAGES
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



procedure pr_purge(
	pm_branch		oltms_branch.branch_code%type,
	pm_date			date,
	pm_action		varchar2);

function fn_purge_contract(
	pm_ref		oltbs_dly_msg_out.reference_no%type) return boolean;

end olpks_purge_ms;
/
create or replace synonym olpkss_purge_ms for olpks_purge_ms
/