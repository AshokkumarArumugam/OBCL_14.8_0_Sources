<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
       <!-- Takes care of features common in Audit Bar for Absolute/Column Positioning -->
       <xsl:variable name = "Brn_Neo" select = "normalize-space(//FORM/@MASTER)"/> 
       
       
       
       <xsl:template name="Audit">
              <xsl:variable name="auditId"
                            select="/FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/ID"/>
              <!--checking weather the uixml has the audit entry or not-->
              
            <!-- Kals for Call Form Buttons -->
            <xsl:if test = "$Brn_Neo = ''">
              <xsl:if test="count(//*[name() = 'SCREEN' and @NAME =  $screen]/*[name() ='SUBSCREEN']/FORM) &gt; 0">
                  <xsl:call-template name = "shwCallFmrsBtns"></xsl:call-template>
              </xsl:if>
            </xsl:if>
  
              <DIV CLASS="DivAudit" id="DIV_{$auditId}"
                   style="width:{$gWidth}px;">
                     
                     <xsl:if test="count(/FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']) = 0 and ($gBlkButCount &gt; 0 or $gBlkButImgCount &gt; 0)">
                        <xsl:attribute name="id"><xsl:text>DIV_AUDIT_BUTTONS</xsl:text></xsl:attribute>                        
                     </xsl:if>

                      <xsl:call-template name="AuditAbs_Pos_Handler"/>
                      
                     <TABLE cellpadding="1" cellspacing="0"
                            summary="Audit information" border="0"
                            style="width:100%" DBT="{/FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/DBT}">
                            <TR >
                                   <xsl:if test="count(/FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']) &gt; 0">
                                   <!-- Kals Apr 24 .. Calling Neo template .. Shud switch to appropriate tmplt based on Brn or Neo-->
                                   <xsl:if test = "$Brn_Neo = ''"> 
                                      <xsl:variable name = "AuditType">
                                        <xsl:value-of select = "/FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/TYPE"/>
                                      </xsl:variable>
                                      
                                      <xsl:if test = "$AuditType = 'M'">
                                          <xsl:apply-templates select="/FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']"
                                                               mode="AuditEntry_Neo"/>
                                     </xsl:if>                           
                                     
                                      <xsl:if test = "$AuditType = 'T'">
                                          <xsl:apply-templates select="/FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']"
                                                               mode="AuditEntry_Neo_Online"/>
                                     </xsl:if>                           
                                  </xsl:if>                           
                                     
                                   <xsl:if test = "$Brn_Neo != ''">
                                          <xsl:apply-templates select="/FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']"
                                                               mode="AuditEntry"/>
                                   </xsl:if>                          
                                   <!-- Kals Ends -->  
                                                               
                                   </xsl:if>
                                   <xsl:if test="count(/FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']) = 0">
                                          <td style="width:95%">
                                                 <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
                                          </td>
                                   </xsl:if>
                                   <xsl:call-template name="StdBtnEntry"/>
                            </TR>
                     </TABLE>
              </DIV>
              
              
              <xsl:if test = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/TYPE = 'T'">
                <xsl:call-template name = "CacheAuditValues"/>
              </xsl:if>
              
              
       </xsl:template>
       
       
       <xsl:template match="BLOCK" mode="AuditEntry">
              <td CLASS="THEADAudit" style="width:95%">
                     <TABLE CLASS="TABLEAudit" DBT="{DBT}" summary=""
                            cellpadding="0" cellspacing="0" border="0"
                            style="width:500px;">
                            <TR CLASS="TRAudit">
                                   <TD CLASS="TDAudit">
                                          <NOBR>
                                                 <LABEL CLASS="LABELNormal">Input By</LABEL>
                                          </NOBR>
                                   </TD>
                                   <TD CLASS="fieldAudit">
                                          <NOBR>
                                                 <INPUT TYPE="TEXT"
                                                        CLASS="TEXTAudit"
                                                        name="MAKER_ID"
                                                        id="{DBT}__MAKER_ID"
                                                        DBT="{DBT}"
                                                        DBC="MAKER_ID"
                                                        READONLY="true"
                                                        MAXLENGTH="12" SIZE="12"/>
                                                        <!-- Kals June 4 Making the size 13 SIZE="8" -->
                                          </NOBR>
                                   </TD>
                                   <TD CLASS="TDAudit">
                                          <NOBR>
                                                 <LABEL CLASS="LABELNormal">Date Time</LABEL>
                                          </NOBR>
                                   </TD>
                                   <TD CLASS="fieldAudit">
                                          <NOBR>
                                                 <INPUT TYPE="TEXT"
                                                        CLASS="TEXTAudit"
                                                        name="MAKER_DT_STAMP"
                                                        id="{DBT}__MAKER_DT_STAMP"
                                                        DBT="{DBT}"
                                                        DBC="MAKER_DT_STAMP"
                                                        READONLY="true"
                                                        MAXLENGTH="19" SIZE="20"/>
                                          </NOBR>
                                   </TD>
                                   <TD style="width:95%"> 
                                   		<xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
                                   </TD>
                            </TR>
                            <TR CLASS="TRAudit">
                                    <TD CLASS="TDAudit">
                                          <NOBR>
                                                 <LABEL CLASS="LABELNormal">Authorized By</LABEL>
                                          </NOBR>
                                   </TD>
                                   <TD CLASS="fieldAudit">
                                          <NOBR>
                                                 <INPUT TYPE="TEXT"
                                                        CLASS="TEXTAudit"
                                                        name="CHECKER_ID"
                                                        id="{DBT}__CHECKER_ID"
                                                        DBT="{DBT}"
                                                        DBC="CHECKER_ID"
                                                        READONLY="true"
                                                        MAXLENGTH="12" SIZE="12"/>
                                                        <!-- Kals June 4 Making the size 13 SIZE="8" -->
                                                        
                                          </NOBR>
                                   </TD>
                                   <TD CLASS="TDAudit">
                                          <NOBR>
                                                 <LABEL CLASS="LABELNormal">Date Time</LABEL>
                                          </NOBR>
                                   </TD>
                                   <TD CLASS="fieldAudit">
                                          <NOBR>
                                                 <INPUT TYPE="TEXT"
                                                        CLASS="TEXTAudit"
                                                        name="CHECKER_DT_STAMP"
                                                        id="{DBT}__CHECKER_DT_STAMP"
                                                        DBT="{DBT}"
                                                        DBC="CHECKER_DT_STAMP"
                                                        READONLY="true"
                                                        MAXLENGTH="19" SIZE="20"/>
                                          </NOBR>
                                   </TD>
                                   <TD style="width:95%"> 
                                   		<xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
                                   </TD>
                                   
                            </TR>
                     </TABLE>
              </td>
       </xsl:template>
       
       
       <xsl:template name="StdBtnEntry">
       
              <xsl:if test="$gBlkButCount &gt; 0">
                     <TD class="TableTdAuditMain" align="right">
                            <xsl:apply-templates select="/FORM/BLOCK[@SCREEN=$screen and ID='BLK_STD_BUTTONS']"
                                                 mode="BlockStdButtons"/>
                     </TD>
              </xsl:if>
              <xsl:if test="$gBlkButImgCount &gt; 0">
                     <TD class="TableTdAuditMain" align="right">
                            <xsl:apply-templates select="/FORM/BLOCK[@SCREEN=$screen and ID='BLK_STD_BUTTONS_IMG']"
                                                 mode="BlockStdButtonsImg"/>
                     </TD>
              </xsl:if>
       </xsl:template>
       
       
       <!-- Block Buttons Handler added by yugandhar-->
       <xsl:template match="BLOCK" mode="BlockStdButtonsImg">
              <NOBR>
                     <DIV CLASS="DivStdButtonImg">
                            <TABLE border="0" cellpadding="0" cellspacing="2"
                                   summary="Button container">
                                   <TR>
                                          <TD>
                                                 <input Type="reset"
                                                        style="visibility:HIDDEN;width:1px;height:1px"
                                                        id="id_reset_1"/>
                                          </TD>
                                          <xsl:for-each select="./FIELD/TYPE[text()='BUTTON']">
                                                 <TD CLASS="TDstdButtonImg"
                                                     align="right">
                                                        <xsl:call-template name="dispStdButtonField_img"/>
                                                 </TD>
                                          </xsl:for-each>
                                   </TR>
                            </TABLE>
                     </DIV>
              </NOBR>
       </xsl:template>
       <!-- Block Buttons Handler added by yugandhar-->
       <xsl:template match="BLOCK" mode="BlockStdButtons">
              <xsl:variable name="fldCnt"
                            select="count(./FIELD/TYPE[text()='BUTTON'])"/>
              <DIV CLASS="DivStdButton">
                     <TABLE CLASS="TABLEstdButton" border="0" cellpadding="1"
                            summary="Button container" cellspacing="1">
                            <xsl:if test="$fldCnt &lt; 3">
                                   <tr CLASS="TRstdButton">
                                          <xsl:for-each select="./FIELD/TYPE[text()='BUTTON']">
                                                 <TD CLASS="TDstdButton"
                                                     align="right">
                                                        <NOBR>
                                                               <xsl:call-template name="dispStdButtonField"/>
                                                        </NOBR>
                                                 </TD>
                                          </xsl:for-each>
                                   </tr>
                            </xsl:if>
                            <xsl:if test="$fldCnt &gt; 2">
                                   <tr CLASS="TRstdButton">
                                          <xsl:for-each select="./FIELD/TYPE[text()='BUTTON']">
                                                 <xsl:if test="position() &lt; ceiling($fldCnt div 2)+1">
                                                        <TD CLASS="TDstdButton">
                                                               <NOBR>
                                                                      <xsl:call-template name="dispStdButtonField"/>
                                                               </NOBR>
                                                        </TD>
                                                 </xsl:if>
                                          </xsl:for-each>
                                   </tr>
                                   <tr CLASS="TRstdButton">
                                          <xsl:for-each select="./FIELD/TYPE[text()='BUTTON']">
                                                 <xsl:if test="position() &gt; ceiling($fldCnt div 2)">
                                                        <TD CLASS="TDstdButton">
                                                               <NOBR>
                                                                      <xsl:call-template name="dispStdButtonField"/>
                                                               </NOBR>
                                                        </TD>
                                                 </xsl:if>
                                          </xsl:for-each>
                                          <xsl:if test="$fldCnt mod 2 != 0">
                                                 <TD CLASS="TDstdButton">
                                                        <NOBR>
                                                        </NOBR>
                                                 </TD>
                                          </xsl:if>
                                   </tr>
                            </xsl:if>
                     </TABLE>
              </DIV>
       </xsl:template>
       
      <!-- kals Apr 24 .. Changed Audit for Neo -->
       <xsl:template match="BLOCK" mode="AuditEntry_Neo">        
              <td CLASS="THEADAudit" style="width:95%">
                     <TABLE CLASS="TABLEAudit" summary=""
                            cellpadding="0" cellspacing="0" border="0"
                            style="width:500px;">
                            <TR CLASS="TRAudit">
                                   <TD CLASS="TDAudit">
                                          <NOBR>
                                                 <LABEL CLASS="LABELNormal">Input By</LABEL>
                                          </NOBR>
                                   </TD>
                                   <TD CLASS="fieldAudit">
                                          <NOBR>
                                                 <INPUT TYPE="TEXT"
                                                        CLASS="TEXTAudit"
                                                        name="MAKER_ID"
                                                        id="{DBT}__MAKER_ID"
                                                        DBT="{DBT}"
                                                        DBC="MAKER_ID"
                                                        READONLY="true"
                                                        MAXLENGTH="12" SIZE="12"/>
                                          </NOBR>
                                   </TD>
                                   <TD CLASS="TDAudit">
                                          <NOBR>
                                                 <LABEL CLASS="LABELNormal">Date Time</LABEL>
                                          </NOBR>
                                   </TD>
                                   <TD CLASS="fieldAudit">
                                          <NOBR>
                                                    <INPUT TYPE="HIDDEN" name="MAKER_DT_STAMP" id="{DBT}__MAKER_DT_STAMP" DBT="{DBT}" DBC="MAKER_DT_STAMP" onpropertychange="fnFormatTimeStamp(this)"/>
                                                    <INPUT TYPE="TEXT" CLASS="TEXTAudit" name="MAKER_DT_STAMPI" id="MAKER_DT_STAMPI" READONLY="true" MAXLENGTH="19" SIZE="22"/>
                                          </NOBR>
                                   </TD>
                                      <TD CLASS="TDAudit">
                                        <NOBR>
                                          <!--<LABEL CLASS="LABELNormal">Mod NO</LABEL> Saidul Changed on 28th May-->
                                          <LABEL CLASS="LABELNormal">Modification Number</LABEL>
                                        </NOBR>
                                      </TD>
                                      <TD CLASS="fieldAudit">
                                        <NOBR>
                                          <INPUT TYPE="TEXT" CLASS="TEXTAudit" name="MOD_NO" id="{DBT}__MOD_NO" DBT="{DBT}" DBC="MOD_NO" READONLY="true" MAXLENGTH="4" SIZE="3"/>
                                        </NOBR>
                                      </TD>
                                   
                                   
                                  
                            </TR>
                            <TR CLASS="TRAudit">
                                    <TD CLASS="TDAudit">
                                          <NOBR>
                                                 <LABEL CLASS="LABELNormal">Authorized By</LABEL>
                                          </NOBR>
                                   </TD>
                                   <TD CLASS="fieldAudit">
                                          <NOBR>
                                                 <INPUT TYPE="TEXT"
                                                        CLASS="TEXTAudit"
                                                        name="CHECKER_ID"
                                                        id="{DBT}__CHECKER_ID"
                                                        DBT="{DBT}"
                                                        DBC="CHECKER_ID"
                                                        READONLY="true"
                                                        MAXLENGTH="12" SIZE="12"/>
                                          </NOBR>
                                   </TD>
                                   <TD CLASS="TDAudit">
                                          <NOBR>
                                                 <LABEL CLASS="LABELNormal">Date Time</LABEL>
                                          </NOBR>
                                   </TD>
                                   <TD CLASS="fieldAudit">
                                          <NOBR>
                                                 <INPUT TYPE="HIDDEN" name="CHECKER_DT_STAMP" id="{DBT}__CHECKER_DT_STAMP" DBT="{DBT}" DBC="CHECKER_DT_STAMP" onpropertychange="fnFormatTimeStamp(this)"/>                                                        
                                                 <INPUT TYPE="TEXT" CLASS="TEXTAudit" name="CHECKER_DT_STAMPI" id="CHECKER_DT_STAMPI" READONLY="true" MAXLENGTH="19" SIZE="22"/>
                                          </NOBR>
                                   </TD>
                                   
                                    <TD CLASS="fieldAudit">
                                      <NOBR>
                                        <INPUT TYPE="CHECKBOX" CLASS="CHECKBOXAudit" name="RECORD_STAT" id="{DBT}__RECORD_STAT" DBT="{DBT}" DBC="RECORD_STAT" DISABLED="true" onclick="fnWhenAuditChange()"/>
                                        <LABEL>Open</LABEL>
                                      </NOBR>
                                    </TD>
                                  
                                    <TD CLASS="fieldAudit">
                                      <NOBR>
                                        <INPUT TYPE="CHECKBOX" CLASS="CHECKBOXAudit" name="AUTH_STAT" id="{DBT}__AUTH_STAT" DBT="{DBT}" DBC="AUTH_STAT" DISABLED="true" onclick="fnWhenAuditChange()"/>
                                        <LABEL>Authorized</LABEL>
                                      </NOBR>
                                    </TD>
                                    <TD CLASS="TDAudit" align="left">
                                      <NOBR>
                                        <INPUT TYPE="HIDDEN" CLASS="CHECKBOXAudit" name="ONCE_AUTH" id="{DBT}__ONCE_AUTH" DBT="{DBT}" DBC="ONCE_AUTH"/>
                                      </NOBR>
                                    </TD>
                            </TR>
                     </TABLE>
              </td>
       </xsl:template>
       
       
       <!-- Kals Separting the template for Maintennance and Online Screens -->
       <xsl:template match="BLOCK" mode="AuditEntry_Neo_Online">        
        <xsl:variable name="contractStatus" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/CONTRACT_STATUS"/>
        <xsl:variable name="authStatus" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/AUTH_STATUS"/>
        <xsl:variable name="paymentStatus" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/PAYMENT_STATUS"/>
        <xsl:variable name="collectionStatus" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/COLLECTION_STATUS"/>
        <xsl:variable name="ProcessStatus" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/PROCESS_STATUS"/>
        <xsl:variable name="dealStatus" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/DEAL_STATUS"/>
        
              <td CLASS="THEADAudit" style="width:95%">
                     <TABLE  summary=""
                            cellpadding="0" cellspacing="0" border="0"
                            style="width:700px;">
                            <TR CLASS="TRAudit">
                                     <TD CLASS="TDAudit"> <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text></TD>
                                   <TD CLASS="TDAudit">
                                          <NOBR>
                                                 <LABEL CLASS="LABELNormal">Input By</LABEL>
                                          </NOBR>
                                   </TD>
                                   
                                   <TD CLASS="TDAudit">
                                          <NOBR>
                                                 <LABEL CLASS="LABELNormal">Date Time</LABEL>
                                          </NOBR>
                                   </TD>
                          
                                    <TD CLASS="TDAudit">
                                          <NOBR>
                                                 <LABEL CLASS="LABELNormal">Authorized By</LABEL>
                                          </NOBR>
                                   </TD>
                                   <TD CLASS="TDAudit">
                                          <NOBR>
                                                 <LABEL CLASS="LABELNormal">Date Time</LABEL>
                                          </NOBR>
                                   </TD>
                                <TD CLASS="TDAudit">
                                   <NOBR>                                    
                                        <xsl:if test = "$contractStatus = -1">
                                          <LABEL CLASS="LABELNormal">Contract Status</LABEL>                                          
                                        </xsl:if>  
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = -1">
                                          <LABEL CLASS="LABELNormal">Collection Status</LABEL>                                          
                                        </xsl:if>                                          
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = 0 and $collectionStatus = -1">
                                          <LABEL CLASS="LABELNormal">Collection Status</LABEL>                                          
                                        </xsl:if>  
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = 0" >
                                          <LABEL CLASS="LABELNormal">payment Status</LABEL>                                          
                                        </xsl:if>  
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = 0 and $collectionStatus = 0 and ProcessStatus = -1">
                                          <LABEL CLASS="LABELNormal">Process  Status</LABEL>                                          
                                        </xsl:if>  
                                        <xsl:if test = "$dealStatus = -1">
                                          <LABEL CLASS="LABELNormal">Deal Status</LABEL>                                          
                                        </xsl:if> 
                                        
                                        
                                    </NOBR>
                                 </TD>
                                      
                                   <TD CLASS="TDAudit">
                                     <xsl:if test = "$authStatus = -1">
                                        <NOBR>                                              
                                            <INPUT  TYPE="CHECKBOX" CLASS="CHECKBOXAudit" name="AUTHSTAT" DBT="{DBT}" DBC="AUTHSTAT"  id="{DBT}__AUTHSTAT"  ON="A" OFF="U" READONLY="true" MAXLENGTH="15" SIZE="17"/>
                                        </NOBR>
                                            <LABEL>Authorized</LABEL>                                        
                                     </xsl:if> 
                                     <xsl:if test = "$authStatus = 0 and $collectionStatus = -1 and $paymentStatus = -1 and $contractStatus = -1">
                                        <LABEL>Collection Status</LABEL>                                        
                                     </xsl:if>
                                     
                                     <xsl:if test = "$authStatus = 0 and $collectionStatus = -1 and $paymentStatus = -1 and $contractStatus = 0">
                                        <LABEL>Payment Status</LABEL>                                        
                                     </xsl:if>

                                     <xsl:if test = "$authStatus = 0 and $collectionStatus = 0 and $paymentStatus = 0 and $contractStatus = 0 and  ProcessStatus = -1">
                                        <LABEL>Process Status</LABEL>                                        
                                     </xsl:if>
                                     
                                    </TD>
                                   
                            </TR>
                            
                            <!-- Sec Row -->
                            <TR>
                            
                           <TD CLASS="TDAudit"> <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text></TD>
                             <TD CLASS="fieldAudit">
                                <NOBR>
                                   <INPUT TYPE="TEXT"
                                      CLASS="TEXTAudit"
                                      name="MAKERID"
                                      id="{DBT}__MAKERID"
                                      DBT="{DBT}"
                                      DBC="MAKERID"
                                      READONLY="true"
                                      MAXLENGTH="12" SIZE="12"/>
                                  </NOBR>
                               </TD>
                               <TD CLASS="fieldAudit">
                                  <NOBR>
                                      <INPUT TYPE="HIDDEN" name="MAKERSTAMP" id="{DBT}__MAKERSTAMP" DBT="{DBT}" DBC="MAKERSTAMP" onpropertychange="fnFormatTimeStamp(this)"/>
                                      <INPUT TYPE="TEXT" CLASS="TEXTAudit" name="MAKERSTAMPI" id="MAKERSTAMPI" READONLY="true" MAXLENGTH="19" SIZE="22"/>
                                   </NOBR>
                                </TD>
                                <TD CLASS="fieldAudit">
                                   <NOBR>
                                       <INPUT TYPE="TEXT"
                                          CLASS="TEXTAudit"
                                          name="CHECKERID"
                                          id="{DBT}__CHECKERID"
                                          DBT="{DBT}"
                                          DBC="CHECKERID"
                                          READONLY="true"
                                          MAXLENGTH="12" SIZE="12"/>
                                    </NOBR>
                                 </TD>
                                 <TD CLASS="fieldAudit">
                                     <NOBR>
                                        <INPUT TYPE="HIDDEN" name="CHECKERSTAMP" id="{DBT}__CHECKERSTAMP" DBT="{DBT}" DBC="CHECKERSTAMP" onpropertychange="fnFormatTimeStamp(this)"/>                                                        
                                        <INPUT TYPE="TEXT" CLASS="TEXTAudit" name="CHECKERSTAMPI" id="CHECKERSTAMPI" READONLY="true" MAXLENGTH="19" SIZE="22"/>
                                     </NOBR>
                                 </TD>
                                 
                                    
                                  <TD CLASS="fieldAudit">
                                        
                                        <xsl:if test = "$contractStatus = -1">
                                            <NOBR>
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit" name="CONTSTAT" DBT="{DBT}" DBC="CONTSTAT"  id="{DBT}__CONTSTAT" READONLY="true" MAXLENGTH="15" SIZE="15"  />
                                            </NOBR>
                                           </xsl:if> 
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = -1">
                                            <NOBR>
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit" name="COLLECTION_STATUS" DBT="{DBT}" DBC="COLLECTION_STATUS"  id="{DBT}__COLLECTION_STATUS" READONLY="true" MAXLENGTH="12" SIZE="12"/>
                                            </NOBR>
                                           </xsl:if>                                            
                                       
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = 0 and $collectionStatus = -1">
                                            <NOBR>
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit" name="COLLECTION_STATUS" DBT="{DBT}" DBC="COLLECTION_STATUS"  id="{DBT}__COLLECTION_STATUS" READONLY="true" MAXLENGTH="12" SIZE="12"/>
                                            </NOBR>
                                           </xsl:if> 
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = 0 " >
                                            <NOBR>
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit" name="PAYMENT_STATUS" DBT="{DBT}" DBC="PAYMENT_STATUS"  id="{DBT}__PAYMENT_STATUS" READONLY="true" MAXLENGTH="12" SIZE="12"/>
                                            </NOBR>
                                           </xsl:if> 
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = 0 and $collectionStatus = 0 and $ProcessStatus = -1">
                                            <NOBR>
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit" name="PROCESSTAT" DBT="{DBT}" DBC="PROCESSTAT"  id="{DBT}__PROCESSTAT" READONLY="true" MAXLENGTH="25" SIZE="22"/>
                                            </NOBR>
                                        
                                        </xsl:if> 
                                         <xsl:if test = "$dealStatus = -1">
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit" name="DEAL_STATUS" DBT="{DBT}" DBC="DEAL_STATUS"  id="{DBT}__DEAL_STATUS" READONLY="true" MAXLENGTH="25" SIZE="22"/>
                                        </xsl:if>
                                    </TD>
                                    <TD CLASS="fieldAudit"> 
                                     <xsl:if test = "$authStatus = 0 and $collectionStatus = -1 and $paymentStatus = -1 and $contractStatus = -1">
                                            <NOBR>
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit" name="COLLECTION_STATUS" DBT="{DBT}" DBC="COLLECTION_STATUS"  id="{DBT}__COLLECTION_STATUS" READONLY="true" MAXLENGTH="12" SIZE="12"/>
                                            </NOBR>
                                     </xsl:if>
                                     <xsl:if test = "$authStatus = 0 and $collectionStatus = -1 and $paymentStatus = -1 and $contractStatus = 0">
                                            <NOBR>
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit" name="PAYMENT_STATUS" DBT="{DBT}" DBC="PAYMENT_STATUS"  id="{DBT}__PAYMENT_STATUS" READONLY="true" MAXLENGTH="12" SIZE="12"/>
                                            </NOBR>
                                     </xsl:if>
                                     <xsl:if test = "$authStatus = 0 and $collectionStatus = 0 and $paymentStatus = 0 and $contractStatus = 0 and  $ProcessStatus = -1">
                                            <NOBR>
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit" name="PROCESSTAT" DBT="{DBT}" DBC="PROCESSTAT"  id="{DBT}___PROCESSTAT" READONLY="true" MAXLENGTH="25" SIZE="22"/>
                                            </NOBR>                                     
                                     </xsl:if>
                                     
                                     <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>

                                    </TD>                                    
                              </TR>

          <!-- If Reversal is present in the Audit add fields for Reversal too -->
                <xsl:variable name = "Reversal" select = "//FORM/BLOCK[@SCREEN=$screen and @TYPE='Audit Entry']/REVERSAL"/>

                   <TR>                            
                             <TD STYLE = "color:#CCCCCC;">
                                  <xsl:if test = "$Reversal = -1">                             
                                          <NOBR>
                                                 <LABEL CLASS="LABELNormal">Reversal</LABEL>
                                          </NOBR>
                                  </xsl:if>                                          
                                  <xsl:if test = "$Reversal = 0">                    
                                    <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
                                  </xsl:if>                                          
                                  
                                  
                              </TD>
                              
                             <TD CLASS="fieldAudit">
                                  <xsl:if test = "$Reversal = -1">                             
                                      <NOBR>
                                         <INPUT TYPE="TEXT"
                                            CLASS="TEXTAudit"
                                            name="REVR_MAKERID"
                                            id="{DBT}__REVR_MAKERID"
                                            DBT="{DBT}"
                                            DBC="REVR_MAKERID"
                                            READONLY="true"
                                            MAXLENGTH="12" SIZE="12"/>
                                        </NOBR>
                                  </xsl:if>           
                                  <xsl:if test = "$Reversal = 0">                    
                                    <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
                                  </xsl:if>                                          
                                  
                                        
                               </TD>
                               <TD CLASS="fieldAudit">
                                  <xsl:if test = "$Reversal = -1">                             
                                    <NOBR>
                                        <INPUT TYPE="HIDDEN" name="REVR_MAKERSTAMP" id="{DBT}__REVR_MAKERSTAMP" DBT="{DBT}" DBC="REVR_MAKERSTAMP" onpropertychange="fnFormatTimeStamp(this)"/>
                                        <INPUT TYPE="TEXT" CLASS="TEXTAudit" name="REVR_MAKERSTAMPI" id="REVR_MAKERSTAMPI" READONLY="true" MAXLENGTH="19" SIZE="22"/>
                                     </NOBR>
                                  </xsl:if>                                          
                                  <xsl:if test = "$Reversal = 0">                    
                                    <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
                                  </xsl:if>                                          
                                     
                                </TD>
                                <TD CLASS="fieldAudit">
                                  <xsl:if test = "$Reversal = -1">                             
                                
                                     <NOBR>
                                         <INPUT TYPE="TEXT"
                                            CLASS="TEXTAudit"
                                            name="REVR_CHECKERID"
                                            id="{DBT}__REVR_CHECKERID"
                                            DBT="{DBT}"
                                            DBC="REVR_CHECKERID"
                                            READONLY="true"
                                            MAXLENGTH="12" SIZE="12"/>
                                      </NOBR>
                                  </xsl:if>                                          
                                  <xsl:if test = "$Reversal = 0">                    
                                    <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
                                  </xsl:if>                                          
                                      
                                 </TD>
                                 <TD CLASS="fieldAudit">
                                  <xsl:if test = "$Reversal = -1">                             
                                 
                                       <NOBR>
                                          <INPUT TYPE="HIDDEN" name="REVR_CHECKERSTAMP" id="{DBT}__REVR_CHECKERSTAMP" DBT="{DBT}" DBC="REVR_CHECKERSTAMP" onpropertychange="fnFormatTimeStamp(this)"/>                                                        
                                          <INPUT TYPE="TEXT" CLASS="TEXTAudit" name="REVR_CHECKERSTAMPI" id="REVR_CHECKERSTAMPI" READONLY="true" MAXLENGTH="19" SIZE="22"/>
                                       </NOBR>
                                  </xsl:if>                                                                                 
                                  <xsl:if test = "$Reversal = 0">                    
                                    <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
                                  </xsl:if>                                          
                                  
                                 </TD>
                                  <TD CLASS="fieldAudit">
                                        <xsl:if test = "$contractStatus = -1 and $paymentStatus = 0 and $collectionStatus = -1 and $authStatus = -1">
                                        <LABEL CLASS="LABELNormal">Collection Status</LABEL>                                          
                                      </xsl:if>  
                                      
                                      <xsl:if test = "$contractStatus = -1 and $paymentStatus = -1 and $collectionStatus = 0 and $authStatus = -1">
                                        <LABEL CLASS="LABELNormal">Payment Status</LABEL>                                          
                                      </xsl:if>  
                                      
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = -1 and $authStatus = -1">
                                        <LABEL CLASS="LABELNormal">Payment Status</LABEL>                                          
                                      </xsl:if>  
                                        <xsl:if test = "$contractStatus = -1 and $paymentStatus = -1 and $collectionStatus = -1 and $authStatus = 0">
                                        <LABEL CLASS="LABELNormal">Payment Status</LABEL>                                          
                                      </xsl:if>  
                                      <xsl:if test = "$contractStatus = -1 and $paymentStatus = 0 and $collectionStatus = 0 and $authStatus = -1 and $ProcessStatus = -1">
                                        <LABEL CLASS="LABELNormal">Process Status</LABEL>                                          
                                      </xsl:if>  
                                      
                                      <xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = -1 and $authStatus = 0 and $ProcessStatus = -1">
                                        <LABEL CLASS="LABELNormal">Process Status</LABEL>                                          
                                      </xsl:if>  
                                      
                                  </TD>
                                    <TD CLASS="fieldAudit"> 
                                        <xsl:if test = "$contractStatus = -1 and $paymentStatus = 0 and $collectionStatus = -1 and $authStatus = -1">
                                            <NOBR>
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit" name="COLLECTION_STATUS" DBT="{DBT}" DBC="COLLECTION_STATUS"  id="{DBT}__COLLECTION_STATUS" READONLY="true" MAXLENGTH="15" SIZE="17"/>
                                            </NOBR>
                                        </xsl:if>  
                                        
                                        <xsl:if test = "$contractStatus = -1 and $paymentStatus = -1 and $collectionStatus = 0 and $authStatus = -1">
                                            <NOBR>
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit" name="PAYMENT_STATUS" DBT="{DBT}" DBC="PAYMENT_STATUS"  id="{DBT}__PAYMENT_STATUS" READONLY="true" MAXLENGTH="15" SIZE="17"/>
                                            </NOBR>
                                        </xsl:if>  
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = -1 and $authStatus = -1">
                                            <NOBR>
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit" name="PAYMENT_STATUS" DBT="{DBT}" DBC="PAYMENT_STATUS"  id="{DBT}__PAYMENT_STATUS" READONLY="true" MAXLENGTH="15" SIZE="17"/>
                                            </NOBR>
                                        </xsl:if>  
                                        <xsl:if test = "$contractStatus = -1 and $paymentStatus = -1 and $collectionStatus = -1 and $authStatus = 0">
                                            <NOBR>
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit" name="PAYMENT_STATUS" DBT="{DBT}" DBC="PAYMENT_STATUS"  id="{DBT}__PAYMENT_STATUS" READONLY="true" MAXLENGTH="15" SIZE="17"/>
                                            </NOBR>
                                        </xsl:if>  
                                        <xsl:if test = "$contractStatus = -1 and $paymentStatus = 0 and $collectionStatus = 0 and $authStatus = -1 and $ProcessStatus = -1">
                                            <NOBR>
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit" name="PROCESSTAT" DBT="{DBT}" DBC="PROCESSTAT"  id="{DBT}__PROCESSTAT" READONLY="true" MAXLENGTH="25" SIZE="22"/>
                                            </NOBR>
                                        </xsl:if>  
                                        
                                        <xsl:if test = "$contractStatus = 0 and $paymentStatus = -1 and $collectionStatus = -1 and $authStatus = 0 and $ProcessStatus = -1">
                                            <NOBR>
                                                <INPUT TYPE="TEXT"  CLASS="TEXTAudit" name="PROCESSTAT" DBT="{DBT}" DBC="PROCESSTAT"  id="{DBT}__PROCESSTAT" READONLY="true" MAXLENGTH="25" SIZE="22"/>
                                            </NOBR>
                                        </xsl:if>  
                                        
                                    </TD>                                    
                                 
                              </TR>
                            
                     </TABLE>
              </td>
       </xsl:template>
       
       
       
       
       

