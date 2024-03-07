let date = new Date()
let currMonth = date.getMonth()
let currMonthfix = date.getMonth()
let currYear = date.getFullYear()
let currYearfix = date.getFullYear()
var display = document.querySelector('.list_days')
var displayDate = document.querySelector('.hammagi_date span')
var prv = document.getElementById('prv')
var next = document.getElementById('next')
var today = document.getElementById('today')
var colorchecked = '';
var form = document.querySelectorAll('.form')
var valtitle = document.querySelector('.valtitle')
var valcate = document.querySelector('.valcate')
var valdesc = document.querySelector('.valdesc')
var valcolor = document.querySelector('.valcolor')
var valstart = document.querySelector('.valstart')
var valend = document.querySelector('.valend')
var DeleteE = document.getElementById('Delete')
var Edit = document.getElementById('Edit')
var cl = document.querySelectorAll('.color')
var clA = document.querySelectorAll('.colorA')
var prvi = false
var nexti = false
var IDE = ''
var currDay= new Date(currYear,currMonth,1).getDay()
var changetoweek = false
var changetoday = false
var TitleUpdate = document.getElementById('titleEdit')
var DescriptionUpdate = document.getElementById('descEdit')
var CategorieUpdate = document.querySelector('.cateEdit')
var StartUpdate = document.getElementById('startEdit')
var EndUpdate = document.getElementById('endEdit')
var categorieselected = ''
var colorselected = ''
var allevents = [];

var months = [
    "January", 
    "February", 
    "March", 
    "April", 
    "May", 
    "June", 
    "July", 
    "August", 
    "September", 
    "October", 
    "November", 
    "December",
  ];

function handelDetail(event){
    document.body.classList.add('ActiveDetail');
    const { Color, Title, Description, Categorie, Start, End, ID } = JSON.parse(decodeURIComponent(event));
    console.log({ Color, Title, Description, Categorie, Start, End, ID });
    colorchecked = Color;
    valtitle.innerHTML = Title;
    valdesc.innerHTML = Description;
    valcate.innerHTML = `<div class='colorA' style='background:${Color}'></div> ${Categorie}`;
    valstart.innerHTML = Start;
    valend.innerHTML = End;
    IDE = ID;

    // Update input values
    TitleUpdate.value = Title;
    DescriptionUpdate.value = Description;
    CategorieUpdate.innerHTML = `<div class='colorA' style='background:${Color}'></div> ${Categorie}`;
    EndUpdate.value = End;
    StartUpdate.value = Start;
}

document.querySelector('.close').addEventListener('click', () => document.body.classList.remove('ActiveDetail'));
document.getElementById('Close').addEventListener('click', () => document.body.classList.remove('ActiveDetail'));

function checkFormat1(Start,End){
    var yearStart = parseInt(Start.split(' ')[0].split('-')[0])
    var MonthStart = parseInt(Start.split(' ')[0].split('-')[1])
    var yearEnd = parseInt(End.split(' ')[0].split('-')[0])
    var MonthEnd = parseInt(End.split(' ')[0].split('-')[1])
    var HourStart = parseInt(Start.split(' ')[1].split(':')[0])
    var HourEnd = parseInt(End.split(' ')[1].split(':')[0])
    var MinStart = parseInt(Start.split(' ')[1].split(':')[1])
    var MinEnd = parseInt(End.split(' ')[1].split(':')[1])
    var StartDay = parseInt(Start.split(' ')[0].split('-')[2])
    var EndDay = parseInt(End.split(' ')[0].split('-')[2])
    return [yearStart,MonthStart,StartDay,HourStart,MinStart,yearEnd,MonthEnd,EndDay,HourEnd,MinEnd]
}



