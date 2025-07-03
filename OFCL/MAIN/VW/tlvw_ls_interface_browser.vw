create or replace FORCE view tlvw_ls_interface_browser as
/*-------------------------------------------------------------------------------------- 
**  
**  File Name :tlvw_ls_interface_browser.VW 
**  
**  Module    :LS-Loan Syndication and commitments
**  
This source is part of the Oracle Banking Corporate Lending  Software Product. 
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted 
in any form or by any means, electronic, mechanical, photographic, graphic, optic recording
or otherwise, translated in any language or computer language, without the prior written permission 
of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
---------------------------------------------------------------------------------------
*/
select "TRADE_REF_NO","EVENT_SEQ_NO","ACTUAL_SETTL_DATE","LT_EVENT_CODE","AGENCY_REF_NO","LS_EVENT_CODE","LS_EVENT_SEQ_NO","PROCESSING_DATE","PROCESSING_STATUS","RECORD_STAT","AUTH_STAT","ONCE_AUTH","MOD_NO","MAKER_ID","MAKER_DT_STAMP","CHECKER_ID","CHECKER_DT_STAMP","CUSIP_NO","POSITION_IDENTIFIER","EXPENSE_CODE","SOURCE_CODE" from tltbs_ls_interface_browser
union
select "TRADE_REF_NO","EVENT_SEQ_NO","ACTUAL_SETTL_DATE","LT_EVENT_CODE","AGENCY_REF_NO","LS_EVENT_CODE","LS_EVENT_SEQ_NO","PROCESSING_DATE","PROCESSING_STATUS","RECORD_STAT","AUTH_STAT","ONCE_AUTH","MOD_NO","MAKER_ID","MAKER_DT_STAMP","CHECKER_ID","CHECKER_DT_STAMP","CUSIP_NO","POSITION_IDENTIFIER","EXPENSE_CODE","SOURCE_CODE" from tltbs_ls_browser_history

/

create OR REPLACE synonym tlvws_ls_interface_browser for tlvw_ls_interface_browser
/