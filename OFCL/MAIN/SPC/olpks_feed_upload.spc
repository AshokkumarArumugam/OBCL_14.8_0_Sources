CREATE OR REPLACE PACKAGE olpks_feed_upload
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_feed_upload.SPC

** Module		: LD
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
/*
Change History
NEW PACKAGE FOR UPLOADING THE COMMITMENTS WITH Syndicator Feed To Flexcube for Commitments Prior to Close
18-June-2008 FLEXCUBE V.CL Release 7.4 Retro Changes CITIUS-LS-CITIUSLD46200208

*/

---------------------------------------------------------------------------------------------------------------------------

/*FUNCTION	fn_populate_work_table
	(
	p_file_name			IN		VARCHAR2,
	p_path			IN		VARCHAR2,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;*/
FUNCTION fn_populate_work_table(doc xmldom.DOMDocument ,
								p_err IN OUT varchar2, 
								P_prms IN OUT varchar2)
RETURN BOOLEAN;
FUNCTION	fn_upload_feed_details
	(
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;


FUNCTION	fn_upload_commitments
	(
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2,
	p_reprocess		IN VARCHAR2 DEFAULT NULL
	)
RETURN BOOLEAN;

END olpks_feed_upload;
---------------------------------------------------------------------------------------------------------------------------
/