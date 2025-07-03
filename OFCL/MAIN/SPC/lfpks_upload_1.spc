CREATE OR REPLACE PACKAGE  lfpks_upload_1
AS
/*----------------------------------------------------------------------------------------------------

This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
FUNCTION  fn_std_rate_upload_master
			(
			p_src_code 		IN 		VARCHAR2,
			p_brn_code 		IN 		VARCHAR2,
			p_error_param 	IN OUT 	VARCHAR2,
			p_error_code  	IN OUT 	VARCHAR2
			)
			RETURN BOOLEAN;
FUNCTION fn_std_rate_upload_detail
			(
			p_src_code 		IN 			VARCHAR2,
			p_brn_code 		IN 			VARCHAR2,
			p_error_param 	IN OUT 		VARCHAR2,
			p_error_code  	IN OUT 		VARCHAR2
			)
			RETURN BOOLEAN;
FUNCTION fn_std_rate_upload
			(	
			p_source_code		IN		VARCHAR2,
			p_branch_code		IN 		VARCHAR2
			)
			RETURN BOOLEAN;
FUNCTION fn_amt_rate_upload_master
				(
				p_src_code		IN			VARCHAR2,
				p_brn_code		IN			VARCHAR2,
				p_error_param	IN OUT		VARCHAR2,
				p_error_code	IN OUT 		VARCHAR2
				)
				RETURN BOOLEAN;

FUNCTION fn_amt_rate_upload_effdt
				(
				p_src_code		IN			VARCHAR2,
				p_brn_code		IN			VARCHAR2,
				p_error_param	IN OUT		VARCHAR2,
				p_error_code	IN OUT 		VARCHAR2
				)
				RETURN BOOLEAN;
				
FUNCTION fn_amt_rate_upload_detail
				(
				p_src_code		IN			VARCHAR2,
				p_brn_code		IN			VARCHAR2,
				p_error_param	IN OUT		VARCHAR2,
				p_error_code	IN OUT 		VARCHAR2
				)
				RETURN BOOLEAN;
				
FUNCTION fn_amt_rate_upload
				(	
				p_source_code		IN		VARCHAR2,
				p_branch_code		IN 		VARCHAR2
				)
				RETURN BOOLEAN;
FUNCTION fn_upload_tenor_rates
				(
				p_source_code	IN		lftms_upload_tenor_rate_master.source_code%TYPE,
				p_branch_code   IN      VARCHAR2
				)
				RETURN BOOLEAN;

FUNCTION fn_upload_tenor_master
				(
				p_source_code 	IN		lftms_upload_tenor_rate_master.source_code%TYPE,
				p_brn_code      IN		VARCHAR2
				)
				RETURN BOOLEAN;

FUNCTION fn_upload_tenor_effdt
				(
				p_source_code 	IN		lftms_upload_tenor_rate_effdt.source_code%TYPE,
				p_brn_code      IN      VARCHAR2
				)
				RETURN BOOLEAN;

FUNCTION fn_upload_tenor_detail
				(
				p_source_code 	IN		lftms_upload_tenor_rate_detail.source_code%TYPE,
				p_brn_code      IN      VARCHAR2
				)
				RETURN BOOLEAN;
				
/*FUNCTION fn_dq_rate_upload
				(	
				p_source_code		IN		VARCHAR2,
				p_branch_code		IN 		VARCHAR2
				)
				RETURN BOOLEAN;

FUNCTION  fn_dq_rate_upload_master
				(
				p_src_code 		IN 		VARCHAR2,
				p_brn_code 		IN 		VARCHAR2,
				p_error_param 	IN OUT	VARCHAR2,
				p_error_code  	IN OUT 	VARCHAR2
				)
				RETURN BOOLEAN;

FUNCTION  fn_dq_rate_upload_detail
				(
				p_src_code 		IN 		VARCHAR2,
				p_brn_code 		IN 		VARCHAR2,
				p_error_param 	IN OUT	VARCHAR2,
				p_error_code  	IN OUT 	VARCHAR2
				)
				RETURN BOOLEAN;			*/ -- OFCL12.2 Not reqd
	
END lfpks_upload_1;
/