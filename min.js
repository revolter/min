/**
 * Collection of functions used for DOM manipulations in GreaseMonkey scripts.
 * @author	Iulian Onofrei
 * @version	10
 * @type	{Object}
 */
var min = {
	/**
	 * Collection of DOM manipulation functions.
	 * @type	{Object}
	 */
	dom: {
		/**
		 * Constant used for get methods to return all the matching nodes.
		 * @constant
		 * @static
		 * @type	{Number}
		 */
		ALL: -1,

		/**
		 * Returns the node by the given id.
		 * @param	{Number}		id	The id of the node.
		 * @return	{HTMLElement}		The node with the given id.
		 */
		getById: function(id) {
			return document.getElementById(id);
		},

		/**
		 * Returns the node or the nodes by the given class name.
		 * @param	{String}							className	The class name of the node.
		 * @param	{Number}							[index]		Optional position of the node in the array of those found (defaults to the first one).
		 * @param	{HTMLElement}						[scope]		Optional root node in which to search.
		 * @return	{HTMLElement, HTMLCollection, null}				The node or the array of nodes with the given class name or null if scope is not an HTMLElement.
		 */
		getByClassName: function(className, index, scope) {
			if(scope === undefined || scope instanceof HTMLElement) {
				var nodes = (scope || document).getElementsByClassName(className);

				return index === this.ALL ? nodes : nodes[index || 0];
			} else {
				return null;
			}
		},

		/**
		 * Returns the node or the nodes by the given tag name.
		 * @param	{String}							tagName	The tag name of the node.
		 * @param	{Number}							[index]	Optional position of the node in the array of those found (defaults to the first one).
		 * @param	{HTMLElement}						[scope]	Optional root node in which to search.
		 * @return	{HTMLElement, HTMLCollection, null}			The node or the array of nodes with the given tag name or null if scope is not an HTMLElement.
		 */
		getByTagName: function(tagName, index, scope) {
			if(scope === undefined || scope instanceof HTMLElement) {
				var nodes = (scope || document).getElementsByTagName(tagName);

				return index === this.ALL ? nodes : nodes[index || 0];
			} else {
				return null;
			}
		},

		/**
		 * Returns the node or the nodes by the given css query.
		 * @param	{String}								query	The query string for searching the node.
		 * @param	{Number}								[index]	Optional position of the node in the array of those found (defaults to the first one).
		 * @param	{HTMLElement}							[scope]	Optional root node in which to search.
		 * @return	{HTMLElement, Array[HTMLElement], null}			The node or the array of nodes with the given css query or null if scope is not an HTMLElement.
		 */
		getByQuery: function(query, index, scope) {
			if(scope === undefined || scope instanceof HTMLElement) {
				var
					single = (index === undefined || index === 0),
					nodes = (scope || document)[single ? "querySelector" : "querySelectorAll"](query);

				return index === this.ALL || single ? nodes : nodes[index];
			} else {
				return null;
			}
		},

		/**
		 * Returns the node or the nodes by the given xPath location.
		 * @param	{String}								xPath	The xPath location the node.
		 * @param	{Number}								[index]	Optional position of the node in the array of those found (defaults to the first one).
		 * @param	{HTMLElement}							[scope]	Optional root node in which to search.
		 * @return	{HTMLElement, Array[HTMLElement], null}			The node or the array of nodes with the given xPath location or null if scope is not an HTMLElement.
		 */
		getByXPath: function(xPath, index, scope) {
			if(scope === undefined || scope instanceof HTMLElement) {
				scope && scope instanceof HTMLElement && (xPath = "." + xPath);

				var
					nodes = document.evaluate(xPath, scope || document, null, 7, null),
					toArray = function(xPathResult) {
						var i, length = xPathResult.snapshotLength, array = [];

						for(i = 0; i < length; i++) {
							array.push(xPathResult.snapshotItem(i));
						}

						return array;
					};

				return index === this.ALL ? toArray(nodes) : nodes.snapshotItem(index || 0);
			} else {
				return null;
			}
		},

		/**
		 * Returns the node or the nodes by the given attribute name and value.
		 * @param	{String}		propertyName	The attribute name of the node.
		 * @param	{String}		value			The value of the attribute.
		 * @return	{HTMLElement}					The node with the given attribute name and value.
		 */
		getByMeta: function(propertyName, value) {
			return this.getByXPath("//head/meta[@" + propertyName + " = '" + value + "']");
		},

		/**
		 * Creates an HTMLElement node.
		 * @param	{String}		tagName			The tag name of the node.
		 * @param	{Object}		[attributes]	Optional attributes for the node.
		 * @return	{HTMLElement}					The requested node.
		 */
		create: function(tagName, attributes) {
			var attributeName, attributeValue, property, style = "", node = document.createElement(tagName);

			if(attributes) {
				for(attributeName in attributes) {
					attributeValue = attributes[attributeName];

					if(typeof attributeValue === "string") {
						node.setAttribute(attributeName, attributeValue);
					} else {
						for(property in attributeValue) {
							style += property + ": " + attributeValue[property] + " !important;";
						}

						node.setAttribute(attributeName, style);
					}
				}
			}

			return node;
		},

		/**
		 * Adds a css style to a node.
		 * @param	{HTMLElement}			node	The node for which to add the style.
		 * @param	{Object, Array[Object]}	styles	An object or an array of objects with css property and value pairs.
		 */
		style: function(node, styles) {
			var
				cssText = "",
				styles = styles instanceof Array ? styles : [styles];

			min.forEach(styles, function(style) {
				var
					property = Object.keys(style)[0],
					value = style[property];

				cssText += property + ": " + value + " !important;";
			});

			node.style.cssText += cssText;
		},

		/**
		 * Removes a node.
		 * @param	{HTMLElement}	node	The node to be removed.
		 */
		removeNode: function(node) {
			node && node.parentNode && node.parentNode.removeChild(node);
		},

		/**
		 * Removes a list of nodes.
		 * @param	{Function}								getter	Getter function for the node.
		 * @param	{String, Array[String], HTMLElement}	params	Parameter or parameters needed for the getter.
		 * 				or
		 * @param	{HTMLElement}							...		The list of nodes to be removed.
		 */
		removeNodes: function(getter, params) {
			var nodes;

			if(getter instanceof Function) {
				params = params instanceof Array ? params : [params];

				params = params.map(function(param) {
					return getter.call(min.dom, param);
				});

				nodes = [];

				min.forEach(params, function(param) {
					if(param.length) {
						min.forEach(param, function(node) {
							nodes.push(node);
						});
					} else {
						nodes.push(param);
					}
				});
			} else {
				nodes = arguments;
			}

			min.forEach(nodes, min.dom.removeNode);
		},

		/**
		 * Inserts a node before another existing one.
		 * @param	{HTMLElement}	element		The node to be inserted.
		 * @param	{HTMLElement}	reference	The node before which element will be inserted.
		 */
		insertBefore: function(node, reference) {
			reference.parentNode && reference.parentNode.insertBefore(node, reference);
		},

		/**
		 * Adds a MutationObserver with a given callback.
		 * @param	{Function}		callback	The callback function.
		 * @param	{HTMLElement}	[root]		Optional root node on which to observe mutations.
		 * @param	{Object}		[options]	Optional parameters to pass to the observer.
		 */
		addObserver: function(callback, root, options) {
			new MutationObserver(callback).observe(root || document.body, options || { childList: true, subtree: true });
		},

		/**
		 * Registers a function to be called when a node is first inserted in the DOM.
		 * @param	{Function}				getter		Getter function for the node.
		 * @param	{String, Array[String]}	params		Parameter or parameters needed for the getter.
		 * @param	{Function}				callback	The callback function.
		 */
		onNodeExists: function(getter, params, callback) {
			params = params instanceof Array ? params : [params];

			if(getter.apply(min.dom, params)) {
				callback(getter.apply(min.dom, params));
			} else {
				this.addObserver(function() {
					if(getter.apply(min.dom, params)) {
						this.disconnect();

						callback(getter.apply(min.dom, params));
					}
				});
			}
		},

		/**
		 * Registers a function to be called when some nodes are first inserted in the DOM.
		 * @param	{Object}	args		Object containing the rules for retrieving the nodes, containing the keys:
		 * 										- {Function} getter, {Array[String]} rules
		 * 										- {Array[Array[String]]} rules
		 * @param	{Function}	callback	The callback function.
		 */
		onNodesExist: function(args, callback) {
			var
				getter, params, length,
				count = 0, nodes = {},
				waitForNode = function(getter, param, length) {
					min.dom.onNodeExists(getter, param, function(node) {
						nodes[param] = node;

						if(++count === length) {
							callback(nodes);
						}
					});
				};

			if(args.getter) {
				getter = args.getter;
				params = args.params;
				length = params.length;

				min.forEach(params, function(param) {
					waitForNode(getter, param, length);
				});
			} else {
				var param, rules = args.rules, length = rules.length;

				min.forEach(rules, function(rule) {
					getter = rule[0];
					param = rule[1];

					waitForNode(getter, param, length);
				});
			}
		},

		/**
		 * Registers a function to be called when nodes are inserted in the DOM.
		 * @param	{Function}		callback	The callback function.
		 * @param	{HTMLElement}	[root]		Optional root node on which to observe mutations.
		 */
		onNodeInserted: function(callback, root) {
			this.addObserver(function(mutations) {
				min.forEach(mutations, function(mutation) {
					min.forEach(mutation.addedNodes, callback);
				});
			}, root);
		}
	},

	/**
	 * Collection of GreaseMonkey specific functions.
	 * @return	{Object}	The collection of functions.
	 */
	gm: (function() {
		var
			/**
			 * Prints error message to the console about missing @grant.
			 * @param	{String}	name	The name of the grant.
			 * @return	{Object}
			 */
			error = function(name) {
				console.error("Forgot to @grant " + name +"!");

				return null;
			},

			/**
			 * Compiles a selector and pairs of css properties and values into a css text string.
			 * @param	{String}	selector	The css selector.
			 * @param	{Object}	style		The pairs of css properties and values.
			 * @return	{String}				The compiled css text.
			 */
			compileStyle = function(selector, style) {
				var property, cssText = "";

				for(property in style) {
					cssText += property + ": " + style[property] + " !important;";
				}

				return selector + " { " + cssText + " } ";
			};

		return {
			/**
			 * Retrieves a stored entry value.
			 * @param	{String}	name	The name of the entry.
			 * @return	{String}			The entry's value or empty string.
			 */
			get: function(name) {
				return JSON.parse(typeof GM_getValue === "undefined" ? error("GM_getValue") : GM_getValue(name, "{}"));
			},

			/**
			 * Stores an entry.
			 * @param	{String}	name	The name of the entry.
			 * @param	{String}	value	The value of the entry.
			 */
			set: function(name, value) {
				typeof GM_setValue === "undefined" ? error("GM_setValue") : GM_setValue(name, JSON.stringify(value));
			},

			/**
			 * Appends an item to the stored entry's value.
			 * @param	{String}	name	The name of the entry.
			 * @param	{String}	value	The item to be appended.
			 */
			add: function(name, value) {
				var entry = this.get(name);

				if(entry.content) {
					entry.content.push(value);
				} else {
					entry[value.key] = value.value;
				}

				this.set(name, entry);
			},

			/**
			 * Removes an item from the stored entry's value.
			 * @param	{String}	name	The name of the entry.
			 * @param	{String}	value	The item to be removed.
			 */
			remove: function(name, value) {
				var entry = this.get(name);

				if(entry.content) {
					var index = entry.content.indexOf(value);

					index !== -1 && entry.content.splice(index, 1);
				} else {
					delete entry[value];
				}

				this.set(name, entry);
			},

			/*
			 * Removes all the items from the stored entry's value.
			 * @param	{String}	name	The name of the entry.
			 */
			clear: function(name) {
				var entry = this.get(name);

				if(entry.content) {
					entry = {
						"content": []
					};
				} else {
					entry = {};
				}

				this.set(name, entry);
			},

			/**
			 * Checks if the stored entry's value contains an item.
			 * @param	{String}	name	The name of the entry.
			 * @param	{String}	value	The item to be searched.
			 * @return	{Boolean}			Indicates if the item exists.
			 */
			contains: function(name, value) {
				var entry = this.get(name);

				if(entry.content) {
					return entry.content.indexOf(value) !== -1;
				} else {
					min.forEach(Object.keys(entry), function(key) {
						if(entry[key] === value) {
							return true;
						}
					});

					return false;
				}
			},

			/**
			 * Reads content from a resource file.
			 * @param	{String}	name	The resource name.
			 * @return	{String}			The content of the resource file.
			 */
			read: function(name) {
				return typeof GM_getResourceText === "undefined" ? error("GM_getResourceText") : GM_getResourceText(name);
			},

			/**
			 * Adds a css style.
			 * @param	{Object, Array[Object]}	styles	An object or an array of objects with selector and style pairs.
			 */
			style: function(styles) {
				var selector, cssText = "", styles = styles instanceof Array ? styles : [styles];

				min.forEach(styles, function(style) {
					selector = Object.keys(style)[0];

					cssText += compileStyle(selector, style[selector]);
				});

				typeof GM_addStyle === "undefined" ? error("GM_addStyle") : GM_addStyle(cssText);
			},

			/**
			 * Makes an XMLHttpRequest and returns the text response.
			 * @param	{String}	url			The url of the request.
			 * @param	{Function}	callback	The callback function.
			 * @param	{Object}	[context]	Optional object to be passed to the callback function.
			 * @param	{String}	[method]	Optional request method (defaults to "GET").
			 */
			xhr: function(url, callback, context, method) {
				typeof GM_xmlhttpRequest === "undefined" ? error("GM_xmlhttpRequest") : GM_xmlhttpRequest({
						method: method || "GET",
						url: url,
						context: context,
						onload: function(responseDetails) {

// var responseXML = null;
// // Inject responseXML into existing Object (only appropriate for XML content).
// if (!response.responseXML) {
// responseXML = new DOMParser().parseFromString(response.responseText, "text/xml");
// }
								var doc = document.createElement("div");

								doc.innerHTML = responseDetails.responseText;

								callback(doc, responseDetails.context, responseDetails.finalUrl);
							}
					});
			}
		};
	})(),

	/**
	 * Concatenates two collections and returns the result.
	 * @param	{Array[HTMLElement], HTMLCollection}	first	The first collection.
	 * @param	{Array[HTMLElement], HTMLCollection}	second	The second collection.
	 * @return	{Array[HTMLElement]}							The resulting array.
	 */
	concatenate: function(first, second) {
		first instanceof HTMLCollection && (first = this.toArray(first));
		second instanceof HTMLCollection && (second = this.toArray(second));

		return first.concat(second);
	},

	/**
	 * Converts an array-like object to an Array.
	 * @param	{Object}		collection	The collection to be converted.
	 * @return	{Array[Object]}				The resulting array.
	 */
	toArray: function(collection) {
		return Array.prototype.slice.call(collection);
	},

	/**
	 * Executes a function on elements of an array.
	 * @param	{Array[Object]}	array		The array to be iterated.
	 * @param	{Function}		callback	The callback function.
	 */
	forEach: function(array, callback) {
		var i, length = array.length;

		for(i = 0; i < length; i++) {
			callback(array[i], i);
		}
	},

	/**
	 * Checks if current location is on given host.
	 * @param	{String}	hostName	The hostname to test against.
	 * @return	{Boolean}				Indicates if the location is on host.
	 */
	isOnWebsite: function(hostName) {
		return window.self === window.top && window.location.hostname.indexOf(hostName) !== -1;
	},

	/**
	 * Checks if current location is on given path.
	 * @param	{String, RegExp}	path	The path to test against or a regular expression to test it.
	 * @param	{Boolean}			exact	Pass true to match the exact path.
	 * @return	{Boolean}					Indicates if the location is on host.
	 */
	isOnPath: function(path, exact) {
		var currentPath = window.location.pathname;

		if(!this.isOnIframe()) {
			return path instanceof RegExp ? path.test(currentPath) : (exact ? currentPath === path : currentPath.indexOf(path) !== -1);
		} else {
			return false;
		}
	},

	/**
	 * Checks if running from an iframe.
	 * @return	{Boolean}	Indicates if the script is running from an iframe.
	 */
	isOnIframe: function() {
		return !(window.self === window.top);
	}
};
