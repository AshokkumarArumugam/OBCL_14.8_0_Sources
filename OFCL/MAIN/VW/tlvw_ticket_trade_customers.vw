CREATE OR REPLACE FORCE VIEW tlvw_ticket_trade_customers AS
/*-------------------------------------------------------------------------------------- 
**  
**  File Name :tlvw_ticket_trade_customers.VW 
**  
**  Module    :LT-Loan Trading
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
SELECT DISTINCT a.ticket_id,a.agency_id counterparty,'A' customer_type
FROM tltbs_ticket_trade_master a
UNION
SELECT DISTINCT a.ticket_id,a.counterparty counterparty,'T' customer_type
FROM tltbs_ticket_trade_detail a
/
CREATE OR REPLACE SYNONYM tlvws_ticket_trade_customers FOR tlvw_ticket_trade_customers
/