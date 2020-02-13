# min

Collection of functions used for DOM manipulations in Userscripts.

## Development

-   Run `npm install` to install the dependencies.
-   Run `npm run lint-code` to check for errors in the code.
-   Run `npm run fix-code` to fix errors in the code.
-   Run `npm run build-code` to update the minified version.
-   Run `npm run lint-docs` to check for errors in the documentation.
-   Run `npm run build-docs` to update the documentation.
-   Run `npm run build` to run all the scripts at the same time, except
    `fix-code` and `lint-docs`.

## Documentation

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

-   [min](#min)
-   [NOT_FOUND](#not_found)
-   [EMPTY](#empty)
-   [FIRST](#first)
-   [FIRST](#first-1)
-   [dom](#dom)
-   [ALL](#all)
-   [getById](#getbyid)
    -   [Parameters](#parameters)
-   [getByClassName](#getbyclassname)
    -   [Parameters](#parameters-1)
-   [getByTagName](#getbytagname)
    -   [Parameters](#parameters-2)
-   [getByQuery](#getbyquery)
    -   [Parameters](#parameters-3)
-   [getByXPath](#getbyxpath)
    -   [Parameters](#parameters-4)
-   [getByMeta](#getbymeta)
    -   [Parameters](#parameters-5)
-   [create](#create)
    -   [Parameters](#parameters-6)
-   [style](#style)
    -   [Parameters](#parameters-7)
-   [style](#style-1)
    -   [Parameters](#parameters-8)
-   [removeNode](#removenode)
    -   [Parameters](#parameters-9)
-   [removeNodes](#removenodes)
    -   [Parameters](#parameters-10)
-   [insertBefore](#insertbefore)
    -   [Parameters](#parameters-11)
-   [insertAfter](#insertafter)
    -   [Parameters](#parameters-12)
-   [addObserver](#addobserver)
    -   [Parameters](#parameters-13)
-   [onNodeExists](#onnodeexists)
    -   [Parameters](#parameters-14)
-   [onNodesExist](#onnodesexist)
    -   [Parameters](#parameters-15)
-   [onNodeInserted](#onnodeinserted)
    -   [Parameters](#parameters-16)
-   [iframe](#iframe)
    -   [Parameters](#parameters-17)
-   [gm](#gm)
-   [get](#get)
    -   [Parameters](#parameters-18)
-   [set](#set)
    -   [Parameters](#parameters-19)
-   [add](#add)
    -   [Parameters](#parameters-20)
-   [remove](#remove)
    -   [Parameters](#parameters-21)
-   [clear](#clear)
    -   [Parameters](#parameters-22)
-   [contains](#contains)
    -   [Parameters](#parameters-23)
-   [read](#read)
    -   [Parameters](#parameters-24)
-   [xhr](#xhr)
    -   [Parameters](#parameters-25)
-   [concatenate](#concatenate)
    -   [Parameters](#parameters-26)
-   [toArray](#toarray)
    -   [Parameters](#parameters-27)
-   [forEach](#foreach)
    -   [Parameters](#parameters-28)
-   [isOnWebsite](#isonwebsite)
    -   [Parameters](#parameters-29)
-   [isOnPath](#isonpath)
    -   [Parameters](#parameters-30)
-   [isOnIframe](#isoniframe)

### min

Collection of functions used for DOM manipulations in Userscripts.

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

### NOT_FOUND

Constant used for items not found in search operations.

Type: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

### EMPTY

Constant used for empty lists.

Type: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

### FIRST

Constant used for accessing the first item in a list.

Type: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

### FIRST

Constant used for nodes getter methods to return the first matching node.

Type: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

### dom

Collection of DOM manipulation functions.

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

### ALL

Constant used for nodes getter methods to return all the matching nodes.

Type: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

### getById

Returns the node by the given id.

#### Parameters

-   `id` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The id of the node.

Returns **[HTMLElement](https://developer.mozilla.org/docs/Web/HTML/Element)** The node with the given id.

### getByClassName

Returns the node or the nodes by the given class name.

#### Parameters

-   `className` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The class name of the node.
-   `index` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Optional position of the node in the array of those found (defaults to the first one). (optional, default `min.dom.FIRST`)
-   `scope` **[HTMLElement](https://developer.mozilla.org/docs/Web/HTML/Element)** Optional root node in which to search. (optional, default `document`)
-   `rootWindow` **[Window](https://developer.mozilla.org/docs/Web/API/Window)** Optional root window of the scope. (optional, default `window`)

Returns **([HTMLElement](https://developer.mozilla.org/docs/Web/HTML/Element) | HTMLCollection | null)** The node or the array of nodes with the given class name or null if scope is not an HTMLElement.

### getByTagName

Returns the node or the nodes by the given tag name.

#### Parameters

-   `tagName` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The tag name of the node.
-   `index` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Optional position of the node in the array of those found (defaults to the first one). (optional, default `min.dom.FIRST`)
-   `scope` **[HTMLElement](https://developer.mozilla.org/docs/Web/HTML/Element)** Optional root node in which to search. (optional, default `document`)
-   `rootWindow` **[Window](https://developer.mozilla.org/docs/Web/API/Window)** Optional root window of the scope. (optional, default `window`)

Returns **([HTMLElement](https://developer.mozilla.org/docs/Web/HTML/Element) | HTMLCollection | null)** The node or the array of nodes with the given tag name or null if scope is not an HTMLElement.

### getByQuery

Returns the node or the nodes by the given css query.

#### Parameters

-   `query` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The query string for searching the node.
-   `index` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Optional position of the node in the array of those found (defaults to the first one). (optional, default `min.dom.FIRST`)
-   `scope` **[HTMLElement](https://developer.mozilla.org/docs/Web/HTML/Element)** Optional root node in which to search. (optional, default `document`)
-   `rootWindow` **[Window](https://developer.mozilla.org/docs/Web/API/Window)** Optional root window of the scope. (optional, default `window`)

Returns **([HTMLElement](https://developer.mozilla.org/docs/Web/HTML/Element) \| [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[HTMLElement](https://developer.mozilla.org/docs/Web/HTML/Element)> | null)** The node or the array of nodes with the given css query or null if scope is not an HTMLElement.

### getByXPath

Returns the node or the nodes by the given xPath location.

#### Parameters

-   `xPath` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The xPath location the node.
-   `index` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Optional position of the node in the array of those found (defaults to the first one). (optional, default `min.dom.FIRST`)
-   `scope` **[HTMLElement](https://developer.mozilla.org/docs/Web/HTML/Element)** Optional root node in which to search. (optional, default `document`)
-   `rootWindow` **[Window](https://developer.mozilla.org/docs/Web/API/Window)** Optional root window of the scope. (optional, default `window`)

Returns **([HTMLElement](https://developer.mozilla.org/docs/Web/HTML/Element) \| [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[HTMLElement](https://developer.mozilla.org/docs/Web/HTML/Element)> | null)** The node or the array of nodes with the given xPath location or null if scope is not an HTMLElement.

### getByMeta

Returns the node or the nodes by the given attribute name and value.

#### Parameters

-   `propertyName` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The attribute name of the node.
-   `value` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The value of the attribute.

Returns **[HTMLElement](https://developer.mozilla.org/docs/Web/HTML/Element)** The node with the given attribute name and value.

### create

Creates an HTMLElement node.

#### Parameters

-   `tagName` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The tag name of the node.
-   `attributes` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Optional attributes for the node. (optional, default `null`)

Returns **[HTMLElement](https://developer.mozilla.org/docs/Web/HTML/Element)** The requested node.

### style

Adds a css style to a node.

#### Parameters

-   `node` **[HTMLElement](https://developer.mozilla.org/docs/Web/HTML/Element)** The node for which to add the style.
-   `style` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** An object with css property and value pairs.

### style

Adds a css style.

#### Parameters

-   `styles` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** An object with selector and style pairs.

### removeNode

Removes a node.

#### Parameters

-   `node` **[HTMLElement](https://developer.mozilla.org/docs/Web/HTML/Element)** The node to be removed.

### removeNodes

Removes a list of nodes.

#### Parameters

-   `getterOrNodes` **([Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function) \| [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[HTMLElement](https://developer.mozilla.org/docs/Web/HTML/Element)>)** Getter function for the node or a list of nodes to be removed.
-   `paramOrParams` **([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)> | [HTMLElement](https://developer.mozilla.org/docs/Web/HTML/Element))?** Parameter or parameters needed for the getter. Optional if a list of nodes is passed for `getterOrNodes`.
-   `args` **...any** 

### insertBefore

Inserts a node before another existing one.

#### Parameters

-   `node` **[HTMLElement](https://developer.mozilla.org/docs/Web/HTML/Element)** The node to be inserted.
-   `reference` **[HTMLElement](https://developer.mozilla.org/docs/Web/HTML/Element)** The node before which the specified node will be inserted.

### insertAfter

Inserts a node after another existing one.

#### Parameters

-   `node` **[HTMLElement](https://developer.mozilla.org/docs/Web/HTML/Element)** The node to be inserted.
-   `reference` **[HTMLElement](https://developer.mozilla.org/docs/Web/HTML/Element)** The node after which the specified node will be inserted.

### addObserver

Creates an observer with a given callback.

#### Parameters

-   `callback` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** The callback function.
-   `root` **[HTMLElement](https://developer.mozilla.org/docs/Web/HTML/Element)** Optional root node on which to observe mutations. (optional, default `document.body`)
-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Optional parameters to pass to the observer. (optional, default `{childList:true,subtree:true}`)

### onNodeExists

Registers a function to be called when a node is first inserted in the DOM.

#### Parameters

-   `getter` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** Getter function for the node.
-   `paramOrParams` **([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>)** Parameter or parameters needed for the getter.
-   `callback` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** The callback function.
-   `disconnect` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Set to false to prevent the observer to disconnect after the node is found. (optional, default `true`)

### onNodesExist

Registers a function to be called when some nodes are first inserted in the DOM.

The `args` must contains these keys:

-   `{Function}` _getter_
-   `{string[]}` _params_

or

-   `{string[][]}` _rules_

#### Parameters

-   `args` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Object containing the rules for retrieving the nodes.
-   `callback` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** The callback function.

### onNodeInserted

Registers a function to be called when nodes are inserted in the DOM.

#### Parameters

-   `callback` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** The callback function.
-   `root` **[HTMLElement](https://developer.mozilla.org/docs/Web/HTML/Element)** Optional root node on which to observe mutations. (optional, default `document.body`)

### iframe

Makes an iframe and returns the content document. It also
removes it after returning from the callback.

#### Parameters

-   `url` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The url for the iframe.
-   `callback` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** The callback function.
-   `scope` **[HTMLElement](https://developer.mozilla.org/docs/Web/HTML/Element)** Optional root node in
      which to append the iframe. (optional, default `document`)

### gm

Collection of GreaseMonkey specific functions.

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** The collection of functions.

### get

Retrieves a stored entry value.

#### Parameters

-   `entryName` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The name of the entry.

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The entry's value or empty string.

### set

Stores an entry.

#### Parameters

-   `entryName` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The name of the entry.
-   `value` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The value of the entry.

### add

Appends an item to the stored entry's value.

#### Parameters

-   `entryName` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The name of the entry.
-   `item` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The item to be appended.

### remove

Removes an item from the stored entry's value.

#### Parameters

-   `entryName` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The name of the entry.
-   `item` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The item to be removed.

### clear

Removes all the items from the stored entry's value.

#### Parameters

-   `entryName` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The name of the entry.

### contains

Checks if the stored entry's value contains an item.

#### Parameters

-   `entryName` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The name of the entry.
-   `item` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The item to be searched.

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Indicates if the item exists.

### read

Reads content from a resource file.

#### Parameters

-   `resourceName` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The resource's name.

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The content of the resource file.

### xhr

Makes an XMLHttpRequest and returns the response as HTML or
raw.

#### Parameters

-   `url` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The url of the request.
-   `callback` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** The callback function.
-   `context` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Optional object to be passed
      to the callback function. (optional, default `null`)
-   `method` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Optional request method
      (defaults to "GET"). (optional, default `"GET"`)
-   `headers` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Optional request headers. (optional, default `null`)
-   `raw` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Indicates if the response
      should be treated as HTML or not. (optional, default `false`)

### concatenate

Concatenates two collections and returns the result.

#### Parameters

-   `first` **([Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[HTMLElement](https://developer.mozilla.org/docs/Web/HTML/Element)> | HTMLCollection)** The first collection.
-   `second` **([Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[HTMLElement](https://developer.mozilla.org/docs/Web/HTML/Element)> | HTMLCollection)** The second collection.

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[HTMLElement](https://developer.mozilla.org/docs/Web/HTML/Element)>** The resulting array.

### toArray

Converts an array-like object to an Array.

#### Parameters

-   `collection` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** The collection to be converted.

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)>** The resulting array.

### forEach

Executes a function on elements of an array.
Return `true` from the `callback` to stop the loop.

#### Parameters

-   `array` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)>** The array to be iterated.
-   `callback` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** The callback function.

### isOnWebsite

Checks if current location is on given host.

#### Parameters

-   `hostName` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The hostname to test against.

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Indicates if the location is on host.

### isOnPath

Checks if current location is on given path.

#### Parameters

-   `path` **([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) \| [RegExp](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp))** The path to test against or a regular expression to test it.
-   `exact` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Pass `true` to match the exact path. (optional, default `false`)

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Indicates if the location is on path.

### isOnIframe

Checks if running from an iframe.

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Indicates if the script is running from an iframe.
