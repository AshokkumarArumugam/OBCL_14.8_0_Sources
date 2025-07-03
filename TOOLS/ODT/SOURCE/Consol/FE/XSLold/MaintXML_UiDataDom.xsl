<?xml version ="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:str="http://www.w3.org/1999/XSL/Transform">
       <xsl:template match="/UDTMAINT">
              <UIGENSCR_MAIN ID="1" Type="SINGLE">
              
                     <!-- Call SCREENS  handler -->
                     <TXT_UI_TYPE><xsl:value-of select="UI_TYPE"/></TXT_UI_TYPE>
                     <TXT_MODULE_CODE>
                            <xsl:value-of select="@MODULE_CODE"/>
                     </TXT_MODULE_CODE>
                     <TXT_MODULE_NAME>
                             <xsl:value-of select="MODULE_NAME"/>
                     </TXT_MODULE_NAME>
                     
                     <TXT_FUNCTIONID>
                            <!-- <xsl:value-of select="@FUNCTIONID"/> -->
                     </TXT_FUNCTIONID>
                     <TXT_FUNCTIONDESC><xsl:value-of select="FUNCTION_NAME"/></TXT_FUNCTIONDESC>
                     
                     <xsl:apply-templates select="SCREEN"></xsl:apply-templates>
                     
                     <!-- Call BLOCKS  handler -->
                     <xsl:apply-templates select="BLOCK[ID != 'BLK_STDBUTTONS'][ID != 'BLK_STDBUTTONS_IMG'][ID != 'BLK_CST_BUTTONS']">
                     </xsl:apply-templates>
                     
                     <!-- Call FIELDS Ordering  handler  -->
                     <xsl:apply-templates select="SCREEN" mode="FieldsOrder"></xsl:apply-templates>
                     
                     <!-- Call Buttons Handler -->
                     <xsl:apply-templates select="SCREEN" mode="Buttons"></xsl:apply-templates>
                     
                     <!--Call Access Keys Handler -->
                     <xsl:apply-templates select="SCREEN" mode="AccessKeys"/>
              </UIGENSCR_MAIN>
       </xsl:template>
       
       <!-- Handler For Screens -->
       <xsl:template match="SCREEN">
              <UIGENSCR_SCREENS ID="{position()}" TYPE="MULTIPLE">
                     <xsl:variable name="ScrType" select="@SCREEN_TYPE"/>
                     <xsl:variable name="idx" select="position()"/>
                     <xsl:variable name="ScreenName" select="@NAME"/>
                     
                     <TXT_SNO><xsl:value-of select="position()"/></TXT_SNO>
                     <TXT_SCREEN_ID><xsl:value-of select="@NAME"/></TXT_SCREEN_ID>
                     <TXT_SCRTYPE>
                            <xsl:if test="$ScrType = 'M'">Main Screen</xsl:if>
                            <xsl:if test="$ScrType = 'S'">Sub Screen</xsl:if>
                     </TXT_SCRTYPE>    
                     <TXT_SCREEN_HEIGHT>600</TXT_SCREEN_HEIGHT>
                     <TXT_SCREEN_WIDTH>900</TXT_SCREEN_WIDTH>
                      <TXT_TITLE></TXT_TITLE>
                     <UI_SCREEN_POS>column</UI_SCREEN_POS>
                     <TXT_SCRID_HID></TXT_SCRID_HID>
                     <xsl:apply-templates select="HEADER/PAGE"></xsl:apply-templates>
                     <xsl:apply-templates select="TAB/PAGE">
                            <xsl:with-param name="idx"
                                            select="count(HEADER/PAGE)"/>
                     </xsl:apply-templates>
                     
                     <!-- 
                            Get the Total Count of Header and Tabpages. int L_count
                     !-->
                     <xsl:variable name = "Hcount" select = "count(HEADER/PAGE)"/>
                     <xsl:variable name = "Tabcount" select = "count(TAB/PAGE)"/>
                     <xsl:variable name = "L_count" select = "$Hcount + $Tabcount"/>
                     
                     
                     
                     <UIGENSCR_TABPAGES ID="{$L_count +1}" Type="MULTIPLE">
                            <TXT_SNO_TAB><xsl:value-of select="$L_count + 1 "/></TXT_SNO_TAB>
                            <TXT_PAGE_ID>All<xsl:value-of select="@ID"/></TXT_PAGE_ID>
                            <TXT_LABLE>All</TXT_LABLE>
                            <TXT_IS_HDR>TABPAGE_ALL</TXT_IS_HDR>
                            <TXT_HEIGHT>100</TXT_HEIGHT>
                            <!--
                            <xsl:if test = "count(//*[@TABPAGE = 'All']) &gt; 0 ">
                                   <TXT_HEIGHT>100</TXT_HEIGHT>
                             </xsl:if>
                            <xsl:if test = "count(//*[@TABPAGE = 'All']) = 0 ">
                                   <TXT_HEIGHT>0</TXT_HEIGHT>
                             </xsl:if>
                             !-->
                            <TXT_ORDER><xsl:value-of select = "$L_count + 1 "/></TXT_ORDER>
                            <TXT_TABID_HID></TXT_TABID_HID>
                     </UIGENSCR_TABPAGES>
              </UIGENSCR_SCREENS>
       </xsl:template>
       
       <!-- handler for tabpages -->
       <xsl:template match="HEADER/PAGE">
              <xsl:variable name="scrName" select="../../@NAME"/>
              <xsl:variable name="PageID" select="@ID"/>
              <UIGENSCR_TABPAGES ID="{position()}" Type="MULTIPLE">
                     <TXT_SNO_TAB><xsl:value-of select="position()"/></TXT_SNO_TAB>
                     <TXT_PAGE_ID><xsl:value-of select="@ID"/></TXT_PAGE_ID>
                     <TXT_LABLE></TXT_LABLE>
                     <TXT_IS_HDR>Header</TXT_IS_HDR>
                     <TXT_HEIGHT><xsl:value-of select = "@HEIGHT"/></TXT_HEIGHT>
                     <TXT_ORDER><xsl:value-of select = "@ORDER"/></TXT_ORDER>
                     <TXT_TABID_HID></TXT_TABID_HID>
              </UIGENSCR_TABPAGES>
       </xsl:template>
       
       <!-- handler for tabpages -->
       <xsl:template match="TAB/PAGE">
              <xsl:param name="idx" select="."/>
              <xsl:variable name="scrName" select="../../@NAME"/>
              <xsl:variable name="PageID" select="@ID"/>
              <UIGENSCR_TABPAGES ID="{$idx+position()}" Type="MULTIPLE">
                     <TXT_SNO_TAB><xsl:value-of select="$idx+position()"/></TXT_SNO_TAB>
                     <TXT_PAGE_ID><xsl:value-of select="@ID"/></TXT_PAGE_ID>
                     <TXT_LABLE></TXT_LABLE>
                     <TXT_IS_HDR>TAB</TXT_IS_HDR>
                     <TXT_HEIGHT/>
                     <TXT_ORDER><xsl:value-of select = "@ORDER"/></TXT_ORDER>
                     <TXT_TABID_HID></TXT_TABID_HID>
              </UIGENSCR_TABPAGES>
       </xsl:template>
       
       <!-- handler for Blocks -->
       <xsl:template match="BLOCK">
              <xsl:variable name = "currBlock" select = "."/>
              <UIGENSCR_BLOCKS ID="{position()}" Type="MULTIPLE">
                <!--Reddy Prasad Begin-->
                     <xsl:variable name = "BlkId">
                        <xsl:call-template name = "str:to-lower">
                        <xsl:with-param name = "text" select =  "ID"/>
                     </xsl:call-template>
                     </xsl:variable>
                <!--Reddy Prasad End-->
                     <TXT_SNO><xsl:value-of select="position()"/></TXT_SNO>
                     <TXT_BLOCK_ID>
                     <!-- <xsl:value-of select="ID"/> -->
                     <xsl:call-template name = "str:to-upper">
                        <xsl:with-param name = "text" select =  "ID"/>
                     </xsl:call-template>
                     </TXT_BLOCK_ID>
                     <!--Reddy Prasad Begin-->
                     <TXT_BLK_LABEL>
                        <xsl:call-template name="str:replace">
                                          <xsl:with-param name="text">
                                                 <xsl:value-of select="$BlkId"/>
                                          </xsl:with-param>
                                   </xsl:call-template>
                     </TXT_BLK_LABEL>
                     <!--Reddy Prasad End-->
                     <!-- Common Block Feb 07 -->
                     <xsl:variable name = "isCommon" select = "LINK_FILE"/>
                     <xsl:if  test = "$isCommon != ''">                     
                      <CHK_COMMON>Y</CHK_COMMON>
                     </xsl:if>  
                     <xsl:if  test = "$isCommon = ''">                     
                      <CHK_COMMON>N</CHK_COMMON>
                     </xsl:if>  
                     
                      
                     
                     <TXT_BLOCK_BLK_TYPE><xsl:value-of select="@TYPE"/></TXT_BLOCK_BLK_TYPE>
                     
                     <xsl:if test="@TYPE='Multiple Entry'">
                            <TXT_ME_TABPAGE><xsl:value-of select="@TABPAGE"/></TXT_ME_TABPAGE>
                            <TXT_HEIGHT>250</TXT_HEIGHT>
                            <TXT_WIDTH>850</TXT_WIDTH>
                     </xsl:if>
                     <CHK_BLK></CHK_BLK>
                     
                     <TXT_SCREEN_NAME><xsl:value-of select="@SCREEN"/></TXT_SCREEN_NAME>
                     <TXT_BLKID_HID></TXT_BLKID_HID>
                     <!-- Call Fields handler -->
                     
                     <xsl:variable name="TabPage" select="./@TABPAGE"/>
                     <xsl:apply-templates select="FIELD" mode="Block_Fields">
                            <xsl:with-param name="TabPage" select="$TabPage"/>
                            <xsl:with-param name="Blk_Id" select="ID"/>
                     </xsl:apply-templates>
                     
                     <xsl:apply-templates select="$currBlock//FIELD" mode="Block_Fields_Labels">
                            <xsl:with-param name="TabPage" select="$TabPage"/>
                     </xsl:apply-templates>
                     
                     <xsl:apply-templates select="$currBlock//FIELD[TYPE != 'FIELDSET']" mode="Block_Fields_Attributes"></xsl:apply-templates>
              </UIGENSCR_BLOCKS>
       </xsl:template>
       
       <!-- Handler For Block  Fields -->
       <xsl:template match="FIELD" mode="Block_Fields">
              <xsl:param name="TabPage" select="."/>
              
              <xsl:variable name="Blk_Id" select="../ID"/>
              
              <BLOCK_FIELDS ID="{position()}" Type="MULTIPLE">
                     <xsl:variable name="FldType" select="TYPE"/>
                     <xsl:variable name="FldName" select="NAME"/>
                     
                     <TXT_SNO><xsl:value-of select="position()"/></TXT_SNO>
                     <TXT_FIELD_NAME> <!-- <xsl:value-of select="NAME"/> -->
                      <xsl:call-template name = "str:to-upper">
                        <xsl:with-param name = "text" select = "NAME"/>
                      </xsl:call-template>
                     </TXT_FIELD_NAME>
                     <TXT_FIELD_ORDER><xsl:value-of select="position()"/></TXT_FIELD_ORDER>
                     <DBT>
                       <xsl:call-template name = "str:to-lower">
                        <xsl:with-param name = "text" select = "DBT"/>
                       </xsl:call-template>
                     </DBT>
                     
                     <DBC><!-- <xsl:value-of select="DBC"/> -->
                        <xsl:call-template name = "str:to-lower">
                            <xsl:with-param name = "text" select = "DBC"/>
                        </xsl:call-template>                     
                     </DBC> 
                     <SEL_TABPAGE_FIELDS>
                            <xsl:if test="count(./@TABPAGE) =0">
                                   <xsl:value-of select="$TabPage"/>
                            </xsl:if>
                            <xsl:if test="count(./@TABPAGE) &gt; 0">
                                   <xsl:value-of select="@TABPAGE"/>
                            </xsl:if>
                     </SEL_TABPAGE_FIELDS>
                     <!--
                     <CHK_LABEL_REQUIRED>Y</CHK_LABEL_REQUIRED>
                     <TXT_FIELD_LABEL></TXT_FIELD_LABEL>
                     -->
                     <FLD_TYPE><xsl:value-of select="$FldType"/></FLD_TYPE>
                     <DATATYPE><xsl:value-of select="DTYPE"/></DATATYPE>
                     <DLENGTH><xsl:value-of select="MAXLENGTH"/></DLENGTH>
                     <xsl:if test="$FldType ='SELECT'">
                            <xsl:apply-templates select="OPTION" mode="Select">
                            </xsl:apply-templates>
                     </xsl:if>                     
                     <xsl:if test="$FldType ='LOV'">                           
                            <xsl:apply-templates select="//LOV[@BLOCK_ID =$Blk_Id]/FIELD[@NAME = $FldName]"
                                                 mode="Lov">
                                   <xsl:with-param name="dbt" select="DBT"/>
                                   <xsl:with-param name="dbc" select="DBC"/>
                            </xsl:apply-templates>
                     </xsl:if>
                     <xsl:if test="$FldType ='AMOUNT'">
                            <xsl:apply-templates select="." mode="Amount">
                            </xsl:apply-templates>
                     </xsl:if>
                     <xsl:if test="$FldType ='CHECK'">
                            <xsl:apply-templates select="." mode="Checkbox">
                            </xsl:apply-templates>
                     </xsl:if>
                     <xsl:if test="$FldType ='RADIO'">
                            <xsl:apply-templates select="OPTION" mode="Radio">
                            </xsl:apply-templates>  
                     </xsl:if>
                     <xsl:if test="$FldType ='FIELDSET'">
                            <xsl:apply-templates select="FIELD" mode="FieldSet">
                                <xsl:with-param name="TabPage" select="$TabPage"/>              
                                <xsl:with-param name="Blk_Id" select="$Blk_Id"/>
                            </xsl:apply-templates>
                     </xsl:if>
              </BLOCK_FIELDS>
       </xsl:template>
       
       <!-- Handler For Block  Fields Labels-->
       <xsl:template match="FIELD" mode="Block_Fields_Labels">
              <xsl:param name="TabPage" select="."/>              
              <!--<xsl:variable name="Blk_Id" select="../ID"/>-->
              
              <BLOCK_FIELDS_LABEL ID="{position()}" Type="MULTIPLE">                     
                     <xsl:variable name="FldName" select="NAME"/>
                     <xsl:variable name = "FldName_UC">
                      <xsl:call-template name="str:to-upper">
                        <xsl:with-param name = "text" select = "NAME"/>
                      </xsl:call-template>
                     </xsl:variable>
                     
                     <TXT_SNO><xsl:value-of select="position()"/></TXT_SNO>
                     <TXT_FIELD_NAME><xsl:value-of select="$FldName_UC"/></TXT_FIELD_NAME>
                     <TXT_FIELD_ORDER><xsl:value-of select="position()"/></TXT_FIELD_ORDER>
                     <CHK_LABEL_REQUIRED></CHK_LABEL_REQUIRED>
                     <TXT_FIELD_LABEL></TXT_FIELD_LABEL>                     
                     <SEL_TABPAGE_FIELDS>
                            <xsl:if test="count(./@TABPAGE) =0">
                                   <xsl:value-of select="$TabPage"/>
                            </xsl:if>
                            <xsl:if test="count(./@TABPAGE) &gt; 0">
                                   <xsl:value-of select="@TABPAGE"/>
                            </xsl:if>
                     </SEL_TABPAGE_FIELDS> 
                     <TXT_FLDID_HID></TXT_FLDID_HID>
              </BLOCK_FIELDS_LABEL>
       </xsl:template>
       <!-- Handler for Block Fields Attributes -->
       <xsl:template match="FIELD" mode="Block_Fields_Attributes">
              <!-- <xsl:variable name="Blk_Id" select="../ID"/> -->
              <xsl:variable name="Blk_Id">
                <xsl:call-template name = "str:to-lower">
                  <xsl:with-param name = "text" select = "../ID"/>
                </xsl:call-template>
              </xsl:variable>                
              <!-- Reddy Prasad -->
              <xsl:variable name="FldType" select="TYPE"/>
               <xsl:if test="$FldType != 'FIELDSET'">             
                      <BLOCKS_ATTRIBUTE ID="{position()}" Type="MULTIPLE">
                             <!-- <xsl:variable name="FldType" select="TYPE"/> -->
                             <!-- <xsl:variable name="FldName" select="NAME"/> -->
                             <xsl:variable name="FldName">
                              <xsl:call-template name = "str:to-upper">
                                <xsl:with-param name = "text" select = "NAME"/>
                              </xsl:call-template>                          
                             </xsl:variable>
                             
                             <TXT_SNO><xsl:value-of select="position()"/></TXT_SNO>
                             <TXT_FIELD_NAME><!--  <xsl:value-of select="NAME"/> -->
                                <xsl:value-of select = "$FldName"/>
                              </TXT_FIELD_NAME>
                             <TXT_DEFAULT_VALUE></TXT_DEFAULT_VALUE>
                             <!-- sundar
                             <CHK_REQ>N</CHK_REQ>
                             <CHK_RO>N</CHK_RO>
                             <CHK_HIDDEN>N</CHK_HIDDEN>
                             <CHK_UCASE>N</CHK_UCASE>
                             <CHK_REMOVE>N</CHK_REMOVE>  -->
                             <xsl:variable name="reqd" select="REQUIRED"/>
                             <xsl:variable name="readOnly" select="READ_ONLY"/>
                             <xsl:variable name="uCase" select="UPPERCASE"/>
                             
                              <CHK_REQ>
                                  <xsl:if test="$reqd != '' and $reqd = -1">
                                      <xsl:text>Y</xsl:text>
                                  </xsl:if>
                                 <xsl:if test="$reqd = '' or $reqd = 0 or count(REQUIRED) = 0">
                                      <xsl:text>N</xsl:text>
                                 </xsl:if>
                              </CHK_REQ>
                              <CHK_RO>
                                  <xsl:if test="$readOnly != '' and $readOnly = -1">
                                      <xsl:text>Y</xsl:text>
                                  </xsl:if>
                                 <xsl:if test="$readOnly = '' or $readOnly = 0 or count(READ_ONLY) = 0">
                                      <xsl:text>N</xsl:text>
                                 </xsl:if>
                              </CHK_RO>
                              <CHK_UCASE>
                                  <xsl:if test="$uCase != '' and $uCase = -1">
                                      <xsl:text>Y</xsl:text>
                                  </xsl:if>
                                 <xsl:if test="$uCase = '' or $uCase = 0 or count(UPPERCASE) = 0">
                                      <xsl:text>N</xsl:text>
                                 </xsl:if>
                              </CHK_UCASE>
                             <!-- <TXT_REF></TXT_REF>  -->
                             <xsl:variable name="refFld" select="REF_FIELD"/>
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
                             <!--  <FORM_FLD></FORM_FLD>   -->
                             <xsl:apply-templates select = "EVENT"/>
                      </BLOCKS_ATTRIBUTE>
              </xsl:if>             
       </xsl:template>       
      
      <xsl:template match = "EVENT">
        <ATTRIBUTE_EVENTS ID="{position()}" Type="MULTIPLE">
          <TXT_SNO><xsl:value-of select = "position()"/></TXT_SNO>
          <TXT_EVENT><xsl:value-of select = "NAME"/></TXT_EVENT> 
          <TXT_FUNTION_NAME><xsl:value-of select = "FUNCTION"/></TXT_FUNTION_NAME> 
      </ATTRIBUTE_EVENTS>
   </xsl:template>
   
   
       <!-- Select handler -->
       <xsl:template match="OPTION" mode="Select">
              <BLOCK_FIELDS_SELECT ID="{position()}" TYPE="MULTIPLE">
              
                     <TXT_SNO><xsl:value-of select="position()"/></TXT_SNO>
                     <OPTN_VALUE><xsl:value-of select="@VALUE"/></OPTN_VALUE>
                     <OPTN_LABEL><xsl:value-of select="@VALUE"/></OPTN_LABEL>
                     <xsl:variable name="TempVar" select="@VALUE"/>
                     <OPTN_LBL_ID>
                            <xsl:call-template name="str:to-lower">
                                   <xsl:with-param name="text">
                                          <xsl:value-of select="concat('LBL__',$TempVar)"/>
                                   </xsl:with-param>
                            </xsl:call-template>
                     </OPTN_LBL_ID>
                     
                     <xsl:if test="@SELECTED = -1">
                            <DEFAULT>Y</DEFAULT>
                     </xsl:if>
                     <TXT_SELID_HID></TXT_SELID_HID>
