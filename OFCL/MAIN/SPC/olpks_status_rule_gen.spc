Create Or Replace Package olpks_status_rule_gen
As

/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_status_rule_gen.SPC
**
** Module		: LOANS AND DEPOSITS
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
**
----------------------------------------------------------------------------------------------------
*/
/*------------------------------------------CHANGE HISTORY----------------------------------
DATE		VERSION NO	CODE		DESCRIPTION

18-SEP-2002	FCC 4.1 OCT 2002		Changes done for Loans Status Accounting

  **Changed By         : Abhinav Kumar
  **Date               : 08-Oct-2024
  **Change Description : Provided Hooks for status change cluster and custom elements
  **Search String      : Bug#37143543
  
  **Changed By         : Abhinav Kumar
  **Date               : 22-Oct-2024
  **Change Description : Provided Hooks for status change cluster and custom elements for Procedure Gen
  **Search String      : Bug#37195447
    
------------------------------------END CHANGE HISTORY-------------------------------------
*/

	Function Fn_gen_rule 
		(
			p_product_code 	In		Varchar2,
			p_err_code		In Out	Varchar2,
			p_err_param		In Out	Varchar2
		)
	Return Boolean;
  
  --Bug#37143543 Changes Starts
  FUNCTION Fn_Skip_Kernel RETURN BOOLEAN; 
  FUNCTION Fn_Skip_Cluster RETURN BOOLEAN;
  FUNCTION Fn_Skip_Custom RETURN BOOLEAN;
  --Bug#37143543 Changes Ends
  --Bug#37195447 Changes Starts
  PROCEDURE gen(s VARCHAR2,
                 n_lf SMALLINT := 1);
  --Bug#37195447 Changes Ends
End olpks_status_rule_gen;
/
Create or replace Synonym olpkss_status_rule_gen For olpks_status_rule_gen
/
