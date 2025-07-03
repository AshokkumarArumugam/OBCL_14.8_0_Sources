<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
        <!-- Processing Audit Fields-->
        
    <xsl:template name="auditEntryHandler">
        <xsl:param name="footerId" select="."/>
        <THEAD id="auditHead">
            <TR>
                <xsl:apply-templates select="/FORM/BLOCK[@SCREEN=$screen]/FIELD[@TABPAGE=$footerId and @SECTION=$secId]/FIELD" mode="AuditLabels"/>
            </TR>
        </THEAD>
        <TBODY id="auditBody">
            <TR>
                <xsl:apply-templates select="/FORM/BLOCK[@SCREEN=$screen]/FIELD[@TABPAGE=$footerId and @SECTION=$secId]/FIELD" mode="AuditValues"/>
            </TR>
        </TBODY>
    </xsl:template>

    <!-- Processing non audit fields in footer-->
    
    <xsl:template name="footerEntryHandler">
        <xsl:param name="secId" select="."/>
        <xsl:param name="footerId" select="."/>
        <xsl:param name="parId" select="SECTION[@ID=$secId]/PARTITION[@ID]"/>
        <THEAD id="nonAuditHead">
            <TR>
                <xsl:apply-templates select="/FORM/BLOCK[@SCREEN=$screen]/FIELD[@TABPAGE=$footerId and @SECTION=$secId]/FIELD" mode="nonAuditLabels"/>
            </TR>
        </THEAD>
        <TBODY id="nonAuditBody">
            <TR>
                <xsl:apply-templates select="/FORM/BLOCK[@SCREEN=$screen]/FIELD[@TABPAGE=$footerId and @SECTION=$secId]/FIELD" mode="nonAuditValues"/>
            </TR>
        </TBODY>
    </xsl:template>
</xsl:stylesheet>

