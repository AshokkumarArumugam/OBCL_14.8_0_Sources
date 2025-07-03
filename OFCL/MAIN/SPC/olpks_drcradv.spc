CREATE OR REPLACE PACKAGE olpks_drcradv AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_drcradv.SPC
**
** Module		: LOANS and DEPOSITS
**
This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
  **Changed By         : Gomathi G
  **Date               : 24-OCT-2019
  **Change Description : HOOKS FOR OL ADVICES
  **Search String      : OBCL_14.3_BUG#29583867

----------------------------------------------------------------------------------------------------
*/
 -- OBCL_14.3_BUG#29583867 changes start
  PROCEDURE Pr_Skip_Handler(P_Stage IN VARCHAR2);
  PROCEDURE Pr_Set_Skip_Kernel;
  PROCEDURE Pr_Set_Activate_Kernel;
  PROCEDURE Pr_Set_Skip_Cluster;
  PROCEDURE Pr_Set_Activate_Cluster;
  FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;
-- OBCL_14.3_BUG#29583867 changes end

FUNCTION fn_drcr_adv
				( p_msg_row		IN	oltbs_dly_msg_out%ROWTYPE
				, p_drcr_ind	IN	CHAR
				, p_msg_info	IN	CHAR
				, p_err_code	IN OUT	ertbs_msgs.err_code%TYPE
				) RETURN BOOLEAN;

END olpks_drcradv;
/
CREATE or replace SYNONYM olpkss_drcradv FOR olpks_drcradv
/