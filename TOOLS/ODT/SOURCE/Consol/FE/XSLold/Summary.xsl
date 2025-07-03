<?xml version="1.0"?>
<!--====================================================================================================
**
** File Name    : Summary.xsl
**
** Module       : FCJWeb
**
** This source is part of the FLEXCUBE Corporate - Corporate Banking
** Software System and is copyrighted by i-flex solutions limited.

** All rights reserved.  No part of this work may be reproduced,
** stored in a retrieval system, adopted or transmitted in any form
** or by any means, electronic, mechanical, photographic, graphic,
** optic recording or otherwise, translated in any language or
** computer language, without the prior written permission  from i-flex
** solutions limited.

** i-flex solutions limited.,
** 10-11, SDF I, SEEPZ, Andheri (East),
** MUMBAI - 400 096.
** INDIA.

Copyright (c) 2004 - 2006 by i-flex solutions limited..
====================================================================================================
 Caution Don't Delete this. This is used by the Version control utility.

	********************************** START OF LOG HISTORY **************************************
	$Log: Summary.xsl.v $
	Revision 1.6.1.2  2005/08/18 11:05:15  IDSANDEEPM
	REVIEW COMMENTS STATUS ******************************************** 2. Sent for Rework - CLOSED moved Query from to header of the screen. Updated for advanced query for child table fields . ********************************************

	Revision 1.6.1.1  2005/08/09 09:59:17  IDSANDEEPM
	REVIEW COMMENTS STATUS ******************************************** 2. For Rework as requested. - CLOSED Updated to add drop down for select fields and auth stat. ********************************************

	Revision 1.6.1.0  2005/08/01 08:30:39  IDSANDEEPM
	Added QueryFrom select drop down

	Revision 1.6  2005/06/24 12:07:46  IDRAVIBRAMHA
	1.6:Relesing to vercon

	Revision 1.5.1.0  2005/06/24 06:45:38  IDRAVIBRAMHA
	Cosmetic Changes

	Revision 1.5  2005/05/18 09:20:05  IDSANKARGANESH
	1.5:Relesing to vercon

	Revision 1.4.1.1  2005/05/18 05:14:11  IDSANKARGANESH
	CLASS = sCheckQuery added

	Revision 1.4.1.0  2005/05/09 15:32:21  IDSANKARGANESH
	Functions Added fnForAuthStat(),fnSetAuthFlag() and fnSetRecFlag().

	Revision 1.4  2005/04/28 13:31:27  IDRAVIBRAMHA
	1.4:Relesing to vercon

	Revision 1.3.1.0  2005/04/28 13:01:51  IDRAVIBRAMHA
	Changes for New CSS

	Revision 1.3  2005/04/26 05:16:37  IDMALAIAH
	1.3:Relesing to vercon

	Revision 1.2.1.0  2005/04/25 13:33:21  IDMALAIAH
	Added NAME attribute to the result row elements . By Senthil

	Revision 1.2  2005/02/08 12:34:15  IDSENTHILL
	1.2:Relesing to vercon

	Revision 1.1.1.0  2005/02/07 07:38:49  IDSENTHILL
	Usage of AVCS Begin.

	Revision 1.1  2004/12/10 12:18:54  ID10499
	1.1:Relesing to vercon

	Revision 1.0.1.0  2004/12/10 12:08:00  ID10499
	sending for peer review

	Revision 1.0  2004/12/09 11:01:40  ID10499
	Initial Checkin
	********************************************************************************************** 
	 DD-MON-RRRR       SFR NO              Tag Name                  DESCRIPTION
	 20-Apr-2007     FCJ7.2ITR1-353   sheeba balakrishnan		 checkbox removed

	 DD-MON-RRRR       SFR NO              Tag Name                  DESCRIPTION
	 20-Apr-2007     FCJ7.2ITR1-2242   Md.Saidul Anam		Query by Auth stat has been  supported.

	********************************** END   OF LOG HISTORY **************************************

