CREATE OR REPLACE PACKAGE olpks_notification_fcj_custom AS

  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name    : olpks_notification_fcj_custom.SPC
  **
  ** Module       : IF
  **
  ** This source is part of the FLEXCUBE Corporate - Corporate Banking Software System
  ** and is copyrighted by Oracle Financial Services Software Limited.
  **
  ** No part of it may be reproduced, stored, transmitted or modified
  ** without prior written consent from the copyright owner. The
  ** copyright owner further retains the privilege to modify all or some
  ** of this program.
  **
  ** Oracle Financial Services Software Limited
  ** 10-11, SDF I, SEEPZ, Andheri (East),
  ** MUMBAI - 400 096.
  ** INDIA
  **
  ** Copyright © 1999- 2009 by Oracle Financial Services Software Limited.


  **   Modified By            : Bhavica
  **   Modified On            : 24-Dec-2019
  **   Modified Reason        : Generated Notification header to hold the new header tag <ROUTING_DEST> for identifying the which system need to be sent.EHD Ref: TWDCTBC_14.2_12_APR_2019_01_0000.
  **   Search String          : 14.3_EXTN_30682152
  */

--HOOK REQUEST -  CHANGES STARTS

  PROCEDURE fn_set_notif_format(
    					p_parent_nodes 		IN  VARCHAR2,
                                	p_parent_format 	IN  VARCHAR2                                  	
                                );


  PROCEDURE fn_get_notif_format(
  				p_parent_nodes 		IN OUT VARCHAR2,
                              	p_parent_format 	IN OUT VARCHAR2  
                                );
--HOOK REQUEST -  CHANGES ENDS
--14.3_EXTN_30682152 starts
PROCEDURE pr_notif_callback(payload            IN VARCHAR2,
                              p_notification_xml IN OUT CLOB,
                              p_distributed      IN OUT VARCHAR2,
							  p_fn_Call_id 		 IN OUT NUMBER,
							  p_tb_custom_Data   IN OUT Global.ty_Tb_custom_Data);
--114.3_EXTN_30682152 ends
END olpks_notification_fcj_custom;
/