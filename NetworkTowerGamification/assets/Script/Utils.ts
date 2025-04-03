import { Constant } from "./Common/Constant";

export default class Utils {
	public static loadRes<T>(url: string, type: any | null, cb?: LoadCompleteCallback<T>) {
		if (type) {
			cc.loader.loadRes(url, type, (err, res) => {
				if (err) {
					cc.error(err.message || err);
					if (cb) {
						cb(err, res);
					}

					return;
				}

				if (cb) {
					cb(err, res);
				}
			});
		} else {
			cc.loader.load(url, (err, res) => {
				if (err) {
					cc.error(err.message || err);
					if (cb) {
						cb(err, res as T);
					}

					return;
				}

				if (cb) {
					cb(err, res as T);
				}
			});
		}
	}
	public static preLoadRes<T>(url: string, type: any | null, cb?: LoadCompleteCallback<T>) {

		cc.resources.preload(url, type, (err, res) => {
			if (err) {
				cc.error(err.message || err);
				if (cb) {
					cb(err, res as T);
				}

				return;
			}

			if (cb) {
				cb(err, res as T);
			}
		});

	}
	static getHttp(url, pars, callback, accessToken = null) {
		var http = new XMLHttpRequest();
		let parStr = "";

		if (pars && Array.isArray(pars) && pars.length > 0) {
			for (let i = 0; i < pars.length; i++) {
				if (i == 0) {
					parStr = parStr + "?" + pars[i][0] + "=" + pars[i][1];
				} else {
					parStr = parStr + "&" + pars[i][0] + "=" + pars[i][1];
				}
			}
		} else if (typeof pars == "object") {
			parStr = parStr + "?";
			for (let v in pars) {
				parStr += v + "=" + pars[v] + "&";
			}
			parStr = parStr.substr(0, parStr.length - 1);
		}

		let urlNew = url + parStr;

		// add invalidation trick
		// if (urlNew.includes("?")) {
		// 	urlNew += "&dummy=" + Date.now().toString();
		// } else {
		// 	urlNew += "?dummy=" + Date.now().toString();
		// }

		http.open("GET", urlNew, true);
		http.onloadend = () => {
			// var result = JSON.parse(http.responseText);
			if (http.readyState == 4 && http.status == 200) {
				callback(null, http.responseText);
			} else if (http.readyState == 4) {
				callback(http.responseText, null);
			}
		};
		http.onerror = (err) => {
			callback(err, null);
		};
		http.ontimeout = (err) => {
			callback(err, null);
		};

		if (accessToken) {
			http.setRequestHeader("Authorization", "Bearer " + accessToken);
		}

		http.send();
	}

	static parseFunctionCallString(inputStr) {
		var returnArray = [];

		//var funNameNatchStr = /((.*)\s*\(/;
		var funNameNatchStr = /([a-zA-Z_$][-a-zA-Z_$0-9]*).*/;
		var res = funNameNatchStr.exec(inputStr);
		if (!res) {
			return [];
		}

		var funName = res[1].trim(); // this is our function name

		returnArray[0] = funName;

		// pull out the args and stick them in array 'args' --------------
		var argsMatchStr = /.*\((.*)\)/;
		res = argsMatchStr.exec(inputStr);
		var argstr = "";
		if (res) {
			argstr = res[1].trim();
			var argarray = argstr.split(",");
			argarray.forEach(function (part, index, array) {
				var a = part.trim();
				if (a.length > 0) {
					returnArray.push(a);
				}
			});
		}
		return returnArray;
	}
	static postHttp(
		url,
		pars,
		callback,
		contentType = "application/json",
		accessToken = null
	) {
		var http = new XMLHttpRequest();
		http.open("POST", url, true);
		http.setRequestHeader("Content-type", contentType);

		http.onloadend = () => {
			if (http.readyState == 4 && http.status >= 200 && http.status < 300) {
				callback(null, http.response);
			} else if (http.readyState == 4) {
				callback(http.response, null);
			}
		};

		http.onerror = (err) => {
			callback(err, null);
		};

		http.ontimeout = (err) => {
			callback(err, null);
		};

		if (accessToken) {
			http.setRequestHeader("Authorization", "Bearer " + accessToken);
		}

		http.send(pars);
	}

