CREATE OR REPLACE PACKAGE itpks_code_generator
AS
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2012 - 2013  Oracle and/or its affiliates.  All rights reserved.
**
** No part of this work may be reproduced, stored in a retrieval system,
** adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise,
** translated in any language or computer language,
** without the prior written permission of Oracle and/or its affiliates.
**
**
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India.
** Modified By      :Mantinder Kaur
** Modified On      : 19-Jan-2022
** Modified Reason  : User not able to save alert maintenace with a auto auth user.fn_gen_code is of type pragma autonomous transaction,due to  which 
					even though for a auto auth user the data was getting inserted into alert maintenace tables,the data was getting lost after entering this function.
					Due to which no data was available for processing.Changes provided in the code such that the screen values are passed in the function call itself as a parameter,
					so that system does not query the data from the tables.
** Search String    : FCUBS_146_INTERNAL_33767329
-------------------------------------------------------------------------------------------
*/


 --begins 9NT1501::FCUBS_12.0.0 14 mar 2012

  TYPE ty_tb_v_ittm_alert_target_det IS TABLE OF ittm_alert_target_det%ROWTYPE INDEX BY BINARY_INTEGER;
      TYPE ty_tb_v_ittm_alert_messages IS TABLE OF ittm_alert_messages%ROWTYPE INDEX BY BINARY_INTEGER;

      TYPE ty_itdadmnt IS RECORD (
           v_ittm_alert_criteria  ittm_alert_criteria%ROWTYPE,
           v_ittm_alert_definition     ittm_alert_definition%ROWTYPE,
           v_ittm_alert_target_det    ty_tb_v_ittm_alert_target_det,
           v_ittm_alert_messages    ty_tb_v_ittm_alert_messages);

--FCUBS_146_INTERNAL_33767329 starts
TYPE ty_itdadmnt_rec IS RECORD (
     v_ittm_alert_definition     ittm_alert_definition%ROWTYPE,
     v_ittm_alert_target_det    ty_tb_v_ittm_alert_target_det,
     v_ittm_alert_messages    ty_tb_v_ittm_alert_messages,
                 Desc_Fields    Cspks_Req_Global.Ty_Tb_Xml_Data,
                 Addl_Info    Cspks_Req_Global.Ty_Addl_info );
--FCUBS_146_INTERNAL_33767329 ends
 FUNCTION fn_gen_code( --FCUBS_146_INTERNAL_33767329 STARTS
						--p_alert_code IN VARCHAR2,
						p_itdadmnt          IN ty_itdadmnt_rec,
						--FCUBS_146_INTERNAL_33767329 ENDS
                                         p_err_code         IN OUT VARCHAR2,
                                         p_err_params       IN OUT VARCHAR2)
     RETURN BOOLEAN;

	/*FUNCTION fn_gen_code( p_itdadmnt IN itpks_itdadmnt_Main.Ty_itdadmnt ,
                                         p_err_code         IN OUT VARCHAR2,
                                         p_err_params       IN OUT VARCHAR2)*/
	RETURN BOOLEAN;
--ENDS 9NT1501::FCUBS_12.0.0 14 mar 2012
END itpks_code_generator;
/

CREATE OR REPLACE SYNONYM itpkss_code_generator FOR itpks_code_generator
/