var mainEl = document.querySelector(`.container-lg`);
var currentHour = parseInt(dayjs().format(`HH`)); //capturing current hour
var divArr = mainEl.querySelectorAll(`div`); //array the captures all the divs

// display the current date in the header of the page.
var currDay = document.querySelector(`#currentDay`);
currDay.textContent = dayjs().format(`DD-MMM-YYYY, dddd`);


$(function () {
    timeFormat(); //function applying formatting to the time-block according to current time.
    refreshPage(); //rewriting textarea with the local storage.
    let saveBtn = mainEl.querySelectorAll(`button`); // array of the buttons
    for (let i = 0; i < saveBtn.length; i++) {
        saveBtn[i].addEventListener(`click`,function(e){ //for every savebutton, it checks for click event
            let j = i * 2; //using i*2 as the array has all the divs and time block is every even numbered div.
            let textEl = divArr[j].querySelector(`.description`);
           
            //capturing the id of time-block to be used as a key for localstorage key
            let localStorageKey = parseInt(divArr[j].getAttribute(`id`)); 
            localStorage.setItem(`${localStorageKey}`, textEl.value);
        });
    }
});
 
function timeFormat(){
    for(let i = 0; i<divArr.length;i+=2){ //using i+2 as the array has all the divs and time block is even numbered div.
        let timeBlock = parseInt(divArr[i].getAttribute(`id`)); // converting id(string) to an int
        let textEl = divArr[i].querySelector(`.description`);   //capturing the textarea element per time-block
        
        //comparing the time block with current hour to apply appropriate styling.
        // also hard coding all the classes because it was overriding the existing classes.
        if(timeBlock < currentHour){
            textEl.setAttribute(`class`,`col-8 col-md-10 description past`);
        }else if(timeBlock === currentHour){
            textEl.setAttribute(`class`,` col-8 col-md-10 description present`);
        }else{
            textEl.setAttribute(`class`,` col-8 col-md-10 description future`);
        }
    }
}

function refreshPage(){
    for(let i = 0; i<divArr.length;i+=2)//using i+2 as the array has all the divs and time block is even numbered div.
    {
        //capturing the id of time-block to be used as a key for localstorage key
        let localStorageKey = parseInt(divArr[i].getAttribute(`id`));
        let textEl = divArr[i].querySelector(`.description`);
        textEl.value = localStorage.getItem(localStorageKey);
    }
}
