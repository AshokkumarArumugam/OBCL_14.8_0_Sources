CREATE OR REPLACE FORCE VIEW oltm_cust_name
AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : oltm_cust_name.VW
**
** Module       : CORE ENTITIES
**
This source is part of the Oracle Banking Corporate Lending  Software Product. 
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted 
in any form or by any means, electronic, mechanical, photographic, graphic, optic recording
or otherwise, translated in any language or computer language, without the prior written permission 
of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
-----------------------------------------------------------------------------------------------
CHANGE HISTORY
06-MAR-2014 CITIUS#18734 System should display the list of investor during USERINPUT type of fee liquidation in Alphabetical order
	New View created to display investors in alhabetical order .
*/
SELECT customer_no cust_no,customer_name1, customer_name2 
FROM   oltm_customer
/
CREATE OR REPLACE SYNONYM oltms_cust_name FOR oltm_cust_name
/