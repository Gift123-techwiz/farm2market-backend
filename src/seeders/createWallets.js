require("dotenv").config();
const AppDataSource = require("../config/database");

async function createWallets() {
    try {

        await AppDataSource.initialize();

        const userRepository = AppDataSource.getRepository("User");
        const walletRepository = AppDataSource.getRepository("Wallet");

        const users = await userRepository.find();

        for (const user of users) {

            const existingWallet = await walletRepository.findOne({
                where: {
                    user: {
                        id: user.id,
                    },
                },
                relations: {
                    user: true,
                },
            });

            if (!existingWallet) {

                const wallet = walletRepository.create({
                    user,
                    balance: 0,
                });

                await walletRepository.save(wallet);

                console.log(`Wallet created for ${user.email}`);
            }

        }

        console.log("Done.");

        process.exit();

    } catch (error) {

        console.log(error);

        process.exit(1);

    }
}

createWallets();