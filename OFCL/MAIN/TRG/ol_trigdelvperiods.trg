create or replace trigger ol_trigdelvperiods
/*----------------------------------------------------------------------------------------------------
**
** File Name    : ol_trigdelvperiods.trg.TRG
**
** Module       : DE
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
after  update of maint_flag on OLLV_PERIOD
declare
    intCount smallint := 1 ;
    Fraction number := 0;
    CURSOR PERIOD IS SELECT * from OLLV_PERIOD
		WHERE maint_flag = 'U' and status ='E'
		AND period_code != 'TODAY'
		ORDER BY product_code , period_code
		FOR UPDATE OF mat_Date ;
begin
	UPDATE OLLV_PERIOD set mat_date = 
	to_date( (to_char(mat_date , 'dd-Mon-yyyy') || ' 00:00:00') ,'dd-Mon-yyyy hh24:mi:ss');
	FOR Rec in PERIOD LOOP
		Fraction := 0 ; 
		Loop    
			select count(*) into intCount from OLLV_PERIOD dp
				where dp.product_code = Rec.product_code
				and   dp.mat_date = Rec.mat_date + Fraction 
				and   dp.period_code != Rec.period_code ;
			exit when intCount = 0 ;
			Fraction := Fraction + 0.0014 ;
		end loop;
		If Fraction != 0 then
			UPDATE OLLV_PERIOD set mat_date = mat_date + Fraction
			WHERE CURRENT OF PERIOD ;
		END IF ;
	end LOOP ;
end;
/