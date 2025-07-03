<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

   <xsl:template name="DisplayTemplateTabs">
        <!--<div class="DIVThreeColSectionContainer">-->
            <div class="DIVThreeColSectionContainer">
            <xsl:variable name="l_scr_type" select="/FORM/SCREEN[@NAME=$screen]/@TMP_SCR_TYPE" />
            <xsl:if test="$l_scr_type != 'L'">
                <xsl:attribute name="class">
                    <xsl:value-of select="'TwoColSectionContainer'"/>
                </xsl:attribute>
            </xsl:if>

            <div class="DIVColumnTripple">
                <xsl:if test="$l_scr_type != 'L'">
                    <xsl:attribute name="class">
                        <xsl:value-of select="'DIVColumnDouble'"/>
                    </xsl:attribute>
                </xsl:if>

                <div class="DIVtab" id="SYS_TBL_TABS" >
                    <ul id="tablist">
                        <!-- TODO: ? Infra added mode=template in xsl tag -->
                        <xsl:apply-templates select="BODY/TAB[@ID != 'All']" mode="template"/>
                    </ul>
                </div>
            </div>
        </div>
   </xsl:template>

<!-- TODO: ? Infra added mode in xsl tag -->       
<xsl:template match="BODY/TAB" mode="template">
    <li >

        <!-- <a href="#" onclick="changeTabPage(this)" onfocus="this.click()" ID="{@ID}" ACCESSKEY="{ACCESSKEY}"> -->
            <xsl:variable name="tpage">
                <xsl:value-of select="@ID" />
            </xsl:variable>
            <a class="Htaball" href="#" tabindex = '0' onkeydown="return handleTabKeys(this,event)" onmouseover= "this.className='Htabover'" onblur="this.className='Htaball'" onmouseout="this.className='Htaball'" objClicked="false">
            <xsl:variable name="sc" >
                <xsl:text>'</xsl:text>
            </xsl:variable>
            <xsl:attribute name="id">
                <xsl:value-of select="@ID"/>
            </xsl:attribute>
            <xsl:attribute name="onClick">
                <xsl:text>return expandcontent('</xsl:text><xsl:value-of select="$tpage"/><xsl:text>')</xsl:text>
            </xsl:attribute>
            <span>
            <xsl:if test="count(LBL) &gt; 0">
                <xsl:call-template name="dispLabelCaption_tmp">
                    <xsl:with-param name="curr_fld" select="."/>
                </xsl:call-template>
            </xsl:if>
            </span>
        </a>
        

    </li>

</xsl:template>
</xsl:stylesheet>
