<?xml version='1.0' encoding='windows-1252'?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:ns1="http://xmlns.oracle.com/Forms"
                exclude-result-prefixes="ns1 ">
  
<!-- Get parameters passed from devTransform() -->
<xsl:param name="path" />
<xsl:param name="funcId" />
<xsl:param name="lastSeqNo" />

<!-- Root template -->
<xsl:template match="/">
  <xsl:apply-templates select="//ns1:Module/ns1:FormModule"/>
  </xsl:template>
  <!-- FormModule template -->
  <xsl:template match="ns1:FormModule">
    <UIDEV FUNCTIONID="{@Name}"
           SUMMARY="0" SCREEN_TYPE="M"
           UIXML_SAVED="Y" LASTFLDSEQ="{$lastSeqNo}" DEFAULT_MODE="N" VERSION="1.2">
           <xsl:if test="count(//ns1:FormModule/ns1:Block/ns1:Item[@Name = 'MAKER_ID']) &gt; 0">
             <xsl:attribute name="AUDIT">
              <xsl:text>-1</xsl:text>
             </xsl:attribute>
           </xsl:if>
           <xsl:if test="count(//ns1:FormModule/ns1:Block/ns1:Item[@Name = 'MAKER_ID']) = 0">
             <xsl:attribute name="AUDIT">
              <xsl:text>0</xsl:text>
             </xsl:attribute>
           </xsl:if>
           <xsl:attribute name="XMLPATH">
           <xsl:value-of select="$path" />
           </xsl:attribute>
           <xsl:attribute name="SCRIPTPATH">
           <xsl:value-of select="$path" />
           </xsl:attribute>
           <xsl:attribute name="JAVAPATH">
           <xsl:value-of select="$path" />
           </xsl:attribute>
      <xsl:apply-templates select="//ns1:FormModule/ns1:Block"/>
      <xsl:apply-templates select="//ns1:FormModule/ns1:LOV"/>
    </UIDEV>
</xsl:template>
    
<!-- Block template -->
<xsl:template match="ns1:Block">
 <!-- get the DATABLOCK only whose DATASRC is there-->
  <xsl:if test="@QueryDataSourceName != ''">
    <xsl:variable name="blkName" select="@Name"/>
      <xsl:choose>
        <xsl:when test="count(//ns1:Block[@QueryDataSourceName != '']) = 1">
          
          <DATABLOCK DATASRC="{@QueryDataSourceName}" PARENT="" RELATION=""
                     MAPPING="1:1" ISQUERY="0">
            <xsl:apply-templates select="ns1:Item">
              <xsl:with-param name="drcname" select="@QueryDataSourceName"/>
              <xsl:with-param name="isSingleEntry" select="0"/>
            </xsl:apply-templates>
            <xsl:apply-templates select="//ns1:Canvas"/>
          </DATABLOCK>
        </xsl:when>

       <xsl:when test="ns1:Relation and count(//ns1:Block/ns1:Relation[@DetailBlock = $blkName]) = 0">
       <xsl:variable name="ParentDataSrcName" select="@QueryDataSourceName" />
          <DATABLOCK DATASRC="{@QueryDataSourceName}" PARENT="" RELATION=""
                     MAPPING="1:1" ISQUERY="0">
            <xsl:apply-templates select="ns1:Item">
              <xsl:with-param name="drcname" select="@QueryDataSourceName"/>
              <xsl:with-param name="isSingleEntry" select="0"/>
            </xsl:apply-templates>
             <xsl:if test="position() = 1">
            <xsl:apply-templates select="//ns1:Canvas"/>
            </xsl:if>
          </DATABLOCK>
          <!--<xsl:apply-templates select="//ns1:Block[count(ns1:Relation)= 0]" mode="UI">
          <xsl:with-param name="pName" select="$ParentDataSrcName"/>
          </xsl:apply-templates>-->
        </xsl:when>
        
        <xsl:when test="count(//ns1:Block/ns1:Relation[@DetailBlock = $blkName]) &gt; 0">                
          <DATABLOCK DATASRC="{@QueryDataSourceName}"  MAPPING="1:N" ISQUERY="0">
            <xsl:attribute name="PARENT">
            <xsl:value-of select="//ns1:Block[ns1:Relation/@DetailBlock = $blkName]/@QueryDataSourceName"/>
            </xsl:attribute>            
            <xsl:attribute name="RELATION">
             <xsl:call-template name="setRelation">
             <xsl:with-param name="relation"
             select="//ns1:Relation[@DetailBlock = $blkName]/@JoinCondition"/> 
            </xsl:call-template>
            <!-- <xsl:value-of select="//ns1:Relation[@DetailBlock = $blkName]/@JoinCondition"/> -->
            </xsl:attribute>            
            <xsl:apply-templates select="ns1:Item">
              <xsl:with-param name="drcname" select="@QueryDataSourceName"/>
              <xsl:with-param name="isSingleEntry" select="1"/>
            </xsl:apply-templates>
          </DATABLOCK>
         </xsl:when>

        <xsl:otherwise>
         <DATABLOCK DATASRC="{@QueryDataSourceName}"  MAPPING="1:1" ISQUERY="0">
            <xsl:attribute name="PARENT">
           <!-- <xsl:value-of select="//ns1:Block[ns1:Relation/@DetailBlock = $blkName]/@QueryDataSourceName"/> -->
            </xsl:attribute>            
            <xsl:attribute name="RELATION">
            <!-- <xsl:value-of select="//ns1:Relation[@DetailBlock = $blkName]/@JoinCondition"/> -->
            </xsl:attribute>
            <xsl:apply-templates select="ns1:Item">
              <xsl:with-param name="drcname" select="@QueryDataSourceName"/>
              <xsl:with-param name="isSingleEntry" select="0"/>
            </xsl:apply-templates>
            <xsl:if test="position() = 1">
             <xsl:apply-templates select="//ns1:Canvas"/>
            </xsl:if>
          </DATABLOCK>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:if>
