$(function(){
    function render(data){
        let tbody = $("#orders-tbody");
        tbody.empty();
        data.forEach((o,index)=>{
            tbody.append(`
                <tr dataOrderNo="${o.orderNo}">
                    <td>${index+1}</td>
                    <td>${o.orderNo}</td>
                    <td>${o.vendorName}</td>
                    <td>${o.orderDate}</td>
                    <td>${o.handler}</td>
                    <td>${o.totalAmount.toLocaleString()} VNĐ</td>
                    <td>${o.status}</td>
                </tr>
            `);
        });
    }

    if(!localStorage.getItem("orders")){ 
        localStorage.setItem("orders", JSON.stringify(orders))}; 
        let ordersData = JSON.parse(localStorage.getItem("orders"));
    render(orders);

    // Nút tạo mới
    $("#btn-create").on("click", function(){
        window.open("order-detail.html", "_blank");
    });

    // Nút tìm kiếm
    $("#btn-search").on("click", function(){
        let keyword = $("#search-input").val().trim().toLowerCase();
        let filtered = orders.filter(o =>
            o.orderNo.toLowerCase().includes(keyword) || o.vendorName.toLowerCase().includes(keyword)
        );
        render(filtered);
    });

    $('#orders-tbody').on('click','tr',function(){
        let orderNo = $(this).attr('dataOrderNo');
        window.location.href = `order-detail.html?orderNo=${orderNo}`;
    });

});