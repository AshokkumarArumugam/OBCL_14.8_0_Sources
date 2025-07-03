create or replace package gwpks_service_wrapper_cluster is

  /*-----------------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2013  -  2017  Oracle and/or its affiliates.  All rights reserved.
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

*/
-----------------------------------------------------------------------------------------------------------------------------------
/*
INTIAL VERSION
  
  created By        : Neha Nitin Farkade
  creation Date     : 18th dec 2017
  creation Reason   : Extensible hooks
  
  */
                    
  FUNCTION Fn_Process_Msg(p_Request_No  IN NUMBER
                          ,p_Header      IN OUT Gwpks_Service_Router.Ty_Header
                          ,p_Addl_Header IN OUT Gwpks_Service_Router.Ty_Header
                          ,p_Status      IN OUT VARCHAR2
						  ,p_fn_call_id  IN OUT NUMBER
						  ,p_tb_cluster_data IN OUT global.ty_tb_cluster_data
                          ,p_Err_Code    IN OUT VARCHAR2
                          ,p_Err_Param   IN OUT VARCHAR2
						  ) RETURN BOOLEAN;                  
end gwpks_service_wrapper_cluster;
/
Create or replace synonym gwpkss_service_wrapper_cluster for gwpks_service_wrapper_cluster
/
