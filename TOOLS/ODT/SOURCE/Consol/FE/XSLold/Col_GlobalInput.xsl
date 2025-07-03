<?xml version="1.0"?>
<!--====================================================================================================
**
** File Name    : GlobalInput.xsl
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
	$Log: GlobalInput.xsl.v $
	Revision 1.2  2005/02/08 12:32:12  IDSENTHILL
	1.2:Relesing to vercon

	Revision 1.1.1.0  2005/02/05 09:41:12  IDSENTHILL
	Usage of AVCS Begin.

	Revision 1.1  2004/12/10 10:58:16  ID10499
	1.1:Relesing to vercon

	Revision 1.0.1.0  2004/12/10 10:47:03  ID10499
	sending for peer review

	Revision 1.0  2004/12/09 11:00:39  ID10499
	Initial Checkin

	********************************** END   OF LOG HISTORY **************************************

-->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
       <xsl:import href="GlobalInput.xsl"/>
       <!-- Text, Amount and Date Entity Handler -->
       <xsl:template match="FIELD/TYPE[text()='TEXT' or text()='AMOUNT' or text()='DATE' or text()='ACCOUNT' or text()='BRANCH' or text()='CURRENCY' or text()='CUSTOMER' or text()='MASK' or text()='RESTRICTED_TEXT']"
                     mode="column">

              <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">  
                     <TD CLASS="colTDLabel" align="right" valign="top">
                            <xsl:call-template name="dispLabelField"/>
                     </TD>
              </xsl:if>
              
              <TD valign="top">
                     <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">  
                            <xsl:attribute name="CLASS">colTDText</xsl:attribute>
                     </xsl:if>

                     <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">  
                            <xsl:attribute name="align">center</xsl:attribute>
                     </xsl:if>
                     <NOBR>
                            <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)"> 
                                   <xsl:call-template name="RequiredFieldHandler_me">
                                          <xsl:with-param name="curr_fld"
                                                          select=".."/>
                                   </xsl:call-template>
                            </xsl:if>
                            <xsl:call-template name="dispEntityField">
                                   <xsl:with-param name="EntityType"
                                                   select="../TYPE"/>
                            </xsl:call-template>
                     </NOBR>
              </TD>
       </xsl:template>
       
       <!-- Handler for Required Flag -->
       <xsl:template name="RequiredFieldHandler_me">
              <xsl:param name="curr_fld" select="."/>
              <!-- Display Required Flag -->
              <xsl:if test="$curr_fld/REQUIRED='-1'">
                     <SPAN CLASS="SPANFlag">*</SPAN>
              </xsl:if>
              <xsl:if test="$curr_fld/REQUIRED!='-1'">
                     <SPAN CLASS="SPANFlag" style="visibility:hidden;">*</SPAN>
              </xsl:if>
       </xsl:template>

       <!-- SELECT List Text Handler -->
       <xsl:template match="FIELD/TYPE[text()='SELECT']" mode="column">

              <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">
                     <TD CLASS="colTDLabel" valign="top" align="right">
                            <xsl:call-template name="dispLabelField"/>
                     </TD>
              </xsl:if>
              <TD CLASS="colTDList" valign="top">
                     <NOBR>

                            <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">
                                   <xsl:call-template name="RequiredFieldHandler_me">
                                          <xsl:with-param name="curr_fld"
                                                          select=".."/>
                                   </xsl:call-template>
                            </xsl:if>
                            <xsl:call-template name="dispSelectField"/>
                     </NOBR>
              </TD>
       </xsl:template>
       <xsl:template match="FIELD/TYPE[text()='RADIO']" mode="column">
              
              <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">
                     <xsl:variable name="rFldNode" select=".."/>
                      <xsl:variable name = "Left_or_Right" select = "$rFldNode/@COL"/>

                     <TD CLASS="colTDRadio" colspan="2">
                        <xsl:variable name="radioColSpan" select = "count($rFldNode/OPTION)"/>
                            <!--if the parant is not a FS. !-->
                            <xsl:if test="../../TYPE != 'FIELDSET'">
                                   <xsl:if test="$rFldNode/@COL = '1' ">
                                          <xsl:if test="count($rFldNode/OPTION) &gt; 2">
                                                 <xsl:attribute name="colspan">4</xsl:attribute>
                                          </xsl:if>
                                   </xsl:if>
                            </xsl:if>
                            <!--if the parant is a FS. !-->
                            <xsl:if test="../../TYPE = 'FIELDSET'">
                                   <xsl:attribute name="colspan">
                                          <xsl:value-of select="../../COLSPAN"/>
                                   </xsl:attribute>
                            </xsl:if>
                            <FIELDSET class="FieldsetNormal">
                                   <legend>
                                          <b>
                                                 <xsl:call-template name="dispLabelField"/>
                                          </b>
                                   </legend>
                                   <!-- 
                                   <table summary="" cellspacing="0"
                                          cellpadding="0" border="0"
                                          style="table-layout:fixed;width:100%;"> Kals On May 17. Aligning the Radio -->
                                   <table summary="" cellspacing="0"
                                          cellpadding="0" border="0"
                                          style="table-layout:fixed;width:77%;">                                           
                                          <xsl:if test = "$Left_or_Right ='1'">
                                            <xsl:attribute name = "style">
                                              <xsl:value-of select = "'table-layout:fixed;width:79%;'"/>
                                            </xsl:attribute>
                                          </xsl:if> 
                                          
                                          <xsl:for-each select="../OPTION[@COL=1]">
                                                 <xsl:sort select="@ROW"
                                                           data-type="number"
                                                           order="ascending"/>
                                                 <xsl:variable name="row"
                                                               select="@ROW"/>
                                                 <tr>
                                                        <xsl:apply-templates select="../OPTION[@ROW = $row]" mode="column">
                                                          <xsl:with-param name = "radioColSpan" select = "$radioColSpan"/>
                                                          <xsl:with-param name = "Left_or_Right" select = "$Left_or_Right"/>                                                                                                                    
                                                        </xsl:apply-templates>
                                                                             
                                                 </tr>
                                          </xsl:for-each>
                                   </table>
                            </FIELDSET>
                     </TD>
              </xsl:if>

              <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)"> 
                     <TD CLASS="colTDRadio">
                            <NOBR>
                                   <xsl:call-template name="RequiredFieldHandler">
                                          <xsl:with-param name="curr_fld"
                                                          select=".."/>
                                   </xsl:call-template>
                                   <INPUT TYPE="RADIO" CLASS="INPUTRadio">
                                          <xsl:call-template name="ATTR_Handler">
                                                 <xsl:with-param name="curr_fld"
                                                                 select=".."/>
                                          </xsl:call-template>
                                          <xsl:if test="count(SELECTED) &gt; 0 and SELECTED=-1">
                                                 <xsl:attribute name="CHECKED">CHECKED</xsl:attribute>
                                          </xsl:if>
                                   </INPUT>
                            </NOBR>
                     </TD>
              </xsl:if>
       </xsl:template>
       <!--option handler-->
       <xsl:template match="OPTION" mode="column">
            <xsl:param name = "radioColSpan" select = "."/>
            <xsl:param name = "Left_or_Right" select = "."/>
                        
              <!-- Kals .. Removing the padding on May 17
              <td style="padding-left:15px;" align="left">
              If RADIO COL = 1 , aling is center , If 2 , align is left
              -->
             <td WIDTH = "*" ></td>              
              <td  align="left">      
                      <xsl:if test = "$Left_or_Right ='1'">
                        <xsl:attribute name = "align">
                          <xsl:value-of select = "'center'"/>
                        </xsl:attribute>
                      </xsl:if> 
                
                     <LABEL>
                            <INPUT TYPE="RADIO" CLASS="INPUTRadio">
                                   <xsl:call-template name="ATTR_Handler">
                                          <xsl:with-param name="curr_fld"
                                                          select=".."/>
                                   </xsl:call-template>
                                  <!-- Sundar on May 15 For Option Value -->
                                  <xsl:attribute name="VALUE"><xsl:value-of select = "VALUE"/></xsl:attribute>
                                  <!-- sundar ends -->                                   
                                   <xsl:if test="count(SELECTED) &gt; 0 and SELECTED=-1">
                                          <xsl:attribute name="CHECKED">CHECKED</xsl:attribute>
                                   </xsl:if>
                            <!-- Kals on June 9 for Lable Err prompt -->
                            <xsl:attribute name="LABEL_VALUE">
                                  <xsl:value-of select="LABEL"/>
                            </xsl:attribute>                            
                            <!-- kals ends here -->        
                                   
                            </INPUT>
                            <xsl:value-of select="LABEL"/>
                            
                     </LABEL>
              </td>
       </xsl:template>
       <!-- Checkbox Handler -->
       <xsl:template match="FIELD/TYPE[text()='CHECKBOX']" mode="column">
                  <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">
                     <TD CLASS="colTDLabel" valign="top">
                            <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
                     </TD>
                     <!--</xsl:if>!-->
                     <TD CLASS="colTDCheckbox" align="left" valign="top">
                            <xsl:call-template name="dispCheckboxField"/>
                            <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
                            <xsl:call-template name="dispLabelField"/>
                     </TD>
              </xsl:if>

                  <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">
                     <TD CLASS="colTDCheckbox" align="center">
                            <xsl:attribute name="CLASS">colTDTextmultiple</xsl:attribute>
                            <NOBR>

                                   <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">                                   
                                          <xsl:call-template name="RequiredFieldHandler_me">
                                                 <xsl:with-param name="curr_fld"
                                                                 select=".."/>
                                          </xsl:call-template>
                                   </xsl:if>
                                   <xsl:call-template name="dispCheckboxField"/>
                            </NOBR>
                     </TD>
              </xsl:if>
       </xsl:template>
       <!-- TEXTAREA Handler -->
       <xsl:template match="FIELD/TYPE[text()='TEXTAREA']" mode="column">

              <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">              
                     <TD CLASS="colTDLabel" valign="top" align="right">
                            <xsl:call-template name="dispLabelField"/>
                     </TD>
              </xsl:if>
              <TD valign="top">

                     <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">                     
                            <xsl:attribute name="CLASS">colTDTextarea</xsl:attribute>
                            <xsl:attribute name="COLSPAN">3</xsl:attribute>
                     </xsl:if>
                     <NOBR>

                            <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">                     
                                   <xsl:call-template name="RequiredFieldHandler_me">
                                          <xsl:with-param name="curr_fld"
                                                          select=".."/>
                                   </xsl:call-template>
                            </xsl:if>
                            <xsl:call-template name="dispTextareaField">
                                   <!--<xsl:with-param name="curr_fld" select = "./.."/>!-->
                                   <xsl:with-param name="position">column</xsl:with-param>                                   
                            </xsl:call-template>
                            <!-- kallu  parameterising the abv templte-->
                     </NOBR>
              </TD>
       </xsl:template>
       <!-- HIDDEN field Handler -->
       <xsl:template match="FIELD/TYPE[text()='HIDDEN']" mode="column">

              <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">              
                     <TD CLASS="DispNone">
                            <INPUT TYPE="HIDDEN">
                                   <xsl:call-template name="ATTR_Handler">
                                          <xsl:with-param name="curr_fld"
                                                          select=".."/>
                                   </xsl:call-template>
                            </INPUT>
                     </TD>
              </xsl:if>

              <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">              
                  <TD CLASS="DispNone">
                     <INPUT TYPE="HIDDEN">
                            <xsl:call-template name="ATTR_Handler">
                                   <xsl:with-param name="curr_fld" select=".."/>
                            </xsl:call-template>
                     </INPUT>
                  </TD>
              </xsl:if>
       </xsl:template>
       <!-- INPUT TYPE=FILE Handler -->
       <xsl:template match="FIELD/TYPE[text()='FILE']" mode="column">

              <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">              
                     <TD CLASS="colTDLabel" valign="top">
                            <xsl:attribute name="align">right</xsl:attribute>
                            <xsl:call-template name="dispLabelField"/>
                     </TD>
              </xsl:if>
              <TD CLASS="colTDFile" valign="top">
                     <NOBR>

                            <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">                            
                                   <xsl:call-template name="RequiredFieldHandler_me">
                                          <xsl:with-param name="curr_fld"
                                                          select=".."/>
                                   </xsl:call-template>
                            </xsl:if>
                            <xsl:call-template name="dispFileField"/>
                     </NOBR>
              </TD>
       </xsl:template>
       <!-- INPUT TYPE=FILE Handler -->
       <xsl:template match="FIELD/TYPE[text()='FIELDSET']" mode="column">
              <TD CLASS="colTDFieldSet" valign="top">
                     <!-- if the Field of type=fieldset have column="2" , it is assumed that it spans 2 cols ie., 3,4.!-->
                     <!-- if the Field of type=fieldset have column="1" , it can span 2 or 4 cols.   
                     				if the colspan=2, then there will be ONE FIELD per row.
                     				if the colspan=4, then there will be TWO FIELD per row.
                     
                     				This assuption needs to be keep in mind while generating the UIxml.
                     			!-->
                     <xsl:if test="../@COL = 2">
                            <xsl:attribute name="COLSPAN">
                                   <xsl:text>2</xsl:text>
                            </xsl:attribute>
                     </xsl:if>
                     <xsl:if test="../@COL = 1">
                            <xsl:attribute name="COLSPAN">
                                   <xsl:value-of select="../COLSPAN"/>
                            </xsl:attribute>
                     </xsl:if>
                     <FIELDSET CLASS="FieldsetNormal" style="Margin-right:10px;">
                            <LEGEND>
                                   <b>
                                          <xsl:call-template name="dispLabelField"/>
                                   </b>
                            </LEGEND>
                            <TABLE summary="" border="0" cellpadding="1"
                                   cellspacing="0"
                                   style="table-layout:fixed;width:100%;">
                                   <!-- Handle all rows in the page , RBHCHK - If a row with col=1 doesn't exist, it will not display that row -->
                                   <xsl:for-each select="../FIELD[@COL=1]">
                                          <xsl:sort select="@ROW"
                                                    data-type="number"
                                                    order="ascending"/>
                                          <!-- Handle all rows within a page !-->
                                          <xsl:call-template name="RowHandler_fs">
                                                 <xsl:with-param name="curr_row"
                                                                 select="@ROW"/>
                                          </xsl:call-template>
                                   </xsl:for-each>
                            </TABLE>
                     </FIELDSET>
              </TD>
       </xsl:template>
       <xsl:template match="FIELD/TYPE[text()='BUTTON']" mode="column">
              <xsl:variable name="test">
                     <xsl:value-of select="../@COL"/>
              </xsl:variable>
              <xsl:variable name="btnAlign">
                     <xsl:if test="$test= '1'">left</xsl:if>
                     <xsl:if test="$test = '2'">left</xsl:if>
              </xsl:variable>

              <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">  
                     <TD CLASS="colTDButtonblank">
                            <NOBR>
                                   <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
                            </NOBR>
                     </TD>
              </xsl:if>
              <TD CLASS="colTDButton" align="{$btnAlign}">

			<xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)"> 
                     		<xsl:attribute name="align">center</xsl:attribute>
			</xsl:if>
                     <NOBR>
                            <xsl:call-template name="dispButtonField"/>
                     </NOBR>
              </TD>
       </xsl:template>
       <!-- Row Handler -->
       <xsl:template name="RowHandler_fs">
              <xsl:param name="curr_row" select="."/>
              <TR CLASS="colTRRow">
                     <xsl:apply-templates select="../FIELD[@ROW=$curr_row]/TYPE"
                                          mode="column">
                            <xsl:sort select="../@COL" data-type="number"
                                      order="ascending"/>
                     </xsl:apply-templates>
              </TR>
       </xsl:template>
       
  <!-- sundar retroved GROUP, IMG, PASSWORD type handler from FCJRadTool -->
  <!-- Group Handler -->
  <xsl:template match="FIELD/TYPE[text()='GROUP' or text()='LABEL_ONLY' ]" mode="column">
    <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">  
     <TD CLASS="colTDGroupblank">
      <NOBR>
        <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
      </NOBR>
     </TD>
    </xsl:if>
    <TD valign="top">
       <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">  
          <xsl:attribute name="CLASS">colTDGroup</xsl:attribute>
          <xsl:if test = "../TYPE = 'LABEL_ONLY'">
              <xsl:attribute name="CLASS">colTDLabel</xsl:attribute>
          </xsl:if>
       </xsl:if>
       <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">  
          <xsl:attribute name="align">center</xsl:attribute>
       </xsl:if>
      <NOBR> 
        <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)"> 
           <xsl:call-template name="RequiredFieldHandler_me">
              <xsl:with-param name="curr_fld" select=".."/>
           </xsl:call-template>
        </xsl:if>
        <xsl:call-template name="dispGroupField" />
      </NOBR> 
    </TD>
  </xsl:template>
  
