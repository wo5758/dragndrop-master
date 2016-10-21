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
        $("#cartbox>.product:last-child").addClass("count"+$(ui.draggable).attr("data-id")).attr("id","count"+cartcount).children("p").children("button").attr("onclick","del("+cartcount+")");
        if($(".count"+$(ui.draggable).attr("data-id")).length>1){
            var tr=$("tr[data-id='"+$(ui.draggable).attr("data-id")+"']>.count");
            tr.html(tr.html()*1+1);
        }else{
            var html="";
            html+="<tr class='totalcount count"+$(ui.draggable).attr("data-id")+"' data-id='"+$(ui.draggable).attr("data-id")+"'><td>"+$(ui.draggable).attr("data-id")+"</td>";
            html+="<td>"+$(ui.draggable).children(".product-name").html()+"</td>";
            html+="<td>"+$(ui.draggable).children(".product-detail").html()+"</td>";
            html+="<td class='total'>"+$(ui.draggable).children(".product-price").html()+"</td>";
            html+="<td class='count'>1</td>";
            html+="<td><button class='btn btn-warning' onclick='alldel(this)'>삭제</button></td></tr>";
            $("tbody").append(html);
        }
        total();
    }
});

function del(i){
    var count=$("#cartbox>.product#count"+i);
    var getclass=count.attr("class").split(" ");
    var tr=$("tr."+getclass[getclass.length-1]+" .count");
    tr.html(tr.html()*1-1);
    if(tr.html()=="0"){
        $(tr=$("tr."+getclass[getclass.length-1])).remove();
    }
    $("#cartbox>.product#count"+i).remove();
    total();
};

function alldel(d){
    var getclass=$(d).parent().parent().attr("class").split(" ");
    $("."+getclass[getclass.length-1]).remove();
    total();
};

function total(){
    var totalcount=$("tbody>.totalcount");
    var total=0;
    for(i=0;i<totalcount.length;i++){
        var sp=$(totalcount[i]).children(".total").html().split(",");
        sp=sp[0]+sp[1];
        total+=$(totalcount[i]).children(".count").html()*1*sp;
    }
    $("#total").html(total+"원");
};

function sethtml(result){
    var html="";
    html+="<p class='product-name'>"+result.product+"</p>";
    html+="<p class='product-price'>"+result.price+"</p>";
    html+="<p class='product-detail'>"+result.detail+"</p>";
    html+="<p class='product-btns'><button class='btn btn-warning btn-sm'><span class='glyphicon glyphicon-trash'></button></p>";
    return html;
}