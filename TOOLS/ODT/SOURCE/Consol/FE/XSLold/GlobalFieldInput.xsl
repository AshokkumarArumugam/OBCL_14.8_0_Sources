<?xml version='1.0' encoding='windows-1252'?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <!-- Transforms fields common to all Field Types -->
  <xsl:template name="CommonElements">
    <xsl:param name="currNode" select="."/>
    <xsl:variable name="datasrcName" select="$currNode/../DATASRC_NAME"/>
    <xsl:variable name="Identifier" select="$currNode/@Identifier"/>
    <xsl:variable name="equivalentDSrcFieldNode" select="//RAD_FIELDS[@Identifier=$Identifier]"/>
    <xsl:variable name="dsNode" select="//RAD_DATASOURCES[RAD_FIELDS[@Identifier=$Identifier]]"/>
    <NAME><xsl:value-of select="$currNode/FIELD_NAME"/></NAME>
    <ID>
      <xsl:variable name="funcId" select="//RAD_FUNCTIONS/FUNCTION_ID"/>
      <xsl:value-of select="$Identifier"/>
    </ID>
    <TYPE><xsl:value-of select="$currNode/FIELD_TYPE"/></TYPE>
    <TABINDEX><xsl:value-of select="TABINDEX"/></TABINDEX>
    <xsl:if test="normalize-space($currNode/DBC) != ''">
<!--    
        <xsl:variable name="dsName" select = "$equivalentDSrcFieldNode/DATASOURCE"/>
        <xsl:variable name="dbtNode" select="//RAD_DATASOURCES[DATASRC_NAME = $dsName]"/>
        <xsl:variable name="finalDBT">
            <xsl:if test="count($dbtNode/DATASRC_ALIAS) = 0 or $dbtNode/DATASRC_ALIAS = ''">
                <xsl:value-of select="$dsName"/>
            </xsl:if>
            <xsl:if test="count($dbtNode/DATASRC_ALIAS) &gt; 0 and $dbtNode/DATASRC_ALIAS != ''">
                <xsl:value-of select="concat($dsName,'__',$dbtNode/DATASRC_ALIAS)"/>
            </xsl:if>
        </xsl:variable>
        <xsl:if test="($dsNode/RELATION_TYPE = '1') or ($dsNode/RELATION_TYPE = 'N' and $currNode/../VIEW_TYPE = 'Single Entry')">        
            <DBT>
                <xsl:value-of select="$finalDBT"/>
            </DBT>
        </xsl:if>
-->
        <xsl:if test="($dsNode/RELATION_TYPE = '1') or ($dsNode/RELATION_TYPE = 'N' and $currNode/../VIEW_TYPE = 'Single Entry')">        
          <DBT><xsl:value-of select="normalize-space($currNode/DBT)"/></DBT>
        </xsl:if>
    </xsl:if>
    <xsl:if test="contains('TEXT,RADIO',$currNode/FIELD_TYPE)">
      <REQUIRED>
        <xsl:if test="$equivalentDSrcFieldNode/REQUIRED = 'N'">
            <xsl:text>0</xsl:text>
        </xsl:if>
        <xsl:if test="$equivalentDSrcFieldNode/REQUIRED = 'Y'">
            <xsl:text>-1</xsl:text>
        </xsl:if>
      </REQUIRED>
    </xsl:if>
    <AUTHSCRN>
      <xsl:value-of select="$currNode/AUTH_SCREEN"/>
    </AUTHSCRN>
    <SIZE>
      <xsl:value-of select="$currNode/FIELD_SIZE"/>
    </SIZE>
    <READ_ONLY>
      <xsl:if test="$currNode/READ_ONLY = 'N'">
        <xsl:text>0</xsl:text>
      </xsl:if>
      <xsl:if test="$currNode/READ_ONLY = 'Y'">
        <xsl:text>-1</xsl:text>
      </xsl:if>
<!--      <xsl:value-of select="$currNode/READ_ONLY"/> -->
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
      <xsl:if test="$currNode/DISABLED = 'N'">
        <xsl:text>0</xsl:text>
      </xsl:if>
      <xsl:if test="$currNode/DISABLED = 'Y'">
        <xsl:text>-1</xsl:text>
      </xsl:if>
<!--      <xsl:value-of select="$currNode/DISABLED"/> -->
    </DISABLED>
    <HIDDEN>
      <xsl:if test="$currNode/HIDE = 'N' and $currNode/FIELD_TYPE != 'HIDDEN'">
        <xsl:text>0</xsl:text>
      </xsl:if>
      <xsl:if test="$currNode/HIDE = 'Y' or $currNode/FIELD_TYPE = 'HIDDEN'">
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
    <xsl:if test="$equivalentDSrcFieldNode/RELATED_FIELD != ''">
      <RELATED_FIELD><xsl:value-of select="RELATED_FIELD"/></RELATED_FIELD>
    </xsl:if>
