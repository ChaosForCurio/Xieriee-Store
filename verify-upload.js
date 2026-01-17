const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

async function testUpload() {
    const filePath = path.join(__dirname, 'test-app.exe');

    // Create dummy file if not exists
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, 'dummy content for verification');
    }

    const form = new FormData();
    form.append('file', fs.createReadStream(filePath));
    form.append('title', 'Test App from Script');
    form.append('developer', 'Verification Bot');
    form.append('description', 'This is an automated test upload.');
    form.append('category_id', '1');
    form.append('platform', 'windows');

    try {
        console.log('Attemping upload to http://localhost:5000/api/apps/upload...');
        const response = await axios.post('http://localhost:5000/api/apps/upload', form, {
            headers: {
                ...form.getHeaders(),
            },
        });
        console.log('✅ Upload Success:', response.status, response.data);
    } catch (error) {
        if (error.response) {
            console.error('❌ Upload Failed:', error.response.status, error.response.data);
        } else {
            console.error('❌ Upload Error:', error.message);
        }
    }
}

testUpload();
