create or replace trigger ol_floating_rates_trg
/*----------------------------------------------------------------------------------------------------
**
** File Name    : ol_floating_rates_trg.TRG
**
** Module       : CS
**
**	This source is part of the Oracle Banking Corporate Lending  Software Product.   
**	Copyright © 2007 - 2018  Oracle and/or its affiliates.  All rights reserved.   
**	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form 
or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated
in any language or computer language, without the prior written permission of Oracle and/or its affiliates.
**	Oracle Financial Services Software Limited.
**	Oracle Park, Off Western Express Highway,
**	Goregaon (East), 
**	Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
**
**  Changed By         :Akhila Samson
**  Changed on         :27-Jun-2023
**  Change Description :Changing to editioning view name instead of synonym.
**  Search String      :Bug#35222052
*/


before insert or update
on  --lftbs_contract_interest --Bug#35222052
lftb_contract_interest --Bug#35222052
for each row
begin
if :new.rate_type = 'X' and :new.rate_code is null and :new.rate is
null then
	:new.rate := 0;
end if;
if :new.rate_type = 'F' and :new.spread is null then
	:new.spread := 0;
end if;
end;
/