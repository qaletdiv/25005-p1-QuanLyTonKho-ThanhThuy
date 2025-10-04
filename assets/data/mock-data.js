const account1={
    userId:'nhanvien1',
    userPassword:'nhanvien001'
};

let orders1=[
    {orderNo:"001",vendorName:"cong ty A",orderDate:"2025/09/01",handler:account1.userId,item_CD:"A001",item_name:"xi măng",quantity:10,price:10000,totalAmount:100000,status:"bản nháp"},
    {orderNo:"002",vendorName:"cong ty B",orderDate:"2025/09/02",handler:account1.userId,item_CD:"A002",item_name:"gạch",quantity:10,price:2000,totalAmount:200000,status:"đã xác nhận"},
    {orderNo:"003",vendorName:"cong ty C",orderDate:"2025/09/03",handler:account1.userId,item_CD:"A003",item_name:"đá nhỏ",quantity:10,price:3000,totalAmount:300000,status:"đã nhập kho"},
    {orderNo:"004",vendorName:"cong ty D",orderDate:"2025/09/04",handler:account1.userId,item_CD:"A004",item_name:"dầu máy",quantity:10,price:4000,totalAmount:400000,status:"đã xác nhận"},
    {orderNo:"005",vendorName:"cong ty E",orderDate:"2025/09/05",handler:account1.userId,item_CD:"A005",item_name:"mái tôn",quantity:10,price:5000,totalAmount:500000,status:"bản nháp"},
];

let products = [
    {item_CD:"A001", item_name:"xi măng"},
    {item_CD:"A002", item_name:"gạch"},
    {item_CD:"A003", item_name:"đá nhỏ"},
    {item_CD:"A004", item_name:"dầu máy"},
    {item_CD:"A004", item_name:"mái tôn"},
    {item_CD:"A005", item_name:"cát mịn"}
];