async function insertMenuCategory(getTypeUrl) {
  const categoriesRespone = await fetch(getTypeUrl);
  var categories = await categoriesRespone.json();
  let returnHtml = ``
  for (let category of categories) {
    returnHtml += showCategoryData(category)
  }
  document.getElementById('category__list').innerHTML = returnHtml
}

function showCategoryData(category) {
  let returnHtml = `
    <div class="category__item ${category.name === 'Hot'
      ? 'category__item--active' : ''}">
        <div class="category__item__title noselect">
            <span class="category__name">${category.name}</span>
            <img style="max-width:30px;max-height:30px;" src="/image/${category.image}"/>
        </div>
    </div>
    
    `
  return returnHtml

}

async function insertMenuFood(getMenuUrl) {
  const foodsRespone = await fetch(getMenuUrl);
  let foods = await foodsRespone.json();
  let returnHtml = ``
  returnHtml += `
    <div class="row">
    `
  for (let food of foods) {
    returnHtml += showFoodData(food)
  }
  returnHtml += `
    </div>
    `

  document.getElementById('food__list').innerHTML = returnHtml
}

function showFoodData(food) {

  let returnHtml = `
    <div class=" col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-4 food__wrapper ">
        <div class="row food__item" data-category="${food.type}" 
        data-id="${food.id}" 
        data-image="${food.image}" 
        data-name="${food.name}" 
        data-price="${food.price}">
            ${food.status === "0" ? `
            <div class="food__item--notAvailable">
                <i class="far fa-frown-open"></i>
            </div> 
            ` : ``}
            <div class="col-6 food__image">
                <img src="/image/${food.image}" alt="">
            </div>
            <div class="col-6 food__info">
                <div class="food__name">${food.name}</div>
                <div class="food__price">${formatVNDMoney(food.price)}đ</div>
                <div class="food__control">
                    <span>
                        <i class="far fa-caret-square-left food__control--decrease"></i>
                    </span>
                    <span class="food__control__quantity">1</span>
                    <span>
                        <i class="far fa-caret-square-right food__control--increase"></i>
                    </span>
                </div>
                <div class="food__btn">
                    <i class="fas fa-cart-arrow-down "></i>
                </div>
            </div>
        </div>
        
    </div> 
    `
  return returnHtml

}

showModelMenu = (id, name, price, quantity, image, type) => {
  return (
      ` 
             <div class="model-menu">
   
   <div class="model-container rounded  col-10 col-md-8 m-auto ">
       <div class="model-header d-flex justify-content-between">
           THÔNG TIN MÓN ĂN 
           <div class="order__detail__rm-icon d-flex justify-content-end p-3    ">
           <i class="fas fa-times"></i>
       </div>
       </div>
       <div class="model-body d-md-flex">
           <div class="model-img col-12 col-md-6 p-2">
               <img  src="/image/${image}" alt="">
           </div>
           <div class="model-infor col-12 col-md-6 px-3">
               <div class="infor__item py-2 border-bottom">
                   <div class="infor__price__line py-2  fw-bold">
                       <div class="title-id w-100">
                           Tên món 
                       </div>
                       <div class="title-category w-100">
                           Loại 
                       </div>
                       <div class="title-price w-100 d-flex justify-content-end  ">
                           Giá  
                       </div>
                   </div>
                   <div class="infor__price__line     ">
                       <div class="title-id w-100">
                           ${name}
                       </div>
                       <div class="title-category w-100">
                           ${type}
                       </div>
                       <div class="title-price w-100 d-flex justify-content-end   cl-red fw-bold">
                           ${formatVNDMoney(price)} đ
                       </div>
                   </div>
               </div>
               <div class="infor__item py-3 border-bottom d-flex justify-content-between">
                   <div class="fw-bold  fs-5">Quantity</div>
                   <div class="d-flex align-items-center">
   
                       <div class="btn-quantity border border-success rounded decrease-quatity  ">
                           -
                       </div>
                       <div class="btn-quantity value-quantity">
                           1
                       </div>
                       <div class="btn-quantity  border border-danger rounded   increase-quantity  ">
                           +
                       </div>
   
                   </div>
               </div>
               <div class="infor__item py-1    ">
                   <div class="infor-line d-flex py-1 ">
                       <div class="fw-bold ">Protein: </div>
                       <div class="px-2 text-black-50 ">609 calo</div>
                   </div>
                   <div class="infor-line d-flex py-1 ">
                       <div class="fw-bold ">Additives: </div>
                       <div class="px-2 text-black-50">03</div>
                   </div>
                   <div class="infor-line d-flex  py-1 ">
                       <div class="fw-bold   ">Baking material: </div>
                       <div class="px-2 text-black-50 ">404    </div>
                   </div>
                   <div class="infor-line d-flex py-1 ">
                       <div class="fw-bold ">Food decoration: </div>
                       <div class="px-2 text-black-50">03</div>
                   </div>
               </div>
               <div class="btn-addCart ">
                   Thêm vào giỏ
               </div>
           </div>
       </div>
   </div>
   
   </div>
   `
  )
}

