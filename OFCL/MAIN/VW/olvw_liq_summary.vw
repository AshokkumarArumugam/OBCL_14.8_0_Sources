Create Or Replace View Olvw_Liq_Summary(Refno,Esn,Value_Date,Limit_Date,Tot_Paid, 
Constraint Olvw_Liq_Summary_Pk PRIMARY KEY (Refno,Esn,Value_Date,Limit_Date,Tot_Paid)RELY DISABLE NOVALIDATE) As
/*-----------------------------------------------------------------------------------------------
**
** File Name    : OLVW_LIQ_SUMMARY.VW
**
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
-----------------------------------------------------------------------------------------------
*/
Select  Refno,Esn,Value_Date,Limit_Date,Tot_Paid From(
(Select
	Contract_Ref_no Refno,
	Event_Seq_no Esn,
	Value_Date Value_Date,
	Limit_Date Limit_Date,
	Total_Paid Tot_Paid	
	From Oltbs_Contract_Liq_Summary)
Union
(Select
	Contract_Ref_no Refno,
	Event_Seq_no Esn,
	Value_Date Value_Date,
	Limit_Date Limit_Date,
	0 Tot_Paid	
	From Lftb_Contract_Liq_Summary)	
Union
(Select
	Contract_Ref_no Refno,
	Event_Seq_no Esn,
	Value_Date Value_Date,
	Transaction_Date Limit_Date,
	0 Tot_Paid	
	From Lftb_Charge_Liqd_Master
	Where Event ='LIQD'
)
)	
/
Create Or Replace Synonym Olvws_Liq_Summary FOR Olvw_Liq_Summary
/