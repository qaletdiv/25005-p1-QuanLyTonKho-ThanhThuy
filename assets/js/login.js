$(function(){
    let account = JSON.parse(localStorage.getItem("account1"));
    if(account===null){
        localStorage.setItem('account1',JSON.stringify(account1));
        account=JSON.parse(localStorage.getItem("account1"));
    }
    $(".login-form").on("submit",function(event){
        event.preventDefault();
        const userId=$("#user-id").val().trim();
        const userPassword=$("#user-password").val().trim();
        if(userId===''|| userPassword===''){   // kiểm tra nếu 1 trong 2 userId hoặc password chưa nhập
            alert('vui lòng nhập user ID,password');
            return;
        }
        if(userId===account.userId && userPassword===account.userPassword){
            // code chuyển sang màn hình chính, màn hình có chứa menu danh sách tồn kho và các menu danh sách khác
            window.location.href="orders-list.html"
        }else{
            alert("userId hoặc password không đúng");
            return;
        }
    })
});