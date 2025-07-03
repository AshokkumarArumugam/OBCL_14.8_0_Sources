CREATE OR REPLACE view Olzm_Fin_Centre AS
/*-------------------------------------------------------------------------------------------------
**
** File Name	: Olzm_Fin_Centre.vw
**
** Module	: LOANS SYNDICATION
**
**This source is part of the Oracle Flexcube Corporate Lending  Software Product. 
**Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
**No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted 
**in any form or by any means, electronic, mechanical, photographic, graphic, optic recording
**or otherwise, translated in any language or computer language, without the prior written permission 
**of Oracle and/or its affiliates. 
**Oracle Financial Services Software Limited.
**Oracle Park, Off Western Express Highway,
**Goregaon (East), 
**Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------*/
SELECT Financial_Center             Fin_Centre,
       Financial_Center_Description Fin_Centre_Desc,
       NULL                         Source_System,
       NULL                         Source_Fin_Centre,
	   NULL                         Auto_Auth,
       Record_Stat,
       Auth_Stat,
       Once_Auth,
       Mod_No,
       Maker_Id,
       Maker_Dt_Stamp,
       Checker_Id,
       Checker_Dt_Stamp
  FROM Sttm_Fin_Defn
/
create or replace synonym Oltm_Fin_Centre for Olzm_Fin_Centre
/
create or replace synonym Oltms_Fin_Centre for Olzm_Fin_Centre
/