<!--    <xsl:if test="normalize-space(DBC) != ''"> -->
    <xsl:if test="normalize-space($equivalentDSrcFieldNode/DATATYPE) != ''">
      <DTYPE>
        <xsl:value-of select="$equivalentDSrcFieldNode/DATATYPE"/> 
      </DTYPE>
    </xsl:if>
<!--    </xsl:if> -->
    <CHECKED>
      <xsl:if test="$currNode/CHECKED = 'N'">
        <xsl:text>0</xsl:text>
      </xsl:if>
      <xsl:if test="$currNode/CHECKED = 'Y'">
        <xsl:text>-1</xsl:text>
      </xsl:if>
<!--      <xsl:value-of select="$currNode/CHECKED"/> -->
    </CHECKED>
    <xsl:if test="normalize-space(ACCESSKEY_CODE) != ''">
      <ACCESSKEY><xsl:value-of select="normalize-space(ACCESSKEY_CODE)"/></ACCESSKEY>
    </xsl:if>
    <SUMMARY>
      <xsl:if test="$equivalentDSrcFieldNode/SUMMARY_QUERY = 'Y'">
        <xsl:text>Q</xsl:text>
      </xsl:if>
      <xsl:if test="$equivalentDSrcFieldNode/SUMMARY_RESULT = 'Y'">
        <xsl:text>R</xsl:text>
      </xsl:if>
      <xsl:if test="$equivalentDSrcFieldNode/SUMMARY_ADVANCED = 'Y'">
        <xsl:text>A</xsl:text>
      </xsl:if>
    </SUMMARY>
    <SHOWIN>
      <xsl:value-of select="SHOW_IN"/>
    </SHOWIN>   
<!-- added by sundar for Default Value -->        
    <xsl:if test="$equivalentDSrcFieldNode/DEFAULT_VALUE != ''">
      <VALUE><xsl:value-of select="$equivalentDSrcFieldNode/DEFAULT_VALUE"/></VALUE> 
    </xsl:if>
