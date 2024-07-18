import ImageEditor from '@react-native-community/image-editor';

// Utility function to convert image to base64
export const convertImageToBase64 = async imageUri => {
  const dataurl = await ImageEditor.cropImage(imageUri, {
    offset: {x: 0, y: 0},
    quality:1,
    size: {width: 300, height: 300},
    displaySize: {width: 200, height: 200},
    resizeMode: 'contain',
    includeBase64: true,
  });
  return dataurl.base64;
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

  // const attachmentImages = await attachments.map(async data => {
  //   const base64Image = await convertImageToBase64(data?.uri);
  //   return `<p>${data?.fileName}</p><img src="data:image/jpeg;base64,${base64Image}" alt="${data?.fileName}" style="width: 200px; height: auto;" />`;
  // });
  // const attachmentImages = await Promise.all(attachments.map(async data => {
  //   const base64Image = await convertImageToBase64(data?.uri);
  //   return `<p>${data?.fileName}</p><img src="data:image/jpeg;base64,${base64Image}" alt="${data?.fileName}" style="width: 200px; height: auto;" />`;
  // }));
  
  let attachmentImages = [];
  for (const data of attachments) {
    const base64Image = await convertImageToBase64(data?.uri);
    attachmentImages.push(
      `<p>${data?.fileName}</p><img src="data:image/jpeg;base64,${base64Image}" alt="${data?.fileName}" style="width: 200px; height: auto;" />`,
    );
  }

  // const attachmentImages = await attachments.map(async data => {
  //   console.log(data, data?.attachment?.uri, 'rows');
  //   const base64Image = await convertImageToBase64(data?.attachment?.uri);
  //   return `<p>${data?.attachment?.fileName}</p><img src="data:image/jpeg;base64,${base64Image}" alt="${data?.attachment?.fileName}" style="width: 200px; height: auto;" />`;
  // });
  console.log(attachmentImages.join(''), 'attachmentImages');

  return `
    <html>
      <head>
        <title>Expense Calculator</title>
        <style>
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
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
        ${attachmentImages.join('')}
      </body>
    </html>
  `;
};
