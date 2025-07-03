Create Or Replace View Olvw_Liq_Breakup(Refno,Esn,Comp,Amtdue,Amtpaid,Taxpaid) As
/*----------------------------------------------------------------------------------------------------
**
** File Name    : Olvw_Liq_Breakup.vw
** Module       : LOANS and SYNDICATION	
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
Select Refno,Esn,Comp,Amtdue,Amtpaid,Taxpaid From(
(Select 
	Contract_Ref_No  Refno,
	Event_Seq_No     Esn,
	Component        Comp, 
	Amount_Due 		 Amtdue,
	Amount_Paid  	 Amtpaid,
	Tax_Paid 		 Taxpaid
From Oltb_Contract_Liq) 
Union
(Select 
	Contract_Ref_No  Refno,
	Event_Seq_No     Esn,
	Component        Comp, 
	Amount_Due 		 Amtdue,
	Amount_Paid  	 Amtpaid,
	0	 Taxpaid
From Lftb_Contract_Liq) 
Union
(Select 
	Contract_Ref_No  Refno,
	Event_Seq_No     Esn,
	Component        Comp, 
	Charge_Amount    Amtdue,
	Charge_Amount  	 Amtpaid,
	0		 Taxpaid
From Lftb_Charge_Liqd_Detail) 
)
/
Create Or Replace Synonym Olvws_Liq_Breakup FOR Olvw_Liq_Breakup
/