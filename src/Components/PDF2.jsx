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
    },
    detail1: {
        fontSize:20,
        margin:10,
    }
  });

  export function PdfDocument1(props){

    return (
        <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.heading}>BRIKENTECH ACCOUNTING SYSTEM</Text>
        <Text style={styles.detail}>Profit Loss Statement</Text>
        <Text style={styles.detail1}>Income</Text>
        <Text style={styles.textStyle}>Main: $ {props?.list2[0]}</Text>
        <Text style={styles.textStyle}>List: $ {props?.list2[1]}</Text>
        <Text style={styles.textStyle}>Total Income: $ {props?.Income[0]?.Income}</Text>
        <Text style={styles.detail1}>Expense</Text>
        <Text style={styles.textStyle}>Rent: $ {props?.list[0]}</Text>
        <Text style={styles.textStyle}>Electricity: $ {props?.list[1]}</Text>
        <Text style={styles.textStyle}>Gas: $ {props?.list[2]}</Text>
        <Text style={styles.textStyle}>Water: $ {props?.list[3]}</Text>
        <Text style={styles.textStyle}>Transport: $ {props?.list[4]}</Text>
        <Text style={styles.textStyle}>Advertising: $ {props?.list[5]}</Text>
        <Text style={styles.textStyle}>Supplies: $ {props?.list[6]}</Text>
        <Text style={styles.textStyle}>Wages: $ {props?.list[7]}</Text>
        <Text style={styles.textStyle}>Construction: $ {props?.list[8]}</Text>
        <Text style={styles.textStyle}>Telephone: $ {props?.list[9]}</Text>
        <Text style={styles.textStyle}>Other: $ {props?.list[10]}</Text>
        <Text style={styles.textStyle}>Total Expense: $ {props?.Expenses[0]?.ExpenseTotal}</Text>
        <Text style={styles.textStyle}>Total Profit: $ {props?.Income[0]?.Income - props?.Expenses[0]?.ExpenseTotal}</Text>
      </View>
    </Page>
  </Document>

    );
  }