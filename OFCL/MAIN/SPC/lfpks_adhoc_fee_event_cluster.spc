CREATE OR REPLACE PACKAGE lfpks_adhoc_fee_event_Cluster AS
  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lfpks_adhoc_fee_event_cluster.spc
  **
  ** Module   : LF
  **
    This source is part of the Oracle Flexcube Corporate Lending  Software Product.
    Copyright © 2016 , Oracle and/or its affiliates.  All rights reserved.
    No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, 
	mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written 
	permission of Oracle and/or its affiliates.
  
    Oracle Financial Services Software Limited.
    Oracle Park, Off Western Express Highway,
    Goregaon (East),
    Mumbai - 400 063, India.
  ----------------------------------------------------------------------------------------------------
		
    Changed By         : Akhila Samson
    Changed On         : 13-Mar-2023
    Change Description : Added hook for Fn_Compute_Schedule_Dates
    Search String      : OBCL_14.7_SUPP#35088099
	
  */
 --OBCL_14.7_SUPP#35088099 Start
FUNCTION Fn_Pre_Compute_Schedule_Dates(p_Start_Date         IN DATE,
                                     p_Value_Date         IN DATE,
                                     p_Maturity_Date      IN DATE,
                                     p_Holiday_Ccy        IN VARCHAR2,
                                     p_Frequency          IN VARCHAR2,
                                     p_Month_End_Ind      IN VARCHAR2, 
                                     p_Frequency_Units    IN NUMBER,
                                     p_No_Of_Schedules    IN NUMBER,
                                     p_Ignore_Holiday     IN VARCHAR2,
                                     p_Forward_Backward   IN VARCHAR2,
                                     p_Move_Across_Month  IN VARCHAR2,
                                     p_Cascade_Movement   IN VARCHAR2,
                                     p_Ty_Schedule_Date   IN OUT lfpks_adhoc_fee_event.Ty_Schedule_Date,
                                     p_Holiday_Check      IN CHAR,
                                     p_Holiday_Chk_Failed OUT BOOLEAN,
                                     p_Error_Code         OUT VARCHAR2,
									 p_Fc_List           IN VARCHAR2 DEFAULT NULL,
									 p_pay_by_days IN NUMBER DEFAULT 0 )
    RETURN BOOLEAN;
	
FUNCTION Fn_Post_Compute_Schedule_Dates(p_Start_Date         IN DATE,
                                     p_Value_Date         IN DATE,
                                     p_Maturity_Date      IN DATE,
                                     p_Holiday_Ccy        IN VARCHAR2,
                                     p_Frequency          IN VARCHAR2,
                                     p_Month_End_Ind      IN VARCHAR2, 
                                     p_Frequency_Units    IN NUMBER,
                                     p_No_Of_Schedules    IN NUMBER,
                                     p_Ignore_Holiday     IN VARCHAR2,
                                     p_Forward_Backward   IN VARCHAR2,
                                     p_Move_Across_Month  IN VARCHAR2,
                                     p_Cascade_Movement   IN VARCHAR2,
                                     p_Ty_Schedule_Date   IN OUT lfpks_adhoc_fee_event.Ty_Schedule_Date,
                                     p_Holiday_Check      IN CHAR,
                                     p_Holiday_Chk_Failed OUT BOOLEAN,
                                     p_Error_Code         OUT VARCHAR2,
									 p_Fc_List           IN VARCHAR2 DEFAULT NULL,
									 p_pay_by_days IN NUMBER DEFAULT 0 )
    RETURN BOOLEAN;
	
--OBCL_14.7_SUPP#35088099 End
END lfpks_adhoc_fee_event_Cluster;
/
CREATE or replace SYNONYM lfpkss_adhoc_fee_event_Cluster FOR lfpks_adhoc_fee_event_Cluster
/