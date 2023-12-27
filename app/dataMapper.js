const db = require('./db')

const dataMapper = {

    getAllFigurines: async () => {
        const result = await db.query('SELECT * FROM figurine;')
        return result.rows
    },

    getOneFigurineById: async (figurineId) => {
        const query = {
            text: "SELECT * FROM figurine WHERE id = $1;",
            values: [figurineId]
        }
        const result = await db.query(query)
        return result.rows[0]
    },

    getReviewsByFigurineId: async (figurineId) => {
        const query = {
            text: "SELECT * FROM review WHERE figurine_id = $1",
            values: [figurineId]
        }

        const result = await db.query(query)
        return result.rows
    },

    getFigurineWithReviewsById: async (figurineId) => {
        const query = {
            text: "SELECT * FROM figurine AS f JOIN review AS r ON f.id = r.figurine_id WHERE f.id = $1",
            values: [figurineId]
        }

        const result = await db.query(query)

        console.log(result.rows);
        return result.rows
    },

    getNumberByCategory: async () => {
        const query = "SELECT category AS name, COUNT(*) AS count FROM figurine GROUP BY category"
        const result = await db.query(query)
        return result.rows
    },

    getAllFigurinesByCategory: async (category) => {
        const query = {
            text: "SELECT * FROM figurine WHERE category = $1",
            values: [category]
        }
    },

    getAllWithAvgNote: async () => {
        const query = "SELECT f.*, AVG(note) AS note_moyenne FROM figurine f JOIN review r ON r.figurine_id = f.id GROUP BY f.id"
        const result = await db.query(query)
        console.log(result.rows);
        return result.rows
    }



}

module.exports = dataMapper;