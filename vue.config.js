if (process.env.NODE_ENV === 'production') {
	const fs = require('fs')

	const manifestPath = "./src/manifest.json";

	let Manifest = JSON.parse(fs.readFileSync(manifestPath, { encoding: "utf-8" }));

	Manifest.versionCode = String(Number(Manifest.versionCode) + 1)

	console.log(`上次版本：${Manifest.versionName}`, `当前发布版本：${Manifest.versionCode.split('').join('.')}`);

	Manifest.versionName = Manifest.versionCode.split('').join('.')

	fs.writeFileSync(manifestPath, JSON.stringify(Manifest), {
		flag: "w",
	});
}
const config = require('./src/config')
module.exports = {
	chainWebpack: con => {
		con
			.plugin('define')
			.tap(args => {
				args[0]['process.env'].VUE_APP_BASE_URL = process.env.NODE_ENV === 'development' ? config.dev.VUE_APP_BASE_URL : config.prod.VUE_APP_BASE_URL
				return args
			})
	}
}