var xmlhttp = new XMLHttpRequest();
var totalData = [];
var currentData = [];
var currentPageNum = 1 ;
var entries = 10;
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myObj =JSON.parse(this.responseText); 
        let len=myObj.length;
        totalData=[];
        for(let i=0;i<len;i++){
            totalData.push(myObj[i]);
            currentData.push(myObj[i]);
        } 
        createLeaderboard(myObj); 
        
    }
  };
  
xmlhttp.open("GET","https://restcountries.eu/rest/v2/all",true);
xmlhttp.send();

function createLeaderboard(myObj){
    let len=myObj.length;
    // currentData=[];
    // for(let i=0;i<len;i++){
    //     currentData.push(myObj[i]);
    // }
    entries=parseInt(document.getElementById("numEntries").value);
    var startIndex = (currentPageNum - 1) * entries ;
    var endIndex = startIndex + entries ; //endIndex not included
    if(len <= endIndex)endIndex = len;

    var table = "<table><tr><th>No</th><th>Country</th><th>Capital</th><th>Population</th><th>Flag</th><th>Region</th></tr>";

    for(let i = startIndex; i < endIndex; i++){
        table += "<tr><td>"+ (i+1) +"</td><td>"+myObj[i].name+"</td><td>"+myObj[i].capital+"</td> <td>"+
        myObj[i].population+"</td> <td>" + "<img class='flag' src = '" + myObj[i].flag + "'></img>"+"</td> <td>"+myObj[i].region+"</td> </tr>" ;
    }

    table += "</table>";
    document.getElementById("data").innerHTML=table;

    document.getElementById("start").innerHTML = startIndex + 1;
    document.getElementById("end").innerHTML = endIndex;
    document.getElementById("total").innerHTML = len;
    
    pagination(myObj);
}

function search(totalData){
    currentPageNum = 1 ;
    var keyword = document.getElementById("searchKey").value.toLowerCase();
    if(keyword == ""){
        currentData = totalData;
    }
    else {
        currentData = totalData.filter(function(value){
            return value.name.toLowerCase() == keyword || value.capital.toLowerCase() == keyword || value.region.toLowerCase() == keyword;
        });
    }
    
    createLeaderboard(currentData);
}

function pagination(data){
    var totalRow = data.length;
    var rowPerPage = entries ;
    let pageNum = 1;
    var buttongroup = "";
    // debugger;
    while((pageNum-1) * rowPerPage < totalRow){
        buttongroup += "<button id = 'goToPageNum" + pageNum + "' onclick = 'gotofunction(this)'>" + pageNum + "</button>"
        pageNum++;
    }
    document.getElementById("goToPage").innerHTML = buttongroup;
    document.getElementById("goToPageNum"+currentPageNum).style.backgroundColor = "red";
}

function gotofunction(buttonObj){
    currentPageNum = buttonObj.innerHTML;
    console.log("clicked page"+currentPageNum);
    createLeaderboard(currentData);
}



document.getElementById("numEntries").onchange=function f(){
        createLeaderboard(currentData);
        // console.log(currentData);      
}

document.getElementById("sort").onchange = function f(){

       var sortingfactor = document.getElementById("sort").value;
       console.log("sortBycalled");
       currentData.sort(function(a, b){
           if(sortingfactor == "Population")return a.population - b.population ;
           if(sortingfactor == "Name")return (a.name < b.name) ? -1 : 1 ;
           if(sortingfactor == "Capital")return (a.capital < b.capital) ? -1 : 1 ; 
           if(sortingfactor == "Region")return (a.region < b.region) ? -1 : 1 ;          
        });
        
        createLeaderboard(currentData);
    
    }
document.getElementById("searchButton").onclick=function f(){
    search(totalData);
}
// document.getElementById("nextButton").onclick=function f(){
//     console.log("nextbutton clicked");
//     paging(now,1);
// }
// document.getElementById("previousButton").onclick=function f(){
//     console.log("Previousbutton clicked");
//     paging(now,-1);
// }
