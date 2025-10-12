$(function() {
    function render (data){
        if ($.fn.DataTable.isDataTable('#PO-table')) {
            $('#PO-table').DataTable().clear().destroy();
        }

        $('#PO-table').DataTable({
            data:data,
            columns:[
                {data:null,title:'STT'},
                {data:'item_CD',title:'Mã SP'},
                {data:'item_name',title:'Tên SP'},
                {data:'quantity',title:'Số lượng'},
                {data:'price',title:'Đơn giá'},
                {data:null,title:'Thành tiền',render:function(data,type,row){return row.quantity * row.price;}},
            ],
            columnDefs:[
                {
                    targets:0,
                    render:function(data,type,row,meta){
                        return meta.row + 1;
                    }
                }
            ],
            createdRow:function(row,rowData,dataINdex){
                $(row).attr('data-order-no',rowData.orderNo)
            },
            searching:false
        });
    }


    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const orderNo = urlParams.get("orderNo"); 
    const orders = JSON.parse(localStorage.getItem("orders")) ;
    const order = ordersData.find(o => o.orderNo === orderNo);

    if (order) {
        $("#PO-person").val(order.handler);
        $("#PO-date").val(order.orderDate);
        $("#vendor").val(order.vendorName);
        $("input[name='net1']").val(order.totalAmount);
        render(order.orderProducts)
    }

    //khi click nút addRow thì thêm dòng mới
    let rowCount = order ? order.orderProducts.length :0 ;
    $('#addRow').on('click',function(){
        rowCount++;
        const newRow =`
        <tr>
            <td><input type="checkbox" class="row-check""></td>
            <td>${rowCount}</td>
            <td><input type="text"></td>
            <td><input type="text"></td>
            <td><input type="number"></td>
            <td><input type="number"></td>
            <td><input type="number" readonly></td>
        </tr>`;
        $('#PO-table tbody').append(newRow);
    });

    // khi cho checkbox roi an nut thi xoa di dong da chon
    $('#deleteRow').on('click',function(){
        let rowCheck = $('.row-check:checked');
        if(rowCheck.length > 0){
            rowCheck.each(function(){
                $(this).closest('tr').remove();
            });
        }else{
            let lastRow = $('.PO-table tr:last');
            if(lastRow.length>0){
                lastRow.remove();
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