// get events with ajax using xhr
function getDataWithXHR() {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            console.log('Received Data:', data);
            // Handle data as needed
            allevents = data
            
            handelCalender()
        }
      
    };

    xhr.open('GET', 'getEvents.php', true);
    xhr.send();
}
getDataWithXHR();
var numberofweeks = 1
var numberofdays = 1
var firstdayofweek = 1
var lastdayofweek = 0
var daysofweek = 0
var lines =6;
handelCalender = async ()=>{
var numberDays = new Date(currYear,currMonth+1,0).getDate()
var nextMonthDays = 7 - (new Date(currYear, currMonth+1, 1).getDay());


// console.log('numberdays',numberDays)
        var firstDay= new Date(currYear,currMonth,1).getDay()
        
        numberDays+nextMonthDays+firstDay==42 ? lines=6 :lines=5
        var days = '';
        var j = 1
        let prevMonthDays = new Date(currYear, currMonth, 0).getDate();
if (!changetoweek) {
   lastdayofweek = numberDays 
}else if (numberofweeks==1) {
    lastdayofweek=7-firstDay
}else  if (nexti && numberofweeks>=lines) {
    lastdayofweek=numberDays
}else  if (prvi && numberofweeks>=lines) {
    lastdayofweek=numberDays
    firstdayofweek = numberDays +nextMonthDays - 6
}

if (!changetoday && !changetoweek) {
    firstdayofweek=1
        lastdayofweek=numberDays
        numberofweeks = 1
}
if (changetoday) {
    firstdayofweek=1
    lastdayofweek=1
    if (nexti && numberofdays>numberDays) {
        numberofdays=1
        currMonth+=1
    }else if(prvi && numberofdays<1){
        currMonth-=1
        numberofdays=new Date(currYear,currMonth+1,0).getDate()
        
    }
}

if (!changetoday && numberofweeks<=1) {
 for (let i = firstDay - 1; i >= 0; i--) {
            days += '<li class="other_month">' + (prevMonthDays - i) + '</li>';
            
        }   
}

        
        // yearStart,MonthStart,StartDay,HourStart,MinStart,yearEnd,MonthEnd,EndDay,HourEnd,MinEnd
       
        var count = []
        var count2 = []
        var ii = ''
        for (var index = firstdayofweek; index <= lastdayofweek; index++) {
            var t = false
            var uniqueDates = {};

// Filter the events and remove duplicates based on the 'Start' date
var events = allevents.filter(function (event) {
  var startDate = event.Start.split(' ')[0]; // Extracting the date part
  if (!uniqueDates[startDate]) {
    uniqueDates[startDate] = true;
    return true;
  }
  return false;
});
            for(i=0;i<events.length;i++){
                var check = checkFormat1(events[i].Start,events[i].End)
                
                if(index >= check[2] && index<= check[7] && currMonth+1<=check[6] && currMonth+1 >= check[1] && currYear <= check[5] && currYear >= check[0]){
                    var eventfilter = allevents.filter(e=>index >= e.Start.split(' ')[0].split('-')[2] && index <= e.End.split(' ')[0].split('-')[2])
                    console.log(eventfilter)
                    
                    // console.log('filter')
                    // console.log(eventfilter)
                    count.push({index:index,i:i})
                    var cas = count.find(v=>v.i == i).index == index
                    if (cas) {
                      var text = check[3]+":"+check[4]+" "+events[i].Title 
                    }else {
                     text = ''
                    }
                    var singledata = {ID:events[i].ID,Title:events[i].Title,Description:events[i].Description,Categorie:events[i].Categorie,Color:events[i].Color,Start:events[i].Start,End:events[i].End}
                    if (changetoweek) {
                        var eventsHTML = eventfilter.map((evf,ind) => {
                            singledata = {ID:evf.ID,Title:evf.Title,Description:evf.Description,Categorie:evf.Categorie,Color:evf.Color,Start:evf.Start,End:evf.End}
                            var ColorE = evf.Color
                            count2.push({index:index,i:ind})
                            var TitleE = evf.Title
                            return '<button onclick="handelDetail(\'' + encodeURIComponent(JSON.stringify(singledata)) + '\')" class="event" style="background:' + ColorE + '">' +TitleE+ '</button>';
                          }).join('');
                        //   console.log(eventsHTML)
                        days += index==date.getDate() && currYear==currYearfix && currMonth==currMonthfix ? '<li class="check" >'+index+eventsHTML+'</li>' :  '<li><div class="allevents">'+index+eventsHTML+'</div></li>';   

                    }else {
                        days += index==date.getDate() && currYear==currYearfix && currMonth==currMonthfix ? '<li class="check" onclick="handelDetail(\'' + encodeURIComponent(JSON.stringify(singledata)) + '\')">'+index+'<div class="event"  style="background:'+events[i].Color+'">'+text+'</div></li>' :  
                        '<li onclick="handelDetail(\'' + encodeURIComponent(JSON.stringify(singledata)) + '\')">'+index+'<div class="event"  style="background:'+events[i].Color+'">'+text+'</div></li>';   

                    }
                    t=true
                }
            }
       
            if (!t) {
                days += index==date.getDate() && currYear==currYearfix && currMonth==currMonthfix ? '<li class="check" >'+index+'</li>' :  '<li>'+index+'</li>';   

            }
       
            
            
        }
         if (!changetoday && numberofweeks>=lines) {
        for (let i = 1; i <= nextMonthDays; i++) {
            days += '<li class="other_month">' + i + '</li>';
        }  
         }
        

         if (!changetoday && !changetoweek) {
        for (let i = 1; i <= nextMonthDays; i++) {
            days += '<li class="other_month">' + i + '</li>';
        }  
         }
         const daysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        if (changetoday) {
            // 2024-03-22 18:32:00
            let header = `<div class='dayinfo'>${months[currMonth]} ${numberofdays}, ${currYear}</div>`;
            let currEvents = allevents.filter(event=>currYear>=parseInt(event.Start.split(' ')[0].split('-')[0]) && currYear<=parseInt(event.End.split(' ')[0].split('-')[0]) && parseInt(event.Start.split(' ')[0].split('-')[1])<=currMonth+1 && parseInt(event.End.split(' ')[0].split('-')[1])>=currMonth+1 && parseInt(event.Start.split(' ')[0].split('-')[2])<=numberofdays && parseInt(event.End.split(' ')[0].split('-')[2])>=numberofdays)            
            let content = currEvents.map(ev => {
                let singledataa = {
                    ID: ev.ID,
                    Title: ev.Title,
                    Description: ev.Description,
                    Categorie: ev.Categorie,
                    Color: ev.Color,
                    Start: ev.Start,
                    End: ev.End
                };
            
                let title = ev.Title;
                let h = ev.Start.split(' ')[1].split(':')[0];
                let m = ev.Start.split(' ')[1].split(':')[1];
                let color = ev.Color;
            
                return '<button onclick="handelDetail(\'' + encodeURIComponent(JSON.stringify(singledataa)) + '\')" class="eventt" style="background:' + color + '">' + h + ':' + m + ', ' + title + '</button>';
            }).join('');
            
            let container = `<div class='eventss'>${content}</div>`;
            console.log(container);
            display.innerHTML =`<div class='dayE'>${header + container}</div>` ;
            
        }else{
            display.innerHTML = days;
        
        }
      displayDate.innerHTML = months[currMonth]+' '+currYear;
        
        
      }

