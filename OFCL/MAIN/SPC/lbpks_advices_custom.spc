CREATE OR REPLACE PACKAGE lbpks_advices_custom AS

/*----------------------------------------------------------------------------------------------------
**
** File Name	: lbpks_advices_custom.SPC
**
** Module		: LS
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

/*----------------------------------CHANGE HISTORY----------------------------------

    **Changed By         : Palanisamy M
    **Date               : 11-Apr-2023
    **Change Description : Hook for Fn_Gen_Int_Revn_Adv
    **Search String      : Bug#35273659	
  
------------------------------------END CHANGE HISTORY-------------------------------------
*/

FUNCTION FN_PRE_GEN_INT_REVN_ADV
(

	P_CUR	oltbs_dly_msg_out%ROWTYPE

)RETURN BOOLEAN;

FUNCTION FN_POST_GEN_INT_REVN_ADV
(

	P_CUR	oltbs_dly_msg_out%ROWTYPE

)RETURN BOOLEAN;

END lbpks_advices_custom;
/
CREATE or replace SYNONYM lbpkss_advices_custom FOR lbpks_advices_custom
/