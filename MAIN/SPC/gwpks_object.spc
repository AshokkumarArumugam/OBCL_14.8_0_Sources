Create Or Replace Package Gwpks_Object Is
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Software Product.
** Copyright (R) 2016 , Oracle and/or its affiliates.  All rights reserved
**
**
** No part of this work may be reproduced, stored in a retrieval system, adopted
** or transmitted in any form or by any means, electronic, mechanical,
** photographic, graphic, optic recording or otherwise, translated in any
** language or computer language, without the prior written permission of
** Oracle and/or its affiliates.
**
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India
** India
------------------------------------------------------------------------------------------
*/
/*
No part of it may be reproduced, stored in a retrival system,
    ** adopted or transmitted in any FORm or by means,electronical,mechanical,photographic,
    ** optic recording or otherwise,translated in any language or computer language,
    ** without prior written permission of Oracle Financial Services Software Limited.
    **
    **
    ** Oracle Financial Services Software Limited.
    ** 10-11, SDF I, SEEPZ, Andheri (East),
    ** Mumbai - 400 096.
    ** India
    **
    ** Copyright © 2008- 2009 by Oracle Financial Services Software Limited.
    -------------------------------------------------------------------------------------*/
    /*--------------------------------CHANGE HISTORY---------------------------------------
      DATE        SL.NO   TAG NAME                           DESCRIPTION
      ----------  -----   ------------------------           ------------------------------------------------------
      23-Dec-2008   1     FC UBS 10.2.0.0.0.0.2 BM Changes   Added By           : Kunal
					                     Added On           : 23-Dec-2008
						             Added Reason       : Benchmark Performance changes PF-008
							     Retro Reference    : 10.2Emrel-SourceChangeTracker.xls/Change List/PF-008                    
						             Search String      : FC10 Performance Change PF-008
                         
    Changed By : Ganesh N
    Changed Date: 09-Oct-2013
    Change Description : To Process the SEPA Bulk Messages.
    Search string: FCUBS_12.0.2 SEPA Upgrade from V3.2 to V7.0 <ganesh> (Bug 16765789 - IBOSREURFCC0661-changes)
    --------------------------------------------------------------------------------------
*/
    -- Public type declarations

    -- Public variable declarations
    g_Inlob  Clob;
    g_Instr  Varchar2(32767);
    g_Outlob Clob;
    g_Outstr Varchar2(32767);
    -- Public function and procedure declarations
    Function Fn_Getinlobmsg Return Clob;
    Function Fn_Getinstrmsg Return Varchar2;
    Procedure Pr_Setinlobmsg(p_Xml_Clob In Clob);
    Procedure Pr_Setinstrmsg(p_Xml_Str In Varchar2);
    Function Fn_Getoutlobmsg Return Clob;
    Function Fn_Getoutstrmsg Return Varchar2;
    Procedure Pr_Setoutlobmsg(p_Xml_Clob In Clob);
    Procedure Pr_Setoutstrmsg(p_Xml_Str In Varchar2);
    --FCUBS_12.0.2 SEPA Upgrade from V3.2 to V7.0 <ganesh>
    --Bug 16765789 - IBOSREURFCC0661-changes-starts
    Procedure Pr_Setinstr_xmlmsg(p_Xml_Str In Varchar2);
    Function Fn_Getinstr_xmlmsg Return Varchar2;
    g_Instr_xml  Varchar2(32767);
    
    Procedure PR_SET_ISBULK_XMLMSG(p_Str In Varchar2);
    Function FN_ISBULK_XMLMSG Return Varchar2;
    g_ISBULK_xml  Varchar2(1);
    --Bug 16765789 - IBOSREURFCC0661-changes-ends 
    --FCUBS_12.0.2 SEPA Upgrade from V3.2 to V7.0 <ganesh>
End Gwpks_Object;
/
Create Or Replace Synonym Gwpkss_Object For Gwpks_Object
/