</xsl:template>

  
<xsl:template match="ns1:Block" mode="UI">
<xsl:param name="pName" />
  <xsl:variable name="blkName" select="./@Name"/>
  <xsl:if test="@QueryDataSourceName != '' and count(//ns1:Relation[@DetailBlock = $blkName])=0">
    <DATABLOCK DATASRC="{@QueryDataSourceName}" PARENT="{$pName}"
    RELATION="" MAPPING="1:1" ISQUERY="0">
    <xsl:apply-templates select="ns1:Item">
      <xsl:with-param name="drcname" select="@QueryDataSourceName"/>
      <xsl:with-param name="isSingleEntry" select="0"/>
    </xsl:apply-templates>
  </DATABLOCK>
  </xsl:if>
</xsl:template>

<!-- setRelation Template -->
<xsl:template name="setRelation">
    <xsl:param name="relation"/>
    <xsl:variable name="replaceText">blk_</xsl:variable>
    <xsl:variable name="replaceTextCasps">BLK_</xsl:variable>
    <xsl:variable name="replaceWith">&#x20;</xsl:variable>
    <xsl:choose>
     <xsl:when test="contains($relation,'blk_')">
      <xsl:call-template name="replace-string-from-relation">
          <xsl:with-param name="text" select="$relation"/>
          <xsl:with-param name="replace" select="$replaceText"/>
          <xsl:with-param name="with" select="$replaceWith"/>
      </xsl:call-template>
      </xsl:when>
     <xsl:when test="contains($relation,'BLK_')">
      <xsl:call-template name="replace-string-from-relation">
          <xsl:with-param name="text"
            select="$relation"/>
          <xsl:with-param name="replace" select="$replaceTextCasps"/>
          <xsl:with-param name="with" select="$replaceWith"/>
      </xsl:call-template>
    </xsl:when>
 </xsl:choose>
</xsl:template>


 <!-- replace-string-from-relation Template -->
<xsl:template name="replace-string-from-relation">
    <xsl:param name="text"/>
    <xsl:param name="replace"/>
    <xsl:param name="with"/>
    <xsl:choose>
      <xsl:when test="contains($text,$replace)">
        <xsl:value-of select="substring-before($text,$replace)"/>
        <xsl:value-of select="$with"/>
        <xsl:call-template name="replace-string-from-relation">
          <xsl:with-param name="text"
            select="substring-after($text,$replace)"/>
          <xsl:with-param name="replace" select="$replace"/>
          <xsl:with-param name="with" select="$with"/>
        </xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$text"/>
      </xsl:otherwise>
    </xsl:choose>
