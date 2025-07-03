<?xml version ="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:str="http://www.w3.org/1999/XSL/Transform"
                xml:space="default">
       <xsl:output method="xml" indent="yes"/>
       <xsl:template match="/RAD_FUNCTIONS">
              <xsl:variable name="Mcode" select="MODULE_CODE"/>
              <xsl:variable name="Fcode" select="TXT_FUNCTION_ID"/>
              <UDTMAINT MODULE_CODE="{$Mcode}" FUNCTIONID="{$Fcode}">
                     <MODULE_NAME>
                            <xsl:value-of select="MODULE_NAME"/>
                     </MODULE_NAME>
                     <FUNCTION_NAME>
                            <xsl:value-of select="TXT_FUNCTION_NAME"/>
                     </FUNCTION_NAME>
                     <UI_TYPE>
                            <xsl:value-of select="UI_TYPE"/>
                     </UI_TYPE>
                     <!-- Call DataSources  handler -->
                     <xsl:apply-templates select="DATASOURCES">
                     </xsl:apply-templates>
                     <!-- call Screen Handler-->
                     <xsl:apply-templates select="SCREENS"/>
                     <!-- Call BLOCKS  handler -->
                     <xsl:apply-templates select="BLOCKS">
                     </xsl:apply-templates>
                     <!-- Buttons Blocks handler -->
                     <xsl:apply-templates select="BUTTONS"/>
                     <!-- WorkFlow Tabpage handler -->
                     <WORKFLOW_MAINT>
                            <xsl:apply-templates select="WORKFLOW"/>
                     </WORKFLOW_MAINT>
                     <!-- Call Lov  handler -->
                     <xsl:apply-templates select="//BLOCKS/FIELDS[FLD_TYPE ='LOV']"
                                          mode="Lov">
                     </xsl:apply-templates>
                     <!-- Call DataSoruces Handler .. temp dom 
                     		 <xsl:apply-templates select = "DATASOURCE_FIELDS">			
                     		 </xsl:apply-templates>
                     		 -->
              </UDTMAINT>
       </xsl:template>
       <xsl:template match="DATASOURCES">
              <!-- <xsl:variable name="DSName" select="DATA_SOURCE"/> -->
              <xsl:variable name="DSName">
                     <xsl:call-template name="str:to-lower">
                            <xsl:with-param name="text" select="DATA_SOURCE"/>
                     </xsl:call-template>
              </xsl:variable>
              <xsl:variable name="DSType">
                     <xsl:call-template name="str:to-lower">
                            <xsl:with-param name="text" select="DATA_SOURCE_TYPE"/>
                     </xsl:call-template>
              </xsl:variable>
              <!--  <xsl:variable name="ParentDSName" select="PARENT_DATASRC"/> -->
              <xsl:variable name="ParentDSName">
                     <xsl:call-template name="str:to-lower">
                            <xsl:with-param name="text" select="PARENT_DATASRC"/>
                     </xsl:call-template>
              </xsl:variable>
              <!-- <xsl:variable name="Relation" select="RELATION"/> -->
              <xsl:variable name="Relation">
                     <xsl:call-template name="str:to-lower">
                            <xsl:with-param name="text" select="RELATION"/>
                     </xsl:call-template>
              </xsl:variable>
              <xsl:variable name="Relation_Type" select="RELATION_TYPE"/>
              <DATASOURCE NAME="{$DSName}" TYPE="{$DSType}" PARENT="{$ParentDSName}"
                          RELATION="{$Relation}" REL_TYPE="{$Relation_Type}">
                     <xsl:apply-templates select="DSFIELDS">
                     </xsl:apply-templates>
              </DATASOURCE>
       </xsl:template>
       <xsl:template match="SCREENS">
              <SCREEN NAME="{SCREEN_ID}" POSITION="{SCREEN_POS}"
                      HEIGHT="{SCREEN_HEIGHT}" WIDTH="{SCREEN_WIDTH}"
                      SEQUENCE_NO="{SEQUENCE_NO}" SCREEN_TYPE="{SCREEN_TYPE}">
                     <xsl:if test="count(TABPAGES[TAB_TYPE = 'Header']) &gt; 0">
                            <HEADER>
                                   <xsl:for-each select="TABPAGES[TAB_TYPE = 'Header']">
                                          <PAGE NAME="{TAB_PAGE_ID}"
                                                ID="{TAB_PAGE_ID}"
                                                HEIGHT="{HEIGHT}" LBL_ID=""
                                                ORDER="{position()}">
                                          </PAGE>
                                   </xsl:for-each>
                            </HEADER>
                     </xsl:if>
                     <xsl:if test="count(TABPAGES[TAB_TYPE = 'Tab']) &gt; 0">
                            <TAB>
                                   <xsl:for-each select="TABPAGES[TAB_TYPE = 'Tab']">
                                          <PAGE NAME="{TAB_PAGE_ID}"
                                                ID="{TAB_PAGE_ID}" LBL_ID=""
                                                ORDER="{position()}">
                                          </PAGE>
                                   </xsl:for-each>
                            </TAB>
                     </xsl:if>
              </SCREEN>
       </xsl:template>
       <xsl:template match="BLOCKS">
              <xsl:variable name="Blk_Type" select="BLOCK_ENTRY_TYPE"/>
              <!-- <xsl:variable name="Blk_ID" select="BLOCK_ID"/> -->
              <xsl:variable name="Blk_ID">
                     <xsl:call-template name="str:to-upper">
                            <xsl:with-param name="text" select="BLOCK_ID"/>
                     </xsl:call-template>
              </xsl:variable>
              <xsl:variable name="Scr_Id" select="SCREEN_ID"/>
              <xsl:variable name="Order" select="ORDER"/>
              <xsl:variable name="Type">
                     <xsl:if test="$Blk_Type = 'M'">Multiple Entry</xsl:if>
                     <xsl:if test="$Blk_Type = 'S'">Single Entry</xsl:if>
              </xsl:variable>
              <xsl:variable name="isCommon" select="COMMON"/>
              <xsl:if test="$Blk_Type = 'M'">
                     <xsl:variable name="Blk_TabPage" select="SEL_TABPAGE"/>
                     <!-- select="./FIELDS[@ID = '1']/FLD_TAB_PAGE"/> -->
                     <!--<T><xsl:value-of select = "$Blk_TabPage"/></T>-->
                     <BLOCK TYPE="{$Type}" SCREEN="{$Scr_Id}"
                            TABPAGE="{$Blk_TabPage}" ORDER="{$Order}">
                            <ID>
                                   <!--    <xsl:value-of select="BLOCK_ID"/> -->
                                   <xsl:call-template name="str:to-upper">
                                          <xsl:with-param name="text"
                                                          select="BLOCK_ID">
                                          </xsl:with-param>
                                   </xsl:call-template>
                            </ID>
                            <xsl:if test="$isCommon = 'Y'">
                                   <COMMON>Y</COMMON>
                            </xsl:if>
                            <REFERRED_COMMON>
                                   <xsl:value-of select="REFERRED_COMMON"/>
                            </REFERRED_COMMON>
                            <xsl:apply-templates select="FIELDS">
                                   <xsl:with-param name="Block_Id"
                                                   select="BLOCK_ID"/>
                                   <xsl:with-param name="isCommon"
                                                   select="$isCommon"/>
                            </xsl:apply-templates>
                     </BLOCK>
              </xsl:if>
              <xsl:if test="$Blk_Type = 'S'">
                     <BLOCK TYPE="{$Type}" SCREEN="{$Scr_Id}" ORDER="{$Order}">
                            <ID>
                                   <!-- <xsl:value-of select="BLOCK_ID"/> -->
                                   <xsl:call-template name="str:to-upper">
                                          <xsl:with-param name="text"
                                                          select="BLOCK_ID"/>
                                   </xsl:call-template>
                            </ID>
                            <xsl:if test="$isCommon = 'Y'">
                                   <COMMON>Y</COMMON>
                            </xsl:if>
                            <REFERRED_COMMON>
                                   <xsl:value-of select="REFERRED_COMMON"/>
                            </REFERRED_COMMON>
                            <xsl:apply-templates select="FIELDS">
                                   <xsl:with-param name="Block_Id"
                                                   select="BLOCK_ID"/>
                                   <xsl:with-param name="isCommon"
                                                   select="$isCommon"/>
                            </xsl:apply-templates>
                     </BLOCK>
              </xsl:if>
       </xsl:template>
       <!-- handler for fields -->
       <xsl:template match="FIELDS">
              <xsl:param name="Block_Id" select="."/>
              <xsl:param name="isCommon" select="."/>
              <xsl:variable name="TabPage" select="FLD_TAB_PAGE"/>
              <xsl:variable name="Seq" select="SEQ_NO"/>
              <xsl:variable name="Fld_Type" select="FLD_TYPE"/>
              <xsl:variable name="Fld_Name">
                     <xsl:call-template name="str:to-upper">
                            <xsl:with-param name="text" select="NAME"/>
                     </xsl:call-template>
              </xsl:variable>
              <xsl:if test="$Fld_Type = 'FIELDSET'">
                     <xsl:if test="count(//FIELDS/FIELDSET[FLD_NAME = $Fld_Name and CHK_INCLUDE = 'Y' ]) =  0 ">
                            <FIELD>
                                   <xsl:attribute name="TABPAGE">
                                          <xsl:value-of select="$TabPage"/>
                                   </xsl:attribute>
                                   <NAME>
                                          <xsl:value-of select="$Fld_Name"/>
                                   </NAME>
                                   <TYPE>
                                          <xsl:value-of select="$Fld_Type"/>
                                   </TYPE>
                                   <xsl:apply-templates select="FIELDSET">
                                          <xsl:with-param name="Block_Id"
                                                          select="$Block_Id"/>
                                   </xsl:apply-templates>
                            </FIELD>
                     </xsl:if>
              </xsl:if>
              <!-- If the Field is not an part of any Field Set Process the field ......  
              		<xsl:variable name = "kal" select =  "count(//FIELDSET[FLD_NAME =$Fld_Name and CHK_INCLUDE = 'N'])" />		
              		<Test><xsl:value-of select = "$kal" /></Test>
              		-->
              <xsl:if test="count(//FIELDSET[FLD_NAME =$Fld_Name and CHK_INCLUDE = 'Y']) = 0 ">
                     <xsl:if test="$Fld_Type != 'FIELDSET'">
                            <FIELD>
                                   <xsl:if test="./../BLOCK_ENTRY_TYPE = 'S'">
                                          <xsl:attribute name="TABPAGE">
                                                 <xsl:value-of select="$TabPage"/>
                                          </xsl:attribute>
                                   </xsl:if>
                                   <NAME>
                                          <!-- <xsl:value-of select="NAME"/> -->
                                          <xsl:call-template name="str:to-upper">
                                                 <xsl:with-param name="text"
                                                                 select="NAME"/>
                                          </xsl:call-template>
                                   </NAME>
                                   <DBT>
                                          <!--  <xsl:value-of select="DBT"/> -->
                                          <xsl:call-template name="str:to-lower">
                                                 <xsl:with-param name="text"
                                                                 select="DBT"/>
                                          </xsl:call-template>
                                   </DBT>
                                   <DBC>
                                          <!-- <xsl:value-of select="DBC"/> -->
                                          <xsl:call-template name="str:to-lower">
                                                 <xsl:with-param name="text"
                                                                 select="DBC"/>
                                          </xsl:call-template>
                                   </DBC>
                                   <TYPE>
                                          <xsl:value-of select="$Fld_Type"/>
                                   </TYPE>
                                   <!-- If this field is from a refered block .. fetch details like req , readonlu , ucase -->
                                   <xsl:if test="$isCommon = 'Y'">
                                          <xsl:call-template name="RefBlockFieldHandler">
                                                 <xsl:with-param name="blockName"
                                                                 select="$Block_Id"/>
                                                 <xsl:with-param name="fldName"
                                                                 select="NAME"/>
                                          </xsl:call-template>
                                   </xsl:if>
                                   <MAXLENGTH>
                                          <xsl:value-of select="DLENGTH"/>
                                   </MAXLENGTH>
                                   <DTYPE>
                                          <xsl:value-of select="DATATYPE"/>
                                   </DTYPE>
                                   <xsl:if test="$Fld_Type = 'SELECT'">
                                          <xsl:apply-templates select="SELECT"
                                                               mode="Select"/>
                                   </xsl:if>
                                   <xsl:if test="$Fld_Type = 'CHECK'">
                                          <xsl:apply-templates select="CHECKFLDS"
                                                               mode="CheckBox"/>
                                   </xsl:if>
                                   <xsl:if test="$Fld_Type = 'AMOUNT'">
                                          <xsl:apply-templates select="AMOUNTFLDS"
                                                               mode="Amount"/>
                                   </xsl:if>
                                   <xsl:if test="$Fld_Type = 'RADIO'">
                                          <xsl:apply-templates select="RADIO"/>
                                   </xsl:if>
                                   <!-- TextArea Handler -->
                                   <xsl:if test="$Fld_Type = 'TEXTAREA'">
                                          <xsl:apply-templates select="TEXTAREA"
                                                               mode="TextArea"/>
                                   </xsl:if>
                                   <!-- Check If this Block Is an Common Block 
                                                             Then , fetch info like UCase, Reqd , ROonly and create tags with
                                                             appropriate values 
                                                             
                                                             Move to the block node ..
                                                             check if its it COMMON = Y .
                                                             then it shud have an node with name BLOCKS_ATTRIBUTE
                                                             and TXT_FIELD_NAME  = 'Current Fld Name'
                                                             -->
                            </FIELD>
                     </xsl:if>
              </xsl:if>
       </xsl:template>
       <!--  handler for Select  -->
       <xsl:template match="SELECT" mode="Select">
              <xsl:variable name="OptnVal" select="FLD_VALUE"/>
              <OPTION VALUE="{$OptnVal}">
                     <xsl:if test="count(DEFAULT) = 1">
                            <xsl:attribute name="SELECTED">
                                   <xsl:text>-1</xsl:text>
                            </xsl:attribute>
                     </xsl:if>
              </OPTION>
       </xsl:template>
       <!-- Handler for Radio Box -->
       <xsl:template match="RADIO">
              <xsl:variable name="OptnVal" select="FLD_VALUE"/>
              <OPTION VALUE="{$OptnVal}">
                     <xsl:if test="count(DEFAULT) = 1">
                            <xsl:attribute name="SELECTED">
                                   <xsl:text>-1</xsl:text>
                            </xsl:attribute>
                     </xsl:if>
              </OPTION>
       </xsl:template>
       <!-- Handler for TextArea -->
       <xsl:template match="TEXTAREA" mode="TextArea">
              <xsl:variable name="rows" select="ROWS_VAL"/>
              <xsl:variable name="cols" select="COLS_VAL"/>
              <xsl:if test="$rows != ''">
                     <ROWS>
                            <xsl:value-of select="$rows"/>
                     </ROWS>
                     <COLS>
                            <xsl:value-of select="$cols"/>
                     </COLS>
              </xsl:if>
              <xsl:if test="$rows = '' or $cols = ''">
                     <ROWS>4</ROWS>
                     <COLS>60</COLS>
              </xsl:if>
       </xsl:template>
       <!-- handler for CheckBox -->
       <xsl:template match="CHECKFLDS" mode="CheckBox">
              <xsl:variable name="ChkVal" select="CHK_VAL"/>
              <xsl:variable name="UnChkVal" select="UNCHK_VAL"/>
              <xsl:variable name="DefChk" select="DEFAULT_TYPE"/>
              <CHKVAL>
                     <xsl:value-of select="$ChkVal"/>
              </CHKVAL>
              <UNCHKVAL>
                     <xsl:value-of select="$UnChkVal"/>
              </UNCHKVAL>
              <DEFCHK>
                     <xsl:value-of select="$DefChk"/>
              </DEFCHK>
       </xsl:template>
       <!-- handler for Amount -->
       <xsl:template match="AMOUNTFLDS" mode="Amount">
              <xsl:variable name="relBlk" select="REL_BLOCK"/>
              <xsl:variable name="relFld" select="REL_FIELD"/>
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
              <RELATED_FIELD>
                     <xsl:if test="($relBlk != '' and  $relBlk != 'none') or ($relFld != '' and $relFld != 'none')">
                            <xsl:value-of select="concat($relBlk,'__',$relFld)"/>
                     </xsl:if>
              </RELATED_FIELD>
       </xsl:template>
       <!-- Handler for Lov -->
       <xsl:template match="FIELDS" mode="Lov">
              <!-- <xsl:variable name="Blk_Id" select="../BLOCK_ID"/> -->
              <xsl:variable name="Blk_Id">
                     <xsl:call-template name="str:to-upper">
                            <xsl:with-param name="text" select="../BLOCK_ID"/>
                     </xsl:call-template>
              </xsl:variable>
              <!-- <xsl:variable name="Fld_Name" select="NAME"/> -->
              <xsl:variable name="Fld_Name">
                     <xsl:call-template name="str:to-upper">
                            <xsl:with-param name="text" select="NAME"/>
                     </xsl:call-template>
              </xsl:variable>
              <LOV BLOCK_ID="{$Blk_Id}">
                     <FIELD NAME="{$Fld_Name}">
                            <xsl:for-each select="LOV">
                                   <xsl:variable name="seq" select="SEQ_NO"/>
                                   <xsl:variable name="Type" select="TYPE"/>
                                   <xsl:variable name="FecthSize"
                                                 select="FETCH_SIZE"/>
                                   <xsl:variable name="PageSize"
                                                 select="PAGE_SIZE"/>
                                   <LOV_DETTAILS ID="{position()}"
                                                 ORDER="{$seq}" TYPE="{$Type}"
                                                 QRY_TYPE="{QRY_TYPE}"
                                                 FS="{$FecthSize}"
                                                 PS="{$PageSize}">
                                          <QUERY>
                                                 <xsl:value-of select="QUERY"/>
                                          </QUERY>
                                          <xsl:for-each select="./LOVQRYCOLS">
                                                 <!--  <xsl:variable name="BlkId" select="SEL_BLK_ID"/> -->
                                                 <xsl:variable name="BlkId">
                                                        <xsl:call-template name="str:to-upper">
                                                               <xsl:with-param name="text"
                                                                               select="SEL_BLK_ID"/>
                                                        </xsl:call-template>
                                                 </xsl:variable>
                                                 <!--  <xsl:variable name="Fld" select="SEL_BLK_FLD"/> -->
                                                 <xsl:variable name="Fld">
                                                        <xsl:call-template name="str:to-upper">
                                                               <xsl:with-param name="text"
                                                                               select="SEL_BLK_FLD"/>
                                                        </xsl:call-template>
                                                 </xsl:variable>
                                                 <QRY_COLS>
                                                        <QRY_COL>
                                                               <xsl:value-of select="QRY_COL"/>
                                                        </QRY_COL>
                                                        <DATA_TYPE>
                                                               <xsl:value-of select="DATA_TYPE"/>
                                                        </DATA_TYPE>
                                                        <SEL_REDUCTION_FLD>
                                                               <xsl:value-of select="SEL_REDUCTION_FLD"/>
                                                        </SEL_REDUCTION_FLD>
                                                        <SEL_BLK_ID>
                                                               <!-- <xsl:value-of select = "SEL_BLK_ID"/> -->
                                                               <xsl:call-template name="str:to-upper">
                                                                      <xsl:with-param name="text"
                                                                                      select="SEL_BLK_ID"/>
                                                               </xsl:call-template>
                                                        </SEL_BLK_ID>
                                                        <SEL_BLK_FLD>
                                                               <!-- <xsl:value-of select="SEL_BLK_FLD"/> -->
                                                               <xsl:call-template name="str:to-upper">
                                                                      <xsl:with-param name="text"
                                                                                      select="SEL_BLK_FLD"/>
                                                               </xsl:call-template>
                                                        </SEL_BLK_FLD>
                                                        <FORM_FLD>
                                                               <!-- <xsl:value-of select="FORM_FLD"/> -->
                                                               <xsl:call-template name="str:to-upper">
                                                                      <xsl:with-param name="text"
                                                                                      select="FORM_FLD"/>
                                                               </xsl:call-template>
                                                        </FORM_FLD>
                                                        <RETURN_FLD>
                                                               <!-- <xsl:value-of select="concat($BlkId,'__',$Fld)"/>   -->
                                                               <xsl:value-of select="$Fld"/>
                                                        </RETURN_FLD>
                                                        <!-- <REDUCTION_FLD>
                                                               <xsl:value-of select="REDUCTION_FLD"/>
                                                        </REDUCTION_FLD> -->
                                                 </QRY_COLS>
                                          </xsl:for-each>
                                          <xsl:for-each select="./LOVBINDVAR">
                                                 <BIND_VARS>
                                                        <BIND_VAR>
                                                               <xsl:value-of select="BIND_VAR"/>
                                                        </BIND_VAR>
                                                        <BLK_ID>
                                                               <!-- <xsl:value-of select="BLK_ID"/> -->
                                                               <xsl:call-template name="str:to-upper">
                                                                      <xsl:with-param name="text"
                                                                                      select="BLK_ID"/>
                                                               </xsl:call-template>
                                                        </BLK_ID>
                                                        <SEL_FORM_FLD>
                                                               <!-- <xsl:value-of select="SEL_FORM_FLD"/> -->
                                                               <xsl:call-template name="str:to-upper">
                                                                      <xsl:with-param name="text"
                                                                                      select="SEL_FORM_FLD"/>
                                                               </xsl:call-template>
                                                        </SEL_FORM_FLD>
                                                        <DATA_TYPE>
                                                               <xsl:value-of select="DATA_TYPE"/>
                                                        </DATA_TYPE>
                                                        <FORM_FLD>
                                                               <!-- <xsl:value-of select="FORM_FLD"/> -->
                                                               <xsl:call-template name="str:to-upper">
                                                                      <xsl:with-param name="text"
                                                                                      select="FORM_FLD"/>
                                                               </xsl:call-template>
                                                        </FORM_FLD>
                                                 </BIND_VARS>
                                          </xsl:for-each>
                                   </LOV_DETTAILS>
                            </xsl:for-each>
                     </FIELD>
              </LOV>
       </xsl:template>
       <!-- Handler for DataDource DS Fields -->
       <xsl:template match="DSFIELDS">
              <xsl:copy-of select=".">
              </xsl:copy-of>
       </xsl:template>
       <xsl:template match="BUTTONS">
              <xsl:variable name="screen" select="TXT_SCR_NAME"/>
              <!--              <xsl:variable name = "StdBtnsCmn" select = "STDBUTTONS_SE/CHK_COMMON_STD_BTNS"/>  -->
              <xsl:if test="count(STDBUTTONS[SEL_IMG_REQ = 'N']) &gt; 0">
                     <BLOCK SCREEN="{$screen}" TYPE="Single Entry">
                            <ID>BLK_STDBUTTONS</ID>
                            <!-- <ID>BLK_STD_BUTTONS</ID>-->
                            <!-- sundar Feb 19 StdBtns are not supposed to be common Blks                             
                            <xsl:if test= "$StdBtnsCmn = 'Y'">
                                <COMMON>Y</COMMON> 
                            </xsl:if>
                            <xsl:if test=  "$StdBtnsCmn != 'Y'">
                                <COMMON>N</COMMON> 
                            </xsl:if>  -->
                            <xsl:for-each select="STDBUTTONS[SEL_IMG_REQ = 'N']">
                                   <FIELD TABPAGE="" INCLUDE="{CHK_INCLUDE}">
                                          <NAME>
                                                 <xsl:value-of select="TXT_BTN_NAME"/>
                                          </NAME>
                                          <TYPE>BUTTON</TYPE>
                                          <EVENT>
                                                 <NAME>
                                                 </NAME>
                                                 <FUNCTION>
                                                        <xsl:value-of select="TXT_FUNCTION"/>
                                                 </FUNCTION>
                                          </EVENT>
                                   </FIELD>
                            </xsl:for-each>
                     </BLOCK>
              </xsl:if>
              <xsl:if test="count(STDBUTTONS[SEL_IMG_REQ = 'Y']) &gt; 0">
                     <BLOCK SCREEN="{$screen}" TYPE="Single Entry">
                            <!-- sundar Feb 19 StdBtns are not supposed to be common Blks                                                  
                            <xsl:if test= "$StdBtnsCmn = 'Y'">
                                <COMMON>Y</COMMON> 
                            </xsl:if>
                            <xsl:if test=  "$StdBtnsCmn != 'Y'">
                                <COMMON>N</COMMON> 
                            </xsl:if>  -->
                            <ID>BLK_STDBUTTONS_IMG</ID>
                            <!-- <ID>BLK_STD_BUTTONS_IMG</ID>-->
                            <xsl:for-each select="STDBUTTONS[SEL_IMG_REQ = 'Y']">
                                   <FIELD TABPAGE="" INCLUDE="{CHK_INCLUDE}">
                                          <NAME>
                                                 <xsl:value-of select="TXT_BTN_NAME"/>
                                          </NAME>
                                          <TYPE>BUTTON</TYPE>
                                          <SRC>
                                                 <xsl:value-of select="TXT_IMG"/>
                                          </SRC>
                                          <EVENT>
                                                 <NAME>
                                                 </NAME>
                                                 <FUNCTION>
                                                        <xsl:value-of select="TXT_FUNCTION"/>
                                                 </FUNCTION>
                                          </EVENT>
                                   </FIELD>
                            </xsl:for-each>
                     </BLOCK>
              </xsl:if>
              <xsl:if test="count(CSTBUTTONS[SEL_IMG_REQ = 'N']) &gt; 0">
                     <BLOCK SCREEN="{$screen}" TYPE="Single Entry">
                            <ID>BLK_CST_BUTTONS</ID>
                            <xsl:for-each select="CSTBUTTONS">
                                   <xsl:variable name="btnName"
                                                 select="TXT_BTN_NAME"/>
                                   <xsl:variable name="id" select="@ID"/>
                                   <FIELD TABPAGE="{SEL_TABPAGE}">
                                          <NAME>
                                                 <xsl:value-of select="$btnName"/>
                                          </NAME>
                                          <TYPE>BUTTON</TYPE>
                                          <ID>
                                                 <xsl:value-of select="concat($btnName,'_',$id)"/>
                                          </ID>
                                          <EVENT>
                                                 <NAME>onClick</NAME>
                                                 <FUNCTION>
                                                        <xsl:value-of select="TXT_FUNCTION"/>
                                                 </FUNCTION>
                                          </EVENT>
                                          <VALIGN>
                                                 <xsl:value-of select="POSITION"/>
                                          </VALIGN>
                                          <HALIGN>
                                                 <xsl:value-of select="ALIGNMENT"/>
                                          </HALIGN>
                                   </FIELD>
                            </xsl:for-each>
                     </BLOCK>
              </xsl:if>
              <xsl:if test="count(CSTBUTTONS[SEL_IMG_REQ = 'Y']) &gt; 0">
                     <BLOCK SCREEN="{$screen}" TYPE="Single Entry">
                            <ID>BLK_CST_BUTTONS</ID>
                            <xsl:for-each select="CSTBUTTONS">
                                   <xsl:variable name="idGen"
                                                 select="TXT_BTN_NAME"/>
                                   <xsl:variable name="id" select="@ID"/>
                                   <FIELD TABPAGE="{SEL_TABPAGE}">
                                          <NAME>
                                                 <xsl:value-of select="$idGen"/>
                                          </NAME>
                                          <TYPE>BUTTON</TYPE>
                                          <ID>
                                                 <xsl:value-of select="concat($idGen,'_',$id)"/>
                                          </ID>
                                          <SRC>
                                                 <xsl:value-of select="TXT_IMG"/>
                                          </SRC>
                                          <EVENT>
                                                 <NAME>onClick</NAME>
                                                 <FUNCTION>
                                                        <xsl:value-of select="TXT_FUNCTION"/>
                                                 </FUNCTION>
                                          </EVENT>
                                          <VALIGN>
                                                 <xsl:value-of select="POSITION"/>
                                          </VALIGN>
                                          <HALIGN>
                                                 <xsl:value-of select="ALIGNMENT"/>
                                          </HALIGN>
                                   </FIELD>
                            </xsl:for-each>
                     </BLOCK>
              </xsl:if>
       </xsl:template>
       <xsl:template match="WORKFLOW">
              <xsl:if test="CHK_WF_INCLUDE = 'Y'">
                     <WORKFLOW TYPE="{TXT_WF_TYPE}">
                            <STAGES>
                                   <xsl:apply-templates select="STGDESC"/>
                            </STAGES>
                            <REASONCODES>
                                   <xsl:apply-templates select="RSNCODEMNT"/>
                            </REASONCODES>
                            <ACTIONS>
                                   <xsl:apply-templates select="WFACTION"/>
                            </ACTIONS>
                     </WORKFLOW>
              </xsl:if>
       </xsl:template>
       <xsl:template match="STGDESC">
              <STAGE id="{TXT_STAGEID}" INCLUDE="{CHK_STG_INCLUDE}">
                     <xsl:value-of select="TXT_STG_TYPE"/>
              </STAGE>
       </xsl:template>
       <xsl:template match="RSNCODEMNT">
              <REASON_CODE type="{SEL_RSN_TYPE}" INCLUDE="{CHK_INCLUDE_RSN}">
                     <xsl:value-of select="TXT_RSNCODE"/>
              </REASON_CODE>
       </xsl:template>
       <xsl:template match="WFACTION">
              <ACTION INCLUDE="{CHK_ACT_INCLUDE}">
                     <xsl:value-of select="TXT_WF_TYPE"/>
              </ACTION>
       </xsl:template>
       <xsl:template match="FIELDSET">
              <xsl:param name="Block_Id" select="."/>
              <xsl:variable name="Included" select="CHK_INCLUDE"/>
              <xsl:if test="$Included = 'Y'">
                     <xsl:variable name="Fld_Name" select="FLD_NAME"/>
                     <xsl:apply-templates select="//BLOCKS[BLOCK_ID = $Block_Id]/FIELDS[NAME = $Fld_Name]"
                                          mode="FieldSet">
                     </xsl:apply-templates>
              </xsl:if>
       </xsl:template>
       <!-- Handler the Fields in FieldSet -->
       <xsl:template match="FIELDS" mode="FieldSet">
              <xsl:variable name="TabPage" select="FLD_TAB_PAGE"/>
              <xsl:variable name="Seq" select="SEQ_NO"/>
              <xsl:variable name="Fld_Type" select="FLD_TYPE"/>
              <xsl:variable name="Fld_Name">
                     <xsl:call-template name="str:to-upper">
                            <xsl:with-param name="text" select="NAME"/>
                     </xsl:call-template>
              </xsl:variable>
              <FIELD>
                     <xsl:if test="./../BLOCK_ENTRY_TYPE = 'S'">
                            <xsl:attribute name="TABPAGE">
                                   <xsl:value-of select="$TabPage"/>
                            </xsl:attribute>
                     </xsl:if>
                     <NAME>
                            <!-- <xsl:value-of select="NAME"/> -->
                            <xsl:call-template name="str:to-upper">
                                   <xsl:with-param name="text" select="NAME"/>
                            </xsl:call-template>
                     </NAME>
                     <DBT>
                            <!--  <xsl:value-of select="DBT"/> -->
                            <xsl:call-template name="str:to-lower">
                                   <xsl:with-param name="text" select="DBT"/>
                            </xsl:call-template>
                     </DBT>
                     <DBC>
                            <!-- <xsl:value-of select="DBC"/> -->
                            <xsl:call-template name="str:to-lower">
                                   <xsl:with-param name="text" select="DBC"/>
                            </xsl:call-template>
                     </DBC>
                     <TYPE>
                            <xsl:value-of select="$Fld_Type"/>
                     </TYPE>
                     <xsl:if test="./../COMMON = 'Y'">
                            <xsl:call-template name="RefBlockFieldHandler">
                                   <xsl:with-param name="blockName"
                                                   select="./../BLOCK_ID"/>
                                   <xsl:with-param name="fldName" select="NAME"/>
                            </xsl:call-template>
                     </xsl:if>
                     <MAXLENGTH>
                            <xsl:value-of select="DLENGTH"/>
                     </MAXLENGTH>
                     <DTYPE>
                            <xsl:value-of select="DATATYPE"/>
                     </DTYPE>
                     <xsl:if test="$Fld_Type = 'SELECT'">
                            <xsl:apply-templates select="SELECT" mode="Select"/>
                     </xsl:if>
                     <xsl:if test="$Fld_Type = 'CHECK'">
                            <xsl:apply-templates select="CHECKFLDS"
                                                 mode="CheckBox"/>
                     </xsl:if>
                     <xsl:if test="$Fld_Type = 'AMOUNT'">
                            <xsl:apply-templates select="AMOUNTFLDS"
                                                 mode="Amount"/>
                     </xsl:if>
                     <xsl:if test="$Fld_Type = 'RADIO'">
                            <xsl:apply-templates select="RADIO"/>
                     </xsl:if>
                     <!-- For Nesting Of Field Sets ..Not Reqd Now <xsl:if test="$Fld_Type = 'FIELDSET'">
                     			          <xsl:apply-templates select="FIELDSET" mode="FieldSet"/>
                     </xsl:if>
                     		     -->
              </FIELD>
       </xsl:template>
       <!-- Template to handle Reference block Attributes -->
       <!-- xsl:value-of REQD, READONLY, UCASE -->
       <xsl:template name="RefBlockFieldHandler">
              <xsl:param name="blockName" select="."/>
              <xsl:param name="fldName" select="."/>
              <xsl:variable name="attrNode"
                            select="//BLOCKS[BLOCK_ID = $blockName]/BLOCKS_ATTRIBUTE[TXT_FIELD_NAME =$fldName]"/>
              <xsl:variable name="Req" select="$attrNode/CHK_REQ"/>
              <xsl:variable name="Ro" select="$attrNode/CHK_RO"/>
              <xsl:variable name="Ucase" select="$attrNode/CHK_UCASE"/>
              <xsl:variable name="DefValue" select="$attrNode/TXT_DEFAULT_VALUE"/>
              <xsl:variable name="refBlk" select="$attrNode/SEL_REF_BLK"/>
              <xsl:variable name="refFld" select="$attrNode/SEL_REF_FLD"/>
              <xsl:variable name="Chk_Req">
                     <xsl:choose>
                            <xsl:when test="$Req = 'Y'">
                                   <xsl:text>-1</xsl:text>
                            </xsl:when>
                            <xsl:otherwise>
                                   <xsl:text>0</xsl:text>
                            </xsl:otherwise>
                     </xsl:choose>
              </xsl:variable>
              <xsl:variable name="Chk_Ro">
                     <xsl:choose>
                            <xsl:when test="$Ro = 'Y'">
                                   <xsl:text>-1</xsl:text>
                            </xsl:when>
                            <xsl:otherwise>
                                   <xsl:text>0</xsl:text>
                            </xsl:otherwise>
                     </xsl:choose>
              </xsl:variable>
              <xsl:variable name="Chk_Ucase">
                     <xsl:choose>
                            <xsl:when test="$Ucase = 'Y'">
                                   <xsl:text>-1</xsl:text>
                            </xsl:when>
                            <xsl:otherwise>
                                   <xsl:text>0</xsl:text>
                            </xsl:otherwise>
                     </xsl:choose>
              </xsl:variable>
              <xsl:if test="$Chk_Req = '-1'">
                     <REQUIRED>
                            <xsl:value-of select="$Chk_Req"/>
                     </REQUIRED>
              </xsl:if>
              <xsl:if test="$Chk_Ro = '-1'">
                     <READ_ONLY>
                            <xsl:value-of select="$Chk_Ro"/>
                     </READ_ONLY>
              </xsl:if>
              <xsl:if test="$Chk_Ucase = '-1'">
                     <UPPERCASE>
                            <xsl:value-of select="$Chk_Ucase"/>
                     </UPPERCASE>
              </xsl:if>
              <xsl:if test="$DefValue != ''">
                     <CUSTOM>
                            <NAME>
                                   <xsl:text>VALUE</xsl:text>
                            </NAME>
                            <VALUE>
                                   <xsl:value-of select="$DefValue"/>
                            </VALUE>
                     </CUSTOM>
              </xsl:if>
              <!-- Reference Field Handling -->
              <REF_FIELD>
                     <xsl:if test="($refBlk != '' and $refBlk != 'none') or ($refFld != '' and $refFld != 'none')">
                            <xsl:value-of select="concat($refBlk,'__',$refFld)"/>
                     </xsl:if>
              </REF_FIELD>
              <xsl:apply-templates select="$attrNode/FIELD_EVENTS"/>
       </xsl:template>
       <xsl:template match="FIELD_EVENTS">
              <EVENT>
                     <NAME>
                            <xsl:value-of select="TYPE"/>
                     </NAME>
                     <FUNCTION>
                            <xsl:value-of select="FUNCTION"/>
                     </FUNCTION>
              </EVENT>
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
