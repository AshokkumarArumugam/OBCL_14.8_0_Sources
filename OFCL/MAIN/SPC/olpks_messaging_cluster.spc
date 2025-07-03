CREATE OR REPLACE PACKAGE olpks_messaging_cluster AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_messaging_cluster.SPC
**
** Module		: LOANS AND DEPOSITS
**
	This source is part of the Oracle Flexcube Corporate Lending  Software Product.   
	Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/

/*----------------------------------CHANGE HISTORY----------------------------------
**SFR Number         :
**Changed By         :
**Change Description :
**Search String      :

  Changed By         : Gomathi G
  Changed On         : 10-MAY-2021
  Change Description : Provided Pre and post hooks to to populate custom fields 'to and Cc
                       email address' in outgoing message browser
  Search String      : OBCL_14.4_SUPPORT_BUG#32865215
------------------------------------END CHANGE HISTORY-------------------------------------
*/
	--OBCL_14.4_SUPPORT_BUG#32865215 changes starts
	  FUNCTION fn_pre_insert_dly_msg_out(p_dly_msg_out 	IN OUT 	oltbs_dly_msg_out%ROWTYPE)
	   RETURN BOOLEAN;
	   FUNCTION fn_post_insert_dly_msg_out(p_dly_msg_out 	IN OUT 	oltbs_dly_msg_out%ROWTYPE)
	   RETURN BOOLEAN;
	--OBCL_14.4_SUPPORT_BUG#32865215 changes ends
	
END olpks_messaging_cluster;
/


CREATE or replace SYNONYM olpkss_messaging_cluster FOR olpks_messaging_cluster
/