</xsl:template>
  
  
<!-- Item template -->
<xsl:template match="ns1:Item">
    <xsl:param name="drcname"/>
    <xsl:param name="isSingleEntry"/>
    <xsl:if test="@Name != 'MOD_NO' and @Name != 'MAKER_ID' and 
                  @Name != 'CHECKER_ID' and
                  @Name != 'MAKER_DT_STAMP' and  @Name != 'CHECKER_DT_STAMP' and
                  @Name != 'ONCE_AUTH' and @Name != 'RECORD_STAT' and 
                  @Name != 'AUTH_STAT'">

           <!-- <xsl:if test="@Prompt and $isSingleEntry = 0" >
                  <xsl:call-template name="LabelHandler">
                    <xsl:with-param name="curr_item" select="." />
                  </xsl:call-template>
            </xsl:if>-->
     <xsl:choose>
     <xsl:when test="@ItemType='Radio Group' or contains(@ParentName,'RADIOBUTTON')">
      <xsl:for-each select="ns1:RadioButton" >
        <FIELD>
            <NAME>
              <xsl:value-of select="../@Name"/>
            </NAME>
          <ID><xsl:value-of select="@ID"/></ID>
           
            <!-- Choose the <DATASRC> and <DATAFLD> fields -->
            <DATASRC>
              <xsl:value-of select="$drcname"/>
            </DATASRC>
            <xsl:choose>
              <xsl:when test="../@ColumnName">
                <DATAFLD>
                  <xsl:value-of select="../@ColumnName"/>
                </DATAFLD>
              </xsl:when>
              <xsl:otherwise>
                <DATAFLD>
                  <xsl:value-of select="../@Name"/>
                </DATAFLD>
              </xsl:otherwise>
            </xsl:choose>
            <TYPE>RADIO</TYPE>
            <!-- Choose the <DTYPE> fields -->
            <DTYPE>VARCHAR2</DTYPE>
            <!-- Choose the <LABEL> fields -->
            <!-- Check if the block type is multiple or single entry -->
            
            <xsl:if test="$isSingleEntry = 1">
              <LABEL>
                 <xsl:value-of select="../@Prompt"/>
              </LABEL>
            </xsl:if>
            
           <!-- Choose the <REQUIRED> fields -->
            <xsl:choose>
              <xsl:when test="../@Required = 'false'">
                <REQUIRED>N</REQUIRED>
              </xsl:when>
              <xsl:when test="../@Required='true'">
                <REQUIRED>Y</REQUIRED>
              </xsl:when>
              <xsl:otherwise>
                <REQUIRED>N</REQUIRED>
              </xsl:otherwise>
            </xsl:choose>
            <!-- Choose the <MULTIPLE>,<MAXLENGTH> fields -->
            <MULTIPLE>
            </MULTIPLE>
            <MAXLENGTH><xsl:value-of select="../@MaximumLength"/></MAXLENGTH>
            <!-- AUTHSCRN,IS_QUERY,IS_RESULT,IS_ADVNCD is hard coded to zero -->
            <AUTHSCRN>0</AUTHSCRN>
            <IS_QUERY>0</IS_QUERY>
            <IS_RESULT>0</IS_RESULT>
            <IS_ADVNCD>0</IS_ADVNCD>
          </FIELD>

          <!--If block type is single entry create an additional label 
          field for the same -->
          
          <xsl:if test="$isSingleEntry = 0">
            <xsl:call-template name="LabelHandler">
                    <xsl:with-param name="curr_item" select="." />
            </xsl:call-template>
          </xsl:if>
        
      </xsl:for-each>
     </xsl:when>
     
     <!-- when item type = TEXT -->
     <xsl:when test="@ItemType='Text Item' or 
                          @ItemType='User Area' or 
                          (not(@ItemType) and 
                          (contains(@ParentName,'TEXT') or contains(@ParentName,'TXT'))) or
                          (not(@ItemType) and 
                          (not(@ParentName) or @ParentName='')) or
                          (not(@ItemType) and 
                          (not(@CanvasName) or @CanvasName='')) or
                          @ItemType='Display Item' or 
                          (not(@ItemType) and contains(@ParentName,'PC_DIS_'))">
                         <xsl:call-template name="TextItemHandler">
                              <xsl:with-param name="drcname" select="$drcname"/>
                              <xsl:with-param name="curr_item" select="."/>
                              <xsl:with-param name="isSingleEntry" select="$isSingleEntry"/>
                          </xsl:call-template>                                
     </xsl:when>
     
     <!-- when item type = BUTTON -->
     <xsl:when test="@ItemType='Push Button' or 
                          @ParentName='PC_BUTTON_ICONIC' or
                          @ParentName='PC_BUTTON_LOV' or
                          contains(@ParentName,'BUTTON') or
                          contains(@ParentName,'PC_BTN')">
                <xsl:if test="(not(@IconFilename) or
                          (@IconFilename !='ok' and
                          not(@IconFilename='cancel' or contains(@IconFilename,'exit'))
                          and @IconFilename!='delrow' and
                          @IconFilename!='addrow' and @IconFilename!='zoom')) ">
                          <xsl:call-template name="ButtonItemHandler">
                              <xsl:with-param name="drcname" select="$drcname"/>
                              <xsl:with-param name="curr_item" select="."/>
                              <xsl:with-param name="isSingleEntry" select="$isSingleEntry"/>
                          </xsl:call-template>                                
                </xsl:if>
      </xsl:when>
      
      <!-- Choose the <TYPE>= 'SELECT' fields -->
      <xsl:when test="@ItemType='List Item' or
                                  @ItemType='Hierarchical Tree' or
                                  contains(@ParentName,'COMBO')">
                  <xsl:call-template name="ListItemHandler">
                      <xsl:with-param name="drcname" select="$drcname"/>
                      <xsl:with-param name="curr_item" select="."/>
                      <xsl:with-param name="isSingleEntry" select="$isSingleEntry"/>
                  </xsl:call-template>
      </xsl:when>
      
      <!-- Choose the <TYPE>= 'CHECKBOX' fields -->
      <xsl:when test="@ItemType='Check Box' or
                      @ItemType='Chart Item' or
                      contains(@ParentName,'CHECKBOX')">
                      
                    <xsl:if test="@Label and $isSingleEntry=0">
                      <xsl:call-template name="LabelHandler">
                        <xsl:with-param name="curr_item" select="." />
                      </xsl:call-template>
                    </xsl:if>
                          
                      <xsl:call-template name="CheckBoxItemHandler">
                          <xsl:with-param name="drcname" select="$drcname"/>
                          <xsl:with-param name="curr_item" select="."/>
                          <xsl:with-param name="isSingleEntry" select="$isSingleEntry"/>
                      </xsl:call-template>

        </xsl:when>

       <xsl:otherwise>          
       </xsl:otherwise>
    </xsl:choose>
  </xsl:if>
  <xsl:apply-templates select="../ns1:Canvas"/>
</xsl:template>
  

