<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:import href="GlobalMultiple.xsl"/>
  <xsl:import href="Col_GlobalInput.xsl"/>
  <!-- Template to display HEADER fields above tabs -->
  <xsl:template match="HEADER/PAGE" mode="column">
      <!-- sundar added for ME blk with SE View -->
      <xsl:variable name="tabId" select="@ID"/>
      <xsl:variable name="meBlkSeView"
                  select="count(//BLOCK[@SCREEN = $screen and @TYPE = 'Multiple Entry' and @VIEW = 'Single Entry']/FIELD[@TABPAGE = $tabId])"/>
      <DIV>
         <xsl:if test="$meBlkSeView &gt; 0">             
          <xsl:variable name="blk"
                  select="//BLOCK[@SCREEN = $screen and @TYPE = 'Multiple Entry' and @VIEW = 'Single Entry']"/>
          <xsl:attribute name="ID">
            <xsl:value-of select="$blk/ID"/>
          </xsl:attribute>
          <xsl:attribute name="VIEW">
            <xsl:value-of select="$blk/@VIEW"/>
          </xsl:attribute>
        </xsl:if>  
      <!-- sundar ends -->
    <TABLE CLASS="colTABLEHdr" ID="TBLPage{@ID}"
           style="table-layout:fixed;width:100%;" summary="Tab Group headers"
           cellpadding="0" cellspacing="0" border="0">
      <xsl:call-template name="displayCustomButtons">
        <xsl:with-param name="pageId" select="@ID"/>
        <xsl:with-param name="vAlign">top</xsl:with-param>
      </xsl:call-template>
      <xsl:call-template name="ColumnPageHandler">
        <xsl:with-param name="curr_page">
          <xsl:value-of select="@NAME"/>
        </xsl:with-param>
      </xsl:call-template>
      <xsl:call-template name="displayCustomButtons">
        <xsl:with-param name="pageId" select="@ID"/>
        <xsl:with-param name="vAlign">bottom</xsl:with-param>
      </xsl:call-template>
    </TABLE>
   </DIV>
  </xsl:template>
  <!-- Template to handle a page -->
  <xsl:template match="PAGE" mode="col_content">
      <!-- sundar added for ME blk with SE View -->
      <xsl:variable name="tabId" select="@ID"/>
      <xsl:variable name="meBlkSeView"
                  select="count(//BLOCK[@SCREEN = $screen and @TYPE = 'Multiple Entry' and @VIEW = 'Single Entry']/FIELD[@TABPAGE = $tabId])"/>
      <DIV>
         <xsl:if test="$meBlkSeView &gt; 0">             
          <xsl:variable name="blk"
                  select="//BLOCK[@SCREEN = $screen and @TYPE = 'Multiple Entry' and @VIEW = 'Single Entry']"/>
          <xsl:attribute name="ID">
            <xsl:value-of select="$blk/ID"/>
          </xsl:attribute>
          <xsl:attribute name="VIEW">
            <xsl:value-of select="$blk/@VIEW"/>
          </xsl:attribute>
        </xsl:if>  
      <!-- sundar ends -->
    <TABLE CLASS="colTABLEPage" ID="TBLPage{@ID}"
           style="table-layout:fixed;width:100%;" summary="" cellpadding="0"
           cellspacing="0" border="0">
      <xsl:if test="position()!=1">
        <xsl:attribute name="style">
          <xsl:text>table-layout:fixed;width:100%;display:none;</xsl:text>
        </xsl:attribute>
      </xsl:if>
      <!-- Ashok added the fix !-->
      <TR CLASS="colTRRow" style="height:0px;">
        <TD CLASS="colTDLabel" valign="top"></TD>
        <TD CLASS="colTDText" align="left" valign="top"></TD>
        <TD CLASS="colTDLabel" valign="top"></TD>
        <TD CLASS="colTDText" align="left" valign="top"></TD>
      </TR>
      <xsl:call-template name="displayCustomButtons">
        <xsl:with-param name="pageId" select="@ID"/>
        <xsl:with-param name="vAlign">top</xsl:with-param>
      </xsl:call-template>
      <xsl:call-template name="ColumnPageHandler">
        <xsl:with-param name="curr_page" select="@NAME"/>
      </xsl:call-template>
      <xsl:call-template name="displayCustomButtons">
        <xsl:with-param name="pageId" select="@ID"/>
        <xsl:with-param name="vAlign">bottom</xsl:with-param>
      </xsl:call-template>
    </TABLE>
   </DIV>
  </xsl:template>
  <!-- Page Handler for Column Positioning -->
  <xsl:template name="ColumnPageHandler">
    <xsl:param name="curr_page" select="."/>
    <!--
              <xsl:for-each select="/FORM/BLOCK[@SCREEN=$screen and ID != 'BLK_CST_BUTTONS' and ID != 'BLK_STD_BUTTONS_IMG' and ID != 'BLK_STD_BUTTONS']">
                     <xsl:if test="@TYPE = 'Single Entry'">              
                            <xsl:for-each select="./FIELD[@TABPAGE=$curr_page and @COL=1]">
                                   <xsl:sort select="@ROW" data-type="number"
                                             order="ascending"/>
              
                                   <xsl:call-template name="RowHandler">
                                          <xsl:with-param name="curr_page"
                                                          select="$curr_page"/>
                                          <xsl:with-param name="curr_row"
                                                          select="@ROW"/>
                                   </xsl:call-template>
                            </xsl:for-each>
                     </xsl:if>
                     <xsl:if test="@TYPE = 'Multiple Entry' and @TABPAGE=$curr_page">
                            <TR CLASS="colTRRow">
                                   <TD COLSPAN="4">
                                          <xsl:call-template name="MultipleHandler_column"/>
                                   </TD>
                            </TR>
                     </xsl:if>
              </xsl:for-each>-->
    <!--yugandhar added-->
    <xsl:for-each select="/FORM/BLOCK[@SCREEN=$screen and @TYPE = 'Single Entry' and ID != 'BLK_CST_BUTTONS' and ID != 'BLK_STD_BUTTONS_IMG' and ID != 'BLK_STD_BUTTONS']/FIELD[@TABPAGE=$curr_page and @COL=1]">
      <xsl:sort select="@ROW" data-type="number" order="ascending"/>
      <xsl:call-template name="RowHandler">
        <xsl:with-param name="curr_page" select="$curr_page"/>
        <xsl:with-param name="curr_row" select="@ROW"/>
      </xsl:call-template>
    </xsl:for-each>
    <xsl:for-each select="/FORM/BLOCK[((@TYPE = 'Multiple Entry' and @VIEW != 'Single Entry') or (@TYPE = 'Multiple Entry' and count(@VIEW) = 0)) and @SCREEN=$screen and @TABPAGE=$curr_page and ID != 'BLK_CST_BUTTONS' and ID != 'BLK_STD_BUTTONS_IMG' and ID != 'BLK_STD_BUTTONS']"> 
      <TR CLASS="colTRRow">
        <TD COLSPAN="4">
          <xsl:call-template name="MultipleHandler_column"/>
        </TD>
      </TR>
    </xsl:for-each>
    <!-- added by sundar -->
    <xsl:for-each select="/FORM/BLOCK[@SCREEN=$screen and @TYPE = 'Multiple Entry' and @VIEW = 'Single Entry' and ID != 'BLK_CST_BUTTONS' and ID != 'BLK_STD_BUTTONS_IMG' and ID != 'BLK_STD_BUTTONS']/FIELD[@TABPAGE=$curr_page and @COL=1]"> 
      <xsl:sort select="@ROW" data-type="number" order="ascending"/>
        <xsl:call-template name="RowHandler">
          <xsl:with-param name="curr_page" select="$curr_page"/>
          <xsl:with-param name="curr_row" select="@ROW"/>
        </xsl:call-template>
    </xsl:for-each>
  </xsl:template>
  <!-- Row Handler -->
  <xsl:template name="RowHandler">
    <xsl:param name="curr_page" select="."/>
    <xsl:param name="curr_row" select="."/>
    <TR CLASS="colTRRow">