<!--                     <xsl:if test="count(@SELECTED) = 0">
                            <DEFAULT>N</DEFAULT>
                     </xsl:if>  -->
                     
              </BLOCK_FIELDS_SELECT>
       </xsl:template>
       
      <!-- Radio Handler -->
      <xsl:template match="OPTION" mode="Radio">
              <BLOCK_FIELDS_RADIO ID="{position()}" TYPE="MULTIPLE">
                     <TXT_SNO><xsl:value-of select="position()"/></TXT_SNO>
                     <OPTN_VALUE><xsl:value-of select="@VALUE"/></OPTN_VALUE>
                     <OPTN_LABEL><xsl:value-of select="@VALUE"/></OPTN_LABEL>
                     <xsl:variable name="TempVar" select="@VALUE"/>
                     <OPTN_LBL_ID>
                            <xsl:call-template name="str:to-lower">
                                   <xsl:with-param name="text">
                                          <xsl:value-of select="concat('LBL__',$TempVar)"/>
                                   </xsl:with-param>
                            </xsl:call-template>
                     </OPTN_LBL_ID>
                     <xsl:if test="@SELECTED =-1">
                            <DEFAULT>Y</DEFAULT>
                     </xsl:if> 
                     <TXT_RADIOID_HID></TXT_RADIOID_HID>
