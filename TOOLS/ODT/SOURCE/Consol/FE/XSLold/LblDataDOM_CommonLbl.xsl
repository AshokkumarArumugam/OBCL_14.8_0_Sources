<?xml version ="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:str="http://www.w3.org/1999/XSL/Transform"
                xml:space="default">
  <xsl:output method="xml" indent="yes" cdata-section-elements="COMMONS"/>
  <xsl:param name="Language"/>
  <xsl:variable name = "EngorOther">
      <xsl:value-of select = 'TXT_LABELVALUE'/>
  </xsl:variable>
  
  <xsl:template match="/LABELS_MAIN">
    <LABELS LANG="{TXT_LANGUAGE}">
      <xsl:apply-templates select="COMMONS"/>
    </LABELS>
  </xsl:template>
  <xsl:template match="COMMONS">
    <xsl:variable name="CommonLabel">
      <xsl:call-template name="str:to-lower">
        <xsl:with-param name="text">
          <xsl:value-of select="./TXT_LABELID"/>
        </xsl:with-param>
      </xsl:call-template>
    </xsl:variable>
    <COMMONS ID="{@ID}" LABELID="{$CommonLabel}">
      <xsl:value-of select="TXT_LABELVALUE"/>
    </COMMONS>
  </xsl:template>


  <!-- Template to convert to lower case -->
  <xsl:template name="str:to-lower">
    <xsl:param name="text"/>
    <xsl:variable name="lcletters">abcdefghijklmnopqrstuvwxyz</xsl:variable>
    <xsl:variable name="ucletters">ABCDEFGHIJKLMNOPQRSTUVWXYZ</xsl:variable>
    <xsl:value-of select="translate($text, $ucletters, $lcletters)"/>
  </xsl:template>
     <!-- Template to convert to upper case -->
     <xsl:template name="str:to-upper">
            <xsl:param name="text"/>
            <xsl:variable name="lcletters">abcdefghijklmnopqrstuvwxyz </xsl:variable>
            <xsl:variable name="ucletters">ABCDEFGHIJKLMNOPQRSTUVWXYZ</xsl:variable>
            <xsl:value-of select="translate($text,  $lcletters , $ucletters)"/>
     </xsl:template>
  
</xsl:stylesheet>
