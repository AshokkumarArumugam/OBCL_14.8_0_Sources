CREATE OR REPLACE VIEW olvw_statement_day AS
/*
----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_statement_day.vw
**
** Module	: INTERFACE
**
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
  ----------------------------------------------------------------------------------------
  */
select to_char(add_months(to_date('01/01/1000', 'DD/MM/RRRR'), ind.l - 1),'MONTH') as day,ind.l as value , 'A' as indicator from dual descr,
(select l from (select level l from dual connect by level <= 12)) ind 
UNION  
select to_char(trunc(sysdate, 'D') + level, 'Day') as day, level as value, 'F' as indicator from dual a 
 connect by level <= 7 
UNION
select TO_CHAR(n) day, n value, 'D' as indicator
  from (select rownum n from dual connect by level <= 31)
 where n >= 1
/