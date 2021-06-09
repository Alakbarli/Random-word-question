let no=1;
let employeeId=1;
class Unit{
    constructor(_name){
        this.id=no;
        this.name=_name;
 }
}
class Word{
    constructor(_nameAz,_nameEN){
        this.id=no;
        this.nameAz=_nameAz;
        this.nameEn=_nameEn;
 }
}
class DB{
    constructor(){
        this.Units=[];
        this.Words=[];
    }
    addUnitToList(u){
        this.Units.push(u);
    }
    addWordtolist(w){
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
    let wId=no;
    newDb.Words.forEach(
        function(w){
            if(wId<w.id){
                wId=w.id;
            }
        }
    )
    no=wId;
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
function synUnits(){
    if(newDb.Units.length>0){
        $("#UNIT ul").empty();
        newDb.Units.forEach(
            function(e){
                $("#UNIT ul").append(`<li data-id='${e.id}'>${e.name}</li>`)
            }
        ); 
       
    }
}
$(document).ready(function() {
    
    if(window.localStorage.getItem("wordDb")){
        newDb.Words=JSON.parse((window.localStorage.getItem("wordDb"))).Words;
        newDb.Units=JSON.parse((window.localStorage.getItem("wordDb"))).Units;
        findLastIdUnit();
        synUnits();
    }



    $("#UNIT .icon").click(function(){
        let uInputVal=$("#UNIT input").val();
        let nUnt=new Unit(uInputVal);
        findLastIdUnit();
        newDb.addUnitToList(nUnt);
        synUnits();
        window.localStorage.setItem("wordDb",JSON.stringify(newDb));
    })



    $("#save-json").click(function(){
        const a = document.createElement("a");
        a.href = URL.createObjectURL(new Blob([JSON.stringify(newDb, null, 2)], {type: "text/plain"}));
        a.setAttribute("download", "data.json");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    })

  });

