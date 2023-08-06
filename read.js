const { google } = require('googleapis');
const { MongoClient } = require('mongodb');

const mongoUri = 'YOUR_MONGODB_CONNECTION_STRING';
const dbName='Excel';
const collectionName = 'users';
const spreadsheetId = 'YOUR_SPREADSHEET_ID';
const credentials = require('./credentials.json');

async function readDataFromMongoDB() {
  try {
    const client = await MongoClient.connect(mongoUri);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const cursor = collection.find({},{ _id: 0 });
    const data = await cursor.toArray();
    const dataArray = data.map(obj => Object.values(obj));
    client.close();
    return dataArray;
  } catch (err) {
    console.error('Error:', err);
    return [];
  }
}

async function writeToGoogleSheet(dataArray) {
  try {
    // Authenticate with Google Sheets API using credentials
    const auth = await google.auth.getClient({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const sheets = google.sheets({ version: 'v4', auth });
    const startRow = 19; 
    const range = `Sheet1!A${startRow}`;
    const request = {
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      resource: {
        values: dataArray,
      },
    };

    // Make the API request to insert data
    await sheets.spreadsheets.values.update(request);

    console.log('Data written to Google Sheet successfully.');
  } catch (err) {
    console.error('Error:', err);
  }
}

async function main() {
  const dataArray = await readDataFromMongoDB();
  await writeToGoogleSheet(dataArray);
}
main();

module.exports={
    main
}