<!-- TextItemHandler Template -->
<xsl:template name="TextItemHandler">
   <xsl:param name="drcname"/>
   <xsl:param name="curr_item"/>
   <xsl:param name="isSingleEntry"/>

      <!-- Choose the <FIELD> and <NAME> fields -->
      <FIELD>
          <NAME>
            <xsl:value-of select="$curr_item/@Name"/>
          </NAME>

          <ID><xsl:value-of select="$curr_item/@ID"/></ID>
           
          <!-- Choose the <DATASRC> and <DATAFLD> fields -->
          <DATASRC>
            <xsl:value-of select="$drcname"/>
          </DATASRC>
           <xsl:choose>
              <xsl:when test="$curr_item/@ColumnName">
                <DATAFLD>
                  <xsl:value-of select="$curr_item/@ColumnName"/>
                </DATAFLD>
              </xsl:when>
              <xsl:otherwise>
                <DATAFLD>
                  <xsl:value-of select="$curr_item/@Name"/>
                </DATAFLD>
              </xsl:otherwise>
          </xsl:choose>
          
          <xsl:choose>
              <xsl:when test="$curr_item/@CanvasName=''">
                <TYPE>HIDDEN</TYPE>
              </xsl:when>
              <xsl:otherwise>
                <TYPE>TEXT</TYPE>
              </xsl:otherwise>
          </xsl:choose> 
          
           <xsl:choose>
              <xsl:when test="$curr_item/@DataType='Number'">
                <DTYPE>NUMBER</DTYPE>
              </xsl:when>
              <xsl:when test="$curr_item/@DataType='Date'">
                <DTYPE>DATE</DTYPE>
              </xsl:when>
              <xsl:otherwise>
                <DTYPE>VARCHAR2</DTYPE>
              </xsl:otherwise>
          </xsl:choose>
            
          <xsl:if test="$isSingleEntry = 1">
              <LABEL>
               <!-- <xsl:value-of select="$curr_item/@Label"/>-->
                <xsl:value-of select="$curr_item/@Prompt"/>
              </LABEL>
          </xsl:if>
            
            <!-- Choose the <REQUIRED> fields -->
          <xsl:choose>
              <xsl:when test="$curr_item/@Required = 'false'">
                <REQUIRED>N</REQUIRED>
              </xsl:when>
              <xsl:when test="$curr_item/@Required='true'">
                <REQUIRED>Y</REQUIRED>
              </xsl:when>
              <xsl:otherwise>
                <REQUIRED>N</REQUIRED>
              </xsl:otherwise>
          </xsl:choose>
            <!-- Choose the <MULTIPLE>,<MAXLENGTH> fields -->
            <MULTIPLE></MULTIPLE>            
            <MAXLENGTH><xsl:value-of select="$curr_item/@MaximumLength"/></MAXLENGTH>
            
            <!-- AUTHSCRN,IS_QUERY,IS_RESULT,IS_ADVNCD is hard coded to zero -->
            <AUTHSCRN>0</AUTHSCRN>
            <IS_QUERY>0</IS_QUERY>
            <IS_RESULT>0</IS_RESULT>
            <IS_ADVNCD>0</IS_ADVNCD>
        </FIELD>
        
        <!-- if the block is singly entry add add a lebel for the item
        <xsl:if test="$isSingleEntry = 0">
            <xsl:call-template name="CreateLabelForSigleEntry">
                <xsl:with-param name="curr_item"
                            select="$curr_item"/>
             </xsl:call-template>
        </xsl:if> -->
</xsl:template>
<!-- End of TextItemHandler Template -->


<!-- Start Template ButtonItemHandler Template -->
<xsl:template name="ButtonItemHandler">
   <xsl:param name="drcname"/>
   <xsl:param name="curr_item"/>
   <xsl:param name="isSingleEntry"/>

      <!-- Choose the <FIELD>-->
      <FIELD>
          <!-- Choose the <NAME>-->
          <NAME>
            <xsl:value-of select="$curr_item/@Name"/>
          </NAME>
          <!-- Choose the <ID>-->
          <ID><xsl:value-of select="$curr_item/@ID"/></ID>
           
          <!-- Choose the <TYPE>-->
          <TYPE>BUTTON</TYPE>
          
           <!-- Choose the <LABEL>-->
        <!--  <LABEL>
             <xsl:value-of select="$curr_item/@Prompt"/>
          </LABEL> -->
          
          <xsl:choose>
            <xsl:when test="not($curr_item/@Iconic) or $curr_item/@Iconic = 'false'">
               <LABEL> <xsl:value-of select="$curr_item/@Label"/></LABEL>
            </xsl:when>
           <!-- <xsl:when test="$curr_item/@Iconic='true'" >
               <SRC>
                 <xsl:text>Images/</xsl:text>
                 <xsl:value-of select="$curr_item/@IconFilename" />
                 <xsl:text>.gif</xsl:text>
               </SRC>
            </xsl:when> -->
          <xsl:otherwise/>
        </xsl:choose>          
          
          <!-- Choose the <DATASRC>-->
          <DATASRC>
               <xsl:value-of select="$drcname"/>
          </DATASRC>
          
          <!-- Choose the <REQUIRED> fields -->
          <xsl:choose>
              <xsl:when test="$curr_item/@Required = 'false'">
                <REQUIRED>N</REQUIRED>
              </xsl:when>
              <xsl:when test="$curr_item/@Required='true'">
                <REQUIRED>Y</REQUIRED>
              </xsl:when>
              <xsl:otherwise>
                <REQUIRED>N</REQUIRED>
              </xsl:otherwise>
          </xsl:choose>
          
          <!-- Choose the <MULTIPLE>,<MAXLENGTH> fields -->
          <MULTIPLE></MULTIPLE>            
          <MAXLENGTH><xsl:value-of select="$curr_item/@MaximumLength"/></MAXLENGTH>
            
          <!-- AUTHSCRN,IS_QUERY,IS_RESULT,IS_ADVNCD is hard coded to zero -->
          <AUTHSCRN>0</AUTHSCRN>
          <IS_QUERY>0</IS_QUERY>
          <IS_RESULT>0</IS_RESULT>
          <IS_ADVNCD>0</IS_ADVNCD>
          <EVENT>
                <NAME>onClick</NAME>
                <FUNCTION>fndoSomething()</FUNCTION>
          </EVENT>          
    </FIELD>        
</xsl:template>  
<!-- End of ButtonItemHadler -->

