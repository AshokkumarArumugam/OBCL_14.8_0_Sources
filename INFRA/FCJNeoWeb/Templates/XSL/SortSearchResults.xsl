<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html"/>
  <xsl:template match="/">
          <xsl:for-each select="SUMMARY/HELPDEFN">
            <xsl:sort select="SEARCHRANK" data-type='number' order="descending"/>
            <HELPDEFN ID="{@ID}">
              <SEARCHSTRING HREF="GlobalAuditEntry.xml"><xsl:value-of select="SEARCHSTRING" /></SEARCHSTRING>
              <SEARCHXML><xsl:value-of select="SEARCHXML" /></SEARCHXML>
              <SEARCHRANK><xsl:value-of select="SEARCHRANK" /></SEARCHRANK>
            </HELPDEFN>
          </xsl:for-each>
  </xsl:template>

</xsl:stylesheet>
