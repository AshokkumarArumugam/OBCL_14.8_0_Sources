CREATE OR REPLACE PACKAGE olpks_date_addon AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olpks_date_addon.SPC
**
** Module       : CE
**
This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
-----------------------------------------------------------------------------------------------
*/

/* CHANGE HISTORY : 

SL.NO	DATE		VERSION	SITE 		CHANGES


*/

FUNCTION fn_ccy_working_day(p_ccy       VARCHAR2,
                            p_base_date DATE,
                            p_days      INTEGER,
			          p_prv_next  CHAR := 'N')
RETURN DATE;
FUNCTION fn_branch_working_day(p_brn VARCHAR2,
                               p_base_date DATE,
                               p_days      INTEGER,
			             p_prv_next  CHAR := 'N')
RETURN DATE;
FUNCTION fn_clg_working_day(p_clg       VARCHAR2,
                               p_base_date DATE,
                               p_days      INTEGER,
			             p_prv_next  CHAR := 'N')
RETURN DATE;
PRAGMA RESTRICT_REFERENCES(fn_ccy_working_day,WNDS,WNPS);
PRAGMA RESTRICT_REFERENCES(fn_branch_working_day,WNDS,WNPS);
PRAGMA RESTRICT_REFERENCES(fn_clg_working_day,WNDS,WNPS);
END olpks_date_addon;
/
create or replace synonym olpkss_date_addon for olpks_date_addon
/