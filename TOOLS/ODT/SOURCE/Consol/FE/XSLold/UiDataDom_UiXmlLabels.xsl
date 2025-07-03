<!-- <?xml version ="1.0" encoding="UTF-8"?> -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:str="http://www.w3.org/1999/XSL/Transform"
                xml:space="default">
  <xsl:output method="xml" indent="yes" cdata-section-elements="LABEL TITLE"/>
  <xsl:param name="concatVal"/>
  <xsl:template match="/UIGENSCR_MAIN">
    <!-- <FORM TITLE="" MASTER="{TXT_MODULE_CODE}"> -->
    <FORM TITLE="" MASTER="{$concatVal}">  
      <xsl:apply-templates select="UIGENSCR_SCREENS"/>
      <xsl:apply-templates select="UIGENSCR_BLOCKS"/>
      <xsl:for-each select="UIGENSCR_SCREENS">
        <xsl:variable name="screenId" select="TXT_SCREEN_ID"/>
        <xsl:apply-templates select="//UIGENSCR_MAIN/UIGENSCR_STANDARDBUTTON[SCREEN_NAME = $screenId]">
          <xsl:with-param name="screenId" select="$screenId"/>
        </xsl:apply-templates>
      </xsl:for-each>
      <xsl:if test="TXT_UI_TYPE != ''">
        <xsl:call-template name="GenerateAuditBlock">
          <xsl:with-param name="auditType" select="TXT_UI_TYPE"/>
        </xsl:call-template>
      </xsl:if>
    </FORM>
  </xsl:template>
  <xsl:template match="UIGENSCR_SCREENS">
    <xsl:variable name="scrId" select="TXT_SCREEN_ID"/>
    <SCREEN NAME="{TXT_SCREEN_ID}" 
            TITLE="{TXT_TITLE}">
      <xsl:if test="count(UIGENSCR_TABPAGES[TXT_IS_HDR = 'Header']) &gt; 0">
        <HEADER>
          <xsl:for-each select="UIGENSCR_TABPAGES[TXT_IS_HDR = 'Header']">
            <PAGE NAME="{TXT_PAGE_ID}">
              <LABEL>
                <xsl:value-of select="TXT_LABLE"/>
              </LABEL>
            </PAGE>
          </xsl:for-each>
        </HEADER>
      </xsl:if>
      <xsl:if test="count(UIGENSCR_TABPAGES[TXT_IS_HDR = 'TAB']) &gt; 0">
        <TAB>
          <xsl:for-each select="UIGENSCR_TABPAGES[TXT_IS_HDR = 'TAB']">
            <xsl:variable name="tabId" select="TXT_PAGE_ID"/>
            <PAGE NAME="{TXT_PAGE_ID}">
              <xsl:variable name="acessKeyNode"
                            select="//ACCESSKEYS[TXT_AK_SCREEN = $scrId]/BUTTONS_ACCESSKEYS[TXT_BUTTON_ID = $tabId and TXT_BUTTON_TYPE = 'Tab']"/>
              <xsl:if test="$acessKeyNode/TXT_ACCESSKEY != '' and $acessKeyNode/TXT_ACCESSKEY != 'none'">
                <ACCESSKEY>
                  <xsl:value-of select="$acessKeyNode/TXT_ACCESSKEY"/>
                </ACCESSKEY>
              </xsl:if>
              <LABEL>
                <xsl:value-of select="TXT_LABLE"/>
              </LABEL>
            </PAGE>
          </xsl:for-each>
        </TAB>
      </xsl:if>
      <!-- Reddy Prasad Added for adding label to Tab Page All -->
      <xsl:if test="count(UIGENSCR_TABPAGES[TXT_IS_HDR = 'TABPAGE_ALL']) &gt; 0">
        <xsl:variable name="tabAllNode"
                      select="//UIGENSCR_SCREENS[TXT_SCREEN_ID = $scrId]/UIGENSCR_TABPAGES[TXT_PAGE_ID = 'All' and TXT_IS_HDR = 'TABPAGE_ALL']"/>
        <xsl:variable name="tabAllHt" select="$tabAllNode/TXT_HEIGHT"/>
        <xsl:variable name="tabAllHt1"
                      select="count(//UIGENSCR_FIELDSPOS[TXT_SCREEN_ID = $scrId]/FIELDSPOS_TABPAGES[TXT_PAGE_ID = 'All']/FIELDSPOS_TABPAGES_IDX)"/>
        <xsl:if test="$tabAllHt1 = 0">
          <TABPAGE_ALL>
            <LABEL>
              <xsl:value-of select="$tabAllNode/TXT_LABLE"/>
            </LABEL>
          </TABPAGE_ALL>
        </xsl:if>
        <xsl:if test="$tabAllHt1 &gt; 0">
          <TABPAGE_ALL>
            <LABEL>
              <xsl:value-of select="$tabAllNode/TXT_LABLE"/>
            </LABEL>
          </TABPAGE_ALL>
        </xsl:if>
      </xsl:if>
    </SCREEN>
  </xsl:template>
  <xsl:template match="UIGENSCR_BLOCKS">
    
    <xsl:variable name="blk_Type" select="TXT_BLOCK_BLK_TYPE"/>
    <xsl:variable name="blk_ID">
      <xsl:call-template name="str:to-upper">
        <xsl:with-param name="text" select="TXT_BLOCK_ID"/>
      </xsl:call-template>
    </xsl:variable>
    <xsl:variable name="scr_Id" select="TXT_SCREEN_NAME"/>
    <xsl:if test="$blk_Type = 'Multiple Entry'">
      <xsl:variable name="blk_TabPage" select="TXT_ME_TABPAGE"/>
      <xsl:variable name="blk_Dbt">
        <xsl:call-template name="str:to-lower">
          <xsl:with-param name="text" select="BLOCK_FIELDS[@ID = '1']/DBT"/>
        </xsl:call-template>
      </xsl:variable>
      <xsl:if test="count(BLOCK_FIELDS) &gt; 0">
        <BLOCK  TYPE="{$blk_Type}">
          <xsl:variable name="blkNode"
                        select="//UIGENSCR_FIELDSPOS[TXT_SCREEN_ID = $scr_Id]/FIELDSPOS_TABPAGES[TXT_PAGE_ID = $blk_TabPage]/FIELDSPOS_TABPAGES_IDX[TXT_BLK_ID = $blk_ID and TXT_BLK_TYPE = $blk_Type and TXT_FIELD_TYPE = 'Block']"/>
          <ID>
            <xsl:call-template name="str:to-upper">
              <xsl:with-param name="text" select="$blk_ID"/>
            </xsl:call-template>
          </ID>
          <LABEL>
            <xsl:value-of select="TXT_BLK_LABEL"/>
          </LABEL>
          <DBT>
            <xsl:value-of select="$blk_Dbt"/>
          </DBT>
          <xsl:apply-templates select="BLOCK_FIELDS">
            <xsl:with-param name="blkType" select="$blk_Type"/>
            <xsl:with-param name="scr_Id" select="$scr_Id"/>
            <xsl:with-param name="blkId" select="$blk_ID"/>
          </xsl:apply-templates>
        </BLOCK>
      </xsl:if>
    </xsl:if>
    <xsl:if test="$blk_Type = 'Single Entry'" >
      <BLOCK>
        <ID>
          <xsl:call-template name="str:to-upper">
            <xsl:with-param name="text" select="$blk_ID"/>
          </xsl:call-template>
        </ID>
        <LABEL>
          <xsl:value-of select="TXT_BLK_LABEL"/>
        </LABEL>
        <xsl:apply-templates select="BLOCK_FIELDS">
            <xsl:with-param name="blkType" select="$blk_Type"/>
            <xsl:with-param name="scr_Id" select="$scr_Id"/>
            <xsl:with-param name="blkId" select="$blk_ID"/>
        </xsl:apply-templates>
      </BLOCK>
    </xsl:if>
  </xsl:template>
  <!-- handler for fields -->
  
  <xsl:template match="BLOCK_FIELDS">
    <xsl:param name="scr_Id" select="."/>
    <xsl:param name="blkId" select="."/>
    <xsl:param name="blkType" select="."/>
    <xsl:variable name="tabPage" select="SEL_TABPAGE_FIELDS"/>
    <xsl:variable name="fName">
      <xsl:call-template name="str:to-upper">
        <xsl:with-param name="text" select="TXT_FIELD_NAME"/>
      </xsl:call-template>
    </xsl:variable>
    <xsl:variable name="fType" select="FLD_TYPE"/>
    <xsl:variable name="labelName" select="concat('LBL_',$fName)"/>
    <xsl:variable name="lblNode"
                  select="//UIGENSCR_BLOCKS[TXT_SCREEN_NAME = $scr_Id and TXT_BLOCK_ID = $blkId and TXT_BLOCK_BLK_TYPE = $blkType]/BLOCK_FIELDS_LABEL[TXT_FIELD_NAME = $fName and SEL_TABPAGE_FIELDS = $tabPage]"/>
    <xsl:variable name="AttrNode"
                  select="//UIGENSCR_BLOCKS[TXT_SCREEN_NAME = $scr_Id and TXT_BLOCK_ID = $blkId and TXT_BLOCK_BLK_TYPE = $blkType]/BLOCKS_ATTRIBUTE[TXT_FIELD_NAME = $fName]"/>
    <FIELD>
    <xsl:variable name="lblPosNode"
                    select="//UIGENSCR_FIELDSPOS[TXT_SCREEN_ID = $scr_Id]/FIELDSPOS_TABPAGES[TXT_PAGE_ID = $tabPage]/FIELDSPOS_TABPAGES_IDX[TXT_BLK_ID = $blkId and TXT_BLK_TYPE = $blkType and TXT_FLD_NAME = $fName]"/>
      
      <xsl:if test="$fType = 'FIELDSET'">
        <xsl:attribute name="TYPE">
          <xsl:value-of select="'FIELDSET'"/>
        </xsl:attribute>
      </xsl:if>
      <xsl:variable name="fldNode"
                    select="//UIGENSCR_FIELDSPOS[TXT_SCREEN_ID = $scr_Id]/FIELDSPOS_TABPAGES[TXT_PAGE_ID = $tabPage]/FIELDSPOS_TABPAGES_IDX[TXT_BLK_ID = $blkId and TXT_BLK_TYPE = $blkType and TXT_FLD_NAME =$fName ]"/>
      <xsl:if test="$blkType = 'Single Entry'">
        <!--<xsl:attribute name="TABPAGE">
          <xsl:value-of select="$tabPage"/>
        </xsl:attribute>
        <xsl:if test="$fType != 'HIDDEN'">
          <xsl:attribute name="ROW">
            <xsl:value-of select="$fldNode/TXT_ROW_POS"/>
          </xsl:attribute>
          <xsl:attribute name="COL">
            <xsl:value-of select="$fldNode/TXT_COL_POS"/>
          </xsl:attribute>
        </xsl:if>
        <xsl:if test="$fType = 'HIDDEN'">
          <xsl:attribute name="ROW">
            <xsl:text>1</xsl:text>
          </xsl:attribute>
          <xsl:attribute name="COL">
            <xsl:text>6</xsl:text>
          </xsl:attribute>
        </xsl:if>-->
      </xsl:if>
      
      <xsl:variable name="fldName" select="TXT_FIELD_NAME"/>
      
      <NAME>
        <!-- <xsl:value-of select="TXT_FIELD_NAME"/> -->
        <xsl:call-template name="str:to-upper">
          <xsl:with-param name="text" select="TXT_FIELD_NAME"/>
        </xsl:call-template>
      </NAME>
      
      <xsl:if test="$fType = 'LOV'">
        <TYPE>TEXT</TYPE>
      </xsl:if>
      <xsl:if test="$fType != 'LOV' and $fType != 'CHECK'">
        <TYPE>
          <xsl:value-of select="FLD_TYPE"/>
        </TYPE>
      </xsl:if>
      <xsl:if test="$fType= 'CHECK'">
        <TYPE>CHECKBOX</TYPE>
       
          <xsl:if test="BLOCK_FIELDS_CHECKBOX/FLD_DEF_CHKD = 'Checked'">
            <CHECKED> <xsl:text>-1</xsl:text> </CHECKED>
          </xsl:if>
       
      </xsl:if>
      <xsl:if test="$fType= 'RADIO'">
        <xsl:apply-templates select="BLOCK_FIELDS_RADIO">
          
        </xsl:apply-templates>
      </xsl:if>
      
      <xsl:if test="$fType != 'FIELDSET'">
        <DBC>
          <xsl:call-template name="str:to-lower">
            <xsl:with-param name="text" select="DBC"/>
          </xsl:call-template>
        </DBC>
        </xsl:if>
        <xsl:if test="$fType = 'FIELDSET'">
        <xsl:apply-templates select="FLDSET_FIELDS[INCLUDE_FIELD = 'Y']">
          <xsl:with-param name="scr_Id" select="$scr_Id"/>
          <xsl:with-param name="blkType" select="$blkType"/>
          <xsl:with-param name="blkId" select="$blkId"/>
          <xsl:with-param name="tabPage" select="$tabPage"/>
        </xsl:apply-templates>
      </xsl:if>
      <xsl:if test="$fType = 'SELECT'">
        <xsl:apply-templates select="BLOCK_FIELDS_SELECT" mode="Select"/>
      </xsl:if>
      <xsl:if test="$fType = 'CHECK'">
        <xsl:apply-templates select="BLOCK_FIELDS_CHECKBOX " mode="CheckBox"/>
      </xsl:if>
      <xsl:if test="$fType = 'AMOUNT'">
        <xsl:apply-templates select="BLOCK_FIELDS_AMOUNT" mode="Amount"/>
      </xsl:if>
      <xsl:if test="$fType = 'LOV'">
        <xsl:variable name="lovNode"
                      select="BLOCK_FIELDS_LOV[CHK_LOV_TYPE_INCL = 'Y']"/>
        <xsl:if test="$lovNode != ''">
          <LOV>
            <NAME>
              <xsl:value-of select="$lovNode/TXT_LOV_ID"/>
            </NAME>
            <TITLE>
              <xsl:value-of select="$lovNode/TXT_TITLE"/>
            </TITLE>
            
            <xsl:if test="count($lovNode/BLOCK_FIELDS_LOV_BINDVARS) &gt; 0">
              
            </xsl:if>
            <COL_HEADING>
              <xsl:variable name="no_Of_QryCOls"
                            select="count($lovNode/BLOCK_FIELDS_LOV_QRYCOLS)"/>
              <xsl:for-each select="$lovNode/BLOCK_FIELDS_LOV_QRYCOLS">
                <xsl:variable name="idx" select="position()"/>
                <xsl:value-of select="TXT_COL_HEADING"/>
                <xsl:if test="$no_Of_QryCOls != $idx">
                  <xsl:text>~</xsl:text>
                </xsl:if>
              </xsl:for-each>
            </COL_HEADING>
            <REDUCTION_FLD_LABELS>
              <xsl:for-each select="$lovNode/BLOCK_FIELDS_LOV_QRYCOLS">
                <xsl:if test="TXT_REDUCTION_FLD = 'Y'">
                  <xsl:value-of select="TXT_REDUCTION_FLD_LBL"/>
                  <xsl:text>~</xsl:text>
                </xsl:if>
              </xsl:for-each>
            </REDUCTION_FLD_LABELS>
          </LOV>
        </xsl:if>
      </xsl:if>
      <!--generate a label Node -->
      <xsl:variable name="fldLbl"
                    select="//UIGENSCR_BLOCKS[TXT_SCREEN_NAME = $scr_Id and TXT_BLOCK_ID = $blkId]/BLOCK_FIELDS_LABEL[TXT_FIELD_NAME = $fldName]"/>
      <xsl:variable name="tstNode"
                    select="//UIGENSCR_BLOCKS[TXT_SCREEN_NAME = $scr_Id and TXT_BLOCK_ID = $blkId]">
      </xsl:variable>
      
      <xsl:if test="$fldLbl/CHK_LABEL_REQUIRED = 'Y'">
      
        <LABEL>
          <xsl:value-of select="$fldLbl/TXT_FIELD_LABEL"/>
        </LABEL>
      </xsl:if>
      <xsl:if test="$fldLbl/CHK_LABEL_REQUIRED != 'Y'">
        <LABEL>
        </LABEL>
      </xsl:if>
    </FIELD>
  </xsl:template>
  <xsl:template name="cdata-section">
    <xsl:param name="text"/>
  </xsl:template>
  <!-- Handler for Field Sets -->
  <xsl:template match="FLDSET_FIELDS">
    <xsl:param name="scr_Id" select="."/>
    <xsl:param name="blkId" select="."/>
    <xsl:param name="blkType" select="."/>
    <xsl:param name="tabPage" select="."/>
    <FIELD>
      <xsl:variable name="fName" select="FSFLD_NAME"/>
      <xsl:variable name="fType" select="FLD_TYPE"/>
      <xsl:variable name="labelName" select="$fName"/>
      <xsl:variable name="fldNode"
                    select="//UIGENSCR_FIELDSPOS[TXT_SCREEN_ID = $scr_Id]/FIELDSPOS_TABPAGES[TXT_PAGE_ID = $tabPage]/FIELDSPOS_TABPAGES_IDX[TXT_BLK_ID = $blkId and TXT_BLK_TYPE = $blkType and TXT_FIELD_TYPE = 'FieldSet']/FLDSET_FLDPOS[FSFLD_NAME =$fName ]"/>
      
      <xsl:variable name="lblNode"
                    select="//UIGENSCR_BLOCKS[TXT_SCREEN_NAME = $scr_Id and TXT_BLOCK_ID = $blkId and TXT_BLOCK_BLK_TYPE = $blkType]/BLOCK_FIELDS_LABEL[TXT_FIELD_NAME = $labelName]"/>
      <xsl:variable name="AttrNode"
                    select="//UIGENSCR_BLOCKS[TXT_SCREEN_NAME = $scr_Id and TXT_BLOCK_ID = $blkId and TXT_BLOCK_BLK_TYPE = $blkType]/BLOCKS_ATTRIBUTE[TXT_FIELD_NAME = $fName]"/>
      <xsl:if test="$blkType = 'Single Entry'">
        <!--<xsl:attribute name="TABPAGE">
          <xsl:value-of select="$tabPage"/>
        </xsl:attribute>
        <xsl:if test="$fType != 'HIDDEN'">
          <xsl:attribute name="ROW">
            <xsl:value-of select="$fldNode/FSFLD_ROW_POS"/>
          </xsl:attribute>
          <xsl:attribute name="COL">
            <xsl:value-of select="$fldNode/FSFLD_COL_POS"/>
          </xsl:attribute>
        </xsl:if>
        <xsl:if test="$fType = 'HIDDEN'">
          <xsl:attribute name="ROW">
            <xsl:text>1</xsl:text>
          </xsl:attribute>
          <xsl:attribute name="COL">
            <xsl:text>6</xsl:text>
          </xsl:attribute>
        </xsl:if>-->
      </xsl:if>
                    
      <xsl:variable name="fldName" select="FSFLD_NAME"/>
      
      <NAME>
        <xsl:call-template name="str:to-upper">
          <xsl:with-param name="text" select="FSFLD_NAME"/>
        </xsl:call-template>
      </NAME>
      
      <xsl:if test="$fType = 'LOV'">
        <TYPE>TEXT</TYPE>
      </xsl:if>
      <xsl:if test="$fType != 'LOV' and $fType != 'CHECK'">
        <TYPE>
          <xsl:value-of select="FLD_TYPE"/>
        </TYPE>
      </xsl:if>
      <xsl:if test="$fType= 'CHECK'">
        <TYPE>CHECKBOX</TYPE>
        
          <xsl:if test="BLOCK_FIELDS_CHECKBOX_1/FLD_DEF_CHKD = 'Checked'">
           <CHECKED><xsl:text>-1</xsl:text></CHECKED>
          </xsl:if>
        
      </xsl:if>
      <DBC>
        <xsl:call-template name="str:to-lower">
          <xsl:with-param name="text" select="DBC"/>
        </xsl:call-template>
      </DBC>
      <xsl:if test="$fType = 'SELECT'">
        
      </xsl:if>
      <xsl:variable name="size">
        <xsl:call-template name="GetSize">
          <xsl:with-param name="field" select="."/>
          <xsl:with-param name="blkType" select="$blkType"/>
        </xsl:call-template>
      </xsl:variable>
      <xsl:if test="$fType != 'SELECT'">
        
      </xsl:if>
      
      <xsl:if test="$fType = 'SELECT'">
        <xsl:apply-templates select="BLOCK_FIELDS_SELECT_1" mode="Select_FS"/>
      </xsl:if>
      <xsl:if test="$fType = 'CHECK'">
        <xsl:apply-templates select="BLOCK_FIELDS_CHECKBOX_1 "
                             mode="CheckBox_FS"/>
      </xsl:if>
      <xsl:if test="$fType = 'AMOUNT'">
        <xsl:apply-templates select="BLOCK_FIELDS_AMOUNT_1" mode="Amount_FS"/>
      </xsl:if>
      <xsl:if test="$fType = 'RADIO'">
        <xsl:apply-templates select="BLOCK_FIELDS_RADIO_1" mode="Radio_FS">
        
        </xsl:apply-templates>
      </xsl:if>
      <xsl:if test="$fType = 'LOV'">
        <xsl:variable name="lovNode"
                      select="BLOCK_FIELDS_LOV_1[CHK_LOV_TYPE_INCL = 'Y']"/>
        <xsl:if test="$lovNode != ''">
          <LOV>
            <NAME>
              <xsl:value-of select="$lovNode/TXT_LOV_ID"/>
            </NAME>
            <TITLE>
              <xsl:value-of select="$lovNode/TXT_TITLE"/>
            </TITLE>
            
            <xsl:if test="count($lovNode/BLOCK_FIELDS_LOV_BINDVARS_1) &gt; 0">
              
            </xsl:if>
            <COL_HEADING>
              <xsl:variable name="no_Of_QryCOls"
                            select="count($lovNode/BLOCK_FIELDS_LOV_QRYCOLS_1)"/>
              <xsl:for-each select="$lovNode/BLOCK_FIELDS_LOV_QRYCOLS_1">
                <xsl:variable name="idx" select="position()"/>
                <xsl:value-of select="TXT_COL_HEADING"/>
                <xsl:if test="$no_Of_QryCOls != $idx">
                  <xsl:text>~</xsl:text>
                </xsl:if>
              </xsl:for-each>
            </COL_HEADING>
            
            <REDUCTION_FLD_LABELS>
              <xsl:for-each select="$lovNode/BLOCK_FIELDS_LOV_QRYCOLS_1">
                <xsl:if test="TXT_REDUCTION_FLD = 'Y'">
                  <xsl:value-of select="TXT_REDUCTION_FLD_LBL"/>
                  <xsl:text>~</xsl:text>
                </xsl:if>
              </xsl:for-each>
            </REDUCTION_FLD_LABELS>
          </LOV>
        </xsl:if>
      </xsl:if>
      <!--generate a label Node -->
      <xsl:variable name="fldLbl"
                    select="//UIGENSCR_BLOCKS[TXT_SCREEN_NAME = $scr_Id and TXT_BLOCK_ID = $blkId]/BLOCK_FIELDS_LABEL[TXT_FIELD_NAME = $fldName]"/>
      <xsl:if test="$fldLbl/CHK_LABEL_REQUIRED = 'Y'">
        <LABEL>
          <xsl:value-of select="$fldLbl/TXT_FIELD_LABEL"/>
        </LABEL>
      </xsl:if>
      <xsl:if test="$fldLbl/CHK_LABEL_REQUIRED != 'Y'">
        <LABEL>
        </LABEL>
      </xsl:if>
    </FIELD>
  </xsl:template>
  <!--  handler for Select in FieldSet -->
  <xsl:template match="BLOCK_FIELDS_SELECT_1" mode="Select_FS">
    <xsl:variable name="OptnVal" select="FLD_VALUE"/>
    <OPTION VALUE="{OPTN_VALUE}">
      <xsl:if test="count(DEFAULT) != 0">
        <xsl:attribute name="SELECTED">
          <xsl:text>-1</xsl:text>
        </xsl:attribute>
      </xsl:if>
      <xsl:value-of select="OPTN_LABEL"/>
    </OPTION>
  </xsl:template>
  <!-- handler for CheckBox in FieldSet -->
  <xsl:template match="BLOCK_FIELDS_CHECKBOX_1" mode="CheckBox_FS">
    
  </xsl:template>
  <!-- handler for Amount in FieldSet -->
  <xsl:template match="BLOCK_FIELDS_AMOUNT_1" mode="Amount_FS">
    <xsl:variable name="relBlk" select="REL_BLOCK"/>
    <xsl:variable name="relFld" select="REL_FIELD"/>
  </xsl:template>
  <!-- Handler for Radio Options In FieldSet-->
  <xsl:template match="BLOCK_FIELDS_RADIO_1" mode="Radio_FS">
    <xsl:param name="PosNode" select="."/>
    <xsl:variable name="OptnVal" select="OPTN_VALUE"/>
    <OPTION>
      
      <VALUE>
        <xsl:value-of select="OPTN_VALUE"/>
      </VALUE>
      <LABEL>
        <xsl:value-of select="OPTN_LABEL"/>
      </LABEL>
      <xsl:variable name="def" select="DEFAULT"/>
      <xsl:if test="$def = 'Y'">
        <SELECTED>-1</SELECTED>
      </xsl:if>
      <xsl:if test="$def != 'Y'">
        <SELECTED>0</SELECTED>
      </xsl:if>
      </OPTION>
  </xsl:template>
  <!--  handler for Select  -->
  <xsl:template match="BLOCK_FIELDS_SELECT" mode="Select">
    <xsl:variable name="OptnVal" select="FLD_VALUE"/>
    <OPTION VALUE="{OPTN_VALUE}">
      <xsl:if test="count(DEFAULT) != 0">
        <xsl:attribute name="SELECTED">
          <xsl:text>-1</xsl:text>
        </xsl:attribute>
      </xsl:if>
      <xsl:value-of select="OPTN_LABEL"/>
    </OPTION>
  </xsl:template>
  <!-- handler for CheckBox -->
  <xsl:template match="BLOCK_FIELDS_CHECKBOX" mode="CheckBox">
    
  </xsl:template>
  <!-- handler for Amount -->
  <xsl:template match="BLOCK_FIELDS_AMOUNT" mode="Amount">
    <xsl:variable name="relBlk" select="REL_BLOCK"/>
    <xsl:variable name="relFld" select="REL_FIELD"/>
  </xsl:template>
  <!-- Handler for Radio Options -->
  <xsl:template match="BLOCK_FIELDS_RADIO">
    <xsl:param name="PosNode" select="."/>
    <xsl:variable name="OptnVal" select="OPTN_VALUE"/>
    <OPTION>
      
      <VALUE>
        <xsl:value-of select="OPTN_VALUE"/>
      </VALUE>
      <LABEL>
        <xsl:value-of select="OPTN_LABEL"/>
      </LABEL>
      <xsl:variable name="def" select="DEFAULT"/>
      <xsl:if test="$def = 'Y'">
        <SELECTED>-1</SELECTED>
      </xsl:if>
      <xsl:if test="$def != 'Y'">
        <SELECTED>0</SELECTED>
      </xsl:if>
      </OPTION>
  </xsl:template>
  <xsl:template name="SetCheckVals">
    <xsl:param name="v_Node"/>
    <xsl:if test="$v_Node = '' or $v_Node ='N'">
      <xsl:value-of select="0"/>
    </xsl:if>
    <xsl:if test="$v_Node ='Y'">
      <xsl:value-of select="-1"/>
    </xsl:if>
  </xsl:template>
  <xsl:template match="UIGENSCR_STANDARDBUTTON">
    <xsl:param name="screenId" select="."/>
    <xsl:if test="count(STDBUTTONS[IMG_REQD = 'Y']) &gt; 0">
      <BLOCK SCREEN="{$screenId}" TYPE="Single Entry">
        <ID>BLK_STD_BUTTONS_IMG</ID>
        <xsl:for-each select="STDBUTTONS[IMG_REQD = 'Y']">
          <FIELD>
            <NAME>
              <xsl:value-of select="BUTTONNAME"/>
            </NAME>
            <TYPE>BUTTON</TYPE>
          </FIELD>
        </xsl:for-each>
      </BLOCK>
    </xsl:if>
    <xsl:if test="count(STDBUTTONS[IMG_REQD = 'N']) &gt; 0">
      <BLOCK>
        <ID>BLK_STD_BUTTONS</ID>
        <xsl:for-each select="STDBUTTONS[IMG_REQD = 'N']">
          <xsl:variable name="btnName" select="BUTTONNAME"/>
          <xsl:variable name="acessKeyNode"
                        select="//ACCESSKEYS[TXT_AK_SCREEN = $screenId]/BUTTONS_ACCESSKEYS[TXT_BUTTON_ID = $btnName and TXT_BUTTON_TYPE = 'Button']"/>
          <FIELD>
            <NAME>
              <xsl:value-of select="BUTTONNAME"/>
            </NAME>
            <TYPE>BUTTON</TYPE>
            <ID>
            </ID>
            <LABEL>
              <xsl:value-of select="TXT_LABEL"/>
            </LABEL>
            <xsl:if test="$acessKeyNode/TXT_ACCESSKEY != '' and $acessKeyNode/TXT_ACCESSKEY != 'none'">
              <ACCESSKEY>
                <xsl:value-of select="$acessKeyNode/TXT_ACCESSKEY"/>
              </ACCESSKEY>
            </xsl:if>
            
          </FIELD>
        </xsl:for-each>
      </BLOCK>
    </xsl:if>
    <xsl:if test="count(CSTBUTTONS) &gt; 0">
      <BLOCK>
        <ID>BLK_CST_BUTTONS</ID>
        <xsl:for-each select="CSTBUTTONS">
          <xsl:variable name="btnName" select="BUTTON_NAME"/>
          <xsl:variable name="idGen" select="SEQUENCE_NO"/>
          <FIELD>
            <NAME>
              <xsl:value-of select="$btnName"/>
            </NAME>
            <TYPE>BUTTON</TYPE>
            <ID>
              <xsl:value-of select="concat($btnName,'_',$idGen)"/>
            </ID>
            <xsl:if test="IMAGE_REQD = 'N'">
              <xsl:variable name="acessKeyNode"
                            select="//ACCESSKEYS[TXT_AK_SCREEN = $screenId]/BUTTONS_ACCESSKEYS[TXT_BUTTON_ID = $btnName and TXT_BUTTON_TYPE = 'Button']"/>
              <LABEL>
                <xsl:value-of select="TXT_LABEL"/>
              </LABEL>
              <xsl:if test="$acessKeyNode/TXT_ACCESSKEY != '' and $acessKeyNode/TXT_ACCESSKEY != 'none'">
                <ACCESSKEY>
                  <xsl:value-of select="$acessKeyNode/TXT_ACCESSKEY"/>
                </ACCESSKEY>
              </xsl:if>
            </xsl:if>
            <xsl:if test="IMAGE_REQD = 'Y'">
              <SRC>
                <xsl:value-of select="IMAGE"/>
              </SRC>
            </xsl:if>
          </FIELD>
        </xsl:for-each>
      </BLOCK>
    </xsl:if>
  </xsl:template>
  <xsl:template name="GenerateAuditBlock">
    <xsl:param name="auditType" select="."/>
    <BLOCK  TYPE="Audit Entry" >
      <ID>BLK_AUDIT</ID>
      <LABEL>
        <![CDATA[Audit Block]]>
      </LABEL>
      <TYPE>
        <xsl:value-of select="$auditType"/>
      </TYPE>
    </BLOCK>
  </xsl:template>
  <xsl:template name="GetSize">
    <xsl:param name="field" select="."/>
    <xsl:param name="blkType" select="."/>
    <xsl:choose>
      <xsl:when test="$field/DATATYPE = 'INTEGER'">
        <xsl:value-of select="5"/>
      </xsl:when>
      <xsl:when test="$field/DATATYPE = 'DECIMAL'">
        <xsl:value-of select="10"/>
      </xsl:when>
      <xsl:when test="$field/DATATYPE = 'DATE'">
        <xsl:value-of select="10"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:choose>
          <xsl:when test="$blkType = 'Single Entry' and ($field/FLD_TYPE = 'TEXT' or $field/FLD_TYPE = 'LOV')">
            <xsl:choose>
              <xsl:when test="$field/DLENGTH &gt; 30">
                <xsl:value-of select="30"/>
              </xsl:when>
              <xsl:otherwise>
                <xsl:value-of select="$field/DLENGTH"/>
              </xsl:otherwise>
            </xsl:choose>
          </xsl:when>
          <xsl:when test="$blkType = 'Multiple Entry' and ($field/FLD_TYPE = 'TEXT' or $field/FLD_TYPE = 'LOV')">
            <xsl:choose>
              <xsl:when test="$field/DLENGTH &gt; 15">
                <xsl:value-of select="15"/>
              </xsl:when>
              <xsl:otherwise>
                <xsl:value-of select="$field/DLENGTH"/>
              </xsl:otherwise>
            </xsl:choose>
          </xsl:when>
          <xsl:otherwise>
            <xsl:value-of select="$field/DLENGTH"/>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>
  <!-- Template to convert to lower case -->
  <xsl:template name="str:to-lower">
    <xsl:param name="text"/>
    <xsl:variable name="lcletters">abcdefghijklmnopqrstuvwxyz </xsl:variable>
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
