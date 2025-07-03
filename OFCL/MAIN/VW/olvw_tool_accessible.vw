CREATE OR REPLACE FORCE VIEW olvw_tool_accessible ( PRODUCT, 
OWNER, MODID, GRANTEE ) AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_tool_accessible.VW
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
 select "PRODUCT","OWNER","MODID","GRANTEE" from XXTOOL__ACCESS
  where grantee = 'PUBLIC' or user like grantee
/
Create OR REPLACE Synonym olvws_tools_accessible for olvw_tool_accessible
/