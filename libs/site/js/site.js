let no=1;
let wNo=1;
let employeeId=1;
let currentWordId=null;
let addingJson=false;

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
    findWordByUnitId(unitId)
    { let w=this.Words;
        return w.filter(
            w=>w.unitId==unitId
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
        $("#UNIT .word-content").empty();
        let cnt=1;
        $("#add-word .unit").empty();
        $("#edit-word .unit").empty();
        $("#word-question .selectUnit").empty();
        $("#all-word .unit").empty();
        $("#all-word .selectUnit").empty();
        $("#add-word .unit").append(`<option value='0'>Secin</li>`);
        $("#all-word .unit").append(`<option value='0'>Hamısı</li>`);
        $("#edit-word .unit").append(`<option value='0'>Hamısı</li>`);
        $("#word-question .selectUnit").append(`<option value='0'>Hamısı</li>`);
        newDb.Units.forEach(
            function(e){
                $("#add-word .unit").append(`<option value='${e.id}'>${e.name}</li>`);
                 $("#word-question .selectUnit").append(`<option value='${e.id}'>${e.name}</li>`);
                 $("#all-word .unit").append(`<option value='${e.id}'>${e.name}</li>`);
                 $("#edit-word .unit").append(`<option value='${e.id}'>${e.name}</li>`);
                 $("#UNIT .word-content")
                .append(`
                <tr data-id=${e.id}>
                    <th scope="row">${cnt}</th>
                    <td>${e.name}</td>
                    <td>
                        <span class="edit"><i title="Düzəliş et" class="fal fa-edit"></i></span>
                        <span class="remove"><i title="Sil" class="fal fa-trash-alt"></i></span>
                    </td>
                </tr>
                `);
               cnt++;
                }
        ); 
       
    }
}

