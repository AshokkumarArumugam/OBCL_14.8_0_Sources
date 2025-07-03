Create Or Replace Package Gwpks_Xml_Parser As
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

    /* CHANGE HISTORY
      DATE        SL.NO   TAG NAME                           DESCRIPTION
      ----------  -----   ------------------------      ------------------------------------------------------    
      03-FEB-2006          FC UBS V.UM 7.2.0.0.0.0.0 lot1    Muthuraman M      NEW
    
      21-JUN-2006   1      FCKERNEL72                        Changed the p_is_clob variable in fn_parse_xml function from 'IN OUT' to 'IN'.
      24-NOV-2006   2      KERN721RET1                       Checked in for KERNEL 7.3 against 7.2.1 Retro
      10-MAY-2007   3      KERNEL8.0                         New function  fn_parse_fcxml is added for FCJ xml parsing
      15-JUN-2007   4      KERNEL8.0                         New function  fn_xml_parser is added to take decsion based on source for parsing
      23-Dec-2008   5      FC UBS 10.2.0.0.0.0.2 BM Changes  Modified By         : Kunal
					                     Modified On         : 23-Dec-2008
						             Modified Reason     : Benchmark Performance changes PF-008
							     Retro Reference     : 10.2Emrel-SourceChangeTracker.xls/Change List/PF-008                    
						             Search String       : FC10 Performance Change PF-008
							     
      16-jul-2009   FC UBS 10.5.0.0.0.0.0                      Modified By         : RanjithaP
					                       Modified On         : 16-jul-2009
						               Modified Reason     : Sepa related  files are calling old fn_parse_xml.
							                             hence call has been diverted to new overloaded fn_parse_xml							      
							       Search String       : fcubs10.5 sfr 1508

	Modified By           : Chandrasekhar
	Modified On           : 02-Jun-2014
	Modified Description  : CLOB Handling Changes
	Search string         : [SITECODE: 12.0.3, INTERNAL-01082013 , BugDB ID: 18885314]_Retro_from_18069371									
	
							       
*/

    --KERNEL8.0 change starts new function is added which will take decision based on source for parsing




    --[SITECODE: 12.0.3, INTERNAL-01082013 , BugDB ID: 18885314]_Retro_from_18069371  Changes Start
    
  FUNCTION Fn_Xml_Parser_ovd
  (
    p_Source         IN    VARCHAR2,
    p_Parents_List         OUT   CLOB,
    p_Parents_Format       OUT   CLOB,
    p_Ts_Tag_Names         OUT   CLOB,
    p_Ts_Tag_Values        OUT   CLOB,
    p_Ts_Tag_Format        OUT   CLOB,
    p_Ts_Clob_Tag_Names    OUT   CLOB,
    p_Ts_Clob_Tag_Values   OUT   CLOB,
    p_Ts_Clob_Tag_Format   OUT   CLOB,
    p_Is_Clob              IN     VARCHAR2,
    p_Is_Tag_Clob          OUT   VARCHAR2,
    p_Err_Code             IN OUT   VARCHAR2,
    p_Err_Param            IN OUT   VARCHAR2
  ) 
  RETURN BOOLEAN;
              
  FUNCTION Fn_Parse_Xml_ovd
  (
    p_Xmlstr               IN    VARCHAR2,
    p_Xmlstr_Clob          IN     CLOB,
    p_Parents_List         OUT   CLOB,
    p_Parents_Format       OUT   CLOB,
    p_Ts_Tag_Names         OUT   CLOB,
    p_Ts_Tag_Values        OUT   CLOB,
    p_Ts_Tag_Format        OUT   CLOB,
    p_Ts_Clob_Tag_Names    OUT   CLOB,
    p_Ts_Clob_Tag_Values   OUT   CLOB,
    p_Ts_Clob_Tag_Format   OUT   CLOB,
    p_Is_Clob           IN     VARCHAR2,
    p_Is_Tag_Clob       OUT   VARCHAR2,
    p_Err_Code          IN OUT   VARCHAR2,
    p_Err_Param         IN OUT   VARCHAR2
  ) RETURN BOOLEAN;
             
  
  --[SITECODE: 12.0.3, INTERNAL-01082013 , BugDB ID: 18885314]_Retro_from_18069371	Changes end

    Function Fn_Xml_Parser(p_Source In Varchar2
                           --,p_xmlstr         IN    VARCHAR2   -- FC10 Performance Change PF-008
                           --,p_xmlstr_clob      IN    CLOB     -- FC10 Performance Change PF-008
                          ,p_Parents_List       Out Varchar2
                          ,p_Parents_Format     Out Varchar2
                          ,p_Ts_Tag_Names       Out Varchar2
                          ,p_Ts_Tag_Values      Out Varchar2
                          ,p_Ts_Tag_Format      Out Varchar2
                          ,p_Ts_Clob_Tag_Names  Out Clob
                          ,p_Ts_Clob_Tag_Values Out Clob
                          ,p_Ts_Clob_Tag_Format Out Clob
                          ,p_Is_Clob            In Varchar2
                          ,p_Is_Tag_Clob        Out Varchar2
                          ,p_Err_Code           In Out Varchar2
                          ,p_Err_Param          In Out Varchar2) Return Boolean;

    Function Fn_Parse_Xml( --p_xmlstr        IN      VARCHAR2    -- FC10 Performance Change PF-008
                          --,p_xmlstr_clob      IN      CLOB     -- FC10 Performance Change PF-008
                          p_Parents_List       Out Varchar2
                         ,p_Parents_Format     Out Varchar2
                         ,p_Ts_Tag_Names       Out Varchar2
                         ,p_Ts_Tag_Values      Out Varchar2
                         ,p_Ts_Tag_Format      Out Varchar2 --<<If the leaf tags format is reqd in string uncomment it >>
                         ,p_Ts_Clob_Tag_Names  Out Clob
                         ,p_Ts_Clob_Tag_Values Out Clob
                         ,p_Ts_Clob_Tag_Format Out Clob --<<If the leaf tags format is reqd in clob uncomment it >>
                          --,p_is_clob        IN  OUT   VARCHAR2 --21-JUN-2006      FCKERNEL72
                         ,p_Is_Clob   In Varchar2 --21-JUN-2006     FCKERNEL72
                         ,p_Err_Code  In Out Varchar2
                         ,p_Err_Param In Out Varchar2) Return Boolean;

