CREATE OR REPLACE PACKAGE report_services10g
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: report_services10g.spc
**
** Module		: REPORTS PROCESSING
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.

Report gives error in 10g when a function's parameter declared using TYPE operator with remote object. 
This package will have overload funcs/procs that referenced in the reports with the above attribute and calls the original function. 
----------------------------------------------------------------------------------------------------
*/
/* CHANGE HISTORY
*/

	PROCEDURE pr_init(pbrn IN VARCHAR2,pusr IN VARCHAR2) ;

	PROCEDURE pr_init(pbrn IN VARCHAR2) ;

	FUNCTION fmt_amt (
			pCcy 	IN  VARCHAR2,
			pAmt 	IN 	NUMBER)
	RETURN VARCHAR2;	

	FUNCTION get_nls_dt_format
	RETURN VARCHAR2;	

	FUNCTION cypks_fn_amt1_to_amt2 (
		pCcy1 		IN 	VARCHAR2,
		pCcy2 		IN 	VARCHAR2,
		pAmount1 	IN 	NUMBER,
		pRate		IN 	NUMBER,
		pRounding	IN	CHAR DEFAULT 'N',
		pAmount2 	OUT 	NUMBER,
		pErrorCode	IN OUT	VARCHAR2)
	RETURN BOOLEAN;

	FUNCTION cypks_fn_amt1_to_amt2 (
		pBranch 	IN		VARCHAR2,
		pCcy1 		IN 		VARCHAR2,
		pCcy2 		IN 		VARCHAR2,
		pRateType 	IN 		VARCHAR2,
		pRateIndicator 		IN 	VARCHAR2,
		pAmount1 	IN 		NUMBER,
		pRounding 	IN 		CHAR,
		pAmount2 	OUT 	NUMBER,
		pRate		IN OUT	NUMBER,
		pErrorCode	IN OUT	VARCHAR2)
	RETURN BOOLEAN;

	FUNCTION cypks_fn_amt1_to_amt2 (
		pBranch 	IN	VARCHAR2,
		pCcy1 		IN 	VARCHAR2,
		pCcy2 		IN 	VARCHAR2,
		pAmount1 	IN 	NUMBER,
		pRounding	IN	CHAR DEFAULT 'N',
		pAmount2 	OUT 	NUMBER,
		pRate		IN OUT	NUMBER,
		pErrorCode	IN OUT	VARCHAR2)
	RETURN BOOLEAN;
	
	FUNCTION global_lcy RETURN VARCHAR2;
	
	FUNCTION global_curr_branch RETURN VARCHAR2;
	
	---
	--REPORT NAME : MSRPDOMS .RDF
	--MSRPDOMS Changes for 10g databse.
	FUNCTION fn_enrich_settle_parties
			(
			p_field1   		 IN  		VARCHAR2,
			p_field2   		 IN  		VARCHAR2,
			p_field3   		 IN  		VARCHAR2,
			p_field4   		 IN  		VARCHAR2,
			p_field5		 	 IN		  VARCHAR2,
			p_customer		 OUT		VARCHAR2,
			p_option   		 OUT 		VARCHAR2,
			p_value    		 OUT 		VARCHAR2,
			p_bic_code		 OUT		VARCHAR2,
			p_err_code 		 IN OUT	VARCHAR2
		 ) 
	RETURN BOOLEAN;
	--REPORT NAME : MSRPDOMS .RDF
	--MSRPDOMS Changes for 10g databse.	
END report_services10g;
/
CREATE OR REPLACE SYNONYM reports_services10g for report_services10g
/