create or replace trigger ol_trigdeletezeroposition
/*----------------------------------------------------------------------------------------------------
**
** File Name    : ol_trigdeletezeroposition.TRG
**
** Module       : CS
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
before insert or update on XXCONTRACT_POSN
FOR EACH ROW BEGIN
IF :NEW.c_pos_dl_ccy = 0 AND :NEW.c_pos_agn_ccy = 0 THEN
	:NEW.c_mkt_bas_ccy :=0;
	:NEW.c_mkt_bas_rt :=0;
	:NEW.base_pl_eqvt :=0;
	:NEW.base_pl_rt :=0;
	:NEW.effective_rt :=0;
	:NEW.last_reval_rt :=0;
	:NEW.last_reval_profit :=0;
	:NEW.med_profit :=0;
	:NEW.yed_profit :=0;
END IF;
END;
/