if (window.oy == null) {
    window.oy = {};
}
if (window.oy.utils == null) {
    window.oy.utils = {};
}
oy.utils = {
    template: function (html, data) {
        var keys = Object.keys(data);
        keys.forEach(function (key, index) {
            html = html.replaceAll('\\${' + key + '\\}', data[key])
        });
        return html;
    }
};