--KERNEL8.0 change ends
  --FCUBS10.5 sfr # 1508  overloaded func fn_parse_xml is called starts 
    FUNCTION fn_parse_xml(p_xmlstr             IN VARCHAR2
                         ,p_xmlstr_clob        IN CLOB
                         ,p_parents_list       OUT VARCHAR2
                         ,p_parents_format     OUT VARCHAR2
                         ,p_ts_tag_names       OUT VARCHAR2
                         ,p_ts_tag_values      OUT VARCHAR2
                         ,p_ts_tag_format      OUT VARCHAR2
                         ,p_ts_clob_tag_names  OUT CLOB
                         ,p_ts_clob_tag_values OUT CLOB
                         ,p_ts_clob_tag_format OUT CLOB
                          --,p_is_clob        IN  OUT   VARCHAR2 --21-JUN-2006      FCKERNEL72
                         ,p_is_clob     IN VARCHAR2 --21-JUN-2006     FCKERNEL72
                         ,p_is_tag_clob OUT VARCHAR2 -- kernel8.0 changes
                         ,p_err_code    IN OUT VARCHAR2
                         ,p_err_param   IN OUT VARCHAR2) RETURN BOOLEAN;

--FCUBS10.5 sfr # 1508  overloaded func fn_parse_xml is called ends
End Gwpks_Xml_Parser;
/
Create Or Replace Synonym Gwpkss_Xml_Parser For Gwpks_Xml_Parser
/
