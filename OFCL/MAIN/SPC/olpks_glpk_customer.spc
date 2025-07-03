CREATE OR REPLACE PACKAGE olpks_glpk_customer
AS 
/* Formatted on 2003/07/08 16:17 (Formatter Plus v4.6.6) */
/*----------------------------------------------------------------------------------------------------
**
** File Name   : olpks_glpk_customer.SPC
**
** Module      : GENERAL LEDGER
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
/*-------------------------CHANGE HISTORY-------------
fcc 4.1 oct 2002 added function fn_bal_by_cust
08-JUL-2003	FCC 4.3 AUG 2003 GAAP Changes Added a new parameter pm_gaap for the function fn_gl_by_customer.
06-Jun-2016 OFCL standalone changes, commented not required code. Search string--- OFCL12.2 Not required
*/



 FUNCTION fn_gl_by_customer (p_brn VARCHAR2
   										--, pm_gaap gltms_gl_gaap.gaap_indicator%TYPE --FCC 4.3 AUG 2003 GAAP Changes-- OFCL12.2 Not required
   									)
      RETURN BOOLEAN;

   FUNCTION fn_bal_by_cust (pm_branch oltms_branch.branch_code%TYPE)
      RETURN INTEGER;
END;
/
CREATE or replace SYNONYM olpkss_glpk_customer for olpks_glpk_customer
/