<!-- Kals On June 28 Template to caceh Audit Values in case of online -->
    <xsl:template name = "CacheAuditValues">
    <script language = "javascript"  DEFER="DEFER"> 
    var l_OnlineAuditVals = new Array()
        l_OnlineAuditVals["A"]="Active";
	l_OnlineAuditVals["C"]="Closed";
	l_OnlineAuditVals["E"]="Exercised";
	l_OnlineAuditVals["H"]="Hold";
	l_OnlineAuditVals["I"]="Knocked In";
	l_OnlineAuditVals["K"]="Cancelled";
	l_OnlineAuditVals["L"]="Liquidated";
	l_OnlineAuditVals["R"]="Reversed";
	l_OnlineAuditVals["S"]="Closed";
	l_OnlineAuditVals["V"]="Reversed";
	l_OnlineAuditVals["W"]="Knocked Out";
	l_OnlineAuditVals["X"]="Expired";
	l_OnlineAuditVals["Y"]="Uninitiated";
	l_OnlineAuditVals["O"]="Open";
    var l_OnlineAuditDesc = new Array()
        l_OnlineAuditDesc["Active"]="A";
	l_OnlineAuditDesc["Closed"]="C";
	l_OnlineAuditDesc["Exercised"]="E";
	l_OnlineAuditDesc["Hold"]="H";
	l_OnlineAuditDesc["Knocked In"]="I";
	l_OnlineAuditDesc["Cancelled"]="K";
	l_OnlineAuditDesc["Liquidated"]="L";
	l_OnlineAuditDesc["Reversed"]="R";
	l_OnlineAuditDesc["Closed"]="S";
	l_OnlineAuditDesc["Reversed"]="V";
	l_OnlineAuditDesc["Knocked Out"]="W";
	l_OnlineAuditDesc["Expired"]="X";
	l_OnlineAuditDesc["Uninitiated"]="Y";
	l_OnlineAuditDesc["Open"]="O";   
    var l_OnlineProcessStatusVals = new Array();
        l_OnlineProcessStatusVals["N"] = "Pending Authorization";
        l_OnlineProcessStatusVals["A"] = "Pending Release";
        l_OnlineProcessStatusVals["P"] = "Processed";
        l_OnlineProcessStatusVals["F"] = "Failed Verification";
        l_OnlineProcessStatusVals["H"] = "Hold";
    var l_OnlineProcessStatusDesc = new Array();
        l_OnlineProcessStatusDesc["Pending Authorization"]="N";
        l_OnlineProcessStatusDesc["Pending Release"]="A";
        l_OnlineProcessStatusDesc["Processed"]="P";
        l_OnlineProcessStatusDesc["Failed Verification"]="F";
        l_OnlineProcessStatusDesc["Hold"]="H";
  </script>
    </xsl:template>

    <xsl:template name = "shwCallFmrsBtns">
      <xsl:variable name="noOfRows">
        <xsl:if test="count(//*[name() = 'SCREEN' and @NAME =  $screen]/CS_BUTTON_ROWS) &gt; 0">
          <xsl:if test="normalize-space(//*[name() = 'SCREEN' and @NAME =  $screen]/CS_BUTTON_ROWS) != ''">
            <xsl:value-of select="//*[name() = 'SCREEN' and @NAME =  $screen]/CS_BUTTON_ROWS"/>
          </xsl:if>
          <xsl:if test="normalize-space(//*[name() = 'SCREEN' and @NAME =  $screen]/CS_BUTTON_ROWS) = ''">
            <xsl:value-of select="1"/>
          </xsl:if>
        </xsl:if>
        <xsl:if test="count(//*[name() = 'SCREEN' and @NAME =  $screen]/CS_BUTTON_ROWS) = 0">
          <xsl:value-of select="1"/>
        </xsl:if>
      </xsl:variable>
