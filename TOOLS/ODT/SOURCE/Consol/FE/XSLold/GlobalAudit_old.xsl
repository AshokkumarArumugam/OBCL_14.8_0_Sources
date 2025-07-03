<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
       <!-- Takes care of features common in Audit Bar for Absolute/Column Positioning -->
       <xsl:template name="Audit">
              <xsl:variable name="auditId"
                            select="/FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/ID"/>
              <!--checking weather the uixml has the audit entry or not-->
              
              <DIV CLASS="DivAudit" id="DIV_{$auditId}"
                   style="width:{$gWidth}px;">
                     
                     <xsl:if test="count(/FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']) = 0 and ($gBlkButCount &gt; 0 or $gBlkButImgCount &gt; 0)">
                        <xsl:attribute name="id"><xsl:text>DIV_AUDIT_BUTTONS</xsl:text></xsl:attribute>                        
                     </xsl:if>
                     
                      <xsl:call-template name="AuditAbs_Pos_Handler"/>
                      
                     <TABLE cellpadding="1" cellspacing="0"
                            summary="Audit information" border="0"
                            style="width:100%">
                            <TR >
                                   <xsl:if test="count(/FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']) &gt; 0">
                                          <xsl:apply-templates select="/FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']"
                                                               mode="AuditEntry"/>
                                   </xsl:if>
                                   <xsl:if test="count(/FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']) = 0">
                                          <td style="width:95%">
                                                 <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
                                          </td>
                                   </xsl:if>
                                   <xsl:call-template name="StdBtnEntry"/>
                            </TR>
                     </TABLE>
              </DIV>
              
       </xsl:template>
       <xsl:template match="BLOCK" mode="AuditEntry">
              <td CLASS="THEADAudit" style="width:95%">
                     <TABLE CLASS="TABLEAudit" DBT="{DBT}" summary=""
                            cellpadding="0" cellspacing="0" border="0"
                            style="width:500px;">
                            <TR CLASS="TRAudit">
                                   <TD CLASS="TDAudit">
                                          <NOBR>
                                                 <LABEL CLASS="LABELNormal">Input By</LABEL>
                                          </NOBR>
                                   </TD>
                                   <TD CLASS="fieldAudit">
                                          <NOBR>
                                                 <INPUT TYPE="TEXT"
                                                        CLASS="TEXTAudit"
                                                        name="MAKER_ID"
                                                        id="{DBT}__MAKER_ID"
                                                        DBT="{DBT}"
                                                        DBC="MAKER_ID"
                                                        READONLY="true"
                                                        MAXLENGTH="12" SIZE="8"/>
                                          </NOBR>
                                   </TD>
                                   <TD CLASS="TDAudit">
                                          <NOBR>
                                                 <LABEL CLASS="LABELNormal">Date Time</LABEL>
                                          </NOBR>
                                   </TD>
                                   <TD CLASS="fieldAudit">
                                          <NOBR>
                                                 <INPUT TYPE="TEXT"
                                                        CLASS="TEXTAudit"
                                                        name="MAKER_DT_STAMP"
                                                        id="{DBT}__MAKER_DT_STAMP"
                                                        DBT="{DBT}"
                                                        DBC="MAKER_DT_STAMP"
                                                        READONLY="true"
                                                        MAXLENGTH="19" SIZE="20"/>
                                          </NOBR>
                                   </TD>
                                   <TD style="width:95%"> 
                                   		<xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
                                   </TD>
                            </TR>
                            <TR CLASS="TRAudit">
                                    <TD CLASS="TDAudit">
                                          <NOBR>
                                                 <LABEL CLASS="LABELNormal">Auth By</LABEL>
                                          </NOBR>
                                   </TD>
                                   <TD CLASS="fieldAudit">
                                          <NOBR>
                                                 <INPUT TYPE="TEXT"
                                                        CLASS="TEXTAudit"
                                                        name="CHECKER_ID"
                                                        id="{DBT}__CHECKER_ID"
                                                        DBT="{DBT}"
                                                        DBC="CHECKER_ID"
                                                        READONLY="true"
                                                        MAXLENGTH="12" SIZE="8"/>
                                          </NOBR>
                                   </TD>
                                   <TD CLASS="TDAudit">
                                          <NOBR>
                                                 <LABEL CLASS="LABELNormal">Date Time</LABEL>
                                          </NOBR>
                                   </TD>
                                   <TD CLASS="fieldAudit">
                                          <NOBR>
                                                 <INPUT TYPE="TEXT"
                                                        CLASS="TEXTAudit"
                                                        name="CHECKER_DT_STAMP"
                                                        id="{DBT}__CHECKER_DT_STAMP"
                                                        DBT="{DBT}"
                                                        DBC="CHECKER_DT_STAMP"
                                                        READONLY="true"
                                                        MAXLENGTH="19" SIZE="20"/>
                                          </NOBR>
                                   </TD>
                                   <TD style="width:95%"> 
                                   		<xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
                                   </TD>
                                   
                            </TR>
                     </TABLE>
              </td>
       </xsl:template>
       
       
       <xsl:template name="StdBtnEntry">
       
              <xsl:if test="$gBlkButCount &gt; 0">
                     <TD class="TableTdAuditMain" align="right">
                            <xsl:apply-templates select="/FORM/BLOCK[@SCREEN=$screen and ID='BLK_STD_BUTTONS']"
                                                 mode="BlockStdButtons"/>
                     </TD>
              </xsl:if>
              <xsl:if test="$gBlkButImgCount &gt; 0">
                     <TD class="TableTdAuditMain" align="right">
                            <xsl:apply-templates select="/FORM/BLOCK[@SCREEN=$screen and ID='BLK_STD_BUTTONS_IMG']"
                                                 mode="BlockStdButtonsImg"/>
                     </TD>
              </xsl:if>
       </xsl:template>
       
       
       <!-- Block Buttons Handler added by yugandhar-->
       <xsl:template match="BLOCK" mode="BlockStdButtonsImg">
              <NOBR>
                     <DIV CLASS="DivStdButtonImg">
                            <TABLE border="0" cellpadding="0" cellspacing="2"
                                   summary="Button container">
                                   <TR>
                                          <TD>
                                                 <input Type="reset"
                                                        style="visibility:HIDDEN;width:1px;height:1px"
                                                        id="id_reset_1"/>
                                          </TD>
                                          <xsl:for-each select="./FIELD/TYPE[text()='BUTTON']">
                                                 <TD CLASS="TDstdButtonImg"
                                                     align="right">
                                                        <xsl:call-template name="dispStdButtonField_img"/>
                                                 </TD>
                                          </xsl:for-each>
                                   </TR>
                            </TABLE>
                     </DIV>
              </NOBR>
       </xsl:template>
       <!-- Block Buttons Handler added by yugandhar-->
       <xsl:template match="BLOCK" mode="BlockStdButtons">
              <xsl:variable name="fldCnt"
                            select="count(./FIELD/TYPE[text()='BUTTON'])"/>
              <DIV CLASS="DivStdButton">
                     <TABLE CLASS="TABLEstdButton" border="0" cellpadding="1"
                            summary="Button container" cellspacing="1">
                            <xsl:if test="$fldCnt &lt; 3">
                                   <tr CLASS="TRstdButton">
                                          <xsl:for-each select="./FIELD/TYPE[text()='BUTTON']">
                                                 <TD CLASS="TDstdButton"
                                                     align="right">
                                                        <NOBR>
                                                               <xsl:call-template name="dispStdButtonField"/>
                                                        </NOBR>
                                                 </TD>
                                          </xsl:for-each>
                                   </tr>
                            </xsl:if>
                            <xsl:if test="$fldCnt &gt; 2">
                                   <tr CLASS="TRstdButton">
                                          <xsl:for-each select="./FIELD/TYPE[text()='BUTTON']">
                                                 <xsl:if test="position() &lt; ceiling($fldCnt div 2)+1">
                                                        <TD CLASS="TDstdButton">
                                                               <NOBR>
                                                                      <xsl:call-template name="dispStdButtonField"/>
                                                               </NOBR>
                                                        </TD>
                                                 </xsl:if>
                                          </xsl:for-each>
                                   </tr>
                                   <tr CLASS="TRstdButton">
                                          <xsl:for-each select="./FIELD/TYPE[text()='BUTTON']">
                                                 <xsl:if test="position() &gt; ceiling($fldCnt div 2)">
                                                        <TD CLASS="TDstdButton">
                                                               <NOBR>
                                                                      <xsl:call-template name="dispStdButtonField"/>
                                                               </NOBR>
                                                        </TD>
                                                 </xsl:if>
                                          </xsl:for-each>
                                          <xsl:if test="$fldCnt mod 2 != 0">
                                                 <TD CLASS="TDstdButton">
                                                        <NOBR>
                                                        </NOBR>
                                                 </TD>
                                          </xsl:if>
                                   </tr>
                            </xsl:if>
                     </TABLE>
              </DIV>
       </xsl:template>
       
<!--template to set position for audit div-->
    <xsl:template name="AuditAbs_Pos_Handler">
        <xsl:if test="$gPosition = 'absolute'">
            <xsl:attribute name="style">
                 <xsl:text>position:absolute;top:</xsl:text>
                 <xsl:if test="count(TAB/PAGE) = 0">
                        <xsl:value-of select="$gContexHgt + $gHeight"/>
                 </xsl:if>
                 <xsl:if test="count(TAB/PAGE) &gt; 0">
                        <xsl:value-of select="$gContexHgt + $gHeight + $gTabAllHgt"/>
                 </xsl:if>
                 <xsl:text>px;left:0px;width:</xsl:text>
                 <xsl:value-of select="$gWidth"/>
                 <xsl:text>px;border:2px solid #118ddc;overflow-y:auto;</xsl:text>
          </xsl:attribute>
        </xsl:if>
    </xsl:template>
       
</xsl:stylesheet>
