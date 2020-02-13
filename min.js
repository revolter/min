/**
 * Collection of functions used for DOM manipulations in Userscripts.
 * @type {Object}
 */
// eslint-disable-next-line no-redeclare, no-unused-vars
const min = (function _min () {
    "use strict";

    return {
        /**
         * Constant used for items not found in search operations.
         * @constant
         * @static
         * @type {number}
         */
        "NOT_FOUND": -1,

        /**
         * Constant used for empty lists.
         * @constant
         * @static
         * @type {number}
         */
        "EMPTY": 0,

        /**
         * Constant used for accessing the first item in a list.
         * @constant
         * @static
         * @type {number}
         */
        "FIRST": 0,

        /**
         * Collection of DOM manipulation functions.
         * @type {Object}
         */
        "dom": {
            /**
             * Constant used for nodes getter methods to return all the matching nodes.
             * @constant
             * @static
             * @type {number}
             */
            "ALL": -1,

            /**
             * Constant used for nodes getter methods to return the first matching node.
             * @constant
             * @static
             * @type {number}
             */
            "FIRST": 0,

            /**
             * Returns the node by the given id.
             * @param {number} id - The id of the node.
             * @returns {HTMLElement} The node with the given id.
             */
            "getById": function (id) {
                return document.getElementById(id);
            },

            /**
             * Returns the node or the nodes by the given class name.
             * @param {string} className - The class name of the node.
             * @param {number} [index=min.dom.FIRST] - Optional position of the node in the array of those found (defaults to the first one).
             * @param {HTMLElement} [scope=document] - Optional root node in which to search.
             * @param {Window} [rootWindow=window] - Optional root window of the scope.
             * @returns {HTMLElement|HTMLCollection|null} The node or the array of nodes with the given class name or null if scope is not an HTMLElement.
             */
            // eslint-disable-next-line max-params
            "getByClassName": function (className, index, scope, rootWindow) {
                if (typeof scope === "undefined" || scope instanceof (rootWindow || window).HTMLElement) {
                    const nodes = (scope || document).getElementsByClassName(className);

                    return index === this.ALL ? nodes : nodes[index || this.FIRST];
                }

                return null;
            },

            /**
             * Returns the node or the nodes by the given tag name.
             * @param {string} tagName - The tag name of the node.
             * @param {number} [index=min.dom.FIRST] - Optional position of the node in the array of those found (defaults to the first one).
             * @param {HTMLElement} [scope=document] - Optional root node in which to search.
             * @param {Window} [rootWindow=window] - Optional root window of the scope.
             * @returns {HTMLElement|HTMLCollection|null} The node or the array of nodes with the given tag name or null if scope is not an HTMLElement.
             */
            // eslint-disable-next-line max-params
            "getByTagName": function (tagName, index, scope, rootWindow) {
                if (typeof scope === "undefined" || scope instanceof (rootWindow || window).HTMLElement) {
                    const nodes = (scope || document).getElementsByTagName(tagName);

                    return index === this.ALL ? nodes : nodes[index || this.FIRST];
                }

                return null;
            },

            /**
             * Returns the node or the nodes by the given css query.
             * @param {string} query - The query string for searching the node.
             * @param {number} [index=min.dom.FIRST] - Optional position of the node in the array of those found (defaults to the first one).
             * @param {HTMLElement} [scope=document] - Optional root node in which to search.
             * @param {Window} [rootWindow=window] - Optional root window of the scope.
             * @returns {HTMLElement|HTMLElement[]|null} The node or the array of nodes with the given css query or null if scope is not an HTMLElement.
             */
            // eslint-disable-next-line max-params
            "getByQuery": function (query, index, scope, rootWindow) {
                if (typeof scope === "undefined" || scope instanceof (rootWindow || window).HTMLElement) {
                    const
                        // eslint-disable-next-line no-extra-parens
                        single = (typeof index === "undefined" || index === this.FIRST),
                        nodes = (scope || document)[single ? "querySelector" : "querySelectorAll"](query);

                    return index === this.ALL || single ? nodes : nodes[index];
                }

                return null;
            },

            /**
             * Returns the node or the nodes by the given xPath location.
             * @param {string} xPath - The xPath location the node.
             * @param {number} [index=min.dom.FIRST] - Optional position of the node in the array of those found (defaults to the first one).
             * @param {HTMLElement} [scope=document] - Optional root node in which to search.
             * @param {Window} [rootWindow=window] - Optional root window of the scope.
             * @returns {HTMLElement|HTMLElement[]|null} The node or the array of nodes with the given xPath location or null if scope is not an HTMLElement.
             */
            // eslint-disable-next-line max-params
            "getByXPath": function (xPath, index, scope, rootWindow) {
                if (typeof scope === "undefined" || scope instanceof (rootWindow || window).HTMLElement) {
                    let computedXPath = xPath;

                    scope && scope instanceof HTMLElement && (computedXPath = `.${xPath}`);

                    const
                        nodes = document.evaluate(computedXPath, scope || document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null),
                        toArray = function (xPathResult) {
                            const array = [];

                            // eslint-disable-next-line no-magic-numbers
                            for (let itemIndex = 0; itemIndex < xPathResult.snapshotLength; itemIndex++) {
                                array.push(xPathResult.snapshotItem(itemIndex));
                            }

                            return array;
                        };

                    return index === this.ALL ? toArray(nodes) : nodes.snapshotItem(index || this.FIRST);
                }

                return null;
            },

            /**
             * Returns the node or the nodes by the given attribute name and value.
             * @param {string} propertyName - The attribute name of the node.
             * @param {string} value - The value of the attribute.
             * @returns {HTMLElement} The node with the given attribute name and value.
             */
            "getByMeta": function (propertyName, value) {
                return this.getByXPath(`//head/meta[@${propertyName} = '${value}']`);
            },

            /**
             * Creates an HTMLElement node.
             * @param {string} tagName - The tag name of the node.
             * @param {Object} [attributes=null] - Optional attributes for the node.
             * @returns {HTMLElement} The requested node.
             */
            "create": function (tagName, attributes) {
                const node = document.createElement(tagName);
                let style = "";

                if (attributes) {
                    for (const attributeName in attributes) {
                        if (!Object.prototype.hasOwnProperty.call(attributes, attributeName)) {
                            continue;
                        }

                        const attributeValue = attributes[attributeName];

                        if (typeof attributeValue === "string") {
                            node.setAttribute(attributeName, attributeValue);
                        } else {
                            for (const property in attributeValue) {
                                // eslint-disable-next-line max-depth
                                if (!Object.prototype.hasOwnProperty.call(attributeValue, property)) {
                                    continue;
                                }

                                style += `${property}: ${attributeValue[property]} !important;`;
                            }

                            node.setAttribute(attributeName, style);
                        }
                    }
                }

                return node;
            },

            /**
             * Adds a css style to a node.
             * @param {HTMLElement} node - The node for which to add the style.
             * @param {Object} style - An object with css property and value pairs.
             */
            "style": function (node, style) {
                let cssText = "";

                for (const property in style) {
                    if (!Object.prototype.hasOwnProperty.call(style, property)) {
                        continue;
                    }

                    const value = style[property];

                    cssText += `${property}: ${value} !important; `;
                }

                // eslint-disable-next-line no-param-reassign
                node.style.cssText += cssText.trim();
            },

            /**
             * Removes a node.
             * @param {HTMLElement} node - The node to be removed.
             */
            "removeNode": function (node) {
                node && node.parentNode && node.parentNode.removeChild(node);
            },

            /**
             * Removes a list of nodes.
             * @param {Function|HTMLElement[]} getterOrNodes - Getter function for the node or a list of nodes to be removed.
             * @param {string|string[]|HTMLElement} [paramOrParams] - Parameter or parameters needed for the getter. Optional if a list of nodes is passed for `getterOrNodes`.
             */
            "removeNodes": function (getterOrNodes, paramOrParams, ...args) {
                let nodes;

                if (getterOrNodes instanceof Function) {
                    let params = paramOrParams instanceof Array ? paramOrParams : [paramOrParams];

                    params = params.map((param) => getterOrNodes.call(min.dom, param));

                    nodes = [];

                    min.forEach(params, (param) => {
                        if (param.length) {
                            min.forEach(param, (node) => {
                                nodes.push(node);
                            });
                        } else {
                            nodes.push(param);
                        }
                    });
                } else {
                    nodes = args;
                }

                min.forEach(nodes, min.dom.removeNode);
            },

            /**
             * Inserts a node before another existing one.
             * @param {HTMLElement} node - The node to be inserted.
             * @param {HTMLElement} reference - The node before which the specified node will be inserted.
             */
            "insertBefore": function (node, reference) {
                reference.parentNode && reference.parentNode.insertBefore(node, reference);
            },

            /**
             * Inserts a node after another existing one.
             * @param {HTMLElement} node - The node to be inserted.
             * @param {HTMLElement} reference - The node after which the specified node will be inserted.
             */
            "insertAfter": function (node, reference) {
                reference.parentNode && reference.nextSibling && reference.parentNode.insertBefore(node, reference.nextSibling);
            },

            /**
             * Creates an observer with a given callback.
             * @param {Function} callback - The callback function.
             * @param {HTMLElement} [root=document.body] - Optional root node on which to observe mutations.
             * @param {Object} [options={childList: true, subtree: true}] - Optional parameters to pass to the observer.
             */
            "addObserver": function (callback, root, options) {
                new MutationObserver(callback).observe(root || document.body, options || {
                    "childList": true,
                    "subtree": true
                });
            },

            /**
             * Registers a function to be called when a node is first inserted in the DOM.
             * @param {Function} getter - Getter function for the node.
             * @param {string|string[]} paramOrParams - Parameter or parameters needed for the getter.
             * @param {Function} callback - The callback function.
             * @param {boolean} [disconnect=true] - Set to false to prevent the observer to disconnect after the node is found.
             */
            // eslint-disable-next-line max-params
            "onNodeExists": function (getter, paramOrParams, callback, disconnect) {
                const
                    params = paramOrParams instanceof Array ? paramOrParams : [paramOrParams],
                    shouldDisconnect = typeof disconnect === "undefined" ? true : disconnect;

                if (getter.apply(min.dom, params)) {
                    // eslint-disable-next-line callback-return
                    callback(getter.apply(min.dom, params));
                } else {
                    this.addObserver((_, observer) => {
                        if (getter.apply(min.dom, params)) {
                            if (shouldDisconnect) {
                                observer.disconnect();
                            }

                            // eslint-disable-next-line callback-return
                            callback(getter.apply(min.dom, params));
                        }
                    });
                }
            },

            /**
             * Registers a function to be called when some nodes are first inserted in the DOM.
             *
             * The `args` must contains these keys:
             * - `{Function}` _getter_
             * - `{string[]}` _params_
             *
             * or
             *
             * - `{string[][]}` _rules_
             * @param {Object} args - Object containing the rules for retrieving the nodes.
             * @param {Function} callback - The callback function.
             */
            "onNodesExist": function (args, callback) {
                // eslint-disable-next-line no-magic-numbers
                let count = 0;

                const
                    nodes = {},
                    waitForNode = function (getter, param, paramsCount) {
                        min.dom.onNodeExists(getter, param, (node) => {
                            nodes[param] = node;

                            // eslint-disable-next-line no-magic-numbers
                            count += 1;

                            if (count === paramsCount) {
                                // eslint-disable-next-line callback-return
                                callback(nodes);
                            }
                        });
                    };

                if (args.getter) {
                    const {
                            getter,
                            params
                        } = args,
                        paramsCount = params.length;

                    min.forEach(params, (param) => {
                        waitForNode(getter, param, paramsCount);
                    });
                } else {
                    const {
                            rules
                        } = args,
                        paramsCount = rules.length;

                    min.forEach(rules, (rule) => {
                        const [getter, param] = rule;

                        waitForNode(getter, param, paramsCount);
                    });
                }
            },

            /**
             * Registers a function to be called when nodes are inserted in the DOM.
             * @param {Function} callback - The callback function.
             * @param {HTMLElement} [root=document.body] - Optional root node on which to observe mutations.
             */
            "onNodeInserted": function (callback, root) {
                this.addObserver((mutations) => {
                    min.forEach(mutations, (mutation) => {
                        min.forEach(mutation.addedNodes, callback);
                    });
                }, root);
            }
        },

        /**
         * Collection of GreaseMonkey specific functions.
         * @returns {Object} The collection of functions.
         */
        "gm": (function gm () {
            const
                /**
                 * Prints error message to the console about missing @grant.
                 * @param {string} grantName - The name of the grant.
                 * @returns {Object} It always returns `null`.
                 * @private
                 */
                error = function (grantName) {
                    // eslint-disable-next-line no-console
                    console.error(`Forgot to @grant ${grantName}!`);

                    return null;
                };

            return {
                /**
                 * Retrieves a stored entry value.
                 * @param {string} entryName - The name of the entry.
                 * @returns {string} The entry's value or empty string.
                 */
                "get": function (entryName) {
                    // eslint-disable-next-line camelcase, new-cap
                    return JSON.parse(typeof GM_getValue === "undefined" ? error("GM_getValue") : GM_getValue(entryName, "{}"));
                },

                /**
                 * Stores an entry.
                 * @param {string} entryName - The name of the entry.
                 * @param {string} value - The value of the entry.
                 */
                "set": function (entryName, value) {
                    // eslint-disable-next-line camelcase, new-cap
                    typeof GM_setValue === "undefined" ? error("GM_setValue") : GM_setValue(entryName, JSON.stringify(value));
                },

                /**
                 * Appends an item to the stored entry's value.
                 * @param {string} entryName - The name of the entry.
                 * @param {string} item - The item to be appended.
                 */
                "add": function (entryName, item) {
                    const entry = this.get(entryName);

                    if (entry.content) {
                        entry.content.push(item);
                    } else {
                        entry[item.key] = item.value;
                    }

                    this.set(entryName, entry);
                },

                /**
                 * Removes an item from the stored entry's value.
                 * @param {string} entryName - The name of the entry.
                 * @param {string} item - The item to be removed.
                 */
                "remove": function (entryName, item) {
                    const entry = this.get(entryName);

                    if (entry.content) {
                        const index = entry.content.indexOf(item);

                        // eslint-disable-next-line no-magic-numbers
                        index !== min.NOT_FOUND && entry.content.splice(index, 1);
                    } else {
                        delete entry[item];
                    }

                    this.set(entryName, entry);
                },

                /**
                 * Removes all the items from the stored entry's value.
                 * @param {string} entryName - The name of the entry.
                 */
                "clear": function (entryName) {
                    let entry = this.get(entryName);

                    if (entry.content) {
                        entry = {
                            "content": []
                        };
                    } else {
                        entry = {};
                    }

                    this.set(entryName, entry);
                },

                /**
                 * Checks if the stored entry's value contains an item.
                 * @param {string} entryName - The name of the entry.
                 * @param {string} item - The item to be searched.
                 * @returns {boolean} Indicates if the item exists.
                 */
                "contains": function (entryName, item) {
                    const entry = this.get(entryName);

                    if (entry.content) {
                        return entry.content.indexOf(item) !== min.NOT_FOUND;
                    }

                    let found = false;

                    // eslint-disable-next-line consistent-return
                    min.forEach(Object.keys(entry), (key) => {
                        if (entry[key] === item) {
                            found = true;

                            return true;
                        }
                    });

                    return found;
                },

                /**
                 * Reads content from a resource file.
                 * @param {string} resourceName - The resource's name.
                 * @returns {string} The content of the resource file.
                 */
                "read": function (resourceName) {
                    // eslint-disable-next-line camelcase, new-cap
                    return typeof GM_getResourceText === "undefined" ? error("GM_getResourceText") : GM_getResourceText(resourceName);
                },

                /**
                 * Adds a css style.
                 * @param {Object} styles - An object with selector and style pairs.
                 */
                "style": function (styles) {
                    let cssText = "";

                    for (const style in styles) {
                        if (!Object.prototype.hasOwnProperty.call(styles, style)) {
                            continue;
                        }

                        cssText += `${style} {`;

                        const properties = styles[style];

                        for (const property in properties) {
                            if (!Object.prototype.hasOwnProperty.call(properties, property)) {
                                continue;
                            }

                            cssText += `${property}: ${properties[property]} !important; `;
                        }

                        cssText += "} ";
                    }

                    // eslint-disable-next-line camelcase, new-cap
                    typeof GM_addStyle === "undefined" ? error("GM_addStyle") : GM_addStyle(cssText.trim());
                },

                /**
                 * Makes an XMLHttpRequest and returns the text response.
                 * @param {string} url - The url of the request.
                 * @param {Function} callback - The callback function.
                 * @param {Object} [context=null] - Optional object to be passed to the callback function.
                 * @param {string} [method="GET"] - Optional request method (defaults to "GET").
                 * @param {Object} [headers=null] - Optional request headers.
                 * @param {boolean} [raw=false] - Indicates if the response should be treated as HTML or not.
                 */
                // eslint-disable-next-line max-params
                "xhr": function (url, callback, context, method, headers = null, raw = false) {
                    // eslint-disable-next-line camelcase, new-cap
                    typeof GM_xmlhttpRequest === "undefined" ? error("GM_xmlhttpRequest") : GM_xmlhttpRequest({
                        "method": method || "GET",
                        "url": url,
                        "context": context,
                        "headers": headers,
                        "onload": function (responseDetails) {
                            if (raw) {
                                // eslint-disable-next-line callback-return
                                callback(responseDetails.responseText, responseDetails.context, responseDetails.finalUrl);
                            } else {
                                const doc = document.createElement("div");

                                doc.innerHTML = responseDetails.responseText;

                                // eslint-disable-next-line callback-return
                                callback(doc, responseDetails.context, responseDetails.finalUrl);
                            }
                        }
                    });
                }
            };
        })(),

        /**
         * Concatenates two collections and returns the result.
         * @param {HTMLElement[]|HTMLCollection} first - The first collection.
         * @param {HTMLElement[]|HTMLCollection} second - The second collection.
         * @returns {HTMLElement[]} The resulting array.
         */
        "concatenate": function (first, second) {
            let
                firstArray = first,
                secondArray = second;

            first instanceof HTMLCollection && (firstArray = this.toArray(first));
            second instanceof HTMLCollection && (secondArray = this.toArray(second));

            return firstArray.concat(secondArray);
        },

        /**
         * Converts an array-like object to an Array.
         * @param {Object} collection - The collection to be converted.
         * @returns {Object[]} The resulting array.
         */
        "toArray": function (collection) {
            return Array.prototype.slice.call(collection);
        },

        /**
         * Executes a function on elements of an array.
         * Return `true` from the `callback` to stop the loop.
         * @param {Object[]} array - The array to be iterated.
         * @param {Function} callback - The callback function.
         */
        "forEach": function (array, callback) {
            // eslint-disable-next-line no-magic-numbers
            for (let index = 0; index < array.length; index++) {
                // eslint-disable-next-line callback-return, no-shadow
                const stop = callback(array[index], index);

                if (stop === true) {
                    return;
                }
            }
        },

        /**
         * Checks if current location is on given host.
         * @param {string} hostName - The hostname to test against.
         * @returns {boolean} Indicates if the location is on host.
         */
        "isOnWebsite": function (hostName) {
            return window.self === window.top && window.location.hostname.indexOf(hostName) !== this.NOT_FOUND;
        },

        /**
         * Checks if current location is on given path.
         * @param {string|RegExp} path - The path to test against or a regular expression to test it.
         * @param {boolean} [exact=false] - Pass `true` to match the exact path.
         * @returns {boolean} Indicates if the location is on path.
         */
        "isOnPath": function (path, exact) {
            const currentPath = window.location.pathname;

            if (!this.isOnIframe()) {
                if (path instanceof RegExp) {
                    return path.test(currentPath);
                }

                return exact ? currentPath === path : currentPath.indexOf(path) !== this.NOT_FOUND;
            }

            return false;
        },

        /**
         * Checks if running from an iframe.
         * @returns {boolean} Indicates if the script is running from an iframe.
         */
        "isOnIframe": function () {
            return window.self !== window.top;
        }
    };
})();
