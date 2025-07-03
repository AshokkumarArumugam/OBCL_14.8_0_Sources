CREATE OR REPLACE VIEW Olzm_Fincentre_Hol_Master AS
/*-------------------------------------------------------------------------------------------------
**
** File Name	: Olzm_Fincentre_Hol_Master.vw
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
----------------------------------------------------------------------------------------------------
*/
SELECT Once_Auth,
       Maker_Id,
       Maker_Dt_Stamp,
       Checker_Id,
       Checker_Dt_Stamp,
       Record_Stat,
       Mod_No,
       Auth_Stat,
       YEAR,
       Financial_Center Fin_Centre,
       Weekly_Holidays,
       Unexp_Hol
  FROM Sttms_Fic_Hol_Master
/
create or replace synonym Oltm_Fincentre_Hol_Master for Olzm_Fincentre_Hol_Master
/
create or replace synonym Oltms_Fincentre_Hol_Master for Olzm_Fincentre_Hol_Master
/