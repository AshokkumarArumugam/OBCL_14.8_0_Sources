CREATE OR REPLACE PACKAGE olpks_mq_asc_proc
as
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_mq_asc_proc.SPC
**
** Module		: CORE
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
/* Change history ------------------------------------------------------------------------------------
16-Sep-2004	SFR PLC44030040			Citift tuning changes
02-NOV-2004 SFR PLC45020021 FCC 4.5 Changes Include the paralelization as well as the changes related to 4.5
----------------------------------------------------------------------------------------------------
*/

/*Function  fn_read(
 	    	    P_in_queue	  IN OLTM_QUEUE_NAMES.COD_QUEUENAME%type,
		    P_message_id  IN varchar2,
		    P_corr_id	  IN varchar2,
		    P_message_in  IN long,
		    P_error	  OUT varchar2,
		    P_param  	  OUT varchar2,
		    P_out_queue	  OUT OLTM_QUEUE_NAMES.COD_QUEUENAME%type,
		    p_message_out OUT varchar2
		    ) return boolean; */
Procedure Pr_read(
 	    	    P_in_queue	IN OLTM_QUEUE_NAMES.COD_QUEUENAME%type,
		    P_message_id  IN varchar2,
		    P_corr_id	IN varchar2,
		    P_message_in  IN long,
		    P_err_flag 	OUT varchar2,	 
		    P_error	  	OUT varchar2,
		    P_param  	OUT varchar2,
		    P_out_queue	OUT OLTM_QUEUE_NAMES.COD_QUEUENAME%type,
		    p_message_out OUT varchar2
);
Function Fn_write(
	 	 P_out_queue IN OLTM_QUEUE_NAMES.COD_QUEUENAME%type,
		 p_message_id	IN VARCHAR2,
		 P_corr_id	IN VARCHAR2,
		 P_message	IN LONG,
		 P_function	IN VARCHAR2,
		 P_err		OUT varchar2,
		 P_param	OUT varchar2
	 ) return boolean;
--
-- FCC4.4 DEC 2003 Changes Starts - Changes Starts for CITIFT MQ Online
--
PROCEDURE pr_process_in_mq_asc
				(p_parallel_seq_no NUMBER); -- SFR PLC45020021 Interface changes

FUNCTION fn_online_sod
			(
			p_error			IN OUT	VARCHAR2,
			p_param 		IN OUT	VARCHAR2
			)
RETURN BOOLEAN;
--
-- FCC4.4 DEC 2003 Changes Ends - Changes Ends for CITIFT MQ Online
--

-- SFR PLC45020021 changes Starts
FUNCTION fn_submit_citift_jobs
				(
				p_action	IN	VARCHAR2,
				p_error_code	IN OUT  VARCHAR2,
				p_error_param	IN OUT  VARCHAR2
				)
RETURN BOOLEAN;
-- SFR PLC45020021 changes ends

-- SFR PLC44030040 changes start

TYPE			tbl_iftb_indetails
IS	TABLE	OF
OLTB_IN_DETAILS%ROWTYPE
INDEX BY BINARY_INTEGER;

-- SFR PLC44030040 changes end
end olpks_mq_asc_proc;
/
CREATE OR REPLACE SYNONYM olpkss_mq_asc_proc FOR olpks_mq_asc_proc -- SFR PLC44030040 changes
/