-->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
       <!-- <xsl:import href="GlobalCore.xsl"/> -->
       <xsl:import href="Summary_Audit.xsl"/>       
       <xsl:import href="SummaryInput.xsl"/>
       <xsl:import href="SummaryCore.xsl"/>
       <xsl:variable name="imgPath_XSL" select="'Images'"/>
       <xsl:variable name="Brn_Neo" select="''"/>
       <xsl:output method="html"/>
       <xsl:variable name="gPosition" select="'absolute'"/>
       <xsl:variable name="cQuery" select="'Q'"/>
       <xsl:variable name="cResult" select="'R'"/>
       <xsl:variable name="cAdvanced" select="'A'"/>
       <xsl:variable name="cAll" select="'All'"/>
       <!-- Main template -->
       <xsl:template match="/">
              <TABLE class="TableLayout"
                     STYLE="table-layout:fixed;Height:555px;width:763px;margin-top:2px;background-color:#B3D8FF;"
                     cellspacing="0" cellpadding="0" border="0">
                     <TR >
                            <TD>
                                   <xsl:call-template name="QueryContent"/>
                            </TD>
                     </TR>
                     <TR>
                            <TD>
                                   <TABLE id="SUMMARY_BTNS" style="">
                                          <TR>
                                                 <TD style="width:100%"/>
                                                 <TD class="INPUTButtonSubSystem"
                                                     onClick="fnOpenAdvanced()">Advanced</TD>
                                                 <TD class="INPUTButtonSubSystem"
                                                     onClick="fnResetQry()">Reset</TD>
                                                 <TD class="INPUTButtonSubSystem"
                                                     onClick="fnExecuteQuery()">Query</TD>
                                                 <TD class="INPUTButtonSubSystem"
                                                     onClick="fnRefresSum()">Refresh</TD>
                                                 <TD>
                                                        <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
                                                 </TD>
                                          </TR>
                                   </TABLE>
                            </TD>
                     </TR>
                     <TR>
                        <TD align="left" valign="top">
                          <xsl:call-template name="ResultProcess"/>
                        </TD>
                     </TR>
                     <TR>
                          <TD>
                              <table cellpadding="0" cellspacing="0" border="0" style="width:753px;overflow:auto">
                                  <tr>
                                    <td>
                                        <div style="overflow-x:auto;width:695px;height:100px;" >
                                            <TABLE style="table-layout:fixed;width:100%;height:100%;" cellpadding="0" cellspacing="0" border="0">
                                                <TR>
                                                   <xsl:variable name="tdHgt">
                                                    <xsl:if test="count(//LEGENDS) > 2">
                                                      <xsl:value-of select="90"/>
                                                    </xsl:if>
                                                    <xsl:if test="count(//LEGENDS) &lt; 2 or count(//LEGENDS) = 2">
                                                      <xsl:value-of select="100"/>
                                                    </xsl:if>
                                                   </xsl:variable>
                                                   <xsl:variable name="fsHgt">
                                                    <xsl:if test="count(//LEGENDS) &gt; 2">
                                                      <xsl:value-of select="80"/>
                                                    </xsl:if>
                                                    <xsl:if test="count(//LEGENDS) &lt; 2 or count(//LEGENDS) = 2">
                                                      <xsl:value-of select="97"/>
                                                    </xsl:if>
                                                   </xsl:variable>
                                                    <xsl:call-template name="Custom_Legends">
                                                      <xsl:with-param name="fsHeight" select="$fsHgt"/>
                                                      <xsl:with-param name="tdHeight" select="$tdHgt"/>
                                                    </xsl:call-template>  
                                                    <xsl:call-template name="Audit_Legends">
                                                      <xsl:with-param name="fsHeight" select="$fsHgt"/>
                                                      <xsl:with-param name="tdHeight" select="$tdHgt"/>
                                                    </xsl:call-template>
                                                    <TD style="width:100%"><xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text></TD>
                                                </TR>
                                            </TABLE>
                                        </div>
                                      
                                    </td>
                                    <td align="right" valign="bottom">
                                        <div style="width:40px;height:100px;">
                                          <TABLE style="width:100%;height:100%;" cellpadding="0" cellspacing="0" border="0">
                                              <TR>
                                              <!--<xsl:call-template name="disp_cust_Btn"/>!-->
                                              <TD align="right" valign="bottom">
                                                <xsl:call-template name="disp_Exit_Btn"/>
                                              </TD>
                                            </TR>
                                          </TABLE>
                                        </div>
                                    </td>
                                  </tr>
                              </table>
                            </TD>
                        </TR>
              </TABLE>
              <xsl:call-template name="generateScript">
              </xsl:call-template>
       </xsl:template>
       <!-- Process the Query Content !-->
       <xsl:template name="QueryContent">
              <DIV style="overflow-y:auto; WIDTH:755px;height:125px;background-color:#B3D8FF;border-bottom:1px solid white;">
                     <TABLE CLASS="colTABLEHdr" id="TblQuery" style="table-layout:fixed;width:99%;" cellspacing="2" cellpadding="0"
                            border="0">
                            <xsl:variable name="no_Of_flds"
                                          select="count(//SUMBLOCK[@TABPAGE = 'QUERY']/FIELD)"/>
                            
                            <xsl:call-template name="AuditFields"/>
                            
                            <xsl:if test="$no_Of_flds &gt; 0">
                                   <xsl:for-each select="//SUMBLOCK[@TABPAGE = 'QUERY']/FIELD/TYPE">
                                          <xsl:variable name="pos" select="position()"/>
                                          <xsl:variable name="dbt" select="../DBT"/>
                                          <xsl:variable name="dbc" select="../DBC"/>
                                          <xsl:variable name="fldName" select="../NAME"/>
                                          <xsl:if test="($pos mod 2 = 1 )">
                                                 <xsl:text disable-output-escaping="yes"> &lt;TR&gt;</xsl:text>
                                          </xsl:if>
                                          <xsl:if test="//FORM/SUMMARY/SUMMARY_BASE = 'M'">
                                            <xsl:call-template name="typeHandler">
                                                   <xsl:with-param name="fType" select="."/>
                                                   <xsl:with-param name="fldNode" select="//BLOCK//FIELD[DBT = $dbt][DBC = $dbc][NAME = $fldName]"/>
                                            </xsl:call-template>
                                          </xsl:if>
                                          <xsl:if test="//FORM/SUMMARY/SUMMARY_BASE = 'V'">
                                            <xsl:call-template name="typeHandler">
                                                   <xsl:with-param name="fType" select="."/>
                                                   <xsl:with-param name="fldNode" select=".."/>
                                            </xsl:call-template>
                                          </xsl:if>
                                          <xsl:if test="($pos mod 2 = 0)">
                                                 <xsl:text disable-output-escaping="yes"> &lt;/TR&gt;</xsl:text>
                                          </xsl:if>
                                   </xsl:for-each>
                            </xsl:if>
                     </TABLE>
              </DIV>
       </xsl:template>
