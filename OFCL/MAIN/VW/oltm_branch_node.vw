CREATE OR REPLACE FORCE VIEW oltm_branch_node ( BRANCH_CODE, 
NODE ) AS
/*
-----------------------------------------------------------------------------------------------
**
** File Name    : oltm_branch_node.VW
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
*/
select branch_code, host_code node
from oltm_branch
/
CREATE OR REPLACE synonym oltms_branch_node for oltm_branch_node
/