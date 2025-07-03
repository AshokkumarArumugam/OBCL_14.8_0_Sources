<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:import href="GlobalFieldInput.xsl"/>
	<!-- Root template -->
	<xsl:template match="/">
		<xsl:apply-templates select="RAD_FUNCTIONS"/>
	</xsl:template>
	<xsl:template match="RAD_FUNCTIONS">
		<FORM>
			<xsl:apply-templates select="//RAD_SUMMARY"/>
			<xsl:apply-templates select="//RAD_SCREENS[SCREEN_NAME != 'SUMMARY']"/>
		</FORM>
	</xsl:template>
	<xsl:template match="RAD_SUMMARY">
		<SUMMARY>
			<xsl:attribute name="TITLE">
				<xsl:value-of select="TITLE"/>
			</xsl:attribute>
			<!-- Added By Murali for Template, Summary Screen Position-->
			<xsl:attribute name="POSITION">
				<xsl:value-of select="//RAD_SCREENS[SCREEN_NAME = 'SUMMARY']/SCREEN_POSITION"/>
			</xsl:attribute>
			<TYPE><xsl:value-of select="SUMMARY_TYPE"/></TYPE>
			<xsl:variable name="summaryDatasrc" select="//RAD_SUMMARY/RSLT_DATASRC"/>
			<xsl:variable name="sum_base">
				<xsl:if test="//RAD_DATASOURCES[DATASRC_NAME = $summaryDatasrc and DATASRC_ALIAS = '']/@ID = 1 and //RAD_FUNCTIONS/DETAIL_REQD = 'Y'">
					<xsl:value-of select="'M'"/>
				</xsl:if>
				<xsl:if test="//RAD_DATASOURCES[DATASRC_NAME = $summaryDatasrc  and DATASRC_ALIAS = '']/@ID != 1 or (//RAD_DATASOURCES[DATASRC_NAME = $summaryDatasrc and DATASRC_ALIAS = '']/@ID = 1 and //RAD_FUNCTIONS/DETAIL_REQD = 'N')">
					<xsl:value-of select="'V'"/>
				</xsl:if>
			</xsl:variable>
			<SUMMARY_BASE><xsl:value-of select="$sum_base"/></SUMMARY_BASE>
			<!--
      <HEIGHT><xsl:value-of select="HEIGHT"/>px</HEIGHT>
      <WIDTH><xsl:value-of select="WIDTH"/>px</WIDTH>
      -->
			<!--
      <HEIGHT><xsl:value-of select="HEIGHT"/></HEIGHT>
      <WIDTH><xsl:value-of select="WIDTH"/></WIDTH>
      <QUERY>
        <ACCESSKEY>
          <xsl:value-of select="QRY_ACCESSKEY"/>
        </ACCESSKEY>
        <LABEL>
          <xsl:value-of select="QRY_LABEL"/>
        </LABEL>
        <NUM_ROWS>
          <xsl:value-of select="QRY_NUMROWS"/>
        </NUM_ROWS> -->
			<!--        <HEIGHT><xsl:value-of select="QRY_HEIGHT"/>px</HEIGHT> -->
			<!--
        <HEIGHT><xsl:value-of select="QRY_HEIGHT"/></HEIGHT>
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
        <ACCESSKEY>
          <xsl:value-of select="RSLT_ACCESSKEY"/>
        </ACCESSKEY>
        <LABEL>
          <xsl:value-of select="RSLT_LABEL"/>
        </LABEL>
        <DATAPAGESIZE>
          <xsl:value-of select="RSLT_DATAPGSIZE"/>
        </DATAPAGESIZE>
        <DBT>
          <xsl:value-of select="RSLT_DATASRC"/>
        </DBT> -->
			<!--        <HEIGHT><xsl:value-of select="RSLT_HEIGHT"/>px</HEIGHT>  -->
			<!--
        <HEIGHT><xsl:value-of select="RSLT_HEIGHT"/></HEIGHT>
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
        <ACCESSKEY>
          <xsl:value-of select="ADVCD_ACCESSKEY"/>
        </ACCESSKEY>
        <LABEL>
          <xsl:value-of select="ADVCD_LABEL"/>
        </LABEL>
        <DBT>
          <xsl:value-of select="ADVCD_DATASRC"/>
        </DBT>-->
			<!--        <HEIGHT><xsl:value-of select="ADVCD_HEIGHT"/>px</HEIGHT> -->
			<!--
        <HEIGHT><xsl:value-of select="ADVCD_HEIGHT"/></HEIGHT> 
        <AUDIT>
          <xsl:if test="ADVCD_AUDIT = 'Y'">
            <xsl:text>-1</xsl:text>
          </xsl:if>
          <xsl:if test="ADVCD_AUDIT = 'N'">
            <xsl:text>0</xsl:text>
          </xsl:if>
        </AUDIT>
      </ADVANCED> -->
			<!--      
      <xsl:if test="count(//RAD_SUMMARY_WHERECLAUSE) &gt; 0">
        <DEFAULT_WHERE>
          <SUMMARY_TABLE><xsl:value-of select="RSLT_DATASRC"/></SUMMARY_TABLE>
          <xsl:variable name="noOfCondition" select="count(//RAD_SUMMARY_WHERECLAUSE)"/>
        <WHERE_CONDITION>
          <xsl:for-each select="//RAD_SUMMARY_WHERECLAUSE">
            <xsl:variable name="idx" select="position()"/>
            <xsl:variable name="colName" select="COL_NAME"/>
            <xsl:variable name="colValue" select="COL_VALUE"/>
            <xsl:value-of select="$colName"/>:<xsl:value-of select="$colValue"/>
            <xsl:if test="$noOfCondition != $idx">
              <xsl:text>~</xsl:text>
            </xsl:if>
          </xsl:for-each>
        </WHERE_CONDITION>          
        </DEFAULT_WHERE>
      </xsl:if>
