const express = require('express')
const cors = require('cors')
require('dotenv').config()
const db = require('./config/database')

const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.json({
        message: 'Bem-vindo à API do Comunicarros!'
    })
})

app.get('/api/health', (req, res) => {
    res.json({
        status: 'online',
        application: 'Comunicarros'
    })
})

app.get('/api/db-test', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT DATABASE() AS banco')

        res.json({
            status: 'conectado',
            database: rows[0].banco
        })
    } catch (error) {
        console.error('Erro ao conectar ao MySQL:', error)

        res.status(500).json({
            status: 'erro',
            message: 'Falha na conexão com o banco de dados.'
        })
    }
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})