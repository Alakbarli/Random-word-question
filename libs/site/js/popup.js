 function RunPopUp(className,atribute,isLink,delMessage="Are you sure delete this item?",deltext="Delete",cancelMessage="Cancel",mainIcon="fas fa-trash"){
   if(isLink==true){
    $(document).on("click",`.${className}`,function(e) {
        e.preventDefault();
        let href=$(this).attr(`${atribute}`);
       $('body').append(' <div class="Umy-popup">'+
            '<div class="Uclose">'+
            '<i class="fas fa-times"></i> </div>'+
            '<div class="Uicon">'+
            '<i class="fas fa-trash"></i>'+
            '</div>'+
            '<div class="Ucontent">'+
             'Are you sure delete this item?'+
             '</div>'+
           '<div class="Uaction"><a class="Uno" href="">Cancel</a>'+
             `<a href='${href}' class="Uyes" href="">Delete</a>`+
            '</div>'+
          '</div>');
    $(document).on("click",".Uaction .Uno",function(e) {
        e.preventDefault();
        $(this).parent().parent().remove();
    });
    $(document).on("click",".Uclose",function(e) {
        e.preventDefault();
        $(this).parent().remove();
    });
    
    });

        }
        else{
            $(document).on("click",`.${className}`,function(e) {
                
                e.preventDefault();
               $('body').append(' <div class="Umy-popup">'+
                    '<div class="Uclose">'+
                    '<i class="fas fa-times"></i> </div>'+
                    '<div class="Uicon">'+
                    `<i class="${mainIcon}"></i>`+
                    '</div>'+
                    '<div class="Ucontent">'+
                     `${delMessage}`+
                     '</div>'+
                   `<div class="Uaction"><a class="Uno" href="">${cancelMessage}</a>`+
                     `<a href='#' class="Uyes" href="">${deltext}</a>`+
                    '</div>'+
                  '</div>');
            $(document).on("click",".Uaction .Uno",function(e) {
                e.preventDefault();
                $(this).parent().parent().remove();
            });
            $(document).on("click",".Uaction .Uyes",function(e) {
                e.preventDefault();
                $(this).parent().parent().remove();
                window.localStorage.clear();
                window.location.reload();
            });
            $(document).on("click",".Uclose",function(e) {
                e.preventDefault();
                $(this).parent().remove();
            });
            
            });
        }
    }