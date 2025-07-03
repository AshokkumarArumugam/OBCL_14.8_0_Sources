CREATE OR REPLACE force VIEW olvw_genesis_indicative
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_genesis_indicative.vw
**
** Module	: INTERFACE
**
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
  ----------------------------------------------------------------------------------------
  */
/*
--01-MAR-2012  CITIUS-LS#12933 Genesis handoff changes 
--25-SEP-2012  CITIUS#14954  DTAX,Dealtrax,CFPI  and Genesis  related issue changes
--19-DEC-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS#15414 Genesis handoff changes
25-OCT-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO CITIUS#17873   Genesis LC CHANGES
23-NOV-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 RETRO CITIUS#19036 Genesis Version upgradtion related changes:: Version upgradation includes - New fields introduction in feeds+ Existing field logic change+ proof 234 inclusion+ Branch 06A inclusion and DBS related changes+ Balance Type mapping changes + Fix for JIRA 150080-9143
23-NOV-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 RETRO CITIUS#19669 NVL added on dept code comparison
*/
SELECT  a.*
		FROM  OLTB_DW_STATIC_INFO  a
		WHERE
			not exists (   
				SELECT 1
						FROM oltbs_interface_filter_param
						WHERE branch_code = (select ho_branch from oltm_bank)
						AND external_system = 'GENESIS'
						AND interface_code = 'INDICATIVE'
						AND exclude_type = 'BRANCH'
						AND exclude_value = a.branch
						)
				AND not exists (      SELECT 1
						FROM oltbs_interface_filter_param
						WHERE branch_code =(select ho_branch from oltm_bank)
						AND external_system = 'GENESIS'
						AND interface_code = 'INDICATIVE'
						AND exclude_type = 'PRODUCT'
						AND exclude_value = a.product_code
						)						
			/*			
			AND not exists (      SELECT 1
						FROM oltbs_interface_filter_param
						WHERE branch_code = '000'
						AND external_system = 'GENESIS'
						AND interface_code = 'INDICATIVE'
						AND exclude_type = 'GL_CODE'
						AND exclude_value = a.gl_account
						)			
			*/			
			AND	NOT EXISTS  
				(
					SELECT	1
					FROM	oltbs_interface_param_if 
					WHERE	branch_code = (select ho_branch from oltm_bank)
					AND	external_system = 'GENESIS'
					AND	interface_code = 'INDICATIVE'
					AND	param_type = 'EXCLUDE-PROOF'
					AND  param_value  = a.department_code
				--12-JUN-2014 CITIUS#19036  change starts for  234 inclusion starts
                                        AND NOT EXISTS 
                                         (
                                                SELECT 1 
                                                from    oltbs_interface_param_if 
                                                WHERE   branch_code = (select ho_branch from oltm_bank)
                                                AND     external_system = 'GENESIS'
                                                AND     interface_code = 'INDICATIVE'
                                                AND     param_type = 'INCLUDE-SLT-PROOF'
                                                --AND     param_value  =a.department_code		--20-FEB-2015 CITIUS#19669 change
                                                AND     nvl(param_value,'XXX')  =a.department_code	--20-FEB-2015 CITIUS#19669 change
                                                and     NVL(a.lc_contract,'N')<>'Y'
                                         )
                                        --12-JUN-2014 CITIUS#19036 change ends
                                )
                        --12-JUN-2014 CITIUS#19036 change starts
                        AND 	(	
                        		(
                        			a.branch <> '06A'	 
                        			and 
                        			NVL(a.lc_contract,'N')='Y'
                        		)
                        		OR
                        		NVL(a.lc_contract,'N')<>'Y'
                       		)
                      	--12-JUN-2014 CITIUS#19036 change ends.
			--25-OCT-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO CITIUS#17873   Genesis LC CHANGES :- CODE PORTION COMMENTED
			/*AND	NOT EXISTS  
				(
					SELECT	1
					FROM		oltms_product_master_ld l
					WHERE	l.product  				= 	a.product_code
					AND		NVL(l.lc_drawdown,'N')	=	'Y'	
				)*/	
				--25-OCT-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO CITIUS#17873   Genesis LC CHANGES :- CODE PORTION COMMENTED	
			--AND module_code  IN ('OL','FC','LB')
			AND  ( 
						( module_code IN ('OL','FC'))
						OR						
							--19-DEC-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS#15414  Changes starts
							--(module_code = 'LB' AND lc_fronting ='Y' AND product_type ='Y' AND NVL(gaap_front_rsk,0) <> 0)
							(module_code = 'LB' AND lc_fronting ='Y' AND product_type ='C' AND NVL(gaap_front_rsk,0) <> 0)
							--19-DEC-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS#15414  Changes ends
						)					
			--AND run_date	= global.application_date --25-SEP-2012  CITIUS#14954 Changes 
			/*
			AND  branch  IN (
									(
									SELECT	param_value FROM	oltbs_interface_param_if
									WHERE	external_system	= 'LP'
									AND		interface_code 	= 'LP'
									AND		param_type		=	olpks_interface.fn_get_interface_region
									AND		mapping_value 	=	 'I'
									)
								)			
			*/
/
CREATE OR REPLACE SYNONYM olvws_genesis_indicative
FOR olvw_genesis_indicative
/