$(function(){
    let orders=JSON.parse(localStorage.getItem("orders1"));
    if(orders===null){
        localStorage.setItem("orders1",JSON.stringify(orders1));
        orders=JSON.parse(localStorage.getItem("orders1"));
    }
    console.log(orders);
    let tbody=$('#orders-tbody');
        orders.forEach((element,index)=>{
            let row=`
                <tr>
                    <td>${index+1}</td>
                    <td>${element.orderNo}</td>
                    <td>${element.vendorName}</td>
                    <td>${element.orderDate}</td>
                    <td>${element.handler}</td>
                    <td>${element.item_CD}</td>
                    <td>${element.quantity}</td>
                    <td>${element.price}</td>
                    <td>${element.totalAmount}</td>
                    <td>${element.status}</td>
                </tr>`;
            tbody.append(row);
        })
            
});