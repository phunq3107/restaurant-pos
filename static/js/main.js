/* ------------------------------------------------ General ------------------------------------------------ */
const getListOrderUrl = "../../data/order.json"
const getMenuUrl = "../../data/menu.json"
const getTypeUrl = "../../data/type.json"

// more details: https://stackoverflow.com/questions/37985642/vnd-currency-formatting
function formatVNDMoney(money) {
    money = parseInt(money)
    parse = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money)
    return parse.toString().slice(0, -2)
}