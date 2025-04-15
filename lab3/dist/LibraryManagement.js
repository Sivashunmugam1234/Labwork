"use strict";
class Library {
    constructor() {
        this.StudentQueue = [];
        this.Books = [];
    }
    addStudentRequest(name, id, requestedBook) {
        const request = {
            studentDetail: {
                name,
                id,
            },
            requestedBook,
        };
        this.StudentQueue.push(request);
    }
    ShowRequest() {
        this.StudentQueue.forEach((element) => {
            console.log(element);
        });
    }
    addBook(name, id, author) {
        const Book = {
            id,
            name,
            author,
        };
        this.Books.push(Book);
    }
    ShowBook() {
        this.Books.forEach((element) => {
            console.log(element);
        });
    }
    lendBook() {
        const request = this === null || this === void 0 ? void 0 : this.StudentQueue[0];
        const bookindex = this.Books.findIndex((book) => book.name === request.requestedBook);
        if (bookindex !== -1) {
            const removedRequest = this.StudentQueue.shift();
            const removedbook = this.Books.splice(bookindex, 1);
            console.log(`${removedRequest === null || removedRequest === void 0 ? void 0 : removedRequest.studentDetail.name}lended book${removedbook[0].name}`);
            this.lendBook();
        }
        else {
            console.log("book not found");
        }
    }
}
const library = new Library();
library.addStudentRequest("John Doe", 1, "JavaScript for Beginners");
library.addStudentRequest("Jane Smith", 2, "Atomic Habits");
library.addStudentRequest("Alice Johnson", 3, "1984");
console.log("Student Requests:");
library.ShowRequest();
library.addBook("Atomic Habits", 10, "James Clear");
library.addBook("1984", 11, "George Orwell");
library.addBook("JavaScript for Beginners", 12, "Mark Zuckerberg");
console.log("Available Books:");
library.ShowBook();
console.log("Lending Books:");
library.lendBook();
