CREATE OR REPLACE FORCE VIEW lbvw_pay_recv_master
AS
/*-------------------------------------------------------------------------------------------------
**
** File Name	: lbvw_pay_recv_master.VW
**
** Module	: LOANS SYNDICATION
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
/*------------------------------------------CHANGE HISTORY----------------------------------
DATE		VERSION NO	CODE		SFR	DESCRIPTION
25-SEP-2006	Flexcube V.CL Release 7.1		View Created for the detail of pay recv 
--------------------------------------------------------------------------------------------
*/
select lpd.*
from lbtbs_pay_recv_due_master lpd,oltbs_contract cc
where lpd.contract_ref_no = cc.contract_ref_no
and cc.contract_status in ('A','L') 
/
CREATE OR REPLACE SYNONYM lbvws_pay_recv_master FOR lbvw_pay_recv_master
/