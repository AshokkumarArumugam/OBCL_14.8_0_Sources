<?xml version ="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:str="http://www.w3.org/1999/XSL/Transform">
  <xsl:variable name="headerCount" select="count(/SCREEN/HEADER/PAGE)"/>
  <xsl:template match="/UDTMAINT">
    <RAD_FUNCTIONS ID="1" Type="SINGLE">
    <!--
      <MODULE_CODE>
        <xsl:value-of select="@MODULE_CODE"/>
      </MODULE_CODE>      
      <TXT_FUNCTION_ID>
        <xsl:value-of select="@FUNCTIONID"/>
      </TXT_FUNCTION_ID>
      -->
      <MODULE_NAME>
        <xsl:value-of select="./MODULE_NAME"/>
      </MODULE_NAME>
      <TXT_FUNCTION_NAME>
        <xsl:value-of select="FUNCTION_NAME"/>
      </TXT_FUNCTION_NAME>
      <UI_TYPE>
        <xsl:value-of select="UI_TYPE"/>
      </UI_TYPE>
      <xsl:apply-templates select="DATASOURCE"/>
      <xsl:apply-templates select="SCREEN"/>
       <xsl:apply-templates select="BLOCK[ID != 'BLK_STDBUTTONS' and ID != 'BLK_STDBUTTONS_IMG' and ID != 'BLK_CST_BUTTONS']"/> 
      
      <!-- handler to create buttons node with respect to screen name -->
      <xsl:for-each select="SCREEN">
        <xsl:variable name="screenName" select="@NAME"/>
        <xsl:if test="count(//BLOCK[@SCREEN= $screenName and (ID='BLK_STDBUTTONS' or ID='BLK_STDBUTTONS_IMG' or ID='BLK_CST_BUTTONS')]) &gt; 0 ">
          <BUTTONS ID="{position()}" TYPE="MULTIPLE">