-->
		</SUMMARY>
		<xsl:if test="count(//RAD_SUMMARY) &gt; 0">
			<xsl:variable name="rsltDataSrc" select="//RAD_SUMMARY/RSLT_DATASRC"/>
			<xsl:variable name="queryAudit" select="//RAD_SUMMARY/QRY_AUDIT"/>
			<xsl:variable name="resultAudit" select="//RAD_SUMMARY/RSLT_AUDIT"/>
			<xsl:variable name="scrType" select="//RAD_FUNCTIONS/SCREEN_TYPE"/>
			<xsl:variable name="summaryScrType" select="//RAD_SUMMARY/SUMMARY_TYPE"/>
			<xsl:if test="count(//RAD_DATASOURCES[DATASRC_NAME = $rsltDataSrc and DATASRC_ALIAS = '']/RAD_FIELDS[SUMMARY_QUERY = 'Y']) &gt; 0">
				<xsl:call-template name="summaryQueryBlkHandler">
					<xsl:with-param name="rsltDS" select="$rsltDataSrc"/>
					<xsl:with-param name="screenType" select="$scrType"/>
				</xsl:call-template>
			</xsl:if>
			<xsl:if test="count(//RAD_DATASOURCES[DATASRC_NAME = $rsltDataSrc and DATASRC_ALIAS = '']/RAD_FIELDS[SUMMARY_RESULT = 'Y']) &gt; 0">
				<xsl:call-template name="summaryRsltBlkHandler">
					<xsl:with-param name="rsltDS" select="$rsltDataSrc"/>
					<xsl:with-param name="screenType" select="$scrType"/>
				</xsl:call-template>
			</xsl:if>
			<xsl:if test="count(//RAD_SUMMARY/RAD_CUSTOM_BUTTONS) &gt; 0">
				<xsl:call-template name="summaryCustomButtonHandler">
					<xsl:with-param name="sumScrType" select="$summaryScrType"/>
				</xsl:call-template>
			</xsl:if>
		</xsl:if>
		<xsl:apply-templates select="//RAD_SCREENS[SCREEN_NAME = 'SUMMARY']"/>
	</xsl:template>
	<xsl:template match="RAD_SCREENS">
		<xsl:variable name="screenName" select="SCREEN_NAME"/>
		<xsl:if test="SCREEN_NAME != 'SUMMARY'">
			<SCREEN>
				<xsl:attribute name="NAME">
					<xsl:value-of select="SCREEN_NAME"/>
				</xsl:attribute>
				<xsl:if test="//RAD_FUNCTIONS/MAIN_SCR = SCREEN_NAME">
					<xsl:attribute name="MAIN_WIN">
						<xsl:text>Y</xsl:text>
					</xsl:attribute>
				</xsl:if>
				<xsl:attribute name="TITLE">
					<xsl:value-of select="SCREEN_TITLE"/>
				</xsl:attribute>
				<xsl:attribute name="POSITION">
					<xsl:value-of select="SCREEN_POSITION"/>
				</xsl:attribute>
				<xsl:attribute name="HEIGHT">
					<xsl:value-of select="SCREEN_HEIGHT"/>
					<!--          <xsl:if test="not(contains(SCREEN_HEIGHT,'px'))">
            <xsl:text>px</xsl:text>
          </xsl:if> -->
				</xsl:attribute>
				<xsl:attribute name="WIDTH">
					<xsl:value-of select="SCREEN_WIDTH"/>
					<!--          <xsl:if test="not(contains(SCREEN_WIDTH,'px'))">
            <xsl:text>px</xsl:text>
          </xsl:if> -->
				</xsl:attribute>
				<!-- TODO: Added By Murali for template Screen Type-->
				<xsl:if test="SCREEN_POSITION = 'template'">
					<xsl:attribute name="TMP_SCR_TYPE">
						<xsl:value-of select="TMP_SCREEN_TYPE"/>
					</xsl:attribute>
					<xsl:attribute name="VERSION_BTN_REQD">
						<xsl:value-of select="VERSION_BTN_REQD"/>
					</xsl:attribute>
				</xsl:if>
				<!-- Added By Murali END-->
				<!-- Add TAB and HEADER node only if RAD_TABS present in dbDataDOM -->
				<xsl:if test="count(./RAD_TABS[TAB_TYPE='NORMAL']) &gt; 0">
					<TAB>
						<xsl:apply-templates select="./RAD_TABS[TAB_TYPE='NORMAL']"/>
					</TAB>
				</xsl:if>
				<xsl:if test="count(./RAD_TABS[TAB_TYPE='HEADER']) &gt; 0">
					<HEADER>
						<xsl:apply-templates select="./RAD_TABS[TAB_TYPE='HEADER']"/>
					</HEADER>
				</xsl:if>
				<xsl:variable name="mainScr" select="SCREEN_NAME"/>
				<xsl:if test="//RAD_FUNCTIONS/MAIN_SCR = $mainScr">
					<CS_BUTTON_ROWS><xsl:value-of select="//RAD_SCREENS[SCREEN_NAME = $mainScr]/RAD_PREFERENCE/NO_OF_ROWS"/></CS_BUTTON_ROWS>
					<CS_BUTTONS_PER_ROW><xsl:value-of select="//RAD_SCREENS[SCREEN_NAME = $mainScr]/RAD_PREFERENCE/NO_OF_BUTTONS"/></CS_BUTTONS_PER_ROW>
				</xsl:if>
				<xsl:if test="count(.//RAD_FIELD_EVENTS[LAUNCH_SUBSCREEN = 'Y' or LAUNCH_CALLFORM = 'Y']) &gt; 0">
					<xsl:call-template name="SubscrAndCallformHandler">
						<xsl:with-param name="scrName" select="$screenName"/>
					</xsl:call-template>
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
			<!-- Added by Murali for Template -->
			<xsl:apply-templates select="./RAD_SECTIONS"/>
			<!-- Added By Murali - End -->
		</PAGE>
	</xsl:template>
	<!-- Added by Murali for Template -->
	<xsl:template match="RAD_SECTIONS">
		<SECTION>
			<xsl:attribute name="ID">
				<xsl:value-of select="SECTION_ID"/>
			</xsl:attribute>
			<xsl:attribute name="HEIGHT">
				<xsl:value-of select="SECTION_HEIGHT"/>
			</xsl:attribute>
			<xsl:apply-templates select="./RAD_PARTITIONS"/>
		</SECTION>
	</xsl:template>
	<xsl:template match="RAD_PARTITIONS">
		<PARTITION>
			<xsl:attribute name="ID">
				<xsl:value-of select="PARTITION_ID"/>
			</xsl:attribute>
			<xsl:attribute name="NAME">
				<xsl:value-of select="PARTITION_NAME"/>
			</xsl:attribute>
			<xsl:attribute name="WIDTH">
				<xsl:value-of select="PARTITION_WIDTH"/>
			</xsl:attribute>
			<xsl:if test="./FSREQ = 'Y' ">
				<FSREQ>
					<xsl:value-of select="FSREQ"/>
				</FSREQ>
				<LABEL>
					<xsl:value-of select="FS_LABEL"/>
				</LABEL>
			</xsl:if>
			<xsl:apply-templates select="./RAD_SUBPARTITIONS"/>
		</PARTITION>
	</xsl:template>
	<!-- Added By Murali - End -->
	<!-- Added By Binson for Sub Partition - Start-->
	<xsl:template match="RAD_SUBPARTITIONS">
		<SUBPARTITIONS>
			<xsl:attribute name="ID">
				<xsl:value-of select="SUBPARTITION_ID"/>
			</xsl:attribute>
			<xsl:attribute name="LABEL">
				<xsl:value-of select="SUBPARTITION_NAME"/>
			</xsl:attribute>
		</SUBPARTITIONS>
	</xsl:template>
	<!-- Added By Binson for Sub Partition - End-->
	<!-- Audit blk transformation -->
	<xsl:template match="RAD_AUDIT_BLOCK">
		<BLOCK TYPE="Audit Entry">
			<xsl:attribute name="SCREEN">
				<xsl:value-of select="SCREEN_NAME"/>
			</xsl:attribute>
			<ID>
				<xsl:text>BLK_AUDIT</xsl:text>
			</ID>
			<LABEL>
				<xsl:value-of select="BLOCK_TITLE"/>
			</LABEL>
			<ABS_POS>
				<xsl:value-of select="BLK_ABSPOS"/>
			</ABS_POS>
			<TYPE><xsl:value-of select="VIEW_TYPE"/></TYPE>
			<READ_ONLY>
				<xsl:value-of select="READ_ONLY"/>
			</READ_ONLY>
			<DBT>
				<xsl:value-of select="//SEL_AUDIT_DATASRC"/>
			</DBT>
			<xsl:if test="VIEW_TYPE = 'T'">
				<CONTRACT_STATUS>
					<xsl:if test="count(//RAD_AUDIT_FIELDS[FIELD_NAME = 'CONTSTAT' and CHK_INCLUDE = 'Y']) &gt; 0">
						<xsl:text>-1</xsl:text>
					</xsl:if>
					<xsl:if test="count(//RAD_AUDIT_FIELDS[FIELD_NAME = 'CONTSTAT' and CHK_INCLUDE = 'Y']) = 0">
						<xsl:text>0</xsl:text>
					</xsl:if>
				</CONTRACT_STATUS>
				<AUTH_STATUS>
					<xsl:if test="count(//RAD_AUDIT_FIELDS[FIELD_NAME = 'AUTHSTAT' and CHK_INCLUDE = 'Y']) &gt; 0">
						<xsl:text>-1</xsl:text>
					</xsl:if>
					<xsl:if test="count(//RAD_AUDIT_FIELDS[FIELD_NAME = 'AUTHSTAT' and CHK_INCLUDE = 'Y']) = 0">
						<xsl:text>0</xsl:text>
					</xsl:if>
				</AUTH_STATUS>
				<COLLECTION_STATUS>
					<xsl:if test="count(//RAD_AUDIT_FIELDS[FIELD_NAME = 'COLLECTION_STATUS' and CHK_INCLUDE = 'Y']) &gt; 0">
						<xsl:text>-1</xsl:text>
					</xsl:if>
					<xsl:if test="count(//RAD_AUDIT_FIELDS[FIELD_NAME = 'COLLECTION_STATUS' and CHK_INCLUDE = 'Y']) = 0">
						<xsl:text>0</xsl:text>
					</xsl:if>
				</COLLECTION_STATUS>
				<PAYMENT_STATUS>
					<xsl:if test="count(//RAD_AUDIT_FIELDS[FIELD_NAME = 'PAYMENT_STATUS' and CHK_INCLUDE = 'Y']) &gt; 0">
						<xsl:text>-1</xsl:text>
					</xsl:if>
					<xsl:if test="count(//RAD_AUDIT_FIELDS[FIELD_NAME = 'PAYMENT_STATUS' and CHK_INCLUDE = 'Y']) = 0">
						<xsl:text>0</xsl:text>
					</xsl:if>
				</PAYMENT_STATUS>
				<PROCESS_STATUS>
					<xsl:if test="count(//RAD_AUDIT_FIELDS[FIELD_NAME = 'PROCESSTAT' and CHK_INCLUDE = 'Y']) &gt; 0">
						<xsl:text>-1</xsl:text>
					</xsl:if>
					<xsl:if test="count(//RAD_AUDIT_FIELDS[FIELD_NAME = 'PROCESSTAT' and CHK_INCLUDE = 'Y']) = 0">
						<xsl:text>0</xsl:text>
					</xsl:if>
				</PROCESS_STATUS>
				<REVERSAL>
					<xsl:if test="//RAD_FUNCTIONS/REVERSAL_REQD = 'Y'">
						<xsl:text>-1</xsl:text>
					</xsl:if>
					<xsl:if test="//RAD_FUNCTIONS/REVERSAL_REQD = 'N'">
						<xsl:text>0</xsl:text>
					</xsl:if>
				</REVERSAL>
				<DEAL_STATUS>
					<xsl:if test="count(//RAD_AUDIT_FIELDS[FIELD_NAME = 'DEAL_STATUS' and CHK_INCLUDE = 'Y']) &gt; 0">
						<xsl:text>-1</xsl:text>
					</xsl:if>
					<xsl:if test="count(//RAD_AUDIT_FIELDS[FIELD_NAME = 'DEAL_STATUS' and CHK_INCLUDE = 'Y']) = 0">
						<xsl:text>0</xsl:text>
					</xsl:if>
				</DEAL_STATUS>
			</xsl:if>
		</BLOCK>
	</xsl:template>
	<!-- 
        - Transforms RAD_DATA_BLOCKS to the FCJ F/W BLOCK type 
   -->
	<xsl:template match="RAD_DATA_BLOCKS">
		<BLOCK>
			<!-- Changes has been made by Sundar for Alias integration.
      <xsl:variable name="datasrcName" select="./DATASRC_NAME"/>  -->
			<xsl:variable name="datasrcName1" select="./DATASRC_NAME"/>
			<xsl:variable name="datasrcName">
				<xsl:if test="contains($datasrcName1,'__')">
					<xsl:value-of select="substring-before($datasrcName1,'__')"/>
				</xsl:if>
				<xsl:if test="not(contains($datasrcName1,'__'))">
					<xsl:value-of select="$datasrcName1"/>
				</xsl:if>
			</xsl:variable>
			<xsl:variable name="dsAlias">
				<xsl:if test="contains($datasrcName1,'__')">
					<xsl:value-of select="substring-after($datasrcName1,'__')"/>
				</xsl:if>
			</xsl:variable>
			<xsl:variable name="dsNodeCnt" select="count(//RAD_DATASOURCES[DATASRC_NAME=$datasrcName and DATASRC_ALIAS =$dsAlias])"/>
			<xsl:variable name="dsNode" select="//RAD_DATASOURCES[DATASRC_NAME=$datasrcName and DATASRC_ALIAS =$dsAlias]"/>
			<!-- Sundar ends here-->
			<xsl:attribute name="SCREEN">
				<xsl:value-of select="SCREEN_NAME"/>
			</xsl:attribute>
			<xsl:attribute name="TABPAGE">
				<xsl:value-of select="TAB_NAME"/>
			</xsl:attribute>
			<xsl:attribute name="TYPE">
				<!--  sundar May 5...for alias integration -->
				<xsl:if test="$dsNodeCnt &lt; 1">
					<xsl:text>Single Entry</xsl:text>
				</xsl:if>
				<xsl:if test="$dsNode/RELATION_TYPE = '1'">
					<xsl:text>Single Entry</xsl:text>
				</xsl:if>
				<xsl:if test="$dsNode/RELATION_TYPE = 'N'">
					<xsl:text>Multiple Entry</xsl:text>
				</xsl:if>
			</xsl:attribute>
			<xsl:if test="VIEW_TYPE = 'Single Entry'">
				<xsl:attribute name="VIEW">
					<xsl:value-of select="VIEW_TYPE"/>
				</xsl:attribute>
			</xsl:if>
			<!-- Binson for template -->
			<xsl:if test="$dsNode/RELATION_TYPE = 'N'">
				<xsl:if test="normalize-space(SECTION) != ''">
					<xsl:attribute name="SECTION">
						<xsl:value-of select="SECTION"/>
					</xsl:attribute>
				</xsl:if>
				<xsl:if test="normalize-space(PARTITION) != ''">
					<xsl:attribute name="PARTITION">
						<xsl:value-of select="PARTITION"/>
					</xsl:attribute>
				</xsl:if>
				<xsl:if test="normalize-space(SUBPARTITION) != ''">
					<xsl:attribute name="SUBPARTITION">
						<xsl:value-of select="SUBPARTITION"/>
					</xsl:attribute>
				</xsl:if>
			</xsl:if>
			<xsl:variable name="screenPosition" select="SCREEN_POSITION"/>
			<xsl:if test="$screenPosition != 'template' ">
				<xsl:attribute name="ROW">
					<xsl:value-of select="ROWS"/>
				</xsl:attribute>
				<xsl:attribute name="COL">
					<xsl:value-of select="COLS"/>
				</xsl:attribute>
			</xsl:if>
			<!-- Binson for template - End -->
			<ID>
				<xsl:value-of select="BLOCK_ID"/>
			</ID>
			<LABEL>
				<xsl:value-of select="BLOCK_TITLE"/>
			</LABEL>
			<ABS_POS>
				<xsl:value-of select="BLK_ABSPOS"/>
			</ABS_POS>
			<WIDTH>
				<xsl:value-of select="BLK_WIDTH"/>
			</WIDTH>
			<HEIGHT>
				<xsl:value-of select="BLK_HEIGHT"/>
			</HEIGHT>
			<DATAPAGESIZE>
			</DATAPAGESIZE>
			<!--  sundar May 5...for alias integration -->
			<xsl:if test="$datasrcName != ''">
				<xsl:if test="$dsNode/RELATION_TYPE = 'N'">
					<xsl:if test="normalize-space($dsAlias) != ''">
						<DBT>
							<xsl:value-of select="$datasrcName1"/>
						</DBT>
					</xsl:if>
					<xsl:if test="normalize-space($dsAlias) = ''">
						<DBT>
							<xsl:value-of select="$datasrcName"/>
						</DBT>
					</xsl:if>
				</xsl:if>
				<xsl:if test="$dsNode/RELATION_TYPE != 'N'">
					<xsl:if test="normalize-space($dsAlias) != ''">
						<DATASRC>
							<xsl:value-of select="$datasrcName1"/>
						</DATASRC>
					</xsl:if>
					<xsl:if test="normalize-space($dsAlias) = ''">
						<DATASRC>
							<xsl:value-of select="$datasrcName"/>
						</DATASRC>
					</xsl:if>
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
			<xsl:if test="VIEW_TYPE = 'Multiple Entry' and READ_ONLY_BLK = 'Y'">
				<READ_ONLY>
					<xsl:text>-1</xsl:text>
				</READ_ONLY>
			</xsl:if>
			<REQUIRED>
				<xsl:if test="$dsNode/IS_MANDATORY = 'Y'">
					<xsl:text>-1</xsl:text>
				</xsl:if>
				<xsl:if test="$dsNode/IS_MANDATORY = 'N'">
					<xsl:text>0</xsl:text>
				</xsl:if>
			</REQUIRED>
			<xsl:apply-templates select="./RAD_BLK_EVENTS"/>
			<xsl:apply-templates select="./RAD_BLK_FIELDS[FIELD_TYPE != 'LABEL']"/>
		</BLOCK>
	</xsl:template>
	<xsl:include href="GlobalFieldInput.xsl"/>
	<xsl:template match="RAD_BLK_EVENTS">
		<EVENT>
			<NAME>
				<xsl:value-of select="EVENT_NAME"/>
			</NAME>
			<FUNCTION>
				<xsl:value-of select="EVENT_FUNCTION"/>
			</FUNCTION>
		</EVENT>
	</xsl:template>
	<xsl:template match="RAD_BLK_FIELDS">
		<xsl:variable name="datasrcName1" select="../DATASRC_NAME"/>
		<xsl:variable name="datasrcName">
			<xsl:if test="contains($datasrcName1,'__')">
				<xsl:value-of select="substring-before($datasrcName1,'__')"/>
			</xsl:if>
			<xsl:if test="not(contains($datasrcName1,'__'))">
				<xsl:value-of select="$datasrcName1"/>
			</xsl:if>
		</xsl:variable>
		<xsl:variable name="dsAlias">
			<xsl:if test="contains($datasrcName1,'__')">
				<xsl:value-of select="substring-after($datasrcName1,'__')"/>
			</xsl:if>
		</xsl:variable>
		<xsl:variable name="dsNodeCnt" select="count(//RAD_DATASOURCES[DATASRC_NAME=$datasrcName and DATASRC_ALIAS =$dsAlias])"/>
		<xsl:variable name="dsNode" select="//RAD_DATASOURCES[DATASRC_NAME=$datasrcName and DATASRC_ALIAS =$dsAlias]"/>
		<xsl:variable name="Identifier" select="@Identifier"/>
		<xsl:variable name="relatedFld" select="//RAD_FIELDS[@Identifier=$Identifier]/RELATED_FIELD"/>
		<xsl:variable name="lovName" select="//RAD_FIELDS[@Identifier=$Identifier]/LOV_NAME"/>
		<xsl:variable name="relation" select="$dsNode/RELATION_TYPE"/>
		<xsl:variable name="fld" select="FIELD_NAME"/>
		<xsl:variable name="blkId" select="../BLOCK_ID"/>
		<xsl:variable name="scrId" select="../SCREEN_NAME"/>
		<xsl:variable name="fieldInFldset" select="count(//RAD_DATA_BLOCKS[BLOCK_ID = $blkId and SCREEN_NAME = $scrId]//RAD_FIELDSET_ME[FLD_NAME = $fld and CHK_INCLUDE = 'Y'])"/>
		<xsl:if test="$fieldInFldset = 0">
			<xsl:variable name="subscrOrCallformLaunchFld" select="count(RAD_FIELD_EVENTS[LAUNCH_SUBSCREEN = 'Y' or LAUNCH_CALLFORM = 'Y'])"/>
			<xsl:if test="$subscrOrCallformLaunchFld = 0">
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
						<xsl:when test="FIELD_TYPE = 'FIELDSET'">
							<xsl:attribute name="TABPAGE">
								<xsl:value-of select="TAB_NAME"/>
							</xsl:attribute>
							<!-- Commented By Murali Start -->
							<!--
            <xsl:attribute name="ROW">
              <xsl:value-of select="FIELD_ROW"/>
            </xsl:attribute>
            <xsl:attribute name="COL">
              <xsl:value-of select="FIELD_COLUMN"/>
            </xsl:attribute>
            -->
							<!-- Commented By Murali End -->
							<xsl:attribute name="TYPE">
								<xsl:text>FIELDSET</xsl:text>
							</xsl:attribute>
							<!-- Added By Murali for Template -->
							<xsl:if test="normalize-space(SECTION_NAME) != ''">
								<xsl:attribute name="SECTION">
									<xsl:value-of select="SECTION_NAME"/>
								</xsl:attribute>
							</xsl:if>
							<xsl:if test="normalize-space(PARTITION_NAME) != ''">
								<xsl:attribute name="PARTITION">
									<xsl:value-of select="PARTITION_NAME"/>
								</xsl:attribute>
							</xsl:if>
							<!-- Added By Murali for Template End-->
							<!-- Added By Binson for Sub Partition - Start-->
							<!-- <xsl:if test="normalize-space(SUBPARTITION_NAME) != ''">
                <xsl:attribute name="SUBPARTITION">
                  <xsl:value-of select="SUBPARTITION_NAME"/>
                </xsl:attribute>
            </xsl:if>-->
							<!-- Added By Binson for Sub Partition - End -->
							<xsl:variable name="fldsetName" select="FIELD_NAME"/>
							<!-- TODO: Added by murali for template, adding Index attribute to UI xml-->
							<xsl:variable name="fieldSetIndex" select="//RAD_FIELD_POSITION_FIELDSETS[FIELD_POS_FIELDSET_NAME = $fldsetName]/FIELDSET_INDEX"/>
							<xsl:attribute name="INDEX">
								<xsl:value-of select="$fieldSetIndex"/>
							</xsl:attribute>
							<NAME><xsl:value-of select="$fldsetName"/></NAME>
							<ID><xsl:value-of select="@Identifier"/></ID>
							<TYPE><xsl:value-of select="FIELD_TYPE"/></TYPE>
							<xsl:if test="normalize-space(LABEL_CODE) != ''">
								<LABEL><xsl:value-of select="LABEL_CODE"/></LABEL>
							</xsl:if>
							<!-- TODO:Added By Murali for template -->
							<xsl:if test="normalize-space(LABEL_CODE) = ''">
								<LABEL></LABEL>
							</xsl:if>
							<HREQ>
								<xsl:if test="//RAD_FIELDS[@Identifier=$Identifier]/HREQ = 'N'">
									<xsl:text>0</xsl:text>
								</xsl:if>
								<xsl:if test="//RAD_FIELDS[@Identifier=$Identifier]/HREQ = 'Y'">
									<xsl:text>-1</xsl:text>
								</xsl:if>
							</HREQ>
							<!-- Added By Murali End -->
							<HIDDEN>
								<xsl:if test="HIDE = 'N'">
									<xsl:text>0</xsl:text>
								</xsl:if>
								<xsl:if test="HIDE = 'Y'">
									<xsl:text>-1</xsl:text>
								</xsl:if>
							</HIDDEN>
							<WIDTH><xsl:value-of select="WIDTH"/></WIDTH>
							<HEIGHT><xsl:value-of select="HEIGHT"/></HEIGHT>
							<COLSPAN><xsl:value-of select="RAD_FIELDSET_SE/COLSPAN"/></COLSPAN>
							<ABS_POS><xsl:value-of select="ABS_POS"/></ABS_POS>
							<xsl:for-each select="RAD_FIELDSET_ME[FLD_SET_NAME = $fldsetName and CHK_INCLUDE = 'Y']">
								<xsl:variable name="fldInFldset" select="FLD_NAME"/>
								<xsl:apply-templates select="//RAD_DATA_BLOCKS[BLOCK_ID = $blkId and SCREEN_NAME = $scrId]/RAD_BLK_FIELDS[FIELD_NAME = $fldInFldset]" mode="FieldsetFields">
									<xsl:with-param name="fldsetFld" select="$fldInFldset"/>
									<xsl:with-param name="fldsetName" select="$fldsetName"/>
								</xsl:apply-templates>
							</xsl:for-each>
						</xsl:when>
						<xsl:otherwise>
							<!-- Added By Murali for Template -->
							<xsl:if test="normalize-space(SECTION_NAME) != ''">
								<xsl:attribute name="SECTION">
									<xsl:value-of select="SECTION_NAME"/>
								</xsl:attribute>
							</xsl:if>
							<xsl:if test="normalize-space(PARTITION_NAME) != ''">
								<xsl:attribute name="PARTITION">
									<xsl:value-of select="PARTITION_NAME"/>
								</xsl:attribute>
							</xsl:if>
							<!-- Added By Murali for Template End-->
							<!-- Added By Binson for Sub Partition - Start-->
							<xsl:if test="normalize-space(SUBPARTITION_NAME) != ''">
								<xsl:attribute name="SUBPARTITION">
									<xsl:value-of select="SUBPARTITION_NAME"/>
								</xsl:attribute>
							</xsl:if>
							<!-- Added By Binson for Sub Partition - End-->
							<xsl:attribute name="TABPAGE">
								<xsl:value-of select="TAB_NAME"/>
							</xsl:attribute>
							<!-- Commented By Murali Start-->
							<!--
            <xsl:attribute name="ROW">
              <xsl:value-of select="FIELD_ROW"/>
            </xsl:attribute>
            <xsl:attribute name="COL">
              <xsl:value-of select="FIELD_COLUMN"/>
            </xsl:attribute>
            -->
							<!-- if it is a single entry block include query col and result col-->
							<!-- Commented By Murali Start-->
							<!--
            <xsl:if test="$relation = '1'">
              <xsl:attribute name="QRY_COL">
                <xsl:value-of select="QUERY_COL"/>
              </xsl:attribute>
              <xsl:attribute name="RSLT_COL">
                <xsl:value-of select="RESULT_COL"/>
              </xsl:attribute>
            </xsl:if>
            -->
							<!-- Commented By Murali End-->
							<NAME>
								<xsl:value-of select="FIELD_NAME"/>
							</NAME>
							<ID>
								<xsl:variable name="funcId" select="//RAD_FUNCTIONS/FUNCTION_ID"/>
								<xsl:value-of select="@Identifier"/>
							</ID>
							<TYPE>
								<xsl:value-of select="FIELD_TYPE"/>
							</TYPE>
							<ROWS>
								<xsl:value-of select="TXTAREA_ROWS"/>
							</ROWS>
							<COLS>
								<xsl:value-of select="TXTAREA_COLS"/>
							</COLS>
							<!--            
            <xsl:if test="normalize-space(LABEL_CODE) != ''">
              <LABEL>
                <xsl:value-of select="LABEL_CODE"/>
              </LABEL>
            </xsl:if> -->
							<LABEL>
								<xsl:if test="normalize-space(LABEL_CODE) != ''">
									<xsl:value-of select="LABEL_CODE"/>
								</xsl:if>
								<xsl:if test="normalize-space(LABEL_CODE) = ''">
									<xsl:if test="normalize-space(//RAD_FIELDS[@Identifier=$Identifier]/LABEL_LINK) != ''">
										<xsl:variable name="labelLink" select="//RAD_FIELDS[@Identifier=$Identifier]/LABEL_LINK"/>
										<xsl:value-of select="//RAD_FIELDS[FIELD_NAME = $labelLink]/LABEL_CODE"/>
									</xsl:if>
								</xsl:if>
							</LABEL>
							<xsl:if test="normalize-space(//RAD_FIELDS[@Identifier=$Identifier]/LABEL_LINK) != ''">
								<LABEL_LINK>
									<xsl:value-of select="//RAD_FIELDS[@Identifier=$Identifier]/LABEL_LINK"/>
								</LABEL_LINK>
							</xsl:if>
							<SHOWIN>
								<xsl:value-of select="SHOW_IN"/>
							</SHOWIN>
							<!--       Sundar commented on jul 18.. Tabindex tag should not appear for Multiple entry field
            <xsl:if test="normalize-space(TABINDEX) != ''">
              <TABINDEX><xsl:value-of select="TABINDEX"/></TABINDEX>              
            </xsl:if> -->
							<!--            <xsl:if test="FIELD_TYPE != 'CHECKBOX'"> -->
							<REQUIRED>
								<xsl:if test="//RAD_FIELDS[@Identifier=$Identifier]/REQUIRED = 'N'">
									<xsl:text>0</xsl:text>
								</xsl:if>
								<xsl:if test="//RAD_FIELDS[@Identifier=$Identifier]/REQUIRED = 'Y'">
									<xsl:text>-1</xsl:text>
								</xsl:if>
							</REQUIRED>
							<!--            </xsl:if> -->
							<MAXLENGTH>
								<xsl:value-of select="MAX_LENGTH"/>
							</MAXLENGTH>
							<AUTHSCRN>0</AUTHSCRN>
							<xsl:if test="//RAD_FIELDS[@Identifier=$Identifier]/MASK != ''">
								<MASK>
									<xsl:value-of select="//RAD_FIELDS[@Identifier=$Identifier]/MASK"/>
								</MASK>
							</xsl:if>
							<READ_ONLY>
								<xsl:if test="READ_ONLY = 'N'">
									<xsl:text>0</xsl:text>
								</xsl:if>
								<xsl:if test="READ_ONLY = 'Y'">
									<xsl:text>-1</xsl:text>
								</xsl:if>
								<!--            <xsl:value-of select="READ_ONLY"/> -->
							</READ_ONLY>
							<xsl:if test="//RAD_FIELDS[@Identifier=$Identifier]/INPUT_ONLY_BY_LOV = 'Y'">
								<READ_ONLY>
									<xsl:text>-1</xsl:text>
								</READ_ONLY>
								<INPUT_LOV>
									<xsl:text>-1</xsl:text>
								</INPUT_LOV>
							</xsl:if>
							<DISABLED>
								<xsl:if test="DISABLED = 'N'">
									<xsl:text>0</xsl:text>
								</xsl:if>
								<xsl:if test="DISABLED = 'Y'">
									<xsl:text>-1</xsl:text>
								</xsl:if>
								<!--            <xsl:value-of select="DISABLED"/> -->
							</DISABLED>
							<HIDDEN>
								<xsl:if test="HIDE = 'N'">
									<xsl:text>0</xsl:text>
								</xsl:if>
								<xsl:if test="HIDE = 'Y'">
									<xsl:text>-1</xsl:text>
								</xsl:if>
							</HIDDEN>
							<!-- added by sundar for uppercase -->
							<xsl:if test="CHK_UPPERCASE = 'Y'">
								<CASE>
									<xsl:text>UPPER</xsl:text>
								</CASE>
							</xsl:if>
							<!-- sundar ends here -->
							<xsl:if test="$relatedFld != ''">
								<RELATED_FIELD>
									<xsl:value-of select="$relatedFld"/>
								</RELATED_FIELD>
							</xsl:if>
							<xsl:if test="normalize-space(MIN_VAL) != ''">
								<MIN_VAL>
									<xsl:value-of select="normalize-space(MIN_VAL)"/>
								</MIN_VAL>
							</xsl:if>
							<xsl:if test="normalize-space(MAX_VAL) != ''">
								<MAX_VAL>
									<xsl:value-of select="normalize-space(MAX_VAL)"/>
								</MAX_VAL>
							</xsl:if>
							<xsl:if test="normalize-space(MAX_DECIMAL) != ''">
								<MAX_DECIMAL>
									<xsl:value-of select="normalize-space(MAX_DECIMAL)"/>
								</MAX_DECIMAL>
							</xsl:if>
							<xsl:if test="normalize-space(AMENDABLE) = 'Y'">
								<AMENDABLE>-1</AMENDABLE>
							</xsl:if>
							<xsl:if test="normalize-space(SUBSYSTEM_DEPENDANT) = 'Y'">
								<SUBSYSTEM>-1</SUBSYSTEM>
							</xsl:if>
							<xsl:if test="normalize-space(//RAD_FIELDS[@Identifier=$Identifier]/CALENDAR_TEXT) = 'Y'">
								<CALENDARTEXT>-1</CALENDARTEXT>
							</xsl:if>
							<DTYPE>
								<xsl:value-of select="//RAD_FIELDS[@Identifier=$Identifier]/DATATYPE"/>
							</DTYPE>
							<xsl:if test="FIELD_TYPE!='FIELDSET'">
								<SIZE>
									<xsl:value-of select="FIELD_SIZE"/>
								</SIZE>
							</xsl:if>
							<WIDTH>
								<xsl:value-of select="WIDTH"/>
							</WIDTH>
							<xsl:if test="FIELD_TYPE='FIELDSET'">
								<HEIGHT>
									<xsl:value-of select="HEIGHT"/>
								</HEIGHT>
							</xsl:if>
							<CHECKED>
								<xsl:if test="CHECKED = 'N'">
									<xsl:text>0</xsl:text>
								</xsl:if>
								<xsl:if test="CHECKED = 'Y'">
									<xsl:text>-1</xsl:text>
								</xsl:if>
								<!--            <xsl:value-of select="CHECKED"/> -->
							</CHECKED>
							<xsl:if test="DBC != ''">
								<DBC>
									<xsl:value-of select="DBC"/>
								</DBC>
							</xsl:if>
							<!--            <xsl:if test="normalize-space(IMG_SRC) != ''"> -->
							<xsl:if test="FIELD_TYPE = 'IMG'">
								<SRC>
									<xsl:value-of select="IMG_SRC"/>
								</SRC>
								<ALT>
									<xsl:value-of select="ALT_IMAGE"/>
								</ALT>
							</xsl:if>
							<!--            </xsl:if> -->
							<xsl:apply-templates select="//RAD_FIELDS[@Identifier=$Identifier]/RAD_FIELD_OPTIONS"/>
							<!-- IF THIS FIELD IS A UI FIELD i.e DOESNT HAVE A DATASRC THEN... -->
							<xsl:if test="($dsNodeCnt &lt; 1) or ($relation = 'N' and ../VIEW_TYPE='Single Entry')">
								<ABS_POS>
									<xsl:value-of select="ABS_POS"/>
								</ABS_POS>
								<!--              <xsl:if test="normalize-space(IMG_SRC) != ''">
                <SRC>
                  <xsl:value-of select="IMG_SRC"/>
                </SRC>
                <ALT>
                  <xsl:value-of select="ALT_IMAGE"/>
                </ALT>
              </xsl:if> -->
							</xsl:if>
							<xsl:if test="FIELD_TYPE != 'CHECKBOX'">
								<xsl:if test="//RAD_FIELDS[@Identifier=$Identifier]/DEFAULT_VALUE != ''">
									<!--              <DEF_VALUE><xsl:value-of select="//RAD_FIELDS[@Identifier=$Identifier]/DEFAULT_VALUE"/></DEF_VALUE> -->
									<VALUE><xsl:value-of select="//RAD_FIELDS[@Identifier=$Identifier]/DEFAULT_VALUE"/></VALUE>
								</xsl:if>
							</xsl:if>
							<xsl:if test="FIELD_TYPE = 'CHECKBOX'">
								<xsl:if test="CHECKED = 'Y'">
									<xsl:if test="count(//RAD_FIELDS[@Identifier=$Identifier]/RAD_FIELD_CUSTOM_ATTRS) &gt; 0">
										<VALUE><xsl:value-of select="//RAD_FIELDS[@Identifier=$Identifier]/RAD_FIELD_CUSTOM_ATTRS[ATTR_NAME = 'ON']/ATTR_VALUE"/></VALUE>
									</xsl:if>
									<xsl:if test="count(//RAD_FIELDS[@Identifier=$Identifier]/RAD_FIELD_CUSTOM_ATTRS) = 0">
										<VALUE><xsl:text>Y</xsl:text></VALUE>
									</xsl:if>
								</xsl:if>
								<xsl:if test="CHECKED = 'N'">
									<xsl:if test="count(//RAD_FIELDS[@Identifier=$Identifier]/RAD_FIELD_CUSTOM_ATTRS) &gt; 0">
										<VALUE><xsl:value-of select="//RAD_FIELDS[@Identifier=$Identifier]/RAD_FIELD_CUSTOM_ATTRS[ATTR_NAME = 'OFF']/ATTR_VALUE"/></VALUE>
									</xsl:if>
									<xsl:if test="count(//RAD_FIELDS[@Identifier=$Identifier]/RAD_FIELD_CUSTOM_ATTRS) = 0">
										<VALUE><xsl:text>N</xsl:text></VALUE>
									</xsl:if>
								</xsl:if>
							</xsl:if>
							<xsl:variable name="dataSrcNode" select="//RAD_DATASOURCES[RAD_FIELDS[@Identifier=$Identifier]]"/>
							<xsl:variable name="aliasName" select="$dataSrcNode/DATASRC_ALIAS"/>
							<!--            
            <xsl:if test="$dataSrcNode/RELATION_TYPE = 'N' and ../VIEW_TYPE='Single Entry'">
              <xsl:if test="normalize-space(DBT) != '' and normalize-space(DBC)!=''">
                <xsl:if test="normalize-space($aliasName) !=''">
                  <DBT>
                    <xsl:value-of select="concat(DBT,'__',$aliasName)"/>
                  </DBT>
                </xsl:if>
                <xsl:if test="normalize-space($aliasName) =''">
                  <DBT>
                    <xsl:value-of select="DBT"/>
                  </DBT>
                </xsl:if>
              </xsl:if>
            </xsl:if> -->
							<!--            <xsl:if test="$relation = '1'">  -->
							<xsl:if test="($dataSrcNode/RELATION_TYPE = '1') or ($dataSrcNode/RELATION_TYPE = 'N' and ../VIEW_TYPE = 'Single Entry')">
								<xsl:if test="normalize-space(ACCESSKEY_CODE) != ''">
									<ACCESSKEY>
										<xsl:value-of select="ACCESSKEY_CODE"/>
									</ACCESSKEY>
								</xsl:if>
								<!-- sundar on jul 18 for tabindex-->
								<xsl:if test="normalize-space(TABINDEX) != ''">
									<TABINDEX><xsl:value-of select="TABINDEX"/></TABINDEX>
								</xsl:if>
								<xsl:if test="FIELD_TYPE = 'SELECT'">
									<xsl:if test="//RAD_FIELDS[@Identifier=$Identifier]/SELECT_MULTIPLE = 'Y'">
										<MULTIPLE>
											<xsl:text>-1</xsl:text>
										</MULTIPLE>
									</xsl:if>
									<xsl:if test="//RAD_FIELDS[@Identifier=$Identifier]/SELECT_MULTIPLE = 'N'">
										<MULTIPLE>
											<xsl:text>0</xsl:text>
										</MULTIPLE>
									</xsl:if>
								</xsl:if>
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
								<!-- sundar commented since we're handling the radio buttons differently 
              <xsl:if test="VALUE != ''">
                <VALUE>
                  <xsl:value-of select="VALUE"/>
                </VALUE>
              </xsl:if>
       sundar ends here -->
								<xsl:if test="//RAD_FIELDS[@Identifier=$Identifier]/MASK != ''">
									<MASK><xsl:value-of select="//RAD_FIELDS[@Identifier=$Identifier]/MASK"/></MASK>
								</xsl:if>
								<ABS_POS>
									<xsl:value-of select="ABS_POS"/>
								</ABS_POS>
								<xsl:if test="normalize-space(DBT) != '' and normalize-space(DBC) != ''">
									<!--  commented on Jul 9...since DBT is coming as DBT__alias__alias 
                <xsl:if test="normalize-space($aliasName) !=''">
                  <DBT>
                    <xsl:value-of select="concat(DBT,'__',$aliasName)"/>
                  </DBT>
                </xsl:if>
                <xsl:if test="normalize-space($aliasName) =''">
                  <DBT>
                    <xsl:value-of select="DBT"/>
                  </DBT>
                </xsl:if> -->
									<DBT>
										<xsl:value-of select="DBT"/>
									</DBT>
								</xsl:if>
								<!--
            <xsl:if test="normalize-space(DBC) != ''">
                <xsl:variable name="finalDsName" select = "//RAD_FIELDS[@Identifier=$Identifier]/DATASOURCE"/>
                <xsl:variable name="finalDbtNode" select="//RAD_DATASOURCES[DATASRC_NAME = $finalDsName]"/>
                <xsl:variable name="finalDBT">
                    <xsl:if test="count($finalDbtNode/DATASRC_ALIAS) = 0 or $finalDbtNode/DATASRC_ALIAS = ''">
                        <xsl:value-of select="$finalDsName"/>
                    </xsl:if>
                    <xsl:if test="count($finalDbtNode/DATASRC_ALIAS) &gt; 0 and $finalDbtNode/DATASRC_ALIAS != ''">
                        <xsl:value-of select="concat($finalDsName,'__',$finalDbtNode/DATASRC_ALIAS)"/>
                    </xsl:if>
                </xsl:variable>
                <xsl:if test="($dataSrcNode/RELATION_TYPE = '1') or ($dataSrcNode/RELATION_TYPE = 'N' and ../VIEW_TYPE = 'Single Entry')">
                    <DBT>
                        <xsl:value-of select="$finalDBT"/>
                    </DBT>
                </xsl:if>
            </xsl:if>
