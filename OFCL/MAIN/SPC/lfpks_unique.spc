CREATE OR REPLACE PACKAGE lfpks_unique IS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : lfpks_unique
**
** Module       : INTEREST, COMMISSION, CHARGES, FEES (ICCF)
**
This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/


Function fn_ratecode(ratecode in varchar2) return boolean;
Function fn_pdtgroup (pdt_group in varchar2) return boolean;
Function fn_userref (user_ref_number in varchar2) return boolean;
Function fn_template ( branch_code in varchar2, template_code  in varchar2, module_code IN varchar2) return boolean;
Function fn_pdtcode ( pdt_code  in varchar2) return boolean ;
Function fn_pdt_active ( pdt_group_code in varchar2) return boolean ;
Function fn_contracts_active (pdt_code in varchar2) return boolean ;
Function fn_contracts_rate_active( ratecode in varchar2) return boolean;
END lfpks_unique;
/
CREATE or replace SYNONYM lfpkss_unique FOR lfpks_unique
/