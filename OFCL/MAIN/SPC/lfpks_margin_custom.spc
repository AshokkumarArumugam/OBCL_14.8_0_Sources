CREATE OR REPLACE PACKAGE lfpks_margin_custom AS
/*-----------------------------------------------------------------------------------
**
** File Name	: lfpks_margin_custom.SPC
**
** Module	: MARGIN AND INTEREST
**
This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
-------------------------------------------------------------------------------------
*/
/*-----------------------------------CHANGE HISTORY----------------------------------

  Changed By         : Palanisamy M
  Date               : 16-May-2023
  Change Description : Hook for Fn_Margin_Pickup_Wrapper
  Search String      : Bug#35386919 
  
  Changed By         : Palanisamy M
  Date               : 24-May-2023
  Change Description : Hook for fn_mark_margin_repickup_valuem
  Search String      : Bug#35423997  	  

------------------------------------END CHANGE HISTORY-------------------------------------
*/

   FUNCTION fn_pre_margin_pickup_wrapper(p_dd_ref_no      IN oltbs_contract.contract_ref_no%TYPE,
                                     p_error_code     IN OUT VARCHAR2,
                                     p_error_params   IN OUT VARCHAR2,
                                     p_event_reg_reqd IN VARCHAR2 DEFAULT 'Y',
                                     p_esn            IN VARCHAR2 DEFAULT NULL) RETURN BOOLEAN;

   FUNCTION fn_post_margin_pickup_wrapper(p_dd_ref_no      IN oltbs_contract.contract_ref_no%TYPE,
                                     p_error_code     IN OUT VARCHAR2,
                                     p_error_params   IN OUT VARCHAR2,
                                     p_event_reg_reqd IN VARCHAR2 DEFAULT 'Y',
                                     p_esn            IN VARCHAR2 DEFAULT NULL) RETURN BOOLEAN;
									 
   --Bug#35423997 Changes Starts
   FUNCTION fn_pre_mark_margin_repickup_valuem(p_tranche_ref_no  IN oltbs_contract.contract_ref_no%TYPE,
                                               p_margin_comp     IN lftbs_contract_margin_master.margin_component%TYPE,
                                               p_cust            IN lftbs_contract_margin_master.customer_no%TYPE,
                                               p_processing_date DATE,
                                               p_error_code      IN OUT ertbs_msgs.err_code%TYPE,
                                               p_error_params    IN OUT VARCHAR2) RETURN BOOLEAN;

   FUNCTION fn_post_mark_margin_repickup_valuem(p_tranche_ref_no  IN oltbs_contract.contract_ref_no%TYPE,
                                                p_margin_comp     IN lftbs_contract_margin_master.margin_component%TYPE,
                                                p_cust            IN lftbs_contract_margin_master.customer_no%TYPE,
                                                p_processing_date DATE,
                                                p_error_code      IN OUT ertbs_msgs.err_code%TYPE,
                                                p_error_params    IN OUT VARCHAR2) RETURN BOOLEAN;
   --Bug#35423997 Changes Ends
	
END lfpks_margin_custom;
/
CREATE or replace SYNONYM lfpkss_margin_custom FOR lfpks_margin_custom
/