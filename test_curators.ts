import { getFeaturedCurators } from './src/actions/admin';

async function main() {
    const curators = await getFeaturedCurators();
    console.log(JSON.stringify(curators, null, 2));
}

main().catch(console.error);
