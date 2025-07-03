CREATE OR REPLACE TRIGGER ol_oltr_dly_msg_in_org_ref
/*----------------------------------------------------------------------------------------------------
**
** File Name	:ol_oltr_dly_msg_in_org_ref.trg
**
** Module	: MS
**
** This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2018 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
   **    Modified By         : Ragavendra 
   **    Modified On         : 21-Mar-2016
   **    Modified Reason     : Modified the Copy right and Change history format as trigger was not compiling.
   **
   **  Changed By         :Akhila Samson
   **  Changed on         :27-Jun-2023
   **  Change Description :Changing to editioning view name instead of synonym.
   **  Search String      :Bug#35222052
   */

--FCC3.9 CITIPLC SFR #618 Changes to restore original reference..Bsk.

before insert on --oltb_dly_msg_in --Bug#35222052
oltb_dly_msg_in --Bug#35222052
for each row
begin
	if :new.original_reference is null then
		:new.original_reference := :new.reference_no;
	end if;
end ol_oltr_dly_msg_in_org_ref;
/