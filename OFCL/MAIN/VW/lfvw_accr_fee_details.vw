CREATE OR REPLACE VIEW lfvw_accr_fee_details
AS
/*
----------------------------------------------------------------------------------------------------
**
** File Name    : lfvw_accr_fee_details.vw
** Module       : LD
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
----------------------------------------------------------------------------------------------------
*/
(SELECT a.Contract_Ref_No,
       a.Component,
       a.Schedule_Date,
       Decode(a.Accrual_Method,
              'S',
              'Straight Line',
              'Y',
              'Yield',
              'F',
              'Flat Amount') Accrual_Method,
       SUM(a.Calculated_Amount) Calculated_Amount,
       b.Ccy,
       a.Module
  FROM Lftbs_Accr_Fee_Detail a,
       Lftbs_Accr_Fee_Master b
 WHERE a.Contract_Ref_No = b.Contract_Ref_No AND
       a.Component = b.Component
 GROUP BY a.Contract_Ref_No,
          a.Component,
          a.Schedule_Date,
          a.Accrual_Method,
          b.Ccy,
          a.Module
)
/
CREATE OR REPLACE SYNONYM lfvws_accr_fee_details FOR lfvw_accr_fee_details
/