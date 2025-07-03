CREATE OR REPLACE PACKAGE olpks_s2_adjustment
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_s2_adjustment.SQL
**
** Module		: INTERFACES
**
This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
07-JUN-2012 CITIUS#13970 	 JIRA 150080-6250/6253/6254   Changes -S2 adjusmtent changes
12-JUN-2012 CITIUS#13979 	 JIRA 150080-6250/6253/6254   Changes -S2 adjusmtent changes
*/
 PROCEDURE pr_procees_s2_adj_file	
 											(
 											p_branch_code	IN	VARCHAR,	
 											p_user_id			IN	VARCHAR2,
 											p_interface_code	IN	VARCHAR2,
 											p_batch_box		IN	VARCHAR,
 											p_region_code		IN	VARCHAR2, 											
 											p_error_code		OUT VARCHAR,
 											p_error_param		OUT VARCHAR											
 											);

PROCEDURE  pr_re_reverse_bod_s2_entries
 					(
 					p_error_code  	  OUT VARCHAR2
 					,p_error_param  OUT VARCHAR2
 					) ;


PROCEDURE  pr_Reverse_prior_s2adjusment
 					(
 					p_error_code  	  OUT VARCHAR2
 					,p_error_param  OUT VARCHAR2
 					) ; 					
 					
--12-JUN-2012 CITIUS#13979 Changes starts
FUNCTION  fn_get_bd_days
RETURN INTEGER;		

FUNCTION  fn_get_s2_adj_file_name
RETURN VARCHAR2;
--12-JUN-2012 CITIUS#13979 Changes ends

END olpks_s2_adjustment;
/
CREATE OR REPLACE SYNONYM olpkss_s2_adjustment FOR olpks_s2_adjustment
/