CREATE OR REPLACE PACKAGE  olpks_cn_confirm
AS 
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_cn_confirm.SPC
**
** Module		: Confirmation 
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
CHANGE_HISTORY
Added New Package for Conf/Affirm/Waiver events 

FCC 4.6 24-AUGUST-2004	4.6 Confirmation Matching
Modified a new function fn_eval_cnfm_stat_new
*/
FUNCTION fn_confirm 	
				(	
				p_online_batch				IN		VARCHAR2				       ,										  					
				p_auth_stat	  				IN		oltbs_contract.auth_status%TYPE	 , 				
				p_contract_stat	  			IN		oltbs_contract.contract_status%TYPE	 ,
				p_cstbs_contract_confirm   		IN OUT  	oltbs_contract_confirm%ROWTYPE	 , 
				p_err_code		  			IN OUT 	ertbs_msgs.err_code%TYPE		 ,
				p_err_param	  				IN OUT	VARCHAR2	
				 )
RETURN BOOLEAN;		
FUNCTION fn_waive 	(
				 p_auth_stat	  		 IN		oltbs_contract.auth_status%TYPE,	       
				 p_contract_stat	  		 IN		oltbs_contract.contract_status%TYPE	  ,
				 p_online_batch			 IN		VARCHAR2			,
				 p_cstbs_contract_confirm      IN OUT 	oltbs_contract_confirm%ROWTYPE		  ,					  
				 p_err_code		  		 IN OUT 	ertbs_msgs.err_code%TYPE		     	  ,
				 p_err_param	  		 IN OUT	VARCHAR2	
					 )
RETURN BOOLEAN;
FUNCTION fn_affirm 	(
					p_auth_stat	  			 	IN		oltbs_contract.auth_status%TYPE	 ,      
					p_contract_stat	  		 	IN		oltbs_contract.contract_status%TYPE	 ,
					p_online_batch				IN		VARCHAR2					 ,
					p_cstbs_contract_confirm    		IN OUT 	oltbs_contract_confirm%ROWTYPE	 ,					  
					p_err_code		  			IN OUT 	ertbs_msgs.err_code%TYPE		 ,
					p_err_param	  			 	IN OUT	VARCHAR2	
				 )
RETURN BOOLEAN;		


FUNCTION fn_update_event_log (
					p_cstb_contract_confirm		IN 		oltbs_contract_confirm%ROWTYPE,	
					p_auth_stat	  	  		IN		oltbs_contract.auth_status%TYPE	     ,
					p_event		  		IN		oltbs_contract.curr_event_code%TYPE	     ,	
					p_overall_conf			IN		VARCHAR2				   	     ,
					p_conf_pmt_stat		      IN		VARCHAR2				   	     ,
					p_contract_stat	  		IN		oltbs_contract.contract_status%TYPE	     ,
					p_online_batch			IN 		VARCHAR2					     ,
					p_err_code		  		IN OUT 	ertbs_msgs.err_code%TYPE		     ,
					p_err_param	  	  		IN OUT	VARCHAR2	
					)
RETURN BOOLEAN ;

FUNCTION fn_replicate_cstb_confirm (
					p_cstbs_contract_confirm    		IN OUT  	oltbs_contract_confirm%ROWTYPE	 ,
					p_err_code		  			IN OUT 	ertbs_msgs.err_code%TYPE		 ,
					p_err_param	  	  			IN OUT	VARCHAR2	
					)
RETURN BOOLEAN;
FUNCTION  fn_delete	(
					p_cstbs_contract_confirm    		IN      	oltbs_contract_confirm%ROWTYPE	 ,					
					p_err_code		  		      IN OUT 	ertbs_msgs.err_code%TYPE		 ,
					p_err_param	  			 	IN OUT	VARCHAR2	
				)
RETURN BOOLEAN;
FUNCTION fn_update_cstb_confirm (
					p_cstbs_contract_confirm    		IN OUT  	oltbs_contract_confirm%ROWTYPE	 ,
					p_err_code		  			IN OUT 	ertbs_msgs.err_code%TYPE		 ,
					p_err_param	  	  			IN OUT	VARCHAR2	
								)
RETURN BOOLEAN;
FUNCTION fn_insert_cstb_confirm (
					p_cstbs_contract_confirm    		IN OUT  	oltbs_contract_confirm%ROWTYPE	 ,
					p_err_code		  			IN OUT 	ertbs_msgs.err_code%TYPE		 ,
					p_err_param	  	  			IN OUT	VARCHAR2	
					)
RETURN BOOLEAN;

FUNCTION fn_get_affirm_type
				    (
				     p_main_type       IN       oltms_affirmation_type.affirm_type%type,
				     p_row_affirm_type IN OUT   oltms_affirmation_type%rowtype,
				     p_error_code      IN OUT   VARCHAR2,
				     p_error_parameter IN OUT   VARCHAR2
				    )
RETURN BOOLEAN;
FUNCTION fn_eval_cnfm_stat (
						p_cstbs_contract_confirm    IN OUT  oltbs_contract_confirm%ROWTYPE ,
						p_overall_conf		    IN OUT	VARCHAR2				 ,
						p_conf_pmt_stat		    IN OUT	VARCHAR2				 ,
						p_err_code		    IN OUT 	ertbs_msgs.err_code%TYPE	 ,
						p_err_param	  	     IN OUT	VARCHAR2	
						)
RETURN BOOLEAN ;
-- FCC 4.6 24-AUGUST-2004	4.6 Confirmation Matching --> START
FUNCTION fn_eval_cnfm_stat_new (
						p_cstbs_contract_confirm    IN OUT	oltbs_contract_confirm%ROWTYPE,
						p_overall_conf		    IN OUT	VARCHAR2,
						p_conf_pmt_stat		    IN OUT	VARCHAR2,
						p_dcn			    IN OUT	OLTB_DLY_MSG_OUT.dcn%TYPE,
						p_err_code	  	    IN OUT 	ertbs_msgs.err_code%TYPE,
						p_err_param	  	    IN OUT	VARCHAR2	
						)
RETURN BOOLEAN ;
-- FCC 4.6 24-AUGUST-2004	4.6 Confirmation Matching --> END
FUNCTION fn_rep_ins_cstb_confirm (
						p_cstbs_contract_confirm    IN OUT  oltbs_contract_confirm%ROWTYPE		   ,
						p_err_code		  	    IN OUT 	ertbs_msgs.err_code%TYPE				   ,
						p_err_param	  	  	    IN OUT	VARCHAR2	
						)
RETURN BOOLEAN;
END;
/
CREATE  or replace SYNONYM olpkss_confirm FOR olpks_cn_confirm
/