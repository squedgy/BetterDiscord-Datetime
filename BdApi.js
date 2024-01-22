/**
 * @typedef {String} IdOrFile - An addon Id or file
 * @typedef {Object} Addon
 * 
 * @typedef {Object} AddonAPI
 * @property {string} folder - The path to the addon folder
 * @property {function(IdOrFile):void} disable - disable the given addon
 * @property {function(IdOrFile):void} enable - enable the given addon
 * @property {function(IdOrFile):Addon} get - retrieves an addon
 * @property {function():Array.<Addon>} getAll - retrieves all addons
 * @property {function(IdOrFile):boolean} isEnabled - is the requested addon enabled
 * @property {function(IdOrFile):void} toggle - toggle the state of an addon
 */

/**
 * @typedef {string} NavId
 * @typedef {function():void} Unpatcher
 * @typedef {Function} Callback
 * 
 * @typedef {"text" | "submenu" | "toggle" | "radio" | "custom" | "separator"} ContextChildType
 * @typedef {{type?: ContextChildType}} ContextComponentProps
 * 
 * @typedef {Object} ContextMenuOpenProps
 * @property {MouseEvent} event - The event that should be used to open the context menu
 * @property {Function} menuComponent - The component to render. React component. ContextMenu build helpers recommended
 * @property {{position?:"left"|"right", align?: "top" | "bottom", onClose?: Function}} config - Configuration options
 * 
 * @typedef {Object} ContextMenu
 * @property {function(ContextComponentProps):Object} buildItem - builds a menu component
 * @property {function(Array.<ContextComponentProps>):Function} buildMenu - build a menu component uses {@link ContextMenu.buildMenuChildren}
 * @property {function(Array.<ContextComponentProps>):Array.<Object>} buildMenuChildren - Creates all itesm and groups of a context menu recursively. There's no defined limit to the recursivity of groups or number of children
 * @property {function():void} close - close the currently displayed context menu
 * @property {function(ContextMenuOpenProps):void} open - Open a context menu. Use one of the helpers above to help build it
 * @property {function(NavId, Callback):Unpatcher} patch - wrap the patcher?
 * @property {function(Callback):void} unpatch - stop wrapping the patcher with the given callback. Shuold be the same reference as passed to {@link ContextMenu.patch}
 */

/**
 * @typedef {string} PluginName
 * 
 * @typedef {Object} Data
 * @property {function(PluginName, string):void} delete - Delete the value for the given plugin's property
 * @property {<T>function(PluginName, String):T} load - Load the value for the given plugin's property
 * @property {function(PluginName, String, any):void} save - Save the value for the given plugin's property
 */

/**
 * @typedef {string} DomId
 * @typedef {string} cssString
 * 
 * @typedef {Function} UpdateCallback
 * @typedef {number} Duration
 * @typedef {number} PercentOfDuration
 * @typedef {{timing?: PercentOfDuration}} AnimateOptions
 * 
 * @typedef {keyof HTMLElementTagNameMap} HtmlTag
 * @typedef {{className?: string, id?: string, target?: HTMLElement}} CreateElemOption
 * @typedef {HTMLElement} Child
 * 
 * @typedef {Object} DOM
 * @prop {number} screenHeight
 * @prop {number} screenWidth
 * @prop {function(DomId, cssString):void} addStyle - add a style with the given id to the document
 * @prop {function(UpdateCallback, Duration, AnimateOptions=):void} animate - Help animate using JS
 * @prop {function(HtmlTag, CreateElemOption=, Child):HTMLElement} createElement - create DOM elements easier. Similar to React.createElement
 * @prop {function(HTMLElement, Function):void} onRemoved - When the given element is removed from the DOM call the given function
 * @prop {function(string, true):DocumentFragment | function(string, false=):Node|Array.<Node>} parseHTML - parse the html and retrieve a {@link https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment | document fragment}
 * @prop {function(DomId):void} removeStyle - removes a style element with the given ID from the DOM
 */

/**
 * @typedef {Object} Filters A collection of functions useful for finding webpack modules
 * @prop {function(string):Function} byDisplayName filters matching the `displayName`
 * @prop {function(...string):Function} byKeys filters by finding objects that contain the given keys
 * @prop {function(...string):Function} byPrototypeKeys filters on the objects prototype's properties
 * @prop {function(RegExp, Function):Function} byRegex "filters by a regex" on top of the given filter
 * @prop {function(string):Function} byStoreName filters on an interanl store name
 * @prop {function(...string):Function} byStrings filters on strings
 * @prop {function(...Function):Function} combine filters by combining the given filters
 */

