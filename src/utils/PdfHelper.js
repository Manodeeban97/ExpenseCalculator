import RNFS from 'react-native-fs';

export const uriToBase64 = async uri => {
  try {
    const base64String = await RNFS.readFile(uri, 'base64');
    // console.log(base64String);
    return base64String;
  } catch (error) {
    console.error('Error converting to Base64:', error);
    return null;
  }
};

export const generateHTMLContent = async (data, attachments) => {
  const rows = data
    .map(
      item => `
    <tr>
      <td>${item.name}</td>
      <td>${item.expenseinfo}</td>
      <td>${item.amount}</td>
    </tr>
  `,
    )
    .join('');

  let attachmentImages = [];
  for (const [index, dataItem] of data.entries()) {
    const attachment = attachments[index];
    if (attachment) {
      const base64Image = await uriToBase64(attachment?.uri);
      attachmentImages.push(
        `<div style="display: inline-block; margin: 10px; text-align: center;">
          <p>${dataItem.expenseinfo}</p>
          <img src="data:image/jpeg;base64,${base64Image}" alt="${dataItem.expenseinfo}" style="width: 200px; height: auto;" />
        </div>`,
      );
    }
  }

  return `
  <html>
    <head>
      <title>Expense Calculator</title>
      <style>
        body{
        padding:50px
         }
        h1{
         text-align: center;
         }
        h2{
         text-align: center;
         }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid black;
          padding: 8px;
          text-align: center;
        }
        th {
          background-color: #f2f2f2;
        }
        .attachments {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
        }
      </style>
    </head>
    <body>
      <h1>Expense Calculator</h1>
      <h2>Amount Paid</h2>
      <table>
        <tr>
          <th>Name</th>
          <th>Expenses</th>
          <th>Paid Amount</th>
        </tr>
        ${rows}
      </table>
      <h3>Attachments</h3>
      <div class="attachments">
        ${attachmentImages.join('')}
      </div>
    </body>
  </html>
`;
};
