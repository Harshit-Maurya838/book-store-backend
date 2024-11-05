const Book = require("./book.model");

const postABook = async(req,res)=>{
    try{
        const newBook = await Book({...req.body});
        await newBook.save()
        res.status(200).send({message: "Book Posted successfully", book: newBook})
    }catch(error){
        console.log("Error creating book",error);
        res.status(500).send({message: "Failed to create a book"})
    }
}

//get all books
const getAllBooks = async(req,res)=>{
    try{
        const books = await Book.find().sort({createdAT: -1});
        res.status(200).send(books)
    }catch(error){
        console.log("Error fetching books",error);
        res.status(500).send({message: "Failed to fetch books"})
    }
}
//get single book
const getSingleBook = async(req,res) =>{
    try{
        const {id}= req.params;
        const book = await Book.findById(id);
        if(!book){
            res.status(404).send({message: "Book Not Found"})
        }
        res.status(200).send(book)
    }catch(error){
        console.log("Error fetching book",error);
        res.status(500).send({message: "Failed to fetch book"})
    }
}

// update book data
const updateBook = async(req,res)=>{
    try{
        const {id}= req.params;
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, {new: true});
        if(!updatedBook){
            res.status(404).send({message: "Book Not Found!"})
        }
        res.status(200).send({message: "Book updated successfully" , book: updatedBook})
    }catch(error){
        console.log("Error updating a book",error);
        res.status(500).send({message: "Failed to update book"})
    }
}

// delete book data
const deleteBook = async(req,res)=>{
    try{
        const {id}= req.params;
        const deletedBook = await Book.findByIdAndDelete(id, req.body, {new: true});
        if(!deletedBook){
            res.status(404).send({message: "Book Not Found!"})
        }
        res.status(200).send({message: "Book deleted successfully" , book: deletedBook})
    }catch(error){
        console.log("Error deleteing a book",error);
        res.status(500).send({message: "Failed to delete a book"})
    }
}

module.exports = { postABook, getAllBooks,getSingleBook, updateBook, deleteBook}