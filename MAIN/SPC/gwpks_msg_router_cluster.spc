CREATE OR REPLACE PACKAGE Gwpks_Msg_Router_Cluster AS

/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright ? 2008 - 2014  Oracle and/or its affiliates.  All rights reserved.
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
   -------------------------------------------------------------------------------------------------------
   CHANGE HISTORY
   
  SFR Number         :  24451347
  Changed By         :  Dekyi
  Change Description :  Provided extensible layers

   -------------------------------------------------------------------------------------------------------
   */

   FUNCTION Fn_Post_Process_Req_Msg(p_Is_Out_Clob                 IN VARCHAR2
									,p_Xml_Out_Clob                IN Gwtbs_Msg_Out_Log.Message%TYPE
									,p_Xml_Out_Str                 IN VARCHAR2
									,p_Process_Status              IN Gwtbs_Msg_Out_Log.Process_Status%TYPE
									,p_Header					   IN Gwpks_Service_Router.Ty_Header
									,p_Err_Code                    IN VARCHAR2
									,p_Err_Param                   IN VARCHAR2) RETURN BOOLEAN;

END Gwpks_Msg_Router_Cluster;
/
CREATE OR REPLACE SYNONYM Gwpkss_Msg_Router_Cluster FOR Gwpks_Msg_Router_Cluster
/
