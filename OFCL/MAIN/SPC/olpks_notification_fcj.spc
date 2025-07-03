CREATE OR REPLACE PACKAGE olpks_notification_fcj AS
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 1999- 2009  Oracle and/or its affiliates.  All rights reserved.
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
------------------------------------------------------------------------------------------
*/
/*
----------------------------------------------------------------------------------------------------
     CHANGE HISTORY
     SFR No				:  13891036     
     Changed By         :  Niranjana R
     Description 		:  To populate TDAMT flag with RD amount incase of RD creation notification
	 Created on 		:  27-MAR-2012 
	 Search String	 	:  9NT1501 sfr:13891036
 -------------------------------------------------------------------------------------------------------
  */
  g_session_flag boolean := false;
  g_ref_no       varchar2(16) := '';
  g_rd_account_notif CHAR := 'N' ;--9NT1501 sfr:13891036

  PROCEDURE pr_notif_callback(payload            IN VARCHAR2,
                              p_notification_xml OUT CLOB,
                              p_distributed      OUT VARCHAR2);
  --13-NOV-2006 FCKERNEL73 --Ends

END olpks_notification_fcj;
/