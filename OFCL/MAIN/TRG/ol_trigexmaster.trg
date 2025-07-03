create or replace trigger ol_trigexmaster
/*----------------------------------------------------------------------------------------------------
**
** File Name    : ol_trigexmaster.TRG
**
** Module       : FX
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
before insert or update on XXEXCHANGE_MASTER
for each row
begin
if :new.volume is null then
    :new.volume:=0;
end if;
end;
/