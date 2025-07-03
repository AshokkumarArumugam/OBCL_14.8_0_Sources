<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

       <xsl:template name="DisplayTabs">
              <table CLASS="TABLETab" id="SYS_TBL_TABS"
                     style="table-layout:auto;width:100%"
                     summary="Tab Group headers" border="0" cellpadding="0"
                     cellspacing="0">
                    <THEAD id="THeadTab">
                    
                      <xsl:for-each select="/FORM/SCREEN[@NAME=$screen]/TAB/PAGE">
                        <TH>
                          <xsl:if test="position()!=1">
                            <b id="b1" class="b1d"></b><b id="b2" class="b2d"></b>
                          </xsl:if>
                          <xsl:if test="position()=1">
                            <b id="b1" class="c1d"></b><b id="b2" class="c2d"></b>
                          </xsl:if>
                          <DIV></DIV>
                       </TH>
                      </xsl:for-each>
                   </THEAD>
                     <tr CLASS="TRTab" id="TRTab">
                            <xsl:apply-templates select="TAB/PAGE"/>
                            <td CLASS="TDTabBlank" style="width:100%;">
                                   <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
                            </td>
                     </tr>
              </table>
       </xsl:template>
       
       <xsl:template match="TAB/PAGE">
              <td CLASS="TDTab" onclick="changeTabPage(this)"
                  onfocus="this.click()" ID="{@ID}" ACCESSKEY="{ACCESSKEY}">
                     <xsl:if test="position()=1">
                            <xsl:attribute name="CLASS">
                                   <xsl:text>TDTabSelected</xsl:text>
                            </xsl:attribute>
                     </xsl:if>
                     <NOBR>
                            <LABEL CLASS="LABELNormal">
                                   <xsl:call-template name="ATTR_Handler">
                                          <xsl:with-param name="curr_fld"
                                                          select="."/>
                                   </xsl:call-template>
                                   <a href="#" class="LinkTAB">
                                          <xsl:if test="count(LABEL) &gt; 0">
                                                 <xsl:call-template name="dispLabelCaption">
                                                        <xsl:with-param name="curr_fld"
                                                                        select="."/>
                                                 </xsl:call-template>
                                          </xsl:if>
                                   </a>
                            </LABEL>
                     </NOBR>
              </td>
       </xsl:template>
</xsl:stylesheet>
