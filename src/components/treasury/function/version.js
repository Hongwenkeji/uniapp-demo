const install = (Vue, vm) => {
    Vue.prototype.$upversion = (() => {
        return new Promise((resolve, reject) => {
            plus.runtime.getProperty(plus.runtime.appid, (app) => {
                let platform = plus.os.name.toLocaleLowerCase();
                vm.$get("/public/select/getAppVersion").then(({ data }) => {
                    console.log({
                        当前版本号: app.version,
                        服务器版本号: data.appVersionNum,
                    });
                    // 当前设备是否是IOS
                    if (platform == "ios") {
                        plus.runtime.launchApplication({
                            action: `itms-apps://itunes.apple.com/cn/app/id${plus.runtime.appid}?mt=8`,
                        });
                        resolve();
                    }
                    // 当前版本大于等于服务器版本
                    if (app.version >= data.appVersionNum) {
                        reject();
                    }
                    // 当前版本小于等于服务器版本
                    if (app.version < data.appVersionNum) {
                        resolve()
                    }
                });
            });
        })
    })
}

export default {
    install
}