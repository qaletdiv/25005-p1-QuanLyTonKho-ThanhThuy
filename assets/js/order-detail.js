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
            searching:false,
            language: {
                decimal: "",
                emptyTable: "Không có dữ liệu trong bảng",
                info: "Hiển thị _START_ đến _END_ của _TOTAL_ dòng",
                infoEmpty: "Hiển thị 0 đến 0 của 0 dòng",
                lengthMenu: "Hiển thị _MENU_ dòng",
                loadingRecords:"Đang tải...",
                zeroRecords: "Không tìm thấy dữ liệu phù hợp",
                paginate: {
                    first:"Đầu tiên",
                    last:"Cuối cùng",
                    next:"Sau",
                    previous:"Trước"
                }
            }
            
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
        if(order){
            order.orderProducts = updatedProducts;
            order.totalAmount = parseFloat($("input[name='net1']").val().replace(/,/g, '')) || 0;
        }
    }

    // hàm kiểm tra ít nhất có 1 dòng trong bảng sản phẩm
    function hasOrderProducts (){
        const products = table.rows().data().toArray();
        if(products.length===0){
            alert('vui lòng nhập ít nhất 1 sản phẩm');
            throw new Error("không có sản phẩm nào");
            
        }
    }

    // hàm khóa các ô input ko cho phép sửa khi trạng thái ko phải là bản nháp
    function lockInputs() {
        $('#PO-table input, #vendor, #PO-person, #PO-date, #addRow, #deleteRow, #saveBtn')
            .prop('disabled', true);
    }

    // kiểm tra order, hiển thị dữ liệu khi mở trang ra
    if (order) {
        $("#PO-person").val(order.handler);
        $("#PO-date").val(order.orderDate);
        $("#vendor").val(order.vendorName);
        $("input[name='net1']").val(order.totalAmount);
        
        // nếu trạng thái là bản nháp thì thêm html input và chỉnh sửa dc, và hiển thị 3 nút thêm xóa dòng và nút lưu lại
        if(order.status==="Bản nháp"){
            render(order.orderProducts,true);
            $('#addRow,#deleteRow,#saveBtn,#confirmOrderBtn').show();
            $('#confirmStockBtn').hide();
        }else{
            render(order.orderProducts,false);
            $('#confirmBtn').hide();
            lockInputs();
        }
        if(order.status==="Đã nhập kho"){
            render(order.orderProducts,false);
            $('#addRow,#deleteRow,#saveBtn,#confirmOrderBtn,#confirmStockBtn').hide();
        }
        if(order.status==="Đã xác nhận"){
            render(order.orderProducts,false);
            $('#addRow,#deleteRow,#saveBtn,#confirmOrderBtn').hide();
        }
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
        $('#addRow,#deleteRow,#saveBtn,#confirmBtn').show();
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
        $('#addRow,#deleteRow,#saveBtn,#confirmBtn').show();
    });

    // bản nháp, user chỉnh sửa ô input
    $("#PO-table").on('input','.edit-input',function(){
        let row = table.row($(this).closest('tr')).data();
        let className = $(this).attr('class').split(' ')[1];
        let value = $(this).val();
        if(className==='quantity' || className==='price'){
            value = parseFloat(value) || 0;
        }
        row[className] = parseFloat(value);

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
        try{
            hasOrderProducts();
        }catch(error){return;}


        let currentOrder;

        // khi trong URL ko có orderNo,order dc tao mới
        if(!order){
            let maxOrderNo = 0;
            orders.forEach(o =>{
                let number = parseInt(o.orderNo,10);
                if(!isNaN(number)  && number > maxOrderNo){maxOrderNo=number}
            });

            let newOrderNo = String(maxOrderNo+1).padStart(3,'0');

            let vendorName = $('#vendor').val().trim();
            let orderDate = $('#PO-date').val().trim();
            let handler = $('#PO-person').val().trim();

            if (!vendorName) {
                alert('Vui lòng nhập tên nhà cung cấp.');
                $('#vendor').focus();
                return;
            }
            if (!orderDate) {
                alert('Vui lòng nhập ngày đặt hàng.');
                $('#PO-date').focus();
                return;
            }
            if (!handler) {
                alert('Vui lòng nhập người phụ trách.');
                $('#PO-person').focus();
                return;
            }


            currentOrder = {
                orderNo: newOrderNo,
                vendorName: vendorName,
                orderDate: orderDate,
                handler: handler,
                totalAmount:parseFloat($("input[name='net1']").val().replace(/,/g,'')) || 0,
                status:"Bản nháp",
                orderProducts:table.rows().data().toArray()
            };
            
            orders.push(currentOrder);
            localStorage.setItem("orders",JSON.stringify(orders));
            alert(`lưu thành công! Mã đơn là :${newOrderNo}`);
        }else{
            // trường hợp edit đơn cũ
            currentOrder=order;
            updateOrderData();
            let orderIndex = orders.findIndex(o => o.orderNo === currentOrder.orderNo);
            if(orderIndex!== -1){
                orders[orderIndex] = currentOrder;
                localStorage.setItem("orders",JSON.stringify(orders));
                alert(`cập nhật thành công , mã đơn ${currentOrder.orderNo}`);
            }
        }
    });

    // xử lý khi ấn nút xác nhận đơn hàng
    $('#confirmOrderBtn').on('click', function () {
    updateOrderData();

    // kiểm tra có sản phẩm chưa
    try {
        hasOrderProducts();
    } catch(err) {return;}

    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    // biến order lấy từ localStorage
    let currentOrder = order; 

    // nếu chưa có order (đang tạo mới)
    if (!currentOrder) {
        let maxOrderNo = 0;
        orders.forEach(o => {
            let num = parseInt(o.orderNo, 10);
            if (!isNaN(num) && num > maxOrderNo) maxOrderNo = num;
        });
        let newOrderNo = String(maxOrderNo + 1).padStart(3, '0');

        let vendorName = $('#vendor').val().trim();
        let orderDate = $('#PO-date').val().trim();
        let handler = $('#PO-person').val().trim();

        if (!vendorName || !orderDate || !handler) {
            alert('Vui lòng nhập đầy đủ thông tin đơn hàng.');
            return;
        }

        currentOrder = {
            orderNo: newOrderNo,
            vendorName,
            orderDate,
            handler,
            totalAmount: parseFloat($("input[name='net1']").val().replace(/,/g, '')) || 0,
            status: "Bản nháp",
            orderProducts: table.rows().data().toArray()
        };

        orders.push(currentOrder);
    }

        // đổi trạng thái thành “Đã xác nhận”
        currentOrder.status = "Đã xác nhận";

        // cập nhật lại localStorage
        const index = orders.findIndex(o => o.orderNo === currentOrder.orderNo);
        if (index !== -1) orders[index] = currentOrder;
        else orders.push(currentOrder);

        localStorage.setItem("orders", JSON.stringify(orders));

        alert(`Đơn hàng ${currentOrder.orderNo} đã được xác nhận.`);

        // khóa các ô input và bảng sản phẩm
        $('#saveBtn, #addRow, #deleteRow').prop('disabled', true);
        $('#PO-table input').prop('disabled', true); 
    });

// xử lý khi ấn nút đã nhập kho
    $('#confirmStockBtn').on('click',function(){
        updateOrderData();
        // lấy stockData từ localStorage
        let products = JSON.parse(localStorage.getItem("products")) || [];
        order.orderProducts.forEach(p =>{
            let prod=products.find(x=>x.item_CD === p.item_CD);
            if(prod){
                prod.stock +=parseFloat(p.quantity) || 0;
            }else{
                products.push({item_CD:p.item_CD,item_name:p.item_name,stock:parseFloat(p.quantity || 0)})
            }
        });

        localStorage.setItem("products",JSON.stringify(products));

        order.status="Đã nhập kho";
        let orders = JSON.parse(localStorage.getItem("orders")) || [];
        let index = orders.findIndex(o => o.orderNo === order.orderNo);
        if(index !== -1) orders[index] = order;
        localStorage.setItem("orders", JSON.stringify(orders));

        alert(`Đơn hàng ${order.orderNo} đã được nhập kho.`);
        $('#PO-table input').prop('disabled', true);
        $('#addRow, #deleteRow, #saveBtn, #confirmStockBtn').hide();


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