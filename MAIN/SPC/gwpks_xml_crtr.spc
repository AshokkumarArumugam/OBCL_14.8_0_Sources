CREATE OR REPLACE PACKAGE Gwpks_Xml_Crtr AS
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
   -------------------------------------------------------------------------------------*/

    /* CHANGE HISTORY
     Date       .     Tag Name                        Description
           -----------      --------    --------------                  -------------------
      03-FEB-2006 FC UBS V.UM 7.2.0.0.0.0.0 lot1  Muthuraman M  NEW
      20-MAY-2006 FCKERNEL72L1IT1 SFR#142   Modified the xml format for notification
                                             Modified the singnature of fn_create_xml to use TYPE (ty_biz_process_header)
      16-JUN-2006 FCKERNEL72                Modified the signature to include the process status.
      07-NOV-2006 KERNEL73                   Modified the signature to inculde the overloaded function fn_create_xml
                                            to have error type
      24-NOV-2006 KERN721RET1               checked in for KERNEL 7.3 against 7.2.1 Retro
      30-MAY-2007 KERNEL8.0                  New function fn_create_fcxml is added for fcj xml creation
      15-JUN-2007 KERNEL8.0                 New function fn_xml_creator is added ,based on source it will take decsion for creating xml
      
       02-JAN-2009                   FC UBS 10.2.0.0.0.0.2 BM Changes            Modified By         : Rohit
                                                                                  Modified On         : 02-jan-2009 
                                                                                  Modified Reason     : Benchmark Performance changes PF-008
                                                                                  Retro Reference     : 10.2Emrel-SourceChangeTracker.xls/Change List/PF-008
                                                                                  Search String       : FC10 Performance Tuning PF-008
      03-Dec-2009 FC11.0 ITR1 SFR 1465 g_enrich_parenttag variable is declared for not to supress the parent tag   

	  Modified On    : 19-JUL-2012
      Modified By    : Arun Parappagoudar
      Modified Reason: Failing in GWPKS_SPEVENTQUERY with numeric value error. CLOB handling is done
      Search String  : 11.3_MWKRBM_14346334	  (Retro for 14209804)
    */


     FUNCTION Fn_Create_Xml(p_Biz_Proc_Hdr       IN Gwpkss_Service_Router.Ty_Biz_Process_Header,
                           p_Instr_Rec          IN Gwpks_Service_Router.Ty_Processing_Instructions,
                           p_Parent_List        IN VARCHAR2,
                           p_Parents_Format     IN VARCHAR2,
                           p_Ts_Tag_Names       IN VARCHAR2,
                           p_Ts_Tag_Values      IN VARCHAR2,
                           p_Ts_Tag_Format      IN VARCHAR2,
                           p_Ts_Clob_Tag_Names  IN CLOB,
                           p_Ts_Clob_Tag_Values IN CLOB,
                           p_Ts_Clob_Tag_Format IN CLOB,
                           p_Process_Status     IN VARCHAR2,
                          --p_Xmlstr             OUT VARCHAR2,-- FC10 Performance Change PF-008 
                          -- p_Xmlstr_Clob        OUT CLOB,-- FC10 Performance Change PF-008
                           p_Is_Clob            IN OUT VARCHAR2,
                           p_Typ_Err            IN OUT Ovpkss.Tbl_Error) RETURN BOOLEAN;

        FUNCTION Fn_Create_Xml(p_Biz_Proc_Hdr       IN Gwpkss_Service_Router.Ty_Biz_Process_Header,
                           p_Instr_Rec          IN Gwpkss_Service_Router.Ty_Processing_Instructions,
                           p_Parent_List        IN VARCHAR2,
                           p_Parents_Format     IN VARCHAR2,
                           p_Ts_Tag_Names       IN VARCHAR2,
                           p_Ts_Tag_Values      IN VARCHAR2,
                           p_Ts_Tag_Format      IN VARCHAR2,
                           p_Ts_Clob_Tag_Names  IN CLOB,
                           p_Ts_Clob_Tag_Values IN CLOB,
                           p_Ts_Clob_Tag_Format IN CLOB,
                           p_Process_Status     IN VARCHAR2 --16-JUN-2006 FCKERNEL72
                          ,
                          -- p_Xmlstr             OUT VARCHAR2,-- FC10 Performance Change PF-008
                          -- p_Xmlstr_Clob        OUT CLOB,-- FC10 Performance Change PF-008
                           p_Is_Clob            IN OUT VARCHAR2,
                           p_Err_Code           IN OUT VARCHAR2,
                           p_Err_Param          IN OUT VARCHAR2) RETURN BOOLEAN;

    --07-NOV-2006 KERNEL73 changes starts

    --07-NOV-2006 KERNEL73 changes ends
    FUNCTION Fn_Create_Notif_Xml(p_Ts_Header_Tag_Names  IN VARCHAR2,
                                 p_Ts_Header_Tag_Values IN VARCHAR2,
                                 p_Parent_List          IN VARCHAR2,
                                 p_Parents_Format       IN VARCHAR2,
                                 p_Ts_Tag_Names         IN VARCHAR2,
                                 p_Ts_Tag_Values        IN VARCHAR2,
                                 p_Ts_Tag_Format        IN VARCHAR2,
                                 p_Ts_Clob_Tag_Names    IN CLOB,
                                 p_Ts_Clob_Tag_Values   IN CLOB,
                                 p_Ts_Clob_Tag_Format   IN CLOB,
                                 p_Xmlstr               OUT VARCHAR2,
                                 p_Xmlstr_Clob          OUT CLOB,
                                 p_Is_Clob              IN OUT VARCHAR2,
                                 p_Err_Code             IN OUT VARCHAR2,
                                 p_Err_Param            IN OUT VARCHAR2) RETURN BOOLEAN;

	-- 11.3_MWKRBM_14346334 Starts
	FUNCTION Fn_Xml_Creator_ovd(p_Biz_Proc_Hdr       IN Gwpkss_Service_Router.Ty_Biz_Process_Header,
                            p_Instr_Rec          IN Gwpkss_Service_Router.Ty_Processing_Instructions,
                            p_Is_In_Clob         IN VARCHAR2,
                            p_Parent_List        IN CLOB,
                            p_Parents_Format     IN CLOB,
                            p_Ts_Tag_Names       IN VARCHAR2,
                            p_Ts_Tag_Values      IN VARCHAR2,
                            p_Ts_Tag_Format      IN VARCHAR2,
                            p_Ts_Clob_Tag_Names  IN CLOB,
                            p_Ts_Clob_Tag_Values IN CLOB,
                            p_Ts_Clob_Tag_Format IN CLOB,
                            p_Process_Status     IN VARCHAR2,
                            p_Is_Out_Clob        OUT VARCHAR2,
                             p_type               IN VARCHAR2 DEFAULT 'P'
                           )RETURN BOOLEAN;
   -- 11.3_MWKRBM_14346334 Ends
    --14634666_retro_fix_starts                       
    FUNCTION Fn_Xml_Creator(p_Biz_Proc_Hdr       IN Gwpkss_Service_Router.Ty_Biz_Process_Header,
                            p_Instr_Rec          IN Gwpkss_Service_Router.Ty_Processing_Instructions,
                           -- p_Xml_In_Str         IN VARCHAR2,-- FC10 Performance Change PF-008
                            --p_Xml_In_Clob        IN CLOB,-- FC10 Performance Change PF-008
                            p_Is_In_Clob         IN VARCHAR2,
                            p_Parent_List        IN VARCHAR2,
                            p_Parents_Format     IN VARCHAR2,
                            p_Ts_Tag_Names       IN VARCHAR2,
                            p_Ts_Tag_Values      IN VARCHAR2,
                            p_Ts_Tag_Format      IN VARCHAR2,
                            p_Ts_Clob_Tag_Names  IN CLOB,
                            p_Ts_Clob_Tag_Values IN CLOB,
                            p_Ts_Clob_Tag_Format IN CLOB,
                            p_Process_Status     IN VARCHAR2,

                            --p_Xmlstr             OUT VARCHAR2,-- FC10 Performance Change PF-008
                            --p_Xmlstr_Clob        OUT CLOB,-- FC10 Performance Change PF-008
                            p_Is_Out_Clob        OUT VARCHAR2,
                             p_type               IN VARCHAR2 DEFAULT 'P' -- vivin added
                           )RETURN BOOLEAN;

      --14634666_retro_fix ends                     
    ---KERNEL8.0 change ends
    
    FUNCTION Fn_Create_Fcxml(p_Biz_Proc_Hdr       IN Gwpkss_Service_Router.Ty_Biz_Process_Header,
                           p_Instr_Rec          IN Gwpkss_Service_Router.Ty_Processing_Instructions,
                           p_Xml_In_Str         IN VARCHAR2,
                           p_Xml_In_Clob        IN CLOB,
                           p_Parent_List        IN VARCHAR2,
                           p_Parents_Format     IN VARCHAR2,
                           p_Ts_Tag_Names       IN VARCHAR2,
                           p_Ts_Tag_Values      IN VARCHAR2,
                           p_Ts_Tag_Format      IN VARCHAR2,
                           p_Ts_Clob_Tag_Names  IN CLOB,
                           p_Ts_Clob_Tag_Values IN CLOB,
                           p_Ts_Clob_Tag_Format IN CLOB,
                           p_Process_Status     IN VARCHAR2,
                           p_type               IN VARCHAR2,
                           p_Xmlstr             OUT VARCHAR2,
                           p_Xmlstr_Clob        OUT CLOB,
                           p_Is_In_Clob         IN VARCHAR2,
                           p_Is_Out_Clob        OUT VARCHAR2,
                           p_Typ_Err            IN OUT Ovpkss.Tbl_Error)
    RETURN BOOLEAN;
    
    g_enrich_parenttag varchar2(1):= 'Y';   -- FC11.0 ITR1 SFR 1465
    
END Gwpks_Xml_Crtr;
/
create or replace synonym GWPKSS_XML_CRTR for GWPKS_XML_CRTR
/
