CREATE OR REPLACE PACKAGE olpks_party
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : olpks_party.SPC
**
** Module       : SETTLEMENT INSTRUCTIONS
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
change history

03-06-02 fcc4.0 june 2002 changes for the bic directory split . the isobic function is overloadedd
05-AUG-2003 FCC 4.3 AUG 2003 overloaded the function validate_sndr_to_rcvr_info to have product code
						in sql changed valid function to have product code



*/




	FUNCTION VALIDATE_PARTY (PL1 IN VARCHAR2,
			 PL2 IN VARCHAR2,
			 PL3 IN VARCHAR2,
			 PL4 IN VARCHAR2,
			 OPTION_A IN BOOLEAN,
			 OPTION_B IN BOOLEAN,
			 OPTION_C IN BOOLEAN,
			 OPTION_D IN BOOLEAN,
			 MATCHING_OPTION OUT VARCHAR2
			 ) RETURN BOOLEAN;

	FUNCTION validate_payment_details (PD1 IN VARCHAR2,
				   PD2 IN VARCHAR2,
				   PD3 IN VARCHAR2,
				   PD4 IN VARCHAR2)
	RETURN BOOLEAN;

	FUNCTION validate_sndr_to_rcvr_info (SR1 IN VARCHAR2,
				     SR2 IN VARCHAR2,
				     SR3 IN VARCHAR2,
				     SR4 IN VARCHAR2,
				     SR5 IN VARCHAR2,
				     SR6 IN VARCHAR2)
	RETURN BOOLEAN;

-- FCC 4.3 AUG 2003 FXMM Enhancements
-- Overloaded the function to have product code
	FUNCTION validate_sndr_to_rcvr_info (SR1 IN VARCHAR2,
				     SR2 			IN VARCHAR2,
				     SR3 			IN VARCHAR2,
				     SR4 			IN VARCHAR2,
				     SR5 			IN VARCHAR2,
				     SR6 			IN VARCHAR2,
				     p_product_code	IN VARCHAR2)
	RETURN BOOLEAN;
-- FCC 4.3 AUG 2003 FXMM changes ends here

	FUNCTION fn_cross_validate (p_int_reim_inst1		IN	VARCHAR2
					,p_int_reim_inst2		IN	VARCHAR2
					,p_int_reim_inst3		IN	VARCHAR2
					,p_int_reim_inst4		IN	VARCHAR2
					,p_int_reim_inst5		IN	VARCHAR2
					,p_rcvr_corresp1		IN	VARCHAR2
					,p_rcvr_corresp2		IN	VARCHAR2
					,p_rcvr_corresp3		IN	VARCHAR2
					,p_rcvr_corresp4		IN	VARCHAR2
					,p_rcvr_corresp5		IN	VARCHAR2
					,p_intermediary1		IN	VARCHAR2
					,p_intermediary2		IN	VARCHAR2
					,p_intermediary3		IN	VARCHAR2
					,p_intermediary4		IN	VARCHAR2
					,p_intermediary5		IN	VARCHAR2
					,p_acc_with_instn1		IN	VARCHAR2
					,p_acc_with_instn2		IN	VARCHAR2
					,p_acc_with_instn3		IN	VARCHAR2
					,p_acc_with_instn4		IN	VARCHAR2
					,p_acc_with_instn5		IN	VARCHAR2
					,p_payment_details1		IN	VARCHAR2
					,p_payment_details2		IN	VARCHAR2
					,p_payment_details3		IN	VARCHAR2
					,p_payment_details4		IN	VARCHAR2
					,p_sndr_to_rcvr_info1	IN	VARCHAR2
					,p_sndr_to_rcvr_info2	IN	VARCHAR2
					,p_sndr_to_rcvr_info3	IN	VARCHAR2
					,p_sndr_to_rcvr_info4	IN	VARCHAR2
					,p_sndr_to_rcvr_info5	IN	VARCHAR2
					,p_sndr_to_rcvr_info6	IN	VARCHAR2
					,p_ordering_instn1		IN	VARCHAR2
					,p_ordering_instn2		IN	VARCHAR2
					,p_ordering_instn3		IN	VARCHAR2
					,p_ordering_instn4		IN	VARCHAR2
					,p_ordering_instn5		IN	VARCHAR2
					,p_ordering_cust1		IN	VARCHAR2
					,p_ordering_cust2		IN	VARCHAR2
					,p_ordering_cust3		IN	VARCHAR2
					,p_ordering_cust4		IN	VARCHAR2
					,p_ordering_cust5		IN	VARCHAR2
					,p_benef_instn1		IN	VARCHAR2
					,p_benef_instn2		IN	VARCHAR2
					,p_benef_instn3		IN	VARCHAR2
					,p_benef_instn4		IN	VARCHAR2
					,p_benef_instn5		IN	VARCHAR2
					,p_ult_benef1			IN	VARCHAR2
					,p_ult_benef2			IN	VARCHAR2
					,p_ult_benef3			IN	VARCHAR2
					,p_ult_benef4			IN	VARCHAR2
					,p_ult_benef5			IN	VARCHAR2
					,p_errcode		IN	OUT	VARCHAR2)
	RETURN BOOLEAN;
	FUNCTION isobic (inpval IN VARCHAR2)
	RETURN BOOLEAN;

--fcc4.0 june 2002 changes for the bic directory split

	FUNCTION isobic (inpval IN VARCHAR2 , NEW_flag in VARCHAR2 )
	RETURN BOOLEAN;
--fcc4.0 june 2002 changes for the bic directory split ends


END olpks_party;
/
create or replace synonym olpkss_party FOR olpks_party
/