displayDate.innerHTML = months[currMonth]+' '+currYear

handelCalender()
prv.addEventListener('click', ()=>{
    prvi = true
    nexti = false
    if (changetoday && currMonth>=1) {
        numberofdays--
        
    }else if (changetoweek && currMonth>=1) {
        numberofweeks--
        if (numberofweeks<1) {
            currMonth -=1
            handelCalender()
            numberofweeks=lines
        }else if (numberofweeks==1) {
            firstdayofweek=1
        }
        else{
            
            lastdayofweek = firstdayofweek-1
            firstdayofweek = firstdayofweek-7
    //     console.log('first day :'+firstdayofweek)
    //    console.log('last day :'+lastdayofweek)
        }
    //    console.log('number of weeks ' + numberofweeks)
    }else{
    if (currMonth>=1) {
        currMonth -=1
    }else{
        currYear -=1
        currMonth = 11
    }
}
    handelCalender()
    
})
next.addEventListener('click', ()=>{
    prvi = false
    nexti = true
    if (changetoday && currMonth<11) {
        numberofdays++
        
    }
    else if (changetoweek && currMonth<11) {
        numberofweeks++
        if (numberofweeks>lines) {
            numberofweeks=1
            currMonth +=1
            firstdayofweek = 1
           
        }else{
            
            firstdayofweek = lastdayofweek+1
            lastdayofweek = lastdayofweek +7
         
        }
       
    }else{
    if (currMonth<11) {
        currMonth +=1
    }else{
        currYear +=1
        currMonth = 0
    }
}
    handelCalender()
    
    
})
today.addEventListener('click', ()=>{
 currMonth = date.getMonth()
 currYear = date.getFullYear()
 daysofweek=0
    handelCalender()
    
})

// send request to php server with ajax yooo

