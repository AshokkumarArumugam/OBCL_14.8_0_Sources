/**
 * @license
 * Copyright (c) 2014, 2024, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */

define('ojs/ojdrawerutils',['exports', 'ojs/ojdomutils'], function (exports, DomUtils) { 'use strict';

    const ojet = oj;
    class DrawerConstants {
        static get DrawerLayoutStyleSurrogate() {
            return `${this.stringOjDrawer}${this.charDash}layout${this.charDash}${this.stringSurrogate}`;
        }
        static get DrawerPopupStyleSurrogate() {
            return `${this.stringOjDrawer}${this.charDash}popup${this.charDash}${this.stringSurrogate}`;
        }
        static styleDisplayMode(resolvedDisplayMode) {
            return `${this.stringOjDrawer}${this.charDash}${resolvedDisplayMode}`;
        }
        static get styleOpened() {
            return `${this.stringOjDrawer}${this.charDash}${this.stringOpened}`;
        }
        static get styleFixedInViewport() {
            return `${this.stringOjDrawer}${this.charDash}fixed-in-viewport`;
        }
        static get styleDrawerHidden() {
            return `${this.stringOjDrawer}${this.charDash}hidden`;
        }
        static get clippingAreaSelector() {
            return `${this.stringOjDrawer}${this.charDash}${this.stringClippingArea}`;
        }
        static get styleStartDrawer() {
            return `${this.stringOjDrawer}${this.charDash}${this.stringStart}`;
        }
        static get styleEndDrawer() {
            return `${this.stringOjDrawer}${this.charDash}${this.stringEnd}`;
        }
        static get styleBottomDrawer() {
            return `${this.stringOjDrawer}${this.charDash}${this.stringBottom}`;
        }
        static get middleSectionSelector() {
            return `${this.stringOjDrawer}${this.charDash}${this.stringMiddleSection}`;
        }
        static get mainContentSelector() {
            return `${this.stringOjDrawer}${this.charDash}${this.stringMainContent}`;
        }
        static get styleReflow() {
            return `${this.stringOjDrawer}${this.charDash}${this.stringReflow}`;
        }
        static get styleOverlay() {
            return `${this.stringOjDrawer}${this.charDash}${this.stringOverlay}`;
        }
    }
    DrawerConstants.displayTypeChangeThreshold = 1024;
    DrawerConstants.fullWidthDrawerChangeThreshold = 600;
    DrawerConstants.fullHeightDrawerChangeThreshold = 600;
    DrawerConstants.charDash = '-';
    DrawerConstants.charSpace = ' ';
    DrawerConstants.stringOjDrawer = 'oj-drawer';
    DrawerConstants.stringStart = 'start';
    DrawerConstants.stringEnd = 'end';
    DrawerConstants.stringTop = 'top';
    DrawerConstants.stringBottom = 'bottom';
    DrawerConstants.stringMiddleSection = `layout-middle-section`;
    DrawerConstants.stringMainContent = `layout-main-content`;
    DrawerConstants.stringClippingArea = `clipping-area`;
    DrawerConstants.stringStyleClassDisableOverflow = `oj-drawer-disable-body-overflow`;
    DrawerConstants.stringSurrogate = 'surrogate';
    DrawerConstants.stringOpened = 'opened';
    DrawerConstants.stringClosed = 'closed';
    DrawerConstants.stringClosedWithEsc = `ClosedWithEsc`;
    DrawerConstants.stringShouldChangeDisplayMode = `ShouldChangeDisplayMode`;
    DrawerConstants.stringStateToChangeTo = `StateToChangeTo`;
    DrawerConstants.stringPrevState = `PrevState`;
    DrawerConstants.stringReflow = 'reflow';
    DrawerConstants.stringOverlay = 'overlay';
    DrawerConstants.stringFullOverlay = 'full-overlay';
    DrawerConstants.stringDisplay = 'Display';
    DrawerConstants.stringResize = 'resize';
    DrawerConstants.stringLeft = 'left';
    DrawerConstants.stringRight = 'right';
    DrawerConstants.stringOpen = 'open';
    DrawerConstants.stringClose = 'close';
    DrawerConstants.stringSlideIn = 'slideIn';
    DrawerConstants.stringSlideOut = 'slideOut';
    DrawerConstants.stringWidth = 'width';
    DrawerConstants.stringHeight = 'height';
    DrawerConstants.animationDuration = 300;
    DrawerConstants.keys = {
        ESC: 'Escape',
        TAB: 'Tab'
    };
    class DrawerUtils {
        static capitalizeFirstChar(s) {
            return s.charAt(0).toUpperCase() + s.slice(1);
        }
        static disableBodyOverflow() {
            document.body.classList.add(DrawerConstants.stringStyleClassDisableOverflow);
        }
        static enableBodyOverflow() {
            document.body.classList.remove(DrawerConstants.stringStyleClassDisableOverflow);
        }
        static getElement(selector) {
            return document.querySelector(selector);
        }
        static getElementHeight(element) {
            return Math.round(element.offsetHeight);
        }
        static getElementWidth(element) {
            return Math.round(element.getBoundingClientRect().width);
        }
        static getAutofocusFocusables(element) {
            const selector = '[autofocus]:not([tabindex="-1"]):not([disabled]):not([hidden])';
            const focusableCandidates = Array.from(element.querySelectorAll(selector));
            const focusables = focusableCandidates.filter((item) => {
                return !this.isHidden(item);
            });
            return focusables;
        }
        static getFocusables(element) {
            const defaultFocusableElements = [
                'button',
                '[href]',
                'input',
                'select',
                'textarea',
                '[tabindex]',
                'video'
            ];
            const selectorSuffix = ':not([tabindex="-1"]):not([disabled]):not([hidden])';
            const elementsCount = defaultFocusableElements.length;
            let safeFocusablesSelector = '';
            for (let i = 0; i < elementsCount; i++) {
                const elSelector = `${defaultFocusableElements[i]}${selectorSuffix}`;
                safeFocusablesSelector += i < elementsCount - 1 ? `${elSelector}, ` : `${elSelector}`;
            }
            const focusableCandidates = Array.from(element.querySelectorAll(safeFocusablesSelector));
            const focusables = focusableCandidates.filter((item) => {
                return !this.isHidden(item);
            });
            return focusables;
        }
        static isHidden(element) {
            if (element.offsetParent === null) {
                return true;
            }
            if (ojet.AgentUtils.getAgentInfo().browser === ojet.AgentUtils.BROWSER.FIREFOX) {
                if (element.offsetParent === document.body) {
                    return true;
                }
            }
            const style = window.getComputedStyle(element);
            return style.visibility === 'hidden';
        }
        static isFocusable(element) {
            if (!element || !element.parentElement) {
                return false;
            }
            return DrawerUtils.getFocusables(element.parentElement).some((item) => {
                return item === element;
            });
        }
        static isObjectEmpty(object) {
            if (typeof object === 'object') {
                return Object.keys(object).length === 0 && object.constructor === Object;
            }
            return true;
        }
        static isRTL() {
            return DomUtils.getReadingDirection() === 'rtl';
        }
        static getAnimationOptions(actionType, edge) {
            let direction;
            switch (edge) {
                case DrawerConstants.stringStart:
                    if (actionType === DrawerConstants.stringSlideIn) {
                        direction = this.isRTL() ? DrawerConstants.stringLeft : DrawerConstants.stringRight;
                    }
                    else if (actionType === DrawerConstants.stringSlideOut) {
                        direction = this.isRTL() ? DrawerConstants.stringRight : DrawerConstants.stringLeft;
                    }
                    else {
                        direction = DrawerConstants.stringWidth;
                    }
                    break;
                case DrawerConstants.stringEnd:
                    if (actionType === DrawerConstants.stringSlideIn) {
                        direction = this.isRTL() ? DrawerConstants.stringRight : DrawerConstants.stringLeft;
                    }
                    else if (actionType === DrawerConstants.stringSlideOut) {
                        direction = this.isRTL() ? DrawerConstants.stringLeft : DrawerConstants.stringRight;
                    }
                    else {
                        direction = DrawerConstants.stringWidth;
                    }
                    break;
                case DrawerConstants.stringBottom:
                    if (actionType === DrawerConstants.stringSlideIn) {
                        direction = DrawerConstants.stringTop;
                    }
                    else if (actionType === DrawerConstants.stringSlideOut) {
                        direction = DrawerConstants.stringBottom;
                    }
                    else {
                        direction = DrawerConstants.stringHeight;
                    }
            }
            return {
                direction,
                duration: `${DrawerConstants.animationDuration}ms`
            };
        }
        static getCommonStyleClasses(edge) {
            return {
                [DrawerConstants.styleStartDrawer]: edge === DrawerConstants.stringStart,
                [DrawerConstants.styleEndDrawer]: edge === DrawerConstants.stringEnd,
                [DrawerConstants.styleBottomDrawer]: edge === DrawerConstants.stringBottom
            };
        }
        static getStyleClassesMapAsString(styleClassMap) {
            let styleClassString = '';
            for (let key in styleClassMap) {
                if (styleClassMap[key]) {
                    styleClassString += styleClassString ? DrawerConstants.charSpace + key : key;
                }
            }
            return styleClassString;
        }
        static getViewportWidth() {
            if (ojet.AgentUtils.getAgentInfo().os === ojet.AgentUtils.OS.IOS) {
                return document.documentElement.clientWidth;
            }
            return window.innerWidth;
        }
        static getViewportHeight() {
            if (ojet.AgentUtils.getAgentInfo().os === ojet.AgentUtils.OS.IOS) {
                return document.documentElement.clientHeight;
            }
            return window.innerHeight;
        }
        static moveFocusToElementOrNearestAncestor(element) {
            if (DrawerUtils.isFocusable(element)) {
                element.focus();
            }
            else {
                let nearestAncestor = element.parentElement;
                while (nearestAncestor &&
                    nearestAncestor.nodeName !== 'HTML' &&
                    !DrawerUtils.isFocusable(nearestAncestor)) {
                    nearestAncestor = nearestAncestor.parentElement;
                }
                if (nearestAncestor) {
                    nearestAncestor.focus();
                }
            }
        }
        static wrapDrawerWithClippingArea(drawerElement, position) {
            const clippingAreaEl = $(drawerElement)
                .wrap(function () {
                const div = document.createElement('div');
                div.setAttribute('id', DrawerConstants.clippingAreaSelector);
                div.style.overflow = 'hidden';
                div.style.position = 'absolute';
                return $(div);
            })
                .parent()[0];
            clippingAreaEl.style.setProperty('height', DrawerUtils.getElementHeight(drawerElement) + 'px');
            clippingAreaEl.style.setProperty('width', DrawerUtils.getElementWidth(drawerElement) + 'px');
            $(clippingAreaEl).position(position);
            drawerElement.style.setProperty('position', 'static');
        }
        static unwrapDrawerClippingArea(drawerElement) {
            if (drawerElement) {
                drawerElement.style.removeProperty('position');
                $(drawerElement).unwrap();
            }
        }
    }

    exports.DrawerConstants = DrawerConstants;
    exports.DrawerUtils = DrawerUtils;

    Object.defineProperty(exports, '__esModule', { value: true });

});


