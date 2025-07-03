CREATE or REPLACE PACKAGE olpks_core_translation AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : olpks_core_translation
**
** Module       : CORE SERVICES
**
This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
Change History
06-Jun-2016 OFCL standalone changes, commented not required code. Search string--- OFCL12.2 Not required
*/
-- OFCL12.2 Not required
/*
function fn_ext_int (
			p_source_code 	varchar2,
			p_entity		varchar2,
			p_ext			varchar2) return varchar2 ;

function fn_int_ext (	
			p_source_code 		varchar2,
			p_entity		varchar2 , 
			p_int			varchar2) return varchar2 ;
*/ -- OFCL12.2 Not required			
function fn_impact_amt (
			p_period_code	varchar2 ,
			p_fin_cycle 	varchar2 ,
			p_value_date	date ,
			p_amt			number 
			)
			return number;
--PRAGMA RESTRICT_REFERENCES (fn_ext_int, WNDS, WNPS); -- OFCL12.2 Not required
--PRAGMA RESTRICT_REFERENCES (fn_int_ext, WNDS, WNPS);-- OFCL12.2 Not required
PRAGMA RESTRICT_REFERENCES (fn_impact_amt ,WNDS, WNPS);
END;
/
CREATE or replace SYNONYM olpkss_core_translation FOR olpks_core_translation
/