<!-- Start tamplate ListItemHandler -->
<xsl:template name="ListItemHandler">
   <xsl:param name="drcname"/>
   <xsl:param name="curr_item"/>
   <xsl:param name="isSingleEntry"/>

      <!-- Choose the <FIELD> -->
      <FIELD>
          <!-- Choose the <NAME>  -->
          <NAME>
            <xsl:value-of select="$curr_item/@Name"/>
          </NAME>
          <!-- Choose the <ID>  -->
          <ID><xsl:value-of select="$curr_item/@ID"/></ID>
          
           <!-- Choose the <TYPE>  -->
          <TYPE>SELECT</TYPE>
           
          <!-- Choose the <DATASRC> and <DATAFLD> fields -->
          <DATASRC>
            <xsl:value-of select="$drcname"/>
          </DATASRC>
           <xsl:choose>
              <xsl:when test="$curr_item/@ColumnName">
                <DATAFLD>
                  <xsl:value-of select="$curr_item/@ColumnName"/>
                </DATAFLD>
              </xsl:when>
              <xsl:otherwise>
                <DATAFLD>
                  <xsl:value-of select="$curr_item/@Name"/>
                </DATAFLD>
              </xsl:otherwise>
          </xsl:choose>
           
          <!-- Choose the <DTYPE> -->        
           <xsl:choose>
              <xsl:when test="$curr_item/@DataType='Number'">
                <DTYPE>NUMBER</DTYPE>
              </xsl:when>
              <xsl:when test="$curr_item/@DataType='Date'">
                <DTYPE>DATE</DTYPE>
              </xsl:when>
              <xsl:otherwise>
                <DTYPE>VARCHAR2</DTYPE>
              </xsl:otherwise>
          </xsl:choose>
            
          <xsl:if test="$isSingleEntry = 1">
              <LABEL>
                 <xsl:value-of select="$curr_item/@Prompt"/>
              </LABEL>
          </xsl:if>
            
            <!-- Choose the <REQUIRED> fields -->
          <xsl:choose>
              <xsl:when test="$curr_item/@Required = 'false'">
                <REQUIRED>N</REQUIRED>
              </xsl:when>
              <xsl:when test="$curr_item/@Required='true'">
                <REQUIRED>Y</REQUIRED>
              </xsl:when>
              <xsl:otherwise>
                <REQUIRED>N</REQUIRED>
              </xsl:otherwise>
          </xsl:choose>
            <!-- Choose the <MULTIPLE>,<MAXLENGTH> fields -->
            <MULTIPLE></MULTIPLE>            
            <MAXLENGTH><xsl:value-of select="$curr_item/@MaximumLength"/></MAXLENGTH>
            
            <!-- AUTHSCRN,IS_QUERY,IS_RESULT,IS_ADVNCD is hard coded to zero -->
            <AUTHSCRN>0</AUTHSCRN>
            <IS_QUERY>0</IS_QUERY>
            <IS_RESULT>0</IS_RESULT>
            <IS_ADVNCD>0</IS_ADVNCD>
            <xsl:for-each select="$curr_item/ns1:ListItemElement" >
               <xsl:sort select="@Index" data-type="number" order="ascending"/>
                  <OPTION SELECTED="0" VALUE="{@Value}">
                        <xsl:value-of select="@Name"/>
                  </OPTION>
           </xsl:for-each>            
        </FIELD>
        
        <!-- if the block is singly entry 
        <xsl:if test="$isSingleEntry = 0">
            <xsl:call-template name="CreateLabelForSigleEntry">
                <xsl:with-param name="curr_item"
                            select="$curr_item"/>
             </xsl:call-template>
        </xsl:if> -->
</xsl:template>
<!-- End tamplate ListItemHandler -->

<!-- Start tamplate CheckBoxItemHandler -->
<xsl:template name="CheckBoxItemHandler">
   <xsl:param name="drcname"/>
   <xsl:param name="curr_item"/>
   <xsl:param name="isSingleEntry"/>

      <!-- Choose the <FIELD> element -->
      <FIELD>
          <!-- Choose the <NAME> element -->
          <NAME>
            <xsl:value-of select="$curr_item/@Name"/>
          </NAME>
          
           <!-- Choose the <ID> element -->

          <ID><xsl:value-of select="$curr_item/@ID"/></ID>
          
           <!-- Choose the <TYPE> element -->
          <TYPE>CHECKBOX</TYPE>
           
          <!-- Choose the <DATASRC> and <DATAFLD> element -->
          <DATASRC>
            <xsl:value-of select="$drcname"/>
          </DATASRC>
           <xsl:choose>
              <xsl:when test="$curr_item/@ColumnName">
                <DATAFLD>
                  <xsl:value-of select="$curr_item/@ColumnName"/>
                </DATAFLD>
              </xsl:when>
              <xsl:otherwise>
                <DATAFLD>
                  <xsl:value-of select="$curr_item/@Name"/>
                </DATAFLD>
              </xsl:otherwise>
          </xsl:choose>
          
          <!-- Choose the <DTYPE> element -->
           <DTYPE>CHAR</DTYPE>
            
          <xsl:if test="$isSingleEntry = 1">
              <LABEL>
                 <xsl:value-of select="$curr_item/@Prompt"/>
              </LABEL>
          </xsl:if>
            
            <!-- Choose the <REQUIRED> fields -->
          <xsl:choose>
              <xsl:when test="$curr_item/@Required = 'false'">
                <REQUIRED>N</REQUIRED>
              </xsl:when>
              <xsl:when test="$curr_item/@Required='true'">
                <REQUIRED>Y</REQUIRED>
              </xsl:when>
              <xsl:otherwise>
                <REQUIRED>N</REQUIRED>
              </xsl:otherwise>
          </xsl:choose>
            <!-- Choose the <MULTIPLE>,<MAXLENGTH> fields -->
            <MULTIPLE></MULTIPLE>            
            <MAXLENGTH><xsl:value-of select="$curr_item/@MaximumLength"/></MAXLENGTH>
            
            <!-- AUTHSCRN,IS_QUERY,IS_RESULT,IS_ADVNCD is hard coded to zero -->
            <AUTHSCRN>0</AUTHSCRN>
            <IS_QUERY>0</IS_QUERY>
            <IS_RESULT>0</IS_RESULT>
            <IS_ADVNCD>0</IS_ADVNCD>
      </FIELD>
        
        <!-- if the block is singly entry add add a lebel for the item
        <xsl:if test="$isSingleEntry = 0">
            <xsl:call-template name="CreateLabelForSigleEntry">
                <xsl:with-param name="curr_item"
                            select="$curr_item"/>
             </xsl:call-template>
        </xsl:if> -->
