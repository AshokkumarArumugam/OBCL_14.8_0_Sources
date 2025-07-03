<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:import href="ExtFldset.xsl"/>

    <xsl:template match="PART">
        
        <xsl:variable name="partWidth" select="@WIDTH"/>
        <div>
            <xsl:call-template name="parDivHandler">
                <xsl:with-param name="partWidth" select="$partWidth"/>
            </xsl:call-template>
            <xsl:choose>
            
                <!-- Partition level Field Set!-->
                <xsl:when test="FSREQ = 'Y'">
                    <fieldset class="FSTstd">
                        <legend>
                            <xsl:value-of select="LBL"/>
                        </legend>
                        
                        <!-- partition without sub partition !-->
                        <xsl:if test="count(./SPRTCNT) = 0 or ./SPRTCNT = '0'">
                            <xsl:apply-templates select="FLDSET">
                                <xsl:with-param name="sprtReqd" select="'N'"/>
                                <xsl:with-param name="subpartCount" select="'0'"/>
                                <xsl:sort select="./@INDEX" data-type="number" order="ascending"/>
                            </xsl:apply-templates>
                        </xsl:if>
                        
                        <!-- partition with sub partition !-->
                        <xsl:if test="count(./SPRTCNT) &gt; 0 and ./SPRTCNT != '0'">
                            <xsl:apply-templates select="FLDSET">
                                <xsl:with-param name="sprtReqd" select="'Y'"/>
                                <xsl:with-param name="subpartCount" select="./SPRTCNT"/>
                                <xsl:sort select="./@INDEX" data-type="number" order="ascending"/>
                            </xsl:apply-templates>
                        </xsl:if>
                    </fieldset>
                </xsl:when>
                <xsl:otherwise>
                    
                    <xsl:if test="count(./SPRTCNT) = 0 or ./SPRTCNT = '0'">
                        <xsl:apply-templates select="FLDSET">
                            <xsl:with-param name="sprtReqd" select="'N'"/>
                            <xsl:with-param name="subpartCount" select="'0'"/>
                            <xsl:sort select="./@INDEX" data-type="number" order="ascending"/>
                        </xsl:apply-templates>
                    </xsl:if>
                    <xsl:if test="count(./SPRTCNT) &gt; 0 and ./SPRTCNT != '0'">
                        <xsl:apply-templates select="FLDSET">
                            <xsl:with-param name="sprtReqd" select="'Y'"/>
                            <xsl:with-param name="subpartCount" select="./SPRTCNT"/>
                            <xsl:sort select="./@INDEX" data-type="number" order="ascending"/>
                        </xsl:apply-templates>
                    </xsl:if>
                    
                </xsl:otherwise>
            </xsl:choose>
        </div>
    </xsl:template>
    
    <!--Partition handler for footer !-->
    <xsl:template match="PART" mode="footer">
        <xsl:if test="count(./SPRTCNT) &gt; 0 and ./SPRTCNT != '0'">
            <!--<td>-->
                <xsl:apply-templates select="FLDSET" mode="footer"/>
            <!--</td>-->
        </xsl:if>
        <xsl:if test="count(./SPRTCNT) = 0 or ./SPRTCNT = '0'">
            <xsl:if test="@WIDTH != '66'">
                <!--<td valign="top">-->
                    <xsl:apply-templates select="FLDSET" mode="footer"/>
                <!--</td>-->
            </xsl:if>
            <xsl:if test="@WIDTH = '66'">
                <!--<td valign="top" colspan="2">-->
                    <xsl:apply-templates select="FLDSET" mode="footer"/>
                <!--</td>-->
            </xsl:if>
        </xsl:if>
    </xsl:template>
    
    <!-- Choosing Partition Div CSS class!-->
    <xsl:template name="parDivHandler">
        <xsl:param name="partWidth" select="."/>
        <xsl:choose>
            <xsl:when test="$partWidth = '100' and $l_scr_type='L'">
                <xsl:attribute name="class">
                    <xsl:value-of select="'DIVColumnTripple'"/>
                </xsl:attribute>
            </xsl:when>
            <xsl:when test="$partWidth = '100' and $l_scr_type!='L'">
                <xsl:attribute name="class">
                    <xsl:value-of select="'DIVColumnDouble'"/>
                </xsl:attribute>
            </xsl:when>
            <xsl:when test="$partWidth = '66'">
                <xsl:attribute name="class">
                    <xsl:value-of select="'DIVColumnDouble'"/>
                </xsl:attribute>
            </xsl:when>
            <xsl:otherwise>
                <xsl:attribute name="class">
                    <xsl:value-of select="'DIVColumnOne'"/>
                </xsl:attribute>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
   
</xsl:stylesheet>
