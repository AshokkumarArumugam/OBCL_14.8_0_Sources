<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:import href="ExtPartition.xsl"/>
    
    
    <xsl:template match="SECTION">
    
        <div class="TwoColSectionContainer">
            
            <xsl:if test="$l_scr_type = 'L'">
                <xsl:attribute name="class">
                    <!--<xsl:value-of select="'DIVThreeColSectionContainer'"/>-->
                    <xsl:text>DIVThreeColSectionContainer</xsl:text>
                </xsl:attribute>
            </xsl:if>
            
            <xsl:apply-templates select="PART"></xsl:apply-templates>
            
        </div>
        
    </xsl:template>
    
    <!-- Section handler for footer !-->
    <xsl:template match="SECTION" mode="footer">
        <!--<table class="TABLEFooter" cellpadding="0" cellspacing="0" border="0" width="100%" summary="">
            <tr>-->
                <xsl:apply-templates select="PART" mode="footer"/>
            <!--</tr>
        </table>-->
    </xsl:template>
    
</xsl:stylesheet>