<!--                     <xsl:if test="count(@SELECTED) = 0">
                            <DEFAULT>N</DEFAULT>
                     </xsl:if>  -->
              </BLOCK_FIELDS_RADIO> 
       </xsl:template>  

       <!-- Lov handler -->
       <!-- <xsl:template match = "LOV_DETTAILS">  -->
       <xsl:template match="FIELD" mode="Lov">
              <!--
              <xsl:variable name = "dbt" select = "DBT"/>
              <xsl:variable name = "dbc" select = "DBC"/>
              -->
              <xsl:param name="dbt" select="."/>
              <xsl:param name="dbc" select="."/>
              
              <!-- <xsl:variable name="BlockId" select="../@BLOCK_ID"/> -->
              <xsl:variable name="BlockId">
                <xsl:call-template name = "str:to-upper">
                  <xsl:with-param name = "text" select = "../@BLOCK_ID"/>
                </xsl:call-template>
              </xsl:variable>
              
              <!-- <xsl:variable name="FldName" select="@NAME"/> -->
               <xsl:variable name="FldName">
                <xsl:call-template name = "str:to-upper">
                  <xsl:with-param name = "text" select = "@NAME"/>
                </xsl:call-template>
               </xsl:variable>
               
              
              <xsl:for-each select="LOV_DETTAILS">
                     <xsl:variable name="Idx" select="position()"/>
                     <BLOCK_FIELDS_LOV ID="{position()}" Type="MULTIPLE">                            
                            <TXT_SNO><xsl:value-of select="position()"/></TXT_SNO>
                            <TXT_LOV_TYPE><xsl:value-of select="@TYPE"/></TXT_LOV_TYPE>
                            <TXT_QUERY><xsl:value-of select="QUERY"/></TXT_QUERY>
                            <TXT_TITLE>
                                   <xsl:call-template name="str:replace">
                                          <xsl:with-param name="text">
                                                 <xsl:value-of select="$FldName"/>
                                          </xsl:with-param>
                                   </xsl:call-template>
                            </TXT_TITLE>
                            <SEL_QUERY_TYPE><xsl:value-of select="@QRY_TYPE"/></SEL_QUERY_TYPE>
                            <xsl:if test="$Idx =1">
                                   <CHK_LOV_TYPE_INCL>Y</CHK_LOV_TYPE_INCL>
                            </xsl:if>
                            <TXT_LOVID_HID></TXT_LOVID_HID>
                            <xsl:apply-templates select="QRY_COLS"/>
                            <xsl:apply-templates select="BIND_VARS">
                                   <xsl:with-param name = "dbtable" select = "$dbt"/>
                                   <xsl:with-param name = "dbcol" select = "$dbc"/>
                            </xsl:apply-templates>
                             <TXT_LOV_ID>
                                   <xsl:value-of select="concat('LOV__',$BlockId,'__',$FldName,'__',$Idx)"/>
                            </TXT_LOV_ID>
                     </BLOCK_FIELDS_LOV>
              </xsl:for-each>
       </xsl:template>
       <!-- Qry Cols handler -->
        <xsl:template match="QRY_COLS">              
              <BLOCK_FIELDS_LOV_QRYCOLS ID="{position()}" TYPE="MULTIPLE">
                     <SEQ_NO_LOV><xsl:value-of select="position()"/></SEQ_NO_LOV>
                     <TXT_QRY_COL><xsl:value-of select="QRY_COL"/></TXT_QRY_COL>
                     <TXT_COL_HEADING></TXT_COL_HEADING>
                     <TXT_RETURN_FLD> <!--  <xsl:value-of select="RETURN_FLD"/> -->
                      <!-- <xsl:call-template name = "str:to-upper">
                        <xsl:with-param name = "text" select = "RETURN_FLD"/>
                      </xsl:call-template> -->
                      <!-- <xsl:value-of select = "RETURN_FLD"/> -->
                      <xsl:value-of select = "FORM_FLD"/>
                     </TXT_RETURN_FLD>
                      <TXT_REDUCTION_FLD>
                           <xsl:if test="SEL_REDUCTION_FLD = 'Yes'">Y</xsl:if>
                           <xsl:if test="SEL_REDUCTION_FLD = 'No'">N</xsl:if>
                     </TXT_REDUCTION_FLD>
                     <TXT_REDUCTION_FLD_LBL></TXT_REDUCTION_FLD_LBL>
                     <TXT_QRYCOLID_HID></TXT_QRYCOLID_HID>
              </BLOCK_FIELDS_LOV_QRYCOLS>              
       </xsl:template>
       
       <xsl:template match="BIND_VARS">
              <xsl:param name = "dbtable" select = "."/>
              <xsl:param name = "dbcol" select = "."/>
              <BLOCK_FIELDS_LOV_BINDVARS ID="{position()}" TYPE="MULTIPLE">
                     <SEQ_NO_LOV><xsl:value-of select="position()"/></SEQ_NO_LOV>
                     
                     <xsl:variable name="BV_Blk_ID_UC">
                      <xsl:call-template name = "str:to-upper">
                        <xsl:with-param name  = "text" select = "BLK_ID"/>
                      </xsl:call-template>
                     </xsl:variable>
                     
                     <xsl:variable name="BV_FRM_FLD_UC">
                      <xsl:call-template name = "str:to-upper">
                        <xsl:with-param name  = "text" select = "SEL_FORM_FLD"/>
                      </xsl:call-template>
                     </xsl:variable>
                     
                     
                     <!-- <TXT_BIND_VAR><xsl:value-of select="$BV_Blk_ID_UC"/>__<xsl:value-of select="$BV_FRM_FLD_UC"/></TXT_BIND_VAR> -->
                     <!-- <TXT_BIND_VAR><xsl:value-of select="$dbcol"/></TXT_BIND_VAR> -->
                     <TXT_BIND_VAR><xsl:value-of select="FORM_FLD"/></TXT_BIND_VAR>
                     <TXT_DATA_TYPE><xsl:value-of select="DATA_TYPE"/></TXT_DATA_TYPE>
              </BLOCK_FIELDS_LOV_BINDVARS>
       </xsl:template>
       <!-- Handler for Amount -->
       <xsl:template match="FIELD" mode="Amount">
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
              <BLOCK_FIELDS_AMOUNT ID="{position()}">
              
                     <FLD_MIN_VAL><xsl:value-of select="./MIN_VAL"/></FLD_MIN_VAL>
                     <FLD_MAX_VAL><xsl:value-of select="./MAX_VAL"/></FLD_MAX_VAL>
                     <FLD_ALIGN><xsl:value-of select="./ALIGN"/></FLD_ALIGN>
                     <FLD_FORMAT><xsl:value-of select="./FORMAT"/></FLD_FORMAT>
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
              </BLOCK_FIELDS_AMOUNT>
       </xsl:template>
       <!-- Handler for CheckBox Box -->
       <xsl:template match="FIELD" mode="Checkbox">
              <BLOCK_FIELDS_CHECKBOX ID="{position()}">
                     <FLD_CHK_VAL><xsl:value-of select="CHKVAL"/></FLD_CHK_VAL>
                     <FLD_UNCHK_VAL><xsl:value-of select="UNCHKVAL"/></FLD_UNCHK_VAL>
                     <FLD_DEF_CHKD><xsl:value-of select="DEFCHK"/></FLD_DEF_CHKD>
              </BLOCK_FIELDS_CHECKBOX>
       </xsl:template>
       
       <xsl:template match = "FIELD" mode="FieldSet">
              <xsl:param name="TabPage" select="."/>              
              <xsl:param name="Blk_Id" select="."/>
              
              <xsl:variable name="FldType" select="TYPE"/>
              <xsl:variable name="FldName" select="NAME"/>
       
             <FLDSET_FIELDS ID = "{position()}">
                  <FSFLD_SNO><xsl:value-of select = "position()"/></FSFLD_SNO>
                  <FSFLD_NAME><xsl:value-of select = "NAME"/></FSFLD_NAME>
                  <FSFLD_ORDER><xsl:value-of select = "position()"/></FSFLD_ORDER>
                  <FIELDSET_NAME><xsl:value-of select = "../NAME"/></FIELDSET_NAME>
                  <FLD_TYPE><xsl:value-of select = "TYPE"/></FLD_TYPE>                  
                     <DATATYPE><xsl:value-of select="DTYPE"/></DATATYPE>
                     <DBT>
                       <xsl:call-template name = "str:to-lower">
                        <xsl:with-param name = "text" select = "DBT"/>
                       </xsl:call-template>
                     </DBT>
                     
                     <DBC><!-- <xsl:value-of select="DBC"/> -->
                        <xsl:call-template name = "str:to-lower">
                            <xsl:with-param name = "text" select = "DBC"/>
                        </xsl:call-template>                     
                     </DBC> 
                     <DLENGTH><xsl:value-of select="MAXLENGTH"/></DLENGTH>                    
                     
                  
                  <xsl:apply-templates select = "." mode = "TypesHandler">
                      <xsl:with-param name="TabPage" select="$TabPage"/>              
                      <xsl:with-param name="Blk_Id" select="$Blk_Id"/>
                  
                  </xsl:apply-templates> 
             </FLDSET_FIELDS>
       </xsl:template>
       
       <xsl:template match = "FIELD" mode = "TypesHandler">
              <xsl:param name="TabPage" select="."/>              
              <xsl:param name="Blk_Id" select="."/>
       
              <xsl:variable name="FldType" select="TYPE"/>
              <xsl:variable name="FldName" select="NAME"/>
       
                     <xsl:if test="$FldType ='SELECT'">
                            <xsl:apply-templates select="OPTION" mode = "FS">
                            </xsl:apply-templates>
                     </xsl:if>                     
                     <xsl:if test="$FldType ='LOV'">                           
                            <xsl:apply-templates select="//LOV[@BLOCK_ID =$Blk_Id]/FIELD[@NAME = $FldName]"
                                                 mode="Lov_FS">
                                   <xsl:with-param name="dbt" select="DBT"/>
                                   <xsl:with-param name="dbc" select="DBC"/>
                            </xsl:apply-templates>
                     </xsl:if>
                     <xsl:if test="$FldType ='AMOUNT'">
                            <xsl:apply-templates select="." mode="Amount_FS">
                            </xsl:apply-templates>
                     </xsl:if>
                     <xsl:if test="$FldType ='CHECK'">
                            <xsl:apply-templates select="." mode="Checkbox_FS">
                            </xsl:apply-templates>
                     </xsl:if>
                     <xsl:if test="$FldType ='RADIO'">
                            <xsl:apply-templates select="OPTION" mode = "FSRADIO">
                            </xsl:apply-templates>
                     </xsl:if>                     
        
       </xsl:template>
       
       <xsl:template match="SCREEN" mode="FieldsOrder">
              <UIGENSCR_FIELDSPOS ID="{position()}" TYPE="MULTIPLE">
                     <xsl:variable name="ScrType" select="@SCREEN_TYPE"/>
                     <xsl:variable name="idx" select="position()"/>
                     <xsl:variable name="ScreenName" select="@NAME"/>
                     <TXT_SNO><xsl:value-of select="position()"/></TXT_SNO>
                     <TXT_SCREEN_ID><xsl:value-of select="@NAME"/></TXT_SCREEN_ID>
                     <TXT_SCRTYPE>
                            <xsl:if test="$ScrType = 'M'">Main Screen</xsl:if>
                            <xsl:if test="$ScrType = 'S'">Sub Screen</xsl:if>
                     </TXT_SCRTYPE>
                     <TXT_TITLE></TXT_TITLE>
                     <!--
                     <xsl:apply-templates select="HEADER/PAGE" mode="FieldsOrder"/>
                     <xsl:apply-templates select="TAB/PAGE" mode="FieldsOrder">
                            <xsl:with-param name="HeaderCnt" select="count(HEADER/PAGE)"/>
                     </xsl:apply-templates>
                     <xsl:call-template name="All_FieldsOrder">
                        <xsl:with-param name="tabCount" select="count(HEADER/PAGE)+count(TAB/PAGE)"/>
                        <xsl:with-param name="scrName" select="$ScreenName"/>
                     </xsl:call-template>
                     -->
              </UIGENSCR_FIELDSPOS>
       </xsl:template>
       <!-- handler for Fields Order tabpages 
       <xsl:template match="HEADER/PAGE" mode="FieldsOrder">
              <xsl:variable name="scrName" select="../../@NAME"/>
              <xsl:variable name="PageID" select="@ID"/>
              <FIELDSPOS_TABPAGES ID="{position()}" Type="MULTIPLE">
                     <TXT_SNO_TAB><xsl:value-of select="position()"/></TXT_SNO_TAB>
                     <TXT_PAGE_ID><xsl:value-of select="@ID"/></TXT_PAGE_ID>
                     <TXT_LABLE></TXT_LABLE>
                     <TXTLOA_IS_HDR>Header</TXTLOA_IS_HDR>                     
              </FIELDSPOS_TABPAGES>
       </xsl:template>-->
       <!-- handler for Fields Order tabpages 
       <xsl:template match="TAB/PAGE" mode="FieldsOrder">
              <xsl:param name="HeaderCnt" select="."/>
              <xsl:variable name="scrName" select="../../@NAME"/>
              <xsl:variable name="PageID" select="@ID"/>              
              <FIELDSPOS_TABPAGES ID="{$HeaderCnt+position()}" Type="MULTIPLE">              
                     <TXT_SNO_TAB><xsl:value-of select="$HeaderCnt+position()"/></TXT_SNO_TAB>
                     <TXT_PAGE_ID><xsl:value-of select="@ID"/></TXT_PAGE_ID>
                     <TXT_LABLE></TXT_LABLE>
                     <TXTLOA_IS_HDR>Tab</TXTLOA_IS_HDR>                    
              </FIELDSPOS_TABPAGES>
       </xsl:template>
       
       <xsl:template name="All_FieldsOrder">
          <xsl:param name="tabCount" select="."/>
          <xsl:param name="scrName" select="."/>          
          <xsl:if test="count(//BLOCK[@SCREEN = $scrName and @TYPE = 'Single Entry']/FIELD[@TABPAGE = 'All']) &gt; 0 or count(//BLOCK[@SCREEN = $scrName and @TABPAGE = 'All' and @TYPE = 'Multiple Entry']) &gt; 0">              
              <FIELDSPOS_TABPAGES ID="{$tabCount +1}" Type="MULTIPLE">              
                     <TXT_SNO_TAB><xsl:value-of select="$tabCount +1"/></TXT_SNO_TAB>
                     <TXT_PAGE_ID>All</TXT_PAGE_ID>
                     <TXT_LABLE>All</TXT_LABLE>
                     <TXTLOA_IS_HDR>All</TXTLOA_IS_HDR>
              </FIELDSPOS_TABPAGES>
          </xsl:if>
       </xsl:template>
       -->
       <xsl:template match="SCREEN" mode="Buttons">
              <UIGENSCR_STANDARDBUTTON ID="{position()}" Type="MULTIPLE">
                     <SEQUENCE_NO><xsl:value-of select="position()"/></SEQUENCE_NO>
                     <SCREEN_NAME><xsl:value-of select="@NAME"/></SCREEN_NAME>
