create or replace view OLVW_INACTCUST_EXCEPTION as
/*-----------------------------------------------------------------------------------------------
**
** File Name    : OLVW_INACTCUST_EXCEPTION.VW
**
** Module       : OL
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
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
Select
* 
From oltb_inactcust_exception
where RETRYSTATUS = 'U'
/
create or replace synonym OLVWS_INACTCUST_EXCEPTION for OLVW_INACTCUST_EXCEPTION
/