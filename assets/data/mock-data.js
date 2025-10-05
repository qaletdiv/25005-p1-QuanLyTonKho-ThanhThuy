const account1={
    userId:'nhanvien1',
    userPassword:'nhanvien001'
};

// let orders1=[
//     {orderNo:"001",vendorName:"cong ty A",orderDate:"2025/09/01",handler:account1.userId,item_CD:"A001",item_name:"xi măng",price:10000,totalAmount:100000,status:"bản nháp"},
//     {orderNo:"002",vendorName:"cong ty B",orderDate:"2025/09/02",handler:account1.userId,item_CD:"A002",item_name:"gạch",quantity:10,price:2000,totalAmount:200000,status:"đã xác nhận"},
//     {orderNo:"003",vendorName:"cong ty C",orderDate:"2025/09/03",handler:account1.userId,item_CD:"A003",item_name:"đá nhỏ",quantity:10,price:3000,totalAmount:300000,status:"đã nhập kho"},
//     {orderNo:"004",vendorName:"cong ty D",orderDate:"2025/09/04",handler:account1.userId,item_CD:"A004",item_name:"dầu máy",quantity:10,price:4000,totalAmount:400000,status:"đã xác nhận"},
//     {orderNo:"005",vendorName:"cong ty E",orderDate:"2025/09/05",handler:account1.userId,item_CD:"A005",item_name:"mái tôn",quantity:10,price:5000,totalAmount:500000,status:"bản nháp"},
// ];

// let products = [
//     {item_CD:"A001", item_name:"xi măng"},
//     {item_CD:"A002", item_name:"gạch"},
//     {item_CD:"A003", item_name:"đá nhỏ"},
//     {item_CD:"A004", item_name:"dầu máy"},
//     {item_CD:"A004", item_name:"mái tôn"},
//     {item_CD:"A005", item_name:"cát mịn"}
// ];

let orders = [
    {
        orderNo:"001",
        vendorName:"Công ty A",
        orderDate:"2025/09/01",
        handler:"Nguyễn Văn A",
        totalAmount:100000,
        status:"Bản nháp",
        orderProducts:[
            {item_CD:"001",item_name:"xi măng",quantity:1},
            {item_CD:"002",item_name:"đá nhỏ",quantity:4},
        ]
    },
    {
        orderNo:"002",
        vendorName:"Công ty B",
        orderDate:"2025/09/02",
        handler:"Nguyễn Văn B",
        totalAmount:200000,
        status:"Đã xác nhận",
        orderProducts:[
            {item_CD:"003",item_name:"cát",quantity:2},
            {item_CD:"004",item_name:"gạch",quantity:3},
        ]
    },
    {
        orderNo:"003",
        vendorName:"Công ty C",
        orderDate:"2025/09/03",
        handler:"Nguyễn Văn C",
        totalAmount:300000,
        status:"Đã nhập kho",
        orderProducts:[
            {item_CD:"005",item_name:"mái tôn",quantity:5},
            {item_CD:"006",item_name:"dầu máy",quantity:8},
        ]
    },
];