define('ojs/ojdrawerpopup',['exports', 'preact/jsx-runtime', 'ojs/ojvcomponent', 'preact', 'jquery', 'ojs/ojanimation', 'ojs/ojcore-base', 'ojs/ojpopup', 'ojs/ojdrawerutils', 'hammerjs', 'ojs/ojcustomelement-utils'], function (exports, jsxRuntime, ojvcomponent, preact, $, AnimationUtils, ojcoreBase, ojpopup, ojdrawerutils, Hammer, ojcustomelementUtils) { 'use strict';

    $ = $ && Object.prototype.hasOwnProperty.call($, 'default') ? $['default'] : $;
    Hammer = Hammer && Object.prototype.hasOwnProperty.call(Hammer, 'default') ? Hammer['default'] : Hammer;

    var __decorate = (null && null.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var DrawerPopup_1;
    const ojet = oj;
    const PopupService = oj.PopupService;
    const targetElement = window;
    const ZOrderUtils = oj.ZOrderUtils;
    exports.DrawerPopup = DrawerPopup_1 = class DrawerPopup extends preact.Component {
        constructor() {
            super(...arguments);
            this.state = {
                opened: this.props.opened,
                viewportResolvedDisplayMode: this.getViewportResolvedDisplayMode(),
                viewportResolvedDisplayModeVertical: this.getViewportResolvedDisplayModeVertical()
            };
            this.rootRef = preact.createRef();
            this.windowResizeHandler = null;
            this.ignoreUpdate = false;
            this.handleGuardFocus = (guardPosition, event) => {
                if (this.props.modality === 'modal') {
                    const focusables = ojdrawerutils.DrawerUtils.getFocusables(this.rootRef.current);
                    const { length, 0: firstFocusableItem, [length - 1]: lastFocusableItem } = focusables;
                    event.preventDefault();
                    if (!length) {
                        this.rootRef.current.focus();
                        return;
                    }
                    if (guardPosition === 'start') {
                        lastFocusableItem.focus();
                    }
                    else {
                        firstFocusableItem.focus();
                    }
                }
            };
            this.handleOnStartGuardFocus = (event) => {
                this.handleGuardFocus('start', event);
            };
            this.handleOnEndGuardFocus = (event) => {
                this.handleGuardFocus('end', event);
            };
            this.handleKeyDown = (event) => {
                if (event.defaultPrevented) {
                    return;
                }
                if (event.key === ojdrawerutils.DrawerConstants.keys.ESC) {
                    this.selfClose();
                    return;
                }
            };
            this.autoDismissHandler = (event) => {
                const focusables = ojdrawerutils.DrawerUtils.getFocusables(this.rootRef.current);
                const zorderLayer = this.rootRef.current.parentNode;
                const isTargetWithin = this.isTargetDescendantOfOwnZorderLayerOrItsNextSiblings(zorderLayer, event.target);
                if (this.props.autoDismiss === 'focus-loss' && !isTargetWithin) {
                    this.selfClose();
                }
                else if (this.props.autoDismiss === 'none' &&
                    this.props.modality === 'modal' &&
                    !isTargetWithin) {
                    event.preventDefault();
                }
            };
            this.refreshHandler = (edge) => {
                PopupService.getInstance().triggerOnDescendents($(this.rootRef.current), PopupService.EVENT.POPUP_REFRESH);
            };
            this.destroyHandler = () => {
                const $drawerElement = $(this.rootRef.current);
                const status = ZOrderUtils.getStatus($drawerElement);
                if (status === ZOrderUtils.STATUS.OPEN) {
                    ojcustomelementUtils.CustomElementUtils.cleanComponentBindings($drawerElement[0]);
                    $drawerElement.remove();
                    const psOptions = {};
                    psOptions[PopupService.OPTION.POPUP] = $drawerElement;
                    this.ignoreUpdate = true;
                    PopupService.getInstance().close(psOptions);
                }
            };
            this.isTargetDescendantOfOwnZorderLayerOrItsNextSiblings = (zorderLayer, target) => {
                const zorderLayersBuffer = [zorderLayer];
                let nextZorderLayer = zorderLayer.nextSibling;
                while (nextZorderLayer) {
                    zorderLayersBuffer.push(nextZorderLayer);
                    nextZorderLayer = nextZorderLayer.nextSibling;
                }
                return zorderLayersBuffer.some((zorderLayerItem) => {
                    return zorderLayerItem.contains(target);
                });
            };
            this.windowResizeCallback = () => {
                const updatedState = {};
                const prevViewportResolvedDisplayMode = this.state.viewportResolvedDisplayMode;
                const nextViewportResolvedDisplayMode = this.getViewportResolvedDisplayMode();
                if (prevViewportResolvedDisplayMode !== nextViewportResolvedDisplayMode) {
                    updatedState['viewportResolvedDisplayMode'] = nextViewportResolvedDisplayMode;
                }
                const prevViewportResolvedDisplayModeVertical = this.state.viewportResolvedDisplayModeVertical;
                const nextViewportResolvedDisplayModeVertical = this.getViewportResolvedDisplayModeVertical();
                if (prevViewportResolvedDisplayModeVertical !== nextViewportResolvedDisplayModeVertical) {
                    updatedState['viewportResolvedDisplayModeVertical'] = nextViewportResolvedDisplayModeVertical;
                }
                if (this.isDrawerOpened() &&
                    prevViewportResolvedDisplayMode === ojdrawerutils.DrawerConstants.stringFullOverlay &&
                    nextViewportResolvedDisplayMode === ojdrawerutils.DrawerConstants.stringOverlay) {
                    if (this.isIOSspecificScrollCase()) {
                        this.applyPopupServiceModalChanges('modeless');
                    }
                    else if (this.isAndroidSpecificScrollCase()) {
                        ojdrawerutils.DrawerUtils.enableBodyOverflow();
                    }
                }
                if (this.isDrawerOpened() &&
                    prevViewportResolvedDisplayMode === ojdrawerutils.DrawerConstants.stringOverlay &&
                    nextViewportResolvedDisplayMode === ojdrawerutils.DrawerConstants.stringFullOverlay) {
                    if (this.isIOSspecificScrollCase()) {
                        this.applyPopupServiceModalChanges('modal');
                    }
                    else if (this.isAndroidSpecificScrollCase()) {
                        ojdrawerutils.DrawerUtils.disableBodyOverflow();
                    }
                }
                if (Object.keys(updatedState).length > 0) {
                    this.setState(updatedState);
                }
            };
            this.handleSwipeAction = () => {
                this.selfClose();
            };
        }
        static getDerivedStateFromProps(props, state) {
            if (props.opened !== state.opened) {
                return { opened: props.opened };
            }
            return null;
        }
        render(props) {
            if (!this.ignoreUpdate && (this.isDrawerOpened() || this.wasDrawerOpenedInPrevState())) {
                return (jsxRuntime.jsx(ojvcomponent.Root, { ref: this.rootRef, class: this.getPopupStyleClasses(this.props.edge), tabIndex: -1, role: this.props.role || 'dialog', onKeyDown: this.handleKeyDown, children: jsxRuntime.jsxs("div", { class: "oj-drawer-full-height", children: [jsxRuntime.jsx("div", { class: "oj-drawer-focus-guard", onFocus: this.handleOnStartGuardFocus, tabIndex: 0 }), props.children, jsxRuntime.jsx("div", { class: "oj-drawer-focus-guard", onFocus: this.handleOnEndGuardFocus, tabIndex: 0 })] }) }));
            }
            return jsxRuntime.jsx(ojvcomponent.Root, {});
        }
        isDrawerOpened() {
            return this.state[ojdrawerutils.DrawerConstants.stringOpened];
        }
        wasDrawerOpenedInPrevState() {
            return this.openedPrevState;
        }
        async selfClose() {
            try {
                await this.props.onOjBeforeClose?.();
            }
            catch (_) {
                return;
            }
            this.props.onOpenedChanged?.(false);
        }
        openOrCloseDrawer(prevState) {
            if (this.isDrawerOpened() != prevState.opened) {
                this.openedPrevState = this.isDrawerOpened();
            }
            const $drawerElement = $(this.rootRef.current);
            const popupServiceInstance = PopupService.getInstance();
            const popupServiceOptions = this.getPopupServiceOptions(prevState);
            if (this.isDrawerOpened()) {
                if ([ZOrderUtils.STATUS.CLOSE, ZOrderUtils.STATUS.UNKNOWN].indexOf(ZOrderUtils.getStatus($drawerElement) > -1)) {
                    popupServiceInstance.open(popupServiceOptions);
                }
            }
            else {
                if (ZOrderUtils.getStatus($drawerElement) === ZOrderUtils.STATUS.OPEN) {
                    if (this.isIOSspecificScrollCase() &&
                        this.getViewportResolvedDisplayMode() === ojdrawerutils.DrawerConstants.stringFullOverlay) {
                        this.applyPopupServiceModalChanges('modeless');
                    }
                    popupServiceInstance.close(popupServiceOptions);
                }
            }
        }
        getPopupServiceOptions(prevState) {
            const edge = this.props.edge;
            const $drawerElement = $(this.rootRef.current);
            const PSOptions = {};
            const PSoption = PopupService.OPTION;
            PSOptions[PSoption.POPUP] = $drawerElement;
            PSOptions[PSoption.LAUNCHER] = $(document.activeElement);
            PSOptions[PSoption.MODALITY] = this.props.modality;
            PSOptions[PSoption.LAYER_SELECTORS] = this.getDrawerSurrogateLayerSelectors();
            PSOptions[PSoption.LAYER_LEVEL] = PopupService.LAYER_LEVEL.TOP_LEVEL;
            PSOptions[PSoption.POSITION] = null;
            PSOptions[PSoption.CUSTOM_ELEMENT] = true;
            const PSEvent = PopupService.EVENT;
            PSOptions[PSoption.EVENTS] = {
                [PSEvent.POPUP_BEFORE_OPEN]: () => this.beforeOpenHandler(edge, PSOptions),
                [PSEvent.POPUP_AFTER_OPEN]: () => this.afterOpenHandler(edge, prevState),
                [PSEvent.POPUP_BEFORE_CLOSE]: () => this.beforeCloseHandler(edge),
                [PSEvent.POPUP_AFTER_CLOSE]: () => this.afterCloseHandler(prevState),
                [PSEvent.POPUP_AUTODISMISS]: (event) => this.autoDismissHandler(event),
                [PSEvent.POPUP_REFRESH]: () => this.refreshHandler(edge),
                [PSEvent.POPUP_REMOVE]: () => this.destroyHandler()
            };
            return PSOptions;
        }
        beforeOpenHandler(edge, PSOptions) {
            ojdrawerutils.DrawerUtils.disableBodyOverflow();
            this.drawerOpener = document.activeElement;
            PSOptions[PopupService.OPTION.POPUP].show();
            const busyContext = ojet.Context.getContext(this.rootRef.current).getBusyContext();
            const resolveFunc = busyContext.addBusyState({ description: 'Animation in progress' });
            const animationPromise = AnimationUtils.slideIn(this.rootRef.current, ojdrawerutils.DrawerUtils.getAnimationOptions(ojdrawerutils.DrawerConstants.stringSlideIn, edge));
            animationPromise.then(resolveFunc);
            return animationPromise;
        }
        afterOpenHandler(edge, prevState) {
            ojdrawerutils.DrawerUtils.enableBodyOverflow();
            if (this.isIOSspecificScrollCase() &&
                this.getViewportResolvedDisplayMode() === ojdrawerutils.DrawerConstants.stringFullOverlay) {
                this.applyPopupServiceModalChanges('modal');
            }
            if (this.isAndroidSpecificScrollCase() &&
                this.getViewportResolvedDisplayMode() === ojdrawerutils.DrawerConstants.stringFullOverlay) {
                ojdrawerutils.DrawerUtils.disableBodyOverflow();
            }
            this.handleFocus(prevState);
            const $drawerElement = $(this.rootRef.current);
            const status = ZOrderUtils.getStatus($drawerElement);
            if (status === ZOrderUtils.STATUS.OPEN && !this.isDrawerOpened()) {
                const popupServiceInstance = PopupService.getInstance();
                const popupServiceOptions = this.getPopupServiceOptions(prevState);
                popupServiceInstance.close(popupServiceOptions);
            }
        }
        handleFocus(prevState) {
            if (this.state.opened && prevState.opened !== this.state.opened) {
                const rootRef = this.rootRef.current;
                const autofocusItems = ojdrawerutils.DrawerUtils.getAutofocusFocusables(rootRef);
                const { length: autofocusLength, 0: autofocusFirstItem } = autofocusItems;
                if (autofocusLength > 0) {
                    autofocusFirstItem.focus({ preventScroll: true });
                    return;
                }
                const focusables = ojdrawerutils.DrawerUtils.getFocusables(rootRef);
                let elementToFocus = rootRef;
                if (focusables.length) {
                    elementToFocus = focusables[0];
                }
                elementToFocus.focus({ preventScroll: true });
            }
        }
        beforeCloseHandler(edge) {
            ojdrawerutils.DrawerUtils.disableBodyOverflow();
            this.elementWithFocusBeforeDrawerCloses = document.activeElement;
            if (this.ignoreUpdate) {
                return null;
            }
            const busyContext = ojet.Context.getContext(this.rootRef.current).getBusyContext();
            const resolveFunc = busyContext.addBusyState({ description: 'Animation in progress' });
            const animationPromise = AnimationUtils.slideOut(this.rootRef.current, ojdrawerutils.DrawerUtils.getAnimationOptions(ojdrawerutils.DrawerConstants.stringSlideOut, edge));
            return animationPromise.then(resolveFunc);
        }
        afterCloseHandler(prevState) {
            ojdrawerutils.DrawerUtils.enableBodyOverflow();
            if (this.rootRef.current.contains(this.elementWithFocusBeforeDrawerCloses)) {
                ojdrawerutils.DrawerUtils.moveFocusToElementOrNearestAncestor(this.drawerOpener);
            }
            if (this.ignoreUpdate) {
                return;
            }
            const $drawerElement = $(this.rootRef.current);
            const status = ZOrderUtils.getStatus($drawerElement);
            if (status === ZOrderUtils.STATUS.CLOSE && this.isDrawerOpened()) {
                const popupServiceInstance = PopupService.getInstance();
                const popupServiceOptions = this.getPopupServiceOptions(prevState);
                popupServiceInstance.open(popupServiceOptions);
            }
            else if (!this.wasDrawerOpenedInPrevState()) {
                window.queueMicrotask(() => {
                    this.forceUpdate();
                });
            }
            this.props.onOjClose?.();
        }
        getDrawerSurrogateLayerSelectors() {
            let surrogateLayerStyles = ojdrawerutils.DrawerConstants.DrawerPopupStyleSurrogate;
            const stringModal = 'modal';
            if (this.props.modality === stringModal) {
                surrogateLayerStyles += ` ${ojdrawerutils.DrawerConstants.stringOjDrawer}${ojdrawerutils.DrawerConstants.charDash}${stringModal}`;
            }
            return surrogateLayerStyles;
        }
        getPopupStyleClasses(edge) {
            const customStyleClassMap = {};
            if (edge === ojdrawerutils.DrawerConstants.stringBottom) {
                if (this.getViewportResolvedDisplayModeVertical() === ojdrawerutils.DrawerConstants.stringFullOverlay ||
                    this.getViewportResolvedDisplayMode() === ojdrawerutils.DrawerConstants.stringFullOverlay) {
                    customStyleClassMap[ojdrawerutils.DrawerConstants.styleDisplayMode(ojdrawerutils.DrawerConstants.stringFullOverlay)] =
                        true;
                }
            }
            else {
                if (this.getViewportResolvedDisplayMode() === ojdrawerutils.DrawerConstants.stringFullOverlay) {
                    customStyleClassMap[ojdrawerutils.DrawerConstants.styleDisplayMode(ojdrawerutils.DrawerConstants.stringFullOverlay)] =
                        true;
                }
            }
            return ojdrawerutils.DrawerUtils.getStyleClassesMapAsString(Object.assign(customStyleClassMap, ojdrawerutils.DrawerUtils.getCommonStyleClasses(edge)));
        }
        componentDidUpdate(prevProps, prevState) {
            if (!this.ignoreUpdate) {
                this.handleComponentUpdate(prevState);
            }
        }
        componentDidMount() {
            if (this.windowResizeHandler === null) {
                this.windowResizeHandler = this.windowResizeCallback.bind(this);
            }
            window.addEventListener(ojdrawerutils.DrawerConstants.stringResize, this.windowResizeHandler);
            this.openedPrevState = this.props.opened;
            if (DrawerPopup_1.defaultProps.opened != this.props.opened) {
                const stateCopy = Object.assign({}, this.state);
                stateCopy.opened = false;
                this.handleComponentUpdate(stateCopy);
            }
        }
        componentWillUnmount() {
            window.removeEventListener(ojdrawerutils.DrawerConstants.stringResize, this.windowResizeHandler);
            this.windowResizeHandler = null;
        }
        getViewportResolvedDisplayMode() {
            const viewportWidth = ojdrawerutils.DrawerUtils.getViewportWidth();
            if (viewportWidth >= ojdrawerutils.DrawerConstants.fullWidthDrawerChangeThreshold) {
                return ojdrawerutils.DrawerConstants.stringOverlay;
            }
            return ojdrawerutils.DrawerConstants.stringFullOverlay;
        }
        getViewportResolvedDisplayModeVertical() {
            const viewportHeight = ojdrawerutils.DrawerUtils.getViewportHeight();
            if (viewportHeight >= ojdrawerutils.DrawerConstants.fullHeightDrawerChangeThreshold) {
                return ojdrawerutils.DrawerConstants.stringOverlay;
            }
            return ojdrawerutils.DrawerConstants.stringFullOverlay;
        }
        handleComponentUpdate(prevState) {
            this.openOrCloseDrawer(prevState);
            if (this.isDrawerOpened() && this.props.closeGesture === 'swipe') {
                this.registerCloseWithSwipeListener();
            }
            if (this.isDrawerOpened() === false && prevState.opened) {
                this.unregisterCloseWithSwipeListener();
            }
        }
        registerCloseWithSwipeListener() {
            this.hammerInstance = new Hammer(targetElement);
            if (this.props.edge === ojdrawerutils.DrawerConstants.stringBottom) {
                this.hammerInstance.get('swipe').set({ direction: Hammer.DIRECTION_DOWN });
            }
            this.hammerInstance.on(this.getSwipeCloseDirection(this.props.edge), this.handleSwipeAction);
        }
        getSwipeCloseDirection(edge) {
            const swipeLeft = 'swipeleft';
            const swipeRigth = 'swiperight';
            switch (edge) {
                case ojdrawerutils.DrawerConstants.stringStart: {
                    return ojdrawerutils.DrawerUtils.isRTL() ? swipeRigth : swipeLeft;
                }
                case ojdrawerutils.DrawerConstants.stringEnd: {
                    return ojdrawerutils.DrawerUtils.isRTL() ? swipeLeft : swipeRigth;
                }
                case ojdrawerutils.DrawerConstants.stringBottom: {
                    return 'swipedown';
                }
            }
        }
        unregisterCloseWithSwipeListener() {
            if (this.hammerInstance) {
                this.hammerInstance.off(this.getSwipeCloseDirection(this.props.edge), this.handleSwipeAction);
            }
        }
        isIOSspecificScrollCase() {
            return (ojet.AgentUtils.getAgentInfo().os === ojet.AgentUtils.OS.IOS &&
                this.props.modality === 'modeless');
        }
        isAndroidSpecificScrollCase() {
            return (ojet.AgentUtils.getAgentInfo().os === ojet.AgentUtils.OS.ANDROID &&
                this.props.modality === 'modeless');
        }
        applyPopupServiceModalChanges(modalValue) {
            const PSOptions = {};
            const PSoption = PopupService.OPTION;
            PSOptions[PSoption.POPUP] = $(this.rootRef.current);
            PSOptions[PSoption.MODALITY] = modalValue;
            PopupService.getInstance().changeOptions(PSOptions);
        }
    };
    exports.DrawerPopup.defaultProps = {
        autoDismiss: 'focus-loss',
        edge: 'start',
        modality: 'modal',
        opened: false,
        closeGesture: 'swipe'
    };
    exports.DrawerPopup._metadata = { "slots": { "": {} }, "properties": { "opened": { "type": "boolean", "writeback": true }, "edge": { "type": "string", "enumValues": ["end", "start", "bottom"] }, "modality": { "type": "string", "enumValues": ["modal", "modeless"] }, "autoDismiss": { "type": "string", "enumValues": ["none", "focus-loss"] }, "closeGesture": { "type": "string", "enumValues": ["none", "swipe"] } }, "events": { "ojBeforeClose": { "cancelable": true }, "ojClose": {} }, "extension": { "_WRITEBACK_PROPS": ["opened"], "_READ_ONLY_PROPS": [], "_OBSERVED_GLOBAL_PROPS": ["role"] } };
    exports.DrawerPopup = DrawerPopup_1 = __decorate([
        ojvcomponent.customElement('oj-drawer-popup')
    ], exports.DrawerPopup);

    Object.defineProperty(exports, '__esModule', { value: true });

});


define('ojs/ojdrawerlayout',['exports', 'preact/jsx-runtime', 'ojs/ojvcomponent', 'preact', 'jquery', 'ojs/ojanimation', 'ojs/ojdomutils', 'ojs/ojcore-base', 'ojs/ojpopup', 'ojs/ojdrawerutils'], function (exports, jsxRuntime, ojvcomponent, preact, $, AnimationUtils, DomUtils, ojcoreBase, ojpopup, ojdrawerutils) { 'use strict';

    $ = $ && Object.prototype.hasOwnProperty.call($, 'default') ? $['default'] : $;

    var __decorate = (null && null.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var DrawerLayout_1;
    const ojet = oj;
    const PopupService = ojet.PopupService;
    const ZOrderUtils = ojet.ZOrderUtils;
    exports.DrawerLayout = DrawerLayout_1 = class DrawerLayout extends preact.Component {
        constructor() {
            super(...arguments);
            this.rootRef = preact.createRef();
            this.startWrapperRef = preact.createRef();
            this.startRef = preact.createRef();
            this.endWrapperRef = preact.createRef();
            this.endRef = preact.createRef();
            this.bottomWrapperRef = preact.createRef();
            this.bottomRef = preact.createRef();
            this.middleSectionRef = preact.createRef();
            this.mainSectionRef = preact.createRef();
            this.startClosedWithEsc = false;
            this.endClosedWithEsc = false;
            this.bottomClosedWithEsc = false;
            this.startOverlayDrawerResizeHandler = null;
            this.endOverlayDrawerResizeHandler = null;
            this.bottomOverlayDrawerResizeHandler = null;
            this.startReflowDrawerResizeHandler = null;
            this.endReflowDrawerResizeHandler = null;
            this.drawerLayoutResizeHandler = null;
            this.windowResizeHandler = null;
            this.handleResize = true;
            this.state = {
                startOpened: this.props.startOpened,
                endOpened: this.props.endOpened,
                bottomOpened: this.props.bottomOpened,
                startDisplay: this.props.startDisplay,
                endDisplay: this.props.endDisplay,
                bottomDisplay: this.props.bottomDisplay,
                startShouldChangeDisplayMode: false,
                endShouldChangeDisplayMode: false,
                bottomShouldChangeDisplayMode: false,
                startStateToChangeTo: null,
                endStateToChangeTo: null,
                bottomStateToChangeTo: null,
                viewportResolvedDisplayMode: this.getViewportResolvedDisplayMode(),
                viewportResolvedDisplayModeVertical: this.getViewportResolvedDisplayModeVertical(),
                lastlyOpenedDrawer: ojdrawerutils.DrawerConstants.stringStart
            };
            this.handleKeyDown = (edge, event) => {
                if (event.defaultPrevented) {
                    return;
                }
                const drawerDisplayMode = this.getDrawerResolvedDisplayMode(edge);
                if (event.key === ojdrawerutils.DrawerConstants.keys.ESC &&
                    (drawerDisplayMode === ojdrawerutils.DrawerConstants.stringOverlay ||
                        drawerDisplayMode === ojdrawerutils.DrawerConstants.stringFullOverlay)) {
                    this[this.edgeToClosedWithEsc(edge)] = true;
                    this.selfClose(edge);
                }
            };
            this.getRefToAnimate = (edge) => {
                return this.getDrawerResolvedDisplayMode(edge) === ojdrawerutils.DrawerConstants.stringReflow
                    ? this.getDrawerWrapperRef(edge)
                    : this.getDrawerRef(edge);
            };
            this.overlayDrawerResizeCallback = (edge) => {
                const $drawerElement = $(this.getDrawerRef(edge).current);
                $drawerElement.position(this.getDrawerPosition(edge));
            };
            this.reflowDrawerResizeCallback = () => {
                this.setBottomOverlayDrawerWidth();
            };
            this.drawerLayoutResizeCallback = () => {
                this.setStartEndOverlayDrawersHeight();
                this.setBottomOverlayDrawerWidth();
            };
            this.lockResizeListener = () => {
                if (this.handleResize) {
                    this.handleResize = false;
                    setTimeout(() => {
                        this.handleResize = true;
                        const updatedState = {};
                        if (this.state.viewportResolvedDisplayMode !== this.getViewportResolvedDisplayMode()) {
                            const edges = [ojdrawerutils.DrawerConstants.stringStart, ojdrawerutils.DrawerConstants.stringEnd];
                            for (let i = 0; i < edges.length; i++) {
                                const edge = edges[i];
                                if (this.isDrawerOpened(edge) && this.state[this.edgeToDisplayName(edge)] === 'auto') {
                                    updatedState[this.edgeToShouldChangeDisplayMode(edge)] = true;
                                }
                            }
                        }
                        if (this.state.viewportResolvedDisplayModeVertical !==
                            this.getViewportResolvedDisplayModeVertical()) {
                            if (this.isDrawerOpened(ojdrawerutils.DrawerConstants.stringBottom) &&
                                this.state[this.edgeToDisplayName(ojdrawerutils.DrawerConstants.stringBottom)] === 'auto') {
                                updatedState[this.edgeToShouldChangeDisplayMode(ojdrawerutils.DrawerConstants.stringBottom)] = true;
                            }
                        }
                        if (Object.keys(updatedState).length > 0) {
                            this.setState(updatedState);
                        }
                        else {
                            updatedState.viewportResolvedDisplayMode = this.getViewportResolvedDisplayMode();
                            this.setState(updatedState);
                        }
                    }, ojdrawerutils.DrawerConstants.animationDuration + 50);
                }
            };
            this.refreshHandler = (edge) => {
                const $drawerElement = $(this.getDrawerRef(edge).current);
                $drawerElement.position(this.getDrawerPosition(edge));
                if ([ojdrawerutils.DrawerConstants.stringStart, ojdrawerutils.DrawerConstants.stringEnd].indexOf(edge) > -1) {
                    this.setStartEndOverlayDrawersHeight();
                }
                this.setBottomOverlayDrawerWidth();
                PopupService.getInstance().triggerOnDescendents($drawerElement, PopupService.EVENT.POPUP_REFRESH);
            };
            this.destroyHandler = (edge) => {
                const $drawerElement = $(this.getDrawerRef(edge).current);
                const status = ZOrderUtils.getStatus($drawerElement);
                if (status === ZOrderUtils.STATUS.OPEN) {
                    ZOrderUtils.removeFromAncestorLayer($drawerElement);
                }
            };
            this.windowResizeCallback = () => {
                if (this.handleResize) {
                    const prevViewportResolvedDisplayMode = this.state.viewportResolvedDisplayMode;
                    const nextViewportResolvedDisplayMode = this.getViewportResolvedDisplayMode();
                    const prevViewportResolvedDisplayModeVertical = this.state.viewportResolvedDisplayModeVertical;
                    const nextViewportResolvedDisplayModeVertical = this.getViewportResolvedDisplayModeVertical();
                    this.setBottomOverlayDrawerWidth();
                    let atLeastOneOverlayDrawerNeedsToClose = false;
                    const updatedState = {};
                    const checkBottomDrawerDisplayModeChange = () => {
                        if (this.isDrawerOpened(ojdrawerutils.DrawerConstants.stringBottom) &&
                            this.state[this.edgeToDisplayName(ojdrawerutils.DrawerConstants.stringBottom)] === 'auto') {
                            atLeastOneOverlayDrawerNeedsToClose = true;
                            updatedState[this.edgeToShouldChangeDisplayMode(ojdrawerutils.DrawerConstants.stringBottom)] = true;
                        }
                    };
                    if (prevViewportResolvedDisplayMode !== nextViewportResolvedDisplayMode) {
                        this.lockResizeListener();
                        const edges = [ojdrawerutils.DrawerConstants.stringStart, ojdrawerutils.DrawerConstants.stringEnd];
                        for (let i = 0; i < edges.length; i++) {
                            const edge = edges[i];
                            if (this.isDrawerOpened(edge) && this.state[this.edgeToDisplayName(edge)] === 'auto') {
                                atLeastOneOverlayDrawerNeedsToClose = true;
                                updatedState[this.edgeToShouldChangeDisplayMode(edge)] = true;
                            }
                        }
                        const reflowOverlay = [ojdrawerutils.DrawerConstants.stringReflow, ojdrawerutils.DrawerConstants.stringOverlay];
                        if (reflowOverlay.indexOf(prevViewportResolvedDisplayMode) > -1 &&
                            reflowOverlay.indexOf(nextViewportResolvedDisplayMode) > -1) {
                            checkBottomDrawerDisplayModeChange();
                        }
                    }
                    if (prevViewportResolvedDisplayModeVertical !== nextViewportResolvedDisplayModeVertical &&
                        prevViewportResolvedDisplayMode === ojdrawerutils.DrawerConstants.stringReflow) {
                        checkBottomDrawerDisplayModeChange();
                    }
                    if (atLeastOneOverlayDrawerNeedsToClose === false) {
                        updatedState.viewportResolvedDisplayMode = nextViewportResolvedDisplayMode;
                        updatedState.viewportResolvedDisplayModeVertical = nextViewportResolvedDisplayModeVertical;
                    }
                    if (Object.keys(updatedState).length > 0) {
                        this.setState(updatedState);
                    }
                }
            };
            this.getDrawerPosition = (edge) => {
                const horizontal = edge === ojdrawerutils.DrawerConstants.stringBottom ? ojdrawerutils.DrawerConstants.stringStart : edge;
                const vertical = edge === ojdrawerutils.DrawerConstants.stringBottom
                    ? ojdrawerutils.DrawerConstants.stringBottom
                    : ojdrawerutils.DrawerConstants.stringTop;
                const pos = `${horizontal} ${vertical}`;
                let position = {
                    my: pos,
                    at: pos,
                    of: this.mainSectionRef.current,
                    collision: 'none'
                };
                return oj.PositionUtils.normalizeHorizontalAlignment(position, ojdrawerutils.DrawerUtils.isRTL());
            };
        }
        static getDerivedStateFromProps(props, state) {
            const derivedState = {};
            if (state.startOpened) {
                if (props.startDisplay !== state.startDisplay) {
                    derivedState[`${ojdrawerutils.DrawerConstants.stringStart}${ojdrawerutils.DrawerConstants.stringStateToChangeTo}`] = {
                        startDisplay: props.startDisplay
                    };
                    return derivedState;
                }
            }
            if (state.endOpened) {
                if (props.endDisplay !== state.endDisplay) {
                    derivedState[`${ojdrawerutils.DrawerConstants.stringEnd}${ojdrawerutils.DrawerConstants.stringStateToChangeTo}`] = {
                        endDisplay: props.endDisplay
                    };
                    return derivedState;
                }
            }
            if (state.bottomOpened) {
                if (props.bottomDisplay !== state.bottomDisplay) {
                    derivedState[`${ojdrawerutils.DrawerConstants.stringBottom}${ojdrawerutils.DrawerConstants.stringStateToChangeTo}`] = {
                        bottomDisplay: props.bottomDisplay
                    };
                    return derivedState;
                }
            }
            if (props.startOpened !== state.startOpened) {
                derivedState.startOpened = props.startOpened;
                if (props.startOpened) {
                    derivedState.lastlyOpenedDrawer = ojdrawerutils.DrawerConstants.stringStart;
                }
            }
            if (props.endOpened !== state.endOpened) {
                derivedState.endOpened = props.endOpened;
                if (props.endOpened) {
                    derivedState.lastlyOpenedDrawer = ojdrawerutils.DrawerConstants.stringEnd;
                }
            }
            if (props.bottomOpened !== state.bottomOpened) {
                derivedState.bottomOpened = props.bottomOpened;
                if (props.bottomOpened) {
                    derivedState.lastlyOpenedDrawer = ojdrawerutils.DrawerConstants.stringBottom;
                }
            }
            if (props.startDisplay !== state.startDisplay) {
                derivedState.startDisplay = props.startDisplay;
            }
            if (props.endDisplay !== state.endDisplay) {
                derivedState.endDisplay = props.endDisplay;
            }
            if (props.bottomDisplay !== state.bottomDisplay) {
                derivedState.bottomDisplay = props.bottomDisplay;
            }
            return Object.keys(derivedState).length === 0 ? null : derivedState;
        }
        render(props) {
            let startDrawer = this.getDrawer(ojdrawerutils.DrawerConstants.stringStart);
            let endDrawer = this.getDrawer(ojdrawerutils.DrawerConstants.stringEnd);
            let bottomDrawer = this.getDrawer(ojdrawerutils.DrawerConstants.stringBottom);
            return (jsxRuntime.jsxs(ojvcomponent.Root, { ref: this.rootRef, children: [startDrawer, jsxRuntime.jsxs("div", { ref: this.middleSectionRef, class: ojdrawerutils.DrawerConstants.middleSectionSelector, children: [jsxRuntime.jsx("div", { ref: this.mainSectionRef, class: ojdrawerutils.DrawerConstants.mainContentSelector, children: props.children }), bottomDrawer] }), endDrawer] }));
        }
        getDrawer(edge) {
            const resolvedMode = this.getDrawerResolvedDisplayMode(edge);
            const isOverlay = resolvedMode === ojdrawerutils.DrawerConstants.stringOverlay ||
                resolvedMode === ojdrawerutils.DrawerConstants.stringFullOverlay;
            const tabIndexAttr = isOverlay ? -1 : undefined;
            if (this.isDrawerOpened(edge) ||
                this.wasDrawerOpenedInPrevState(edge) ||
                this.wasDrawerClosedWithEsc(edge)) {
                return (jsxRuntime.jsx("div", { ref: this.getDrawerWrapperRef(edge), class: this.getDrawerWrapperStyleClasses(edge), children: jsxRuntime.jsx("div", { ref: this.getDrawerRef(edge), tabIndex: tabIndexAttr, class: this.getDrawerStyleClasses(edge), onKeyDown: (event) => this.handleKeyDown(edge, event), children: this.getDrawerContent(edge) }) }));
            }
            return null;
        }
        isDrawerOpened(edge) {
            return this.state[this.edgeToStateOpenedName(edge)];
        }
        wasDrawerOpenedInPrevState(edge) {
            return this[this.edgeToPrevStateOpenedName(edge)];
        }
        wasDrawerClosedWithEsc(edge) {
            return this[this.edgeToClosedWithEsc(edge)];
        }
        getDrawerWrapperRef(edge) {
            switch (edge) {
                case ojdrawerutils.DrawerConstants.stringStart:
                    return this.startWrapperRef;
                case ojdrawerutils.DrawerConstants.stringEnd:
                    return this.endWrapperRef;
                case ojdrawerutils.DrawerConstants.stringBottom:
                    return this.bottomWrapperRef;
            }
        }
        getDrawerRef(edge) {
            switch (edge) {
                case ojdrawerutils.DrawerConstants.stringStart:
                    return this.startRef;
                case ojdrawerutils.DrawerConstants.stringEnd:
                    return this.endRef;
                case ojdrawerutils.DrawerConstants.stringBottom:
                    return this.bottomRef;
            }
        }
        getDrawerContent(edge) {
            switch (edge) {
                case ojdrawerutils.DrawerConstants.stringStart:
                    return this.props.start;
                case ojdrawerutils.DrawerConstants.stringEnd:
                    return this.props.end;
                case ojdrawerutils.DrawerConstants.stringBottom:
                    return this.props.bottom;
            }
        }
        getDrawerWrapperStyleClasses(edge) {
            return (`${ojdrawerutils.DrawerConstants.stringOjDrawer}${ojdrawerutils.DrawerConstants.charDash}${ojdrawerutils.DrawerConstants.stringReflow}-wrapper` +
                ' ' +
                this.getDrawerStyleClasses(edge));
        }
        getDrawerStyleClasses(edge) {
            let customStyleClassMap;
            const displayMode = this.getDrawerResolvedDisplayMode(edge);
            switch (displayMode) {
                case ojdrawerutils.DrawerConstants.stringReflow: {
                    customStyleClassMap = {
                        [ojdrawerutils.DrawerConstants.styleDisplayMode(ojdrawerutils.DrawerConstants.stringReflow)]: true
                    };
                    break;
                }
                case ojdrawerutils.DrawerConstants.stringOverlay: {
                    customStyleClassMap = {
                        [ojdrawerutils.DrawerConstants.styleDisplayMode(ojdrawerutils.DrawerConstants.stringOverlay)]: true
                    };
                    break;
                }
                case ojdrawerutils.DrawerConstants.stringFullOverlay: {
                    customStyleClassMap = {
                        [ojdrawerutils.DrawerConstants.styleDisplayMode(ojdrawerutils.DrawerConstants.stringOverlay)]: true,
                        [ojdrawerutils.DrawerConstants.styleDisplayMode(ojdrawerutils.DrawerConstants.stringFullOverlay)]: true
                    };
                    break;
                }
            }
            return ojdrawerutils.DrawerUtils.getStyleClassesMapAsString(Object.assign(customStyleClassMap, ojdrawerutils.DrawerUtils.getCommonStyleClasses(edge)));
        }
        getDrawerResolvedDisplayMode(edge) {
            const edgeDisplay = this.edgeToDisplayName(edge);
            if (this.state[edgeDisplay] === 'auto') {
                if (edge === ojdrawerutils.DrawerConstants.stringBottom) {
                    if (this.state.viewportResolvedDisplayModeVertical === ojdrawerutils.DrawerConstants.stringFullOverlay ||
                        this.state.viewportResolvedDisplayMode === ojdrawerutils.DrawerConstants.stringFullOverlay) {
                        return ojdrawerutils.DrawerConstants.stringFullOverlay;
                    }
                    if (this.state.viewportResolvedDisplayModeVertical === ojdrawerutils.DrawerConstants.stringOverlay ||
                        this.state.viewportResolvedDisplayMode === ojdrawerutils.DrawerConstants.stringOverlay) {
                        return ojdrawerutils.DrawerConstants.stringOverlay;
                    }
                    return ojdrawerutils.DrawerConstants.stringReflow;
                }
                return this.state.viewportResolvedDisplayMode;
            }
            if (this.state[edgeDisplay] === ojdrawerutils.DrawerConstants.stringReflow) {
                return ojdrawerutils.DrawerConstants.stringReflow;
            }
            if (this.state[edgeDisplay] === ojdrawerutils.DrawerConstants.stringOverlay) {
                const axisDisplayMode = edge === ojdrawerutils.DrawerConstants.stringBottom
                    ? this.state.viewportResolvedDisplayModeVertical
                    : this.state.viewportResolvedDisplayMode;
                return axisDisplayMode === ojdrawerutils.DrawerConstants.stringFullOverlay
                    ? ojdrawerutils.DrawerConstants.stringFullOverlay
                    : ojdrawerutils.DrawerConstants.stringOverlay;
            }
        }
        getViewportResolvedDisplayMode() {
            const viewportWidth = ojdrawerutils.DrawerUtils.getViewportWidth();
            if (viewportWidth >= ojdrawerutils.DrawerConstants.displayTypeChangeThreshold) {
                return ojdrawerutils.DrawerConstants.stringReflow;
            }
            else if (viewportWidth < ojdrawerutils.DrawerConstants.displayTypeChangeThreshold &&
                viewportWidth >= ojdrawerutils.DrawerConstants.fullWidthDrawerChangeThreshold) {
                return ojdrawerutils.DrawerConstants.stringOverlay;
            }
            return ojdrawerutils.DrawerConstants.stringFullOverlay;
        }
        getViewportResolvedDisplayModeVertical() {
            const viewportHeight = ojdrawerutils.DrawerUtils.getViewportHeight();
            if (viewportHeight >= ojdrawerutils.DrawerConstants.fullHeightDrawerChangeThreshold) {
                return ojdrawerutils.DrawerConstants.stringReflow;
            }
            return ojdrawerutils.DrawerConstants.stringFullOverlay;
        }
        async selfClose(edge) {
            try {
                await this.props.onOjBeforeClose?.({ edge });
            }
            catch (_) {
                return;
            }
            if (edge === ojdrawerutils.DrawerConstants.stringStart) {
                this.props.onStartOpenedChanged?.(false);
            }
            if (edge === ojdrawerutils.DrawerConstants.stringEnd) {
                this.props.onEndOpenedChanged?.(false);
            }
            if (edge === ojdrawerutils.DrawerConstants.stringBottom) {
                this.props.onBottomOpenedChanged?.(false);
            }
        }
        setDrawerFocus(edge) {
            const drawerRef = this.getDrawerRef(edge);
            const autofocusItems = ojdrawerutils.DrawerUtils.getAutofocusFocusables(drawerRef.current);
            const { length: autofocusLength, 0: autofocusFirstItem } = autofocusItems;
            if (autofocusLength > 0) {
                autofocusFirstItem.focus({ preventScroll: true });
                return;
            }
            const focusables = ojdrawerutils.DrawerUtils.getFocusables(drawerRef.current);
            let elementToFocus = drawerRef.current;
            if (focusables.length) {
                elementToFocus = focusables[0];
            }
            elementToFocus.focus({ preventScroll: true });
        }
        componentDidUpdate(prevProps, prevState) {
            this.handleComponentUpdate(prevState);
        }
        componentDidMount() {
            this.startOpenedPrevState = this.props.startOpened;
            this.endOpenedPrevState = this.props.endOpened;
            this.bottomOpenedPrevState = this.props.bottomOpened;
            if (this.windowResizeHandler === null) {
                this.windowResizeHandler = this.windowResizeCallback.bind(this);
            }
            window.addEventListener(ojdrawerutils.DrawerConstants.stringResize, this.windowResizeHandler);
            if (DrawerLayout_1.defaultProps.startOpened != this.props.startOpened ||
                DrawerLayout_1.defaultProps.endOpened != this.props.endOpened ||
                DrawerLayout_1.defaultProps.bottomOpened != this.props.bottomOpened) {
                const stateCopy = Object.assign({}, this.state);
                stateCopy.startOpened = false;
                stateCopy.endOpened = false;
                stateCopy.bottomOpened = false;
                this.handleComponentUpdate(stateCopy);
            }
        }
        componentWillUnmount() {
            window.removeEventListener(ojdrawerutils.DrawerConstants.stringResize, this.windowResizeHandler);
            this.windowResizeHandler = null;
            this.removeDrawerLayoutResizeListener();
        }
        removeDrawerLayoutResizeListener() {
            if (this.drawerLayoutResizeHandler) {
                DomUtils.removeResizeListener(this.rootRef.current, this.drawerLayoutResizeHandler);
                this.drawerLayoutResizeHandler = null;
            }
        }
        handleComponentUpdate(prevState) {
            let sides = [
                ojdrawerutils.DrawerConstants.stringStart,
                ojdrawerutils.DrawerConstants.stringEnd,
                ojdrawerutils.DrawerConstants.stringBottom
            ];
            sides = sides.filter((side) => side != this.state.lastlyOpenedDrawer);
            this.openOrCloseDrawer(sides[0], prevState);
            this.openOrCloseDrawer(sides[1], prevState);
            this.openOrCloseDrawer(this.state.lastlyOpenedDrawer, prevState);
        }
        openOrCloseDrawer(edge, prevState) {
            const openedStateName = this.edgeToStateOpenedName(edge);
            if (this.isDrawerOpened(edge) != prevState[openedStateName] ||
                this.shouldDrawerChangeDisplayMode(edge) ||
                (this.isDrawerOpened(edge) && prevState[openedStateName])) {
                if (this.isDrawerOpened(edge) != prevState[openedStateName]) {
                    this[this.edgeToPrevStateOpenedName(edge)] = this.isDrawerOpened(edge);
                }
                const displayMode = this.getDrawerResolvedDisplayMode(edge);
                if (displayMode === ojdrawerutils.DrawerConstants.stringReflow) {
                    this.openOrCloseReflowDrawer(edge, prevState);
                }
                else {
                    this.openOrClosePopupDrawer(edge, prevState);
                }
            }
        }
        openOrCloseReflowDrawer(edge, prevState) {
            if (this.isDrawerOpened(edge) === false ||
                this.shouldDrawerChangeDisplayMode(edge) ||
                this.getStateToChangeTo(edge)) {
                this.elementWithFocusBeforeDrawerCloses = document.activeElement;
                this.animateClose(edge)
                    .then(() => {
                    const drawerRef = this.getDrawerRef(edge).current;
                    if (drawerRef) {
                        if (edge === ojdrawerutils.DrawerConstants.stringStart) {
                            DomUtils.removeResizeListener(drawerRef, this.startReflowDrawerResizeHandler);
                            this.startReflowDrawerResizeHandler = null;
                        }
                        else if (edge === ojdrawerutils.DrawerConstants.stringEnd) {
                            DomUtils.removeResizeListener(drawerRef, this.endReflowDrawerResizeHandler);
                            this.endReflowDrawerResizeHandler = null;
                        }
                    }
                    this.returnFocus(edge);
                    if (this.getStateToChangeTo(edge)) {
                        const updatedState = {};
                        const resetStateToChangeTo = {};
                        resetStateToChangeTo[this.edgeToStateToChangeTo(edge)] = null;
                        Object.assign(updatedState, this.getStateToChangeTo(edge), resetStateToChangeTo);
                        this.setState(updatedState);
                    }
                    else if (this.shouldDrawerChangeDisplayMode(edge)) {
                        const updatedState = {};
                        updatedState[this.edgeToShouldChangeDisplayMode(edge)] = false;
                        updatedState.viewportResolvedDisplayMode = this.getViewportResolvedDisplayMode();
                        updatedState.viewportResolvedDisplayModeVertical =
                            this.getViewportResolvedDisplayModeVertical();
                        this.setState(updatedState);
                    }
                    else {
                        if (!this.wasDrawerOpenedInPrevState(edge)) {
                            this.addHiddenStyle(edge);
                            this.forceUpdate();
                            setTimeout(() => {
                                this.setBottomOverlayDrawerWidth();
                            }, 0);
                        }
                    }
                })
                    .then(() => {
                    this.setBottomOverlayDrawerWidth();
                });
            }
            else {
                if (this.isDrawerOpened(edge)) {
                    if (prevState[this.edgeToStateOpenedName(edge)] === false ||
                        prevState[this.edgeToShouldChangeDisplayMode(edge)] ||
                        prevState[this.edgeToDisplayName(edge)] != this.state[this.edgeToDisplayName(edge)]) {
                        if (!prevState[this.edgeToShouldChangeDisplayMode(edge)]) {
                            this.drawerOpener = document.activeElement;
                        }
                        this.removeHiddenStyle(edge);
                        this.animateOpen(edge).then(() => {
                            this.setBottomOverlayDrawerWidth();
                            const drawerRef = this.getDrawerRef(edge).current;
                            if (drawerRef) {
                                if (edge === ojdrawerutils.DrawerConstants.stringStart &&
                                    this.startReflowDrawerResizeHandler === null) {
                                    this.startReflowDrawerResizeHandler = this.reflowDrawerResizeCallback.bind(this);
                                    DomUtils.addResizeListener(drawerRef, this.startReflowDrawerResizeHandler, 50, true);
                                }
                                else if (edge === ojdrawerutils.DrawerConstants.stringEnd &&
                                    this.endReflowDrawerResizeHandler === null) {
                                    this.endReflowDrawerResizeHandler = this.reflowDrawerResizeCallback.bind(this);
                                    DomUtils.addResizeListener(drawerRef, this.endReflowDrawerResizeHandler, 50, true);
                                }
                            }
                        });
                    }
                }
            }
        }
        removeHiddenStyle(edge) {
            this.getDrawerWrapperRef(edge).current?.classList.remove(ojdrawerutils.DrawerConstants.styleDrawerHidden);
        }
        addHiddenStyle(edge) {
            this.getDrawerWrapperRef(edge).current?.classList.add(ojdrawerutils.DrawerConstants.styleDrawerHidden);
        }
        returnFocus(edge) {
            const drawerElem = this.getDrawerRef(edge).current;
            if (drawerElem && drawerElem.contains(this.elementWithFocusBeforeDrawerCloses)) {
                ojdrawerutils.DrawerUtils.moveFocusToElementOrNearestAncestor(this.drawerOpener);
            }
        }
        animateOpen(edge) {
            const busyContext = ojet.Context.getContext(this.rootRef.current).getBusyContext();
            const resolveFunc = busyContext.addBusyState({ description: 'Animation in progress' });
            if (this.getDrawerResolvedDisplayMode(edge) === ojdrawerutils.DrawerConstants.stringReflow) {
                return AnimationUtils.expand(this.getRefToAnimate(edge).current, ojdrawerutils.DrawerUtils.getAnimationOptions('expand', edge)).then(resolveFunc);
            }
            else {
                return AnimationUtils.slideIn(this.getRefToAnimate(edge).current, ojdrawerutils.DrawerUtils.getAnimationOptions(ojdrawerutils.DrawerConstants.stringSlideIn, edge))
                    .then(() => {
                    ojdrawerutils.DrawerUtils.unwrapDrawerClippingArea(this.getDrawerRef(edge).current);
                })
                    .then(resolveFunc);
            }
        }
        animateClose(edge) {
            const busyContext = ojet.Context.getContext(this.rootRef.current).getBusyContext();
            const resolveFunc = busyContext.addBusyState({ description: 'Animation in progress' });
            if (this.getDrawerResolvedDisplayMode(edge) === ojdrawerutils.DrawerConstants.stringReflow) {
                return AnimationUtils.collapse(this.getRefToAnimate(edge).current, ojdrawerutils.DrawerUtils.getAnimationOptions('collapse', edge)).then(resolveFunc);
            }
            else {
                const drawerEl = this.getDrawerRef(edge).current;
                return AnimationUtils.slideOut(this.getRefToAnimate(edge).current, ojdrawerutils.DrawerUtils.getAnimationOptions(ojdrawerutils.DrawerConstants.stringSlideOut, edge))
                    .then(() => {
                    ojdrawerutils.DrawerUtils.unwrapDrawerClippingArea(drawerEl);
                })
                    .then(resolveFunc);
            }
        }
        edgeToStateOpenedName(edge) {
            return `${edge}${ojdrawerutils.DrawerUtils.capitalizeFirstChar(ojdrawerutils.DrawerConstants.stringOpened)}`;
        }
        edgeToPrevStateOpenedName(edge) {
            return `${edge}${ojdrawerutils.DrawerUtils.capitalizeFirstChar(ojdrawerutils.DrawerConstants.stringOpened)}${ojdrawerutils.DrawerConstants.stringPrevState}`;
        }
        edgeToShouldChangeDisplayMode(edge) {
            return `${edge}${ojdrawerutils.DrawerConstants.stringShouldChangeDisplayMode}`;
        }
        edgeToClosedWithEsc(edge) {
            return `${edge}${ojdrawerutils.DrawerConstants.stringClosedWithEsc}`;
        }
        edgeToDisplayName(edge) {
            return `${edge}${ojdrawerutils.DrawerConstants.stringDisplay}`;
        }
        edgeToStateToChangeTo(edge) {
            return `${edge}${ojdrawerutils.DrawerConstants.stringStateToChangeTo}`;
        }
        openOrClosePopupDrawer(edge, prevState) {
            const $drawerElement = $(this.getDrawerRef(edge).current);
            const popupServiceInstance = PopupService.getInstance();
            const popupServiceOptions = this.getPopupServiceOptions(edge, prevState);
            if (this.isDrawerOpened(edge) === false ||
                this.shouldDrawerChangeDisplayMode(edge) ||
                this.getStateToChangeTo(edge)) {
                if (ZOrderUtils.getStatus($drawerElement) === ZOrderUtils.STATUS.OPEN) {
                    popupServiceInstance.close(popupServiceOptions);
                }
            }
            else if (this.isDrawerOpened(edge)) {
                if ([ZOrderUtils.STATUS.CLOSE, ZOrderUtils.STATUS.UNKNOWN].indexOf(ZOrderUtils.getStatus($drawerElement) > -1)) {
                    this.removeHiddenStyle(edge);
                    popupServiceInstance.open(popupServiceOptions);
                }
            }
        }
        shouldDrawerChangeDisplayMode(edge) {
            return this.state[this.edgeToShouldChangeDisplayMode(edge)];
        }
        getStateToChangeTo(edge) {
            return this.state[this.edgeToStateToChangeTo(edge)];
        }
        getPopupServiceOptions(edge, prevState) {
            const $drawerElement = $(this.getDrawerRef(edge).current);
            const PSOptions = {};
            const PSoption = PopupService.OPTION;
            PSOptions[PSoption.POPUP] = $drawerElement;
            PSOptions[PSoption.LAUNCHER] = $(document.activeElement);
            PSOptions[PSoption.LAYER_SELECTORS] = ojdrawerutils.DrawerConstants.DrawerLayoutStyleSurrogate;
            PSOptions[PSoption.LAYER_LEVEL] = PopupService.LAYER_LEVEL.TOP_LEVEL;
            PSOptions[PSoption.POSITION] = this.getDrawerPosition(edge);
            PSOptions[PSoption.CUSTOM_ELEMENT] = true;
            const PSEvent = PopupService.EVENT;
            PSOptions[PSoption.EVENTS] = {
                [PSEvent.POPUP_BEFORE_OPEN]: () => this.beforeOpenHandler(edge, prevState),
                [PSEvent.POPUP_AFTER_OPEN]: () => this.afterOpenHandler(edge, prevState),
                [PSEvent.POPUP_BEFORE_CLOSE]: () => this.beforeCloseHandler(edge),
                [PSEvent.POPUP_AFTER_CLOSE]: () => this.afterCloseHandler(edge, prevState),
                [PSEvent.POPUP_REFRESH]: () => this.refreshHandler(edge),
                [PSEvent.POPUP_REMOVE]: () => this.destroyHandler(edge)
            };
            return PSOptions;
        }
        beforeOpenHandler(edge, prevState) {
            ojdrawerutils.DrawerUtils.disableBodyOverflow();
            if (!prevState[this.edgeToShouldChangeDisplayMode(edge)]) {
                this.drawerOpener = document.activeElement;
            }
            const drawerElement = this.getDrawerRef(edge).current;
            const $drawerElement = $(drawerElement);
            const position = this.getDrawerPosition(edge);
            if (edge === ojdrawerutils.DrawerConstants.stringBottom) {
                this.setBottomOverlayDrawerWidth();
            }
            $drawerElement.show();
            $drawerElement.position(position);
            this.setStartEndOverlayDrawersHeight();
            ojdrawerutils.DrawerUtils.wrapDrawerWithClippingArea(drawerElement, position);
            if (this.drawerLayoutResizeHandler === null) {
                this.drawerLayoutResizeHandler = this.drawerLayoutResizeCallback.bind(this);
            }
            DomUtils.addResizeListener(this.rootRef.current, this.drawerLayoutResizeHandler, 50, true);
            return this.animateOpen(edge);
        }
        setBottomOverlayDrawerWidth() {
            if (this.isDrawerOpened(ojdrawerutils.DrawerConstants.stringBottom) &&
                this.getDrawerResolvedDisplayMode(ojdrawerutils.DrawerConstants.stringBottom) !=
                    ojdrawerutils.DrawerConstants.stringReflow) {
                const width = this.middleSectionRef.current.getBoundingClientRect().width;
                this.bottomRef.current.style.width = `${width}px`;
            }
        }
        afterOpenHandler(edge, prevState) {
            ojdrawerutils.DrawerUtils.enableBodyOverflow();
            this.handleFocus(prevState);
            const drawerElement = this.getDrawerRef(edge).current;
            const $drawerElement = $(drawerElement);
            const status = ZOrderUtils.getStatus($drawerElement);
            if (edge === ojdrawerutils.DrawerConstants.stringStart && this.startOverlayDrawerResizeHandler === null) {
                this.startOverlayDrawerResizeHandler = this.overlayDrawerResizeCallback.bind(this, ojdrawerutils.DrawerConstants.stringStart);
                DomUtils.addResizeListener(drawerElement, this.startOverlayDrawerResizeHandler, 50, true);
            }
            else if (edge === ojdrawerutils.DrawerConstants.stringEnd && this.endOverlayDrawerResizeHandler === null) {
                this.endOverlayDrawerResizeHandler = this.overlayDrawerResizeCallback.bind(this, ojdrawerutils.DrawerConstants.stringEnd);
                DomUtils.addResizeListener(drawerElement, this.endOverlayDrawerResizeHandler, 50, true);
            }
            else if (edge === ojdrawerutils.DrawerConstants.stringBottom &&
                this.bottomOverlayDrawerResizeHandler === null) {
                this.bottomOverlayDrawerResizeHandler = this.overlayDrawerResizeCallback.bind(this, ojdrawerutils.DrawerConstants.stringBottom);
                DomUtils.addResizeListener(drawerElement, this.bottomOverlayDrawerResizeHandler, 50, true);
            }
            if (status === ZOrderUtils.STATUS.OPEN && !this.isDrawerOpened(edge)) {
                const popupServiceInstance = PopupService.getInstance();
                const popupServiceOptions = this.getPopupServiceOptions(edge, prevState);
                popupServiceInstance.close(popupServiceOptions);
            }
        }
        handleFocus(prevState) {
            if (this.state.startOpened && prevState.startOpened !== this.state.startOpened) {
                this.setDrawerFocus(ojdrawerutils.DrawerConstants.stringStart);
            }
            if (this.state.endOpened && prevState.endOpened !== this.state.endOpened) {
                this.setDrawerFocus(ojdrawerutils.DrawerConstants.stringEnd);
            }
            if (this.state.bottomOpened && prevState.bottomOpened !== this.state.bottomOpened) {
                this.setDrawerFocus(ojdrawerutils.DrawerConstants.stringBottom);
            }
        }
        beforeCloseHandler(edge) {
            ojdrawerutils.DrawerUtils.disableBodyOverflow();
            this.elementWithFocusBeforeDrawerCloses = document.activeElement;
            if (edge === ojdrawerutils.DrawerConstants.stringStart) {
                DomUtils.removeResizeListener(this.getDrawerRef(edge).current, this.startOverlayDrawerResizeHandler);
                this.startOverlayDrawerResizeHandler = null;
            }
            else if (edge === ojdrawerutils.DrawerConstants.stringEnd) {
                DomUtils.removeResizeListener(this.getDrawerRef(edge).current, this.endOverlayDrawerResizeHandler);
                this.endOverlayDrawerResizeHandler = null;
            }
            else if (edge === ojdrawerutils.DrawerConstants.stringBottom) {
                DomUtils.removeResizeListener(this.getDrawerRef(edge).current, this.bottomOverlayDrawerResizeHandler);
                this.bottomOverlayDrawerResizeHandler = null;
            }
            this.removeDrawerLayoutResizeListener();
            ojdrawerutils.DrawerUtils.wrapDrawerWithClippingArea(this.getDrawerRef(edge).current, this.getDrawerPosition(edge));
            return this.animateClose(edge);
        }
        afterCloseHandler(edge, prevState) {
            if (this[this.edgeToClosedWithEsc(edge)]) {
                this[this.edgeToClosedWithEsc(edge)] = false;
            }
            ojdrawerutils.DrawerUtils.enableBodyOverflow();
            this.returnFocus(edge);
            const $drawerElement = $(this.getDrawerRef(edge).current);
            const status = ZOrderUtils.getStatus($drawerElement);
            if (this.getDrawerRef(edge).current) {
                this.getDrawerRef(edge).current.removeAttribute('style');
            }
            if (this.getStateToChangeTo(edge)) {
                const updatedState = {};
                const resetStateToChangeTo = {};
                resetStateToChangeTo[this.edgeToStateToChangeTo(edge)] = null;
                Object.assign(updatedState, this.getStateToChangeTo(edge), resetStateToChangeTo);
                this.setState(updatedState);
            }
            else if (this.shouldDrawerChangeDisplayMode(edge)) {
                const updatedState = {};
                updatedState[this.edgeToShouldChangeDisplayMode(edge)] = false;
                updatedState.viewportResolvedDisplayMode = this.getViewportResolvedDisplayMode();
                updatedState.viewportResolvedDisplayModeVertical =
                    this.getViewportResolvedDisplayModeVertical();
                this.setState(updatedState);
            }
            else if (status === ZOrderUtils.STATUS.CLOSE && this.isDrawerOpened(edge)) {
                const popupServiceInstance = PopupService.getInstance();
                const popupServiceOptions = this.getPopupServiceOptions(edge, prevState);
                popupServiceInstance.open(popupServiceOptions);
            }
            else if (!this.wasDrawerOpenedInPrevState(edge)) {
                this.addHiddenStyle(edge);
                this.forceUpdate();
            }
            this.props.onOjClose?.({ edge });
        }
        setStartEndOverlayDrawersHeight() {
            const middleSectionHeight = ojdrawerutils.DrawerUtils.getElementHeight(this.middleSectionRef.current) + 'px';
            const startDrawerElement = this.startRef.current;
            if (startDrawerElement &&
                this.getDrawerResolvedDisplayMode(ojdrawerutils.DrawerConstants.stringStart) != ojdrawerutils.DrawerConstants.stringReflow) {
                startDrawerElement.style.height = middleSectionHeight;
            }
            const endDrawerElement = this.endRef.current;
            if (endDrawerElement &&
                this.getDrawerResolvedDisplayMode(ojdrawerutils.DrawerConstants.stringEnd) != ojdrawerutils.DrawerConstants.stringReflow) {
                endDrawerElement.style.height = middleSectionHeight;
            }
        }
    };
    exports.DrawerLayout.defaultProps = {
        startOpened: false,
        endOpened: false,
        bottomOpened: false,
        startDisplay: 'auto',
        endDisplay: 'auto',
        bottomDisplay: 'auto'
    };
    exports.DrawerLayout._metadata = { "slots": { "": {}, "start": {}, "end": {}, "bottom": {} }, "properties": { "startOpened": { "type": "boolean", "writeback": true }, "endOpened": { "type": "boolean", "writeback": true }, "bottomOpened": { "type": "boolean", "writeback": true }, "startDisplay": { "type": "string", "enumValues": ["auto", "overlay", "reflow"] }, "endDisplay": { "type": "string", "enumValues": ["auto", "overlay", "reflow"] }, "bottomDisplay": { "type": "string", "enumValues": ["auto", "overlay", "reflow"] } }, "events": { "ojBeforeClose": { "cancelable": true }, "ojClose": {} }, "extension": { "_WRITEBACK_PROPS": ["startOpened", "endOpened", "bottomOpened"], "_READ_ONLY_PROPS": [] } };
    exports.DrawerLayout = DrawerLayout_1 = __decorate([
        ojvcomponent.customElement('oj-drawer-layout')
    ], exports.DrawerLayout);

    Object.defineProperty(exports, '__esModule', { value: true });

});


define("bundles/ojdrawerbundle", function(){});
