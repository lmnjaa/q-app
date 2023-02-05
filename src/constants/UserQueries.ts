export default {
    findAll: `SELECT * FROM User;`,
    findById: `SELECT * FROM User WHERE User.id = ?;`,
    findByUsername: `SELECT * FROM User WHERE User.username = ?`,
    create: `INSERT INTO User (firstName, lastName, email, isAdmin, username, password) VALUES (?, ?, ?, ?, ?, ?);`,
    delete: `DELETE FROM User WHERE User.id = ?;`,
    update: `UPDATE User SET User.firstName = ?, User.lastName = ?, User.email = ?, User.isAdmin = ?, User.username = ? WHERE User.id = ?`,
    deactivateUser: `UPDATE User SET active = 0 WHERE User.id = ?;`
}