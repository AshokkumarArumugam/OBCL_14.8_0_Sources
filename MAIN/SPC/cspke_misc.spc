CREATE OR REPLACE PACKAGE cspke_misc AS
/*------------------------------------------------------------------------------------------
**
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
CHANGE HISTORY
New function fn_GetParam_EX forKondor Interface
21-FEB-2002 FCC4.5 Tunning  sl_no in fn_splitno is made number
21-JUN-2006 KERNEL 7.2 - Added an overloaded fn_getparam for handling CLOB

** changed By            : Anub mathew
** changed On            : 31-Aug-2012
** Change Description        : Contract reference number with nonumeric characters in the last 4 digits is failing. Changed the Type of l_serial.For BUGDB#14399743 11.1,RONBTR          
** Search String          : FCUBS12.0 INTERNAL Retroed from lower version SFR#14555953

** changed By            : Sumeet Yajnik
** changed On            : 19-Jul-2013
** Release               : 12.0.2
** Change Description    : unable to save CL 20 yrs loan on accepting the Overrides.
** Search String         : 17049371

** Modified By   : Vishalakshi N
** Modified On   : 06-Aug-2014
** Description   : To display Amount in Words In CG Advices
** Search String : INTERNAL_RETRO_19369918

**   Modified By     : Anoop R
**   Modified On     : 05-Jan-2015
**   Modified Reason : Additional changes done for the extensibility hooks so as to skip the kernel code if the release type is custom.
**   Search String   : 12.1.0_20285116

Modified By       : Pankaj
  Modified On       : 14-Apr-2015
  Modified Reason   : Performance Tuning : Removed the pragma restriction for the function FN_GetParam,
                                  As the function call for fetching the data from Cstb_Param (using FRC function) is restricted. 
  Search String     : 9NT1532 : Performance Tuning With FRC
  
  	**
	** Changed by 	 : Vinutha Kini
	** Changed on 	 : 26-Aug-2016
	** Description	 : Core clean up for 12.3
	** Search String : Standalone12.3 CleanUp   

	** Changed by 	 : Ravali Vemula
	** Changed on 	 : 23-Sep-2016
	** Description	 : Functions added for OFCL, Corporate Lending 12.3
	** Search String : OFCL_12.3
  
  ** Changed by 	 : Karthikeyan k
	** Changed on 	 : 19-Nov-2016
	** Description	 : Contract reference number with nonumeric characters in the last 4 digits is failing.
                     Overriden functions added to resolve this issue.
	** Search String : FCUBS12.3_ITR1_25098554
  	**
	** Changed by 	 : Vinutha Kini
	** Changed on 	 : 21-Nov-2016
	** Description	 : Reverting fix for 25098554
	** Search String : FCUBS_12.3Payments_Revert_25098554 	
    
    ** Changed by 	 : Karthikeyan k
	** Changed on 	 : 24-Nov-2016
	** Description	 : Reverting the commented code, changed the data type of sl_no to VARACHAR2
	** Search String : FCUBS12.3_ITR1_25098554_Uncommented
*/
----------------------------------------------------------------------------------------------------

-- OBJECT : CSPKE_MISC               DATE /TIME : 15-MAR-96 15:24:41

  --12.1.0_20285116 starts
   PROCEDURE Pr_Set_Skip_Kernel;
   PROCEDURE Pr_Set_Activate_Kernel;
   PROCEDURE Pr_Set_Skip_Cluster;
   PROCEDURE Pr_Set_Activate_Cluster;

   FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;
  --12.1.0_20285116 ends 

FUNCTION FN_BOOL_TO_NUM(value IN BOOLEAN) 
RETURN NUMBER;
-- trlrabo 14/4 rewrote for NLS support

function fn_gettext(    p_lang cstms_amtword_text.lang%type, 
                p_num number) 
return varchar2;

function fn_gettype(    p_lang cstms_amtword_text.lang%type,
                p_num number) 
return varchar2;

function fn_num2words(  p_lang cstms_amtword_text.lang%type,
                p_num number,
                p_ccy cstms_amtword_ccy.ccy%type) 
return varchar2;

--FCC4.4 function added to convert date format to word format.
FUNCTION fn_date2words( p_date      IN      varchar2,
                p_date_words    IN OUT  varchar2)
RETURN VARCHAR2;