<!-- sundar Feb 19 StdBtns are not supposed to be common Blks 
                     <xsl:variable name = "sdtBtnsComn" select = "//BLOCK[ID ='BLK_STDBUTTONS']/LINK_FILE"/>
                      <xsl:if test = "$sdtBtnsComn != ''">                     
                         <STDBUTTONS_SE ID = "1" Type = "SINGLE">
                          <CHK_COMMON_STD_BTNS>Y</CHK_COMMON_STD_BTNS>
                         </STDBUTTONS_SE>
                       </xsl:if>   
                      <xsl:if test = "$sdtBtnsComn = ''">                     
                         <STDBUTTONS_SE ID = "1" Type = "SINGLE">
                          <CHK_COMMON_STD_BTNS>N</CHK_COMMON_STD_BTNS>
                         </STDBUTTONS_SE>
                       </xsl:if>   -->
                       
                     
                     
                     <!-- Standard Buttons with out Images -->
                     <xsl:apply-templates select="//BLOCK[ID ='BLK_STDBUTTONS']/FIELD[@INCLUDE = 'Y']"
                                          mode="StdButton_No_Images"/>
                     <!-- Standard Buttons with  Images -->
                     <xsl:apply-templates select="//BLOCK[ID ='BLK_STDBUTTONS_IMG']/FIELD[@INCLUDE = 'Y']"
                                          mode="StdButton_With_Images">
                            <xsl:with-param name="stdCount" select="count(//BLOCK[ID ='BLK_STDBUTTONS']/FIELD[@INCLUDE = 'Y'])"/>
                     </xsl:apply-templates>
                     <!-- Custom Buttons -->
                     <xsl:apply-templates select="//BLOCK[ID ='BLK_CST_BUTTONS']/FIELD"
                                          mode="CustomButtons"/>
              </UIGENSCR_STANDARDBUTTON>
       </xsl:template>
       <!-- handler for Std Butns without images -->
       <xsl:template match="FIELD" mode="StdButton_No_Images">
              <STDBUTTONS ID="{position()}" Type="MULTIPLE">
                     <SEQUENCE_NO><xsl:value-of select="position()"/></SEQUENCE_NO>
                     <BUTTONNAME><!-- <xsl:value-of select="NAME"/> --> 
                        <xsl:call-template name = "str:to-upper">
                          <xsl:with-param name = "text" select = "NAME"/>
                        </xsl:call-template>
                     </BUTTONNAME>
                     <FUNCTION_NAME><xsl:value-of select="EVENT/FUNCTION"/></FUNCTION_NAME>
                     <TXT_LABEL></TXT_LABEL>
                     <IMG_REQD>N</IMG_REQD>
                     <IMAGE></IMAGE>
                     <TXT_STDBTNID_HID></TXT_STDBTNID_HID>
              </STDBUTTONS>
       </xsl:template>
       <!-- handler for Std Butns WITH images -->
       <xsl:template match="FIELD" mode="StdButton_With_Images">
              <xsl:param name="stdCount" select="."/>
              <xsl:variable name="pos" select="position()"/>
              <xsl:variable name="order" select="$stdCount + $pos"/>
              <STDBUTTONS ID="{$order}" Type="MULTIPLE">
                     <SEQUENCE_NO><xsl:value-of select="$order"/></SEQUENCE_NO>
                     <BUTTONNAME><!-- <xsl:value-of select="NAME"/> -->
                        <xsl:call-template name = "str:to-upper">
                          <xsl:with-param name = "text" select = "NAME"/>
                        </xsl:call-template>                     
                     </BUTTONNAME>
                     <FUNCTION_NAME><xsl:value-of select="EVENT/FUNCTION"/></FUNCTION_NAME>
                     <IMG_REQD>Y</IMG_REQD>
                     <IMAGE><xsl:value-of select="SRC"/></IMAGE>
              </STDBUTTONS>
       </xsl:template>
       <!-- handler for Custom Buttons -->
       <xsl:template match="FIELD" mode="CustomButtons">
              <CSTBUTTONS ID="{position()}" Type="MULTIPLE">
                     <xsl:variable name="srcCount" select="count(SRC)"/>
                     <SEQUENCE_NO><xsl:value-of select="position()"/></SEQUENCE_NO>
                     <TAB_PAGE><xsl:value-of select="@TABPAGE"/></TAB_PAGE>
                     <BUTTON_NAME><!-- <xsl:value-of select="NAME"/> -->
                        <xsl:call-template name = "str:to-upper">
                          <xsl:with-param name = "text" select = "NAME"/>
                        </xsl:call-template>                     
                     </BUTTON_NAME>
                     <FUNCTION_NAME><xsl:value-of select="EVENT/FUNCTION"/></FUNCTION_NAME>
                     <xsl:variable name="imgReqd">
                            <xsl:if test="$srcCount = 0">N</xsl:if>
                            <xsl:if test="$srcCount &gt; 0">Y</xsl:if>
                     </xsl:variable>
                     <TXT_LABEL></TXT_LABEL>
                     <IMAGE_REQD><xsl:value-of select="$imgReqd"/></IMAGE_REQD>
                     <IMAGE><xsl:value-of select="SRC"/></IMAGE>
                     <POSITION><xsl:value-of select="VALIGN"/></POSITION>
                     <ALIGNMENT><xsl:value-of select="HALIGN"/></ALIGNMENT>
                     <TXT_CUSTBTNID_HID></TXT_CUSTBTNID_HID>
              </CSTBUTTONS>
       </xsl:template>
       
       <!-- handler for Access keys-->
       <xsl:template match="SCREEN" mode="AccessKeys">
          <xsl:variable name="scrId" select="@NAME"/>
          <ACCESSKEYS ID="{position()}" Type="MULTIPLE">
            <TXT_AK_SNO><xsl:value-of select="position()"/></TXT_AK_SNO>
            <TXT_AK_SCREEN><xsl:value-of select="@NAME"/></TXT_AK_SCREEN>
            <xsl:call-template name="AccessKeys">            
                <xsl:with-param name="scrId" select="$scrId"/>                                
            </xsl:call-template>
          </ACCESSKEYS>
       </xsl:template>
       
       <xsl:template name="AccessKeys">
            <xsl:param name="scrId" select="."/>
            <xsl:apply-templates select="//SCREEN[@NAME = $scrId]/*/PAGE" mode="AccessKeys"/>                            
            <xsl:apply-templates select="//BLOCK[@SCREEN = $scrId]/FIELD[TYPE='BUTTON' and (SRC = '' or count(SRC) = 0)]" mode="AccessKeys">                            
                <xsl:with-param name="tabCount" select="count(//SCREEN[@NAME = $scrId]/*/PAGE)"/>
            </xsl:apply-templates>
       </xsl:template>
       
       <xsl:template match="PAGE" mode="AccessKeys">          
          <BUTTONS_ACCESSKEYS ID="{position()}" Type="MULTIPLE">
              <TXT_BUTTON_AK_SNO><xsl:value-of select="position()"/></TXT_BUTTON_AK_SNO>
              <TXT_BUTTON_ID> <xsl:value-of select="@ID"/></TXT_BUTTON_ID>
              <TXT_BUTTON_TYPE>Tab</TXT_BUTTON_TYPE>
              <TXT_BTN_LABEL></TXT_BTN_LABEL>
              <TXT_ACCESSKEY></TXT_ACCESSKEY>
          </BUTTONS_ACCESSKEYS>
       </xsl:template>
       
       <xsl:template match="FIELD" mode="AccessKeys">          
          <xsl:param name="tabCount" select="."/>
          <BUTTONS_ACCESSKEYS ID="{position()+$tabCount}" Type="MULTIPLE">
              <TXT_BUTTON_AK_SNO><xsl:value-of select="position()+$tabCount"/></TXT_BUTTON_AK_SNO>
              <TXT_BUTTON_ID><!-- <xsl:value-of select="NAME"/> -->
              <xsl:call-template name = "str:to-upper">
                <xsl:with-param name  = "text" select = "NAME"/>
              </xsl:call-template>
              </TXT_BUTTON_ID>
              <TXT_BUTTON_TYPE>Button</TXT_BUTTON_TYPE>
              <TXT_BTN_LABEL></TXT_BTN_LABEL>
              <TXT_ACCESSKEY></TXT_ACCESSKEY>
          </BUTTONS_ACCESSKEYS>
       </xsl:template>
       
       
       <!-- Select handler -->
       <xsl:template match="OPTION" mode = "FS">
              <BLOCK_FIELDS_SELECT_1 ID="{position()}" TYPE="MULTIPLE">
              
                     <TXT_SNO><xsl:value-of select="position()"/></TXT_SNO>
                     <OPTN_VALUE><xsl:value-of select="@VALUE"/></OPTN_VALUE>
                     <OPTN_LABEL><xsl:value-of select="@VALUE"/></OPTN_LABEL>
                     <xsl:variable name="TempVar" select="@VALUE"/>
                     <OPTN_LBL_ID>
                            <xsl:call-template name="str:to-lower">
                                   <xsl:with-param name="text">
                                          <xsl:value-of select="concat('LBL__',$TempVar)"/>
                                   </xsl:with-param>
                            </xsl:call-template>
                     </OPTN_LBL_ID>
                     
                     <xsl:if test="@SELECTED =-1">
                            <DEFAULT>Y</DEFAULT>
                     </xsl:if>
                     <TXT_SELID_HID></TXT_SELID_HID>
