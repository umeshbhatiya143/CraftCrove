import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";


const Invoice = ({ bookingObj }) => {
  console.log(bookingObj);
  
  return (
    
    
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          
            <Text
              style={styles.headerText}
            >
              Invoice
            </Text>
          

          {/* Company address and logo */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              
            }}
          >
            <View style={{ margin: "20px", marginTop: "30px" }}>
              <Image
                src="../../logo2.jpeg"
                style={{ height: "60px", width: "150px" }}
              ></Image>
            </View>
            <View style={{ margin: "20px" }}>
              <Text
                style={{
                  color: "white",
                  fontWeight: "medium",
                  fontSize: "15px",
                  margin: "5px",
                }}
              >
                TourWay
              </Text>
              <Text
                style={{
                  color: "white",
                  fontWeight: "medium",
                  fontSize: "10px",
                  margin: "5px",
                }}
              >
                MNNIT Allahabad,
              </Text>
              <Text
                style={{
                  color: "white",
                  fontWeight: "medium",
                  fontSize: "10px",
                  margin: "5px",
                }}
              >
                Prayagraj,
              </Text>
              <Text
                style={{
                  color: "white",
                  fontWeight: "medium",
                  fontSize: "10px",
                  margin: "5px",
                }}
              >
                Uttar Pradesh,
              </Text>
              <Text
                style={{
                  color: "white",
                  fontWeight: "medium",
                  fontSize: "10px",
                  margin: "5px",
                }}
              >
                211004
              </Text>
            </View>
          </View>
        </View>
        {/* Customer address */}
        <View
          style={{
            margin: "20px",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text
              style={{ fontWeight: "medium", fontSize: "15px", margin: "5px" }}
            >
              Bill to :
            </Text>
            <View style={{ marginLeft: "50px" }}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: "12px",
                  margin: "1px",
                }}
              >
                {bookingObj.userName}
              </Text>
              <Text
                style={{
                  fontWeight: "medium",
                  fontSize: "10px",
                  margin: "1px",
                }}
              >
                {bookingObj.address.address_line1}
              </Text>
              <Text
                style={{
                  fontWeight: "medium",
                  fontSize: "10px",
                  margin: "1px",
                }}
              >
                {bookingObj.address.address_line2}
              </Text>
              <Text
                style={{
                  fontWeight: "medium",
                  fontSize: "10px",
                  margin: "1px",
                }}
              >
                {bookingObj.address.city}
              </Text>
              <Text
                style={{
                  fontWeight: "medium",
                  fontSize: "10px",
                  margin: "1px",
                }}
              >
                {bookingObj.address.state}
              </Text>
              <Text
                style={{
                  fontWeight: "medium",
                  fontSize: "10px",
                  margin: "1px",
                }}
              >
                {bookingObj.address.country}
              </Text>
              <Text
                style={{
                  fontWeight: "medium",
                  fontSize: "10px",
                  margin: "1px",
                }}
              >
                {bookingObj.address.postal_code}
              </Text>
            </View>
          </View>
          {/* orderId   */}
          <View>
            <Text
              style={{
                fontWeight: "medium",
                fontSize: "10px",
                margin: "1px",
              }}
            >
              Order Id : {bookingObj.paymentDetails.orderId}
            </Text>
            <Text
              style={{
                fontWeight: "medium",
                fontSize: "10px",
                margin: "1px",
              }}
            >
              Payment Id : {bookingObj.paymentDetails.paymentId}
            </Text>
            <Text
              style={{
                fontWeight: "medium",
                fontSize: "10px",
                margin: "1px",
              }}
            >
              TourWay GST No. : {bookingObj.gstNo}
            </Text>
          </View>
        </View>
        {/* Horizontal line */}
        <View
          style={{
            borderBottom: "0.2px solid black",
            marginTop: "10px",
            marginBottom: "10px",
            margin: "10px",
          }}
        />
        {/* Total payment */}
        <View
          style={{
            margin: "10px",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View styles={{ margin: "5px" }}>
            <Text
              style={{
                fontWeight: 900,
                fontSize: "20px",
                margin: "1px",
              }}
            >
              Package Name
            </Text>
          </View>
          <View styles={{ margin: "5px" }}>
            <Text
              style={{
                fontWeight: 900,
                fontSize: "20px",
                margin: "1px",
              }}
            >
              Traveller
            </Text>
          </View>
          <View styles={{ margin: "5px" }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                margin: "1px",
              }}
            >
              Price
            </Text>
          </View>
        </View>
        {/* Horizontal line */}
        <View
          style={{
            borderBottom: "0.5px solid black",
            marginTop: "10px",
            marginBottom: "10px",
            margin: "10px",
          }}
        />
        <View
          style={{
            margin: "10px",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View styles={{ margin: "10px" }}>
            {/* <Text
              style={{
                fontWeight: "medium",
                fontSize: "15px",
                margin: "1px",
              }}
            > */}
            {/* Check if package name is too long */}
            {bookingObj.packageTitle.length > 20 ? (
              <>
                {/* Display first part of the package name */}
                <Text
                  style={{
                    fontWeight: "medium",
                    fontSize: "10px",
                    margin: "1px",
                  }}
                >
                  {bookingObj.packageTitle.slice(0, 20)}
                </Text>
                <br />
                {/* Display second part of the package name */}
                <Text
                  style={{
                    fontWeight: "medium",
                    fontSize: "10px",
                    margin: "1px",
                  }}
                >
                  {bookingObj.packageTitle.slice(20)}
                </Text>
              </>
            ) : (
              <Text
                style={{
                  fontWeight: "medium",
                  fontSize: "10px",
                  margin: "1px",
                }}
              >
                {bookingObj.packageTitle}
              </Text>
            )}
            {/* </Text> */}
          </View>
          <View
            styles={{ fontWeight: "medium", fontSize: "10px", margin: "1px" }}
          >
            <Text>{bookingObj.travelersDetail.length}</Text>
          </View>
          <View
            styles={{ fontWeight: "medium", fontSize: "10px", margin: "1px" }}
          >
            <Text styles={{ fontWeight: "medium", fontSize: "10px", margin: "1px" }}>Rs{ } {bookingObj.bill.originalPrice}</Text>
          </View>
        </View>

        <View
          style={{
            margin: "10px",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View styles={{ margin: "10px" }}>
            <Text
              style={{ fontWeight: "medium", fontSize: "10px", margin: "1px" }}
            >
              Discount
            </Text>
          </View>
          <View styles={{ margin: "10px" }}>
            <Text>-Rs{ } {bookingObj.bill.discountAmt}({(bookingObj.bill.discount)} %)</Text>
          </View>
        </View>
        <View
          style={{
            margin: "10px",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View styles={{ margin: "10px" }}>
            <Text
              style={{ fontWeight: "medium", fontSize: "10px", margin: "1px" }}
            >
             Tax & GST
            </Text>
          </View>
          <View styles={{ margin: "10px" }}>
            <Text>+Rs{ } {bookingObj.bill.taxAmt}({(bookingObj.gst)} %)</Text>
          </View>
        </View>
        {/* Horizontal line */}
        <View
          style={{
            borderBottom: "0.5px solid black",
            marginTop: "5px",
            marginBottom: "5px",
            margin: "10px",
          }}
        />
        <View
          style={{
            margin: "10px",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View styles={{ margin: "10px" }}>
            <Text
              style={{
                fontWeight: "medium",
                fontSize: "15px",
                margin: "1px",
              }}
            >
              Total
            </Text>
          </View>
          <View styles={{ margin: "10px" }}>
            <Text>Rs{ } {bookingObj.bill.taxedPrice}</Text>
          </View>
        </View>
        {/* Horizontal line */}
        <View
          style={{
            borderBottom: "0.2px solid black",
            marginTop: "5px",
            marginBottom: "5px",
            margin: "10px",
          }}
        />
      </Page>
    </Document>
  );
};
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "white",
    padding: 10,
  },
  header: {
    backgroundColor: "#3C096C",
    alignItems: "center",
    paddingTop:10,
    paddingBottom: 10,
    marginBottom: 10,
  },
  headerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 40,
  },
});

export default Invoice;