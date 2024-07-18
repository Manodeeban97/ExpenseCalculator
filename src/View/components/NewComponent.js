// import React from 'react';
// import { View, Button, StyleSheet, Alert } from 'react-native';
// import RNHTMLtoPDF from 'react-native-html-to-pdf';
// import Share from 'react-native-share';
// import { ImageEditor } from 'react-native';

// // Utility function to convert image to base64
// const convertImageToBase64 = async (imageUri) => {
//   return new Promise((resolve, reject) => {
//     ImageEditor.cropImage(
//       imageUri,
//       {
//         offset: { x: 0, y: 0 },
//         size: { width: 300, height: 400 },
//         displaySize: { width: 200, height: 200 },
//         resizeMode: 'contain',
//       },
//       (uri) => {
//         resolve(uri);
//       },
//       (error) => {
//         reject(error);
//       }
//     );
//   });
// };

// const generateHTMLContent = async (data, attachments) => {
//   const rows = data.map(item => `
//     <tr>
//       <td>${item.name}</td>
//       <td>${item.expense}</td>
//       <td>${item.amount}</td>
//     </tr>
//   `).join('');

//   const attachmentImages = await Promise.all(
//     attachments.map(async (attachment) => {
//       const base64Image = await convertImageToBase64(attachment.imageUri);
//       return `<p>${attachment.name}</p><img src="data:image/jpeg;base64,${base64Image}" alt="${attachment.name}" style="width: 200px; height: auto;" />`;
//     })
//   );

//   return `
//     <html>
//       <head>
//         <title>Expense Calculator</title>
//         <style>
//           table {
//             width: 100%;
//             border-collapse: collapse;
//           }
//           th, td {
//             border: 1px solid black;
//             padding: 8px;
//             text-align: left;
//           }
//           th {
//             background-color: #f2f2f2;
//           }
//         </style>
//       </head>
//       <body>
//         <h1>Expense Calculator</h1>
//         <h2>Amount Paid</h2>
//         <table>
//           <tr>
//             <th>Name</th>
//             <th>Expenses</th>
//             <th>Paid Amount</th>
//           </tr>
//           ${rows}
//         </table>
//         <h3>Attachments</h3>
//         ${attachmentImages.join('')}
//       </body>
//     </html>
//   `;
// };

// const SharePdfComponent = ({ expenseData, attachmentData }) => {
//   const createAndSharePDF = async () => {
//     try {
//       const htmlContent = await generateHTMLContent(expenseData, attachmentData);

//       // Create the PDF
//       const options = {
//         html: htmlContent,
//         fileName: 'ExpenseCalculator',
//         directory: 'Documents',
//       };

//       const file = await RNHTMLtoPDF.convert(options);

//       // Share the PDF
//       const shareOptions = {
//         title: 'Share PDF',
//         url: `file://${file.filePath}`,
//         type: 'application/pdf',
//       };

//       await Share.open(shareOptions);
//     } catch (error) {
//       Alert.alert('Error', 'Failed to create and share PDF');
//       console.error(error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Share as PDF" onPress={createAndSharePDF} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// const App = () => {
//   const expenseData = [
//     { name: 'Raja', expense: 'ticket', amount: 500 },
//     { name: 'Mano', expense: 'snacks', amount: 300 }
//   ];

//   const attachmentData = [
//     { name: 'ticket', imageUri: 'path/to/your/image.jpg' }
//   ];

//   return (
//     <View style={styles.container}>
//       <SharePdfComponent expenseData={expenseData} attachmentData={attachmentData} />
//     </View>
//   );
// };

// export default App;




// // SharePdfComponent.js
// import React from 'react';
// import { View, Button, StyleSheet, Alert } from 'react-native';
// import RNHTMLtoPDF from 'react-native-html-to-pdf';
// import Share from 'react-native-share';
// import { ImageEditor } from 'react-native';

// // Utility function to convert image to base64
// const convertImageToBase64 = async (imageUri) => {
//   return new Promise((resolve, reject) => {
//     ImageEditor.cropImage(
//       imageUri,
//       {
//         offset: { x: 0, y: 0 },
//         size: { width: 300, height: 400 },
//         displaySize: { width: 200, height: 200 },
//         resizeMode: 'contain',
//       },
//       (uri) => {
//         resolve(uri);
//       },
//       (error) => {
//         reject(error);
//       }
//     );
//   });
// };

// const generateHTMLContent = async (data, attachments) => {
//   const rows = data.map(item => `
//     <tr>
//       <td>${item.name}</td>
//       <td>${item.expense}</td>
//       <td>${item.amount}</td>
//     </tr>
//   `).join('');

//   const attachmentImages = await Promise.all(
//     attachments.map(async (attachment) => {
//       const base64Image = await convertImageToBase64(attachment.imageUri);
//       return `<p>${attachment.name}</p><img src="data:image/jpeg;base64,${base64Image}" alt="${attachment.name}" style="width: 200px; height: auto;" />`;
//     })
//   );

//   return `
//     <html>
//       <head>
//         <title>Expense Calculator</title>
//         <style>
//           table {
//             width: 100%;
//             border-collapse: collapse;
//           }
//           th, td {
//             border: 1px solid black;
//             padding: 8px;
//             text-align: left;
//           }
//           th {
//             background-color: #f2f2f2;
//           }
//         </style>
//       </head>
//       <body>
//         <h1>Expense Calculator</h1>
//         <h2>Amount Paid</h2>
//         <table>
//           <tr>
//             <th>Name</th>
//             <th>Expenses</th>
//             <th>Paid Amount</th>
//           </tr>
//           ${rows}
//         </table>
//         <h3>Attachments</h3>
//         ${attachmentImages.join('')}
//       </body>
//     </html>
//   `;
// };

// const CustomTextWithTooltip = ({ expenseData, attachmentData }) => {
//   const createAndSharePDF = async () => {
//     try {
//       const htmlContent = await generateHTMLContent(expenseData, attachmentData);

//       // Create the PDF
//       const options = {
//         html: htmlContent,
//         fileName: 'ExpenseCalculator',
//         directory: 'Documents',
//       };

//       const file = await RNHTMLtoPDF.convert(options);

//       // Share the PDF
//       const shareOptions = {
//         title: 'Share PDF',
//         url: `file://${file.filePath}`,
//         type: 'application/pdf',
//       };

//       await Share.open(shareOptions);
//     } catch (error) {
//       Alert.alert('Error', 'Failed to create and share PDF');
//       console.error(error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Share as PDF" onPress={createAndSharePDF} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default CustomTextWithTooltip;
