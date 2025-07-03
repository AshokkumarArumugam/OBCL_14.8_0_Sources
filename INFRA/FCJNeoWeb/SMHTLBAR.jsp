<%/*----------------------------------------------------------------------------------------------------
**
** File Name    : SMHTLBAR.jsp
**
** Module       : FCJWeb
**
** This source is part of the Oracle Flexcube Universal Banking
** Software System and is copyrighted by Oracle Financial Services Software Limited.

** All rights reserved.  No part of this work may be reproduced,
** stored in a retrieval system, adopted or transmitted in any form
** or by any means, electronic, mechanical, photographic, graphic,
** optic recording or otherwise, translated in any language or
** computer language, without the prior written permission  from Oracle Financial Services
** Software Limited.

** Oracle Financial Services Software Limited.,
** 10-11, SDF I, SEEPZ, Andheri (East),
** MUMBAI - 400 096.
** INDIA.

Copyright  � 2004-2016 by Oracle Financial Services Software Limited..
----------------------------------------------------------------------------------------------------
**	Modified By   : Hitesh Verma
** 	Modified on   : 07/09/2016
** 	Description   : HTML5 Changes
** 	Search String : HTML5 Changes

  **  Modified By          : Neethu Sreedharan
  **  Modified On          : 29-Nov-2016
  **  Modified Reason      : Toolbar button -close label changed from LBL_CLOSE to LBL_ACTION_CLOSE
  **  Retro Source         : 9NT1606_12_1_SYGNITY_S_A
  **  Search String        : 9NT1606_12_2_RETRO_12_1_23664159

  **  Modified By          : Selvam Manickam
  **  Modified On          : 15-Jun-2023
  **  Modified Reason      : Toolbar button -Hold, Liquidate, Template, View icon changed
  **  Search String        : Redwood_35358292  
--------------------------------------------------------------------------------------------------------- -
*/%>
<!DOCTYPE html><!--HTML5 Changes-->
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="utf-8"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.HashMap"%>
<%@ page import="java.util.Iterator"%>
<%@ page import="com.ofss.fcc.common.FCUserGlobals"%>
<%@ page import="com.ofss.fcc.common.BranchConstants"%>
<%@ page import="com.ofss.fcc.commonif.IFCActionConstants"%>
<%@ page import="com.ofss.fcc.factory.FCCacheFactory"%>
<%@ page import="com.ofss.infra.oindicator.OIndicator"%>
<%@ page import="com.ofss.fcc.utility.StringEscapeUtils"%>
<%@ page import="java.util.Calendar"%>
<%
   /*JAN_CPU_BUG-25068346 Start-- */
    response.setCharacterEncoding("UTF-8");
    response.setHeader( "Pragma", "no-cache" );   
    response.setHeader( "Cache-Control", "no-cache" );
    response.setHeader( "Cache-Control", "no-store" );
    response.setDateHeader( "Expires", -1 );
	/*JAN_CPU_BUG-25068346 End-- */
    //System.out.println("ToolBar start:" + Calendar.getInstance().get(Calendar.HOUR)+":"+Calendar.getInstance().get(Calendar.MINUTE)+":"+Calendar.getInstance().get(Calendar.SECOND)+":"+Calendar.getInstance().get(Calendar.MILLISECOND));
    String strTheme         = (String)session.getAttribute("THEME");
    String lang             = (String)session.getAttribute("LANG");
    String langISOMap       = (String)session.getAttribute("LANGISOMAP");
    request.setCharacterEncoding("UTF-8");
    FCUserGlobals uc        = (FCUserGlobals)session.getAttribute(BranchConstants.USERGLOBALS);
    String homeBrn          = (String)session.getAttribute("HOMEBRN");
    String DefaultMod       = uc.getDefModule();
    String currentBranch    = (String)session.getAttribute("BRANCH_CODE");
    String appName          = (String)session.getAttribute("APPLICATION_NAME");
    String appExt           = (String)session.getAttribute("APPLICATION_EXT");
    String CSRFtoken        = (String)session.getAttribute("X-CSRFTOKEN");/*10.5.2 CSRFTOKEN changes*/
    int loginSessionInterval = Integer.parseInt((String)session.getAttribute("LOGIN_SESSION_INTERVAL"));
    String l_strTheme       = strTheme.substring(0, strTheme.indexOf(".css"));
    //String theme_imagesPath = "Images/"+l_strTheme;
    String userId           = (String)session.getAttribute("USERID");
    String entity       = (String) session.getAttribute("ENTITY");
    //FBContext fbContext = new FBContext(userId);
    StringBuffer sbKey     = new StringBuffer(20);
    sbKey.append("ITEM_DESC~").append(lang);
    String branchIdentifier = (String)session.getAttribute("BRNCENTRALIZED");
    Map itemDescMap = (Map) FCCacheFactory.getInstance().getFromCache(null,"ITEM_DESC~"+lang + "~" + entity, branchIdentifier,userId);
    
    String strNew       = (String)itemDescMap.get("LBL_NEW");
    String strUnlock    = (String)itemDescMap.get("LBL_UNLOCK");
    String strClose     = (String)itemDescMap.get("LBL_ACTION_CLOSE"); /* 9NT1606_12_2_RETRO_12_1_23664159 changes */
    String strReopen    = (String)itemDescMap.get("LBL_REOPEN");
    String strDelete    = (String)itemDescMap.get("LBL_DELETE");
    String strAuthorize = (String)itemDescMap.get("LBL_AUTHORIZE");
    String strPrint     = (String)itemDescMap.get("LBL_PRINT");
    String strRollover  = (String)itemDescMap.get("LBL_ROLLOVER");
    String strReverse   = (String)itemDescMap.get("LBL_REVERSE");
    String strConfirm   = (String)itemDescMap.get("LBL_CONFIRM");
    String strLiquidate = (String)itemDescMap.get("LBL_LIQUIDATE");
    String strHold      = (String)itemDescMap.get("LBL_HOLD");
    String strTemplate  = (String)itemDescMap.get("LBL_TEMPLATE");
    String strView      = (String)itemDescMap.get("LBL_TOOLBAR_VIEW");
    String strGenerate  = (String)itemDescMap.get("LBL_GENERATE");
    String strSave      = (String)itemDescMap.get("LBL_TOOLBAR_SAVE");
    String strCopy      = (String)itemDescMap.get("LBL_COPY");
    String strDelegate  = (String)itemDescMap.get("LBL_DELEGATE");
    String strTerminate = (String)itemDescMap.get("LBL_TERMINATE");
    String strAccept    = (String)itemDescMap.get("LBL_ACCEPT");
    String strReject    = (String)itemDescMap.get("LBL_REJECT");
    String strHome      = (String)itemDescMap.get("LBL_HOME");
    String strChgBrn    = (String)itemDescMap.get("LBL_CHANGE_BRANCH");
    String strChgMod    = (String)itemDescMap.get("LBL_CHANGE_MODULE");
    String strUsrBrn    = (String)itemDescMap.get("LBL_USER_BRANCHES");
    String strUsrMod    = (String)itemDescMap.get("LBL_USER_MODULES");        
    //FCIS9.1 Basic Qualification Changes
    String moduleid     = (String)itemDescMap.get("LBL_MODULE_ID");
    String strHomeBranch = (String)itemDescMap.get("LBL_HOME_BRANCH");
    String strSignOff   = (String)itemDescMap.get("LBL_SIGN_OFF");
    String strExit      = (String)itemDescMap.get("LBL_EXIT");
    String strHelp      = (String)itemDescMap.get("LBL_HELP1");
    String strGo        = (String)itemDescMap.get("LBL_GO");
    String strLOV       = (String)itemDescMap.get("LBL_LOV");
    String branch_code  = (String)itemDescMap.get("LBL_BRANCH_CODE");
    String noScriptLabel= (String)itemDescMap.get("LBL_NOSCRIPT_LABEL");
    String fastPath     = (String)itemDescMap.get("LBL_FASTPATH");
    String toolbar      = (String)itemDescMap.get("LBL_TOOLBAR");
    String entQry       = (String)itemDescMap.get("LBL_ENTR_QUERY");
    String extQry       = (String)itemDescMap.get("LBL_EXEC_QUERY");
    String functionId   = (String)itemDescMap.get("LBL_FUNCTIONID");
    
    Map actionDesc = new HashMap();
    actionDesc.put(IFCActionConstants.ACTION_NEW,strNew);
    actionDesc.put(IFCActionConstants.ACTION_COPY,strCopy);
    actionDesc.put(IFCActionConstants.ACTION_DELETE,strDelete);
    actionDesc.put(IFCActionConstants.ACTION_CLOSE,strClose);
    actionDesc.put(IFCActionConstants.ACTION_UNLOCK,strUnlock);
    actionDesc.put(IFCActionConstants.ACTION_REOPEN,strReopen);
    actionDesc.put(IFCActionConstants.ACTION_PRINT,strPrint);
    actionDesc.put(IFCActionConstants.ACTION_AUTHORIZE,strAuthorize);
    actionDesc.put(IFCActionConstants.ACTION_REVERSE,strReverse);
    actionDesc.put(IFCActionConstants.ACTION_ROLLOVER,strRollover);
    actionDesc.put(IFCActionConstants.ACTION_CONFIRM,strConfirm);
    actionDesc.put(IFCActionConstants.ACTION_LIQUIDATE,strLiquidate);
    actionDesc.put(IFCActionConstants.ACTION_HOLD,strHold);
    actionDesc.put(IFCActionConstants.ACTION_TEMPLATE,strTemplate);
    actionDesc.put(IFCActionConstants.ACTION_VIEW,strView);
    actionDesc.put(IFCActionConstants.ACTION_GENERATE,strGenerate);
    actionDesc.put(IFCActionConstants.ACTION_DELEGATE,strDelegate);
    actionDesc.put(IFCActionConstants.PROCESS_ACTION_TERMINATE,strTerminate);
    actionDesc.put(IFCActionConstants.PROCESS_ACTION_ACCEPT,strAccept);
    actionDesc.put(IFCActionConstants.PROCESS_ACTION_REJECT,strReject);

    Map details = new HashMap();
    if ("Y".equalsIgnoreCase(branchIdentifier)) {
        details = uc.getLoginProcessor().getActions();
    } else {
        HashMap menuDetails = (HashMap) session.getAttribute("MENUDETAILS");
        details     = (Map) menuDetails.get("ACTION_ICON");
    }
    Iterator itrKeys   = details.keySet().iterator();      
