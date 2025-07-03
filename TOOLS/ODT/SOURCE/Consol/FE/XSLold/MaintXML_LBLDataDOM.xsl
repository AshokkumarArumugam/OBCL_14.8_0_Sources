<?xml version ="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:str="http://www.w3.org/1999/XSL/Transform">
       
  <xsl:param name="MasterXmlName"/>  <!--Hitesh-->    
       <!--<xsl:variable name="moduleCode" select="/UDTMAINT/@MODULE_CODE"/>-->
       <xsl:variable name="moduleCodeTemp">
              <xsl:choose>
                     <xsl:when test="/UDTMAINT/@MODULE_CODE != ''">
                            <xsl:value-of select="/UDTMAINT/@MODULE_CODE"/>
                     </xsl:when>
                     <xsl:when test="/UDTMAINT/@MODULE_CODE = ''">
                            <xsl:value-of select="''"/>
                     </xsl:when>
                     
                     <!--
                     <xsl:when test="/UDTMAINT/@FUNCTIONID != ''">
                            <xsl:value-of select="/UDTMAINT/@FUNCTIONID"/>
                     </xsl:when>
                     -->
              </xsl:choose>
       </xsl:variable>
       <xsl:variable name="moduleCode">
          <xsl:if test = "$moduleCodeTemp != ''">
            <xsl:value-of select = "concat($moduleCodeTemp , '__')"/>                        
          </xsl:if>
          <xsl:if test = "$moduleCodeTemp = ''">
            <xsl:value-of select = "''"/>
          </xsl:if>          
       </xsl:variable>
       
       
       <xsl:template match="/UDTMAINT">
              <MODULE_DETAILS ID="1" Type="MULTIPLE">
                     <TXT_SLNO>1</TXT_SLNO>
                     
                     <!-- <xsl:if test="@MODULE_CODE !=''"> -->
                            
                            <TXT_MODULE_CODE><xsl:value-of select="@MODULE_CODE"/></TXT_MODULE_CODE>
                            <TXT_MODULE_NAME><xsl:value-of select="MODULE_NAME"/></TXT_MODULE_NAME>
                     <!-- </xsl:if> -->
                     <!--
                     <xsl:if test="@FUNCTIONID !=''">
                            <TXT_MODULE_CODE><xsl:value-of select="@FUNCTIONID"/></TXT_MODULE_CODE>
                            <TXT_MODULE_NAME><xsl:value-of select="FUNCTION_NAME"/></TXT_MODULE_NAME>
                     </xsl:if>
                     -->
                     
                     <!-- Call SCREENS  handler -->
                     <xsl:apply-templates select="SCREEN">
                     </xsl:apply-templates>
                     
                     <!-- Call BLOCKS  handler -->
                     <xsl:apply-templates select="BLOCK">
                     </xsl:apply-templates>
                     
                     
                     
                     <xsl:for-each select="SCREEN">    
                        
                            <xsl:variable name="scr" select="@NAME"/>                            
                     
                            <STANDARDBUTTONS ID="{position()}" Type="MULTIPLE">
                                   <TXT_SEQ_NO><xsl:value-of select="position()"/></TXT_SEQ_NO>
                                   <TXT_SCR_NAME><xsl:value-of select="$scr"/></TXT_SCR_NAME>
                                   
                                   <xsl:for-each select="//BLOCK[ID='BLK_STDBUTTONS']/FIELD[@INCLUDE='Y']">
                                          <STDBUTTONS ID="{position()}" Type="MULTIPLE">
                                                 <TXT_SEQUENCE_NO><xsl:value-of select="position()"/></TXT_SEQUENCE_NO>
                                                 <TXT_BTN_NAME><xsl:value-of select="NAME"/></TXT_BTN_NAME>                                                 
                                                 <TXT_BTN_LBLID>
                                                        <xsl:call-template name="str:to-lower">
                                                               <xsl:with-param name="text">
                                                                      <xsl:value-of select="concat('LBL__',$moduleCode,$MasterXmlName,$scr,'__',NAME)"/>                                               
                                                               </xsl:with-param>
                                                        </xsl:call-template>
                                                 </TXT_BTN_LBLID>
                                                  <TXT_DEFVALUE>
                                                       <xsl:call-template name="str:replace">
                                                          <xsl:with-param name="text">
                                                            <xsl:value-of select="NAME"/>
                                                          </xsl:with-param>
                                                      </xsl:call-template>
                                                </TXT_DEFVALUE>
                                                 <TXT_BTN_LBLVAL><xsl:value-of select="NAME"/></TXT_BTN_LBLVAL>
                                          </STDBUTTONS>
                                   </xsl:for-each>
                                    <xsl:for-each select="//BLOCK[ID='BLK_CST_BUTTONS']/FIELD">
                                          <CSTBUTTONS ID="{position()}" Type="MULTIPLE">
                                                 <TXT_SEQUENCE_NO><xsl:value-of select="position()"/></TXT_SEQUENCE_NO> 
                                                 <TXT_BTN_NAME><xsl:value-of select="NAME"/></TXT_BTN_NAME>                                                 
                                                  <TXT_BTN_LBLID>
                                                        <xsl:call-template name="str:to-lower">
                                                               <xsl:with-param name="text">
                                                                      
                                                                      <xsl:value-of select="concat('LBL__',$moduleCode,$MasterXmlName,$scr,'__',NAME)"/>
                                                               </xsl:with-param>
                                                        </xsl:call-template>
                                                 </TXT_BTN_LBLID>
                                                  <TXT_DEFVALUE>
                                                       <xsl:call-template name="str:replace">
                                                          <xsl:with-param name="text">
                                                            <xsl:value-of select="NAME"/>
                                                          </xsl:with-param>
                                                      </xsl:call-template>
                                                </TXT_DEFVALUE>
                                                 <TXT_BTN_LBLVAL><xsl:value-of select="NAME"/></TXT_BTN_LBLVAL>
                                          </CSTBUTTONS>
                                   </xsl:for-each>
                            </STANDARDBUTTONS>
                            
                     </xsl:for-each>
                     <xsl:apply-templates select="WORKFLOW_MAINT/WORKFLOW">
                            <xsl:with-param name="ModuleCode">
                                   <xsl:value-of select="$moduleCode"/>                                               
                            </xsl:with-param>
                     </xsl:apply-templates>
              </MODULE_DETAILS>
       </xsl:template>
       
       <xsl:template match="SCREEN">
              <SCREENS ID="{position()}" TYPE="MULTIPLE">
                <Testing><xsl:value-of select = "$moduleCode"/></Testing>
                <Testing><xsl:value-of select = "$MasterXmlName"/></Testing>
                     <xsl:variable name="ScrType" select="@SCREEN_TYPE"/>
                     <xsl:variable name="idx" select="position()"/>
                     <xsl:variable name="ScreenName" select="@NAME"/>
                     <TXT_SLNO>
                            <xsl:value-of select="$idx"/>
                     </TXT_SLNO>
                     <TXT_SCREENID>
                            <xsl:value-of select="@NAME"/>
                     </TXT_SCREENID>
                     <TXT_LABELID>
                            <xsl:call-template name="str:to-lower">
                                   <xsl:with-param name="text">
                                          <xsl:value-of select="concat('LBL__',$moduleCode,$MasterXmlName,$ScreenName)"/>
                                   </xsl:with-param>
                            </xsl:call-template>
                     </TXT_LABELID>
                     <TXT_LABELVALUE>
                            <xsl:call-template name="str:replace">
                                   <xsl:with-param name="text">
                                          <xsl:value-of select="@NAME"/>
                                   </xsl:with-param>
                            </xsl:call-template>
                     </TXT_LABELVALUE>
                     <TXT_DEFVALUE>
                            <xsl:call-template name="str:replace">
                                   <xsl:with-param name="text">
                                          <xsl:value-of select="@NAME"/>
                                   </xsl:with-param>
                            </xsl:call-template>
                     </TXT_DEFVALUE>
                     <TXT_DFLTID>
                            <xsl:call-template name="str:to-lower">
                                   <xsl:with-param name="text">
                                          <xsl:value-of select="concat('LBL__',$moduleCode,$MasterXmlName,$ScreenName)"/>
                                   </xsl:with-param>
                            </xsl:call-template>
                     </TXT_DFLTID>
                     <xsl:apply-templates select="//PAGE">
                     </xsl:apply-templates>
                     
                     <xsl:variable name = "L_count" select = "count(//PAGE)"/>
                     <TABPAGES ID="{$L_count +1}" Type="MULTIPLE">
                            <TXT_SLNO><xsl:value-of select="$L_count + 1 "/></TXT_SLNO>
                            <TXT_TABPAGEID>All<xsl:value-of select="@ID"/></TXT_TABPAGEID>
                            <TXT_LABEL>
                              <xsl:call-template name="str:to-lower">
                                     <xsl:with-param name="text">
                                            <xsl:value-of select="concat('LBL__',$moduleCode,$MasterXmlName,$ScreenName ,'__','All')"/>
                                     </xsl:with-param>
                              </xsl:call-template>
                            </TXT_LABEL>
                            <TXT_IS_HDR>TABPAGE_ALL</TXT_IS_HDR>
                            <TXT_TABLABELVALUE>
                                <xsl:call-template name="str:replace">
                                   <xsl:with-param name="text">
                                          <!-- <xsl:value-of select="@ID"/> -->
                                          <xsl:text>All</xsl:text>
                                   </xsl:with-param>
                            </xsl:call-template>
                            </TXT_TABLABELVALUE>
                            <TXT_DEFVALUE>
                                <xsl:call-template name="str:replace">
                                   <xsl:with-param name="text">
                                          <!-- <xsl:value-of select="@ID"/> -->
                                          <xsl:text>All</xsl:text>
                                   </xsl:with-param>
                            </xsl:call-template>
                            </TXT_DEFVALUE>                                                        
                            <TXT_DFLTID>
                                <xsl:call-template name="str:to-lower">
                                     <xsl:with-param name="text">
                                            <xsl:value-of select="concat('LBL__',$moduleCode,$MasterXmlName,$ScreenName ,'__','All')"/>
                                     </xsl:with-param>
                              </xsl:call-template>
                            </TXT_DFLTID>
                     </TABPAGES>
                     
              </SCREENS>
       </xsl:template>
       <!-- handler for tabpages -->
       <xsl:template match="PAGE">
              <xsl:variable name="scrName" select="../../@NAME"/>
              <xsl:variable name="PageID" select="@ID"/>
              <TABPAGES ID="{position()}" Type="MULTIPLE">
                     <TXT_SLNO>
                            <xsl:value-of select="position()"/>
                     </TXT_SLNO>
                     <TXT_TABPAGEID>
                            <xsl:value-of select="@ID"/>
                     </TXT_TABPAGEID>
                     <TXT_LABEL>
                            <xsl:call-template name="str:to-lower">
                                   <xsl:with-param name="text">
                                          <xsl:value-of select="concat('LBL__',$moduleCode,$MasterXmlName,$scrName,'__',$PageID)"/>
                                   </xsl:with-param>
                            </xsl:call-template>
                     </TXT_LABEL>
                     <TXT_TABLABELVALUE>
                            <xsl:call-template name="str:replace">
                                   <xsl:with-param name="text">
                                          <xsl:value-of select="@ID"/>
                                   </xsl:with-param>
                            </xsl:call-template>
                     </TXT_TABLABELVALUE>
                     <TXT_DEFVALUE>
                            <xsl:call-template name="str:replace">
                                   <xsl:with-param name="text">
                                          <xsl:value-of select="@ID"/>
                                   </xsl:with-param>
                            </xsl:call-template>
                     </TXT_DEFVALUE>
                     <TXT_DFLTID>
                            <xsl:call-template name="str:to-lower">
                                   <xsl:with-param name="text">
                                          <xsl:value-of select="concat('LBL__',$moduleCode,$MasterXmlName,$scrName,'__',$PageID)"/>
                                   </xsl:with-param>
                            </xsl:call-template>
                     </TXT_DFLTID>
              </TABPAGES>
       </xsl:template>
       <!-- handler for Blocks -->
       <xsl:template match="BLOCK">
       
              <xsl:if test="./ID != 'BLK_STDBUTTONS' and ./ID != 'BLK_STDBUTTONS_IMG' and ./ID != 'BLK_CST_BUTTONS'">
                <xsl:variable name = "currBlock" select = "."/>
                     <BLOCKS ID="{position()}" Type="MULTIPLE">
                            <TXT_SLNO>
                                   <xsl:value-of select="position()"/>
                            </TXT_SLNO>
                                                        
                                  <!--  <xsl:value-of select="ID"/> -->
                                  <xsl:variable name = "block_Id">
                                      <xsl:call-template name = "str:to-upper">
                                        <xsl:with-param name  = "text" select = "ID"/>
                                     </xsl:call-template>
                                   </xsl:variable>  
                                  
                            <TXT_BLOCK_ID><xsl:value-of select = "$block_Id"/></TXT_BLOCK_ID>
                            <!-- Reddy Prasad> -->
                            <TXT_BLKLABEL>
                            <xsl:call-template name="str:to-lower">
                                   <xsl:with-param name="text">
                                          <xsl:value-of select="concat('LBL__',$moduleCode,$block_Id)"/>
                                   </xsl:with-param>
                            </xsl:call-template>
                      </TXT_BLKLABEL>
                     
                     <TXT_BLKLABELVALUE>
                       <xsl:call-template name="str:replace">
                                   <xsl:with-param name="text">
                                          <xsl:value-of select="ID"/>
                                   </xsl:with-param>
                            </xsl:call-template>
                     </TXT_BLKLABELVALUE>
                     
                     <TXT_DEFVALUE>
                            <xsl:call-template name="str:replace">
                                   <xsl:with-param name="text">
                                          <xsl:value-of select="ID"/>
                                   </xsl:with-param>
                            </xsl:call-template>
                     </TXT_DEFVALUE>
                     <TXT_DFLTID>
                            <xsl:call-template name="str:to-lower">
                                   <xsl:with-param name="text">
                                          <xsl:value-of select="concat('LBL__',$moduleCode,$block_Id)"/>
                                   </xsl:with-param>
                            </xsl:call-template>
                      </TXT_DFLTID>
                            <!-- Reddy Prasad-->
                            <!-- Call Fields handler -->
                            <xsl:apply-templates select="$currBlock//FIELD">
                                <xsl:with-param name = "block_Id" select = "$block_Id"/>
                            </xsl:apply-templates>
              </BLOCKS>
              </xsl:if>
       </xsl:template>
       
       <xsl:template match="FIELD">
          <xsl:param name = "block_Id" select = "."/>
              <!-- <xsl:variable name="Blk_Id" select="../ID"/> -->
              
              <FIELDS ID="{position()}" Type="MULTIPLE">
                <xsl:variable name="Blk_Id" select="$block_Id"/> 
              
                     <xsl:variable name="FldType" select="TYPE"/>
                     <xsl:variable name="FldName" select="NAME"/>
                     <TXT_SLNO>
                            <xsl:value-of select="position()"/>
                     </TXT_SLNO>
                     <TXT_FIELDNAME>
                            <!-- <xsl:value-of select="NAME"/> -->
                            <xsl:call-template name = "str:to-upper">
                              <xsl:with-param name = "text" select = "NAME"/>                              
                            </xsl:call-template>
                     </TXT_FIELDNAME>
                     
                     <TXT_FIELDLABEL>
                            <xsl:call-template name="str:to-lower">
                                   <xsl:with-param name="text">
                                          <xsl:value-of select="concat('LBL__',$moduleCode,$Blk_Id,'__',$FldName)"/>
                                   </xsl:with-param>
                            </xsl:call-template>
                     </TXT_FIELDLABEL>
                     <TXT_FIELDLABELVALUE>
                            <xsl:call-template name="str:replace">
                                   <xsl:with-param name="text">
                                          <xsl:value-of select="NAME"/>
                                   </xsl:with-param>
                            </xsl:call-template>
                     </TXT_FIELDLABELVALUE>
                     <TXT_DEFVALUE>
                            <xsl:call-template name="str:replace">
                                   <xsl:with-param name="text">
                                          <xsl:value-of select="NAME"/>
                                   </xsl:with-param>
                            </xsl:call-template>
                     </TXT_DEFVALUE>
                     
                     <TXT_FIELD_TYPE>
                            <xsl:value-of select="$FldType"/>
                     </TXT_FIELD_TYPE>
                     <TXT_DFLTID>
                            <xsl:call-template name="str:to-lower">
                                   <xsl:with-param name="text">
                                          <xsl:value-of select="concat('LBL__',$moduleCode,$Blk_Id,'__',$FldName)"/>
                                   </xsl:with-param>
                            </xsl:call-template>
                     </TXT_DFLTID>
                     <xsl:if test="$FldType ='SELECT'">
                            <xsl:apply-templates select="OPTION">
                                   <xsl:with-param name="Blk_Id" select="$Blk_Id" />
                                   <xsl:with-param name="Fld_Id" select="$FldName" />
                            </xsl:apply-templates>
                     </xsl:if>
                     <xsl:if test="$FldType ='RADIO'">
                            <xsl:apply-templates select="OPTION" mode="Radio">
                                   <xsl:with-param name="Blk_Id" select="$Blk_Id" />
                                   <xsl:with-param name="Fld_Id" select="$FldName" />
                            </xsl:apply-templates>
                     </xsl:if>
                     <xsl:if test="$FldType ='LOV'">
                            <xsl:apply-templates select="//LOV[@BLOCK_ID =$Blk_Id]/FIELD[@NAME = $FldName]"
                                                 mode="Lov">
                            </xsl:apply-templates>
                     </xsl:if>
              </FIELDS>
       </xsl:template>
       <!-- Select handler -->
       <xsl:template match="OPTION">
              <xsl:param name="Blk_Id" select="." />
              <xsl:param name="Fld_Id" select="." />
              
              <FIELDS_SELECT ID="{position()}" TYPE="MULTIPLE">
                     <TXT_SLNO>
                            <xsl:value-of select="position()"/>
                     </TXT_SLNO>
                     <TXT_OPT_VALUE>
                            <xsl:value-of select="@VALUE"/>
                     </TXT_OPT_VALUE>
                     <xsl:variable name="TempVar" select="@VALUE"/>
                     <TXT_LABELID>
                            <xsl:call-template name="str:to-lower">
                                   <xsl:with-param name="text">
                                          <xsl:value-of select="concat('LBL__',$moduleCode,$Blk_Id,'__',$Fld_Id, '__',$TempVar)"/>
                                   </xsl:with-param>
                            </xsl:call-template>
                     </TXT_LABELID>
                     <TXT_LABELVALUE>
                            <xsl:call-template name="str:replace">
                                   <xsl:with-param name="text">
                                          <xsl:value-of select="@VALUE"/>
                                   </xsl:with-param>
                            </xsl:call-template>
                     </TXT_LABELVALUE>
                     <TXT_DEFVALUE>
                            <xsl:call-template name="str:replace">
                                   <xsl:with-param name="text">
                                          <xsl:value-of select="@VALUE"/>
                                   </xsl:with-param>
                            </xsl:call-template>
                     </TXT_DEFVALUE>
                     <TXT_DFLTID>
                            <xsl:call-template name="str:to-lower">
                                   <xsl:with-param name="text">
                                          <xsl:value-of select="concat('LBL__',$moduleCode,$Blk_Id,'__',$Fld_Id, '__',$TempVar)"/>
                                   </xsl:with-param>
                            </xsl:call-template>
                     </TXT_DFLTID>
              </FIELDS_SELECT>
       </xsl:template>
       <!-- Radio Hadler -->
        <xsl:template match="OPTION" mode="Radio">
              <xsl:param name="Blk_Id" select="." />
              <xsl:param name="Fld_Id" select="." />
              
              <FIELDS_RADIO ID="{position()}" TYPE="MULTIPLE">
                     <TXT_SLNO>
                            <xsl:value-of select="position()"/>
                     </TXT_SLNO>
                     <TXT_OPT_VALUE>
                            <xsl:value-of select="@VALUE"/>
                     </TXT_OPT_VALUE>
                     <xsl:variable name="TempVar" select="@VALUE"/>
                     <TXT_LABELID>
                            <xsl:call-template name="str:to-lower">
                                   <xsl:with-param name="text">
                                          <xsl:value-of select="concat('LBL__',$moduleCode,$Blk_Id,'__',$Fld_Id, '__',$TempVar)"/>
                                   </xsl:with-param>
                            </xsl:call-template>
                     </TXT_LABELID>
                     <TXT_LABELVALUE>
                            <xsl:call-template name="str:replace">
                                   <xsl:with-param name="text">
                                          <xsl:value-of select="@VALUE"/>
                                   </xsl:with-param>
                            </xsl:call-template>
                     </TXT_LABELVALUE>
                     <TXT_DEFVALUE>
                            <xsl:call-template name="str:replace">
                                   <xsl:with-param name="text">
                                          <xsl:value-of select="@VALUE"/>
                                   </xsl:with-param>
                            </xsl:call-template>
                     </TXT_DEFVALUE>
                     <TXT_DFLTID>
                            <xsl:call-template name="str:to-lower">
                                   <xsl:with-param name="text">
                                          <xsl:value-of select="concat('LBL__',$moduleCode,$Blk_Id,'__',$Fld_Id, '__',$TempVar)"/>
                                   </xsl:with-param>
                            </xsl:call-template>
                     </TXT_DFLTID>
              </FIELDS_RADIO>
       </xsl:template>
       <!-- Lov handler -->
       <!-- <xsl:template match = "LOV_DETTAILS">  -->
       <xsl:template match="FIELD" mode="Lov">
              <xsl:variable name="BlockId" select="../@BLOCK_ID"/>
              <xsl:variable name="FldName" select="@NAME"/>
              
              <xsl:for-each select="LOV_DETTAILS">
                     <xsl:variable name="Idx" select="position()"/>
                     <FIELDS_LOV ID="{position()}" Type="MULTIPLE">
                            <TXT_SNO>
                                   <xsl:value-of select="position()"/>
                            </TXT_SNO>
                            <TXT_LABEL_LOV>
                                   <xsl:call-template name="str:to-lower">
                                          <xsl:with-param name="text">
                                                 <xsl:value-of select="concat('LBL__', $moduleCode,$BlockId ,'__',$FldName ,'__',$Idx)"/>
                                          </xsl:with-param>
                                   </xsl:call-template>
                            </TXT_LABEL_LOV>
                            <TXT_TITLE_LOV>
                                   <xsl:call-template name="str:replace">
                                          <xsl:with-param name="text">
                                                 <xsl:value-of select="$FldName"/>
                                          </xsl:with-param>
                                   </xsl:call-template>
                            </TXT_TITLE_LOV>
                            <TXT_DEFVALUE>
                                   <xsl:call-template name="str:replace">
                                          <xsl:with-param name="text">
                                                 <xsl:value-of select="$FldName"/>
                                          </xsl:with-param>
                                   </xsl:call-template>
                            </TXT_DEFVALUE>
                            <TXT_DFLTID>
                                   <xsl:call-template name="str:to-lower">
                                          <xsl:with-param name="text">
                                                 <xsl:value-of select="concat('LBL__', $moduleCode,$BlockId ,'__',$FldName ,'__',$Idx)"/>
                                          </xsl:with-param>
                                   </xsl:call-template>
                            </TXT_DFLTID>
                            <xsl:apply-templates select="QRY_COLS">
                                   <xsl:with-param name="Blk_Id" select="$BlockId" />
                                   <xsl:with-param name="Fld_Id" select="$FldName" />
                                   <xsl:with-param name="Idx" select="$Idx" />
                            </xsl:apply-templates>
                     </FIELDS_LOV>
              </xsl:for-each>
       </xsl:template>
       <!-- Qry Cols handler -->
       <xsl:template match="QRY_COLS">
              <xsl:param name="Blk_Id" select="." />
              <xsl:param name="Fld_Id" select="." />
              <xsl:param name="Idx" select="." />
              
              <FIELDS_LOV_QRYCOLS ID="{position()}" Type="MULTIPLE">
                     <xsl:variable name="ColHead" select="QRY_COL"/>
                     <TXT_SNO>
                            <xsl:value-of select="position()"/>
                     </TXT_SNO>
                     <TXT_QRY_COL>
                            <xsl:value-of select="QRY_COL"/>
                     </TXT_QRY_COL>
                     <TXT_LBL_COL_HEADING>
                            <xsl:call-template name="str:to-lower">
                                   <xsl:with-param name="text">
                                          <xsl:value-of select="concat('LBL__',$moduleCode,$Blk_Id,'__',$Fld_Id,'__',$Idx,'__',$ColHead)"/>
                                   </xsl:with-param>
                            </xsl:call-template>
                            
                     </TXT_LBL_COL_HEADING>
                     <TXT_COL_HEADING>
                     <!--
                            <xsl:if test="substring-before(QRY_COL,'_') = ''">
                                   <xsl:value-of select="QRY_COL"/>
                            </xsl:if>
                            <xsl:if test="substring-before(QRY_COL,'_') != ''">
                                   <xsl:value-of select="substring-before(QRY_COL,'_')"/> <xsl:value-of select="substring-after(QRY_COL,'_')"/>
                            </xsl:if>
                            -->
                           <xsl:call-template name="str:replace">
                              <xsl:with-param name="text">
                                <xsl:value-of select="QRY_COL"/>
                              </xsl:with-param>
                          </xsl:call-template>
                     </TXT_COL_HEADING>
                     <TXT_DEFVALUE>
                            <!--
                            <xsl:if test="substring-before(QRY_COL,'_') = ''">
                                   <xsl:value-of select="QRY_COL"/>
                            </xsl:if>
                            <xsl:if test="substring-before(QRY_COL,'_') != ''">
                                   <xsl:value-of select="substring-before(QRY_COL,'_')"/> <xsl:value-of select="substring-after(QRY_COL,'_')"/>
                            </xsl:if>
                            -->
                           <xsl:call-template name="str:replace">
                              <xsl:with-param name="text">
                                <xsl:value-of select="QRY_COL"/>
                              </xsl:with-param>
                          </xsl:call-template>
                     </TXT_DEFVALUE>
                     <TXT_DFLTID>
                            <xsl:call-template name="str:to-lower">
                                   <xsl:with-param name="text">
                                          <xsl:value-of select="concat('LBL__',$moduleCode,$Blk_Id,'__',$Fld_Id,'__',$Idx,'__',$ColHead)"/>
                                   </xsl:with-param>
                            </xsl:call-template>
                            
                     </TXT_DFLTID>
              </FIELDS_LOV_QRYCOLS>
       </xsl:template>
       

       <xsl:template match="WORKFLOW">
              
              <xsl:param name="ModuleCode" select="."/>
              
              <WORKFLOW ID="{position()}" Type="MULTIPLE">
              
                     <xsl:variable name="wfType" select="@TYPE"/>
                     
                     <TXT_SEQ_NO><xsl:value-of select="position()"/></TXT_SEQ_NO>
                     <TXT_WF_TYPE><xsl:value-of select="$wfType"/></TXT_WF_TYPE>
                     <TXT_LBLID>
                            <xsl:call-template name="str:to-lower">
                                   <xsl:with-param name="text">
                                          <xsl:value-of select="concat('LBL__',$ModuleCode,$MasterXmlName,$wfType)"/>
                                   </xsl:with-param>
                            </xsl:call-template>
                     </TXT_LBLID>
                     <TXT_LBLVAL>
                            <xsl:value-of select="$wfType"/>
                     </TXT_LBLVAL>
                     <TXT_DEFVALUE>
                            <xsl:value-of select="$wfType"/>
                     </TXT_DEFVALUE>
                     <TXT_DFLTID>
                            <xsl:call-template name="str:to-lower">
                                   <xsl:with-param name="text">
                                          <xsl:value-of select="concat('LBL__',$ModuleCode,$MasterXmlName,$wfType)"/>
                                   </xsl:with-param>
                            </xsl:call-template>
                     </TXT_DFLTID>
                     
                     <xsl:apply-templates select="STAGES/STAGE">
                            <xsl:with-param name="ModuleCode">
                                   <xsl:value-of select="$moduleCode"/>                                               
                            </xsl:with-param>
                            <xsl:with-param name="wfType">
                                   <xsl:value-of select="$wfType"/>                                               
                            </xsl:with-param>
                     </xsl:apply-templates>

                     <xsl:apply-templates select="REASONCODES/REASON_CODE">
                            <xsl:with-param name="ModuleCode">
                                   <xsl:value-of select="$moduleCode"/>                                               
                            </xsl:with-param>
                            <xsl:with-param name="wfType">
                                   <xsl:value-of select="$wfType"/>                                               
                            </xsl:with-param>
                     </xsl:apply-templates>
                     <xsl:apply-templates select="ACTIONS/ACTION">
                            <xsl:with-param name="ModuleCode">
                                   <xsl:value-of select="$moduleCode"/>                                               
                            </xsl:with-param>
                            <xsl:with-param name="wfType">
                                   <xsl:value-of select="$wfType"/>                                               
                            </xsl:with-param>
                     </xsl:apply-templates>       
              </WORKFLOW>
       </xsl:template>
       
        <xsl:template match="STAGE">
               <xsl:param name="ModuleCode" select="."/>
               <xsl:param name="wfType" select="."/>
               <STGDESC ID="{position()}" Type="MULTIPLE">
                     <TXT_SEQ_NO><xsl:value-of select="position()"/></TXT_SEQ_NO>
                     <TXT_STG_TYPE><xsl:value-of select="."/></TXT_STG_TYPE>
                     <TXT_LABELID>
                            <xsl:variable name="Stage" select="."/>
                            <xsl:call-template name="str:to-lower">
                                  <xsl:with-param name="text">
                                          <xsl:value-of select="concat('LBL__',$ModuleCode,$MasterXmlName,$wfType,'__',$Stage)"/>
                                   </xsl:with-param>
                            </xsl:call-template>
                     </TXT_LABELID>
                     <TXT_LABELVALUE>
                            <xsl:value-of select="."/>
                     </TXT_LABELVALUE>
                     <TXT_DEFVALUE>
                            <xsl:value-of select="."/>
                     </TXT_DEFVALUE>
                     
               </STGDESC>
       </xsl:template>
       
       <xsl:template match="REASON_CODE">
               <xsl:param name="ModuleCode" select="."/>
               <xsl:param name="wfType" select="."/>
               <RSNCODEMNT ID="{position()}" Type="MULTIPLE">
                     <TXT_RSNCODE_SNO><xsl:value-of select="position()"/></TXT_RSNCODE_SNO>
                     <TXT_RSNCODE><xsl:value-of select="."/></TXT_RSNCODE>
                     <TXT_LABELID>
                            <xsl:variable name="RsnCode" select="."/>
                            <xsl:call-template name="str:to-lower">
                                  <xsl:with-param name="text">
                                          <xsl:value-of select="concat('LBL__',$ModuleCode,$MasterXmlName,$wfType,'__',$RsnCode)"/>
                                   </xsl:with-param>
                            </xsl:call-template>
                     </TXT_LABELID>
                     <TXT_LABELVALUE>
                            <xsl:value-of select="."/>
                     </TXT_LABELVALUE>
                     <TXT_DEFVALUE>
                            <xsl:value-of select="."/>
                     </TXT_DEFVALUE>
                     
               </RSNCODEMNT>
       </xsl:template>
       
       <xsl:template match="ACTION">
               <xsl:param name="ModuleCode" select="."/>
               <xsl:param name="wfType" select="."/>
               <WFACTION ID="{position()}" Type="MULTIPLE">
                     <TXT_ACTION_SNO><xsl:value-of select="position()"/></TXT_ACTION_SNO>
                     <TXT_ACTCODE><xsl:value-of select="."/></TXT_ACTCODE>
                     <TXT_LABELID>
                            <xsl:variable name="ActCode" select="."/>
                            <xsl:call-template name="str:to-lower">
                                  <xsl:with-param name="text">
                                          <xsl:value-of select="concat('LBL__',$ModuleCode,$MasterXmlName,$wfType,'__',$ActCode)"/>
                                   </xsl:with-param>
                            </xsl:call-template>
                     </TXT_LABELID>
                     <TXT_LABELVALUE>
                            <xsl:value-of select="."/>
                     </TXT_LABELVALUE>
                     <TXT_DEFVALUE>
                            <xsl:value-of select="."/>
                     </TXT_DEFVALUE>
                     
               </WFACTION>
       </xsl:template>
       
       <!--       
       <xsl:template match="WORKFLOW">
          <xsl:variable name="wfType" select="@TYPE"/>
          <xsl:for-each select="STAGES/STAGE">
            <WORKFLOW ID="{position()}" Type="MULTIPLE">
              <TXT_SEQ_NO><xsl:value-of select="position()"/></TXT_SEQ_NO>
              <TXT_WF_TYPE><xsl:value-of select="$wfType"/></TXT_WF_TYPE>
              <SEL_TYPE>S</SEL_TYPE>
              <TXT_NAME><xsl:value-of select="."/></TXT_NAME>
              <TXT_LBLID>
                  <xsl:call-template name="str:to-lower">
                      <xsl:with-param name="text">
                        <xsl:value-of select="concat('LBL__',$wfType,'__','STAGE','__',.)"/>
                      </xsl:with-param>
                  </xsl:call-template>                  
              </TXT_LBLID>
              <TXT_LBLVAL>
                  <xsl:call-template name="str:to-lower">
                      <xsl:with-param name="text">
                        <xsl:value-of select="."/>
                      </xsl:with-param>
                  </xsl:call-template>                  
              </TXT_LBLVAL>
            </WORKFLOW>
          </xsl:for-each>
         
          <xsl:for-each select="REASONCODES/REASON_CODE">
            <WORKFLOW ID="{position()}" Type="MULTIPLE">
              <TXT_SEQ_NO><xsl:value-of select="position()"/></TXT_SEQ_NO>
              <TXT_WF_TYPE><xsl:value-of select="$wfType"/></TXT_WF_TYPE>
              <SEL_TYPE>R</SEL_TYPE>
              <TXT_NAME><xsl:value-of select="."/></TXT_NAME>
              <TXT_LBLID>
                <xsl:call-template name="str:to-lower">
                      <xsl:with-param name="text">
                        <xsl:value-of select="concat('LBL__',$wfType,'__','REASON_CODE','__',.)"/>
                      </xsl:with-param>
                </xsl:call-template>                
              </TXT_LBLID>
              <TXT_LBLVAL>
                  <xsl:call-template name="str:to-lower">
                      <xsl:with-param name="text">
                        <xsl:value-of select="."/>
                      </xsl:with-param>
                  </xsl:call-template>                  
              </TXT_LBLVAL>
            </WORKFLOW>
          </xsl:for-each>
          
          <xsl:for-each select="ACTIONS/ACTION">
            <WORKFLOW ID="{position()}" Type="MULTIPLE">
              <TXT_SEQ_NO><xsl:value-of select="position()"/></TXT_SEQ_NO>
              <TXT_WF_TYPE><xsl:value-of select="$wfType"/></TXT_WF_TYPE>
              <SEL_TYPE>A</SEL_TYPE>
              <TXT_NAME><xsl:value-of select="."/></TXT_NAME>
              <TXT_LBLID>
                <xsl:call-template name="str:to-lower">
                      <xsl:with-param name="text">
                        <xsl:value-of select="concat('LBL__',$wfType,'__','ACTION','__',.)"/>                  
                      </xsl:with-param>
                </xsl:call-template>
              </TXT_LBLID>
              <TXT_LBLVAL>
                  <xsl:call-template name="str:to-lower">
                      <xsl:with-param name="text">
                        <xsl:value-of select="."/>
                      </xsl:with-param>
                  </xsl:call-template>                  
              </TXT_LBLVAL>
            </WORKFLOW>
          </xsl:for-each>
         
       </xsl:template>
       !-->
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
       <!-- handler to replace undescore characters -->
       <xsl:template name="str:replace">
              <xsl:param name="text"/>
              <xsl:variable name="lcletters">abcdefghijklmnopqrstuvwxyz </xsl:variable>
              <xsl:variable name="ucletters">ABCDEFGHIJKLMNOPQRSTUVWXYZ_</xsl:variable>
              <xsl:value-of select="translate($text, $ucletters, $lcletters)"/>
       </xsl:template>
       <xsl:template name="str:to-upper">
              <xsl:param name="text"/>
              <xsl:variable name="lcletters">abcdefghijklmnopqrstuvwxyz </xsl:variable>
              <xsl:variable name="ucletters">ABCDEFGHIJKLMNOPQRSTUVWXYZ</xsl:variable>
              <xsl:value-of select="translate($text,  $lcletters , $ucletters)"/>
       </xsl:template>
       
</xsl:stylesheet>
