<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

   <xsl:template name="DisplayTemplateTabs">
        <!--<div class="DIVThreeColSectionContainer">-->
            <div class="DIVThreeColSectionContainer">
            <xsl:variable name="l_scr_type" select="/FORM/SCREEN[@NAME=$screen]/@TMP_SCR_TYPE" />
            <xsl:if test="$l_scr_type != 'large'">
                <xsl:attribute name="class">
                    <xsl:value-of select="'TwoColSectionContainer'"/>
                </xsl:attribute>
            </xsl:if>

            <div class="DIVColumnTripple">
                <xsl:if test="$l_scr_type != 'large'">
                    <xsl:attribute name="class">
                        <xsl:value-of select="'DIVColumnDouble'"/>
                    </xsl:attribute>
                </xsl:if>

                <div class="TabHead" id="SYS_TBL_TABS" >
                    <ul id="tablist">
                        <!-- TODO: ? Infra added mode=template in xsl tag -->
                        <xsl:apply-templates select="TAB/PAGE[@ID != 'All']" mode="template"/>
                    </ul>
                </div>
            </div>
        </div>
   </xsl:template>

<!-- TODO: ? Infra added mode in xsl tag -->       
<xsl:template match="TAB/PAGE" mode="template">
    <li >

        <!-- <a href="#" onclick="changeTabPage(this)" onfocus="this.click()" ID="{@ID}" ACCESSKEY="{ACCESSKEY}"> -->
            <xsl:variable name="tpage">
                <xsl:value-of select="concat('TBLPage', @ID)" />
            </xsl:variable>
            <a href="#" class="Htab" onkeydown="return handleTabKeys(this,event)" onblur="this.className='Htab'" onfocus="this.className='HtabH'" onmouseout="this.className='Htab'" onmouseover="this.className='HtabH'">
            <xsl:variable name="sc" >
                <xsl:text>'</xsl:text>
            </xsl:variable>
            <xsl:attribute name="id">
                <xsl:value-of select="@ID"/>
            </xsl:attribute>
            <xsl:attribute name="onClick">
                <!-- My Output : return expandcontent('TABPageCVS_BASIC', this) -->
                <!-- <xsl:value-of select="concat('return expandcontent('&quot;'&quot;$tpage&quot;'&quot;', this)')" /> -->
                <xsl:value-of select="concat('return expandcontent(', $sc, $tpage, $sc, ', this)')" />
                
                
            </xsl:attribute>
            <span>
            <xsl:if test="count(LABEL) &gt; 0">
                <xsl:call-template name="dispLabelCaption_tmp">
                    <xsl:with-param name="curr_fld" select="."/>
                </xsl:call-template>
            </xsl:if>
            </span>
        </a>
        

    </li>

</xsl:template>
</xsl:stylesheet>
