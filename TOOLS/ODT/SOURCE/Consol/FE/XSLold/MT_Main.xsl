<?xml version='1.0' encoding='windows-1252'?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:ns1="http://xmlns.oracle.com/Forms" exclude-result-prefixes="ns1 " >

  <!-- Get parameters passed from engTransform() -->
<xsl:param name="funcId" />

   <!-- Root template -->
   <xsl:template match="/">
       <FORM>
      <xsl:apply-templates select="//ns1:Module/ns1:FormModule" />
       </FORM> 
   </xsl:template>  
   
   <xsl:template match="ns1:FormModule">
     <xsl:variable name="mainwin" select="@ConsoleWindow" />
     
         <xsl:apply-templates select="ns1:Window[@Name=$mainwin]"> 
           <xsl:with-param name="mainwinflag" select="'Y'" />
        </xsl:apply-templates>
        
         <xsl:apply-templates select="ns1:Window[@Name!=$mainwin]"> 
           <xsl:with-param name="mainwinflag" select="'N'" />
        </xsl:apply-templates>
        
        <xsl:apply-templates select="ns1:Canvas" />
        
        <!-- sundar added -->
        <xsl:if test="count(//ns1:FormModule/ns1:Block/ns1:Item[@Name = 'MAKER_ID']) &gt; 0">
          <xsl:call-template name="AuditBlkHandler" >
            <xsl:with-param name="mainwinname" select="$mainwin" />
            <xsl:with-param name="firstnavblk" select="@FirstNavigationBlockName" />
          </xsl:call-template>      
        </xsl:if> 
   </xsl:template>

   
   <xsl:template match="ns1:Window">
     <xsl:param name="mainwinflag"  />
     <xsl:variable name="winname" select="@Name" />         

       <xsl:choose>
        <xsl:when test="count(//ns1:FormModule/ns1:Canvas[@WindowName=$winname and 
                                                          not(@ParentName='HORI_CVS' or 
                                                          @ParentName='VERT_CVS' or 
                                                          contains(@CanvasType,'Toolbar'))]) &gt; 1">

               <SCREEN NAME="{@Name}" TITLE="{@Title}" POSITION="absolute" 
                 HEIGHT="{round(@Height div 0.65)+30}" WIDTH="{round(@Width div 0.65)}" 
                 MAIN_WIN="{$mainwinflag}">
              
              <xsl:apply-templates select="//ns1:FormModule/ns1:Canvas[@WindowName=$winname and (not(@CanvasType) or @CanvasType='Content')]" mode="header" >
                 <xsl:with-param name="winname" select="@Name" />
              </xsl:apply-templates>
              <xsl:if test="count(//ns1:FormModule/ns1:Canvas[@WindowName=$winname and @CanvasType='Stacked']) &gt; 0">
                  <TAB>
                  <xsl:apply-templates select="//ns1:FormModule/ns1:Canvas[@WindowName=$winname and @CanvasType='Stacked']" mode="tabs" />
                  </TAB>
              </xsl:if>
           </SCREEN>
        </xsl:when>
        <xsl:when test="count(//ns1:FormModule/ns1:Canvas[@WindowName=$winname and not(@ParentName='HORI_CVS' or @ParentName='VERT_CVS' or contains(@CanvasType,'Toolbar'))]) = 1">
            <xsl:apply-templates select="//ns1:FormModule/ns1:Canvas[@WindowName=$winname]" mode="general">
               <xsl:with-param name="title" select="@Title" />
               <xsl:with-param name="mainflag" select="$mainwinflag" />
            </xsl:apply-templates>
        </xsl:when>
        <xsl:otherwise/>                  
       </xsl:choose>
    
   </xsl:template>
   
  
  <xsl:template match="ns1:Canvas" mode="general">
     <xsl:param name="title"   />
     <xsl:param name="mainflag" />
     
     <xsl:if test="@Name!='HORI_CVS' and @Name!='VERT_CVS'">
       <SCREEN NAME="{@Name}" TITLE="{$title}" POSITION="absolute"
               HEIGHT="{round(@Height div 0.65)+30}" WIDTH="{round(@Width div 0.65)}" 
               MAIN_WIN="{$mainflag}" />
    </xsl:if>
  </xsl:template>
  
  
  
  <xsl:template match="ns1:Canvas" mode="header">
      <xsl:param name="winname" select="." />
      <xsl:variable name="hdrHt" select="number(//ns1:FormModule/ns1:Canvas[@WindowName=$winname and @CanvasType='Stacked']/@ViewportYPosition)" />
     <HEADER>
       <PAGE NAME="{@Name}" ID="{@Name}" HEIGHT="{round($hdrHt div 0.65)+2}">
       </PAGE>
     </HEADER>
  </xsl:template>

   
  <xsl:template match="ns1:Canvas" mode="tabs">
        <PAGE NAME="{@Name}" ID="{@Name}">
        <LABEL>
            <xsl:value-of select="@Name" />
        </LABEL>
      </PAGE>            
  </xsl:template>
   
   
   
  <xsl:template match="ns1:Canvas" >
    <xsl:param name="cnvwindow" select="@WindowName" />
    
    <xsl:choose>
      <xsl:when test="count(//ns1:FormModule/ns1:Canvas[@WindowName=$cnvwindow and not(@ParentName='HORI_CVS' or @ParentName='VERT_CVS' or contains(@CanvasType,'Toolbar'))]) &gt; 1">
	        <BLOCK SCREEN="{$cnvwindow}" TYPE="Single Entry" VIEW="Single Entry">
            <ID><xsl:text>BLK_</xsl:text><xsl:value-of select="@Name"/></ID>
            <OKCANCEL>0</OKCANCEL>
              <xsl:call-template name="StaticItemHandler">
                <xsl:with-param name="curr_cnv" select="." />
                <xsl:with-param name="tabname" select="@Name" />
              </xsl:call-template>
          </BLOCK>
          <xsl:call-template name="BlockHandler">
              <xsl:with-param name="cnvname" select="./@Name" />
              <xsl:with-param name="tabname" select="@Name" />
              <xsl:with-param name="scrnname" select="$cnvwindow" />
          </xsl:call-template>
      </xsl:when>
      <xsl:when test="count(//ns1:FormModule/ns1:Canvas[@WindowName=$cnvwindow and not(@ParentName='HORI_CVS' or @ParentName='VERT_CVS' or contains(@CanvasType,'Toolbar'))]) = 1">
         <BLOCK SCREEN="{@Name}" TYPE="Single Entry" VIEW="Single Entry">
           <ID><xsl:text>BLK_</xsl:text><xsl:value-of select="@Name"/></ID>
           <OKCANCEL>0</OKCANCEL>
              <xsl:call-template name="StaticItemHandler">
                <xsl:with-param name="curr_cnv" select="." />
                <xsl:with-param name="tabname" select="'All'" />
              </xsl:call-template>         
         </BLOCK>
          <xsl:call-template name="BlockHandler">
              <xsl:with-param name="cnvname" select="./@Name" />
              <xsl:with-param name="tabname" select="'All'" />
              <xsl:with-param name="scrnname" select="@Name" />
          </xsl:call-template>         
      </xsl:when>
      <xsl:otherwise/>
    </xsl:choose>      
  </xsl:template>
  
  
      
  <xsl:template name="AuditBlkHandler">
    <xsl:param name="mainwinname"  />
    <xsl:param name="firstnavblk"  />
    <xsl:param name="dbt" select="//ns1:FormModule/ns1:Block[@Name=$firstnavblk]/@QueryDataSourceName" />
    <!-- <xsl:variable name="auditBlkDataSrc" select="name(//ns1:FormModule/ns1:Block[Item[@Name = 'MAKER_ID']])"/> -->
   <xsl:variable name="auditBlkDataSrc" select="//ns1:FormModule/ns1:Block[ns1:Item[@Name='MAKER_ID']]"/> 
    
    
    <xsl:choose>
      <xsl:when test="count(//ns1:FormModule/ns1:Canvas[@WindowName=$mainwinname and not(@ParentName='HORI_CVS' or @ParentName='VERT_CVS' or contains(@CanvasType,'Toolbar'))]) &gt; 1">          
        <BLOCK SCREEN="{$mainwinname}" TYPE="Audit Entry">
          <ID>BLK_AUDIT</ID>
          <ABS_POS>
            <xsl:value-of select="round(number(//ns1:FormModule/ns1:Window[@Name=$mainwinname]/@Height) div 0.65) + 10" />
            <xsl:text>,2</xsl:text>
          </ABS_POS>
