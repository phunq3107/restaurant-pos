/* ------------------------------------------------ General ------------------------------------------------ */
const getListOrderUrl = "/api/v1/clerk/orders"
const getMenuUrl = "/api/v1/menu/items"
const getTypeUrl = "/api/v1/menu/types"
const createOrderUrl = "/api/v1/menu/orders"

// more details: https://stackoverflow.com/questions/37985642/vnd-currency-formatting
function formatVNDMoney(money) {
    money = parseInt(money)
    parse = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money)
    return parse.toString().slice(0, -2)
}