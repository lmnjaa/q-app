export default {
    findAll: `SELECT * FROM Books;`,
    findById: `SELECT * FROM Books WHERE Books.id = ?;`,
    update: `UPDATE Books SET Books.title = ?, Books.publisher = ?, Books.User_id = ? WHERE User.id = ?`,
    create: `INSERT INTO Books ('title', 'publisher', 'User_id') VALUES (?, ?, ?);`,
    delete: `DELETE FROM Books WHERE id = ?;`
}