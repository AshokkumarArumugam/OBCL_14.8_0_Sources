CREATE OR REPLACE PACKAGE lbpks_part_lov
AS
/*----------------------------------------------------------------------------------------------
  **
  ** File Name    : lbpks_part_lov.SPC
  **
  ** Module       : LS (Loan Syndication)
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
/* ********************************************************************************************************
   PURPOSE: This package is used to store the participant info selected in lsptlist.fmb 
	    and populate the participant info and created newly for the
	    release FLEXCUBE V.CL Release 7.0
			
   REVISIONS:
   Ver        Date        Author		Description
   ---------  ----------  ---------------	------------------------------------
   1.0        11/29/2005  Ratish Agrawal	This package is used to store the participant info 
						selected in lsptlist.fmb and populate the participant info.
		31-JUL-07			FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-LS-28
						Cursor c_customer is changed to remove the restriction of customer_type='B'
                                                and included other conditions.
   02-NOV-2007 FCC V.CL 7.3 FDPRAM CHANGES      Added a new function fn_read_data_pama   
   09-OCT-2008 FLEXCUBE V.CL Release 7.4 STP, SFR#174, If participant selection for self participant is done with "participant name" is not getting displayed in tranche online screen
   24-NOV-2008 CITIUS-LS#5057, System is not querying up the participant list thru participant name.
   							   In site oltm_customer, customer_category has one of the value as INVESTOR. Where as in code it has been hardcoded with INVESTORS. So query problem.
   19-FEB-2009 FCC V.CL Release 7.5  CITIPBG RETRO  TILL#19 CHANGES :lncluded X9$ as 'CITIPBG' for 'CITIUS' x9$ conditions. 
   30-JAN-2012 Flexcube V.CL Release 7.10 - Retro
   	18-Jan-2012 FLEXCUBE V.CL Release 7.9 Changes EURCITIPLC-LS#12387 : Changes made so that if position maintenance is done for the customer, pick it from maintenance only and from sttm_customers.
**********************************************************************************************************
*/


      TYPE tb_customer IS TABLE OF VARCHAR2(40)
            INDEX BY VARCHAR2(40);

      TYPE customer_date_rec IS RECORD(
            contract_ref_no   lbtms_contract_participants.contract_ref_no%TYPE,
            customer_no       lbtms_contract_participants.customer_no%TYPE
      );

      TYPE tb_customer_data IS TABLE OF customer_date_rec
            INDEX BY BINARY_INTEGER;

      CURSOR c_customer(sitecode	VARCHAR2)
      IS
            SELECT customer_no, customer_name1, customer_name2	--FLEXCUBE V.CL Release 7.3 Changes,concatenate customer_name2
              FROM oltms_customer
            -- WHERE customer_type = 'B';--FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-LS-28 START
	     WHERE auth_stat = 'A'
	       AND record_stat = 'O'
	        --start changes EURCITIPLC-LS#12387
	       and customer_no not in (SELECT PORTFOLIO
			FROM tltms_position_identifier
			where PORTFOLIO = customer_no
			and (record_stat='O' or auth_stat = 'A')
			)
		--end changes EURCITIPLC-LS#12387
	       AND (
	       --(sitecode = 'CITIUS' AND customer_category = 'INVESTORS')	--CITIUS-LS#5057
	       --19-FEB-2009 FCC V.CL Release 7.5  CITIPBG RETRO  TILL#19 CHANGES START:lncluded X9$ as 'CITIPBG' for 'CITIUS' x9$ conditions. 
	       --(sitecode = 'CITIUS' AND customer_category = 'INVESTOR')	--CITIUS-LS#5057
	       (sitecode in('CITIUS','CITIPBG') AND customer_category = 'INVESTOR')	--CITIUS-LS#5057
	       OR 
	       --19-FEB-2009 FCC V.CL Release 7.5  CITIPBG RETRO  TILL#19 CHANGES END:lncluded X9$ as 'CITIPBG' for 'CITIUS' x9$ conditions. 
		--(sitecode <> 'CITIUS' AND customer_type = 'B'  )
		(sitecode not in('CITIUS','CITIPBG') AND customer_type = 'B'  )
		)
		--09-OCT-2008 FLEXCUBE V.CL Release 7.4 STP, SFR#174 starts
		UNION
		SELECT position_identifier customer_no,position_identifier_desc customer_name1,'' customer_name2
		FROM tltms_position_identifier
		where  record_stat='O'
		AND auth_stat='A';
		-- 09-OCT-2008 FLEXCUBE V.CL Release 7.4 STP, SFR#174 ends
		--FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-LS-28 END

      tb_cust_detail   tb_customer;

      FUNCTION fn_populate_cust
            RETURN BOOLEAN;

      FUNCTION fn_cust_name(v_cust_no VARCHAR2)
            RETURN VARCHAR2;

      FUNCTION fn_write_data(p_cust_data IN tb_customer_data)
            RETURN BOOLEAN;

      FUNCTION fn_read_data(
            p_cust_data   OUT NOCOPY   tb_customer_data,
            p_flush                    CHAR
      )
            RETURN BOOLEAN;
      -- 02-NOV-2007 FCC V.CL 7.3 FDPRAM CHANGES STARTS
      FUNCTION fn_read_data_pama(	
	      			p_contract_ref_no 	IN 	lbtws_consol_transfer.contract_ref_no%type,
      				p_entry_seq_no 		IN 	lbtws_consol_transfer.entry_seq_no%type,
      				p_value_date 		IN 	lbtws_consol_transfer.value_date%type,
      				p_cust_data 		IN OUT 	tb_customer_data
      				)
      RETURN BOOLEAN;
      -- 02-NOV-2007 FCC V.CL 7.3 FDPRAM CHANGES ENDS
	  --CITIUS-LS#5057 Starts
	  --CITIUS-LS Till#1421 starts
	  FUNCTION fn_cust_full_name(v_cust_no VARCHAR2)
	  RETURN VARCHAR2;
	  --CITIUS-LS Till#1421 ends
	  --CITIUS-LS#5057 Ends

END lbpks_part_lov;
/
Create or replace Synonym lbpkss_part_lov for lbpks_part_lov
/