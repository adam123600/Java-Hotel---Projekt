import * as React from "react";
import {Document, Font, Image, Page, StyleSheet, Text, View} from "@react-pdf/renderer";

const hotelImg = require('../../image/hotelReceiptTop.png');

Font.register({
    family: "Roboto",
    src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf"
});


const styles = StyleSheet.create({
    page: {
        fontFamily: "Roboto",
        backgroundColor: "#ffffff",
        padding: 30,
        fontSize: 12,
    },
    hotelInfo: {
        paddingLeft: 70,
        paddingRight: 70,
        marginBottom: 50,
    },
    textInfoColumn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 70,
        paddingRight: 70,
        marginBottom: 20,
    },
    cashInfoColumn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 70,
        paddingRight: 90,
        marginBottom: 20,
    },
    bottomLine: {
        paddingLeft: 55,
        paddingRight: 55,
        border: '1px solid #000',
    }
});

export default class PdfOrder extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            itemCount: this.props.order.itemCounter,
            price: this.props.order.price,
            orderDate: this.props.order.orderDate,
        }
    }

    render(){
        return(
            <Document>
                <Page style={styles.page}>
                    <Image source={hotelImg}/>
                    <View style={styles.hotelInfo}>
                        <View>
                            <Text>The Grand Budapest Hotel</Text>
                            <Text>Kraków</Text>
                            <Text>Ulica 1</Text>
                            <Text>31-062</Text>
                        </View>
                    </View>
                    <View style={styles.textInfoColumn}>
                        <View>
                            <Text>Nazwa produktu:</Text>
                            <Text>Liczba produktów:</Text>
                            <Text>Data zamówienia:</Text>
                        </View>
                        <View>
                            <Text>{this.props.item.item_name}</Text>
                            <Text>{this.state.itemCount}</Text>
                            <Text>{this.state.orderDate}</Text>
                        </View>
                    </View>
                    <View style={styles.bottomLine}/>
                    <View style={styles.cashInfoColumn}>
                        <View>
                            <Text>Cena:</Text>
                        </View>
                        <View>
                            <Text>{this.state.price == null
                                ? 0 + " zł" : this.state.price + " zł"}</Text>
                        </View>
                    </View>
                </Page>
            </Document>
        )
    }
}