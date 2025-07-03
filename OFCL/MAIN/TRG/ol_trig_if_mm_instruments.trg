create or replace trigger ol_trig_if_mm_instruments
/*----------------------------------------------------------------------------------------------------
**
** File Name    : ol_trig_if_mm_instruments.trg
**
** Module       : INTERFACE
**
**	This source is part of the Oracle Banking Corporate Lending  Software Product.   
**	Copyright © 2007 - 2018  Oracle and/or its affiliates.  All rights reserved.   
**	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form 
**  or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated 
**  in any language or computer language, without the prior written permission of Oracle and/or its affiliates.
**	Oracle Financial Services Software Limited.
**	Oracle Park, Off Western Express Highway,
**	Goregaon (East), 
**	Mumbai - 400 063, India.
Copyright © 1997-2001 by i-flex solutions limited.
----------------------------------------------------------------------------------------------------
*/
after update on INSTRUMENT 
for each row
declare
tmpcount integer;
begin

	if :new.maint_flag='U' and :old.maint_flag <> 'U' then
		select count(*) into tmpcount  from oltbs_ext_sys_modules
		where 
			system_id = 'MMAKER'		and
			module = :new.product_code	and
			product_code = :new.instru_code;

		if tmpcount = 0 and :new.product_code in ('FX','MM') then
		
			insert into oltbs_ext_sys_modules
			values ('MMAKER',:new.product_code, :new.instru_code);
		end if;
	end if;
end;
/