	static addQuery(inputStr: string, queryStr: string): string {
		if (inputStr.indexOf("?") >= 0) {
			return inputStr + "&" + queryStr;
		}
		return inputStr + "?" + queryStr;
	}
	static showPopup(
		node,
		scaleSt = null,
		scaleFn = null,
		deltaScale = null,
		deltaTime = null
	) {
		let scaleFinal = scaleFn || 1;
		let scaleStart = scaleSt || 0;
		let scale = deltaScale || 0.015;
		let time = deltaTime || 0.08;
		cc.tween(node)
			.to(time, { scale: scaleFinal + scale })
			.to(time, { scale: scaleFinal - scale })
			.to(time, { scale: scaleFinal })
			.start();
		node.scale = scaleFinal;
	}
	static numberRaiseAll(label, newGold, ext = null, ext2 = null) {
		if (ext == null) ext = "";
		if (ext2 == null) ext2 = "";
		let str = label.string;
		for (let i = 0; i < str.length; i++) {
			str = str.replace(".", "");
		}
		str = str.replace(ext, "");
		str = str.replace(ext2, "");
		let oldGold = parseInt(str);
		if (newGold == oldGold) return;
		newGold = Math.round(newGold);
		let add_commas = function (number) {
			if (number)
				return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
			else return "0";
		};
		if (typeof oldGold != "number" || isNaN(oldGold)) oldGold = 0;
		let curGold = oldGold;
		let tem = (newGold - oldGold) / 10;
		label.node.stopAllActions;

		let seq = cc.sequence(
			cc.delayTime(0.06),
			cc.callFunc(() => {
				curGold += tem;
				label.string = ext2 + add_commas(Math.round(curGold)) + ext;
				if (
					(curGold >= newGold && newGold > oldGold) ||
					(curGold <= newGold && newGold < oldGold)
				) {
					label.string = ext2 + add_commas(newGold) + ext;
				}
			})
		);
		label.node.runAction(
			cc.sequence(cc.scaleTo(0.1, 1.2), cc.repeat(seq, 11), cc.scaleTo(0.1, 1))
		);
	}
	static changeParent(node, newParent) {
		if (node.parent == newParent) return;
		var getWorldRotation = function (node) {
			var currNode = node;
			var resultRot = currNode.angle;
			do {
				currNode = currNode.parent;
				resultRot += currNode.angle;
			} while (currNode.parent != null);
			resultRot = resultRot % 360;
			return resultRot;
		};

		var oldWorRot = getWorldRotation(node);
		var newParentWorRot = getWorldRotation(newParent);
		var newLocRot = oldWorRot - newParentWorRot;

		var oldWorPos = node.convertToWorldSpaceAR(cc.v2(0, 0));
		var newLocPos = newParent.convertToNodeSpaceAR(oldWorPos);

		node.parent = newParent;
		node.position = newLocPos;
		node.angle = newLocRot;
	}
	static clearChild(node) {
		node.removeAllChildren();
	}
	static randomArr(arr) {
		return arr[Math.floor(Math.random() * arr.length)];
	}
	static randomFromTo(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
	static shuffleArr(a) {
		for (let i = a.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[a[i], a[j]] = [a[j], a[i]];
		}
		return a;
	}
	static differenceOf2Arrays(array1, array2) {
		var temp = [];
		array1 = array1.toString().split(",").map(Number);
		array2 = array2.toString().split(",").map(Number);

		for (var i in array1) {
			if (array2.indexOf(array1[i]) === -1) temp.push(array1[i]);
		}
		for (i in array2) {
			if (array1.indexOf(array2[i]) === -1) temp.push(array2[i]);
		}
		return temp.sort((a, b) => a - b);
	}
	static intersect_arrays(a, b) {
		var sorted_a = a.concat().sort();
		var sorted_b = b.concat().sort();
		var common = [];
		var a_i = 0;
		var b_i = 0;

		while (a_i < a.length && b_i < b.length) {
			if (sorted_a[a_i] === sorted_b[b_i]) {
				common.push(sorted_a[a_i]);
				a_i++;
				b_i++;
			} else if (sorted_a[a_i] < sorted_b[b_i]) {
				a_i++;
			} else {
				b_i++;
			}
		}
		return common;
	}
	static union_arrays(x, y) {
		var obj = {};
		for (var i = x.length - 1; i >= 0; --i) obj[x[i]] = x[i];
		for (var i = y.length - 1; i >= 0; --i) obj[y[i]] = y[i];
		var res = [];
		for (var k in obj) {
			if (obj.hasOwnProperty(k))
				// <-- optional
				res.push(obj[k]);
		}
		return res;
	}
	static sumArr(arr) {
		let total = 0;
		arr.forEach((element) => {
			total += element;
		});
		return total;
	}
	static getUrlParameter(name) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
		var results = regex.exec(location.search);
		return results === null
			? ""
			: decodeURIComponent(results[1].replace(/\+/g, " "));
	}

