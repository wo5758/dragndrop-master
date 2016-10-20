// app.js
$.getJSON("./data/products.json",function(result){
    var len=result.length;
    for(i=0;i<len;i++){
        $("<div/>").addClass("product").attr("data-id",result[i].id).html(sethtml(result[i])).appendTo("#productsbox");
    }
    drag();
});

function drag(){
    $(".product").draggable({
        helper: "clone",
        cursor: "pointer",
        start: function(e,ui){
            $(ui.helper).css({"z-index":999});
        }
    });
};
var cartcount=0;
$("#cartbox").droppable({
    drop: function(e,ui){
        $(ui.draggable).clone().appendTo(this);
        ++cartcount;
        var dataid=$("#cartbox>.product[data-id='"+$(ui.draggable).attr("data-id")+"']");
        $("#cartbox>.product:last-child").attr("id","count"+cartcount).children("p").children("button").attr("onclick","del("+cartcount+")");
        if(dataid.length>1){
            var tr=$("tr[data-id='"+$(ui.draggable).attr("data-id")+"']>.count");
            var count=tr.html(tr.html()*1+1);
        }else{
            var html="";
            html+="<tr data-id='"+$(ui.draggable).attr("data-id")+"'><td>"+$(ui.draggable).attr("data-id")+"</td>";
            html+="<td>"+$(ui.draggable).children(".product-name").html()+"</td>";
            html+="<td>"+$(ui.draggable).children(".product-detail").html()+"</td>";
            html+="<td>"+$(ui.draggable).children(".product-price").html()+"</td>";
            html+="<td class='count'>1</td></tr>";
            $("tbody").append(html);
        }
    }
});

function del(i){
    console.log(i);
    var count=$("#cartbox>.product#count"+i);
    $("#cartbox>.product#count"+i).remove();
};

function sethtml(result){
    var html="";
    html+="<p class='product-name'>"+result.product+"</p>";
    html+="<p class='product-price'>"+result.price+"</p>";
    html+="<p class='product-detail'>"+result.detail+"</p>";
    html+="<p class='product-btns'><button class='btn btn-warning btn-sm'><span class='glyphicon glyphicon-trash'></button></p>";
    return html;
}