<!--      <DIV id="DIV_SUBSCR_CALLFORM" style="width:{$gWidth}px;height:{$noOfRows * 32}px;"> -->
      <DIV id="DIV_SUBSCR_CALLFORM" style="width:{$gWidth}px;">
        <xsl:if test="$gPosition = 'absolute'">      
            <xsl:attribute name="style">
                 <xsl:text>position:absolute;top:</xsl:text>
                 <xsl:if test="count(TAB/PAGE) = 0">
                        <xsl:value-of select="$gContexHgt + $gHeight"/>
                 </xsl:if>
                 <xsl:if test="count(TAB/PAGE) &gt; 0">
                        <xsl:value-of select="$gContexHgt + $gHeight + $gTabAllHgt"/>
                 </xsl:if>
                 <xsl:text>px;left:0px;width:</xsl:text>
                 <xsl:value-of select="$gWidth"/>
<!--                 <xsl:text>px;overflow-y:auto;height:</xsl:text>
                 <xsl:value-of select="$noOfRows * 32"/> -->
                 <xsl:text>px;</xsl:text>
          </xsl:attribute>
        </xsl:if>
        <xsl:variable name="noOfButtons" select="count(//*[name() = 'SCREEN' and @NAME =  $screen]/*[name() ='SUBSCREEN']/FORM)"/>
        <xsl:variable name="buttonsPerRow" select="//*[name() = 'SCREEN' and @NAME =  $screen]/CS_BUTTONS_PER_ROW"/>
        <xsl:for-each select = "//*[name() = 'SCREEN' and @NAME =  $screen]/*[name() ='SUBSCREEN']/FORM">                    
          <xsl:variable name = "fnc" select = "FUNCTION"></xsl:variable>
          <xsl:variable name = "lbl" select = "LABEL"></xsl:variable>
          <xsl:if test="(position() = 1) or position() mod $buttonsPerRow  = 1">
            <xsl:text disable-output-escaping="yes">&lt;TABLE cellspacing=0 cellpadding=0 bgcolor=#e7f3ff&gt;</xsl:text>
            <xsl:text disable-output-escaping="yes">&lt;TR&gt;</xsl:text>
          </xsl:if>
          <xsl:if test="position() = 1 or position() mod $buttonsPerRow  = 1">          
            <TD style="width:100%"></TD>
          </xsl:if>
