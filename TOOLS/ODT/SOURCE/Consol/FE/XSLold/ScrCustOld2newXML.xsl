<?xml version='1.0' encoding='windows-1252'?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="xml"/>
    <!-- Root template -->
    <xsl:template match="/">
      <RAD_FUNCTIONS>
        <xsl:attribute name="ID">
            <xsl:value-of select="position()"/>
        </xsl:attribute>
        <xsl:apply-templates select="//FORM"/>
      </RAD_FUNCTIONS>
    </xsl:template>

    <xsl:template match="FORM">
      <!-- './' used below as more than one SUMMARY element may be present -->
      <xsl:apply-templates select="./SUMMARY"/>
      <xsl:apply-templates select="//SCREEN[@NAME != 'SUMMARY']"/>
      <xsl:if test="count(//BLOCK[@SCREEN='SUMMARY'])>0">
          <xsl:call-template name="SUMMARY_SCREEN"/> 
      </xsl:if>
    </xsl:template>

    <xsl:template name="SUMMARY_SCREEN">
        <RAD_SCREENS Type="MULTIPLE">
            <!-- below count used as summary is not a screen in old xml -->
            <xsl:attribute name="ID">
                <xsl:value-of select="count(//SCREEN[@NAME != 'SUMMARY'])+1"/>
            </xsl:attribute>
            <SCREEN_NAME>
                <xsl:text>SUMMARY</xsl:text>
            </SCREEN_NAME>
            <SCREEN_TITLE>
                <xsl:value-of select="@TITLE"/>
            </SCREEN_TITLE>
            <SCREEN_HEIGHT>
                <xsl:value-of select="@HEIGHT"/>
            </SCREEN_HEIGHT>
            <SCREEN_WIDTH>
                <xsl:value-of select="@WIDTH"/>
            </SCREEN_WIDTH>
            <SCREEN_POSITION>
                <xsl:value-of select="@POSITION"/>
            </SCREEN_POSITION>
            <xsl:apply-templates select="//BLOCK[@SCREEN='SUMMARY']"/>
        </RAD_SCREENS>
    </xsl:template>
    
    <xsl:template match="SUMMARY">
        <RAD_SUMMARY>
            <xsl:attribute name="ID"><xsl:value-of select="position()"/></xsl:attribute>
            <TITLE><xsl:value-of select="@TITLE"/></TITLE>
            <WIDTH>
              <xsl:value-of select="WIDTH"/>
              <xsl:if test="not(contains(WIDTH,'px'))">
                <xsl:text>px</xsl:text>
              </xsl:if>
            </WIDTH>
            <HEIGHT>
              <xsl:value-of select="HEIGHT"/>
              <xsl:if test="not(contains(HEIGHT,'px'))">
                <xsl:text>px</xsl:text>
              </xsl:if>
            </HEIGHT>
            <QRY_ACCESSKEY><xsl:value-of select="QUERY/ACCESSKEY"/></QRY_ACCESSKEY>
            <QRY_LABEL><xsl:value-of select="QUERY/LABEL"/></QRY_LABEL>
            <QRY_NUMROWS><xsl:value-of select="QUERY/NUM_ROWS"/></QRY_NUMROWS>
            <QRY_HEIGHT><xsl:value-of select="QUERY/HEIGHT"/></QRY_HEIGHT>
            <QRY_AUDIT>
                <xsl:if test="QUERY/AUDIT = 0">
                    <xsl:text>N</xsl:text>
                </xsl:if>
                <xsl:if test="QUERY/AUDIT = -1">
                    <xsl:text>Y</xsl:text>
                </xsl:if>
            </QRY_AUDIT>
            <RSLT_ACCESSKEY><xsl:value-of select="RESULT/ACCESSKEY"/></RSLT_ACCESSKEY>
            <RSLT_LABEL><xsl:value-of select="RESULT/LABEL"/></RSLT_LABEL>
            <RSLT_HEIGHT><xsl:value-of select="RESULT/HEIGHT"/></RSLT_HEIGHT>
            <RSLT_DATAPGSIZE><xsl:value-of select="RESULT/DATAPAGESIZE"/></RSLT_DATAPGSIZE>
            <RSLT_DATASRC><xsl:value-of select="RESULT/DBT"/></RSLT_DATASRC>
            <RSLT_AUDIT>
                <xsl:if test="RESULT/AUDIT = 0">
                    <xsl:text>N</xsl:text>
                </xsl:if>
                <xsl:if test="RESULT/AUDIT = -1">
                    <xsl:text>Y</xsl:text>
                </xsl:if>
            </RSLT_AUDIT>
            <ADVCD_ACCESSKEY><xsl:value-of select="ADVANCED/ACCESSKEY"/></ADVCD_ACCESSKEY>
            <ADVCD_LABEL><xsl:value-of select="ADVANCED/LABEL"/></ADVCD_LABEL>
            <ADVCD_HEIGHT><xsl:value-of select="ADVANCED/HEIGHT"/></ADVCD_HEIGHT>
            <ADVCD_DATASRC><xsl:value-of select="ADVANCED/DBT"/></ADVCD_DATASRC>
            <ADVCD_AUDIT>
                <xsl:if test="ADVANCED/AUDIT = 0">
                    <xsl:text>N</xsl:text>
                </xsl:if>
                <xsl:if test="ADVANCED/AUDIT = -1">
                    <xsl:text>Y</xsl:text>
                </xsl:if>
            </ADVCD_AUDIT>
        </RAD_SUMMARY>
    </xsl:template>
    
    <xsl:template match="SCREEN">
        <xsl:variable name="screenName" select="@NAME"/>
        <RAD_SCREENS Type="MULTIPLE">
            <xsl:attribute name="ID">
                <xsl:value-of select="position()"/>
            </xsl:attribute>
            <SCREEN_NAME>
                <xsl:value-of select="@NAME"/>
            </SCREEN_NAME>
            <SCREEN_TITLE>
                <xsl:value-of select="@TITLE"/>
            </SCREEN_TITLE>
            <SCREEN_HEIGHT>
                <xsl:value-of select="@HEIGHT"/>
            </SCREEN_HEIGHT>
            <SCREEN_WIDTH>
                <xsl:value-of select="@WIDTH"/>
            </SCREEN_WIDTH>
            <SCREEN_POSITION>
                <xsl:value-of select="@POSITION"/>
            </SCREEN_POSITION>
            <xsl:apply-templates select="TAB">
                <xsl:with-param name="scrName"><xsl:value-of select="$screenName"/></xsl:with-param>
            </xsl:apply-templates>
            <xsl:apply-templates select="HEADER">
               <xsl:with-param name="scrName"><xsl:value-of select="$screenName"/></xsl:with-param>
            </xsl:apply-templates>
            <xsl:apply-templates select="//BLOCK[@SCREEN=$screenName]"/>
        </RAD_SCREENS>
    </xsl:template>
    
    <xsl:template match="HEADER">
      <xsl:param name="scrName" select="."/>
      <xsl:apply-templates select="PAGE">
          <xsl:with-param name="scrName" select="$scrName"/>
      </xsl:apply-templates>
    </xsl:template>
    
    <xsl:template match="TAB">
      <xsl:param name="scrName" select="."/>
      <xsl:apply-templates select="PAGE">
          <xsl:with-param name="scrName" select="$scrName"/>
      </xsl:apply-templates>
    </xsl:template>
    
    <xsl:template match="PAGE">
        <xsl:param name="scrName" select="."/>
        <RAD_TABS Type="MULTIPLE">
            <xsl:attribute name="ID">
              <xsl:value-of select="position()"/>
            </xsl:attribute>
            <TAB_NAME><xsl:value-of select="@NAME"/></TAB_NAME>
            <SCREEN_NAME><xsl:value-of select="$scrName"/></SCREEN_NAME>
            <TAB_ID><xsl:value-of select="@ID"/></TAB_ID>
            <TAB_TYPE>
                <xsl:if test="@HEIGHT != ''">
                  <xsl:text>HEADER</xsl:text>
                </xsl:if>
                <xsl:if test="count(@HEIGHT) = 0 or @HEIGHT = ''">
                  <xsl:text>NORMAL</xsl:text>
                </xsl:if>
            </TAB_TYPE>
            <TAB_LABEL><xsl:value-of select="LABEL"/></TAB_LABEL>
            <TAB_SRC>
            </TAB_SRC>
            <TAB_ACCESS_KEY>
            </TAB_ACCESS_KEY>
            <TAB_HEIGHT>
                <xsl:value-of select="@HEIGHT"/>
            </TAB_HEIGHT>
        </RAD_TABS>
    </xsl:template>
    
    <xsl:template match="BLOCK">
      <xsl:if test="ID='BLK_AUDIT'">
        <RAD_AUDIT_BLOCK ID="1">
            <BLOCK_ID>
                <xsl:value-of select="ID"/>
            </BLOCK_ID>
            <BLOCK_TITLE>
                <xsl:value-of select="LABEL"/>
            </BLOCK_TITLE>
            <VIEW_TYPE>
                <xsl:value-of select="@VIEW"/>
            </VIEW_TYPE>
            <SCREEN_NAME>
                <xsl:value-of select="@SCREEN"/>
            </SCREEN_NAME>
            <DATASRC_NAME>
                <xsl:value-of select="substring-after(ID,'_')"/>
            </DATASRC_NAME>
            <TAB_NAME>
                <xsl:value-of select="@TABPAGE"/>
            </TAB_NAME>
            <BLK_WIDTH>
                <xsl:value-of select="WIDTH"/>
            </BLK_WIDTH>
            <BLK_HEIGHT>
                <xsl:value-of select="HEIGHT"/>
            </BLK_HEIGHT>
            <BLK_ABSPOS>
                <xsl:value-of select="ABS_POS"/>
            </BLK_ABSPOS>
            <BLK_ROWS>
                <xsl:value-of select="@ROW"/>
            </BLK_ROWS>
            <BLK_COLS>
                <xsl:value-of select="@COL"/>
            </BLK_COLS>
         </RAD_AUDIT_BLOCK>
      </xsl:if>
      <xsl:if test="ID!='BLK_AUDIT'">
        <RAD_DATA_BLOCKS>
            <xsl:attribute name="ID">
                <xsl:value-of select="position()"/>
            </xsl:attribute>
            <xsl:attribute name="TYPE">
                <xsl:text>MULTIPLE</xsl:text>
            </xsl:attribute>
            <BLOCK_ID>
                <xsl:value-of select="ID"/>
            </BLOCK_ID>
            <BLOCK_TITLE>
                <xsl:value-of select="LABEL"/>
            </BLOCK_TITLE>
            <FUNCTION_ID>
              <xsl:value-of select="@TYPE"/>
            </FUNCTION_ID>
            <VIEW_TYPE>
                <xsl:choose>
                  <xsl:when test="count(@VIEW) &gt; 0">
                    <xsl:value-of select="@VIEW"/>
                  </xsl:when>
                  <xsl:otherwise>
                    <xsl:if test="@TYPE = 'Multiple Entry'">
                      <xsl:text>Multiple Entry</xsl:text>
                    </xsl:if>
                  </xsl:otherwise>
                </xsl:choose>
            </VIEW_TYPE>
            <SCREEN_NAME>
                <xsl:value-of select="@SCREEN"/>
            </SCREEN_NAME>
            <DATASRC_NAME>
                <xsl:value-of select="substring-after(ID,'_')"/>
            </DATASRC_NAME>
            <TAB_NAME>
                <xsl:value-of select="@TABPAGE"/>
            </TAB_NAME>
            <HAS_DEFAULT_OK_CANCEL>
                <xsl:if test="OKCANCEL = -1">
                    <xsl:text>Y</xsl:text>
                </xsl:if>
                <xsl:if test="OKCANCEL != -1">
                    <xsl:text>N</xsl:text>
                </xsl:if>
            </HAS_DEFAULT_OK_CANCEL>
            <BLK_WIDTH>
                <xsl:value-of select="WIDTH"/>
            </BLK_WIDTH>
            <BLK_HEIGHT>
                <xsl:value-of select="HEIGHT"/>
            </BLK_HEIGHT>
            <BLK_ABSPOS>
                <xsl:value-of select="ABS_POS"/>
            </BLK_ABSPOS>
            <BLK_ROWS>
                <xsl:value-of select="@ROW"/>
            </BLK_ROWS>
            <BLK_COLS>
                <xsl:value-of select="@COL"/>
            </BLK_COLS>
            <xsl:apply-templates select="./FIELD" mode="MULTIPLE">
                <xsl:with-param name="datasrc" select="DATASRC_NAME"/>
            </xsl:apply-templates>
            <xsl:apply-templates select="./EVENT" mode="block"/>
        </RAD_DATA_BLOCKS>
        </xsl:if>
    </xsl:template>
    <xsl:template match="FIELD" mode="MULTIPLE">
        <RAD_BLK_FIELDS Type="MULTIPLE">
            <xsl:attribute name="ID">
                <xsl:value-of select="position()"/>
            </xsl:attribute>
            <!-- <xsl:attribute name="ID">
                <xsl:value-of select="ID"/>
            </xsl:attribute> -->
            <xsl:attribute name="Identifier">
                <xsl:value-of select="ID"/>
            </xsl:attribute>
            <xsl:attribute name="DATASRC_NAME">
                <xsl:if test="DBT = ''">
                    <xsl:value-of select="./DBT"/>
                </xsl:if>
                <xsl:if test="DBT != ''">
                    <xsl:value-of select="DBT"/>
                </xsl:if>
            </xsl:attribute>
            <FIELD_NAME>
                <xsl:value-of select="NAME"/>
            </FIELD_NAME>
            <FIELD_TYPE>
                <xsl:value-of select="TYPE"/>
            </FIELD_TYPE>
            <RELATED_FIELD>
              <xsl:value-of select="RELATED_FIELD"/>
            </RELATED_FIELD>
            <LABEL_CODE>
                <xsl:variable name="cntLegend" select="count(LEGEND)"/>
                <xsl:if test="$cntLegend > 0">
                  <xsl:value-of select="LEGEND"/>
                </xsl:if>
                <xsl:if test="$cntLegend &lt; 1">
                  <xsl:value-of select="LABEL"/>
                </xsl:if>
            </LABEL_CODE>
            <TAB_NAME>
                <xsl:value-of select="@TABPAGE"/>
            </TAB_NAME>
            <!-- <REQUIRED>0</REQUIRED> -->
            <DBT>
                <xsl:value-of select="DBT"/>
            </DBT>
            <DBC>
                <xsl:value-of select="DBC"/>
            </DBC>
            <MAX_LENGTH>
                <xsl:value-of select="MAXLENGTH"/>
            </MAX_LENGTH>
            <!-- <AUTHSCRN>0</AUTHSCRN> -->
            <READ_ONLY>
                <xsl:if test="READ_ONLY = -1">
                    <xsl:text>Y</xsl:text>
                </xsl:if>
                <xsl:if test="READ_ONLY != -1">
                    <xsl:text>N</xsl:text>
                </xsl:if>
            </READ_ONLY>
            <DISABLED>
                <xsl:value-of select="DISABLED"/>
            </DISABLED>
            <HIDE>
                <xsl:if test="HIDDEN = -1">
                    <xsl:text>Y</xsl:text>
                </xsl:if>
                <xsl:if test="HIDDEN != -1">
                    <xsl:text>N</xsl:text>
                </xsl:if>
            </HIDE>
            <ABS_POS>
                <xsl:value-of select="ABS_POS"/>
            </ABS_POS>
            <IMG_SRC><xsl:value-of select="SRC"/></IMG_SRC>
            <ALT_IMAGE><xsl:value-of select="ALT"/></ALT_IMAGE>
            <!-- <DTYPE>VARCHAR2</DTYPE> -->
            <FIELD_SIZE>
                <xsl:value-of select="SIZE"/>
            </FIELD_SIZE>
            <WIDTH>
                <xsl:value-of select="WIDTH"/>
            </WIDTH>
            <HEIGHT>
                <xsl:value-of select="HEIGHT"/>
            </HEIGHT>
            <SHOW_IN>
              <xsl:value-of select="SHOWIN"/>
            </SHOW_IN>
            <CHECKED>
                <xsl:if test="CHECKED = -1">
                    <xsl:text>Y</xsl:text>
                </xsl:if>
                <xsl:if test="CHECKED != -1">
                    <xsl:text>N</xsl:text>
                </xsl:if>
            </CHECKED>
            <FIELD_ROW>
                <xsl:value-of select="@ROW"/>
            </FIELD_ROW>
            <FIELD_COLUMN>
                <xsl:value-of select="@COL"/>
            </FIELD_COLUMN>
            <QUERY_COL>
                <xsl:value-of select="@QRY_COL"/>
            </QUERY_COL>
            <RESULT_COL>
                <xsl:value-of select="@RSLT_COL"/>
            </RESULT_COL>
            <xsl:apply-templates select="EVENT" mode="field"/>
            <xsl:apply-templates select="LOV"/>
        </RAD_BLK_FIELDS>
    </xsl:template>
    
    <xsl:template match="LOV">
      <LOV>
        <NAME><xsl:value-of select="NAME"/></NAME>
        <TITLE><xsl:value-of select="TITLE"/></TITLE>
        <COL_HEADING><xsl:value-of select="COL_HEADING"/></COL_HEADING>
        <REDUCTION_FLD_LABELS><xsl:value-of select="REDUCTION_FLD_LABELS"/></REDUCTION_FLD_LABELS>
      </LOV>
    </xsl:template>
    
    <xsl:template match="EVENT" mode="field">
        <RAD_FIELD_EVENTS Type="MULTIPLE">
            <xsl:attribute name="ID">
                <xsl:value-of select="position()"/>
            </xsl:attribute>
            <EVENT_NAME><xsl:value-of select="NAME"/></EVENT_NAME>
            <FUNCTION_NAME><xsl:value-of select="FUNCTION"/></FUNCTION_NAME>
        </RAD_FIELD_EVENTS>
    </xsl:template>
    
    <xsl:template match="EVENT" mode="block">
        <RAD_BLK_EVENTS Type="MULTIPLE">
            <xsl:attribute name="ID">
                <xsl:value-of select="position()"/>
            </xsl:attribute>
            <EVENT_NAME><xsl:value-of select="NAME"/></EVENT_NAME>
            <EVENT_FUNCTION><xsl:value-of select="FUNCTION"/></EVENT_FUNCTION>
        </RAD_BLK_EVENTS>
    </xsl:template>
</xsl:stylesheet>