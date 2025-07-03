create or replace trigger ol_trigpositions
/*----------------------------------------------------------------------------------------------------
**
** File Name    : ol_trigpositions.TRG
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
----------------------------------------------------------------------------------------------------
*/
before  insert or update on XXPOSITIONS
for each row
begin
if :new.c_pos_dl_ccy is null then
		:new.c_pos_dl_ccy :=0;
end if;
if :new.c_pos_agn_ccy is null then
		:new.c_pos_agn_ccy := 0;
end if;
if :new.o_pos_dl_ccy is null then
		:new.o_pos_dl_ccy :=0;
end if;
if :new.o_pos_agn_ccy is null then
		:new.o_pos_agn_ccy :=0;
end if;
if :new.dl_ob_limit is null then
		:new.dl_ob_limit:=0;
end if;
if :new.dl_os_limit is null then
		:new.dl_os_limit:=0;
end if;
if :new.on_ob_limit is null then
		:new.on_ob_limit:=0;
end if;
if :new.on_os_limit is null then
		:new.on_ob_limit:=0;
end if;
if :new.effective_rt is null then
		:new.effective_rt:=0;
end if;
if :new.med_profit is null then
		:new.med_profit:=0;
end if;
if :new.yed_profit is null then
		:new.yed_profit:=0;
end if;
if :new.lst_reval_rt is null then
		:new.lst_reval_rt:=0;
end if;
if :new.lst_rvl_prft is null then
		:new.lst_rvl_prft:=0;
end if;
end;
/