<!--       
       <xsl:template name="ResultProcess">
         <FIELDSET CLASS="FieldsetNormal">
            <LEGEND>
              <b>Result</b>
            </LEGEND>
            <DIV id="QryRslts" class="DIVMultiple" style="OVERFLOW:auto;WIDTH:763px;HEIGHT:335px;background-color:#E7F3FF">
                <xsl:if test="(/FORM/SUMMARY/TYPE = 'B' or /FORM/SUMMARY/TYPE = 'Q') and (count(//SUMBUTTONS) &gt; 0)">
                  <xsl:attribute name="style">
                    <xsl:text>overflow:auto;width:763px;height:303px;background:color:#E7F3FF</xsl:text>
                  </xsl:attribute>
                </xsl:if>
            
              <table class="TABLEMultiple" ID = "TBL_QryRslts" style="table-layout:auto;width:100%;height:100%;background-color:#FFFFFF" cellspacing="1" cellpadding="0" border="0">
                  <THEAD class="THEADMultiple" style="heigth:10px;">
                    <TR class="THEADTRMultiple">
                       <xsl:if test="/FORM/SUMMARY/TYPE = 'B'">
                        <TH class="THEADTDMultiple">
                          <INPUT TYPE="CHECKBOX" NAME = "RSLT_CHKBOX"  class = "INPUTCheckbox" onclick = "fnCheckUncheckAll()"/>
                        </TH>
                      </xsl:if>
                     

                      <xsl:call-template name = "AuditResult"/>
                      
                      <xsl:for-each select="/FORM/SUMBLOCK[@TABPAGE = 'RESULT']/FIELD">
                        <TH class="THEADTDMultiple">
                          <xsl:value-of select="LABEL"/>
                        </TH>
                      </xsl:for-each>
                      <TH class="THEADTDMultiple" STYLE = "WIDTH:100%" ></TH>                      
                    </TR>
                  </THEAD>
                  <TBODY style="table-layout:auto;width:100%;height:100%;background-color:white">
                      <TR>
                          <TD>
                              <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>                            
                          </TD>
                      </TR>
                  </TBODY> 
               </table>
            </DIV>
              <xsl:if test="(/FORM/SUMMARY/TYPE = 'B' or /FORM/SUMMARY/TYPE = 'Q') and (count(//SUMBUTTONS) &gt; 0)">
               <DIV id="SUM_CUST_BTNS" style="WIDTH:763px;HEIGHT:30px;background-color:#B3D8FF;border-bottom:1px solid white;">
                 <table>
                     <TR>
                        <TD style="width:100%"/>
                        <xsl:for-each select="//SUMBUTTONS/BUTTON">
                           <TD>
                              <BUTTON  class="sINPUTButtonSubSystem" NAME="{BUTTON_NAME}">
                                <xsl:if test="BUTTON_EVENT != ''">
                                  <xsl:attribute name="onClick">
                                    <xsl:value-of select="BUTTON_EVENT"/>
                                  </xsl:attribute>
                                </xsl:if>
                                <xsl:value-of select="BUTTON_LABEL"/>
                              </BUTTON>
                           </TD>
                        </xsl:for-each>
                        <TD>
                          <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
                        </TD>
                     </TR>
                  </table>
              </DIV>
            </xsl:if>
         </FIELDSET>       
       </xsl:template> -->
       
       <xsl:template name="generateScript">
              <!-- Script to be run for summary screens -->
              <script language="javascript" DEFER="DEFER">
                     var l_scrHgt = "<xsl:value-of select="640"/>";
                     var l_scrWth = "<xsl:value-of select="765"/>";
                     <!--Added by Murali for template -->
                    var gscrPos = "<xsl:value-of select="$gPosition"/>";          
                    if(gscrPos == "template"){          
                        document.styleSheets[0].href = "mkg/Theme/ltr.css";
                        document.refresh;
                    } 
                    else {
                        document.styleSheets[0].href = "Theme/Sky.css";
                        document.refresh;
                    }
                     
                     window.dialogWidth = parseInt(l_scrWth)+"px";
                     window.dialogHeight = parseInt(l_scrHgt)+"px";
      
                     var l_LablesArr = new Array(); 
      
      
                     <xsl:for-each select="//SUMBLOCK[@SCREEN='SUMMARY' and @TABPAGE='RESULT']/FIELD">
                            <xsl:variable name="fName">
                                   <xsl:value-of select="DBC"/>
                            </xsl:variable>
                            <xsl:variable name="fNameTmp">
                                   <xsl:value-of select="concat('&quot;', $fName , '&quot;')"/>
                            </xsl:variable>
                            <xsl:variable name="fLabel">
                                   <xsl:value-of select="LABEL"/>
                            </xsl:variable>
                            <xsl:variable name="fLabelTmp">
                                   <xsl:value-of select="concat('&quot;', $fLabel , '&quot;' , ';')"/>
                            </xsl:variable>
                            <xsl:variable name="ConcatStr">
                                   <xsl:value-of select="concat('l_LablesArr[',$fNameTmp, ']' , '=' , $fLabelTmp)">
                                   </xsl:value-of>
                            </xsl:variable>
                            <xsl:value-of select="$ConcatStr"/>
                     </xsl:for-each>


                    l_LablesArr['MAKER_ID'] = 'Maker Id';
                    l_LablesArr['CHECKER_ID'] = 'Checker Id';
                    l_LablesArr['RECORD_STAT'] = 'Record Status';
                    l_LablesArr['AUTH_STAT'] = 'Authorization Status';
      
      
      
                     <!-- Cache the Qry Order -->
                     var l_QryOrdArr = new Array();
                     l_QryOrdArr[0] = 'AUTH_STAT';
                     l_QryOrdArr[1] = 'RECORD_STAT';
    
      
                     <xsl:for-each select="//SUMBLOCK[@TABPAGE = 'QUERY']/FIELD">
                            <xsl:variable name="Ord" select="position()"/>
                            <xsl:variable name="fDBC">
                                   <xsl:value-of select="DBC"/>
                            </xsl:variable>
                            <xsl:variable name="fDBCTmp">
                                   <xsl:value-of select="concat('&quot;', $fDBC , '&quot;')"/>
                            </xsl:variable>
                            <xsl:variable name="CacheConcatStr">
                                   <xsl:value-of select="concat('l_QryOrdArr[',($Ord)+1, ']' , '=' , $fDBCTmp , ';')">
                                   </xsl:value-of>
                            </xsl:variable>
                            <xsl:value-of select="$CacheConcatStr"/>
                     </xsl:for-each>
              </script>
       </xsl:template>


       <xsl:template name="ResultProcess">
         <xsl:variable name="noOfRows" select="//SUMBUTTONS/BUTTON_ROWS"></xsl:variable>
         <FIELDSET CLASS="FieldsetNormal">
            <LEGEND>
              <b>Result</b>
            </LEGEND>
            <DIV id="QryRslts" class="DIVMultiple" style="OVERFLOW:auto;WIDTH:763px;HEIGHT:335px;background-color:#E7F3FF">
                <xsl:if test="(/FORM/SUMMARY/TYPE = 'B' or /FORM/SUMMARY/TYPE = 'Q' or /FORM/SUMMARY/TYPE = 'U') and (count(//SUMBUTTONS) &gt; 0)">

                    <xsl:attribute name="style">
                      <xsl:text>overflow:auto;width:763px;height:</xsl:text>
                        <xsl:value-of select="335 - ($noOfRows * 30) - 2"/>
                      <xsl:text>px;background:color:#E7F3FF</xsl:text>
                    </xsl:attribute>
                </xsl:if>

              <table class="TABLEMultiple" ID = "TBL_QryRslts"   style="table-layout:auto;width:100%;height:100%;background-color:#FFFFFF" cellspacing="1" cellpadding="0" border="0">
                  <THEAD class="THEADMultiple" style="heigth:10px;">
                    <TR class="THEADTRMultiple">
                       <xsl:if test="/FORM/SUMMARY/TYPE = 'B'">
                        <TH class="THEADTDMultiple">
                          <INPUT TYPE="CHECKBOX" NAME = "RSLT_CHKBOX"  class = "INPUTCheckbox" onclick = "fnCheckUncheckAll()"/>
                        </TH>
                      </xsl:if>
                     

                      <xsl:call-template name = "AuditResult"/>
                      
                      <xsl:for-each select="/FORM/SUMBLOCK[@TABPAGE = 'RESULT']/FIELD">
                        <TH class="THEADTDMultiple">
                          <xsl:value-of select="LABEL"/>
                        </TH>
                      </xsl:for-each>
                      <TH class="THEADTDMultiple" STYLE = "WIDTH:100%" ></TH>                      
                    </TR>
                  </THEAD>
                  <TBODY style="table-layout:auto;width:100%;height:100%;background-color:white">
                      <TR>
                          <TD>
                              <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>                            
                          </TD>
                      </TR>
                  </TBODY> 
               </table>
            </DIV>
         </FIELDSET>       
          <xsl:if test="(/FORM/SUMMARY/TYPE = 'B' or /FORM/SUMMARY/TYPE = 'Q' or /FORM/SUMMARY/TYPE = 'U') and (count(//SUMBUTTONS) &gt; 0)">
           <xsl:variable name="noOfButtons" select="count(//SUMBUTTONS/BUTTON)"/>
           <xsl:variable name="buttonsPerRow" select="//SUMBUTTONS/BUTTONS_PER_ROW"/>
           <DIV id="SUM_CUST_BTNS" style="WIDTH:763px;HEIGHT:{$noOfRows * 30}px;background-color:#B3D8FF;border-bottom:1px solid white;">
