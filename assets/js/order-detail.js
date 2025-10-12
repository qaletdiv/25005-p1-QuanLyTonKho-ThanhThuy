$(function() {
    let table;
    function render (data){
        if ($.fn.DataTable.isDataTable('#PO-table')) {
            $('#PO-table').DataTable().clear().destroy();
        }

        table = $('#PO-table').DataTable({
            data:data,
            columns:[
                {data: null, title: '', defaultContent: '',className: "dt-center", render: function () { return `<input type="checkbox" class="row-check">`; } },
                {data:null,title:'STT',className: "dt-center",render:function(data,type,row,meta){ return meta.row + 1;}},
                {data:'item_CD',title:'Mã SP',className: "dt-center"},
                {data:'item_name',title:'Tên SP',className: "dt-center"},
                {data:'quantity',title:'Số lượng',className: "dt-center"},
                {data:'price',title:'Đơn giá',className: "dt-center"},
                {data:null,title:'Thành tiền',className: "dt-center",render:function(data,type,row){return row.quantity * row.price;}},
            ],
            searching:false
        });
    }


    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const orderNo = urlParams.get("orderNo"); 
    const orders = JSON.parse(localStorage.getItem("orders")) || [] ;
    const order = orders.find(o => o.orderNo === orderNo);

    if (order) {
        $("#PO-person").val(order.handler);
        $("#PO-date").val(order.orderDate);
        $("#vendor").val(order.vendorName);
        $("input[name='net1']").val(order.totalAmount);
        render(order.orderProducts);
    }else{
        $('#PO-table tbody').html('<tr><td style="text-align:center;">Không tìm thấy đơn hàng</td></tr>');
    }

    
    $('#addRow').on('click', function() {
        table.row.add({
            item_CD: '',
            item_name: '',
            quantity: 0,
            price: 0
        }).draw(false);
    });

    // Xóa dòng đã chọn
    $('#deleteRow').on('click', function() {
    let rowCheck = $('.row-check:checked');

    if (rowCheck.length > 0) {
        table.rows(rowCheck.closest('tr')).remove().draw();
    } else {
        let lastRow = table.row(':last');
        if (lastRow.node()) {
            lastRow.remove();
            table.rows().draw(); 
        }
    }
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