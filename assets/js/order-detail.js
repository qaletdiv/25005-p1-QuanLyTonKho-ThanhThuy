$(function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const orderNo = urlParams.get("orderNo"); 
    const orders = JSON.parse(localStorage.getItem("orders")) ;
    const order = orders.find(o => o.orderNo === orderNo);

    if (order) {
        $("#PO-person").val(order.handler);
        $("#PO-date").val(order.orderDate);
        $("#vendor").val(order.vendorName);
        $("input[name='net1']").val(order.totalAmount);

        const tbody = $(".PO-table tbody");
        tbody.empty();
        order.orderProducts.forEach((p,index)=>{
            tbody.append(`
                <tr>
                    <td><input type="checkbox"></td>
                    <td>${index + 1}</td>
                    <td>${p.item_CD}</td>
                    <td>${p.item_name}</td>
                    <td>${p.quantity}</td>
                    <td>${p.price || ""}</td>
                    <td>${p.quantity * (p.price || 0)}</td>
                </tr>
            `);
        });
    }

    //khi click nút addRow thì thêm dòng mới
    let rowCount = order ? order.orderProducts.length :0 ;
    $('#addRow').on('click',function(){
        rowCount++;
        const newRow =`
        <tr>
            <td><input type="checkbox"></td>
            <td>${rowCount}</td>
            <td><input type="text"></td>
            <td><input type="text"></td>
            <td><input type="number"></td>
            <td><input type="number"></td>
            <td><input type="number" readonly></td>
        </tr>`;
        $('.PO-table tbody').append(newRow);
    });

    // nút ẩn hiện menu js
    $(".toggle-btn").click(function(){
        $(".sidebar-wrap").slideToggle(300); 
    });
    
    // chọn ngày tháng calendar
    $("#PO-date").datepicker({
        dateFormat: "dd/mm/yy"
    });

    


});