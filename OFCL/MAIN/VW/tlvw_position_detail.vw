CREATE OR REPLACE FORCE VIEW tlvw_position_detail
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : tlvw_position_detail.VW
**
** Module       : LT-SECONDARY LOAN TRADING
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
---------------------------------------------------------------------------------------------------
*/
/* CHANGE-HISTORY
19-OCT-2008 FLEXCUBE V.CL Release 7.4 ,New Unit Developed for Position Details
17-jun-2009 FLEXCUBE V.CL Release 7.5 LOT1.1 Multiple Expense Code Changes
28-APR-2011 Flexcube V.CL Release 7.9, FS Volume02 Tag07, CFPI Migration, Changes to display FirmAccount in the trade draft screen's PI LOV
07-Jan-2020 OBCL_14.4#SLT Sub Participation changes 
*/
(
SELECT	a.Position_Identifier
	,a.Portfolio
	,b.Branch
	,b.Desk_Code
	--,b.Expense_Code--FLEXCUBE V.CL Release 7.5 LOT1.1 Multiple Expense Code Changes
	,a.Position_Qualifier
	,a.Identifier_Type
	,c.desk_type
	,a.Record_Stat
	,a.Auth_Stat
	,b.FIRM_ACCT_MNEMONIC--28-APR-2011 Flexcube V.CL Release 7.9, FS Volume02 Tag07, CFPI Migration, Changes
	,a.LMA_PARTICIPATION --OBCL_14.4#SLT Sub Participation Chnages added
FROM	TLTM_POSITION_IDENTIFIER a,TLTM_PORTFOLIO b,lbtm_desk c
WHERE	a.Portfolio = b.Portfolio
AND	b.Desk_Code = c.Desk_Code
)
/
CREATE OR REPLACE SYNONYM tlvws_position_detail FOR tlvw_position_detail
/