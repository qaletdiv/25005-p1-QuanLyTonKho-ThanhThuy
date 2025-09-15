$(function(){
    const account1 = JSON.parse(localStorage.getItem("account1"));
    $(".login-form").on("submit",function(event){
        event.preventDefault();
        const userId=$("#user-id").val().trim();
        const userPassword=$("#user-password").val().trim();
        if(userId===''|| userPassword===''){   // kiểm tra nếu 1 trong 2 userId hoặc password chưa nhập
            alert('vui lòng nhập user ID,password');
            return;
        }
        if(userId===account1.userId && userPassword===account1.userPassword){
            // code chuyển sang màn hình chính, màn hình có chứa menu danh sách tồn kho và các menu danh sách khác??⇒ không biết viết code , ko biết cú pháp
        }else{
            alert("userId hoặc password không đúng");
            return;
        }
    })
});