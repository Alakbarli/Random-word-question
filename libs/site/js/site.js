let no=1;
let wNo=1;
let employeeId=1;
let currentWordId=null;

//DB CLASSES

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
        this.unitSelectVal="0";
        this.languageVal="0"
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
    findWord(n,unitId)
    {
        return this.Words.find(
            w=>w.id==n&&
            ((unitId==0)?true:w.unitId==unitId)
            )
    }
    filterWord(id){
        return this.Words=this.Words.filter(w=>w.id!=id);
    }
    filterUnit(id){
        return this.Units=this.Units.filter(u=>u.id!=id);
    }
}

let newDb=new DB;


//METHODS


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
function getLastIdWord(){
    let newn=newDb.Words[0].id;
    newDb.Words.forEach(
        function(w){
            if(newn<w.id){
                newn=w.id;
            }
        }
    )
    return newn;
}
function getFirstIdWord(){
    let newn=newDb.Words[0].id;
    newDb.Words.forEach(
        function(w){
            if(newn>w.id){
                newn=w.id;
            }
        }
    )
    return newn;
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

function setDbLocalstorage(){
    window.localStorage.setItem("wordDb",JSON.stringify(newDb));
}

//Unit HTML
function synUnits(){
    if(newDb.Units.length>0){
        $("#UNIT ul").empty();
        $("#add-word .unit").empty();
        $("#word-question .selectUnit").empty();
        $("#add-word .unit").append(`<option value='0'>Secin</li>`);
        $("#word-question .selectUnit").append(`<option value='0'>Hamısı</li>`);
        newDb.Units.forEach(
            function(e){
                $("#UNIT ul").append(`<li data-id='${e.id}'>${e.name}</li>`);
                 $("#add-word .unit").append(`<option value='${e.id}'>${e.name}</li>`);
                 $("#word-question .selectUnit").append(`<option value='${e.id}'>${e.name}</li>`);
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
        $("#main-page .selectUnit").val(newDb.unitSelectVal);
        $("#main-page .languageSelect").val(newDb.languageVal);
    
};

//Generate random number

function generateRandomNumber (min, max){
    return Math.floor(Math.random() * (max - min) + min);
      };
function generateWordForQustion(){
    let unt=$("#main-page .selectUnit").val();
    let lang=$("#main-page .languageSelect").val();
    let rnm=generateRandomNumber(getFirstIdWord(),getLastIdWord());
    while(rnm==currentWordId){
        rnm=generateRandomNumber(getFirstIdWord(),getLastIdWord());
    }
    let word=newDb.findWord(rnm,unt);
    currentWordId=word.id;
    let first;
    let last;
    if(word){
        $("#word-question .main-word .last").addClass("d-none");
        $("#word-question .main-word svg").removeClass("d-none");
        $("#word-question .input .check-answer").removeClass("d-none");
        $("#word-question .input").removeClass("d-none");
        if(lang==0){
            let rndmN=generateRandomNumber(0,1);
            if(rndmN==1){
                first=  word.nameAz;
                last=  word.nameEn;
            }
            else{
                last=  word.nameAz;
                first=  word.nameEn;}
        }
        else if(lang=="az"){
            first=  word.nameAz;
                last=  word.nameEn;
        }
        else{
            last=  word.nameAz;
            first=  word.nameEn;
        } 
        $("#word-question .main-word .first").text(first);
        $("#word-question .main-word .last").text(last);
    }
}
function checkWord() {
    let translated=$("#word-question .main-word .last").text();
    let answer=$("#word-question .input input").val();
    if(answer&&answer.trim()){
        return translated.toLowerCase()==answer.toLowerCase();
    }
}
//HTML redy


$(document).ready(function() {
    //Menu accardion
    $(".w-nav-item").click(function(){
        let key=$(this).attr("data-id");
        newDb.activePage=key;
        setDbLocalstorage();
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

    //SYNC localstorage
    
    if(window.localStorage.getItem("wordDb")){
        newDb.Words=JSON.parse((window.localStorage.getItem("wordDb"))).Words;
        newDb.Units=JSON.parse((window.localStorage.getItem("wordDb"))).Units;
        newDb.activePage=JSON.parse((window.localStorage.getItem("wordDb"))).activePage;
        newDb.unitSelectVal=JSON.parse((window.localStorage.getItem("wordDb"))).unitSelectVal;
        newDb.languageVal=JSON.parse((window.localStorage.getItem("wordDb"))).languageVal;
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
        setDbLocalstorage();
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
                setDbLocalstorage();
                $("#add-word input").val("");
                $("#add-word input").val("");
                $("#add-word input").last().val("Əlavə et");
            }
        }
        event.preventDefault();
      });
      //Random click
      $("#word-question .random").click(function(){
        $(this).removeClass("d-none");
        $("#word-question .input .correct-icon").addClass("d-none");
        $("#word-question .input .wrong-icon").addClass("d-none");
          generateWordForQustion();
      })

      //Translate
      $(document).on("click","#word-question .main-word .word svg",function(e) {
        console.log("s");
        $("#word-question .main-word .last").last().removeClass("d-none");
    });

    //Check answer
    $("#word-question .input .check-answer").click(function(){
        let result=checkWord();
        if(result){
            $(this).addClass("d-none");
            $("#word-question .input .correct-icon").removeClass("d-none");

        }
        else{
            $(this).addClass("d-none");
            $("#word-question .input .wrong-icon").removeClass("d-none");

        }
    })
    $("#word-question .input input").keydown(function(){
        $("#word-question .input .check-answer").removeClass("d-none");
        $("#word-question .input .correct-icon").addClass("d-none");
        $("#word-question .input .wrong-icon").addClass("d-none");
    })
      //Clear localstorage
      RunPopUp("upopup-item","href",false,"Yaddaşı təmizləmək istədiyinizdən əminsinizmi?","Təmizlə","Bağla","fad fa-trash-alt")
      
      //sync pages
      synPage();
     
      //Romeve preloader
      $("#preloader").addClass("d-none");

      //select change event
      $("#main-page .selectUnit").change(function(){
        newDb.unitSelectVal=$(this).val();
        setDbLocalstorage()
      });
        $("#main-page .languageSelect").change(function(){
            newDb.languageVal=$(this).val();
            setDbLocalstorage();
        });
  });

  