function synWords(words=[],searchWord=false){
    if(!searchWord){
        words=newDb.Words;
    }
    $("#all-word .word-content").empty();
    if(words.length>0){
        let cnt=1;
        words.forEach(
            function(e){
                $("#all-word .word-content")
                .append(`
                <tr data-id=${e.id}>
                    <th scope="row">${cnt}</th>
                    <td>${e.nameAz}</td>
                    <td>${e.nameEn}</td>
                    <td>${((newDb.findUnit(e.unitId)!=undefined)?newDb.findUnit(e.unitId).name:"Yoxdur")}</td>
                    <td>
                        <span class="edit"><i title="Düzəliş et" class="fal fa-edit"></i></span>
                        <span class="remove"><i title="Sil" class="fal fa-trash-alt"></i></span>
                    </td>
                </tr>
                `);
               cnt++;
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
    let words=((unt>0)?newDb.findWordByUnitId(unt):newDb.Words);
    if(words.length>0){
        let rnm=0;
        if(words.length>1){
            rnm=generateRandomNumber(0,words.length);
            while(rnm==currentWordId){
                rnm=generateRandomNumber(0,words.length);
            }
        }
        let word=words[rnm];
        currentWordId=rnm;
        let first;
        let last;
        if(word){
              $("#word-question input").val("");
              $("#word-question .main-word .last").addClass("d-none");
              $("#word-question .main-word svg").removeClass("d-none");
              $("#word-question .input .check-answer").removeClass("d-none");
              $("#word-question .input").removeClass("d-none");
              if(lang==0){
                 let rndmN=generateRandomNumber(0,2);
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
    
}
function checkWord() {
    let translated=$("#word-question .main-word .last").text();
    let answer=$("#word-question .input input").val();
    
    if(answer&&answer.trim()){
        return translated.split(",")
        .some(x=>answer.split(",")
        .some(y=>y.toLowerCase()==x.toLowerCase()));
    }
}

//Search word
function searchWord(unitId,nameAz,nameEn){

    let words=newDb.Words;
       return words.filter(x=>
            ((unitId==0)?true:x.unitId==unitId)&&
            ((nameAz==undefined||nameAz==null||nameAz==''||nameAz.trim()=="")?true:x.nameAz.toLowerCase().includes(nameAz.toLowerCase()))&&
            ((nameEn==undefined||nameEn==null||nameEn==''||nameEn.trim()=="")?true:x.nameEn.toLowerCase().includes(nameEn.toLowerCase()))
            )
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
        if(window.screen.width<993){
            $(".dashboard-nav").removeClass("mobile-show");
        }
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




    //edit word
    $(document).on("click","#all-word .edit",function(){
        $(".edit-word-overlay").removeClass("d-none");
       let id= $(this).closest("tr").attr("data-id");
       let tempWord=newDb.findWord(id,0);
       $("#edit-word .id").val(id);
       $("#edit-word .unit").val(tempWord.unitId);
       $("#edit-word .az").val(tempWord.nameAz);
       $("#edit-word .en").val(tempWord.nameEn);
    });

    //Edit Unit
    $(document).on("click","#UNIT .edit",function(){
        $(".edit-unit-overlay").removeClass("d-none");
       let id= $(this).closest("tr").attr("data-id");
       let tempWord=newDb.findUnit(id);
       $("#edit-unit .id").val(id);
       $("#edit-unit .name").val(tempWord.name);
    });

    //modal edit word

    $(document).on("click","#edit-word .edit",function(e){
        e.preventDefault();
          let id=$("#edit-word .id").val();
          newDb.findWord(id,0).unitId=$("#edit-word .unit").val();
          newDb.findWord(id,0).nameAz=$("#edit-word .az").val();
          newDb.findWord(id,0).nameEn=$("#edit-word .en").val();
     
          setDbLocalstorage();
          synWords();
          $("#edit-word .unit").val('0');
          $("#edit-word .az").val();
          $("#edit-word .en").val();
          $(".edit-word-overlay").addClass("d-none")
    });
    //Modal edit unit
    $(document).on("click","#edit-unit .edit",function(e){
        e.preventDefault();
          let id=$("#edit-unit .id").val();
          newDb.findUnit(id).name=$("#edit-unit .name").val();
     
          setDbLocalstorage();
          synUnits();
          synWords();
          $("#edit-unit .name").val();
          $(".edit-unit-overlay").addClass("d-none")
    });

    
     //remove word

     $(document).on("click","#all-word .remove",function(){
       let id= $(this).closest("tr").attr("data-id");
       newDb.filterWord(id);
       setDbLocalstorage();
       synWords();

    });

     //remove unit

     $(document).on("click","#UNIT .remove",function(){
        let id= $(this).closest("tr").attr("data-id");
        if(newDb.Words.some(x=>x.unitId==id)){
            alert("Bölməyə aid sözlər olduğu üçün bölmə silinə bilməz.")
            return;
        }
        newDb.filterUnit(id);
        setDbLocalstorage();
        synWords();
        synUnits();
     });


    ///close edit modal
    $(document).on("click",".forClose",function(){
        $("#edit-word .unit").val('0');
       $("#edit-word .az").val();
       $("#edit-word .en").val();
        $(".edit-word-overlay").addClass("d-none")
    });
    $(document).on("click","#edit-word .close",function(){
        $("#edit-word .unit").val('0');
       $("#edit-word .az").val();
       $("#edit-word .en").val();
        $(".edit-word-overlay").addClass("d-none")
    });

    ///close edit modal
    $(document).on("click",".forClose2",function(){
       $("#UNIT .name").val();
        $(".edit-unit-overlay").addClass("d-none")
    });
    $(document).on("click","#edit-unit .close",function(){
        $("#edit-unit .name").val();
        $(".edit-unit-overlay").addClass("d-none")
    });


    //all words table filter
    $(document).on("change","#all-word .unit",function(e){
        let uId=$(this).val();
        let az=$("#all-word .nAz").val();
        let en=$("#all-word .nEn").val();
        let words=searchWord(uId,az,en);
        synWords(words,true);
    })
    $(document).on("keyup","#all-word .nAz",function(e){
        let uId=$("#all-word .unit").val();
        let az=$("#all-word .nAz").val();
        let en=$("#all-word .nEn").val();
        let words=searchWord(uId,az,en);
        synWords(words,true);
    })
    $(document).on("keyup","#all-word .nEn",function(e){
        let uId=$("#all-word .unit").val();
        let az=$("#all-word .nAz").val();
        let en=$("#all-word .nEn").val();
        let words=searchWord(uId,az,en);
        synWords(words,true);
    })

    //Add json

    $(document).on("click","#add-json svg",function(){
        $("#add-json input").click();
    })
    $("#add-json input").change(function (event) {
        $("#add-json .json-alert").addClass("d-none");
        $("#add-json button").addClass("d-none");
        $("#add-json .units").empty();
        $("#add-json .words").empty();
        let file=event.target.files[0];
        if(file.type!="application/json"){
            $("#add-json .json-alert").removeClass("d-none");
            $(this).val("");
        }
        if ($(this).val() != ""&&$(this).val()) {
             let reader = new FileReader;
             reader.onloadend = function (rd) {
                $("#add-json button").removeClass("d-none");
                 let json=JSON.parse(rd.target.result);
                 $("#add-json .units").append(`<span>Bölmələr : </span>`)
                 $("#add-json .words").append(`<span>Sözlər : </span>`)
                 json.Units.forEach((x)=>{
                    $("#add-json .units").append(`<span>${x.name} </span>`)
                 })
                 json.Words.forEach((x)=>{
                    $("#add-json .words").append(`<span>${x.nameAz} </span>`)
                 })
                 addingJson=json;
             }
             reader.readAsText(file);
             
            // $("#profilePhoto img").removeClass("d-none");
            // $("#addPhoto").text("Edit photo");
        }
        else {
            // $("#profilePhoto img").attr("src", "");
            // $("#profilePhoto img").addClass("d-none");
            // $("#addPhoto").text("Add photo");
        }
    
    });
    $("#add-json button").click(function(){
        if(addingJson){
            newDb.activePage=addingJson.activePage;
            newDb.unitSelectVal=addingJson.unitSelectVal;
            newDb.languageVal=newDb.languageVal;
            addingJson.Units.forEach((x)=>{
                newDb.Units.push(x);
             })
             addingJson.Words.forEach((x)=>{
                newDb.Words.push(x);
             })
             console.log(newDb.Words);
            setDbLocalstorage();
            findLastIdUnit();
            findLastIdWord();
            synWords();
            synUnits();
            synPage();
            window.location.reload();

        }
    })



   // $(document).on("click","#edit-word")
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

  