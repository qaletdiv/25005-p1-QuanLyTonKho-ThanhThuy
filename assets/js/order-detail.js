$(function() {
const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const orderNo = urlParams.get("orderNo"); 
    const mode = urlParams.get("mode");
    const orders = JSON.parse(localStorage.getItem("orders")) || [] ;
    const order = orders.find(o => o.orderNo === orderNo);

    let table;

    // hàm render bảng PO-table
    function render (data,editable){
        if ($.fn.DataTable.isDataTable('#PO-table')) {
            $('#PO-table').DataTable().clear().destroy();
        }

        table = $('#PO-table').DataTable({
            data:data,
            columns:[
                {data: null, title: '', defaultContent: '',className: "dt-center", render: function (data) { return editable ? `<input type="checkbox" class="row-check">`: ''; } },
                {data:null,title:'STT',className: "dt-center",render:function(data,type,row,meta){ return meta.row + 1;}},
                {data:'item_CD',title:'Mã SP',className: "dt-center",render:function(data){return editable?`<input class='edit-input item_CD' value="${data || ''}">` : data;}},
                {data:'item_name',title:'Tên SP',className: "dt-center",render:function(data){return editable?`<input class='edit-input item_name' value="${data || ''}">` : data;}},
                {data:'quantity',title:'Số lượng',className: "dt-center",render:function(data){return editable?`<input type="number" class='edit-input quantity' value="${data || ''}">` : data;}},
                {data:'price',title:'Đơn giá',className: "dt-center",render:function(data){return editable?`<input type="number" class='edit-input price' value="${data || ''}">` : data;}},
                {data:null,title:'Thành tiền',className: "dt-center",render:function(data,type,row){return (row.quantity * row.price) || '';}},
            ],
            searching:false
        });
        table.on('draw.dt',function(){
            table.column(1,{search:'applied',order:'applied'}).nodes().each(function(cell,i){cell.innerHTML=i+1});
        });
    }

    // Hàm cập nhật lại tổng tiền
function updateTotalAmount() {
    let total = 0;
    $('#PO-table tbody tr').each(function() {
        let quantity = parseFloat($(this).find('.quantity').val()) || 0;
        let price = parseFloat($(this).find('.price').val()) || 0;
        total += (quantity * price);
    });
    $("input[name='net1']").val(total.toLocaleString());
}

// hàm cập nhật lại orderproducts mỗi khi user chỉnh sửa thêm xóa dòng
function updateOrderData (){
    const updatedProducts = table.rows().data().toArray();
    order.orderProducts = updatedProducts;
    order.totalAmount = parseFloat($("input[name='net1']").val().replace(/,/g, '')) || 0;
}


    if (order) {
        $("#PO-person").val(order.handler);
        $("#PO-date").val(order.orderDate);
        $("#vendor").val(order.vendorName);
        $("input[name='net1']").val(order.totalAmount);
        
        // nếu trạng thái là bản nháp thì thêm html input và chỉnh sửa dc, và hiển thị 3 nút thêm xóa dòng và nút lưu lại
        if(order.status==="Bản nháp"){
            render(order.orderProducts,true);
            $('#addRow,#deleteRow,#saveBtn').show();
        }else{
            render(order.orderProducts,false);
        }
    }else{
        
        // $('#PO-table tbody').html('<tr><td style="text-align:center;">Không tìm thấy đơn hàng</td></tr>');
    }
  // ấn nút mở trang tại sidemenu thì mở màn hình có sẵn bảng ở dạng tạo mới để user nhập liệu
    if(mode === "new"){
        $('#vendor').val('');
        $('#PO-person').val('');
        $('#PO-date').val('');
        $("input[name='net1']").val('');
        $("textarea[name='note1']").val('');

        const blankRows = [
        { item_CD: '', item_name: '', quantity: '', price: '' },
        { item_CD: '', item_name: '', quantity: '', price: '' },
        { item_CD: '', item_name: '', quantity: '', price: '' }
        ];

        render(blankRows,true);
        $('#addRow,#deleteRow,#saveBtn').show();
    }

    // user ấn nút tạo mới trong trang để tạo thêm đơn hàng mới mà ko cần ấn menu
    $('#createNewBtn').on('click', function() {
        $('#vendor').val('');
        $('#PO-person').val('');
        $('#PO-date').val('');
        $("input[name='net1']").val('');
        $("textarea[name='note1']").val('');

        const blankRows = [
        { item_CD: '', item_name: '', quantity: '', price: '' },
        { item_CD: '', item_name: '', quantity: '', price: '' },
        { item_CD: '', item_name: '', quantity: '', price: '' }
        ];

        render(blankRows,true);
        $('#addRow,#deleteRow,#saveBtn').show();
    });

    // bản nháp, user chỉnh sửa ô input
    $("#PO-table").on('input','.edit-input',function(){
        let row = table.row($(this).closest('tr')).data();
        let className = $(this).attr('class').split(' ')[1];
        row[className] = parseFloat($(this).val());

        // cập nhật lại giá từng dòng khi user thay đổi SL hoặc đơn giá
        let quantity = parseFloat(row.quantity) || 0;
        let price = parseFloat(row.price) || 0;
        let rowTotal = quantity * price;
        $(this).closest('tr').find('td').eq(6).text(rowTotal.toLocaleString());


        // cap nhat lai tong tien khi user thay doi SL hoac don gia
        updateTotalAmount();
        updateOrderData();
    });
    
    $('#addRow').on('click', function() {
        table.row.add({
            item_CD: '',
            item_name: '',
            quantity: '',
            price: ''
        }).draw(false);
        updateTotalAmount();
        updateOrderData();
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
        updateTotalAmount();
        updateOrderData();
    });

    // Xử lý khi nhấn nút Lưu
    $('#saveBtn').on('click',function(){
        updateOrderData();
        let orderIndex = orders.findIndex(o => o.orderNo === orderNo);
        if(orderIndex !== -1){
            orders[orderIndex] = order;
            localStorage.setItem("orders",JSON.stringify(orders));
            alert('lưu thành công');
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

    // dropdown khi click nút User
    $(".user-btn").click(function(event){
        event.stopPropagation(); 
        $(".user-dropdown-content").toggle();
    });

    $(document).click(function(){
        $(".user-dropdown-content").hide();
    });


});