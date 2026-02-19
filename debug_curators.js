
const { getFeaturedCurators } = require('./src/actions/admin');

async function test() {
    console.log('Testing getFeaturedCurators...');
    try {
        const curators = await getFeaturedCurators();
        console.log('Curators found:', curators.length);
        console.log(JSON.stringify(curators, null, 2));
    } catch (e) {
        console.error('Error:', e);
    }
}

test();
