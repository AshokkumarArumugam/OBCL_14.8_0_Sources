<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

      <xsl:template name="Audit_Legends">
        <xsl:param name="fsHeight"/>
        <xsl:param name="tdHeight"/>
           <!-- For Rec Status and Auth Status FldSets kals on June 4 -->
           <xsl:variable name="AuditBlk_exist" select="//BLOCK[ID ='BLK_AUDIT']"/>                   
            <xsl:variable name="AuditBlk_Type" select="//BLOCK[ID ='BLK_AUDIT']/TYPE">
            </xsl:variable>
           
           <xsl:if test="$AuditBlk_exist != ''">
                <xsl:if test="$AuditBlk_Type = 'M'">
                  <TD valign="top"  width="5%"> 
                         <!-- FCUBS10ITR1 SFR 1025 START -->
                         <FIELDSET CLASS="FIELDSETAudit" style="width:100px">
                         <!-- FCUBS10ITR1 SFR 1025 END -->
                            <LEGEND>Authorization Status</LEGEND>
                            <div style="overflow-y:auto;height:{$fsHeight}px;">
                                <TABLE border="0" cellspacing="0" cellpadding="0" >
                                       <TR>   
                                              <TD><label class="FWLABELAudit" >A - Authorized</label></TD>
                                       </TR>
                                       <TR>
                                              <TD><label class="FWLABELAudit" >U - UnAuthorized</label></TD>
                                       </TR>
                                </TABLE>
                            </div>
                         </FIELDSET>
                  </TD>
                </xsl:if>

                <xsl:if test="$AuditBlk_Type = 'M'">
                  <TD valign="top"  width="5%"> 
                        <!-- <FIELDSET CLASS="FIELDSETAudit" >-->
                         <!-- FCUBS10ITR1 SFR 1025 START -->
                         <FIELDSET CLASS="FIELDSETAudit" style="width:100px">
                         <!-- FCUBS10ITR1 SFR 1025 END -->
                            <LEGEND>Record Status</LEGEND>
                            <div style="overflow-y:auto;height:{$fsHeight}px;">                                
                                <TABLE border="0" cellspacing="0" cellpadding="0" >
                                       <TR>
                                              <TD><label class="FWLABELAudit" >C - Close</label></TD>
                                       </TR>
                                       <TR>
                                              <TD><label class="FWLABELAudit" >O - Open</label></TD>
                                       </TR>
                                </TABLE>
                            </div>
                         </FIELDSET>
                  </TD>
                </xsl:if>
                
<!--            
                <xsl:if test="$AuditBlk_Type = 'T'">
                  <TD style="height:{$tdHeight}px;width:150px;" align="left" valign="top"> 
                         <FIELDSET CLASS="FieldsetNormal" style="overflow-y:auto;height:{$fsHeight}px;width:140px;border:1px solid red;">
                                <LEGEND>
                                       <b> Contract Status </b>
                                </LEGEND>
                                <TABLE border="0" cellspacing="0" cellpadding="0" style="margin-left:8px;margin-top:5px;">
                                       <TR>
                                              <TD>C - Close</TD>
                                       </TR>
                                       <TR>
                                              <TD>O - Open</TD>
                                       </TR>
                                       <TR>
                                              <TD>L - Liquidated</TD>
                                       </TR>
                                </TABLE>
                         </FIELDSET>
                  </TD>
                </xsl:if> -->
           </xsl:if>
      </xsl:template>
      <xsl:template name="Custom_Legends">    
        <xsl:param name="fsHeight"/>
        <xsl:param name="tdHeight"/>
        <xsl:if test="count(//LEGENDS) > 0">
          <xsl:for-each select="//LEGENDS">
            <xsl:variable name="width">
              <xsl:if test="normalize-space(WIDTH) != ''">
                <xsl:value-of select="normalize-space(WIDTH)"/>
              </xsl:if>
              <xsl:if test="normalize-space(WIDTH) = ''">
                <xsl:value-of select="150"/>
              </xsl:if>
            </xsl:variable>
             <TD valign="top" width="5%"> 
               <!-- <FIELDSET CLASS="FIELDSETAudit" style="overflow-y:auto;height:{$fsHeight}px;width:{$width - 10}px;"> -->
               <!-- FCUBS10ITR1 SFR 1025 START-->
               <FIELDSET CLASS="FIELDSETAudit" style="width:{$width - 10}px;">
               <!-- FCUBS10ITR1 SFR 1025 END-->
                 <LEGEND><xsl:value-of select="LABEL"/></LEGEND>
                 <div style="overflow-y:auto;height:{$fsHeight}px;">
                   <TABLE border="0" cellspacing="0" cellpadding="0" >
                      <xsl:for-each select="OPTION">
                         <TR>
                           <TD>
                              <label class="FWLABELAudit" ><xsl:value-of select="@VALUE"/> - <xsl:value-of select="(.)"/></label>
                           </TD>
                         </TR>
                      </xsl:for-each>
                   </TABLE>
                </div>
               </FIELDSET>
             </TD>
          </xsl:for-each>
        </xsl:if>
      </xsl:template>  
      
       <xsl:template name="AuditFields">
              <xsl:variable name="AuditBlk_exist" select="//BLOCK[ID ='BLK_AUDIT']"></xsl:variable>
              <xsl:variable name="AuditBlk_Type" select="//BLOCK[ID ='BLK_AUDIT']/TYPE"></xsl:variable>
              
              <xsl:if test="$AuditBlk_exist != ''">
                     <TR>
                        <xsl:if test="$AuditBlk_Type = 'M'">                                   
                            <TD>
                              <LABEL class="LABELNormal">Authorization Status<img src="{$imgPath_XSL}/star_disabled.gif" title="Required Field"/></LABEL>
                            </TD>
                            <TD CLASS="colTDText">
                                <SELECT CLASS="SELECTNormal" TYPE="TEXT" SIZE="1" MAXLENGTH="1" DBT="{DBT}" DBC="AUTH_STAT" NAME="AUTH_STAT">
                                    <OPTION VALUE="" SELECTED="true"></OPTION>
                                    <OPTION VALUE="A">Authorized</OPTION>
                                    <OPTION VALUE="U">Unauthorized</OPTION>
                                </SELECT>
                            </TD>
                        </xsl:if>

                        <!-- For Maintenance add the Record Status!-->
                        <xsl:if test="$AuditBlk_Type = 'M'">
                            <TD>
                                <LABEL class="LABELNormal">Record Status<img src="{$imgPath_XSL}/star_disabled.gif" title="Required Field"/></LABEL>
                            </TD>
                            <TD>
                                <SELECT CLASS="SELECTNormal" TYPE="TEXT" SIZE="1" MAXLENGTH="1" DBT="{DBT}" DBC="RECORD_STAT" NAME="RECORD_STAT">
                                    <OPTION VALUE="" SELECTED="true"></OPTION>
                                    <OPTION VALUE="O">Open</OPTION>
                                    <OPTION VALUE="C">Closed</OPTION>
                                </SELECT>
                            </TD>
                        </xsl:if>
                        <td> </td>
                     </TR>
              </xsl:if>
       </xsl:template>      
       
       <xsl:template name="disp_Exit_Btn">
                            <TD align="right" style="padding-right:5px">
                                <input type="button" onclick="fnExit()" id="BTN_EXIT" class="BUTTONExit" onMouseOver="this.className='BUTTONExitHover'" onMouseOut="this.className='BUTTONExit'" onFocus="this.className='BUTTONExitHover'" onBlur="this.className='BUTTONExit'" value="Exit"/>
                                <IMG id="BTN_EXIT_IMG'" SRC="Images/Exit2.gif" name="BTN_EXIT_IMG" style= "display:none;width=0px;height=0px;"/>
                            </TD>
       </xsl:template>
       
       <!-- Kals June 15 Audit Results -->
       <xsl:template name = "AuditResult">
