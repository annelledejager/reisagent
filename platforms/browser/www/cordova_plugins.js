cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-device/www/device.js",
        "id": "cordova-plugin-device.device",
        "pluginId": "cordova-plugin-device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device/src/browser/DeviceProxy.js",
        "id": "cordova-plugin-device.DeviceProxy",
        "pluginId": "cordova-plugin-device",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-file/www/DirectoryEntry.js",
        "id": "cordova-plugin-file.DirectoryEntry",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.DirectoryEntry"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/DirectoryReader.js",
        "id": "cordova-plugin-file.DirectoryReader",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.DirectoryReader"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/Entry.js",
        "id": "cordova-plugin-file.Entry",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.Entry"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/File.js",
        "id": "cordova-plugin-file.File",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.File"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/FileEntry.js",
        "id": "cordova-plugin-file.FileEntry",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.FileEntry"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/FileError.js",
        "id": "cordova-plugin-file.FileError",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.FileError"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/FileReader.js",
        "id": "cordova-plugin-file.FileReader",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.FileReader"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/FileSystem.js",
        "id": "cordova-plugin-file.FileSystem",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.FileSystem"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/FileUploadOptions.js",
        "id": "cordova-plugin-file.FileUploadOptions",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.FileUploadOptions"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/FileUploadResult.js",
        "id": "cordova-plugin-file.FileUploadResult",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.FileUploadResult"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/FileWriter.js",
        "id": "cordova-plugin-file.FileWriter",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.FileWriter"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/Flags.js",
        "id": "cordova-plugin-file.Flags",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.Flags"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/LocalFileSystem.js",
        "id": "cordova-plugin-file.LocalFileSystem",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.LocalFileSystem"
        ],
        "merges": [
            "window"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/Metadata.js",
        "id": "cordova-plugin-file.Metadata",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.Metadata"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/ProgressEvent.js",
        "id": "cordova-plugin-file.ProgressEvent",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.ProgressEvent"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/fileSystems.js",
        "id": "cordova-plugin-file.fileSystems",
        "pluginId": "cordova-plugin-file"
    },
    {
        "file": "plugins/cordova-plugin-file/www/requestFileSystem.js",
        "id": "cordova-plugin-file.requestFileSystem",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.requestFileSystem"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/resolveLocalFileSystemURI.js",
        "id": "cordova-plugin-file.resolveLocalFileSystemURI",
        "pluginId": "cordova-plugin-file",
        "merges": [
            "window"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/browser/isChrome.js",
        "id": "cordova-plugin-file.isChrome",
        "pluginId": "cordova-plugin-file",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-file/www/browser/Preparing.js",
        "id": "cordova-plugin-file.Preparing",
        "pluginId": "cordova-plugin-file",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-file/src/browser/FileProxy.js",
        "id": "cordova-plugin-file.browserFileProxy",
        "pluginId": "cordova-plugin-file",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-file/www/fileSystemPaths.js",
        "id": "cordova-plugin-file.fileSystemPaths",
        "pluginId": "cordova-plugin-file",
        "merges": [
            "cordova"
        ],
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-file/www/browser/FileSystem.js",
        "id": "cordova-plugin-file.firefoxFileSystem",
        "pluginId": "cordova-plugin-file",
        "merges": [
            "window.FileSystem"
        ]
    },
    {
        "file": "plugins/cordova-plugin-googlemaps/www/BaseClass.js",
        "id": "cordova-plugin-googlemaps.BaseClass",
        "pluginId": "cordova-plugin-googlemaps",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-googlemaps/www/BaseArrayClass.js",
        "id": "cordova-plugin-googlemaps.BaseArrayClass",
        "pluginId": "cordova-plugin-googlemaps",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-googlemaps/www/LatLng.js",
        "id": "cordova-plugin-googlemaps.LatLng",
        "pluginId": "cordova-plugin-googlemaps",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-googlemaps/www/LatLngBounds.js",
        "id": "cordova-plugin-googlemaps.LatLngBounds",
        "pluginId": "cordova-plugin-googlemaps",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-googlemaps/www/Location.js",
        "id": "cordova-plugin-googlemaps.Location",
        "pluginId": "cordova-plugin-googlemaps",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-googlemaps/www/CameraPosition.js",
        "id": "cordova-plugin-googlemaps.CameraPosition",
        "pluginId": "cordova-plugin-googlemaps",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-googlemaps/www/Polyline.js",
        "id": "cordova-plugin-googlemaps.Polyline",
        "pluginId": "cordova-plugin-googlemaps",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-googlemaps/www/Polygon.js",
        "id": "cordova-plugin-googlemaps.Polygon",
        "pluginId": "cordova-plugin-googlemaps",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-googlemaps/www/Marker.js",
        "id": "cordova-plugin-googlemaps.Marker",
        "pluginId": "cordova-plugin-googlemaps",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-googlemaps/www/HtmlInfoWindow.js",
        "id": "cordova-plugin-googlemaps.HtmlInfoWindow",
        "pluginId": "cordova-plugin-googlemaps",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-googlemaps/www/Circle.js",
        "id": "cordova-plugin-googlemaps.Circle",
        "pluginId": "cordova-plugin-googlemaps",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-googlemaps/www/TileOverlay.js",
        "id": "cordova-plugin-googlemaps.TileOverlay",
        "pluginId": "cordova-plugin-googlemaps",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-googlemaps/www/GroundOverlay.js",
        "id": "cordova-plugin-googlemaps.GroundOverlay",
        "pluginId": "cordova-plugin-googlemaps",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-googlemaps/www/Common.js",
        "id": "cordova-plugin-googlemaps.Common",
        "pluginId": "cordova-plugin-googlemaps",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-googlemaps/www/encoding.js",
        "id": "cordova-plugin-googlemaps.encoding",
        "pluginId": "cordova-plugin-googlemaps",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-googlemaps/www/spherical.js",
        "id": "cordova-plugin-googlemaps.spherical",
        "pluginId": "cordova-plugin-googlemaps",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-googlemaps/www/Geocoder.js",
        "id": "cordova-plugin-googlemaps.Geocoder",
        "pluginId": "cordova-plugin-googlemaps",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-googlemaps/www/ExternalService.js",
        "id": "cordova-plugin-googlemaps.ExternalService",
        "pluginId": "cordova-plugin-googlemaps",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-googlemaps/www/Map.js",
        "id": "cordova-plugin-googlemaps.Map",
        "pluginId": "cordova-plugin-googlemaps",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-googlemaps/www/event.js",
        "id": "cordova-plugin-googlemaps.event",
        "pluginId": "cordova-plugin-googlemaps",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-googlemaps/www/MapTypeId.js",
        "id": "cordova-plugin-googlemaps.MapTypeId",
        "pluginId": "cordova-plugin-googlemaps",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-googlemaps/www/KmlOverlay.js",
        "id": "cordova-plugin-googlemaps.KmlOverlay",
        "pluginId": "cordova-plugin-googlemaps",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-googlemaps/www/Environment.js",
        "id": "cordova-plugin-googlemaps.Environment",
        "pluginId": "cordova-plugin-googlemaps",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-googlemaps/www/googlemaps-cdv-plugin.js",
        "id": "cordova-plugin-googlemaps.CordovaGoogleMaps",
        "pluginId": "cordova-plugin-googlemaps",
        "clobbers": [
            "plugin.google.maps"
        ]
    },
    {
        "file": "plugins/cordova-plugin-http/www/cordovaHTTP.js",
        "id": "cordova-plugin-http.CordovaHttpPlugin",
        "pluginId": "cordova-plugin-http",
        "clobbers": [
            "CordovaHttpPlugin"
        ]
    },
    {
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "pluginId": "cordova-plugin-splashscreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "file": "plugins/cordova-plugin-splashscreen/src/browser/SplashScreenProxy.js",
        "id": "cordova-plugin-splashscreen.SplashScreenProxy",
        "pluginId": "cordova-plugin-splashscreen",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
        "id": "cordova-plugin-statusbar.statusbar",
        "pluginId": "cordova-plugin-statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    },
    {
        "file": "plugins/cordova-plugin-statusbar/src/browser/StatusBarProxy.js",
        "id": "cordova-plugin-statusbar.StatusBarProxy",
        "pluginId": "cordova-plugin-statusbar",
        "runs": true
    },
    {
        "file": "plugins/ionic-plugin-keyboard/www/browser/keyboard.js",
        "id": "ionic-plugin-keyboard.keyboard",
        "pluginId": "ionic-plugin-keyboard",
        "clobbers": [
            "cordova.plugins.Keyboard"
        ],
        "runs": true
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-compat": "1.1.0",
    "cordova-plugin-console": "1.0.5",
    "cordova-plugin-device": "1.1.4",
    "cordova-plugin-file": "4.3.3",
    "cordova-plugin-googlemaps": "2.0.0-beta3-20170811-1937",
    "cordova-plugin-http": "1.2.0",
    "cordova-plugin-splashscreen": "4.0.3",
    "cordova-plugin-statusbar": "2.2.2",
    "cordova-plugin-whitelist": "1.3.1",
    "ionic-plugin-keyboard": "2.2.1"
}
// BOTTOM OF METADATA
});