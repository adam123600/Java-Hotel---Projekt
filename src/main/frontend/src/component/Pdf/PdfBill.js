import * as React from "react";
import { Font ,Document, Page, Text, Image, StyleSheet, View } from "@react-pdf/renderer";
import { Table, TableHeader, TableCell, TableBody, DataTableCell, TableBorder } from "@david.kucsai/react-pdf-table"
import { Collapse } from "reactstrap";
import { TableRow } from "@david.kucsai/react-pdf-table/lib/TableRow";

const hotelImg = require('../../image/hotelBillTop.png');

Font.register({
    family: "Roboto",
    src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf"
  });

const styles = StyleSheet.create({
    page: {
        fontFamily: "Roboto",
        backgroundColor: "#ffffff",
        padding: 30
    },
    tableHeader: {
        color: "#ffcccc",
    },

})


export default class PdfBill extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            guest: "",
            room: "",
            credit: 0,
        }
    }

    componentDidMount(){
        this.setState({
            guest: this.props.guest,
            room: this.props.room,
            credit: this.props.room.balance, //TODO: tutaj zsumować też rzeczy bazy services
        })
    }
    render(){
        return(
            <Document>
                <Page style={styles.page}>
                    <Image source={hotelImg}/>
                    {/*tu info o gosciu adres hotelu itd..*/}
                    <Table 
                        data={[{description: "guest room " + this.state.room.roomName, charges: this.state.room.balance + "zł", credit: ""},
                               {description: "", charges: "", credit: this.state.credit + "zł"}
                            ]}>
                        <TableHeader textAlign={"center"} styles={styles.tableHeader}
                            includeLeftBorder={false} includeRightBorder={false} includeTopBorder={false}>
                            <TableCell>
                                Description
                            </TableCell>
                            <TableCell>
                                Charges
                            </TableCell>
                            <TableCell>
                                Credit
                            </TableCell>
                        </TableHeader>
                        <TableBody textAlign={"center"}
                            includeLeftBorder={false} includeRightBorder={false} includeTopBorder={false} includeBottomBorder={false}>
                            <DataTableCell getContent={(data) => data.description }/>
                            <DataTableCell getContent={(data) => data.charges}/>
                            <DataTableCell getContent={(data) => data.credit}/>
                        </TableBody>
                        
                    </Table>
                </Page>
            </Document>        
        );
    }
    
}