<!-- sundar ends here-->
    <xsl:if test="normalize-space($currNode/MIN_VAL) != ''">
      <MIN_VAL>
        <xsl:value-of select="normalize-space($currNode/MIN_VAL)"/>
      </MIN_VAL>
    </xsl:if>
    <xsl:if test="normalize-space($currNode/MAX_VAL) != ''">
      <MAX_VAL>
        <xsl:value-of select="normalize-space($currNode/MAX_VAL)"/>
      </MAX_VAL>
    </xsl:if>
    <xsl:if test="normalize-space($currNode/MAX_DECIMAL) != ''">
      <MAX_DECIMAL>
        <xsl:value-of select="normalize-space($currNode/MAX_DECIMAL)"/>
      </MAX_DECIMAL>
    </xsl:if>
    <xsl:if test="normalize-space($currNode/AMENDABLE) = 'Y'">
      <AMENDABLE>-1</AMENDABLE>
    </xsl:if>
    <xsl:if test="normalize-space($currNode/SUBSYSTEM_DEPENDANT) = 'Y'">
      <SUBSYSTEM>-1</SUBSYSTEM>
    </xsl:if>
    <xsl:if test="normalize-space($equivalentDSrcFieldNode/CALENDAR_TEXT) = 'Y'">
      <CALENDARTEXT>-1</CALENDARTEXT>
    </xsl:if>
    
    <!-- Added By Murali for Template -->
    <!--
    <xsl:if test="normalize-space($currNode/SECTION_NAME) != ''">
    <SECTION_NAME><xsl:value-of select="normalize-space($currNode/SECTION_NAME)" /></SECTION_NAME>
    </xsl:if>
    <xsl:if test="normalize-space($currNode/PARTITION_NAME) != ''">
    <PARTITION_NAME><xsl:value-of select="normalize-space($currNode/PARTITION_NAME)" /></PARTITION_NAME>
    </xsl:if>
    -->
    <!-- Added By Murali - End -->
    
  </xsl:template>

  <!-- 
      - Transforms Text Type Fields.
      - Takes into account the different Block Types.
  -->
  <xsl:template name="TextType">
    <xsl:param name="currNode"  select="."/>
    <xsl:param name="relation"  select="."/>
    <xsl:param name="viewType"  select="."/>
    <xsl:param name="fieldSetFlag" select="." />

    
    <xsl:if test="$fieldSetFlag != 'Y'" >
        <xsl:attribute name="TABPAGE">
          <xsl:value-of select="$currNode/TAB_NAME"/>
        </xsl:attribute>
    </xsl:if>    

    <!-- Commented By Murali Start-->
    <!--
    <xsl:attribute name="ROW">
      <xsl:value-of select="$currNode/FIELD_ROW"/>
    </xsl:attribute>
    <xsl:attribute name="COL">
      <xsl:value-of select="$currNode/FIELD_COLUMN"/>
    </xsl:attribute>
    -->
    <!-- Commented By Murali End-->
    <!-- Added By Murali for Template -->
    <xsl:if test="normalize-space($currNode/SECTION_NAME) != '' and $fieldSetFlag != 'Y'">
        <xsl:attribute name="SECTION">
          <xsl:value-of select="$currNode/SECTION_NAME"/>
        </xsl:attribute>
    </xsl:if>
    <xsl:if test="normalize-space($currNode/PARTITION_NAME) != '' and $fieldSetFlag != 'Y'">
        <xsl:attribute name="PARTITION">
          <xsl:value-of select="$currNode/PARTITION_NAME"/>
        </xsl:attribute>
    </xsl:if>
    <!-- Added By Murali for Template End-->
    <!-- Added By Binson for Template Start-->
    <xsl:if test="normalize-space($currNode/SUBPARTITION_NAME) != ''">
        <xsl:attribute name="SUBPARTITION">
          <xsl:value-of select="$currNode/SUBPARTITION_NAME"/>
        </xsl:attribute>
    </xsl:if>
    <!-- Added By Binson for Template End -->
    <!-- 
        Attributes applicable only to single entry block/view:
        Attributes: QRY_COL, RSLT_COL
    -->
    <!-- Commented By Murali Start-->
    <!--
    <xsl:if test="$relation = '1' or $viewType = 'Single Entry'">
      <xsl:attribute name="QRY_COL">
        <xsl:value-of select="$currNode/QUERY_COL"/>
      </xsl:attribute>
      <xsl:attribute name="RSLT_COL">
        <xsl:value-of select="$currNode/RESULT_COL"/>
      </xsl:attribute>
    </xsl:if>
    -->
    <!-- Commented By Murali End-->
    <!-- Elements common to all Field Types -->
    <xsl:call-template name="CommonElements">
      <xsl:with-param name="currNode" select="."/>
    </xsl:call-template>

    <MAXLENGTH><xsl:value-of select="$currNode/MAX_LENGTH"/></MAXLENGTH>
    <!-- 
        Element applicable only to single entry block/view:
        Elements  : DBT, ABS_POS
    -->
    <xsl:if test="$relation = '1' or $viewType = 'Single Entry'">
      <xsl:variable name="dataSrcNode" select="//RAD_DATASOURCES[RAD_FIELDS[@Identifier=$currNode/@Identifier]]"/>
      <xsl:variable name="aliasName" select="$dataSrcNode/DATASRC_ALIAS"/>
      <!-- ABS_POS is applicable to fields in Single Entry blocks/Single Entry View Blocks -->
      <ABS_POS>
        <xsl:value-of select="$currNode/ABS_POS"/>
      </ABS_POS>
      <xsl:if test="normalize-space($currNode/DBT) !='' and normalize-space($currNode/DBC) != ''">
<!--  commented on Jul 9...since DBT is coming as DBT__alias__alias 
        <xsl:if test="normalize-space($aliasName) !=''">
          <DBT>
            <xsl:value-of select="concat($currNode/DBT,'__',$aliasName)"/>
          </DBT>
        </xsl:if>
        <xsl:if test="normalize-space($aliasName) =''">
          <DBT>
            <xsl:value-of select="$currNode/DBT"/>
          </DBT>
        </xsl:if>       -->
        <!-- sundar on 10 Aug
          <DBT>
            <xsl:value-of select="$currNode/DBT"/>
          </DBT> -->
      </xsl:if>
    </xsl:if>
    <!--LABEL is not mandatory in Single Entry block fields.-->
