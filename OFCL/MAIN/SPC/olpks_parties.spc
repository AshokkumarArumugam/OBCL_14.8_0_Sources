CREATE OR REPLACE PACKAGE    olpks_parties
IS 
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_parties.SPC
**
** Module		: SETTLEMENTS
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
06-DEC-2003 Fcc 4.4 dec2003 changes for ITR1 SFR 136 Added  err code in the function
19-OCT-2007 FCC V.CL 7.3 UK CONSOLIDATION RETRO Changes 
	1-SEP-2007 FCC-7.3-RETRO-CITIUK-4.4-RETRO#118 START
		     CITIPLC PLC44080076 	problem with the mail confirmation messages.added another parameter in 
						fn_populate_receive_parties to to pass the option.
	1-SEP-2007 FCC-7.3-RETRO-CITIUK-4.4-RETRO#118 END
		   Changed reference of olpkss_parties to olpks_parties (Including synonym in same spc gives problem during compilation

*/

TYPE  g_field_rec_type IS RECORD 
(
	 field_no		VARCHAR2(100),
	 field_option	VARCHAR2(1),
	 accountline	oltbs_contractis_cs.our_recv_agtagt_acc%TYPE,	
	 party_line1	oltbs_contractis_cs.our_recv_agtagt1%TYPE,	
	 party_line2	oltbs_contractis_cs.our_recv_agtagt2%TYPE,	
	 party_line3	oltbs_contractis_cs.our_recv_agtagt3%TYPE,	
	 party_line4	oltbs_contractis_cs.our_recv_agtagt4%TYPE,	
	 value		VARCHAR2(2000)
);	

TYPE 	g_party_tbl_type IS TABLE OF	g_field_rec_type 
INDEX BY VARCHAR2(20);

TYPE  l_customer_swift_addr IS RECORD 
(
		msg_type    	oltms_cif_addl_swift_addr.msg_type%TYPE		,
		cover_reqd  	oltms_cif_addl_swift_addr.cover_reqd%TYPE		,
		currency_code 	oltms_cif_addl_swift_addr.currency_code%TYPE  	,
		module  		oltms_cif_addl_swift_addr.module%TYPE  		,
		product 		oltms_cif_addl_swift_addr.product%TYPE  		 		
);	

FUNCTION fn_enrich_parties
				(
				 p_usd_payment				IN		VARCHAR2,
				 p_rtgs_reqd				IN		VARCHAR2,
				 --FCC V.CL 7.3 UK CONSOLIDATION RETRO Changes Starts 
				 p_customer_swift_addr_rec  		IN		olpks_parties.l_customer_swift_addr,  	--FCC-7.3-RETRO-CITIUK-4.4-RETRO#118 olpkss_parties.l_customer_swift_addr,  	
				 --FCC V.CL 7.3 UK CONSOLIDATION RETRO Changes Ends
				 p_party_type				IN 		VARCHAR2,
				 p_clearing_network			IN OUT	VARCHAR2,
				 p_option					IN OUT	VARCHAR2,
				 p_customer_no				IN OUT	oltms_customer.customer_no%TYPE,	
				 p_accountline				IN OUT	oltbs_contractis_cs.our_recv_agtagt_acc%TYPE,	
				 p_party_line1				IN OUT	oltbs_contractis_cs.our_recv_agtagt1%TYPE,	
				 p_party_line2				IN OUT	oltbs_contractis_cs.our_recv_agtagt2%TYPE,	
				 p_party_line3				IN OUT	oltbs_contractis_cs.our_recv_agtagt3%TYPE,	
				 p_party_line4				IN OUT	oltbs_contractis_cs.our_recv_agtagt4%TYPE,	
				 p_value					IN OUT	VARCHAR2,				 
				 p_error_code				IN OUT	VARCHAR2,	
				 p_error_param				IN OUT	VARCHAR2
				)
RETURN BOOLEAN;

FUNCTION fn_is_bic_code
				(
				 p_sort_code				IN OUT	VARCHAR2,
				 p_option					IN OUT	VARCHAR2,
				 p_customer_no				IN OUT	oltms_customer.customer_no%TYPE,	
				 p_accountline				IN OUT	oltbs_contractis_cs.our_recv_agtagt_acc%TYPE,	
				 p_party_line1				IN OUT	oltbs_contractis_cs.our_recv_agtagt1%TYPE,	
				 p_party_line2				IN OUT	oltbs_contractis_cs.our_recv_agtagt2%TYPE,	
				 p_party_line3				IN OUT	oltbs_contractis_cs.our_recv_agtagt3%TYPE,	
				 p_party_line4				IN OUT	oltbs_contractis_cs.our_recv_agtagt4%TYPE,	
				 p_error_code				IN OUT	VARCHAR2,	
				 p_error_param				IN OUT	VARCHAR2				 	
				)

RETURN BOOLEAN;

FUNCTION fn_cif_shortname
				(
				 p_customer_swift_addr_rec  		IN	olpks_parties.l_customer_swift_addr,	--FCC-7.3-RETRO-CITIUK-4.4-RETRO#118 olpkss_parties.l_customer_swift_addr,
				 p_category					IN		VARCHAR2,
				 p_party_type				IN		VARCHAR2,													  		  	
				 p_option					IN OUT	VARCHAR2,
				 p_sort_code				IN OUT	VARCHAR2,
				 p_customer_no				IN OUT	oltms_customer.customer_no%TYPE,	
				 p_accountline				IN OUT	oltbs_contractis_cs.our_recv_agtagt_acc%TYPE,	
				 p_party_line1				IN OUT	oltbs_contractis_cs.our_recv_agtagt1%TYPE,	
				 p_party_line2				IN OUT	oltbs_contractis_cs.our_recv_agtagt2%TYPE,	
				 p_party_line3				IN OUT	oltbs_contractis_cs.our_recv_agtagt3%TYPE,	
				 p_party_line4				IN OUT	oltbs_contractis_cs.our_recv_agtagt4%TYPE,	
				 p_error_code				IN OUT	VARCHAR2,	
				 p_error_param				IN OUT	VARCHAR2				 	
				)
RETURN BOOLEAN;

FUNCTION fn_is_cust_account
					(
					--FCC V.CL 7.3 UK CONSOLIDATION RETRO Changes Starts 
					 p_customer_swift_addr_rec  		IN		olpks_parties.l_customer_swift_addr,  	--FCC-7.3-RETRO-CITIUK-4.4-RETRO#118 olpkss_parties.l_customer_swift_addr,  	
					 --FCC V.CL 7.3 UK CONSOLIDATION RETRO Changes Ends
					 p_party_type				IN 		VARCHAR2,
					 p_sort_code				IN OUT	VARCHAR2,
					 p_option					IN OUT	VARCHAR2,
					 p_customer_no				IN OUT	oltms_customer.customer_no%TYPE,	
					 p_accountline				IN OUT	oltbs_contractis_cs.our_recv_agtagt_acc%TYPE,	
					 p_party_line1				IN OUT	oltbs_contractis_cs.our_recv_agtagt1%TYPE,	
					 p_party_line2				IN OUT	oltbs_contractis_cs.our_recv_agtagt2%TYPE,	
					 p_party_line3				IN OUT	oltbs_contractis_cs.our_recv_agtagt3%TYPE,	
					 p_party_line4				IN OUT	oltbs_contractis_cs.our_recv_agtagt4%TYPE,	
					 p_error_code				IN OUT	VARCHAR2,	
					 p_error_param				IN OUT	VARCHAR2				 	
			 		)
RETURN BOOLEAN;

FUNCTION fn_is_sort_code
					(
					 --FCC V.CL 7.3 UK CONSOLIDATION RETRO Changes Starts 
					 p_customer_swift_addr_rec  		IN		olpks_parties.l_customer_swift_addr,  	--FCC-7.3-RETRO-CITIUK-4.4-RETRO#118 olpkss_parties.l_customer_swift_addr,  	
					 --FCC V.CL 7.3 UK CONSOLIDATION RETRO Changes Ends
					 p_party_type				IN 		VARCHAR2,					 
					 p_sort_code				IN OUT	VARCHAR2,
					 p_option					IN OUT	VARCHAR2,
					 p_customer_no				IN OUT	oltms_customer.customer_no%TYPE,	
					 p_accountline				IN OUT	oltbs_contractis_cs.our_recv_agtagt_acc%TYPE,	
					 p_party_line1				IN OUT	oltbs_contractis_cs.our_recv_agtagt1%TYPE,	
					 p_party_line2				IN OUT	oltbs_contractis_cs.our_recv_agtagt2%TYPE,	
					 p_party_line3				IN OUT	oltbs_contractis_cs.our_recv_agtagt3%TYPE,	
					 p_party_line4				IN OUT	oltbs_contractis_cs.our_recv_agtagt4%TYPE,	
					 p_error_code				IN OUT	VARCHAR2,	
					 p_error_param				IN OUT	VARCHAR2				 	
			 		)
RETURN BOOLEAN;

/*FUNCTION fn_usd_clearing_processing	
				(	
					p_accountline				IN OUT	oltbs_contractis_cs.our_recv_agtagt_acc%TYPE,	
					p_party_line1				IN OUT	oltbs_contractis_cs.our_recv_agtagt1%TYPE,	
					p_option					IN OUT	VARCHAR2,
					p_clearing_code				IN OUT	pctms_bank_param.bank_code%TYPE,	
					p_clearing_network			IN OUT	VARCHAR2,
					p_customer_no 				IN OUT	oltms_customer.customer_no%TYPE ,
					--
					-- Fcc 4.4 dec2003 changes for ITR1 SFR 136 Added  err code in the function
					--
					p_error_code				IN OUT	VARCHAR2,	
				 	p_error_param				IN OUT	VARCHAR2				 	
					--
					-- Fcc 4.4 dec2003 changes for ITR1 SFR 136 Added  err code in the function
					--
				)
RETURN BOOLEAN;*/ -- OFCL12.2 Not reqd

FUNCTION 	fn_populate_pay_parties
		(
		p_usd_payment 			IN 		VARCHAR2 ,
		p_citiny_processing		IN		VARCHAR2 ,
		p_rtgs_reqd				IN		VARCHAR2 ,
		p_msg_type				IN		oltms_msg_type.msg_type%TYPE,
		p_bic_of_receiver			IN		oltms_branch_bic.bic_code%TYPE,
		p_branch_rec			IN		oltms_branch%ROWTYPE,
		p_contract_rec			IN		oltbs_contract%ROWTYPE,
		--FCC V.CL 7.3 UK CONSOLIDATION RETRO Changes Starts 
		p_customer_swift_addr_rec	IN		olpks_parties.l_customer_swift_addr, --FCC-7.3-RETRO-CITIUK-4.4-RETRO#118 olpkss_parties.l_customer_swift_addr,
		--FCC V.CL 7.3 UK CONSOLIDATION RETRO Changes Ends
		p_is_out_rec_type			IN OUT	olpkss_new.g_contractis_record_type,				
		--FCC V.CL 7.3 UK CONSOLIDATION RETRO Changes Starts 
		p_field_tbl				IN OUT	olpks_parties.g_party_tbl_type,--FCC-7.3-RETRO-CITIUK-4.4-RETRO#118 olpkss_parties.g_party_tbl_type,
		--FCC V.CL 7.3 UK CONSOLIDATION RETRO Changes Ends
		p_err_code				IN OUT 	VARCHAR2,
		p_err_param				IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

FUNCTION fn_populate_receive_parties
		(
		p_branch_rec			IN		oltms_branch%ROWTYPE,
		p_contract_rec			IN		oltbs_contract%ROWTYPE,
--FCC V.CL 7.3 UK CONSOLIDATION RETRO Changes Starts 
--FCC-7.3-RETRO-CITIUK-4.4-RETRO#118 start
		p_option				IN		VARCHAR2,	--CITIPLC PLC44080076	
--FCC-7.3-RETRO-CITIUK-4.4-RETRO#118 end
--FCC V.CL 7.3 UK CONSOLIDATION RETRO Changes Ends
		p_is_out_rec_type			IN OUT	olpkss_new.g_contractis_record_type,				
		p_field_tbl				IN OUT	olpks_parties.g_party_tbl_type, --FCC-7.3-RETRO-CITIUK-4.4-RETRO#118 olpkss_parties.g_party_tbl_type,
		p_error_code			IN OUT 	VARCHAR2,
		p_error_parameter			IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

END ;
/
CREATE or replace SYNONYM olpkss_parties FOR olpks_parties
/