<!--             <table> -->
                <xsl:for-each select="//SUMBUTTONS/BUTTON">
                  <xsl:if test="(position() = 1) or position() mod $buttonsPerRow  = 1">
                    <xsl:text disable-output-escaping="yes"> &lt;TABLE&gt;</xsl:text>
                    <xsl:text disable-output-escaping="yes"> &lt;TR&gt;</xsl:text>
                  </xsl:if>
                  <xsl:if test="position() = 1 or position() mod $buttonsPerRow  = 1">
                      <TD style="width:100%"></TD>
                  </xsl:if>
                   <TD>
                      <BUTTON  class="INPUTButtonSubSystem" NAME="{BUTTON_NAME}">
                        <xsl:if test="BUTTON_EVENT != ''">
                          <xsl:attribute name="onClick">
                            <xsl:value-of select="BUTTON_EVENT"/>
                          </xsl:attribute>
                        </xsl:if>
                        <xsl:value-of select="BUTTON_LABEL"/>
                      </BUTTON>
                   </TD>
                  <xsl:if test="position() mod $buttonsPerRow = 0 or position() = $noOfButtons">
                    <xsl:text disable-output-escaping="yes"> &lt;/TR&gt;</xsl:text>
                    <xsl:text disable-output-escaping="yes"> &lt;/TABLE&gt;</xsl:text>                    
                  </xsl:if>
                </xsl:for-each>
<!--              </table> -->
          </DIV>
        </xsl:if>         
       </xsl:template> 

</xsl:stylesheet>
