export default {
    findAll: `SELECT * FROM Users;`,
    findById: `SELECT * FROM Users WHERE Users.id = ?;`,
    create: `INSERT INTO Users (firstName, lastName, email, role) VALUES (?, ?, ?, ?);`,
    delete: `DELETE FROM Users WHERE Users.id = ?;`
}