</xsl:template>
<!-- End tamplate CheckBoxItemHandler -->

<!-- Start template CreateLabelForSigleEntry -->
<xsl:template name="CreateLabelForSigleEntry">
   <xsl:param name="curr_item"/>
        <FIELD>
              <NAME>
                <xsl:text>LBL_</xsl:text><xsl:value-of select="@Name"/>
              </NAME>
              <ID><xsl:value-of select="$curr_item/@ID"/></ID>
              <TYPE>LABEL</TYPE> 
              <LABEL><xsl:value-of select="$curr_item/@Label"/></LABEL>
              <MAXLENGTH /> 
              <REQUIRED>N</REQUIRED> 
              <AUTHSCRN>0</AUTHSCRN> 
              <IS_QUERY>0</IS_QUERY> 
              <IS_RESULT>0</IS_RESULT> 
              <IS_ADVNCD>0</IS_ADVNCD>
       </FIELD>   
</xsl:template>

<!-- Start template setBindVarsOnly Template -->
<xsl:template name="setBindVarsOnly">
    <xsl:param name="bindVarValue"/>
    <xsl:choose>
      <xsl:when test="contains($bindVarValue,'.')" >
        <xsl:value-of select="substring-after($bindVarValue,'.')"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$bindVarValue"/>
      </xsl:otherwise>
    </xsl:choose>
</xsl:template>
  
  
<!-- chooseSeperator Template --> 
<xsl:template name="chooseSeperator">
    <xsl:param name="len-space"/>
    <xsl:param name="len-brace"/>
    <xsl:param name="len-comma"/>
    
    <xsl:if test="$len-space &lt; $len-brace and $len-space &lt; $len-comma">
      <xsl:text> </xsl:text>
    </xsl:if>
    <xsl:if test="($len-brace &lt; $len-space) and ($len-brace &lt; $len-comma)">
      <xsl:text>)</xsl:text>
    </xsl:if>
    <xsl:if test="$len-comma &lt; $len-brace and $len-comma &lt; $len-space">
      <xsl:text>,</xsl:text>
    </xsl:if>
</xsl:template>
  
  
  <!-- setBindVars Template -->
<xsl:template name="setBindVars">
    <xsl:param name="query1"/>
    <xsl:variable name="len-space" select="string-length(substring-before($query1,' '))"/>
    <xsl:variable name="len-brace" select="string-length(substring-before($query1,')'))"/>
    <xsl:variable name="len-comma" select="string-length(substring-before($query1,','))"/>
    <!-- <xsl:variable name="bkupQuery" select="$query1"/> -->
    
    <xsl:variable name="bVar" select="translate($query1,',)^','   ')"/>
    <xsl:choose>
      <xsl:when test="substring-before($bVar,' ')!= ''">
        <!-- <xsl:value-of select="substring-before($query1,' ')"/> -->
        <xsl:call-template name="setBindVarsOnly">
          <xsl:with-param name="bindVarValue"
                          select="substring-before($bVar,' ')"/>
        </xsl:call-template>
       <!-- <xsl:text>~</xsl:text>  this code has been changed on 18-thsept-->
        <xsl:if test="contains(substring-after($query1,substring-before($bVar,' ')),':')">
        <xsl:text>~</xsl:text>
          <xsl:call-template name="setBindVars">
            <xsl:with-param name="query1" select="substring-after($query1,':')"/>
          </xsl:call-template>
        </xsl:if>
      </xsl:when>
      <xsl:otherwise>
        <xsl:call-template name="setBindVarsOnly">
          <xsl:with-param name="bindVarValue"
                          select="$query1"/>
        </xsl:call-template>
       <!-- <xsl:text>~</xsl:text> this code has been changed on 18-thsept-->
      </xsl:otherwise>
    </xsl:choose>
</xsl:template>
  
  
  <!-- getBindVars Template -->
<xsl:template name="getBindVars">
  <xsl:param name="query1"/>
    <xsl:variable name="bVar" select="translate($query1,',)^','   ')"/>    
    <xsl:choose>
      <xsl:when test="substring-before($bVar,' ')!= ''">
        <xsl:value-of select="substring-before($bVar,' ')"/>
        <xsl:text>~</xsl:text>
        <xsl:if test="contains(substring-after($query1,substring-before($bVar,' ')),':')">
          <xsl:call-template name="getBindVars">
            <xsl:with-param name="query1" select="substring-after($query1,':')"/>
          </xsl:call-template>
        </xsl:if>
      </xsl:when>
      <xsl:otherwise>
         <xsl:value-of select="$query1"/>
         <xsl:text>~</xsl:text>
      </xsl:otherwise>
    </xsl:choose>
</xsl:template>
    
