<?xml version ="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:str="http://www.w3.org/1999/XSL/Transform"
                xml:space="default">
  <xsl:output method="xml" indent="yes" cdata-section-elements="LABEL PAGE TXT_QRY_COL TXT_REDN_FLD_LBL"/>
  <xsl:param name="Language"/>
  <!--
  <xsl:variable name = "EngorOther">
    <xsl:if test = "$Language = 'English'">
      <xsl:value-of select = 'TXT_LABELVALUE'/>
    </xsl:if>
    <xsl:if test = "$Language != 'English'">
      <xsl:value-of select = 'TXT_DEFVALUE'/>
    </xsl:if>
    
    
  </xsl:variable>
  -->
  <xsl:variable name = "EngorOther">
      <xsl:value-of select = 'TXT_LABELVALUE'/>
  </xsl:variable>
  
  <xsl:template match="/LABELS_MAIN">
    <LABELS LANG="{TXT_LANGUAGE}">
      <xsl:apply-templates select="COMMONS"/>
      <xsl:apply-templates select="MODULE_DETAILS"/>
      <xsl:for-each select="CUSTOMLABELS/TXT_FUNCTIONID[not(.=preceding::TXT_FUNCTIONID)]">
        <xsl:variable name="test" select="."/>
        <FUNCTION ID="{position()}" NAME="{$test}">
          <xsl:apply-templates select="//CUSTOMLABELS[TXT_FUNCTIONID = $test]">
          </xsl:apply-templates>
        </FUNCTION>
      </xsl:for-each>
    </LABELS>
  </xsl:template>
  <xsl:template match="COMMONS">
    <xsl:variable name="CommonLabel">
      <xsl:call-template name="str:to-lower">
        <xsl:with-param name="text">
          <xsl:value-of select="./TXT_LABELID"/>
        </xsl:with-param>
      </xsl:call-template>
    </xsl:variable>
    <COMMONS ID="{@ID}" LABELID="{$CommonLabel}">
      <xsl:value-of select="TXT_LABELVALUE"/>
    </COMMONS>
  </xsl:template>
  <xsl:template match="CUSTOMLABELS">
   
      <xsl:for-each select = "LBL_VALUE">

        <xsl:variable name="CustomLabel">
          <xsl:call-template name="str:to-lower">
            <xsl:with-param name="text">
              <xsl:value-of select="./TXT_LABELID"/>
            </xsl:with-param>
          </xsl:call-template>
        </xsl:variable>
      
      <LABEL ID="{$CustomLabel}">
        <xsl:value-of select="TXT_LABELVAL"/>
      </LABEL>
     </xsl:for-each> 
   
    
  </xsl:template>
  <xsl:template match="MODULE_DETAILS">
    <MODULE_DETAILS ID="{@ID}" MODULE_CODE="{TXT_MODULE_CODE}">
      <MODULE_NAME>
        <xsl:value-of select="TXT_MODULE_NAME"/>
      </MODULE_NAME>
      <!-- Kals 
      <xsl:apply-templates select="SCREENS">
        
        <xsl:with-param name="moduleId">
          <xsl:value-of select="TXT_MODULE_CODE"/>
        </xsl:with-param>
        -->
    	<xsl:variable name = "Mcode" select = "TXT_MODULE_CODE"></xsl:variable>
      <xsl:variable name = "MName" select = "TXT_MODULE_NAME"></xsl:variable>
      <xsl:variable name = "tempMCode">
        <xsl:if test ="$Mcode != ''">
            <xsl:value-of select = "concat($Mcode , '__')"/>                        
         </xsl:if>
        <xsl:if test ="$Mcode = ''">
            <xsl:value-of select = "''"/>
         </xsl:if>
      </xsl:variable>
    <xsl:variable name  = "moduleIdMast_Name">
          <xsl:value-of select = "concat($tempMCode , $MName , '__')"/>
    </xsl:variable>
    
    <xsl:apply-templates select="SCREENS">
        <xsl:with-param name="moduleId">
          <xsl:value-of select="$moduleIdMast_Name"/>
        </xsl:with-param>
      </xsl:apply-templates>
 
      <xsl:apply-templates select="BLOCKS">      
        <xsl:with-param name="moduleId">
          <xsl:value-of select="$tempMCode"/>
        </xsl:with-param>
      </xsl:apply-templates>
      
      <xsl:apply-templates select="STANDARDBUTTONS">
        <xsl:with-param name="moduleId">
          <xsl:value-of select="$moduleIdMast_Name"/>
        </xsl:with-param>
      </xsl:apply-templates>
      <xsl:apply-templates select="WORKFLOW">
        <xsl:with-param name="moduleId">
          <xsl:value-of select="$moduleIdMast_Name"/>
        </xsl:with-param>
      </xsl:apply-templates>
      
    </MODULE_DETAILS>
  </xsl:template>
  <xsl:template match="SCREENS">
    <xsl:param name="moduleId" select="."/>
    <xsl:variable name="scrId-case">
      <xsl:call-template name="str:to-lower">
        <xsl:with-param name="text">
          <xsl:value-of select="concat('LBL__',$moduleId,TXT_SCREENID)"/>
        </xsl:with-param>
      </xsl:call-template>
    </xsl:variable>
    <SCREEN NAME="{TXT_SCREENID}" TYPE="{./TXT_SCREENTYPE}">
      <xsl:if test="TXT_LABELID = $scrId-case">
        <LABEL ID="">
          <xsl:value-of select="./TXT_LABELVALUE"/>
        </LABEL>
      </xsl:if>
      <xsl:if test="TXT_LABELID != $scrId-case ">
        <xsl:variable name="ScrId_LC">
          <xsl:call-template name="str:to-lower">
            <xsl:with-param name="text">
              <xsl:value-of select="./TXT_LABELID"/>
            </xsl:with-param>
          </xsl:call-template>
        </xsl:variable>
        <LABEL ID="{$ScrId_LC}">
         <!-- <xsl:value-of select="./TXT_LABELVALUE"/> -->
        </LABEL>
      </xsl:if>  
      <xsl:if test="count(TABPAGES) &gt; 0">
        <xsl:variable name="scrId" select="TXT_SCREENID"/>
        <TABS>
          <xsl:for-each select="TABPAGES">
            <xsl:variable name="tabLblId-case">
              <xsl:call-template name="str:to-lower">
                <xsl:with-param name="text">
                  <xsl:value-of select="concat('LBL__',$moduleId,$scrId,'__',TXT_TABPAGEID)"/>
                </xsl:with-param>
              </xsl:call-template>
            </xsl:variable>
            <xsl:if test="TXT_LABEL = $tabLblId-case">
              <PAGE ID="{./TXT_TABPAGEID}" LBL_ID="">
                <xsl:value-of select="./TXT_TABLABELVALUE"/>
              </PAGE>
            </xsl:if>
            <xsl:if test="TXT_LABEL != $tabLblId-case ">
              <xsl:variable name="PageID_LC">
                <xsl:call-template name="str:to-lower">
                  <xsl:with-param name="text">
                    <xsl:value-of select="./TXT_LABEL"/>
                  </xsl:with-param>
                </xsl:call-template>
              </xsl:variable>
              <PAGE ID="{./TXT_TABPAGEID}" LBL_ID="{$PageID_LC}">
              </PAGE>
            </xsl:if>
          </xsl:for-each>
          
        </TABS>
      </xsl:if>
    </SCREEN>
  </xsl:template>
  <xsl:template match="BLOCKS">
    <xsl:param name="moduleId" select="."/>
    <xsl:variable name="blkId" select="TXT_BLOCK_ID"/>
    <xsl:variable name = "blkId_UC">
      <xsl:call-template name = "str:to-upper">
        <xsl:with-param name = "text" select = "./TXT_BLOCK_ID"/>
      </xsl:call-template>      
    </xsl:variable>
    <!-- Reddy Prasad -->
      <xsl:variable name="blkId-case">   
      <xsl:call-template name="str:to-lower">
        <xsl:with-param name="text">
          <xsl:value-of select="concat('LBL__',$moduleId,TXT_BLOCK_ID)"/>
        </xsl:with-param>
      </xsl:call-template>
    </xsl:variable>
    <!-- Reddy Prasad-->
    <BLOCK ID="{$blkId_UC}">
    <!--  Reddy Prasad -->
        <xsl:if test="TXT_BLKLABEL = $blkId-case">
        <LABEL ID="">
          <xsl:value-of select="./TXT_BLKLABELVALUE"/>
        </LABEL>
      </xsl:if>
      <xsl:if test="TXT_BLKLABEL != $blkId-case ">
        <xsl:variable name="BlkId_LC">
          <xsl:call-template name="str:to-lower">
            <xsl:with-param name="text">
              <xsl:value-of select="./TXT_BLKLABEL"/>
            </xsl:with-param>
          </xsl:call-template>
        </xsl:variable>
        <LABEL ID="{$BlkId_LC}">
         <!-- <xsl:value-of select="./TXT_BLKLABELVALUE"/> -->
        </LABEL>
      </xsl:if>
      
    <!-- Reddy Prasad-->
      <xsl:for-each select="FIELDS">
        <xsl:variable name="fldLbl-case">
          <xsl:call-template name="str:to-lower">
            <xsl:with-param name="text">
              <xsl:value-of select="concat('LBL__',$moduleId,$blkId,'__',TXT_FIELDNAME)"/>
            </xsl:with-param>
          </xsl:call-template>
        </xsl:variable>
        
    <xsl:variable name = "FldName_UC">
      <xsl:call-template name = "str:to-upper">
        <xsl:with-param name = "text" select = "./TXT_FIELDNAME"/>
      </xsl:call-template>
      </xsl:variable>

        <!-- <FIELD NAME="{$FldName_UC}" TYPE="{./SEl_FIELD_TYPE}"> -->
        <FIELD NAME="{$FldName_UC}" TYPE="{./TXT_FIELD_TYPE}">
          <xsl:if test="TXT_FIELDLABEL = $fldLbl-case">
            <LABEL ID="">
              <xsl:value-of select="./TXT_FIELDLABELVALUE"/>
            </LABEL>
          </xsl:if>
          <xsl:if test="TXT_FIELDLABEL != $fldLbl-case ">
            <xsl:variable name="FldLbl_LC">
              <xsl:call-template name="str:to-lower">
                <xsl:with-param name="text">
                  <xsl:value-of select="TXT_FIELDLABEL"/>
                </xsl:with-param>
              </xsl:call-template>
            </xsl:variable>
            <LABEL ID="{$FldLbl_LC}">
               <!-- <xsl:value-of select="./TXT_FIELDLABELVALUE"/> -->
            </LABEL>
          </xsl:if>
          <xsl:variable name="fldName" select="TXT_FIELDNAME"/>
          <xsl:if test="./TXT_FIELD_TYPE = 'SELECT' and count(FIELDS_SELECT) &gt; 0">
            <xsl:for-each select="FIELDS_SELECT">
              <xsl:variable name="otpLbl-case">
                <xsl:call-template name="str:to-lower">
                  <xsl:with-param name="text">
                    <xsl:value-of select="concat('LBL__',$moduleId,$blkId,'__',$fldName,'__',TXT_OPT_VALUE)"/>
                  </xsl:with-param>
                </xsl:call-template>
              </xsl:variable>
              <xsl:if test="TXT_LABELID = $otpLbl-case">
                <OPTION VALUE="{./TXT_OPT_VALUE}" LBL_ID="">
                  <xsl:value-of select="./TXT_LABELVALUE"/>
                </OPTION>
              </xsl:if>
              <xsl:if test="TXT_LABELID != $otpLbl-case ">
                  <xsl:variable name="OptLblId_LC">
                  <xsl:call-template name="str:to-lower">
                    <xsl:with-param name="text">
                      <xsl:value-of select="./TXT_LABELID"/>
                    </xsl:with-param>
                  </xsl:call-template>
                </xsl:variable>
                <OPTION VALUE="{./TXT_OPT_VALUE}" LBL_ID="{$OptLblId_LC}"></OPTION>
              </xsl:if>
              
            </xsl:for-each>
            
          </xsl:if>
          
          <!--Do the same for radio..-->
          <xsl:if test="./TXT_FIELD_TYPE = 'RADIO' and count(FIELDS_RADIO) &gt; 0">
            <xsl:for-each select="FIELDS_RADIO">
              <xsl:variable name="RadLbl-case">
                <xsl:call-template name="str:to-lower">
                  <xsl:with-param name="text">
                    <xsl:value-of select="concat('LBL__',$moduleId, $blkId,'__',$fldName,'__',TXT_OPT_VALUE)"/>
                  </xsl:with-param>
                </xsl:call-template>
              </xsl:variable>
              <xsl:if test="TXT_LABELID = $RadLbl-case">
                <OPTION VALUE="{./TXT_OPT_VALUE}" LBL_ID="">
                  <xsl:value-of select="./TXT_LABELVALUE"/>
                </OPTION>
              </xsl:if>
              <xsl:if test="TXT_LABELID != $RadLbl-case  ">
              <xsl:variable name="RadLblId_LC">
                <xsl:call-template name="str:to-lower">
                  <xsl:with-param name="text">
                    <xsl:value-of select="./TXT_LABELID"/>
                  </xsl:with-param>
                </xsl:call-template>
              </xsl:variable>
              
                <OPTION VALUE="{./TXT_OPT_VALUE}" LBL_ID="{$RadLblId_LC}"></OPTION>
              </xsl:if>
            </xsl:for-each>
          </xsl:if>
          <xsl:if test="./TXT_FIELD_TYPE = 'LOV' and count(FIELDS_LOV) &gt; 0">
            <xsl:for-each select="FIELDS_LOV">
              <xsl:variable name="lovLbl-case">
                <xsl:call-template name="str:to-lower">
                  <xsl:with-param name="text">
                    <!--<xsl:value-of select="concat('LBL','__',$moduleId,'__',$blkId,'__',$fldName,'__',@ID)"/>-->
                    <xsl:value-of select="concat('LBL__',$moduleId,$blkId,'__',$fldName,'__',@ID)"/>
                    <!-- <xsl:value-of select="concat('LBL__',$moduleId,'__',$blkId,'__',$fldName,'_',@ID)"/> -->
                  </xsl:with-param>
                </xsl:call-template>
              </xsl:variable>               
              <LOV ID="{@ID}" TYPE="{./TXT_LOV_TYPE}">
                <xsl:if test="TXT_LABEL_LOV = $lovLbl-case">                
                  <LABEL ID=""> 
                    <xsl:value-of select="./TXT_TITLE_LOV"/>                     
                  </LABEL>
                </xsl:if>
                <xsl:if test="TXT_LABEL_LOV != $lovLbl-case ">                
                  <xsl:variable name="LovID_LC">
                    <xsl:call-template name="str:to-lower">
                      <xsl:with-param name="text">
                        <xsl:value-of select="./TXT_LABEL_LOV"/>
                      </xsl:with-param>
                    </xsl:call-template>
                  </xsl:variable>
                  <LABEL ID="{$LovID_LC}">
                      <!-- <xsl:value-of select="./TXT_TITLE_LOV"/>  -->
                  </LABEL>
                </xsl:if>
                <xsl:if test="count(FIELDS_LOV_QRYCOLS) &gt; 0">
                  <xsl:for-each select="FIELDS_LOV_QRYCOLS">
                    <xsl:variable name="colHeadLbl-case">
                      <xsl:call-template name="str:to-lower">
                        <xsl:with-param name="text">
                          <xsl:value-of select="concat('LBL__',$moduleId,$blkId,'__',$fldName,'__',../@ID,'__',TXT_QRY_COL)"/>
                        </xsl:with-param>
                      </xsl:call-template>
                    </xsl:variable>                    
                    <FIELDS_LOV_QRYCOLS ID="{@ID}">
                      <xsl:if test="TXT_LBL_COL_HEADING = $colHeadLbl-case">
                        <TXT_QRY_COL NAME="{./TXT_QRY_COL}" LBL_ID="">
                          <xsl:value-of select="./TXT_COL_HEADING"/>
                        </TXT_QRY_COL>
                      </xsl:if>
                      <xsl:if test="TXT_LBL_COL_HEADING != $colHeadLbl-case ">
                        <xsl:variable name="LovQryColHeadId_LC">
                          <xsl:call-template name="str:to-lower">
                            <xsl:with-param name="text">
                              <xsl:value-of select="./TXT_LBL_COL_HEADING"/>
                            </xsl:with-param>
                          </xsl:call-template>
                        </xsl:variable>
                        <TXT_QRY_COL NAME="{./TXT_QRY_COL}"
                                     LBL_ID="{$LovQryColHeadId_LC}">
                                     <!--<xsl:value-of select="./TXT_COL_HEADING"/> -->
                        </TXT_QRY_COL>
                      </xsl:if>
                    </FIELDS_LOV_QRYCOLS>
                  </xsl:for-each>
                </xsl:if>
              </LOV>
            </xsl:for-each>
          </xsl:if>
        </FIELD>
      </xsl:for-each>
    </BLOCK>
  </xsl:template>
  <xsl:template match="STANDARDBUTTONS">
    <xsl:param name="moduleId" select="."/>
    <xsl:variable name="scrId" select="TXT_SCR_NAME"/>
    <xsl:if test="count(STDBUTTONS) &gt; 0">
      <BLOCK ID="BLK_STDBUTTONS" SCREEN="{$scrId}">
        <xsl:for-each select="STDBUTTONS">
          <xsl:variable name="stdBtnLbl-case">
            <xsl:call-template name="str:to-lower">
              <xsl:with-param name="text">
                <!--<xsl:value-of select="concat('LBL','__',$moduleId,'__','BLK_STDBUTTONS','__',TXT_BTN_NAME)"/>-->
                <xsl:value-of select="concat('LBL__',$moduleId,$scrId,'__',TXT_BTN_NAME)"/>
              </xsl:with-param>
            </xsl:call-template>
          </xsl:variable>
          <FIELD NAME="{TXT_BTN_NAME}" TYPE="BUTTON">
            <xsl:if test="TXT_BTN_LBLID = $stdBtnLbl-case">
              <LABEL ID="">
                <xsl:value-of select="TXT_BTN_LBLVAL"/>
              </LABEL>
            </xsl:if>
            <xsl:variable name="BtnID_LC">
              <xsl:call-template name="str:to-lower">
                <xsl:with-param name="text">
                  <xsl:value-of select="./TXT_BTN_LBLID"/>
                </xsl:with-param>
              </xsl:call-template>
            </xsl:variable>
            <xsl:if test="TXT_BTN_LBLID != $stdBtnLbl-case ">
              <LABEL ID="{$BtnID_LC}">
                 
              </LABEL>
            </xsl:if>
          </FIELD>
        </xsl:for-each>
      </BLOCK>
    </xsl:if>
    <xsl:if test="count(CSTBUTTONS) &gt; 0">
      <BLOCK ID="BLK_CST_BUTTONS" SCREEN="{$scrId}">
        <xsl:for-each select="CSTBUTTONS">
          <xsl:variable name="cstBtnLbl-case">
            <xsl:call-template name="str:to-lower">
              <xsl:with-param name="text">
                <!--<xsl:value-of select="concat('LBL','__',$moduleId,'__','BLK_CSTBUTTONS','__',TXT_BTN_NAME)"/>-->
                <xsl:value-of select="concat('LBL__',$moduleId,$scrId,'__',TXT_BTN_NAME)"/>
              </xsl:with-param>
            </xsl:call-template>
          </xsl:variable>
          <FIELD NAME="{TXT_BTN_NAME}" TYPE="BUTTON">
            <xsl:if test="TXT_BTN_LBLID = $cstBtnLbl-case">
              <LABEL ID="">
                <xsl:value-of select="TXT_BTN_LBLVAL"/>
              </LABEL>
            </xsl:if>
            <xsl:variable name="CstBtnID_LC">
              <xsl:call-template name="str:to-lower">
                <xsl:with-param name="text">
                  <xsl:value-of select="TXT_BTN_LBLID"/>
                </xsl:with-param>
              </xsl:call-template>
            </xsl:variable>
            <xsl:if test="TXT_BTN_LBLID != $cstBtnLbl-case  ">
              <LABEL ID="{$CstBtnID_LC}">
                
              </LABEL>
            </xsl:if>
          </FIELD>
        </xsl:for-each>
      </BLOCK>
    </xsl:if>
  </xsl:template>
  <xsl:template match="WORKFLOW">
    <xsl:param name="moduleId" select="."/>
    <WORKFLOW TYPE="{TXT_WF_TYPE}">
      <xsl:variable name="wf_type" select="TXT_WF_TYPE"/>
      <xsl:variable name="cmp_wf_lbl-case">
        <xsl:call-template name="str:to-lower">
          <xsl:with-param name="text">
            <xsl:value-of select="concat('LBL__',$moduleId,$wf_type)"/>
          </xsl:with-param>
        </xsl:call-template>
      </xsl:variable>
      <xsl:if test="TXT_LBLID = $cmp_wf_lbl-case">
        <LABEL ID="">
          <xsl:value-of select="TXT_LBLVAL"/>
        </LABEL>
      </xsl:if>
      <xsl:variable name="WfLblID_LC">
        <xsl:call-template name="str:to-lower">
          <xsl:with-param name="text">
            <xsl:value-of select="TXT_LBLID"/>
          </xsl:with-param>
        </xsl:call-template>
      </xsl:variable>
      <xsl:if test="./TXT_LBLID != $cmp_wf_lbl-case ">
        <LABEL ID="{$WfLblID_LC}">
           
        </LABEL>
      </xsl:if>
      <xsl:for-each select="STGDESC">
        <xsl:variable name="StageDesc" select="TXT_STG_TYPE"/>
        <xsl:variable name="cmp_Stg_lbl-case">
          <xsl:call-template name="str:to-lower">
            <xsl:with-param name="text">
              <xsl:value-of select="concat('LBL__',$moduleId,$wf_type,'__',$StageDesc)"/>
            </xsl:with-param>
          </xsl:call-template>
        </xsl:variable>
        <STGDESC TYPE="{TXT_STG_TYPE}">
          <xsl:if test="TXT_LABELID = $cmp_Stg_lbl-case">
            <LABEL ID="">
              <xsl:value-of select="TXT_LABELVALUE"/>
            </LABEL>
          </xsl:if>
          <xsl:if test="TXT_LABELID != $cmp_Stg_lbl-case ">
            <xsl:variable name="WfStgDscID_LC">
              <xsl:call-template name="str:to-lower">
                <xsl:with-param name="text">
                  <xsl:value-of select="TXT_LABELID"/>
                </xsl:with-param>
              </xsl:call-template>
            </xsl:variable>
            <LABEL ID="{$WfStgDscID_LC}">
             <!-- <xsl:value-of select="TXT_LABELVALUE"/> -->
            </LABEL>
          </xsl:if>
        </STGDESC>
      </xsl:for-each>
      <xsl:for-each select="RSNCODEMNT">
        <xsl:variable name="RsnCode" select="TXT_RSNCODE"/>
        <xsl:variable name="cmp_Rsn_lbl-case">
          <xsl:call-template name="str:to-lower">
            <xsl:with-param name="text">
              <xsl:value-of select="concat('LBL__',$moduleId,$wf_type,'__',$RsnCode)"/>
            </xsl:with-param>
          </xsl:call-template>
        </xsl:variable>
        <RSNCODEMNT TYPE="{TXT_RSNCODE}">
          <xsl:if test="TXT_LABELID = $cmp_Rsn_lbl-case">
            <LABEL ID="">
              <xsl:value-of select="TXT_LABELVALUE"/>
            </LABEL>
          </xsl:if>
          <xsl:if test="TXT_LABELID != $cmp_Rsn_lbl-case ">
            <xsl:variable name="RsnCodeID_LC">
              <xsl:call-template name="str:to-lower">
                <xsl:with-param name="text">
                  <xsl:value-of select="TXT_LABELID"/>
                </xsl:with-param>
              </xsl:call-template>
            </xsl:variable>
            <LABEL ID="{$RsnCodeID_LC}">
                <!-- <xsl:value-of select="TXT_LABELVALUE"/> -->
            </LABEL>
          </xsl:if>
        </RSNCODEMNT>
      </xsl:for-each>
      <xsl:for-each select="WFACTION">
        <xsl:variable name="WfAction" select="TXT_ACTCODE"/>
        <xsl:variable name="cmp_Act_lbl-case">
          <xsl:call-template name="str:to-lower">
            <xsl:with-param name="text">
              <xsl:value-of select="concat('LBL__',$moduleId,$wf_type,'__',$WfAction)"/>
            </xsl:with-param>
          </xsl:call-template>
        </xsl:variable>
        <WFACTION TYPE="{TXT_ACTCODE}">
          <xsl:if test="TXT_LABELID = $cmp_Act_lbl-case">
            <LABEL ID="">
              <xsl:value-of select="TXT_LABELVALUE"/>
            </LABEL>
          </xsl:if>
          <xsl:if test="TXT_LABELID != $cmp_Act_lbl-case ">
            <xsl:variable name="ActnCodeID_LC">
              <xsl:call-template name="str:to-lower">
                <xsl:with-param name="text">
                  <xsl:value-of select="TXT_LABELID"/>
                </xsl:with-param>
              </xsl:call-template>
            </xsl:variable>
            <LABEL ID="{$ActnCodeID_LC}">
                 <!-- <xsl:value-of select="TXT_LABELVALUE"/> -->
            </LABEL>
          </xsl:if>
        </WFACTION>
      </xsl:for-each>
    </WORKFLOW>
  </xsl:template>
  <!-- Template to convert to lower case -->
  <xsl:template name="str:to-lower">
    <xsl:param name="text"/>
    <xsl:variable name="lcletters">abcdefghijklmnopqrstuvwxyz</xsl:variable>
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
