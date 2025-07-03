CREATE OR REPLACE FORCE VIEW olvw_tool_module ( PRODUCT, 
MODTYPE, MODID, NEXT_ITEMID, OWNER, 
MODNAME, CREATOR, CREATE_DATE, CREATE_VER, 
MODIFIER, MOD_DATE, MOD_VER, COPYRIGHT, 
REQ_ROLE, TCS_VER, VGS_VER, DE_VER, 
ROS_VER ) AS 
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_tool_module.VW
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
select "PRODUCT","MODTYPE","MODID","NEXT_ITEMID","OWNER","MODNAME","CREATOR","CREATE_DATE","CREATE_VER","MODIFIER","MOD_DATE","MOD_VER","COPYRIGHT","REQ_ROLE","TCS_VER","VGS_VER","DE_VER","ROS_VER" from TOOL__MODULE
  where owner = user or modid in (select modid from olvw_tool_accessible)
  with check option
/
Create OR REPLACE Synonym olvws_tools_module for olvw_tool_module
/