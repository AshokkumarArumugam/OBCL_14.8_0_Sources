CREATE or replace VIEW tlvw_agency_type AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: tlvw_agency_type.VW
**
** Module	: TL
**
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
------------------------------------------------------------------------------------------
*/
  SELECT agency_type, CUSIP_NO                                                                                                                                                              
        FROM  oltbs_contract_master a,oltbs_contract b                                                        
        WHERE  a.contract_ref_no = b.contract_ref_no                                                           
       /* AND   a.cusip_no = :BLK_LSTB_CUSIP_SWING_MASTER.CUSIP_NO  */                                            
        AND   a.product_type = 'C'                                                                            
     AND  a.module = 'LB'
/
create OR REPLACE synonym TLVWS_AGENCY_TYPE for tlvw_agency_type
/