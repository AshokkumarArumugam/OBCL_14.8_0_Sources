CREATE OR REPLACE PACKAGE olpks_is_adv2
AS 
/*----------------------------------------------------------------------------------------------------
**
** File Name    : olpks_is_adv2.SPC
**
** Module       : SETTLEMENT INSTRUCTIONS
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
/*
Changes History

Added New function fn_mt104 to generate the Direct Debit Message
*/


FUNCTION fn_mt204 
		(
		p_modproc_rec 	IN 		oltbs_dly_msg_out%ROWTYPE,
		p_is_msgho_rec 	IN OUT	oltbs_msgho%ROWTYPE
		)
		RETURN BOOLEAN ;

FUNCTION fn_mt210 
		(
		p_modproc_rec 	IN 		oltbs_dly_msg_out%ROWTYPE,
		p_is_msgho_rec 	IN OUT	oltbs_msgho%ROWTYPE
		)
		RETURN BOOLEAN ;

FUNCTION fn_cover 
		(
		p_modproc_rec 	IN 		oltbs_dly_msg_out%ROWTYPE,
		p_is_msgho_rec 	IN OUT	oltbs_msgho%ROWTYPE
		)
		RETURN BOOLEAN ;

FUNCTION Fn_tx100 
		(
		p_modproc_rec 	IN 	oltbs_dly_msg_out%ROWTYPE,
		p_is_msgho_rec 	IN 	oltbs_msgho%ROWTYPE
		)
		RETURN BOOLEAN ;

FUNCTION Fn_tx202 
		(
		p_modproc_rec 	IN 	oltbs_dly_msg_out%ROWTYPE,
		p_is_msgho_rec 	IN 	oltbs_msgho%ROWTYPE
		)
		RETURN BOOLEAN ;
--
--  FCC 42 Ops Changes Starts 
--
FUNCTION fn_mt104 
		(
		p_modproc_rec 	IN 		oltbs_dly_msg_out%ROWTYPE,
		p_is_msgho_rec 	IN OUT	oltbs_msgho%ROWTYPE
		)
		RETURN BOOLEAN ;
--
--  FCC 42 Ops Changes Ends 
--


END  olpks_is_adv2;
/
CREATE or replace SYNONYM olpkss_adv2 FOR olpks_is_adv2
/