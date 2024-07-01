class DeviceInfo {
  async collectJavaScriptInfo() {
    return {
      // device_browser_name: this.getBrowserName(),
      // browser_device_operating_system: this.getOperatingSystem(),
      browser_cpu_cores: navigator.hardwareConcurrency || 0,
      browser_gpu_vendor: this.getGpuVendor() || "",
      browser_gpu_engine: this.getGpuEngine() || "",
      browser_battery_charging: await this.isBatteryCharging(),
      browser_battery_level: await this.getBatteryChargeLevel(),
      browser_device_type: this.getCategory(),
      device_operating_system_is_found: this.getIsOperatingSystem(),
      browser_media_devices_count: await this.getMediaDevicesCount(),
      browser_media_devices_list: await this.getMediaDevicesList(),
      browser_do_not_track: this.checkDoNotTrack(),
      // user_agent: navigator.userAgent,
      browser_version: this.getBrowserVersion(),
      device_js_web_sockets: this.checkCapability("WebSocket"),
      device_css_animations:
        this.checkCapability("Animation") ||
        this.checkCapability("WebKitAnimation"),
      device_js_application_cache: "applicationCache" in window,
      device_js_xhr: "XMLHttpRequest" in window,
      device_uri_scheme_sms: "SMS" in window,
      device_js_device_orientation: "DeviceOrientationEvent" in window,
      device_https: window.location.protocol === "https:",
      device_js_web_workers: "Worker" in window,
      device_js_query_selector: "querySelector" in document,
      device_js_json: "JSON" in window,
      device_css_transitions:
        this.checkCapability("Transition") ||
        this.checkCapability("WebKitTransition"),
      device_touch_screen:
        "ontouchstart" in window || navigator.maxTouchPoints > 0,
      device_js_support_event_listener: "addEventListener" in window,
      device_html_audio: this.checkCapability("Audio"),
      device_mobile_device: /Mobi/.test(navigator.userAgent),
      device_image_jpg:
        this.checkCapability("JPEG") || this.checkCapability("JPG"),
      // device_js_local_storage: 'localStorage' in window,
      device_os_version: navigator.oscpu || navigator.appVersion,
      device_is_windows_phone: /Windows Phone/.test(navigator.userAgent),
      device_is_symbian: /Symbian/.test(navigator.userAgent),
      device_uri_scheme_tel: "tel:" in document.createElement("a"),
      device_image_gif87: this.checkCapability("GIF87"),
      device_js_support_events: !!window.EventSource,
      device_is_android: /Android/.test(navigator.userAgent),
      device_image_png: this.checkCapability("PNG"),
      device_html_video: this.checkCapability("Video"),
      device_js_geo_location: "geolocation" in navigator,
      device_html_svg: this.checkCapability("SVG"),
      device_js_touch_events:
        "ontouchstart" in window || navigator.maxTouchPoints > 0,
      device_html_inline_svg: this.checkCapability("inlineSVG"),
      device_js_web_gl: "WebGLRenderingContext" in window,
      device_is_tablet: /Tablet/.test(navigator.userAgent),
      device_os_ios: /iPhone|iPad|iPod/.test(navigator.userAgent),
      device_browser_rendering_engine: this.getRenderingEngine(),
      // device_is_mobile_phone: /Mobile/.test(navigator.userAgent),
      device_js_modify_css: "document" in window && "styleSheets" in document,
      device_js_web_sql_database: "openDatabase" in window,
      device_is_games_console: /playstation|nintendo|xbox/i.test(
        navigator.userAgent
      ),
      device_os_rim: /BlackBerry|BB10/.test(navigator.userAgent),
      device_css_transforms:
        this.checkCapability("Transform") ||
        this.checkCapability("WebKitTransform"),
      // device_html_canvas: this.checkCapability('Canvas'),
      // device_js_session_storage: 'sessionStorage' in window,
      device_js_support_console_log:
        typeof console !== "undefined" && typeof console.log === "function",
      device_os_bada: /Bada/.test(navigator.userAgent),
      device_os_web_os: /webOS|hpwOS/.test(navigator.userAgent),
      device_is_set_top_box: /Set-Top Box/.test(navigator.userAgent),
      device_cookie_support: navigator.cookieEnabled,
      device_js_modify_dom: "document" in window && "createElement" in document,
      device_screen_size_height: window.screen.height,
      device_screen_size_width: window.screen.width,
    };
  }

  getBrowserName() {
    const userAgent = navigator.userAgent;
    let device_browser_name;

    if (userAgent.indexOf("Firefox") > -1) {
      device_browser_name = "Firefox";
    } else if (userAgent.indexOf("Chrome") > -1) {
      device_browser_name = "Chrome";
    } else if (userAgent.indexOf("Safari") > -1) {
      device_browser_name = "Safari";
    } else if (
      userAgent.indexOf("Opera") > -1 ||
      userAgent.indexOf("OPR") > -1
    ) {
      device_browser_name = "Opera";
    } else if (userAgent.indexOf("Edge") > -1) {
      device_browser_name = "Edge";
    } else if (
      userAgent.indexOf("MSIE") > -1 ||
      userAgent.indexOf("Trident/") > -1
    ) {
      device_browser_name = "Internet Explorer";
    } else {
      device_browser_name = "";
    }

    return device_browser_name;
  }

  getBrowserVersion() {
    const userAgent = navigator.userAgent;
    let version;

    if (userAgent.indexOf("Edge") > -1 || userAgent.indexOf("Edg") > -1) {
      version = userAgent.split("Edge/")[1].split("-")[0];
    } else if (userAgent.indexOf("Chrome") > -1) {
      version = userAgent.split("Chrome/")[1].split("-")[0];
    } else if (userAgent.indexOf("Safari") > -1) {
      version = userAgent.split("Version/")[1].split("-")[0];
    } else if (userAgent.indexOf("Firefox") > -1) {
      version = userAgent.split("Firefox/")[1].split("-")[0];
    } else if (
      userAgent.indexOf("Opera") > -1 ||
      userAgent.indexOf("OPR") > -1
    ) {
      version = userAgent.split("OPR/")[1].split("-")[0];
    } else if (
      userAgent.indexOf("MSIE") > -1 ||
      userAgent.indexOf("Trident/") > -1
    ) {
      version = userAgent.split("MSIE ")[1].split(";")[0];
    } else {
      version = "";
    }

    return version;
  }

  getOperatingSystem() {
    const platform = navigator.platform;
    let osName;

    if (platform.indexOf("Win") !== -1) {
      osName = "Windows";
    } else if (platform.indexOf("Mac") !== -1) {
      osName = "MacOS";
    } else if (platform.indexOf("Linux") !== -1) {
      osName = "Linux";
    } else {
      osName = "";
    }

    return osName + "-" + navigator.platform;
  }

  checkDoNotTrack() {
    let dntStatus;
    if (navigator.doNotTrack === "1" || navigator.doNotTrack === "yes") {
      dntStatus = true;
    } else if (
      navigator.doNotTrack === "0" ||
      navigator.doNotTrack === "no" ||
      navigator.doNotTrack === null
    ) {
      dntStatus = false;
    }
    return dntStatus;
  }

  getIsOperatingSystem() {
    const platform = navigator.platform;
    let isOs;

    if (
      platform.indexOf("Win") !== -1 ||
      platform.indexOf("Mac") !== -1 ||
      platform.indexOf("Linux") !== -1
    ) {
      isOs = true;
    } else {
      isOs = false;
    }

    return isOs;
  }

  async getBatteryChargeLevel() {
    if (navigator.getBattery) {
      const battery = await navigator.getBattery();
      return battery.level * 100;
    }
  }

  async isBatteryCharging() {
    if (navigator.getBattery) {
      const battery = await navigator.getBattery();
      return battery.charging;
    }
  }

  async getMediaDevicesList() {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const data = devices.map((device) => ({
      kind: device.kind,
      label: device.label,
      deviceId: device.deviceId,
    }));
    return `${data
      .map((device) => `<li>${device.kind}: ${device.label}</li>`)
      .join("")}`;
  }

  getGpuVendor() {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (gl) {
      const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
      if (debugInfo) {
        return gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
      }
    }
  }

  getGpuEngine() {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (gl) {
      const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
      if (debugInfo) {
        return gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
      }
    }
  }

  async getMediaDevicesCount() {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.length;
  }

  getCategory() {
    const userAgent = navigator.userAgent;
    let browser_device_type;

    if (/Mobi/.test(userAgent)) {
      browser_device_type = "Mobile Phone";
    } else if (/Tablet/.test(userAgent)) {
      browser_device_type = "Tablet";
    } else {
      browser_device_type = "Desktop";
    }

    return browser_device_type;
  }

  checkCapability(capability) {
    return capability in window;
  }

  getRenderingEngine() {
    const userAgent = navigator.userAgent;
    let renderingEngine;

    if (userAgent.indexOf("WebKit") !== -1) {
      renderingEngine = "WebKit";
    } else if (userAgent.indexOf("Blink") !== -1) {
      renderingEngine = "Blink";
    } else if (
      userAgent.indexOf("Gecko") !== -1 &&
      userAgent.indexOf("KHTML") === -1
    ) {
      renderingEngine = "Gecko";
    } else if (
      userAgent.indexOf("Trident") !== -1 ||
      userAgent.indexOf("MSIE") !== -1
    ) {
      renderingEngine = "Trident/MSIE";
    } else {
      renderingEngine = "";
    }

    return renderingEngine;
  }
}
export default DeviceInfo;