async function loadData() {
  await insertMenuCategory(getTypeUrl)
  await insertMenuFood(getMenuUrl)
  reloadMenuItem('Hot')
}

async function reloadMenuItem(category) {
  $(".food__item").each(function () {
    let type = $(this).data('category')
    if (type === category) {
      $(this).parent('.food__wrapper').removeClass(
          'hiddenFoodWhenFilterCategory')
    } else {
      $(this).parent('.food__wrapper').addClass('hiddenFoodWhenFilterCategory')
    }
  })
}

function loadCartData() {
  let currentOrder = JSON.parse(window.localStorage.getItem('currentOrder'))
  let returnHTML = ``
  let total = 0
  if (currentOrder) {
    for (let item of currentOrder) {
      total += parseInt(item.price) * parseInt(item.quantity)
      returnHTML += showCartItem(item)
    }
  }
  document.getElementById('order__detail__list').innerHTML = returnHTML
  document.getElementById('order__subtotal-price').innerText = formatVNDMoney(
      total)
  document.getElementById('order__totle-price').innerText = formatVNDMoney(
      total)
}

function showCartItem(item) {
  let returnHtml = `
    <div class="order__detail__item" data-id="${item.id}">
        <div class="order__detail__image">
            <img src="/image/${item.image}" alt="">
        </div>
        <div class="order__detail__body">
            <div class="order__detail__name">
                ${item.name}
            </div>
            <div class="order__detail__rm-icon">
                <i class="fas fa-times"></i>
            </div>
            <div class="order__detail__quantity">
                ${formatVNDMoney(
      item.price)} x <input type="number" min="1"  oninput="validity.valid||(value='');" value="${item.quantity}">
            </div>
            <div class="order__detail__total">
                ${formatVNDMoney(
      parseInt(item.price) * parseInt(item.quantity))}
            </div>
        </div>
    </div>
    `
  return returnHtml
}

function addToCart(id, name, price, quantity, image) {
  let currentOrder = JSON.parse(window.localStorage.getItem('currentOrder'))
      || []
  for (let item of currentOrder) {
    if (item.id === id) {
      addToCartMessage(`${name} đã có sẵn trong giỏ hàng`)
      return
    }
  }
  currentOrder.push({
    id: id,
    name: name,
    price: price,
    quantity: quantity,
    image: image
  })
  window.localStorage.setItem('currentOrder', JSON.stringify(currentOrder))
  addToCartMessage(`Đã thêm ${quantity} ${name}`)
}

// Snackbar
/* https://www.w3schools.com/howto/howto_js_snackbar.asp */
function addToCartMessage(message) {
  let x = document.getElementById("snackbar");
  x.innerHTML = message
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
}

$(document).ready(function () {
  loadData()
  $(".openCartBtn").on('click', function () {
    $(".orderModal").removeClass('hidden')
    loadCartData()
  });
  $(".order__close-btn").on('click', function () {
    $(".orderModal").addClass('hidden')
  });

})

$(document).delegate('.category__item', 'click', function () {
  $(".category__item").each(function () {
    $(this).removeClass('category__item--active')
  })
  $(this).addClass('category__item--active')
  let category = $(this).find('.category__name').text()
  reloadMenuItem(category)
})

