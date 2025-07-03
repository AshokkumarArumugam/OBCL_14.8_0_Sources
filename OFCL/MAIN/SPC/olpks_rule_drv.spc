CREATE OR REPLACE PACKAGE olpks_rule_drv AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_rule_drv.SPC
**
** Module	      : MI
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/



FUNCTION Fn_drv_rule (
				Pm_rule	 		  Varchar2,
				Pm_mis_class 		  Varchar2,
				Pm_mis_type		 	  Varchar2,
				Pm_err_code  	IN OUT  Varchar2,
				Pm_err_param	IN OUT  Varchar2
			    )
RETURN BOOLEAN;

END;
/