<!--          <DBT><xsl:value-of select="$dbt" /></DBT> -->
          <DBT><xsl:value-of select="$auditBlkDataSrc/@QueryDataSourceName" /></DBT>           
          <TYPE>M</TYPE>
        </BLOCK>
      </xsl:when>
      <xsl:otherwise>
        <BLOCK SCREEN="{//ns1:FormModule/ns1:Canvas[@WindowName=$mainwinname]/@Name}" TYPE="Audit Entry">
          <ID>BLK_AUDIT</ID>
          <ABS_POS>
            <xsl:value-of select="round(number(//ns1:FormModule/ns1:Canvas[@WindowName=$mainwinname]/@Height) div 0.65)+ 10" />
            <xsl:text>,2</xsl:text>
          </ABS_POS>
<!--          <DBT><xsl:value-of select="$dbt" /></DBT> -->
          <DBT><xsl:value-of select="$auditBlkDataSrc/@QueryDataSourceName" /></DBT> 
          <TYPE>M</TYPE>
        </BLOCK>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template> <!-- end of AuditBlkHandler -->
  

  
  <xsl:template name="BlockHandler">
      <xsl:param name="cnvname"  />
      <xsl:param name="tabname" />
      <xsl:param name="scrnname"  />
      
     
  <!-- Here we need to process all items belonging to this canvas -->
      <xsl:for-each select="//ns1:FormModule/ns1:Block[ns1:Item/@CanvasName=$cnvname]" >
         <xsl:variable name="blkname" select="@Name" />
          <xsl:choose>
            <xsl:when test=" @RecordsDisplayCount &gt; 1">
                <xsl:if test="count(./ns1:Item[(@CanvasName=$cnvname and @ItemsDisplay='1') or @CanvasName='']) &gt; 0" >
                   <BLOCK SCREEN="{$scrnname}" TYPE="Single Entry" VIEW="Single Entry">               
                    <xsl:choose>
                      <xsl:when test="@QueryDataSourceName and @QueryDataSourceName!=''">
                        <ID><xsl:text>BLK_</xsl:text><xsl:value-of select="@QueryDataSourceName"/><xsl:text>_1</xsl:text></ID>
                      </xsl:when>
                      <xsl:otherwise>
                        <ID><xsl:text>BLK_</xsl:text><xsl:value-of select="@Name"/></ID>
                      </xsl:otherwise>
                    </xsl:choose>
                    <xsl:choose>
                      <xsl:when test="//ns1:FormModule[@FirstNavigationBlockName=$blkname]">
                        <OKCANCEL>-1</OKCANCEL>
                      </xsl:when>
                      <xsl:otherwise>
                        <OKCANCEL>0</OKCANCEL>
                      </xsl:otherwise>
                    </xsl:choose>                
                    <xsl:call-template name="ItemHandler">
                      <xsl:with-param name="cnvname" select="$cnvname" />
                      <xsl:with-param name="tabname" select="$tabname" />
                      <xsl:with-param name="curr_blk" select="." />
                      <xsl:with-param name="multiple" select="'N'" />
                      <xsl:with-param name="blkType" select="'Multiple'" />
                    </xsl:call-template>
                  </BLOCK>
                </xsl:if>
                <BLOCK SCREEN="{$scrnname}" TABPAGE="{$tabname}" TYPE="Multiple Entry" VIEW="Multiple Entry">
                
                <xsl:choose>
                  <xsl:when test="@QueryDataSourceName and @QueryDataSourceName!=''">
                    <ID><xsl:text>BLK_</xsl:text><xsl:value-of select="@QueryDataSourceName"/></ID>
                    <DBT><xsl:value-of select="@QueryDataSourceName"/></DBT>
                  </xsl:when>
                  <xsl:otherwise>
                    <ID><xsl:text>BLK_</xsl:text><xsl:value-of select="@Name"/></ID>
                    <DBT><xsl:value-of select="@Name"/></DBT>
                  </xsl:otherwise>
                </xsl:choose>
                <ABS_POS>
                <xsl:value-of select="round(number(./ns1:Item[@CanvasName=$cnvname and ( not(@ItemsDisplay) or @ItemsDisplay!='1') and @YPosition][1]/@YPosition) div 0.65)" />
                <xsl:text>,</xsl:text>
                <xsl:value-of select="round(number(./ns1:Item[@CanvasName=$cnvname and ( not(@ItemsDisplay) or @ItemsDisplay!='1') and @XPosition][1]/@XPosition) div 0.65)" />
              
                </ABS_POS>
                <WIDTH><xsl:value-of select="(count(./ns1:Item[@CanvasName=$cnvname and ( not(@ItemsDisplay) or @ItemsDisplay!='1')])+1)div 0.01" /></WIDTH>
                <HEIGHT><xsl:value-of select="(number(@RecordsDisplayCount) div 0.04)" /></HEIGHT> 
                <xsl:call-template name="MultipleItemHandler">
                  <xsl:with-param name="cnvname" select="$cnvname" />
                  <xsl:with-param name="tabname" select="$tabname" />
                  <xsl:with-param name="curr_blk" select="." />
                  <xsl:with-param name="multiple" select="'Y'" />
                </xsl:call-template>
                </BLOCK>
            </xsl:when>
            <xsl:when test="not(@RecordsDisplayCount) or @RecordsDisplayCount = 1">
               <BLOCK SCREEN="{$scrnname}" TYPE="Single Entry" VIEW="Single Entry">
                <xsl:choose>
                  <xsl:when test="@QueryDataSourceName and @QueryDataSourceName!=''">
                    <ID><xsl:text>BLK_</xsl:text><xsl:value-of select="@QueryDataSourceName"/></ID>
                  </xsl:when>
                  <xsl:otherwise>
                    <ID><xsl:text>BLK_</xsl:text><xsl:value-of select="@Name"/></ID>
                  </xsl:otherwise>
                </xsl:choose>                 
                <xsl:choose>
                  <xsl:when test="//ns1:FormModule[@FirstNavigationBlockName=$blkname]">
                    <OKCANCEL>-1</OKCANCEL>                
                  </xsl:when>
                  <xsl:otherwise>
                    <OKCANCEL>0</OKCANCEL>                
                  </xsl:otherwise>
                </xsl:choose>                
                <xsl:call-template name="ItemHandler">
                  <xsl:with-param name="cnvname" select="$cnvname" />
                  <xsl:with-param name="tabname" select="$tabname" />
                  <xsl:with-param name="curr_blk" select="." />
                  <xsl:with-param name="multiple" select="'N'" />
                  <xsl:with-param name="blkType" select="'Single'" />
                </xsl:call-template>
              </BLOCK>
            </xsl:when>
            <xsl:otherwise/>
          </xsl:choose>
      </xsl:for-each>      
  </xsl:template>  <!-- end of BlockHandler -->
      
  <xsl:template name="ItemHandler">
      <xsl:param name="cnvname"  />
      <xsl:param name="tabname" />
      <xsl:param name="curr_blk"  />
      <xsl:param name="multiple"  />
      <xsl:param name="blkType"  />
       
       <xsl:for-each select="$curr_blk/ns1:Item[($blkType='Single' and (@CanvasName=$cnvname or @CanvasName='')) or
                                                ($blkType='Multiple' and ((@CanvasName=$cnvname and @ItemsDisplay='1') or @CanvasName=''))]" >          
            <xsl:call-template name="ItemTypeHandler">
              <xsl:with-param name="curr_item" select="." />
              <xsl:with-param name="tabname" select="$tabname" />
              <xsl:with-param name="dbt" select="$curr_blk/@QueryDataSourceName" />
              <xsl:with-param name="multiple" select="$multiple" />
            </xsl:call-template>
 
       </xsl:for-each>
  </xsl:template>  <!-- end of ItemHandler -->
      


  <xsl:template name="MultipleItemHandler">
      <xsl:param name="cnvname"  />
      <xsl:param name="tabname" />
      <xsl:param name="curr_blk"  />
      <xsl:param name="multiple"  />
      
       <xsl:for-each select="$curr_blk/ns1:Item[@CanvasName=$cnvname and 
                                                (not(@ItemsDisplay) or @ItemsDisplay!='1')]" >          
            <xsl:call-template name="ItemTypeHandler">
              <xsl:with-param name="curr_item" select="." />
              <xsl:with-param name="tabname" select="$tabname" />
              <xsl:with-param name="dbt" select="$curr_blk/@QueryDataSourceName" />
              <xsl:with-param name="multiple" select="$multiple" />
            </xsl:call-template>
       </xsl:for-each>
  </xsl:template>  <!-- end of MultipleItemHandler-->
  
  
  
  <xsl:template name="ItemTypeHandler">
      <xsl:param name="curr_item"  />
      <xsl:param name="tabname" />
      <xsl:param name="dbt"  />
      <xsl:param name="multiple"  />
      
        <xsl:if test="$curr_item/@Name != 'MOD_NO' and $curr_item/@Name != 'MAKER_ID' and 
                      $curr_item/@Name != 'CHECKER_ID' and
                      $curr_item/@Name != 'MAKER_DT_STAMP' and  $curr_item/@Name != 'CHECKER_DT_STAMP' and
                      $curr_item/@Name != 'ONCE_AUTH' and $curr_item/@Name != 'RECORD_STAT' and 
                      $curr_item/@Name != 'AUTH_STAT'" >
          <!-- commented by Saidul          
          <xsl:if test="$curr_item/@Prompt and $multiple='N'" >
                  <xsl:call-template name="LabelHandler">
                    <xsl:with-param name="curr_item" select="$curr_item" />
                    <xsl:with-param name="tabname" select="$tabname" />
                  </xsl:call-template>
            </xsl:if>
            
            -->
            <xsl:choose>
              <xsl:when test="$curr_item/@ItemType='List Item' or
                              $curr_item/@ItemType='Hierarchical Tree'
                              or contains($curr_item/@ParentName,'COMBO')">                
                <FIELD TABPAGE="{$tabname}" ROW="" COL="" QRY_COL="" RSLT_COL="">
                <xsl:call-template name="ListItemHandler">
                  <xsl:with-param name="dbt" select="$dbt" />
                  <xsl:with-param name="curr_item" select="$curr_item" />
                  <xsl:with-param name="multiple" select="$multiple" />
                </xsl:call-template>
                </FIELD>
              </xsl:when>        
              <xsl:when test="$curr_item/@ItemType='Radio Group' or
                              contains($curr_item/@ParentName,'RADIOBUTTON')">
                  <xsl:call-template name="RadioHandler">
                    <xsl:with-param name="dbt" select="$dbt" />
                    <xsl:with-param name="curr_item" select="$curr_item" />
                    <xsl:with-param name="multiple" select="$multiple" />
                    <xsl:with-param name="tabname" select="$tabname" />
                  </xsl:call-template>
              </xsl:when>
              <xsl:when test="$curr_item/@ItemType='Check Box' or
                              $curr_item/@ItemType='Chart Item' or
                              contains($curr_item/@ParentName,'CHECKBOX')">  
                <xsl:if test="$curr_item/@Label and $multiple='N'">
                  <xsl:call-template name="LabelHandler">
                    <xsl:with-param name="curr_item" select="$curr_item" />
                    <xsl:with-param name="tabname" select="$tabname" />
                  </xsl:call-template>
                </xsl:if>
                <FIELD TABPAGE="{$tabname}" ROW="" COL="" QRY_COL="" RSLT_COL="">
                <xsl:call-template name="CheckBoxHandler">
                  <xsl:with-param name="dbt" select="$dbt" />
                  <xsl:with-param name="curr_item" select="$curr_item" />
                  <xsl:with-param name="multiple" select="$multiple" />
                </xsl:call-template>
               </FIELD>
              </xsl:when> 
              <xsl:when test="$curr_item/@ItemType='Text Item' or $curr_item/@ItemType='User Area' or
                              (not($curr_item/@ItemType) and 
                              (contains($curr_item/@ParentName,'TEXT') or contains($curr_item/@ParentName,'TXT'))) or
                              (not($curr_item/@ItemType) and 
                              (not($curr_item/@ParentName) or $curr_item/@ParentName='')) or 
                              (not($curr_item/@ItemType) and 
                              (not($curr_item/@CanvasName) or $curr_item/@CanvasName='')) or
                              $curr_item/@ItemType='Display Item' or 
                              (not($curr_item/@ItemType) and contains($curr_item/@ParentName,'PC_DIS_'))">      
          
                <FIELD TABPAGE="{$tabname}" ROW="" COL="" QRY_COL="" RSLT_COL="">
                <xsl:call-template name="TextItemHandler">
                  <xsl:with-param name="dbt" select="$dbt" />
                  <xsl:with-param name="curr_item" select="$curr_item" />
                  <xsl:with-param name="multiple" select="$multiple" />
                </xsl:call-template>       
                 </FIELD>
              </xsl:when>          
              <xsl:when test="$curr_item/@ItemType='Push Button' or 
                              $curr_item/@ParentName='PC_BUTTON_ICONIC' or
                              contains($curr_item/@ParentName,'BUTTON') or 
                              contains($curr_item/@ParentName,'PC_BTN')">  
                <xsl:if test="(not($curr_item/@IconFilename) or 
                              ($curr_item/@IconFilename !='ok' and
                              not($curr_item/@IconFilename='cancel' or contains($curr_item/@IconFilename,'exit'))
                              and $curr_item/@IconFilename!='delrow' and
                              $curr_item/@IconFilename!='addrow' and  $curr_item/@IconFilename!='zoom')) ">
                             
                  <FIELD TABPAGE="{$tabname}" ROW="" COL="" QRY_COL="" RSLT_COL="">
                  <xsl:call-template name="ButtonHandler">
                    <xsl:with-param name="dbt" select="$dbt" />
                    <xsl:with-param name="curr_item" select="$curr_item" />
                    <xsl:with-param name="multiple" select="$multiple" />
                  </xsl:call-template>       
                  </FIELD>
                </xsl:if>
              </xsl:when>      
              <xsl:otherwise/>
            </xsl:choose>
        </xsl:if>  
  
  </xsl:template>
  
  
  <xsl:template name="TextItemHandler">
    <xsl:param name="dbt"  />
    <xsl:param name="curr_item"  />  
    <xsl:param name="multiple"  />    
     
      <xsl:choose>
        <xsl:when test="$curr_item/@CanvasName=''">
          <TYPE>HIDDEN</TYPE>
        </xsl:when>
        <xsl:otherwise>
          <TYPE>TEXT</TYPE>        
        </xsl:otherwise>
      </xsl:choose>
      <xsl:call-template name="GenericAttrHandler">
        <xsl:with-param name="dbt" select="$dbt" />
        <xsl:with-param name="curr_item" select="$curr_item" />
        <xsl:with-param name="multiple" select="$multiple" />
      </xsl:call-template>           
      <MAXLENGTH> <xsl:value-of select="$curr_item/@MaximumLength" /> </MAXLENGTH>       
      <xsl:if test="$multiple='N' and  $curr_item/@CanvasName!=''" >
        <ABS_POS>
        <xsl:value-of select="round($curr_item/@YPosition div 0.65)"/>
        <xsl:text>,</xsl:text>
        <xsl:value-of select="round($curr_item/@XPosition div 0.65)"/>
        </ABS_POS>
      </xsl:if>
      <xsl:choose>
        <xsl:when test="$curr_item/@Width" >      
           <SIZE><xsl:value-of select="round($curr_item/@Width div 7)"/></SIZE>  
        </xsl:when>
        <xsl:when test="$curr_item/@MaximumLength" >      
           <SIZE><xsl:value-of select="number($curr_item/@MaximumLength)"/></SIZE>  
        </xsl:when>
        <xsl:otherwise>
           <SIZE>1</SIZE>  
        </xsl:otherwise>
     </xsl:choose>     
     <xsl:if test="$curr_item/@LovName" >
         <LOV>
           <NAME> <xsl:value-of select="$curr_item/@LovName"/> </NAME>
         </LOV>
     </xsl:if>
     
  </xsl:template> <!-- end of TextItemHandler -->
  
  
  
  <xsl:template name="RadioHandler">
    <xsl:param name="dbt"  /> 
    <xsl:param name="curr_item"  />  
    <xsl:param name="multiple"  /> 
    <xsl:param name="tabname"  />
    
    <xsl:for-each select="$curr_item/ns1:RadioButton" >
       
      <FIELD TABPAGE="{$tabname}" ROW="" COL="" QRY_COL="" RSLT_COL="">
        <TYPE>RADIO</TYPE>     

        <xsl:call-template name="GenericAttrHandler">
          <xsl:with-param name="dbt" select="$dbt" />
          <xsl:with-param name="curr_item" select="$curr_item" />
          <xsl:with-param name="multiple" select="$multiple" />
        </xsl:call-template>     
        <xsl:if test="$curr_item/@ItemType='Radio Group' or
                        contains($curr_item/@ParentName,'RADIOBUTTON')">
          <ID><xsl:value-of select="@ID"/></ID>
        </xsl:if>    
        <VALUE> <xsl:value-of select="@RadioButtonValue"/> </VALUE>
        <xsl:if test="$multiple='N'" >
          <ABS_POS>
            <xsl:value-of select="round(@YPosition div 0.65)"/>
            <xsl:text>,</xsl:text>
            <xsl:value-of select="round(@XPosition div 0.65)-25"/>
          </ABS_POS>       
        </xsl:if>
      </FIELD>
      <xsl:if test="$multiple='N'">
        <xsl:call-template name="LabelHandler">
          <xsl:with-param name="curr_item" select="." />
          <xsl:with-param name="tabname" select="$tabname" />
        </xsl:call-template>  
      </xsl:if>
    </xsl:for-each>
  </xsl:template> <!-- end of RadioHandler -->
  
  
  
  <xsl:template name="ButtonHandler">
    <xsl:param name="dbt"  />  
    <xsl:param name="curr_item"  />
    <xsl:param name="multiple" /> 
  
      <TYPE>BUTTON</TYPE>       
      <xsl:choose>
        <xsl:when test="not($curr_item/@Iconic) or $curr_item/@Iconic = 'false'">
           <LABEL> <xsl:value-of select="$curr_item/@Label"/></LABEL>
        </xsl:when>
        <xsl:when test="$curr_item/@Iconic='true'" >
           <SRC>
             <xsl:text>Images/</xsl:text>
             <xsl:value-of select="$curr_item/@IconFilename" />
             <xsl:text>.gif</xsl:text>
           </SRC>
        </xsl:when>
        <xsl:otherwise/>
      </xsl:choose>
      <xsl:call-template name="GenericAttrHandler">
        <xsl:with-param name="dbt" select="$dbt" />
        <xsl:with-param name="curr_item" select="$curr_item" />
        <xsl:with-param name="multiple" select="$multiple" />
      </xsl:call-template>
      
      <xsl:if test="$multiple='N'" >
        <ABS_POS>
        <xsl:value-of select="round($curr_item/@YPosition div 0.65)"/>
        <xsl:text>,</xsl:text>
        <xsl:value-of select="round($curr_item/@XPosition div 0.65)"/>
        </ABS_POS>   
      </xsl:if>
      <EVENT>
        <NAME>onClick</NAME>
        <FUNCTION>fndoSomething()</FUNCTION>
      </EVENT>
  </xsl:template> <!-- end of ButtonHandler -->
  
  
  
  <xsl:template name="ListItemHandler">
    <xsl:param name="dbt"  />
    <xsl:param name="curr_item"  />  
    <xsl:param name="multiple"  /> 
  
      <TYPE>SELECT</TYPE>       
      <xsl:call-template name="GenericAttrHandler">
        <xsl:with-param name="dbt" select="$dbt" />
        <xsl:with-param name="curr_item" select="$curr_item" />
        <xsl:with-param name="multiple" select="$multiple" />
      </xsl:call-template>          
      <MULTIPLE>0</MULTIPLE>          
      <SIZE>1</SIZE>    
      <xsl:if test="$multiple='N'" >
        <ABS_POS>
        <xsl:value-of select="round($curr_item/@YPosition div 0.65)"/>
        <xsl:text>,</xsl:text>
        <xsl:value-of select="round($curr_item/@XPosition div 0.65)"/>
        </ABS_POS>  
      </xsl:if>
      <xsl:choose>
        <xsl:when test="$curr_item/@Width" >      
           <WIDTH><xsl:value-of select="round($curr_item/@Width div 0.65)"/></WIDTH>            
        </xsl:when>
        <xsl:otherwise>
           <WIDTH><xsl:value-of select="round($curr_item/@MaximumLength + 5)"/></WIDTH> 
        </xsl:otherwise>
     </xsl:choose>     
     <xsl:for-each select="$curr_item/ns1:ListItemElement" >
       <xsl:sort select="@Index" data-type="number" order="ascending"/>
         <OPTION SELECTED="0" VALUE="{@Value}">
               <xsl:value-of select="@Name"/>
         </OPTION>
     </xsl:for-each>
     
  </xsl:template> <!-- end of ListItemHandler -->
  
  
  <xsl:template name="CheckBoxHandler">
    <xsl:param name="dbt"  />
    <xsl:param name="curr_item"  />  
    <xsl:param name="multiple" />    
             
      <TYPE>CHECKBOX</TYPE>
      <xsl:call-template name="GenericAttrHandler">
        <xsl:with-param name="dbt" select="$dbt" />
        <xsl:with-param name="curr_item" select="$curr_item" />
        <xsl:with-param name="multiple" select="$multiple" />
      </xsl:call-template>   
      <xsl:if test="$multiple='N'" >
        <ABS_POS>
        <xsl:value-of select="round($curr_item/@YPosition div 0.65)"/>
        <xsl:text>,</xsl:text>
        <xsl:value-of select="round($curr_item/@XPosition div 0.65) - 25 "/>
        </ABS_POS>   
      </xsl:if>
  </xsl:template> <!-- end of CheckBoxHandler -->
  
  
  
  <xsl:template name="GenericAttrHandler">
    <xsl:param name="dbt" />
    <xsl:param name="curr_item" />
    <xsl:param name="multiple"  />
      <NAME> <xsl:value-of select="$curr_item/@Name"/> </NAME>      
      <xsl:if test="count($curr_item/@ItemType) &lt; 1 or $curr_item/@ItemType!='Radio Group' or ($curr_item/@ParentName != '' and
                        not(contains($curr_item/@ParentName,'RADIOBUTTON')))">
          <ID><xsl:value-of select="$curr_item/@ID"/></ID>
      </xsl:if>
      
      <xsl:choose>
        <xsl:when test="not($curr_item/@Required)">
          <REQUIRED>0</REQUIRED> 
        </xsl:when>
        <xsl:when test="$curr_item/@Required='true'" >
           <REQUIRED>-1</REQUIRED>  
        </xsl:when>
        <xsl:otherwise>
          <REQUIRED>0</REQUIRED> 
        </xsl:otherwise>
      </xsl:choose>      
      <xsl:if test="$multiple='Y'" >
        <LABEL> <xsl:value-of select="$curr_item/@Prompt"/></LABEL>
      </xsl:if> 
     <!-- <xsl:if test="$curr_item/@DatabaseItem='true' or $curr_item/@ColumnName" >
        <xsl:if test="$multiple='N'" >
          <DBT> <xsl:value-of select="$dbt"/></DBT>
        </xsl:if>
        <xsl:choose>
          <xsl:when test="$curr_item/@ColumnName">
             <DBC> <xsl:value-of select="$curr_item/@ColumnName"/></DBC>
          </xsl:when>
          <xsl:otherwise>
             <DBC> <xsl:value-of select="$curr_item/@Name"/></DBC>
         </xsl:otherwise>
        </xsl:choose> 
      </xsl:if> -->
      <xsl:choose>
          <xsl:when test="$curr_item/@DatabaseItem = 'false' ">
           <!-- <DBT></DBT>
            <DBC></DBC> -->
          </xsl:when>
          <xsl:when test="$curr_item/@DatabaseItem = 'true' or $curr_item/@ColumnName" >
                  <xsl:if test="$multiple='N'" >
                      <DBT> <xsl:value-of select="$dbt"/></DBT>
                  </xsl:if>
                  <xsl:choose>
                    <xsl:when test="$curr_item/@ColumnName">
                        <DBC> <xsl:value-of select="$curr_item/@ColumnName"/></DBC>
                    </xsl:when>
                   <xsl:otherwise>
                        <DBC> <xsl:value-of select="$curr_item/@Name"/></DBC>
                  </xsl:otherwise>
                 </xsl:choose>          
          </xsl:when>
          <xsl:otherwise>
                <xsl:if test=" not($curr_item/@ItemType='Push Button' or 
                              $curr_item/@ParentName='PC_BUTTON_ICONIC' or
                              contains($curr_item/@ParentName,'BUTTON') or 
                              contains($curr_item/@ParentName,'PC_BTN')) and $dbt !=''">
                      <xsl:if test="$multiple='N'" >
                         <DBT> <xsl:value-of select="$dbt"/></DBT>
                      </xsl:if>
                        <DBC> <xsl:value-of select="$curr_item/@Name"/></DBC>
                </xsl:if>
          </xsl:otherwise>
       </xsl:choose> 
      
      <AUTHSCRN>0</AUTHSCRN>
      <xsl:choose>
        <xsl:when test="$curr_item/@Enabled='false' or 
                        $curr_item/@ItemType='Display Item' or 
                        contains($curr_item/@ParentName,'PC_DIS_DESCRIPTION')" >
          <DISABLED>-1</DISABLED>  
          <READ_ONLY>-1</READ_ONLY>  
        </xsl:when>
        <xsl:otherwise>
          <DISABLED>0</DISABLED>  
          <READ_ONLY>0</READ_ONLY>
        </xsl:otherwise>
      </xsl:choose>        
      <xsl:choose>
        <xsl:when test="$curr_item/@Visible='false' or 
                        $curr_item/@CanvasName='' or
                        ($curr_item/@XPosition='0' and $curr_item/@YPosition='0')">
           <HIDDEN>-1</HIDDEN> 
        </xsl:when>
        <xsl:otherwise>
          <HIDDEN>0</HIDDEN> 
        </xsl:otherwise>
      </xsl:choose>       
        <xsl:choose>
        <xsl:when test="$curr_item/@DataType='Number'" >
           <DTYPE>NUMBER</DTYPE>
        </xsl:when>
        <xsl:when test="$curr_item/@DataType='Date'" >
           <DTYPE>DATE</DTYPE>
        </xsl:when>    
        <xsl:when test="$curr_item/@DataType='Date'" >
           <DTYPE>VARCHAR2</DTYPE>
        </xsl:when>          
        <xsl:otherwise>
           <DTYPE>VARCHAR2</DTYPE> 
        </xsl:otherwise>
      </xsl:choose> 
      
  </xsl:template> <!-- end of GenericAttrHandler -->
  
  
  
  <xsl:template name="StaticItemHandler">
      <xsl:param name="curr_cnv"  />
      <xsl:param name="tabname" />
      
      <xsl:for-each select="$curr_cnv/ns1:Graphics">
          <!-- to be deleted later
          <NAMETEST> <xsl:value-of select="@Name" /></NAMETEST>
          <TYPETEST> <xsl:value-of select="@GraphicsType" /></TYPETEST> 
           to be deleted later -->          
             <xsl:choose>
              <xsl:when test="@GraphicsType='Rectangle' or 
                              @GraphicsType='Rounded Rectangle' or
                              @GraphicsType='Frame'">
                <FIELD TABPAGE="{$tabname}" ROW="" COL="" QRY_COL="" RSLT_COL="">
                <xsl:call-template name="FieldsetHandler">
                  <xsl:with-param name="curr_item" select="." />
                </xsl:call-template> 
                </FIELD>  
              </xsl:when>
              <xsl:when test="@GraphicsType='Text'">
                <xsl:if test="@GraphicsText != 'Input By' and @GraphicsText != 'Date Time' and
                              @GraphicsText != 'Input by' and @GraphicsText != 'Auth by' and
                              @GraphicsText != 'DateTime' and @GraphicsText != 'Datetime' and
                              @GraphicsText != 'Auth By' and  @GraphicsText != 'Mod No' and  
                              @GraphicsText != 'Authorised' and @GraphicsText != 'Open'" >               
                  <xsl:call-template name="LabelHandler">
                    <xsl:with-param name="curr_item" select="." />
                    <xsl:with-param name="tabname" select="$tabname" />
                  </xsl:call-template>                                            
                </xsl:if>
              </xsl:when>
              <xsl:otherwise/>
            </xsl:choose>                  
      </xsl:for-each>      
  </xsl:template> <!-- end of StaticItemHandler -->
  
      
      
  <xsl:template name="FieldsetHandler">
      <xsl:param name="curr_item"  />
      
      <NAME><xsl:value-of select="$curr_item/@Name"/></NAME>
      <ID><xsl:value-of select="$curr_item/@ID"/></ID>
      <TYPE>FIELDSET</TYPE>
      <REQUIRED>0</REQUIRED>
      <AUTHSCRN>0</AUTHSCRN>
      <READ_ONLY>0</READ_ONLY>
      <DISABLED>0</DISABLED>
      <HIDDEN>0</HIDDEN>
      <ABS_POS>
      <xsl:value-of select="round($curr_item/@YPosition div 0.65)"/>
      <xsl:text>,</xsl:text>
      <xsl:value-of select="round($curr_item/@XPosition div 0.65)"/>
      </ABS_POS>
      <WIDTH>
      <xsl:value-of select="round($curr_item/@Width div 0.65)"/>
      </WIDTH>
      <HEIGHT>
      <xsl:value-of select="round($curr_item/@Height div 0.65) + 2"/>
      </HEIGHT>
      <LEGEND></LEGEND>      
  </xsl:template>  <!-- end of FieldsetHandler -->
  
  
  
  <xsl:template name="LabelHandler">
      <xsl:param name="curr_item"  />
      <xsl:param name="tabname" />
      
      <FIELD TABPAGE="{$tabname}" ROW="" COL="" QRY_COL="" RSLT_COL="">
        <NAME><xsl:value-of select="concat('LBL_',$curr_item/@Name)"/> </NAME>       
      

      <!--<xsl:if test="$curr_item/@Prompt">
          <ID><xsl:value-of select="$curr_item/@PRMTID"/></ID>
      </xsl:if> -->
       <xsl:if test="count($curr_item/@Label) &gt; 0">
        <ID><xsl:value-of select="$curr_item/@LBLID"/></ID>
      </xsl:if>
      <xsl:if test="count($curr_item/@Label) = 0">
        <ID><xsl:value-of select="$curr_item/@ID"/></ID>
      </xsl:if>
      
        <TYPE>LABEL</TYPE>
        <xsl:choose>
           <xsl:when test="$curr_item/@GraphicsText" >
             <LABEL> 
                <!-- to be deleted later 
                <test1 type="{$curr_item/@Name}" canvas="{$curr_item/@CanvasName}" />
                to be deleted later disable-output-escaping="yes"translate($curr_item/@GraphicsText,'&amp;#10;','\n')-->
             <xsl:value-of  select="translate($curr_item/@GraphicsText,'&amp;#10;','')" /> 
             </LABEL>
           </xsl:when>
           <xsl:when test="$curr_item/@Prompt and $curr_item/@Prompt!=''" >
             <LABEL> <xsl:value-of select="$curr_item/@Prompt" /> </LABEL>
           </xsl:when>         
           <xsl:otherwise>
            <LABEL> <xsl:value-of select="$curr_item/@Label" /> </LABEL>
           </xsl:otherwise>
        </xsl:choose>
        <REQUIRED>0</REQUIRED>
        <AUTHSCRN>0</AUTHSCRN>
        <READ_ONLY>0</READ_ONLY>
        <DISABLED>0</DISABLED>
        <xsl:choose>
          <xsl:when test="$curr_item/@Visible='false' or 
                          $curr_item/@CanvasName='' or
                          ($curr_item/@Xposition='0' and $curr_item/@Yposition='0')">
             <HIDDEN>-1</HIDDEN> 
          </xsl:when>
          <xsl:otherwise>
            <HIDDEN>0</HIDDEN> 
          </xsl:otherwise>
        </xsl:choose>       
        <ABS_POS>      
        <xsl:value-of select="round($curr_item/@YPosition div 0.65)"/>
        <xsl:text>,</xsl:text>
        <xsl:choose>
          <xsl:when test="$curr_item/@Prompt and PromptAttachmentEdge='Start'"> 
              <xsl:value-of select="round($curr_item/@XPosition - (string-length($curr_item/@Prompt) div 0.25)) - ./@PromptAttachmentOffset"/>
          </xsl:when>    
          <xsl:when test="$curr_item/@Prompt and PromptAttachmentEdge='End'"> 
              <xsl:value-of select="round(($curr_item/@XPosition + $curr_item/@Width) div 0.65) - ./@PromptAttachmentOffset"/>
          </xsl:when>
          <xsl:when test="$curr_item/@HorizontalOrigin='Right'"> 
              <xsl:value-of select="round(($curr_item/@XPosition - $curr_item/@Width) div 0.65)"/>
          </xsl:when>        
          <xsl:otherwise>
            <xsl:value-of select="round($curr_item/@XPosition div 0.65)"/>
          </xsl:otherwise>
        </xsl:choose>
        </ABS_POS>     
    </FIELD>
   </xsl:template> 
   <!-- end of LabelHandler -->
  
</xsl:stylesheet>
