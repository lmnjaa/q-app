export default {
    findAll: `SELECT * FROM Books;`,
    findById: `SELECT * FROM Books WHERE Books.id = ?;`,
    create: `INSERT INTO Books ('title', 'publisher', 'user_id') VALUES (?, ?, ?);`,
    delete: `DELETE FROM Books WHERE id = ?;`
}