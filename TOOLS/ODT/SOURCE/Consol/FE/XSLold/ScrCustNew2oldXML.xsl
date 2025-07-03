<?xml version='1.0' encoding='windows-1252'?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
   <xsl:import href="GlobalFieldInput.xsl"/>
   <!-- Root template -->
   <xsl:template match="/">
        <xsl:apply-templates select="RAD_FUNCTIONS"/>
   </xsl:template>
   
   <xsl:template match="RAD_FUNCTIONS">
    <FORM>
      <xsl:apply-templates select="//RAD_SUMMARY"/>
      <!-- <xsl:apply-templates select="//RAD_SCREENS"/> -->
      <xsl:apply-templates select="//RAD_SCREENS[SCREEN_NAME != 'SUMMARY']"/>
    </FORM>
   </xsl:template>
   
   <xsl:template match="RAD_SUMMARY">
        <SUMMARY>
            <xsl:attribute name="TITLE"><xsl:value-of select="TITLE"/></xsl:attribute>
            <HEIGHT><xsl:value-of select="HEIGHT"/>px</HEIGHT>
            <WIDTH><xsl:value-of select="WIDTH"/>px</WIDTH>
            <QUERY>
                <ACCESSKEY><xsl:value-of select="QRY_ACCESSKEY"/></ACCESSKEY>
                <LABEL><xsl:value-of select="QRY_LABEL"/></LABEL>
                <NUM_ROWS><xsl:value-of select="QRY_NUMROWS"/></NUM_ROWS>
                <HEIGHT><xsl:value-of select="QRY_HEIGHT"/>px</HEIGHT>
                <AUDIT>
                    <xsl:if test="QRY_AUDIT = 'Y'">
                        <xsl:text>-1</xsl:text>
                    </xsl:if>
                    <xsl:if test="QRY_AUDIT = 'N'">
                        <xsl:text>0</xsl:text>
                    </xsl:if>
                </AUDIT>
            </QUERY>
            <RESULT>
                <ACCESSKEY><xsl:value-of select="RSLT_ACCESSKEY"/></ACCESSKEY>
                <LABEL><xsl:value-of select="RSLT_LABEL"/></LABEL>
                <DATAPAGESIZE><xsl:value-of select="RSLT_DATAPGSIZE"/></DATAPAGESIZE>
                <DBT><xsl:value-of select="RSLT_DATASRC"/></DBT>
                <HEIGHT><xsl:value-of select="RSLT_HEIGHT"/>px</HEIGHT>
                <AUDIT>
                    <xsl:if test="RSLT_AUDIT = 'Y'">
                        <xsl:text>-1</xsl:text>
                    </xsl:if>
                    <xsl:if test="RSLT_AUDIT = 'N'">
                        <xsl:text>0</xsl:text>
                    </xsl:if>
                </AUDIT>
            </RESULT>
            <ADVANCED>
		<ACCESSKEY><xsl:value-of select="ADVCD_ACCESSKEY"/></ACCESSKEY>
		<LABEL><xsl:value-of select="ADVCD_LABEL"/></LABEL>
		<DBT><xsl:value-of select="ADVCD_DATASRC"/></DBT>
		<HEIGHT><xsl:value-of select="ADVCD_HEIGHT"/>px</HEIGHT>
		<AUDIT>
		    <xsl:if test="ADVCD_AUDIT = 'Y'">
			<xsl:text>-1</xsl:text>
		    </xsl:if>
		    <xsl:if test="ADVCD_AUDIT = 'N'">
			<xsl:text>0</xsl:text>
		    </xsl:if>
		</AUDIT>
            </ADVANCED>
        </SUMMARY>
	<xsl:apply-templates select="//RAD_SCREENS[SCREEN_NAME = 'SUMMARY']"/>
   </xsl:template>
   
   <xsl:template match="RAD_SCREENS">
          <xsl:if test="SCREEN_NAME != 'SUMMARY'">
              <SCREEN>
                  <xsl:attribute name="NAME">
                      <xsl:value-of select="SCREEN_NAME"/>
                  </xsl:attribute>
                  <xsl:attribute name="TITLE">
                      <xsl:value-of select="SCREEN_TITLE"/>
                  </xsl:attribute>
                  <xsl:attribute name="POSITION">
                      <xsl:value-of select="SCREEN_POSITION"/>
                  </xsl:attribute>
                  <xsl:attribute name="HEIGHT">
                      <xsl:value-of select="SCREEN_HEIGHT"/>
                      <xsl:if test="not(contains(SCREEN_HEIGHT,'px'))">
                          <xsl:text>px</xsl:text>
                      </xsl:if>
                  </xsl:attribute>
                  <xsl:attribute name="WIDTH">
                      <xsl:value-of select="SCREEN_WIDTH"/>
                      <xsl:if test="not(contains(SCREEN_WIDTH,'px'))">
                          <xsl:text>px</xsl:text>
                      </xsl:if>
                  </xsl:attribute>
                  
                  <!-- Add TAB and HEADER node only if RAD_TABS present in dbDataDOM -->
                  <xsl:if test="count(./RAD_TABS[TAB_TYPE='NORMAL']) > 0">
                      <TAB>
                          <xsl:apply-templates select="./RAD_TABS[TAB_TYPE='NORMAL']"/>
                      </TAB>
                  </xsl:if>
                  
                  <xsl:if test="count(./RAD_TABS[TAB_TYPE='HEADER']) > 0">
                      <HEADER>
                          <xsl:apply-templates select="./RAD_TABS[TAB_TYPE='HEADER']"/>
                      </HEADER>
                  </xsl:if>
                  
              </SCREEN>
            </xsl:if>
            <xsl:apply-templates select="./RAD_AUDIT_BLOCK"/>
            <xsl:apply-templates select="./RAD_DATA_BLOCKS"/>
    </xsl:template>
   <xsl:template match="RAD_TABS">
        <PAGE>
            <xsl:attribute name="NAME">
                <xsl:value-of select="TAB_NAME"/>
            </xsl:attribute>
            <xsl:attribute name="ID">
                <xsl:value-of select="TAB_NAME"/>
            </xsl:attribute>
            <xsl:attribute name="HEIGHT">
                <xsl:value-of select="TAB_HEIGHT"/>
            </xsl:attribute>
            <LABEL>
                <xsl:value-of select="TAB_LABEL"/>
            </LABEL>
        </PAGE>
   </xsl:template>

  <!-- Audit blk transformation -->
  <xsl:template match="RAD_AUDIT_BLOCK">
    <BLOCK TYPE="Audit Entry">
      <xsl:attribute name="SCREEN">
        <xsl:value-of select="SCREEN_NAME"/>
      </xsl:attribute>
      <ID><xsl:text>BLK_AUDIT</xsl:text></ID>
      <LABEL><xsl:value-of select="BLOCK_TITLE"/></LABEL>
      <ABS_POS><xsl:value-of select="BLK_ABSPOS"/></ABS_POS>
      <TYPE><xsl:value-of select="//RAD_FUNCTIONS/VIEW_TYPE"/></TYPE>
      <READ_ONLY><xsl:value-of select="READ_ONLY"/></READ_ONLY>
      <DBT><xsl:value-of select="//RAD_DATASOURCES[PARENT_DATASRC='']/DATASRC_NAME"/></DBT>
    </BLOCK>
  </xsl:template>

   <!-- 
        - Transforms RAD_DATA_BLOCKS to the FCJ F/W BLOCK type 
   -->
   <xsl:template match="RAD_DATA_BLOCKS">
    <BLOCK>
        <xsl:variable name="datasrcName" select="./DATASRC_NAME"/>
          <xsl:attribute name="SCREEN">
              <xsl:value-of select="SCREEN_NAME"/>
          </xsl:attribute>
          <xsl:attribute name="TABPAGE">
              <xsl:value-of select="TAB_NAME"/>
          </xsl:attribute>
          <xsl:attribute name="TYPE">
            <xsl:value-of select="FUNCTION_ID"/>
          </xsl:attribute>
          <xsl:if test="VIEW_TYPE = 'Single Entry'">
            <xsl:attribute name="VIEW">
                <xsl:value-of select="VIEW_TYPE"/>
            </xsl:attribute>
          </xsl:if>
          <xsl:attribute name="ROW">
              <xsl:value-of select="ROWS"/>
          </xsl:attribute>
          <xsl:attribute name="COL">
              <xsl:value-of select="COLS"/>
          </xsl:attribute>
          <ID><xsl:value-of select="BLOCK_ID"/></ID>
          <LABEL><xsl:value-of select="BLOCK_TITLE"/></LABEL>
          <ABS_POS><xsl:value-of select="BLK_ABSPOS"/></ABS_POS>
          <WIDTH><xsl:value-of select="BLK_WIDTH"/></WIDTH>
          <HEIGHT><xsl:value-of select="BLK_HEIGHT"/></HEIGHT>
          <DATAPAGESIZE></DATAPAGESIZE>
          <xsl:if test="$datasrcName != ''">
              <xsl:if test="//RAD_DATASOURCES[DATASRC_NAME=$datasrcName]/RELATION_TYPE = 'N'">
                    <DBT><xsl:value-of select="$datasrcName"/></DBT>
              </xsl:if>
              <xsl:if test="//RAD_DATASOURCES[DATASRC_NAME=$datasrcName]/RELATION_TYPE != 'N'">
                  <DATASRC><xsl:value-of select="DATASRC_NAME"/></DATASRC>
              </xsl:if>
          </xsl:if>
          <OKCANCEL>
            <xsl:if test="HAS_DEFAULT_OK_CANCEL = 'Y'">
                <xsl:text>-1</xsl:text>
            </xsl:if>
            <xsl:if test="HAS_DEFAULT_OK_CANCEL = 'N'">
                <xsl:text>0</xsl:text>
            </xsl:if>
          </OKCANCEL>
          <xsl:apply-templates select="./RAD_BLK_EVENTS"/>
          <xsl:apply-templates select="./RAD_BLK_FIELDS"/>
    </BLOCK>
   </xsl:template>
    <xsl:include href="GlobalFieldInput.xsl"/>
    <xsl:template match="RAD_BLK_EVENTS">
      <EVENT>
        <NAME><xsl:value-of select="EVENT_NAME"/></NAME>
        <FUNCTION><xsl:value-of select="EVENT_FUNCTION"/></FUNCTION>
      </EVENT>
    </xsl:template>
    <xsl:template match="RAD_BLK_FIELDS">
       <xsl:variable name="datasrcName" select="../DATASRC_NAME"/>
       <xsl:variable name="Identifier" select="@Identifier"/>
       <xsl:variable name="relatedFld" select="//RAD_FIELDS[@Identifier=$Identifier]/RELATED_FIELD"/>
       <xsl:variable name="lovName" select="//RAD_DATASOURCES[DATASRC_NAME=$datasrcName]/RAD_FIELDS[@Identifier=$Identifier]/LOV_NAME"/>
       <!-- <xsl:variable name="relation" select="//RAD_DATASOURCES[DATASRC_NAME=$datasrcName]/RELATION_TYPE"/> -->
       <xsl:variable name="relation" select="../FUNCTION_ID"/>
       <FIELD>
          <xsl:choose>

            <xsl:when test="FIELD_TYPE = 'TEXT'">
               <xsl:call-template name="TextType">
                <xsl:with-param name="relation" select="$relation"/>
                <xsl:with-param name="currNode" select="."/>
                <xsl:with-param name="viewType" select="../VIEW_TYPE"/>
               </xsl:call-template>
            </xsl:when>

            <xsl:when test="FIELD_TYPE = 'LABEL'">
               <xsl:call-template name="LabelType">
                <xsl:with-param name="relation" select="$relation"/>
                <xsl:with-param name="currNode" select="."/>
                <xsl:with-param name="viewType" select="../VIEW_TYPE"/>
               </xsl:call-template>
            </xsl:when>

            <xsl:when test="FIELD_TYPE = 'RADIO'">
               <xsl:call-template name="RadioType">
                <xsl:with-param name="relation" select="$relation"/>
                <xsl:with-param name="currNode" select="."/>
                <xsl:with-param name="viewType" select="../VIEW_TYPE"/>
               </xsl:call-template>
            </xsl:when>
            
            <xsl:when test="FIELD_TYPE = 'HIDDEN'">
                <xsl:call-template name="HiddenType">
                    <xsl:with-param name="relation" select="$relation"/>
                    <xsl:with-param name="currNode" select="."/>
                    <xsl:with-param name="viewType" select="../VIEW_TYPE"/>
                </xsl:call-template>
            </xsl:when>
            
            <xsl:when test="FIELD_TYPE = 'BUTTON'">
                <xsl:call-template name="ButtonType">
                    <xsl:with-param name="relation" select="$relation"/>
                    <xsl:with-param name="currNode" select="."/>
                    <xsl:with-param name="viewType" select="../VIEW_TYPE"/>
                </xsl:call-template>
            </xsl:when>
            
            <xsl:otherwise>
                <xsl:attribute name="TABPAGE">
                    <xsl:value-of select="TAB_NAME"/>
                </xsl:attribute>
                <xsl:attribute name="ROW">
                    <xsl:value-of select="FIELD_ROW"/>
                </xsl:attribute>
                <xsl:attribute name="COL">
                    <xsl:value-of select="FIELD_COLUMN"/>
                </xsl:attribute>
                <!-- if it is a single entry block include query col and result col-->
                <xsl:if test="$relation = '1'">
                  <xsl:attribute name="QRY_COL">
                      <xsl:value-of select="QUERY_COL"/>
                  </xsl:attribute>
                  <xsl:attribute name="RSLT_COL">
                      <xsl:value-of select="RESULT_COL"/>
                  </xsl:attribute>
                </xsl:if>
                <NAME><xsl:value-of select="FIELD_NAME"/></NAME>
                <ID>
                  <xsl:variable name="funcId" select="//RAD_FUNCTIONS/FUNCTION_ID"/>
                  <xsl:value-of select="@Identifier"/>
                </ID>
                <TYPE><xsl:value-of select="FIELD_TYPE"/></TYPE>
                <LABEL><xsl:value-of select="LABEL_CODE"/></LABEL>
                <LABEL_LINK><xsl:value-of select="LABEL_LINK"/></LABEL_LINK>
                <SHOWIN><xsl:value-of select="SHOW_IN"/></SHOWIN>
                <xsl:if test="FIELD_TYPE != 'CHECKBOX'">
                    <REQUIRED>
                      <xsl:if test="//RAD_DATASOURCES[DATASRC_NAME=$datasrcName]/RAD_FIELDS[@Identifier=$Identifier]/REQUIRED = 'N'">
                          <xsl:text>0</xsl:text>
                      </xsl:if>
                      <xsl:if test="//RAD_DATASOURCES[DATASRC_NAME=$datasrcName]/RAD_FIELDS[@Identifier=$Identifier]/REQUIRED = 'Y'">
                          <xsl:text>-1</xsl:text>
                      </xsl:if>
                    </REQUIRED>
                </xsl:if>
                <MAXLENGTH><xsl:value-of select="MAX_LENGTH"/></MAXLENGTH>
                <AUTHSCRN>0</AUTHSCRN>
                <READ_ONLY><xsl:value-of select="READ_ONLY"/></READ_ONLY>
                <DISABLED><xsl:value-of select="DISABLED"/></DISABLED>
                <HIDDEN>
                  <xsl:if test="HIDE = 'N'">
                      <xsl:text>0</xsl:text>
                  </xsl:if>
                  <xsl:if test="HIDE = 'Y'">
                      <xsl:text>1</xsl:text>
                  </xsl:if>
                </HIDDEN>
                <xsl:if test="count(RELATED_FIELD) >0">
                  <RELATED_FIELD><xsl:value-of select="RELATED_FIELD"/></RELATED_FIELD>
                </xsl:if>
                <DTYPE><xsl:value-of select="//RAD_FIELDS[@Identifier=$Identifier]/DATATYPE"/></DTYPE>
                <xsl:if test="FIELD_TYPE!='FIELDSET'">
                  <SIZE><xsl:value-of select="FIELD_SIZE"/></SIZE>
                </xsl:if>
                <WIDTH><xsl:value-of select="WIDTH"/></WIDTH>
                <xsl:if test="FIELD_TYPE='FIELDSET'">
                  <HEIGHT><xsl:value-of select="HEIGHT"/></HEIGHT>
                </xsl:if>
                <CHECKED><xsl:value-of select="CHECKED"/></CHECKED>
                <xsl:if test="DBC != ''">
                    <DBC><xsl:value-of select="DBC"/></DBC>
                </xsl:if>
                <LEGEND><xsl:value-of select="LABEL_CODE"/></LEGEND>
                <xsl:if test="normalize-space(IMG_SRC) != ''">
                  <SRC><xsl:value-of select="IMG_SRC"/></SRC>
                  <ALT><xsl:value-of select="ALT_IMAGE"/></ALT>
                </xsl:if>
                <xsl:apply-templates select="//RAD_FIELDS[@Identifier=$Identifier]/RAD_FIELD_OPTIONS"/>
                <!-- IF THIS FIELD IS A UI FIELD i.e DOESNT HAVE A DATASRC THEN... -->
                <xsl:if test="(DBC = '') or ($relation = 'Multiple Entry' and ../VIEW_TYPE='Single Entry')">
                  <ABS_POS><xsl:value-of select="ABS_POS"/></ABS_POS>
                  <xsl:if test="normalize-space(IMG_SRC) != ''">
                    <SRC><xsl:value-of select="IMG_SRC"/></SRC>
                    <ALT><xsl:value-of select="ALT_IMAGE"/></ALT>
                  </xsl:if>
                </xsl:if>
                <xsl:if test="$relation = 'Single Entry' and ../VIEW_TYPE='Single Entry'">
                  <xsl:if test="normalize-space(DBT) != '' and normalize-space(DBC)!=''">
                    <DBT><xsl:value-of select="DBT"/></DBT>
                  </xsl:if>
                </xsl:if>
                <xsl:if test="$relation = 'Single Entry'">
                  <ACCESSKEY></ACCESSKEY>
                  <MULTIPLE></MULTIPLE>
                  <DEF_VALUE></DEF_VALUE>
                  <SUMMARY>
                      <xsl:if test="//RAD_FIELDS[@Identifier=$Identifier]/SUMMARY_QUERY = 'Y'">
                          <xsl:text>Q</xsl:text>
                      </xsl:if>
                      <xsl:if test="//RAD_FIELDS[@Identifier=$Identifier]/SUMMARY_RESULT = 'Y'">
                          <xsl:text>R</xsl:text>
                      </xsl:if>
                      <xsl:if test="//RAD_FIELDS[@Identifier=$Identifier]/SUMMARY_ADVANCED = 'Y'">
                          <xsl:text>A</xsl:text>
                      </xsl:if>
                  </SUMMARY>
                  <xsl:if test="VALUE != ''">
                    <VALUE><xsl:value-of select="VALUE"/></VALUE>
                  </xsl:if>
                  <xsl:if test="MASK != ''">
                    <MASK></MASK>
                  </xsl:if>
                  <TABINDEX><xsl:value-of select="TABINDEX"/></TABINDEX>
                  <ABS_POS><xsl:value-of select="ABS_POS"/></ABS_POS>
                  <xsl:if test="normalize-space(DBT) != '' and normalize-space(DBC) != ''">
                    <DBT><xsl:value-of select="DBT"/></DBT>
                  </xsl:if>
                  <xsl:if test="normalize-space(IMG_SRC) != ''">
                    <SRC><xsl:value-of select="IMG_SRC"/></SRC>
                    <ALT><xsl:value-of select="ALT_IMAGE"/></ALT>
                  </xsl:if>
                  <ROWS><xsl:value-of select="TXTAREA_ROWS"/></ROWS>
                  <COLS><xsl:value-of select="TXTAREA_COLS"/></COLS>
                  <HEIGHT><xsl:value-of select="HEIGHT"/></HEIGHT>
                  <TEXT-ALIGN><xsl:value-of select="TEXT-ALIGN"/></TEXT-ALIGN>
                  <UIBLOCK></UIBLOCK>
                </xsl:if>
           </xsl:otherwise>
          </xsl:choose>
          <!-- <xsl:if test="count(//RAD_LOVS[LOV_NAME=$lovName]) > 0">
            <LOV>
              <xsl:apply-templates select="//RAD_LOVS[LOV_NAME=$lovName]"/>
              <xsl:apply-templates select="//RAD_FIELDS[@Identifier=$Identifier]/RAD_FIELD_LOV_OVERRIDES"/>
            </LOV>
          </xsl:if> -->
          <xsl:apply-templates select="LOV"/>
          <xsl:apply-templates select="RAD_FIELD_EVENTS"/>
        </FIELD> 
    </xsl:template>
    
    <xsl:template match="LOV">
       <xsl:copy-of select="."/>
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
    <xsl:template match="RAD_FIELD_EVENTS">
      <EVENT>
        <NAME><xsl:value-of select="EVENT_NAME"/></NAME>
        <FUNCTION><xsl:value-of select="FUNCTION_NAME"/></FUNCTION>
      </EVENT>
    </xsl:template>
    <xsl:template match="RAD_LOVS">
      <NAME><xsl:value-of select="LOV_NAME"/></NAME>
      <TITLE><xsl:value-of select="FORM_TITLE"/></TITLE>
    </xsl:template>
    <xsl:template match="RAD_FIELD_LOV_OVERRIDES">
     <RET_FLDS><xsl:value-of select="RETURN_FIELDS"/></RET_FLDS>
     <COL_HEADING><xsl:value-of select="COLUMN_HEADING"/></COL_HEADING>
     <REDUCTION_FLD_LABELS><xsl:value-of select="REDC_FLD_LABELS"/></REDUCTION_FLD_LABELS>
    </xsl:template>

</xsl:stylesheet>
