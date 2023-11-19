const inputEl = document.getElementById('input-el');
const inputBtn = document.getElementById('input-btn');
const deleteBtn = document.getElementById('delete-btn');
const saveTabBtn = document.getElementById("save-tab");
let myLeads = [] ;
const ulEl = document.getElementById('ul-el');

 let leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads"))


if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage ;
    renderLeads(myLeads)
}

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value);
    //ulEl.innerHTML+= "<li>"+inputEl.value+"</li>";
    inputEl.value="" ;
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    renderLeads(myLeads);
})

deleteBtn.addEventListener("dblclick", ()=> {
    localStorage.clear();
    myLeads=[];
    renderLeads(myLeads);
})
saveTabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        renderLeads(myLeads)
    })
})
function renderLeads(Leads) {
    let listItems = ""
    for (let i = 0; i < Leads.length; i++) {
        listItems += `
        <li> 
            <a href = " ${Leads[i]}" target="_blank" > ${Leads[i]}
            </a> 
        </li>`
    }
    ulEl.innerHTML = listItems  
}