<!-- sundar Feb 19 StdBtns are not supposed to be common Blks 
            <xsl:variable name = "stdCommon" select = "//BLOCK[@SCREEN= $screenName and ID='BLK_STDBUTTONS']/LINK_FILE"/>
            <xsl:if test = "$stdCommon != ''">
              <STDBUTTONS_SE ID= "1" TYPE = "SINGLE">
                <CHK_COMMON_STD_BTNS>Y</CHK_COMMON_STD_BTNS>
              </STDBUTTONS_SE>
            </xsl:if>  
            <xsl:if test = "$stdCommon = ''">
              <STDBUTTONS_SE ID= "1" TYPE = "SINGLE">
                <CHK_COMMON_STD_BTNS>N</CHK_COMMON_STD_BTNS>
             </STDBUTTONS_SE>
            </xsl:if>   -->
            
            

            <TXT_SEQ_NO>
              <xsl:value-of select="position()"/>
            </TXT_SEQ_NO>
            <TXT_SCR_NAME>
              <xsl:value-of select="$screenName"/>
            </TXT_SCR_NAME>
            <xsl:apply-templates select="//BLOCK[@SCREEN = $screenName and (ID='BLK_STDBUTTONS' or ID='BLK_STDBUTTONS_IMG')]/FIELD"
                                 mode="stdButtonFields"/>
            <xsl:apply-templates select="//BLOCK[@SCREEN = $screenName and ID='BLK_CST_BUTTONS']/FIELD"
                                 mode="custButtonsFields"/>
          </BUTTONS>
        </xsl:if>
      </xsl:for-each>
      <!--work flow -->
      <xsl:apply-templates select="WORKFLOW_MAINT/WORKFLOW"/>
    </RAD_FUNCTIONS>
  </xsl:template>
  <xsl:template match="DATASOURCE">
    <DATASOURCES ID="{position()}" TYPE="MULTIPLE">
      <DATA_SOURCE>
        <!-- <xsl:value-of select="@NAME"/> -->
        <xsl:call-template name="str:to-lower">
          <xsl:with-param name="text" select="@NAME"/>
        </xsl:call-template>
      </DATA_SOURCE>
      <DATA_SOURCE_TYPE>
        <xsl:call-template name="str:to-lower">
          <xsl:with-param name="text" select="@TYPE"/>
        </xsl:call-template>
      </DATA_SOURCE_TYPE>
      <PARENT_DATASRC>
        <!-- <xsl:value-of select="@PARENT"/> -->
        <xsl:call-template name="str:to-lower">
          <xsl:with-param name="text" select="@PARENT"/>
        </xsl:call-template>
      </PARENT_DATASRC>
      <RELATION>
        <!-- <xsl:value-of select="@RELATION"/> -->
        <xsl:call-template name="str:to-lower">
          <xsl:with-param name="text" select="@RELATION"/>
        </xsl:call-template>
      </RELATION>
      <RELATION_TYPE>
        <xsl:value-of select="@REL_TYPE"/>
      </RELATION_TYPE>
      <xsl:apply-templates select="DSFIELDS"/>
    </DATASOURCES>
  </xsl:template>
  <xsl:template match="DSFIELDS">
    <!-- <xsl:copy-of select="."/> -->
    <DSFIELDS ID="{position()}" Type="MULTIPLE">
      <SEQ_NO>
        <xsl:value-of select="position()"/>
      </SEQ_NO>
      <NAME>
        <xsl:call-template name="str:to-lower">
          <xsl:with-param name="text" select="NAME"/>
        </xsl:call-template>
      </NAME>
      <DATATYPE>
        <xsl:value-of select="DATATYPE"/>
      </DATATYPE>
      <LENGTH>
        <xsl:value-of select="LENGTH"/>
      </LENGTH>
    </DSFIELDS>
  </xsl:template>
  <xsl:template match="SCREEN">
    <SCREENS ID="{position()}" TYPE="MULTIPLE">
      <SEQUENCE_NO>
        <xsl:value-of select="@SEQUENCE_NO"/>
      </SEQUENCE_NO>
      <SCREEN_ID>
        <xsl:value-of select="@NAME"/>
      </SCREEN_ID>
      <SCREEN_TYPE>
        <xsl:value-of select="@SCREEN_TYPE"/>
      </SCREEN_TYPE>
      <SCREEN_POS>
        <xsl:value-of select="@POSITION"/>
      </SCREEN_POS>
      <SCREEN_HEIGHT>
        <xsl:value-of select="@HEIGHT"/>
      </SCREEN_HEIGHT>
      <SCREEN_WIDTH>
        <xsl:value-of select="@WIDTH"/>
      </SCREEN_WIDTH>
      <xsl:apply-templates select="HEADER/PAGE"/>
      <xsl:apply-templates select="TAB/PAGE"/>
    </SCREENS>
  </xsl:template>
  <xsl:template match="HEADER/PAGE">
    <TABPAGES ID="{position()}" TYPE="MULTIPLE">
      <SEQUENCE_NO>
        <xsl:value-of select="position()"/>
      </SEQUENCE_NO>
      <TAB_PAGE_ID>
        <xsl:value-of select="@ID"/>
      </TAB_PAGE_ID>
      <TAB_TYPE>Header</TAB_TYPE>
      <HEIGHT>
        <xsl:value-of select="@HEIGHT"/>
      </HEIGHT>
      <ORDER>
        <xsl:value-of select="position()"/>
      </ORDER>
    </TABPAGES>
  </xsl:template>
  <xsl:template match="TAB/PAGE">
    <TABPAGES ID="{position()+count(../../HEADER/PAGE)}" TYPE="MULTIPLE">
      <SEQUENCE_NO>
        <xsl:value-of select="position()+count(../../HEADER/PAGE)"/>
      </SEQUENCE_NO>
      <TAB_PAGE_ID>
        <xsl:value-of select="@ID"/>
      </TAB_PAGE_ID>
      <TAB_TYPE>Tab</TAB_TYPE>
      <HEIGHT>
        <xsl:value-of select="@HEIGHT"/>
      </HEIGHT>
      <ORDER>
        <xsl:value-of select="position()"/>
      </ORDER>
    </TABPAGES>
  </xsl:template>
  <xsl:template match="BLOCK">
    <xsl:variable name="Block_Id" select="ID"/>
    <BLOCKS ID="{position()}" TYPE="MULTIPLE">
      <SEQ_NO>
        <xsl:value-of select="position()"/>
      </SEQ_NO>
      <BLOCK_ID>
        <!-- <xsl:value-of select="./ID"/> -->
        <xsl:call-template name="str:to-upper">
          <xsl:with-param name="text" select="./ID"/>
        </xsl:call-template>
      </BLOCK_ID>
      <xsl:variable name="isCommon" select="LINK_FILE"/>
      <xsl:if test="$isCommon = ''">
        <COMMON>N</COMMON>
            </xsl:if>
              <xsl:if test="$isCommon != ''">
                <COMMON>Y</COMMON>
                    </xsl:if>
                      <BLOCK_ENTRY_TYPE>
                        <xsl:if test="@TYPE = 'Multiple Entry'">M</xsl:if>
                        <xsl:if test="@TYPE = 'Single Entry'">S</xsl:if>
                      </BLOCK_ENTRY_TYPE>
                      <SCREEN_ID>
                        <xsl:value-of select="@SCREEN"/>
                      </SCREEN_ID>
                      <SEL_TABPAGE>
                        <xsl:value-of select="@TABPAGE"/>
                      </SEL_TABPAGE>
                      <ORDER>
                        <xsl:value-of select="position()"/>
                      </ORDER>
                      <BLK_TABPAGE_HIDDEN>
                        <xsl:value-of select="@TABPAGE"/>
                      </BLK_TABPAGE_HIDDEN>
                      <REFERRED_COMMON></REFERRED_COMMON>
                      <xsl:variable name="Blk_Node" select="."/>
                      <xsl:apply-templates select="$Blk_Node//FIELD">
                        <xsl:with-param name="Block_Id" select="$Block_Id"/>
                      </xsl:apply-templates>
                      <!-- Call the Handler for attributes of referred block  -->
                      <xsl:if test = "$isCommon != ''">
                        <xsl:apply-templates select="$Blk_Node//FIELD[TYPE != 'FIELDSET']" mode = "RefBlock">
                        </xsl:apply-templates>
                      </xsl:if>
                      
    </BLOCKS>
  </xsl:template>
  
   <xsl:template match = "FIELD" mode = "RefBlock">
      <BLOCKS_ATTRIBUTE ID="{position()}" Type="MULTIPLE">
         <TXT_SNO><xsl:value-of select="position()"/></TXT_SNO>
         <TXT_FIELD_NAME><xsl:value-of select = "NAME"/> </TXT_FIELD_NAME>
         <TXT_DEFAULT_VALUE><xsl:value-of select="CUSTOM/VALUE"/></TXT_DEFAULT_VALUE> 
         
         <xsl:variable name="Req" select="REQUIRED"/>
         <xsl:variable name="Ro" select="READ_ONLY"/>
         <xsl:variable name="Ucase" select="UPPERCASE"/>
         <xsl:variable name="refFld" select="REF_FIELD"/>

         <xsl:variable name="Chk_Req">
           <xsl:choose>
              <xsl:when test="$Req = '-1'">
                <xsl:text>Y</xsl:text>
              </xsl:when>
              <xsl:otherwise>
                <xsl:text>N</xsl:text>
              </xsl:otherwise>
            </xsl:choose>
         </xsl:variable>
         
         <xsl:variable name="Chk_Ro">
           <xsl:choose>
              <xsl:when test="$Ro = '-1'">
                <xsl:text>Y</xsl:text>
              </xsl:when>
              <xsl:otherwise>
                <xsl:text>N</xsl:text>
              </xsl:otherwise>
            </xsl:choose>
         </xsl:variable>
         
         <xsl:variable name="Chk_Ucase">
           <xsl:choose>
              <xsl:when test="$Ucase = '-1'">
                <xsl:text>Y</xsl:text>
              </xsl:when>
              <xsl:otherwise>
                <xsl:text>N</xsl:text>
              </xsl:otherwise>
            </xsl:choose>
         </xsl:variable>
         
         <CHK_REQ><xsl:value-of select="$Chk_Req"/></CHK_REQ>
         <CHK_RO><xsl:value-of select="$Chk_Ro"/></CHK_RO>
         <CHK_UCASE><xsl:value-of select="$Chk_Ucase"/></CHK_UCASE>
