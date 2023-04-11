export function toast(title, icon = 'none', mask = true) {
    uni.showToast({
        title,
        icon,
        mask
    })
}
export function previewImage(list = [], current = 0) {
    uni.previewImage({
        urls: list,
        current: current,
        success: (result) => {

        },
        fail: (error) => {
            console.log(error);
            toast('预览错误', error)
        }
    })
}
export function copy(str) {
    uni.setClipboardData({
        data: str,
        success: (result) => {
            toast('复制成功')
        },
        fail: (error) => { }
    })
}