<!-- IMG Handler -->
<xsl:template match="FIELD/TYPE[text()='IMG']" mode="column">
  <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">  
   <TD CLASS="colTDImgblank">
    <NOBR>
      <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
    </NOBR>
   </TD>
  </xsl:if>
  <TD valign="top">
     <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">  
        <xsl:attribute name="CLASS">colTDImg</xsl:attribute>
     </xsl:if>
     <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">  
        <xsl:attribute name="align">center</xsl:attribute>
     </xsl:if>
    <NOBR> 
      <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)"> 
         <xsl:call-template name="RequiredFieldHandler_me">
            <xsl:with-param name="curr_fld" select=".."/>
         </xsl:call-template>
      </xsl:if>
      <xsl:call-template name="dispImgField" />
    </NOBR> 
  </TD>
</xsl:template>

<!-- PASSWORD Handler -->
<xsl:template match="FIELD/TYPE[text()='PASSWORD']" mode="column">
  <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">  
     <TD CLASS="colTDLabel" align="right" valign="top">
        <xsl:call-template name="dispLabelField"/>
     </TD>
  </xsl:if>
  <TD valign="top">
     <xsl:if test="../../@TYPE != 'Multiple Entry' or ../../@VIEW = 'Single Entry'">  
        <xsl:attribute name="CLASS">colTDText</xsl:attribute>
     </xsl:if>
     <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)">  
        <xsl:attribute name="align">center</xsl:attribute>
     </xsl:if>
     <NOBR>
        <xsl:if test="(../../@TYPE = 'Multiple Entry' and ../../@VIEW != 'Single Entry') or (../../@TYPE = 'Multiple Entry' and count(../../@VIEW) = 0)"> 
           <xsl:call-template name="RequiredFieldHandler_me">
              <xsl:with-param name="curr_fld" select=".."/>
           </xsl:call-template>
        </xsl:if>
        <xsl:call-template name="dispPasswordField"/>
     </NOBR>
  </TD>
</xsl:template>
<!-- sundar ends here -->
       
</xsl:stylesheet>
