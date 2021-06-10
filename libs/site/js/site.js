let no=1;
let wNo=1;
let employeeId=1;
class Unit{
    constructor(_name){
        this.id=no;
        this.name=_name;
 }
}
class Word{
    constructor(_nameAz,_nameEn,_unitId){
        this.id=wNo;
        this.nameAz=_nameAz;
        this.nameEn=_nameEn;
        this.unitId=_unitId;
 }
}
class DB{
    constructor(){
        this.Units=[];
        this.Words=[];
        this.activePage="word-question";
    }
    addUnitToList(u){
        this.Units.push(u);
    }
    addWordToList(w){
        this.Words.push(w);
    }
    findUnit(n)
    {
        return this.Units.find(u=>u.id==n)
    }
    filterWord(id){
        return this.Words=this.Words.filter(w=>w.id!=id);
    }
    filterUnit(id){
        return this.Units=this.Units.filter(u=>u.id!=id);
    }
}

let newDb=new DB;
function findLastIdWord(){
    let wId=wNo;
    newDb.Words.forEach(
        function(w){
            if(wId<w.id){
                wId=w.id;
            }
        }
    )
    wNo=wId+1;
}
function findLastIdUnit(){
    let uId=no;
    newDb.Units.forEach(
        function(u){
            if(uId<u.id){
                uId=u.id;
            }
        }
    )
    no=uId+1;
}

//Unit HTML
function synUnits(){
    if(newDb.Units.length>0){
        $("#UNIT ul").empty();
        $("#add-word .unit").empty();
        $("#add-word .unit").append(`<option value='0'>Secin</li>`);
        newDb.Units.forEach(
            function(e){
                $("#UNIT ul").append(`<li data-id='${e.id}'>${e.name}</li>`);
                 $("#add-word .unit").append(`<option value='${e.id}'>${e.name}</li>`);
            }
        ); 
       
    }
}

function synWords(){
    if(newDb.Words.length>0){
        $("#all-word .word-content").empty();
       newDb.Words.forEach(
            function(e){
                $("#all-word .word-content").append(`<p>${e.nameAz+' - '+e.nameEn}</p>`);
            }
        ); 
       
    }
}

function synPage(){
        let key=newDb.activePage;
        console.log(key);
        $(".w-nav-item").removeClass("active");
        $(`.w-nav-item[data-id='${key}']`).addClass("active");
        $(".w-menu-tabs .card").each(function(){
            if(key==$(this).attr("data-id")){
                $(this).removeClass("d-none");
            }
            else{
                $(this).addClass("d-none");
            }
        })
    
};

$(document).ready(function() {
    //Menu accardion
    $(".w-nav-item").click(function(){
        let key=$(this).attr("data-id");
        newDb.activePage=key;
        window.localStorage.setItem("wordDb",JSON.stringify(newDb));
        $(".w-nav-item").removeClass("active");
        $(this).addClass("active");
        $(".w-menu-tabs .card").each(function(){
            if(key==$(this).attr("data-id")){
                $(this).removeClass("d-none");
            }
            else{
                $(this).addClass("d-none");
            }
        })
    })

    //SYNC
    
    if(window.localStorage.getItem("wordDb")){
        newDb.Words=JSON.parse((window.localStorage.getItem("wordDb"))).Words;
        newDb.Units=JSON.parse((window.localStorage.getItem("wordDb"))).Units;
        newDb.activePage=JSON.parse((window.localStorage.getItem("wordDb"))).activePage;
        findLastIdUnit();
        findLastIdWord();
        synWords();
        synUnits();
        synPage();
    }


    //Unit adding

    $("#UNIT .icon").click(function(){
        let uInputVal=$("#UNIT input").val();
        if(uInputVal&&uInputVal.trim()){
            let nUnt=new Unit(uInputVal);
        findLastIdUnit();
        newDb.addUnitToList(nUnt);
        synUnits();
        window.localStorage.setItem("wordDb",JSON.stringify(newDb));
        $("#UNIT input").val("");
        }
    })


    //JSON saving


    $("#save-json").click(function(){
        const a = document.createElement("a");
        a.href = URL.createObjectURL(new Blob([JSON.stringify(newDb, null, 2)], {type: "text/plain"}));
        a.setAttribute("download", "data.json");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    })

    //Word add

    $("#add-word form").submit(function( event ) {
        let unitId=$(this)[0][0].value;
        let nameAz=$(this)[0][1].value;
        let nameEn=$(this)[0][2].value;
        if(true){
            if(nameAz.trim()&&nameEn.trim()){
                let nw=new Word(nameAz,nameEn,unitId);
                findLastIdWord();
                newDb.addWordToList(nw);
                synWords();
                window.localStorage.setItem("wordDb",JSON.stringify(newDb));
                $("#add-word select").val("0");
                $("#add-word input").val("");
                $("#add-word input").val("");
                $("#add-word input").last().val("Əlavə et");
            }
        }
        console.log(newDb);
        event.preventDefault();
      });

      $("#preloader").addClass("d-none");
  });