<!--
    <xsl:if test="normalize-space($currNode/LABEL_CODE) != ''">
      <LABEL><xsl:value-of select="$currNode/LABEL_CODE"/></LABEL>
    </xsl:if> -->
    <LABEL>
      <xsl:if test="normalize-space($currNode/LABEL_CODE) != ''">              
        <xsl:value-of select="$currNode/LABEL_CODE"/>
      </xsl:if>
      <xsl:if test="normalize-space($currNode/LABEL_CODE) = ''">
        <xsl:if test="normalize-space(//RAD_FIELDS[@Identifier=$currNode/@Identifier]/LABEL_LINK) != ''">
          <xsl:variable name="labelLink" select="//RAD_FIELDS[@Identifier=$currNode/@Identifier]/LABEL_LINK"/>
          <xsl:value-of select="//RAD_FIELDS[FIELD_NAME = $labelLink]/LABEL_CODE"/>
        </xsl:if>
      </xsl:if>
    </LABEL>

    <xsl:if test="normalize-space($currNode/DBC) != ''">
      <DBC><xsl:value-of select="$currNode/DBC"/></DBC>
    </xsl:if>

    <LABEL_LINK><xsl:value-of select="LABEL_LINK"/></LABEL_LINK>

    <!-- sundar May 10 for Text-Align property -->
    <TEXT-ALIGN>
      <xsl:value-of select="$currNode/TEXT_ALIGN"/>
    </TEXT-ALIGN>
  </xsl:template>

  <xsl:template name="LabelType">
    <xsl:param name="currNode"  select="."/>
    <xsl:param name="relation"  select="."/>
    <xsl:param name="viewType"  select="."/>
    <xsl:param name="fieldSetFlag" select="." />
    
    <xsl:if test="$fieldSetFlag != 'Y'" >
        <xsl:attribute name="TABPAGE">
          <xsl:value-of select="$currNode/TAB_NAME"/>
        </xsl:attribute>
    </xsl:if>    

    <!-- Commented By Murali Start-->
    <!--
    <xsl:attribute name="ROW">
      <xsl:value-of select="$currNode/FIELD_ROW"/>
    </xsl:attribute>
    <xsl:attribute name="COL">
      <xsl:value-of select="$currNode/FIELD_COLUMN"/>
    </xsl:attribute>
    -->
    <!-- Commented By Murali End-->
    <!-- Added By Murali for Template -->
    <xsl:if test="normalize-space($currNode/SECTION_NAME) != ''  and $fieldSetFlag != 'Y'">
        <xsl:attribute name="SECTION">
          <xsl:value-of select="$currNode/SECTION_NAME"/>
        </xsl:attribute>
    </xsl:if>
    <xsl:if test="normalize-space($currNode/PARTITION_NAME) != ''  and $fieldSetFlag != 'Y'">
        <xsl:attribute name="PARTITION">
          <xsl:value-of select="$currNode/PARTITION_NAME"/>
        </xsl:attribute>
    </xsl:if>
    <!-- Added By Murali for Template End-->
    <!-- Added By Binson for Template Start-->
    <xsl:if test="normalize-space($currNode/SUBPARTITION_NAME) != ''">
        <xsl:attribute name="SUBPARTITION">
          <xsl:value-of select="$currNode/SUBPARTITION_NAME"/>
        </xsl:attribute>
    </xsl:if>
    <!-- Added By Binson for Template End -->
    

    <!-- 
        Attributes applicable only to single entry block/view:
        Attributes: QRY_COL, RSLT_COL
    -->
    <!-- Commented By Murali End-->
    <!--
    <xsl:if test="$relation = '1' or $viewType = 'Single Entry'">
      <xsl:attribute name="QRY_COL">
        <xsl:value-of select="$currNode/QUERY_COL"/>
      </xsl:attribute>
      <xsl:attribute name="RSLT_COL">
        <xsl:value-of select="$currNode/RESULT_COL"/>
      </xsl:attribute>
    </xsl:if>
    -->
    <!-- Commented By Murali End-->
    <!-- Elements common to all Field Types -->
    <xsl:call-template name="CommonElements">
      <xsl:with-param name="currNode" select="."/>
    </xsl:call-template>
    <LABEL>
        <xsl:value-of select="$currNode/LABEL_CODE"/>
    </LABEL>
    <!-- 
        Element applicable only to single entry block/view:
        Elements  : DBT, ABS_POS
    -->
    <xsl:if test="$relation = '1' or $viewType = 'Single Entry'">
      <!-- ABS_POS is applicable to fields in Single Entry blocks/Single Entry View Blocks -->
      <ABS_POS>
        <xsl:value-of select="$currNode/ABS_POS"/>
      </ABS_POS>
    </xsl:if>
  </xsl:template>
  
  <xsl:template name="RadioType">
    <xsl:param name="currNode"  select="."/>
    <xsl:param name="relation"  select="."/>
    <xsl:param name="viewType"  select="."/>
    <xsl:param name="fieldSetFlag" select="." />

    <xsl:if test="$fieldSetFlag != 'Y'" >
        <xsl:attribute name="TABPAGE">
          <xsl:value-of select="$currNode/TAB_NAME"/>
        </xsl:attribute>
    </xsl:if>    
    <!-- Added By Binson for Template -->
    <xsl:if test="normalize-space($currNode/SECTION_NAME) != '' and $fieldSetFlag != 'Y'">
        <xsl:attribute name="SECTION">
          <xsl:value-of select="$currNode/SECTION_NAME"/>
        </xsl:attribute>
    </xsl:if>
    <xsl:if test="normalize-space($currNode/PARTITION_NAME) != '' and $fieldSetFlag != 'Y'">
        <xsl:attribute name="PARTITION">
          <xsl:value-of select="$currNode/PARTITION_NAME"/>
        </xsl:attribute>
    </xsl:if>
    <!-- Added By Murali for Template End-->
    <!-- Added By Binson for Template Start-->
    <xsl:if test="normalize-space($currNode/SUBPARTITION_NAME) != ''">
        <xsl:attribute name="SUBPARTITION">
          <xsl:value-of select="$currNode/SUBPARTITION_NAME"/>
        </xsl:attribute>
    </xsl:if>
    <!-- Added By Binson for Template End -->
    
    <!-- Commented By Murali Start-->
    <!--
    <xsl:attribute name="ROW">
      <xsl:value-of select="$currNode/FIELD_ROW"/>
    </xsl:attribute>
    <xsl:attribute name="COL">
      <xsl:value-of select="$currNode/FIELD_COLUMN"/>
    </xsl:attribute>
    -->
    <!-- Commented By Murali End-->
    <!-- 
        Attributes applicable only to single entry block/view:
        Attributes: QRY_COL, RSLT_COL
    -->
    <!-- Commented By Murali Start-->
    <!--
    <xsl:if test="$relation = '1' or $viewType = 'Single Entry'">
      <xsl:attribute name="QRY_COL">
        <xsl:value-of select="$currNode/QUERY_COL"/>
      </xsl:attribute>
      <xsl:attribute name="RSLT_COL">
        <xsl:value-of select="$currNode/RESULT_COL"/>
      </xsl:attribute>
    </xsl:if>
    -->
    <!-- Commented By Murali End-->

    <!-- Elements common to all Field Types -->
    <xsl:call-template name="CommonElements">
      <xsl:with-param name="currNode" select="."/>
    </xsl:call-template>
    <!--
    <LABEL>
        <xsl:value-of select="$currNode/LABEL_CODE"/>
    </LABEL> -->
    <LABEL>
      <xsl:if test="normalize-space($currNode/LABEL_CODE) != ''">              
        <xsl:value-of select="$currNode/LABEL_CODE"/>
      </xsl:if>
      <xsl:if test="normalize-space($currNode/LABEL_CODE) = ''">
        <xsl:if test="normalize-space(//RAD_FIELDS[@Identifier=$currNode/@Identifier]/LABEL_LINK) != ''">
          <xsl:variable name="labelLink" select="//RAD_FIELDS[@Identifier=$currNode/@Identifier]/LABEL_LINK"/>
          <xsl:value-of select="//RAD_FIELDS[FIELD_NAME = $labelLink]/LABEL_CODE"/>
        </xsl:if>
      </xsl:if>
    </LABEL>
    <!-- 
        Element applicable only to single entry block/view:
        Elements  : DBT, ABS_POS
    -->
    <xsl:if test="$relation = '1' or $viewType = 'Single Entry'">
      <!-- ABS_POS is applicable to fields in Single Entry blocks/Single Entry View Blocks -->
      <xsl:variable name="dataSrcNode" select="//RAD_DATASOURCES[RAD_FIELDS[@Identifier=$currNode/@Identifier]]"/>
      <xsl:variable name="aliasName" select="$dataSrcNode/DATASRC_ALIAS"/>
      <ABS_POS>
        <xsl:value-of select="$currNode/ABS_POS"/>
      </ABS_POS>
      <xsl:if test="normalize-space($currNode/DBT) !='' and normalize-space($currNode/DBC) != ''">
        <!-- sundar on 10 Aug
        <DBT>
          <xsl:value-of select="$currNode/DBT"/>
        </DBT> -->
