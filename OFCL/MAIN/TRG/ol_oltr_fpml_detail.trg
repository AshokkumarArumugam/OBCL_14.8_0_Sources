CREATE OR REPLACE TRIGGER ol_oltr_fpml_detail
/*----------------------------------------------------------------------------------------------------
This source is part of the Oracle Banking Corporate Lending  Software Product. 
Copyright © 2007 - 2018  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted 
in any form or by any means, electronic, mechanical, photographic, graphic, optic recording
or otherwise, translated in any language or computer language, without the prior written permission 
of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
BEFORE INSERT ON OLTB_FPML_MSG_DETAIL
FOR EACH ROW
BEGIN
	:new.insert_time := SYSDATE;
EXCEPTION
WHEN OTHERS THEN
	debug.pr_debug('OL','Error-'||SQLERRM);
END;
/