$(document).delegate('.food__control--decrease', 'click', function () {
  let quantiTyNode = $(this).closest('.food__control').find(
      '.food__control__quantity')
  let quantity = parseInt(quantiTyNode.text())
  if (quantity > 1) {
    quantiTyNode.text(quantity - 1)
  }
})

$(document).delegate('.food__control--increase ', 'click', function () {
  let quantiTyNode = $(this).closest('.food__control').find(
      '.food__control__quantity')

  let quantity = parseInt(quantiTyNode.text())

  quantiTyNode.text(quantity + 1)

})

$(document).delegate('.food__btn', 'click', function () {
  let foodItemNode = $(this).closest('.food__item')
  let image = foodItemNode.data('image')
  let id = foodItemNode.data('id')
  let name = foodItemNode.data('name')
  let price = foodItemNode.data('price')
  let quantity = foodItemNode.find('.food__control__quantity').text()
  addToCart(id, name, price, quantity, image)
})

$(document).delegate('.order__detail__rm-icon', 'click', function () {
  let orderDetailItemNode = $(this).closest('.order__detail__item')
  let rmItemId = orderDetailItemNode.data('id')
  let currentOrder = JSON.parse(window.localStorage.getItem('currentOrder'))
      || []
  let newOrder = []
  for (let item of currentOrder) {
    if (item.id !== rmItemId) {
      newOrder.push(item)
    }
  }
  window.localStorage.setItem('currentOrder', JSON.stringify(newOrder))
  loadCartData()
})

$(document).delegate('.order__detail__quantity input', 'change', function () {
  let newQuantity = parseInt($(this).val())
  let itemId = $(this).closest('.order__detail__item').data('id')
  let currentOrder = JSON.parse(window.localStorage.getItem('currentOrder'))
      || []
  for (let item of currentOrder) {
    if (item.id === itemId) {
      item.quantity = newQuantity
    }
  }
  window.localStorage.setItem('currentOrder', JSON.stringify(currentOrder))
  loadCartData()
})

$(document).delegate('.order__customer-info__submit', 'click',
    function (event) {
      // event.preventDefault()
      let formNode = $(this).closest('.order__customer-info')
      let customerName = formNode.find('.customer-name').val()
      let customerPhone = formNode.find('.customer-phone').val()
      let noTable = formNode.find('.no-table').val()
      let currentOrder = JSON.parse(window.localStorage.getItem('currentOrder'))
          || []
      let orderToSend = []
      for (let item of currentOrder) {
        orderToSend.push({
          foodId: item.id,
          quantity: item.quantity
        })
      }
      if (customerName && customerPhone && orderToSend.length > 0) {
        event.preventDefault()
        let requestBody = {
          "customerName": customerName,
          "customerPhone": customerPhone,
          "tableNumber": noTable,
          "items": orderToSend
        }
        $.ajax({
          type: "post",
          url: createOrderUrl,
          contentType: "application/json",
          dataType: 'json',
          data: JSON.stringify(requestBody)
        });
        alert("Đặt thành công. Hãy chờ xác nhận từ nhân viên!!!")
      }

      // loadCartData()

    })
$(document).delegate(' .food__name,.food__image,.food__price', 'click',
    function () {

      let foodItemNode = $(this).closest('.food__item')
      let image = foodItemNode.data('image')
      let id = foodItemNode.data('id')
      let name = foodItemNode.data('name')
      let price = foodItemNode.data('price')
      let quantity = foodItemNode.find('.food__control__quantity').text()
      let type = foodItemNode.data('category')
      var showHtml = showModelMenu(id, name, price, quantity, image, type)
      quantity = Number(quantity)
      console.log(type)
      document.getElementById("showModel").innerHTML = showHtml
      $(".model-container").click(function (e) {
        e.stopImmediatePropagation()
      })
      $('#showModel').show()
      $("body,.order__detail__rm-icon").click(function (e) {

        $('#showModel').hide()
      })

      $(".increase-quantity").click(function (e) {
        quantity += 1
        $(".value-quantity").text(quantity)
      })
      $(".decrease-quatity").click(function (e) {
        quantity -= 1
        if (quantity < 1) {
          quantity = 1
        }
        $(".value-quantity").text(quantity)
      })
      $(".btn-addCart").click(function () {
        $('#showModel').hide()
        addToCart(id, name, price, quantity, image)
      })
    })