<!--  commented on Jul 9...since DBT is coming as DBT__alias__alias         
        <xsl:if test="normalize-space($aliasName) !=''">
          <DBT>
            <xsl:value-of select="concat($currNode/DBT,'__',$aliasName)"/>
          </DBT>
        </xsl:if>
        <xsl:if test="normalize-space($aliasName) =''">
          <DBT>
            <xsl:value-of select="$currNode/DBT"/>
          </DBT>
        </xsl:if> -->
      </xsl:if>
    </xsl:if>
    <DBC><xsl:value-of select="$currNode/DBC"/></DBC>
    <VALUE>
      <xsl:value-of select="//RAD_FIELDS[@Identifier = $currNode/@Identifier]/VALUE"/>
    </VALUE>
    <!-- sundar added for radio options -->
    <WIDTH><xsl:value-of select="$currNode/WIDTH"/></WIDTH>
    <HEIGHT><xsl:value-of select="$currNode/HEIGHT"/></HEIGHT>
    <COLSPAN><xsl:value-of select="$currNode/COLSPAN"/></COLSPAN>
    <xsl:apply-templates select="RAD_BLK_FIELDS_OPTIONS" mode="Radio">
    </xsl:apply-templates>
  </xsl:template>

  <xsl:template match="RAD_BLK_FIELDS_OPTIONS" mode="Radio">
    <OPTION>
      <xsl:attribute name="ROW">
        <xsl:value-of select="@ROW"/>
      </xsl:attribute>
      <xsl:attribute name="COL">
        <xsl:value-of select="@COL"/>
      </xsl:attribute>
      <ID><xsl:value-of select="@ID"/></ID>
      <VALUE><xsl:value-of select="VALUE"/></VALUE>
      <LABEL><xsl:value-of select="LABEL"/></LABEL>
      <SELECTED>
        <xsl:if test="SELECTED = 'N'">
          <xsl:text>0</xsl:text>
        </xsl:if>
        <xsl:if test="SELECTED = 'Y'">
          <xsl:text>-1</xsl:text>
        </xsl:if>
      </SELECTED>
      <ABS_POS><xsl:value-of select="ABS_POS"/></ABS_POS>
    </OPTION>
  </xsl:template>
  <!-- sundar ends here -->
  
  <xsl:template name="ButtonType">
    <xsl:param name="currNode"  select="."/>
    <xsl:param name="relation"  select="."/>
    <xsl:param name="viewType"  select="."/>
    <xsl:param name="fieldSetFlag" select="." />
    <xsl:variable name="radFieldNode" select="//RAD_FIELDS[@Identifier=$currNode/@Identifier]"/>    
    
    <xsl:if test="$fieldSetFlag != 'Y'" >
        <xsl:attribute name="TABPAGE">
          <xsl:value-of select="$currNode/TAB_NAME"/>
        </xsl:attribute>
    </xsl:if>    
    <!-- Commented By Murali Start-->
    <!--
    <xsl:attribute name="ROW">
      <xsl:value-of select="$currNode/FIELD_ROW"/>
    </xsl:attribute>
    <xsl:attribute name="COL">
      <xsl:value-of select="$currNode/FIELD_COLUMN"/>
    </xsl:attribute>
    -->
    <!-- Commented By Murali End-->
    <!-- Added By Murali for Template -->
    <xsl:if test="normalize-space($currNode/SECTION_NAME) != ''  and $fieldSetFlag != 'Y'">
        <xsl:attribute name="SECTION">
          <xsl:value-of select="$currNode/SECTION_NAME"/>
        </xsl:attribute>
    </xsl:if>
    <xsl:if test="normalize-space($currNode/PARTITION_NAME) != ''  and $fieldSetFlag != 'Y'">
        <xsl:attribute name="PARTITION">
          <xsl:value-of select="$currNode/PARTITION_NAME"/>
        </xsl:attribute>
    </xsl:if>
    <!-- Added By Murali for Template End-->
    <!-- Added By Binson for Template Start-->
    <xsl:if test="normalize-space($currNode/SUBPARTITION_NAME) != ''">
        <xsl:attribute name="SUBPARTITION">
          <xsl:value-of select="$currNode/SUBPARTITION_NAME"/>
        </xsl:attribute>
    </xsl:if>
    <!-- Added By Binson for Template End -->
    

    <!-- 
        Attributes applicable only to single entry block/view:
        Attributes: QRY_COL, RSLT_COL
    -->
    <!-- Commented By Murali Start-->
    <!--
    <xsl:if test="$relation = '1' or $viewType = 'Single Entry'">
      <xsl:attribute name="QRY_COL">
        <xsl:value-of select="$currNode/QUERY_COL"/>
      </xsl:attribute>
      <xsl:attribute name="RSLT_COL">
        <xsl:value-of select="$currNode/RESULT_COL"/>
      </xsl:attribute>
    </xsl:if>
    -->
    <!-- Commented By Murali End-->
    <!-- Elements common to all Field Types -->
    <xsl:call-template name="CommonElements">
      <xsl:with-param name="currNode" select="."/>
    </xsl:call-template>
    <!--
    <LABEL>
        <xsl:value-of select="$currNode/LABEL_CODE"/>
    </LABEL>-->
    <LABEL>
      <xsl:if test="normalize-space($currNode/LABEL_CODE) != ''">              
        <xsl:value-of select="$currNode/LABEL_CODE"/>
      </xsl:if>
      <xsl:if test="normalize-space($currNode/LABEL_CODE) = ''">
        <xsl:if test="normalize-space(//RAD_FIELDS[@Identifier=$currNode/@Identifier]/LABEL_LINK) != ''">
          <xsl:variable name="labelLink" select="//RAD_FIELDS[@Identifier=$currNode/@Identifier]/LABEL_LINK"/>
          <xsl:value-of select="//RAD_FIELDS[FIELD_NAME = $labelLink]/LABEL_CODE"/>
        </xsl:if>
      </xsl:if>
    </LABEL>
    <!-- 
        Element applicable only to single entry block/view:
        Elements  : DBT, ABS_POS
    -->
    <xsl:if test="$relation = '1' or $viewType = 'Single Entry'">
      <!-- ABS_POS is applicable to fields in Single Entry blocks/Single Entry View Blocks -->
      <ABS_POS>
        <xsl:value-of select="$currNode/ABS_POS"/>
      </ABS_POS>
    </xsl:if>
    <xsl:if test="normalize-space(IMG_SRC) != ''">
      <SRC><xsl:value-of select="IMG_SRC"/></SRC>
    </xsl:if>
    <xsl:if test="count($currNode/ALT_IMAGE) &gt; 0 and  $currNode/ALT_IMAGE != ''">
      <ALT><xsl:value-of select="ALT_IMAGE"/></ALT>
    </xsl:if>
    <xsl:if test="count($currNode/POSITION) &gt; 0 and  $currNode/POSITION != ''">
      <VALIGN><xsl:value-of select="POSITION"/></VALIGN>
    </xsl:if>
    <xsl:if test="count($currNode/ALIGNMENT) &gt; 0 and  $currNode/ALIGNMENT != ''">
      <HALIGN><xsl:value-of select="ALIGNMENT"/></HALIGN>
    </xsl:if>
    <xsl:if test="normalize-space($currNode/FIELD_NAME) = 'BTN_EXIT'">
        <VALUE>Exit</VALUE>
    </xsl:if>
    <xsl:if test="normalize-space($currNode/FIELD_NAME) = 'BTN_OK'">
        <VALUE>Ok</VALUE>
    </xsl:if>
    <xsl:if test="normalize-space($radFieldNode/SERVICE_CALL_REQ) = 'Y'">
    <xsl:if test="count($radFieldNode/SERVICE_NAME) &gt; 0 and normalize-space($radFieldNode/SERVICE_NAME) != ''">
      <SERVICE_NAME><xsl:value-of select="normalize-space($radFieldNode/SERVICE_NAME)"/></SERVICE_NAME>
    </xsl:if>
    <xsl:if test="count($radFieldNode/SERVICE_OPERATION) &gt; 0 and  normalize-space($radFieldNode/SERVICE_OPERATION) != ''">
      <SERVICE_OPERATION><xsl:value-of select="normalize-space($radFieldNode/SERVICE_OPERATION)"/></SERVICE_OPERATION>
    </xsl:if>
    <xsl:if test="count($radFieldNode/REQUEST_TYPE) &gt; 0 and  normalize-space($radFieldNode/REQUEST_TYPE) != ''">
      <REQUEST_TYPE><xsl:value-of select="normalize-space($radFieldNode/REQUEST_TYPE)"/></REQUEST_TYPE>
    </xsl:if>
    <xsl:if test="count($radFieldNode/SERVICE_CALL_REQ) &gt; 0">
        <EVENT>
          <NAME>onClick</NAME>
          <FUNCTION>
                <xsl:value-of select="concat('fnServiceCall(','&quot;',$radFieldNode/SERVICE_NAME,'&quot;',',','&quot;',$radFieldNode/SERVICE_OPERATION,'&quot;',',','&quot;',$radFieldNode/REQUEST_TYPE,'&quot;',')')"/>
          </FUNCTION>
        </EVENT>    
	</xsl:if>
    </xsl:if>
  </xsl:template>