<!--         <SEL_REF_BLK>none</SEL_REF_BLK> 
         <SEL_REF_FLD>none</SEL_REF_FLD> 
         <FORM_FLD></FORM_FLD>   -->
         <xsl:variable name="referFld">
          <xsl:if test="$refFld != ''">
            <xsl:value-of select="substring-after($refFld,'__')"/>
          </xsl:if>
        </xsl:variable>
        <xsl:variable name="referBlk">
          <xsl:if test="$refFld != ''">
            <xsl:value-of select="substring-before($refFld,'__')"/>
            <xsl:if test="contains($referFld,'__')">
              <xsl:value-of select="concat('__',substring-before($referFld,'__'))"/>
            </xsl:if>
          </xsl:if>
        </xsl:variable>
         <SEL_REF_BLK>
            <xsl:value-of select = "$referBlk"/>
         </SEL_REF_BLK>
         <SEL_REF_FLD>
            <xsl:if test="contains($referFld,'__')">
                <xsl:value-of select="substring-after($referFld,'__')"/>
            </xsl:if>
            <xsl:if test="not(contains($referFld,'__'))">
                <xsl:value-of select="$referFld"/>
            </xsl:if>
         </SEL_REF_FLD>
         <xsl:apply-templates select = "EVENT">
         </xsl:apply-templates>
      </BLOCKS_ATTRIBUTE>
   </xsl:template>
   
   <xsl:template match = "EVENT">
    <FIELD_EVENTS ID="{position()}" Type="MULTIPLE">
        <SEQ_NO><xsl:value-of select = "position()"/></SEQ_NO> 
        <TYPE><xsl:value-of select ="NAME"/></TYPE> 
        <FUNCTION><xsl:value-of select ="FUNCTION"/></FUNCTION> 
    </FIELD_EVENTS>
   </xsl:template>
   
  <xsl:template match="FIELD">
    <xsl:param name="Block_Id" select="."/>
    <xsl:variable name="Fld_Parent_Id" select="../ID"/>
    <xsl:variable name="Fld_ancestor_Id" select="../../ID"/>
    <xsl:if test="$Fld_Parent_Id = $Block_Id or  $Fld_ancestor_Id =  $Block_Id">
      <FIELDS ID="{position()}" Type="MULTIPLE">
        <SEQ_NO>
          <xsl:value-of select="position()"/>
        </SEQ_NO>
        <NAME>
          <xsl:value-of select="./NAME"/>
        </NAME>
        <DBT>
          <!-- <xsl:value-of select="./DBT"/> -->
          <xsl:call-template name="str:to-lower">
            <xsl:with-param name="text" select="./DBT"/>
          </xsl:call-template>
        </DBT>
        <DBC>
          <!-- <xsl:value-of select="./DBC"/> -->
          <xsl:call-template name="str:to-lower">
            <xsl:with-param name="text" select="./DBC"/>
          </xsl:call-template>
        </DBC>
        <!-- if the TABPAGE attribute is null then pick from the Block node -->
        <FLD_TAB_PAGE>
          <xsl:if test="count(@TABPAGE) = 0">
            <xsl:value-of select="../@TABPAGE"/>
          </xsl:if>
          <xsl:if test="count(@TABPAGE) &gt; 0">
            <xsl:value-of select="@TABPAGE"/>
          </xsl:if>
        </FLD_TAB_PAGE>
        <FLD_TYPE>
          <xsl:value-of select="./TYPE"/>
        </FLD_TYPE>
        <DATATYPE>
          <xsl:value-of select="./DTYPE"/>
        </DATATYPE>
        <DLENGTH>
          <xsl:value-of select="./MAXLENGTH "/>
        </DLENGTH>
        <xsl:if test="./TYPE = 'SELECT'">
          <xsl:for-each select="./OPTION">
            <SELECT ID="{position()}" TYPE="MULTIPLE">
              <SEQUENCE_NO>
                <xsl:value-of select="position()"/>
              </SEQUENCE_NO>
              <FLD_VALUE>
                <xsl:value-of select="@VALUE"/>
              </FLD_VALUE>
              <xsl:if test="@SELECTED = -1">
                <DEFAULT>Y</DEFAULT>
              </xsl:if>
            </SELECT>
          </xsl:for-each>
        </xsl:if>
        <xsl:if test="./TYPE = 'RADIO'">
          <Here/>
          <xsl:for-each select="./OPTION">
            <RADIO ID="{position()}" TYPE="MULTIPLE">
              <SEQUENCE_NO>
                <xsl:value-of select="position()"/>
              </SEQUENCE_NO>
              <FLD_VALUE>
                <xsl:value-of select="@VALUE"/>
              </FLD_VALUE>
              <xsl:if test="@SELECTED = -1">
                <DEFAULT>Y</DEFAULT>
              </xsl:if>
            </RADIO>
          </xsl:for-each>
        </xsl:if>
        <xsl:if test="./TYPE = 'AMOUNT'">
          <xsl:variable name="relFld" select="RELATED_FIELD"/>
          <xsl:variable name="relatedFld">
              <xsl:if test="$relFld != ''">
                <xsl:value-of select="substring-after($relFld,'__')"/>
              </xsl:if>
          </xsl:variable>
          <xsl:variable name="relatedBlk">
              <xsl:if test="$relFld != ''">
                <xsl:value-of select="substring-before($relFld,'__')"/>
                <xsl:if test="contains($relatedFld,'__')">
                  <xsl:value-of select="concat('__',substring-before($relatedFld,'__'))"/>
                </xsl:if>
              </xsl:if>
          </xsl:variable>
              
          <AMOUNTFLDS ID="1" Type="SINGLE">
            <MIN_VAL>
              <xsl:value-of select="./MIN_VAL"/>
            </MIN_VAL>
            <MAX_VAL>
              <xsl:value-of select="./MAX_VAL"/>
            </MAX_VAL>
            <ALIGN>
              <xsl:value-of select="./ALIGN"/>
            </ALIGN>
            <FORMAT>
              <xsl:value-of select="./FORMAT"/>
            </FORMAT>
            <REL_BLOCK>
                <xsl:value-of select="$relatedBlk"/>
            </REL_BLOCK>
            <REL_FIELD>
                <xsl:if test="contains($relatedFld,'__')">
                   <xsl:value-of select="substring-after($relatedFld,'__')"/>
                </xsl:if>
                <xsl:if test="not(contains($relatedFld,'__'))">
                   <xsl:value-of select="$relatedFld"/>
                </xsl:if>
            </REL_FIELD>
          </AMOUNTFLDS>
        </xsl:if>
        <xsl:if test="./TYPE = 'CHECK'">
          <CHECKFLDS ID="1" Type="SINGLE">
            <CHK_VAL>Y</CHK_VAL>
            <UNCHK_VAL>N</UNCHK_VAL>
            <DEFAULT_TYPE>
              <xsl:value-of select="./DEFCHK"/>
            </DEFAULT_TYPE>
          </CHECKFLDS>
        </xsl:if>
        <!-- TextArea Handler -->
        <xsl:if test="./TYPE = 'TEXTAREA'">
          <TEXTAREA ID="1" TYPE="SINGLE">
            <xsl:variable name="rows" select="ROWS"/>
            <xsl:variable name="cols" select="COLS"/>            
            <ROWS_VAL><xsl:value-of select="$rows"/></ROWS_VAL>
            <COLS_VAL><xsl:value-of select="$cols"/></COLS_VAL> 
          </TEXTAREA>
         </xsl:if> 
        
        <xsl:if test="./TYPE = 'LOV'">
          <!-- <xsl:variable name="dbt" select="./DBC"/> -->
          <xsl:variable name="dbt">
            <xsl:call-template name="str:to-upper">
              <xsl:with-param name="text" select="./NAME"/>
            </xsl:call-template>
          </xsl:variable>
          <!-- <xsl:variable name="blkId" select="../ID"/> -->
          <xsl:variable name="blkId">
            <xsl:variable name="tempBlkId">
                <xsl:choose>
                    <xsl:when test="../TYPE = 'FIELDSET'">
                        <xsl:value-of select="../../ID"/>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:value-of select="../ID"/>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:variable>
            <xsl:call-template name="str:to-upper">
              <xsl:with-param name="text" select="$tempBlkId"/>
            </xsl:call-template>  
