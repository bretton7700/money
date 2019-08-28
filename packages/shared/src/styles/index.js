const path = require("path");

const resources = ["constants.scss", "mixins.scss", "fonts.scss", "themes.scss", "devices.scss"];

module.exports = resources.map(file => path.resolve(__dirname , 'styles' , file));