/**
 * @typedef {Object} FetchProps
 * @prop {"GET" | "PUT" | "POST" | "DELETE"} [method]
 * @prop {Record<string, string>} [headers]
 * @prop {"manual" | "follow"} [redirect]
 * @prop {number} [maxRedirects]
 * @prop {AbortSignal} [signal]
 * @prop {number} [timeout]
 * @prop {Uint8Array | string} [body]
 * 
 * @typedef {string} Url
 * 
 * @typedef {Object} Net
 * @prop {function(Url, FetchProps):Response} fetch
 */

/**
 * @typedef {string} Caller
 * 
 * @typedef {Object} Patcher
 * @prop {<Module, Property extends keyof Module>function(Caller, Module, Property, Module[Property]):Unpatcher} after perform the given patch function after the original function
 * @prop {<Module, Property extends keyof Module>function(Caller, Module, Property, Module[Property]):Unpatcher} before perform the given patch function before the original function
 * @prop {function(Caller):Array.<Function>} getPatchesByCaller
 * @prop {<Module, Property extends keyof Module>function(Caller, Module, Property, Module[Property]):Unpatcher} instead perform the given patch in place of the original function
 * @prop {function(Caller):void} unpatchAll unpatch all patches performed by the given Caller
 */

/**
 * @typedef {Object} OwnerProps
 * @prop {Array.<string>=} include items to include in the search
 * @prop {Array.<string>=} exclude items to exclude from the search
 * @prop {function(any):boolean=} filter is the given instance the owner instance
 * 
 * @typedef {Object} ReactUtils
 * @prop {function(HTMLElement):undefined | Object} getInternalInstance get the internal react data of the given node
 * @prop {function(HTMLElement, OwnerProps):undefined | Object} getOwnerInstance find the "owner" node of the given element. By default a node with a `stateNode`
 * @prop {function(HTMLElement):Object} wrapElement wrap the given element in an unrendered React Element
 */

/**
 * @typedef {string} Title
 * @typedef {any} ReactElement
 * @typedef {string | ReactElement} Content
 * @typedef {any} Tooltip
 * 
 * @typedef {Object} TooltipProps
 * @prop {"primary"|"secondary"|"success"|"warn"|"danger"=} style
 * @prop {"top"|"right"|"bottom"|"left"=} side
 * @prop {boolean=} preventFlip
 * @prop {boolean=} disabled
 * 
 * @typedef {Object} DialogProps
 * @prop {"open" | "save"=} mode open or save files
 * @prop {string=} defaultPath the default path the dialog should show
 * @prop {Array.<{name: string, extensions:Array.<string>}>=} filters
 * @prop {string=} title
 * @prop {string=} message
 * @prop {boolean=} showOverwriteConfirmation when overwriting a file
 * @prop {boolean=} showHiddenFiles
 * @prop {boolean=} promptToCreate folders
 * @prop {boolean=} openDirectory can the use target a directory
 * @prop {boolean=} openFile can the user target normal files
 * @prop {boolean=} multiSelections
 * @prop {boolean=} modal to the main window
 * 
 * @typedef {Object} ConfirmationProps
 * @prop {boolean=} danger should the main button be red
 * @prop {string=} confirmText
 * @prop {string=} cancelText
 * @prop {function():void=} onConfirm
 * @prop {function():void=} onCancel
 * 
 * @typedef {Object} NoticeProps
 * @prop {"" | "info" | "success" | "danger" | "error" | "warning" | "warn"=} type no idea if there are other types
 * @prop {Array.<{label: string, onClick: function():void}>} buttons
 * @prop {number=} timeout 0 is no timeout
 * 
 * @typedef {Object} ToastProps
 * @prop {"" | "info" | "success" | "danger" | "error" | "warning" | "warn"=} type no idea if there are other types
 * @prop {boolean=} icon display the type's icon
 * @prop {number=} timeout
 * @prop {boolean=} forceShow should we ignore the Better discord ignore toast setting
 * 
 * @typedef {Object} UI
 * @prop {function(Title, Content | Array.<Content>):void} alert display an alert with the given title an content
 * @prop {function(HTMLElement, Content, TooltipProps):Tooltip} createTooltip creates a tooltip to display when the given element is hovered
 * @prop {function(DialogProps):Promise.<{cancelled: boolean, filePath?: string, filePaths?: Array.<string>}>} openDialog provides access to electron's dialog API
 * @prop {function(Title, Content | Array.<Content>, ConfirmationProps):string} showConfirmationModal returns the modal's key
 * @prop {function(Content, NoticeProps):Function} showNotice
 * @prop {function(Content, ToastProps):void} showToast
 */

