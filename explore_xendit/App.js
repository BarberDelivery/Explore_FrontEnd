
import { StatusBar } from 'expo-status-bar';
import {  SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider, Button } from 'react-native-paper';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import { useState } from 'react';



export default function App() {
  const [loading, setLoading] = useState(null)
  const [finish, setFinish] = useState(null)
  
  const bayarXendit = async () => {
    try {
      const { data } = await axios({
        method : 'POST',
        url : 'https://api.xendit.co/v2/invoices',
        headers: { 
          'Authorization': 'Basic eG5kX2RldmVsb3BtZW50X2lCbmptS0tvQXAyNmE1RkI5S2VrVmZ2TVh5U0E5MDhnNE9VdFBOSVZYeld0dW5IendXU3JGTTM5RldOQ0Y6', 
          'Content-Type': 'application/json', 
          'Cookie': 'incap_ses_7267_2182539=g/IuKB7bunLB79SvQJLZZD97A2QAAAAAbYodfSs3YwY22cd4EYpSuQ==; nlbi_2182539=4njYCcyzmBpQlmiMNAqKSgAAAABu1mNFR3H5eOyynsWHRFRm'
        },
        data : {
          "id": "640375e363bf9b3891ee1a57",
          "external_id": "payment-link-example",
          "user_id": "64035ee96047c691a7e34b2d",
          "status": "PENDING",
          "merchant_name": "dex barber",
          "merchant_profile_picture_url": "https://du8nwjtfkinx.cloudfront.net/xendit.png",
          "amount": 200000,
          "description": "Invoice Demo #123",
          "expiry_date": "2023-03-05T16:46:27.217Z",
          "invoice_url": "https://checkout-staging.xendit.co/web/640375e363bf9b3891ee1a57",
          "available_banks": [
              {
                  "bank_code": "MANDIRI",
                  "collection_type": "POOL",
                  "transfer_amount": 200000,
                  "bank_branch": "Virtual Account",
                  "account_holder_name": "DEX BARBER",
                  "identity_amount": 0
              },
              {
                  "bank_code": "BRI",
                  "collection_type": "POOL",
                  "transfer_amount": 200000,
                  "bank_branch": "Virtual Account",
                  "account_holder_name": "DEX BARBER",
                  "identity_amount": 0
              },
              {
                  "bank_code": "BNI",
                  "collection_type": "POOL",
                  "transfer_amount": 200000,
                  "bank_branch": "Virtual Account",
                  "account_holder_name": "DEX BARBER",
                  "identity_amount": 0
              },
              {
                  "bank_code": "PERMATA",
                  "collection_type": "POOL",
                  "transfer_amount": 200000,
                  "bank_branch": "Virtual Account",
                  "account_holder_name": "DEX BARBER",
                  "identity_amount": 0
              },
              {
                  "bank_code": "BCA",
                  "collection_type": "POOL",
                  "transfer_amount": 200000,
                  "bank_branch": "Virtual Account",
                  "account_holder_name": "DEX BARBER",
                  "identity_amount": 0
              },
              {
                  "bank_code": "SAHABAT_SAMPOERNA",
                  "collection_type": "POOL",
                  "transfer_amount": 200000,
                  "bank_branch": "Virtual Account",
                  "account_holder_name": "DEX BARBER",
                  "identity_amount": 0
              },
              {
                  "bank_code": "CIMB",
                  "collection_type": "POOL",
                  "transfer_amount": 200000,
                  "bank_branch": "Virtual Account",
                  "account_holder_name": "DEX BARBER",
                  "identity_amount": 0
              },
              {
                  "bank_code": "BSI",
                  "collection_type": "POOL",
                  "transfer_amount": 200000,
                  "bank_branch": "Virtual Account",
                  "account_holder_name": "DEX BARBER",
                  "identity_amount": 0
              },
              {
                  "bank_code": "BJB",
                  "collection_type": "POOL",
                  "transfer_amount": 200000,
                  "bank_branch": "Virtual Account",
                  "account_holder_name": "DEX BARBER",
                  "identity_amount": 0
              }
          ],
          "available_retail_outlets": [
              {
                  "retail_outlet_name": "ALFAMART"
              },
              {
                  "retail_outlet_name": "INDOMARET"
              }
          ],
          "available_ewallets": [
              {
                  "ewallet_type": "OVO"
              },
              {
                  "ewallet_type": "DANA"
              },
              {
                  "ewallet_type": "SHOPEEPAY"
              },
              {
                  "ewallet_type": "LINKAJA"
              },
              {
                  "ewallet_type": "ASTRAPAY"
              }
          ],
          "available_qr_codes": [
              {
                  "qr_code_type": "QRIS"
              }
          ],
          "available_direct_debits": [
              {
                  "direct_debit_type": "DD_BRI"
              }
          ],
          "available_paylaters": [
              {
                  "paylater_type": "KREDIVO"
              },
              {
                  "paylater_type": "UANGME"
              },
              {
                  "paylater_type": "AKULAKU"
              },
              {
                  "paylater_type": "ATOME"
              }
          ],
          "should_exclude_credit_card": false,
          "should_send_email": false,
        //   "success_redirect_url": "https://www.google.com",
        //   "failure_redirect_url": "https://www.google.com",
          "created": "2023-03-04T16:46:27.968Z",
          "updated": "2023-03-04T16:46:27.968Z",
          "currency": "IDR",
          "items": [
              {
                  "name": "Air Conditioner",
                  "quantity": 1,
                  "price": 200000,
                  "category": "Electronic",
                  "url": "https://yourcompany.com/example_item"
              }
          ],
          "fees": [
              {
                  "type": "ADMIN",
                  "value": 5000
              }
          ],
          "customer": {
            "given_names": "roihan",
            "surname": "s",
            "email": "pro.roihan@gmail.com",
            "mobile_number": "+6281224642373",
              "addresses": [
                  {
                      "city": "Jakarta Selatan",
                      "country": "Indonesia",
                      "postal_code": "12345",
                      "state": "Daerah Khusus Ibukota Jakarta",
                      "street_line1": "Jalan Makan",
                      "street_line2": "Kecamatan Kebayoran Baru"
                  }
              ]
          },
          "customer_notification_preference": {
              "invoice_created": [
                  "whatsapp",
                  "sms",
                  "email"
              ],
              "invoice_reminder": [
                  "whatsapp",
                  "sms",
                  "email"
              ],
              "invoice_paid": [
                  "whatsapp",
                  "sms",
                  "email"
              ],
              "invoice_expired": [
                  "whatsapp",
                  "sms",
                  "email"
              ]
          }
      }
    })

    setFinish(true)
      console.log(data);
    } catch (error) {
      
      console.error(error);
    }
  }
  // console.log(fins);
  if(finish){
    console.log('<<< masuk');
      return(
        // <PaperProvider>
          <WebView 
          
              source={{ uri: 'https://checkout-staging.xendit.co/web/640375e363bf9b3891ee1a57' }}
            //   onNavigationStateChange
            />
        // </PaperProvider>
      )
  }
  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}> 
          <Button icon="camera" mode="contained" onPress={bayarXendit}>
            Press me
          </Button>
      </SafeAreaView>
        
      {/* <Button */}
        {/* <Button ></Button> */}
        
        {/* <Text>Open up App.js to start working on your app!</Text> */}

        {/* <StatusBar style="auto" /> */}
      
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