-->
								<!--              <xsl:if test="normalize-space(IMG_SRC) != ''">
                <SRC>
                  <xsl:value-of select="IMG_SRC"/>
                </SRC>
                <ALT>
                  <xsl:value-of select="ALT_IMAGE"/>
                </ALT>
              </xsl:if> -->
								<ROWS>
									<xsl:value-of select="TXTAREA_ROWS"/>
								</ROWS>
								<COLS>
									<xsl:value-of select="TXTAREA_COLS"/>
								</COLS>
								<HEIGHT>
									<xsl:value-of select="HEIGHT"/>
								</HEIGHT>
								<TEXT-ALIGN>
									<xsl:value-of select="TEXT_ALIGN"/>
								</TEXT-ALIGN>
								<UIBLOCK>
								</UIBLOCK>
							</xsl:if>
						</xsl:otherwise>
					</xsl:choose>
					<xsl:if test="count(//RAD_LOVS[LOV_NAME=$lovName]) &gt; 0">
						<LOV>
							<xsl:apply-templates select="//RAD_LOVS[LOV_NAME=$lovName]">
								<xsl:with-param name="Identifier" select="$Identifier"/>
							</xsl:apply-templates>
							<xsl:apply-templates select="//RAD_FIELDS[@Identifier=$Identifier]/RAD_FIELD_LOV_OVERRIDES"/>
						</LOV>
					</xsl:if>
					<xsl:apply-templates select="RAD_FIELD_EVENTS"/>
					<xsl:if test="count(//RAD_FIELDS[@Identifier=$Identifier]/RAD_FIELD_CUSTOM_ATTRS) &gt; 0">
						<CUSTOM>
							<xsl:apply-templates select="//RAD_FIELDS[@Identifier=$Identifier]/RAD_FIELD_CUSTOM_ATTRS"/>
							<!--Anjali..To include Custom Attributes-->
						</CUSTOM>
					</xsl:if>
					<xsl:apply-templates select="//RAD_FIELDS[@Identifier=$Identifier]/RAD_FIELD_POPUPEDITS"/>
				</FIELD>
			</xsl:if>
		</xsl:if>
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
	<xsl:template match="RAD_FIELD_EVENTS">
		<EVENT>
			<NAME>
				<xsl:value-of select="EVENT_NAME"/>
			</NAME>
			<FUNCTION>
				<xsl:value-of select="FUNCTION_NAME"/>
			</FUNCTION>
		</EVENT>
	</xsl:template>
	<xsl:template match="RAD_LOVS">
		<xsl:param name="Identifier" select="."/>
		<NAME>
			<xsl:value-of select="LOV_NAME"/>
		</NAME>
		<TITLE>
			<xsl:value-of select="FORM_TITLE"/>
		</TITLE>
		<!--
    <FORM_NAME>
      <xsl:value-of select="FORM_NAME"/>
    </FORM_NAME> -->
		<!-- if the lov has been overriden then get overridden values of col heading and redn fld labels -->
		<xsl:choose>
			<xsl:when test="count(//RAD_FIELDS[@Identifier=$Identifier]/RAD_FIELD_LOV_OVERRIDES) &gt; 0">
				<xsl:if test="//RAD_FIELDS[@Identifier=$Identifier]/RAD_FIELD_LOV_OVERRIDES/OVERRIDE_COL_HEADING = 'N'">
					<COL_HEADING>
						<xsl:value-of select="normalize-space(COLUMN_HEADING)"/>
					</COL_HEADING>
				</xsl:if>
				<xsl:if test="//RAD_FIELDS[@Identifier=$Identifier]/RAD_FIELD_LOV_OVERRIDES/OVERRIDE_REDC_FLD_LABELS = 'N'">
					<REDUCTION_FLD_LABELS>
						<xsl:value-of select="normalize-space(REDUCTION_FLD_LABELS)"/>
					</REDUCTION_FLD_LABELS>
				</xsl:if>
				<!--
        <xsl:if test="//RAD_FIELDS[@Identifier=$Identifier]/RAD_FIELD_LOV_OVERRIDES/OVERRIDE_RETURN_FIELDS = 'N'">
          <RET_FLDS>
            <xsl:value-of select="normalize-space(RET_FLDS)"/>
          </RET_FLDS>
        </xsl:if>
        <xsl:if test="//RAD_FIELDS[@Identifier=$Identifier]/RAD_FIELD_LOV_OVERRIDES/OVERRIDE_RETURN_FIELDS = 'N'">
          <BIND_VARS>
            <xsl:value-of select="normalize-space(BIND_VARS)"/>
          </BIND_VARS>
        </xsl:if>
        -->
			</xsl:when>
			<xsl:otherwise>
				<COL_HEADING>
					<xsl:value-of select="normalize-space(COLUMN_HEADING)"/>
				</COL_HEADING>
				<REDUCTION_FLD_LABELS>
					<xsl:value-of select="normalize-space(REDUCTION_FLD_LABELS)"/>
				</REDUCTION_FLD_LABELS>
				<!--
        <RET_FLDS>
          <xsl:value-of select="normalize-space(RET_FLDS)"/>
        </RET_FLDS>
        <xsl:if test="normalize-space(BIND_VARS) != ''">
          <BIND_VARS>
            <xsl:value-of select="normalize-space(BIND_VARS)"/>
          </BIND_VARS>
        </xsl:if>
        -->
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<xsl:template match="RAD_FIELD_LOV_OVERRIDES">
		<xsl:if test="OVERRIDE_RETURN_FIELDS = 'Y'">
			<RET_FLDS>
				<xsl:value-of select="normalize-space(RETURN_FIELDS)"/><xsl:text>~</xsl:text>
			</RET_FLDS>
		</xsl:if>
		<xsl:if test="OVERRIDE_COL_HEADING = 'Y'">
			<COL_HEADING>
				<xsl:value-of select="normalize-space(COLUMN_HEADING)"/>
			</COL_HEADING>
		</xsl:if>
		<xsl:if test="OVERRIDE_REDC_FLD_LABELS = 'Y'">
			<REDUCTION_FLD_LABELS>
				<xsl:value-of select="normalize-space(REDC_FLD_LABELS)"/>
			</REDUCTION_FLD_LABELS>
		</xsl:if>
	</xsl:template>
	<xsl:template match="RAD_FIELD_CUSTOM_ATTRS">
		<xsl:variable name="attrName" select="ATTR_NAME"/>
		<xsl:element name="{$attrName}">
			<xsl:value-of select="ATTR_VALUE"/>
		</xsl:element>
	</xsl:template>
	<xsl:template match="RAD_BLK_FIELDS" mode="FieldsetFields">
		<xsl:param name="fldsetFld" select="."/>
		<xsl:param name="fldsetName" select="."/>
		<xsl:variable name="datasrcName1" select="../DATASRC_NAME"/>
		<xsl:variable name="datasrcName">
			<xsl:if test="contains($datasrcName1,'__')">
				<xsl:value-of select="substring-before($datasrcName1,'__')"/>
			</xsl:if>
			<xsl:if test="not(contains($datasrcName1,'__'))">
				<xsl:value-of select="$datasrcName1"/>
			</xsl:if>
		</xsl:variable>
		<xsl:variable name="dsAlias">
			<xsl:if test="contains($datasrcName1,'__')">
				<xsl:value-of select="substring-after($datasrcName1,'__')"/>
			</xsl:if>
		</xsl:variable>
		<xsl:variable name="dsNodeCnt" select="count(//RAD_DATASOURCES[DATASRC_NAME=$datasrcName and DATASRC_ALIAS =$dsAlias])"/>
		<xsl:variable name="dsNode" select="//RAD_DATASOURCES[DATASRC_NAME=$datasrcName and DATASRC_ALIAS =$dsAlias]"/>
		<xsl:variable name="Identifier" select="@Identifier"/>
		<xsl:variable name="relatedFld" select="//RAD_FIELDS[@Identifier=$Identifier]/RELATED_FIELD"/>
		<xsl:variable name="lovName" select="//RAD_FIELDS[@Identifier=$Identifier]/LOV_NAME"/>
		<xsl:variable name="relation" select="$dsNode/RELATION_TYPE"/>
		<xsl:variable name="subscrOrCallformLaunchFld" select="count(RAD_FIELD_EVENTS[LAUNCH_SUBSCREEN = 'Y' or LAUNCH_CALLFORM = 'Y'])"/>
		<xsl:if test="$subscrOrCallformLaunchFld = 0">
			<FIELD>
				<!--TODO: Added By Murali for template, Field Index -->
				<xsl:variable name="tempFieldIndex" select="//RAD_FIELD_POSITION_FIELDS[FIELD_POS_FIELD_NAME = $fldsetFld and FLD_FIELDSET_ID = $fldsetName]/FIELD_INDEX"/>
				<xsl:variable name="fieldIndex">
					<xsl:if test="normalize-space($tempFieldIndex) =  '' ">
						<xsl:value-of select="//RAD_FIELD_POSITION_SUB_PART_FIELDS[FIELD_POS_FIELD_NAME = $fldsetFld and FLD_FIELDSET_ID = $fldsetName]/FIELD_INDEX"/>
					</xsl:if>
					<xsl:if test="normalize-space($tempFieldIndex) !=  '' ">
						<xsl:value-of select="//RAD_FIELD_POSITION_FIELDS[FIELD_POS_FIELD_NAME = $fldsetFld and FLD_FIELDSET_ID = $fldsetName]/FIELD_INDEX"/>
					</xsl:if>
				</xsl:variable>
				<xsl:attribute name="INDEX">
					<xsl:value-of select="$fieldIndex"/>
				</xsl:attribute>
				<xsl:choose>
					<xsl:when test="FIELD_TYPE = 'TEXT'">
						<xsl:call-template name="TextType">
							<xsl:with-param name="relation" select="$relation"/>
							<xsl:with-param name="currNode" select="."/>
							<xsl:with-param name="viewType" select="../VIEW_TYPE"/>
							<xsl:with-param name="fieldSetFlag" select="'Y'"/>
						</xsl:call-template>
					</xsl:when>
					<xsl:when test="FIELD_TYPE = 'RADIO'">
						<xsl:call-template name="RadioType">
							<xsl:with-param name="relation" select="$relation"/>
							<xsl:with-param name="currNode" select="."/>
							<xsl:with-param name="viewType" select="../VIEW_TYPE"/>
							<xsl:with-param name="fieldSetFlag" select="'Y'"/>
						</xsl:call-template>
					</xsl:when>
					<xsl:when test="FIELD_TYPE = 'HIDDEN'">
						<xsl:call-template name="HiddenType">
							<xsl:with-param name="relation" select="$relation"/>
							<xsl:with-param name="currNode" select="."/>
							<xsl:with-param name="viewType" select="../VIEW_TYPE"/>
							<xsl:with-param name="fieldSetFlag" select="'Y'"/>
						</xsl:call-template>
					</xsl:when>
					<xsl:when test="FIELD_TYPE = 'BUTTON'">
						<xsl:call-template name="ButtonType">
							<xsl:with-param name="relation" select="$relation"/>
							<xsl:with-param name="currNode" select="."/>
							<xsl:with-param name="viewType" select="../VIEW_TYPE"/>
							<xsl:with-param name="fieldSetFlag" select="'Y'"/>
						</xsl:call-template>
					</xsl:when>
					<!-- Added for OCX node 09/10/08 -->
					<xsl:when test="FIELD_TYPE = 'OCX'">
						<xsl:call-template name="OCXType">
						</xsl:call-template>
					</xsl:when>
					<!-- Added for OCX node 09/10/08 ends -->
					<xsl:otherwise>
						<!--
            <xsl:attribute name="TABPAGE">
              <xsl:value-of select="TAB_NAME"/>
            </xsl:attribute>
            -->
						<!-- Commented By Murali Start-->
						<!--
            <xsl:attribute name="ROW">
              <xsl:value-of select="FIELD_ROW"/>
            </xsl:attribute>
            <xsl:attribute name="COL">
              <xsl:value-of select="FIELD_COLUMN"/>
            </xsl:attribute>
            -->
						<!-- Commented By Murali Start-->
						<!-- if it is a single entry block include query col and result col-->
						<!-- Commented By Murali Start-->
						<!--
            <xsl:if test="$relation = '1'">
              <xsl:attribute name="QRY_COL">
                <xsl:value-of select="QUERY_COL"/>
              </xsl:attribute>
              <xsl:attribute name="RSLT_COL">
                <xsl:value-of select="RESULT_COL"/>
              </xsl:attribute>
            </xsl:if>
            -->
						<!-- Commented By Murali Start-->
						<!-- Added by Binson -->
						<xsl:if test="normalize-space(SUBPARTITION_NAME) != ''">
							<xsl:attribute name="SUBPARTITION">
								<xsl:value-of select="SUBPARTITION_NAME"/>
							</xsl:attribute>
						</xsl:if>
						<!-- Added by Binson -->
						<NAME>
							<xsl:value-of select="FIELD_NAME"/>
						</NAME>
						<ID>
							<xsl:variable name="funcId" select="//RAD_FUNCTIONS/FUNCTION_ID"/>
							<xsl:value-of select="@Identifier"/>
						</ID>
						<TYPE>
							<xsl:value-of select="FIELD_TYPE"/>
						</TYPE>
						<ROWS>
							<xsl:value-of select="TXTAREA_ROWS"/>
						</ROWS>
						<COLS>
							<xsl:value-of select="TXTAREA_COLS"/>
						</COLS>
						<!--            
            <xsl:if test="normalize-space(LABEL_CODE) != ''">
              <LABEL>
                <xsl:value-of select="LABEL_CODE"/>
              </LABEL>
            </xsl:if> -->
						<LABEL>
							<xsl:if test="normalize-space(LABEL_CODE) != ''">
								<xsl:value-of select="LABEL_CODE"/>
							</xsl:if>
							<xsl:if test="normalize-space(LABEL_CODE) = ''">
								<xsl:if test="normalize-space(//RAD_FIELDS[@Identifier=$Identifier]/LABEL_LINK) != ''">
									<xsl:variable name="labelLink" select="//RAD_FIELDS[@Identifier=$Identifier]/LABEL_LINK"/>
									<xsl:value-of select="//RAD_FIELDS[FIELD_NAME = $labelLink]/LABEL_CODE"/>
								</xsl:if>
							</xsl:if>
						</LABEL>
						<xsl:if test="normalize-space(//RAD_FIELDS[@Identifier=$Identifier]/LABEL_LINK) != ''">
							<LABEL_LINK>
								<xsl:value-of select="//RAD_FIELDS[@Identifier=$Identifier]/LABEL_LINK"/>
							</LABEL_LINK>
						</xsl:if>
						<SHOWIN>
							<xsl:value-of select="SHOW_IN"/>
						</SHOWIN>
						<!--       Sundar commented on jul 18.. Tabindex tag should not appear for Multiple entry field            
            <xsl:if test="normalize-space(TABINDEX) != ''">
              <TABINDEX><xsl:value-of select="TABINDEX"/></TABINDEX>              
            </xsl:if> -->
						<!--            <xsl:if test="FIELD_TYPE != 'CHECKBOX'"> -->
						<REQUIRED>
							<xsl:if test="//RAD_FIELDS[@Identifier=$Identifier]/REQUIRED = 'N'">
								<xsl:text>0</xsl:text>
							</xsl:if>
							<xsl:if test="//RAD_FIELDS[@Identifier=$Identifier]/REQUIRED = 'Y'">
								<xsl:text>-1</xsl:text>
							</xsl:if>
						</REQUIRED>
						<!--            </xsl:if> -->
						<MAXLENGTH>
							<xsl:value-of select="MAX_LENGTH"/>
						</MAXLENGTH>
						<AUTHSCRN>0</AUTHSCRN>
						<READ_ONLY>
							<xsl:if test="READ_ONLY = 'N'">
								<xsl:text>0</xsl:text>
							</xsl:if>
							<xsl:if test="READ_ONLY = 'Y'">
								<xsl:text>-1</xsl:text>
							</xsl:if>
						</READ_ONLY>
						<xsl:if test="//RAD_FIELDS[@Identifier=$Identifier]/INPUT_ONLY_BY_LOV = 'Y'">
							<READ_ONLY>
								<xsl:text>-1</xsl:text>
							</READ_ONLY>
							<INPUT_LOV>
								<xsl:text>-1</xsl:text>
							</INPUT_LOV>
						</xsl:if>
						<DISABLED>
							<xsl:if test="DISABLED = 'N'">
								<xsl:text>0</xsl:text>
							</xsl:if>
							<xsl:if test="DISABLED = 'Y'">
								<xsl:text>-1</xsl:text>
							</xsl:if>
						</DISABLED>
						<HIDDEN>
							<xsl:if test="HIDE = 'N'">
								<xsl:text>0</xsl:text>
							</xsl:if>
							<xsl:if test="HIDE = 'Y'">
								<xsl:text>-1</xsl:text>
							</xsl:if>
						</HIDDEN>
						<!-- added by sundar for uppercase -->
						<xsl:if test="CHK_UPPERCASE = 'Y'">
							<CASE>
								<xsl:text>UPPER</xsl:text>
							</CASE>
						</xsl:if>
						<!-- sundar ends here -->
						<xsl:if test="$relatedFld != ''">
							<RELATED_FIELD>
								<xsl:value-of select="$relatedFld"/>
							</RELATED_FIELD>
						</xsl:if>
						<xsl:if test="normalize-space(MIN_VAL) != ''">
							<MIN_VAL>
								<xsl:value-of select="normalize-space(MIN_VAL)"/>
							</MIN_VAL>
						</xsl:if>
						<xsl:if test="normalize-space(MAX_VAL) != ''">
							<MAX_VAL>
								<xsl:value-of select="normalize-space(MAX_VAL)"/>
							</MAX_VAL>
						</xsl:if>
						<xsl:if test="normalize-space(MAX_DECIMAL) != ''">
							<MAX_DECIMAL>
								<xsl:value-of select="normalize-space(MAX_DECIMAL)"/>
							</MAX_DECIMAL>
						</xsl:if>
						<xsl:if test="normalize-space(AMENDABLE) = 'Y'">
							<AMENDABLE>-1</AMENDABLE>
						</xsl:if>
						<xsl:if test="normalize-space(SUBSYSTEM_DEPENDANT) = 'Y'">
							<SUBSYSTEM>-1</SUBSYSTEM>
						</xsl:if>
						<xsl:if test="normalize-space(//RAD_FIELDS[@Identifier=$Identifier]/CALENDAR_TEXT) = 'Y'">
							<CALENDARTEXT>-1</CALENDARTEXT>
						</xsl:if>
						<DTYPE>
							<xsl:value-of select="//RAD_FIELDS[@Identifier=$Identifier]/DATATYPE"/>
						</DTYPE>
						<xsl:if test="FIELD_TYPE!='FIELDSET'">
							<SIZE>
								<xsl:value-of select="FIELD_SIZE"/>
							</SIZE>
						</xsl:if>
						<WIDTH>
							<xsl:value-of select="WIDTH"/>
						</WIDTH>
						<xsl:if test="FIELD_TYPE='FIELDSET' or FIELD_TYPE = 'IMG'">
							<HEIGHT>
								<xsl:value-of select="HEIGHT"/>
							</HEIGHT>
						</xsl:if>
						<CHECKED>
							<xsl:if test="CHECKED = 'N'">
								<xsl:text>0</xsl:text>
							</xsl:if>
							<xsl:if test="CHECKED = 'Y'">
								<xsl:text>-1</xsl:text>
							</xsl:if>
						</CHECKED>
						<xsl:if test="DBC != ''">
							<DBC>
								<xsl:value-of select="DBC"/>
							</DBC>
						</xsl:if>
						<!--            <xsl:if test="normalize-space(IMG_SRC) != ''"> -->
						<xsl:if test="FIELD_TYPE = 'IMG'">
							<SRC>
								<xsl:value-of select="IMG_SRC"/>
							</SRC>
							<ALT>
								<xsl:value-of select="ALT_IMAGE"/>
							</ALT>
						</xsl:if>
						<!--            </xsl:if> -->
						<xsl:apply-templates select="//RAD_FIELDS[@Identifier=$Identifier]/RAD_FIELD_OPTIONS"/>
						<!-- IF THIS FIELD IS A UI FIELD i.e DOESNT HAVE A DATASRC THEN... -->
						<xsl:if test="($dsNodeCnt &lt; 1) or ($relation = 'N' and ../VIEW_TYPE='Single Entry')">
							<ABS_POS>
								<xsl:value-of select="ABS_POS"/>
							</ABS_POS>
							<!--              <xsl:if test="normalize-space(IMG_SRC) != ''">
                <SRC>
                  <xsl:value-of select="IMG_SRC"/>
                </SRC>
                <ALT>
                  <xsl:value-of select="ALT_IMAGE"/>
                </ALT>
              </xsl:if> -->
						</xsl:if>
						<xsl:if test="FIELD_TYPE != 'CHECKBOX'">
							<xsl:if test="//RAD_FIELDS[@Identifier=$Identifier]/DEFAULT_VALUE != ''">
								<!--              <DEF_VALUE><xsl:value-of select="//RAD_FIELDS[@Identifier=$Identifier]/DEFAULT_VALUE"/></DEF_VALUE> -->
								<VALUE><xsl:value-of select="//RAD_FIELDS[@Identifier=$Identifier]/DEFAULT_VALUE"/></VALUE>
							</xsl:if>
						</xsl:if>
						<xsl:if test="FIELD_TYPE = 'CHECKBOX'">
							<xsl:if test="CHECKED = 'Y'">
								<xsl:if test="count(//RAD_FIELDS[@Identifier=$Identifier]/RAD_FIELD_CUSTOM_ATTRS) &gt; 0">
									<VALUE><xsl:value-of select="//RAD_FIELDS[@Identifier=$Identifier]/RAD_FIELD_CUSTOM_ATTRS[ATTR_NAME = 'ON']/ATTR_VALUE"/></VALUE>
								</xsl:if>
								<xsl:if test="count(//RAD_FIELDS[@Identifier=$Identifier]/RAD_FIELD_CUSTOM_ATTRS) = 0">
									<VALUE><xsl:text>Y</xsl:text></VALUE>
								</xsl:if>
							</xsl:if>
							<xsl:if test="CHECKED = 'N'">
								<xsl:if test="count(//RAD_FIELDS[@Identifier=$Identifier]/RAD_FIELD_CUSTOM_ATTRS) &gt; 0">
									<VALUE><xsl:value-of select="//RAD_FIELDS[@Identifier=$Identifier]/RAD_FIELD_CUSTOM_ATTRS[ATTR_NAME = 'OFF']/ATTR_VALUE"/></VALUE>
								</xsl:if>
								<xsl:if test="count(//RAD_FIELDS[@Identifier=$Identifier]/RAD_FIELD_CUSTOM_ATTRS) = 0">
									<VALUE><xsl:text>N</xsl:text></VALUE>
								</xsl:if>
							</xsl:if>
						</xsl:if>
						<xsl:variable name="dataSrcNode" select="//RAD_DATASOURCES[RAD_FIELDS[@Identifier=$Identifier]]"/>
						<xsl:variable name="aliasName" select="$dataSrcNode/DATASRC_ALIAS"/>
						<!--            
            <xsl:if test="$dataSrcNode/RELATION_TYPE = 'N' and ../VIEW_TYPE='Single Entry'">
              <xsl:if test="normalize-space(DBT) != '' and normalize-space(DBC)!=''">
                <xsl:if test="normalize-space($aliasName) !=''">
                  <DBT>
                    <xsl:value-of select="concat(DBT,'__',$aliasName)"/>
                  </DBT>
                </xsl:if>
                <xsl:if test="normalize-space($aliasName) =''">
                  <DBT>
                    <xsl:value-of select="DBT"/>
                  </DBT>
                </xsl:if>
              </xsl:if>
            </xsl:if> -->
						<!--            <xsl:if test="$relation = '1'"> -->
						<xsl:if test="($dataSrcNode/RELATION_TYPE = '1') or ($dataSrcNode/RELATION_TYPE = 'N' and ../VIEW_TYPE = 'Single Entry')">
							<xsl:if test="normalize-space(ACCESSKEY_CODE) != ''">
								<ACCESSKEY>
									<xsl:value-of select="ACCESSKEY_CODE"/>
								</ACCESSKEY>
							</xsl:if>
							<!-- sundar on jul 18 for tabindex-->
							<xsl:if test="normalize-space(TABINDEX) != ''">
								<TABINDEX><xsl:value-of select="TABINDEX"/></TABINDEX>
							</xsl:if>
							<xsl:if test="FIELD_TYPE = 'SELECT'">
								<xsl:if test="//RAD_FIELDS[@Identifier=$Identifier]/SELECT_MULTIPLE = 'Y'">
									<MULTIPLE>
										<xsl:text>-1</xsl:text>
									</MULTIPLE>
								</xsl:if>
								<xsl:if test="//RAD_FIELDS[@Identifier=$Identifier]/SELECT_MULTIPLE = 'N'">
									<MULTIPLE>
										<xsl:text>0</xsl:text>
									</MULTIPLE>
								</xsl:if>
							</xsl:if>
							<xsl:if test="//RAD_FIELDS[@Identifier=$Identifier]/DEFAULT_VALUE != ''">
								<VALUE><xsl:value-of select="//RAD_FIELDS[@Identifier=$Identifier]/DEFAULT_VALUE"/></VALUE>
							</xsl:if>
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
							<xsl:if test="normalize-space(//RAD_FIELDS[@Identifier=$Identifier]/MASK) != ''">
								<MASK><xsl:value-of select="//RAD_FIELDS[@Identifier=$Identifier]/MASK"/></MASK>
							</xsl:if>
							<ABS_POS>
								<xsl:value-of select="ABS_POS"/>
							</ABS_POS>
							<xsl:if test="normalize-space(DBT) != '' and normalize-space(DBC) != ''">
								<!--  commented on Jul 9...since DBT is coming as DBT__alias__alias 
                <xsl:if test="normalize-space($aliasName) !=''">
                  <DBT>
                    <xsl:value-of select="concat(DBT,'__',$aliasName)"/>
                  </DBT>
                </xsl:if>
                <xsl:if test="normalize-space($aliasName) =''">
                  <DBT>
                    <xsl:value-of select="DBT"/>
                  </DBT>
                </xsl:if> -->
								<DBT>
									<xsl:value-of select="DBT"/>
								</DBT>
							</xsl:if>
							<!--
            <xsl:if test="normalize-space(DBC) != ''">              
                <xsl:variable name="finalDsName" select = "//RAD_FIELDS[@Identifier=$Identifier]/DATASOURCE"/>
                <xsl:variable name="finalDbtNode" select="//RAD_DATASOURCES[DATASRC_NAME = $finalDsName]"/>
                <xsl:variable name="finalDBT">
                    <xsl:if test="count($finalDbtNode/DATASRC_ALIAS) = 0 or $finalDbtNode/DATASRC_ALIAS = ''">
                        <xsl:value-of select="$finalDsName"/>
                    </xsl:if>
                    <xsl:if test="count($finalDbtNode/DATASRC_ALIAS) &gt; 0 and $finalDbtNode/DATASRC_ALIAS != ''">
                        <xsl:value-of select="concat($finalDsName,'__',$finalDbtNode/DATASRC_ALIAS)"/>
                    </xsl:if>
                </xsl:variable>
                <xsl:if test="($dataSrcNode/RELATION_TYPE = '1') or ($dataSrcNode/RELATION_TYPE = 'N' and ../VIEW_TYPE = 'Single Entry')">                
                    <DBT>
                        <xsl:value-of select="$finalDBT"/>
                    </DBT>
                </xsl:if>
            </xsl:if>
