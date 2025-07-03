<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:import href="GlobalMultiple.xsl"/>
  <!--<xsl:import href="GlobalInput_col.xsl"/>-->
  <xsl:import href="Abs_GlobalInput.xsl"/>
  <!-- Template to display HEADER fields above tabs -->
  <xsl:template match="HEADER/PAGE" mode="absolute">
    <!--
                 		<FIELDSET CLASS="DivHdrPageCont">
              		
              			<LEGEND><NOBR><LABEL CLASS="LABELNormal" NAME="Header" style="visibility:hidden;">Header</LABEL></NOBR></LEGEND>
              			!-->
                    
    <DIV CLASS="absDIVHdr" ID="TBLPage{@ID}" STYLE="overflow-y:auto;HEIGHT:{@HEIGHT}px;">
      <xsl:call-template name="AbsolutePageHandler">
        <xsl:with-param name="curr_page">
          <xsl:value-of select="@NAME"/>
        </xsl:with-param>
      </xsl:call-template>
    </DIV>
    <!--
              		</FIELDSET>
              !-->
  </xsl:template>
  <!-- Template to handle a page -->
  <xsl:template match="PAGE" mode="abs_content">
    <xsl:param name="layout" select="."/>
    <DIV CLASS="absDIVPage" ID="TBLPage{@ID}">
      <xsl:if test="position()!=1">
        <xsl:attribute name="style">
          <xsl:text>display:none;</xsl:text>
        </xsl:attribute>
      </xsl:if>
      <!-- Call Page Handler based on absolute/column positioning -->
      <xsl:call-template name="AbsolutePageHandler">
        <xsl:with-param name="curr_page" select="@NAME"/>
        <xsl:with-param name="layout" select="$layout"/>
      </xsl:call-template>
    </DIV>
  </xsl:template>
  <!-- Page Handler for Absolute Positioning -->
  <xsl:template name="AbsolutePageHandler">
    <xsl:param name="curr_page" select="."/>
    <xsl:param name="layout" select="."/>
    <xsl:apply-templates select="/FORM/BLOCK[@SCREEN=$screen and @TYPE !='Audit Entry' and ID != 'BLK_BLOCK_BUTTONS' and ID != 'BLK_STD_BUTTONS_IMG' and ID != 'BLK_STD_BUTTONS']">
      <xsl:with-param name="curr_page" select="$curr_page"/>
      <xsl:with-param name="layout" select="$layout"/>
    </xsl:apply-templates>
  </xsl:template>
  <!-- Template to handle a block -->
  <xsl:template match="BLOCK">
    <xsl:param name="curr_page" select="."/>
    <xsl:param name="layout" select="."/>
    <xsl:if test="@TYPE != 'Multiple Entry'">
      <xsl:apply-templates select="FIELD[@TABPAGE=$curr_page]/TYPE"
                           mode="absolute">
        <xsl:with-param name="layout" select="$layout"/>
      </xsl:apply-templates>
    </xsl:if>
    <xsl:if test="((@TYPE = 'Multiple Entry' and @VIEW != 'Single Entry') or (@TYPE = 'Multiple Entry' and count(@VIEW) = 0)) and  @TABPAGE=$curr_page">
      <xsl:call-template name="MultipleHandler_absolute"/>
    </xsl:if>
    <!-- added by sundar -->
    <xsl:if test="@TYPE = 'Multiple Entry' and @VIEW = 'Single Entry' and count(FIELD[@TABPAGE=$curr_page]) &gt; 0">
        <DIV id="{ID}" VIEW="{@VIEW}">
            <xsl:apply-templates select="FIELD[@TABPAGE=$curr_page]/TYPE" mode="absolute">
              <xsl:with-param name="layout" select="$layout"/>
            </xsl:apply-templates>
        </DIV>
    </xsl:if>
  </xsl:template>
  <xsl:template name="AllContent_absolute">
    <DIV CLASS="absDIVPage" id="TBLPageAll"
         style="position:{$gPosition};top:{$gHeight +$gContexHgt}px;overflow-y:auto;left:0px;width:{$gWidth}px;height:{$gAllTabHgt}px;">
      <xsl:if test="count(TAB/PAGE) = 0">
        <xsl:attribute name="style">
          <xsl:text>{position:absolute;top:</xsl:text>
          <xsl:value-of select="$gContexHgt"/>
          <xsl:text>px;left:0px;width:</xsl:text>
          <xsl:value-of select="$gWidth"/>
          <xsl:text>px;height:</xsl:text>
          <xsl:value-of select="$gHeight"/>
          <xsl:text>px;border-top: 2px solid #118ddc;overflow-y:auto;}</xsl:text>
        </xsl:attribute>
      </xsl:if>
      <xsl:call-template name="AbsolutePageHandler">
        <xsl:with-param name="curr_page">All</xsl:with-param>
      </xsl:call-template>
    </DIV>
  </xsl:template>
</xsl:stylesheet>
