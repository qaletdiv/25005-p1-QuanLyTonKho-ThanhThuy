$(function(){
    $(".toggle-btn").click(function(){
        $(".sidebar-wrap").slideToggle(300); // 300ms
    });

    $(".user-btn").on('click',function(){
        $(".user-dropdown-content").slideToggle();
    });
    $('#logout').on('click',function(event){
        event.preventDefault();
        window.location.href="login.html"
    });
    let orders=JSON.parse(localStorage.getItem("orders1"));
    if(orders===null){
        localStorage.setItem("orders1",JSON.stringify(orders1));
        orders=JSON.parse(localStorage.getItem("orders1"));
    }
    console.log(orders);
    let tbody=$('#orders-tbody');
    function renderOrdersList(orders){
        tbody.empty();
        orders.forEach((element,index)=>{
            let row=`
                <tr orderNo="${element.orderNo}">
                    <td>${index+1}</td>
                    <td>${element.orderNo}</td>
                    <td>${element.vendorName}</td>
                    <td>${element.orderDate}</td>
                    <td>${element.handler}</td>
                    <td>${element.item_CD}</td>
                    <td>${element.item_name}</td>
                    <td>${element.quantity}</td>
                    <td>${element.price}</td>
                    <td>${element.totalAmount}</td>
                    <td>${element.status}</td>
                </tr>`;
            tbody.append(row);
        });
    }
    renderOrdersList(orders);

    $('#btn-create').on('click',function(){
        window.open("order-detail.html","_blank");
    });
    $('#btn-search').on('click',function(){
        let keyword=$('#search-input').val().trim().toLowerCase();
        let result=orders.filter(element=>
            element.orderNo.toLowerCase().includes(keyword) ||
            element.vendorName.toLowerCase().includes(keyword)
        );
        renderOrdersList(result);
    });

    $("#orders-tbody").on("click", "tr", function() {
    let orderNo = $(this).attr("orderNo");
    window.location.href = `order-detail.html?orderNo=${orderNo}`;
    });
});