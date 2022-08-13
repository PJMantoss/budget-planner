export default class BudgetPlanner {
    constructor(querySelectorString){
        this.root = document.querySelector(querySelectorString);
        //console.log(this.root)
        //take html string and inject into function
        this.root.innerHTML = BudgetPlanner.html(); 

        this.root.querySelector(".new-entry")
        .addEventListener("click", () => {
            this.onNewEntryBtnClick();
        })

        //Load initial data from localStorage
        this.load();
    }

    //method that returns html for the actual table
    static html(){}

    //returns html string for a row inside the html table
    static entryHtml(){}

    //Initial loading of the data
    load(){}

    //takes all the current rows in the table, 
    //calculate their total & display result in the bottom right
    updateSummary(){}

    //Takes all the data and save to localStorage
    //so that it persists when browser is refreshed
    save(){}

    //takes in an object param and adds new entry inside the table.
    addEntry(entry = {}){}

    //Returns all entries (active rows) inside the table
    getEntryRows(){}

    //On click, function runs to add a new entry
    onNewEntryBtnClick(){}

    //runs on clicking the delete button (X)
    onDeleteEntryBtnClick(e){}
}