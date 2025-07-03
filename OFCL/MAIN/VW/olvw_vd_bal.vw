CREATE OR REPLACE force VIEW olvw_vd_bal
AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_vd_bal.VW
**
** Module       : CORE ENTITIES
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
**
	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
-----------------------------------------------------------------------------------------------
*/
/*
CHANGE HISTORY
24-05-2002 Fcc4.0 June2002 related changes For system ACCOUNTS the Value dated balance will be taken from Gltb_unit_vd_bal
*/
 SELECT * FROM oltbs_vd_bal V
WHERE (v.dr_tur <> 0 OR v.cr_tur <> 0)
/
CREATE or replace SYNONYM olvws_vd_bal
FOR olvw_vd_bal
/