<!--                     <xsl:if test="count(@SELECTED) = 0">
                            <DEFAULT>N</DEFAULT>
                     </xsl:if>  -->
                     
              </BLOCK_FIELDS_SELECT_1>
       </xsl:template>

       <!-- Radio handler -->
       <xsl:template match="OPTION" mode = "FSRADIO">
              <BLOCK_FIELDS_RADIO_1 ID="{position()}" TYPE="MULTIPLE">
                     <TXT_SNO><xsl:value-of select="position()"/></TXT_SNO>
                     <OPTN_VALUE><xsl:value-of select="@VALUE"/></OPTN_VALUE>
                     <OPTN_LABEL><xsl:value-of select="@VALUE"/></OPTN_LABEL>
                     <xsl:variable name="TempVar" select="@VALUE"/>
                     <OPTN_LBL_ID>
                            <xsl:call-template name="str:to-lower">
                                   <xsl:with-param name="text">
                                          <xsl:value-of select="concat('LBL__',$TempVar)"/>
                                   </xsl:with-param>
                            </xsl:call-template>
                     </OPTN_LBL_ID>
                     <xsl:if test="@SELECTED =-1">
                            <DEFAULT>Y</DEFAULT>
                     </xsl:if>
                     <TXT_RADIOID_HID></TXT_RADIOID_HID>
