CREATE OR REPLACE PACKAGE lbpks_util_reval
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: lbpks_util_reval.SPC
**
** Module		: LOAN SYNDICATION
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
---------------------------------------------------------------------------------------------------
*/



FUNCTION  fn_commitment_reval
		  (	 
			p_module			IN		oltbs_contract.module_code%TYPE,
			p_processing_date	IN		DATE,
			p_product			IN		oltbs_contract.product_code%TYPE,
			p_commit_frequency	IN		oltbs_automatic_process_master.eod_commit_count%TYPE,
			p_error_code		IN OUT	VARCHAR2,
			p_error_parameter	IN OUT	VARCHAR2
		  )
RETURN BOOLEAN;

END lbpks_util_reval;
/
CREATE or replace SYNONYM lbpkss_util_reval FOR lbpks_util_reval
/