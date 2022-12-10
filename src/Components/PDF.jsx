import {Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';



const styles = StyleSheet.create({
    page: {
      backgroundColor: '#FFFFFF',
      
    },
    section: {
      margin: 3,
      padding: 5,
      flexGrow: 1
    },
    textStyle: {
        fontSize: 16,
        marginLeft:30,
        padding:5,
        
    },
    heading: {
        fontSize:30,
        paddingBottom:16,
        alignContent:"center"
    },
    detail: {
        fontSize:22,
        margin:12
    }
  });

  export function PdfDocument(props){

    return (
        <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.heading}>BRIKENTECH ACCOUNTING SYSTEM</Text>
        <Text style={styles.detail}>Transaction Details</Text>
        <Text style={styles.textStyle}>Transaction ID: {props.pdfData.TransactionID}</Text>
        <Text style={styles.textStyle}>User ID: {props.pdfData.UserID}</Text>
        <Text style={styles.textStyle}>Name: {props.pdfData.Name}</Text>
        <Text style={styles.textStyle}>Category: {props.pdfData.Category}</Text>
        <Text style={styles.textStyle}>Sub Category: {props.pdfData.SubCategory}</Text>
        <Text style={styles.textStyle}>Date Of Record Creation: {props.pdfData.DateEntered}</Text>
        <Text style={styles.textStyle}>Date Of Transaction: {props.pdfData.DateOfEntry}</Text>
        <Text style={styles.textStyle}>Amount: {props.pdfData.Amount}</Text>
        <Text style={styles.textStyle}>Note: {props.pdfData.Note}</Text>
        <Text style={styles.textStyle}>Quater: {props.pdfData.Quater}</Text>
      </View>
    </Page>
  </Document>

    );
  }