	static randomProperty(obj) {
		var keys = Object.keys(obj);
		return obj[keys[(keys.length * Math.random()) << 0]];
	}
	static compareObj(obj1, obj2) {
		//Loop through properties in object 1
		for (var p in obj1) {
			//Check property exists on both objects
			if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) return false;

			switch (typeof obj1[p]) {
				//Deep compare objects
				case "object":
					if (!this.compareObj(obj1[p], obj2[p])) return false;
					break;
				//Compare function code
				case "function":
					if (
						typeof obj2[p] == "undefined" ||
						(p != "compare" && obj1[p].toString() != obj2[p].toString())
					)
						return false;
					break;
				//Compare values
				default:
					if (obj1[p] != obj2[p]) return false;
			}
		}
		//Check object 2 for any extra properties
		for (var p in obj2) {
			if (typeof obj1[p] == "undefined") return false;
		}
		return true;
	}
	static arrayUnion(arr1, arr2) {
		var union = arr1.concat(arr2);
		for (var i = 0; i < union.length; i++) {
			for (var j = i + 1; j < union.length; j++) {
				if (this.compareObj(union[i], union[j])) {
					union.splice(j, 1);
					j--;
				}
			}
		}
		return union;
	}
	static cloneNumberArray(arr: Array<number>) {
		return JSON.parse(JSON.stringify(arr));
	}
	static getWorldPos(node: cc.Node) {
		return node.convertToWorldSpaceAR(cc.v2(0, 0));
	}
	static setWorldPos(node: cc.Node, posWS: cc.Vec2) {
		node.setPosition(node.parent.convertToNodeSpaceAR(posWS));
	}
	static enumToString(enumType, value) {
		for (var k in enumType)
			if (enumType[k] == value) {
				return k;
			}
		return null;
	}
	static async loadPrefab(url): Promise<cc.Prefab> {
		let Prefab = null;
		await new Promise((resolve, reject) => {
			cc.loader.loadRes(url, (err, prefab) => {
				if (err) {
					cc.error(err.message || err);
					reject(err);
					return;
				}
				resolve(prefab);
			});
		}).then((prefab) => {
			Prefab = prefab;
		});
		return Prefab;
	}
	static getHash(input) {
		var hash = 0,
			len = input.length;
		for (var i = 0; i < len; i++) {
			hash = (hash << 5) - hash + input.charCodeAt(i);
			hash |= 0; // to 32bit integer
		}
		return hash;
	}

	static getKeys(obj) {
		var keys = [];
		for (var key in obj) {
			keys.push(key);
		}
		return keys;
	}

	static getUrlVars() {
		var vars = {};
		var parts = window.location.href.replace(
			/[?&]+([^=&]+)=([^&]*)/gi,
			//@ts-ignore
			function (m, key, value) {
				vars[key] = value;
			}
		);
		return vars;
	}

	static formatNumber(num) {
		return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
	  }

	static consoleLog(str) {
		if (CC_DEBUG)
			console.log(str);
	}

	static formatFloatToString(num, maxDigitNum = 2, useLocale = true, curStr = "") {
		if(typeof num === 'string')
			return num;
		num = parseFloat(num.toFixed(10));
		let str = num.toString();
		let num_digits_after_decimal = (str.indexOf(".") != -1 ? str.length - 1 - str.indexOf(".") : 0);
		if (maxDigitNum > 0)
			num_digits_after_decimal = Math.min(num_digits_after_decimal, maxDigitNum);
		let locale_opt = useLocale ? 
			{ 
				minimumFractionDigits: Math.max(num_digits_after_decimal, 2),
				maximumFractionDigits: 2,
				style: curStr.length > 0 ? "currency" : "decimal",
				currency: curStr.length > 0 ? curStr : "USD"
			}
			: {};
		if (num_digits_after_decimal >= 2)
			return useLocale ? parseFloat(str).toLocaleString(undefined, locale_opt) : str;
		else
			return useLocale ? num.toLocaleString(undefined, locale_opt) : num.toFixed(2);
	}

	static formatDate(date: Date, isShortFormat: boolean = false) {
		let s = date.getSeconds();
		let min = date.getMinutes();
		let h = date.getHours();
		let d = date.getDate();
		let m = date.getMonth() + 1;
		let y = date.getFullYear();
		return isShortFormat ?
			'' + (h <= 9 ? '0' + h : h) + ':' + (min <= 9 ? '0' + min : min) + ':' + (s <= 9 ? '0' + s : s) + ' ' + (m <= 9 ? '0' + m : m) + '/' + (d <= 9 ? '0' + d : d)
			: '' + y + '/' + (m <= 9 ? '0' + m : m) + '/' + (d <= 9 ? '0' + d : d) + ' ' + (h <= 9 ? '0' + h : h) + ':' + (min <= 9 ? '0' + min : min) + ' (' + Utils.getGMTString(date) + ')';
	}

	static getGMTString(date: Date) {
		let offset_m = -date.getTimezoneOffset();
		let offset_sign = (offset_m >= 0 ? '+' : '-');
		offset_m = Math.abs(offset_m);
		let offset_h = Math.floor(offset_m / 60);
		offset_m = offset_m % 60;
		return 'GMT' + offset_sign + offset_h + ':' + (offset_m <= 9 ? '0' + offset_m : offset_m);
	}

	static exitApp(redirectURL: string = null) {
		if (redirectURL != undefined && redirectURL != null && redirectURL != '#') {
			//redirect
			window.top.location.replace(redirectURL);
		} else {
			//reload, as we cannot close the window (dont have permission)
			window.location.reload();
		}
	}
	static generateRandomWord(length) {
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		let result = '';
		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}
    static loadScene(sceneName) {
        cc.director.loadScene(sceneName, (error) => {
            if (error) {
                console.error(`Failed to load scene: ${sceneName}`, error);
            } else {
                console.log(`${sceneName} loaded successfully.`);
            }
        });
    }

	static checkFileType(url: string) {
		const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
		const videoExtensions = ['.mp4', '.mov', '.webm', '.avi', '.mkv'];
	
		if(url === "" || url === null)
			return Constant.URL_TYPE.NONE;

		const lowerUrl = url.toLowerCase();
	
		if (imageExtensions.some(ext => lowerUrl.endsWith(ext))) {
			return Constant.URL_TYPE.IMAGE;
		} else if (videoExtensions.some(ext => lowerUrl.endsWith(ext))) {
			return Constant.URL_TYPE.VIDEO;
		} else {
			return Constant.URL_TYPE.NONE;
		}
	}
}
export type LoadCompleteCallback<T> = (error: Error | null, asset: T,...args: any) => void;