<!-- Lov template -->
<xsl:template match="ns1:LOV">
    <xsl:variable name="recordGroupName" select="@RecordGroupName"/>
    <!--<xsl:variable name="groupName" select= "../ns1:RecordGroup" /> -->
    <!-- <xsl:if test="@RecordGroupName = ../ns1:RecordGroup/@Name " > -->
  
   <xsl:if test="((../ns1:RecordGroup[@Name=$recordGroupName]/@RecordGroupQuery)
                  and (../ns1:RecordGroup[@Name=$recordGroupName]/@RecordGroupQuery !=''))" >
   
    <LOV LOV_NAME="{@Name}" TITLE="{@Title}" FETCH_ROWS="25" DATAPAGESIZE="20"
         DB_TYPE="ORACLE" DATA_TYPES="STRING" REDUCTION_FLDS="" REDUCTION_FLD_LABELS="" >
         
      <xsl:attribute name="BIND_VARS">      
        <xsl:if test="contains(../ns1:RecordGroup[@Name=$recordGroupName]/@RecordGroupQuery,':')">
        <xsl:variable name="queryWithoutSpecialChar">
            <xsl:variable name="query"
               select="../ns1:RecordGroup[@Name=$recordGroupName]/@RecordGroupQuery"/>        
              <xsl:variable name="replaceText"><![CDATA[&#10;]]></xsl:variable>
              <xsl:variable name="replaceWith"><![CDATA[^]]></xsl:variable>
              <xsl:call-template name="replace-string">
                <xsl:with-param name="text" select="$query"/>
                <xsl:with-param name="replace"  select="$replaceText"/>
                <xsl:with-param name="with" select="$replaceWith"/>
             </xsl:call-template>                                             
        </xsl:variable>
        <xsl:call-template name="setBindVars">
          <xsl:with-param name="query1" select="substring-after($queryWithoutSpecialChar,':')"/>
        </xsl:call-template>
        </xsl:if>
      </xsl:attribute>
      
      
      <xsl:attribute name="RET_FLDS">
        <xsl:for-each select="ns1:LOVColumnMapping">
          <xsl:choose>
            <xsl:when test="contains(@ReturnItem,'.')">
              <xsl:value-of select="substring-after(@ReturnItem,'.')"/>
            </xsl:when>
            <xsl:otherwise>
              <xsl:value-of select="@ReturnItem"/>
            </xsl:otherwise>
          </xsl:choose>
          <xsl:if test="@ReturnItem and @ReturnItem != ''">
            <xsl:text>~</xsl:text>
          </xsl:if>
        </xsl:for-each>
      </xsl:attribute>
      
      
      <xsl:attribute name="QUERY">
        <xsl:choose>
          <xsl:when test="contains(../ns1:RecordGroup[@Name=$recordGroupName]/@RecordGroupQuery,':')">          
               <!--- This template will replace the special characters with in the query -->
            <xsl:variable name="queryWithoutSpecialChar">
                  <xsl:variable name="query"
                  select="../ns1:RecordGroup[@Name=$recordGroupName]/@RecordGroupQuery"/>
                  <xsl:variable name="replaceText"><![CDATA[&#10;]]></xsl:variable>
                  <xsl:variable name="replaceWith"><![CDATA[^]]></xsl:variable>
                  <xsl:call-template name="replace-string">
                      <xsl:with-param name="text" select="$query"/>
                      <xsl:with-param name="replace"  select="$replaceText"/>
                      <xsl:with-param name="with" select="$replaceWith"/>
                  </xsl:call-template>                                     
           </xsl:variable>
           
           <xsl:variable name="test">                                                        
              <xsl:call-template name="getBindVars">
                <xsl:with-param name="query1"
                                select="substring-after($queryWithoutSpecialChar,':')"/>
              </xsl:call-template>
           </xsl:variable>
           <!-- <xsl:variable name="query"
                          select="../ns1:RecordGroup[@Name=$recordGroupName]/@RecordGroupQuery"/> -->
            <xsl:call-template name="replaceBVInQuery">
              <xsl:with-param name="queryWithBV" select="$queryWithoutSpecialChar"/>
              <xsl:with-param name="bindVars" select="$test"/>
            </xsl:call-template>
          </xsl:when>
          <xsl:otherwise> 
          <xsl:variable name="queryWithoutSpecialChar">
                  <xsl:variable name="query"
                  select="../ns1:RecordGroup[@Name=$recordGroupName]/@RecordGroupQuery"/>
                  <xsl:variable name="replaceText"><![CDATA[&#10;]]></xsl:variable>
                  <xsl:variable name="replaceWith"><![CDATA[^]]></xsl:variable>
                  <xsl:call-template name="replace-string">
                      <xsl:with-param name="text" select="$query"/>
                      <xsl:with-param name="replace"  select="$replaceText"/>
                      <xsl:with-param name="with" select="$replaceWith"/>
                  </xsl:call-template> 
              </xsl:variable>
           <xsl:value-of select="translate($queryWithoutSpecialChar,'^',' ')" />    
          
          </xsl:otherwise>
        </xsl:choose>
      </xsl:attribute>
    </LOV>
    </xsl:if>
</xsl:template>
  
  
  
<!-- replaceBVInQuery Template
  This template will replace the bind var from the query-->
<xsl:template name="replaceBVInQuery">
    <xsl:param name="queryWithBV"/>
    <xsl:param name="bindVars"/>
    <xsl:variable name="with">?</xsl:variable>
    <xsl:variable name="bindVar" select="substring-before($bindVars,'~')"/>
    <xsl:variable name="queryWithBVFinal" select="translate($queryWithBV,'^',' ')"/>
    
    <xsl:value-of select="substring-before($queryWithBVFinal,concat(':',$bindVar))"/>
    <xsl:value-of select="$with"/>
    <xsl:choose>
      <xsl:when test="substring-after($bindVars,'~') != ''">
        <xsl:call-template name="replaceBVInQuery">
          <xsl:with-param name="queryWithBV"
                          select="substring-after($queryWithBVFinal,concat(':',$bindVar))"/>
          <xsl:with-param name="bindVars"
                          select="substring-after($bindVars,'~')"/>
        </xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="substring-after($queryWithBVFinal,concat(':',$bindVar))"/>
      </xsl:otherwise>
    </xsl:choose>
</xsl:template>
  
  
  <!-- START OF Template replace-string  NOT IN USE -->
  <xsl:template name="replace-string">
    <xsl:param name="text"/>
    <xsl:param name="replace"/>
    <xsl:param name="with"/>
    <xsl:choose>
      <xsl:when test="contains($text,$replace)">
        <xsl:value-of select="substring-before($text,$replace)"/>
        <xsl:value-of select="$with"/>
        <xsl:call-template name="replace-string">
          <xsl:with-param name="text" select="substring-after($text,$replace)"/>
          <xsl:with-param name="replace" select="$replace"/>
          <xsl:with-param name="with" select="$with"/>
        </xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$text"/>
      </xsl:otherwise>
    </xsl:choose>
</xsl:template> 
<!-- ENF OD Template replace-string  NOT IN USE -->



<!-- Canvas  template -->
<xsl:template match="ns1:Canvas">
    <xsl:call-template name="StaticItemHandler">
    </xsl:call-template>
</xsl:template>
  
  
  
  
<!-- static fields handling -->
<xsl:template name="StaticItemHandler">
    <xsl:for-each select="ns1:Graphics">
      <xsl:choose>
        <xsl:when test="@GraphicsType='Rectangle' or 
                              @GraphicsType='Rounded Rectangle' or
                              @GraphicsType='Frame'">
          <FIELD>
            <xsl:call-template name="FieldsetHandler">
              <xsl:with-param name="curr_item" select="."/>
            </xsl:call-template>
          </FIELD>
        </xsl:when>
        <xsl:when test="@GraphicsType='Text'">
          <xsl:if test="@GraphicsText != 'Input By' and @GraphicsText != 'Date Time' and
                              @GraphicsText != 'Date/Time' and @GraphicsText != 'Date/time' and
                              @GraphicsText != 'Input by' and @GraphicsText != 'Auth by' and
                              @GraphicsText != 'DateTime' and @GraphicsText != 'Datetime' and
                              @GraphicsText != 'Auth By' and  @GraphicsText != 'Mod No' and  
                              @GraphicsText != 'Authorised' and @GraphicsText != 'Open'">
            <xsl:call-template name="LabelHandler">
              <xsl:with-param name="curr_item" select="."/>
            </xsl:call-template>
          </xsl:if>
        </xsl:when>
        <xsl:otherwise/>
      </xsl:choose>
    </xsl:for-each>
</xsl:template>
<!-- end of StaticItemHandler -->
  
 <!-- Template FieldsetHandler -->  
<xsl:template name="FieldsetHandler">
    <xsl:param name="curr_item"/>
    <NAME>
      <xsl:value-of select="$curr_item/@Name"/>
    </NAME>
   <!--  <ID><xsl:value-of select="$funcId"/></ID> -->
    
    <!-- <ID>
          <xsl:value-of select="$curr_item/@Name"/>
          <xsl:text>__</xsl:text>
          <xsl:value-of select="round($curr_item/@YPosition div 0.65)"/>
          <xsl:text>__</xsl:text>
          <xsl:value-of select="round($curr_item/@XPosition div 0.65)"/>      
      </ID> -->
      <ID><xsl:value-of select="$curr_item/@ID"/></ID>
    
    <DATASRC>
    </DATASRC>
    <DATAFLD>
    </DATAFLD>
    <TYPE>FIELDSET</TYPE>
    <DTYPE>
    </DTYPE>
    <MULTIPLE>
    </MULTIPLE>
    <MAXLENGTH><xsl:value-of select="$curr_item/@MaximumLength"/></MAXLENGTH>
    <REQUIRED>N</REQUIRED>
    <AUTHSCRN>0</AUTHSCRN>
    <IS_QUERY>0</IS_QUERY>
    <IS_RESULT>0</IS_RESULT>
    <IS_ADVNCD>0</IS_ADVNCD>
</xsl:template>  
<!-- end of FieldsetHandler -->


<!-- Template  LabelHandler-->
<xsl:template name="LabelHandler">
    <xsl:param name="curr_item"/>
    <FIELD>
      <NAME>
        <xsl:value-of select="concat('LBL_',$curr_item/@Name)"/>
      </NAME>

     <!-- <xsl:if test="$curr_item/@Prompt">
          <ID><xsl:value-of select="$curr_item/@PRMTID"/></ID>
      </xsl:if> -->
      <xsl:if test="count($curr_item/@Label) &gt; 0">
        <ID><xsl:value-of select="$curr_item/@LBLID"/></ID>
      </xsl:if>
      <xsl:if test="count($curr_item/@Label) = 0">
        <ID><xsl:value-of select="$curr_item/@ID"/></ID>
      </xsl:if>
      
      <DATASRC>
      </DATASRC>
      <DATAFLD>
      </DATAFLD>
      <TYPE>LABEL</TYPE>
      <DTYPE>
      </DTYPE>
      <xsl:choose>
        <xsl:when test="$curr_item/@GraphicsText">
          <LABEL>
            <xsl:value-of select="translate($curr_item/@GraphicsText,'&amp;#10;','')"/>
          </LABEL>
        </xsl:when>
        <xsl:when test="$curr_item/@Prompt and $curr_item/@Prompt!=''">
          <LABEL>
            <xsl:value-of select="$curr_item/@Prompt"/>
          </LABEL>
        </xsl:when>
        <xsl:otherwise>
          <LABEL>
            <xsl:value-of select="$curr_item/@Label"/>
          </LABEL>
        </xsl:otherwise>
      </xsl:choose>
      <MULTIPLE>
      </MULTIPLE>
    <MAXLENGTH><xsl:value-of select="$curr_item/@MaximumLength"/></MAXLENGTH>
    <REQUIRED>N</REQUIRED>
      <AUTHSCRN>0</AUTHSCRN>
      <IS_QUERY>0</IS_QUERY>
      <IS_RESULT>0</IS_RESULT>
      <IS_ADVNCD>0</IS_ADVNCD>
    </FIELD>
 </xsl:template>
  <!-- end of LabelHandler -->
</xsl:stylesheet>
