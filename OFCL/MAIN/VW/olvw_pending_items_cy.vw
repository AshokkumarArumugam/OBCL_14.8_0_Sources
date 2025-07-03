CREATE OR REPLACE force VIEW olvw_pending_items_cy ( BR, 
MD, RN, MT, EV, 
ID ) AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_pending_items_cy.VW
**
** Module       : CURRENCY MAINTENANCE
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
*/
 select  branch_code br,'OL' md,ccy1||ccy2  rn,'' mt,'Unauthorized' ev , maker_id  id
from cytms_rates_master where auth_stat = 'U'
/
create or replace synonym olvws_pending_items_cy for olvw_pending_items_cy
/