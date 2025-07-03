CREATE OR REPLACE PACKAGE olpks_status2_cluster AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_status2_cluster.SPC
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
------------------------------------END CHANGE HISTORY-------------------------------------
*/

FUNCTION fn_pre_get_any_sch_days(P_CONTRACT_REF_NO IN VARCHAR2,
		P_COMPONENT           IN     VARCHAR2,
		P_PROCESSING_DATE     IN     DATE,
		P_SCHEDULE_DATE       IN     DATE,
		P_ERR_CODE            IN OUT VARCHAR2,
		P_ERR_PARAM           IN OUT VARCHAR2,
		L_TB_CLUSTER_DATA      IN OUT GLOBAL.TY_TB_CLUSTER_DATA)
	RETURN BOOLEAN;
	
	FUNCTION fn_post_get_any_sch_days(P_CONTRACT_REF_NO IN     VARCHAR2,
			P_COMPONENT            IN     VARCHAR2,
			P_PROCESSING_DATE      IN     DATE,
			P_SCHEDULE_DATE        IN     DATE,
			P_ERR_CODE             IN OUT VARCHAR2,
			P_ERR_PARAM            IN OUT VARCHAR2,
			L_TB_CLUSTER_DATA      IN OUT GLOBAL.TY_TB_CLUSTER_DATA)
	RETURN BOOLEAN;

END olpks_status2_cluster;
/


CREATE or replace SYNONYM olpkss_status2_cluster FOR olpks_status2_cluster
/