CREATE OR REPLACE PACKAGE olpks_rtprop
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_rtprop.SPC
**
** Module		: MIS POOL RATE PROPAGATION
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



TYPE tbl_pool_rates_dtls IS TABLE OF OLTM_POOL_DLY_REF_RATES_DTLS%ROWTYPE INDEX BY BINARY_INTEGER;

FUNCTION 	pr_rt_prop  RETURN BOOLEAN;

PROCEDURE 	pr_rt_prop
		(
		 p_node			IN	VARCHAR2,
		 p_pool_code            IN   	VARCHAR2,
		 p_ccy                  IN  	VARCHAR2,
		 p_eff_date             IN  	DATE,
		 p_dr_rate              IN  	NUMBER,
		 p_cr_rate              IN  	NUMBER,
		 p_cr_rate_sign         IN  	VARCHAR2,
		 p_dr_rate_sign         IN  	VARCHAR2,
		 p_rate_rec_st          IN  	VARCHAR2,
 		 p_int_auth_st          IN  	VARCHAR2
		);

FUNCTION fn_start_refrtupload
	(
	pBranch		IN		VARCHAR2)
	RETURN BOOLEAN;

PROCEDURE fn_rate_upload
	(
	pBranch		IN		VARCHAR2
	);

--
--  FCC 4.5 Apr 2004 Lot2 Itr2 Sfr 62 Start  
--
FUNCTION	fn_job_gl_poolcodelinkage (
				p_gl_code		IN  	 VARCHAR2,
				p_ccy			IN 	 VARCHAR2
		)
		RETURN BOOLEAN;

PROCEDURE pr_prop_gl_poolcodelinkage (
				p_node		IN 	 VARCHAR2,
				p_gl_code		IN  	 VARCHAR2,
				p_ccy			IN 	 VARCHAR2
		);

--
--  FCC 4.5 Apr 2004 Lot2 Itr2  Ends
--
	
END olpks_rtprop;
/
CREATE or replace SYNONYM olpkss_rtprop for olpks_rtprop
/