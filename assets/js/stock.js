$(function(){
    let table;
// hàm render bảng stock
    function renderStock(data){
        if ($.fn.DataTable.isDataTable('#stock-table')){
            $('#stock-table').DataTable().clear().destroy();
        }

        table = $('#stock-table').DataTable({
            data: data,
            columns: [
                { data: null, title: 'STT',render: function(data,type,row,meta){return meta.row + 1;}},
                { data: 'item_CD', title: 'Mã sản phẩm' },
                { data: 'item_name', title: 'Tên sản phẩm' },
                { data: 'stock', title: 'Số lượng' }
            ],
            createdRow: function(row,rowData){
                $(row).attr('data-product-code', rowData.item_CD);
            },
            searching: false,
            language: {
                emptyTable: "Không có dữ liệu tồn kho",
                info: "Hiển thị _START_ đến _END_ của _TOTAL_ dòng",
                infoEmpty: "Hiển thị 0 đến 0 của 0 dòng",
                lengthMenu: "Hiển thị _MENU_ dòng",
                loadingRecords: "Đang tải...",
                zeroRecords: "Không tìm thấy dữ liệu phù hợp",
                paginate: {
                    first:"Đầu tiên",
                    last:"Cuối cùng",
                    next:"Sau",
                    previous:"Trước"
                }
            }
        });

        table.on('draw.dt', function(){
            table.column(0, {search:'applied', order:'applied'}).nodes().each(function(cell,i){
                cell.innerHTML = i + 1;
            });
        });
    }

    // Lấy dữ liệu từ localStorage
    if(!localStorage.getItem("stockData")){ 
        localStorage.setItem("stockData", JSON.stringify(stockData))}; 
    let stock_data = JSON.parse(localStorage.getItem("stockData"));
    if(stock_data.length === 0){
        alert("Tồn kho không có dữ liệu!");
    }
    renderStock(stockData);

    // nút tìm kiếm
    $("#btn-search").on("click", function(){
        let keyword = $("#search-input").val().trim().toLowerCase();
        let filtered = stockData.filter(item =>
            item.item_CD.toLowerCase().includes(keyword) ||
            item.item_name.toLowerCase().includes(keyword)
        );
        renderStock(filtered);
    });

    // ấn nút enter trên bàn phím cũng tìm
    $("#search-input").on("keypress", function(event){
        if(event.which === 13) $("#btn-search").click();
    });


    // Toggle sidebar
    $(".toggle-btn").click(function(){
        $(".sidebar-wrap").slideToggle(300);
    });

    // User dropdown
    $(".user-btn").click(function(event){
        event.stopPropagation();
        $(".user-dropdown-content").toggle();
    });
    $(document).click(function(){
        $(".user-dropdown-content").hide();
    });

    // Menu chuyển hướng
    $("#menu-order").on("click", function(e){
        e.preventDefault();
        window.location.href = "order-detail.html?mode=new";
    });

    $("#menu-stock").on("click", function (e) {
        e.preventDefault();
        if(!localStorage.getItem("stockData")){
            localStorage.setItem("stockData",JSON.stringify(stockData));
        }

        const stock = JSON.parse(localStorage.getItem("stockData")); 

        if (!stock || stock.length === 0) {
            alert("Tồn kho không có dữ liệu!");
            return;
        }

        // Nếu có dữ liệu thì chuyển đến màn hình stock.html
        window.location.href = "stock.html";
    });
    
    $('#products-list').on('click',function(){
        window.location.href = "products-list.html";
    });
    $('#product-detail').on('click',function(){
        window.location.href = "product-detail.html";
    });
});
