CREATE OR REPLACE PACKAGE aepks_Eoc_Vals_Cluster IS
/**-----------------------------------------------------------------------------------------
**
** File Name   : aepks_Eoc_Vals_Cluster.spc
**
**Module       : AE
**
** This source is part of the Oracle FLEXCUBE Software Product.
** Copyright (R) 2016 , Oracle and/or its affiliates.  All rights reserved
**
**
** No part of this work may be reproduced, stored in a retrieval system, adopted
** or transmitted in any form or by any means, electronic, mechanical,
** photographic, graphic, optic recording or otherwise, translated in any
** language or computer language, without the prior written permission of
** Oracle and/or its affiliates.
**
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India
** India
**-----------------------------------------------------------------------------
**Change History
	** Modfied By           : Harikrishna Jangili
	** Modified On          : 13-May-2015
	** Modified Reason      : Hooks addition to Fn_Validate_Eoc function
	** Search String        : Bug#20719355  
**------------------------------------------------------------------------------*/
   FUNCTION Fn_Validate_Pre_Run_Branch(p_Branch             IN VARCHAR2
                                  ,p_Err_Code           IN OUT VARCHAR2
                                  ,p_Err_Params         IN OUT VARCHAR2) RETURN BOOLEAN;
								  
	FUNCTION Fn_Validate_Post_Run_Branch(p_Branch             IN VARCHAR2
                                  ,p_Err_Code           IN OUT VARCHAR2
                                  ,p_Err_Params         IN OUT VARCHAR2) RETURN BOOLEAN;

	--changes begin Bug#20719355
	FUNCTION Fn_Validate_Pre_Run_eoc(p_Aedstart   IN OUT Aepks_Aedstart_Main.Ty_Aedstart
									,p_Err_Code   IN OUT VARCHAR2
									,p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;
									
	FUNCTION Fn_Validate_Post_Run_eoc(p_Aedstart   IN OUT Aepks_Aedstart_Main.Ty_Aedstart
									,p_Err_Code   IN OUT VARCHAR2
									,p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;
	--changes end Bug#20719355									
									

END aepks_Eoc_Vals_Cluster;
/
CREATE OR REPLACE SYNONYM aepkss_Eoc_Vals_Cluster for aepks_Eoc_Vals_Cluster
/