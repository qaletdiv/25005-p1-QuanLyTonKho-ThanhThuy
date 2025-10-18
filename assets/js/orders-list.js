$(function(){
    let table;
    function render (data){
        if ($.fn.DataTable.isDataTable('#PO-table')) {
            $('#PO-table').DataTable().clear().destroy();
        }

        table=$('#PO-table').DataTable({
            data:data,
            columns:[
                {data:null,title:'STT'},
                {data:'orderNo',title:'Mã đơn hàng'},
                {data:'vendorName',title:'Tên NCC'},
                {data:'orderDate',title:'Ngày mua hàng'},
                {data:'handler',title:'Nhân viên phụ trách'},
                {data:'totalAmount',title:'Tổng tiền'},
                {data:'status',title:'Trạng thái'}
            ],
            columnDefs:[
                {
                    targets:0,
                    render:function(data,type,row,meta){
                        return meta.row + 1;
                    }
                },
            ],
            createdRow:function(row,rowData,dataIndex){
                $(row).attr('data-order-no',rowData.orderNo)
            },
            searching:false
        });
        table.on('draw.dt',function(){
            table.column(0,{search:'applied',order:'applied'}).nodes().each(function(cell,i){cell.innerHTML=i+1});
        });
    }

    if(!localStorage.getItem("orders")){ 
        localStorage.setItem("orders", JSON.stringify(orders))}; 
        let ordersData = JSON.parse(localStorage.getItem("orders"));
    render(ordersData);

    // Nút tạo mới
    $("#btn-create").on("click", function(){
        window.open("order-detail.html", "_blank");
    });

    // Nút tìm kiếm
    $("#btn-search").on("click", function(){
        let keyword = $("#search-input").val().trim().toLowerCase();
        let filtered = ordersData.filter(o =>
            o.orderNo.toLowerCase().includes(keyword) || o.vendorName.toLowerCase().includes(keyword)
        );
        render(filtered);
    });

    $('#PO-table').on('click', 'tbody tr', function () {
        let orderNo = $(this).data('order-no');
        window.location.href = `order-detail.html?orderNo=${orderNo}`;
    });

    // nút ẩn hiện menu js
    $(".toggle-btn").click(function(){
        $(".sidebar-wrap").slideToggle(300); 
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