<?xml version='1.0' encoding='windows-1252'?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <!-- Root template -->
    <xsl:template match="/">
        <xsl:apply-templates select="//UIDEV"/>
    </xsl:template>
    <xsl:template match="UIDEV">
        <RAD_FUNCTIONS>
            <xsl:attribute name="ID">
                <xsl:value-of select="position()"/>
            </xsl:attribute>
            <FUNCTION_ID>
                <xsl:value-of select="@FUNCTIONID"/>
            </FUNCTION_ID>
            <FILES_PATH>
                <xsl:value-of select="@XMLPATH"/>
            </FILES_PATH>
            <SUMMARY_REQD>
                <xsl:if test="@SUMMARY = 0">
                    <xsl:text>N</xsl:text>
                </xsl:if>
                <xsl:if test="@SUMMARY = -1">
                    <xsl:text>Y</xsl:text>
                </xsl:if>
            </SUMMARY_REQD>
            <AUDIT_BLK_REQD>
                <xsl:if test="@AUDIT = 0">
                    <xsl:text>N</xsl:text>
                </xsl:if>
                <xsl:if test="@AUDIT = -1">
                    <xsl:text>Y</xsl:text>
                </xsl:if>
            </AUDIT_BLK_REQD>
            <SCREEN_TYPE>
                <xsl:if test="@SCREEN_TYPE = 'M'">
                    <xsl:text>MAINTENANCE</xsl:text>
                </xsl:if>
                <xsl:if test="@SCREEN_TYPE != 'M'">
                    <xsl:text>TRANSACTION</xsl:text>
                </xsl:if>
            </SCREEN_TYPE>
            <xsl:apply-templates select="//LOV"/>
            <xsl:apply-templates select="//DATABLOCK"/>
        </RAD_FUNCTIONS>
    </xsl:template>
    
    <xsl:template match="LOV">
        <RAD_LOVS TYPE="MULTIPLE">
            <xsl:attribute name="ID">
                <xsl:value-of select="position()"/>
            </xsl:attribute>
            <LOV_NAME><xsl:value-of select="@LOV_NAME"/></LOV_NAME>
            <FORM_NAME><xsl:value-of select="@FORM_NAME"/></FORM_NAME>
            <FORM_TITLE><xsl:value-of select="@TITLE"/></FORM_TITLE>
            <FETCH_ROWS><xsl:value-of select="@FETCH_ROWS"/></FETCH_ROWS>
            <DATA_PG_SIZE><xsl:value-of select="@DATAPAGESIZE"/></DATA_PG_SIZE>
            <LOV_QUERY><xsl:value-of select="@QUERY"/></LOV_QUERY>
            <REDUCTION_FLDS><xsl:value-of select="@REDUCTION_FLDS"/></REDUCTION_FLDS>
            <REDUCTION_FLD_LABELS><xsl:value-of select="@REDUCTION_FLD_LABELS"/></REDUCTION_FLD_LABELS>
            <DATA_TYPES><xsl:value-of select="@DATA_TYPES"/></DATA_TYPES>
            <RET_FLDS><xsl:value-of select="@RET_FLDS"/></RET_FLDS>
            <COL_HEADING><xsl:value-of select="@COL_HEADING"/></COL_HEADING>
            <BIND_VARS><xsl:value-of select="@BIND_VARS"/></BIND_VARS>
            <!-- LOV details are added thru' code -->
        </RAD_LOVS>
    </xsl:template>
    
    <xsl:template match="DATABLOCK">
        <RAD_DATASOURCES Type="MULTIPLE">
            <xsl:attribute name="ID">
                <xsl:value-of select="position()"/>
            </xsl:attribute>
            <DATASRC_NAME>
                <xsl:value-of select="@DATASRC"/>
            </DATASRC_NAME>
            <PARENT_DATASRC>
                <xsl:value-of select="@PARENT"/>
            </PARENT_DATASRC>
            <RELATION_WITH_PARENT>
                <xsl:value-of select="@RELATION"/>
            </RELATION_WITH_PARENT>
            <RELATION_TYPE>
                <xsl:value-of select="substring(@MAPPING,3)"/>
            </RELATION_TYPE>
            <IS_QUERYSRC>
                <xsl:if test="@ISQUERY = 0">
                    <xsl:text>N</xsl:text>
                </xsl:if>
                <xsl:if test="@ISQUERY = -1">
                    <xsl:text>Y</xsl:text>
                </xsl:if>
            </IS_QUERYSRC>
            <xsl:apply-templates select="./FIELD"/>
        </RAD_DATASOURCES>
    </xsl:template>

    <xsl:template match="EVENT">
        <RAD_FIELD_EVENTS Type="MULTIPLE">
            <xsl:attribute name="ID">
                <xsl:value-of select="position()"/>
            </xsl:attribute>
            <EVENT_NAME><xsl:value-of select="NAME"/></EVENT_NAME>
            <FUNCTION_NAME><xsl:value-of select="FUNCTION"/></FUNCTION_NAME>
        </RAD_FIELD_EVENTS>
    </xsl:template>

    <xsl:template match="FIELD">
        <RAD_FIELDS>
            <xsl:attribute name="ID">
                <xsl:value-of select="position()"/>
            </xsl:attribute>
            <xsl:attribute name="Type">
                <xsl:text>MULTIPLE</xsl:text>
            </xsl:attribute>
            <!-- <xsl:attribute name="ID">
                <xsl:value-of select="ID"/>
            </xsl:attribute> -->
            <xsl:attribute name="Identifier">
                <xsl:value-of select="ID"/>
            </xsl:attribute>
            <FIELD_NAME>
                <xsl:value-of select="NAME"/>
            </FIELD_NAME>
            <FIELD_TYPE>
                <xsl:value-of select="TYPE"/>
            </FIELD_TYPE>
            <ACCESSKEY_CODE>
            </ACCESSKEY_CODE>
            <LABEL_CODE>
                <xsl:value-of select="LABEL"/>
            </LABEL_CODE>
            <IMAGE_SRC>
            </IMAGE_SRC>
            <REQUIRED><xsl:value-of select="REQUIRED"/></REQUIRED>
            <SELECT_MULTIPLE><xsl:value-of select="MULTIPLE"/></SELECT_MULTIPLE>
            <DATASOURCE>
                <xsl:value-of select="DATASRC"/>
            </DATASOURCE>
            <DATAFIELD>
                <xsl:value-of select="DATAFLD"/>
            </DATAFIELD>
            <MAX_LENGTH>
                <xsl:value-of select="MAXLENGTH"/>
            </MAX_LENGTH>
            <AUTH_SCREEN>
                <xsl:value-of select="AUTHSCRN"/>
            </AUTH_SCREEN>
            <VALUE>
                <xsl:value-of select="VALUE"/>
            </VALUE>
            <MASK>
            </MASK>
            <DEFAULT_VALUE>
            </DEFAULT_VALUE>
            <RELATED_FIELD>
            </RELATED_FIELD>
            <COL_HEADING>
            </COL_HEADING>
            <!--<LOV_NAME>
            </LOV_NAME> -->
            <POPEDIT_REQUIRED>
            </POPEDIT_REQUIRED>
            <ALT_IMAGE>
            </ALT_IMAGE>
            <DATATYPE>
            </DATATYPE>
            <FUNCTION_ID>
            </FUNCTION_ID>
            <DATASRC_NAME>
            </DATASRC_NAME>
            <FIELD_ID>
            </FIELD_ID>
            <SUMMARY_QUERY>
                <xsl:if test="IS_QUERY=-1">
                    <xsl:text>Y</xsl:text>
                </xsl:if>
                <xsl:if test="IS_QUERY!=-1">
                    <xsl:text>N</xsl:text>
                </xsl:if>
            </SUMMARY_QUERY>
            <SUMMARY_RESULT>
                <xsl:if test="IS_RESULT=-1">
                    <xsl:text>Y</xsl:text>
                </xsl:if>
                <xsl:if test="IS_RESULT!=-1">
                    <xsl:text>N</xsl:text>
                </xsl:if>
            </SUMMARY_RESULT>
            <SUMMARY_ADVANCED>
                <xsl:if test="IS_ADVNCD=-1">
                    <xsl:text>Y</xsl:text>
                </xsl:if>
                <xsl:if test="IS_ADVNCD!=-1">
                    <xsl:text>N</xsl:text>
                </xsl:if>
            </SUMMARY_ADVANCED>
            <xsl:apply-templates select="EVENT"/>
            <xsl:apply-templates select="FIELD_LOV" mode="fromField"/>
            <xsl:apply-templates select="OPTION"/>
            <xsl:apply-templates select="CUSTOM"/>
            <POPEDIT_REQUIRED><xsl:value-of select="POPEDIT_REQUIRED"/></POPEDIT_REQUIRED>
            <xsl:apply-templates select="POPUPEDIT"/>
        </RAD_FIELDS>
    </xsl:template>

  <xsl:template match="POPUPEDIT">
    <RAD_FIELD_POPUPEDITS ID="1" Type="SINGLE">
      <POPUP_TITLE><xsl:value-of select="TITLE"/></POPUP_TITLE>
      <OK_IMG_SRC><xsl:value-of select="OK_IMG_SRC"/></OK_IMG_SRC>
      <CANCEL_IMG_SRC><xsl:value-of select="CANCEL_IMG_SRC"/></CANCEL_IMG_SRC>    
      <OK_LABEL/>
      <CANCEL_LABEL/>
    </RAD_FIELD_POPUPEDITS>
  </xsl:template>

    <xsl:template match="CUSTOM">
      <xsl:for-each select="./*">
        <RAD_FIELD_CUSTOM_ATTRS Type="MULTIPLE">
          <xsl:attribute name="ID"><xsl:value-of select="position()"/></xsl:attribute>
          <ATTR_NAME><xsl:value-of select="name()"/></ATTR_NAME>
          <ATTR_VALUE><xsl:value-of select="."/></ATTR_VALUE>
        </RAD_FIELD_CUSTOM_ATTRS>
      </xsl:for-each>
    </xsl:template>

    <xsl:template match="OPTION">
        <RAD_FIELD_OPTIONS Type="MULTIPLE">
            <xsl:attribute name="ID">
                <xsl:value-of select="position()"/>
            </xsl:attribute>
            <OPTION_LBL_CODE>
                <xsl:value-of select="."/>
            </OPTION_LBL_CODE>
            <OPTION_VALUE>
                <xsl:value-of select="@VALUE"/>
            </OPTION_VALUE>
            <SELECTED>
                <xsl:if test="@SELECTED = 0">
                    <xsl:text>N</xsl:text>
                </xsl:if>
                <xsl:if test="@SELECTED = -1">
                    <xsl:text>Y</xsl:text>
                </xsl:if>
            </SELECTED>
        </RAD_FIELD_OPTIONS>
    </xsl:template>
    
    <xsl:template match="FIELD_LOV" mode="fromField">
        <LOV_NAME><xsl:value-of select="NAME"/></LOV_NAME>
    </xsl:template>
    <xsl:template match="FIELD_LOV" mode="fromBlock">
        <LOV_NAME><xsl:value-of select="NAME"/></LOV_NAME>
    </xsl:template>
</xsl:stylesheet>