<!--
           <xsl:variable name="AuthStatCnt" select="count(//SUMBLOCK[@TABPAGE = 'RESULT']/FIELD[NAME = 'AUTH_STAT'])"/>
           <xsl:variable name="RecordStatCnt" select="count(//SUMBLOCK[@TABPAGE = 'RESULT']/FIELD[NAME = 'RECORD_STAT'])"/>
           <xsl:variable name="ContractStatusCnt" select="count(//SUMBLOCK[@TABPAGE = 'RESULT']/FIELD[NAME = 'CONTRACT_STATUS'])"/>           
           -->
          <xsl:variable name="AuditBlk_exist" select="//BLOCK[ID ='BLK_AUDIT']"/>
          <xsl:variable name="AuditBlk_Type" select="//BLOCK[ID ='BLK_AUDIT']/TYPE"/>

          <xsl:if test="$AuditBlk_exist != ''">
            <xsl:if test="$AuditBlk_Type = 'M'">                    
              <TH class="THEADTHMultipleSummary"  scope="col" style="white-space:nowrap;">
                      <xsl:value-of select="'Authorization Status'"/>
              </TH>
            </xsl:if>
            <xsl:if test="$AuditBlk_Type = 'M'">          
             <TH class="THEADTHMultipleSummary"  scope="col" style="white-space:nowrap;">
                <xsl:value-of select="'Record Status'"/>
             </TH>
            </xsl:if>
<!--            
            <xsl:if test="$AuditBlk_Type = 'T'">          
             <TH class="THEADTDMultiple">
                <xsl:value-of select="'Transaction Status'"/>
             </TH>
            </xsl:if>  -->
        </xsl:if>
       </xsl:template>
       
<!-- sampath added the below template to add the maker_id, maker_dt_stamp, checker_id, checker_dt_stamp at the end of the result table  -->              
       <xsl:template name = "AuditResultFCIS">
          <xsl:variable name="AuditBlk_exist" select="//BLOCK[ID ='BLK_AUDIT']"/>
          <xsl:variable name="AuditBlk_Type" select="//BLOCK[ID ='BLK_AUDIT']/TYPE"/>

          <xsl:if test="$AuditBlk_exist != ''">
                <xsl:if test="$AuditBlk_Type = 'M'">                    
                      <TH class="THEADTHMultipleSummary"  scope="col" style="white-space:nowrap;">
                              <xsl:value-of select="'Maker Id'"/>
                      </TH>
                </xsl:if>
                <xsl:if test="$AuditBlk_Type = 'M'">          
                     <TH class="THEADTHMultipleSummary"  scope="col" style="white-space:nowrap;">
                        <xsl:value-of select="'Maker Date Stamp'"/>
                     </TH>
                </xsl:if>
                <xsl:if test="$AuditBlk_Type = 'M'">                    
                      <TH class="THEADTHMultipleSummary"  scope="col" style="white-space:nowrap;">
                              <xsl:value-of select="'Checker Id'"/>
                      </TH>
                </xsl:if>
                <xsl:if test="$AuditBlk_Type = 'M'">          
                     <TH class="THEADTHMultipleSummary"  scope="col" style="white-space:nowrap;">
                        <xsl:value-of select="'Checker Date Stamp'"/>
                     </TH>
                </xsl:if>
          </xsl:if>
       </xsl:template>
<!-- code added by sampath ends here  -->
</xsl:stylesheet>
