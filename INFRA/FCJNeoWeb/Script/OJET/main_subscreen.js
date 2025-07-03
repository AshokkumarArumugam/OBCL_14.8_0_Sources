var sysPath = "JS/SYS/";
var reportJs="";
if("C"==thirdChar || "R"==thirdChar || "B"==thirdChar || "EXTAUTHORIZE"==functionId ) {
    sysPath =  "JS/";
    if("R"==thirdChar){
       reportJs='JS/FCJReport.js'; 
    }
}

var extGlobalSumUtilJs='';
var extGlobalSumAdvJs='';
var extGlobalSumJs='';
var summaryAdvJs='';
if("Y"==isAdvSumScr){
    extGlobalSumUtilJs='ExtJS/ExtGlobalSumUtil';
    extGlobalSumAdvJs='ExtJS/ExtGlobalSumAdv';
    extGlobalSumJs='ExtJS/ExtGlobalSum'; 
    summaryAdvJs=sysPath+summaryAdvJsFile;
}

var subscreenLaunched = false;

require.config( {
    baseUrl : 'Script/', paths :  {
        ojs : 'OJET/js/libs/oj/v17.0.4/min','jqueryui-amd' : 'OJET/js/libs/jquery/jqueryui-amd-1.13.2.min', jquery : 'OJET/js/libs/jquery/jquery-3.6.0.min', customElements : 'OJET/js/libs/webcomponents/custom-elements.min', ojdnd : 'OJET/js/libs/dnd-polyfill/dnd-polyfill-1.0.2.min', css : 'OJET/js/libs/require-css/css.min', fetch : 'OJET/js/libs/persist/min/impl/fetch', touchr : 'OJET/js/libs/touchr/touchr', ojL10n : 'OJET/js/libs/oj/v17.0.4/ojL10n', hammerjs : 'OJET/js/libs/hammer/hammer-2.0.8.min', ojtranslations : 'OJET/js/libs/oj/v17.0.4/resources', knockout : 'OJET/js/libs/knockout/knockout-3.5.1', promise : 'OJET/js/libs/es6-promise/es6-promise.min', preact : 'OJET/js/libs/preact/dist/preact.umd', "preact/hooks" : 'OJET/js/libs/preact/dist/hooks/dist/hooks.umd'
    },
     bundles: {
                 "oj-c/corepackbundle": ["oj-c/action-card", "oj-c/area-chart", "oj-c/area-chart-item", "oj-c/area-chart-series", "oj-c/area-chart-group", "oj-c/avatar", "oj-c/button", "oj-c/card-view", "oj-c/checkbox", "oj-c/checkboxset", "oj-c/collapsible", "oj-c/popup", "oj-c/conveyor-belt", "oj-c/date-picker", "oj-c/drag-handle", "oj-c/drawer-popup", "oj-c/drawer-layout", "oj-c/file-picker", "oj-c/form-layout", "oj-c/highlight-text", "oj-c/input-date-mask", "oj-c/input-date-picker", "oj-c/input-date-text", "oj-c/input-month-mask", "oj-c/input-number", "oj-c/input-password", "oj-c/input-text", "oj-c/input-sensitive-text", "oj-c/progress-bar", "oj-c/progress-circle", "oj-c/labelled-link", "oj-c/line-chart", "oj-c/line-chart-item", "oj-c/line-chart-series", "oj-c/line-chart-group", "oj-c/list-item-layout", "oj-c/list-view", "oj-c/rating-gauge", "oj-c/menu-button", "oj-c/message-banner", "oj-c/message-toast", "oj-c/meter-bar", "oj-c/meter-circle", "oj-c/selection-card", "oj-c/selector", "oj-c/selector-all", "oj-c/select-multiple", "oj-c/select-single", "oj-c/split-menu-button", "oj-c/tab-bar", "oj-c/tab-bar-mixed", "oj-c/text-area", "oj-c/legend", "oj-c/legend-item", "oj-c/legend-section", "oj-c/tag-cloud", "oj-c/tag-cloud-item", "oj-c/radioset", "oj-c/toggle-button", "oj-c/buttonset-single", "oj-c/buttonset-multiple", "oj-c/action-card/action-card-styles", "oj-c/area-chart/area-chart-styles", "oj-c/line-chart/line-chart-styles", "oj-c/avatar/avatar-styles", "oj-c/button/button-styles", "oj-c/card-view/card-view-styles", "oj-c/checkbox/checkbox-styles", "oj-c/checkboxset/checkboxset-styles", "oj-c/collapsible/collapsible-styles", "oj-c/conveyor-belt/conveyor-belt-styles", "oj-c/date-picker/date-picker-styles", "oj-c/drawer-popup/drawer-popup-styles", "oj-c/drawer-layout/drawer-layout-styles", "oj-c/file-picker/file-picker-styles", "oj-c/form-layout/form-layout-styles", "oj-c/highlight-text/highlight-text-styles", "oj-c/input-date-mask/input-date-mask-styles", "oj-c/input-date-picker/input-date-picker-styles", "oj-c/input-date-text/input-date-text-styles", "oj-c/input-month-mask/input-month-mask-styles", "oj-c/input-number/input-number-styles", "oj-c/input-password/input-password-styles", "oj-c/input-text/input-text-styles", "oj-c/input-sensitive-text/input-sensitive-text-styles", "oj-c/labelled-link/labelled-link-styles", "oj-c/list-item-layout/list-item-layout-styles", "oj-c/list-view/list-view-styles", "oj-c/popup/popup-styles", "oj-c/progress-bar/progress-bar-styles", "oj-c/progress-circle/progress-circle-styles", "oj-c/rating-gauge/rating-gauge-styles", "oj-c/selection-card/selection-card-styles", "oj-c/select-multiple/select-multiple-styles", "oj-c/select-single/select-single-styles", "oj-c/tab-bar/tab-bar-styles", "oj-c/tab-bar-mixed/tab-bar-mixed-styles", "oj-c/text-area/text-area-styles", "oj-c/menu-button/menu-button-styles", "oj-c/message-banner/message-banner-styles", "oj-c/message-toast/message-toast-styles", "oj-c/meter-bar/meter-bar-styles", "oj-c/meter-circle/meter-circle-styles", "oj-c/split-menu-button/split-menu-button-styles", "oj-c/legend/legend-styles", "oj-c/tag-cloud/tag-cloud-styles", "oj-c/radioset/radioset-styles", "oj-c/toggle-button/toggle-button-styles", "oj-c/buttonset-single/buttonset-single-styles", "oj-c/buttonset-multiple/buttonset-multiple-styles"],
                "ojs/oj3rdpartybundle": ["knockout", "jquery", "jqueryui-amd/version", "jqueryui-amd/widget", "jqueryui-amd/unique-id", "jqueryui-amd/keycode", "jqueryui-amd/focusable", "jqueryui-amd/tabbable", "jqueryui-amd/ie", "jqueryui-amd/widgets/draggable", "jqueryui-amd/widgets/mouse", "jqueryui-amd/widgets/sortable", "jqueryui-amd/data", "jqueryui-amd/plugin", "jqueryui-amd/safe-active-element", "jqueryui-amd/safe-blur", "jqueryui-amd/scroll-parent", "jqueryui-amd/widgets/draggable", "jqueryui-amd/position", "signals", "text", "hammerjs", "ojdnd", "preact", "preact/hooks", "preact/compat", "preact/jsx-runtime", "css", "touchr", "@oracle/oraclejet-preact/LayerStyles.styles", "@oracle/oraclejet-preact/UNSAFE_Environment", "@oracle/oraclejet-preact/UNSAFE_IntlDateTime", "@oracle/oraclejet-preact/UNSAFE_IntlFormatParse", "@oracle/oraclejet-preact/UNSAFE_Layer", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormVariantContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "@oracle/oraclejet-preact/resources/nls/supportedLocales", "@oracle/oraclejet-preact/translationBundle", "@oracle/oraclejet-preact/utils/UNSAFE_logger", "@oracle/oraclejet-preact/utils/UNSAFE_matchTranslationBundle"],
                "ojs/ojpreactbundle": ["@oracle/oraclejet-preact/ActionCardStyles.styles", "@oracle/oraclejet-preact/AvatarStyles.styles", "@oracle/oraclejet-preact/AvatarVariants.styles", "@oracle/oraclejet-preact/AxisStyles.styles", "@oracle/oraclejet-preact/BadgeStyles.styles", "@oracle/oraclejet-preact/BadgeVariants.styles", "@oracle/oraclejet-preact/BaseButtonStyles.styles", "@oracle/oraclejet-preact/BaseCardViewStyles.styles", "@oracle/oraclejet-preact/ButtonLabelLayoutStyles.styles", "@oracle/oraclejet-preact/ButtonLabelLayoutVariants.styles", "@oracle/oraclejet-preact/ButtonSetStyles.styles", "@oracle/oraclejet-preact/ChartStyles.styles", "@oracle/oraclejet-preact/CheckboxIconStyles.styles", "@oracle/oraclejet-preact/CheckboxIconVariants.styles", "@oracle/oraclejet-preact/CheckboxRadioFieldStyles.styles", "@oracle/oraclejet-preact/CheckboxSetStyles.styles", "@oracle/oraclejet-preact/CheckboxStyles.styles", "@oracle/oraclejet-preact/CheckboxVariants.styles", "@oracle/oraclejet-preact/ChipStyles.styles", "@oracle/oraclejet-preact/ClearSelection.styles", "@oracle/oraclejet-preact/CollapsibleStyles.styles", "@oracle/oraclejet-preact/CollapsibleVariants.styles", "@oracle/oraclejet-preact/ComponentMessageStyles.styles", "@oracle/oraclejet-preact/ConveyorBeltStyles.styles", "@oracle/oraclejet-preact/ConveyorBeltVariants.styles", "@oracle/oraclejet-preact/DataCursorStyles.styles", "@oracle/oraclejet-preact/DatePickerHeaderStyles.styles", "@oracle/oraclejet-preact/DayCellStyles.styles", "@oracle/oraclejet-preact/DragAndDropStyles.styles", "@oracle/oraclejet-preact/DragHandleStyles.styles", "@oracle/oraclejet-preact/DrawerLayoutStyles.styles", "@oracle/oraclejet-preact/DrawerPopupStyles.styles", "@oracle/oraclejet-preact/DrawerPopupVariants.styles", "@oracle/oraclejet-preact/DropdownMenuStyles.styles", "@oracle/oraclejet-preact/FilePickerStyles.styles", "@oracle/oraclejet-preact/FilePickerVariants.styles", "@oracle/oraclejet-preact/FlexStyles.styles", "@oracle/oraclejet-preact/FloatingStyles.styles", "@oracle/oraclejet-preact/FocusTrackerStyles.styles", "@oracle/oraclejet-preact/FormLayoutStyles.styles", "@oracle/oraclejet-preact/FormLayoutVariants.styles", "@oracle/oraclejet-preact/GridStyles.styles", "@oracle/oraclejet-preact/HiddenAccessibleStyles.styles", "@oracle/oraclejet-preact/HighlightTextStyles.styles", "@oracle/oraclejet-preact/IconStyle.styles", "@oracle/oraclejet-preact/ImageVars.styles", "@oracle/oraclejet-preact/InputDatePickerDropdownStyles.styles", "@oracle/oraclejet-preact/InsetStyles.styles", "@oracle/oraclejet-preact/LabelStyles.styles", "@oracle/oraclejet-preact/LabelValueLayoutStyles.styles", "@oracle/oraclejet-preact/LabelledLinkStyles.styles", "@oracle/oraclejet-preact/LabelledLinkVariants.styles", "@oracle/oraclejet-preact/LayerStyles.styles", "@oracle/oraclejet-preact/LayoutStyles.styles", "@oracle/oraclejet-preact/LegendStyles.styles", "@oracle/oraclejet-preact/LinkStyles.styles", "@oracle/oraclejet-preact/LinkVariants.styles", "@oracle/oraclejet-preact/ListItemLayoutStyles.styles", "@oracle/oraclejet-preact/ListStyles.styles", "@oracle/oraclejet-preact/ListViewStyles.styles", "@oracle/oraclejet-preact/LiveRegionStyles.styles", "@oracle/oraclejet-preact/MaxLengthCounterStyles.styles", "@oracle/oraclejet-preact/MenuItemStyles.styles", "@oracle/oraclejet-preact/MenuItemVariants.styles", "@oracle/oraclejet-preact/MenuSeparatorStyles.styles", "@oracle/oraclejet-preact/MenuStyles.styles", "@oracle/oraclejet-preact/MessageBannerStyles.styles", "@oracle/oraclejet-preact/MessageBannerVariants.styles", "@oracle/oraclejet-preact/MessageStyles.styles", "@oracle/oraclejet-preact/MessageToastStyles.styles", "@oracle/oraclejet-preact/MeterBarStyles.styles", "@oracle/oraclejet-preact/MeterBarVariants.styles", "@oracle/oraclejet-preact/MeterCircleStyles.styles", "@oracle/oraclejet-preact/MeterCircleVariants.styles", "@oracle/oraclejet-preact/MobileDropdownFooterStyles.styles", "@oracle/oraclejet-preact/ModalStyles.styles", "@oracle/oraclejet-preact/MonthViewStyles.styles", "@oracle/oraclejet-preact/NavigationListItemStyles.styles", "@oracle/oraclejet-preact/NavigationListItemVariants.styles", "@oracle/oraclejet-preact/NavigationListStyles.styles", "@oracle/oraclejet-preact/ObfuscatedTextFieldInputStyles.styles", "@oracle/oraclejet-preact/OverflowTabBarItemStyles.styles", "@oracle/oraclejet-preact/OverflowTabBarStyles.styles", "@oracle/oraclejet-preact/PlotAreaStyles.styles", "@oracle/oraclejet-preact/PopupStyles.styles", "@oracle/oraclejet-preact/PrefixSuffixStyles.styles", "@oracle/oraclejet-preact/ProgressBarStyles.styles", "@oracle/oraclejet-preact/ProgressBarVariants.styles", "@oracle/oraclejet-preact/ProgressCircleStyles.styles", "@oracle/oraclejet-preact/ProgressCircleVariants.styles", "@oracle/oraclejet-preact/ProgressiveLoaderStyles.styles", "@oracle/oraclejet-preact/RadioIconStyles.styles", "@oracle/oraclejet-preact/RadioIconVariants.styles", "@oracle/oraclejet-preact/RadioStyles.styles", "@oracle/oraclejet-preact/RatingGaugeStyles.styles", "@oracle/oraclejet-preact/RatingGaugeVariants.styles", "@oracle/oraclejet-preact/ReadonlyTextFieldInputStyles.styles", "@oracle/oraclejet-preact/ReadonlyTextFieldStyles.styles", "@oracle/oraclejet-preact/ReadonlyTextFieldVariants.styles", "@oracle/oraclejet-preact/ReorderableItemStyles.styles", "@oracle/oraclejet-preact/ReorderableTabBarItemStyles.styles", "@oracle/oraclejet-preact/ScrollBarStyles.styles", "@oracle/oraclejet-preact/SegmentStyles.styles", "@oracle/oraclejet-preact/SelectMobileFieldInputStyles.styles", "@oracle/oraclejet-preact/SelectedValuesCountStyles.styles", "@oracle/oraclejet-preact/SelectionCardStyles.styles", "@oracle/oraclejet-preact/SelectorStyles.styles", "@oracle/oraclejet-preact/SeparatorStyles.styles", "@oracle/oraclejet-preact/SheetMenuStyles.styles", "@oracle/oraclejet-preact/SheetStyles.styles", "@oracle/oraclejet-preact/SkeletonStyles.styles", "@oracle/oraclejet-preact/SplitMenuButtonStyles.styles", "@oracle/oraclejet-preact/SplitMenuButtonTheme.styles", "@oracle/oraclejet-preact/StyledCheckbox.styles", "@oracle/oraclejet-preact/StyledDatePickerButtonStyles.styles", "@oracle/oraclejet-preact/SvgShapesStyles.styles", "@oracle/oraclejet-preact/TabBarItemStyles.styles", "@oracle/oraclejet-preact/TabBarItemVariants.styles", "@oracle/oraclejet-preact/TabBarMixedSeparator.styles", "@oracle/oraclejet-preact/TabBarMixedStyles.styles", "@oracle/oraclejet-preact/TabBarStyles.styles", "@oracle/oraclejet-preact/TagCloudStyles.styles", "@oracle/oraclejet-preact/TextFieldInputStyles.styles", "@oracle/oraclejet-preact/TextFieldInputVariants.styles", "@oracle/oraclejet-preact/TextFieldLoadingStyles.styles", "@oracle/oraclejet-preact/TextFieldStyles.styles", "@oracle/oraclejet-preact/TextFieldVariants.styles", "@oracle/oraclejet-preact/TextStyles.styles", "@oracle/oraclejet-preact/TextTagListStyles.styles", "@oracle/oraclejet-preact/TextTagStyles.styles", "@oracle/oraclejet-preact/TooltipContentStyles.styles", "@oracle/oraclejet-preact/TooltipContentVariants.styles", "@oracle/oraclejet-preact/UNSAFE_ActionCard", "@oracle/oraclejet-preact/UNSAFE_Avatar", "@oracle/oraclejet-preact/UNSAFE_Button", "@oracle/oraclejet-preact/UNSAFE_ButtonSetItem", "@oracle/oraclejet-preact/UNSAFE_ButtonSetMultiple", "@oracle/oraclejet-preact/UNSAFE_ButtonSetSingle", "@oracle/oraclejet-preact/UNSAFE_CardFlexView", "@oracle/oraclejet-preact/UNSAFE_CardGridView", "@oracle/oraclejet-preact/UNSAFE_ChartWithLegend", "@oracle/oraclejet-preact/UNSAFE_Checkbox", "@oracle/oraclejet-preact/UNSAFE_CheckboxItem", "@oracle/oraclejet-preact/UNSAFE_CheckboxSet", "@oracle/oraclejet-preact/UNSAFE_Collapsible", "@oracle/oraclejet-preact/UNSAFE_ConveyorBelt", "@oracle/oraclejet-preact/UNSAFE_DatePicker", "@oracle/oraclejet-preact/UNSAFE_DragHandle", "@oracle/oraclejet-preact/UNSAFE_DrawerLayout", "@oracle/oraclejet-preact/UNSAFE_DrawerPopup", "@oracle/oraclejet-preact/UNSAFE_Dropdown", "@oracle/oraclejet-preact/UNSAFE_EmptyList", "@oracle/oraclejet-preact/UNSAFE_FilePicker", "@oracle/oraclejet-preact/UNSAFE_Flex", "@oracle/oraclejet-preact/UNSAFE_FormLayout", "@oracle/oraclejet-preact/UNSAFE_HighlightText", "@oracle/oraclejet-preact/UNSAFE_IconButton", "@oracle/oraclejet-preact/UNSAFE_IconMenuButton", "@oracle/oraclejet-preact/UNSAFE_IconToggleButton", "@oracle/oraclejet-preact/UNSAFE_InputDateMask", "@oracle/oraclejet-preact/UNSAFE_InputDatePicker", "@oracle/oraclejet-preact/UNSAFE_InputPassword", "@oracle/oraclejet-preact/UNSAFE_InputSensitiveText", "@oracle/oraclejet-preact/UNSAFE_InputText", "@oracle/oraclejet-preact/UNSAFE_Inset", "@oracle/oraclejet-preact/UNSAFE_Label", "@oracle/oraclejet-preact/UNSAFE_LabelValueLayout", "@oracle/oraclejet-preact/UNSAFE_LabelledLink", "@oracle/oraclejet-preact/UNSAFE_Legend", "@oracle/oraclejet-preact/UNSAFE_LineAreaChart", "@oracle/oraclejet-preact/UNSAFE_ListItemLayout", "@oracle/oraclejet-preact/UNSAFE_ListView", "@oracle/oraclejet-preact/UNSAFE_LiveRegion", "@oracle/oraclejet-preact/UNSAFE_Menu", "@oracle/oraclejet-preact/UNSAFE_MenuButton", "@oracle/oraclejet-preact/UNSAFE_MessageBanner", "@oracle/oraclejet-preact/UNSAFE_MessageToast", "@oracle/oraclejet-preact/UNSAFE_MeterBar", "@oracle/oraclejet-preact/UNSAFE_MeterCircle", "@oracle/oraclejet-preact/UNSAFE_NumberInputText", "@oracle/oraclejet-preact/UNSAFE_OverflowTabBar", "@oracle/oraclejet-preact/UNSAFE_Popup", "@oracle/oraclejet-preact/UNSAFE_ProgressBar", "@oracle/oraclejet-preact/UNSAFE_ProgressCircle", "@oracle/oraclejet-preact/UNSAFE_RadioItem", "@oracle/oraclejet-preact/UNSAFE_RadioSet", "@oracle/oraclejet-preact/UNSAFE_RatingGauge", "@oracle/oraclejet-preact/UNSAFE_ReorderableTabBar", "@oracle/oraclejet-preact/UNSAFE_SectionalLegend", "@oracle/oraclejet-preact/UNSAFE_SelectMultiple", "@oracle/oraclejet-preact/UNSAFE_SelectSingle", "@oracle/oraclejet-preact/UNSAFE_SelectionCard", "@oracle/oraclejet-preact/UNSAFE_Selector", "@oracle/oraclejet-preact/UNSAFE_SelectorAll", "@oracle/oraclejet-preact/UNSAFE_Sheet", "@oracle/oraclejet-preact/UNSAFE_SplitMenuButton", "@oracle/oraclejet-preact/UNSAFE_TabBar", "@oracle/oraclejet-preact/UNSAFE_TabBarCommon", "@oracle/oraclejet-preact/UNSAFE_TabBarMixed", "@oracle/oraclejet-preact/UNSAFE_TagCloud", "@oracle/oraclejet-preact/UNSAFE_TextArea", "@oracle/oraclejet-preact/UNSAFE_TextAreaAutosize", "@oracle/oraclejet-preact/UNSAFE_ToggleButton", "@oracle/oraclejet-preact/UNSAFE_UserAssistance", "@oracle/oraclejet-preact/UNSAFE_VisProgressiveLoader", "@oracle/oraclejet-preact/UNSAFE_VisStatusMessage", "@oracle/oraclejet-preact/UserAssistanceStyles.styles", "@oracle/oraclejet-preact/VisSkeletonStyles.styles", "@oracle/oraclejet-preact/VisStatusMessageStyles.styles", "@oracle/oraclejet-preact/VisTabularDatatipStyles.styles", "@oracle/oraclejet-preact/WindowOverlayStyles.styles", "@oracle/oraclejet-preact/boxalignment.styles", "@oracle/oraclejet-preact/dropdownStyles.styles", "@oracle/oraclejet-preact/dropdownStyles.styles2", "@oracle/oraclejet-preact/flexbox.styles", "@oracle/oraclejet-preact/flexitem.styles", "@oracle/oraclejet-preact/hooks/UNSAFE_useAccessibleContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useCategories", "@oracle/oraclejet-preact/hooks/UNSAFE_useFocusWithin", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormFieldContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useId", "@oracle/oraclejet-preact/hooks/UNSAFE_useInputGroupContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useMessagesContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useToggle", "@oracle/oraclejet-preact/hooks/UNSAFE_useTooltip", "@oracle/oraclejet-preact/hooks/UNSAFE_useTranslationBundle", "@oracle/oraclejet-preact/hooks/UNSAFE_useUncontrolledState", "@oracle/oraclejet-preact/hooks/UNSAFE_useUser", "@oracle/oraclejet-preact/mobileDropdownStyles.styles", "@oracle/oraclejet-preact/resources/nls/bundle", "@oracle/oraclejet-preact/selectMobileDropdownStyles.styles", "@oracle/oraclejet-preact/text.styles", "@oracle/oraclejet-preact/useChartMarquee.styles", "@oracle/oraclejet-preact/useDatatip.styles", "@oracle/oraclejet-preact/utils/UNSAFE_calendarDateUtils", "@oracle/oraclejet-preact/utils/UNSAFE_mergeProps", "@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout", "@oracle/oraclejet-preact/utils/UNSAFE_visUtils"],
                "ojs/ojcorebundle": ["ojL10n", "ojtranslations/nls/ojtranslations", "ojs/ojlogger", "ojs/ojcore-base", "ojs/ojcontext", "ojs/ojconfig", "ojs/ojresponsiveutils", "ojs/ojthemeutils", "ojs/ojtimerutils", "ojs/ojtranslation", "ojs/ojcore", "ojs/ojmessaging", "ojs/ojmetadatautils", "ojs/ojdefaultsutils", "ojs/ojcustomelement-utils", "ojs/ojcustomelement-registry", "ojs/ojcustomelement", "ojs/ojdomutils", "ojs/ojfocusutils", "ojs/ojgestureutils", "ojs/ojcomponentcore", "ojs/ojkoshared", "ojs/ojhtmlutils", "ojs/ojtemplateengine-ko", "ojs/ojtemplateengine-preact", "ojs/ojtemplateengine-preact-ko", "ojs/ojtemplateengine-utils", "ojs/ojcomposite-knockout", "ojs/ojcomposite", "ojs/ojbindingprovider", "ojs/ojknockouttemplateutils", "ojs/ojresponsiveknockoututils", "ojs/ojkeysetimpl", "ojs/ojknockout", "ojs/ojknockout-keyset", "ojs/ojknockout-validation", "ojs/ojrouter", "ojs/ojmodule", "ojs/ojmodule-element", "ojs/ojmodule-element-utils", "ojs/ojanimation", "ojs/ojmoduleanimations", "ojs/ojdefer", "ojs/ojdatasource-common", "ojs/ojarraytabledatasource", "ojs/ojarraytreedataprovider", "ojs/ojsuppressnodetreedataprovider", "ojs/ojeventtarget", "ojs/ojdataprovider", "ojs/ojdataprovideradapter-base", "ojs/ojdataprovideradapter", "ojs/ojset", "ojs/ojmap", "ojs/ojarraydataproviderimpl", "ojs/ojarraydataprovider", "ojs/ojlistdataproviderview", "ojs/ojcss", "ojs/ojbootstrap", "ojs/ojvcomponent", "ojs/ojpreact-managetabstops", "ojs/ojpreact-patch", "ojs/ojvcomponent-binding", "ojs/ojvcomponent-remounter", "ojs/ojvcomponent-template", "ojs/ojdataproviderhandler", "ojs/ojexpressionutils", "ojs/ojkeyset", "ojs/ojtreedataproviderview", "ojs/ojexpparser", "ojs/ojcspexpressionevaluator", "ojs/ojcspexpressionevaluator-internal", "ojs/ojtreedataprovideradapter", "ojs/ojcorerouter", "ojs/ojurlparamadapter", "ojs/ojurlpathadapter", "ojs/ojmodulerouter-adapter", "ojs/ojknockoutrouteradapter", "ojs/ojobservable", "ojs/ojbinddom", "ojs/ojdeferreddataprovider", "ojs/ojtracer", "ojs/ojcachediteratorresultsdataprovider", "ojs/ojdedupdataprovider", "ojs/ojmutateeventfilteringdataprovider", "ojs/ojdataproviderfactory", "ojs/ojtranslationbundleutils"],
                "ojs/ojcommoncomponentsbundle": ["ojs/ojoption", "ojs/ojchildmutationobserver", "ojs/ojjquery-hammer", "ojs/ojpopupcore", "ojs/ojpopup", "ojs/ojlabel", "ojs/ojlabelledbyutils", "ojs/ojbutton", "ojs/ojmenu", "ojs/ojtoolbar", "ojs/ojdialog", "ojs/ojoffcanvas", "ojs/ojdomscroller", "ojs/ojdatacollection-common", "ojs/ojdataproviderscroller", "ojs/ojlistview", "ojs/ojlistitemlayout", "ojs/ojnavigationlist", "ojs/ojavatar", "ojs/ojswitcher", "ojs/ojmessage", "ojs/ojmessages", "ojs/ojconveyorbelt", "ojs/ojcollapsible", "ojs/ojaccordion", "ojs/ojprogress", "ojs/ojprogressbar", "ojs/ojprogress-bar", "ojs/ojprogress-circle", "ojs/ojprogresslist", "ojs/ojfilmstrip", "ojs/ojtouchproxy", "ojs/ojselector", "ojs/ojtreeview", "ojs/ojinputsearch", "ojs/ojhighlighttext", "ojs/ojactioncard", "ojs/ojmessagebanner", "ojs/ojswipetoreveal", "ojs/ojswipeactions", "ojs/ojconverter-nativenumber", "ojs/ojconverter-preferences"],
                "ojs/ojformbundle": ["ojtranslations/nls/localeElements", "ojs/ojlocaledata", "ojs/ojconverterutils", "ojs/ojvalidator", "ojs/ojvalidation-error", "ojs/ojvalidator-required", "ojs/ojeditablevalue", "ojs/ojconverter", "ojs/ojvalidator-async", "ojs/ojconverterutils-i18n", "ojs/ojconverter-number", "ojs/ojvalidator-numberrange", "ojs/ojinputnumber", "ojs/ojvalidator-regexp", "ojs/ojfilter", "ojs/ojfilter-length", "ojs/ojinputtext", "ojs/ojoptgroup", "ojs/ojlabelvalue", "ojs/ojformlayout", "ojs/ojradiocheckbox", "ojs/ojcheckboxset", "ojs/ojradioset", "ojs/ojconverter-color", "ojs/ojvalidator-length", "ojs/ojvalidationfactory-base", "ojs/ojvalidation-base", "ojs/ojvalidationfactory-number", "ojs/ojvalidation-number", "ojs/ojvalidationgroup", "ojs/ojasyncvalidator-adapter", "ojs/ojasyncvalidator-length", "ojs/ojasyncvalidator-numberrange", "ojs/ojasyncvalidator-regexp", "ojs/ojasyncvalidator-required", "ojs/ojslider", "ojs/ojswitch", "ojs/ojcolor", "ojs/ojfilepicker", "ojs/ojselectbase", "ojs/ojselectsingle"],
                "ojs/ojdatetimebundle": ["ojs/ojcalendarutils", "ojs/ojconverter-datetime", "ojs/ojconverter-datetimeerror", "ojs/ojconverter-nativedatetime", "ojs/ojvalidator-datetimerange", "ojs/ojvalidator-daterestriction", "ojs/ojdatetimepicker", "ojs/ojvalidationfactory-datetime", "ojs/ojvalidation-datetime", "ojs/ojasyncvalidator-daterestriction", "ojs/ojasyncvalidator-datetimerange"],
                "ojs/ojdvtbasebundle": ["ojs/ojdvt-toolkit", "ojs/ojattributegrouphandler", "ojs/ojdvt-base"],
                "ojs/ojchartbundle": ["ojs/ojdvt-axis", "ojs/ojchart-toolkit", "ojs/ojlegend-toolkit", "ojs/ojdvt-overview", "ojs/ojgauge-toolkit", "ojs/ojchart", "ojs/ojlegend", "ojs/ojgauge"],
                "ojs/ojdrawerbundle": ["ojs/ojdrawerpopup", "ojs/ojdrawerutils", "ojs/ojdrawerlayout"],
                "ojs/ojtimezonebundle": ["ojs/ojtimezonedata", "ojtranslations/nls/timezoneData"],
                "persist/offline-persistence-toolkit-core-1.5.7": ["persist/persistenceUtils", "persist/impl/logger", "persist/impl/PersistenceXMLHttpRequest", "persist/persistenceStoreManager", "persist/impl/defaultCacheHandler", "persist/impl/PersistenceSyncManager", "persist/impl/OfflineCache", "persist/impl/offlineCacheManager", "persist/impl/fetch", "persist/persistenceManager", "persist/impl/PersistenceStoreMetadata"],
                "persist/offline-persistence-toolkit-pouchdbstore-1.5.7": ["persist/PersistenceStore", "persist/impl/storageUtils", "persist/pouchdb-browser-7.2.2", "persist/impl/pouchDBPersistenceStore", "persist/pouchDBPersistenceStoreFactory", "persist/configurablePouchDBStoreFactory", "persist/persistenceStoreFactory"],
                "persist/offline-persistence-toolkit-arraystore-1.5.7": ["persist/PersistenceStore", "persist/impl/storageUtils", "persist/impl/keyValuePersistenceStore", "persist/impl/arrayPersistenceStore", "persist/arrayPersistenceStoreFactory", "persist/persistenceStoreFactory"],
                "persist/offline-persistence-toolkit-localstore-1.5.7": ["persist/PersistenceStore", "persist/impl/storageUtils", "persist/impl/keyValuePersistenceStore", "persist/impl/localPersistenceStore", "persist/localPersistenceStoreFactory", "persist/persistenceStoreFactory"],
                "persist/offline-persistence-toolkit-filesystemstore-1.5.7": ["persist/impl/storageUtils", "persist/impl/keyValuePersistenceStore", "persist/impl/fileSystemPersistenceStore", "persist/fileSystemPersistenceStoreFactory"],
                "persist/offline-persistence-toolkit-responseproxy-1.5.7": ["persist/fetchStrategies", "persist/cacheStrategies", "persist/defaultResponseProxy", "persist/simpleJsonShredding", "persist/oracleRestJsonShredding", "persist/simpleBinaryDataShredding", "persist/queryHandlers"]
             },
    waitSeconds: 300,
    shim :  {
        'ExtJS/ExtGlobalSum' :  {
            deps : ['ExtJS/Extensible']
        },
        parentKernelJSFile:{
             deps : [sysPath + uiXML + '_SYS', 'OJET/ExtSubscreenDefine','ExtJS/ExtDatabinding', 'ExtJS/ExtensibleMEUtil', 'ExtJS/ExtensibleUtil', 'ExtJS/Extensible','ExtJS/ExtBuildXML', reportJs]
        },kernelJSFile:{
             deps : [sysPath + uiXML + '_SYS', 'OJET/ExtSubscreenDefine','ExtJS/ExtDatabinding', 'ExtJS/ExtensibleMEUtil', 'ExtJS/ExtensibleUtil', 'ExtJS/Extensible','ExtJS/ExtBuildXML', reportJs, parentKernelJSFile]
        },parentClusterJSFile :{
            deps : [sysPath + uiXML + '_SYS', 'OJET/ExtSubscreenDefine','ExtJS/ExtDatabinding', 'ExtJS/ExtensibleMEUtil', 'ExtJS/ExtensibleUtil', 'ExtJS/Extensible','ExtJS/ExtBuildXML', reportJs, parentKernelJSFile]
        },clusterJSFile:{
            deps : [sysPath + uiXML + '_SYS', 'OJET/ExtSubscreenDefine','ExtJS/ExtDatabinding', 'ExtJS/ExtensibleMEUtil', 'ExtJS/ExtensibleUtil', 'ExtJS/Extensible','ExtJS/ExtBuildXML', reportJs, parentKernelJSFile,parentClusterJSFile,kernelJSFile]
        },parentCustomJSFile:{
            deps : [sysPath + uiXML + '_SYS', 'OJET/ExtSubscreenDefine','ExtJS/ExtDatabinding', 'ExtJS/ExtensibleMEUtil', 'ExtJS/ExtensibleUtil', 'ExtJS/Extensible','ExtJS/ExtBuildXML', reportJs, parentKernelJSFile,parentClusterJSFile]
        },customJSFile:{
            deps : [sysPath + uiXML + '_SYS', 'OJET/ExtSubscreenDefine','ExtJS/ExtDatabinding', 'ExtJS/ExtensibleMEUtil', 'ExtJS/ExtensibleUtil', 'ExtJS/Extensible','ExtJS/ExtBuildXML', reportJs, parentKernelJSFile,parentClusterJSFile,parentCustomJSFile,kernelJSFile,clusterJSFile]
        } 
    }
});

/*
   require(['ojs/ojbootstrap', 'ojs/ojcontext', 'knockout', 'ojs/ojknockout', 'ojs/ojconverterutils-i18n', 'ojs/ojarraydataprovider', 'ojs/ojconveyorbelt', 'ojs/ojinputtext', 'ojs/ojformlayout', 'ojs/ojradioset', 'ojs/ojcheckboxset', 'ojs/ojinputnumber', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojbutton', 'ojs/ojlabelvalue', 'ojs/ojlabel', 'ojs/ojnavigationlist', 'ojs/ojtable','ojs/ojswitch','ojs/ojradioset', 'ojs/ojcheckboxset','ojs/ojselectcombobox', 'ojs/ojdatetimepicker','ojs/ojnavigationlist'], function(){
        require(['JS/Alert', 'ExtJS/ExtFuncs', 'ExtJS/ExtUIUtil', 'ExtJS/ExtUtil', 'ExtJS/ExtBuildXML'], function(){
            require([sysPath + uiXML + '_SYS', 'OJET/ExtSubscreenDefine','ExtJS/ExtDatabinding', 'ExtJS/ExtensibleMEUtil', 'ExtJS/ExtensibleUtil', 'ExtJS/Extensible','ExtJS/ExtBuildXML', reportJs, extGlobalSumUtilJs, extGlobalSumAdvJs, extGlobalSumJs, summaryAdvJs], function () {
                require([parentKernelJSFile], function(){
                    require([kernelJSFile], function(){
                        require([parentClusterJSFile], function(){
                            require([clusterJSFile], function(){
                                require([parentCustomJSFile], function(){
                                    require([customJSFile], function(){
                                        require(['OJET/ExtSubscreenDefine'], function(){});
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
*/    

require(['ojs/ojbootstrap', 'ojs/ojcontext', 'knockout', 'ojs/ojknockout', 'ojs/ojconverterutils-i18n', 'ojs/ojarraydataprovider', 'ojs/ojconveyorbelt', 'ojs/ojinputtext', 'ojs/ojformlayout', 'ojs/ojradioset', 'ojs/ojcheckboxset', 'ojs/ojinputnumber', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojbutton', 'ojs/ojlabelvalue', 'ojs/ojlabel', 'ojs/ojnavigationlist', 'ojs/ojtable','ojs/ojswitch','ojs/ojradioset', 'ojs/ojcheckboxset','ojs/ojselectcombobox', 'ojs/ojdatetimepicker','ojs/ojnavigationlist'], function(){
        require(['JS/Alert', 'ExtJS/ExtFuncs', 'ExtJS/ExtUIUtil', 'ExtJS/ExtUtil', 'ExtJS/ExtBuildXML'], function(){
            require([sysPath + uiXML + '_SYS','ExtJS/ExtDatabinding', 'ExtJS/ExtensibleMEUtil', 'ExtJS/ExtensibleUtil', 'ExtJS/Extensible','ExtJS/ExtBuildXML', reportJs, extGlobalSumUtilJs, extGlobalSumAdvJs, extGlobalSumJs, summaryAdvJs], function () {
                require([parentKernelJSFile], function () {
                    require([kernelJSFile], function () {
                        require([parentClusterJSFile], function () {
                            require([clusterJSFile], function () {
                                require([parentCustomJSFile], function () {
                                    require([customJSFile], function () {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    },
                                    function (err) {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    });
                                },
                                function (err) {
                                    require([customJSFile], function () {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    },
                                    function (err) {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    });
                                });
                            },
                            function (err) {
                                require([parentCustomJSFile], function () {
                                    require([customJSFile], function () {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    },
                                    function (err) {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    });
                                },
                                function (err) {
                                    require([customJSFile], function () {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    },
                                    function (err) {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    });
                                });
                            });
                        },
                        function (err) {
                            require([clusterJSFile], function () {
                                require([parentCustomJSFile], function () {
                                    require([customJSFile], function () {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    },
                                    function (err) {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    });
                                },
                                function (err) {
                                    require([customJSFile], function () {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    },
                                    function (err) {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    });
                                });
                            },
                            function (err) {
                                require([parentCustomJSFile], function () {
                                    require([customJSFile], function () {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    },
                                    function (err) {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    });
                                },
                                function (err) {
                                    require([customJSFile], function () {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    },
                                    function (err) {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    });
                                });
                            });
                        });
                    },
                    function (err) {
                        require([parentClusterJSFile], function () {
                            require([clusterJSFile], function () {
                                require([parentCustomJSFile], function () {
                                    require([customJSFile], function () {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    },
                                    function (err) {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    });
                                },
                                function (err) {
                                    require([customJSFile], function () {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    },
                                    function (err) {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    });
                                });
                            },
                            function (err) {
                                require([parentCustomJSFile], function () {
                                    require([customJSFile], function () {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    },
                                    function (err) {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    });
                                },
                                function (err) {
                                    require([customJSFile], function () {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    },
                                    function (err) {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    });
                                });
                            });
                        },
                        function (err) {
                            require([clusterJSFile], function () {
                                require([parentCustomJSFile], function () {
                                    require([customJSFile], function () {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    },
                                    function (err) {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    });
                                },
                                function (err) {
                                    require([customJSFile], function () {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    },
                                    function (err) {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    });
                                });
                            },
                            function (err) {
                                require([parentCustomJSFile], function () {
                                    require([customJSFile], function () {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    },
                                    function (err) {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    });
                                },
                                function (err) {
                                    require([customJSFile], function () {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    },
                                    function (err) {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    });
                                });
                            });
                        });
                    });
                },
                function (err) {
                    require([kernelJSFile], function () {
                        require([parentClusterJSFile], function () {
                            require([clusterJSFile], function () {
                                require([parentCustomJSFile], function () {
                                    require([customJSFile], function () {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    },
                                    function (err) {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    });
                                },
                                function (err) {
                                    require([customJSFile], function () {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    },
                                    function (err) {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    });
                                });
                            },
                            function (err) {
                                require([parentCustomJSFile], function () {
                                    require([customJSFile], function () {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    },
                                    function (err) {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    });
                                },
                                function (err) {
                                    require([customJSFile], function () {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    },
                                    function (err) {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    });
                                });
                            });
                        },
                        function (err) {
                            require([clusterJSFile], function () {
                                require([parentCustomJSFile], function () {
                                    require([customJSFile], function () {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    },
                                    function (err) {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    });
                                },
                                function (err) {
                                    require([customJSFile], function () {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    },
                                    function (err) {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    });
                                });
                            },
                            function (err) {
                                require([parentCustomJSFile], function () {
                                    require([customJSFile], function () {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    },
                                    function (err) {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    });
                                },
                                function (err) {
                                    require([customJSFile], function () {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    },
                                    function (err) {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    });
                                });
                            });
                        });
                    },
                    function (err) {
                        require([parentClusterJSFile], function () {
                            require([clusterJSFile], function () {
                                require([parentCustomJSFile], function () {
                                    require([customJSFile], function () {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    },
                                    function (err) {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    });
                                },
                                function (err) {
                                    require([customJSFile], function () {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    },
                                    function (err) {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    });
                                });
                            },
                            function (err) {
                                require([parentCustomJSFile], function () {
                                    require([customJSFile], function () {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    },
                                    function (err) {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    });
                                },
                                function (err) {
                                    require([customJSFile], function () {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    },
                                    function (err) {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    });
                                });
                            });
                        },
                        function (err) {
                            require([clusterJSFile], function () {
                                require([parentCustomJSFile], function () {
                                    require([customJSFile], function () {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    },
                                    function (err) {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    });
                                },
                                function (err) {
                                    require([customJSFile], function () {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    },
                                    function (err) {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    });
                                });
                            },
                            function (err) {
                                require([parentCustomJSFile], function () {
                                    require([customJSFile], function () {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    },
                                    function (err) {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    });
                                },
                                function (err) {
                                    require([customJSFile], function () {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    },
                                    function (err) {
                                        require(['OJET/ExtSubscreenDefine'], function () {
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });