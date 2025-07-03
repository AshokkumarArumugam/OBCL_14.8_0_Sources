<?xml version='1.0' encoding='windows-1252'?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
   <!-- Root template -->
   <xsl:template match="/">
        <xsl:apply-templates select="RAD_FUNCTIONS"/>
   </xsl:template>
   <xsl:template match="RAD_FUNCTIONS">
        <UIDEV>
            <xsl:attribute name="FUNCTIONID"><xsl:value-of select="FUNCTION_ID"/></xsl:attribute>
            <xsl:attribute name="XMLPATH"><xsl:value-of select="FILES_PATH"/></xsl:attribute>
            <xsl:attribute name="SCRIPTPATH"><xsl:value-of select="FILES_PATH"/></xsl:attribute>
            <xsl:attribute name="JAVAPATH"><xsl:value-of select="FILES_PATH"/></xsl:attribute>
            <xsl:attribute name="SUMMARY">
                <xsl:if test="SUMMARY_REQD = 'Y'">
                    <xsl:text>-1</xsl:text>
                </xsl:if>
                <xsl:if test="SUMMARY_REQD = 'N'">
                    <xsl:text>0</xsl:text>
                </xsl:if>
            </xsl:attribute>
            <xsl:attribute name="AUDIT">
                <xsl:if test="AUDIT_BLK_REQD = 'Y'">
                    <xsl:text>-1</xsl:text>
                </xsl:if>
                <xsl:if test="AUDIT_BLK_REQD = 'N'">
                    <xsl:text>0</xsl:text>
                </xsl:if>
            </xsl:attribute>
            <xsl:attribute name="SCREEN_TYPE">
                <xsl:if test="SCREEN_TYPE = 'TRANSACTION'">
                    <xsl:text>T</xsl:text>
                </xsl:if>
                <xsl:if test="SCREEN_TYPE = 'MAINTENANCE'">
                    <xsl:text>M</xsl:text>
                </xsl:if>
            </xsl:attribute>
            <xsl:attribute name="UIXML_SAVED"><xsl:text>Y</xsl:text></xsl:attribute>
            <xsl:attribute name="LASTFLDSEQ"><xsl:value-of select="@LASTFLD_ID"/></xsl:attribute>
            <xsl:attribute name="DEFAULT_MODE"><xsl:text>N</xsl:text></xsl:attribute>
            <xsl:attribute name="VERSION"><xsl:text>2.0c</xsl:text></xsl:attribute>
            <xsl:apply-templates select="RAD_DATASOURCES"/>
            <xsl:apply-templates select="RAD_LOVS"/>
        </UIDEV>
   </xsl:template>
   <xsl:template match="RAD_DATASOURCES">
        <DATABLOCK>
            <xsl:attribute name="DATASRC"><xsl:value-of select="DATASRC_NAME"/></xsl:attribute>
            <xsl:attribute name="PARENT"><xsl:value-of select="PARENT_DATASRC"/></xsl:attribute>
            <xsl:attribute name="RELATION"><xsl:value-of select="RELATION_WITH_PARENT"/></xsl:attribute>
            <xsl:attribute name="MAPPING">
                <xsl:text>1:</xsl:text><xsl:value-of select="RELATION_TYPE"/>
            </xsl:attribute>
            <xsl:attribute name="ISQUERY">
                <xsl:if test="IS_QUERYSRC = 'N' ">
                    <xsl:text>0</xsl:text>
                </xsl:if>
                <xsl:if test="IS_QUERYSRC = 'Y' ">
                    <xsl:text>-1</xsl:text>
                </xsl:if>
            </xsl:attribute>
            <xsl:apply-templates select="RAD_FIELDS"/>
        </DATABLOCK>
   </xsl:template>
   <xsl:template match="RAD_FIELDS">
     <FIELD>
			<NAME><xsl:value-of select="FIELD_NAME"/></NAME>
			<ID><xsl:value-of select="@Identifier"/></ID>
			<TYPE><xsl:value-of select="FIELD_TYPE"/></TYPE>
			<DTYPE><xsl:value-of select="DATATYPE"/></DTYPE>
			<LABEL><xsl:value-of select="LABEL_CODE"/></LABEL>
			<REQUIRED><xsl:value-of select="REQUIRED"/></REQUIRED>
      <POPEDIT_REQUIRED><xsl:value-of select="POPEDIT_REQUIRED"/></POPEDIT_REQUIRED>
			<MULTIPLE>
        <xsl:if test="SELECT_MULTIPLE = 'Y'">
            <xsl:text>-1</xsl:text>
        </xsl:if>
        <xsl:if test="SELECT_MULTIPLE = 'N'">
            <xsl:text>0</xsl:text>
        </xsl:if>
      </MULTIPLE>
			<DATASRC><xsl:value-of select="DATASOURCE"/></DATASRC>
			<DATAFLD><xsl:value-of select="DATAFIELD"/></DATAFLD>
			<MAXLENGTH><xsl:value-of select="MAX_LENGTH"/></MAXLENGTH>
			<AUTHSCRN><xsl:value-of select="AUTH_SCREEN"/></AUTHSCRN>
      <xsl:if test="count(LOV_NAME[text()!='']) > 0">
        <FIELD_LOV>
          <NAME><xsl:value-of select="LOV_NAME"/></NAME>
          <RET_FLDS><xsl:value-of select="RAD_FIELD_LOV_OVERRIDES/RETURN_FIELDS"/></RET_FLDS>
          <FORM_NAME><xsl:value-of select="RAD_FIELD_LOV_OVERRIDES/FORM_NAME"/></FORM_NAME>
          <TITLE><xsl:value-of select="RAD_FIELD_LOV_OVERRIDES/TITLE"/></TITLE>
          <COL_HEADING><xsl:value-of select="RAD_FIELD_LOV_OVERRIDES/COL_HEADING"/></COL_HEADING>
          <REDUCTION_FLD_LABELS><xsl:value-of select="RAD_FIELD_LOV_OVERRIDES/REDC_FLD_LABELS"/></REDUCTION_FLD_LABELS>
        </FIELD_LOV>
      </xsl:if>
      <IS_QUERY>
          <xsl:if test="SUMMARY_QUERY = 'Y'">
              <xsl:text>-1</xsl:text>
          </xsl:if>
          <xsl:if test="SUMMARY_QUERY = 'N'">
              <xsl:text>0</xsl:text>
          </xsl:if>
      </IS_QUERY>
      <IS_RESULT>
          <xsl:if test="SUMMARY_RESULT = 'Y'">
              <xsl:text>-1</xsl:text>
          </xsl:if>
          <xsl:if test="SUMMARY_RESULT = 'N'">
              <xsl:text>0</xsl:text>
          </xsl:if>
      </IS_RESULT>
      <IS_ADVNCD>
          <xsl:if test="SUMMARY_ADVANCED = 'Y'">
              <xsl:text>-1</xsl:text>
          </xsl:if>
          <xsl:if test="SUMMARY_ADVANCED = 'N'">
              <xsl:text>0</xsl:text>
          </xsl:if>
      </IS_ADVNCD>
      <xsl:if test="count(RAD_FIELD_CUSTOM_ATTRS) > 0">
        <CUSTOM>
          <xsl:apply-templates select="RAD_FIELD_CUSTOM_ATTRS"/>
        </CUSTOM>
      </xsl:if>
      <xsl:apply-templates select="RAD_FIELD_EVENTS"/>
      <xsl:apply-templates select="RAD_FIELD_OPTIONS"/>
      <xsl:apply-templates select="RAD_FIELD_POPUPEDITS"/>
     </FIELD>
   </xsl:template>

  <xsl:template match="RAD_FIELD_POPUPEDITS">
    <POPUPEDIT>
      <TITLE>
        <xsl:value-of select="POPUP_TITLE"/>
      </TITLE>
      <OK_IMG_SRC>
        <xsl:value-of select="OK_IMG_SRC"/>
      </OK_IMG_SRC>
      <CANCEL_IMG_SRC>
        <xsl:value-of select="CANCEL_IMG_SRC"/>
      </CANCEL_IMG_SRC>
    </POPUPEDIT>
  </xsl:template>

   <xsl:template match="RAD_FIELD_OPTIONS">
        <OPTION>
            <xsl:attribute name="SELECTED">
                <xsl:if test="SELECTED = 'Y'">
                    <xsl:text>-1</xsl:text>
                </xsl:if>
                <xsl:if test="SELECTED = 'N'">
                    <xsl:text>0</xsl:text>
                </xsl:if>
            </xsl:attribute>
            <xsl:attribute name="VALUE">
                <xsl:value-of select="OPTION_VALUE"/>
            </xsl:attribute>
            <xsl:value-of select="OPTION_LBL_CODE"/>
        </OPTION>
   </xsl:template>

   <xsl:template match="RAD_FIELD_CUSTOM_ATTRS">
    <xsl:variable name="attrName" select="ATTR_NAME"/>
    <xsl:element name="{$attrName}">
      <xsl:value-of select="ATTR_VALUE"/>
    </xsl:element>
   </xsl:template>

   <xsl:template match="RAD_FIELD_EVENTS">
    <EVENT>
      <NAME><xsl:value-of select="EVENT_NAME"/></NAME>
      <FUNCTION><xsl:value-of select="FUNCTION_NAME"/></FUNCTION>
    </EVENT>
   </xsl:template>

   <xsl:template match="RAD_LOVS">
        <LOV>
            <xsl:attribute name="LOV_NAME">
                <xsl:value-of select="LOV_NAME"/>
            </xsl:attribute>
            <xsl:attribute name="FORM_NAME">
                <xsl:value-of select="FORM_NAME"/>
            </xsl:attribute>
            <xsl:attribute name="TITLE">
                <xsl:value-of select="FORM_TITLE"/>
            </xsl:attribute>
            <xsl:attribute name="FETCH_ROWS">
                <xsl:value-of select="FETCH_ROWS"/>
            </xsl:attribute>
            <xsl:attribute name="DATAPAGESIZE">
                <xsl:value-of select="DATA_PG_SIZE"/>
            </xsl:attribute>
            <xsl:attribute name="DB_TYPE">
                <xsl:text>ORACLE</xsl:text>
            </xsl:attribute>
            <xsl:attribute name="QUERY">
                <xsl:value-of select="LOV_QUERY"/>
            </xsl:attribute>
            <xsl:attribute name="BIND_VARS">
                <xsl:value-of select="BIND_VARS"/>
            </xsl:attribute>
            <xsl:attribute name="REDUCTION_FLDS">
                <xsl:value-of select="REDUCTION_FLDS"/>
            </xsl:attribute>
            <xsl:attribute name="REDUCTION_FLD_LABELS">
                <xsl:value-of select="REDUCTION_FLD_LABELS"/>
            </xsl:attribute>
            <xsl:attribute name="DATA_TYPES">
                <xsl:value-of select="DATA_TYPES"/>
            </xsl:attribute>
            <xsl:attribute name="RET_FLDS">
                <xsl:value-of select="RET_FLDS"/>
            </xsl:attribute>
         </LOV>
   </xsl:template>
</xsl:stylesheet>
