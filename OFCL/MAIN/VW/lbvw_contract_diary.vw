CREATE OR REPLACE FORCE VIEW lbvw_contract_diary AS 
/*----------------------------------------------------------------------------------------------------
**
** File Name	: lbvw_contract_diary.VW
**
** Module      : Syndication Loans and Commitments
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
Change History 	
----------------------------------------------------------------------------------------------------
*/
( SELECT A.*,B.BRANCH,B.DEPARTMENT_CODE FROM oltbs_contract_diary_event A, oltbs_contract B 
	WHERE A.CONTRACT_REF_NO = B.CONTRACT_REF_NO )
/