<!--      <xsl:apply-templates select="/FORM/BLOCK[@SCREEN=$screen and @TYPE = 'Single Entry']/FIELD[@TABPAGE=$curr_page and @ROW=$curr_row]/TYPE" 
                           mode="column"> -->
      <xsl:apply-templates select="/FORM/BLOCK[@SCREEN=$screen and (@TYPE = 'Single Entry' or @VIEW = 'Single Entry')]/FIELD[@TABPAGE=$curr_page and @ROW=$curr_row]/TYPE" 
                           mode="column"> 
        <xsl:sort select="../@COL" data-type="number" order="ascending"/>
      </xsl:apply-templates>
      <!-- creating emtry td if the row dosent contain col 2 !-->
      <xsl:variable name="rowFirstFld"
                    select="/FORM/BLOCK[@SCREEN=$screen and (@TYPE = 'Single Entry' or @VIEW = 'Single Entry')]/FIELD[@TABPAGE=$curr_page and @ROW=$curr_row and @COL = 1]"/>
      <xsl:if test="count(/FORM/BLOCK[@SCREEN=$screen and (@TYPE = 'Single Entry' or @VIEW = 'Single Entry')]/FIELD[@TABPAGE=$curr_page and @ROW=$curr_row] ) &lt; 2">
      <!-- if the field type is TEXTAREA then we should not add the empty td's. coz, COLSPAN=3 mentioned already for textarea field Kals , Yug March 16 -->
        <xsl:if test="$rowFirstFld/TYPE != 'FIELDSET' and $rowFirstFld/TYPE != 'TEXTAREA'">
          <TD CLASS="colTDLabel">
            <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
          </TD>
          <TD CLASS="colTDText">
            <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
          </TD>
        </xsl:if>
        <xsl:if test="$rowFirstFld/TYPE = 'FIELDSET' and $rowFirstFld/COLSPAN = 2">
          <TD CLASS="colTDLabel">
            <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
          </TD>
          <TD CLASS="colTDText">
            <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
          </TD>
        </xsl:if>
      </xsl:if>
    </TR>
  </xsl:template>
  
  <xsl:template name="AllContent_column">
  
    <!--  
    <xsl:variable name="No_Flds_TabAll"
                  select="count(//BLOCK[@SCREEN =$screen and @TYPE = 'Multiple Entry' and @TABPAGE = 'All'])   +   count(//BLOCK[@SCREEN =$screen and @TYPE = 'Single Entry']/FIELD[@TABPAGE = 'All']) ">
    </xsl:variable>
    
    <xsl:variable name="gAllTabHgt_Temp">
      <xsl:if test="$No_Flds_TabAll = 0">
        <xsl:value-of select="0"/>
      </xsl:if>
      <xsl:if test="$No_Flds_TabAll &gt; 0">
        <xsl:value-of select="$gAllTabHgt"/>
      </xsl:if>
    </xsl:variable>
    !-->
    
    <xsl:variable name="gAllTabHgt_Temp">
      <xsl:if test="count(TAB/PAGE) = 0">
        <xsl:value-of select="$gHeight"/>
      </xsl:if>
      <xsl:if test="count(TAB/PAGE) &gt; 0">
        <xsl:value-of select="$gAllTabHgt"/>
      </xsl:if>
    </xsl:variable>
    
    
    <xsl:if test="$gAllTabHgt_Temp &gt; 0"> 
    <div id="TabPageAll" class="TABLETabAll"
         style="overflow-y:scroll;height:{$gAllTabHgt_Temp}px;width:{$gWidth}px;">

      <xsl:if test="count(TAB/PAGE) = 0">
        <xsl:attribute name="style">
          <xsl:text>overflow-y:auto;width:</xsl:text>
          <xsl:value-of select="$gWidth"/>
          <xsl:text>px;height:</xsl:text>
          <xsl:value-of select="$gHeight + 8"/>
          <xsl:text>px;</xsl:text>
        </xsl:attribute>
      </xsl:if>

      <!-- sundar added for ME blk with SE View !--> 
      <xsl:variable name="meBlkSeView"
                  select="count(//BLOCK[@SCREEN = $screen and @TYPE = 'Multiple Entry' and @VIEW = 'Single Entry']/FIELD[@TABPAGE = 'All'])"/>
      <DIV>
         <xsl:if test="$meBlkSeView &gt; 0">             
          <xsl:variable name="blk"
                  select="//BLOCK[@SCREEN = $screen and @TYPE = 'Multiple Entry' and @VIEW = 'Single Entry']"/>
          <xsl:attribute name="ID">
            <xsl:value-of select="$blk/ID"/>
          </xsl:attribute>
          <xsl:attribute name="VIEW">
            <xsl:value-of select="$blk/@VIEW"/>
          </xsl:attribute>
        </xsl:if>  
       
        
      <!-- sundar ends -->
      <TABLE CLASS="colTABLEPage" id="TBLPageAll"
             style="table-layout:fixed;width:100%;" cellpadding="0"
             cellspacing="0" border="0">
            
        <xsl:if test="count(TAB/PAGE) = 0">
          <xsl:attribute name="summary">
            <xsl:text>Tab Group All</xsl:text>
          </xsl:attribute>
          <TR CLASS="colTRRow">
            <TD COLSPAN="4" style="height:15px;">
              <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
            </TD>
          </TR>
        </xsl:if>
        <xsl:if test="count(TAB/PAGE) &gt; 0">
          <xsl:attribute name="summary">
            <xsl:text>Tab Group Footer</xsl:text>
          </xsl:attribute>
        </xsl:if>
        <!-- Ashok added the fix !-->
        <TR CLASS="colTRRow" style="height:0px;">
          <TD CLASS="colTDLabel" valign="top"></TD>
          <TD CLASS="colTDText" align="left" valign="top"></TD>
          <TD CLASS="colTDLabel" valign="top"></TD>
          <TD CLASS="colTDText" align="left" valign="top"></TD>
        </TR>
        <xsl:call-template name="displayCustomButtons">
          <xsl:with-param name="pageId">All</xsl:with-param>
          <xsl:with-param name="vAlign">top</xsl:with-param>
        </xsl:call-template>
        <xsl:call-template name="ColumnPageHandler">
          <xsl:with-param name="curr_page">All</xsl:with-param>
        </xsl:call-template>
        <xsl:call-template name="displayCustomButtons">
          <xsl:with-param name="pageId">All</xsl:with-param>
          <xsl:with-param name="vAlign">bottom</xsl:with-param>
        </xsl:call-template>
        
         <TR style="height:100%">
                     <TD colspan="4"><xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text></TD>
              </TR>
      </TABLE>
      </DIV>
    </div>
    </xsl:if>
  </xsl:template>
  <!-- Teplate to disply the custom buttons -->
  <xsl:template name="displayCustomButtons">
    <xsl:param name="pageId" select="."/>
    <xsl:param name="vAlign" select="."/>
    <xsl:variable name="alignWidth" select="$gWidth div 3"/>
    <xsl:variable name="vAlignBtnCnt"
                  select="count(/FORM/BLOCK[@SCREEN = $screen and @TYPE = 'Single Entry' and ID = 'BLK_CST_BUTTONS']/FIELD[@TABPAGE = $pageId and VALIGN = $vAlign])"/>
    <xsl:if test="$vAlignBtnCnt &gt; 0">
      <TR CLASS="colTRRow">
        <TD COLSPAN="4">
          <TABLE summary="Custom Buttons" cellpadding="0" cellspacing="0"
                 border="0">
            <xsl:if test="$vAlign = 'top'">
              <xsl:attribute name="style">margin-bottom:5px</xsl:attribute>
            </xsl:if>
            <xsl:if test="$vAlign = 'bottom'">
              <xsl:attribute name="style">margin-top:5px</xsl:attribute>
            </xsl:if>            
            <xsl:variable name="leftCount" select="count(/FORM/BLOCK[@SCREEN = $screen and @TYPE = 'Single Entry' and ID = 'BLK_CST_BUTTONS']/FIELD[@TABPAGE = $pageId and VALIGN = $vAlign and HALIGN = 'left'])"/>
            <xsl:variable name="middleCount" select="count(/FORM/BLOCK[@SCREEN = $screen and @TYPE = 'Single Entry' and ID = 'BLK_CST_BUTTONS']/FIELD[@TABPAGE = $pageId and VALIGN = $vAlign and HALIGN = 'center'])"/>
            <xsl:variable name="rightCount" select="count(/FORM/BLOCK[@SCREEN = $screen and @TYPE = 'Single Entry' and ID = 'BLK_CST_BUTTONS']/FIELD[@TABPAGE = $pageId and VALIGN = $vAlign and HALIGN = 'right'])"/>            
            
            <xsl:variable name="leftWidth">
              <xsl:choose>
                <xsl:when test="$leftCount &gt; 3 and $leftCount &lt; 6 and $middleCount = 0">
                  <xsl:value-of select="$alignWidth + $alignWidth"/>
                </xsl:when>
                <xsl:when test="$leftCount &gt; 3 and $leftCount &lt; 6 and $rightCount = 0">
                  <xsl:value-of select="$alignWidth + $alignWidth"/>
                </xsl:when>
                <xsl:when test="$leftCount &gt; 3 and $leftCount &gt; 6 and $middleCount = 0 and $rightCount = 0">
                  <xsl:value-of select="$alignWidth + $alignWidth + $alignWidth"/>
                </xsl:when>
                <xsl:when test="$leftCount = 0 and $middleCount &gt; 3">
                  <xsl:value-of select="'0'"/>
                </xsl:when>
                <xsl:otherwise>
                  <xsl:value-of select="$alignWidth"/>
                </xsl:otherwise>
              </xsl:choose>
            </xsl:variable>
             <xsl:variable name="middleWidth">
              <xsl:choose>
                <xsl:when test="$middleCount &gt; 3 and $middleCount &lt; 6 and $rightCount = 0">
                  <xsl:value-of select="$alignWidth + $alignWidth"/>
                </xsl:when>
                <xsl:when test="$middleCount &gt; 3 and $middleCount &lt; 6 and $leftCount = 0">
                  <xsl:value-of select="$alignWidth + $alignWidth"/>
                </xsl:when>
                <xsl:when test="$middleCount &gt; 3 and $middleCount &gt; 6 and $rightCount = 0 and $leftCount = 0">
                  <xsl:value-of select="$alignWidth + $alignWidth + $alignWidth"/>
                </xsl:when>                 
                <xsl:when test="$middleCount = 0 and ($leftCount &gt; 3 or $rightCount &gt; 3) ">
                  <xsl:value-of select="'0'"/>
                </xsl:when>
                <xsl:otherwise>
                  <xsl:value-of select="$alignWidth"/>
                </xsl:otherwise>
              </xsl:choose>
            </xsl:variable>
            <xsl:variable name="rightWidth">
              <xsl:choose>
                <xsl:when test="$rightCount &gt; 3 and $rightCount &lt; 6 and $middleCount = 0">
                  <xsl:value-of select="$alignWidth + $alignWidth"/>
                </xsl:when>
                <xsl:when test="$rightCount &gt; 3 and $rightCount &gt; 6 and $middleCount = 0 and $leftCount = 0">
                  <xsl:value-of select="$alignWidth + $alignWidth + $alignWidth"/>
                </xsl:when>
                <xsl:otherwise>
                  <xsl:value-of select="$alignWidth"/>
                </xsl:otherwise>
              </xsl:choose>
            </xsl:variable>                        
            <TR>
              <xsl:attribute name="ugi"><xsl:value-of select="$leftWidth"/>:<xsl:value-of select="$middleWidth"/>:<xsl:value-of select="$rightWidth"/></xsl:attribute>
              <TD style="width:{$leftWidth}px;" align="right">
              <!--<TD style="width:{$alignWidth}px;" align="right">-->
                <xsl:apply-templates select="/FORM/BLOCK[@SCREEN = $screen and @TYPE = 'Single Entry' and ID = 'BLK_CST_BUTTONS']/FIELD[@TABPAGE = $pageId and VALIGN = $vAlign and HALIGN = 'left']"
                                     mode="custButtons">
                </xsl:apply-templates>
              </TD>
              <TD style="width:{$middleWidth}px;" align="center">
              <!--<TD style="width:{$alignWidth}px;" align="center">-->
                <xsl:apply-templates select="/FORM/BLOCK[@SCREEN = $screen and @TYPE = 'Single Entry' and ID = 'BLK_CST_BUTTONS']/FIELD[@TABPAGE = $pageId and VALIGN = $vAlign and HALIGN = 'center']"
                                     mode="custButtons">
                </xsl:apply-templates>
              </TD>              
              <TD style="width:{$rightWidth}px;" align="right">              
              <!--<TD style="width:{$alignWidth}px;" align="right">-->                
                <xsl:apply-templates select="/FORM/BLOCK[@SCREEN = $screen and @TYPE = 'Single Entry' and ID = 'BLK_CST_BUTTONS']/FIELD[@TABPAGE = $pageId and VALIGN = $vAlign and HALIGN = 'right']"
                                     mode="custButtons">
                </xsl:apply-templates>
              </TD>
            </TR>
          </TABLE>
        </TD>
      </TR>
    </xsl:if>
  </xsl:template>
  <xsl:template match="FIELD" mode="custButtons">
    <BUTTON CLASS="INPUTButton">
      <xsl:if test="count(./SRC) &gt; 0">
        <xsl:attribute name="CLASS">INPUTStdButton_img</xsl:attribute>
      </xsl:if>
      <xsl:call-template name="ATTR_Handler">
        <xsl:with-param name="curr_fld" select="."/>
      </xsl:call-template>
      <xsl:call-template name="dispLabelCaption">
        <xsl:with-param name="curr_fld" select="."/>
      </xsl:call-template>
      <xsl:if test="count(./SRC) &gt; 0">
        <IMG id="{./NAME}_IMG" SRC="{./SRC}">
          <xsl:if test="count(./ALT) &gt; 0">
            <xsl:attribute name="ALT">
              <xsl:value-of select="./ALT"/>
            </xsl:attribute>
          </xsl:if>
        </IMG>
      </xsl:if>
    </BUTTON>
    <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
  </xsl:template>
</xsl:stylesheet>