<!--  
            <xsl:call-template name="str:to-upper">
              <xsl:with-param name="text" select="../ID"/>
            </xsl:call-template>   -->
          </xsl:variable>
          <!--<xsl:apply-templates select="//LOV[@BLOCK_ID='{../ID}']/FIELD[@NAME='{./DBC}']/LOV_DETTAILS"/>-->
          <xsl:apply-templates select="//LOV[@BLOCK_ID=$blkId]/FIELD[@NAME=$dbt]/LOV_DETTAILS"/>
          <!--  sundar added for handling the lov for fields within the fieldset  -->
        </xsl:if>
        <!-- Check For Field Sets -->
        <xsl:if test="./TYPE = 'FIELDSET'">
                 <xsl:call-template name="FieldSet">
            <xsl:with-param name="Block_Id" select="$Block_Id"/>
            <xsl:with-param name="Fld_Name" select="./NAME"/>
          </xsl:call-template>
        </xsl:if>
      </FIELDS>
    </xsl:if>
  </xsl:template>
  <xsl:template name="FieldSet">
    <xsl:param name="Block_Id" select="."/>
    <xsl:param name="Fld_Name" select="."/>
    <!-- <xsl:for-each select = "//BLOCK[ID = $Block_Id]/FIELD">  -->
    <xsl:for-each select="//FIELD[TYPE != 'FIELDSET']">
      <xsl:variable name="Fld_Parent_Id" select="../ID"/>
      <xsl:variable name="Fld_ancestor_Id" select="../../ID"/>
      <xsl:if test="$Fld_Parent_Id = $Block_Id or  $Fld_ancestor_Id =  $Block_Id">
        <xsl:variable name="isIncluded">
          <xsl:if test="../NAME = $Fld_Name">
            <xsl:if test="../TYPE = 'FIELDSET'">Y</xsl:if>
            <xsl:if test="../TYPE != 'FIELDSET'">N</xsl:if>
          </xsl:if>
        </xsl:variable>
        <xsl:variable name="fldSetName">
          <xsl:if test="$isIncluded = 'Y'">
            <xsl:value-of select="../NAME"/>
          </xsl:if>
          <xsl:if test="$isIncluded = 'N'">
          </xsl:if>
        </xsl:variable>
        <FIELDSET ID="{position()}" Type="MULTIPLE">
          <SEQUENCE_NO>
            <xsl:value-of select="position()"/>
          </SEQUENCE_NO>
          <FLD_NAME>
            <xsl:value-of select="NAME"/>
          </FLD_NAME>
          <FLD_SET_NAME>
            <xsl:value-of select="$fldSetName"/>
          </FLD_SET_NAME>
          <CHK_INCLUDE>
            <xsl:value-of select="$isIncluded"/>
          </CHK_INCLUDE>
        </FIELDSET>
      </xsl:if>
    </xsl:for-each>
  </xsl:template>
  <xsl:template match="LOV_DETTAILS">
    <LOV ID="{position()}" Type="MULTIPLE">
      <SEQ_NO>
        <xsl:value-of select="position()"/>
      </SEQ_NO>
      <TYPE>
        <xsl:value-of select="@TYPE"/>
      </TYPE>
      <QUERY>
        <xsl:value-of select="./QUERY"/>
      </QUERY>
      <FETCH_SIZE>
        <xsl:value-of select="@FS"/>
      </FETCH_SIZE>
      <PAGE_SIZE>
        <xsl:value-of select="@PS"/>
      </PAGE_SIZE>
      <QRY_TYPE>
        <xsl:value-of select="@QRY_TYPE"/>
      </QRY_TYPE>
      <xsl:apply-templates select="./QRY_COLS"/>
      <xsl:apply-templates select="./BIND_VARS"/>
    </LOV>
  </xsl:template>
  <xsl:template match="QRY_COLS">
    <LOVQRYCOLS ID="{position()}" Type="MULTIPLE">
      <SEQ_NO>
        <xsl:value-of select="position()"/>
      </SEQ_NO>
      <QRY_COL>
        <xsl:value-of select="./QRY_COL"/>
      </QRY_COL>
      <DATA_TYPE>
        <xsl:value-of select="./DATA_TYPE"/>
      </DATA_TYPE>
      <!-- Added by Reddy Prasad -->
      <SEL_REDUCTION_FLD>
        <xsl:value-of select="./SEL_REDUCTION_FLD"/>
      </SEL_REDUCTION_FLD>
      <SEL_BLK_ID>
        <xsl:value-of select="./SEL_BLK_ID"/>
      </SEL_BLK_ID>
      <SEL_BLK_FLD>
        <xsl:value-of select="./SEL_BLK_FLD"/>
      </SEL_BLK_FLD>
      <FORM_FLD>
        <xsl:value-of select="./FORM_FLD"/>
      </FORM_FLD>
      <!-- <RETURN_FLD>
                            <xsl:value-of select="./RETURN_FLD "/>
                     </RETURN_FLD>
                     <REDUCTION_FLD>
                            <xsl:value-of select="./REDUCTION_FLD"/>
                     </REDUCTION_FLD> -->
    </LOVQRYCOLS>
  </xsl:template>
  <xsl:template match="BIND_VARS">
    <LOVBINDVAR ID="{position()}" Type="MULTIPLE">
      <SEQ_NO>
        <xsl:value-of select="position()"/>
      </SEQ_NO>
      <BIND_VAR>
        <xsl:value-of select="./BIND_VAR"/>
      </BIND_VAR>
      <BLK_ID>
        <xsl:value-of select="./BLK_ID"/>
      </BLK_ID>
      <!-- Modified by Reddy Prasad -->
      <SEL_FORM_FLD>
        <xsl:value-of select="./SEL_FORM_FLD"/>
      </SEL_FORM_FLD>
      <DATA_TYPE>
        <xsl:value-of select="./DATA_TYPE"/>
      </DATA_TYPE>
      <FORM_FLD>
        <xsl:value-of select="./FORM_FLD"/>
      </FORM_FLD>
    </LOVBINDVAR>
  </xsl:template>
  <xsl:template match="FIELD" mode="stdButtonFields">
    <STDBUTTONS ID="{position()}" TYPE="MULTIPLE">
      <TXT_SEQUENCE_NO>
        <xsl:value-of select="position()"/>
      </TXT_SEQUENCE_NO>
      <TXT_BTN_NAME>
        <xsl:value-of select="NAME"/>
      </TXT_BTN_NAME>
      <TXT_FUNCTION>
        <xsl:value-of select="EVENT/FUNCTION"/>
      </TXT_FUNCTION>
      <xsl:if test="../ID = 'BLK_STDBUTTONS_IMG'">
        <SEL_IMG_REQ>Y</SEL_IMG_REQ>
      </xsl:if>
      <xsl:if test="../ID = 'BLK_STDBUTTONS'">
        <SEL_IMG_REQ>N</SEL_IMG_REQ>
      </xsl:if>
      <TXT_IMG>
        <xsl:value-of select="SRC"/>
      </TXT_IMG>
      <CHK_INCLUDE>
        <xsl:value-of select="@INCLUDE"/>
      </CHK_INCLUDE>
    </STDBUTTONS>
  </xsl:template>
  <xsl:template match="FIELD" mode="custButtonsFields">
    <CSTBUTTONS ID="{position()}" TYPE="MULTIPLE">
      <xsl:variable name="srcCount" select="count(SRC)"/>
      <TXT_SEQUENCE_NO>
        <xsl:value-of select="position()"/>
      </TXT_SEQUENCE_NO>
      <SEL_TABPAGE>
        <xsl:value-of select="@TABPAGE"/>
      </SEL_TABPAGE>
      <TXT_BTN_NAME>
        <xsl:value-of select="NAME"/>
      </TXT_BTN_NAME>
      <TXT_FUNCTION>
        <xsl:value-of select="EVENT/FUNCTION"/>
      </TXT_FUNCTION>
      <xsl:if test="$srcCount &gt; 0">
        <SEL_IMG_REQ>Y</SEL_IMG_REQ>
      </xsl:if>
      <xsl:if test="$srcCount = 0">
        <SEL_IMG_REQ>N</SEL_IMG_REQ>
      </xsl:if>
      <TXT_IMG>
        <xsl:value-of select="SRC"/>
      </TXT_IMG>
      <POSITION><xsl:value-of select="VALIGN"/></POSITION>
      <ALIGNMENT><xsl:value-of select="HALIGN"/></ALIGNMENT>
    </CSTBUTTONS>
  </xsl:template>
  <!--work flow handlers-->
  <xsl:template match="WORKFLOW">
    <WORKFLOW ID="{position()}" Type="MULTIPLE">
      <TXT_SNO>
        <xsl:value-of select="position()"/>
      </TXT_SNO>
      <TXT_WF_TYPE>
        <xsl:value-of select="@TYPE"/>
      </TXT_WF_TYPE>
      <xsl:apply-templates select="STAGES/STAGE"/>
      <xsl:apply-templates select="REASONCODES/REASON_CODE"/>
      <xsl:apply-templates select="ACTIONS/ACTION"/>
    </WORKFLOW>
  </xsl:template>
  <xsl:template match="STAGE">
    <STGDESC ID="{position()}" Type="MULTIPLE">
      <TXT_STGDEF_SNO>
        <xsl:value-of select="position()"/>
      </TXT_STGDEF_SNO>
      <TXT_STG_TYPE>
        <xsl:value-of select="."/>
      </TXT_STG_TYPE>
      <TXT_STAGEID>
        <xsl:value-of select="@id"/>
      </TXT_STAGEID>
      <CHK_STG_INCLUDE>
        <xsl:value-of select="@INCLUDE"/>
      </CHK_STG_INCLUDE>
    </STGDESC>
  </xsl:template>
  <xsl:template match="REASON_CODE">
    <RSNCODEMNT ID="{position()}" Type="MULTIPLE">
      <TXT_RSNCODE_SNO>
        <xsl:value-of select="position()"/>
      </TXT_RSNCODE_SNO>
      <SEL_RSN_TYPE>
        <xsl:value-of select="@type"/>
      </SEL_RSN_TYPE>
      <TXT_RSNCODE>
        <xsl:value-of select="."/>
      </TXT_RSNCODE>
      <CHK_INCLUDE_RSN>
        <xsl:value-of select="@INCLUDE"/>
      </CHK_INCLUDE_RSN>
    </RSNCODEMNT>
  </xsl:template>
  <xsl:template match="ACTION">
    <WFACTION ID="{position()}" Type="MULTIPLE">
      <TXT_WF_SNO>
        <xsl:value-of select="position()"/>
      </TXT_WF_SNO>
      <TXT_WF_TYPE>
        <xsl:value-of select="."/>
      </TXT_WF_TYPE>
      <CHK_ACT_INCLUDE>
        <xsl:value-of select="@INCLUDE"/>
      </CHK_ACT_INCLUDE>
    </WFACTION>
  </xsl:template>
  <!-- Template to convert to lower case -->
  <xsl:template name="str:to-lower">
    <xsl:param name="text"/>
    <xsl:variable name="lcletters">abcdefghijklmnopqrstuvwxyz </xsl:variable>
    <xsl:variable name="ucletters">ABCDEFGHIJKLMNOPQRSTUVWXYZ</xsl:variable>
    <xsl:value-of select="translate($text, $ucletters, $lcletters)"/>
  </xsl:template>
  <!-- Template to convert to Upperscase -->
  <xsl:template name="str:to-upper">
    <xsl:param name="text"/>
    <xsl:variable name="lcletters">abcdefghijklmnopqrstuvwxyz </xsl:variable>
    <xsl:variable name="ucletters">ABCDEFGHIJKLMNOPQRSTUVWXYZ</xsl:variable>
    <xsl:value-of select="translate($text, $lcletters , $ucletters)"/>
  </xsl:template>
</xsl:stylesheet>