<!-- Added for ocx starts 09/10/08 -->
  <xsl:template name="OCXType">  
    <xsl:param name="currNode" select="."/>
    <xsl:call-template name="CommonElements">
    </xsl:call-template>
    <OBJECT>
      <xsl:attribute name="ID">
        <xsl:value-of select="$currNode/FIELD_NAME"/>
      </xsl:attribute>
      <xsl:attribute name="CLASSID">
        <xsl:variable name="fieldName" select="$currNode/FIELD_NAME"/>
        <xsl:variable name="dataBaseTable" select="$currNode/DBT"/>
        <xsl:value-of select="//RAD_FUNCTIONS/RAD_DATASOURCES[DATASRC_NAME=$dataBaseTable]/RAD_FIELDS[FIELD_NAME = $fieldName]/CLASSID"/>
      </xsl:attribute>
    </OBJECT>
  </xsl:template>
<!-- Added for ocx ends 09/10/08 -->
  <xsl:template name="FieldSetType">
    <xsl:param name="currNode"  select="."/>
    <xsl:param name="relation"  select="."/>
    <xsl:param name="viewType"  select="."/>
    
    <xsl:attribute name="TABPAGE">
      <xsl:value-of select="$currNode/TAB_NAME"/>
    </xsl:attribute>
    <!-- Commented By Murali Start-->
    <!--
    <xsl:attribute name="ROW">
      <xsl:value-of select="$currNode/FIELD_ROW"/>
    </xsl:attribute>
    <xsl:attribute name="COL">
      <xsl:value-of select="$currNode/FIELD_COLUMN"/>
    </xsl:attribute>
    -->
    <!-- Commented By Murali End-->
    <!-- 
        Attributes applicable only to single entry block/view:
        Attributes: QRY_COL, RSLT_COL
    -->
    <!-- Commented By Murali Start-->
    <!--
    <xsl:if test="$relation = '1' or $viewType = 'Single Entry'">
      <xsl:attribute name="QRY_COL">
        <xsl:value-of select="$currNode/QUERY_COL"/>
      </xsl:attribute>
      <xsl:attribute name="RSLT_COL">
        <xsl:value-of select="$currNode/RESULT_COL"/>
      </xsl:attribute>
    </xsl:if>
    -->
    <!-- Commented By Murali End-->
    <!-- Elements common to all Field Types -->
    <xsl:call-template name="CommonElements">
      <xsl:with-param name="currNode" select="."/>
    </xsl:call-template>
    <LABEL>
        <xsl:value-of select="$currNode/LABEL_CODE"/>
    </LABEL>
    <!-- 
        Element applicable only to single entry block/view:
        Elements  : DBT, ABS_POS
    -->
    <xsl:if test="$relation = '1' or $viewType = 'Single Entry'">
      <!-- ABS_POS is applicable to fields in Single Entry blocks/Single Entry View Blocks -->
      <ABS_POS>
        <xsl:value-of select="$currNode/ABS_POS"/>
      </ABS_POS>
    </xsl:if>
    <xsl:if test="normalize-space(IMG_SRC) != ''">
      <SRC><xsl:value-of select="IMG_SRC"/></SRC>
    </xsl:if>
  </xsl:template>

  <!-- 
      - Transforms Hidden Type Fields.
      - Takes into account the different Block Types.
  -->
  <xsl:template name="HiddenType">
    <xsl:param name="currNode"  select="."/>
    <xsl:param name="relation"  select="."/>
    <xsl:param name="viewType"  select="."/>
    <xsl:param name="fieldSetFlag" select="." />
    
    <xsl:if test="$fieldSetFlag != 'Y'" >
        <xsl:attribute name="TABPAGE">
          <xsl:value-of select="$currNode/TAB_NAME"/>
        </xsl:attribute>
    </xsl:if>    
    <!-- Added By Murali for Template -->
    <xsl:if test="normalize-space($currNode/SECTION_NAME) != ''  and $fieldSetFlag != 'Y'">
        <xsl:attribute name="SECTION">
          <xsl:value-of select="$currNode/SECTION_NAME"/>
        </xsl:attribute>
    </xsl:if>
    <xsl:if test="normalize-space($currNode/PARTITION_NAME) != ''  and $fieldSetFlag != 'Y'">
        <xsl:attribute name="PARTITION">
          <xsl:value-of select="$currNode/PARTITION_NAME"/>
        </xsl:attribute>
    </xsl:if>
    <!-- Added By Murali for Template End-->
    <!-- Added By Binson for Template Start-->
    <xsl:if test="normalize-space($currNode/SUBPARTITION_NAME) != ''">
        <xsl:attribute name="SUBPARTITION">
          <xsl:value-of select="$currNode/SUBPARTITION_NAME"/>
        </xsl:attribute>
    </xsl:if>
    <!-- Added By Binson for Template End -->

    <!-- Elements common to all Field Types -->
    <xsl:call-template name="CommonElements">
      <xsl:with-param name="currNode" select="."/>
    </xsl:call-template>

    <!-- 
        Element applicable only to single entry block/view:
        Elements  : DBT, ABS_POS
    -->
    <xsl:if test="$relation = '1' or $viewType = 'Single Entry'">
      <xsl:variable name="dataSrcNode" select="//RAD_DATASOURCES[RAD_FIELDS[@Identifier=$currNode/@Identifier]]"/>
      <xsl:variable name="aliasName" select="$dataSrcNode/DATASRC_ALIAS"/>
      <xsl:if test="normalize-space($currNode/DBT) !='' and normalize-space($currNode/DBC) != ''">
        <!-- sundar on 10 Aug      
        <DBT>
          <xsl:value-of select="$currNode/DBT"/>
        </DBT>  -->
<!--  commented on Jul 9...since DBT is coming as DBT__alias__alias       
         <xsl:if test="normalize-space($aliasName) !=''">
          <DBT>
            <xsl:value-of select="concat($currNode/DBT,'__',$aliasName)"/>
          </DBT>
        </xsl:if>
        <xsl:if test="normalize-space($aliasName) =''">
          <DBT>
            <xsl:value-of select="$currNode/DBT"/>
          </DBT>
        </xsl:if>
        -->
      </xsl:if>
    </xsl:if>
    <xsl:if test="normalize-space(DBC) != ''">
      <DBC><xsl:value-of select="$currNode/DBC"/></DBC>
    </xsl:if>
    <!--LABEL is not mandatory in Single Entry block fields.-->
    <xsl:if test="normalize-space($currNode/LABEL_CODE) != ''">
      <LABEL>
        <xsl:value-of select="$currNode/LABEL_CODE"/>
      </LABEL>
    </xsl:if>
  </xsl:template>
</xsl:stylesheet>




