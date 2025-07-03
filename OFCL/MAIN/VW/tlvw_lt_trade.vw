create or replace FORCE view tlvw_lt_trade 
as	
/*----------------------------------------------------------------------------------------------------
**
** File Name	: tlvw_lt_trade.VW
**
** Module	: LT
**
**
This source is part of the Oracle Banking Corporate Lending  Software Product. 
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted 
in any form or by any means, electronic, mechanical, photographic, graphic, optic recording
or otherwise, translated in any language or computer language, without the prior written permission 
of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
------------------------------------------------------------------------------------------
*/		
select * from OLTB_LT_TRADE
union 
select * from OLTB_LT_TRADE_HISTORY
/
create OR REPLACE synonym tlvws_lt_trade  for tlvw_lt_trade
/