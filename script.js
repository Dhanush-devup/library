class Book{
    constructor(title,author,pages,status){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = (status=="read")? true : false ;
    this.uid = crypto.randomUUID();
    }
}


let books = [
    new Book(
        "The Hobbit",
        "J.R.R. Tolkien",
        310,
        "read"
    ),

    new Book(
        "Atomic Habits",
        "James Clear",
        320,
        "not read"
    )
];
const form = document.querySelector('#book');
const table = document.querySelector('#table_body');






function display(){
    table.innerHTML = '';
    for (book of books)
    {
        let ele = document.createElement("tr");
        let title = document.createElement("td");
        title.innerHTML = book.title;
        let author = document.createElement("td");
        author.innerHTML = book.author;
        let pages = document.createElement("td");
        pages.innerHTML = book.pages;


        let status = document.createElement("td");
        let btt = document.createElement("button");
        btt.innerHTML = (book.status==true)?"Read":"Not Read";
        btt.className = 'status';
        btt.dataset.uid = book.uid;
        status.appendChild(btt);

        let del_btt = document.createElement("td");
        let del = document.createElement("button");
        del.innerHTML = "Delete"
        del.dataset.uid = book.uid;
        del_btt.appendChild(del);


        ele.appendChild(title);
        ele.appendChild(author);
        ele.appendChild(pages);
        ele.appendChild(status);
        ele.appendChild(del_btt);
        table.appendChild(ele);
    }
}



form.addEventListener('submit',function (e){
    e.preventDefault();
    
    const formData = new FormData(form);

    const title = formData.get("title");
    const author = formData.get("author");
    const pages = formData.get("pages");
    const status = formData.get("status");

    // console.log(obj);
    let obj = new Book(title,author,pages,status);
    // console.log(obj);
    books.push(obj);
    for (ele of books){
    console.log(ele);
}
    form.reset();
    display();
})
table.addEventListener('click',function(e){
    if (e.target.tagName=="BUTTON" && e.target.className != 'status' )
    {
        books = books.filter(function(ele) {
            return ele.uid != e.target.dataset.uid;
        })
    }
    else if (e.target.tagName=="BUTTON" && e.target.className == 'status')
    {
        let uid = e.target.dataset.uid;
        for (let i=0;i<books.length;i++ ){
            if (books[i].uid == uid)
            {
                books[i].status = ! books[i].status;
                break;
            }
        }
    }
    display();
    for (ele of books)
    {
        console.log(ele);
    }
})
display();