document.getElementById("add").addEventListener("click", sendData);
var Start = document.getElementById('start')
var End = document.getElementById('end')
function closeerror (){
    document.body.classList.remove('Activeerror') 
}
function sendData() {
    var yearStart = parseInt(Start.value.split('-')[0])
    var MonthStart = parseInt(Start.value.split('-')[1])
    var yearEnd = parseInt(End.value.split('-')[0])
    var MonthEnd = parseInt(End.value.split('-')[1])
    var HourStart = parseInt(Start.value.split('-')[2].split('T')[1].split(':')[0])
    var HourEnd = parseInt(End.value.split('-')[2].split('T')[1].split(':')[0])
    var MinStart = parseInt(Start.value.split('-')[2].split('T')[1].split(':')[1])
    var MinEnd = parseInt(End.value.split('-')[2].split('T')[1].split(':')[1])
    var StartDay = parseInt(Start.value.split('-')[2].split('T')[0])
    var EndDay = parseInt(End.value.split('-')[2].split('T')[0])
    

//verify how to setup date between start and end for one year exa 2024
var message = document.querySelector('.message')

if(yearStart!=yearEnd){
    document.body.classList.add('Activeerror')
    message.innerHTML = 'The same year must be chosen for the task'
}else if(MonthStart!=MonthEnd){
    document.body.classList.add('Activeerror')
  message.innerHTML = 'The same month must be chosen for the task'

}else if(StartDay>EndDay){
    document.body.classList.add('Activeerror')
    message.innerHTML = 'The start day must be smaller than the end day'

}
else if(HourStart>HourEnd){
    document.body.classList.add('Activeerror')
    message.innerHTML = 'The start hour must be smaller than the end hour'

}else if(MinStart>MinEnd){
    document.body.classList.add('Activeerror')
    message.innerHTML = 'The start minute must be smaller than the end minute'

}else{
  //  Your data to be sent to the server
    var dataAA = {
        title: document.getElementById('title').value,
        Categorie: categorieselected,
        Description: document.getElementById('desc').value,
        Color: colorselected,
        Start: document.getElementById('start').value,
        End: document.getElementById('end').value,
        // Add more key-value pairs as needed
    };
    
    fetch('events.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataAA),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Handle success, if needed
        location.reload();
    })
    .catch((error) => {
        console.error('Error:', error);
        // Handle errors, if needed
    });
}
   
}


function toggleCategories() {
    document.body.classList.toggle('Activecolor');
  }
function toggleCa() {
    document.body.classList.toggle('Activef');
  }

  document.addEventListener('click', function(event) {
    var categoriess = document.getElementById('categoryListt');
    var selectButtonn = document.getElementById('selectt');
    var categories = document.getElementById('categoryList');
    var selectButton = document.getElementById('select');

    // Check if the click is outside the categories and the select button
    if (event.target !== categories && event.target !== selectButton) {
      document.body.classList.remove('Activecolor');
    }
    if (event.target !== categoriess && event.target !== selectButtonn) {
      document.body.classList.remove('Activef');
    }
  });
function checkcolor(e){
    categorieselected = e.categorie
    colorselected = e.color
    console.log(categorieselected+' '+colorselected)
    document.getElementById('catshow').innerHTML = `<div class='colorA' style='background:${colorselected}'></div>${categorieselected}`
}
//delete data
function DeleteEvent(){
    var eventIdToDelete = IDE; // Replace with the actual ID of the event you want to delete
  
    var xhr = new XMLHttpRequest();
    
    // Configure the request
    xhr.open('POST', 'delete_event.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    
    // Set up the callback function to handle the response
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // Successful response
                var response = JSON.parse(xhr.responseText);
                console.log('Server response:', response);
                location.reload();
            } else {
                // Handle errors
                console.error('Error:', xhr.statusText);
            }
        }
    };
    
    // Prepare the data to send
    var data = 'id=' + encodeURIComponent(eventIdToDelete);
    
    // Send the request
    xhr.send(data);
    
}
//edit event
function EditEvent(){
    var eventIdToUpdate = IDE; 


var eventData = {
    id: eventIdToUpdate,
    Title: TitleUpdate.value,
    Description: DescriptionUpdate.value,
    Categorie: categorieselected,
    Color: colorselected,
    Start: StartUpdate.value,
    End: EndUpdate.value
};

var xhr = new XMLHttpRequest();

xhr.open('POST', 'Edit_event.php', true);
xhr.setRequestHeader('Content-Type', 'application/json');


xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            
            var response = JSON.parse(xhr.responseText);
            console.log('Server response:', response);
            location.reload();
        } else {
           
            console.error('Error:', xhr.statusText);
        }
    }
};

// Convert the data to JSON format
var jsonData = JSON.stringify(eventData);

// Send the request
xhr.send(jsonData);

    }
function  handelEdit(){
    document.querySelector('.information').classList.add('AciveEdit')
}



// show weeks 

function handelmonths(){
        changetoweek = false
        changetoday = false
        document.body.classList.remove('monthactive')
        document.body.classList.remove('dayactive')
        document.body.classList.add('yactive')
        handelCalender()
}
// show weeks 

function handelweeks(){
         daysofweek = 0
         changetoweek = true
         changetoday = false
        handelCalender()
        document.body.classList.add('monthactive')
        document.body.classList.remove('dayactive')
        document.body.classList.remove('yactive')
}
// show days 

function handeldays(){
        
         changetoweek = false
         changetoday = true
        handelCalender()
        document.body.classList.add('dayactive')
        document.body.classList.remove('monthactive')
        document.body.classList.remove('yactive')
 
}

function handelcancel(){
     document.getElementById('title').value=""
    // categorieselected,
     document.getElementById('desc').value=""
    // colorselected,
    document.getElementById('start').value=""
    document.getElementById('end').value=""
    document.getElementById('catshow').innerHTML=""
}
