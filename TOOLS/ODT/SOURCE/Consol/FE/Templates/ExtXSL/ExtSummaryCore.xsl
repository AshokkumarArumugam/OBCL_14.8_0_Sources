<?xml version="1.0"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<!-- Takes care of features common in Label Field of Absolute/Column Positioning -->
<xsl:template name="dispLabelField">
    <xsl:param name="dbt"/>
    <xsl:param name="dbc"/>
    <xsl:param name="fldName"/>
    <xsl:param name="fldNode"/>
    
    <LABEL CLASS="LBLstd">
        <xsl:value-of select="$fldNode/LBL"></xsl:value-of>
        <!--<xsl:call-template name="RequiredFieldHandler">
            <xsl:with-param name="curr_fld" select="$fldNode" />
        </xsl:call-template>-->
    </LABEL>
</xsl:template>

<xsl:template name="dispLabelHidden">
    <LABEL CLASS="LBLinv"></LABEL>
</xsl:template>

<xsl:template name="dispLabelCaption">
    <xsl:param name="curr_fld" select="." />
    
    <!-- Labels with Access Key are being underlined -->
    <xsl:if test="count($curr_fld/ACCESSKEY) &gt; 0 and contains($curr_fld/LBL , $curr_fld/ACCESSKEY)">
        <xsl:value-of select="substring-before($curr_fld/LBL,$curr_fld/ACCESSKEY)" />
        <U>
            <xsl:value-of select="$curr_fld/ACCESSKEY" />
        </U>
        <xsl:value-of select="substring-after($curr_fld/LABEL,$curr_fld/ACCESSKEY)" />
    </xsl:if>
    <xsl:if test="count($curr_fld/ACCESSKEY) = 0 or not(contains($curr_fld/LBL , $curr_fld/ACCESSKEY))">
        <xsl:value-of select="$curr_fld/LBL" />
    </xsl:if>
    
    <!-- if no label is present , keep &nbsp to complete the TD. !-->
    <xsl:if test="$curr_fld/LBL = ''">
        <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
    </xsl:if>
</xsl:template>

<xsl:template name="ATTR_Handler_lbs">
    <xsl:param name="curr_fld" select="." />
    
    <xsl:attribute name="NAME">
        <xsl:value-of select="$curr_fld/NAME" />
    </xsl:attribute>
    <xsl:if test="count($curr_fld/HIDDEN) &gt; 0 and $curr_fld/HIDDEN = -1">
        <xsl:attribute name="CLASS">hidden</xsl:attribute>
    </xsl:if>
    <xsl:if test="count($curr_fld/ACCESSKEY) &gt; 0">
        <xsl:attribute name="ACCESSKEY">
            <xsl:value-of select="$curr_fld/ACCESSKEY" />
        </xsl:attribute>
    </xsl:if>
</xsl:template>


<!-- Handler for Events -->
<xsl:template match="EVENT">
    <xsl:attribute name="{./NAME}" >
        <xsl:value-of select="./FUNCTION" />
    </xsl:attribute>
</xsl:template>
    
<!-- Handler for Custom Attributes -->
<xsl:template match="CUSTOM">
    <xsl:for-each select="*">
        <xsl:attribute name="{name()}" >
            <xsl:value-of select="." />
        </xsl:attribute>
    </xsl:for-each>
</xsl:template>

<xsl:template name="disp_Exit_Btn">
    <TABLE class="TABLEAudit" cellSpacing="0" cellPadding="0" width="99%" border="0" summary="">
        <TR>
            <TD vAlign="top">
                <xsl:text disable-output-escaping="yes">&#160;</xsl:text>
            </TD>        
            <TD class="TDAuditButton" vAlign="top" width="90%">
                <INPUT class="BTNfooter" id="BTN_EXIT" onclick="fnExit_sum('',event)" type="button" onmouseover="this.className='BTNfooterH'" onblur="this.className='BTNfooter'" onfocus="this.className='BTNfooterH'" onmouseout="this.className='BTNfooter'" value="{$exit_SummaryAudit}"/>
                <!--<IMG id="BTN_EXIT_IMG'" style="display:none" src="Images/Exit2.gif" name="BTN_EXIT_IMG"/>-->
            </TD>
        </TR>
    </TABLE>
</xsl:template>
    
<xsl:template name="Custom_Legends">
    <xsl:param name="fsHeight"/>
    <xsl:param name="tdHeight"/>
    <xsl:if test="count(//LEGENDS) > 0">
        <xsl:for-each select="//LEGENDS">
            <xsl:variable name="width">
                <xsl:if test="normalize-space(WIDTH) != ''">
                    <xsl:value-of select="normalize-space(WIDTH)"/>
                </xsl:if>
                <xsl:if test="normalize-space(WIDTH) = ''">
                    <xsl:value-of select="150"/>
                </xsl:if>
            </xsl:variable>        
            <FIELDSET CLASS="FIELDSETAudit">          
                <LEGEND>
                    <xsl:value-of select="LBL"/>
                </LEGEND>          
                    <TABLE border="0" cellspacing="0" cellpadding="0" summary="">
                    <xsl:for-each select="OPTION">
                        <TR>
                            <TD>
                                <label class="LBLstd">
                                    <xsl:value-of select="@VALUE"/>
                                    -
                                    <xsl:value-of select="(.)"/>
                                </label>
                            </TD>
                        </TR>
                    </xsl:for-each>
                </TABLE>          
            </FIELDSET>        
        </xsl:for-each>
    </xsl:if>
</xsl:template>

</xsl:stylesheet>

