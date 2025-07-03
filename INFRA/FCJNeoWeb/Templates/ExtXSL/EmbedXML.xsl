<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="*">
 <xsl:copy>
 <xsl:copy-of select="@*"/>
  <xsl:apply-templates/>
 </xsl:copy>
</xsl:template>
<xsl:template match="EMBED_BLOCK">
    <xsl:copy-of select="document(self::node())"/>
</xsl:template>
</xsl:stylesheet>
