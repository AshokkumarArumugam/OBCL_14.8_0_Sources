<?xml version ="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:str="http://www.w3.org/1999/XSL/Transform">
       <xsl:template match = "/FORM">
              <UILOADSCR_MAIN ID = "{position()}" TYPE = "SINGLE">
                     <TXT_FUNCTIONID></TXT_FUNCTIONID>
                     <TXT_FUNCTIONDESC><xsl:value-of select = "@TITLE"/></TXT_FUNCTIONDESC>
                     <TXT_MODULE_CODE><xsl:value-of select = "@MASTER"/></TXT_MODULE_CODE>
                     <TXT_UI_TYPE><xsl:value-of select="BLOCK[@SCREEN = 'CVS_MAIN' and @TYPE='Audit Entry']/TYPE"/></TXT_UI_TYPE>
                     <xsl:apply-templates select = "SCREEN"/> 
                     
                     <xsl:for-each select = "SCREEN">
                            <xsl:variable name = "scrPosition" select = "@POSITION"/>
                            <xsl:variable name= "scrId" select="@NAME"/>
                            <xsl:apply-templates select = "//BLOCK[@SCREEN = $scrId and ID != 'BLK_STD_BUTTONS'  and ID != 'BLK_STD_BUTTONS_IMG' and ID != 'BLK_CST_BUTTONS' and ID != 'BLK_CST_BUTTONS_IMG'  and ID != 'BLK_AUDIT' and ID != 'BLK_BLOCK_BUTTONS' and @TYPE != 'Audit Entry' ]" mode = "others"/>
                            <xsl:apply-templates select = "//EMBED_BLOCK"/>
                            <UILOADSCR_FIELDSPOS ID = "{position()}" TYPE = "MULTIPLE">
                                   <TXT_SNO><xsl:value-of select = "position()"/></TXT_SNO>
                                   <TXT_SCREEN_ID><xsl:value-of select = "@NAME"/></TXT_SCREEN_ID>
                                   <TXT_SCRTYPE>                                         
                                          <!--<xsl:value-of select = "@TYPE"/> !-->
                                          <xsl:if test = "@NAME = 'CVS_MAIN'">
                                                 <xsl:text>Main Screen</xsl:text>
                                          </xsl:if>
                                          <xsl:if test = "@NAME != 'CVS_MAIN'">
                                                 <xsl:text>Sub Screen</xsl:text>
                                          </xsl:if>
                                   </TXT_SCRTYPE>
                                   <TXT_TITLE><xsl:value-of select = "@TITLE"/></TXT_TITLE>
                                   <xsl:if test = "count(HEADER/PAGE) &gt; 0">
                                           <xsl:for-each select = "HEADER/PAGE">
                                                 <FIELDSPOS_TABPAGES ID = "{position()}" TYPE = "MULTIPLE">
                                                        <TXT_SNO_TAB><xsl:value-of select = "position()"/></TXT_SNO_TAB>
                                                        <TXT_PAGE_ID><xsl:value-of select = "@ID"/></TXT_PAGE_ID>
                                                        <TXT_LABLE></TXT_LABLE>
                                                        <TXTLOA_IS_HDR>Header</TXTLOA_IS_HDR>
                                                      
                                                        <xsl:apply-templates select = "//BLOCK[@SCREEN = $scrId and @TYPE = 'Single Entry' and ID != 'BLK_STD_BUTTONS' and ID != 'BLK_STD_BUTTONS_IMG' and ID != 'BLK_CST_BUTTONS' and ID !='BLK_CST_BUTTONS_IMG']" mode = "fieldpos_SE"> 
                                                               <xsl:with-param name="pageId" select="@ID"/>
                                                               <xsl:with-param name="scrPos" select="$scrPosition"/>                                
                                                        </xsl:apply-templates>
                                                        
                                                        <xsl:apply-templates select = "//BLOCK[@SCREEN = $scrId and @TYPE = 'Multiple Entry' and ID != 'BLK_STD_BUTTONS'  and ID != 'BLK_STD_BUTTONS_IMG' and  ID != 'BLK_CST_BUTTONS' and ID !='BLK_CST_BUTTONS_IMG']" mode = "fieldpos_ME"> 
                                                               <xsl:with-param name="pageId" select="@ID"/>
                                                               <xsl:with-param name="scrPos" select="$scrPosition"/>
                                                        </xsl:apply-templates>
                                                 </FIELDSPOS_TABPAGES>
                                           </xsl:for-each>
                                   </xsl:if>
                                   <xsl:variable name="hCount" select="count(HEADER/PAGE)"/>
                                   <xsl:if test = "count(TAB/PAGE) &gt; 0">
                                           <xsl:for-each select = "TAB/PAGE">
                                                 <FIELDSPOS_TABPAGES ID = "{position()+ $hCount} " TYPE = "MULTIPLE">
                                                        <TXT_SNO_TAB><xsl:value-of select = "position() + $hCount"/></TXT_SNO_TAB>
                                                        <TXT_PAGE_ID><xsl:value-of select = "@ID"/></TXT_PAGE_ID>
                                                        <TXT_LABLE><xsl:value-of select = "LABEL"/></TXT_LABLE>
                                                        <TXTLOA_IS_HDR>TAB</TXTLOA_IS_HDR>
                                                        <xsl:apply-templates select = "//BLOCK[@SCREEN = $scrId and @TYPE = 'Single Entry' and ID != 'BLK_STD_BUTTONS' and ID != 'BLK_STD_BUTTONS_IMG' and ID != 'BLK_CST_BUTTONS' and ID !='BLK_CST_BUTTONS_IMG']" mode = "fieldpos_SE"> 
                                                               <xsl:with-param name="pageId" select="@ID"/>
                                                               <xsl:with-param name="scrPos" select="$scrPosition"/>
                                                        </xsl:apply-templates>
                                                        <xsl:apply-templates select = "//BLOCK[@SCREEN = $scrId and @TYPE = 'Multiple Entry' and ID != 'BLK_STD_BUTTONS'  and ID != 'BLK_STD_BUTTONS_IMG' and ID != 'BLK_CST_BUTTONS' and ID !='BLK_CST_BUTTONS_IMG']" mode = "fieldpos_ME"> 
                                                               <xsl:with-param name="pageId" select="@ID"/>
                                                               <xsl:with-param name="scrPos" select="$scrPosition"/>
                                                        </xsl:apply-templates>
                                                 </FIELDSPOS_TABPAGES>
                                           </xsl:for-each>
                                   </xsl:if>
                                   <xsl:variable name="tabCount" select="count(HEADER/PAGE)+count(TAB/PAGE)"/>                                   
                                   <FIELDSPOS_TABPAGES ID="{$tabCount + 1}" TYPE="MULTIPLE">
                                          <xsl:if test="$tabCount = 0">
                                              <xsl:attribute name="ID">                                              
                                                  <xsl:text>1</xsl:text>                                              
                                              </xsl:attribute>
                                          </xsl:if>
                                          <TXT_SNO_TAB><xsl:value-of select="$tabCount+1"/></TXT_SNO_TAB>
                                          <TXT_PAGE_ID>All</TXT_PAGE_ID>
                                          <TXT_LABLE>All</TXT_LABLE>
                                          <TXTLOA_IS_HDR>TABPAGE_ALL</TXTLOA_IS_HDR>                                          
                                          <!--<xsl:if test="$tabCount = 0">                                              -->
                                              <xsl:apply-templates select = "//BLOCK[@SCREEN = $scrId and @TYPE = 'Single Entry' and ID != 'BLK_STD_BUTTONS' and ID != 'BLK_STD_BUTTONS_IMG']" mode = "fieldpos_SE"> 
                                                  <xsl:with-param name="pageId">
                                                    <xsl:text>All</xsl:text>
                                                  </xsl:with-param>
                                                  <xsl:with-param name="scrPos" select="$scrPosition"/>
                                              </xsl:apply-templates>
                                              <xsl:apply-templates select = "//BLOCK[@SCREEN = $scrId and @TYPE = 'Multiple Entry' and ID != 'BLK_STD_BUTTONS'  and ID != 'BLK_STD_BUTTONS_IMG']" mode = "fieldpos_ME"> 
                                                     <xsl:with-param name="pageId">
                                                    <xsl:text>All</xsl:text>
                                                  </xsl:with-param>
                                                     <xsl:with-param name="scrPos" select="$scrPosition"/>
                                              </xsl:apply-templates>
                                          <!--</xsl:if>-->
                                   </FIELDSPOS_TABPAGES>
                            </UILOADSCR_FIELDSPOS>
                     </xsl:for-each>
                     <xsl:for-each  select = "SCREEN">
                            <xsl:variable name = "screenId" select = "@NAME"/>
                            <UILOADSCR_STANDARDBUTTON ID = "{position()}" TYPE = "MULTIPLE">
                                   <SEQUENCE_NO><xsl:value-of select = "position()"/></SEQUENCE_NO>
                                   <SCREEN_NAME><xsl:value-of select = "$screenId"/></SCREEN_NAME>
                                   <xsl:apply-templates select = "//BLOCK[@SCREEN = $screenId and (ID = 'BLK_STD_BUTTONS' or ID='BLK_STD_BUTTONS_IMG' or ID = 'BLK_BLOCK_BUTTONS')]" mode = "stdbuttons"/>
                                   <xsl:apply-templates select = "//BLOCK[@SCREEN = $screenId and ID = 'BLK_CST_BUTTONS']" mode = "custbuttons"/>
                                   <!--<xsl:apply-templates select = "//BLOCK[ID = 'BLK_STD_BUTTONS_IMG']" mode = "stdbuttonsImg"/>-->
                            </UILOADSCR_STANDARDBUTTON>
                     </xsl:for-each>
                     <!-- <xsl:apply-templates select = "BLOCK[ID != 'BLK_STD_BUTTONS'  and ID != 'BLK_CUST_BUTTONS']/FIELD"  mode = "fieldPos"/> -->
                     <!--Call Access Keys Handler......Hitesh Added -->
                     <xsl:apply-templates select="SCREEN" mode="AccessKeys"/>
                     
              </UILOADSCR_MAIN>
       </xsl:template>
       
       <xsl:template match = "SCREEN">
              <UILOADSCR_SCREENS ID = "{position()}" TYPE = "MULTIPLE">
                     <TXT_SNO><xsl:value-of select = "position()"/></TXT_SNO>
                     <TXT_SCREEN_ID><xsl:value-of select = "@NAME"/></TXT_SCREEN_ID>
                     <TXT_SCRTYPE>
                            <!--<xsl:value-of select = "@TYPE"/> !-->
                             <xsl:if test = "@NAME = 'CVS_MAIN'">
                                   <xsl:text>Main Screen</xsl:text>
                             </xsl:if>
                            <xsl:if test = "@NAME != 'CVS_MAIN'">
                                   <xsl:text>Sub Screen</xsl:text>
                             </xsl:if>
                     </TXT_SCRTYPE>
                     <TXT_SCREEN_HEIGHT><xsl:value-of select="@HEIGHT"/></TXT_SCREEN_HEIGHT>
                     <TXT_SCREEN_WIDTH><xsl:value-of select="@WIDTH"/></TXT_SCREEN_WIDTH>
                     <TXT_TITLE><xsl:value-of select = "@TITLE"/></TXT_TITLE>
                     <UI_SCREEN_POS><xsl:value-of select = "@POSITION"/></UI_SCREEN_POS>
                     <xsl:if test = "count(HEADER/PAGE) &gt; 0">
                            <xsl:for-each select = "HEADER/PAGE">
                                   <UILOADSCR_TABPAGES ID = "{position()}" TYPE = "MULTIPLE">
                                          <TXT_SNO_TAB><xsl:value-of select = "position()"/></TXT_SNO_TAB>
                                          <TXT_PAGE_ID><xsl:value-of select = "@ID"/></TXT_PAGE_ID>
                                          <TXT_LABLE><xsl:value-of select = "LABEL"/></TXT_LABLE>
                                          <TXT_IS_HDR>Header</TXT_IS_HDR>
                                          <TXT_TAB_HEIGHT><xsl:value-of select="@HEIGHT"/></TXT_TAB_HEIGHT>
                                   </UILOADSCR_TABPAGES>
                            </xsl:for-each>
                     </xsl:if>
                     <xsl:variable name="hCount" select="count(HEADER/PAGE)"/>
                     <xsl:if test = "count(TAB/PAGE) &gt; 0">
                            <xsl:for-each select = "TAB/PAGE">
                                   <UILOADSCR_TABPAGES ID = "{position()+$hCount}" TYPE = "MULTIPLE">
                                          <TXT_SNO_TAB><xsl:value-of select = "position()+$hCount"/></TXT_SNO_TAB> 
                                          <TXT_PAGE_ID><xsl:value-of select = "@ID"/></TXT_PAGE_ID> 
                                          <TXT_LABLE><xsl:value-of select = "LABEL"/></TXT_LABLE> 
                                          <TXT_IS_HDR>TAB</TXT_IS_HDR> 
                                          <TXT_TAB_HEIGHT/>
                                   </UILOADSCR_TABPAGES>
                            </xsl:for-each>
                     </xsl:if>      
                     <xsl:variable name="tCount" select="count(TAB/PAGE)"/>
                     <!--Reddy Prasad -->
                      <xsl:if test = "count(TABPAGE_ALL) &gt; 0">
                        <xsl:for-each select = "TABPAGE_ALL">
                              <UILOADSCR_TABPAGES ID = "{$hCount+$tCount+1}" TYPE = "MULTIPLE">
                                  <TXT_SNO_TAB><xsl:value-of select = "$hCount+$tCount+1"/></TXT_SNO_TAB> 
                                  <TXT_PAGE_ID>All</TXT_PAGE_ID> 
                                  <TXT_LABLE><xsl:value-of select = "LABEL"/></TXT_LABLE> 
                                  <TXT_IS_HDR>TABPAGE_ALL</TXT_IS_HDR> 
                                  <TXT_TAB_HEIGHT><xsl:value-of select="@HEIGHT"/></TXT_TAB_HEIGHT>
                              </UILOADSCR_TABPAGES>
                     </xsl:for-each>
                      </xsl:if>
                     <!--Reddy Prasad -->
                     <xsl:if test = "count(TABPAGE_ALL) = 0">
                         <UILOADSCR_TABPAGES ID = "{$hCount+$tCount+1}" TYPE = "MULTIPLE">
                              <TXT_SNO_TAB><xsl:value-of select = "$hCount+$tCount+1"/></TXT_SNO_TAB> 
                              <TXT_PAGE_ID>All</TXT_PAGE_ID> 
                              <TXT_LABLE>all</TXT_LABLE> 
                              <TXT_IS_HDR>TABPAGE_ALL</TXT_IS_HDR> 
                              <TXT_TAB_HEIGHT><xsl:value-of select="TABPAGE_ALL/@HEIGHT"/></TXT_TAB_HEIGHT>
                         </UILOADSCR_TABPAGES>
                     </xsl:if> 
                     </UILOADSCR_SCREENS>
       </xsl:template>
       <xsl:template match = "BLOCK" mode = "others">
              <!-- <xsl:variable name = "blkid"  select = "ID"/> -->
              <xsl:variable name = "blkid">
                <xsl:call-template name = "str:to-upper" >
                  <xsl:with-param name = "text" select = "ID"/>
                </xsl:call-template>                
              </xsl:variable>
              <xsl:variable name="blkNode" select="."/>
              <xsl:variable name = "screen" select = "@SCREEN"/>
              <xsl:variable name = "type"   select = "@TYPE"/>
              <xsl:variable name = "tabpage"   select = "@TABPAGE"/>
              <UILOADSCR_BLOCKS ID = "{position()}" TYPE = "MULTIPLE">
                    <TXT_SNO><xsl:value-of select = "position()"/></TXT_SNO>
                    <TXT_BLOCK_ID><xsl:value-of select = "$blkid"/></TXT_BLOCK_ID>
                    <TXT_BLK_LABEL><xsl:value-of select = "LABEL"/></TXT_BLK_LABEL>
                    <TXT_BLOCK_BLK_TYPE><xsl:value-of select = "$type"/></TXT_BLOCK_BLK_TYPE>
                    <xsl:if test = "$type = 'Multiple Entry'">
                        <TXT_HEIGHT><xsl:value-of select = "HEIGHT"/></TXT_HEIGHT>
                        <TXT_WIDTH><xsl:value-of select = "WIDTH"/></TXT_WIDTH>
                    </xsl:if>
                    <TXT_ME_TABPAGE>
                         <xsl:if test = "$type = 'Multiple Entry'">
                             <xsl:value-of select = "$tabpage"/>
                          </xsl:if>                          
                    </TXT_ME_TABPAGE>
                    <CHK_BLK></CHK_BLK>
                    <CHK_COMMON>N</CHK_COMMON>
                    <TXT_SCREEN_NAME><xsl:value-of select = "$screen"/></TXT_SCREEN_NAME>
                    <xsl:apply-templates select = "FIELD" mode = "Blockfields">
                            <xsl:with-param name="blktype" select="$type"/>
                            <xsl:with-param name="blktab" select="$tabpage"/>
                    </xsl:apply-templates>
                    <xsl:apply-templates select = "$blkNode//FIELD[TYPE != 'LABEL' and TYPE != 'FIELDSET']" mode = "BlocksAttribute"/>
                    <xsl:apply-templates select = "$blkNode//FIELD[TYPE != 'LABEL']" mode = "BlockfldLabels_SE">
                            <xsl:with-param name="blktype" select="$type"/>
                            <xsl:with-param name="scrname" select="$screen"/>
                            <xsl:with-param name="blktab" select="$tabpage"/>
                    </xsl:apply-templates>
                    <!--<xsl:if test="$type = 'Multiple Entry'">
                            <xsl:apply-templates select="FIELD" mode="MEFields">
                                   <xsl:with-param name="blkTab" select="$tabpage"/>
                                   <xsl:with-param name="scrname" select="$screen"/>
                            </xsl:apply-templates>
                    </xsl:if>
                    
                    <xsl:apply-templates select = "FIELD[TYPE = 'LABEL']" mode = "BlockfldLabels_ME">
                            <xsl:with-param name="blktype" select="$type"/>
                            <xsl:with-param name="blktab" select="$tabpage"/>
                    </xsl:apply-templates>
                     -->
              </UILOADSCR_BLOCKS>
              
       </xsl:template>
       <!-- Kals Feb 13 .. Support for Embed Block in UIXML Load--> 
                            
       <xsl:template match = "EMBED_BLOCK">
          <xsl:variable name = "No_OfBlocks" select = "count(//BLOCK[ID != 'BLK_STD_BUTTONS'  and ID != 'BLK_STD_BUTTONS_IMG' and ID != 'BLK_CST_BUTTONS' and ID != 'BLK_CST_BUTTONS_IMG'  and ID != 'BLK_AUDIT' and ID != 'BLK_BLOCK_BUTTONS' and @TYPE != 'Audit Entry' ])"/>
          <xsl:variable name = "Pos" select = "position()"/>
          <xsl:variable name = "CmnBlk_xml" select = "." />
          <xsl:variable name="Blk_id" select="substring-before($CmnBlk_xml, '.xml')"/>
          <xsl:if test="$Blk_id != 'BLK_STD_BUTTONS' and $Blk_id != 'BLK_STD_BUTTONS_IMG'">
              <UILOADSCR_BLOCKS ID = "{$No_OfBlocks + $Pos}">
                <TXT_SNO><xsl:value-of select = "$No_OfBlocks + position()"/></TXT_SNO>
                <TXT_BLOCK_ID><xsl:value-of select="$Blk_id"/></TXT_BLOCK_ID>
                <TXT_BLK_LABEL></TXT_BLK_LABEL>
                <TXT_BLOCK_BLK_TYPE></TXT_BLOCK_BLK_TYPE>
                <TXT_HEIGHT></TXT_HEIGHT>
                <TXT_WIDTH></TXT_WIDTH>
                <TXT_ME_TABPAGE> </TXT_ME_TABPAGE>
                <CHK_BLK></CHK_BLK>
                <CHK_COMMON>Y</CHK_COMMON>
                <TXT_SCREEN_NAME></TXT_SCREEN_NAME>              
              </UILOADSCR_BLOCKS>  
          </xsl:if>
       </xsl:template>
       
       <xsl:template match = "FIELD" mode = "Blockfields">
            <xsl:param name="blktype" select="."/>
            <xsl:param name="blktab" select="."/> 
            <xsl:variable name = "order" select = "position()"/>
             <BLOCK_FIELDS ID = "{position()}" TYPE = "MULTIPLE">
                   <TXT_SNO><xsl:value-of select = "$order"/></TXT_SNO>
                   <TXT_FIELD_NAME> <!-- <xsl:value-of select = "NAME"/> -->
                    <xsl:call-template name = "str:to-upper"> 
                      <xsl:with-param name = "text"  select = "NAME"/>
                    </xsl:call-template>
                   </TXT_FIELD_NAME>
                   <TXT_FIELD_ORDER><xsl:value-of select = "$order"/></TXT_FIELD_ORDER>
                   <DBT> <!-- <xsl:value-of select = "DBT"/> -->
                    <xsl:call-template name = "str:to-lower"> 
                      <xsl:with-param name = "text"  select = "DBT"/>
                    </xsl:call-template>                           
                   </DBT>
                   <DBC> 
                   <!-- <xsl:value-of select = "DBC"/> -->
                    <xsl:call-template name = "str:to-lower"> 
                      <xsl:with-param name = "text"  select = "DBC"/>
                    </xsl:call-template>                           
                   </DBC>
                   <xsl:if test = "$blktype = 'Single Entry'">
                       <SEL_TABPAGE_FIELDS><xsl:value-of select = "@TABPAGE"/></SEL_TABPAGE_FIELDS>                                                             
                      
                   </xsl:if>
                   <xsl:if test = "$blktype = 'Multiple Entry'">
                       <SEL_TABPAGE_FIELDS><xsl:value-of select = "$blktab"/></SEL_TABPAGE_FIELDS>
                   </xsl:if>                           
                   <FLD_TYPE>
                       <xsl:if test = "count(LOV) &gt; 0">
                           <xsl:text>LOV</xsl:text>
                       </xsl:if>
                       <xsl:if test = "count(LOV) = 0">
                           <xsl:value-of select = "TYPE"/>
                       </xsl:if>
                   </FLD_TYPE>
                   
                   <DATATYPE><xsl:value-of select = "DTYPE"/></DATATYPE>
                   <DLENGTH><xsl:value-of select = "MAXLENGTH"/></DLENGTH>               
                   
                   <xsl:if test = "TYPE = 'SELECT'">
                       <xsl:for-each select = "OPTION">
                           <BLOCK_FIELDS_SELECT ID = "{position()}" TYPE = "MULTIPLE">
                               <TXT_SNO><xsl:value-of select = "position()"/></TXT_SNO>
                               <OPTN_VALUE><xsl:value-of select = "@VALUE"/></OPTN_VALUE>
                               <OPTN_LABEL><xsl:value-of select = "."/></OPTN_LABEL>
                               <xsl:if test = "@SELECTED != '' and @SELECTED = '-1'">
                                  <DEFAULT><xsl:text>Y</xsl:text></DEFAULT>
                               </xsl:if>
                               <xsl:if test = "@SELECTED != '' and @SELECTED = '0'">
                                  <DEFAULT><xsl:text>N</xsl:text></DEFAULT>
                               </xsl:if>
                           </BLOCK_FIELDS_SELECT>
                       </xsl:for-each>
                   </xsl:if>
                   <xsl:if test = "TYPE = 'RADIO'">
                        <!--
                        <BLOCK_FIELDS_RADIO_SE ID="1" TYPE="SINGLE">
                            <RADIO_NAME><xsl:value-of select="NAME"/></RADIO_NAME>
                            <RADIO_FS_HEIGHT><xsl:value-of select="HEIGHT"/></RADIO_FS_HEIGHT>
                            <RADIO_FS_WIDTH><xsl:value-of select="WIDTH"/></RADIO_FS_WIDTH>
                            <RADIO_FS_COLSPN></RADIO_FS_COLSPN>
                        </BLOCK_FIELDS_RADIO_SE>-->
                       <xsl:for-each select = "OPTION">
                           <BLOCK_FIELDS_RADIO ID = "{position()}" TYPE = "MULTIPLE">
                               <TXT_SNO><xsl:value-of select = "position()"/></TXT_SNO>
                               <OPTN_VALUE><xsl:value-of select = "VALUE"/></OPTN_VALUE>
                               <OPTN_LABEL><xsl:value-of select = "LABEL"/></OPTN_LABEL>
                              <DEFAULT>
                                  <xsl:if test = "SELECTED = '-1'">
                                    <xsl:text>Y</xsl:text>
                                  </xsl:if>
                                  <xsl:if test = "SELECTED = '0'">
                                      <xsl:text>N</xsl:text>
                                  </xsl:if>
                              </DEFAULT>                             
                           </BLOCK_FIELDS_RADIO>
                       </xsl:for-each>
                   </xsl:if>                   
                   <xsl:if test = "TYPE = 'AMOUNT'">
                           <BLOCK_FIELDS_AMOUNT ID = "1">
                               <xsl:variable name="relFld" select="RELATED_FIELD"/>
                               <FLD_MIN_VAL><xsl:value-of select = "MIN_VAL"/></FLD_MIN_VAL>
                               <FLD_MAX_VAL><xsl:value-of select = "MAX_VAL"/></FLD_MAX_VAL>
                               <FLD_ALIGN><xsl:value-of select = "ALIGN"/></FLD_ALIGN>
                               <FLD_FORMAT><xsl:value-of select = "FORMAT"/></FLD_FORMAT>
                               <REL_BLOCK>
                                  <xsl:if test="$relFld != ''">
                                      <xsl:value-of select="substring-before($relFld,'__')"/>                                      
                                  </xsl:if>
                               </REL_BLOCK>
                               <REL_FIELD>
                                  <xsl:if test="$relFld != ''">
                                      <xsl:value-of select="substring-after($relFld,'__')"/>                                      
                                  </xsl:if>
                               </REL_FIELD>
                           </BLOCK_FIELDS_AMOUNT>
                   </xsl:if>
                   <xsl:if test = "TYPE = 'CHECKBOX'">
                           <BLOCK_FIELDS_CHECKBOX ID = "1">
                               <FLD_CHK_VAL><xsl:value-of select = "CUSTOM/ON"/></FLD_CHK_VAL>
                               <FLD_UNCHK_VAL><xsl:value-of select = "CUSTOM/OFF"/></FLD_UNCHK_VAL>
                               <FLD_DEF_CHKD>
                               <!-- <xsl:if test="CHECKED = '0'">
                                  <xsl:text>UnChecked</xsl:text>
                                </xsl:if>
                                <xsl:if test="CHECKED = '-1'">
                                  <xsl:text>Checked</xsl:text>
                                </xsl:if> -->
                                 <xsl:choose>
                                <xsl:when test="CHECKED = '-1'">
                                  <xsl:text>Checked</xsl:text>
                                </xsl:when>
                                <xsl:otherwise>
                                  <xsl:text>UnChecked</xsl:text>
                                </xsl:otherwise>
                              </xsl:choose>
                               </FLD_DEF_CHKD>
                           </BLOCK_FIELDS_CHECKBOX>
                   </xsl:if>
                   
                  <xsl:if test = "TYPE = 'FIELDSET'">                              
                      <xsl:apply-templates select="FIELD" mode="FieldSet"/>
                      <!--
                      <FLDSET_FIELDS_SE ID="1" TYPE="SINGLE">
                          <FIELDSET_NAME><xsl:value-of select="NAME"/></FIELDSET_NAME>
                          <FIELDSET_HEIGHT><xsl:value-of select="HEIGHT"/></FIELDSET_HEIGHT>
                          <FIELDSET_WIDTH><xsl:value-of select="WIDTH"/></FIELDSET_WIDTH>
                          <FIELDSET_COLSPN><xsl:value-of select="COLSPAN"/></FIELDSET_COLSPN>
                      </FLDSET_FIELDS_SE>
                      -->
                  </xsl:if>                  
                   <!--<xsl:for-each select = "LOV">
                            <xsl:apply-templates select = "//LOV"/>
                    </xsl:for-each>-->
             </BLOCK_FIELDS>              
      </xsl:template>
      
      <!-- handler for fieldset fields-->
      <xsl:template match="FIELD" mode="FieldSet">
          <xsl:variable name="fType" select="TYPE"/>
          <FLDSET_FIELDS ID="{position()}" TYPE="MULTIPLE">
           
            <TXT_SNO_FLD><xsl:value-of select="position()"/></TXT_SNO_FLD>
            <TXT_FIELD_NAME>
                  <xsl:call-template name = "str:to-upper"> 
                      <xsl:with-param name = "text"  select = "NAME"/>
                  </xsl:call-template>
            </TXT_FIELD_NAME>
            <TXT_FIELD_ORDER><xsl:value-of select="position()"/></TXT_FIELD_ORDER>
             <DBT> 
                     <xsl:call-template name = "str:to-lower"> 
                       <xsl:with-param name = "text"  select = "DBT"/>
                     </xsl:call-template>                           
             </DBT>
             <DBC> 
                     <xsl:call-template name = "str:to-lower"> 
                       <xsl:with-param name = "text"  select = "DBC"/>
                     </xsl:call-template>                           
             </DBC>
            <FLD_TYPE>
                <xsl:if test = "count(LOV) &gt; 0">
                     <xsl:text>LOV</xsl:text>
                 </xsl:if>
                 <xsl:if test = "count(LOV) = 0">
                     <xsl:value-of select = "TYPE"/>
                 </xsl:if>
            </FLD_TYPE>
            <DATATYPE><xsl:value-of select = "DTYPE"/></DATATYPE>
              <DLENGTH><xsl:value-of select = "MAXLENGTH"/></DLENGTH>
              <INCLUDE_FLD><xsl:value-of select = "'Y'"/></INCLUDE_FLD>
            
                 <xsl:call-template name = "TypesHandler">
                     <xsl:with-param name ="curFld" select ="."/>
                  </xsl:call-template>
                  
          </FLDSET_FIELDS>
      </xsl:template>
      
            <!-- Make another template to handle the Types. !-->      
      <xsl:template name = "TypesHandler">
          <xsl:param name = "curFld" select = "."/>
          <xsl:if test = "$curFld/TYPE = 'SELECT'">
               <xsl:for-each select = "$curFld/OPTION">
                   <BLOCK_FIELDS_SELECT_1 ID = "{position()}" TYPE = "MULTIPLE">
                       <TXT_SNO><xsl:value-of select = "position()"/></TXT_SNO>
                       <OPTN_VALUE><xsl:value-of select = "@VALUE"/></OPTN_VALUE>
                       <OPTN_LABEL><xsl:value-of select = "."/></OPTN_LABEL>
                       <xsl:if test = "@SELECTED != '' and @SELECTED = '-1'">
                          <DEFAULT><xsl:text>Y</xsl:text></DEFAULT>
                       </xsl:if>                     
                       <xsl:if test = "@SELECTED != '' and @SELECTED = '0'">
                          <DEFAULT><xsl:text>N</xsl:text></DEFAULT>
                       </xsl:if>
                   </BLOCK_FIELDS_SELECT_1>
               </xsl:for-each>
           </xsl:if>
           <xsl:if test = "$curFld/TYPE = 'RADIO'">
               <xsl:for-each select = "OPTION">
                   <BLOCK_FIELDS_RADIO_1 ID = "{position()}" TYPE = "MULTIPLE">
                       <TXT_SNO><xsl:value-of select = "position()"/></TXT_SNO>
                       <OPTN_VALUE><xsl:value-of select = "VALUE"/></OPTN_VALUE>
                       <OPTN_LABEL><xsl:value-of select = "LABEL"/></OPTN_LABEL>
                       <DEFAULT>
                            <xsl:if test = "SELECTED = '-1'">
                              <xsl:text>Y</xsl:text>
                            </xsl:if>
                            <xsl:if test = "SELECTED = '0'">
                                <xsl:text>N</xsl:text>
                            </xsl:if>
                        </DEFAULT>
                   </BLOCK_FIELDS_RADIO_1>
               </xsl:for-each>
           </xsl:if>
           
           <xsl:if test = "$curFld/TYPE = 'AMOUNT'">
                   <BLOCK_FIELDS_AMOUNT_1 ID = "1">
                       <xsl:variable name="relFld" select="RELATED_FIELD"/>                   
                       <FLD_MIN_VAL><xsl:value-of select = "$curFld/MIN_VAL"/></FLD_MIN_VAL>
                       <FLD_MAX_VAL><xsl:value-of select = "$curFld/MAX_VAL"/></FLD_MAX_VAL>
                       <FLD_ALIGN><xsl:value-of select = "$curFld/ALIGN"/></FLD_ALIGN>
                       <FLD_FORMAT><xsl:value-of select = "$curFld/FORMAT"/></FLD_FORMAT>
                       <REL_BLOCK>
                            <xsl:if test="$relFld != ''">                              
                                <xsl:value-of select="substring-before($relFld,'__')"/>                                      
                            </xsl:if>
                       </REL_BLOCK>
                       <REL_FIELD>
                            <xsl:if test="$relFld != ''">                              
                                <xsl:value-of select="substring-after($relFld,'__')"/>                                      
                            </xsl:if>
                       </REL_FIELD>
                   </BLOCK_FIELDS_AMOUNT_1>
           </xsl:if>
           <xsl:if test = "$curFld/TYPE = 'CHECKBOX'">
                   <BLOCK_FIELDS_CHECKBOX_1 ID = "1">
                       <FLD_CHK_VAL><xsl:value-of select = "$curFld/CUSTOM/ON"/></FLD_CHK_VAL>
                       <FLD_UNCHK_VAL><xsl:value-of select = "$curFld/CUSTOM/OFF"/></FLD_UNCHK_VAL>
                       <FLD_DEF_CHKD>
                         <!-- <DEFAULT> -->
                            <!--  <xsl:if test = "$curFld/CHECKED = '0'">
                                <xsl:text>UnChecked</xsl:text>
                              </xsl:if>
                              <xsl:if test = "$curFld/CHECKED = '-1'">
                                  <xsl:text>Checked</xsl:text>
                              </xsl:if> -->
                              <xsl:choose>
                                <xsl:when test="$curFld/CHECKED = '-1'">
                                  <xsl:text>Checked</xsl:text>
                                </xsl:when>
                                <xsl:otherwise>
                                  <xsl:text>UnChecked</xsl:text>
                                </xsl:otherwise>
                              </xsl:choose>
                                
                         <!-- </DEFAULT> -->
                       </FLD_DEF_CHKD>
                   </BLOCK_FIELDS_CHECKBOX_1>
           </xsl:if>

      </xsl:template>
      <!-- 
      <xsl:template match = "//LOV">              
              <BLOCK_FIELDS_LOV ID = "{position()}"  TYPE = "MULTIPLE">
                     <TXT_SNO><xsl:value-of select = "position()"/></TXT_SNO> 
                     <TXT_LOV_TYPE></TXT_LOV_TYPE> 
                     <TXT_QUERY></TXT_QUERY> 
                     <TXT_TITLE><xsl:value-of select = "TITLE"/></TXT_TITLE> 
                     <SEL_QUERY_TYPE></SEL_QUERY_TYPE> 
                     <CHK_LOV_TYPE_INCL>Y</CHK_LOV_TYPE_INCL>
                     <xsl:if test = "COL_HEADING != '' or RET_FLDS != '' or REDUCTION_FLD_LABELS != ''">
                             <xsl:apply-templates select = "//LOV/COL_HEADING"/>     
                     </xsl:if>
              </BLOCK_FIELDS_LOV> 
      </xsl:template>
      <xsl:template match = "COL_HEADING">
              
              <BLOCK_FIELDS_LOV_QRYCOLS ID = "{position()}" TYPE = "MULTIPLE">
                     <SEQ_NO_LOV><xsl:value-of select = "position()"/></SEQ_NO_LOV> 
                     <TXT_QRY_COL></TXT_QRY_COL> 
                     <TXT_COL_HEADING></TXT_COL_HEADING> 
                     <TXT_RETURN_FLD></TXT_RETURN_FLD> 
                     <TXT_REDUCTION_FLD>Y</TXT_REDUCTION_FLD> 
                     <TXT_REDUCTION_FLD_LBL></TXT_REDUCTION_FLD_LBL> 
                     
              </BLOCK_FIELDS_LOV_QRYCOLS>
      </xsl:template>
      -->
      
      <xsl:template match = "FIELD" mode = "BlocksAttribute">
              <xsl:if test = "TYPE != 'LABEL'">
                    <xsl:variable name="refFld" select="REF_FIELD"/>
                     <BLOCKS_ATTRIBUTE ID = "{position()}" TYPE = "MULTIPLE">
                           <TXT_SNO><xsl:value-of select = "position()"/></TXT_SNO>
                           <TXT_FIELD_NAME><!-- <xsl:value-of select = "NAME"/> -->
                             <xsl:call-template name = "str:to-upper">
                              <xsl:with-param name = "text" select = "NAME"/>
                             </xsl:call-template>
                           </TXT_FIELD_NAME>
                           <TXT_DEFAULT_VALUE><xsl:value-of select = "VALUE"/></TXT_DEFAULT_VALUE>
                           <xsl:if test = "REQUIRED = 0">
                               <CHK_REQ>N</CHK_REQ>
                           </xsl:if>
                           <xsl:if test = "REQUIRED = -1">
                               <CHK_REQ>Y</CHK_REQ>
                           </xsl:if>
                           <xsl:if test = "READ_ONLY = 0">
                               <CHK_RO>N</CHK_RO>
                           </xsl:if>
                           <xsl:if test = "READ_ONLY = -1">
                               <CHK_RO>Y</CHK_RO>
                           </xsl:if>
                           <xsl:if test = "HIDDEN = 0">
                               <CHK_HIDDEN>N</CHK_HIDDEN>
                           </xsl:if>
                           <xsl:if test = "HIDDEN = -1">
                               <CHK_HIDDEN>Y</CHK_HIDDEN>
                           </xsl:if>
                           <xsl:if test = "UPPERCASE = 0">
                              <CHK_UCASE>N</CHK_UCASE>
                           </xsl:if>
                           <xsl:if test = "UPPERCASE = -1">
                               <CHK_UCASE>Y</CHK_UCASE>
                           </xsl:if>
                           <CHK_REMOVE>N</CHK_REMOVE>
                           <SEL_REF_BLK>
                              <xsl:if test="$refFld != ''">
                                  <xsl:value-of select = "substring-before($refFld,'__')"/>
                              </xsl:if>
                           </SEL_REF_BLK>
                           <SEL_REF_FLD>
                              <xsl:if test="$refFld != ''">
                                  <xsl:value-of select = "substring-after($refFld,'__')"/>
                              </xsl:if>
                           </SEL_REF_FLD>
                           <!--<xsl:if test="TYPE = 'FIELDSET'">
                                <FLD_WIDTH>                              
                                    <xsl:value-of select="WIDTH"/>                              
                                </FLD_WIDTH>
                                 <FLD_HEIGHT>                                   
                                      <xsl:value-of select="HEIGHT"/>                                    
                                 </FLD_HEIGHT>
                                 <FLD_COLSPAN>                                    
                                      <xsl:value-of select="COLSPAN"/>
                                 </FLD_COLSPAN>
                          </xsl:if>-->
                          <xsl:if test="count(POPUPEDIT) &gt; 0">
                              <POPUP_EDIT_REQD>Y</POPUP_EDIT_REQD>
                          </xsl:if>
                          
                         <!--kamal-->
                           <xsl:apply-templates select = "EVENT"/>
                            
                     </BLOCKS_ATTRIBUTE>
              </xsl:if>
       </xsl:template>
       <!--kamal-->
       <xsl:template match = "EVENT">
       
       <ATTRIBUTE_EVENTS ID="{position()}" Type="MULTIPLE">
        <TXT_SNO><xsl:value-of select = "position()"/> </TXT_SNO>
        <TXT_EVENT><xsl:value-of select = "NAME"/></TXT_EVENT> 
        <TXT_FUNTION_NAME><xsl:value-of select = "FUNCTION"/></TXT_FUNTION_NAME> 
      </ATTRIBUTE_EVENTS>
        
       </xsl:template>
       
       
       <xsl:template match = "FIELD" mode = "BlockfldLabels_SE">
               <xsl:param name="blktype" select="."/>
               <xsl:param name="scrname" select="."/>
               <xsl:param name="blktab" select="."/>
               <xsl:variable name = "fldOrder" select = "position()"/>
              <BLOCK_FIELDS_LABEL ID = "{position()}" TYPE = "MULTIPLE">
                     <TXT_SNO><xsl:value-of select = "$fldOrder"/></TXT_SNO>
                     <TXT_FIELD_NAME> <!-- <xsl:value-of select = "NAME"/> -->
                               <xsl:call-template name = "str:to-upper">
                                <xsl:with-param name = "text" select = "NAME"/>
                               </xsl:call-template>                                                                     
                     </TXT_FIELD_NAME>
                     <TXT_FIELD_ORDER><xsl:value-of select = "$fldOrder"/></TXT_FIELD_ORDER>
                     <CHK_LABEL_REQUIRED>
                        <xsl:if test="count(LABEL) &gt; 0 and LABEL != ''">
                          <xsl:text>Y</xsl:text>
                        </xsl:if>
                        <xsl:if test="LABEL = ''">
                          <xsl:text>N</xsl:text>
                        </xsl:if>
                     </CHK_LABEL_REQUIRED>
                     <TXT_FIELD_LABEL><xsl:value-of select = "LABEL"/></TXT_FIELD_LABEL>
                     <!--
                     <SEL_TABPAGE_LABELS>                            
                            <xsl:variable name="tab" select = "@TABPAGE"/>                                                                                          
                            <xsl:variable name="tabNode" select="//SCREEN[@NAME = $scrname]/*/PAGE[@ID = $tab]"/>   
                                   
                            <xsl:if test="$tabNode/LABEL != ''">
                                    <xsl:value-of select="$tabNode/LABEL"/>
                            </xsl:if>                                   
                           <xsl:if test="$tabNode/LABEL = ''">                     
                           </xsl:if>                            
                     </SEL_TABPAGE_LABELS>
                     -->
                     <SEL_TABPAGE_FIELDS>
                            <xsl:if test="$blktype = 'Single Entry'">
                                   <xsl:value-of select = "@TABPAGE"/>                                   
                            </xsl:if>
                            <xsl:if test="$blktype = 'Multiple Entry'">
                                   <xsl:value-of select = "$blktab"/>                                   
                            </xsl:if>
                     </SEL_TABPAGE_FIELDS>                     
              </BLOCK_FIELDS_LABEL>
       </xsl:template>
       
       <xsl:template match="FIELD" mode="MEFields">
              <xsl:param name="blkTab" select="."/>
              <xsl:param name="scrname" select="."/>
              <BLOCK_FIELDS_LABEL ID = "{position()}" TYPE = "MULTIPLE">
                     <TXT_SNO><xsl:value-of select = "position()"/></TXT_SNO>
                      
                      <xsl:variable name = "FldName_Temp">
                        <xsl:call-template name = "str:to-upper">
                          <xsl:with-param name = "text" select = "NAME"/>
                        </xsl:call-template>
                      </xsl:variable>
                      
                     <TXT_FIELD_NAME>LBL_<xsl:value-of select = "$FldName_Temp"/></TXT_FIELD_NAME>
                     <TXT_FIELD_ORDER><xsl:value-of select = "position()"/></TXT_FIELD_ORDER>
                     <CHK_LABEL_REQUIRED></CHK_LABEL_REQUIRED>
                     <TXT_FIELD_LABEL><xsl:value-of select = "LABEL"/></TXT_FIELD_LABEL>
                     <!--
                     <SEL_TABPAGE_LABELS>                            
                            <xsl:variable name="meTabNode" select="//SCREEN[@NAME = $scrname]/*/PAGE[@ID = $blkTab]"/>   
                                   
                            <xsl:if test="$meTabNode/LABEL != ''">
                                <xsl:value-of select="$meTabNode/LABEL"/>
                            </xsl:if>                                   
                            <xsl:if test="$meTabNode/LABEL = ''">                         
                            </xsl:if>
                     </SEL_TABPAGE_LABELS>
                     -->
                     <SEL_TABPAGE_FIELDS>
                                   <xsl:value-of select = "$blkTab"/>
                     </SEL_TABPAGE_FIELDS>
              </BLOCK_FIELDS_LABEL>
       </xsl:template>
       <!--
       <xsl:template match = "FIELD" mode = "BlockfldLabels_ME">
               <xsl:param name="blktype" select="."/>
              <xsl:param name="blktab" select="."/>
               <xsl:variable name = "fldOrder" select = "position()"/>
              <BLOCK_FIELDS_LABEL ID = "{position()}" TYPE = "MULTIPLE">
                     <TXT_SNO><xsl:value-of select = "$fldOrder"/></TXT_SNO>
                     <TXT_FIELD_NAME><xsl:value-of select = "NAME"/></TXT_FIELD_NAME>
                     <TXT_FIELD_ORDER><xsl:value-of select = "$fldOrder"/></TXT_FIELD_ORDER>
                     <CHK_LABEL_REQUIRED></CHK_LABEL_REQUIRED>
                     <TXT_FIELD_LABEL><xsl:value-of select = "LABEL"/></TXT_FIELD_LABEL>
                     <SEL_TABPAGE_FIELDS>
                                   <xsl:value-of select = "$blktab"/>
                     </SEL_TABPAGE_FIELDS>
              </BLOCK_FIELDS_LABEL>
       </xsl:template>
       -->
       <xsl:template match = "BLOCK" mode = "fieldpos_SE">
              <xsl:param name="pageId" select="."/>
              <xsl:param name="scrPos" select="."/>              
              <!-- <xsl:variable name = "blkid" select = "ID"/> -->
               <xsl:variable name = "blkid">
               <xsl:call-template name = "str:to-upper">
                  <xsl:with-param name = "text" select = "ID"/>
               </xsl:call-template>
               </xsl:variable>
              
              <xsl:variable name = "blktype" select = "@TYPE"/>
              <xsl:variable name = "ME_Blk_TabPage" select = "@TABPAGE"/>
              
              <!-- <xsl:if test = "$blktype = 'Single Entry'"> -->                   
                     <xsl:for-each select = "FIELD[@TABPAGE = $pageId]">
                            <xsl:variable name="fldType" select="TYPE"/>
                            <xsl:variable name = "pos" select = "position()"/>
                            
                            <FIELDSPOS_TABPAGES_IDX ID = "{position()}" TYPE = "MULTIPLE">
                                   <TXT_SNO><xsl:value-of select = "position()"/></TXT_SNO>
                                   <TXT_BLK_ID><xsl:value-of select = "$blkid"/></TXT_BLK_ID>
                                   <TXT_BLK_TYPE><xsl:value-of select = "$blktype"/></TXT_BLK_TYPE>
                                   <TXT_FLD_NAME><!-- <xsl:value-of select = "NAME"/> -->
                                   <xsl:call-template name = "str:to-upper">
                                      <xsl:with-param name = "text" select = "NAME"/>
                                   </xsl:call-template>
                                   </TXT_FLD_NAME>
                                   <TXT_FIELD_TYPE>
                                          <xsl:choose> 
                                                <!--
                                                 <xsl:when test="$fldType = 'LABEL'">
                                                        <xsl:text>Label</xsl:text>
                                                 </xsl:when>
                                                 !-->
                                                 <xsl:when test="$fldType = 'BUTTON'">
                                                        <xsl:text>Button</xsl:text>
                                                 </xsl:when>
                                                 <xsl:when test="$fldType = 'FIELDSET'">
                                                        <xsl:text>FieldSet</xsl:text>
                                                 </xsl:when>
                                                 <xsl:when test="$fldType = 'RADIO'">
                                                        <xsl:text>Radio</xsl:text>
                                                 </xsl:when>
                                                 <!-- Show the field Type Kals .. jan 11
                                                 <xsl:otherwise>
                                                        <xsl:text>Field</xsl:text>
                                                 </xsl:otherwise>
                                                 -->
                                                 <xsl:otherwise>
                                                        <xsl:value-of select = "$fldType"/> 
                                                       
                                                 </xsl:otherwise>
                                                 
                                                 
                                          </xsl:choose>
                                   </TXT_FIELD_TYPE>
                                   <TXT_POS><xsl:value-of select = "$pos"/></TXT_POS>                                   
                                   <TXT_ROW_POS><xsl:value-of select = "@ROW"/></TXT_ROW_POS>
                                   <TXT_COL_POS><xsl:value-of select = "@COL"/></TXT_COL_POS>                                   
                                   <TXT_ABS_POS><xsl:value-of select = "ABS_POS"/></TXT_ABS_POS>
                                   
                                   <xsl:if test="$fldType = 'FIELDSET'">
                                            <FLDSET_FIELDS_SE ID="1" TYPE="SINGLE">
                                                <FIELDSET_NAME><xsl:value-of select="NAME"/></FIELDSET_NAME>
                                                <FIELDSET_HEIGHT><xsl:value-of select="HEIGHT"/></FIELDSET_HEIGHT>
                                                <FIELDSET_WIDTH><xsl:value-of select="WIDTH"/></FIELDSET_WIDTH>
                                                <xsl:variable name = "colSpan" select = "COLSPAN"/>
                                                <xsl:variable name = "ColPos"><xsl:value-of select = "@COL"/></xsl:variable>                                                
                                                <xsl:variable name =  "Field_InFS"><xsl:value-of select = "count(FIELD)"/></xsl:variable>
                                                
                                                
                                                <FIELDSET_COLSPN>
                                                  <xsl:if test = "$colSpan != ''">
                                                    <xsl:value-of select="$colSpan"/>
                                                  </xsl:if>  
                                                  
                                                    <!-- 
                                                      if the CLSPAN value in the UIXml is null
                                                      
                                                      Check the fields Col. 
                                                        if it is 2, set the colpsan as 2.
                                                        
                                                      if the Field's col=1
                                                        then check the counnt of fields inside the FSET. if it is more then 1
                                                        set the colpsn=4 else set the colspan=2
                                                    !-->
                                                <xsl:if test = "$colSpan = ''">    
                                                    <xsl:if test  ="$ColPos = 2 ">
                                                     <xsl:text>2</xsl:text>
                                                    </xsl:if>
                                                    <xsl:if test  ="$ColPos = 1 and $Field_InFS &gt; 1 ">                                                    
                                                      <xsl:text>4</xsl:text>
                                                    </xsl:if>
                                                    <xsl:if test  ="$ColPos = 1 and $Field_InFS =  1 ">                                                    
                                                      <xsl:text>2</xsl:text>
                                                    </xsl:if>
                                                 </xsl:if>   

                                                </FIELDSET_COLSPN>
                                            </FLDSET_FIELDS_SE>                                            
                                           
                                   
                                        <xsl:for-each select = "FIELD">      
                                            <xsl:variable name="fsFldType" select="TYPE"/>
                                           <FLDSET_FLDPOS ID = "{position()}" TYPE = "MULTIPLE">
                                                  <TXT_SNO><xsl:value-of select = "position()"/></TXT_SNO>
                                                  <FSFLD_NAME><!-- <xsl:value-of select = "NAME"/> -->
                                                      <xsl:call-template name = "str:to-upper">
                                                        <xsl:with-param name = "text"  select = "NAME"/>
                                                      </xsl:call-template>
                                                  </FSFLD_NAME>
                                                  <FSFLD_TYPE><xsl:value-of select="$fsFldType"/></FSFLD_TYPE>
                                                  <FSFLD_POS><xsl:value-of select="ABS_POS"/></FSFLD_POS>
                                                  <FSFLD_ROW_POS><xsl:value-of select="@ROW"/></FSFLD_ROW_POS>
                                                  <FSFLD_COL_POS><xsl:value-of select="@COL"/></FSFLD_COL_POS>
                                                  <FSFLD_ORDER><xsl:value-of select = "position()"/></FSFLD_ORDER>
                                                  <xsl:if test="$fsFldType = 'RADIO'">
                                                      <RADIO_FLDPOS_SE_1 ID = "1" TYPE = "SINGLE">
                                                        <FIELDSET_HEIGHT><xsl:value-of select = "HEIGHT"/></FIELDSET_HEIGHT> 
                                                        <FIELDSET_WIDTH><xsl:value-of select = "WIDTH"/></FIELDSET_WIDTH> 
                                                        <FIELDSET_COLSPN><xsl:value-of select = "COLSPAN"/></FIELDSET_COLSPN>
                                                      </RADIO_FLDPOS_SE_1>
                                                  
                                                      <xsl:for-each select="OPTION">
                                                          <RADIO_FLDPOS_1 ID="{position()}" TYPE="MULTIPLE">
                                                            <TXT_SNO><xsl:value-of select="position()"/></TXT_SNO>
                                                            <RAD_OPTION_VAL><xsl:value-of select="VALUE"/></RAD_OPTION_VAL>
                                                            <TXT_ROW_POS><xsl:value-of select="@ROW"/></TXT_ROW_POS>
                                                            <TXT_COL_POS><xsl:value-of select="@COL"/></TXT_COL_POS>
                                                            <TXT_ABS_POS><xsl:value-of select="ABS_POS"/></TXT_ABS_POS>
                                                          </RADIO_FLDPOS_1>
                                                      </xsl:for-each>
                                                  </xsl:if>
                                           </FLDSET_FLDPOS>                                     
                                        </xsl:for-each>
                                   </xsl:if>
                                   <xsl:if test="$fldType = 'RADIO'">
                                      <!--Yugandhar added-->
                                      <RADIO_FLDPOS_SE ID="1" TYPE="SINGLE">
                                        <FIELDSET_NAME><xsl:value-of select="NAME"/></FIELDSET_NAME>
                                        <FIELDSET_HEIGHT><xsl:value-of select="HEIGHT"/></FIELDSET_HEIGHT>
                                        <FIELDSET_WIDTH><xsl:value-of select="WIDTH"/></FIELDSET_WIDTH>
                                        <FIELDSET_COLSPN><xsl:value-of select="COLSPAN"/></FIELDSET_COLSPN>
                                      </RADIO_FLDPOS_SE>
                                      <xsl:for-each select="OPTION">                                          
                                          <RADIO_FLDPOS ID="{position()}" TYPE="MULTIPLE">
                                              <TXT_SNO><xsl:value-of select="position()"/></TXT_SNO>                                              
                                              <RAD_OPTION_VAL><xsl:value-of select="VALUE"/></RAD_OPTION_VAL>
                                              <TXT_ROW_POS><xsl:value-of select="@ROW"/></TXT_ROW_POS>
                                              <TXT_COL_POS><xsl:value-of select="@COL"/></TXT_COL_POS>
                                              <TXT_ABS_POS><xsl:value-of select="ABS_POS"/></TXT_ABS_POS>
                                          </RADIO_FLDPOS>
                                      </xsl:for-each>
                                   </xsl:if>
                                  <!-- Textarea Handler -->
                                   <xsl:if test="$fldType = 'TEXTAREA'">
                                        <TEXTAREA_HEIGHT><xsl:value-of select="HEIGHT"/></TEXTAREA_HEIGHT>
                                        <TEXTAREA_WIDTH><xsl:value-of select="WIDTH"/></TEXTAREA_WIDTH>
                                        <TEXTAREA_FLDPOS_SE ID="1" TYPE="SINGLE">
                                            <ROWS_VAL><xsl:value-of select="ROWS"/></ROWS_VAL>
                                            <COLS_VAL><xsl:value-of select="COLS"/></COLS_VAL>
                                        </TEXTAREA_FLDPOS_SE>
                                   </xsl:if>
                             </FIELDSPOS_TABPAGES_IDX>                       
                     </xsl:for-each>
              <!-- </xsl:if> -->
         </xsl:template>
         <xsl:template match = "BLOCK" mode = "fieldpos_ME">
              <xsl:param name="pageId" select="."/>
              <xsl:param name="scrPos" select="."/>   
              <!-- <xsl:variable name = "blkid" select = "ID"/> -->
               <xsl:variable name = "blkid">
                <xsl:call-template name = "str:to-upper">
                  <xsl:with-param name = "text" select = "ID"/>
                </xsl:call-template>
               </xsl:variable>
              
              <xsl:variable name = "blktype" select = "@TYPE"/>
              <xsl:variable name = "ME_Blk_TabPage" select = "@TABPAGE"/>
              <xsl:variable name = "abspos" select = "ABS_POS"/>
              <xsl:if test = "$blktype = 'Multiple Entry' and  $ME_Blk_TabPage = $pageId">
                     
                     <!-- <xsl:variable name = "blkpos" select = "position()"/> -->
                     <!-- take the count of all the se fields attached to the Tabpage and add this to the POSition().!-->
                     
                   <FIELDSPOS_TABPAGES_IDX ID = "{position()}" TYPE = "MULTIPLE">
                            <TXT_SNO><xsl:value-of select = "position()"/></TXT_SNO>
                            <TXT_BLK_ID><xsl:value-of select = "$blkid"/></TXT_BLK_ID>
                            <TXT_BLK_TYPE><xsl:value-of select = "$blktype"/></TXT_BLK_TYPE>
                            <TXT_FLD_NAME ></TXT_FLD_NAME>
                            <TXT_FIELD_TYPE>Block</TXT_FIELD_TYPE>
                            <TXT_POS>
                                    <!--<xsl:value-of select = "$blkpos"/>-->
                            </TXT_POS>
                            
                            <TXT_ROW_POS><xsl:value-of select = "@ROW"/></TXT_ROW_POS>
                            <TXT_COL_POS><xsl:value-of select = "@COL"/></TXT_COL_POS>
                           
                            <TXT_ABS_POS><xsl:value-of select = "$abspos"/></TXT_ABS_POS>
                            <xsl:for-each select = "FIELD">
                              
                                   <!-- <xsl:variable name = "Fldpos" select = "position()"/>                                  -->
                                   <xsl:variable name = "Fldpos" select = "@COL"/>
                                   <FIELDSPOS_TABPAGES_MEIDX ID = "{position()}" TYPE = "MULTIPLE">
                                          <TXT_SNO><xsl:value-of select = "position()"/></TXT_SNO>
                                          <TXT_FIELD_NAME><!-- <xsl:value-of select = "NAME"/> -->
                                              <xsl:call-template name = "str:to-upper">
                                                <xsl:with-param name = "text"  select = "NAME"/>
                                              </xsl:call-template>
                                          </TXT_FIELD_NAME>
                                          <TXT_FLD_POS>
                                                  <xsl:value-of select = "$Fldpos"/> 
                                          </TXT_FLD_POS>
                                   </FIELDSPOS_TABPAGES_MEIDX>
                             
                            </xsl:for-each>
                   </FIELDSPOS_TABPAGES_IDX>
              </xsl:if>
       </xsl:template>
       <xsl:template match = "BLOCK" mode="stdbuttons">
              <!-- <xsl:param name="screenId" select="."/> -->
              <xsl:variable name="blkId" select="ID"/>              
              <xsl:if test = "count(./FIELD) &gt; 0">
                     <xsl:for-each select = "./FIELD">
                            <STDBUTTONS ID = "{position()}" TYPE = "MULTIPLE">
                                   <SEQUENCE_NO><xsl:value-of select = "position()"/></SEQUENCE_NO>
                                   <BUTTONNAME><xsl:value-of select  ="NAME"/></BUTTONNAME>
                                   <FUNCTION_NAME><xsl:value-of select = "EVENT/FUNCTION"/></FUNCTION_NAME>
                                   <TXT_LABEL><xsl:value-of select = "LABEL"/></TXT_LABEL>
                                   <IMG_REQD>
                                          <xsl:if test="$blkId= 'BLK_STD_BUTTONS'">
                                                 <xsl:text>N</xsl:text>
                                          </xsl:if>                                          
                                          <xsl:if test="$blkId= 'BLK_STD_BUTTONS_IMG'">
                                                 <xsl:text>Y</xsl:text>
                                          </xsl:if>
                                   </IMG_REQD>
                                   <IMAGE>
                                          <xsl:if test="$blkId= 'BLK_STD_BUTTONS_IMG'">
                                                 <xsl:value-of select = "SRC"/>
                                          </xsl:if>
                                   </IMAGE>
                            </STDBUTTONS>
                     </xsl:for-each>
              </xsl:if>
       </xsl:template>
       
       <xsl:template match = "BLOCK" mode="custbuttons">
              <!-- <xsl:param name="screenId" select="."/> -->
              <xsl:variable name="blkId">
              <xsl:call-template name = "str:to-upper">
                <xsl:with-param name = "text" select = "ID"/>
              </xsl:call-template>
              </xsl:variable>
              
              <xsl:if test = "count(./FIELD) &gt; 0">
                     <xsl:for-each select = "./FIELD">
                      <xsl:variable name = "srcCount" select = "count(SRC)"/>
                            <CSTBUTTONS ID = "{position()}" TYPE = "MULTIPLE">
                                   <SEQUENCE_NO><xsl:value-of select = "position()"/></SEQUENCE_NO>
                                   <TAB_PAGE><xsl:value-of select = "@TABPAGE"/></TAB_PAGE>
                                   <BUTTON_NAME><xsl:value-of select  ="NAME"/></BUTTON_NAME>
                                   <FUNCTION_NAME><xsl:value-of select = "EVENT/FUNCTION"/></FUNCTION_NAME>
                                   <TXT_LABEL><xsl:value-of select = "LABEL"/></TXT_LABEL>
                                   <IMAGE_REQD>
                                          <xsl:if test="$srcCount = 0">
                                                 <xsl:text>N</xsl:text>
                                          </xsl:if>
                                          <xsl:if test="$srcCount &gt; 0">
                                                 <xsl:text>Y</xsl:text>
                                          </xsl:if>
                                   </IMAGE_REQD>
                                   <IMAGE >
                                          <xsl:value-of select = "SRC"/>
                                   </IMAGE>
                                   <POSITION><xsl:value-of select = "VALIGN"/></POSITION>
                                   <ALIGNMENT><xsl:value-of select = "HALIGN"/></ALIGNMENT>
                            </CSTBUTTONS>
                     </xsl:for-each>
              </xsl:if>
       </xsl:template>
       
       <!-- handler for Access keys..........Hitesh Added-->
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
              <TXT_BTN_LABEL><xsl:value-of select ="LABEL"/></TXT_BTN_LABEL>
              <TXT_ACCESSKEY><xsl:value-of select ="ACCESSKEY"/></TXT_ACCESSKEY>
          </BUTTONS_ACCESSKEYS>
       </xsl:template>
       
       <xsl:template match="FIELD" mode="AccessKeys">          
          <xsl:param name="tabCount" select="."/>
          <BUTTONS_ACCESSKEYS ID="{position()+$tabCount}" Type="MULTIPLE">
              <TXT_BUTTON_AK_SNO><xsl:value-of select="position()+$tabCount"/></TXT_BUTTON_AK_SNO>
              <!--<TXT_BUTTON_ID>
              <xsl:call-template name = "str:to-upper">
                <xsl:with-param name  = "text" select = "NAME"/>
              </xsl:call-template>
              </TXT_BUTTON_ID>
              -->
              <TXT_BUTTON_ID> <xsl:value-of select="NAME"/> </TXT_BUTTON_ID>
              <TXT_BUTTON_TYPE>Button</TXT_BUTTON_TYPE>
              <TXT_BTN_LABEL><xsl:value-of select ="LABEL"/></TXT_BTN_LABEL>
              <TXT_ACCESSKEY><xsl:value-of select ="ACCESSKEY"/></TXT_ACCESSKEY>
          </BUTTONS_ACCESSKEYS>
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