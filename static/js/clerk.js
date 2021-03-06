// /* ------------------------------------------------ General ------------------------------------------------ */

function insertHeader() {
    let returnHTML = `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">myRestaurant</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <a class="nav-link active" aria-current="page" href="#">Quản lí đơn hàng</a>
                    <a class="nav-link active" aria-current="page" href="#">Quản lí món ăn</a>
                    <a class="nav-link active" aria-current="page" href="#">Đăng xuất</a>
                </div>
            </div>
        </div>
    </nav>
    `
    document.getElementById('header').innerHTML = returnHTML
}

insertHeader()

/* ------------------------------------------------ Clerk ------------------------------------------------ */
// Display

async function insertOrderList(getListOrderUrl, getMenuUrl) {
    const ordersRespone = await fetch(getListOrderUrl);
    var orders = await ordersRespone.json();
    const menuRespone = await fetch(getMenuUrl);
    var menu = await menuRespone.json();
    let returnHtml = ``
    let numberOrderPending = 0
    let numberOrderPreparing = 0
    for (order of orders) {
        if (order.status == 'pending') {
            numberOrderPending++;
        } else if (order.status == 'preparing') {
            numberOrderPreparing++;
        }
        returnHtml += showOrderData(order, menu)
    }
    returnHtml = `
    <div class='order-info ps-2 mb-4'>
        <div>Chờ xác nhận: <span class='numberOrderPending'> ${numberOrderPending}</span></div>
        <div>Đang chuẩn bị: <span class='numberOrderPreparing'> ${numberOrderPreparing}</span></div>
    </div>
    ` + returnHtml
    document.getElementById('order-list').innerHTML = returnHtml
}

function showOrderData(order, menu) {
    let total = 0
    let returnHtml = `
    <div data-id=${order.id} class="order-item mb-4 ${order.status =='pending' ?'order-item--pending':'order-item--preparing'} row">
    <div class="order-item__info col-12 col-md-12 row ">
        <div class=" col-12 col-md-5">Tên : <span class="order-item__info-name">${order.customerName}</span> </div>
        <div class="order-item__info-phone col-12 col-md-4">SDT: ${order.customerPhone}
            <a class="customer-phone px-1" href="tel: ${order.customerPhone}"><i class="fas fa-phone-volume"></i></a></div>
        <div class=" col-12 col-md-3">Bàn: <span class="order-item__info-table">${order.table}</span></div>
    </div>
    <hr class="horizontal-line"></hr>
    <div class="order-item__food col-12 col-md-8 ">
        <table class="table table-striped ">
            <thead>
                <tr>
                    <!-- <th scope="col ">Id</th> -->
                    <th scope="col ">Tên</th>
                    <th scope="col ">Giá</th>
                    <th scope="col ">Số lượng</th>
                </tr>
            </thead>
            
    `
    for (item of order.items) {
        for (menuItem of menu) {
            if (item.id == menuItem.id) {
                total += parseInt(menuItem.price) * parseInt(item.quantity)
                returnHtml += `
                <tr>
                    <td>${menuItem.name}</td>
                    <td>${formatVNDMoney( menuItem.price)}</td>
                    <td>${item.quantity}</td>
                </tr>
                `
                break
            }
        }
    }

    returnHtml += `
            <tr>
                <td></td>
                <td>Tổng:</td>
                <td> ${formatVNDMoney(total)}</td>
            </tr>
            <tbody>
        </table>
    </div>
    <div class="col-12"></div>
    <div class="order-item__control col-12 ">
        <div class="order-item__status my-2">Trạng thái: ${order.status =='pending' ?'Chờ xử lí':'Đang chuẩn bị'}</div>
        <div class="order-item__action ">
            ${order.status == 'pending'
        ?'<button class="btn btn-success p-1 m-1 btn-confirm">Xác nhận</button> <button class="btn btn-danger p-1 m-1 btn-cancel">Hủy</button>'
        :'<button class="btn btn-success p-1 m-1 btn-done">Hoàn thành</button>'
        }
        </div>
    </div>
    </div>
    `

    return returnHtml

}

insertOrderList(getListOrderUrl, getMenuUrl)

$(document).ready(function() {
    // func
    $("#switch-pending").change(function() {
        if (this.checked) {
            $(".order-item--pending").removeClass('hiddenOrderByControl');
        } else {
            $(".order-item--pending").addClass('hiddenOrderByControl');
        }
    });
    $("#switch-preparing").change(function() {
        if (this.checked) {
            $(".order-item--preparing").removeClass('hiddenOrderByControl');
        } else {
            $(".order-item--preparing").addClass('hiddenOrderByControl');
        }
    });
    $("#inputCustomerName").on('input', function() {
        var customerName = this.value.toLowerCase()
        $(".order-item__info-name").each(function() {
            if ($(this).text().toLowerCase().includes(customerName)) {
                $(this).closest('.order-item').removeClass('hiddenOrderWhenFilterName');
            } else {
                $(this).closest('.order-item').addClass('hiddenOrderWhenFilterName');
            }
        })
    });
    $("#inputTableNumber").on('input', function() {
        var table = this.value
        $(".order-item__info-table").each(function() {
            if ($(this).text() == table || !table) {
                $(this).closest('.order-item').removeClass('hiddenOrderWhenFilterTable');
            } else {
                $(this).closest('.order-item').addClass('hiddenOrderWhenFilterTable');
            }
        })
    });
    // notification
});
$(document).delegate('.btn-confirm', 'click', function() {
    let id = $(this).closest('.order-item').data('id')
    console.log(`[Info]: Gửi thông báo xác nhận đơn hàng ${id}`)
})
$(document).delegate('.btn-cancel', 'click', function() {
    let id = $(this).closest('.order-item').data('id')
    console.log(`[Info]: Gửi thông báo hủy đơn hàng ${id}`)
})
$(document).delegate('.btn-done', 'click', function() {
    let id = $(this).closest('.order-item').data('id')
    console.log(`[Info]: Gửi thông báo hoàn thành đơn hàng ${id}`)
})