/**
 * @typedef {number} Delay
 * @typedef {string} HtmlString
 * 
 * @typedef {Object} TreeFindProps
 * @prop {Array.<string> | null=} walkable object properties that are allowed to be walked through
 * @prop {Array.<string>=} ignore properties to ignore and never walk through
 * 
 * @typedef {Object} Utils
 * @prop {function(...any):string} className builds classnames from the given items. Arrays are flattened then joined with spaces, Object properties are added when their value is truthy
 * @prop {<Func extends function(..any):any>function(Func, Delay):Func} debounce delay calling the function until Delay amount of time has passed. If the function is called again within this time the delay is reset and will only be called 1 time
 * @prop {function(string):HtmlString} escapeHTML
 * @prop {function(Object, ...Object): Object} extend extends and returns the first argument. recursive extension
 * @prop {function(Object, Function, TreeFindProps):void} findInTree
 */

/**
 * @typedef {Object} RegExpProps
 * @prop {boolean=} defaultExport should it return the default export
 * @prop {boolean=} searchExports should we filter on webpack exports
 * 
 * @typedef {Object} ModuleProps
 * @prop {boolean=} first return only the first match
 * @prop {boolean=} defaultExport return the default export
 * @prop {boolean=} searchExports should we search webpack exports
 * 
 * @typedef {Object} BulkProps
 * @prop {Function} filter function used to filter modules
 * @prop {boolean=} first return only the first match
 * @prop {boolean=} defaultExport return the default export
 * @prop {boolean=} searchExports should we search webpack exports
 * 
 * @typedef {Object} Webpack
 * @prop {Array.<Function>} Filters filters used to find webpack modules
 * @prop {Record<string, any>} modules module source by ID
 * @prop {function(...string):Array.<any>} getAllByKeys find all modules with the given properties
 * @prop {function(...string):Array.<any>} getAllByPrototypeKeys find all modules whose prototype has the given properties
 * @prop {function(RegExp, RegExpProps=):Array.<any>} getAllByRegex find all modules whose code matches the given regex
 * @prop {function(...string):Array.<any>} getAllByStrings finds modules with the given strings
 * @prop {function(...BulkProps):any} getBulk find multiple modules using multiple filters
 * @prop {function(...string):any} getByKeys finds a single module that has the given properties
 * @prop {function(...string):any} getByPrototypeKeys finds a single module whose prototype has the given modules
 * @prop {function(RegExp, RegExpProps):any} getByRegex finds a single module using it's code
 * @prop {function(...string):any} getByStrings finds a single module based on a set of strings
 * @prop {function(Function, ModuleProps):any} getModule finds a single module matching the given filter
 * @prop {function(Function, RegExpProps):Array.<any>} getModules finds all modules matching the given filter
 * @prop {function(string):any} getStore finds an internal store with the given name
 * @prop {function(Function, {target?: any} & RegExpProps):Array.<any, string>} getWithKey searches for a module with a given key. Returns the module and the key. Somehow useful with the patcher
 * @prop {function(Function, {signal?: AbortSignal} & RegExpProps):Promise.<any>} waitForModule finds a module that is lazy loaded
 */

/**
 * @typedef {Object} BdApi
 * @property {AddonAPI} AddonAPI
 * @property {ContextMenu} ContextMenu
 * @prop {Data} Data
 * @prop {DOM} DOM
 * @prop {Filters} Filters
 * @prop {Net} Net
 * @prop {Patcher} Patcher
 * @prop {ReactUtils} ReactUtils
 * @prop {UI} UI
 * @prop {Utils} Utils
 * @prop {Webpack} Webpack
 * */

/** @type {BdApi} */
const thing = undefined;

module.exports = {BdApi: thing};