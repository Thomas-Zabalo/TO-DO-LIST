const mongoose = require('mongoose');
const uri = "mongodb+srv://thomaszabalo:WIOsKtxYvsgMw5mv@todolistdb.uri6nnp.mongodb.net/?retryWrites=true&w=majority&appName=TODOLISTDB";

main().catch(err=> console.log(err))

async function main() {
    // Connexion à MongoDB
    await mongoose.connect(uri);

    const Task = mongoose.model('Tasks', {
        titre: { type: String, required: true },
        description: String,
        status: { type: String, enum: ['En attente', 'En cours', 'Terminé'], default: 'En attente' },
        Date: Date
    });

    const task1 = new Task({
        titre: "Acheter du lait",
        description: "N'oubliez pas d'acheter du lait",
        status: "En attente",
        Date: "2024-06-20"
    });

    const task2 = new Task({
        titre: "Acheter du fromage",
        description: "N'oubliez pas d'acheter du fromage",
        status: "En cours",
        Date: "2024-06-20"
    });

    console.log(task1, task2);
    await task1.save();
    await task2.save();
}

