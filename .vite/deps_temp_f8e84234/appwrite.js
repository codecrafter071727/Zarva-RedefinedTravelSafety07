import "./chunk-G3PMV62Z.js";

// node_modules/appwrite/dist/esm/sdk.js
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
var Query = class {
  /**
   * Constructor for Query class.
   *
   * @param {string} method
   * @param {AttributesTypes} attribute
   * @param {QueryTypes} values
   */
  constructor(method, attribute, values) {
    this.method = method;
    this.attribute = attribute;
    if (values !== void 0) {
      if (Array.isArray(values)) {
        this.values = values;
      } else {
        this.values = [values];
      }
    }
  }
  /**
   * Convert the query object to a JSON string.
   *
   * @returns {string}
   */
  toString() {
    return JSON.stringify({
      method: this.method,
      attribute: this.attribute,
      values: this.values
    });
  }
};
Query.equal = (attribute, value) => new Query("equal", attribute, value).toString();
Query.notEqual = (attribute, value) => new Query("notEqual", attribute, value).toString();
Query.lessThan = (attribute, value) => new Query("lessThan", attribute, value).toString();
Query.lessThanEqual = (attribute, value) => new Query("lessThanEqual", attribute, value).toString();
Query.greaterThan = (attribute, value) => new Query("greaterThan", attribute, value).toString();
Query.greaterThanEqual = (attribute, value) => new Query("greaterThanEqual", attribute, value).toString();
Query.isNull = (attribute) => new Query("isNull", attribute).toString();
Query.isNotNull = (attribute) => new Query("isNotNull", attribute).toString();
Query.between = (attribute, start, end) => new Query("between", attribute, [start, end]).toString();
Query.startsWith = (attribute, value) => new Query("startsWith", attribute, value).toString();
Query.endsWith = (attribute, value) => new Query("endsWith", attribute, value).toString();
Query.select = (attributes) => new Query("select", void 0, attributes).toString();
Query.search = (attribute, value) => new Query("search", attribute, value).toString();
Query.orderDesc = (attribute) => new Query("orderDesc", attribute).toString();
Query.orderAsc = (attribute) => new Query("orderAsc", attribute).toString();
Query.cursorAfter = (documentId) => new Query("cursorAfter", void 0, documentId).toString();
Query.cursorBefore = (documentId) => new Query("cursorBefore", void 0, documentId).toString();
Query.limit = (limit) => new Query("limit", void 0, limit).toString();
Query.offset = (offset) => new Query("offset", void 0, offset).toString();
Query.contains = (attribute, value) => new Query("contains", attribute, value).toString();
Query.or = (queries) => new Query("or", void 0, queries.map((query) => JSON.parse(query))).toString();
Query.and = (queries) => new Query("and", void 0, queries.map((query) => JSON.parse(query))).toString();
var AppwriteException = class extends Error {
  /**
   * Initializes a Appwrite Exception.
   *
   * @param {string} message - The error message.
   * @param {number} code - The error code. Default is 0.
   * @param {string} type - The error type. Default is an empty string.
   * @param {string} response - The response string. Default is an empty string.
   */
  constructor(message, code = 0, type = "", response = "") {
    super(message);
    this.name = "AppwriteException";
    this.message = message;
    this.code = code;
    this.type = type;
    this.response = response;
  }
};
var Client = class _Client {
  constructor() {
    this.config = {
      endpoint: "https://cloud.appwrite.io/v1",
      endpointRealtime: "",
      project: "",
      jwt: "",
      locale: "",
      session: "",
      devkey: ""
    };
    this.headers = {
      "x-sdk-name": "Web",
      "x-sdk-platform": "client",
      "x-sdk-language": "web",
      "x-sdk-version": "18.1.1",
      "X-Appwrite-Response-Format": "1.7.0"
    };
    this.realtime = {
      socket: void 0,
      timeout: void 0,
      heartbeat: void 0,
      url: "",
      channels: /* @__PURE__ */ new Set(),
      subscriptions: /* @__PURE__ */ new Map(),
      subscriptionsCounter: 0,
      reconnect: true,
      reconnectAttempts: 0,
      lastMessage: void 0,
      connect: () => {
        clearTimeout(this.realtime.timeout);
        this.realtime.timeout = window === null || window === void 0 ? void 0 : window.setTimeout(() => {
          this.realtime.createSocket();
        }, 50);
      },
      getTimeout: () => {
        switch (true) {
          case this.realtime.reconnectAttempts < 5:
            return 1e3;
          case this.realtime.reconnectAttempts < 15:
            return 5e3;
          case this.realtime.reconnectAttempts < 100:
            return 1e4;
          default:
            return 6e4;
        }
      },
      createHeartbeat: () => {
        if (this.realtime.heartbeat) {
          clearTimeout(this.realtime.heartbeat);
        }
        this.realtime.heartbeat = window === null || window === void 0 ? void 0 : window.setInterval(() => {
          var _a2;
          (_a2 = this.realtime.socket) === null || _a2 === void 0 ? void 0 : _a2.send(JSON.stringify({
            type: "ping"
          }));
        }, 2e4);
      },
      createSocket: () => {
        var _a2, _b, _c;
        if (this.realtime.channels.size < 1) {
          this.realtime.reconnect = false;
          (_a2 = this.realtime.socket) === null || _a2 === void 0 ? void 0 : _a2.close();
          return;
        }
        const channels = new URLSearchParams();
        channels.set("project", this.config.project);
        this.realtime.channels.forEach((channel) => {
          channels.append("channels[]", channel);
        });
        const url = this.config.endpointRealtime + "/realtime?" + channels.toString();
        if (url !== this.realtime.url || // Check if URL is present
        !this.realtime.socket || // Check if WebSocket has not been created
        ((_b = this.realtime.socket) === null || _b === void 0 ? void 0 : _b.readyState) > WebSocket.OPEN) {
          if (this.realtime.socket && ((_c = this.realtime.socket) === null || _c === void 0 ? void 0 : _c.readyState) < WebSocket.CLOSING) {
            this.realtime.reconnect = false;
            this.realtime.socket.close();
          }
          this.realtime.url = url;
          this.realtime.socket = new WebSocket(url);
          this.realtime.socket.addEventListener("message", this.realtime.onMessage);
          this.realtime.socket.addEventListener("open", (_event) => {
            this.realtime.reconnectAttempts = 0;
            this.realtime.createHeartbeat();
          });
          this.realtime.socket.addEventListener("close", (event) => {
            var _a3, _b2, _c2;
            if (!this.realtime.reconnect || ((_b2 = (_a3 = this.realtime) === null || _a3 === void 0 ? void 0 : _a3.lastMessage) === null || _b2 === void 0 ? void 0 : _b2.type) === "error" && // Check if last message was of type error
            ((_c2 = this.realtime) === null || _c2 === void 0 ? void 0 : _c2.lastMessage.data).code === 1008) {
              this.realtime.reconnect = true;
              return;
            }
            const timeout = this.realtime.getTimeout();
            console.error(`Realtime got disconnected. Reconnect will be attempted in ${timeout / 1e3} seconds.`, event.reason);
            setTimeout(() => {
              this.realtime.reconnectAttempts++;
              this.realtime.createSocket();
            }, timeout);
          });
        }
      },
      onMessage: (event) => {
        var _a2, _b;
        try {
          const message = JSON.parse(event.data);
          this.realtime.lastMessage = message;
          switch (message.type) {
            case "connected":
              const cookie = JSON.parse((_a2 = window.localStorage.getItem("cookieFallback")) !== null && _a2 !== void 0 ? _a2 : "{}");
              const session = cookie === null || cookie === void 0 ? void 0 : cookie[`a_session_${this.config.project}`];
              const messageData = message.data;
              if (session && !messageData.user) {
                (_b = this.realtime.socket) === null || _b === void 0 ? void 0 : _b.send(JSON.stringify({
                  type: "authentication",
                  data: {
                    session
                  }
                }));
              }
              break;
            case "event":
              let data = message.data;
              if (data === null || data === void 0 ? void 0 : data.channels) {
                const isSubscribed = data.channels.some((channel) => this.realtime.channels.has(channel));
                if (!isSubscribed)
                  return;
                this.realtime.subscriptions.forEach((subscription) => {
                  if (data.channels.some((channel) => subscription.channels.includes(channel))) {
                    setTimeout(() => subscription.callback(data));
                  }
                });
              }
              break;
            case "pong":
              break;
            case "error":
              throw message.data;
            default:
              break;
          }
        } catch (e) {
          console.error(e);
        }
      },
      cleanUp: (channels) => {
        this.realtime.channels.forEach((channel) => {
          if (channels.includes(channel)) {
            let found = Array.from(this.realtime.subscriptions).some(([_key, subscription]) => {
              return subscription.channels.includes(channel);
            });
            if (!found) {
              this.realtime.channels.delete(channel);
            }
          }
        });
      }
    };
  }
  /**
   * Set Endpoint
   *
   * Your project endpoint
   *
   * @param {string} endpoint
   *
   * @returns {this}
   */
  setEndpoint(endpoint) {
    if (!endpoint.startsWith("http://") && !endpoint.startsWith("https://")) {
      throw new AppwriteException("Invalid endpoint URL: " + endpoint);
    }
    this.config.endpoint = endpoint;
    this.config.endpointRealtime = endpoint.replace("https://", "wss://").replace("http://", "ws://");
    return this;
  }
  /**
   * Set Realtime Endpoint
   *
   * @param {string} endpointRealtime
   *
   * @returns {this}
   */
  setEndpointRealtime(endpointRealtime) {
    if (!endpointRealtime.startsWith("ws://") && !endpointRealtime.startsWith("wss://")) {
      throw new AppwriteException("Invalid realtime endpoint URL: " + endpointRealtime);
    }
    this.config.endpointRealtime = endpointRealtime;
    return this;
  }
  /**
   * Set Project
   *
   * Your project ID
   *
   * @param value string
   *
   * @return {this}
   */
  setProject(value) {
    this.headers["X-Appwrite-Project"] = value;
    this.config.project = value;
    return this;
  }
  /**
   * Set JWT
   *
   * Your secret JSON Web Token
   *
   * @param value string
   *
   * @return {this}
   */
  setJWT(value) {
    this.headers["X-Appwrite-JWT"] = value;
    this.config.jwt = value;
    return this;
  }
  /**
   * Set Locale
   *
   * @param value string
   *
   * @return {this}
   */
  setLocale(value) {
    this.headers["X-Appwrite-Locale"] = value;
    this.config.locale = value;
    return this;
  }
  /**
   * Set Session
   *
   * The user session to authenticate with
   *
   * @param value string
   *
   * @return {this}
   */
  setSession(value) {
    this.headers["X-Appwrite-Session"] = value;
    this.config.session = value;
    return this;
  }
  /**
   * Set DevKey
   *
   * Your secret dev API key
   *
   * @param value string
   *
   * @return {this}
   */
  setDevKey(value) {
    this.headers["X-Appwrite-Dev-Key"] = value;
    this.config.devkey = value;
    return this;
  }
  /**
   * Subscribes to Appwrite events and passes you the payload in realtime.
   *
   * @param {string|string[]} channels
   * Channel to subscribe - pass a single channel as a string or multiple with an array of strings.
   *
   * Possible channels are:
   * - account
   * - collections
   * - collections.[ID]
   * - collections.[ID].documents
   * - documents
   * - documents.[ID]
   * - files
   * - files.[ID]
   * - executions
   * - executions.[ID]
   * - functions.[ID]
   * - teams
   * - teams.[ID]
   * - memberships
   * - memberships.[ID]
   * @param {(payload: RealtimeMessage) => void} callback Is called on every realtime update.
   * @returns {() => void} Unsubscribes from events.
   */
  subscribe(channels, callback) {
    let channelArray = typeof channels === "string" ? [channels] : channels;
    channelArray.forEach((channel) => this.realtime.channels.add(channel));
    const counter = this.realtime.subscriptionsCounter++;
    this.realtime.subscriptions.set(counter, {
      channels: channelArray,
      callback
    });
    this.realtime.connect();
    return () => {
      this.realtime.subscriptions.delete(counter);
      this.realtime.cleanUp(channelArray);
      this.realtime.connect();
    };
  }
  prepareRequest(method, url, headers = {}, params = {}) {
    method = method.toUpperCase();
    headers = Object.assign({}, this.headers, headers);
    if (typeof window !== "undefined" && window.localStorage) {
      const cookieFallback = window.localStorage.getItem("cookieFallback");
      if (cookieFallback) {
        headers["X-Fallback-Cookies"] = cookieFallback;
      }
    }
    let options = {
      method,
      headers
    };
    if (headers["X-Appwrite-Dev-Key"] === void 0) {
      options.credentials = "include";
    }
    if (method === "GET") {
      for (const [key, value] of Object.entries(_Client.flatten(params))) {
        url.searchParams.append(key, value);
      }
    } else {
      switch (headers["content-type"]) {
        case "application/json":
          options.body = JSON.stringify(params);
          break;
        case "multipart/form-data":
          const formData = new FormData();
          for (const [key, value] of Object.entries(params)) {
            if (value instanceof File) {
              formData.append(key, value, value.name);
            } else if (Array.isArray(value)) {
              for (const nestedValue of value) {
                formData.append(`${key}[]`, nestedValue);
              }
            } else {
              formData.append(key, value);
            }
          }
          options.body = formData;
          delete headers["content-type"];
          break;
      }
    }
    return { uri: url.toString(), options };
  }
  chunkedUpload(method, url, headers = {}, originalPayload = {}, onProgress) {
    return __awaiter(this, void 0, void 0, function* () {
      const file = Object.values(originalPayload).find((value) => value instanceof File);
      if (!file) {
        throw new Error("File not found in payload");
      }
      if (file.size <= _Client.CHUNK_SIZE) {
        return yield this.call(method, url, headers, originalPayload);
      }
      let start = 0;
      let response = null;
      while (start < file.size) {
        let end = start + _Client.CHUNK_SIZE;
        if (end >= file.size) {
          end = file.size;
        }
        headers["content-range"] = `bytes ${start}-${end - 1}/${file.size}`;
        const chunk = file.slice(start, end);
        let payload = Object.assign(Object.assign({}, originalPayload), { file: new File([chunk], file.name) });
        response = yield this.call(method, url, headers, payload);
        if (onProgress && typeof onProgress === "function") {
          onProgress({
            $id: response.$id,
            progress: Math.round(end / file.size * 100),
            sizeUploaded: end,
            chunksTotal: Math.ceil(file.size / _Client.CHUNK_SIZE),
            chunksUploaded: Math.ceil(end / _Client.CHUNK_SIZE)
          });
        }
        if (response && response.$id) {
          headers["x-appwrite-id"] = response.$id;
        }
        start = end;
      }
      return response;
    });
  }
  ping() {
    return __awaiter(this, void 0, void 0, function* () {
      return this.call("GET", new URL(this.config.endpoint + "/ping"));
    });
  }
  call(method, url, headers = {}, params = {}, responseType = "json") {
    var _a2, _b;
    return __awaiter(this, void 0, void 0, function* () {
      const { uri, options } = this.prepareRequest(method, url, headers, params);
      let data = null;
      const response = yield fetch(uri, options);
      if (response.type === "opaque") {
        throw new AppwriteException(`Invalid Origin. Register your new client (${window.location.host}) as a new Web platform on your project console dashboard`, 403, "forbidden", "");
      }
      const warnings = response.headers.get("x-appwrite-warning");
      if (warnings) {
        warnings.split(";").forEach((warning) => console.warn("Warning: " + warning));
      }
      if ((_a2 = response.headers.get("content-type")) === null || _a2 === void 0 ? void 0 : _a2.includes("application/json")) {
        data = yield response.json();
      } else if (responseType === "arrayBuffer") {
        data = yield response.arrayBuffer();
      } else {
        data = {
          message: yield response.text()
        };
      }
      if (400 <= response.status) {
        let responseText = "";
        if (((_b = response.headers.get("content-type")) === null || _b === void 0 ? void 0 : _b.includes("application/json")) || responseType === "arrayBuffer") {
          responseText = JSON.stringify(data);
        } else {
          responseText = data === null || data === void 0 ? void 0 : data.message;
        }
        throw new AppwriteException(data === null || data === void 0 ? void 0 : data.message, response.status, data === null || data === void 0 ? void 0 : data.type, responseText);
      }
      const cookieFallback = response.headers.get("X-Fallback-Cookies");
      if (typeof window !== "undefined" && window.localStorage && cookieFallback) {
        window.console.warn("Appwrite is using localStorage for session management. Increase your security by adding a custom domain as your API endpoint.");
        window.localStorage.setItem("cookieFallback", cookieFallback);
      }
      return data;
    });
  }
  static flatten(data, prefix = "") {
    let output = {};
    for (const [key, value] of Object.entries(data)) {
      let finalKey = prefix ? prefix + "[" + key + "]" : key;
      if (Array.isArray(value)) {
        output = Object.assign(Object.assign({}, output), _Client.flatten(value, finalKey));
      } else {
        output[finalKey] = value;
      }
    }
    return output;
  }
};
Client.CHUNK_SIZE = 1024 * 1024 * 5;
var Service = class _Service {
  constructor(client) {
    this.client = client;
  }
  static flatten(data, prefix = "") {
    let output = {};
    for (const [key, value] of Object.entries(data)) {
      let finalKey = prefix ? prefix + "[" + key + "]" : key;
      if (Array.isArray(value)) {
        output = Object.assign(Object.assign({}, output), _Service.flatten(value, finalKey));
      } else {
        output[finalKey] = value;
      }
    }
    return output;
  }
};
Service.CHUNK_SIZE = 5 * 1024 * 1024;
var Account = class {
  constructor(client) {
    this.client = client;
  }
  /**
   * Get the currently logged in user.
   *
   * @throws {AppwriteException}
   * @returns {Promise<Models.User<Preferences>>}
   */
  get() {
    const apiPath = "/account";
    const payload = {};
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {};
    return this.client.call("get", uri, apiHeaders, payload);
  }
  /**
   * Use this endpoint to allow a new user to register a new account in your project. After the user registration completes successfully, you can use the [/account/verfication](https://appwrite.io/docs/references/cloud/client-web/account#createVerification) route to start verifying the user email address. To allow the new user to login to their new account, you need to create a new [account session](https://appwrite.io/docs/references/cloud/client-web/account#createEmailSession).
   *
   * @param {string} userId
   * @param {string} email
   * @param {string} password
   * @param {string} name
   * @throws {AppwriteException}
   * @returns {Promise<Models.User<Preferences>>}
   */
  create(userId, email, password, name) {
    if (typeof userId === "undefined") {
      throw new AppwriteException('Missing required parameter: "userId"');
    }
    if (typeof email === "undefined") {
      throw new AppwriteException('Missing required parameter: "email"');
    }
    if (typeof password === "undefined") {
      throw new AppwriteException('Missing required parameter: "password"');
    }
    const apiPath = "/account";
    const payload = {};
    if (typeof userId !== "undefined") {
      payload["userId"] = userId;
    }
    if (typeof email !== "undefined") {
      payload["email"] = email;
    }
    if (typeof password !== "undefined") {
      payload["password"] = password;
    }
    if (typeof name !== "undefined") {
      payload["name"] = name;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "application/json"
    };
    return this.client.call("post", uri, apiHeaders, payload);
  }
  /**
       * Update currently logged in user account email address. After changing user address, the user confirmation status will get reset. A new confirmation email is not sent automatically however you can use the send confirmation email endpoint again to send the confirmation email. For security measures, user password is required to complete this request.
  This endpoint can also be used to convert an anonymous account to a normal one, by passing an email address and a new password.
  
       *
       * @param {string} email
       * @param {string} password
       * @throws {AppwriteException}
       * @returns {Promise<Models.User<Preferences>>}
       */
  updateEmail(email, password) {
    if (typeof email === "undefined") {
      throw new AppwriteException('Missing required parameter: "email"');
    }
    if (typeof password === "undefined") {
      throw new AppwriteException('Missing required parameter: "password"');
    }
    const apiPath = "/account/email";
    const payload = {};
    if (typeof email !== "undefined") {
      payload["email"] = email;
    }
    if (typeof password !== "undefined") {
      payload["password"] = password;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "application/json"
    };
    return this.client.call("patch", uri, apiHeaders, payload);
  }
  /**
   * Get the list of identities for the currently logged in user.
   *
   * @param {string[]} queries
   * @throws {AppwriteException}
   * @returns {Promise<Models.IdentityList>}
   */
  listIdentities(queries) {
    const apiPath = "/account/identities";
    const payload = {};
    if (typeof queries !== "undefined") {
      payload["queries"] = queries;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {};
    return this.client.call("get", uri, apiHeaders, payload);
  }
  /**
   * Delete an identity by its unique ID.
   *
   * @param {string} identityId
   * @throws {AppwriteException}
   * @returns {Promise<{}>}
   */
  deleteIdentity(identityId) {
    if (typeof identityId === "undefined") {
      throw new AppwriteException('Missing required parameter: "identityId"');
    }
    const apiPath = "/account/identities/{identityId}".replace("{identityId}", identityId);
    const payload = {};
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "application/json"
    };
    return this.client.call("delete", uri, apiHeaders, payload);
  }
  /**
   * Use this endpoint to create a JSON Web Token. You can use the resulting JWT to authenticate on behalf of the current user when working with the Appwrite server-side API and SDKs. The JWT secret is valid for 15 minutes from its creation and will be invalid if the user will logout in that time frame.
   *
   * @throws {AppwriteException}
   * @returns {Promise<Models.Jwt>}
   */
  createJWT() {
    const apiPath = "/account/jwts";
    const payload = {};
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "application/json"
    };
    return this.client.call("post", uri, apiHeaders, payload);
  }
  /**
   * Get the list of latest security activity logs for the currently logged in user. Each log returns user IP address, location and date and time of log.
   *
   * @param {string[]} queries
   * @throws {AppwriteException}
   * @returns {Promise<Models.LogList>}
   */
  listLogs(queries) {
    const apiPath = "/account/logs";
    const payload = {};
    if (typeof queries !== "undefined") {
      payload["queries"] = queries;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {};
    return this.client.call("get", uri, apiHeaders, payload);
  }
  /**
   * Enable or disable MFA on an account.
   *
   * @param {boolean} mfa
   * @throws {AppwriteException}
   * @returns {Promise<Models.User<Preferences>>}
   */
  updateMFA(mfa) {
    if (typeof mfa === "undefined") {
      throw new AppwriteException('Missing required parameter: "mfa"');
    }
    const apiPath = "/account/mfa";
    const payload = {};
    if (typeof mfa !== "undefined") {
      payload["mfa"] = mfa;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "application/json"
    };
    return this.client.call("patch", uri, apiHeaders, payload);
  }
  /**
   * Add an authenticator app to be used as an MFA factor. Verify the authenticator using the [verify authenticator](/docs/references/cloud/client-web/account#updateMfaAuthenticator) method.
   *
   * @param {AuthenticatorType} type
   * @throws {AppwriteException}
   * @returns {Promise<Models.MfaType>}
   */
  createMfaAuthenticator(type) {
    if (typeof type === "undefined") {
      throw new AppwriteException('Missing required parameter: "type"');
    }
    const apiPath = "/account/mfa/authenticators/{type}".replace("{type}", type);
    const payload = {};
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "application/json"
    };
    return this.client.call("post", uri, apiHeaders, payload);
  }
  /**
   * Verify an authenticator app after adding it using the [add authenticator](/docs/references/cloud/client-web/account#createMfaAuthenticator) method.
   *
   * @param {AuthenticatorType} type
   * @param {string} otp
   * @throws {AppwriteException}
   * @returns {Promise<Models.User<Preferences>>}
   */
  updateMfaAuthenticator(type, otp) {
    if (typeof type === "undefined") {
      throw new AppwriteException('Missing required parameter: "type"');
    }
    if (typeof otp === "undefined") {
      throw new AppwriteException('Missing required parameter: "otp"');
    }
    const apiPath = "/account/mfa/authenticators/{type}".replace("{type}", type);
    const payload = {};
    if (typeof otp !== "undefined") {
      payload["otp"] = otp;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "application/json"
    };
    return this.client.call("put", uri, apiHeaders, payload);
  }
  /**
   * Delete an authenticator for a user by ID.
   *
   * @param {AuthenticatorType} type
   * @throws {AppwriteException}
   * @returns {Promise<{}>}
   */
  deleteMfaAuthenticator(type) {
    if (typeof type === "undefined") {
      throw new AppwriteException('Missing required parameter: "type"');
    }
    const apiPath = "/account/mfa/authenticators/{type}".replace("{type}", type);
    const payload = {};
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "application/json"
    };
    return this.client.call("delete", uri, apiHeaders, payload);
  }
  /**
   * Begin the process of MFA verification after sign-in. Finish the flow with [updateMfaChallenge](/docs/references/cloud/client-web/account#updateMfaChallenge) method.
   *
   * @param {AuthenticationFactor} factor
   * @throws {AppwriteException}
   * @returns {Promise<Models.MfaChallenge>}
   */
  createMfaChallenge(factor) {
    if (typeof factor === "undefined") {
      throw new AppwriteException('Missing required parameter: "factor"');
    }
    const apiPath = "/account/mfa/challenge";
    const payload = {};
    if (typeof factor !== "undefined") {
      payload["factor"] = factor;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "application/json"
    };
    return this.client.call("post", uri, apiHeaders, payload);
  }
  /**
   * Complete the MFA challenge by providing the one-time password. Finish the process of MFA verification by providing the one-time password. To begin the flow, use [createMfaChallenge](/docs/references/cloud/client-web/account#createMfaChallenge) method.
   *
   * @param {string} challengeId
   * @param {string} otp
   * @throws {AppwriteException}
   * @returns {Promise<Models.Session>}
   */
  updateMfaChallenge(challengeId, otp) {
    if (typeof challengeId === "undefined") {
      throw new AppwriteException('Missing required parameter: "challengeId"');
    }
    if (typeof otp === "undefined") {
      throw new AppwriteException('Missing required parameter: "otp"');
    }
    const apiPath = "/account/mfa/challenge";
    const payload = {};
    if (typeof challengeId !== "undefined") {
      payload["challengeId"] = challengeId;
    }
    if (typeof otp !== "undefined") {
      payload["otp"] = otp;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "application/json"
    };
    return this.client.call("put", uri, apiHeaders, payload);
  }
  /**
   * List the factors available on the account to be used as a MFA challange.
   *
   * @throws {AppwriteException}
   * @returns {Promise<Models.MfaFactors>}
   */
  listMfaFactors() {
    const apiPath = "/account/mfa/factors";
    const payload = {};
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {};
    return this.client.call("get", uri, apiHeaders, payload);
  }
  /**
   * Get recovery codes that can be used as backup for MFA flow. Before getting codes, they must be generated using [createMfaRecoveryCodes](/docs/references/cloud/client-web/account#createMfaRecoveryCodes) method. An OTP challenge is required to read recovery codes.
   *
   * @throws {AppwriteException}
   * @returns {Promise<Models.MfaRecoveryCodes>}
   */
  getMfaRecoveryCodes() {
    const apiPath = "/account/mfa/recovery-codes";
    const payload = {};
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {};
    return this.client.call("get", uri, apiHeaders, payload);
  }
  /**
   * Generate recovery codes as backup for MFA flow. It&#039;s recommended to generate and show then immediately after user successfully adds their authehticator. Recovery codes can be used as a MFA verification type in [createMfaChallenge](/docs/references/cloud/client-web/account#createMfaChallenge) method.
   *
   * @throws {AppwriteException}
   * @returns {Promise<Models.MfaRecoveryCodes>}
   */
  createMfaRecoveryCodes() {
    const apiPath = "/account/mfa/recovery-codes";
    const payload = {};
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "application/json"
    };
    return this.client.call("post", uri, apiHeaders, payload);
  }
  /**
   * Regenerate recovery codes that can be used as backup for MFA flow. Before regenerating codes, they must be first generated using [createMfaRecoveryCodes](/docs/references/cloud/client-web/account#createMfaRecoveryCodes) method. An OTP challenge is required to regenreate recovery codes.
   *
   * @throws {AppwriteException}
   * @returns {Promise<Models.MfaRecoveryCodes>}
   */
  updateMfaRecoveryCodes() {
    const apiPath = "/account/mfa/recovery-codes";
    const payload = {};
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "application/json"
    };
    return this.client.call("patch", uri, apiHeaders, payload);
  }
  /**
   * Update currently logged in user account name.
   *
   * @param {string} name
   * @throws {AppwriteException}
   * @returns {Promise<Models.User<Preferences>>}
   */
  updateName(name) {
    if (typeof name === "undefined") {
      throw new AppwriteException('Missing required parameter: "name"');
    }
    const apiPath = "/account/name";
    const payload = {};
    if (typeof name !== "undefined") {
      payload["name"] = name;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "application/json"
    };
    return this.client.call("patch", uri, apiHeaders, payload);
  }
  /**
   * Update currently logged in user password. For validation, user is required to pass in the new password, and the old password. For users created with OAuth, Team Invites and Magic URL, oldPassword is optional.
   *
   * @param {string} password
   * @param {string} oldPassword
   * @throws {AppwriteException}
   * @returns {Promise<Models.User<Preferences>>}
   */
  updatePassword(password, oldPassword) {
    if (typeof password === "undefined") {
      throw new AppwriteException('Missing required parameter: "password"');
    }
    const apiPath = "/account/password";
    const payload = {};
    if (typeof password !== "undefined") {
      payload["password"] = password;
    }
    if (typeof oldPassword !== "undefined") {
      payload["oldPassword"] = oldPassword;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "application/json"
    };
    return this.client.call("patch", uri, apiHeaders, payload);
  }
  /**
   * Update the currently logged in user&#039;s phone number. After updating the phone number, the phone verification status will be reset. A confirmation SMS is not sent automatically, however you can use the [POST /account/verification/phone](https://appwrite.io/docs/references/cloud/client-web/account#createPhoneVerification) endpoint to send a confirmation SMS.
   *
   * @param {string} phone
   * @param {string} password
   * @throws {AppwriteException}
   * @returns {Promise<Models.User<Preferences>>}
   */
  updatePhone(phone, password) {
    if (typeof phone === "undefined") {
      throw new AppwriteException('Missing required parameter: "phone"');
    }
    if (typeof password === "undefined") {
      throw new AppwriteException('Missing required parameter: "password"');
    }
    const apiPath = "/account/phone";
    const payload = {};
    if (typeof phone !== "undefined") {
      payload["phone"] = phone;
    }
    if (typeof password !== "undefined") {
      payload["password"] = password;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "application/json"
    };
    return this.client.call("patch", uri, apiHeaders, payload);
  }
  /**
   * Get the preferences as a key-value object for the currently logged in user.
   *
   * @throws {AppwriteException}
   * @returns {Promise<Preferences>}
   */
  getPrefs() {
    const apiPath = "/account/prefs";
    const payload = {};
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {};
    return this.client.call("get", uri, apiHeaders, payload);
  }
  /**
   * Update currently logged in user account preferences. The object you pass is stored as is, and replaces any previous value. The maximum allowed prefs size is 64kB and throws error if exceeded.
   *
   * @param {Partial<Preferences>} prefs
   * @throws {AppwriteException}
   * @returns {Promise<Models.User<Preferences>>}
   */
  updatePrefs(prefs) {
    if (typeof prefs === "undefined") {
      throw new AppwriteException('Missing required parameter: "prefs"');
    }
    const apiPath = "/account/prefs";
    const payload = {};
    if (typeof prefs !== "undefined") {
      payload["prefs"] = prefs;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "application/json"
    };
    return this.client.call("patch", uri, apiHeaders, payload);
  }
  /**
   * Sends the user an email with a temporary secret key for password reset. When the user clicks the confirmation link he is redirected back to your app password reset URL with the secret key and email address values attached to the URL query string. Use the query string params to submit a request to the [PUT /account/recovery](https://appwrite.io/docs/references/cloud/client-web/account#updateRecovery) endpoint to complete the process. The verification link sent to the user&#039;s email address is valid for 1 hour.
   *
   * @param {string} email
   * @param {string} url
   * @throws {AppwriteException}
   * @returns {Promise<Models.Token>}
   */
  createRecovery(email, url) {
    if (typeof email === "undefined") {
      throw new AppwriteException('Missing required parameter: "email"');
    }
    if (typeof url === "undefined") {
      throw new AppwriteException('Missing required parameter: "url"');
    }
    const apiPath = "/account/recovery";
    const payload = {};
    if (typeof email !== "undefined") {
      payload["email"] = email;
    }
    if (typeof url !== "undefined") {
      payload["url"] = url;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "application/json"
    };
    return this.client.call("post", uri, apiHeaders, payload);
  }
  /**
       * Use this endpoint to complete the user account password reset. Both the **userId** and **secret** arguments will be passed as query parameters to the redirect URL you have provided when sending your request to the [POST /account/recovery](https://appwrite.io/docs/references/cloud/client-web/account#createRecovery) endpoint.
  
  Please note that in order to avoid a [Redirect Attack](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.md) the only valid redirect URLs are the ones from domains you have set when adding your platforms in the console interface.
       *
       * @param {string} userId
       * @param {string} secret
       * @param {string} password
       * @throws {AppwriteException}
       * @returns {Promise<Models.Token>}
       */
  updateRecovery(userId, secret, password) {
    if (typeof userId === "undefined") {
      throw new AppwriteException('Missing required parameter: "userId"');
    }
    if (typeof secret === "undefined") {
      throw new AppwriteException('Missing required parameter: "secret"');
    }
    if (typeof password === "undefined") {
      throw new AppwriteException('Missing required parameter: "password"');
    }
    const apiPath = "/account/recovery";
    const payload = {};
    if (typeof userId !== "undefined") {
      payload["userId"] = userId;
    }
    if (typeof secret !== "undefined") {
      payload["secret"] = secret;
    }
    if (typeof password !== "undefined") {
      payload["password"] = password;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "application/json"
    };
    return this.client.call("put", uri, apiHeaders, payload);
  }
  /**
   * Get the list of active sessions across different devices for the currently logged in user.
   *
   * @throws {AppwriteException}
   * @returns {Promise<Models.SessionList>}
   */
  listSessions() {
    const apiPath = "/account/sessions";
    const payload = {};
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {};
    return this.client.call("get", uri, apiHeaders, payload);
  }
  /**
   * Delete all sessions from the user account and remove any sessions cookies from the end client.
   *
   * @throws {AppwriteException}
   * @returns {Promise<{}>}
   */
  deleteSessions() {
    const apiPath = "/account/sessions";
    const payload = {};
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "application/json"
    };
    return this.client.call("delete", uri, apiHeaders, payload);
  }
  /**
   * Use this endpoint to allow a new user to register an anonymous account in your project. This route will also create a new session for the user. To allow the new user to convert an anonymous account to a normal account, you need to update its [email and password](https://appwrite.io/docs/references/cloud/client-web/account#updateEmail) or create an [OAuth2 session](https://appwrite.io/docs/references/cloud/client-web/account#CreateOAuth2Session).
   *
   * @throws {AppwriteException}
   * @returns {Promise<Models.Session>}
   */
  createAnonymousSession() {
    const apiPath = "/account/sessions/anonymous";
    const payload = {};
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "application/json"
    };
    return this.client.call("post", uri, apiHeaders, payload);
  }
  /**
       * Allow the user to login into their account by providing a valid email and password combination. This route will create a new session for the user.
  
  A user is limited to 10 active sessions at a time by default. [Learn more about session limits](https://appwrite.io/docs/authentication-security#limits).
       *
       * @param {string} email
       * @param {string} password
       * @throws {AppwriteException}
       * @returns {Promise<Models.Session>}
       */
  createEmailPasswordSession(email, password) {
    if (typeof email === "undefined") {
      throw new AppwriteException('Missing required parameter: "email"');
    }
    if (typeof password === "undefined") {
      throw new AppwriteException('Missing required parameter: "password"');
    }
    const apiPath = "/account/sessions/email";
    const payload = {};
    if (typeof email !== "undefined") {
      payload["email"] = email;
    }
    if (typeof password !== "undefined") {
      payload["password"] = password;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "application/json"
    };
    return this.client.call("post", uri, apiHeaders, payload);
  }
  /**
   * Use this endpoint to create a session from token. Provide the **userId** and **secret** parameters from the successful response of authentication flows initiated by token creation. For example, magic URL and phone login.
   *
   * @param {string} userId
   * @param {string} secret
   * @throws {AppwriteException}
   * @returns {Promise<Models.Session>}
   */
  updateMagicURLSession(userId, secret) {
    if (typeof userId === "undefined") {
      throw new AppwriteException('Missing required parameter: "userId"');
    }
    if (typeof secret === "undefined") {
      throw new AppwriteException('Missing required parameter: "secret"');
    }
    const apiPath = "/account/sessions/magic-url";
    const payload = {};
    if (typeof userId !== "undefined") {
      payload["userId"] = userId;
    }
    if (typeof secret !== "undefined") {
      payload["secret"] = secret;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "application/json"
    };
    return this.client.call("put", uri, apiHeaders, payload);
  }
  /**
       * Allow the user to login to their account using the OAuth2 provider of their choice. Each OAuth2 provider should be enabled from the Appwrite console first. Use the success and failure arguments to provide a redirect URL&#039;s back to your app when login is completed.
  
  If there is already an active session, the new session will be attached to the logged-in account. If there are no active sessions, the server will attempt to look for a user with the same email address as the email received from the OAuth2 provider and attach the new session to the existing user. If no matching user is found - the server will create a new user.
  
  A user is limited to 10 active sessions at a time by default. [Learn more about session limits](https://appwrite.io/docs/authentication-security#limits).
  
       *
       * @param {OAuthProvider} provider
       * @param {string} success
       * @param {string} failure
       * @param {string[]} scopes
       * @throws {AppwriteException}
       * @returns {void | string}
       */
  createOAuth2Session(provider, success, failure, scopes) {
    if (typeof provider === "undefined") {
      throw new AppwriteException('Missing required parameter: "provider"');
    }
    const apiPath = "/account/sessions/oauth2/{provider}".replace("{provider}", provider);
    const payload = {};
    if (typeof success !== "undefined") {
      payload["success"] = success;
    }
    if (typeof failure !== "undefined") {
      payload["failure"] = failure;
    }
    if (typeof scopes !== "undefined") {
      payload["scopes"] = scopes;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    payload["project"] = this.client.config.project;
    for (const [key, value] of Object.entries(Service.flatten(payload))) {
      uri.searchParams.append(key, value);
    }
    if (typeof window !== "undefined" && (window === null || window === void 0 ? void 0 : window.location)) {
      window.location.href = uri.toString();
      return;
    } else {
      return uri.toString();
    }
  }
  /**
   * Use this endpoint to create a session from token. Provide the **userId** and **secret** parameters from the successful response of authentication flows initiated by token creation. For example, magic URL and phone login.
   *
   * @param {string} userId
   * @param {string} secret
   * @throws {AppwriteException}
   * @returns {Promise<Models.Session>}
   */
  updatePhoneSession(userId, secret) {
    if (typeof userId === "undefined") {
      throw new AppwriteException('Missing required parameter: "userId"');
    }
    if (typeof secret === "undefined") {
      throw new AppwriteException('Missing required parameter: "secret"');
    }
    const apiPath = "/account/sessions/phone";
    const payload = {};
    if (typeof userId !== "undefined") {
      payload["userId"] = userId;
    }
    if (typeof secret !== "undefined") {
      payload["secret"] = secret;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "application/json"
    };
    return this.client.call("put", uri, apiHeaders, payload);
  }
  /**
   * Use this endpoint to create a session from token. Provide the **userId** and **secret** parameters from the successful response of authentication flows initiated by token creation. For example, magic URL and phone login.
   *
   * @param {string} userId
   * @param {string} secret
   * @throws {AppwriteException}
   * @returns {Promise<Models.Session>}
   */
  createSession(userId, secret) {
    if (typeof userId === "undefined") {
      throw new AppwriteException('Missing required parameter: "userId"');
    }
    if (typeof secret === "undefined") {
      throw new AppwriteException('Missing required parameter: "secret"');
    }
    const apiPath = "/account/sessions/token";
    const payload = {};
    if (typeof userId !== "undefined") {
      payload["userId"] = userId;
    }
    if (typeof secret !== "undefined") {
      payload["secret"] = secret;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "application/json"
    };
    return this.client.call("post", uri, apiHeaders, payload);
  }
  /**
   * Use this endpoint to get a logged in user&#039;s session using a Session ID. Inputting &#039;current&#039; will return the current session being used.
   *
   * @param {string} sessionId
   * @throws {AppwriteException}
   * @returns {Promise<Models.Session>}
   */
  getSession(sessionId) {
    if (typeof sessionId === "undefined") {
      throw new AppwriteException('Missing required parameter: "sessionId"');
    }
    const apiPath = "/account/sessions/{sessionId}".replace("{sessionId}", sessionId);
    const payload = {};
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {};
    return this.client.call("get", uri, apiHeaders, payload);
  }
  /**
   * Use this endpoint to extend a session&#039;s length. Extending a session is useful when session expiry is short. If the session was created using an OAuth provider, this endpoint refreshes the access token from the provider.
   *
   * @param {string} sessionId
   * @throws {AppwriteException}
   * @returns {Promise<Models.Session>}
   */
  updateSession(sessionId) {
    if (typeof sessionId === "undefined") {
      throw new AppwriteException('Missing required parameter: "sessionId"');
    }
    const apiPath = "/account/sessions/{sessionId}".replace("{sessionId}", sessionId);
    const payload = {};
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "application/json"
    };
    return this.client.call("patch", uri, apiHeaders, payload);
  }
  /**
   * Logout the user. Use &#039;current&#039; as the session ID to logout on this device, use a session ID to logout on another device. If you&#039;re looking to logout the user on all devices, use [Delete Sessions](https://appwrite.io/docs/references/cloud/client-web/account#deleteSessions) instead.
   *
   * @param {string} sessionId
   * @throws {AppwriteException}
   * @returns {Promise<{}>}
   */
  deleteSession(sessionId) {
    if (typeof sessionId === "undefined") {
      throw new AppwriteException('Missing required parameter: "sessionId"');
    }
    const apiPath = "/account/sessions/{sessionId}".replace("{sessionId}", sessionId);
    const payload = {};
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "application/json"
    };
    return this.client.call("delete", uri, apiHeaders, payload);
  }
  /**
   * Block the currently logged in user account. Behind the scene, the user record is not deleted but permanently blocked from any access. To completely delete a user, use the Users API instead.
   *
   * @throws {AppwriteException}
   * @returns {Promise<Models.User<Preferences>>}
   */
  updateStatus() {
    const apiPath = "/account/status";
    const payload = {};
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "application/json"
    };
    return this.client.call("patch", uri, apiHeaders, payload);
  }
  /**
   * Use this endpoint to register a device for push notifications. Provide a target ID (custom or generated using ID.unique()), a device identifier (usually a device token), and optionally specify which provider should send notifications to this target. The target is automatically linked to the current session and includes device information like brand and model.
   *
   * @param {string} targetId
   * @param {string} identifier
   * @param {string} providerId
   * @throws {AppwriteException}
   * @returns {Promise<Models.Target>}
   */
  createPushTarget(targetId, identifier, providerId) {
    if (typeof targetId === "undefined") {
      throw new AppwriteException('Missing required parameter: "targetId"');
    }
    if (typeof identifier === "undefined") {
      throw new AppwriteException('Missing required parameter: "identifier"');
    }
    const apiPath = "/account/targets/push";
    const payload = {};
    if (typeof targetId !== "undefined") {
      payload["targetId"] = targetId;
    }
    if (typeof identifier !== "undefined") {
      payload["identifier"] = identifier;
    }
    if (typeof providerId !== "undefined") {
      payload["providerId"] = providerId;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "application/json"
    };
    return this.client.call("post", uri, apiHeaders, payload);
  }
  /**
   * Update the currently logged in user&#039;s push notification target. You can modify the target&#039;s identifier (device token) and provider ID (token, email, phone etc.). The target must exist and belong to the current user. If you change the provider ID, notifications will be sent through the new messaging provider instead.
   *
   * @param {string} targetId
   * @param {string} identifier
   * @throws {AppwriteException}
   * @returns {Promise<Models.Target>}
   */
  updatePushTarget(targetId, identifier) {
    if (typeof targetId === "undefined") {
      throw new AppwriteException('Missing required parameter: "targetId"');
    }
    if (typeof identifier === "undefined") {
      throw new AppwriteException('Missing required parameter: "identifier"');
    }
    const apiPath = "/account/targets/{targetId}/push".replace("{targetId}", targetId);
    const payload = {};
    if (typeof identifier !== "undefined") {
      payload["identifier"] = identifier;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "application/json"
    };
    return this.client.call("put", uri, apiHeaders, payload);
  }
  /**
   * Delete a push notification target for the currently logged in user. After deletion, the device will no longer receive push notifications. The target must exist and belong to the current user.
   *
   * @param {string} targetId
   * @throws {AppwriteException}
   * @returns {Promise<{}>}
   */
  deletePushTarget(targetId) {
    if (typeof targetId === "undefined") {
      throw new AppwriteException('Missing required parameter: "targetId"');
    }
    const apiPath = "/account/targets/{targetId}/push".replace("{targetId}", targetId);
    const payload = {};
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "application/json"
    };
    return this.client.call("delete", uri, apiHeaders, payload);
  }
  /**
       * Sends the user an email with a secret key for creating a session. If the provided user ID has not be registered, a new user will be created. Use the returned user ID and secret and submit a request to the [POST /v1/account/sessions/token](https://appwrite.io/docs/references/cloud/client-web/account#createSession) endpoint to complete the login process. The secret sent to the user&#039;s email is valid for 15 minutes.
  
  A user is limited to 10 active sessions at a time by default. [Learn more about session limits](https://appwrite.io/docs/authentication-security#limits).
       *
       * @param {string} userId
       * @param {string} email
       * @param {boolean} phrase
       * @throws {AppwriteException}
       * @returns {Promise<Models.Token>}
       */
  createEmailToken(userId, email, phrase) {
    if (typeof userId === "undefined") {
      throw new AppwriteException('Missing required parameter: "userId"');
    }
    if (typeof email === "undefined") {
      throw new AppwriteException('Missing required parameter: "email"');
    }
    const apiPath = "/account/tokens/email";
    const payload = {};
    if (typeof userId !== "undefined") {
      payload["userId"] = userId;
    }
    if (typeof email !== "undefined") {
      payload["email"] = email;
    }
    if (typeof phrase !== "undefined") {
      payload["phrase"] = phrase;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "application/json"
    };
    return this.client.call("post", uri, apiHeaders, payload);
  }
  /**
       * Sends the user an email with a secret key for creating a session. If the provided user ID has not been registered, a new user will be created. When the user clicks the link in the email, the user is redirected back to the URL you provided with the secret key and userId values attached to the URL query string. Use the query string parameters to submit a request to the [POST /v1/account/sessions/token](https://appwrite.io/docs/references/cloud/client-web/account#createSession) endpoint to complete the login process. The link sent to the user&#039;s email address is valid for 1 hour.
  
  A user is limited to 10 active sessions at a time by default. [Learn more about session limits](https://appwrite.io/docs/authentication-security#limits).
  
       *
       * @param {string} userId
       * @param {string} email
       * @param {string} url
       * @param {boolean} phrase
       * @throws {AppwriteException}
       * @returns {Promise<Models.Token>}
       */
  createMagicURLToken(userId, email, url, phrase) {
    if (typeof userId === "undefined") {
      throw new AppwriteException('Missing required parameter: "userId"');
    }
    if (typeof email === "undefined") {
      throw new AppwriteException('Missing required parameter: "email"');
    }
    const apiPath = "/account/tokens/magic-url";
    const payload = {};
    if (typeof userId !== "undefined") {
      payload["userId"] = userId;
    }
    if (typeof email !== "undefined") {
      payload["email"] = email;
    }
    if (typeof url !== "undefined") {
      payload["url"] = url;
    }
    if (typeof phrase !== "undefined") {
      payload["phrase"] = phrase;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "application/json"
    };
    return this.client.call("post", uri, apiHeaders, payload);
  }
  /**
       * Allow the user to login to their account using the OAuth2 provider of their choice. Each OAuth2 provider should be enabled from the Appwrite console first. Use the success and failure arguments to provide a redirect URL&#039;s back to your app when login is completed.
  
  If authentication succeeds, `userId` and `secret` of a token will be appended to the success URL as query parameters. These can be used to create a new session using the [Create session](https://appwrite.io/docs/references/cloud/client-web/account#createSession) endpoint.
  
  A user is limited to 10 active sessions at a time by default. [Learn more about session limits](https://appwrite.io/docs/authentication-security#limits).
       *
       * @param {OAuthProvider} provider
       * @param {string} success
       * @param {string} failure
       * @param {string[]} scopes
       * @throws {AppwriteException}
       * @returns {void | string}
       */
  createOAuth2Token(provider, success, failure, scopes) {
    if (typeof provider === "undefined") {
      throw new AppwriteException('Missing required parameter: "provider"');
    }
    const apiPath = "/account/tokens/oauth2/{provider}".replace("{provider}", provider);
    const payload = {};
    if (typeof success !== "undefined") {
      payload["success"] = success;
    }
    if (typeof failure !== "undefined") {
      payload["failure"] = failure;
    }
    if (typeof scopes !== "undefined") {
      payload["scopes"] = scopes;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    payload["project"] = this.client.config.project;
    for (const [key, value] of Object.entries(Service.flatten(payload))) {
      uri.searchParams.append(key, value);
    }
    if (typeof window !== "undefined" && (window === null || window === void 0 ? void 0 : window.location)) {
      window.location.href = uri.toString();
      return;
    } else {
      return uri.toString();
    }
  }
  /**
       * Sends the user an SMS with a secret key for creating a session. If the provided user ID has not be registered, a new user will be created. Use the returned user ID and secret and submit a request to the [POST /v1/account/sessions/token](https://appwrite.io/docs/references/cloud/client-web/account#createSession) endpoint to complete the login process. The secret sent to the user&#039;s phone is valid for 15 minutes.
  
  A user is limited to 10 active sessions at a time by default. [Learn more about session limits](https://appwrite.io/docs/authentication-security#limits).
       *
       * @param {string} userId
       * @param {string} phone
       * @throws {AppwriteException}
       * @returns {Promise<Models.Token>}
       */
  createPhoneToken(userId, phone) {
    if (typeof userId === "undefined") {
      throw new AppwriteException('Missing required parameter: "userId"');
    }
    if (typeof phone === "undefined") {
      throw new AppwriteException('Missing required parameter: "phone"');
    }
    const apiPath = "/account/tokens/phone";
    const payload = {};
    if (typeof userId !== "undefined") {
      payload["userId"] = userId;
    }
    if (typeof phone !== "undefined") {
      payload["phone"] = phone;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "application/json"
    };
    return this.client.call("post", uri, apiHeaders, payload);
  }
  /**
       * Use this endpoint to send a verification message to your user email address to confirm they are the valid owners of that address. Both the **userId** and **secret** arguments will be passed as query parameters to the URL you have provided to be attached to the verification email. The provided URL should redirect the user back to your app and allow you to complete the verification process by verifying both the **userId** and **secret** parameters. Learn more about how to [complete the verification process](https://appwrite.io/docs/references/cloud/client-web/account#updateVerification). The verification link sent to the user&#039;s email address is valid for 7 days.
  
  Please note that in order to avoid a [Redirect Attack](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.md), the only valid redirect URLs are the ones from domains you have set when adding your platforms in the console interface.
  
       *
       * @param {string} url
       * @throws {AppwriteException}
       * @returns {Promise<Models.Token>}
       */
  createVerification(url) {
    if (typeof url === "undefined") {
      throw new AppwriteException('Missing required parameter: "url"');
    }
    const apiPath = "/account/verification";
    const payload = {};
    if (typeof url !== "undefined") {
      payload["url"] = url;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "application/json"
    };
    return this.client.call("post", uri, apiHeaders, payload);
  }
  /**
   * Use this endpoint to complete the user email verification process. Use both the **userId** and **secret** parameters that were attached to your app URL to verify the user email ownership. If confirmed this route will return a 200 status code.
   *
   * @param {string} userId
   * @param {string} secret
   * @throws {AppwriteException}
   * @returns {Promise<Models.Token>}
   */
  updateVerification(userId, secret) {
    if (typeof userId === "undefined") {
      throw new AppwriteException('Missing required parameter: "userId"');
    }
    if (typeof secret === "undefined") {
      throw new AppwriteException('Missing required parameter: "secret"');
    }
    const apiPath = "/account/verification";
    const payload = {};
    if (typeof userId !== "undefined") {
      payload["userId"] = userId;
    }
    if (typeof secret !== "undefined") {
      payload["secret"] = secret;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "application/json"
    };
    return this.client.call("put", uri, apiHeaders, payload);
  }
  /**
   * Use this endpoint to send a verification SMS to the currently logged in user. This endpoint is meant for use after updating a user&#039;s phone number using the [accountUpdatePhone](https://appwrite.io/docs/references/cloud/client-web/account#updatePhone) endpoint. Learn more about how to [complete the verification process](https://appwrite.io/docs/references/cloud/client-web/account#updatePhoneVerification). The verification code sent to the user&#039;s phone number is valid for 15 minutes.
   *
   * @throws {AppwriteException}
   * @returns {Promise<Models.Token>}
   */
  createPhoneVerification() {
    const apiPath = "/account/verification/phone";
    const payload = {};
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "application/json"
    };
    return this.client.call("post", uri, apiHeaders, payload);
  }
  /**
   * Use this endpoint to complete the user phone verification process. Use the **userId** and **secret** that were sent to your user&#039;s phone number to verify the user email ownership. If confirmed this route will return a 200 status code.
   *
   * @param {string} userId
   * @param {string} secret
   * @throws {AppwriteException}
   * @returns {Promise<Models.Token>}
   */
  updatePhoneVerification(userId, secret) {
    if (typeof userId === "undefined") {
      throw new AppwriteException('Missing required parameter: "userId"');
    }
    if (typeof secret === "undefined") {
      throw new AppwriteException('Missing required parameter: "secret"');
    }
    const apiPath = "/account/verification/phone";
    const payload = {};
    if (typeof userId !== "undefined") {
      payload["userId"] = userId;
    }
    if (typeof secret !== "undefined") {
      payload["secret"] = secret;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "application/json"
    };
    return this.client.call("put", uri, apiHeaders, payload);
  }
};
var Avatars = class {
  constructor(client) {
    this.client = client;
  }
  /**
       * You can use this endpoint to show different browser icons to your users. The code argument receives the browser code as it appears in your user [GET /account/sessions](https://appwrite.io/docs/references/cloud/client-web/account#getSessions) endpoint. Use width, height and quality arguments to change the output settings.
  
  When one dimension is specified and the other is 0, the image is scaled with preserved aspect ratio. If both dimensions are 0, the API provides an image at source quality. If dimensions are not specified, the default size of image returned is 100x100px.
       *
       * @param {Browser} code
       * @param {number} width
       * @param {number} height
       * @param {number} quality
       * @throws {AppwriteException}
       * @returns {string}
       */
  getBrowser(code, width, height, quality) {
    if (typeof code === "undefined") {
      throw new AppwriteException('Missing required parameter: "code"');
    }
    const apiPath = "/avatars/browsers/{code}".replace("{code}", code);
    const payload = {};
    if (typeof width !== "undefined") {
      payload["width"] = width;
    }
    if (typeof height !== "undefined") {
      payload["height"] = height;
    }
    if (typeof quality !== "undefined") {
      payload["quality"] = quality;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    payload["project"] = this.client.config.project;
    for (const [key, value] of Object.entries(Service.flatten(payload))) {
      uri.searchParams.append(key, value);
    }
    return uri.toString();
  }
  /**
       * The credit card endpoint will return you the icon of the credit card provider you need. Use width, height and quality arguments to change the output settings.
  
  When one dimension is specified and the other is 0, the image is scaled with preserved aspect ratio. If both dimensions are 0, the API provides an image at source quality. If dimensions are not specified, the default size of image returned is 100x100px.
  
       *
       * @param {CreditCard} code
       * @param {number} width
       * @param {number} height
       * @param {number} quality
       * @throws {AppwriteException}
       * @returns {string}
       */
  getCreditCard(code, width, height, quality) {
    if (typeof code === "undefined") {
      throw new AppwriteException('Missing required parameter: "code"');
    }
    const apiPath = "/avatars/credit-cards/{code}".replace("{code}", code);
    const payload = {};
    if (typeof width !== "undefined") {
      payload["width"] = width;
    }
    if (typeof height !== "undefined") {
      payload["height"] = height;
    }
    if (typeof quality !== "undefined") {
      payload["quality"] = quality;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    payload["project"] = this.client.config.project;
    for (const [key, value] of Object.entries(Service.flatten(payload))) {
      uri.searchParams.append(key, value);
    }
    return uri.toString();
  }
  /**
       * Use this endpoint to fetch the favorite icon (AKA favicon) of any remote website URL.
  
  This endpoint does not follow HTTP redirects.
       *
       * @param {string} url
       * @throws {AppwriteException}
       * @returns {string}
       */
  getFavicon(url) {
    if (typeof url === "undefined") {
      throw new AppwriteException('Missing required parameter: "url"');
    }
    const apiPath = "/avatars/favicon";
    const payload = {};
    if (typeof url !== "undefined") {
      payload["url"] = url;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    payload["project"] = this.client.config.project;
    for (const [key, value] of Object.entries(Service.flatten(payload))) {
      uri.searchParams.append(key, value);
    }
    return uri.toString();
  }
  /**
       * You can use this endpoint to show different country flags icons to your users. The code argument receives the 2 letter country code. Use width, height and quality arguments to change the output settings. Country codes follow the [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1) standard.
  
  When one dimension is specified and the other is 0, the image is scaled with preserved aspect ratio. If both dimensions are 0, the API provides an image at source quality. If dimensions are not specified, the default size of image returned is 100x100px.
  
       *
       * @param {Flag} code
       * @param {number} width
       * @param {number} height
       * @param {number} quality
       * @throws {AppwriteException}
       * @returns {string}
       */
  getFlag(code, width, height, quality) {
    if (typeof code === "undefined") {
      throw new AppwriteException('Missing required parameter: "code"');
    }
    const apiPath = "/avatars/flags/{code}".replace("{code}", code);
    const payload = {};
    if (typeof width !== "undefined") {
      payload["width"] = width;
    }
    if (typeof height !== "undefined") {
      payload["height"] = height;
    }
    if (typeof quality !== "undefined") {
      payload["quality"] = quality;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    payload["project"] = this.client.config.project;
    for (const [key, value] of Object.entries(Service.flatten(payload))) {
      uri.searchParams.append(key, value);
    }
    return uri.toString();
  }
  /**
       * Use this endpoint to fetch a remote image URL and crop it to any image size you want. This endpoint is very useful if you need to crop and display remote images in your app or in case you want to make sure a 3rd party image is properly served using a TLS protocol.
  
  When one dimension is specified and the other is 0, the image is scaled with preserved aspect ratio. If both dimensions are 0, the API provides an image at source quality. If dimensions are not specified, the default size of image returned is 400x400px.
  
  This endpoint does not follow HTTP redirects.
       *
       * @param {string} url
       * @param {number} width
       * @param {number} height
       * @throws {AppwriteException}
       * @returns {string}
       */
  getImage(url, width, height) {
    if (typeof url === "undefined") {
      throw new AppwriteException('Missing required parameter: "url"');
    }
    const apiPath = "/avatars/image";
    const payload = {};
    if (typeof url !== "undefined") {
      payload["url"] = url;
    }
    if (typeof width !== "undefined") {
      payload["width"] = width;
    }
    if (typeof height !== "undefined") {
      payload["height"] = height;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    payload["project"] = this.client.config.project;
    for (const [key, value] of Object.entries(Service.flatten(payload))) {
      uri.searchParams.append(key, value);
    }
    return uri.toString();
  }
  /**
       * Use this endpoint to show your user initials avatar icon on your website or app. By default, this route will try to print your logged-in user name or email initials. You can also overwrite the user name if you pass the &#039;name&#039; parameter. If no name is given and no user is logged, an empty avatar will be returned.
  
  You can use the color and background params to change the avatar colors. By default, a random theme will be selected. The random theme will persist for the user&#039;s initials when reloading the same theme will always return for the same initials.
  
  When one dimension is specified and the other is 0, the image is scaled with preserved aspect ratio. If both dimensions are 0, the API provides an image at source quality. If dimensions are not specified, the default size of image returned is 100x100px.
  
       *
       * @param {string} name
       * @param {number} width
       * @param {number} height
       * @param {string} background
       * @throws {AppwriteException}
       * @returns {string}
       */
  getInitials(name, width, height, background) {
    const apiPath = "/avatars/initials";
    const payload = {};
    if (typeof name !== "undefined") {
      payload["name"] = name;
    }
    if (typeof width !== "undefined") {
      payload["width"] = width;
    }
    if (typeof height !== "undefined") {
      payload["height"] = height;
    }
    if (typeof background !== "undefined") {
      payload["background"] = background;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    payload["project"] = this.client.config.project;
    for (const [key, value] of Object.entries(Service.flatten(payload))) {
      uri.searchParams.append(key, value);
    }
    return uri.toString();
  }
  /**
       * Converts a given plain text to a QR code image. You can use the query parameters to change the size and style of the resulting image.
  
       *
       * @param {string} text
       * @param {number} size
       * @param {number} margin
       * @param {boolean} download
       * @throws {AppwriteException}
       * @returns {string}
       */
  getQR(text, size, margin, download) {
    if (typeof text === "undefined") {
      throw new AppwriteException('Missing required parameter: "text"');
    }
    const apiPath = "/avatars/qr";
    const payload = {};
    if (typeof text !== "undefined") {
      payload["text"] = text;
    }
    if (typeof size !== "undefined") {
      payload["size"] = size;
    }
    if (typeof margin !== "undefined") {
      payload["margin"] = margin;
    }
    if (typeof download !== "undefined") {
      payload["download"] = download;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    payload["project"] = this.client.config.project;
    for (const [key, value] of Object.entries(Service.flatten(payload))) {
      uri.searchParams.append(key, value);
    }
    return uri.toString();
  }
};
var Databases = class {
  constructor(client) {
    this.client = client;
  }
  /**
   * Get a list of all the user&#039;s documents in a given collection. You can use the query params to filter your results.
   *
   * @param {string} databaseId
   * @param {string} collectionId
   * @param {string[]} queries
   * @throws {AppwriteException}
   * @returns {Promise<Models.DocumentList<Document>>}
   */
  listDocuments(databaseId, collectionId, queries) {
    if (typeof databaseId === "undefined") {
      throw new AppwriteException('Missing required parameter: "databaseId"');
    }
    if (typeof collectionId === "undefined") {
      throw new AppwriteException('Missing required parameter: "collectionId"');
    }
    const apiPath = "/databases/{databaseId}/collections/{collectionId}/documents".replace("{databaseId}", databaseId).replace("{collectionId}", collectionId);
    const payload = {};
    if (typeof queries !== "undefined") {
      payload["queries"] = queries;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {};
    return this.client.call("get", uri, apiHeaders, payload);
  }
  /**
   * Create a new Document. Before using this route, you should create a new collection resource using either a [server integration](https://appwrite.io/docs/server/databases#databasesCreateCollection) API or directly from your database console.
   *
   * @param {string} databaseId
   * @param {string} collectionId
   * @param {string} documentId
   * @param {Omit<Document, keyof Models.Document>} data
   * @param {string[]} permissions
   * @throws {AppwriteException}
   * @returns {Promise<Document>}
   */
  createDocument(databaseId, collectionId, documentId, data, permissions) {
    if (typeof databaseId === "undefined") {
      throw new AppwriteException('Missing required parameter: "databaseId"');
    }
    if (typeof collectionId === "undefined") {
      throw new AppwriteException('Missing required parameter: "collectionId"');
    }
    if (typeof documentId === "undefined") {
      throw new AppwriteException('Missing required parameter: "documentId"');
    }
    if (typeof data === "undefined") {
      throw new AppwriteException('Missing required parameter: "data"');
    }
    const apiPath = "/databases/{databaseId}/collections/{collectionId}/documents".replace("{databaseId}", databaseId).replace("{collectionId}", collectionId);
    const payload = {};
    if (typeof documentId !== "undefined") {
      payload["documentId"] = documentId;
    }
    if (typeof data !== "undefined") {
      payload["data"] = data;
    }
    if (typeof permissions !== "undefined") {
      payload["permissions"] = permissions;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "application/json"
    };
    return this.client.call("post", uri, apiHeaders, payload);
  }
  /**
   * Get a document by its unique ID. This endpoint response returns a JSON object with the document data.
   *
   * @param {string} databaseId
   * @param {string} collectionId
   * @param {string} documentId
   * @param {string[]} queries
   * @throws {AppwriteException}
   * @returns {Promise<Document>}
   */
  getDocument(databaseId, collectionId, documentId, queries) {
    if (typeof databaseId === "undefined") {
      throw new AppwriteException('Missing required parameter: "databaseId"');
    }
    if (typeof collectionId === "undefined") {
      throw new AppwriteException('Missing required parameter: "collectionId"');
    }
    if (typeof documentId === "undefined") {
      throw new AppwriteException('Missing required parameter: "documentId"');
    }
    const apiPath = "/databases/{databaseId}/collections/{collectionId}/documents/{documentId}".replace("{databaseId}", databaseId).replace("{collectionId}", collectionId).replace("{documentId}", documentId);
    const payload = {};
    if (typeof queries !== "undefined") {
      payload["queries"] = queries;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {};
    return this.client.call("get", uri, apiHeaders, payload);
  }
  /**
   * Create or update a Document. Before using this route, you should create a new collection resource using either a [server integration](https://appwrite.io/docs/server/databases#databasesCreateCollection) API or directly from your database console.
   *
   * @param {string} databaseId
   * @param {string} collectionId
   * @param {string} documentId
   * @param {object} data
   * @param {string[]} permissions
   * @throws {AppwriteException}
   * @returns {Promise<Document>}
   */
  upsertDocument(databaseId, collectionId, documentId, data, permissions) {
    if (typeof databaseId === "undefined") {
      throw new AppwriteException('Missing required parameter: "databaseId"');
    }
    if (typeof collectionId === "undefined") {
      throw new AppwriteException('Missing required parameter: "collectionId"');
    }
    if (typeof documentId === "undefined") {
      throw new AppwriteException('Missing required parameter: "documentId"');
    }
    if (typeof data === "undefined") {
      throw new AppwriteException('Missing required parameter: "data"');
    }
    const apiPath = "/databases/{databaseId}/collections/{collectionId}/documents/{documentId}".replace("{databaseId}", databaseId).replace("{collectionId}", collectionId).replace("{documentId}", documentId);
    const payload = {};
    if (typeof data !== "undefined") {
      payload["data"] = data;
    }
    if (typeof permissions !== "undefined") {
      payload["permissions"] = permissions;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "application/json"
    };
    return this.client.call("put", uri, apiHeaders, payload);
  }
  /**
   * Update a document by its unique ID. Using the patch method you can pass only specific fields that will get updated.
   *
   * @param {string} databaseId
   * @param {string} collectionId
   * @param {string} documentId
   * @param {Partial<Omit<Document, keyof Models.Document>>} data
   * @param {string[]} permissions
   * @throws {AppwriteException}
   * @returns {Promise<Document>}
   */
  updateDocument(databaseId, collectionId, documentId, data, permissions) {
    if (typeof databaseId === "undefined") {
      throw new AppwriteException('Missing required parameter: "databaseId"');
    }
    if (typeof collectionId === "undefined") {
      throw new AppwriteException('Missing required parameter: "collectionId"');
    }
    if (typeof documentId === "undefined") {
      throw new AppwriteException('Missing required parameter: "documentId"');
    }
    const apiPath = "/databases/{databaseId}/collections/{collectionId}/documents/{documentId}".replace("{databaseId}", databaseId).replace("{collectionId}", collectionId).replace("{documentId}", documentId);
    const payload = {};
    if (typeof data !== "undefined") {
      payload["data"] = data;
    }
    if (typeof permissions !== "undefined") {
      payload["permissions"] = permissions;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "application/json"
    };
    return this.client.call("patch", uri, apiHeaders, payload);
  }
  /**
   * Delete a document by its unique ID.
   *
   * @param {string} databaseId
   * @param {string} collectionId
   * @param {string} documentId
   * @throws {AppwriteException}
   * @returns {Promise<{}>}
   */
  deleteDocument(databaseId, collectionId, documentId) {
    if (typeof databaseId === "undefined") {
      throw new AppwriteException('Missing required parameter: "databaseId"');
    }
    if (typeof collectionId === "undefined") {
      throw new AppwriteException('Missing required parameter: "collectionId"');
    }
    if (typeof documentId === "undefined") {
      throw new AppwriteException('Missing required parameter: "documentId"');
    }
    const apiPath = "/databases/{databaseId}/collections/{collectionId}/documents/{documentId}".replace("{databaseId}", databaseId).replace("{collectionId}", collectionId).replace("{documentId}", documentId);
    const payload = {};
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "application/json"
    };
    return this.client.call("delete", uri, apiHeaders, payload);
  }
};
var Functions = class {
  constructor(client) {
    this.client = client;
  }
  /**
   * Get a list of all the current user function execution logs. You can use the query params to filter your results.
   *
   * @param {string} functionId
   * @param {string[]} queries
   * @throws {AppwriteException}
   * @returns {Promise<Models.ExecutionList>}
   */
  listExecutions(functionId, queries) {
    if (typeof functionId === "undefined") {
      throw new AppwriteException('Missing required parameter: "functionId"');
    }
    const apiPath = "/functions/{functionId}/executions".replace("{functionId}", functionId);
    const payload = {};
    if (typeof queries !== "undefined") {
      payload["queries"] = queries;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {};
    return this.client.call("get", uri, apiHeaders, payload);
  }
  /**
   * Trigger a function execution. The returned object will return you the current execution status. You can ping the `Get Execution` endpoint to get updates on the current execution status. Once this endpoint is called, your function execution process will start asynchronously.
   *
   * @param {string} functionId
   * @param {string} body
   * @param {boolean} async
   * @param {string} xpath
   * @param {ExecutionMethod} method
   * @param {object} headers
   * @param {string} scheduledAt
   * @throws {AppwriteException}
   * @returns {Promise<Models.Execution>}
   */
  createExecution(functionId, body, async, xpath, method, headers, scheduledAt) {
    if (typeof functionId === "undefined") {
      throw new AppwriteException('Missing required parameter: "functionId"');
    }
    const apiPath = "/functions/{functionId}/executions".replace("{functionId}", functionId);
    const payload = {};
    if (typeof body !== "undefined") {
      payload["body"] = body;
    }
    if (typeof async !== "undefined") {
      payload["async"] = async;
    }
    if (typeof xpath !== "undefined") {
      payload["path"] = xpath;
    }
    if (typeof method !== "undefined") {
      payload["method"] = method;
    }
    if (typeof headers !== "undefined") {
      payload["headers"] = headers;
    }
    if (typeof scheduledAt !== "undefined") {
      payload["scheduledAt"] = scheduledAt;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "application/json"
    };
    return this.client.call("post", uri, apiHeaders, payload);
  }
  /**
   * Get a function execution log by its unique ID.
   *
   * @param {string} functionId
   * @param {string} executionId
   * @throws {AppwriteException}
   * @returns {Promise<Models.Execution>}
   */
  getExecution(functionId, executionId) {
    if (typeof functionId === "undefined") {
      throw new AppwriteException('Missing required parameter: "functionId"');
    }
    if (typeof executionId === "undefined") {
      throw new AppwriteException('Missing required parameter: "executionId"');
    }
    const apiPath = "/functions/{functionId}/executions/{executionId}".replace("{functionId}", functionId).replace("{executionId}", executionId);
    const payload = {};
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {};
    return this.client.call("get", uri, apiHeaders, payload);
  }
};
var Graphql = class {
  constructor(client) {
    this.client = client;
  }
  /**
   * Execute a GraphQL mutation.
   *
   * @param {object} query
   * @throws {AppwriteException}
   * @returns {Promise<{}>}
   */
  query(query) {
    if (typeof query === "undefined") {
      throw new AppwriteException('Missing required parameter: "query"');
    }
    const apiPath = "/graphql";
    const payload = {};
    if (typeof query !== "undefined") {
      payload["query"] = query;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "x-sdk-graphql": "true",
      "content-type": "application/json"
    };
    return this.client.call("post", uri, apiHeaders, payload);
  }
  /**
   * Execute a GraphQL mutation.
   *
   * @param {object} query
   * @throws {AppwriteException}
   * @returns {Promise<{}>}
   */
  mutation(query) {
    if (typeof query === "undefined") {
      throw new AppwriteException('Missing required parameter: "query"');
    }
    const apiPath = "/graphql/mutation";
    const payload = {};
    if (typeof query !== "undefined") {
      payload["query"] = query;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "x-sdk-graphql": "true",
      "content-type": "application/json"
    };
    return this.client.call("post", uri, apiHeaders, payload);
  }
};
var Locale = class {
  constructor(client) {
    this.client = client;
  }
  /**
       * Get the current user location based on IP. Returns an object with user country code, country name, continent name, continent code, ip address and suggested currency. You can use the locale header to get the data in a supported language.
  
  ([IP Geolocation by DB-IP](https://db-ip.com))
       *
       * @throws {AppwriteException}
       * @returns {Promise<Models.Locale>}
       */
  get() {
    const apiPath = "/locale";
    const payload = {};
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {};
    return this.client.call("get", uri, apiHeaders, payload);
  }
  /**
   * List of all locale codes in [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes).
   *
   * @throws {AppwriteException}
   * @returns {Promise<Models.LocaleCodeList>}
   */
  listCodes() {
    const apiPath = "/locale/codes";
    const payload = {};
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {};
    return this.client.call("get", uri, apiHeaders, payload);
  }
  /**
   * List of all continents. You can use the locale header to get the data in a supported language.
   *
   * @throws {AppwriteException}
   * @returns {Promise<Models.ContinentList>}
   */
  listContinents() {
    const apiPath = "/locale/continents";
    const payload = {};
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {};
    return this.client.call("get", uri, apiHeaders, payload);
  }
  /**
   * List of all countries. You can use the locale header to get the data in a supported language.
   *
   * @throws {AppwriteException}
   * @returns {Promise<Models.CountryList>}
   */
  listCountries() {
    const apiPath = "/locale/countries";
    const payload = {};
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {};
    return this.client.call("get", uri, apiHeaders, payload);
  }
  /**
   * List of all countries that are currently members of the EU. You can use the locale header to get the data in a supported language.
   *
   * @throws {AppwriteException}
   * @returns {Promise<Models.CountryList>}
   */
  listCountriesEU() {
    const apiPath = "/locale/countries/eu";
    const payload = {};
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {};
    return this.client.call("get", uri, apiHeaders, payload);
  }
  /**
   * List of all countries phone codes. You can use the locale header to get the data in a supported language.
   *
   * @throws {AppwriteException}
   * @returns {Promise<Models.PhoneList>}
   */
  listCountriesPhones() {
    const apiPath = "/locale/countries/phones";
    const payload = {};
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {};
    return this.client.call("get", uri, apiHeaders, payload);
  }
  /**
   * List of all currencies, including currency symbol, name, plural, and decimal digits for all major and minor currencies. You can use the locale header to get the data in a supported language.
   *
   * @throws {AppwriteException}
   * @returns {Promise<Models.CurrencyList>}
   */
  listCurrencies() {
    const apiPath = "/locale/currencies";
    const payload = {};
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {};
    return this.client.call("get", uri, apiHeaders, payload);
  }
  /**
   * List of all languages classified by ISO 639-1 including 2-letter code, name in English, and name in the respective language.
   *
   * @throws {AppwriteException}
   * @returns {Promise<Models.LanguageList>}
   */
  listLanguages() {
    const apiPath = "/locale/languages";
    const payload = {};
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {};
    return this.client.call("get", uri, apiHeaders, payload);
  }
};
var Messaging = class {
  constructor(client) {
    this.client = client;
  }
  /**
   * Create a new subscriber.
   *
   * @param {string} topicId
   * @param {string} subscriberId
   * @param {string} targetId
   * @throws {AppwriteException}
   * @returns {Promise<Models.Subscriber>}
   */
  createSubscriber(topicId, subscriberId, targetId) {
    if (typeof topicId === "undefined") {
      throw new AppwriteException('Missing required parameter: "topicId"');
    }
    if (typeof subscriberId === "undefined") {
      throw new AppwriteException('Missing required parameter: "subscriberId"');
    }
    if (typeof targetId === "undefined") {
      throw new AppwriteException('Missing required parameter: "targetId"');
    }
    const apiPath = "/messaging/topics/{topicId}/subscribers".replace("{topicId}", topicId);
    const payload = {};
    if (typeof subscriberId !== "undefined") {
      payload["subscriberId"] = subscriberId;
    }
    if (typeof targetId !== "undefined") {
      payload["targetId"] = targetId;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "application/json"
    };
    return this.client.call("post", uri, apiHeaders, payload);
  }
  /**
   * Delete a subscriber by its unique ID.
   *
   * @param {string} topicId
   * @param {string} subscriberId
   * @throws {AppwriteException}
   * @returns {Promise<{}>}
   */
  deleteSubscriber(topicId, subscriberId) {
    if (typeof topicId === "undefined") {
      throw new AppwriteException('Missing required parameter: "topicId"');
    }
    if (typeof subscriberId === "undefined") {
      throw new AppwriteException('Missing required parameter: "subscriberId"');
    }
    const apiPath = "/messaging/topics/{topicId}/subscribers/{subscriberId}".replace("{topicId}", topicId).replace("{subscriberId}", subscriberId);
    const payload = {};
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "application/json"
    };
    return this.client.call("delete", uri, apiHeaders, payload);
  }
};
var Storage = class {
  constructor(client) {
    this.client = client;
  }
  /**
   * Get a list of all the user files. You can use the query params to filter your results.
   *
   * @param {string} bucketId
   * @param {string[]} queries
   * @param {string} search
   * @throws {AppwriteException}
   * @returns {Promise<Models.FileList>}
   */
  listFiles(bucketId, queries, search) {
    if (typeof bucketId === "undefined") {
      throw new AppwriteException('Missing required parameter: "bucketId"');
    }
    const apiPath = "/storage/buckets/{bucketId}/files".replace("{bucketId}", bucketId);
    const payload = {};
    if (typeof queries !== "undefined") {
      payload["queries"] = queries;
    }
    if (typeof search !== "undefined") {
      payload["search"] = search;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {};
    return this.client.call("get", uri, apiHeaders, payload);
  }
  /**
       * Create a new file. Before using this route, you should create a new bucket resource using either a [server integration](https://appwrite.io/docs/server/storage#storageCreateBucket) API or directly from your Appwrite console.
  
  Larger files should be uploaded using multiple requests with the [content-range](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Range) header to send a partial request with a maximum supported chunk of `5MB`. The `content-range` header values should always be in bytes.
  
  When the first request is sent, the server will return the **File** object, and the subsequent part request must include the file&#039;s **id** in `x-appwrite-id` header to allow the server to know that the partial upload is for the existing file and not for a new one.
  
  If you&#039;re creating a new file using one of the Appwrite SDKs, all the chunking logic will be managed by the SDK internally.
  
       *
       * @param {string} bucketId
       * @param {string} fileId
       * @param {File} file
       * @param {string[]} permissions
       * @throws {AppwriteException}
       * @returns {Promise<Models.File>}
       */
  createFile(bucketId, fileId, file, permissions, onProgress = (progress) => {
  }) {
    if (typeof bucketId === "undefined") {
      throw new AppwriteException('Missing required parameter: "bucketId"');
    }
    if (typeof fileId === "undefined") {
      throw new AppwriteException('Missing required parameter: "fileId"');
    }
    if (typeof file === "undefined") {
      throw new AppwriteException('Missing required parameter: "file"');
    }
    const apiPath = "/storage/buckets/{bucketId}/files".replace("{bucketId}", bucketId);
    const payload = {};
    if (typeof fileId !== "undefined") {
      payload["fileId"] = fileId;
    }
    if (typeof file !== "undefined") {
      payload["file"] = file;
    }
    if (typeof permissions !== "undefined") {
      payload["permissions"] = permissions;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "multipart/form-data"
    };
    return this.client.chunkedUpload("post", uri, apiHeaders, payload, onProgress);
  }
  /**
   * Get a file by its unique ID. This endpoint response returns a JSON object with the file metadata.
   *
   * @param {string} bucketId
   * @param {string} fileId
   * @throws {AppwriteException}
   * @returns {Promise<Models.File>}
   */
  getFile(bucketId, fileId) {
    if (typeof bucketId === "undefined") {
      throw new AppwriteException('Missing required parameter: "bucketId"');
    }
    if (typeof fileId === "undefined") {
      throw new AppwriteException('Missing required parameter: "fileId"');
    }
    const apiPath = "/storage/buckets/{bucketId}/files/{fileId}".replace("{bucketId}", bucketId).replace("{fileId}", fileId);
    const payload = {};
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {};
    return this.client.call("get", uri, apiHeaders, payload);
  }
  /**
   * Update a file by its unique ID. Only users with write permissions have access to update this resource.
   *
   * @param {string} bucketId
   * @param {string} fileId
   * @param {string} name
   * @param {string[]} permissions
   * @throws {AppwriteException}
   * @returns {Promise<Models.File>}
   */
  updateFile(bucketId, fileId, name, permissions) {
    if (typeof bucketId === "undefined") {
      throw new AppwriteException('Missing required parameter: "bucketId"');
    }
    if (typeof fileId === "undefined") {
      throw new AppwriteException('Missing required parameter: "fileId"');
    }
    const apiPath = "/storage/buckets/{bucketId}/files/{fileId}".replace("{bucketId}", bucketId).replace("{fileId}", fileId);
    const payload = {};
    if (typeof name !== "undefined") {
      payload["name"] = name;
    }
    if (typeof permissions !== "undefined") {
      payload["permissions"] = permissions;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "application/json"
    };
    return this.client.call("put", uri, apiHeaders, payload);
  }
  /**
   * Delete a file by its unique ID. Only users with write permissions have access to delete this resource.
   *
   * @param {string} bucketId
   * @param {string} fileId
   * @throws {AppwriteException}
   * @returns {Promise<{}>}
   */
  deleteFile(bucketId, fileId) {
    if (typeof bucketId === "undefined") {
      throw new AppwriteException('Missing required parameter: "bucketId"');
    }
    if (typeof fileId === "undefined") {
      throw new AppwriteException('Missing required parameter: "fileId"');
    }
    const apiPath = "/storage/buckets/{bucketId}/files/{fileId}".replace("{bucketId}", bucketId).replace("{fileId}", fileId);
    const payload = {};
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "application/json"
    };
    return this.client.call("delete", uri, apiHeaders, payload);
  }
  /**
   * Get a file content by its unique ID. The endpoint response return with a &#039;Content-Disposition: attachment&#039; header that tells the browser to start downloading the file to user downloads directory.
   *
   * @param {string} bucketId
   * @param {string} fileId
   * @param {string} token
   * @throws {AppwriteException}
   * @returns {string}
   */
  getFileDownload(bucketId, fileId, token) {
    if (typeof bucketId === "undefined") {
      throw new AppwriteException('Missing required parameter: "bucketId"');
    }
    if (typeof fileId === "undefined") {
      throw new AppwriteException('Missing required parameter: "fileId"');
    }
    const apiPath = "/storage/buckets/{bucketId}/files/{fileId}/download".replace("{bucketId}", bucketId).replace("{fileId}", fileId);
    const payload = {};
    if (typeof token !== "undefined") {
      payload["token"] = token;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    payload["project"] = this.client.config.project;
    for (const [key, value] of Object.entries(Service.flatten(payload))) {
      uri.searchParams.append(key, value);
    }
    return uri.toString();
  }
  /**
   * Get a file preview image. Currently, this method supports preview for image files (jpg, png, and gif), other supported formats, like pdf, docs, slides, and spreadsheets, will return the file icon image. You can also pass query string arguments for cutting and resizing your preview image. Preview is supported only for image files smaller than 10MB.
   *
   * @param {string} bucketId
   * @param {string} fileId
   * @param {number} width
   * @param {number} height
   * @param {ImageGravity} gravity
   * @param {number} quality
   * @param {number} borderWidth
   * @param {string} borderColor
   * @param {number} borderRadius
   * @param {number} opacity
   * @param {number} rotation
   * @param {string} background
   * @param {ImageFormat} output
   * @param {string} token
   * @throws {AppwriteException}
   * @returns {string}
   */
  getFilePreview(bucketId, fileId, width, height, gravity, quality, borderWidth, borderColor, borderRadius, opacity, rotation, background, output, token) {
    if (typeof bucketId === "undefined") {
      throw new AppwriteException('Missing required parameter: "bucketId"');
    }
    if (typeof fileId === "undefined") {
      throw new AppwriteException('Missing required parameter: "fileId"');
    }
    const apiPath = "/storage/buckets/{bucketId}/files/{fileId}/preview".replace("{bucketId}", bucketId).replace("{fileId}", fileId);
    const payload = {};
    if (typeof width !== "undefined") {
      payload["width"] = width;
    }
    if (typeof height !== "undefined") {
      payload["height"] = height;
    }
    if (typeof gravity !== "undefined") {
      payload["gravity"] = gravity;
    }
    if (typeof quality !== "undefined") {
      payload["quality"] = quality;
    }
    if (typeof borderWidth !== "undefined") {
      payload["borderWidth"] = borderWidth;
    }
    if (typeof borderColor !== "undefined") {
      payload["borderColor"] = borderColor;
    }
    if (typeof borderRadius !== "undefined") {
      payload["borderRadius"] = borderRadius;
    }
    if (typeof opacity !== "undefined") {
      payload["opacity"] = opacity;
    }
    if (typeof rotation !== "undefined") {
      payload["rotation"] = rotation;
    }
    if (typeof background !== "undefined") {
      payload["background"] = background;
    }
    if (typeof output !== "undefined") {
      payload["output"] = output;
    }
    if (typeof token !== "undefined") {
      payload["token"] = token;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    payload["project"] = this.client.config.project;
    for (const [key, value] of Object.entries(Service.flatten(payload))) {
      uri.searchParams.append(key, value);
    }
    return uri.toString();
  }
  /**
   * Get a file content by its unique ID. This endpoint is similar to the download method but returns with no  &#039;Content-Disposition: attachment&#039; header.
   *
   * @param {string} bucketId
   * @param {string} fileId
   * @param {string} token
   * @throws {AppwriteException}
   * @returns {string}
   */
  getFileView(bucketId, fileId, token) {
    if (typeof bucketId === "undefined") {
      throw new AppwriteException('Missing required parameter: "bucketId"');
    }
    if (typeof fileId === "undefined") {
      throw new AppwriteException('Missing required parameter: "fileId"');
    }
    const apiPath = "/storage/buckets/{bucketId}/files/{fileId}/view".replace("{bucketId}", bucketId).replace("{fileId}", fileId);
    const payload = {};
    if (typeof token !== "undefined") {
      payload["token"] = token;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    payload["project"] = this.client.config.project;
    for (const [key, value] of Object.entries(Service.flatten(payload))) {
      uri.searchParams.append(key, value);
    }
    return uri.toString();
  }
};
var Teams = class {
  constructor(client) {
    this.client = client;
  }
  /**
   * Get a list of all the teams in which the current user is a member. You can use the parameters to filter your results.
   *
   * @param {string[]} queries
   * @param {string} search
   * @throws {AppwriteException}
   * @returns {Promise<Models.TeamList<Preferences>>}
   */
  list(queries, search) {
    const apiPath = "/teams";
    const payload = {};
    if (typeof queries !== "undefined") {
      payload["queries"] = queries;
    }
    if (typeof search !== "undefined") {
      payload["search"] = search;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {};
    return this.client.call("get", uri, apiHeaders, payload);
  }
  /**
   * Create a new team. The user who creates the team will automatically be assigned as the owner of the team. Only the users with the owner role can invite new members, add new owners and delete or update the team.
   *
   * @param {string} teamId
   * @param {string} name
   * @param {string[]} roles
   * @throws {AppwriteException}
   * @returns {Promise<Models.Team<Preferences>>}
   */
  create(teamId, name, roles) {
    if (typeof teamId === "undefined") {
      throw new AppwriteException('Missing required parameter: "teamId"');
    }
    if (typeof name === "undefined") {
      throw new AppwriteException('Missing required parameter: "name"');
    }
    const apiPath = "/teams";
    const payload = {};
    if (typeof teamId !== "undefined") {
      payload["teamId"] = teamId;
    }
    if (typeof name !== "undefined") {
      payload["name"] = name;
    }
    if (typeof roles !== "undefined") {
      payload["roles"] = roles;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "application/json"
    };
    return this.client.call("post", uri, apiHeaders, payload);
  }
  /**
   * Get a team by its ID. All team members have read access for this resource.
   *
   * @param {string} teamId
   * @throws {AppwriteException}
   * @returns {Promise<Models.Team<Preferences>>}
   */
  get(teamId) {
    if (typeof teamId === "undefined") {
      throw new AppwriteException('Missing required parameter: "teamId"');
    }
    const apiPath = "/teams/{teamId}".replace("{teamId}", teamId);
    const payload = {};
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {};
    return this.client.call("get", uri, apiHeaders, payload);
  }
  /**
   * Update the team&#039;s name by its unique ID.
   *
   * @param {string} teamId
   * @param {string} name
   * @throws {AppwriteException}
   * @returns {Promise<Models.Team<Preferences>>}
   */
  updateName(teamId, name) {
    if (typeof teamId === "undefined") {
      throw new AppwriteException('Missing required parameter: "teamId"');
    }
    if (typeof name === "undefined") {
      throw new AppwriteException('Missing required parameter: "name"');
    }
    const apiPath = "/teams/{teamId}".replace("{teamId}", teamId);
    const payload = {};
    if (typeof name !== "undefined") {
      payload["name"] = name;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "application/json"
    };
    return this.client.call("put", uri, apiHeaders, payload);
  }
  /**
   * Delete a team using its ID. Only team members with the owner role can delete the team.
   *
   * @param {string} teamId
   * @throws {AppwriteException}
   * @returns {Promise<{}>}
   */
  delete(teamId) {
    if (typeof teamId === "undefined") {
      throw new AppwriteException('Missing required parameter: "teamId"');
    }
    const apiPath = "/teams/{teamId}".replace("{teamId}", teamId);
    const payload = {};
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "application/json"
    };
    return this.client.call("delete", uri, apiHeaders, payload);
  }
  /**
   * Use this endpoint to list a team&#039;s members using the team&#039;s ID. All team members have read access to this endpoint. Hide sensitive attributes from the response by toggling membership privacy in the Console.
   *
   * @param {string} teamId
   * @param {string[]} queries
   * @param {string} search
   * @throws {AppwriteException}
   * @returns {Promise<Models.MembershipList>}
   */
  listMemberships(teamId, queries, search) {
    if (typeof teamId === "undefined") {
      throw new AppwriteException('Missing required parameter: "teamId"');
    }
    const apiPath = "/teams/{teamId}/memberships".replace("{teamId}", teamId);
    const payload = {};
    if (typeof queries !== "undefined") {
      payload["queries"] = queries;
    }
    if (typeof search !== "undefined") {
      payload["search"] = search;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {};
    return this.client.call("get", uri, apiHeaders, payload);
  }
  /**
       * Invite a new member to join your team. Provide an ID for existing users, or invite unregistered users using an email or phone number. If initiated from a Client SDK, Appwrite will send an email or sms with a link to join the team to the invited user, and an account will be created for them if one doesn&#039;t exist. If initiated from a Server SDK, the new member will be added automatically to the team.
  
  You only need to provide one of a user ID, email, or phone number. Appwrite will prioritize accepting the user ID &gt; email &gt; phone number if you provide more than one of these parameters.
  
  Use the `url` parameter to redirect the user from the invitation email to your app. After the user is redirected, use the [Update Team Membership Status](https://appwrite.io/docs/references/cloud/client-web/teams#updateMembershipStatus) endpoint to allow the user to accept the invitation to the team.
  
  Please note that to avoid a [Redirect Attack](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.md) Appwrite will accept the only redirect URLs under the domains you have added as a platform on the Appwrite Console.
  
       *
       * @param {string} teamId
       * @param {string[]} roles
       * @param {string} email
       * @param {string} userId
       * @param {string} phone
       * @param {string} url
       * @param {string} name
       * @throws {AppwriteException}
       * @returns {Promise<Models.Membership>}
       */
  createMembership(teamId, roles, email, userId, phone, url, name) {
    if (typeof teamId === "undefined") {
      throw new AppwriteException('Missing required parameter: "teamId"');
    }
    if (typeof roles === "undefined") {
      throw new AppwriteException('Missing required parameter: "roles"');
    }
    const apiPath = "/teams/{teamId}/memberships".replace("{teamId}", teamId);
    const payload = {};
    if (typeof email !== "undefined") {
      payload["email"] = email;
    }
    if (typeof userId !== "undefined") {
      payload["userId"] = userId;
    }
    if (typeof phone !== "undefined") {
      payload["phone"] = phone;
    }
    if (typeof roles !== "undefined") {
      payload["roles"] = roles;
    }
    if (typeof url !== "undefined") {
      payload["url"] = url;
    }
    if (typeof name !== "undefined") {
      payload["name"] = name;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "application/json"
    };
    return this.client.call("post", uri, apiHeaders, payload);
  }
  /**
   * Get a team member by the membership unique id. All team members have read access for this resource. Hide sensitive attributes from the response by toggling membership privacy in the Console.
   *
   * @param {string} teamId
   * @param {string} membershipId
   * @throws {AppwriteException}
   * @returns {Promise<Models.Membership>}
   */
  getMembership(teamId, membershipId) {
    if (typeof teamId === "undefined") {
      throw new AppwriteException('Missing required parameter: "teamId"');
    }
    if (typeof membershipId === "undefined") {
      throw new AppwriteException('Missing required parameter: "membershipId"');
    }
    const apiPath = "/teams/{teamId}/memberships/{membershipId}".replace("{teamId}", teamId).replace("{membershipId}", membershipId);
    const payload = {};
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {};
    return this.client.call("get", uri, apiHeaders, payload);
  }
  /**
       * Modify the roles of a team member. Only team members with the owner role have access to this endpoint. Learn more about [roles and permissions](https://appwrite.io/docs/permissions).
  
       *
       * @param {string} teamId
       * @param {string} membershipId
       * @param {string[]} roles
       * @throws {AppwriteException}
       * @returns {Promise<Models.Membership>}
       */
  updateMembership(teamId, membershipId, roles) {
    if (typeof teamId === "undefined") {
      throw new AppwriteException('Missing required parameter: "teamId"');
    }
    if (typeof membershipId === "undefined") {
      throw new AppwriteException('Missing required parameter: "membershipId"');
    }
    if (typeof roles === "undefined") {
      throw new AppwriteException('Missing required parameter: "roles"');
    }
    const apiPath = "/teams/{teamId}/memberships/{membershipId}".replace("{teamId}", teamId).replace("{membershipId}", membershipId);
    const payload = {};
    if (typeof roles !== "undefined") {
      payload["roles"] = roles;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "application/json"
    };
    return this.client.call("patch", uri, apiHeaders, payload);
  }
  /**
   * This endpoint allows a user to leave a team or for a team owner to delete the membership of any other team member. You can also use this endpoint to delete a user membership even if it is not accepted.
   *
   * @param {string} teamId
   * @param {string} membershipId
   * @throws {AppwriteException}
   * @returns {Promise<{}>}
   */
  deleteMembership(teamId, membershipId) {
    if (typeof teamId === "undefined") {
      throw new AppwriteException('Missing required parameter: "teamId"');
    }
    if (typeof membershipId === "undefined") {
      throw new AppwriteException('Missing required parameter: "membershipId"');
    }
    const apiPath = "/teams/{teamId}/memberships/{membershipId}".replace("{teamId}", teamId).replace("{membershipId}", membershipId);
    const payload = {};
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "application/json"
    };
    return this.client.call("delete", uri, apiHeaders, payload);
  }
  /**
       * Use this endpoint to allow a user to accept an invitation to join a team after being redirected back to your app from the invitation email received by the user.
  
  If the request is successful, a session for the user is automatically created.
  
       *
       * @param {string} teamId
       * @param {string} membershipId
       * @param {string} userId
       * @param {string} secret
       * @throws {AppwriteException}
       * @returns {Promise<Models.Membership>}
       */
  updateMembershipStatus(teamId, membershipId, userId, secret) {
    if (typeof teamId === "undefined") {
      throw new AppwriteException('Missing required parameter: "teamId"');
    }
    if (typeof membershipId === "undefined") {
      throw new AppwriteException('Missing required parameter: "membershipId"');
    }
    if (typeof userId === "undefined") {
      throw new AppwriteException('Missing required parameter: "userId"');
    }
    if (typeof secret === "undefined") {
      throw new AppwriteException('Missing required parameter: "secret"');
    }
    const apiPath = "/teams/{teamId}/memberships/{membershipId}/status".replace("{teamId}", teamId).replace("{membershipId}", membershipId);
    const payload = {};
    if (typeof userId !== "undefined") {
      payload["userId"] = userId;
    }
    if (typeof secret !== "undefined") {
      payload["secret"] = secret;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "application/json"
    };
    return this.client.call("patch", uri, apiHeaders, payload);
  }
  /**
   * Get the team&#039;s shared preferences by its unique ID. If a preference doesn&#039;t need to be shared by all team members, prefer storing them in [user preferences](https://appwrite.io/docs/references/cloud/client-web/account#getPrefs).
   *
   * @param {string} teamId
   * @throws {AppwriteException}
   * @returns {Promise<Preferences>}
   */
  getPrefs(teamId) {
    if (typeof teamId === "undefined") {
      throw new AppwriteException('Missing required parameter: "teamId"');
    }
    const apiPath = "/teams/{teamId}/prefs".replace("{teamId}", teamId);
    const payload = {};
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {};
    return this.client.call("get", uri, apiHeaders, payload);
  }
  /**
   * Update the team&#039;s preferences by its unique ID. The object you pass is stored as is and replaces any previous value. The maximum allowed prefs size is 64kB and throws an error if exceeded.
   *
   * @param {string} teamId
   * @param {object} prefs
   * @throws {AppwriteException}
   * @returns {Promise<Preferences>}
   */
  updatePrefs(teamId, prefs) {
    if (typeof teamId === "undefined") {
      throw new AppwriteException('Missing required parameter: "teamId"');
    }
    if (typeof prefs === "undefined") {
      throw new AppwriteException('Missing required parameter: "prefs"');
    }
    const apiPath = "/teams/{teamId}/prefs".replace("{teamId}", teamId);
    const payload = {};
    if (typeof prefs !== "undefined") {
      payload["prefs"] = prefs;
    }
    const uri = new URL(this.client.config.endpoint + apiPath);
    const apiHeaders = {
      "content-type": "application/json"
    };
    return this.client.call("put", uri, apiHeaders, payload);
  }
};
var Permission = class {
};
Permission.read = (role) => {
  return `read("${role}")`;
};
Permission.write = (role) => {
  return `write("${role}")`;
};
Permission.create = (role) => {
  return `create("${role}")`;
};
Permission.update = (role) => {
  return `update("${role}")`;
};
Permission.delete = (role) => {
  return `delete("${role}")`;
};
var Role = class {
  /**
   * Grants access to anyone.
   *
   * This includes authenticated and unauthenticated users.
   *
   * @returns {string}
   */
  static any() {
    return "any";
  }
  /**
   * Grants access to a specific user by user ID.
   *
   * You can optionally pass verified or unverified for
   * `status` to target specific types of users.
   *
   * @param {string} id
   * @param {string} status
   * @returns {string}
   */
  static user(id, status = "") {
    if (status === "") {
      return `user:${id}`;
    }
    return `user:${id}/${status}`;
  }
  /**
   * Grants access to any authenticated or anonymous user.
   *
   * You can optionally pass verified or unverified for
   * `status` to target specific types of users.
   *
   * @param {string} status
   * @returns {string}
   */
  static users(status = "") {
    if (status === "") {
      return "users";
    }
    return `users/${status}`;
  }
  /**
   * Grants access to any guest user without a session.
   *
   * Authenticated users don't have access to this role.
   *
   * @returns {string}
   */
  static guests() {
    return "guests";
  }
  /**
   * Grants access to a team by team ID.
   *
   * You can optionally pass a role for `role` to target
   * team members with the specified role.
   *
   * @param {string} id
   * @param {string} role
   * @returns {string}
   */
  static team(id, role = "") {
    if (role === "") {
      return `team:${id}`;
    }
    return `team:${id}/${role}`;
  }
  /**
   * Grants access to a specific member of a team.
   *
   * When the member is removed from the team, they will
   * no longer have access.
   *
   * @param {string} id
   * @returns {string}
   */
  static member(id) {
    return `member:${id}`;
  }
  /**
   * Grants access to a user with the specified label.
   *
   * @param {string} name
   * @returns  {string}
   */
  static label(name) {
    return `label:${name}`;
  }
};
var _a;
var _ID_hexTimestamp;
var ID = class _ID {
  /**
   * Uses the provided ID as the ID for the resource.
   *
   * @param {string} id
   * @returns {string}
   */
  static custom(id) {
    return id;
  }
  /**
   * Have Appwrite generate a unique ID for you.
   *
   * @param {number} padding. Default is 7.
   * @returns {string}
   */
  static unique(padding = 7) {
    const baseId = __classPrivateFieldGet(_ID, _a, "m", _ID_hexTimestamp).call(_ID);
    let randomPadding = "";
    for (let i = 0; i < padding; i++) {
      const randomHexDigit = Math.floor(Math.random() * 16).toString(16);
      randomPadding += randomHexDigit;
    }
    return baseId + randomPadding;
  }
};
_a = ID, _ID_hexTimestamp = function _ID_hexTimestamp2() {
  const now = /* @__PURE__ */ new Date();
  const sec = Math.floor(now.getTime() / 1e3);
  const msec = now.getMilliseconds();
  const hexTimestamp = sec.toString(16) + msec.toString(16).padStart(5, "0");
  return hexTimestamp;
};
var AuthenticatorType;
(function(AuthenticatorType2) {
  AuthenticatorType2["Totp"] = "totp";
})(AuthenticatorType || (AuthenticatorType = {}));
var AuthenticationFactor;
(function(AuthenticationFactor2) {
  AuthenticationFactor2["Email"] = "email";
  AuthenticationFactor2["Phone"] = "phone";
  AuthenticationFactor2["Totp"] = "totp";
  AuthenticationFactor2["Recoverycode"] = "recoverycode";
})(AuthenticationFactor || (AuthenticationFactor = {}));
var OAuthProvider;
(function(OAuthProvider2) {
  OAuthProvider2["Amazon"] = "amazon";
  OAuthProvider2["Apple"] = "apple";
  OAuthProvider2["Auth0"] = "auth0";
  OAuthProvider2["Authentik"] = "authentik";
  OAuthProvider2["Autodesk"] = "autodesk";
  OAuthProvider2["Bitbucket"] = "bitbucket";
  OAuthProvider2["Bitly"] = "bitly";
  OAuthProvider2["Box"] = "box";
  OAuthProvider2["Dailymotion"] = "dailymotion";
  OAuthProvider2["Discord"] = "discord";
  OAuthProvider2["Disqus"] = "disqus";
  OAuthProvider2["Dropbox"] = "dropbox";
  OAuthProvider2["Etsy"] = "etsy";
  OAuthProvider2["Facebook"] = "facebook";
  OAuthProvider2["Figma"] = "figma";
  OAuthProvider2["Github"] = "github";
  OAuthProvider2["Gitlab"] = "gitlab";
  OAuthProvider2["Google"] = "google";
  OAuthProvider2["Linkedin"] = "linkedin";
  OAuthProvider2["Microsoft"] = "microsoft";
  OAuthProvider2["Notion"] = "notion";
  OAuthProvider2["Oidc"] = "oidc";
  OAuthProvider2["Okta"] = "okta";
  OAuthProvider2["Paypal"] = "paypal";
  OAuthProvider2["PaypalSandbox"] = "paypalSandbox";
  OAuthProvider2["Podio"] = "podio";
  OAuthProvider2["Salesforce"] = "salesforce";
  OAuthProvider2["Slack"] = "slack";
  OAuthProvider2["Spotify"] = "spotify";
  OAuthProvider2["Stripe"] = "stripe";
  OAuthProvider2["Tradeshift"] = "tradeshift";
  OAuthProvider2["TradeshiftBox"] = "tradeshiftBox";
  OAuthProvider2["Twitch"] = "twitch";
  OAuthProvider2["Wordpress"] = "wordpress";
  OAuthProvider2["Yahoo"] = "yahoo";
  OAuthProvider2["Yammer"] = "yammer";
  OAuthProvider2["Yandex"] = "yandex";
  OAuthProvider2["Zoho"] = "zoho";
  OAuthProvider2["Zoom"] = "zoom";
  OAuthProvider2["Mock"] = "mock";
})(OAuthProvider || (OAuthProvider = {}));
var Browser;
(function(Browser2) {
  Browser2["AvantBrowser"] = "aa";
  Browser2["AndroidWebViewBeta"] = "an";
  Browser2["GoogleChrome"] = "ch";
  Browser2["GoogleChromeIOS"] = "ci";
  Browser2["GoogleChromeMobile"] = "cm";
  Browser2["Chromium"] = "cr";
  Browser2["MozillaFirefox"] = "ff";
  Browser2["Safari"] = "sf";
  Browser2["MobileSafari"] = "mf";
  Browser2["MicrosoftEdge"] = "ps";
  Browser2["MicrosoftEdgeIOS"] = "oi";
  Browser2["OperaMini"] = "om";
  Browser2["Opera"] = "op";
  Browser2["OperaNext"] = "on";
})(Browser || (Browser = {}));
var CreditCard;
(function(CreditCard2) {
  CreditCard2["AmericanExpress"] = "amex";
  CreditCard2["Argencard"] = "argencard";
  CreditCard2["Cabal"] = "cabal";
  CreditCard2["Cencosud"] = "cencosud";
  CreditCard2["DinersClub"] = "diners";
  CreditCard2["Discover"] = "discover";
  CreditCard2["Elo"] = "elo";
  CreditCard2["Hipercard"] = "hipercard";
  CreditCard2["JCB"] = "jcb";
  CreditCard2["Mastercard"] = "mastercard";
  CreditCard2["Naranja"] = "naranja";
  CreditCard2["TarjetaShopping"] = "targeta-shopping";
  CreditCard2["UnionChinaPay"] = "union-china-pay";
  CreditCard2["Visa"] = "visa";
  CreditCard2["MIR"] = "mir";
  CreditCard2["Maestro"] = "maestro";
  CreditCard2["Rupay"] = "rupay";
})(CreditCard || (CreditCard = {}));
var Flag;
(function(Flag2) {
  Flag2["Afghanistan"] = "af";
  Flag2["Angola"] = "ao";
  Flag2["Albania"] = "al";
  Flag2["Andorra"] = "ad";
  Flag2["UnitedArabEmirates"] = "ae";
  Flag2["Argentina"] = "ar";
  Flag2["Armenia"] = "am";
  Flag2["AntiguaAndBarbuda"] = "ag";
  Flag2["Australia"] = "au";
  Flag2["Austria"] = "at";
  Flag2["Azerbaijan"] = "az";
  Flag2["Burundi"] = "bi";
  Flag2["Belgium"] = "be";
  Flag2["Benin"] = "bj";
  Flag2["BurkinaFaso"] = "bf";
  Flag2["Bangladesh"] = "bd";
  Flag2["Bulgaria"] = "bg";
  Flag2["Bahrain"] = "bh";
  Flag2["Bahamas"] = "bs";
  Flag2["BosniaAndHerzegovina"] = "ba";
  Flag2["Belarus"] = "by";
  Flag2["Belize"] = "bz";
  Flag2["Bolivia"] = "bo";
  Flag2["Brazil"] = "br";
  Flag2["Barbados"] = "bb";
  Flag2["BruneiDarussalam"] = "bn";
  Flag2["Bhutan"] = "bt";
  Flag2["Botswana"] = "bw";
  Flag2["CentralAfricanRepublic"] = "cf";
  Flag2["Canada"] = "ca";
  Flag2["Switzerland"] = "ch";
  Flag2["Chile"] = "cl";
  Flag2["China"] = "cn";
  Flag2["CoteDIvoire"] = "ci";
  Flag2["Cameroon"] = "cm";
  Flag2["DemocraticRepublicOfTheCongo"] = "cd";
  Flag2["RepublicOfTheCongo"] = "cg";
  Flag2["Colombia"] = "co";
  Flag2["Comoros"] = "km";
  Flag2["CapeVerde"] = "cv";
  Flag2["CostaRica"] = "cr";
  Flag2["Cuba"] = "cu";
  Flag2["Cyprus"] = "cy";
  Flag2["CzechRepublic"] = "cz";
  Flag2["Germany"] = "de";
  Flag2["Djibouti"] = "dj";
  Flag2["Dominica"] = "dm";
  Flag2["Denmark"] = "dk";
  Flag2["DominicanRepublic"] = "do";
  Flag2["Algeria"] = "dz";
  Flag2["Ecuador"] = "ec";
  Flag2["Egypt"] = "eg";
  Flag2["Eritrea"] = "er";
  Flag2["Spain"] = "es";
  Flag2["Estonia"] = "ee";
  Flag2["Ethiopia"] = "et";
  Flag2["Finland"] = "fi";
  Flag2["Fiji"] = "fj";
  Flag2["France"] = "fr";
  Flag2["MicronesiaFederatedStatesOf"] = "fm";
  Flag2["Gabon"] = "ga";
  Flag2["UnitedKingdom"] = "gb";
  Flag2["Georgia"] = "ge";
  Flag2["Ghana"] = "gh";
  Flag2["Guinea"] = "gn";
  Flag2["Gambia"] = "gm";
  Flag2["GuineaBissau"] = "gw";
  Flag2["EquatorialGuinea"] = "gq";
  Flag2["Greece"] = "gr";
  Flag2["Grenada"] = "gd";
  Flag2["Guatemala"] = "gt";
  Flag2["Guyana"] = "gy";
  Flag2["Honduras"] = "hn";
  Flag2["Croatia"] = "hr";
  Flag2["Haiti"] = "ht";
  Flag2["Hungary"] = "hu";
  Flag2["Indonesia"] = "id";
  Flag2["India"] = "in";
  Flag2["Ireland"] = "ie";
  Flag2["IranIslamicRepublicOf"] = "ir";
  Flag2["Iraq"] = "iq";
  Flag2["Iceland"] = "is";
  Flag2["Israel"] = "il";
  Flag2["Italy"] = "it";
  Flag2["Jamaica"] = "jm";
  Flag2["Jordan"] = "jo";
  Flag2["Japan"] = "jp";
  Flag2["Kazakhstan"] = "kz";
  Flag2["Kenya"] = "ke";
  Flag2["Kyrgyzstan"] = "kg";
  Flag2["Cambodia"] = "kh";
  Flag2["Kiribati"] = "ki";
  Flag2["SaintKittsAndNevis"] = "kn";
  Flag2["SouthKorea"] = "kr";
  Flag2["Kuwait"] = "kw";
  Flag2["LaoPeopleSDemocraticRepublic"] = "la";
  Flag2["Lebanon"] = "lb";
  Flag2["Liberia"] = "lr";
  Flag2["Libya"] = "ly";
  Flag2["SaintLucia"] = "lc";
  Flag2["Liechtenstein"] = "li";
  Flag2["SriLanka"] = "lk";
  Flag2["Lesotho"] = "ls";
  Flag2["Lithuania"] = "lt";
  Flag2["Luxembourg"] = "lu";
  Flag2["Latvia"] = "lv";
  Flag2["Morocco"] = "ma";
  Flag2["Monaco"] = "mc";
  Flag2["Moldova"] = "md";
  Flag2["Madagascar"] = "mg";
  Flag2["Maldives"] = "mv";
  Flag2["Mexico"] = "mx";
  Flag2["MarshallIslands"] = "mh";
  Flag2["NorthMacedonia"] = "mk";
  Flag2["Mali"] = "ml";
  Flag2["Malta"] = "mt";
  Flag2["Myanmar"] = "mm";
  Flag2["Montenegro"] = "me";
  Flag2["Mongolia"] = "mn";
  Flag2["Mozambique"] = "mz";
  Flag2["Mauritania"] = "mr";
  Flag2["Mauritius"] = "mu";
  Flag2["Malawi"] = "mw";
  Flag2["Malaysia"] = "my";
  Flag2["Namibia"] = "na";
  Flag2["Niger"] = "ne";
  Flag2["Nigeria"] = "ng";
  Flag2["Nicaragua"] = "ni";
  Flag2["Netherlands"] = "nl";
  Flag2["Norway"] = "no";
  Flag2["Nepal"] = "np";
  Flag2["Nauru"] = "nr";
  Flag2["NewZealand"] = "nz";
  Flag2["Oman"] = "om";
  Flag2["Pakistan"] = "pk";
  Flag2["Panama"] = "pa";
  Flag2["Peru"] = "pe";
  Flag2["Philippines"] = "ph";
  Flag2["Palau"] = "pw";
  Flag2["PapuaNewGuinea"] = "pg";
  Flag2["Poland"] = "pl";
  Flag2["FrenchPolynesia"] = "pf";
  Flag2["NorthKorea"] = "kp";
  Flag2["Portugal"] = "pt";
  Flag2["Paraguay"] = "py";
  Flag2["Qatar"] = "qa";
  Flag2["Romania"] = "ro";
  Flag2["Russia"] = "ru";
  Flag2["Rwanda"] = "rw";
  Flag2["SaudiArabia"] = "sa";
  Flag2["Sudan"] = "sd";
  Flag2["Senegal"] = "sn";
  Flag2["Singapore"] = "sg";
  Flag2["SolomonIslands"] = "sb";
  Flag2["SierraLeone"] = "sl";
  Flag2["ElSalvador"] = "sv";
  Flag2["SanMarino"] = "sm";
  Flag2["Somalia"] = "so";
  Flag2["Serbia"] = "rs";
  Flag2["SouthSudan"] = "ss";
  Flag2["SaoTomeAndPrincipe"] = "st";
  Flag2["Suriname"] = "sr";
  Flag2["Slovakia"] = "sk";
  Flag2["Slovenia"] = "si";
  Flag2["Sweden"] = "se";
  Flag2["Eswatini"] = "sz";
  Flag2["Seychelles"] = "sc";
  Flag2["Syria"] = "sy";
  Flag2["Chad"] = "td";
  Flag2["Togo"] = "tg";
  Flag2["Thailand"] = "th";
  Flag2["Tajikistan"] = "tj";
  Flag2["Turkmenistan"] = "tm";
  Flag2["TimorLeste"] = "tl";
  Flag2["Tonga"] = "to";
  Flag2["TrinidadAndTobago"] = "tt";
  Flag2["Tunisia"] = "tn";
  Flag2["Turkey"] = "tr";
  Flag2["Tuvalu"] = "tv";
  Flag2["Tanzania"] = "tz";
  Flag2["Uganda"] = "ug";
  Flag2["Ukraine"] = "ua";
  Flag2["Uruguay"] = "uy";
  Flag2["UnitedStates"] = "us";
  Flag2["Uzbekistan"] = "uz";
  Flag2["VaticanCity"] = "va";
  Flag2["SaintVincentAndTheGrenadines"] = "vc";
  Flag2["Venezuela"] = "ve";
  Flag2["Vietnam"] = "vn";
  Flag2["Vanuatu"] = "vu";
  Flag2["Samoa"] = "ws";
  Flag2["Yemen"] = "ye";
  Flag2["SouthAfrica"] = "za";
  Flag2["Zambia"] = "zm";
  Flag2["Zimbabwe"] = "zw";
})(Flag || (Flag = {}));
var ExecutionMethod;
(function(ExecutionMethod2) {
  ExecutionMethod2["GET"] = "GET";
  ExecutionMethod2["POST"] = "POST";
  ExecutionMethod2["PUT"] = "PUT";
  ExecutionMethod2["PATCH"] = "PATCH";
  ExecutionMethod2["DELETE"] = "DELETE";
  ExecutionMethod2["OPTIONS"] = "OPTIONS";
})(ExecutionMethod || (ExecutionMethod = {}));
var ImageGravity;
(function(ImageGravity2) {
  ImageGravity2["Center"] = "center";
  ImageGravity2["Topleft"] = "top-left";
  ImageGravity2["Top"] = "top";
  ImageGravity2["Topright"] = "top-right";
  ImageGravity2["Left"] = "left";
  ImageGravity2["Right"] = "right";
  ImageGravity2["Bottomleft"] = "bottom-left";
  ImageGravity2["Bottom"] = "bottom";
  ImageGravity2["Bottomright"] = "bottom-right";
})(ImageGravity || (ImageGravity = {}));
var ImageFormat;
(function(ImageFormat2) {
  ImageFormat2["Jpg"] = "jpg";
  ImageFormat2["Jpeg"] = "jpeg";
  ImageFormat2["Png"] = "png";
  ImageFormat2["Webp"] = "webp";
  ImageFormat2["Heic"] = "heic";
  ImageFormat2["Avif"] = "avif";
})(ImageFormat || (ImageFormat = {}));
export {
  Account,
  AppwriteException,
  AuthenticationFactor,
  AuthenticatorType,
  Avatars,
  Browser,
  Client,
  CreditCard,
  Databases,
  ExecutionMethod,
  Flag,
  Functions,
  Graphql,
  ID,
  ImageFormat,
  ImageGravity,
  Locale,
  Messaging,
  OAuthProvider,
  Permission,
  Query,
  Role,
  Storage,
  Teams
};
//# sourceMappingURL=appwrite.js.map