<!--
          <TD>
            <BUTTON onclick = "{$fnc}" class = "INPUTButtonSubSystem_sum">
              <xsl:value-of select = "$lbl" />
            </BUTTON>
          </TD>  
-->
            <TD  nowrap="yes" onclick = "{$fnc}" class = "INPUTButtonSubSystem_main">
                <xsl:value-of select = "$lbl" />
            </TD>

          <xsl:if test="position() mod $buttonsPerRow = 0 or position() = $noOfButtons">
            <xsl:text disable-output-escaping="yes"> &lt;/TR&gt;</xsl:text>
            <xsl:text disable-output-escaping="yes"> &lt;/TABLE&gt;</xsl:text>                    
          </xsl:if>
        </xsl:for-each>  
      </DIV>
    </xsl:template>
    <xsl:template name="AuditAbs_Pos_Handler">
        <xsl:variable name="noOfRows">
          <xsl:if test="count(//*[name() = 'SCREEN' and @NAME =  $screen]/CS_BUTTON_ROWS) &gt; 0">
            <xsl:if test="normalize-space(//*[name() = 'SCREEN' and @NAME =  $screen]/CS_BUTTON_ROWS) != ''">
              <xsl:value-of select="//*[name() = 'SCREEN' and @NAME =  $screen]/CS_BUTTON_ROWS"/>
            </xsl:if>
            <xsl:if test="normalize-space(//*[name() = 'SCREEN' and @NAME =  $screen]/CS_BUTTON_ROWS) = ''">
              <xsl:value-of select="1"/>
            </xsl:if>
          </xsl:if>
          <xsl:if test="count(//*[name() = 'SCREEN' and @NAME =  $screen]/CS_BUTTON_ROWS) = 0">
            <xsl:value-of select="1"/>
          </xsl:if>
        </xsl:variable>
        <xsl:if test="$gPosition = 'absolute'">
            <xsl:attribute name="style">
                 <xsl:text>position:absolute;top:</xsl:text>
                 <xsl:if test="count(TAB/PAGE) = 0">
                        <!-- sundar -->
                    <xsl:if test="count(//*[name() = 'SCREEN' and @NAME =  $screen]/*[name() ='SUBSCREEN']/FORM) = 0">
                        <xsl:value-of select="$gContexHgt + $gHeight"/>
                    </xsl:if>
                    <xsl:if test="count(//*[name() = 'SCREEN' and @NAME =  $screen]/*[name() ='SUBSCREEN']/FORM) &gt; 0">
                      <xsl:if test="$noOfRows &gt; 1 or ($noOfRows = 1 and count(//*[name() = 'SCREEN' and @NAME =  $screen]/*[name() ='SUBSCREEN']/FORM) = 1)">
                        <xsl:value-of select="$gContexHgt + $gHeight + ($noOfRows * 30) + 2"/>
                      </xsl:if>
                      <xsl:if test="$noOfRows = 1 and count(//*[name() = 'SCREEN' and @NAME =  $screen]/*[name() ='SUBSCREEN']/FORM) &gt; 1">
                        <xsl:value-of select="$gContexHgt + $gHeight + ($noOfRows * 30) + 4"/>
                      </xsl:if>
                    </xsl:if>
                 </xsl:if>
                 <xsl:if test="count(TAB/PAGE) &gt; 0">
                    <xsl:if test="count(//*[name() = 'SCREEN' and @NAME =  $screen]/*[name() ='SUBSCREEN']/FORM) = 0">
                        <xsl:value-of select="$gContexHgt + $gHeight + $gTabAllHgt"/>
                    </xsl:if>
                    <xsl:if test="count(//*[name() = 'SCREEN' and @NAME =  $screen]/*[name() ='SUBSCREEN']/FORM) &gt; 0">
                        <xsl:value-of select="$gContexHgt + $gHeight + $gTabAllHgt + ($noOfRows * 30) + 2"/>
                    </xsl:if>
                 </xsl:if>
                 <xsl:text>px;left:0px;width:</xsl:text>
                 <xsl:value-of select="$gWidth"/>
<!--                 <xsl:text>px;border:2px solid #118ddc;overflow-y:auto;</xsl:text> -->
                 <xsl:text>px;overflow-y:auto;</xsl:text>
          </xsl:attribute>
        </xsl:if>
    </xsl:template>       
</xsl:stylesheet>
