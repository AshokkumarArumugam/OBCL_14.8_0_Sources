CREATE OR REPLACE force VIEW olvw_customer_details
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_customer_details.vw
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
--------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------
** Change Histroy:
** 31-AUG-2012 CITIUS#14745 changes: Added for Dealtrax Data ware housing changes
17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812, removed spaces and included underscore in few lables
05-OCT-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14920 -Rewrote full view and removed old view. In customer feed, external reference field needs to be removed
--------------------------------------------------------------------------------------------------
*/
--05-OCT-2012 CITIUS#14920 -commenting the old code starts
--AS
--SELECT   x.GFCID "GFCID",
--             --substr(x.customer_category, 1, 1) "Cust_ Category", --17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 Changes here
--             SUBSTR(x.customer_category, 1, 1) "Cust_Category",--17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 Changes here
--             x.customer_name1 "Cust_Name_1",
--             x.customer_name2  "Cust_Name_2",
--             --17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 Changes start here
--             /*
--             x.Short_Name "Short Name",             
--             x.customer_no "Customer_ No",
--             x.address_line1  "ADDRESS 1",
--             x.address_line2 "ADDRESS 2",
--             x.address_line3  "ADDRESS 3",
--             x.zip_code  "ZIP CODE",
--             z.external_Ref_no "External Reference"
--             */
--             x.Short_Name "Short_Name",             
--             x.customer_no "Customer_No",
--             x.address_line1  "ADDRESS_1",
--             x.address_line2 "ADDRESS_2",
--             x.address_line3  "ADDRESS_3",
--             x.zip_code  "ZIP_CODE",
--             z.external_Ref_no "External_Reference"      
--             --17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 Changes end here
--        FROM oltm_customer x,OLTB_CONTRACT y,OLDW_CONTRACT_MASTER z
--        WHERE x.customer_no=y.counterparty
--        ANd  y.contract_ref_no=z.contract_ref_no 
--        AND EXISTS (SELECT 1 
--                FROM                   oltbs_interface_param_if a
--                WHERE                 a.branch_code =  (SELECT ho_branch from oltm_bank)
--                AND                      a.external_system = 'DEALTRAX'
--                AND                       a.interface_code = 'DEALTRAX'
--                AND                       a.param_type = 'CCC_PROOF_CODE'
--                AND                       a.param_value = z.proof
--)
--union
-- select     
--			 x.GFCID "GFCID",
--             --substr(x.customer_category, 1, 1) "Cust_ Category", --17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 Changes here
--             SUBSTR(x.customer_category, 1, 1) "Cust_Category", --17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 Changes here
--             x.customer_name1 "Cust_Name_1",
--             x.customer_name2  "Cust_Name_2",
--             --17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 Changes start here
--             /*
--             x.Short_Name "Short Name",             
--             x.customer_no "Customer_ No",
--             x.address_line1  "ADDRESS 1",
--             x.address_line2 "ADDRESS 2",
--             x.address_line3  "ADDRESS 3",
--             x.zip_code  "ZIP CODE",
--             z.external_Ref_no "External Reference"
--             */
--             x.Short_Name "Short_Name",             
--             x.customer_no "Customer_No",
--             x.address_line1  "ADDRESS_1",
--             x.address_line2 "ADDRESS_2",
--             x.address_line3  "ADDRESS_3",
--             x.zip_code  "ZIP_CODE",
--             z.external_Ref_no "External_Reference"
--             --17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 Changes end here
--     FROM    oltm_customer x,OLDW_PARTICIPANT_DETAILS y,OLDW_CONTRACT_MASTER z
--     WHERE x.customer_no=y.investor_number
--     and   y.contract_ref_no=z.contract_ref_no
--     AND EXISTS (SELECT 1 
--                FROM                   oltbs_interface_param_if a
--                WHERE                 a.branch_code =  (SELECT ho_branch from oltm_bank)
--                AND                      a.external_system = 'DEALTRAX'
--                AND                       a.interface_code = 'DEALTRAX'
--                AND                       a.param_type = 'CCC_PROOF_CODE'
--                AND                       a.param_value = z.proof
--)
--with read only 
--/
--CREATE OR REPLACE SYNONYM olvws_customer_details
--FOR olvw_customer_details 
--/
--05-OCT-2012 CITIUS#14920 -commenting the old code ends
--05-OCT-2012 CITIUS#14920 -Rewrote full view and removed old view starts
SELECT   x.GFCID  ,
             substr(x.customer_category, 1, 1) Cust_Category,
             x.customer_name1 Cust_Name_1,
             x.customer_name2  Cust_Name_2,
             x.Short_Name Short_Name,             
             x.customer_no Customer_No,
             x.address_line1  ADDRESS_1,
             x.address_line2 ADDRESS_2,
             x.address_line3  ADDRESS_3,
             x.zip_code  ZIP_CODE  
		FROM   oltm_customer x
		WHERE  EXISTS
			(
				SELECT 	1
				FROM 	OLDW_CONTRACT_MASTER z
				WHERE	 x.customer_no=z.counterparty
				AND EXISTS 
					(
						SELECT 1 
						FROM			oltbs_interface_param_if a
						WHERE		a.branch_code =  (SELECT ho_branch from oltm_bank)
						AND			a.external_system = 'DEALTRAX'
						AND			a.interface_code = 'DEALTRAX'
						AND			a.param_type = 'CCC_PROOF_CODE'
						AND			a.param_value = z.proof
					)
			)	
UNION
 select     
		x.GFCID  ,
		substr(x.customer_category, 1, 1) Cust_Category,
		x.customer_name1 Cust_Name_1,
		x.customer_name2  Cust_Name_2,
		x.Short_Name Short_Name,             
		x.customer_no Customer_No,
		x.address_line1  ADDRESS_1,
		x.address_line2 ADDRESS_2,
		x.address_line3  ADDRESS_3,
		x.zip_code  ZIP_CODE 
     FROM    oltm_customer x
     WHERE	EXISTS
     			(
     			SELECT	1
     			FROM	OLDW_PARTICIPANT_DETAILS y
     			WHERE 	x.customer_no=y.investor_number     			
			AND	EXISTS 
				(
					SELECT 1 
					FROM	oltbs_interface_param_if a
					WHERE	a.branch_code =  (SELECT ho_branch from oltm_bank)
					AND	a.external_system = 'DEALTRAX'
					AND	a.interface_code = 'DEALTRAX'
					AND	a.param_type = 'CCC_PROOF_CODE'
					AND	a.param_value =y.proof
				)     			
     			)	
with read only 
/
CREATE OR REPLACE SYNONYM olvws_customer_details
FOR olvw_customer_details 
--05-OCT-2012 CITIUS#14920 -Rewrote full view and removed old view ends
/