%>
    <script type="text/javascript">
        var actions_arr=new Array();
        //9NT1466_FCUBS_11.3.1_DeCentralised_and_Offline_56 starts
        var gbrn ='';  
        var gacc='';
        //9NT1466_FCUBS_11.3.1_DeCentralised_and_Offline_56 ends
        <%
        Iterator itrKeys1   = details.keySet().iterator();
        int count = 0;
        while(itrKeys1.hasNext()) {
            String action = (String)itrKeys1.next();
            String lowerAction = (action.substring(1,action.length())).toLowerCase();
            action = action.substring(0,1) + lowerAction;
        %>
            actions_arr['<%=count%>']='<%=StringEscapeUtils.escapeJavaScript(action)%>';
        <%
            count++;
        }
        %>	
    </script>
    <noscript><%=StringEscapeUtils.escapeJavaScript(noScriptLabel)%></noscript>
  <%-- toolbar related changes --%>
    <%--<legend><%=StringEscapeUtils.escapeHTML(toolbar)%></legend>--%>
    <input type="Hidden" name="X-CSRFTOKEN" value="<%= StringEscapeUtils.escapeHTML(CSRFtoken)%>"></input>
    <%--<div class="DIVTABlist1">--%>
    <oj-conveyor-belt id="htlBarMenu" class="convyorBeltContainer oj-sm-padding-4x-start" arrow-visibility="visible" data-oj-binding-provider="none">
    
      <!-- 1203 oghag change -->
      <%
      //itrKeys   = details.keySet().iterator();
      //itrValues = details.values().iterator();
      String actionLabel = "";
      int i=0;
      while(itrKeys.hasNext()) {  
          String action   = (String)itrKeys.next();
          String icon_url = "";
          boolean saveButtonAdded = false;        
          action = action.substring(0,1)+action.substring(1,action.length()).toLowerCase();       
          if("FCIS".equals(appName) && "Rollover".equals(action)){
              action ="Delegate";
          }
          
          actionLabel = (String)actionDesc.get(action);        
          if (action.equals(IFCActionConstants.ACTION_NEW)) icon_url = "oj-ux-ico-new-application";//;IFCActionConstants.ICON_URL_NEW_ENABLED;
          if (action.equals(IFCActionConstants.ACTION_COPY)) icon_url = "oj-ux-ico-copy";//IFCActionConstants.ICON_URL_COPY_ENABLED;
          if (action.equals(IFCActionConstants.ACTION_DELETE)) icon_url = "oj-ux-ico-delete-all";//IFCActionConstants.ICON_URL_DELETE_ENABLED;
          if (action.equals(IFCActionConstants.ACTION_CLOSE)) icon_url = "oj-ux-ico-close";//IFCActionConstants.ICON_URL_CLOSE_ENABLED;
          if (action.equals(IFCActionConstants.ACTION_UNLOCK)) icon_url = "oj-ux-ico-lock-open";
          if (action.equals(IFCActionConstants.ACTION_REOPEN)) icon_url = "oj-ux-ico-folder-open";
          if (action.equals(IFCActionConstants.ACTION_PRINT)) icon_url = "oj-ux-ico-print";//IFCActionConstants.ICON_URL_PRINT_ENABLED;
          if (action.equals(IFCActionConstants.ACTION_AUTHORIZE)) icon_url = "oj-ux-ico-key";
          if (action.equals(IFCActionConstants.ACTION_REVERSE)) icon_url = "oj-ux-ico-reverse-direction";
          
      
          //FCIS9.1 Basic Qualification Changes
          if("FCIS".equals(appName)){
              if (action.equals(IFCActionConstants.ACTION_DELEGATE)) icon_url = "oj-ux-ico-add-node";
          } else {
              if (action.equals(IFCActionConstants.ACTION_ROLLOVER)) icon_url = "oj-ux-ico-binary";//FCJ 7.2 ITR1 - 17        
          }
          
          if (action.equals(IFCActionConstants.ACTION_CONFIRM)) icon_url = "oj-ux-ico-completed";
		  //if (action.equals(IFCActionConstants.ACTION_LIQUIDATE)) icon_url = IFCActionConstants.ICON_URL_LIQUIDATE_ENABLED;//Redwood_35358292
		  if (action.equals(IFCActionConstants.ACTION_LIQUIDATE)) icon_url = "oj-ux-ico-customer-payment";//Redwood_35358292
          //if (action.equals(IFCActionConstants.ACTION_HOLD)) icon_url = "oj-ux-ico-check-hold";//Redwood_35358292
		  if (action.equals(IFCActionConstants.ACTION_HOLD)) icon_url = "oj-ux-ico-pause-circle";//Redwood_35358292
          //if (action.equals(IFCActionConstants.ACTION_TEMPLATE)) icon_url = "oj-ux-ico-create-and-edit-drawer-template";//FCJ 7.2 ITR1 - 17//Redwood_35358292
		  if (action.equals(IFCActionConstants.ACTION_TEMPLATE)) icon_url = "oj-ux-ico-template";//Redwood_35358292
          //if (action.equals(IFCActionConstants.ACTION_VIEW)) icon_url = "oj-ux-ico-contact-view";//Redwood_35358292
		  if (action.equals(IFCActionConstants.ACTION_VIEW)) icon_url = "oj-ux-ico-view";
          if (action.equals(IFCActionConstants.ACTION_GENERATE)) icon_url = "oj-ux-ico-settings";        
      %>
      <%--JS Segregation changes starts--%>
        <oj-button chroming="borderless" id="<%=StringEscapeUtils.escapeHTML(action)%>" on-oj-action="[[doAction.bind(null,'<%=StringEscapeUtils.escapeJavaScript(action)%>',event)]]" onkeydown="fnHandleScrBtn(event)"><%=StringEscapeUtils.escapeHTML(actionLabel)%>
        <span slot='startIcon' class="<%=StringEscapeUtils.escapeHTML(icon_url)%>"></span>
        </oj-button>
        <% 
          if (action.equals(IFCActionConstants.ACTION_PRINT) && !saveButtonAdded) {
        %>
          <oj-button chroming="borderless" id="Save" on-oj-action="[[doAction.bind(null,'Save',event)]]" onkeydown="fnHandleScrBtn(event)"><%=StringEscapeUtils.escapeHTML(strSave)%>
           <span slot='startIcon' class="oj-ux-ico-save"></span>
           </oj-button>
        <%
          }
        %>
      <%
        }
      %>
      <oj-button chroming="borderless" id="EnterQuery" on-oj-action="[[doAction.bind(null,'EnterQuery',event)]]" onkeydown="fnHandleScrBtn(event)"><%=StringEscapeUtils.escapeHTML(entQry)%>
       <span slot='startIcon' class="oj-ux-ico-oracle-chat-outline"></span>
      </oj-button>
      <oj-button chroming="borderless" id="ExecuteQuery"   on-oj-action="[[doAction.bind(null,'ExecuteQuery',event)]]" onkeydown="fnHandleScrBtn(event)"><%=StringEscapeUtils.escapeHTML(extQry)%>
      <span slot='startIcon' class="oj-ux-ico-create-options"></span>
      </oj-button>
    
    </oj-conveyor-belt>
    <%--JS Segregation changes ends--%>
    <%--</div>--%>
  <%-- toolbar related changes --%>
<%--</html>--%>