<!--                     <xsl:if test="count(@SELECTED) = 0">
                            <DEFAULT>N</DEFAULT>
                     </xsl:if>  -->
              </BLOCK_FIELDS_RADIO_1>
       </xsl:template>

       <!-- Lov handler -->
       <!-- <xsl:template match = "LOV_DETTAILS">  -->
       <xsl:template match="FIELD" mode="Lov_FS">
              <!--
              <xsl:variable name = "dbt" select = "DBT"/>
              <xsl:variable name = "dbc" select = "DBC"/>
              -->
              <xsl:param name="dbt" select="."/>
              <xsl:param name="dbc" select="."/>
              
              <!-- <xsl:variable name="BlockId" select="../@BLOCK_ID"/> -->
              <xsl:variable name="BlockId">
                <xsl:call-template name = "str:to-upper">
                  <xsl:with-param name = "text" select = "../@BLOCK_ID"/>
                </xsl:call-template>
              </xsl:variable>
              
              <!-- <xsl:variable name="FldName" select="@NAME"/> -->
               <xsl:variable name="FldName">
                <xsl:call-template name = "str:to-upper">
                  <xsl:with-param name = "text" select = "@NAME"/>
                </xsl:call-template>
               </xsl:variable>
               
              
              <xsl:for-each select="LOV_DETTAILS">
                     <xsl:variable name="Idx" select="position()"/>
                     <BLOCK_FIELDS_LOV_1 ID="{position()}" Type="MULTIPLE">                            
                            <TXT_SNO><xsl:value-of select="position()"/></TXT_SNO>
                            <TXT_LOV_TYPE><xsl:value-of select="@TYPE"/></TXT_LOV_TYPE>
                            <TXT_QUERY><xsl:value-of select="QUERY"/></TXT_QUERY>
                            <TXT_TITLE>
                                   <xsl:call-template name="str:replace">
                                          <xsl:with-param name="text">
                                                 <xsl:value-of select="$FldName"/>
                                          </xsl:with-param>
                                   </xsl:call-template>
                            </TXT_TITLE>
                            <SEL_QUERY_TYPE><xsl:value-of select="@QRY_TYPE"/></SEL_QUERY_TYPE>
                            <xsl:if test="$Idx =1">
                                   <CHK_LOV_TYPE_INCL>Y</CHK_LOV_TYPE_INCL>
                            </xsl:if>
                            <TXT_LOVID_HID></TXT_LOVID_HID>
                            <xsl:apply-templates select="QRY_COLS" mode = "FS">
                            </xsl:apply-templates> 
                            
                            <xsl:apply-templates select="BIND_VARS" mode = "FS">
                                   <xsl:with-param name = "dbtable" select = "$dbt"/>
                                   <xsl:with-param name = "dbcol" select = "$dbc"/>
                            </xsl:apply-templates>
                             <TXT_LOV_ID>
                                   <xsl:value-of select="concat('LOV__',$BlockId,'__',$FldName,'__',$Idx)"/>
                            </TXT_LOV_ID>
                     </BLOCK_FIELDS_LOV_1>
              </xsl:for-each>
       </xsl:template>
       <!-- Qry Cols handler -->
        <xsl:template match="QRY_COLS" mode = "FS">              
              <BLOCK_FIELDS_LOV_QRYCOLS_1 ID="{position()}" TYPE="MULTIPLE">
                     <SEQ_NO_LOV><xsl:value-of select="position()"/></SEQ_NO_LOV>
                     <TXT_QRY_COL><xsl:value-of select="QRY_COL"/></TXT_QRY_COL>
                     <TXT_COL_HEADING></TXT_COL_HEADING>
                     <TXT_RETURN_FLD> <!--  <xsl:value-of select="RETURN_FLD"/> -->
                      <!-- <xsl:call-template name = "str:to-upper">
                        <xsl:with-param name = "text" select = "RETURN_FLD"/>
                      </xsl:call-template> -->
                      <!-- <xsl:value-of select = "RETURN_FLD"/> -->
                      <xsl:value-of select = "FORM_FLD"/>
                     </TXT_RETURN_FLD>
                      <TXT_REDUCTION_FLD>
                           <xsl:if test="SEL_REDUCTION_FLD = 'Yes'">Y</xsl:if>
                           <xsl:if test="SEL_REDUCTION_FLD = 'No'">N</xsl:if>
                     </TXT_REDUCTION_FLD>
                     <TXT_REDUCTION_FLD_LBL></TXT_REDUCTION_FLD_LBL>
                     <TXT_QRYCOLID_HID></TXT_QRYCOLID_HID>
              </BLOCK_FIELDS_LOV_QRYCOLS_1>              
       </xsl:template>
       
       <xsl:template match="BIND_VARS" mode= "FS" >
              <xsl:param name = "dbtable" select = "."/>
              <xsl:param name = "dbcol" select = "."/>
              <BLOCK_FIELDS_LOV_BINDVARS_1 ID="{position()}" TYPE="MULTIPLE">
                     <SEQ_NO_LOV><xsl:value-of select="position()"/></SEQ_NO_LOV>
                     
                     <xsl:variable name="BV_Blk_ID_UC">
                      <xsl:call-template name = "str:to-upper">
                        <xsl:with-param name  = "text" select = "BLK_ID"/>
                      </xsl:call-template>
                     </xsl:variable>
                     
                     <xsl:variable name="BV_FRM_FLD_UC">
                      <xsl:call-template name = "str:to-upper">
                        <xsl:with-param name  = "text" select = "SEL_FORM_FLD"/>
                      </xsl:call-template>
                     </xsl:variable>
                     
                     
                     <!-- <TXT_BIND_VAR><xsl:value-of select="$BV_Blk_ID_UC"/>__<xsl:value-of select="$BV_FRM_FLD_UC"/></TXT_BIND_VAR> -->
                     <!-- <TXT_BIND_VAR><xsl:value-of select="$dbcol"/></TXT_BIND_VAR> -->
                     <TXT_BIND_VAR><xsl:value-of select="FORM_FLD"/></TXT_BIND_VAR>
                     <TXT_DATA_TYPE><xsl:value-of select="DATA_TYPE"/></TXT_DATA_TYPE>
              </BLOCK_FIELDS_LOV_BINDVARS_1>
       </xsl:template>
       <!-- Handler for Amount -->
       <xsl:template match="FIELD" mode="Amount_FS">
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
              <BLOCK_FIELDS_AMOUNT_1 ID="{position()}">
              
                     <FLD_MIN_VAL><xsl:value-of select="./MIN_VAL"/></FLD_MIN_VAL>
                     <FLD_MAX_VAL><xsl:value-of select="./MAX_VAL"/></FLD_MAX_VAL>
                     <FLD_ALIGN><xsl:value-of select="./ALIGN"/></FLD_ALIGN>
                     <FLD_FORMAT><xsl:value-of select="./FORMAT"/></FLD_FORMAT>
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
              </BLOCK_FIELDS_AMOUNT_1>
       </xsl:template>
       <!-- Handler for CheckBox Box -->
       <xsl:template match="FIELD" mode="Checkbox_FS">
              <BLOCK_FIELDS_CHECKBOX_1 ID="{position()}">
                     <FLD_CHK_VAL><xsl:value-of select="CHKVAL"/></FLD_CHK_VAL>
                     <FLD_UNCHK_VAL><xsl:value-of select="UNCHKVAL"/></FLD_UNCHK_VAL>
                     <FLD_DEF_CHKD><xsl:value-of select="DEFCHK"/></FLD_DEF_CHKD>
              </BLOCK_FIELDS_CHECKBOX_1>
       </xsl:template>
       
       
       <xsl:template name="str:subst">
              <xsl:param name="text"/>
              <xsl:param name="replace"/>
              <xsl:param name="with"/>
              <xsl:param name="disable-output-escaping">no</xsl:param>
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
              <xsl:value-of select="translate($text, $lcletters , $ucletters)"/>
       </xsl:template>
       
       <!-- handler to replace undescore characters -->
       <xsl:template name="str:replace">
              <xsl:param name="text"/>
              <xsl:variable name="lcletters">abcdefghijklmnopqrstuvwxyz </xsl:variable>
              <xsl:variable name="ucletters">ABCDEFGHIJKLMNOPQRSTUVWXYZ_</xsl:variable>
              <xsl:value-of select="translate($text, $ucletters, $lcletters)"/>
       </xsl:template>
</xsl:stylesheet>
