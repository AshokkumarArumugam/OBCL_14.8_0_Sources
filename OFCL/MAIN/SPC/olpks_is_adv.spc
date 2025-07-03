Create or Replace PACKAGE olpks_is_adv
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : olpks_is_adv.SPC
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
CHANGE_HISTORY
FCC4.2 April 2003 18-02-2003  A New message type RQST_FOR_CANC added to generate 192/292 Swift message on reversal of the contract.
					function fn_get_swift_msg_type added to specification .
CHANGE_HISTORY
  Changed By         : Revathi Dharmalingam
  Changed On         : 05-Jun-2020
  Search String      : OBCL_14.3_SUPPORT_BUG#31450162    
  Change Reason      : Added code to populate BIC in Payment message for Tag 56,57,58.
                          1.Added new function to check valid bic
*/

	Function Fn_mk_adv_input 
				( p_module_proc_cur IN olpkss_messaging.module_proc_curtype )			
	Return Boolean;

Function fn_get_swift_msg_type( p_modproc_rec  IN     oltbs_dly_msg_out%Rowtype 
		    	     	 	,p_esn		     IN     oltbs_settlements.event_seq_no%Type
					,p_gen_msgtype OUT   oltms_msg_type.SWIFT_MSG_TYPE%type
							 )
return Boolean ;

--OBCL_14.3_SUPPORT_BUG#31450162 Changes starts
 FUNCTION fn_is_bic_code(p_field    IN VARCHAR2                        
                          ) RETURN BOOLEAN;
--OBCL_14.3_SUPPORT_BUG#31450162 Changes ends

End olpks_is_adv;
/
Create or replace synonym olpkss_is_adv for olpks_is_adv
/