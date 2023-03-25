export function toast(title, icon = 'none', mask = true) {
    uni.showToast({
        title,
        icon,
        mask
    })
}