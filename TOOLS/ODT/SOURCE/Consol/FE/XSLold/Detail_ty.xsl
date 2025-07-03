<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
       <xsl:import href="Col_Detail.xsl"/>
       <xsl:import href="Abs_Detail.xsl"/>
       <xsl:import href="GlobalAudit.xsl"/>
       <xsl:output method="html"/>
       <xsl:param name="screen"/>
       <!-- reading the screen and tabpage attributes !-->
       <xsl:variable name="gPosition"
                     select="/FORM/SCREEN[@NAME=$screen]/@POSITION"/>
       <xsl:variable name="gHeight" select="/FORM/SCREEN[@NAME=$screen]/@HEIGHT"/>
       <xsl:variable name="gWidth" select="/FORM/SCREEN[@NAME=$screen]/@WIDTH"/>
       <xsl:variable name="gHdrHeight"
                     select="/FORM/SCREEN[@NAME=$screen]/HEADER/PAGE/@HEIGHT"/>
       <xsl:variable name="gAllTabHgt"
                     select="/FORM/SCREEN[@NAME=$screen]/TABPAGE_ALL/@HEIGHT"/>
       <xsl:variable name="gContexHgt" select="35"/>
       <xsl:variable name="gHdrHgt">
              <xsl:choose>
                     <xsl:when test="$gHdrHeight &gt; 0">
                            <xsl:value-of select="$gHdrHeight"/>
                     </xsl:when>
                     <xsl:otherwise>
                            <xsl:text>0</xsl:text>
                     </xsl:otherwise>
              </xsl:choose>
       </xsl:variable>
       <xsl:variable name="gTabAllHgt">
              <xsl:choose>
                     <xsl:when test="$gAllTabHgt &gt; 0">
                            <xsl:value-of select="$gAllTabHgt"/>
                     </xsl:when>
                     <xsl:otherwise>
                            <xsl:text>0</xsl:text>
                     </xsl:otherwise>
              </xsl:choose>
       </xsl:variable>
       <xsl:template match="/">
              <xsl:apply-templates select="FORM/SCREEN[@NAME=$screen]"/>
       </xsl:template>
       <xsl:template match="SCREEN">
              <!-- Column position case !-->
              <xsl:if test="$gPosition='column'">
                     <DIV class="DivContext"
                          style="position:{$gPosition};top:0px;left:0px;width:{$gWidth}px; height:{$gContexHgt}px;">
                     </DIV>
                     <xsl:if test="count(TAB/PAGE) &gt; 0">
                            <DIV id="ask" CLASS="DivMAIN"
                                 style="overflow:hidden;width:{$gWidth}px;Height:{$gHeight+10}px;">
                                   <TABLE class="TableLayout"
                                          style="table-layout:fixed;width:100%;height:100%;"
                                          summary="" cellpadding="0"
                                          cellspacing="0" border="0">
                                          <TR class="TrLayoutHeader"
                                              valign="top">
                                                 <TD class="TrLayoutHeader">
                                                        <DIV id="ask1"
                                                             style="overflow:auto;height:{$gHdrHeight}px;">
                                                               <xsl:apply-templates select="HEADER/PAGE"
                                                                                    mode="column">
                                                               </xsl:apply-templates>
                                                        </DIV>
                                                 </TD>
                                          </TR>
                                          <TR style="height:10px;">
                                                 <TD>
                                                        <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
                                                 </TD>
                                          </TR>
                                          <xsl:if test="count(TAB/PAGE) &gt; 0">
                                                 <TR class="TrTabButtns"
                                                     valign="top">
                                                        <TD class="TdTabButtns">
                                                               <table CLASS="TABLETab"
                                                                      id="SYS_TBL_TABS"
                                                                      style="table-layout:auto;width:100%"
                                                                      summary="Tab Group headers"
                                                                      border="0"
                                                                      cellpadding="0"
                                                                      cellspacing="0">
                                                                      <tr CLASS="TRTab"
                                                                          id="TRTab">
                                                                             <xsl:apply-templates select="TAB/PAGE"
                                                                                                  mode="column">
                                                                             </xsl:apply-templates>
                                                                             <td CLASS="TDTabBlank"
                                                                                 style="width:100%;">
                                                                                    <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
                                                                             </td>
                                                                      </tr>
                                                               </table>
                                                        </TD>
                                                 </TR>
                                                 <TR valign="top">
                                                        <TD>
                                                               <DIV id="ask1"
                                                                    CLASS="DivTabPageCont"
                                                                    style="overflow-y:auto;height:{$gHeight - $gHdrHgt -27}px;">
                                                                      <xsl:apply-templates select="TAB/PAGE"
                                                                                           mode="col_content"/>
                                                               </DIV>
                                                        </TD>
                                                 </TR>
                                                 <TR style="height:100%;">
                                                        <TD>
                                                               <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
                                                        </TD>
                                                 </TR>
                                          </xsl:if>
                                   </TABLE>
                            </DIV>
                     </xsl:if>
                     <DIV style="width:{$gWidth}px;height:2px;border-left:2px solid #118ddc;border-right:2px solid #118ddc;">
                     </DIV>
                     <div id="TabPageAll" class="TABLETabAll"
                          style="width:{$gWidth}px;overflow-y:auto;height:{$gAllTabHgt}px;">
                            <xsl:if test="count(TAB/PAGE) = 0">
                                   <xsl:attribute name="style">
                                          <xsl:text>overflow-y:auto;width:</xsl:text>
                                          <xsl:value-of select="$gWidth"/>
                                          <xsl:text>px;height:</xsl:text>
                                          <xsl:value-of select="$gHeight"/>
                                          <xsl:text>px;border-top:'2px solid #118ddc';</xsl:text>
                                   </xsl:attribute>
                            </xsl:if>
                            <TABLE CLASS="colTABLEPage" id="TBLPageAll"
                                   style="table-layout:fixed;width:100%;"
                                   cellpadding="0" cellspacing="0" border="0">
                                   <xsl:if test="count(TAB/PAGE) = 0">
                                          <xsl:attribute name="summary">
                                                 <xsl:text>Tab Group All</xsl:text>
                                          </xsl:attribute>
                                          <TR CLASS="colTRRow">
                                                 <TD COLSPAN="4"
                                                     style="height:15px;">
                                                        <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
                                                 </TD>
                                          </TR>
                                   </xsl:if>
                                   <xsl:if test="count(TAB/PAGE) &gt; 0">
                                          <xsl:attribute name="summary">
                                                 <xsl:text>Tab Group Footer</xsl:text>
                                          </xsl:attribute>
                                   </xsl:if>
                                   <xsl:call-template name="ColumnPageHandler">
                                          <xsl:with-param name="curr_page">All</xsl:with-param>
                                   </xsl:call-template>
                            </TABLE>
    
	</div>
                     <DIV style="width:{$gWidth}px; height:2px;border-left:2px solid #118ddc;border-right:2px solid #118ddc;">
                     </DIV>
                     <!-- For the Main Screen call the Audit template!-->
                     <xsl:variable name="auditId"
                                   select="//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/ID"/>
                     <xsl:if test="count(/FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']) &gt; 0">
                            <div CLASS="DivAudit" id="DIV_{$auditId}"
                                 style="width:{$gWidth}px;overflow-y:auto;">
                                   <xsl:apply-templates select="/FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']"
                                                        mode="AuditEntry"/>
                            </div>
                     </xsl:if>
                     <!-- For the sub screens call the Buttons template!-->
                     <xsl:if test="count(/FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']) = 0">
                            <div CLASS="DivAudit" id="DIV_AUDIT_BUTTONS"
                                 style="width:{$gWidth}px;overflow-y:auto;">
                                   <table CLASS="TABLEAudit" cellpadding="5"
                                          summary="" cellspacing="0" border="0"
                                          style="width:100%">
                                          <tr CLASS="TABLEAudit">
                                                 <xsl:variable name="blkButCount"
                                                               select="count(/FORM/BLOCK[@SCREEN=$screen and ID='BLK_STD_BUTTONS'])"/>
                                                 <xsl:if test="$blkButCount &gt; 0">
                                                        <TD class="TableTdAuditMain"
                                                            align="right">
                                                               <xsl:apply-templates select="/FORM/BLOCK[@SCREEN=$screen and ID='BLK_STD_BUTTONS']"
                                                                                    mode="BlockStdButtons"/>
                                                        </TD>
                                                 </xsl:if>
                                                 <xsl:variable name="blkButImgCount"
                                                               select="count(/FORM/BLOCK[@SCREEN=$screen and ID='BLK_STD_BUTTONS_IMG'])"/>
                                                 <xsl:if test="$blkButImgCount &gt; 0">
                                                        <TD class="TableTdAuditMain"
                                                            align="right">
                                                               <xsl:apply-templates select="/FORM/BLOCK[@SCREEN=$screen and ID='BLK_STD_BUTTONS_IMG']"
                                                                                    mode="BlockStdButtonsImg"/>
                                                        </TD>
                                                 </xsl:if>
                                          </tr>
                                   </table>
                            </div>
                     </xsl:if>
                     <xsl:call-template name="generateScript"/>
              </xsl:if>
              <!-- absolute position case !-->
              <xsl:if test="$gPosition='absolute'">
                     <DIV class="DivContext"
                          style="position:{$gPosition};top:0px;left:0px;width:{$gWidth}px; height:{$gContexHgt}px;">
                     </DIV>
                     <xsl:if test="count(TAB/PAGE) &gt; 0">
                            <DIV id="ask" CLASS="DivMAIN"
                                 style="position:{$gPosition};left:0px;top:{$gContexHgt}px;overflow:hidden;width:{$gWidth}px;height:{$gHeight}px;">
                                   <xsl:apply-templates select="HEADER/PAGE"
                                                        mode="absolute">
                                   </xsl:apply-templates>
                                   <xsl:if test="count(TAB/PAGE) &gt; 0">
                                          <div id="DIV_SYS_TBL_TABS"
                                               style="padding-top:15px;">
                                                 <TABLE CLASS="TABLETab"
                                                        id="SYS_TBL_TABS"
                                                        cellpadding="0"
                                                        cellspacing="0">
                                                        <TR CLASS="TRTab"
                                                            id="TRTab">
                                                               <xsl:apply-templates select="TAB/PAGE"
                                                                                    mode="absolute">
                                                               </xsl:apply-templates>
                                                               <TD CLASS="TDTabBlank"
                                                                   width="100%">
                                                                      <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
                                                               </TD>
                                                        </TR>
                                                 </TABLE>
                                          </div>
                                          <DIV id="ask1" CLASS="DivTabPageCont"
                                               style="overflow-y:auto;height:{$gHeight - $gHdrHgt -42}px;">
                                                 <xsl:apply-templates select="TAB/PAGE"
                                                                      mode="abs_content"/>
                                          </DIV>
                                   </xsl:if>
                            </DIV>
                     </xsl:if>
                     <DIV CLASS="absDIVPage" id="TBLPageAll"
                          style="position:{$gPosition};top:{$gHeight +$gContexHgt}px;left:0px;width:{$gWidth}px;height:{$gAllTabHgt}px;">
                            <xsl:if test="count(TAB/PAGE) = 0">
                                   <xsl:attribute name="style">
                                          <xsl:text>{position:absolute;top:</xsl:text>
                                          <xsl:value-of select="$gContexHgt"/>
                                          <xsl:text>px;left:0px;width:</xsl:text>
                                          <xsl:value-of select="$gWidth"/>
                                          <xsl:text>px;height:</xsl:text>
                                          <xsl:value-of select="$gHeight"/>
                                          <xsl:text>px;border-top: 2px solid #118ddc;overflow:auto;}</xsl:text>
                                   </xsl:attribute>
                            </xsl:if>
                            <xsl:call-template name="AbsolutePageHandler">
                                   <xsl:with-param name="curr_page">All</xsl:with-param>
                            </xsl:call-template>
                     </DIV>
                     <xsl:if test="count(/FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']) &gt; 0">
                            <xsl:variable name="auditId"
                                          select="/FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/ID"/>
                            <div CLASS="DivAudit" id="DIV_{$auditId}"
                                 style="position:absolute;top:{$gHeight + $gAllTabHgt + $gContexHgt}px;width:{$gWidth}px;">
                                   <xsl:if test="count(TAB/PAGE) = 0">
                                          <xsl:attribute name="style">
                                                 <xsl:text>position:absolute;top:</xsl:text>
                                                 <xsl:value-of select="$gContexHgt + $gHeight"/>
                                                 <xsl:text>px;left:0px;width:</xsl:text>
                                                 <xsl:value-of select="$gWidth"/>
                                                 <xsl:text>px;border:2px solid #118ddc;overflow-y:auto;</xsl:text>
                                          </xsl:attribute>
                                   </xsl:if>
                                   <xsl:apply-templates select="/FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']"
                                                        mode="AuditEntry"/>
                            </div>
                     </xsl:if>
                     <!--added to display std buttons even there is no audit block..-->
                     <xsl:if test="count(/FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']) = 0">
                            <xsl:variable name="blkButCount"
                                          select="count(/FORM/BLOCK[@SCREEN=$screen and ID='BLK_STD_BUTTONS']/FIELD)"/>
                            <xsl:variable name="blkButImgCount"
                                          select="count(/FORM/BLOCK[@SCREEN=$screen and ID='BLK_STD_BUTTONS_IMG']/FIELD)"/>
                            <xsl:if test="$blkButCount &gt; 0 or $blkButImgCount &gt; 0">
                                   <div CLASS="DivAudit" id="DIV_AUDIT_BUTTONS"
                                        style="position:absolute;top:{$gHeight + $gAllTabHgt + $gContexHgt}px;width:{$gWidth}px;">
                                          <xsl:if test="count(TAB/PAGE) = 0">
                                                 <xsl:attribute name="style">
                                                        <xsl:text>position:absolute;top:</xsl:text>
                                                        <xsl:value-of select="$gContexHgt + $gHeight"/>
                                                        <xsl:text>px;left:0px;width:</xsl:text>
                                                        <xsl:value-of select="$gWidth"/>
                                                        <xsl:text>px;border:2px solid #118ddc;overflow-y:auto;</xsl:text>
                                                 </xsl:attribute>
                                          </xsl:if>
                                          <table align="right">
                                                 <tr>
                                                        <TD style="width:100%">
                                                        </TD>
                                                        <xsl:if test="$blkButCount &gt; 0">
                                                               <TD class="TableTdAuditMain"
                                                                   align="right">
                                                                      <xsl:apply-templates select="/FORM/BLOCK[@SCREEN=$screen and ID='BLK_STD_BUTTONS']"
                                                                                           mode="BlockStdButtons"/>
                                                               </TD>
                                                        </xsl:if>
                                                        <xsl:if test="$blkButImgCount &gt; 0">
                                                               <TD class="TableTdAuditMain"
                                                                   align="right">
                                                                      <xsl:apply-templates select="/FORM/BLOCK[@SCREEN=$screen and ID='BLK_STD_BUTTONS_IMG']"
                                                                                           mode="BlockStdButtonsImg"/>
                                                               </TD>
                                                        </xsl:if>
                                                 </tr>
                                          </table>
                                   </div>
                            </xsl:if>
                     </xsl:if>
                     <!--end of std btns-->
                     <xsl:call-template name="generateScript"/>
              </xsl:if>
       </xsl:template>
       <xsl:template name="generateScript">
              <script language="javascript" DEFER="DEFER">
                     <xsl:for-each select="/FORM/SCREEN[@NAME=$screen]">
				var wHeight = 34;
				var l_scrHgt = "
                            <xsl:value-of select="@HEIGHT"/>
";
				var l_scrWth = "
                            <xsl:value-of select="@WIDTH"/>
";
				var l_ctxHgt = "
                            <xsl:value-of select="$gContexHgt"/>
";
				var l_allHgt = "
                            <xsl:value-of select="$gAllTabHgt"/>
";
				var wWidth = parseInt(l_scrWth)+9;				
				window.dialogWidth = wWidth+"px";
				
                            <xsl:if test="count(TAB/PAGE)=0">
					wHeight += parseInt(l_ctxHgt)+parseInt(l_scrHgt);
				</xsl:if>
                            <xsl:if test="count(TAB/PAGE)&gt; 0">
					wHeight += parseInt(l_ctxHgt)+parseInt(l_scrHgt)+parseInt(l_allHgt);
					wHeight += 10;
				</xsl:if>
                            <xsl:if test="count(//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']) &gt; 0">
					var divObj = document.getElementById('DIV_
                                   <xsl:value-of select="//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/ID"/>
');
					wHeight += parseInt(divObj.offsetHeight) + 23;
				</xsl:if>
                            <xsl:if test="count(/FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']) = 0">
                                   <xsl:variable name="blkButCount"
                                                 select="count(/FORM/BLOCK[@SCREEN=$screen and ID='BLK_STD_BUTTONS']/FIELD)"/>
                                   <xsl:variable name="blkButImgCount"
                                                 select="count(/FORM/BLOCK[@SCREEN=$screen and ID='BLK_STD_BUTTONS_IMG']/FIELD)"/>
                                   <xsl:if test="$blkButCount &gt; 0 or $blkButImgCount &gt; 0">
						var btnDivObj = document.getElementById('DIV_AUDIT_BUTTONS');
                                          
                                          <!-- Kals Adding an Constant 21 -->

						wHeight += parseInt(btnDivObj.offsetHeight) + 20;
					</xsl:if>
                            </xsl:if>
        
                            
				window.dialogHeight = wHeight+"px";
			</xsl:for-each>
              </script>
       </xsl:template>
</xsl:stylesheet>
