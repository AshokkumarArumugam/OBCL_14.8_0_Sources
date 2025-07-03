CREATE OR REPLACE PACKAGE olffmupd 
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : olffmupd.SPC
**
** Module       : MS
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.

----------------------------------------------------------------------------------------------------
*/
/* CHNAGE HISTORY
11-DEC-2002 FCC 4.2 FEB 2003 New package written to handle free format SWIFT message upload   	
*/

-- submits the job
FUNCTION fn_msffmupd_job_submit(p_err_code  IN OUT ertbs_msgs.err_code%TYPE,
			        p_err_param IN OUT ertbs_msgs.message%TYPE)
RETURN BOOLEAN;

-- changes the interval
FUNCTION fn_msffmupd_job_change( p_status IN VARCHAR2)
RETURN BOOLEAN;

-- remove the job
FUNCTION fn_msffmupd_job_stop(p_err_code  IN OUT ertbs_msgs.err_code%TYPE,
			      p_err_param IN OUT ertbs_msgs.message%TYPE)
RETURN BOOLEAN;

-- polls the direcotry for each branch in the interface definition
PROCEDURE pr_msffmpoll;

-- upload the swift msg
FUNCTION fn_upload_free_format_msg
	(p_directory	  	IN  		VARCHAR2,
	 p_filename  		IN  		VARCHAR2,
	 p_error_code		IN OUT		VARCHAR2,
	 p_error_param		IN OUT		VARCHAR2,
	 p_branch_code		IN 		oltms_branch.branch_code%TYPE)
RETURN BOOLEAN;

END;
/

CREATE or replace SYNONYM olffmupds for olffmupd
/