-->
							<!--              <xsl:if test="normalize-space(IMG_SRC) != ''">
                <SRC>
                  <xsl:value-of select="IMG_SRC"/>
                </SRC>
                <ALT>
                  <xsl:value-of select="ALT_IMAGE"/>
                </ALT>
              </xsl:if> -->
							<ROWS>
								<xsl:value-of select="TXTAREA_ROWS"/>
							</ROWS>
							<COLS>
								<xsl:value-of select="TXTAREA_COLS"/>
							</COLS>
							<HEIGHT>
								<xsl:value-of select="HEIGHT"/>
							</HEIGHT>
							<TEXT-ALIGN>
								<xsl:value-of select="TEXT-ALIGN"/>
							</TEXT-ALIGN>
							<UIBLOCK>
							</UIBLOCK>
						</xsl:if>
					</xsl:otherwise>
				</xsl:choose>
				<xsl:if test="count(//RAD_LOVS[LOV_NAME=$lovName]) &gt; 0">
					<LOV>
						<xsl:apply-templates select="//RAD_LOVS[LOV_NAME=$lovName]">
							<xsl:with-param name="Identifier" select="$Identifier"/>
						</xsl:apply-templates>
						<xsl:apply-templates select="//RAD_FIELDS[@Identifier=$Identifier]/RAD_FIELD_LOV_OVERRIDES"/>
					</LOV>
				</xsl:if>
				<xsl:apply-templates select="RAD_FIELD_EVENTS"/>
				<xsl:if test="count(//RAD_FIELDS[@Identifier=$Identifier]/RAD_FIELD_CUSTOM_ATTRS) &gt; 0">
					<CUSTOM>
						<xsl:apply-templates select="//RAD_FIELDS[@Identifier=$Identifier]/RAD_FIELD_CUSTOM_ATTRS"/>
						<!--Anjali..To include Custom Attributes-->
					</CUSTOM>
				</xsl:if>
				<xsl:apply-templates select="//RAD_FIELDS[@Identifier=$Identifier]/RAD_FIELD_POPUPEDITS"/>
			</FIELD>
		</xsl:if>
	</xsl:template>
	<!--  
  <xsl:template name="summaryQueryBlkHandler">
    <xsl:param name="rsltDS"/>
    <xsl:param name="screenType"/>
    <SUMBLOCK SCREEN="SUMMARY" TABPAGE="QUERY" TYPE="Single Entry">
    <xsl:if test="count(//RAD_AUDIT_BLOCK) &gt; 0">
      <xsl:for-each select="//RAD_DATASOURCES[DATASRC_NAME = $rsltDS and DATASRC_ALIAS = '']/RAD_FIELDS[(FIELD_NAME != 'AUTH_STAT' and FIELD_NAME != 'RECORD_STAT' and FIELD_NAME != 'CONTRACT_STATUS') and SUMMARY_QUERY = 'Y']">
        <xsl:call-template name="queryFieldHandler">
          <xsl:with-param name="rsltDS" select="$rsltDS"/>
        </xsl:call-template>
      </xsl:for-each>
    </xsl:if>
    <xsl:if test="count(//RAD_AUDIT_BLOCK) = 0">
      <xsl:for-each select="//RAD_DATASOURCES[DATASRC_NAME = $rsltDS and DATASRC_ALIAS = '']/RAD_FIELDS[SUMMARY_QUERY = 'Y']">
        <xsl:call-template name="queryFieldHandler">
          <xsl:with-param name="rsltDS" select="$rsltDS"/>
        </xsl:call-template>
      </xsl:for-each>
    </xsl:if>
    </SUMBLOCK>
  </xsl:template> -->
	<xsl:template name="summaryQueryBlkHandler">
		<xsl:param name="rsltDS"/>
		<xsl:param name="screenType"/>
		<SUMBLOCK SCREEN="SUMMARY" TABPAGE="QUERY" TYPE="Single Entry">
			<xsl:if test="count(//RAD_SUMMARY/RAD_ORDERING_RESULT_FIELDS) = 0">
				<xsl:if test="count(//RAD_AUDIT_BLOCK) &gt; 0">
					<xsl:for-each select="//RAD_DATASOURCES[DATASRC_NAME = $rsltDS and DATASRC_ALIAS = '']/RAD_FIELDS[(FIELD_NAME != 'AUTH_STAT' and FIELD_NAME != 'RECORD_STAT' and FIELD_NAME != 'CONTRACT_STATUS') and SUMMARY_QUERY = 'Y']">
						<xsl:call-template name="queryFieldHandler">
							<xsl:with-param name="rsltDS" select="$rsltDS"/>
						</xsl:call-template>
					</xsl:for-each>
				</xsl:if>
				<xsl:if test="count(//RAD_AUDIT_BLOCK) = 0">
					<xsl:for-each select="//RAD_DATASOURCES[DATASRC_NAME = $rsltDS and DATASRC_ALIAS = '']/RAD_FIELDS[SUMMARY_QUERY = 'Y']">
						<xsl:call-template name="queryFieldHandler">
							<xsl:with-param name="rsltDS" select="$rsltDS"/>
						</xsl:call-template>
					</xsl:for-each>
				</xsl:if>
			</xsl:if>
			<xsl:if test="count(//RAD_SUMMARY/RAD_ORDERING_RESULT_FIELDS) &gt; 0">
				<xsl:for-each select="//RAD_SUMMARY/RAD_ORDERING_RESULT_FIELDS">
					<xsl:sort select="ORDER" data-type="number" order="ascending"/>
					<xsl:variable name="order" select="ORDER"/>
					<xsl:variable name="queryFldName" select="RESULT_FIELD_NAME"/>
					<xsl:call-template name="queryFieldHandlerWithOrder">
						<xsl:with-param name="rsltDS" select="$rsltDS"/>
						<xsl:with-param name="order" select="$order"/>
						<xsl:with-param name="queryFldName" select="$queryFldName"/>
					</xsl:call-template>
				</xsl:for-each>
				<xsl:for-each select="//RAD_DATASOURCES[DATASRC_NAME = $rsltDS and DATASRC_ALIAS = '']/RAD_FIELDS[SUMMARY_QUERY = 'Y' and SUMMARY_RESULT != 'Y']">
					<xsl:call-template name="queryFieldHandler">
						<xsl:with-param name="rsltDS" select="$rsltDS"/>
					</xsl:call-template>
				</xsl:for-each>
			</xsl:if>
		</SUMBLOCK>
	</xsl:template>
	<xsl:template name="summaryRsltBlkHandler">
		<xsl:param name="rsltDS"/>
		<xsl:param name="screenType"/>
		<SUMBLOCK SCREEN="SUMMARY" TABPAGE="RESULT" TYPE="Multiple Entry">
			<xsl:if test="count(//RAD_SUMMARY/RAD_ORDERING_RESULT_FIELDS) = 0">
				<xsl:if test="count(//RAD_AUDIT_BLOCK) &gt; 0">
					<xsl:for-each select="//RAD_DATASOURCES[DATASRC_NAME = $rsltDS and DATASRC_ALIAS = '']/RAD_FIELDS[(FIELD_NAME != 'AUTH_STAT' and FIELD_NAME != 'RECORD_STAT' and FIELD_NAME != 'CONTRACT_STATUS') and SUMMARY_RESULT = 'Y']">
						<xsl:call-template name="resultFieldHandler">
							<xsl:with-param name="rsltDS" select="$rsltDS"/>
						</xsl:call-template>
					</xsl:for-each>
				</xsl:if>
				<xsl:if test="count(//RAD_AUDIT_BLOCK) = 0">
					<xsl:for-each select="//RAD_DATASOURCES[DATASRC_NAME = $rsltDS and DATASRC_ALIAS = '']/RAD_FIELDS[SUMMARY_RESULT = 'Y']">
						<xsl:call-template name="resultFieldHandler">
							<xsl:with-param name="rsltDS" select="$rsltDS"/>
						</xsl:call-template>
					</xsl:for-each>
				</xsl:if>
			</xsl:if>
			<xsl:if test="count(//RAD_SUMMARY/RAD_ORDERING_RESULT_FIELDS) &gt; 0">
				<xsl:for-each select="//RAD_SUMMARY/RAD_ORDERING_RESULT_FIELDS">
					<xsl:sort select="ORDER" data-type="number" order="ascending"/>
					<xsl:variable name="order" select="ORDER"/>
					<xsl:variable name="rsltFldName" select="RESULT_FIELD_NAME"/>
					<xsl:call-template name="resultFieldHandlerWithOrder">
						<xsl:with-param name="rsltDS" select="$rsltDS"/>
						<xsl:with-param name="order" select="$order"/>
						<xsl:with-param name="rsltFldName" select="$rsltFldName"/>
					</xsl:call-template>
				</xsl:for-each>
				<xsl:for-each select="//RAD_DATASOURCES[DATASRC_NAME = $rsltDS and DATASRC_ALIAS = '']/RAD_FIELDS[SUMMARY_QUERY != 'Y' and SUMMARY_RESULT = 'Y']">
					<xsl:call-template name="resultFieldHandler">
						<xsl:with-param name="rsltDS" select="$rsltDS"/>
					</xsl:call-template>
				</xsl:for-each>
			</xsl:if>
			<xsl:if test="count(//RAD_FIELDS/RAD_LEGEND_OPTIONS_SE) &gt; 0">
				<xsl:for-each select="//RAD_FIELDS/RAD_LEGEND_OPTIONS_SE">
					<xsl:variable name="legendFName" select="LEGEND_FIELD_NAME"/>
					<xsl:if test="count(//RAD_FIELDS[RAD_LEGEND_OPTIONS_SE[LEGEND_FIELD_NAME = $legendFName]]/RAD_LEGEND_OPTIONS) &gt; 0">
						<LEGENDS>
							<FIELD_NAME><xsl:value-of select="LEGEND_FIELD_NAME"/></FIELD_NAME>
							<LABEL><xsl:value-of select="LEGEND_LABEL"/></LABEL>
							<WIDTH><xsl:value-of select="LEGEND_WIDTH"/></WIDTH>
							<xsl:for-each select="//RAD_FIELDS[RAD_LEGEND_OPTIONS_SE[LEGEND_FIELD_NAME = $legendFName]]/RAD_LEGEND_OPTIONS">
								<OPTION>
									<xsl:attribute name="VALUE">
										<xsl:value-of select="OPTION_VALUE"/>
									</xsl:attribute>
									<xsl:value-of select="OPTION_LBL_CODE"/>
								</OPTION>
							</xsl:for-each>
						</LEGENDS>
					</xsl:if>
				</xsl:for-each>
			</xsl:if>
		</SUMBLOCK>
	</xsl:template>
	<xsl:template name="SubscrAndCallformHandler">
		<xsl:param name="scrName"/>
		<SUBSCREEN>
			<xsl:for-each select="//RAD_SCREENS[SCREEN_NAME = $scrName]//RAD_FIELD_EVENTS[LAUNCH_SUBSCREEN = 'Y' or LAUNCH_CALLFORM = 'Y']">
				<FORM SEQ="{position()}">
					<xsl:attribute name="TYPE">
						<xsl:if test="LAUNCH_SUBSCREEN = 'Y'">
							<xsl:text>S</xsl:text>
						</xsl:if>
						<xsl:if test="LAUNCH_CALLFORM = 'Y'">
							<xsl:text>C</xsl:text>
						</xsl:if>
					</xsl:attribute>
					<xsl:attribute name="id">
						<xsl:if test="LAUNCH_SUBSCREEN = 'Y'">
							<xsl:value-of select="SUBSCREEN_NAME"/>
						</xsl:if>
						<xsl:if test="LAUNCH_CALLFORM = 'Y'">
							<xsl:value-of select="CALLFORM_NAME"/>
						</xsl:if>
					</xsl:attribute>
					<FUNCTION><xsl:value-of select="FUNCTION_NAME"/></FUNCTION>
					<LABEL><xsl:value-of select="../LABEL_CODE"/></LABEL>
				</FORM>
			</xsl:for-each>
		</SUBSCREEN>
	</xsl:template>
	<xsl:template name="summaryCustomButtonHandler">
		<xsl:param name="sumScrType"/>
		<SUMBUTTONS>
			<BUTTON_ROWS><xsl:value-of select="//RAD_SUMMARY/RAD_CUSTOM_BUTTONS_SE/NUMBER_OF_ROWS"/></BUTTON_ROWS>
			<BUTTONS_PER_ROW><xsl:value-of select="//RAD_SUMMARY/RAD_CUSTOM_BUTTONS_SE/NUMBER_OF_BUTTONS"/></BUTTONS_PER_ROW>
			<xsl:for-each select="//RAD_SUMMARY/RAD_CUSTOM_BUTTONS">
				<BUTTON>
					<xsl:attribute name="ID">
						<xsl:value-of select="position()"/>
					</xsl:attribute>
					<BUTTON_NAME><xsl:value-of select="CUSTOM_FIELD_NAME"/></BUTTON_NAME>
					<BUTTON_LABEL><xsl:value-of select="CUSTOM_LABELS"/></BUTTON_LABEL>
					<BUTTON_EVENT><xsl:value-of select="CUSTOM_EVENT_NAME"/></BUTTON_EVENT>
				</BUTTON>
			</xsl:for-each>
		</SUMBUTTONS>
	</xsl:template>
	<xsl:template name="queryFieldHandler">
		<xsl:param name="rsltDS"/>
		<xsl:variable name="fieldIdentity" select="@Identifier"/>
		<xsl:variable name="fieldLov" select="LOV_NAME"/>
		<xsl:variable name="fName" select="FIELD_NAME"/>
		<xsl:variable name="noOfOrderingFields" select="count(//RAD_SUMMARY/RAD_ORDERING_RESULT_FIELDS)"/>
		<FIELD ID="{position()+$noOfOrderingFields}" TYPE="MULTIPLE">
			<NAME><xsl:value-of select="FIELD_NAME"/></NAME>
			<TYPE><xsl:value-of select="FIELD_TYPE"/></TYPE>
			<LABEL><xsl:value-of select="LABEL_CODE"/></LABEL>
			<MAXLENGTH><xsl:value-of select="MAX_LENGTH"/></MAXLENGTH>
			<DBT><xsl:value-of select="DATASOURCE"/></DBT>
			<DBC><xsl:value-of select="DATAFIELD"/></DBC>
			<xsl:if test="//RAD_DATASOURCES[DATASRC_NAME = $rsltDS and DATASRC_ALIAS = '']/@ID != 1 or (//RAD_DATASOURCES[DATASRC_NAME = $rsltDS and DATASRC_ALIAS = '']/@ID = 1 and //RAD_FUNCTIONS/DETAIL_REQD = 'N')">
				<DTYPE><xsl:value-of select="DATATYPE"/></DTYPE>
				<xsl:if test="RELATED_FIELD != ''">
					<RELATED_FIELD><xsl:value-of select="RELATED_FIELD"/></RELATED_FIELD>
				</xsl:if>
				<xsl:if test="count(//RAD_LOVS[LOV_NAME=$fieldLov]) &gt; 0">
					<LOV>
						<xsl:apply-templates select="//RAD_LOVS[LOV_NAME=$fieldLov]">
							<xsl:with-param name="Identifier" select="$fieldIdentity"/>
						</xsl:apply-templates>
						<xsl:apply-templates select="//RAD_FIELDS[@Identifier=$fieldIdentity]/RAD_FIELD_LOV_OVERRIDES"/>
					</LOV>
				</xsl:if>
				<xsl:apply-templates select="//RAD_FIELDS[@Identifier=$fieldIdentity]/RAD_FIELD_EVENTS"/>
				<xsl:if test="count(//RAD_FIELDS[@Identifier=$fieldIdentity]/RAD_FIELD_CUSTOM_ATTRS) &gt; 0">
					<CUSTOM>
						<xsl:apply-templates select="//RAD_FIELDS[@Identifier=$fieldIdentity]/RAD_FIELD_CUSTOM_ATTRS"/>
					</CUSTOM>
				</xsl:if>
				<xsl:apply-templates select="//RAD_FIELDS[@Identifier=$fieldIdentity]/RAD_FIELD_OPTIONS"/>
				<xsl:apply-templates select="//RAD_FIELDS[@Identifier=$fieldIdentity]/RAD_FIELD_POPUPEDITS"/>
				<xsl:if test="count(//RAD_SUMMARY/RAD_QUERY_FIELDS_ATTRIBUTES) &gt; 0">
					<!--            
              <HIDDEN>
                <xsl:if test="//RAD_SUMMARY/RAD_QUERY_FIELDS_ATTRIBUTES[QUERY_FIELD_NAME = $fName]/HIDDEN = 'Y'">
                  <xsl:text>-1</xsl:text>
                </xsl:if>
                <xsl:if test="//RAD_SUMMARY/RAD_QUERY_FIELDS_ATTRIBUTES[QUERY_FIELD_NAME = $fName]/HIDDEN = 'N'">
                  <xsl:text>0</xsl:text>
                </xsl:if>
              </HIDDEN> -->
					<REQUIRED>
						<xsl:if test="//RAD_SUMMARY/RAD_QUERY_FIELDS_ATTRIBUTES[QUERY_FIELD_NAME = $fName]/REQUIRED = 'Y'">
							<xsl:text>-1</xsl:text>
						</xsl:if>
						<xsl:if test="//RAD_SUMMARY/RAD_QUERY_FIELDS_ATTRIBUTES[QUERY_FIELD_NAME = $fName]/REQUIRED = 'N'">
							<xsl:text>0</xsl:text>
						</xsl:if>
					</REQUIRED>
					<CASE>
						<xsl:if test="//RAD_SUMMARY/RAD_QUERY_FIELDS_ATTRIBUTES[QUERY_FIELD_NAME = $fName]/UPPERCASE = 'Y'">
							<xsl:text>UPPER</xsl:text>
						</xsl:if>
						<xsl:if test="//RAD_SUMMARY/RAD_QUERY_FIELDS_ATTRIBUTES[QUERY_FIELD_NAME = $fName]/UPPERCASE = 'N'">
							<xsl:text>LOWER</xsl:text>
						</xsl:if>
					</CASE>
					<READ_ONLY>
						<xsl:if test="//RAD_SUMMARY/RAD_QUERY_FIELDS_ATTRIBUTES[QUERY_FIELD_NAME = $fName]/READ_ONLY = 'Y'">
							<xsl:text>-1</xsl:text>
						</xsl:if>
						<xsl:if test="//RAD_SUMMARY/RAD_QUERY_FIELDS_ATTRIBUTES[QUERY_FIELD_NAME = $fName]/READ_ONLY = 'N'">
							<xsl:text>0</xsl:text>
						</xsl:if>
					</READ_ONLY>
				</xsl:if>
			</xsl:if>
		</FIELD>
	</xsl:template>
	<xsl:template name="queryFieldHandlerWithOrder">
		<xsl:param name="rsltDS"/>
		<xsl:param name="order"/>
		<xsl:param name="queryFldName"/>
		<xsl:variable name="queryFldNode" select="//RAD_DATASOURCES[DATASRC_NAME = $rsltDS and DATASRC_ALIAS = '']/RAD_FIELDS[FIELD_NAME = $queryFldName and SUMMARY_QUERY = 'Y']"/>
		<xsl:variable name="fieldIdentity" select="$queryFldNode/@Identifier"/>
		<xsl:variable name="fieldLov" select="$queryFldNode/LOV_NAME"/>
		<xsl:variable name="fName" select="$queryFldNode/FIELD_NAME"/>
		<FIELD ID="{$order}" TYPE="MULTIPLE">
			<NAME><xsl:value-of select="$queryFldNode/FIELD_NAME"/></NAME>
			<TYPE><xsl:value-of select="$queryFldNode/FIELD_TYPE"/></TYPE>
			<LABEL><xsl:value-of select="$queryFldNode/LABEL_CODE"/></LABEL>
			<MAXLENGTH><xsl:value-of select="$queryFldNode/MAX_LENGTH"/></MAXLENGTH>
			<DBT><xsl:value-of select="$queryFldNode/DATASOURCE"/></DBT>
			<DBC><xsl:value-of select="$queryFldNode/DATAFIELD"/></DBC>
			<xsl:if test="//RAD_DATASOURCES[DATASRC_NAME = $rsltDS and DATASRC_ALIAS = '']/@ID != 1 or (//RAD_DATASOURCES[DATASRC_NAME = $rsltDS and DATASRC_ALIAS = '']/@ID = 1 and //RAD_FUNCTIONS/DETAIL_REQD = 'N')">
				<DTYPE><xsl:value-of select="$queryFldNode/DATATYPE"/></DTYPE>
				<xsl:if test="$queryFldNode/RELATED_FIELD != ''">
					<RELATED_FIELD><xsl:value-of select="$queryFldNode/RELATED_FIELD"/></RELATED_FIELD>
				</xsl:if>
				<xsl:if test="count(//RAD_LOVS[LOV_NAME=$fieldLov]) &gt; 0">
					<LOV>
						<xsl:apply-templates select="//RAD_LOVS[LOV_NAME=$fieldLov]">
							<xsl:with-param name="Identifier" select="$fieldIdentity"/>
						</xsl:apply-templates>
						<xsl:apply-templates select="//RAD_FIELDS[@Identifier=$fieldIdentity]/RAD_FIELD_LOV_OVERRIDES"/>
					</LOV>
				</xsl:if>
				<xsl:apply-templates select="//RAD_FIELDS[@Identifier=$fieldIdentity]/RAD_FIELD_EVENTS"/>
				<xsl:if test="count(//RAD_FIELDS[@Identifier=$fieldIdentity]/RAD_FIELD_CUSTOM_ATTRS) &gt; 0">
					<CUSTOM>
						<xsl:apply-templates select="//RAD_FIELDS[@Identifier=$fieldIdentity]/RAD_FIELD_CUSTOM_ATTRS"/>
					</CUSTOM>
				</xsl:if>
				<xsl:apply-templates select="//RAD_FIELDS[@Identifier=$fieldIdentity]/RAD_FIELD_OPTIONS"/>
				<xsl:apply-templates select="//RAD_FIELDS[@Identifier=$fieldIdentity]/RAD_FIELD_POPUPEDITS"/>
				<xsl:if test="count(//RAD_SUMMARY/RAD_QUERY_FIELDS_ATTRIBUTES) &gt; 0">
					<REQUIRED>
						<xsl:if test="//RAD_SUMMARY/RAD_QUERY_FIELDS_ATTRIBUTES[QUERY_FIELD_NAME = $fName]/REQUIRED = 'Y'">
							<xsl:text>-1</xsl:text>
						</xsl:if>
						<xsl:if test="//RAD_SUMMARY/RAD_QUERY_FIELDS_ATTRIBUTES[QUERY_FIELD_NAME = $fName]/REQUIRED = 'N'">
							<xsl:text>0</xsl:text>
						</xsl:if>
					</REQUIRED>
					<CASE>
						<xsl:if test="//RAD_SUMMARY/RAD_QUERY_FIELDS_ATTRIBUTES[QUERY_FIELD_NAME = $fName]/UPPERCASE = 'Y'">
							<xsl:text>UPPER</xsl:text>
						</xsl:if>
						<xsl:if test="//RAD_SUMMARY/RAD_QUERY_FIELDS_ATTRIBUTES[QUERY_FIELD_NAME = $fName]/UPPERCASE = 'N'">
							<xsl:text>LOWER</xsl:text>
						</xsl:if>
					</CASE>
					<READ_ONLY>
						<xsl:if test="//RAD_SUMMARY/RAD_QUERY_FIELDS_ATTRIBUTES[QUERY_FIELD_NAME = $fName]/READ_ONLY = 'Y'">
							<xsl:text>-1</xsl:text>
						</xsl:if>
						<xsl:if test="//RAD_SUMMARY/RAD_QUERY_FIELDS_ATTRIBUTES[QUERY_FIELD_NAME = $fName]/READ_ONLY = 'N'">
							<xsl:text>0</xsl:text>
						</xsl:if>
					</READ_ONLY>
				</xsl:if>
			</xsl:if>
		</FIELD>
	</xsl:template>
	<xsl:template name="resultFieldHandler">
		<xsl:param name="rsltDS"/>
		<xsl:variable name="noOfOrderingFields" select="count(//RAD_SUMMARY/RAD_ORDERING_RESULT_FIELDS)"/>
		<FIELD ID="{position()+$noOfOrderingFields}" TYPE="MULTIPLE">
			<NAME><xsl:value-of select="FIELD_NAME"/></NAME>
			<TYPE><xsl:value-of select="FIELD_TYPE"/></TYPE>
			<LABEL><xsl:value-of select="LABEL_CODE"/></LABEL>
			<MAXLENGTH><xsl:value-of select="MAX_LENGTH"/></MAXLENGTH>
			<DBT><xsl:value-of select="DATASOURCE"/></DBT>
			<DBC><xsl:value-of select="DATAFIELD"/></DBC>
			<xsl:if test="//RAD_DATASOURCES[DATASRC_NAME = $rsltDS and DATASRC_ALIAS = '']/@ID != 1 or (//RAD_DATASOURCES[DATASRC_NAME = $rsltDS and DATASRC_ALIAS = '']/@ID = 1 and //RAD_FUNCTIONS/DETAIL_REQD = 'N')">
				<DTYPE><xsl:value-of select="DATATYPE"/></DTYPE>
				<xsl:if test="normalize-space(RELATED_FIELD) != ''">
					<RELATED_FIELD><xsl:value-of select="RELATED_FIELD"/></RELATED_FIELD>
				</xsl:if>
			</xsl:if>
		</FIELD>
	</xsl:template>
	<xsl:template name="resultFieldHandlerWithOrder">
		<xsl:param name="rsltDS"/>
		<xsl:param name="order"/>
		<xsl:param name="rsltFldName"/>
		<xsl:variable name="rsltFldNode" select="//RAD_DATASOURCES[DATASRC_NAME = $rsltDS]/RAD_FIELDS[FIELD_NAME = $rsltFldName and SUMMARY_RESULT = 'Y']"/>
		<FIELD ID="{$order}" TYPE="MULTIPLE">
			<NAME><xsl:value-of select="$rsltFldNode/FIELD_NAME"/></NAME>
			<TYPE><xsl:value-of select="$rsltFldNode/FIELD_TYPE"/></TYPE>
			<LABEL><xsl:value-of select="$rsltFldNode/LABEL_CODE"/></LABEL>
			<MAXLENGTH><xsl:value-of select="$rsltFldNode/MAX_LENGTH"/></MAXLENGTH>
			<ORDER><xsl:value-of select="//RAD_SUMMARY/RAD_ORDERING_RESULT_FIELDS[RESULT_FIELD_NAME = $rsltFldName]/ORDER"/></ORDER>
			<DBT><xsl:value-of select="$rsltFldNode/DATASOURCE"/></DBT>
			<DBC><xsl:value-of select="$rsltFldNode/DATAFIELD"/></DBC>
			<xsl:if test="//RAD_DATASOURCES[DATASRC_NAME = $rsltDS and DATASRC_ALIAS = '']/@ID != 1 or (//RAD_DATASOURCES[DATASRC_NAME = $rsltDS and DATASRC_ALIAS = '']/@ID = 1 and //RAD_FUNCTIONS/DETAIL_REQD = 'N')">
				<DTYPE><xsl:value-of select="$rsltFldNode/DATATYPE"/></DTYPE>
				<xsl:if test="normalize-space($rsltFldNode/RELATED_FIELD) != ''">
					<RELATED_FIELD><xsl:value-of select="$rsltFldNode/RELATED_FIELD"/></RELATED_FIELD>
				</xsl:if>
			</xsl:if>
		</FIELD>
	</xsl:template>
</xsl:stylesheet>