/*
--KERNEL8.0
    FUNCTION fn_getparam(p_text_clob IN CLOB
                        ,p_pos       IN NUMBER
                        ,p_sep       IN VARCHAR2 DEFAULT '~')

     RETURN CLOB;
--KERNEL8.0
*/
     FUNCTION FN_SPLITREFNO(    ref_no IN VARCHAR2, 
                branch OUT VARCHAR2, 
                product OUT VARCHAR2,
                book_date OUT DATE, 
                sl_no OUT NUMBER) -- FCC4.5 Tuning [FCUBS12.0 INTERNAL Retroed from lower version SFR#14555953] commented --Standalone12.3 Changes
                --sl_no OUT cstbs_contract.serial_no%TYPE) -- [FCUBS12.0 INTERNAL Retroed from lower version SFR#14555953] Added Type
RETURN BOOLEAN;
--FCUBS12.3_ITR1_25098554_Uncommented starts
--FCUBS_12.3Payments_Revert_25098554 starts
--FCUBS12.3_ITR1_25098554  STARTS
 FUNCTION FN_SPLITREFNO(    ref_no IN VARCHAR2,
                branch OUT VARCHAR2,
                product OUT VARCHAR2,
                book_date OUT DATE,
                sl_no OUT VARCHAR2)
RETURN BOOLEAN;
--FCUBS12.3_ITR1_25098554 ENDS
--FCUBS_12.3Payments_Revert_25098554 ends
--FCUBS12.3_ITR1_25098554_Uncommented Ends

function fn_round_1by32
        (
        p_rate      IN  number,
        p_indicator     IN  varchar2
        )
return number;

FUNCTION FN_FORMREFNO
        (
         branch         IN  VARCHAR2,
         product        IN  VARCHAR2,
         book_date      IN  DATE, 
         sl_no      IN  NUMBER,
         ref_no         OUT     VARCHAR2
        ) 
RETURN BOOLEAN;

FUNCTION FN_ADDREF
        (
         branch         IN  CHAR,
         product        IN  VARCHAR2,
         book_date      IN  VARCHAR2,
         date_format    IN  VARCHAR2,
         seq_no         IN  NUMBER
        )
RETURN VARCHAR2;

Function FN_GetParam
        (
         text       IN      VARCHAR2,
         pos            IN      NUMBER,
         sep            IN  VARCHAR2 DEFAULT '~'
        )
RETURN VARCHAR2;
--9NT1532 : Performance Tuning With FRC
--Pragma Restrict_references(FN_GetParam,WNDS,WNPS);
function fn_getparam_no
        (
         in_list            VARCHAR2,
         comp           VARCHAR2,
         sep            VARCHAR2
        )RETURN INTEGER;

--Kondor Interface change

FUNCTION fn_GetParam_EX
        (
         strProcessString       VARCHAR2,
         intField           INTEGER,
         strSeparatorChar       VARCHAR2    DEFAULT '~',
             overrideStartChar  VARCHAR2    DEFAULT '"',
         overrideEndChar        VARCHAR2    DEFAULT '"'
        )
RETURN VARCHAR2 ;

--Added for S390 Changes
FUNCTION fn_getchr(p_num NUMBER) RETURN VARCHAR2;

FUNCTION fn_getascii(p_char VARCHAR2) RETURN NUMBER;

-- 21-JUN-2006 KERNEL 7.2 - Added the following fn_getparam for handling CLOB
FUNCTION fn_getparam    (   p_text_str      IN      VARCHAR2     
                        ,   p_text_clob     IN      CLOB
                        ,   p_is_clob       IN      VARCHAR2    DEFAULT 'N'
                        ,   p_pos           IN      NUMBER
                        ,   p_sep           IN      VARCHAR2    DEFAULT '~'
                        )

RETURN CLOB;  --SFR #17049371
--RETURN VARCHAR2;
-- 21-JUN-2006 KERNEL 7.2 - ENDS

--INTERNAL_RETRO_19369918 starts 
 FUNCTION num2words_n(p_lang varchar2, 
                      p_num number)
  RETURN VARCHAR2;
--INTERNAL_RETRO_19369918 ends
------------------------------------------------------------------

--OFCL_12.3 starts
  FUNCTION fn_is_numeric(p_param VARCHAR2) RETURN NUMBER;

  FUNCTION fn_chinese_number_conversion(p_input             IN VARCHAR2,
                                        p_chinese_lang_type IN VARCHAR2,
                                        p_chinese_char_type IN VARCHAR2,
                                        p_chinese_output    OUT VARCHAR2,
                                        p_err_code          IN OUT VARCHAR2,
                                        p_err_param         IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_chinese_currency_conversion(p_input             IN VARCHAR2,
                                          p_chinese_lang_type IN VARCHAR2,
                                          p_chinese_output    OUT VARCHAR2,
                                          p_err_code          IN OUT VARCHAR2,
                                          p_err_param         IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_chinese_date_conversion(p_input             IN VARCHAR2,
                                      p_chinese_lang_type IN VARCHAR2,
                                      p_chinese_output    OUT VARCHAR2,
                                      p_err_code          IN OUT VARCHAR2,
                                      p_err_param         IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION nlpad(p_input        VARCHAR2,
                 p_length       NUMBER,
                 p_padding_char VARCHAR2 DEFAULT ' ') RETURN VARCHAR2;

  FUNCTION nrpad(p_input        VARCHAR2,
                 p_length       NUMBER,
                 p_padding_char VARCHAR2 DEFAULT ' ') RETURN VARCHAR2;
--OFCL_12.3 ends

END cspke_misc;
/
CREATE OR REPLACE SYNONYM cspkes_misc FOR cspke_misc
/