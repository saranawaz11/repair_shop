import { migrate } from "drizzle-orm/neon-http/migrator";
import db from './index'
const main = async () => {
    try{
        await migrate(db, {
            migrationsFolder: 'app/db/migrations'
        })
        console.log('Migration completed');
        
    } catch(error){
        console.error('Error in migration: ', error);
        process.exit(1)
    }
}

main()