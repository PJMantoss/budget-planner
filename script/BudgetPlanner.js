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
    static html(){
        return `
            <table class="budget-planner">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody class="entries"></tbody>
                <tbody>
                    <tr>
                        <td colspan="5" class="controls">
                            <button type="submit" class="new-entry">New Entry</button>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="5" class="summary">
                            <strong>Total</strong>
                            <span>$0.00</span>
                        </td>
                    </tr>
                </tfoot>
            </table>
        `;
    }

    //returns html string for a row inside the html table
    static entryHtml(){
        return `
            <tr>
                <td>
                    <input type="date" class="input input-date">
                </td>
                <td>
                    <input 
                        type="text" 
                        class="input input-description"
                        placeholder="Description"
                    >
                </td>
                <td>
                    <select name="" id="" class="input input-type">
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </td>
                <td>
                    <input type="number" name="" class="input input-amount">
                </td>
                <td>
                    <button type="submit" class="delete-entry">&#10005;</button>
                </td>
            </tr>
        `;
    }

    //Initial loading of the data
    load(){
        const entries = JSON.parse(localStorage.getItem("budget-planner-entries") || "[]");
        console.log(entries)
        for (const entry of entries){
            this.addEntry(entry);
        }

        this.updateSummary();
    }

    //takes all the current rows in the table, 
    //calculate their total & display result in the bottom right
    updateSummary(){}

    //Takes all the data and save to localStorage
    //so that it persists when browser is refreshed
    save(){
        //take all rows & convert to an array of objects to be saved
        const data = this.getEntryRows().map(row => {
            return {
                date: row.querySelector(".input-date").value,
                description: row.querySelector(".input-description").value,
                type: row.querySelector(".input-type").value,
                amount: parseFloat(row.querySelector(".input-amount").value)
            }
        });

        localStorage.setItem("budget-planner-entries", JSON.stringify(data));
        this.updateSummary();
    }

    //takes in an object param and adds new entry inside the table.
    addEntry(entry = {}){
        this.root.querySelector(".entries").insertAdjacentHTML("beforeend", BudgetPlanner.entryHtml());

        const row = this.root.querySelector(".entries tr:last-of-type");

        row.querySelector(".input-date").value = entry.date || new Date().toISOString().replace(/T.*/, "");
        row.querySelector(".input-description").value = entry.description || "";
        row.querySelector(".input-type").value = entry.type || "income";
        row.querySelector(".input-amount").value = entry.amount || 0;

        row.querySelector(".delete-entry").addEventListener("click", e => {
            this.onDeleteEntryBtnClick(e);
        })

        //call the save() method to commit changes to the localStorage
        row.querySelectorAll("input").forEach(input => {
            input.addEventListener("change", () => this.save());
        })
    }

    //Returns all entries (active rows) inside the table
    getEntryRows(){
        return Array.from(this.root.querySelectorAll(".entries tr"))
    }

    //On click, function runs to add a new entry
    onNewEntryBtnClick(){
        this.addEntry();
    }

    //runs on clicking the delete button (X)
    onDeleteEntryBtnClick(e){
        e.target.closest("tr").remove();
    }
}

/*
<tr>
    <td>
        <input type="date" class="input input-date">
    </td>
    <td>
        <input 
            type="text" 
            class="input input-description"
            placeholder="Description"
        >
    </td>
    <td>
        <select name="" id="" class="input input-type">
            <option value="income">Income</option>
            <option value="expense">Expense</option>
        </select>
    </td>
    <td>
        <input type="number" name="" class="input input-amount">
    </td>
    <td>
        <button type="submit" class="delete-entry">&#10005;</button>
    </td>
</tr>
*/