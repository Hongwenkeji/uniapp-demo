if (process.env.NODE_ENV === 'production' && process.env.UNI_PLATFORM==='app-plus') {
	const fs = require('fs')

	const manifestPath = `${process.env.UNI_INPUT_DIR}/manifest.json`;
	
	let Manifest = JSON.parse(fs.readFileSync(manifestPath, { encoding: "utf-8" }));

	Manifest.versionCode = String(Number(Manifest.versionCode) + 1)
	
	console.log(`上次版本：${Manifest.versionName}`, `当前发布版本：${Manifest.versionCode.split('').join('.')}`);

	Manifest.versionName = Manifest.versionCode.split('').join('.')

	fs.writeFileSync(manifestPath, JSON.stringify(Manifest), {
		flag: "w",
	});
}
