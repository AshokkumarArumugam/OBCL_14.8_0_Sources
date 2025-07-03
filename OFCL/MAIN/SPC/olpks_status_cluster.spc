CREATE OR REPLACE PACKAGE olpks_status_cluster AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_status_cluster.SPC
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
	
	**Changed By         : Akhila Samson
    **Date               : 24-Mar-2023
    **Change Description : Added hook for Fn_Change_Contract_Status
    **Search String      : Bug#35216081

	**Changed By         : Balaji Gopal
    **Date               : 04-Jan-2024
    **Change Description : Created Hook Functions Fn_Pre_Process_For_a_Contract and Fn_Post_Process_For_a_Contract
    **Search String      : Bug#36113117
------------------------------------END CHANGE HISTORY-------------------------------------
*/

    -- Bug#36113117 Starts Here
    FUNCTION Fn_Pre_Process_For_a_Contract(p_Contract_Ref_No      IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                           p_Processing_Date      IN DATE,
                                           p_Authorization_Status IN Oltbs_Contract.Auth_Status%TYPE,
                                           p_Handoff_Action_Code  IN CHAR,
                                           p_Error_Code           IN OUT VARCHAR2,
                                           p_Error_Parameter      IN OUT VARCHAR2,
                                           p_Tb_Cluster_data      IN OUT GLOBAL.Ty_Tb_Cluster_Data)
    RETURN BOOLEAN;

    FUNCTION Fn_Post_Process_For_a_Contract(p_Contract_Ref_No      IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                            p_Processing_Date      IN DATE,
                                            p_Authorization_Status IN Oltbs_Contract.Auth_Status%TYPE,
                                            p_Handoff_Action_Code  IN CHAR,
                                            p_Error_Code           IN OUT VARCHAR2,
                                            p_Error_Parameter      IN OUT VARCHAR2,
                                            p_Tb_Cluster_data      IN OUT GLOBAL.Ty_Tb_Cluster_Data)
    RETURN BOOLEAN;
    -- Bug#36113117 Ends Here

  FUNCTION Fn_Pre_Change_Contract_Status(p_Contract_Ref_No       IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                     p_Processing_Date           IN DATE,
                                     p_Authorization_Status      IN Oltbs_Contract.Auth_Status%TYPE,
                                     p_Handoff_Action_Code       IN CHAR,
                                     p_Current_Event_Seq_No      IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                                     Cs                          IN OUT olpks_status.Contract_Struct,
                                     p_Destination_Status        IN Oltbs_Contract.User_Defined_Status%TYPE,
                                     p_Destination_Status_Seq_No IN Oltms_Product_Status_Master.Status_Sequence%TYPE,
                                     p_Unconditional_Change      IN BOOLEAN,
                                     p_Error_Code                IN OUT VARCHAR2,
                                     p_Error_Parameter           IN OUT VARCHAR2)
	RETURN boolean;
	
	FUNCTION Fn_Post_Change_Contract_Status(p_Contract_Ref_No           IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                     p_Processing_Date           IN DATE,
                                     p_Authorization_Status      IN Oltbs_Contract.Auth_Status%TYPE,
                                     p_Handoff_Action_Code       IN CHAR,
                                     p_Current_Event_Seq_No      IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                                     Cs                          IN OUT olpks_status.Contract_Struct,
                                     p_Destination_Status        IN Oltbs_Contract.User_Defined_Status%TYPE,
                                     p_Destination_Status_Seq_No IN Oltms_Product_Status_Master.Status_Sequence%TYPE,
                                     p_Unconditional_Change      IN BOOLEAN,
                                     p_Error_Code                IN OUT VARCHAR2,
                                     p_Error_Parameter           IN OUT VARCHAR2)
	RETURN boolean;

END olpks_status_cluster;
/
CREATE or replace SYNONYM olpkss_status_cluster FOR olpks_status_cluster
/