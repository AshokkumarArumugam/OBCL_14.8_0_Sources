CREATE OR REPLACE PACKAGE cspks_req_handler_cluster IS
  /*************************************************************************************************
    **  This source is part of the FLEXCUBE-Corporate Banking Software System
    **  and is copyrighted by Oracle Financial Services Software Limited.
    **  All rights reserved.  No part of this work may be reproduced,
    **  stored in a retrieval system, adopted or transmitted in any form or
    **  by any means, electronic, mechanical, photographic, graphic,
    **  optic recording or otherwise, translated in any language or
    **  computer language, without the prior written permission of
    **  Oracle Financial Services Software Limited.
    **
    **  Oracle Financial Services Software Limited.
    **  10-11, SDF I, SEEPZ, Andheri (East),
    **  MUMBAI - 400 096.
    **  INDIA
    **
    **  Copyright © 2007- 2014 by Oracle Financial Services Software Limited.
    **  Oracle Financial Services Software Limited.
    **
    **************************************************************************************************
	**  Created By         : Saisudha
	**  Created On         : 24-Oct-2016
	**  Desxcription       : Retro for hook change bug id 24925015. 
	**  Search String      : 12.2_RETRO_Bug#24941156
	
    *************************************************************************************************/
  
  FUNCTION fn_pre_auth_query(p_function_id IN VARCHAR2,
                         p_action_code IN VARCHAR2,
                         p_key_id      IN VARCHAR2,
                         p_err_code    IN OUT VARCHAR2,
                         p_err_param   IN OUT VARCHAR2,
						 p_fn_call_id       IN OUT NUMBER,
						 p_tb_cluster_data   IN OUT global.ty_tb_cluster_data)
RETURN BOOLEAN;

END cspks_req_handler_cluster;
/
CREATE OR REPLACE SYNONYM cspkss_req_handler_cluster FOR cspks_req_handler_cluster
/
